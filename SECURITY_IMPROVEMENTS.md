# 🔒 Mejoras de Seguridad Implementadas - v2.2.0

## Resumen Ejecutivo

Se han implementado **tres capas críticas de seguridad** en el sistema de trámite documentario para proteger contra ataques comunes y abuso de la API:

1. **Rate Limiting** - Protección contra ataques de fuerza bruta y DDoS
2. **Sanitización de Inputs** - Prevención de ataques XSS y SQL Injection
3. **Validación de Archivos** - Protección contra malware y archivos maliciosos

---

## 📦 Dependencias Agregadas

```gradle
// Security enhancements
implementation 'com.bucket4j:bucket4j-core:8.10.1'
implementation 'org.owasp.encoder:encoder:1.2.3'
implementation 'org.apache.commons:commons-text:1.11.0'
```

### Actualizar dependencias:
```bash
./gradlew build --refresh-dependencies
```

---

## 🛡️ 1. Rate Limiting (Bucket4j)

### Archivos Creados:
- `src/main/java/com/example/demo/config/RateLimitConfig.java`
- `src/main/java/com/example/demo/config/RateLimitInterceptor.java`
- `src/main/java/com/example/demo/config/WebMvcConfig.java`

### Funcionalidad:
Limita el número de requests que un cliente puede hacer en un período de tiempo determinado.

### Límites Configurados:

| Tipo de Endpoint | Límite | Periodo |
|-----------------|--------|---------|
| Login | 5 requests | 1 minuto |
| API General | 60 requests | 1 minuto |
| Upload de Archivos | 10 uploads | 1 minuto |
| Crear Trámite | 20 requests | 1 hora |
| Búsqueda | 100 requests | 1 minuto |

### Identificación de Cliente:
- Si está autenticado: `user:<username>`
- Si no: `<IP>:<hashUserAgent>`

### Respuesta cuando se excede el límite:
```json
{
  "error": "Too Many Requests",
  "message": "Has excedido el límite de solicitudes. Por favor, intenta más tarde.",
  "status": 429,
  "limitType": "API_GENERAL"
}
```

### Headers en Respuestas:
- `X-RateLimit-Remaining`: Tokens restantes
- `X-RateLimit-Limit`: Límite máximo

### Cómo Usar:
```java
@Autowired
private RateLimitConfig rateLimitConfig;

// Verificar manualmente si es necesario
String clientKey = getClientIP(request);
if (!rateLimitConfig.tryConsume(clientKey, RateLimitType.LOGIN)) {
    throw new TooManyRequestsException("Rate limit excedido");
}
```

### Auto-aplicado:
El interceptor se aplica automáticamente a todos los endpoints `/api/**` excepto:
- `/api/auth/refresh-token`
- `/error`

---

## 🧹 2. Sanitización de Inputs (XSS Protection)

### Archivo Creado:
- `src/main/java/com/example/demo/service/InputSanitizerService.java`

### Funcionalidad:
Limpia y valida todos los inputs del usuario para prevenir ataques XSS y SQL Injection.

### Métodos Disponibles:

#### Sanitización:
- `sanitizeHtml(String)` - Escapa HTML peligroso
- `sanitizeJavaScript(String)` - Escapa JavaScript
- `sanitizeUrl(String)` - Sanitiza URLs
- `sanitizeFilename(String)` - Limpia nombres de archivos
- `sanitizeTextField(String)` - Sanitización completa (HTML + detección SQL)

#### Validación:
- `validateLength(String fieldName, String value, int maxLength)`
- `validateNotEmpty(String fieldName, String value)`
- `containsSqlInjection(String)` - Detecta patrones SQL

### Patrones XSS Detectados:
```java
<script>, javascript:, onerror, onload, onclick,
<iframe>, <embed>, <object>, eval(), expression()
```

### Patrones SQL Detectados:
```sql
select, insert, update, delete, drop, create,
alter, exec, union, declare, --, /*, */
```

### Ejemplo de Uso:
```java
@Autowired
private InputSanitizerService inputSanitizerService;

// Validar
inputSanitizerService.validateNotEmpty("asunto", asunto);
inputSanitizerService.validateLength("descripcion", descripcion, 2000);

// Sanitizar
String asuntoLimpio = inputSanitizerService.sanitizeTextField(asunto);
String descripcionLimpia = inputSanitizerService.sanitizeTextField(descripcion);

// Usar valores sanitizados
request.setAsunto(asuntoLimpio);
request.setDescripcion(descripcionLimpia);
```

### Logs Generados:
```log
⚠️ Intento de XSS detectado en input: <script>alert('xss')</script>...
⚠️ Posible SQL Injection detectado: SELECT * FROM users WHERE...
❌ SQL Injection detectado y bloqueado
```

---

## 📎 3. Validación de Archivos

### Archivo Creado:
- `src/main/java/com/example/demo/service/FileValidationService.java`

### Funcionalidad:
Valida archivos subidos en múltiples capas para detectar archivos maliciosos.

### Validaciones Implementadas:

#### 1. Nombre de Archivo:
- ✅ Longitud máxima: 255 caracteres
- ✅ Sin path traversal: `../`, `/`, `\`
- ✅ Sin caracteres peligrosos: `<>:"|?*`

#### 2. Tamaño:
- ✅ Por archivo: máximo 10 MB
- ✅ Total: máximo 50 MB (configurable)

#### 3. Tipo MIME:
Permitidos:
- `application/pdf`
- `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- `image/jpeg`, `image/jpg`, `image/png`, `image/gif`
- `text/plain`

#### 4. Extensión:
Permitidas: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `jpg`, `jpeg`, `png`, `gif`, `txt`

#### 5. Magic Numbers (Firmas de Archivos):
Verifica que el contenido real del archivo coincida con su extensión:

| Tipo | Magic Numbers |
|------|---------------|
| PDF | `%PDF` (0x25 0x50 0x44 0x46) |
| JPEG | 0xFF 0xD8 0xFF |
| PNG | 0x89 0x50 0x4E 0x47 |

### Métodos Disponibles:
```java
@Autowired
private FileValidationService fileValidationService;

// Validar un archivo
fileValidationService.validateFile(multipartFile);

// Validar lista de archivos
fileValidationService.validateFiles(listaArchivos);

// Obtener tamaño total
long total = fileValidationService.getTotalSize(archivos);
```

### Ejemplo de Uso:
```java
if (documentos != null && !documentos.isEmpty()) {
    // Validar cada archivo
    fileValidationService.validateFiles(documentos);

    // Validar tamaño total
    long totalSize = fileValidationService.getTotalSize(documentos);
    if (totalSize > 50 * 1024 * 1024) {
        throw new IllegalArgumentException("Tamaño total excede 50MB");
    }
}
```

### Logs Generados:
```log
⚠️ Nombre de archivo sospechoso detectado: ../../../etc/passwd
🚫 Path traversal detectado en nombre de archivo: hack.txt
⚠️ Archivo excede tamaño máximo: grande.pdf - 15728640 bytes
⚠️ Tipo MIME no permitido: application/x-executable
🚫 Archivo con extensión .pdf no coincide con su contenido: fake.pdf
✅ Archivo validado correctamente: documento.pdf (2.5 MB)
```

---

## 🔧 Integración en TramiteController

Las tres mejoras se aplican automáticamente en el endpoint de crear trámite:

```java
@PostMapping(consumes = {"multipart/form-data"})
@PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
public ResponseEntity<TramiteResponse> crearTramite(
        @RequestParam("asunto") String asunto,
        @RequestParam("descripcion") String descripcion,
        @RequestParam(value = "documentos", required = false) List<MultipartFile> documentos) {

    // 🔒 VALIDACIÓN DE SEGURIDAD
    // 1. Sanitizar inputs de texto
    inputSanitizerService.validateNotEmpty("asunto", asunto);
    inputSanitizerService.validateNotEmpty("descripcion", descripcion);
    inputSanitizerService.validateLength("asunto", asunto, 255);
    inputSanitizerService.validateLength("descripcion", descripcion, 2000);

    String asuntoSanitizado = inputSanitizerService.sanitizeTextField(asunto);
    String descripcionSanitizada = inputSanitizerService.sanitizeTextField(descripcion);

    // 2. Validar archivos si existen
    if (documentos != null && !documentos.isEmpty()) {
        fileValidationService.validateFiles(documentos);

        long totalSize = fileValidationService.getTotalSize(documentos);
        if (totalSize > 50 * 1024 * 1024) {
            throw new IllegalArgumentException(
                "El tamaño total de los archivos excede el límite de 50MB"
            );
        }
    }

    // 3. Usar valores sanitizados
    TramiteRequest request = new TramiteRequest();
    request.setTitulo(asuntoSanitizado);
    request.setDescripcion(descripcionSanitizada);

    // ... resto del código
}
```

---

## 🧪 Pruebas de Seguridad

### 1. Probar Rate Limiting:
```bash
# Hacer múltiples requests rápidas
for i in {1..10}; do
  curl -X POST http://localhost:8081/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"usuario":"admin","password":"wrong"}' &
done

# Después de 5 intentos, deberías ver:
# {"error":"Too Many Requests","message":"Has excedido...","status":429}
```

### 2. Probar Sanitización XSS:
```bash
curl -X POST http://localhost:8081/api/tramites \
  -H "Authorization: Bearer $TOKEN" \
  -F "asunto=<script>alert('xss')</script>" \
  -F "descripcion=Test" \
  -F "tipoTramiteId=1" \
  -F "prioridadId=1"

# El script será sanitizado y guardado como texto plano
```

### 3. Probar Validación de Archivos:
```bash
# Intentar subir archivo muy grande (>10MB)
curl -X POST http://localhost:8081/api/tramites \
  -H "Authorization: Bearer $TOKEN" \
  -F "asunto=Test" \
  -F "descripcion=Test" \
  -F "documentos=@archivo_grande.pdf"

# Respuesta esperada:
# {"error":"El archivo excede el tamaño máximo permitido de 10 MB"}
```

---

## ⚠️ Consideraciones Importantes

### Producción:
1. **Ajustar límites de rate limiting** según carga esperada
2. **Monitorear logs** de intentos de ataque
3. **Configurar alertas** para eventos de seguridad
4. **Revisar periódicamente** patrones XSS detectados
5. **Mantener actualizadas** las dependencias de seguridad

### Desarrollo:
1. Los límites de rate limiting **también aplican en desarrollo**
2. Si necesitas más requests, limpia el cache:
   ```java
   rateLimitConfig.clearCache();
   ```
3. Los logs de seguridad ayudan a **identificar problemas** en inputs

---

## 📊 Métricas de Seguridad

Puedes monitorear las mejoras de seguridad con:

```java
// Obtener estadísticas de rate limiting
Map<String, Long> stats = rateLimitConfig.getCacheStats();
```

---

## 🎯 Próximos Pasos Recomendados

1. ✅ **Implementar CAPTCHA** en login después de 3 intentos fallidos
2. ✅ **Agregar WAF** (Web Application Firewall) en producción
3. ✅ **Implementar Content Security Policy** headers
4. ✅ **Agregar pruebas de penetración** automatizadas
5. ✅ **Configurar SIEM** para análisis de logs de seguridad

---

## 📚 Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Bucket4j Documentation](https://github.com/bucket4j/bucket4j)
- [OWASP Java Encoder](https://owasp.org/www-project-java-encoder/)
- [Spring Security Best Practices](https://docs.spring.io/spring-security/reference/index.html)

---

**Desarrollado por Jhafet Cánepa - Enero 2025**
**Sistema de Trámite Documentario UNTUMBES**
