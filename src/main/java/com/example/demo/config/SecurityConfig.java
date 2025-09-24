package com.example.demo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                // Public endpoints first (order matters!)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/error").permitAll()
                .requestMatchers("/").permitAll()

                // Public endpoints for demo/testing
                .requestMatchers("/api/notificaciones/public/**").permitAll()
                .requestMatchers("/api/activities/public/**").permitAll()
                .requestMatchers("/api/usuarios/public/**").permitAll()

                // Public trámite endpoints (no token required) - MUST come before protected tramites
                .requestMatchers("/api/tramites/public/**").permitAll()

                // Public organigrama endpoints (structural data)
                .requestMatchers("/api/organigrama/**").permitAll()
                
                // WebSocket endpoints
                .requestMatchers("/ws/**").permitAll()
                .requestMatchers("/topic/**").permitAll()
                .requestMatchers("/queue/**").permitAll()
                
                // Protected endpoints requiring authentication (after public ones)
                .requestMatchers("/api/roles/**").authenticated()
                .requestMatchers("/api/usuarios/**").authenticated()
                .requestMatchers("/api/tramites/**").authenticated()
                .requestMatchers("/api/notificaciones/**").authenticated()
                .requestMatchers("/api/bandeja-tramites/**").authenticated()
                .requestMatchers("/api/activities/**").authenticated()
                
                // All other routes require authentication
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow specific origins (frontend URLs)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:4200",    // Angular dev server
            "http://localhost:3000",    // Alternative port
            "http://127.0.0.1:4200",
            "http://127.0.0.1:3000"
        ));
        
        // Allow specific methods
        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        
        // Allow specific headers
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        
        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        // Expose headers that frontend can access
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "Content-Length",
            "X-Requested-With"
        ));
        
        // Set max age for preflight requests
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}