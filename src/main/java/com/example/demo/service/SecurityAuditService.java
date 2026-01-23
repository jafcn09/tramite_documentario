package com.example.demo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class SecurityAuditService {

    private final RedisTemplate<String, String> redisTemplate;
    private static final String AUDIT_PREFIX = "security:audit:";
    private static final String SUSPICIOUS_PREFIX = "security:suspicious:";
    private static final int SUSPICIOUS_THRESHOLD = 5;

    public enum SecurityEventType {
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        LOGIN_BLOCKED,
        PASSWORD_CHANGED,
        PASSWORD_RESET,
        PRIVILEGE_ESCALATION_ATTEMPT,
        UNAUTHORIZED_ACCESS,
        SUSPICIOUS_ACTIVITY,
        DATA_EXPORT,
        ADMIN_ACTION,
        USER_CREATED,
        USER_DELETED,
        ROLE_CHANGED,
        FILE_UPLOAD,
        SQL_INJECTION_ATTEMPT,
        XSS_ATTEMPT,
        PATH_TRAVERSAL_ATTEMPT,
        BRUTE_FORCE_DETECTED,
        SESSION_HIJACK_ATTEMPT,
        API_KEY_GENERATED,
        WHITELIST_MODIFIED,
        CONFIGURATION_CHANGED
    }

   
    public void logSecurityEvent(SecurityEventType eventType, String userId,
                                 String details, HttpServletRequest request) {
        try {
            SecurityEvent event = SecurityEvent.builder()
                .eventType(eventType)
                .userId(userId)
                .details(details)
                .ipAddress(getClientIp(request))
                .userAgent(request.getHeader("User-Agent"))
                .requestUri(request.getRequestURI())
                .httpMethod(request.getMethod())
                .timestamp(LocalDateTime.now())
                .sessionId(request.getSession(false) != null ?
                          request.getSession(false).getId() : null)
                .build();

            // Guardar en Redis
            String key = AUDIT_PREFIX + eventType.name() + ":" + System.currentTimeMillis();
            redisTemplate.opsForValue().set(key, event.toJson(), 30, TimeUnit.DAYS);

            // Log críticos
            if (isCriticalEvent(eventType)) {
                log.error("CRITICAL SECURITY EVENT: {} - User: {} - IP: {} - Details: {}",
                    eventType, userId, event.ipAddress, details);

                // Incrementar contador de eventos sospechosos
                trackSuspiciousActivity(userId, event.ipAddress, eventType);
            } else {
                log.info("Security Event: {} - User: {} - Details: {}", eventType, userId, details);
            }

        } catch (Exception e) {
            log.error("Error logging security event: ", e);
        }
    }


    private void trackSuspiciousActivity(String userId, String ipAddress, SecurityEventType eventType) {
        String key = SUSPICIOUS_PREFIX + ipAddress;
        Long count = redisTemplate.opsForValue().increment(key);

        if (count == 1) {
            redisTemplate.expire(key, 1, TimeUnit.HOURS);
        }

        if (count >= SUSPICIOUS_THRESHOLD) {
            log.error("ALERT: Suspicious activity threshold exceeded for IP: {} - Count: {}", ipAddress, count);
            // Aquí podrías enviar alertas por email o bloquear la IP
            notifySecurityTeam(ipAddress, userId, eventType, count);
        }
    }


    private boolean isCriticalEvent(SecurityEventType eventType) {
        return Set.of(
            SecurityEventType.PRIVILEGE_ESCALATION_ATTEMPT,
            SecurityEventType.UNAUTHORIZED_ACCESS,
            SecurityEventType.SQL_INJECTION_ATTEMPT,
            SecurityEventType.XSS_ATTEMPT,
            SecurityEventType.PATH_TRAVERSAL_ATTEMPT,
            SecurityEventType.BRUTE_FORCE_DETECTED,
            SecurityEventType.SESSION_HIJACK_ATTEMPT,
            SecurityEventType.SUSPICIOUS_ACTIVITY
        ).contains(eventType);
    }


    public List<SecurityEvent> getRecentSecurityEvents(int limit) {
        Set<String> keys = redisTemplate.keys(AUDIT_PREFIX + "*");
        if (keys == null || keys.isEmpty()) {
            return new ArrayList<>();
        }

        return keys.stream()
            .sorted(Comparator.reverseOrder())
            .limit(limit)
            .map(key -> {
                String json = redisTemplate.opsForValue().get(key);
                return SecurityEvent.fromJson(json);
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }

 
    public Map<String, Object> getSecurityStats() {
        Map<String, Object> stats = new HashMap<>();

        // Contar eventos por tipo
        for (SecurityEventType type : SecurityEventType.values()) {
            Set<String> keys = redisTemplate.keys(AUDIT_PREFIX + type.name() + ":*");
            stats.put(type.name(), keys != null ? keys.size() : 0);
        }

        // IPs sospechosas
        Set<String> suspiciousIps = redisTemplate.keys(SUSPICIOUS_PREFIX + "*");
        stats.put("suspiciousIps", suspiciousIps != null ? suspiciousIps.size() : 0);

        return stats;
    }


    public boolean detectSQLInjection(String input) {
        if (input == null) return false;

        String[] sqlPatterns = {
            "(?i).*([';\"]+|(--)+|(/\\*)+|(\\*/)+|(xp_)|(sp_)|(exec(\\s|\\+)+(\\(|xp_|sp_))).+",
            "(?i).*(union|select|insert|update|delete|drop|create|alter|exec|script|javascript|onload).+",
            "(?i).*(\\b(select|union|insert|update|delete|drop|create|alter|exec|execute|declare|table|from|where)\\b).+",
            "(?i).*(<script[^>]*>.*?</script>).+"
        };

        for (String pattern : sqlPatterns) {
            if (input.matches(pattern)) {
                log.error("SQL Injection attempt detected: {}", input);
                return true;
            }
        }
        return false;
    }

 
    public boolean detectPathTraversal(String path) {
        if (path == null) return false;

        String[] traversalPatterns = {
            ".*\\.\\.[\\\\/].*",
            ".*\\.\\.%2[fF].*",
            ".*\\.\\.%5[cC].*",
            ".*%2[eE]%2[eE].*",
            ".*\\.\\./.*",
            ".*\\.\\\\.*"
        };

        for (String pattern : traversalPatterns) {
            if (path.matches(pattern)) {
                log.error("Path traversal attempt detected: {}", path);
                return true;
            }
        }
        return false;
    }

  
    public boolean validateHeaders(HttpServletRequest request) {
        // Verificar headers sospechosos
        String[] dangerousHeaders = {
            "X-Forwarded-Host", "X-Original-URL", "X-Rewrite-URL"
        };

        for (String header : dangerousHeaders) {
            String value = request.getHeader(header);
            if (value != null && (value.contains("..") || value.contains("://") || value.length() > 255)) {
                log.warn("Suspicious header detected: {} = {}", header, value);
                return false;
            }
        }

        return true;
    }


    private void notifySecurityTeam(String ipAddress, String userId,
                                   SecurityEventType eventType, Long count) {
        // TODO: Implementar notificación por email/Slack
        log.error("SECURITY ALERT NOTIFICATION: IP {} has {} suspicious events. Last event: {} for user: {}",
            ipAddress, count, eventType, userId);
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

    public static class SecurityEvent {
        public final SecurityEventType eventType;
        public final String userId;
        public final String details;
        public final String ipAddress;
        public final String userAgent;
        public final String requestUri;
        public final String httpMethod;
        public final LocalDateTime timestamp;
        public final String sessionId;

        private SecurityEvent(Builder builder) {
            this.eventType = builder.eventType;
            this.userId = builder.userId;
            this.details = builder.details;
            this.ipAddress = builder.ipAddress;
            this.userAgent = builder.userAgent;
            this.requestUri = builder.requestUri;
            this.httpMethod = builder.httpMethod;
            this.timestamp = builder.timestamp;
            this.sessionId = builder.sessionId;
        }

        public String toJson() {
            return String.format(
                "{\"eventType\":\"%s\",\"userId\":\"%s\",\"details\":\"%s\",\"ipAddress\":\"%s\"," +
                "\"userAgent\":\"%s\",\"requestUri\":\"%s\",\"httpMethod\":\"%s\",\"timestamp\":\"%s\"," +
                "\"sessionId\":\"%s\"}",
                eventType, userId, details, ipAddress, userAgent, requestUri, httpMethod,
                timestamp.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME), sessionId
            );
        }

        public static SecurityEvent fromJson(String json) {
            // Implementación simplificada
            return null;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private SecurityEventType eventType;
            private String userId;
            private String details;
            private String ipAddress;
            private String userAgent;
            private String requestUri;
            private String httpMethod;
            private LocalDateTime timestamp;
            private String sessionId;

            public Builder eventType(SecurityEventType eventType) {
                this.eventType = eventType;
                return this;
            }

            public Builder userId(String userId) {
                this.userId = userId;
                return this;
            }

            public Builder details(String details) {
                this.details = details;
                return this;
            }

            public Builder ipAddress(String ipAddress) {
                this.ipAddress = ipAddress;
                return this;
            }

            public Builder userAgent(String userAgent) {
                this.userAgent = userAgent;
                return this;
            }

            public Builder requestUri(String requestUri) {
                this.requestUri = requestUri;
                return this;
            }

            public Builder httpMethod(String httpMethod) {
                this.httpMethod = httpMethod;
                return this;
            }

            public Builder timestamp(LocalDateTime timestamp) {
                this.timestamp = timestamp;
                return this;
            }

            public Builder sessionId(String sessionId) {
                this.sessionId = sessionId;
                return this;
            }

            public SecurityEvent build() {
                return new SecurityEvent(this);
            }
        }
    }
}