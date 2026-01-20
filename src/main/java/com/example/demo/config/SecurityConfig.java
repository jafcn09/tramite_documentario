package com.example.demo.config;

import com.example.demo.config.security.ContentSecurityPolicyConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
    private final ContentSecurityPolicyConfig cspFilter;

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(3) 
                .maxSessionsPreventsLogin(false)
            )
            .authorizeHttpRequests(authz -> authz

                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/error").permitAll()
                .requestMatchers("/").permitAll()

                // Permitir archivos estáticos del frontend sin autenticación
                .requestMatchers("/index.html").permitAll()
                .requestMatchers("/styles.css").permitAll()
                .requestMatchers("/main.js").permitAll()
                .requestMatchers("/polyfills.js").permitAll()
                .requestMatchers("/*.js").permitAll()
                .requestMatchers("/*.css").permitAll()
                .requestMatchers("/assets/**").permitAll()
                .requestMatchers("/favicon.ico").permitAll()

                .requestMatchers("/api/notificaciones/public/**").permitAll()
                .requestMatchers("/api/activities/public/**").permitAll()
                .requestMatchers("/api/usuarios/public/**").permitAll()
                .requestMatchers("/api/test/**").permitAll()
                .requestMatchers("/api/tramites/public/**").permitAll()


                .requestMatchers("/api/qr/image/**").permitAll()
                .requestMatchers("/api/qr/verificar/**").permitAll()


                .requestMatchers("/api/captcha/**").permitAll()

                .requestMatchers("/api/organigrama/**").permitAll()


                .requestMatchers("/api/departamentos/**").permitAll()

                .requestMatchers("/ws/**").permitAll()
                .requestMatchers("/topic/**").permitAll()
                .requestMatchers("/queue/**").permitAll()


                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/swagger-ui.html").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                .requestMatchers("/swagger-resources/**").permitAll()
                .requestMatchers("/webjars/**").permitAll()

                // Permitir acceso público a consulta de grados académicos
                .requestMatchers("/api/grados/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/reportes-grados").permitAll()

                .requestMatchers("/api/roles/**").authenticated()
                .requestMatchers("/api/usuarios/**").authenticated()
                .requestMatchers("/api/tramites/**").authenticated()
                .requestMatchers("/api/notificaciones/**").authenticated()
                .requestMatchers("/api/bandeja-tramites/**").authenticated()
                .requestMatchers("/api/activities/**").authenticated()
                .requestMatchers("/api/cache/**").authenticated()


                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(cspFilter, JwtAuthenticationFilter.class);

        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
        

        configuration.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        
  
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));

        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization",
            "Content-Length",
            "X-Requested-With"
        ));
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