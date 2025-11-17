package com.example.demo.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.UsuarioRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final PasswordHistoryRepository passwordHistoryRepository;
    private final AreaRepository areaRepository;
    private final TramiteRepository tramiteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final EmailTemplateService emailTemplateService;
    private final RoleDescriptionService roleDescriptionService;
    
    private static final String PASSWORD_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!.";
    private static final int PASSWORD_MIN_LENGTH = 8;
    private static final int PASSWORD_MAX_LENGTH = 12;
    
    public List<UsuarioResponse> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    @org.springframework.cache.annotation.Cacheable(value = "usuarios", key = "'usuario_' + #id")
    public Optional<UsuarioResponse> getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .map(this::convertToResponse);
    }

    @org.springframework.cache.annotation.Cacheable(value = "usuariosByCorreo", key = "'correo_' + #correo")
    public Optional<UsuarioResponse> getUsuarioByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo)
                .map(this::convertToResponse);
    }
    
    @org.springframework.cache.annotation.CacheEvict(value = {"usuarios", "usuariosByCorreo"}, allEntries = true)
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

        if (request.getAreaId() != null) {
            com.example.demo.entity.Area area = areaRepository.findById(request.getAreaId())
                    .orElseThrow(() -> new EntityNotFoundException("Area no encontrada con id: " + request.getAreaId()));
            usuario.setArea(area);
        }

        // Siempre forzar cambio de password en primer login (mejor práctica de seguridad)
        // El usuario debe cambiar la contraseña generada aleatoria por una propia
        usuario.setMustChangePassword(true);
        usuario.setPasswordExpiry(LocalDateTime.now().plusDays(2)); // Expira en 2 días si no cambia
        
        usuario.setAccountEnabled(true);
        usuario.setAccountLocked(false);
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        sendWelcomeEmail(savedUsuario, generatedUsername, generatedPassword);
        
        return convertToResponse(savedUsuario);
    }
    
    public UsuarioResponse updateUsuario(Long id, UpdateUsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + id));
        
        if (request.getNombre() != null) {
            usuario.setNombre(request.getNombre());
        }
        if (request.getApellidos() != null) {
            usuario.setApellidos(request.getApellidos());
        }
        if (request.getTipoDocumento() != null) {
            usuario.setTipoDocumento(request.getTipoDocumento());
        }
        if (request.getNumDocumento() != null) {
            if (!request.getNumDocumento().equals(usuario.getNumDocumento()) &&
                usuarioRepository.existsByNumDocumento(request.getNumDocumento())) {
                throw new IllegalArgumentException("Número de documento ya existe: " + request.getNumDocumento());
            }
            usuario.setNumDocumento(request.getNumDocumento());
        }
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

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Las credenciales no coinciden");
        }

        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));
        if (passwordEncoder.matches(request.getNewPassword(), usuario.getClave())) {
            throw new IllegalArgumentException("La nueva credencial debe ser diferente a la actual");
        }


        if (isPasswordInHistory(usuario, request.getNewPassword())) {
            throw new IllegalArgumentException("No puedes usar una de las últimas 10 credenciales utilizadas");
        }

        savePasswordHistory(usuario, usuario.getClave());

        String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
        usuario.setClave(encodedNewPassword);
        usuario.setMustChangePassword(false);
        usuario.setPasswordExpiry(null);

        usuarioRepository.save(usuario);

        sendPasswordChangeNotification(usuario);
    }

    // ✅ NUEVO: Método que cambia password y devuelve el usuario actualizado
    // Usado cuando el usuario accede desde el componente /cambiar-contrasena
    public UsuarioResponse changePasswordAndReturnUser(Long userId, ChangePasswordRequest request) {
        // Ejecutar la lógica de cambio de password
        changePassword(userId, request);

        // Obtener el usuario actualizado y devolverlo
        Usuario usuarioActualizado = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));

        return convertToResponse(usuarioActualizado);
    }
    
    public void enableAccount(Long userId, String reason) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ese id: " + userId));
        
        if (usuario.isAccountEnabled()) {
            throw new IllegalArgumentException("La cuenta ya estC! habilitada");
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
            throw new IllegalArgumentException("La cuenta ya estC! deshabilitada");
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
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(usuario.getCorreo());
            helper.setSubject("🔐 credenciales Actualizada Exitosamente");

            String htmlContent = emailTemplateService.createPasswordChangeNotificationTemplate(usuario);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
        }
    }
    
    private void sendAccountStatusNotification(Usuario usuario, boolean enabled, String reason) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(usuario.getCorreo());

            String subject = enabled ? "✅ Cuenta Habilitada" : "❌ Cuenta Deshabilitada";
            helper.setSubject(subject);

            String htmlContent = emailTemplateService.createAccountStatusNotificationTemplate(usuario, enabled, reason);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
        }
    }
    
    private void sendAccountLockNotification(Usuario usuario, boolean locked, String reason) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(usuario.getCorreo());

            String subject = locked ? "🔒 Cuenta Bloqueada" : "🔓 Cuenta Desbloqueada";
            helper.setSubject(subject);

            String htmlContent = emailTemplateService.createAccountLockNotificationTemplate(usuario, locked, reason);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
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
        int length = PASSWORD_MIN_LENGTH + random.nextInt(PASSWORD_MAX_LENGTH - PASSWORD_MIN_LENGTH + 1);
        StringBuilder password = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            password.append(PASSWORD_CHARACTERS.charAt(random.nextInt(PASSWORD_CHARACTERS.length())));
        }

        return password.toString();
    }
    
    private void sendWelcomeEmail(Usuario usuario, String username, String password) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(usuario.getCorreo());
            helper.setSubject("🎉 Bienvenido al Sistema - Tu cuenta está lista");


            String roleName = usuario.getRole() != null ? usuario.getRole().getName() : "USUARIO";

           
            String functionalitiesHtml = roleDescriptionService.getFunctionalitiesHtml(roleName);
            String roleDescription = roleDescriptionService.getRoleSummary(roleName);

          
            String htmlContent = emailTemplateService.createWelcomeEmailWithRoleFunctionalitiesTemplate(
                    usuario, username, password, roleName, functionalitiesHtml, roleDescription);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
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
            usuario.setMustChangePassword(false); 
            usuarioRepository.save(usuario);
        });
    }
    
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
                    .orElseThrow(() -> new EntityNotFoundException("Crea no encontrada con id: " + areaId));
        }
        
        usuario.setArea(area);
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return convertToResponse(savedUsuario);
    }
    
    public List<UsuarioResponse> getUsersByArea(Long areaId) {
        List<Usuario> users = usuarioRepository.findByAreaId(areaId);

        // Si no hay usuarios en esa área específica, devolver todos los usuarios
        // para asegurar que siempre haya opciones para derivar
        if (users.isEmpty()) {
            users = usuarioRepository.findAllUsuarios();
        }

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

    public List<UsuarioResponse> findAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public UsuarioResponse adminResetPassword(Long userId, AdminResetPasswordRequest request) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con id: " + userId));
        
        String newPassword;
        if (request.getNewPassword() != null && !request.getNewPassword().trim().isEmpty()) {

            newPassword = request.getNewPassword().trim();
            
    
            if (passwordEncoder.matches(newPassword, usuario.getClave())) {
                throw new IllegalArgumentException("La nueva credencial no puede ser igual a la  actual");
            }
  
            if (isPasswordInHistory(usuario, newPassword)) {
                throw new IllegalArgumentException("No se pueden usar estas credenciales que ya fueron utilizadas anteriormente. Elige unas diferentes.");
            }
            
        
            if (isPasswordUsedByOtherUser(newPassword, userId)) {
                throw new IllegalArgumentException("Estas credenciales están siendo utilizadas por otro usuario del sistema. Elige unas diferentes.");
            }
        } else {
  
            newPassword = generateRandomPassword();
            int attempts = 0;
            while (isPasswordUsedByAnyUser(newPassword) && attempts < 10) {
                newPassword = generateRandomPassword();
                attempts++;
            }
            
            if (attempts >= 10) {
                throw new RuntimeException("No se pudo generar una credencial después de varios intentos");
            }
        }
        

        if (usuario.getClave() != null && !usuario.getClave().isEmpty()) {
            savePasswordHistory(usuario, usuario.getClave());
        }
        

        String encodedPassword = passwordEncoder.encode(newPassword);
        usuario.setClave(encodedPassword);
        

        usuario.setMustChangePassword(request.getMustChangePassword() != null ? request.getMustChangePassword() : false);
     
        if (usuario.isMustChangePassword()) {
            usuario.setPasswordExpiry(LocalDateTime.now().plusDays(2)); 
        } else {
            usuario.setPasswordExpiry(null);
        }
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        

        sendPasswordResetNotification(savedUsuario, newPassword, request.getReason());
        
        return convertToResponse(savedUsuario);
    }
    
    private void sendPasswordResetNotification(Usuario usuario, String newPassword, String reason) {
        try {
            // Validar que el email del usuario no sea nulo o vacío
            if (usuario.getCorreo() == null || usuario.getCorreo().trim().isEmpty()) {
                System.err.println("Advertencia: Usuario " + usuario.getId() + " no tiene email registrado. No se puede enviar notificación de restablecimiento de contraseña.");
                return;
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(usuario.getCorreo());
            helper.setSubject("🔑 Contraseña Restablecida - Universidad Nacional de Tumbes");

            String htmlContent = emailTemplateService.createPasswordResetTemplate(usuario, newPassword, reason);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("Notificación de restablecimiento de contraseña enviada a: " + usuario.getCorreo());
        } catch (MessagingException e) {
            // Log del error pero no lanzar excepción para que el flujo continúe
            System.err.println("Error al enviar notificación de restablecimiento de credencial a " + usuario.getCorreo() + ": " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            // Capturar cualquier otra excepción (como NullPointerException)
            System.err.println("Error inesperado al enviar notificación: " + e.getMessage());
            e.printStackTrace();
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
    
    public List<UsuarioResponse> getAdministrativosDisponibles() {
        return usuarioRepository.findAll().stream()
                .filter(user -> user.isAccountEnabled() && !user.isAccountLocked())
                .filter(user -> user.getRole() != null && "ADMINISTRATIVO".equals(user.getRole().getName().toString()))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public List<Map<String, Object>> getAdministrativosConWorkload() {
        return getAdministrativosConWorkload(null);
    }

    public List<Map<String, Object>> getAdministrativosConWorkload(Long excludeUserId) {
        return usuarioRepository.findAll().stream()
                .filter(user -> {
                    // Excluir el usuario especificado si se proporciona
                    if (excludeUserId != null && user.getId().equals(excludeUserId)) {
                        return false;
                    }
                    return true;
                })
                .filter(user -> user.isAccountEnabled() && !user.isAccountLocked())
                .filter(user -> {
                    if (user.getRole() == null) return false;
                    String roleName = user.getRole().getName();
                    return roleName != null && roleName.equalsIgnoreCase("ADMINISTRATIVO");
                })
                .map(user -> {
                    Map<String, Object> userWithWorkload = new HashMap<>();
                    UsuarioResponse userResponse = convertToResponse(user);

                    userWithWorkload.put("id", userResponse.getId());
                    userWithWorkload.put("nombre", userResponse.getNombre());
                    userWithWorkload.put("apellidos", userResponse.getApellidos());
                    userWithWorkload.put("correo", userResponse.getCorreo());
                    userWithWorkload.put("usuario", userResponse.getUsuario());
                    userWithWorkload.put("role", userResponse.getRole());
                    userWithWorkload.put("area", userResponse.getArea());
                    userWithWorkload.put("foto", userResponse.getFoto());
                    Long workloadCount = tramiteRepository.countActiveTramitesByUsuarioAsignadoId(user.getId());
                    userWithWorkload.put("workloadCount", workloadCount != null ? workloadCount : 0);

                    return userWithWorkload;
                })
                .collect(Collectors.toList());
    }
    public UsuarioResponse obtenerUsuarioPorId(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return convertToResponse(usuario);
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByCorreo(email);
    }

    public boolean existsByNumDocumento(String numDocumento) {
        return usuarioRepository.existsByNumDocumento(numDocumento);
    }
}