# Sistema de Trámite Documentario - Backend

Sistema integral de gestión de trámites documentarios con Spring Boot 3.5.5, autenticación JWT, firmas digitales, códigos QR y notificaciones por email.

## Tecnologías

- **Java 25** - Lenguaje principal
- **Spring Boot 3.5.5** - Framework base
- **Spring Security 6** - Autenticación JWT
- **MySQL 9.4** - Base de datos
- **ZXing 3.5.1** - Generación de códigos QR
- **JavaMailSender** - Sistema de correos
- **WebSocket + STOMP** - Notificaciones en tiempo real
- **Gradle 8** - Build tool
- **SpringDoc OpenAPI 2.7** - Documentación API (Swagger UI)
- **Redis** - Cache y sesiones
- **Flyway** - Migraciones de base de datos

## Documentación API (Swagger)

La API está documentada con OpenAPI 3.0 y disponible a través de Swagger UI.

### Acceso
- **Swagger UI**: `http://localhost:8081/swagger-ui/index.html`
- **OpenAPI JSON**: `http://localhost:8081/v3/api-docs`

### Características
- Documentación interactiva de todos los endpoints
- Pruebas de API directamente desde el navegador (Try it out)
- Agrupación por tags (controllers)
- Filtrado por etiquetas
- Ordenamiento alfabético de tags y por método HTTP

### Autenticación en Swagger
Para probar endpoints protegidos:
1. Ejecutar `POST /api/auth/login` con credenciales válidas
2. Copiar el token JWT de la respuesta
3. Usar el token en el header `Authorization: Bearer {token}`

## Características Principales

### Gestión de Trámites
- CRUD completo con estados y prioridades
- Flujo de derivación entre áreas
- Respuestas con archivos adjuntos
- Generación automática de QR para seguimiento
- Historial y auditoría completa

### Firma Digital
- Tipos de firma: SIMPLE, CONFORMIDAD, AVANZADA, CUALIFICADA
- Restricciones por rol: Estudiantes solo SIMPLE
- Captura de firma manuscrita con canvas HTML5
- Metadatos: razón, ubicación, contacto firmante
- Validación de consentimiento obligatorio

### Códigos QR
- Generación automática usando ZXing
- URL de verificación pública sin autenticación
- Imágenes QR en emails con CID inline attachments
- Estadísticas de escaneos con IP y user-agent
- Regeneración de QR disponible

### Notificaciones
- Emails HTML responsive con templates profesionales
- Adjuntos CID para imágenes QR embebidas
- Notificaciones automáticas: creación, derivación, respuesta, finalización, rechazo
- WebSocket STOMP en tiempo real
- Envío asíncrono con @Async

### Seguridad
- Rate limiting: Login 5/min, API 60/min, Upload 10/min
- Bloqueo automático por intentos fallidos
- Roles: ADMIN, ADMINISTRATIVO, USUARIO, ESTUDIANTE
- Validación de archivos: máx 10MB, magic numbers
- Sanitización XSS y prevención SQL injection



## API Endpoints Principales

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/tramites` - Crear trámite
- `POST /api/tramites/{id}/responder` - Responder trámite
- `POST /api/firmas-digitales` - Crear solicitud firma
- `POST /api/qr/generar/{tramiteId}` - Generar QR
- `GET /api/qr/verificar/{codigoQR}` - Verificar QR (público)

## Estructura

```
src/main/java/com/example/demo/
├── config/       - Security, WebSocket, Email
├── controller/   - REST endpoints
├── service/      - Lógica de negocio
├── model/        - Entidades JPA
├── repository/   - Spring Data repositories
├── dto/          - Data Transfer Objects
└── security/     - JWT, filters, handlers
```

© 2025 Universidad Nacional de Tumbes - Desarrollado por Jhafet Cánepa