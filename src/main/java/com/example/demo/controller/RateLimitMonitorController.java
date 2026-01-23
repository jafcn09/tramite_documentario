package com.example.demo.controller;

import com.example.demo.config.RateLimitConfig;
import com.example.demo.service.RateLimitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/admin/rate-limits")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${ALLOWED_ORIGINS:http://localhost:4200}")
public class RateLimitMonitorController {

    private final RateLimitService rateLimitService;
    private final RateLimitConfig rateLimitConfig;

  
    @GetMapping("/stats/user/{userId}")
    public ResponseEntity<Map<String, Object>> getUserStats(
            @PathVariable String userId,
            @RequestParam(defaultValue = "API_GENERAL") String limitType) {

        try {
            RateLimitConfig.RateLimitType type = RateLimitConfig.RateLimitType.valueOf(limitType);
            RateLimitService.RateLimitStats stats = rateLimitService.getRateLimitStats(userId, type);

            Map<String, Object> response = new HashMap<>();
            response.put("userId", stats.userId);
            response.put("limitType", stats.limitType);
            response.put("shortTermLimit", stats.shortTermLimit);
            response.put("shortTermRemaining", stats.shortTermRemaining);
            response.put("dailyLimit", stats.dailyLimit);
            response.put("dailyRemaining", stats.dailyRemaining);
            response.put("dailyRequestsUsed", stats.dailyLimit - (stats.dailyRemaining != null ? stats.dailyRemaining : stats.dailyLimit));

            log.info("Retrieved rate limit stats for user: {}", userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting rate limit stats for user {}: ", userId, e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

  
    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getRateLimitConfiguration() {
        Map<String, Object> config = new HashMap<>();

        for (RateLimitConfig.RateLimitType type : RateLimitConfig.RateLimitType.values()) {
            Map<String, Object> typeConfig = new HashMap<>();
            typeConfig.put("shortTermCapacity", type.getCapacity());
            typeConfig.put("shortTermDuration", type.getRefillDuration().toString());
            typeConfig.put("dailyCapacity", type.getDailyCapacity());
            typeConfig.put("hasDailyLimit", type.hasDailyLimit());
            config.put(type.name(), typeConfig);
        }

        return ResponseEntity.ok(config);
    }

    
    @PostMapping("/reset/{userId}")
    public ResponseEntity<Map<String, String>> resetUserLimits(@PathVariable String userId) {
        try {
            rateLimitService.resetUserLimits(userId);
            log.info("Reset rate limits for user: {}", userId);
            return ResponseEntity.ok(Map.of(
                "message", "Límites reseteados exitosamente para el usuario: " + userId,
                "userId", userId
            ));
        } catch (Exception e) {
            log.error("Error resetting rate limits for user {}: ", userId, e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/whitelist/{userId}")
    public ResponseEntity<Map<String, String>> whitelistUser(@PathVariable String userId) {
        try {
            rateLimitService.addToWhitelist(userId);
            log.info("Added user to whitelist: {}", userId);
            return ResponseEntity.ok(Map.of(
                "message", "Usuario agregado a la lista blanca: " + userId,
                "userId", userId
            ));
        } catch (Exception e) {
            log.error("Error whitelisting user {}: ", userId, e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

  
    @DeleteMapping("/whitelist/{userId}")
    public ResponseEntity<Map<String, String>> removeFromWhitelist(@PathVariable String userId) {
        try {
            rateLimitService.removeFromWhitelist(userId);
            log.info("Removed user from whitelist: {}", userId);
            return ResponseEntity.ok(Map.of(
                "message", "Usuario removido de la lista blanca: " + userId,
                "userId", userId
            ));
        } catch (Exception e) {
            log.error("Error removing user from whitelist {}: ", userId, e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

  
    @GetMapping("/whitelist/{userId}")
    public ResponseEntity<Map<String, Object>> checkWhitelist(@PathVariable String userId) {
        try {
            boolean isWhitelisted = rateLimitService.isWhitelisted(userId);
            return ResponseEntity.ok(Map.of(
                "userId", userId,
                "whitelisted", isWhitelisted
            ));
        } catch (Exception e) {
            log.error("Error checking whitelist for user {}: ", userId, e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

   
    @GetMapping("/stats/global")
    public ResponseEntity<Map<String, Object>> getGlobalStats() {
        try {
            Map<String, Object> stats = new HashMap<>();

            int globalRemaining = rateLimitService.getRemainingGlobalRequests();

            Map<String, Long> cacheStats = rateLimitConfig.getCacheStats();

            stats.put("globalDailyRemaining", globalRemaining);
            stats.put("globalDailyLimit", 1000);
            stats.put("activeBuckets", cacheStats.size());
            stats.put("cacheDetails", cacheStats);

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Error getting global stats: ", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/cleanup")
    public ResponseEntity<Map<String, String>> cleanupExpired() {
        try {
            rateLimitConfig.clearExpiredDailyBuckets();
            rateLimitService.cleanupExpiredData();
            log.info("Manual cleanup of expired rate limit data completed");
            return ResponseEntity.ok(Map.of(
                "message", "Limpieza de datos expirados completada exitosamente"
            ));
        } catch (Exception e) {
            log.error("Error during cleanup: ", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

   
    @GetMapping("/stats/by-type")
    public ResponseEntity<Map<String, Object>> getStatsByType() {
        try {
            Map<String, Object> statsByType = new HashMap<>();


            for (RateLimitConfig.RateLimitType type : RateLimitConfig.RateLimitType.values()) {
                Map<String, Object> typeStats = new HashMap<>();
                typeStats.put("name", type.name());
                typeStats.put("shortTermLimit", type.getCapacity());
                typeStats.put("shortTermWindow", type.getRefillDuration().toMillis() + "ms");

                if (type.hasDailyLimit()) {
                    typeStats.put("dailyLimit", type.getDailyCapacity());
                } else {
                    typeStats.put("dailyLimit", "No limit");
                }

                statsByType.put(type.name(), typeStats);
            }

            return ResponseEntity.ok(statsByType);
        } catch (Exception e) {
            log.error("Error getting stats by type: ", e);
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

 
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        try {
            return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Rate Limiting",
                "timestamp", String.valueOf(System.currentTimeMillis())
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "status", "DOWN",
                "error", e.getMessage()
            ));
        }
    }
}