# Sistema de Trámite Documentario - Backend

Sistema gestión de trámites documentarios desarrollado con Spring Boot 3.x, que incluye autenticación JWT, gestión de usuarios, roles dinámicos, sistema de áreas y funcionalidades avanzadas de seguridad.

## 🚀 Características

- **Autenticación JWT** con access y refresh tokens
- **Bloqueo automático** por intentos fallidos
- **Roles dinámicos** con permisos granulares
- **Gestión completa de trámites** con estados y prioridades
- **Sistema de notificaciones** en tiempo real vía WebSocket
- **Emails transaccionales** con templates HTML profesionales
- **Seguridad avanzada** con rate limiting y sanitización de inputs
- **Validación de archivos** multicapa con verificación de firmas
- **Sistema de calificaciones** y retroalimentación

## 🛠️ Tecnologías

- **Java 17+** - Lenguaje principal
- **Spring Boot 3.x** - Framework base
- **Spring Security 6** - Autenticación y autorización
- **MySQL 8.0+** - Base de datos
- **JWT** - Autenticación stateless
- **WebSocket** - Notificaciones en tiempo real
- **Gradle 8** - Herramienta de construcción

## 📋 Prerrequisitos

- JDK 17 o superior
- MySQL 8.0 o superior
- Gradle 8.0 o superior


### Base de Datos

```sql
CREATE DATABASE db_tramites
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

## 🚀 Instalación

### 1. Clonar repositorio
```bash
git clone <url-del-repositorio>
cd tramite_documentario/back
```

### 2. Ejecutar aplicación
```bash
./gradlew bootRun
```

### 3. Verificar funcionamiento
```bash
curl http://localhost:8081/api/auth/status
```

```

## 🔒 Seguridad

### Rate Limiting
- **Login**: 5 intentos por minuto
- **API General**: 60 requests por minuto
- **Upload**: 10 archivos por minuto
- **Búsqueda**: 100 requests por minuto

### Validación de Archivos
- **Tamaño máximo**: 10MB por archivo
- **Tipos permitidos**: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, GIF, TXT
- **Verificación**: Magic numbers y tipos MIME
- **Protección**: Path traversal prevention

### Sanitización
- **XSS Protection**: Escapado automático de HTML
- **SQL Injection**: Detección de patrones maliciosos
- **Validación**: Longitud y formato de campos


## 📄 Licencia

© 2025 Universidad Nacional de Tumbes. Todos los derechos reservados.

**Desarrollado por Jhafet Cánepa**