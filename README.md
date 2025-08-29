# Sistema de Trámite Documentario - Backend

Sistema backend para gestión de trámites documentarios desarrollado con Spring Boot, que incluye autenticación JWT con refresh tokens, gestión de usuarios, roles dinámicos y sistema de seguridad robusto.

## 🚀 Características Principales

- **Autenticación JWT** con access tokens y refresh tokens
- **Roles dinámicos** - Creación de roles personalizados sin restricciones de enum
- **Gestión de usuarios** con múltiples roles y permisos
- **Sistema de seguridad** con bloqueo automático por intentos fallidos
- **Logging avanzado** para auditoría y debugging
- **Inicialización automática** de datos por defecto
- **API RESTful** documentada

## 🛠️ Tecnologías Utilizadas

- **Java 17+**
- **Spring Boot 3.x**
- **Spring Security** para autenticación y autorización
- **Spring Data JPA** para persistencia
- **MySQL** como base de datos
- **Lombok** para reducir código boilerplate
- **Gradle** como herramienta de construcción

## 📋 Prerequisitos

- JDK 17 o superior
- MySQL 8.0 o superior
- Gradle 7.0 o superior (incluido en wrapper)

## ⚙️ Configuración

### 1. Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Database Configuration
DB_HOST=localhost:3306
DB_NAME=tramite_documentario
DB_USER=tu_usuario
DB_PASSWORD=tu_password

# JWT Configuration
JWT_SECRET=mySecretKeyForJWTTokenGenerationPleaseChangeThis
JWT_EXPIRATION=86400000

# Mail Configuration (opcional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_password_app

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Server Configuration
SERVER_PORT=8081
```

### 2. Base de Datos

```sql
CREATE DATABASE tramite_documentario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configuración en application.properties

El archivo `application.properties` está configurado para usar variables de entorno:

```properties
spring.application.name=demo

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:${DB_HOST}/${DB_NAME}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}
jwt.refresh.expiration=604800000

# Server Configuration
server.port=${SERVER_PORT:8081}
```

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd tramite_documentario/back
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

### 3. Ejecutar la aplicación
```bash
# Usando Gradle Wrapper
./gradlew bootRun

# O compilar y ejecutar
./gradlew build
java -jar build/libs/demo-0.0.1-SNAPSHOT.jar
```

### 4. Verificar que esté funcionando
```bash
curl http://localhost:8081/api/auth/status
```

## 🔐 Sistema de Autenticación

### Inicialización Automática

Al iniciar la aplicación, se crean automáticamente:
- **Roles por defecto**: ADMIN, USUARIO
- **Usuario administrador**: admin / admin123
- **Tokens iniciales** mostrados en los logs

### Endpoints de Autenticación

#### 1. Obtener tokens iniciales (desarrollo)
```http
GET /api/auth/init
```
Respuesta:
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
    "correo": "admin@example.com"
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "admin123"
}
```

#### 3. Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer <refresh_token>
```

#### 4. Validar Token
```http
POST /api/auth/validate-token
Authorization: Bearer <access_token>
```

## 👥 Gestión de Roles

### Características de los Roles

- **Roles dinámicos**: Puedes crear cualquier rol con nombre personalizado
- **No hay restricciones de enum**: Los nombres son strings libres
- **Gestión completa**: Crear, leer, actualizar y eliminar roles

### Endpoints de Roles

#### Listar todos los roles
```http
GET /api/roles
Authorization: Bearer <token>
```

#### Obtener rol por ID
```http
GET /api/roles/{id}
Authorization: Bearer <token>
```

#### Obtener rol por nombre
```http
GET /api/roles/name/{name}
Authorization: Bearer <token>
```

#### Crear nuevo rol
```http
POST /api/roles
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "SUPERVISOR_VENTAS",
  "description": "Supervisor del área de ventas con permisos especiales"
}
```

#### Actualizar rol
```http
PUT /api/roles/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "GERENTE_GENERAL",
  "description": "Gerente general con acceso completo"
}
```

#### Eliminar rol
```http
DELETE /api/roles/{id}
Authorization: Bearer <token>
```

## 👤 Gestión de Usuarios

### Endpoints de Usuarios
```http
GET /api/usuarios
Authorization: Bearer <token>
```

## 🔒 Sistema de Seguridad

### Características de Seguridad

- **JWT con refresh tokens**: Tokens de acceso (24h) y refresh (7 días)
- **Bloqueo automático**: Después de 5 intentos fallidos (bloqueo temporal) o 10 (permanente)
- **Registro de intentos**: Todos los intentos de login se registran con IP
- **Validaciones robustas**: Verificación de estado de cuenta, expiración de contraseña

### Rutas Protegidas

- **Públicas**: `/api/auth/**`, `/error`, `/`
- **Protegidas**: `/api/roles/**`, `/api/usuarios/**`

## 📁 Estructura del Proyecto

```
src/main/java/com/example/demo/
├── config/
│   ├── DataInitializer.java          # Inicialización de datos
│   ├── JwtAuthenticationFilter.java  # Filtro JWT
│   └── SecurityConfig.java           # Configuración de seguridad
├── controller/
│   ├── AuthController.java           # Endpoints de autenticación
│   └── RoleController.java           # Endpoints de roles
├── dto/
│   ├── LoginRequest.java             # DTO para login
│   ├── LoginResponse.java            # DTO para respuesta de login
│   ├── CreateRoleRequest.java        # DTO para crear rol
│   └── UpdateRoleRequest.java        # DTO para actualizar rol
├── model/
│   ├── Usuario.java                  # Entidad Usuario
│   ├── Role.java                     # Entidad Rol
│   └── LoginAttempt.java             # Entidad de intentos de login
├── repository/
│   ├── UsuarioRepository.java        # Repositorio de usuarios
│   ├── RoleRepository.java           # Repositorio de roles
│   └── LoginAttemptRepository.java   # Repositorio de intentos
└── service/
    ├── AuthService.java              # Lógica de autenticación
    ├── JwtService.java               # Servicio JWT
    ├── RoleService.java              # Servicio de roles
    └── UsuarioService.java           # Servicio de usuarios
```

## 📊 Base de Datos

### Tablas Principales

- **usuarios**: Información de usuarios del sistema
- **roles**: Roles dinámicos del sistema
- **login_attempts**: Registro de intentos de login para auditoría

## 🐛 Debugging y Logs

### Logs Importantes

La aplicación genera logs detallados para:
- Intentos de autenticación
- Operaciones CRUD en roles
- Errores de validación
- Acceso a endpoints protegidos

### Ejemplo de logs de inicio:
```
========================================
=== APPLICATION STARTED SUCCESSFULLY ===
========================================
Default Admin Credentials:
  Username: admin
  Password: admin123
========================================
Initial Access Token (valid for 24 hours):
  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
========================================
```

## 🧪 Testing

### Pruebas rápidas con curl

```bash
# 1. Obtener tokens
curl http://localhost:8081/api/auth/init

# 2. Listar roles (usa el token del paso anterior)
curl -H "Authorization: Bearer <token>" http://localhost:8081/api/roles

# 3. Crear rol personalizado
curl -X POST http://localhost:8081/api/roles \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "MI_ROL_CUSTOM", "description": "Mi rol personalizado"}'
```

## 🔄 Flujo de Trabajo Típico

1. **Inicio de aplicación**: Se crean datos por defecto
2. **Obtener tokens**: Usar `/api/auth/init` o `/api/auth/login`
3. **Gestionar roles**: Crear roles personalizados según necesidades
4. **Gestionar usuarios**: Asignar roles a usuarios
5. **Refresh tokens**: Renovar tokens antes de expiración

## ⚠️ Notas de Seguridad

- **Producción**: Deshabilitar `/api/auth/init` en producción
- **JWT Secret**: Usar un secret fuerte y único
- **Variables de entorno**: Nunca commitear archivos `.env`
- **HTTPS**: Usar HTTPS en producción
- **Base de datos**: Configurar conexiones seguras

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Add nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📝 Changelog

### v1.0.0
- Sistema de autenticación JWT con refresh tokens
- Roles dinámicos sin restricciones de enum
- Gestión completa de usuarios y roles
- Sistema de seguridad con bloqueo automático
- Inicialización automática de datos
- API RESTful completa

## 📞 Soporte

Para problemas o preguntas:
1. Revisar logs de la aplicación
2. Verificar configuración de variables de entorno
3. Consultar este README
4. Crear issue en el repositorio

---

**Desarrollado con ❤️ usando Spring Boot y tecnologías modernas de Java**