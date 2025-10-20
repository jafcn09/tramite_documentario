import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';
import { NotificationBellComponent } from '../notification-bell/notification-bell.component';

@Component({
  selector: 'app-student-header',
  standalone: true,
  imports: [CommonModule, NotificationBellComponent],
  template: `
    <header class="student-header">
      <div class="header-content">

        <div class="header-left">
          <div class="logo-section">
            <div class="university-logo">
              <i class="fas fa-university"></i>
            </div>
            <div class="title-section">
              <h1>Portal Estudiantil</h1>
              <p>Universidad Nacional de Tumbes</p>
            </div>
          </div>
        </div>


        <div class="header-right">
        
          <div class="student-notifications">
            <app-notification-bell></app-notification-bell>
          </div>

  
          <div class="quick-actions">
            <button class="action-btn" (click)="navigateToTramites()" title="Mis Trámites">
              <i class="fas fa-folder-open"></i>
            </button>
            <button class="action-btn" (click)="createNewTramite()" title="Nueva Solicitud">
              <i class="fas fa-plus"></i>
            </button>
          </div>

       
          <div class="user-section" *ngIf="currentUser">
            <button class="user-profile-btn" (click)="toggleUserDropdown()">
              <img
                [src]="currentUser?.foto || '/assets/default-avatar.png'"
                [alt]="currentUser?.nombre"
                class="user-avatar"
                onerror="this.src='/assets/default-avatar.png'"
              >
              <span class="user-name">{{ getFirstName(currentUser?.nombre) }}</span>
              <i class="fas fa-chevron-down dropdown-arrow" [class.rotated]="showUserDropdown"></i>
            </button>

      
            <div class="user-dropdown" [class.show]="showUserDropdown">
              <div class="dropdown-header">
                <div class="user-info">
                  <div class="name">{{ currentUser?.nombre }} {{ currentUser?.apellidos }}</div>
                  <div class="email">{{ currentUser?.correo }}</div>
                  <div class="role-badge">Estudiante</div>
                </div>
              </div>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item" (click)="viewProfile($event)">
                <i class="fas fa-user"></i>
                <span>Mi Perfil</span>
              </a>
              <a href="#" class="dropdown-item" (click)="viewNotifications($event)">
                <i class="fas fa-bell"></i>
                <span>Notificaciones</span>
              </a>
              <a href="#" class="dropdown-item" (click)="changePassword($event)">
                <i class="fas fa-key"></i>
                <span>Cambiar Contraseña</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item logout-item" (click)="logout($event)">
                <i class="fas fa-sign-out-alt"></i>
                <span>Cerrar Sesión</span>
              </a>
            </div>
          </div>

      
          <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>


      <div class="status-bar">
        <div class="status-content">
          <div class="welcome-message">
            <span>¡Hola, {{ getFirstName(currentUser?.nombre) }}!</span>
            <span class="status-text">Gestiona tus trámites universitarios</span>
          </div>
          <div class="quick-stats" *ngIf="stats">
            <div class="stat-item">
              <span class="stat-number">{{ stats.tramitesActivos || 0 }}</span>
              <span class="stat-label">Activos</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.tramitesCompletados || 0 }}</span>
              <span class="stat-label">Completados</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .student-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .university-logo {
      width: 50px;
      height: 50px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .title-section h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.025em;
    }

    .title-section p {
      font-size: 0.85rem;
      margin: 0;
      opacity: 0.8;
      font-weight: 400;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .student-notifications {
      position: relative;
    }

    .quick-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      width: 40px;
      height: 40px;
      border: none;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .action-btn:hover {
      background: rgba(255,255,255,0.25);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .user-section {
      position: relative;
    }

    .user-profile-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50px;
      padding: 0.5rem 1rem 0.5rem 0.5rem;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .user-profile-btn:hover {
      background: rgba(255,255,255,0.25);
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255,255,255,0.3);
    }

    .user-name {
      font-weight: 500;
      letter-spacing: -0.025em;
    }

    .dropdown-arrow {
      font-size: 12px;
      transition: transform 0.3s ease;
    }

    .dropdown-arrow.rotated {
      transform: rotate(180deg);
    }

    .user-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      min-width: 280px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
      overflow: hidden;
    }

    .user-dropdown.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-header {
      padding: 1.5rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-bottom: 1px solid #dee2e6;
    }

    .user-info .name {
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    .user-info .email {
      font-size: 0.85rem;
      color: #6c757d;
      margin-bottom: 0.5rem;
    }

    .role-badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .dropdown-divider {
      height: 1px;
      background: #dee2e6;
      margin: 0;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1.5rem;
      color: #2c3e50;
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .dropdown-item:hover {
      background: #f8f9fa;
    }

    .dropdown-item i {
      width: 18px;
      text-align: center;
      color: #6c757d;
      font-size: 16px;
    }

    .dropdown-item.logout-item {
      color: #dc3545;
    }

    .dropdown-item.logout-item i {
      color: #dc3545;
    }

    .dropdown-item.logout-item:hover {
      background: #fff5f5;
    }

    .mobile-menu-btn {
      display: none;
      width: 40px;
      height: 40px;
      border: none;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      color: white;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      border: 1px solid rgba(255,255,255,0.2);
    }

    /* Status Bar */
    .status-bar {
      background: rgba(0,0,0,0.1);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .status-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .welcome-message {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .welcome-message > span:first-child {
      font-size: 0.9rem;
      font-weight: 600;
    }

    .status-text {
      font-size: 0.8rem;
      opacity: 0.8;
    }

    .quick-stats {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stat-number {
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.7rem;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-divider {
      width: 1px;
      height: 30px;
      background: rgba(255,255,255,0.3);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 1rem;
      }

      .title-section h1 {
        font-size: 1.2rem;
      }

      .title-section p {
        font-size: 0.8rem;
      }

      .user-name {
        display: none;
      }

      .quick-actions {
        display: none;
      }

      .mobile-menu-btn {
        display: flex;
      }

      .status-content {
        padding: 0.75rem 1rem;
        flex-direction: column;
        gap: 0.75rem;
        align-items: flex-start;
      }

      .welcome-message {
        order: 1;
      }

      .quick-stats {
        order: 2;
        align-self: stretch;
        justify-content: space-around;
      }

      .user-dropdown {
        right: -1rem;
        min-width: 260px;
      }
    }

    @media (max-width: 480px) {
      .header-content {
        padding: 0.75rem;
      }

      .logo-section {
        gap: 0.75rem;
      }

      .university-logo {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }

      .title-section h1 {
        font-size: 1rem;
      }

      .title-section p {
        font-size: 0.75rem;
      }

      .header-right {
        gap: 1rem;
      }

      .status-content {
        padding: 0.5rem 0.75rem;
      }

      .stat-number {
        font-size: 1rem;
      }

      .stat-label {
        font-size: 0.65rem;
      }
    }

    /* Notification Bell Customization for Students */
    ::ng-deep .student-notifications .bell-btn {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.3s ease;
    }

    ::ng-deep .student-notifications .bell-btn:hover {
      background: rgba(255,255,255,0.25);
      transform: translateY(-1px);
    }

    ::ng-deep .student-notifications .badge {
      background: #ff4757;
      border: 2px solid white;
      font-weight: 600;
    }
  `]
})
export class StudentHeaderComponent implements OnInit {
  @Input() currentUser: User | null = null;
  @Input() stats: any = null;
  @Output() toggleSidebar = new EventEmitter<void>();

  showUserDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.currentUser) {
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  getFirstName(fullName: string | undefined): string {
    if (!fullName) return 'Estudiante';
    return fullName.split(' ')[0];
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  toggleMobileMenu() {
    // Emit event to parent layout to toggle sidebar
    this.toggleSidebar.emit();
  }

  navigateToTramites() {
    this.router.navigate(['/estudiante/mis-tramites']);
  }

  createNewTramite() {
    this.router.navigate(['/estudiante/nuevo-tramite']);
  }

  viewProfile(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/perfil']);
  }

  viewNotifications(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/estudiante/notificaciones']);
  }

  changePassword(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/cambiar-contrasena']);
  }

  logout(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-section')) {
      this.showUserDropdown = false;
    }
  }
}