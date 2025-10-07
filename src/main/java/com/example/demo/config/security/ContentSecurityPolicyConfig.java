package com.example.demo.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Configuración de Content Security Policy headers
 * Previene ataques XSS, clickjacking e inyección de código
 */
@Configuration
public class ContentSecurityPolicyConfig extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Content Security Policy - Previene XSS
        response.setHeader("Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: https:; " +
            "font-src 'self' data:; " +
            "connect-src 'self' http://localhost:4200 http://localhost:8081 ws://localhost:8081; " +
            "frame-ancestors 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self'"
        );

        // X-Content-Type-Options - Previene MIME sniffing
        response.setHeader("X-Content-Type-Options", "nosniff");

        // X-Frame-Options - Previene clickjacking
        response.setHeader("X-Frame-Options", "DENY");

        // X-XSS-Protection - Protección XSS del navegador
        response.setHeader("X-XSS-Protection", "1; mode=block");

        // Referrer-Policy - Controla información de referrer
        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

        // Permissions-Policy - Controla APIs del navegador
        response.setHeader("Permissions-Policy",
            "camera=(), microphone=(), geolocation=(), payment=()"
        );

        // Strict-Transport-Security - Fuerza HTTPS (solo en producción)
        // Descomentado en producción con certificado SSL válido
        // response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

        filterChain.doFilter(request, response);
    }
}
