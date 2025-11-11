package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.model.LoginAttempt;
import com.example.demo.model.Role;
import com.example.demo.model.Usuario;
import com.example.demo.repository.LoginAttemptRepository;
import com.example.demo.repository.UsuarioRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioRepository usuarioRepository;
    private final LoginAttemptRepository loginAttemptRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsuarioService usuarioService;
    
    private static final int MAX_ATTEMPTS_BEFORE_TEMP_LOCK = 5;
    private static final int MAX_ATTEMPTS_BEFORE_PERMANENT_LOCK = 10;
    private static final int TEMP_LOCK_MINUTES = 30;
    private static final int PERMANENT_LOCK_HOURS = 48;
    
    public LoginResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        String usernameOrEmail = request.getUsuario();
        String ipAddress = getClientIpAddress(httpRequest);
        
        try {
            if (isTemporarilyLocked(usernameOrEmail)) {
                recordFailedAttempt(usernameOrEmail, ipAddress, null, "Cuenta temporalmente bloqueada");
                return new LoginResponse("Tu cuenta está temporalmente bloqueada. Intenta en 30 minutos.");
            }

            Usuario usuario = findUserByUsernameOrEmail(usernameOrEmail);
            if (usuario == null) {
                recordFailedAttempt(usernameOrEmail, ipAddress, null, "Usuario no encontrado");
                return new LoginResponse("Credenciales inválidas");
            }

            if (!usuario.isAccountEnabled()) {
                recordFailedAttempt(usernameOrEmail, ipAddress, usuario, "Cuenta deshabilitada");
                return new LoginResponse("Tu cuenta está deshabilitada. Contacta al administrador.");
            }

            if (usuario.isAccountLocked()) {
                recordFailedAttempt(usernameOrEmail, ipAddress, usuario, "Cuenta bloqueada");
                return new LoginResponse("Tu cuenta está bloqueada. Contacta al administrador.");
            }

            if (!passwordEncoder.matches(request.getPassword(), usuario.getClave())) {
                handleFailedLogin(usernameOrEmail, ipAddress, usuario);
                return new LoginResponse("Credenciales inválidas");
            }

            if (usuario.isMustChangePassword() || usuarioService.isPasswordExpired(usuario.getId())) {
                recordSuccessfulAttempt(usernameOrEmail, ipAddress, usuario);
                return new LoginResponse("Debes cambiar tu contraseña antes de continuar");
            }

            recordSuccessfulAttempt(usernameOrEmail, ipAddress, usuario);
            
            String token = jwtService.generateToken(
                usuario.getUsuario(), 
                usuario.getRole().getName(), 
                usuario.getId()
            );
            
            String refreshToken = jwtService.generateRefreshToken(
                usuario.getUsuario(),
                usuario.getId()
            );
            
            String redirectUrl = getRoleBasedRedirectUrl(usuario.getRole());
            UsuarioResponse usuarioResponse = convertToResponse(usuario);
            
            return new LoginResponse(token, refreshToken, redirectUrl, usuario.getRole().getName(), usuarioResponse);
            
        } catch (Exception e) {
            recordFailedAttempt(usernameOrEmail, ipAddress, null, "Error del sistema: " + e.getMessage());
            return new LoginResponse("Error interno del sistema");
        }
    }
    
    private Usuario findUserByUsernameOrEmail(String usernameOrEmail) {
        return usuarioRepository.findByUsuario(usernameOrEmail)
                .orElse(usuarioRepository.findByCorreo(usernameOrEmail).orElse(null));
    }
    
    private boolean isTemporarilyLocked(String usernameOrEmail) {
        LocalDateTime tempLockTime = LocalDateTime.now().minusMinutes(TEMP_LOCK_MINUTES);
        long recentFailedAttempts = loginAttemptRepository
                .countFailedAttemptsByUsername(usernameOrEmail, tempLockTime);
        
        return recentFailedAttempts >= MAX_ATTEMPTS_BEFORE_TEMP_LOCK;
    }
    
    private void handleFailedLogin(String usernameOrEmail, String ipAddress, Usuario usuario) {
        recordFailedAttempt(usernameOrEmail, ipAddress, usuario, "Contraseña incorrecta");

        LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
        long totalFailedAttempts = loginAttemptRepository
                .countFailedAttemptsByUsername(usernameOrEmail, oneDayAgo);

        if (totalFailedAttempts >= MAX_ATTEMPTS_BEFORE_PERMANENT_LOCK && usuario != null) {
            usuario.setAccountLocked(true);
            usuarioRepository.save(usuario);

            try {
                usuarioService.lockAccount(usuario.getId(),
                    "Cuenta bloqueada automáticamente por exceso de intentos fallidos de login");
            } catch (Exception e) {
            }
        }
    }
    
    private void recordFailedAttempt(String usernameOrEmail, String ipAddress, Usuario usuario, String reason) {
        LoginAttempt attempt = new LoginAttempt();
        attempt.setUsernameOrEmail(usernameOrEmail);
        attempt.setIpAddress(ipAddress);
        attempt.setSuccess(false);
        attempt.setFailureReason(reason);
        attempt.setUsuario(usuario);
        loginAttemptRepository.save(attempt);
    }
    
    private void recordSuccessfulAttempt(String usernameOrEmail, String ipAddress, Usuario usuario) {
        LoginAttempt attempt = new LoginAttempt();
        attempt.setUsernameOrEmail(usernameOrEmail);
        attempt.setIpAddress(ipAddress);
        attempt.setSuccess(true);
        attempt.setUsuario(usuario);
        loginAttemptRepository.save(attempt);
    }
    
    public LoginResponse refreshToken(String refreshToken) {
        try {
            String username = jwtService.extractUsername(refreshToken);

            if (username == null || !jwtService.validateToken(refreshToken, username)) {
                return new LoginResponse("Token de refresco inválido o expirado");
            }

            Usuario usuario = usuarioRepository.findByUsuario(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (!usuario.isAccountEnabled()) {
                return new LoginResponse("Cuenta deshabilitada");
            }

            if (usuario.isAccountLocked()) {
                return new LoginResponse("Cuenta bloqueada");
            }

            String newAccessToken = jwtService.generateToken(
                usuario.getUsuario(),
                usuario.getRole().getName(),
                usuario.getId()
            );

            String newRefreshToken = jwtService.generateRefreshToken(
                usuario.getUsuario(),
                usuario.getId()
            );

            String redirectUrl = getRoleBasedRedirectUrl(usuario.getRole());
            UsuarioResponse usuarioResponse = convertToResponse(usuario);

            return new LoginResponse(newAccessToken, newRefreshToken, redirectUrl,
                usuario.getRole().getName(), usuarioResponse);
        } catch (Exception e) {
            return new LoginResponse("Error al refrescar token: " + e.getMessage());
        }
    }
    
    private String getRoleBasedRedirectUrl(Role role) {
        Map<String, String> roleRoutes = new HashMap<>();
        roleRoutes.put("ADMIN", "/admin/tablero");
        roleRoutes.put("USUARIO", "/usuario/tablero");
        roleRoutes.put("ADMINISTRATIVO", "/administrativo/tablero");
        roleRoutes.put("ESTUDIANTE", "/estudiante/tablero");
        return roleRoutes.getOrDefault(role.getName().toUpperCase(), "/tablero");
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        if (request == null) {
            return "127.0.0.1"; 
        }
        
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
    
    private UsuarioResponse convertToResponse(Usuario usuario) {
        UsuarioResponse.RoleResponse roleResponse = new UsuarioResponse.RoleResponse(
                usuario.getRole().getId(),
                usuario.getRole().getName(),
                usuario.getRole().getDescription()
        );
        
        UsuarioResponse.AreaInfo areaInfo = null;
        if (usuario.getArea() != null) {
            areaInfo = new UsuarioResponse.AreaInfo(
                    usuario.getArea().getId(),
                    usuario.getArea().getNombre(),
                    usuario.getArea().getDescripcion(),
                    usuario.getArea().getActiva()
            );
        }
        
        UsuarioResponse response = new UsuarioResponse();
        response.setId(usuario.getId());
        response.setNombre(usuario.getNombre());
        response.setApellidos(usuario.getApellidos());
        response.setCorreo(usuario.getCorreo());
        response.setTipoDocumento(usuario.getTipoDocumento());
        response.setNumDocumento(usuario.getNumDocumento());
        response.setUsuario(usuario.getUsuario());
        response.setDireccion(usuario.getDireccion());
        response.setCelular(usuario.getCelular());
        response.setFoto(usuario.getFoto());
        response.setRole(roleResponse);
        response.setArea(areaInfo);
        response.setAccountEnabled(usuario.isAccountEnabled());
        response.setAccountLocked(usuario.isAccountLocked());
        response.setMustChangePassword(usuario.isMustChangePassword());
        
        return response;
    }
}