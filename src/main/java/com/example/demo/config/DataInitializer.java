package com.example.demo.config;

import com.example.demo.model.Role;
import com.example.demo.model.Usuario;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Bean
    CommandLineRunner init() {
        return args -> {
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
                    usuario.setAccountLocked(false);
                    usuario.setAccountEnabled(true);
                    usuario.setMustChangePassword(false);

                    return usuarioRepository.save(usuario);
                });

            jwtService.generateToken(
                adminUser.getUsuario(),
                adminUser.getRole().getName(),
                adminUser.getId()
            );

            jwtService.generateRefreshToken(
                adminUser.getUsuario(),
                adminUser.getId()
            );
        };
    }
}