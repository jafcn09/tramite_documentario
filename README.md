# Sistema de Trámite Documentario - Frontend

Desarrollado con Angular 18+ para gestión de trámites documentarios universitarios con sistema de roles diferenciados y notificaciones en tiempo real.

## 🚀 Características

- **Sistema de roles**: ADMIN, ADMINISTRATIVO, USUARIO, ESTUDIANTE
- **Dashboards personalizados** por tipo de usuario
- **Notificaciones en tiempo real** vía WebSocket
- **Búsqueda pública** de trámites por expediente
- **Gestión completa** de documentos y archivos adjuntos
- **Responsive design** mobile-first

## 🛠️ Tecnologías

- **Angular 18+** - Framework principal
- **Tailwind CSS** - Estilos y diseño
- **TypeScript** - Tipado estático
- **RxJS** - Programación reactiva
- **WebSocket** - Comunicación en tiempo real
- **FontAwesome** - Iconografía

## 📋 Prerrequisitos

- Node.js v18+
- npm v9+
- Angular CLI 18+

## ⚙️ Instalación

### 1. Clonar e instalar
```bash
git clone <url-del-repositorio>
cd tramite_documentario/front
npm install
```

### 2. Configurar entorno
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api'
};
```

### 3. Ejecutar aplicación
```bash
npm start
```

### 4. Acceder al sistema
```
http://localhost:4200
```

## 📁 Estructura

```
src/app/
├── admin/              # Dashboard administrativo
├── administrativo/     # Panel staff administrativo
├── usuario/           # Dashboard usuarios
├── estudiante/        # Panel estudiantes
├── features/          # Funcionalidades principales
├── services/          # Servicios HTTP
├── shared/            # Componentes compartidos
├── guards/            # Protección de rutas
└── models/           # Interfaces TypeScript
```

## 🚀 Build y Despliegue

### Desarrollo
```bash
npm start         
npm run build      
npm run lint        
```

### Producción
```bash
npm run build
# Archivos en dist/ listos para servidor web
```

## 📄 Licencia

© 2025 Universidad Nacional de Tumbes. Todos los derechos reservados.

**Desarrollado por Jhafet Cánepa**