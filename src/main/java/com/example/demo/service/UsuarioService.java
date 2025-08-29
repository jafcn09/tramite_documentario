package com.example.demo.service;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.dto.CreateUsuarioRequest;
import com.example.demo.dto.UpdateUsuarioRequest;
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.model.PasswordHistory;
import com.example.demo.model.Role;
import com.example.demo.model.Usuario;
import com.example.demo.repository.PasswordHistoryRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordHistoryRepository passwordHistoryRepository;
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
        usuario.setPasswordExpiry(LocalDateTime.now().plusDays(1)); // 24 horas
        usuario.setMustChangePassword(true);
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
        UsuarioResponse.RoleResponse roleResponse = new UsuarioResponse.RoleResponse(
                usuario.getRole().getId(),
                usuario.getRole().getName().toString(),
                usuario.getRole().getDescription()
        );
        
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getTipoDocumento(),
                usuario.getNumDocumento(),
                usuario.getUsuario(),
                usuario.getDireccion(),
                usuario.getCelular(),
                usuario.getFoto(),
                roleResponse
        );
    }
}