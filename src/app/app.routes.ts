import { Routes } from '@angular/router';
import { ManualComponent } from './manual/manual.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Rutas públicas
  { path: '', component: HomeComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'servicios-administrativos', component: AdminLoginComponent }, // Alias para mantener compatibilidad
  { path: 'manual', component: ManualComponent },
  { path: 'buscar', component: SearchComponent },
  
  // Rutas protegidas por rol ADMIN
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./shared/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'areas',
        loadComponent: () => import('./components/areas/areas.component').then(m => m.AreasComponent)
      },
      {
        path: 'user-management',
        loadComponent: () => import('./components/user-management/user-management.component').then(m => m.UserManagementComponent)
      },
      {
        path: 'role-management',
        loadComponent: () => import('./components/role-management/role-management.component').then(m => m.RoleManagementComponent)
      },
      {
        path: 'notificaciones',
        loadComponent: () => import('./components/notificaciones/notificaciones.component').then(m => m.NotificacionesComponent)
      },
      {
        path: 'notificaciones/:id',
        loadComponent: () => import('./components/notificaciones/notificacion-detalle/notificacion-detalle.component').then(m => m.NotificacionDetalleComponent)
      },
      {
        path: 'tramites',
        loadComponent: () => import('./features/tramites/components/lista-tramites/lista-tramites.component').then(m => m.ListaTramitesComponent)
      },
      {
        path: 'reportes',
        loadComponent: () => import('./features/reportes/reportes.component').then(m => m.ReportesComponent)
      },
      {
        path: 'organigrama',
        loadComponent: () => import('./features/organigrama/organigrama.component').then(m => m.OrganigramaComponent)
      },
      {
        path: 'mis-tramites',
        loadComponent: () => import('./features/mis-tramites/mis-tramites.component').then(m => m.MisTramitesComponent)
      },
      {
        path: 'nuevo-tramite',
        loadComponent: () => import('./features/tramites/pages/nuevo-tramite.component').then(m => m.NuevoTramitePageComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
  // Rutas protegidas por rol ADMINISTRATIVO 
  {
    path: 'administrativo',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMINISTRATIVO'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./administrativo/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./shared/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'mis-tramites',
        loadComponent: () => import('./features/mis-tramites/mis-tramites.component').then(m => m.MisTramitesComponent)
      },
      {
        path: 'nuevo-tramite',
        loadComponent: () => import('./features/tramites/pages/nuevo-tramite.component').then(m => m.NuevoTramitePageComponent)
      },
      {
        path: 'notificaciones',
        loadComponent: () => import('./components/notificaciones/notificaciones.component').then(m => m.NotificacionesComponent)
      },
      {
        path: 'notificaciones/:id',
        loadComponent: () => import('./components/notificaciones/notificacion-detalle/notificacion-detalle.component').then(m => m.NotificacionDetalleComponent)
      },
      {
        path: 'reportes',
        loadComponent: () => import('./features/reportes/reportes.component').then(m => m.ReportesComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Rutas protegidas por rol USUARIO 
  {
    path: 'usuario',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['USUARIO'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./usuario/dashboard/dashboard.component').then(m => m.UsuarioDashboardComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./shared/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'bandeja-tramites',
        loadComponent: () => import('./features/bandeja-tramites/bandeja-tramites.component').then(m => m.BandejaTramitesComponent)
      },
      {
        path: 'mis-tramites',
        loadComponent: () => import('./features/mis-tramites/mis-tramites.component').then(m => m.MisTramitesComponent)
      },
      {
        path: 'nuevo-tramite',
        loadComponent: () => import('./features/tramites/pages/nuevo-tramite.component').then(m => m.NuevoTramitePageComponent)
      },
      {
        path: 'notificaciones',
        loadComponent: () => import('./components/notificaciones/notificaciones.component').then(m => m.NotificacionesComponent)
      },
      {
        path: 'notificaciones/:id',
        loadComponent: () => import('./components/notificaciones/notificacion-detalle/notificacion-detalle.component').then(m => m.NotificacionDetalleComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Ruta de perfil para todos los usuarios autenticados
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./shared/user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },

  // Ruta de cambio de contraseña para todos los usuarios autenticados
  {
    path: 'change-password',
    canActivate: [AuthGuard],
    loadComponent: () => import('./shared/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },
  
 
  
  
  // Página de acceso denegado
  {
    path: 'access-denied',
    loadComponent: () => import('./shared/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  },
  
  // Redirección por defecto
  { path: '**', redirectTo: '' }
];
