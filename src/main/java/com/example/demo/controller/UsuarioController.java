package com.example.demo.controller;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.CreateUsuarioRequest;
import com.example.demo.dto.UpdateUsuarioRequest;
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.service.JwtService;
import com.example.demo.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<List<UsuarioResponse>> getAllUsuarios() {
        List<UsuarioResponse> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO') or @usuarioController.isOwnerOrAdmin(#id, authentication)")
    public ResponseEntity<?> getUsuarioById(@PathVariable Long id) {
        try {
            return usuarioService.getUsuarioById(id)
                    .map(usuario -> ResponseEntity.ok(usuario))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtener usuario: " + e.getMessage()));
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getCurrentUserProfile(HttpServletRequest request) {
        try {
            Long userId = extractUserIdFromToken(request);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token inválido"));
            }
            
            return usuarioService.getUsuarioById(userId)
                    .map(usuario -> ResponseEntity.ok(usuario))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al obtener perfil: " + e.getMessage()));
        }
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<?> createUsuario(@Valid @RequestBody CreateUsuarioRequest request) {
        try {
            UsuarioResponse usuario = usuarioService.createUsuario(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al crear usuario: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO') or @usuarioController.isOwnerOrAdmin(#id, authentication)")
    public ResponseEntity<?> updateUsuario(
            @PathVariable Long id, 
            @Valid @RequestBody UpdateUsuarioRequest request) {
        try {
            UsuarioResponse usuario = usuarioService.updateUsuario(id, request);
            return ResponseEntity.ok(usuario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar usuario: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/change-password")
    @PreAuthorize("@usuarioController.isOwnerOrAdmin(#id, authentication)")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @Valid @RequestBody ChangePasswordRequest request) {
        try {
            usuarioService.changePassword(id, request);
            return ResponseEntity.ok(Map.of("message", "Contraseña cambiada exitosamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al cambiar contraseña: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/enable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> enableAccount(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        try {
            String reason = body != null ? body.get("reason") : "Habilitada por administrador";
            usuarioService.enableAccount(id, reason);
            return ResponseEntity.ok(Map.of("message", "Cuenta habilitada exitosamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al habilitar cuenta: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/disable")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> disableAccount(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        try {
            String reason = body != null ? body.get("reason") : "Deshabilitada por administrador";
            usuarioService.disableAccount(id, reason);
            return ResponseEntity.ok(Map.of("message", "Cuenta deshabilitada exitosamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al deshabilitar cuenta: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/lock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> lockAccount(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        try {
            String reason = body != null ? body.get("reason") : "Bloqueada por administrador";
            usuarioService.lockAccount(id, reason);
            return ResponseEntity.ok(Map.of("message", "Cuenta bloqueada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al bloquear cuenta: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/unlock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> unlockAccount(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        try {
            String reason = body != null ? body.get("reason") : "Desbloqueada por administrador";
            usuarioService.unlockAccount(id, reason);
            return ResponseEntity.ok(Map.of("message", "Cuenta desbloqueada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al desbloquear cuenta: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        try {
            usuarioService.deleteUsuario(id);
            return ResponseEntity.ok(Map.of("message", "Usuario eliminado exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar usuario: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}/password-expired")
    @PreAuthorize("@usuarioController.isOwnerOrAdmin(#id, authentication)")
    public ResponseEntity<?> isPasswordExpired(@PathVariable Long id) {
        try {
            boolean expired = usuarioService.isPasswordExpired(id);
            return ResponseEntity.ok(Map.of("expired", expired));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al verificar expiración: " + e.getMessage()));
        }
    }
    
    // Helper methods
    public boolean isOwnerOrAdmin(Long userId, org.springframework.security.core.Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return false;
        }
        
        // Check if user has admin role
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN") || 
                                auth.getAuthority().equals("ROLE_ADMINISTRATIVO"));
        
        if (isAdmin) {
            return true;
        }
        
        // Check if user is the owner
        try {
            String token = getCurrentToken();
            if (token != null) {
                Long tokenUserId = jwtService.extractUserId(token);
                return userId.equals(tokenUserId);
            }
        } catch (Exception e) {
            // Log error but continue
        }
        
        return false;
    }
    
    private Long extractUserIdFromToken(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);
        if (token != null) {
            return jwtService.extractUserId(token);
        }
        return null;
    }
    
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    
    private String getCurrentToken() {
        try {
            org.springframework.web.context.request.RequestAttributes requestAttributes = 
                org.springframework.web.context.request.RequestContextHolder.getRequestAttributes();
            if (requestAttributes instanceof org.springframework.web.context.request.ServletRequestAttributes) {
                jakarta.servlet.http.HttpServletRequest request = 
                    ((org.springframework.web.context.request.ServletRequestAttributes) requestAttributes).getRequest();
                
                String jwt = (String) request.getAttribute("jwt_token");
                if (jwt != null) {
                    return jwt;
                }
                
                return extractTokenFromRequest(request);
            }
        } catch (Exception e) {
            // Log error but continue
        }
        return null;
    }
}