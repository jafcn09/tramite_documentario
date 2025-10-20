package com.example.demo.controller;

import com.example.demo.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * Controlador público para testing de cache y sesiones
 * Autor: Jhafet Cánepa
 * Universidad Nacional de Tumbes
 */
@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
@Slf4j
public class CacheTestController {

    private final CacheService cacheService;

    /**
     * Endpoint público para probar que Redis está funcionando
     */
    @GetMapping("/redis/status")
    public ResponseEntity<Map<String, Object>> getRedisStatus() {
        Map<String, Object> status = new HashMap<>();

        try {
            // Probar escribir y leer del cache
            String testKey = "test:connection";
            String testValue = "Redis is working - " + System.currentTimeMillis();

            cacheService.set(testKey, testValue, Duration.ofMinutes(1));
            Object retrievedValue = cacheService.get(testKey);

            status.put("redis_connected", true);
            status.put("write_test", "success");
            status.put("read_test", retrievedValue != null ? "success" : "failed");
            status.put("cache_size", cacheService.getCacheSize());
            status.put("test_value", retrievedValue);

            // Limpiar el test
            cacheService.delete(testKey);

            log.info("Redis status check completed successfully");
            return ResponseEntity.ok(status);

        } catch (Exception e) {
            status.put("redis_connected", false);
            status.put("error", e.getMessage());

            log.error("Redis status check failed", e);
            return ResponseEntity.internalServerError().body(status);
        }
    }

    /**
     * Endpoint público para probar sesiones
     */
    @GetMapping("/session/test")
    public ResponseEntity<Map<String, Object>> testSession(HttpSession session) {
        Map<String, Object> sessionInfo = new HashMap<>();

        sessionInfo.put("session_id", session.getId());
        sessionInfo.put("is_new", session.isNew());
        sessionInfo.put("creation_time", session.getCreationTime());
        sessionInfo.put("last_accessed", session.getLastAccessedTime());
        sessionInfo.put("max_interval", session.getMaxInactiveInterval());

        // Incrementar contador de visitas
        Integer visitCount = (Integer) session.getAttribute("visit_count");
        if (visitCount == null) {
            visitCount = 1;
        } else {
            visitCount++;
        }
        session.setAttribute("visit_count", visitCount);
        sessionInfo.put("visit_count", visitCount);

        log.debug("Session test - ID: {}, Visits: {}", session.getId(), visitCount);
        return ResponseEntity.ok(sessionInfo);
    }

    /**
     * Endpoint para probar cache con diferentes TTL
     */
    @PostMapping("/cache/set")
    public ResponseEntity<Map<String, Object>> setCacheValue(
            @RequestParam String key,
            @RequestParam String value,
            @RequestParam(defaultValue = "300") int ttlSeconds) {

        Map<String, Object> response = new HashMap<>();

        try {
            Duration ttl = Duration.ofSeconds(ttlSeconds);
            cacheService.set(key, value, ttl);

            response.put("success", true);
            response.put("key", key);
            response.put("value", value);
            response.put("ttl_seconds", ttlSeconds);
            response.put("cache_size", cacheService.getCacheSize());

            log.debug("Cache value set - Key: {}, TTL: {}s", key, ttlSeconds);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());

            log.error("Error setting cache value for key: {}", key, e);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Endpoint para obtener valor del cache
     */
    @GetMapping("/cache/get")
    public ResponseEntity<Map<String, Object>> getCacheValue(@RequestParam String key) {
        Map<String, Object> response = new HashMap<>();

        try {
            Object value = cacheService.get(key);
            boolean exists = cacheService.exists(key);

            response.put("key", key);
            response.put("value", value);
            response.put("exists", exists);
            response.put("found", value != null);

            log.debug("Cache value retrieved - Key: {}, Found: {}", key, value != null);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());

            log.error("Error getting cache value for key: {}", key, e);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Endpoint para obtener estadísticas del cache
     */
    @GetMapping("/cache/stats")
    public ResponseEntity<Map<String, Object>> getCacheStats() {
        Map<String, Object> stats = new HashMap<>();

        try {
            stats.put("total_keys", cacheService.getCacheSize());
            stats.put("status", "active");
            stats.put("timestamp", System.currentTimeMillis());

            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            stats.put("error", e.getMessage());
            stats.put("status", "error");

            log.error("Error getting cache stats", e);
            return ResponseEntity.internalServerError().body(stats);
        }
    }
}