# Sistema de Trámite Documentario - UNTUMBES Backend

## 📋 Descripción
Sistema backend para gestión de trámites documentarios de la Universidad Nacional de Tumbes, desarrollado con Spring Boot 3.x, que incluye autenticación JWT con refresh tokens, gestión completa de usuarios, roles dinámicos, sistema de áreas y funcionalidades avanzadas de seguridad.

## 🚀 Características Principales

### 🔐 Sistema de Autenticación y Seguridad
- **Autenticación JWT** con access tokens (24h) y refresh tokens (7 días)
- **Bloqueo automático** por intentos fallidos (5 temporales, 10 permanente)
- **Roles dinámicos** con permisos granulares (ADMIN, ADMINISTRATIVO, USUARIO)
- **Guards de seguridad** con validación de endpoints por rol
- **Auditoría completa** de intentos de login con IP tracking

### 👥 Gestión de Usuarios
- **CRUD completo** de usuarios con validaciones robustas
- **Gestión de contraseñas** con reset administrativo
- **Validación anti-reutilización** de contraseñas
- **Estados de cuenta** (habilitado/deshabilitado, bloqueado/desbloqueado)
- **Asignación de áreas** a usuarios
- **Cambio de contraseñas temporales**

### 🏢 Gestión de Áreas
- **CRUD completo** de áreas organizacionales
- **Estados activo/inactivo** para áreas
- **Asignación de usuarios** a áreas específicas
- **Jerarquía organizacional**

### 📋 Sistema de Trámites
- **Gestión completa** de trámites documentarios
- **Estados de trámite** (Borrador, Enviado, En Revisión, etc.)
- **Prioridades** configurables (Baja, Normal, Alta, Urgente)
- **Tipos de trámite** personalizables
- **Sistema de calificación** de atención
- **Descarga de documentos** individuales y en lote
- **Historial de cambios** y auditoría

### 🎯 Funcionalidades por Rol
- **ADMIN**: Gestión completa del sistema, usuarios, áreas y configuraciones
- **ADMINISTRATIVO**: Procesamiento de trámites, aprobación/rechazo/derivación
- **USUARIO**: Creación y seguimiento de trámites personales, calificación

## 🛠️ Tecnologías Utilizadas

- **Java 17+** - Lenguaje de programación principal
- **Spring Boot 3.x** - Framework principal
- **Spring Security 6** - Autenticación y autorización
- **Spring Data JPA** - Persistencia de datos
- **Hibernate** - ORM para mapeo objeto-relacional
- **MySQL 8.0+** - Base de datos relacional
- **JWT (JSON Web Tokens)** - Autenticación stateless
- **Lombok** - Reducción de código boilerplate
- **Gradle 8** - Herramienta de construcción
- **Validation API** - Validaciones de datos

## 📋 Prerrequisitos

- **JDK 17** o superior
- **MySQL 8.0** o superior
- **Gradle 8.0** o superior (incluido en wrapper)
- **Postman** o similar para pruebas de API (opcional)

## ⚙️ Configuración

### 1. Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Database Configuration
DB_HOST=localhost:3306
DB_NAME=tramite_documentario
DB_USER=root
DB_PASSWORD=tu_password

# JWT Configuration
JWT_SECRET=mySecretKeyForJWTTokenGenerationPleaseChangeThisInProduction2024
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@untumbes.edu.pe

# Server Configuration
SERVER_PORT=8080

# Mail Configuration (opcional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=noreply@untumbes.edu.pe
MAIL_PASSWORD=tu_password_app

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:4200,https://untumbes.edu.pe
```

### 2. Base de Datos

```sql
-- Crear base de datos
CREATE DATABASE tramite_documentario 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Crear usuario (opcional)
CREATE USER 'tramite_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON tramite_documentario.* TO 'tramite_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Configuración application.properties

```properties
spring.application.name=tramite-documentario-backend

# Database Configuration
spring.datasource.url=jdbc:mysql://${DB_HOST:localhost:3306}/${DB_NAME:tramite_documentario}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8
spring.datasource.username=${DB_USER:root}
spring.datasource.password=${DB_PASSWORD:}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=${SHOW_SQL:false}
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.jdbc.time_zone=America/Lima

# JWT Configuration
jwt.secret=${JWT_SECRET:defaultSecretKey}
jwt.expiration=${JWT_EXPIRATION:86400000}
jwt.refresh.expiration=${JWT_REFRESH_EXPIRATION:604800000}

# Server Configuration
server.port=${SERVER_PORT:8080}
server.servlet.context-path=/api

# CORS Configuration
app.cors.allowed-origins=${ALLOWED_ORIGINS:http://localhost:4200}

# Logging Configuration
logging.level.com.example.demo=DEBUG
logging.level.org.springframework.security=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd tramite_documentario/back
```

### 2. Configurar variables de entorno
```bash
# Crear archivo .env con las configuraciones necesarias
cp .env.example .env
nano .env  # Editar con tus configuraciones
```

### 3. Ejecutar la aplicación

#### Opción A: Con Gradle Wrapper (Recomendado)
```bash
# Dar permisos de ejecución (Linux/Mac)
chmod +x gradlew

# Ejecutar en modo desarrollo
./gradlew bootRun

# En Windows
gradlew.bat bootRun
```

#### Opción B: Compilar y ejecutar JAR
```bash
# Compilar
./gradlew build

# Ejecutar JAR
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

#### Opción C: Con Docker (Futuro)
```bash
# Construir imagen
docker build -t tramite-backend .

# Ejecutar contenedor
docker run -p 8080:8080 tramite-backend
```

### 4. Verificar funcionamiento
```bash
# Verificar estado de la aplicación
curl http://localhost:8080/api/auth/status

# Respuesta esperada:
# {"status": "OK", "message": "Sistema de trámites documentarios activo"}
```

## 🔐 Sistema de Autenticación

### Inicialización Automática

Al iniciar la aplicación por primera vez:
- ✅ Se crean **roles por defecto**: ADMIN, ADMINISTRATIVO, USUARIO
- ✅ Se crea **usuario administrador**: admin / admin123
- ✅ Se generan **tokens iniciales** mostrados en console
- ✅ Se crean **áreas de ejemplo**: Secretaría General, Recursos Humanos, etc.

### Endpoints de Autenticación

#### 1. Login Principal
```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "role": "ADMIN",
  "redirectUrl": "/admin/dashboard",
  "usuario": {
    "id": 1,
    "nombre": "System",
    "apellidos": "Administrator",
    "usuario": "admin",
    "correo": "admin@untumbes.edu.pe",
    "role": {
      "id": 1,
      "name": "ADMIN",
      "description": "Administrador del sistema"
    }
  }
}
```

#### 2. Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer <refresh_token>
```

#### 3. Validar Token
```http
POST /api/auth/validate-token
Authorization: Bearer <access_token>
```

#### 4. Logout
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

#### 5. Tokens Iniciales (Solo desarrollo)
```http
GET /api/auth/init
```

## 👥 API de Usuarios

### Endpoints Principales

#### Listar todos los usuarios (ADMIN)
```http
GET /api/usuarios
Authorization: Bearer <admin_token>
```

#### Obtener usuario por ID
```http
GET /api/usuarios/{id}
Authorization: Bearer <token>
```

#### Crear nuevo usuario (ADMIN)
```http
POST /api/usuarios
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "apellidos": "Pérez García",
  "tipoDocumento": "DNI",
  "numDocumento": "12345678",
  "correo": "juan.perez@untumbes.edu.pe",
  "celular": "999888777",
  "direccion": "Av. Universitaria 123, Tumbes",
  "roleId": 2,
  "areaId": 3,
  "mustChangePassword": true
}
```

#### Actualizar usuario
```http
PUT /api/usuarios/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "apellidos": "Pérez García",
  "correo": "juan.perez@untumbes.edu.pe",
  "celular": "999888777",
  "direccion": "Av. Universitaria 456, Tumbes"
}
```

#### Restablecer contraseña (ADMIN)
```http
PUT /api/usuarios/{id}/admin-reset-password
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "newPassword": "nuevaPassword123",
  "reason": "Solicitud del usuario",
  "mustChangePassword": false
}
```

#### Toggle estado usuario (ADMIN)
```http
PUT /api/usuarios/{id}/toggle-status
Authorization: Bearer <admin_token>
```

#### Toggle bloqueo usuario (ADMIN)
```http
PUT /api/usuarios/{id}/toggle-lock
Authorization: Bearer <admin_token>
```

## 🏢 API de Áreas

### Endpoints de Áreas

#### Listar todas las áreas
```http
GET /api/areas
Authorization: Bearer <token>
```

#### Crear nueva área (ADMIN)
```http
POST /api/areas
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nombre": "Dirección de Investigación",
  "descripcion": "Área encargada de la gestión de proyectos de investigación",
  "activa": true
}
```

#### Asignar área a usuario
```http
PUT /api/usuarios/{userId}/assign-area/{areaId}
Authorization: Bearer <admin_token>
```

## 📋 API de Trámites

### Endpoints de Trámites

#### Obtener todos los trámites (ADMIN)
```http
GET /api/tramites?page=0&size=10
Authorization: Bearer <admin_token>
```

#### Obtener mis trámites (Personal)
```http
GET /api/tramites/mis-tramites?page=0&size=12
Authorization: Bearer <token>
```

#### Crear nuevo trámite
```http
POST /api/tramites
Authorization: Bearer <token>
Content-Type: application/json

{
  "tipoTramiteId": 1,
  "asunto": "Solicitud de certificado de notas",
  "descripcion": "Necesito certificado de notas para trámite laboral",
  "prioridadId": 2,
  "areaDestinoId": 1
}
```

#### Calificar trámite (USUARIO)
```http
POST /api/tramites/{id}/calificar
Authorization: Bearer <usuario_token>
Content-Type: application/json

{
  "estrellas": 5,
  "comentario": "Excelente atención y rapidez",
  "aspectos": {
    "rapidez": 5,
    "calidad": 5,
    "comunicacion": 4,
    "solucion": 5
  }
}
```

## 🔒 Sistema de Seguridad

### Características de Seguridad Implementadas

#### Autenticación y Autorización
- **JWT Stateless**: Tokens sin estado en el servidor
- **Refresh Tokens**: Renovación segura de tokens
- **Role-Based Access**: Control de acceso basado en roles
- **Method Security**: Anotaciones `@PreAuthorize` en endpoints

#### Protección contra Ataques
- **Bloqueo automático**: 5 intentos (temporal), 10 intentos (permanente)
- **Rate Limiting**: Limitación de requests por IP
- **SQL Injection**: Prevención mediante JPA/Hibernate
- **CORS**: Configuración restrictiva de orígenes
- **CSRF**: Protección contra Cross-Site Request Forgery

#### Auditoría y Logging
- **Login Attempts**: Registro de todos los intentos con IP
- **Security Events**: Log de eventos de seguridad
- **Error Tracking**: Seguimiento detallado de errores
- **Performance Monitoring**: Monitoreo de rendimiento

### Configuración de Roles y Permisos

```java
// Ejemplo de configuración de seguridad
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> deleteUser(@PathVariable Long id)

@PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
public ResponseEntity<?> getUsers()

@PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO')")
public ResponseEntity<?> getMyProfile()
```

## 📁 Estructura del Proyecto

```
src/main/java/com/example/demo/
├── config/
│   ├── CorsConfig.java              # Configuración CORS
│   ├── DataInitializer.java         # Inicialización de datos
│   ├── JwtAuthenticationFilter.java # Filtro JWT
│   └── SecurityConfig.java          # Configuración de seguridad
├── controller/
│   ├── AuthController.java          # Autenticación
│   ├── UsuarioController.java       # Gestión de usuarios
│   ├── AreaController.java          # Gestión de áreas
│   ├── RoleController.java          # Gestión de roles
│   └── TramiteController.java       # Gestión de trámites
├── dto/
│   ├── request/
│   │   ├── LoginRequest.java        # Login
│   │   ├── CreateUsuarioRequest.java# Crear usuario
│   │   ├── AdminResetPasswordRequest.java # Reset password
│   │   └── ...otros DTOs de request
│   └── response/
│       ├── LoginResponse.java       # Respuesta de login
│       ├── UsuarioResponse.java     # Respuesta de usuario
│       └── ...otros DTOs de response
├── model/
│   ├── Usuario.java                 # Entidad Usuario
│   ├── Role.java                    # Entidad Rol
│   ├── Area.java                    # Entidad Área
│   ├── Tramite.java                 # Entidad Trámite
│   ├── LoginAttempt.java            # Intentos de login
│   └── ...otras entidades
├── repository/
│   ├── UsuarioRepository.java       # Repositorio usuarios
│   ├── RoleRepository.java          # Repositorio roles
│   ├── AreaRepository.java          # Repositorio áreas
│   ├── TramiteRepository.java       # Repositorio trámites
│   └── LoginAttemptRepository.java  # Repositorio intentos
├── service/
│   ├── AuthService.java             # Lógica autenticación
│   ├── JwtService.java              # Servicio JWT
│   ├── UsuarioService.java          # Lógica usuarios
│   ├── AreaService.java             # Lógica áreas
│   └── TramiteService.java          # Lógica trámites
└── exception/
    ├── GlobalExceptionHandler.java  # Manejo global errores
    └── CustomExceptions.java        # Excepciones personalizadas

src/main/resources/
├── application.properties           # Configuración principal
├── application-dev.properties       # Configuración desarrollo
├── application-prod.properties      # Configuración producción
└── data.sql                        # Datos iniciales (opcional)
```
n

### Relaciones de Entidades

- **Usuario** ←→ **Role** (Many-to-One)
- **Usuario** ←→ **Area** (Many-to-One, opcional)
- **Tramite** ←→ **Usuario** (Many-to-One)
- **Tramite** ←→ **TipoTramite** (Many-to-One)
- **Tramite** ←→ **EstadoTramite** (Many-to-One)

## 🧪 Testing y Debugging

### Comandos de Testing

```bash
# Ejecutar todas las pruebas
./gradlew test

# Ejecutar pruebas con reporte de cobertura
./gradlew jacocoTestReport


implementa, {
kahalj. try: (q){
return("cambia")  
}catch{
  se espera , esto debe : function always motion ,!if
}
# Ejecutar pruebas específicas
./gradlew test --tests AuthControllerTest

# Ejecutar en modo debug
./gradlew bootRun --debug-jvm
```

### Pruebas con cURL

```bash
# 1. Obtener token
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","password":"admin123"}' | \
  jq -r '.token')

# 2. Listar usuarios
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/usuarios

# 3. Crear usuario
curl -X POST http://localhost:8080/api/usuarios \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "apellidos": "User",
    "tipoDocumento": "DNI",
    "numDocumento": "87654321",
    "correo": "test@untumbes.edu.pe",
    "roleId": 3
  }'
```

### Logs Importantes

```bash
# Ver logs de autenticación
tail -f logs/auth.log

# Ver logs de aplicación
tail -f logs/application.log

# Ver logs de errores
tail -f logs/error.log
```

## 🚀 Despliegue

### Build de Producción

```bash
# Compilar para producción
./gradlew clean build -Pprod

# Generar JAR optimizado
./gradlew bootJar

# El JAR estará en: build/libs/demo-0.0.1-SNAPSHOT.jar
```

### Configuración de Producción

#### 1. Variables de entorno de producción
```env
# Production Environment
SPRING_PROFILES_ACTIVE=prod
DB_HOST=prod-mysql-server:3306
DB_NAME=tramite_documentario_prod
JWT_SECRET=super_secure_secret_key_change_in_production
SERVER_PORT=8080
ALLOWED_ORIGINS=https://tramites.untumbes.edu.pe

# SSL Configuration
SERVER_SSL_ENABLED=true
SERVER_SSL_KEY_STORE=classpath:keystore.p12
SERVER_SSL_KEY_STORE_PASSWORD=your_keystore_password
```

#### 2. Docker Deployment
```dockerfile
FROM openjdk:17-jdk-alpine
COPY build/libs/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

#### 3. Systemd Service
```ini
[Unit]
Description=Tramite Documentario Backend
After=mysql.service

[Service]
Type=simple
User=tramite
ExecStart=/usr/bin/java -jar /opt/tramite-backend/app.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## ⚠️ Consideraciones de Seguridad

### Producción
- ✅ **Cambiar JWT Secret**: Usar secreto fuerte y único
- ✅ **HTTPS**: Implementar SSL/TLS obligatorio
- ✅ **Firewall**: Configurar reglas de firewall restrictivas
- ✅ **Database**: Usar credenciales seguras y conexión cifrada
- ✅ **Logs**: Configurar rotación y monitoreo de logs
- ✅ **Backup**: Implementar respaldo automático de BD
- ✅ **Rate Limiting**: Configurar límites por IP
- ✅ **CORS**: Restringir orígenes permitidos

### Desarrollo
- ⚠️ **Deshabilitar**: `/api/auth/init` en producción
- ⚠️ **No commitear**: Archivos `.env` con credenciales reales
- ⚠️ **Debug**: Deshabilitar logs SQL en producción

## 📈 Monitoreo y Observabilidad

### Métricas Disponibles
```http
GET /actuator/health
GET /actuator/info
GET /actuator/metrics
GET /actuator/loggers
```

### Health Checks
```bash
# Health check básico
curl http://localhost:8080/actuator/health

# Health check detallado
curl http://localhost:8080/actuator/health/db
```

## 🤝 Contribución

### Flujo de Desarrollo

1. **Fork** del repositorio
2. **Crear rama** de feature: `git checkout -b feature/nueva-funcionalidad`
3. **Desarrollar** siguiendo convenciones de código
4. **Testing** exhaustivo de la funcionalidad
5. **Commit** con mensajes descriptivos: `git commit -m 'feat: agregar endpoint de notificaciones'`
6. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
7. **Pull Request** con descripción detallada

### Convenciones de Código

- **Nomenclatura**: camelCase para variables, PascalCase para clases
- **Documentación**: JavaDoc en métodos públicos
- **Testing**: Cobertura mínima del 80%
- **Logging**: Usar niveles apropiados (DEBUG, INFO, WARN, ERROR)
- **Validaciones**: Usar Bean Validation en DTOs
- **Excepciones**: Usar excepciones personalizadas específicas

### Code Review Checklist

- [ ] Funcionalidad implementada correctamente
- [ ] Tests unitarios escritos y pasando
- [ ] Documentación actualizada
- [ ] Sin vulnerabilidades de seguridad
- [ ] Rendimiento optimizado
- [ ] Logs apropiados implementados

## 📝 Changelog

### v2.0.0 (2025-01-XX)
- ✅ Sistema completo de gestión de usuarios con CRUD
- ✅ Gestión de áreas organizacionales
- ✅ Sistema de trámites documentarios
- ✅ Calificación de atención por usuarios
- ✅ Reset de contraseñas por administrador
- ✅ Validación anti-reutilización de contraseñas
- ✅ Dashboard diferenciado por roles
- ✅ Descarga de documentos en lote

### v1.0.0 (2024-12-XX)
- ✅ Sistema de autenticación JWT con refresh tokens
- ✅ Roles dinámicos sin restricciones de enum
- ✅ Gestión básica de usuarios y roles
- ✅ Sistema de seguridad con bloqueo automático
- ✅ Inicialización automática de datos
- ✅ API RESTful básica

## 📞 Soporte y Contacto

### Para Desarrolladores
- **Documentación**: Ver este README y comentarios en código
- **Issues**: Usar GitHub Issues para reportar bugs
- **Dudas Técnicas**: Contactar al equipo de desarrollo

### Para Usuarios Finales
- **Mesa de Partes**: Lun-Vie 7:30 AM - 3:00 PM
- **Teléfono**: 072-523929
- **Email**: soporte.tramites@untumbes.edu.pe
- **Ubicación**: Av. Universitaria s/n, Pampa Grande, Tumbes

### Recursos Adicionales
- **Manual de Usuario**: Disponible en `/manual` del frontend
- **API Documentation**: Swagger UI en `/swagger-ui.html` (desarrollo)
- **Postman Collection**: Disponible en `/docs/postman/`

## 📄 Licencia

© 2025 Universidad Nacional de Tumbes. Todos los derechos reservados.
Institución acreditada por SUNEDU.

**Sistema desarrollado específicamente para optimizar los procesos administrativos y académicos de la comunidad universitaria de UNTUMBES.**

---

**Desarrollado por Jhafet Cánepa usando Spring Boot y las mejores prácticas de desarrollo Java empresarial.**