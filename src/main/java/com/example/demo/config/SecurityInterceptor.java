package com.example.demo.config;

import com.example.demo.service.IPBlockingService;
import com.example.demo.service.SecurityAuditService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Base64;

/**
 * Interceptor de seguridad principal
 * Aplica múltiples capas de protección
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class SecurityInterceptor implements HandlerInterceptor {

    private final IPBlockingService ipBlockingService;
    private final SecurityAuditService securityAuditService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                           Object handler) throws Exception {

        String ipAddress = getClientIp(request);
        String requestUri = request.getRequestURI();
        String method = request.getMethod();

        // 1. Verificar IP bloqueada
        if (ipBlockingService.isBlocked(ipAddress)) {
            log.error("Blocked IP attempted access: {} to {}", ipAddress, requestUri);
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\":\"Access denied\"}");

            securityAuditService.logSecurityEvent(
                SecurityAuditService.SecurityEventType.UNAUTHORIZED_ACCESS,
                "blocked_ip",
                "Blocked IP access attempt",
                request
            );
            return false;
        }

        // 2. Detectar bots maliciosos
        if (ipBlockingService.detectMaliciousBot(request)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\":\"Malicious bot detected\"}");
            return false;
        }

        // 3. Detectar patrones DDoS
        if (ipBlockingService.detectDDoSPattern(ipAddress, request)) {
            response.setStatus(429); // Too Many Requests
            response.getWriter().write("{\"error\":\"Rate limit exceeded - DDoS protection\"}");
            return false;
        }

        // 4. Validar headers sospechosos
        if (!securityAuditService.validateHeaders(request)) {
            log.warn("Suspicious headers detected from IP: {}", ipAddress);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Invalid request headers\"}");

            securityAuditService.logSecurityEvent(
                SecurityAuditService.SecurityEventType.SUSPICIOUS_ACTIVITY,
                "unknown",
                "Suspicious headers detected",
                request
            );
            return false;
        }

        // 5. Detectar SQL Injection en parámetros
        for (String paramName : request.getParameterMap().keySet()) {
            String[] values = request.getParameterValues(paramName);
            for (String value : values) {
                if (securityAuditService.detectSQLInjection(value)) {
                    log.error("SQL Injection attempt from IP: {} - Param: {} = {}",
                        ipAddress, paramName, value);

                    ipBlockingService.recordFailedAttempt(ipAddress, "SQL Injection attempt");

                    securityAuditService.logSecurityEvent(
                        SecurityAuditService.SecurityEventType.SQL_INJECTION_ATTEMPT,
                        "unknown",
                        String.format("SQL Injection in param %s", paramName),
                        request
                    );

                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("{\"error\":\"Invalid input detected\"}");
                    return false;
                }
            }
        }

        // 6. Detectar Path Traversal
        if (securityAuditService.detectPathTraversal(requestUri)) {
            log.error("Path traversal attempt from IP: {} - URI: {}", ipAddress, requestUri);

            ipBlockingService.recordFailedAttempt(ipAddress, "Path traversal attempt");

            securityAuditService.logSecurityEvent(
                SecurityAuditService.SecurityEventType.PATH_TRAVERSAL_ATTEMPT,
                "unknown",
                "Path traversal in URI",
                request
            );

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Invalid path\"}");
            return false;
        }

        // 7. Verificar tamaño de request body (prevenir ataques de buffer overflow)
        String contentLength = request.getHeader("Content-Length");
        if (contentLength != null) {
            try {
                long length = Long.parseLong(contentLength);
                if (length > 52428800) { // 50MB max
                    log.warn("Request body too large from IP: {} - Size: {} bytes", ipAddress, length);
                    response.setStatus(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE);
                    response.getWriter().write("{\"error\":\"Request too large\"}");
                    return false;
                }
            } catch (NumberFormatException e) {
                log.warn("Invalid Content-Length header from IP: {}", ipAddress);
            }
        }

        // 8. Validar métodos HTTP permitidos
        if (!isAllowedMethod(method)) {
            log.warn("Disallowed HTTP method {} from IP: {}", method, ipAddress);
            response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
            response.getWriter().write("{\"error\":\"Method not allowed\"}");
            return false;
        }

        // 9. Detectar intentos de Session Hijacking
        String sessionId = request.getRequestedSessionId();
        if (sessionId != null && !request.isRequestedSessionIdValid()) {
            log.warn("Invalid session ID attempt from IP: {} - Session: {}", ipAddress, sessionId);

            securityAuditService.logSecurityEvent(
                SecurityAuditService.SecurityEventType.SESSION_HIJACK_ATTEMPT,
                "unknown",
                "Invalid session ID",
                request
            );
        }

        // 10. Verificar Authorization header para ataques de token
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.length() > 1000) { // Token anormalmente largo
            log.warn("Abnormally long Authorization header from IP: {}", ipAddress);
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Invalid authorization\"}");
            return false;
        }

        // 11. Log de acceso para endpoints sensibles
        if (isSensitiveEndpoint(requestUri)) {
            log.info("Access to sensitive endpoint {} from IP: {}", requestUri, ipAddress);

            securityAuditService.logSecurityEvent(
                SecurityAuditService.SecurityEventType.DATA_EXPORT,
                request.getRemoteUser() != null ? request.getRemoteUser() : "anonymous",
                "Sensitive endpoint access: " + requestUri,
                request
            );
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
                          Object handler, ModelAndView modelAndView) throws Exception {
        // Agregar headers de seguridad adicionales si no están presentes
        if (response.getHeader("X-Request-ID") == null) {
            response.setHeader("X-Request-ID", generateRequestId());
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                               Object handler, Exception ex) throws Exception {
        // Log de errores de seguridad
        if (ex != null && response.getStatus() >= 400) {
            String ipAddress = getClientIp(request);
            log.error("Request failed from IP: {} - Status: {} - Error: {}",
                ipAddress, response.getStatus(), ex.getMessage());

            // Registrar intentos fallidos para ciertos códigos de estado
            if (response.getStatus() == 401 || response.getStatus() == 403) {
                ipBlockingService.recordFailedAttempt(ipAddress,
                    "HTTP " + response.getStatus() + " error");
            }
        }
    }

    private boolean isAllowedMethod(String method) {
        return "GET".equals(method) || "POST".equals(method) ||
               "PUT".equals(method) || "DELETE".equals(method) ||
               "PATCH".equals(method) || "OPTIONS".equals(method);
    }

    private boolean isSensitiveEndpoint(String uri) {
        return uri.contains("/admin") || uri.contains("/usuarios") ||
               uri.contains("/roles") || uri.contains("/export") ||
               uri.contains("/download") || uri.contains("/reportes");
    }

    private String generateRequestId() {
        return Base64.getUrlEncoder().withoutPadding()
            .encodeToString((System.currentTimeMillis() + "-" + Math.random()).getBytes())
            .substring(0, 16);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }

        return request.getRemoteAddr();
    }
}