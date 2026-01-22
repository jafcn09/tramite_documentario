import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ManualComponent } from './manual/manual.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'ingresar', component: AdminLoginComponent },
  { path: 'servicios-administrativos', component: AdminLoginComponent },
  { path: 'manual', component: ManualComponent },
  { path: 'verificar', component: SearchComponent },
  {
    path: 'grados',
    loadComponent: () => import('./grados/grados.component').then(m => m.GradosComponent)
  },


  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'tablero',
        loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./shared/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'areas',
        loadComponent: () => import('./components/areas/areas.component').then(m => m.AreasComponent)
      },
      {
        path: 'gestion-usuarios',
        loadComponent: () => import('./components/user-management/user-management.component').then(m => m.UserManagementComponent)
      },
      {
        path: 'gestion-roles',
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
        path: 'encuestas',
        loadComponent: () => import('./admin/dashboard-encuestas/dashboard-encuestas.component').then(m => m.DashboardEncuestasComponent)
      },
      {
        path: 'organigrama',
        loadComponent: () => import('./features/organigrama/organigrama.component').then(m => m.OrganigramaComponent)
      },
      {
        path: 'grados',
        loadComponent: () => import('./admin/grados-admin/grados-admin.component').then(m => m.GradosAdminComponent)
      },
      {
        path: 'grados/reportes',
        loadComponent: () => import('./admin/grados-admin/reportes-management.component').then(m => m.ReportesManagementComponent)
      },
      {
        path: 'grados/listado',
        loadComponent: () => import('./admin/grados-admin/grados-crud.component').then(m => m.GradosCrudComponent)
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
        redirectTo: 'tablero',
        pathMatch: 'full'
      }
    ]
  },


  {
    path: 'administrativo',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['administrativo'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'tablero',
        loadComponent: () => import('./administrativo/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'perfil',
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
        redirectTo: 'tablero',
        pathMatch: 'full'
      }
    ]
  },


  {
    path: 'usuario',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['usuario'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'tablero',
        loadComponent: () => import('./usuario/dashboard/dashboard.component').then(m => m.UsuarioDashboardComponent)
      },
      {
        path: 'perfil',
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
        redirectTo: 'tablero',
        pathMatch: 'full'
      }
    ]
  },


  {
    path: 'estudiante',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['estudiante'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'tablero',
        loadComponent: () => import('./estudiante/dashboard/dashboard.component').then(m => m.EstudianteDashboardComponent)
      },
      {
        path: 'perfil',
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
        path: '',
        redirectTo: 'tablero',
        pathMatch: 'full'
      }
    ]
  },


  {
    path: 'grados-admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['grados', 'director'] },
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'tablero',
        loadComponent: () => import('./admin/grados-admin/grados-admin.component').then(m => m.GradosAdminComponent)
      },
      {
        path: 'reportes',
        loadComponent: () => import('./admin/grados-admin/reportes-management.component').then(m => m.ReportesManagementComponent)
      },
      {
        path: 'listado',
        loadComponent: () => import('./admin/grados-admin/grados-crud.component').then(m => m.GradosCrudComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./shared/user-profile/user-profile.component').then(m => m.UserProfileComponent)
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
        redirectTo: 'tablero',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadComponent: () => import('./shared/user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },

  {
    path: 'cambiar-contrasena',
    canActivate: [AuthGuard],
    loadComponent: () => import('./shared/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },


  {
    path: 'acceso-denegado',
    loadComponent: () => import('./shared/access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  },


  { path: '**', redirectTo: '' }
];