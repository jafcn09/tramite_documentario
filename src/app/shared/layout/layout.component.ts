import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { ToastComponent } from '../components/toast/toast.component';
import { NotificationBellComponent } from '../components/notification-bell/notification-bell.component';
import { MisTramitesService } from '../../services/mis-tramites.service';
import { User } from '../interfaces/auth.interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, ToastComponent, NotificationBellComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUser: User| null = null;
  sidebarCollapsed = false;
  showUserDropdown = false;
  menuItems: any[] = [];
  userRole = '';
  studentStats: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private misTramitesService: MisTramitesService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.updateMenuItems();
      if (user) {
        this.userRole = user.role?.name?.toLowerCase() || '';

        if (this.userRole === 'estudiante') {
          this.loadStudentStats();
        }
      }
    });
  }

  loadStudentStats() {
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];

        const tramitesActivos = tramites.filter((t: any) =>
          ['En Revisión', 'Enviado', 'En Proceso', 'Aprobado', 'Derivado'].includes(t.estado?.nombre)
        ).length;

        const tramitesCompletados = tramites.filter((t: any) =>
          ['Finalizado', 'Archivado'].includes(t.estado?.nombre) || t.estaVencido
        ).length;

        this.studentStats = {
          tramitesActivos,
          tramitesCompletados,
          totalTramites: tramites.length
        };
      },
      error: () => {
        this.studentStats = {
          tramitesActivos: 0,
          tramitesCompletados: 0,
          totalTramites: 0
        };
      }
    });
  }

  toggleSidebar(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleUserDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showUserDropdown = !this.showUserDropdown;
  }

  toggleSubmenu(item: any) {
    item.expanded = !item.expanded;
  }

  getPageTitle(): string {
    return 'Inicio';
  }

  updateMenuItems() {
    if (!this.currentUser || !this.currentUser.role) return;

    const adminMenu = [
      { label: 'Inicio', route: '/admin/tablero', icon: 'fas fa-home' },
      { label: 'Gestión de Trámites', route: '/admin/tramites', icon: 'fas fa-file-alt' },
      { label: 'Reportes', route: '/admin/reportes', icon: 'fas fa-chart-bar' },
      {
        label: 'Configuración',
        icon: 'fas fa-cog',
        submenu: [
          { label: 'Gestión de usuarios', route: '/admin/gestion-usuarios', icon: 'fas fa-users' },
          { label: 'Gestión de roles', route: '/admin/gestion-roles', icon: 'fas fa-shield-alt' },

        ]
      },
      {
        label: 'Administración Institucional',
        icon: 'fas fa-university',
        submenu: [

            { label: 'Organigrama', route: '/admin/organigrama', icon: 'fas fa-sitemap' },
          { label: 'Gestión de áreas', route: '/admin/areas', icon: 'fas fa-building' }
        ]
      },
    ];

    const administrativoMenu = [
      { label: 'Inicio', route: '/administrativo/tablero', icon: 'fas fa-home' },
      { label: 'Mis Trámites', route: '/administrativo/mis-tramites', icon: 'fas fa-file-alt' }
    ];

    const usuarioMenu = [
      { label: 'Inicio', route: '/usuario/tablero', icon: 'fas fa-home' },
      { label: 'Mis Trámites', route: '/usuario/mis-tramites', icon: 'fas fa-file-alt' }
    ];

    const estudianteMenu = [
      { label: 'Inicio', route: '/estudiante/tablero', icon: 'fas fa-home' },
      { label: 'Mis Trámites', route: '/estudiante/mis-tramites', icon: 'fas fa-folder-open' }
    ];

    const roleMenus: { [key: string]: any[] } = {
      'ADMIN': adminMenu,
      'admin': adminMenu,
      'Admin': adminMenu,
      'ADMINISTRATIVO': administrativoMenu,
      'administrativo': administrativoMenu,
      'Administrativo': administrativoMenu,
      'USUARIO': usuarioMenu,
      'usuario': usuarioMenu,
      'Usuario': usuarioMenu,
      'ESTUDIANTE': estudianteMenu,
      'estudiante': estudianteMenu,
      'Estudiante': estudianteMenu,
    };

    this.menuItems = roleMenus[this.currentUser.role.name] || [];
  }

  viewProfile(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    const profileRoute = this.getProfileRoute();
    if (profileRoute) {
      window.location.href = profileRoute;
    }
  }

  getProfileRoute(): string {
    return '/perfil';
  }

  changePassword(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/cambiar-contrasena']);
  }

  logout(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.showUserDropdown = false;
    this.authService.logout();
  }

  getFirstName(fullName: string | undefined): string {
    if (!fullName) return 'Estudiante';
    return fullName.split(' ')[0];
  }

  viewStudentNotifications(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/estudiante/notificaciones']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    const userDropdown = target.closest('.user-dropdown');
    if (!userDropdown) {
      this.showUserDropdown = false;
    }
  }
}
