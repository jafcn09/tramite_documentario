package com.example.demo.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.AdminResetPasswordRequest;
import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.CreateUsuarioRequest;
import com.example.demo.dto.UpdateUsuarioRequest;
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.model.PasswordHistory;
import com.example.demo.model.Role;
import com.example.demo.model.Usuario;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.PasswordHistoryRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordHistoryRepository passwordHistoryRepository;
    private final AreaRepository areaRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    private static final int PASSWORD_LENGTH = 12;
    
    public List<UsuarioResponse> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public Optional<UsuarioResponse> getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    public Optional<UsuarioResponse> getUsuarioByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo)
                .map(this::convertToResponse);
    }
    
    public UsuarioResponse createUsuario(CreateUsuarioRequest request) {
        validateUniqueFields(request);
        
        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Role not found with id: " + request.getRoleId()));
        
        String generatedUsername = generateUsername(request.getNombre(), request.getApellidos());
        String generatedPassword = generateRandomPassword();
        
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellidos(request.getApellidos());
        usuario.setCorreo(request.getCorreo());
        usuario.setTipoDocumento(request.getTipoDocumento());
        usuario.setNumDocumento(request.getNumDocumento());
        usuario.setUsuario(generatedUsername);
        usuario.setClave(passwordEncoder.encode(generatedPassword));
        usuario.setDireccion(request.getDireccion());
        usuario.setCelular(request.getCelular());
        usuario.setFoto(request.getFoto());
        usuario.setRole(role);
        
        // Handle area assignment if provided
        if (request.getAreaId() != null) {
            com.example.demo.entity.Area area = areaRepository.findById(request.getAreaId())
                    .orElseThrow(() -> new EntityNotFoundException("Área no encontrada con id: " + request.getAreaId()));
            usuario.setArea(area);
        }
        
        // Set password change requirement based on request, default to false for smooth login
        boolean mustChangePassword = request.getMustChangePassword() != null ? request.getMustChangePassword() : false;
        usuario.setMustChangePassword(mustChangePassword);
        
        // Only set password expiry if mustChangePassword is true
        if (mustChangePassword) {
            usuario.setPasswordExpiry(LocalDateTime.now().plusDays(2)); // 48 horas
        }
        
        usuario.setAccountEnabled(true);
        usuario.setAccountLocked(false);
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        sendWelcomeEmail(savedUsuario, generatedUsername, generatedPassword);
        
        return convertToResponse(savedUsuario);
    }
    
    public UsuarioResponse updateUsuario(Long id, UpdateUsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + id));
        
        if (request.getCorreo() != null) {
            if (!request.getCorreo().equals(usuario.getCorreo()) && 
                usuarioRepository.existsByCorreo(request.getCorreo())) {
                throw new IllegalArgumentException("Email already exists: " + request.getCorreo());
            }
            usuario.setCorreo(request.getCorreo());
        }
        if (request.getDireccion() != null) {
            usuario.setDireccion(request.getDireccion());
        }
        if (request.getCelular() != null) {
            usuario.setCelular(request.getCelular());
        }
        if (request.getClave() != null) {
            usuario.setClave(passwordEncoder.encode(request.getClave()));
            usuario.setMustChangePassword(false);
            usuario.setPasswordExpiry(null);
        }
        if (request.getFoto() != null) {
            usuario.setFoto(request.getFoto());
        }
        if (request.getAreaId() != null) {
            com.example.demo.entity.Area area = areaRepository.findById(request.getAreaId())
                    .orElseThrow(() -> new EntityNotFoundException("Área no encontrada con id: " + request.getAreaId()));
            usuario.setArea(area);
        }
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(savedUsuario);
    }
    
    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuario no encontrado con ese id: " + id);
        }
        usuarioRepository.deleteById(id);
    }
    
    public boolean isPasswordExpired(Long userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id " + userId));
        
        return usuario.getPasswordExpiry() != null && 
               LocalDateTime.now().isAfter(usuario.getPasswordExpiry());
    }
    
    public void changePassword(Long userId, ChangePasswordRequest request) {
        // Validar que las contraseñas coincidan
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }
        
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));
        
        // Validar contraseña actual
        if (!passwordEncoder.matches(request.getCurrentPassword(), usuario.getClave())) {
            throw new IllegalArgumentException("La contraseña actual es incorrecta");
        }
        
        // Validar que la nueva contraseña no sea igual a la actual
        if (passwordEncoder.matches(request.getNewPassword(), usuario.getClave())) {
            throw new IllegalArgumentException("La nueva contraseña debe ser diferente a la actual");
        }
        
        // Validar que no esté en las últimas 10 contraseñas
        if (isPasswordInHistory(usuario, request.getNewPassword())) {
            throw new IllegalArgumentException("No puedes usar una de las últimas 10 contraseñas utilizadas");
        }
        
        // Guardar contraseña actual en el historial
        savePasswordHistory(usuario, usuario.getClave());
        
        // Actualizar contraseña
        String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
        usuario.setClave(encodedNewPassword);
        usuario.setMustChangePassword(false);
        usuario.setPasswordExpiry(null);
        
        usuarioRepository.save(usuario);
        
        // Enviar notificación por email
        sendPasswordChangeNotification(usuario);
    }
    
    public void enableAccount(Long userId, String reason) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));
        
        if (usuario.isAccountEnabled()) {
            throw new IllegalArgumentException("La cuenta ya está habilitada");
        }
        
        usuario.setAccountEnabled(true);
        usuario.setAccountLocked(false);
        usuarioRepository.save(usuario);
        
        sendAccountStatusNotification(usuario, true, reason);
    }
    
    public void disableAccount(Long userId, String reason) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));
        
        if (!usuario.isAccountEnabled()) {
            throw new IllegalArgumentException("La cuenta ya está deshabilitada");
        }
        
        usuario.setAccountEnabled(false);
        usuarioRepository.save(usuario);
        
        sendAccountStatusNotification(usuario, false, reason);
    }
    
    public void lockAccount(Long userId, String reason) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));
        
        usuario.setAccountLocked(true);
        usuarioRepository.save(usuario);
        
        sendAccountLockNotification(usuario, true, reason);
    }
    
    public void unlockAccount(Long userId, String reason) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));
        
        usuario.setAccountLocked(false);
        usuarioRepository.save(usuario);
        
        sendAccountLockNotification(usuario, false, reason);
    }
    
    private boolean isPasswordInHistory(Usuario usuario, String newPassword) {
        List<PasswordHistory> lastPasswords = passwordHistoryRepository
                .findLastPasswordsByUser(usuario, PageRequest.of(0, 10));
        
        return lastPasswords.stream()
                .anyMatch(ph -> passwordEncoder.matches(newPassword, ph.getPasswordHash()));
    }
    
    private void savePasswordHistory(Usuario usuario, String passwordHash) {
        PasswordHistory passwordHistory = new PasswordHistory();
        passwordHistory.setUsuario(usuario);
        passwordHistory.setPasswordHash(passwordHash);
        passwordHistoryRepository.save(passwordHistory);
    }
    
    private void sendPasswordChangeNotification(Usuario usuario) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(usuario.getCorreo());
            message.setSubject("Contraseña Cambiada Exitosamente");
            message.setText(String.format(
                "Hola %s %s,\n\n" +
                "Tu contraseña ha sido cambiada exitosamente en nuestro sistema.\n\n" +
                "Si no fuiste tú quien realizó este cambio, por favor contacta inmediatamente " +
                "al administrador del sistema.\n\n" +
                "Fecha del cambio: %s\n\n" +
                "Saludos,\n" +
                "El equipo del sistema",
                usuario.getNombre(),
                usuario.getApellidos(),
                LocalDateTime.now().toString()
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error but don't fail the password change
            System.err.println("Failed to send password change notification: " + e.getMessage());
        }
    }
    
    private void sendAccountStatusNotification(Usuario usuario, boolean enabled, String reason) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(usuario.getCorreo());
            
            String subject = enabled ? "Cuenta Habilitada" : "Cuenta Deshabilitada";
            String status = enabled ? "habilitada" : "deshabilitada";
            
            message.setSubject(subject);
            message.setText(String.format(
                "Hola %s %s,\n\n" +
                "Tu cuenta ha sido %s en nuestro sistema.\n\n" +
                "Motivo: %s\n\n" +
                "Fecha: %s\n\n" +
                "%s\n\n" +
                "Si tienes alguna pregunta, contacta al administrador del sistema.\n\n" +
                "Saludos,\n" +
                "El equipo del sistema",
                usuario.getNombre(),
                usuario.getApellidos(),
                status,
                reason != null ? reason : "No especificado",
                LocalDateTime.now().toString(),
                enabled ? "Ya puedes acceder al sistema normalmente." : 
                         "No podrás acceder al sistema hasta que tu cuenta sea habilitada nuevamente."
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send account status notification: " + e.getMessage());
        }
    }
    
    private void sendAccountLockNotification(Usuario usuario, boolean locked, String reason) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(usuario.getCorreo());
            
            String subject = locked ? "Cuenta Bloqueada" : "Cuenta Desbloqueada";
            String status = locked ? "bloqueada" : "desbloqueada";
            
            message.setSubject(subject);
            message.setText(String.format(
                "Hola %s %s,\n\n" +
                "Tu cuenta ha sido %s por seguridad.\n\n" +
                "Motivo: %s\n\n" +
                "Fecha: %s\n\n" +
                "%s\n\n" +
                "Si consideras que esto es un error, contacta inmediatamente al administrador.\n\n" +
                "Saludos,\n" +
                "El equipo del sistema",
                usuario.getNombre(),
                usuario.getApellidos(),
                status,
                reason != null ? reason : "No especificado",
                LocalDateTime.now().toString(),
                locked ? "Tu cuenta permanecerá bloqueada hasta nuevo aviso." : 
                        "Ya puedes acceder al sistema normalmente."
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send account lock notification: " + e.getMessage());
        }
    }
    
    private void validateUniqueFields(CreateUsuarioRequest request) {
        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new IllegalArgumentException("Email already exists: " + request.getCorreo());
        }
        if (usuarioRepository.existsByNumDocumento(request.getNumDocumento())) {
            throw new IllegalArgumentException("Document number already exists: " + request.getNumDocumento());
        }
    }
    
    private String generateUsername(String nombre, String apellidos) {
        String baseUsername = (nombre + apellidos).toLowerCase()
                .replaceAll("[^a-zA-Z0-9]", "")
                .replaceAll("\\s+", "");
        
        String username = baseUsername;
        int counter = 1;
        
        while (usuarioRepository.existsByUsuario(username)) {
            username = baseUsername + counter;
            counter++;
        }
        
        return username;
    }
    
    private String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(PASSWORD_LENGTH);
        
        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            password.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        
        return password.toString();
    }
    
    private void sendWelcomeEmail(Usuario usuario, String username, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(usuario.getCorreo());
            message.setSubject("Bienvenido al Sistema - Credenciales de Acceso");
            message.setText(String.format(
                "Hola %s %s,\n\n" +
                "Tu cuenta ha sido creada exitosamente en nuestro sistema.\n\n" +
                "Tus credenciales de acceso son:\n" +
                "Usuario: %s\n" +
                "Contraseña: %s\n\n" +
                "IMPORTANTE: Debes cambiar tu contraseña dentro de las próximas 24 horas.\n" +
                "Después de ese tiempo, tendrás que solicitar una nueva contraseña.\n\n" +
                "Saludos,\n" +
                "El equipo del sistema",
                usuario.getNombre(), 
                usuario.getApellidos(),
                username,
                password
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error but don't fail the user creation
            System.err.println("Failed to send welcome email: " + e.getMessage());
        }
    }
    
    private UsuarioResponse convertToResponse(Usuario usuario) {
        UsuarioResponse.RoleResponse roleResponse = null;
        if (usuario.getRole() != null) {
            roleResponse = new UsuarioResponse.RoleResponse(
                    usuario.getRole().getId(),
                    usuario.getRole().getName().toString(),
                    usuario.getRole().getDescription()
            );
        }
        
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
    
    public long getTotalUserCount() {
        return usuarioRepository.count();
    }
    
    public Map<String, Object> getUserStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalUsers = usuarioRepository.count();
        stats.put("totalUsers", totalUsers);
        return stats;
    }
    
    public List<UsuarioResponse> getRecentUsers(int limit) {
        List<Usuario> recentUsers = usuarioRepository.findTop5ByOrderByFechaCreacionDesc();
        return recentUsers.stream()
                .limit(limit)
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public void extendPasswordExpiryForAllUsers() {
        List<Usuario> usersWithExpiredOrSoonToExpirePasswords = usuarioRepository.findAll().stream()
                .filter(usuario -> usuario.getPasswordExpiry() != null && 
                        usuario.getPasswordExpiry().isBefore(LocalDateTime.now().plusDays(2)))
                .collect(Collectors.toList());
        
        usersWithExpiredOrSoonToExpirePasswords.forEach(usuario -> {
            usuario.setPasswordExpiry(LocalDateTime.now().plusDays(2));
            usuario.setMustChangePassword(false); // Permitir que usen la contraseña temporal por 48 horas
            usuarioRepository.save(usuario);
            System.out.println("Extendiendo credenciales expiradas para usuario: " + usuario.getUsuario() + " to " + usuario.getPasswordExpiry() + " and set mustChangePassword to false");
        });
    }
    
    // New methods for user management
    public UsuarioResponse toggleUserStatus(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + id));
        
        usuario.setAccountEnabled(!usuario.isAccountEnabled());
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(savedUsuario);
    }
    
    public UsuarioResponse toggleUserLock(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + id));
        
        usuario.setAccountLocked(!usuario.isAccountLocked());
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(savedUsuario);
    }
    
    public UsuarioResponse assignArea(Long userId, Long areaId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + userId));
        
        com.example.demo.entity.Area area = null;
        if (areaId != null) {
            area = areaRepository.findById(areaId)
                    .orElseThrow(() -> new EntityNotFoundException("Área no encontrada con id: " + areaId));
        }
        
        usuario.setArea(area);
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(savedUsuario);
    }
    
    public List<UsuarioResponse> getUsersByArea(Long areaId) {
        System.out.println("Getting users for area ID: " + areaId);
        List<Usuario> users = usuarioRepository.findAll().stream()
                .filter(user -> user.getArea() != null && user.getArea().getId().equals(areaId))
                .collect(Collectors.toList());
        System.out.println("Found " + users.size() + " users for area " + areaId);
        return users.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public List<UsuarioResponse> getUsersWithoutArea() {
        return usuarioRepository.findAll().stream()
                .filter(user -> user.getArea() == null)
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public UsuarioResponse adminResetPassword(Long userId, AdminResetPasswordRequest request) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + userId));
        
        String newPassword;
        if (request.getNewPassword() != null && !request.getNewPassword().trim().isEmpty()) {
            // Use provided password
            newPassword = request.getNewPassword().trim();
            
            // Validar que la nueva contraseña no sea igual a la actual
            if (passwordEncoder.matches(newPassword, usuario.getClave())) {
                throw new IllegalArgumentException("La nueva contraseña no puede ser igual a la contraseña actual");
            }
            
            // Validar que no esté en las últimas 10 contraseñas del historial
            if (isPasswordInHistory(usuario, newPassword)) {
                throw new IllegalArgumentException("No se puede usar una contraseña que ya fue utilizada anteriormente. Elige una contraseña diferente.");
            }
            
            // Validar que no sea una contraseña de otro usuario del sistema
            if (isPasswordUsedByOtherUser(newPassword, userId)) {
                throw new IllegalArgumentException("Esta contraseña está siendo utilizada por otro usuario del sistema. Elige una contraseña diferente.");
            }
        } else {
            // Generate random password - guaranteed to be unique
            newPassword = generateRandomPassword();
            
            // Extra validation to ensure generated password is not used by anyone
            int attempts = 0;
            while (isPasswordUsedByAnyUser(newPassword) && attempts < 10) {
                newPassword = generateRandomPassword();
                attempts++;
            }
            
            if (attempts >= 10) {
                throw new RuntimeException("No se pudo generar una contraseña única después de varios intentos");
            }
        }
        
        // Guardar contraseña actual en el historial antes de cambiarla
        if (usuario.getClave() != null && !usuario.getClave().isEmpty()) {
            savePasswordHistory(usuario, usuario.getClave());
        }
        
        // Update password
        String encodedPassword = passwordEncoder.encode(newPassword);
        usuario.setClave(encodedPassword);
        
        // Set password change requirement
        usuario.setMustChangePassword(request.getMustChangePassword() != null ? request.getMustChangePassword() : false);
        
        // Set password expiry if mustChangePassword is true
        if (usuario.isMustChangePassword()) {
            usuario.setPasswordExpiry(LocalDateTime.now().plusDays(2)); // 48 horas
        } else {
            usuario.setPasswordExpiry(null);
        }
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        // Send notification email
        sendPasswordResetNotification(savedUsuario, newPassword, request.getReason());
        
        return convertToResponse(savedUsuario);
    }
    
    private void sendPasswordResetNotification(Usuario usuario, String newPassword, String reason) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(usuario.getCorreo());
            message.setSubject("Contraseña Restablecida por Administrador");
            message.setText(String.format(
                "Hola %s %s,\n\n" +
                "Tu contraseña ha sido restablecida por un administrador del sistema.\n\n" +
                "Tu nueva contraseña es: %s\n\n" +
                "%s\n\n" +
                "Motivo: %s\n\n" +
                "Fecha: %s\n\n" +
                "Por favor, cambia esta contraseña después de iniciar sesión.\n\n" +
                "Saludos,\n" +
                "El equipo del sistema",
                usuario.getNombre(),
                usuario.getApellidos(),
                newPassword,
                usuario.isMustChangePassword() ? 
                    "IMPORTANTE: Debes cambiar esta contraseña en tu próximo inicio de sesión." : 
                    "Puedes usar esta contraseña para iniciar sesión normalmente.",
                reason != null ? reason : "No especificado",
                LocalDateTime.now().toString()
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send password reset notification: " + e.getMessage());
        }
    }
    
    private boolean isPasswordUsedByOtherUser(String plainPassword, Long excludeUserId) {
        List<Usuario> allUsers = usuarioRepository.findAll();
        return allUsers.stream()
                .filter(user -> !user.getId().equals(excludeUserId))
                .anyMatch(user -> passwordEncoder.matches(plainPassword, user.getClave()));
    }
    
    private boolean isPasswordUsedByAnyUser(String plainPassword) {
        List<Usuario> allUsers = usuarioRepository.findAll();
        return allUsers.stream()
                .anyMatch(user -> passwordEncoder.matches(plainPassword, user.getClave()));
    }
    
    // Métodos auxiliares para TramiteService
    public List<Long> obtenerTrabajadoresDeArea(Long areaId) {
        return usuarioRepository.findAll().stream()
                .filter(user -> user.getArea() != null && user.getArea().getId().equals(areaId))
                .filter(user -> user.getRole() != null && 
                       ("ADMINISTRATIVO".equals(user.getRole().getName().toString()) || 
                        "ADMIN".equals(user.getRole().getName().toString())))
                .map(Usuario::getId)
                .collect(Collectors.toList());
    }
    
    public String obtenerNombreCompleto(Long usuarioId) {
        return usuarioRepository.findById(usuarioId)
                .map(u -> u.getNombre() + " " + u.getApellidos())
                .orElse("Usuario desconocido");
    }
    
    public Usuario findByUsuario(String usuario) {
        return usuarioRepository.findByUsuario(usuario).orElse(null);
    }
    
    // Métodos para notificaciones masivas
    public List<Long> obtenerTodosLosUsuariosActivos() {
        return usuarioRepository.findAll().stream()
                .filter(usuario -> usuario.isAccountEnabled() && !usuario.isAccountLocked())
                .map(Usuario::getId)
                .collect(Collectors.toList());
    }
    
    public List<Long> obtenerUsuariosPorRol(String roleName) {
        return usuarioRepository.findAll().stream()
                .filter(usuario -> usuario.isAccountEnabled() && !usuario.isAccountLocked())
                .filter(usuario -> usuario.getRole() != null && 
                       roleName.equals(usuario.getRole().getName().toString()))
                .map(Usuario::getId)
                .collect(Collectors.toList());
    }
}