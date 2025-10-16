package com.example.demo.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class RateLimitInterceptor implements HandlerInterceptor {

    private final RateLimitConfig rateLimitConfig;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        String clientKey = getClientKey(request);

        RateLimitConfig.RateLimitType limitType = determineLimitType(requestURI, request.getMethod());

        if (!rateLimitConfig.tryConsume(clientKey, limitType)) {
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

        long availableTokens = rateLimitConfig.getAvailableTokens(clientKey, limitType);
        response.setHeader("X-RateLimit-Remaining", String.valueOf(availableTokens));
        response.setHeader("X-RateLimit-Limit", String.valueOf(limitType.getCapacity()));

        return true;
    }

    private RateLimitConfig.RateLimitType determineLimitType(String uri, String method) {
        if (uri.contains("/api/auth/login") || uri.contains("/api/auth/signin")) {
            return RateLimitConfig.RateLimitType.LOGIN;
        }

        if (uri.contains("/api/tramites") && "POST".equalsIgnoreCase(method)) {
            return RateLimitConfig.RateLimitType.FILE_UPLOAD;
        }

        if (uri.contains("/api/tramites/crear") || uri.contains("/api/tramites/nuevo")) {
            return RateLimitConfig.RateLimitType.CREATE_TRAMITE;
        }

        if (uri.contains("/search") || uri.contains("/buscar")) {
            return RateLimitConfig.RateLimitType.SEARCH;
        }

        return RateLimitConfig.RateLimitType.API_GENERAL;
    }

    private String getClientKey(HttpServletRequest request) {
        String ip = getClientIP(request);
        String userAgent = request.getHeader("User-Agent");

        String username = request.getRemoteUser();
        if (username != null) {
            return "user:" + username;
        }

        if (userAgent != null) {
            return ip + ":" + userAgent.hashCode();
        }

        return ip;
    }

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
