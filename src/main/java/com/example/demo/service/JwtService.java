package com.example.demo.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
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
    
    public String generateToken(String username, String role, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("userId", userId);
        claims.put("type", "access");
        
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey())
                .compact();
    }
    
    public String generateRefreshToken(String username, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("type", "refresh");
        
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + refreshExpiration))
                .signWith(getSigningKey())
                .compact();
    }
    
    public Boolean validateToken(String token, String username) {
        try {
            Claims claims = extractAllClaims(token);
            String tokenUsername = claims.getSubject();
            Date expiration = claims.getExpiration();
            
            return username.equals(tokenUsername) && 
                   expiration != null && 
                   !expiration.before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
    
    public String extractUsername(String token) {
        try {
            return extractAllClaims(token).getSubject();
        } catch (Exception e) {
            return null;
        }
    }
    
    public String extractRole(String token) {
        try {
            return extractAllClaims(token).get("role", String.class);
        } catch (Exception e) {
            return null;
        }
    }
    
    public Long extractUserId(String token) {
        try {
            Claims claims = extractAllClaims(token);
            Object userId = claims.get("userId");
            if (userId instanceof Integer) {
                return ((Integer) userId).longValue();
            }
            return (Long) userId;
        } catch (Exception e) {
            return null;
        }
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
}