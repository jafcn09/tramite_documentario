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
- **Flujo de derivación** entre trabajadores
- **Respuestas con archivos adjuntos**
- **Rechazo de trámites** con motivos y observaciones
- **Búsqueda pública** de trámites por código

### 🔔 Sistema de Notificaciones
- **Notificaciones en tiempo real** vía WebSocket
- **Notificaciones por email** con templates HTML profesionales
- **Persistencia de notificaciones** en base de datos
- **Notificaciones por rol** o usuarios específicos
- **Prioridades de notificación** (Baja, Normal, Alta, Urgente)
- **Limpieza automática** de notificaciones antiguas
- **Historial completo** de notificaciones

### 📧 Sistema de Emails
- **Templates HTML profesionales** con diseño responsivo
- **Emails transaccionales** para cada acción del trámite
- **Notificación de recepción** con timeline de próximos pasos
- **Notificación de derivación** con detalles completos
- **Notificación de respuesta** con documentos adjuntos
- **Notificación de rechazo** con motivos detallados
- **Notificación de autoasignación** con diseño animado
- **Notificación de edición** con changelog de cambios

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
- **WebSocket (STOMP)** - Notificaciones en tiempo real
- **JavaMail** - Envío de correos electrónicos
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

#### Responder trámite (ADMINISTRATIVO/ADMIN)
```http
POST /api/tramites/{id}/responder
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "respuesta": "Su solicitud ha sido aprobada",
  "observaciones": "Se adjuntan los documentos solicitados",
  "asunto": "Respuesta a Solicitud de Certificado",
  "archivos": [archivo1.pdf, archivo2.pdf]
}
```

#### Derivar trámite (ADMINISTRATIVO/ADMIN)
```http
POST /api/tramites/{id}/derivar
Authorization: Bearer <token>
Content-Type: application/json

{
  "trabajadorNuevoId": 5,
  "motivo": "Requiere atención especializada del área de Recursos Humanos"
}
```

#### Rechazar trámite (ADMINISTRATIVO/ADMIN)
```http
PUT /api/tramites/{id}/rechazar
Authorization: Bearer <token>
Content-Type: application/json

{
  "tramiteId": 10,
  "motivoRechazo": "Documentación incompleta",
  "observaciones": "Falta adjuntar copia de DNI y comprobante de pago"
}
```

#### Búsqueda pública de trámites
```http
GET /api/tramites/public/buscar?codigo=TRAM-2025-001
```

#### Descargar archivo público
```http
GET /api/tramites/public/{codigo}/archivo/{nombreArchivo}
```

## 🔔 API de Notificaciones

### Endpoints de Notificaciones

#### Obtener mis notificaciones
```http
GET /api/notificaciones/mis-notificaciones?page=0&size=20
Authorization: Bearer <token>
```

#### Obtener todas las notificaciones (ADMIN)
```http
GET /api/notificaciones?page=0&size=20
Authorization: Bearer <admin_token>
```

#### Crear notificación (ADMIN)
```http
POST /api/notificaciones
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "usuarioDestinatarioId": 5,
  "titulo": "Nueva actualización del sistema",
  "mensaje": "Se han implementado mejoras en el módulo de trámites",
  "tipo": "SISTEMA",
  "prioridad": "NORMAL",
  "rutaDestino": "/admin/configuracion"
}
```

#### Crear notificación por rol (ADMIN)
```http
POST /api/notificaciones
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "roleDestinatario": "ADMINISTRATIVO",
  "titulo": "Capacitación obligatoria",
  "mensaje": "Se realizará capacitación el día viernes 15",
  "tipo": "SISTEMA",
  "prioridad": "ALTA"
}
```

#### Marcar notificación como leída
```http
PUT /api/notificaciones/{id}/marcar-leida
Authorization: Bearer <token>
```

#### Marcar todas como leídas
```http
PUT /api/notificaciones/marcar-todas-leidas
Authorization: Bearer <token>
```

#### Eliminar notificación (ADMIN)
```http
DELETE /api/notificaciones/{id}
Authorization: Bearer <admin_token>
```

#### Limpiar notificaciones antiguas (ADMIN)
```http
DELETE /api/notificaciones/limpiar-antiguas?dias=30
Authorization: Bearer <admin_token>
```

### WebSocket - Notificaciones en Tiempo Real

#### Conectarse al WebSocket
```javascript
const socket = new SockJS('http://localhost:8081/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({
  'Authorization': 'Bearer ' + token
}, (frame) => {
  console.log('Connected: ' + frame);

  // Suscribirse a notificaciones personales
  stompClient.subscribe('/user/queue/notificaciones', (message) => {
    const notificacion = JSON.parse(message.body);
    console.log('Nueva notificación:', notificacion);
  });
});
```

## 📧 Sistema de Emails

### Templates HTML Disponibles

El sistema cuenta con templates HTML profesionales y responsivos para:

#### 1. Notificación de Recepción
- **Trigger**: Cuando un trabajador recepciona un trámite
- **Destinatario**: Usuario solicitante
- **Contenido**:
  - Código y detalles del trámite
  - Personal asignado
  - Tiempo estimado de procesamiento
  - Timeline de próximos pasos
  - Botón para seguimiento en línea

#### 2. Notificación de Derivación
- **Trigger**: Cuando un trámite es derivado a otro trabajador
- **Destinatario**: Nuevo trabajador asignado
- **Contenido**:
  - Motivo de la derivación
  - Detalles completos del trámite
  - Badge de prioridad con colores dinámicos
  - Información del solicitante
  - Fecha límite de atención
  - Botón directo para atender

#### 3. Notificación de Respuesta
- **Trigger**: Cuando se responde un trámite
- **Destinatario**: Usuario solicitante
- **Contenido**:
  - Respuesta del administrativo
  - Información del trámite
  - Observaciones adicionales
  - Cantidad de documentos adjuntos
  - Botón para ver detalles completos

#### 4. Notificación de Rechazo
- **Trigger**: Cuando se rechaza un trámite
- **Destinatario**: Usuario solicitante
- **Contenido**:
  - Motivo del rechazo
  - Observaciones detalladas
  - Fecha de rechazo
  - Responsable del rechazo
  - Pasos a seguir
  - Botón para ver en el sistema

#### 5. Notificación de Autoasignación
- **Trigger**: Cuando un trabajador se asigna un trámite
- **Destinatario**: Trabajador que se asignó
- **Contenido**:
  - Confirmación de asignación
  - Detalles del trámite
  - Prioridad con colores
  - Plazo de atención
  - Diseño con animaciones CSS

#### 6. Notificación de Edición
- **Trigger**: Cuando un usuario edita su trámite
- **Destinatario**: Usuario que editó
- **Contenido**:
  - Changelog de cambios (antes/después)
  - Detalles actualizados
  - Fecha de edición
  - Diseño moderno con cards

### Características de los Templates

- ✅ **Diseño Responsivo**: Compatible con todos los dispositivos
- ✅ **Gradientes Profesionales**: Colores según tipo de notificación
- ✅ **Botones Call-to-Action**: Enlaces directos al sistema
- ✅ **Tablas de Información**: Detalles organizados visualmente
- ✅ **Badges Dinámicos**: Prioridades con colores personalizados
- ✅ **Footer Institucional**: Información de la universidad
- ✅ **Encoding UTF-8**: Soporte para caracteres especiales
- ✅ **Inline CSS**: Máxima compatibilidad con clientes de correo

### Configuración de Email

```properties
# Mail Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=noreply@untumbes.edu.pe
spring.mail.password=app_password_here
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
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
│   ├── TramiteController.java       # Gestión de trámites
│   ├── NotificacionController.java  # Gestión de notificaciones
│   ├── NotificacionWebSocketController.java # WebSocket notificaciones
│   └── ReporteController.java       # Generación de reportes
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
│   ├── TramiteService.java          # Lógica trámites
│   ├── NotificacionService.java     # Lógica notificaciones
│   ├── EmailService.java            # Envío de emails con templates
│   └── ReporteService.java          # Generación de reportes
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
- **Tramite** ←→ **Usuario** (Many-to-One - solicitante)
- **Tramite** ←→ **Usuario** (Many-to-One - trabajador asignado)
- **Tramite** ←→ **TramiteHistorial** (One-to-Many)
- **Notificacion** ←→ **Usuario** (Many-to-One - destinatario)
- **Notificacion** ←→ **Tramite** (Many-to-One, opcional)
- **TramiteHistorial** ←→ **Usuario** (Many-to-One - quien realiza la acción)

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

### v2.1.0 (2025-01-XX) - Mejoras de Notificaciones y UI
- ✅ **Sistema de notificaciones completo** con WebSocket en tiempo real
- ✅ **Templates HTML profesionales** para emails transaccionales
- ✅ **Notificación de recepción** con timeline visual
- ✅ **Notificación de derivación** con badge de prioridad dinámica
- ✅ **Notificación de respuesta** con documentos adjuntos
- ✅ **Notificación de rechazo** mejorada con diseño alerta
- ✅ **Notificación de autoasignación** con animaciones CSS
- ✅ **Notificación de edición** con changelog de cambios
- ✅ **Iconos diferenciados** en acciones rápidas de notificaciones
- ✅ **Limpieza automática** de notificaciones antiguas
- ✅ **Gestión de notificaciones** por rol o usuarios específicos

### v2.0.0 (2025-01-XX)
- ✅ Sistema completo de gestión de usuarios con CRUD
- ✅ Gestión de áreas organizacionales
- ✅ Sistema de trámites documentarios
- ✅ Calificación de atención por usuarios
- ✅ Reset de contraseñas por administrador
- ✅ Validación anti-reutilización de contraseñas
- ✅ Dashboard diferenciado por roles
- ✅ Descarga de documentos en lote
- ✅ Flujo completo de derivación de trámites
- ✅ Sistema de respuestas con archivos adjuntos
- ✅ Rechazo de trámites con motivos
- ✅ Búsqueda pública de trámites

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


## 📄 Licencia

© 2025 Universidad Nacional de Tumbes. Todos los derechos reservados.
Institución acreditada por SUNEDU.

**Sistema desarrollado específicamente para optimizar los procesos administrativos y académicos de la comunidad universitaria de UNTUMBES.**

---

**Desarrollado por Jhafet Cánepa usando Spring Boot y las mejores prácticas de desarrollo Java empresarial.**