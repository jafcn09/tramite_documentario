package com.example.demo.config;

import com.example.demo.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtService jwtService;
    
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        
        log.debug("Processing request to: {}", request.getRequestURI());
        log.debug("Authorization header present: {}", authHeader != null);
        
        // If no auth header, continue without authentication
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.debug("No Bearer token found, continuing without authentication");
            filterChain.doFilter(request, response);
            return;
        }
        
        try {
            final String jwt = authHeader.substring(7);
            final String username = jwtService.extractUsername(jwt);
            
            log.debug("Extracted username from token: {}", username);
            
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                if (jwtService.validateToken(jwt, username)) {
                    String role = jwtService.extractRole(jwt);
                    log.debug("Token validated successfully for user: {} with role: {}", username, role);
                    
                    List<GrantedAuthority> authorities = new ArrayList<>();
                    if (role != null) {
                        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
                    }
                    
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            username, null, authorities);
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                    // Store token in request for later use
                    request.setAttribute("jwt_token", jwt);
                    log.debug("Authentication set in SecurityContext");
                } else {
                    log.warn("Token validation failed for user: {}", username);
                    // Clear context but let Spring Security handle the 403
                    SecurityContextHolder.clearContext();
                }
            }
        } catch (Exception e) {
            log.error("Error processing JWT token: {}", e.getMessage());
            // Clear context but continue - Spring Security will handle authorization
            SecurityContextHolder.clearContext();
        }
        
        filterChain.doFilter(request, response);
    }
    
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        // Auth routes are already configured as public in SecurityConfig
        boolean shouldNotFilter = path.startsWith("/api/auth/") || 
                                 path.equals("/error") ||
                                 path.equals("/") ||
                                 path.startsWith("/public/") ||
                                 path.startsWith("/static/");
        
        log.debug("Should not filter path {}: {}", path, shouldNotFilter);
        return shouldNotFilter;
    }
}