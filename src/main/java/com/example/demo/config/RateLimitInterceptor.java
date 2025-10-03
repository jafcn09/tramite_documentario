package com.example.demo.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Interceptor que aplica rate limiting a los endpoints de la API
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class RateLimitInterceptor implements HandlerInterceptor {

    private final RateLimitConfig rateLimitConfig;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        String clientKey = getClientKey(request);

        // Determinar el tipo de rate limit según el endpoint
        RateLimitConfig.RateLimitType limitType = determineLimitType(requestURI, request.getMethod());

        // Verificar si la request está permitida
        if (!rateLimitConfig.tryConsume(clientKey, limitType)) {
            log.warn("🚫 Rate limit excedido - IP: {}, URI: {}, Method: {}",
                getClientIP(request), requestURI, request.getMethod());

            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            String jsonResponse = String.format(
                "{\"error\": \"Too Many Requests\", " +
                "\"message\": \"Has excedido el límite de solicitudes. Por favor, intenta más tarde.\", " +
                "\"status\": 429, " +
                "\"limitType\": \"%s\"}",
                limitType.name()
            );

            response.getWriter().write(jsonResponse);
            return false;
        }

        // Agregar headers informativos
        long availableTokens = rateLimitConfig.getAvailableTokens(clientKey, limitType);
        response.setHeader("X-RateLimit-Remaining", String.valueOf(availableTokens));
        response.setHeader("X-RateLimit-Limit", String.valueOf(limitType.getCapacity()));

        return true;
    }

    /**
     * Determina el tipo de rate limit según el endpoint
     */
    private RateLimitConfig.RateLimitType determineLimitType(String uri, String method) {
        // Login endpoints
        if (uri.contains("/api/auth/login") || uri.contains("/api/auth/signin")) {
            return RateLimitConfig.RateLimitType.LOGIN;
        }

        // File upload endpoints
        if (uri.contains("/api/tramites") && "POST".equalsIgnoreCase(method)) {
            return RateLimitConfig.RateLimitType.FILE_UPLOAD;
        }

        // Crear trámite
        if (uri.contains("/api/tramites/crear") || uri.contains("/api/tramites/nuevo")) {
            return RateLimitConfig.RateLimitType.CREATE_TRAMITE;
        }

        // Búsqueda
        if (uri.contains("/search") || uri.contains("/buscar")) {
            return RateLimitConfig.RateLimitType.SEARCH;
        }

        // Por defecto, usar límite general de API
        return RateLimitConfig.RateLimitType.API_GENERAL;
    }

    /**
     * Obtiene una clave única para identificar al cliente
     * Combina IP + User-Agent para mayor precisión
     */
    private String getClientKey(HttpServletRequest request) {
        String ip = getClientIP(request);
        String userAgent = request.getHeader("User-Agent");

        // Si hay usuario autenticado, usar su ID
        String username = request.getRemoteUser();
        if (username != null) {
            return "user:" + username;
        }

        // Sino, usar IP + hash del User-Agent
        if (userAgent != null) {
            return ip + ":" + userAgent.hashCode();
        }

        return ip;
    }

    /**
     * Obtiene la IP real del cliente, considerando proxies
     */
    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIP = request.getHeader("X-Real-IP");
        if (xRealIP != null && !xRealIP.isEmpty()) {
            return xRealIP;
        }

        return request.getRemoteAddr();
    }
}
