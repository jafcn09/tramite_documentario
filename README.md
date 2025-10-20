# Sistema de Trámite Documentario - Frontend

Aplicación Angular 17 para gestión integral de trámites documentarios universitarios con sistema de roles, notificaciones en tiempo real y diseño responsive.
## Tecnologías
- **Angular 17.3.0** - Framework principal
- **TypeScript 5.4.2** - Lenguaje de desarrollo
- **Tailwind CSS** - Framework de estilos
- **RxJS 7.8.0** - Programación reactiva
- **FontAwesome 7.0.0** - Sistema de iconos
- **WebSocket (STOMP)** - Comunicación en tiempo real
- **Angular SSR** - Renderizado del lado del servidor
## Características
- Dashboards personalizados por tipo de usuario
- Notificaciones en tiempo real vía WebSocket
- Búsqueda pública de trámites por expediente
- Gestión completa de documentos y archivos adjuntos
- Diseño responsive mobile-first
- Autenticación y autorización por rutas
- Seguimiento de progreso de trámites con días hábiles
- Sistema de descargas con contador visual

## Prerrequisitos

- Node.js 18+
- npm 9+
- Angular CLI 17.3.11+

## Instalación

1. **Instalar dependencias**
```bash
cd tramite_documentario/front
npm install
```
3. **Ejecutar aplicación**
```bash
npm start
```
## Estructura del Proyecto

```
src/app/
├── admin/                    # Dashboard administrativo
├── administrativo/           # Panel staff administrativo
├── usuario/                  # Dashboard usuarios regulares
├── estudiante/               # Panel estudiantes
│   ├── dashboard/            # Dashboard principal estudiante
│   ├── nuevo-tramite/        # Creación de trámites
│   └── notificaciones/       # Sistema de notificaciones
├── features/                 # Funcionalidades principales
│   ├── mis-tramites/         # Gestión de trámites propios
│   ├── bandeja-tramites/     # Bandeja administrativa
│   └── tramites/             # Componentes de trámites
├── services/                 # Servicios HTTP y lógica
│   ├── auth.service.ts       # Autenticación
│   ├── mis-tramites.service.ts # Gestión de trámites
│   └── notification.service.ts # WebSocket notifications
├── shared/                   # Componentes compartidos
├── guards/                   # Protección de rutas
├── models/                   # Interfaces TypeScript
└── environments/             # Configuraciones de entorno
```


## Configuración de Build

- **Desarrollo**: `ng serve` con hot reload
- **Producción**: Build optimizado con tree-shaking y minificación
- **SSR**: Soporte para renderizado del lado del servidor

## Servicios Principales

- **AuthService**: Manejo de autenticación y roles
- **MisTramitesService**: CRUD de trámites propios
- **NotificationService**: WebSocket para notificaciones
- **TramiteService**: Gestión general de trámites


## Universidad Nacional de Tumbes
**Desarrollado por Jhafet Cánepa - 2025**