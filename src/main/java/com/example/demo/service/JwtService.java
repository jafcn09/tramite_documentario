package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    
    @Value("${jwt.secret:mySecretKey123456789012345678901234567890}")
    private String secretKey;
    
    @Value("${jwt.expiration:86400000}") // 24 horas en milisegundos
    private long jwtExpiration;
    
    @Value("${jwt.refresh.expiration:604800000}") // 7 días en milisegundos  
    private long refreshExpiration;
    
    // Simplified token generation for now
    public String generateToken(String username, String role, Long userId) {
        // Create a simple token with base64 encoding
        // In a production environment, you'd use proper JWT libraries
        Map<String, Object> payload = new HashMap<>();
        payload.put("username", username);
        payload.put("role", role);
        payload.put("userId", userId);
        payload.put("exp", System.currentTimeMillis() + jwtExpiration);
        payload.put("type", "access");
        
        String payloadJson = mapToJson(payload);
        return Base64.getEncoder().encodeToString(payloadJson.getBytes());
    }
    
    // Generate refresh token
    public String generateRefreshToken(String username, Long userId) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("username", username);
        payload.put("userId", userId);
        payload.put("exp", System.currentTimeMillis() + refreshExpiration);
        payload.put("type", "refresh");
        
        String payloadJson = mapToJson(payload);
        return Base64.getEncoder().encodeToString(payloadJson.getBytes());
    }
    
    public Boolean validateToken(String token, String username) {
        try {
            Map<String, Object> payload = parseToken(token);
            String tokenUsername = (String) payload.get("username");
            Long exp = (Long) payload.get("exp");
            
            return username.equals(tokenUsername) && 
                   exp != null && 
                   System.currentTimeMillis() < exp;
        } catch (Exception e) {
            return false;
        }
    }
    
    public String extractUsername(String token) {
        try {
            Map<String, Object> payload = parseToken(token);
            return (String) payload.get("username");
        } catch (Exception e) {
            return null;
        }
    }
    
    public String extractRole(String token) {
        try {
            Map<String, Object> payload = parseToken(token);
            return (String) payload.get("role");
        } catch (Exception e) {
            return null;
        }
    }
    
    public Long extractUserId(String token) {
        try {
            Map<String, Object> payload = parseToken(token);
            Object userId = payload.get("userId");
            if (userId instanceof Integer) {
                return ((Integer) userId).longValue();
            }
            return (Long) userId;
        } catch (Exception e) {
            return null;
        }
    }
    
    private Map<String, Object> parseToken(String token) {
        try {
            String payloadJson = new String(Base64.getDecoder().decode(token));
            return jsonToMap(payloadJson);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
    }
    
    private String mapToJson(Map<String, Object> map) {
        StringBuilder json = new StringBuilder("{");
        boolean first = true;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (!first) json.append(",");
            json.append("\"").append(entry.getKey()).append("\":\"")
                .append(entry.getValue()).append("\"");
            first = false;
        }
        json.append("}");
        return json.toString();
    }
    
    private Map<String, Object> jsonToMap(String json) {
        Map<String, Object> result = new HashMap<>();
        // Simple JSON parsing - in production use Jackson or similar
        json = json.trim().substring(1, json.length() - 1); // Remove { }
        String[] pairs = json.split(",");
        
        for (String pair : pairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim().replaceAll("\"", "");
                String value = keyValue[1].trim().replaceAll("\"", "");
                
                // Try to parse numbers
                if (key.equals("userId") || key.equals("exp")) {
                    try {
                        result.put(key, Long.parseLong(value));
                    } catch (NumberFormatException e) {
                        result.put(key, value);
                    }
                } else {
                    result.put(key, value);
                }
            }
        }
        return result;
    }
}