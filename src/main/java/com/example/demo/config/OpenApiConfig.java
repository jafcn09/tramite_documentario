package com.example.demo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.tags.Tag;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;


@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "Bearer Authentication";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(apiInfo())
            .components(securityComponents())
            .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
            .tags(apiTags());
    }

    private Info apiInfo() {
        return new Info()
            .title("Sistema de Trámite Documentario - API")
            .version("1.0.0")
            .description("""
                API REST para el Sistema de Gestión Documentaria de la Universidad Nacional de Tumbes.

                ## Autenticación
                Esta API utiliza autenticación JWT Bearer. Para acceder a endpoints protegidos:
                1. Obtener token via `POST /api/auth/login`
                2. Incluir el token en el header: `Authorization: Bearer {token}`

                ## Roles disponibles
                - **ADMIN**: Acceso completo al sistema
                - **ADMINISTRATIVO**: Gestión de trámites y derivaciones
                - **USUARIO**: Operaciones básicas de trámites
                - **ESTUDIANTE**: Acceso limitado a sus propios trámites
                """)
            .contact(new Contact()
                .name("Soporte Técnico"))
            .license(new License()
                .name("Uso Interno"));
    }

    private Components securityComponents() {
        return new Components()
            .addSecuritySchemes(SECURITY_SCHEME_NAME,
                new SecurityScheme()
                    .name(SECURITY_SCHEME_NAME)
                    .type(SecurityScheme.Type.HTTP)
                    .scheme("bearer")
                    .bearerFormat("JWT")
                    .description("Ingrese el token JWT obtenido del endpoint de login"));
    }

    private List<Tag> apiTags() {
        return List.of(
            new Tag().name("Autenticación").description("Endpoints de login, logout y gestión de sesiones"),
            new Tag().name("Trámites").description("CRUD y gestión de trámites documentarios"),
            new Tag().name("Usuarios").description("Gestión de usuarios del sistema"),
            new Tag().name("Notificaciones").description("Sistema de notificaciones y alertas"),
            new Tag().name("QR").description("Generación y verificación de códigos QR"),
            new Tag().name("Áreas").description("Gestión de áreas organizacionales")
        );
    }

    @Bean
    public OpenApiCustomizer removeServersCustomizer() {
        return openApi -> openApi.servers(null);
    }
}
