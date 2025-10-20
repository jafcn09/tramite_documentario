package com.example.demo.controller;

import com.example.demo.service.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/cache")
@RequiredArgsConstructor
@Slf4j
public class CacheController {

    private final CacheService cacheService;

    // Información del cache (solo administradores)
    @GetMapping("/info")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getCacheInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("cacheSize", cacheService.getCacheSize());
        info.put("status", "active");

        log.info("Cache info requested - Size: {}", cacheService.getCacheSize());
        return ResponseEntity.ok(info);
    }

   // Limpiar todo el cache (solo administradores)
    @DeleteMapping("/clear")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> clearCache() {
        try {
            cacheService.clearAllCache();
            log.info("Cache cleared by admin");

            Map<String, String> response = new HashMap<>();
            response.put("message", "Cache cleared successfully");
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error clearing cache", e);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Error clearing cache");
            response.put("status", "error");

            return ResponseEntity.internalServerError().body(response);
        }
    }

 // Información de sesión actual
    @GetMapping("/session/info")
    public ResponseEntity<Map<String, Object>> getSessionInfo(HttpSession session) {
        Map<String, Object> sessionInfo = new HashMap<>();

        sessionInfo.put("sessionId", session.getId());
        sessionInfo.put("creationTime", session.getCreationTime());
        sessionInfo.put("lastAccessedTime", session.getLastAccessedTime());
        sessionInfo.put("maxInactiveInterval", session.getMaxInactiveInterval());
        sessionInfo.put("isNew", session.isNew());

        log.debug("Session info requested - ID: {}", session.getId());
        return ResponseEntity.ok(sessionInfo);
    }

    /**
     * Invalidar sesión actual
     */
    @DeleteMapping("/session/invalidate")
    public ResponseEntity<Map<String, String>> invalidateSession(HttpSession session) {
        try {
            String sessionId = session.getId();
            session.invalidate();

            log.info("Session invalidated - ID: {}", sessionId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Session invalidated successfully");
            response.put("status", "success");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error invalidating session", e);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Error invalidating session");
            response.put("status", "error");

            return ResponseEntity.internalServerError().body(response);
        }
    }

  
    @PostMapping("/session/attribute")
    public ResponseEntity<Map<String, String>> setSessionAttribute(
            @RequestParam String key,
            @RequestParam String value,
            HttpSession session) {

        session.setAttribute(key, value);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Session attribute set successfully");
        response.put("key", key);
        response.put("value", value);
        response.put("sessionId", session.getId());

        log.debug("Session attribute set - Key: {}, Value: {}, Session: {}", key, value, session.getId());
        return ResponseEntity.ok(response);
    }

   
    // Obtener un atributo de sesión
    @GetMapping("/session/attribute")
    public ResponseEntity<Map<String, Object>> getSessionAttribute(
            @RequestParam String key,
            HttpSession session) {

        Object value = session.getAttribute(key);

        Map<String, Object> response = new HashMap<>();
        response.put("key", key);
        response.put("value", value);
        response.put("sessionId", session.getId());
        response.put("found", value != null);

        log.debug("Session attribute requested - Key: {}, Found: {}, Session: {}", key, value != null, session.getId());
        return ResponseEntity.ok(response);
    }
}