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

  
        if (limitType == RateLimitConfig.RateLimitType.NO_LIMIT) {
            return true;
        }

        if (!rateLimitConfig.tryConsume(clientKey, limitType)) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            RateLimitConfig.RateLimitStatus status = rateLimitConfig.getRateLimitStatus(clientKey, limitType);

            String message = status.dailyRemaining != null && status.dailyRemaining == 0
                ? String.format("Límite diario excedido. Máximo %d peticiones por día.", status.dailyLimit)
                : String.format("Demasiadas peticiones. Por favor espere antes de intentar nuevamente.");

            String jsonResponse = String.format(
                "{\"error\": \"Too Many Requests\", " +
                "\"message\": \"%s\", " +
                "\"status\": 429, " +
                "\"limitType\": \"%s\", " +
                "\"shortTermLimit\": %d, " +
                "\"shortTermRemaining\": %d, " +
                "\"dailyLimit\": %d, " +
                "\"dailyRemaining\": %s}",
                message,
                limitType.name(),
                status.shortTermLimit,
                status.shortTermRemaining,
                status.dailyLimit,
                status.dailyRemaining != null ? status.dailyRemaining : "null"
            );

            response.getWriter().write(jsonResponse);
            return false;
        }

        RateLimitConfig.RateLimitStatus status = rateLimitConfig.getRateLimitStatus(clientKey, limitType);
        response.setHeader("X-RateLimit-Limit", String.valueOf(status.shortTermLimit));
        response.setHeader("X-RateLimit-Remaining", String.valueOf(status.shortTermRemaining));

        if (status.dailyRemaining != null) {
            response.setHeader("X-RateLimit-Daily-Limit", String.valueOf(status.dailyLimit));
            response.setHeader("X-RateLimit-Daily-Remaining", String.valueOf(status.dailyRemaining));
        }

        return true;
    }

    private RateLimitConfig.RateLimitType determineLimitType(String uri, String method) {
        // Authentication endpoints
        if (uri.contains("/api/auth/login") || uri.contains("/api/auth/signin")) {
            return RateLimitConfig.RateLimitType.LOGIN;
        }
        if (uri.contains("/api/auth/refresh")) {
            return RateLimitConfig.RateLimitType.REFRESH_TOKEN;
        }
        if (uri.contains("/cambiar-clave") || uri.contains("/cambiar-password") || uri.contains("/reset-password")) {
            return RateLimitConfig.RateLimitType.PASSWORD_CHANGE;
        }

    
        if (uri.contains("/api/tramites")) {
            if (uri.contains("/public")) {
                if ("POST".equalsIgnoreCase(method)) {
                    return RateLimitConfig.RateLimitType.PUBLIC_CREATE;
                }
                if (uri.contains("/buscar") || uri.contains("/search")) {
                    return RateLimitConfig.RateLimitType.PUBLIC_SEARCH;
                }
            }

            if ("POST".equalsIgnoreCase(method)) {
                if (uri.contains("/crear") || uri.endsWith("/tramites")) {
                    return RateLimitConfig.RateLimitType.CREATE_TRAMITE;
                }
                if (uri.contains("/archivo") || uri.contains("/documento")) {
                    return RateLimitConfig.RateLimitType.FILE_UPLOAD;
                }
                if (uri.contains("/derivar") || uri.contains("/aprobar") ||
                    uri.contains("/rechazar") || uri.contains("/finalizar") ||
                    uri.contains("/recepcionar") || uri.contains("/responder")) {
                    return RateLimitConfig.RateLimitType.WORKFLOW_TRAMITE;
                }
            }

            if ("PUT".equalsIgnoreCase(method) || "PATCH".equalsIgnoreCase(method)) {
                if (uri.contains("/editar") || uri.contains("/actualizar")) {
                    return RateLimitConfig.RateLimitType.EDIT_TRAMITE;
                }
                return RateLimitConfig.RateLimitType.WORKFLOW_TRAMITE;
            }

            if ("GET".equalsIgnoreCase(method)) {
                if (uri.contains("/buscar") || uri.contains("/search")) {
                    return RateLimitConfig.RateLimitType.SEARCH_TRAMITE;
                }
                if (uri.contains("/descargar") || uri.contains("/download") || uri.contains("/archivo")) {
                    return RateLimitConfig.RateLimitType.FILE_DOWNLOAD;
                }
            }
        }

 
        if (uri.contains("/api/bandeja-tramites")) {
            return RateLimitConfig.RateLimitType.BANDEJA;
        }


        if (uri.contains("/api/notificaciones")) {
            return RateLimitConfig.RateLimitType.NOTIFICATIONS;
        }


        if (uri.contains("/api/usuarios")) {
            if ("POST".equalsIgnoreCase(method)) {
                return RateLimitConfig.RateLimitType.CREATE_USER;
            }
            if ("PUT".equalsIgnoreCase(method) || "PATCH".equalsIgnoreCase(method)) {
                return RateLimitConfig.RateLimitType.UPDATE_USER;
            }
        }


        if (uri.contains("/api/reportes")) {
            if (uri.contains("/resumen") || uri.contains("/summary") ||
                uri.contains("/por-tipo") || uri.contains("/por-area")) {
                return RateLimitConfig.RateLimitType.REPORT_LIGHT;
            }
            return RateLimitConfig.RateLimitType.REPORT_HEAVY;
        }


        if (uri.contains("/api/qr")) {
            return RateLimitConfig.RateLimitType.PUBLIC_QR;
        }

      
        if (uri.contains("/api/areas") || uri.contains("/api/departamentos") ||
            uri.contains("/api/grados") || uri.contains("/api/organigrama") ||
            uri.contains("/api/usuarios/perfil") || uri.contains("/api/auth/validate-token") ||
            uri.contains("/ws/") || uri.contains("/topic/") || uri.contains("/queue/")) {
            return RateLimitConfig.RateLimitType.NO_LIMIT;
        }


        if (uri.contains("/search") || uri.contains("/buscar")) {
            return RateLimitConfig.RateLimitType.SEARCH_TRAMITE;
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
