package com.example.demo.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.annotation.RateLimit;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.service.AuthService;
import com.example.demo.service.UsuarioService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    private final UsuarioService usuarioService;
    
    @GetMapping("/status")
    public ResponseEntity<?> status() {
        Map<String, Object> statusData = new HashMap<>();
        statusData.put("status", "Auth service is running");
        statusData.put("endpoints", Arrays.asList("/login", "/refresh", "/validate-token"));
        return ResponseEntity.ok().body(statusData);
    }
    
    @GetMapping("/init")
    public ResponseEntity<?> getInitialTokens() {

        try {
            LoginRequest defaultLogin = new LoginRequest();
            defaultLogin.setUsuario("admin");
            defaultLogin.setPassword("admin123");
            
            LoginResponse response = authService.login(defaultLogin, null);
            
            if (response.getToken() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Could not generate initial tokens. Please check logs.\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{\"error\": \"Error generating initial tokens: " + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletRequest httpRequest) {
        
        try {
            LoginResponse response = authService.login(loginRequest, httpRequest);

            // Si hay token, retornar 200 OK (aunque deba cambiar contraseña)
            if (response.getToken() != null) {
                return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(response);
            }

            // Si no hay token, retornar FORBIDDEN
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .header("Content-Type", "application/json")
                .body(response);
                
        } catch (Exception e) {
            LoginResponse errorResponse = new LoginResponse("Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("Content-Type", "application/json")
                .body(errorResponse);
        }
    }
    
    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                return ResponseEntity.ok().body("{\"valid\": true}");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"valid\": false}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"valid\": false}");
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String refreshToken = authHeader.substring(7);
                LoginResponse response = authService.refreshToken(refreshToken);
                
                if (response.getToken() != null) {
                    return ResponseEntity.ok(response);
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new LoginResponse("Token de refresco no proporcionado"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new LoginResponse("Error al refrescar el token: " + e.getMessage()));
        }
    }
    
    @PostMapping("/extend-password-expiry")
    public ResponseEntity<?> extendPasswordExpiry() {
        try {
            usuarioService.extendPasswordExpiryForAllUsers();
            return ResponseEntity.ok().body("{\"message\": \"Password expiry extended for all users to 48 hours\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{\"error\": \"Error extending password expiry: " + e.getMessage() + "\"}");
        }
    }
}