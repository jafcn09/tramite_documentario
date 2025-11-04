import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';
import { ModalComponent } from '../../modal/modal.component';
import { ToastComponent } from '../toast/toast.component';
import { NotificationBellComponent } from '../notification-bell/notification-bell.component';
import { MisTramitesService } from '../../../services/mis-tramites.service';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, ToastComponent, NotificationBellComponent],
  template: `
    <div class="student-layout">

      <header class="student-header">
        <div class="header-container">
  
          <div class="header-left">
            <div class="logo-section">
              <div class="university-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
          
            </div>
            <nav class="main-nav">
              <a routerLink="/estudiante/tablero" routerLinkActive="active" class="nav-item">
                <i class="fas fa-home"></i>
                <span>Inicio</span>
              </a>
              <a routerLink="/estudiante/mis-tramites" routerLinkActive="active" class="nav-item">
                <i class="fas fa-folder-open"></i>
                <span>Mis Trámites</span>
              </a>
            </nav>
          </div>
          <div class="header-right">
           
            <div class="notifications-area">
              <app-notification-bell></app-notification-bell>
            </div>
            <div class="user-profile" *ngIf="currentUser">
              <button class="profile-btn" (click)="toggleUserMenu()">
                <img
                  [src]="currentUser?.foto || '/assets/default-avatar.png'"
                  [alt]="currentUser?.nombre"
                  class="profile-avatar"
                  onerror="this.src='/assets/default-avatar.png'"
                >
                <div class="profile-info">
                  <span class="profile-name">{{ getFirstName(currentUser?.nombre) }}</span>
                  <span class="profile-role">Estudiante</span>
                </div>
                <i class="fas fa-chevron-down" [class.rotated]="showUserMenu"></i>
              </button>
              <div class="user-menu" [class.show]="showUserMenu">
                <div class="menu-header">
                  <div class="user-details">
                    <div class="full-name">{{ currentUser?.nombre }} {{ currentUser?.apellidos }}</div>
                    <div class="email">{{ currentUser?.correo }}</div>
                  </div>
                </div>
                <div class="menu-divider"></div>
                <a href="#" class="menu-item" (click)="viewProfile($event)">
                  <i class="fas fa-user"></i>
                  Mi Perfil
                </a>
                <a href="#" class="menu-item" (click)="viewNotifications($event)">
                  <i class="fas fa-bell"></i>
                  Notificaciones
                </a>
                <a href="#" class="menu-item" (click)="changePassword($event)">
                  <i class="fas fa-key"></i>
                  Cambiar Contraseña
                </a>
                <div class="menu-divider"></div>
                <a href="#" class="menu-item logout" (click)="logout($event)">
                  <i class="fas fa-sign-out-alt"></i>
                  Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </div>

      
        <div class="status-bar" *ngIf="studentStats">
          <div class="status-container">
            <div class="welcome-text">
              <span class="greeting">¡Hola, {{ getFirstName(currentUser?.nombre) }}!</span>
             
            </div>
            <div class="quick-stats">
              <div class="stat">
                <span class="number">{{ studentStats.tramitesActivos || 0 }}</span>
                <span class="label">En Proceso</span>
              </div>
              <div class="divider"></div>
              <div class="stat">
                <span class="number">{{ studentStats.tramitesCompletados || 0 }}</span>
                <span class="label">Completados</span>
              </div>
            </div>
          </div>
        </div>
      </header>


      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <app-modal></app-modal>
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .student-layout {
      min-height: 100vh;
      background: #f8f9fc;
      display: flex;
      flex-direction: column;
    }


    .student-header {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .university-icon {
      width: 40px;
      height: 40px;
      background: #f3f4f6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 18px;
    }

    .title-info h1 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
      line-height: 1.2;
    }

    .title-info span {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1;
    }

    /* Clean Navigation */
    .main-nav {
      display: flex;
      gap: 1rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      color: #6b7280;
      text-decoration: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .nav-item:hover {
      background: #f3f4f6;
      color: #374151;
    }

    .nav-item.active {
      background: #eff6ff;
      color: #2563eb;
    }

    .nav-item i {
      font-size: 16px;
      width: 16px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .notifications-area {
      position: relative;
    }

    .user-profile {
      position: relative;
    }

    .profile-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: none;
      border: none;
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .profile-btn:hover {
      background: #f3f4f6;
    }

    .profile-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }

    .profile-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937;
      line-height: 1.2;
    }

    .profile-role {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1;
    }

    .profile-btn .fa-chevron-down {
      font-size: 12px;
      color: #9ca3af;
      transition: transform 0.2s ease;
    }

    .profile-btn .fa-chevron-down.rotated {
      transform: rotate(180deg);
    }

    /* User Menu */
    .user-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      min-width: 240px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
      transition: all 0.2s ease;
      z-index: 1000;
    }

    .user-menu.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .menu-header {
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .user-details .full-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .user-details .email {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .menu-divider {
      height: 1px;
      background: #f3f4f6;
      margin: 0;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #374151;
      text-decoration: none;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .menu-item:hover {
      background: #f9fafb;
    }

    .menu-item.logout {
      color: #dc2626;
    }

    .menu-item.logout:hover {
      background: #fef2f2;
    }

    .menu-item i {
      width: 16px;
      text-align: center;
      font-size: 14px;
      color: #9ca3af;
    }

    .menu-item.logout i {
      color: #dc2626;
    }

    /* Status Bar */
    .status-bar {
      background: #f9fafb;
      border-bottom: 1px solid #f3f4f6;
    }

    .status-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .welcome-text {
      display: flex;
      flex-direction: column;
    }

    .greeting {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1f2937;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1;
    }

    .quick-stats {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stat .number {
      font-size: 1.125rem;
      font-weight: 700;
      color: #1f2937;
      line-height: 1;
    }

    .stat .label {
      font-size: 0.625rem;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 1;
    }

    .divider {
      width: 1px;
      height: 24px;
      background: #e5e7eb;
    }

   
    .main-content {
      flex: 1;
      overflow-y: auto;
    }


    @media (max-width: 768px) {
      .header-container {
        padding: 0 1rem;
        height: 56px;
      }

      .header-left {
        gap: 1rem;
      }

      .main-nav {
        display: none;
      }

      .profile-info {
        display: none;
      }

      .status-container {
        padding: 0.5rem 1rem;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
      }

      .welcome-text {
        order: 1;
        align-self: stretch;
      }

      .quick-stats {
        order: 2;
        align-self: stretch;
        justify-content: space-around;
      }

      .user-menu {
        right: -0.5rem;
        min-width: 200px;
      }
    }

    @media (max-width: 480px) {
      .logo-section {
        gap: 0.5rem;
      }

      .university-icon {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }

      .title-info h1 {
        font-size: 1rem;
      }

      .title-info span {
        font-size: 0.7rem;
      }

      .header-right {
        gap: 0.75rem;
      }
    }

    ::ng-deep .notifications-area .bell-btn {
      width: 36px;
      height: 36px;
      background: #f3f4f6;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 16px;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }

    ::ng-deep .notifications-area .bell-btn:hover {
      background: #e5e7eb;
      color: #374151;
    }

    ::ng-deep .notifications-area .badge {
      background: #dc2626;
      color: white;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 5px;
      border-radius: 10px;
      top: -2px;
      right: -2px;
    }
  `]
})
export class StudentLayoutComponent implements OnInit {
  currentUser: User | null = null;
  showUserMenu = false;
  studentStats: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private misTramitesService: MisTramitesService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadStudentStats();
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
      error: (error) => {
        this.studentStats = {
          tramitesActivos: 0,
          tramitesCompletados: 0,
          totalTramites: 0
        };
      }
    });
  }

  getFirstName(fullName: string | undefined): string {
    if (!fullName) return 'Estudiante';
    return fullName.split(' ')[0];
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  viewProfile(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/perfil']);
  }

  viewNotifications(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/estudiante/notificaciones']);
  }

  changePassword(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/cambiar-contrasena']);
  }

  logout(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile')) {
      this.showUserMenu = false;
    }
  }
}