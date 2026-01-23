package com.example.demo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class IPBlockingService {

    private final RedisTemplate<String, String> redisTemplate;
    private final SecurityAuditService securityAuditService;

    private static final String BLOCKED_IP_PREFIX = "security:blocked:ip:";
    private static final String TEMP_BLOCKED_PREFIX = "security:temp_blocked:ip:";
    private static final String FAILED_ATTEMPTS_PREFIX = "security:failed:ip:";
    private static final String WHITELIST_IP_PREFIX = "security:whitelist:ip:";

    // Thresholds
    private static final int MAX_FAILED_ATTEMPTS = 10;
    private static final int TEMP_BLOCK_DURATION_MINUTES = 30;
    private static final int PERM_BLOCK_THRESHOLD = 3; 
    public boolean isBlocked(String ipAddress) {
        // Check whitelist first
        if (isWhitelisted(ipAddress)) {
            return false;
        }

        // Check permanent block
        if (Boolean.TRUE.equals(redisTemplate.hasKey(BLOCKED_IP_PREFIX + ipAddress))) {
            log.warn("Blocked IP attempted access: {}", ipAddress);
            return true;
        }

        // Check temporary block
        if (Boolean.TRUE.equals(redisTemplate.hasKey(TEMP_BLOCKED_PREFIX + ipAddress))) {
            log.warn("Temporarily blocked IP attempted access: {}", ipAddress);
            return true;
        }

        return false;
    }


    public void recordFailedAttempt(String ipAddress, String reason) {
        String key = FAILED_ATTEMPTS_PREFIX + ipAddress;
        Long attempts = redisTemplate.opsForValue().increment(key);

        if (attempts == 1) {
            redisTemplate.expire(key, 1, TimeUnit.HOURS);
        }

        log.info("Failed attempt #{} from IP: {} - Reason: {}", attempts, ipAddress, reason);

        // Auto-block after threshold
        if (attempts >= MAX_FAILED_ATTEMPTS) {
            temporarilyBlockIP(ipAddress, "Exceeded maximum failed attempts: " + attempts);
        }
    }


    public void temporarilyBlockIP(String ipAddress, String reason) {
        String tempKey = TEMP_BLOCKED_PREFIX + ipAddress;
        String blockCountKey = TEMP_BLOCKED_PREFIX + "count:" + ipAddress;

        // Increment block count
        Long blockCount = redisTemplate.opsForValue().increment(blockCountKey);
        if (blockCount == 1) {
            redisTemplate.expire(blockCountKey, 24, TimeUnit.HOURS);
        }

        // Check if should permanently block
        if (blockCount >= PERM_BLOCK_THRESHOLD) {
            permanentlyBlockIP(ipAddress, "Exceeded temporary block threshold: " + blockCount);
            return;
        }

        // Apply temporary block
        redisTemplate.opsForValue().set(tempKey, reason, TEMP_BLOCK_DURATION_MINUTES, TimeUnit.MINUTES);

        // Clear failed attempts
        redisTemplate.delete(FAILED_ATTEMPTS_PREFIX + ipAddress);

        log.warn("IP temporarily blocked for {} minutes: {} - Reason: {}",
            TEMP_BLOCK_DURATION_MINUTES, ipAddress, reason);

        // Log security event
        securityAuditService.logSecurityEvent(
            SecurityAuditService.SecurityEventType.SUSPICIOUS_ACTIVITY,
            "system",
            "IP temporarily blocked: " + reason,
            createMockRequest(ipAddress)
        );
    }

  
    public void permanentlyBlockIP(String ipAddress, String reason) {
        String key = BLOCKED_IP_PREFIX + ipAddress;
        String value = String.format("%s|%s", reason, LocalDateTime.now());

        redisTemplate.opsForValue().set(key, value);

        // Clear any temporary blocks
        redisTemplate.delete(TEMP_BLOCKED_PREFIX + ipAddress);
        redisTemplate.delete(FAILED_ATTEMPTS_PREFIX + ipAddress);

        log.error("IP PERMANENTLY BLOCKED: {} - Reason: {}", ipAddress, reason);

        // Log security event
        securityAuditService.logSecurityEvent(
            SecurityAuditService.SecurityEventType.BRUTE_FORCE_DETECTED,
            "system",
            "IP permanently blocked: " + reason,
            createMockRequest(ipAddress)
        );
    }


    public void unblockIP(String ipAddress) {
        redisTemplate.delete(BLOCKED_IP_PREFIX + ipAddress);
        redisTemplate.delete(TEMP_BLOCKED_PREFIX + ipAddress);
        redisTemplate.delete(FAILED_ATTEMPTS_PREFIX + ipAddress);
        redisTemplate.delete(TEMP_BLOCKED_PREFIX + "count:" + ipAddress);

        log.info("IP unblocked: {}", ipAddress);
    }


    public void whitelistIP(String ipAddress, String reason) {
        String key = WHITELIST_IP_PREFIX + ipAddress;
        redisTemplate.opsForValue().set(key, reason);
        log.info("IP whitelisted: {} - Reason: {}", ipAddress, reason);
    }

  
    public boolean isWhitelisted(String ipAddress) {
        // Always whitelist localhost
        if ("127.0.0.1".equals(ipAddress) || "0:0:0:0:0:0:0:1".equals(ipAddress)) {
            return true;
        }

        return Boolean.TRUE.equals(redisTemplate.hasKey(WHITELIST_IP_PREFIX + ipAddress));
    }


    public Map<String, Object> getBlockedIPs() {
        Map<String, Object> result = new HashMap<>();

        // Permanent blocks
        Set<String> permanentKeys = redisTemplate.keys(BLOCKED_IP_PREFIX + "*");
        if (permanentKeys != null) {
            Map<String, String> permanentBlocks = permanentKeys.stream()
                .collect(Collectors.toMap(
                    key -> key.replace(BLOCKED_IP_PREFIX, ""),
                    key -> redisTemplate.opsForValue().get(key)
                ));
            result.put("permanent", permanentBlocks);
        }

        // Temporary blocks
        Set<String> tempKeys = redisTemplate.keys(TEMP_BLOCKED_PREFIX + "*");
        if (tempKeys != null) {
            Map<String, String> tempBlocks = tempKeys.stream()
                .filter(key -> !key.contains("count:"))
                .collect(Collectors.toMap(
                    key -> key.replace(TEMP_BLOCKED_PREFIX, ""),
                    key -> {
                        String reason = redisTemplate.opsForValue().get(key);
                        Long ttl = redisTemplate.getExpire(key, TimeUnit.MINUTES);
                        return reason + " (expires in " + ttl + " minutes)";
                    }
                ));
            result.put("temporary", tempBlocks);
        }

        // Failed attempts
        Set<String> failedKeys = redisTemplate.keys(FAILED_ATTEMPTS_PREFIX + "*");
        if (failedKeys != null) {
            Map<String, String> failedAttempts = failedKeys.stream()
                .collect(Collectors.toMap(
                    key -> key.replace(FAILED_ATTEMPTS_PREFIX, ""),
                    key -> redisTemplate.opsForValue().get(key) + " attempts"
                ));
            result.put("failedAttempts", failedAttempts);
        }

        return result;
    }


    public boolean detectDDoSPattern(String ipAddress, HttpServletRequest request) {
        String key = "ddos:detection:" + ipAddress;
        Long requests = redisTemplate.opsForValue().increment(key);

        if (requests == 1) {
            redisTemplate.expire(key, 1, TimeUnit.MINUTES);
        }

        // Si más de 100 requests por minuto desde la misma IP
        if (requests > 100) {
            log.error("Possible DDoS attack detected from IP: {} - {} requests/minute", ipAddress, requests);
            temporarilyBlockIP(ipAddress, "DDoS pattern detected: " + requests + " requests/minute");
            return true;
        }

        return false;
    }

    public boolean detectMaliciousBot(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        if (userAgent == null) return false;

        String[] maliciousBots = {
            "sqlmap", "nikto", "nessus", "metasploit", "burp",
            "havij", "acunetix", "nmap", "masscan", "zgrab",
            "python-requests", "curl", "wget" // Bloquear si no es navegador legítimo
        };

        for (String bot : maliciousBots) {
            if (userAgent.toLowerCase().contains(bot)) {
                String ip = getClientIp(request);
                log.error("Malicious bot detected: {} from IP: {}", bot, ip);
                temporarilyBlockIP(ip, "Malicious bot detected: " + bot);
                return true;
            }
        }

        return false;
    }


    @Scheduled(cron = "0 0 * * * *") // Cada hora
    public void cleanupExpiredBlocks() {
        log.info("Running IP blocking cleanup task");

        // Limpiar contadores antiguos
        Set<String> failedKeys = redisTemplate.keys(FAILED_ATTEMPTS_PREFIX + "*");
        if (failedKeys != null) {
            for (String key : failedKeys) {
                Long ttl = redisTemplate.getExpire(key, TimeUnit.SECONDS);
                if (ttl != null && ttl <= 0) {
                    redisTemplate.delete(key);
                }
            }
        }

        log.info("IP blocking cleanup completed");
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

    private HttpServletRequest createMockRequest(String ipAddress) {
        // Crear un request mock para logging
        return new MockHttpServletRequest(ipAddress);
    }

  
    private static class MockHttpServletRequest extends jakarta.servlet.http.HttpServletRequestWrapper {
        private final String ipAddress;

        public MockHttpServletRequest(String ipAddress) {
            super(null);
            this.ipAddress = ipAddress;
        }

        @Override
        public String getRemoteAddr() {
            return ipAddress;
        }

        @Override
        public String getRequestURI() {
            return "/system/auto-block";
        }

        @Override
        public String getMethod() {
            return "SYSTEM";
        }
    }
}