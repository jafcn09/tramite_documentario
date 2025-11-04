# Sistema de Trámite Documentario - Frontend

Aplicación Angular 17 standalone para gestión de trámites con firma digital, visualización de QR, notificaciones WebSocket en tiempo real y diseño responsive TailwindCSS.

## Tecnologías

- **Angular 17.3.11** - Standalone components
- **TypeScript 5.4.2** - Tipado fuerte
- **TailwindCSS 3.4.1** - Framework de estilos
- **RxJS 7.8.0** - Programación reactiva
- **FontAwesome 7.0.0** - Iconos vectoriales
- **WebSocket STOMP** - Tiempo real
- **Angular SSR** - Server-side rendering

## Características Principales

### Gestión de Trámites
- Dashboards personalizados: Admin, Administrativo, Usuario, Estudiante
- Creación con formularios validados y archivos adjuntos
- Derivación inteligente entre áreas
- Seguimiento con días hábiles
- Búsqueda pública por expediente

### Firma Digital
- Canvas HTML5 para captura manuscrita
- Restricción por rol: Estudiantes solo SIMPLE
- Tipos: SIMPLE, CONFORMIDAD, AVANZADA, CUALIFICADA
- Conversión a Base64 para backend
- Validación de consentimiento

### Códigos QR
- Visualización en modales con diseño moderno
- Generación automática al crear trámites
- Descarga de imágenes QR en PNG
- Verificación pública sin autenticación
- Contador de escaneos

### Notificaciones
- WebSocket STOMP con reconexión automática
- Badge contador en navbar
- Marcado leído/no leído
- Navegación directa al trámite

### Seguridad
- JWT con access + refresh tokens
- Guards por rol y autenticación
- Interceptores HTTP automáticos
- Renovación automática de tokens

#
## Estructura

```
src/app/
├── admin/                  - Dashboard admin
├── administrativo/         - Panel staff
├── usuario/                - Dashboard usuarios
├── estudiante/             - Panel estudiantes
├── features/
│   ├── mis-tramites/       - Trámites propios
│   ├── bandeja-tramites/   - Bandeja administrativa
│   ├── tramites/           - Componentes trámites
│   └── firma-digital/      - Firma digital
├── services/
│   ├── auth.service.ts     - Autenticación JWT
│   ├── tramite.service.ts  - CRUD trámites
│   ├── firma-digital.service.ts - Firmas
│   ├── qr-code.service.ts  - QR codes
│   └── notification.service.ts - WebSocket
├── shared/
│   ├── components/         - Componentes reutilizables
│   ├── interfaces/         - TypeScript interfaces
│   └── guards/             - Auth y role guards
└── environments/           - Configuraciones
```

## Scripts

```bash
npm start           # Desarrollo (puerto 4200)
npm run build       # Build producción
npm test            # Tests unitarios
npm run lint        # Linter
```

© 2025 Universidad Nacional de Tumbes - Desarrollado por Jhafet Cánepa