package com.example.demo.config;

import com.example.demo.model.Role;
import com.example.demo.model.Usuario;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Bean
    CommandLineRunner init() {
        return args -> {
            log.info("=== Initializing application data ===");
            
            // Create default roles if they don't exist
            Role adminRole = roleRepository.findByName("ADMIN")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("ADMIN");
                    role.setDescription("Administrator role with full access");
                    return roleRepository.save(role);
                });

            Role userRole = roleRepository.findByName("USUARIO")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("USUARIO");
                    role.setDescription("Regular user role");
                    return roleRepository.save(role);
                });

            Role administrativoRole = roleRepository.findByName("ADMINISTRATIVO")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("ADMINISTRATIVO");
                    role.setDescription("Administrative staff role");
                    return roleRepository.save(role);
                });

            Role estudianteRole = roleRepository.findByName("ESTUDIANTE")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("ESTUDIANTE");
                    role.setDescription("Student role");
                    return roleRepository.save(role);
                });

            // Create default admin user if doesn't exist
            String defaultUsername = "admin";
            String defaultPassword = "admin123";
            String defaultEmail = "admin@example.com";
            
            Usuario adminUser = usuarioRepository.findByUsuario(defaultUsername)
                .orElseGet(() -> {
                    Usuario usuario = new Usuario();
                    usuario.setUsuario(defaultUsername);
                    usuario.setClave(passwordEncoder.encode(defaultPassword));
                    usuario.setCorreo(defaultEmail);
                    usuario.setNombre("System");
                    usuario.setApellidos("Administrator");
                    usuario.setTipoDocumento("DNI");
                    usuario.setNumDocumento("00000000");
                    usuario.setCelular("999999999");
                    usuario.setDireccion("System Address");
                    usuario.setRole(adminRole);
                    // These fields are handled by JPA annotations
                    usuario.setAccountLocked(false);
                    usuario.setAccountEnabled(true);
                    usuario.setMustChangePassword(false);
                    
                    Usuario saved = usuarioRepository.save(usuario);
                    log.info("Created default admin user: {}", defaultUsername);
                    return saved;
                });

            // Generate initial tokens for admin user
            String accessToken = jwtService.generateToken(
                adminUser.getUsuario(),
                adminUser.getRole().getName(),
                adminUser.getId()
            );
            
            String refreshToken = jwtService.generateRefreshToken(
                adminUser.getUsuario(),
                adminUser.getId()
            );

            log.info("========================================");
            log.info("=== APPLICATION STARTED SUCCESSFULLY ===");
            log.info("========================================");
            log.info("Default Admin Credentials:");
            log.info("  Username: {}", defaultUsername);
            log.info("  Password: {}", defaultPassword);
            log.info("========================================");
            log.info("Initial Access Token (valid for 24 hours):");
            log.info("  {}", accessToken);
            log.info("========================================");
            log.info("Initial Refresh Token (valid for 7 days):");
            log.info("  {}", refreshToken);
            log.info("========================================");
            log.info("Test the API with:");
            log.info("  curl -H \"Authorization: Bearer {}\" http://localhost:8081/api/usuarios", accessToken);
            log.info("========================================");
        };
    }
}