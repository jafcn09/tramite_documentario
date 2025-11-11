package com.example.demo.config.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Configuración de Content Security Policy headers
 * Previene ataques XSS, clickjacking e inyección de código
 */
@Configuration
public class ContentSecurityPolicyConfig extends OncePerRequestFilter {

    @Value("${app.url:http://localhost:4200}")
    private String appUrl;

    @Value("${server.port:8081}")
    private String serverPort;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        response.setHeader("Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: https:; " +
            "font-src 'self' data:; " +
            "connect-src 'self' " + appUrl + " http://localhost:" + serverPort + " ws://localhost:" + serverPort + "; " +
            "frame-src 'self' blob:; " +
            "frame-ancestors 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self'"
        );

        response.setHeader("X-Content-Type-Options", "nosniff");


        response.setHeader("X-Frame-Options", "DENY");

    
        response.setHeader("X-XSS-Protection", "1; mode=block");

        response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

        response.setHeader("Permissions-Policy",
            "camera=(), microphone=(), geolocation=(), payment=()"
        );


        filterChain.doFilter(request, response);
    }
}
