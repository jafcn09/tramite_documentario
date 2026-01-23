package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@Configuration
public class SecurityHeadersConfig {

    @Bean
    public OncePerRequestFilter securityHeadersFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request,
                                          HttpServletResponse response,
                                          FilterChain filterChain) throws ServletException, IOException {

             
                response.setHeader("Content-Security-Policy",
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; " +
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                    "font-src 'self' https://fonts.gstatic.com; " +
                    "img-src 'self' data: https:; " +
                    "connect-src 'self' ws://localhost:* wss://localhost:*; " +
                    "frame-ancestors 'none'; " +
                    "form-action 'self'; " +
                    "base-uri 'self'");


                response.setHeader("X-Frame-Options", "DENY");

               
                response.setHeader("X-Content-Type-Options", "nosniff");

               
                if (request.isSecure()) {
                    response.setHeader("Strict-Transport-Security",
                        "max-age=31536000; includeSubDomains; preload");
                }

               
                response.setHeader("X-XSS-Protection", "1; mode=block");

                
                response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

               
                response.setHeader("Permissions-Policy",
                    "geolocation=(), " +
                    "microphone=(), " +
                    "camera=(), " +
                    "payment=(), " +
                    "usb=(), " +
                    "magnetometer=(), " +
                    "accelerometer=()");

              
                response.setHeader("X-Permitted-Cross-Domain-Policies", "none");

                response.setHeader("X-Download-Options", "noopen");

           
                if (request.getRequestURI().contains("/api/auth") ||
                    request.getRequestURI().contains("/api/usuarios")) {
                    response.setHeader("Cache-Control",
                        "no-store, no-cache, must-revalidate, private");
                    response.setHeader("Pragma", "no-cache");
                    response.setHeader("Expires", "0");
                }

                filterChain.doFilter(request, response);
            }
        };
    }
}