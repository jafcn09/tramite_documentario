# Sistema de Trámite Documentario - UNTUMBES Frontend

## 📋 Descripción
Sistema integral de gestión documentaria para la Universidad Nacional de Tumbes, desarrollado con Angular 18+ y diseñado para optimizar los procesos de tramitación académica y administrativa.

## 🚀 Características Principales

### Módulos Implementados
- **🏠 Home**: Página principal con navegación a todos los módulos
- **📄 Consulta y Seguimiento**: Búsqueda de estado de trámites por número de expediente
- **👥 Servicios Administrativos**: Sistema de autenticación y gestión
- **📖 Manual de Usuario**: Guía completa del sistema

### Roles y Funcionalidades

#### 🔐 ADMIN (Administrador del Sistema)
- Gestión completa de usuarios
- Vista global de todos los trámites del sistema
- Gestión de áreas y roles
- Reportes del sistema
- Configuración avanzada

#### 👔 ADMINISTRATIVO (Personal Administrativo/Abogados)
- Procesamiento de trámites asignados
- Aprobar, rechazar y derivar trámites
- Dashboard administrativo personalizado
- Gestión de trámites de área

#### 👨‍🏫 USUARIO (Docentes)
- Creación de trámites personales
- Seguimiento de sus propios trámites
- Calificación de atención recibida
- Dashboard personal de estadísticas

### Funcionalidades Destacadas
- ✅ Formularios con validación en tiempo real
- ✅ Sistema de autenticación JWT
- ✅ Roles y permisos diferenciados
- ✅ Gestión completa de usuarios con modal de edición
- ✅ Dashboard personalizado por rol
- ✅ Sistema de calificación de atención
- ✅ Descarga de documentos en ZIP
- ✅ Diseño responsive mobile-first
- ✅ Animaciones y transiciones suaves
- ✅ Notificaciones y toasts informativos
- ✅ **Sistema de notificaciones en tiempo real** con WebSocket
- ✅ **Búsqueda pública** de trámites sin autenticación
- ✅ **Flujo completo de derivación** de trámites
- ✅ **Respuestas con archivos adjuntos**
- ✅ **Rechazo de trámites** con motivos detallados
- ✅ **Notificaciones por email** con templates HTML profesionales
- ✅ **Acciones rápidas** en notificaciones (asignar, responder, derivar)
- ✅ **Organigrama institucional** jerárquico
- ✅ **Sistema de reportes** con filtros avanzados

## 🛠 Tecnologías Utilizadas

- **Framework**: Angular 17.3+
- **Estilos**: Tailwind CSS 3.x + CSS personalizado
- **Formularios**: Reactive Forms con validaciones
- **Routing**: Angular Router con guards
- **Componentes**: Standalone Components
- **Autenticación**: JWT + Guards
- **HTTP**: HttpClient con interceptors
- **WebSocket**: STOMP + SockJS para tiempo real
- **TypeScript**: v5.4
- **RxJS**: Observables y operadores reactivos
- **Iconos**: FontAwesome 7.0
- **Animaciones**: Angular Animations

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js v18 o superior
- npm v9 o superior
- Angular CLI 18+

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd tramite_documentario/front
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Editar src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080' // URL del backend
};
```

4. **Iniciar servidor de desarrollo**
```bash
npm start
# o
ng serve
```

5. **Acceder a la aplicación**
```
http://localhost:4200
```

## 🗺 Estructura de Rutas

### Rutas Públicas
| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/buscar` | Búsqueda de expedientes |
| `/login` | Login administrativo |
| `/manual` | Manual de usuario |

### Rutas Protegidas - ADMIN
| Ruta | Descripción |
|------|-------------|
| `/admin/tablero` | Panel administrativo con estadísticas |
| `/admin/gestion-usuarios` | Gestión de usuarios |
| `/admin/areas` | Gestión de áreas |
| `/admin/gestion-roles` | Gestión de roles |
| `/admin/tramites` | Vista global de trámites |
| `/admin/reportes` | Reportes del sistema |
| `/admin/notificaciones` | Gestión de notificaciones |
| `/admin/organigrama` | Organigrama institucional |
| `/admin/mis-tramites` | Mis trámites creados |
| `/admin/nuevo-tramite` | Crear nuevo trámite |
| `/admin/perfil` | Perfil de usuario |

### Rutas Protegidas - ADMINISTRATIVO
| Ruta | Descripción |
|------|-------------|
| `/administrativo/tablero` | Dashboard administrativo con métricas |
| `/administrativo/mis-tramites` | Gestión de trámites asignados |
| `/administrativo/nuevo-tramite` | Crear nuevo trámite |
| `/administrativo/notificaciones` | Notificaciones personales |
| `/administrativo/reportes` | Reportes de trámites |
| `/administrativo/perfil` | Perfil de usuario |

### Rutas Protegidas - USUARIO
| Ruta | Descripción |
|------|-------------|
| `/usuario/tablero` | Dashboard personal con estadísticas |
| `/usuario/mis-tramites` | Mis trámites personales |
| `/usuario/nuevo-tramite` | Crear nuevo trámite |
| `/usuario/bandeja-tramites` | Bandeja de trámites |
| `/usuario/notificaciones` | Notificaciones personales |
| `/usuario/perfil` | Perfil de usuario |

## 🏗 Estructura del Proyecto

```
front/
├── src/
│   ├── app/
│   │   ├── admin-login/           # Componente login
│   │   ├── administrativo/        # Módulo administrativo
│   │   ├── components/            # Componentes compartidos
│   │   │   ├── areas/            # Gestión de áreas
│   │   │   ├── user-management/  # Gestión de usuarios
│   │   │   └── role-management/  # Gestión de roles
│   │   ├── features/             # Funcionalidades principales
│   │   │   ├── mis-tramites/     # Gestión personal de trámites
│   │   │   ├── tramites/         # Sistema de trámites
│   │   │   ├── bandeja-tramites/ # Bandeja de entrada
│   │   │   └── reportes/         # Sistema de reportes
│   │   ├── guards/               # Guards de autenticación
│   │   ├── services/             # Servicios HTTP
│   │   ├── shared/               # Componentes compartidos
│   │   │   ├── layout/           # Layout principal
│   │   │   ├── modal/            # Componente modal
│   │   │   └── interfaces/       # Interfaces TypeScript
│   │   ├── home/                 # Página principal
│   │   ├── manual/               # Manual de usuario
│   │   ├── search/               # Búsqueda de trámites
│   │   ├── app.component.*       # Componente principal
│   │   └── app.routes.ts         # Configuración de rutas
│   ├── assets/                   # Recursos estáticos
│   ├── environments/             # Variables de entorno
│   └── styles.css                # Estilos globales
├── angular.json                  # Configuración Angular
├── package.json                  # Dependencias del proyecto
└── README.md                     # Este archivo
```

## 🔑 Credenciales de Prueba

### Panel Administrativo
- **Usuario**: `admin`
- **Contraseña**: `admin123`

### Usuarios de Prueba
- **Administrativo**: `administrativo` / `admin123`
- **Usuario**: `usuario` / `admin123`

## 🎨 Tema y Colores

### Colores Universitarios
- **Primary**: `#667eea` (Azul universitario)
- **Secondary**: `#764ba2` (Morado)
- **Success**: `#38a169` (Verde)
- **Warning**: `#d69e2e` (Amarillo)
- **Error**: `#e53e3e` (Rojo)
- **Info**: `#3182ce` (Azul claro)

## 📱 Características Responsive

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación automática a tablets y desktop
- **Touch Friendly**: Botones y elementos táctiles optimizados
- **Cards Adaptables**: Vista de tarjetas en móvil, tablas en desktop

## ⚡ Comandos Útiles

```bash
# Desarrollo
npm start                # Iniciar servidor de desarrollo
npm run build           # Compilar para producción
npm run test            # Ejecutar pruebas
npm run lint            # Verificar código

# Angular CLI
ng generate component   # Generar componente
ng generate service     # Generar servicio
ng generate guard       # Generar guard

# Git
git status              # Ver estado de cambios
git add .               # Agregar todos los cambios
git commit -m "mensaje" # Crear commit
git push               # Subir cambios
```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
# Los archivos compilados estarán en dist/
```

### Requerimientos del Servidor
- Servidor web (Apache, Nginx)
- Soporte para aplicaciones SPA (Single Page Application)
- Configuración de fallback a index.html
- HTTPS recomendado para producción

### Configuración Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 Configuración Avanzada

### Variables de Entorno
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  authTokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
  sessionTimeout: 3600000 // 1 hora
};
```

### Budgets CSS
Los budgets están configurados para permitir componentes complejos:
- **Warning**: 6KB por componente
- **Error**: 20KB por componente

## 🧪 Testing

```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas con coverage
npm run test -- --coverage

# Ejecutar pruebas e2e
npm run e2e
```

## 📝 Notas de Desarrollo

### Validaciones Implementadas
- Campos requeridos marcados con asterisco (*)
- Validación de email con patrón regex
- Validación de longitud mínima/máxima
- Validación personalizada de documentos
- Feedback visual en tiempo real

### Características de UX/UI
- Loading states con spinners
- Toast notifications para feedback
- Modal confirmations para acciones críticas
- Animaciones de transición suaves
- Estados de error con mensajes descriptivos

### Guards Implementados
- **AuthGuard**: Verificar autenticación
- **RoleGuard**: Verificar permisos por rol
- **RedirectGuard**: Redirección automática



## 📞 Soporte

Para soporte técnico o consultas sobre el sistema:
- **Mesa de Partes**: Lun-Vie 7:30 AM - 3:00 PM
- **Teléfono**: 072-523929
- **Ubicación**: Av. Universitaria s/n, Pampa Grande, Tumbes

## 📄 Licencia

© 2025 Universidad Nacional de Tumbes. Todos los derechos reservados.
Institución acreditada por SUNEDU.

---

**Desarrollado por Jhafet Cánepa*