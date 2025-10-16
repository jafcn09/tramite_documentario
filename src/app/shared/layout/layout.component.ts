import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { ToastComponent } from '../components/toast/toast.component';
import { NotificationBellComponent } from '../components/notification-bell/notification-bell.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, ToastComponent, NotificationBellComponent],
  template: `
    <div class="layout-container">

      <div 
        *ngIf="!sidebarCollapsed" 
        class="mobile-overlay" 
        (click)="toggleSidebar($event)"
      ></div>
      

      <aside class="sidebar" [class.collapsed]="sidebarCollapsed">
        <div class="sidebar-header">
          <div class="logo">
            <img src="/assets/logo.png" alt="Logo" *ngIf="!sidebarCollapsed">
            <span *ngIf="!sidebarCollapsed">Sistema Trámites</span>
            <span *ngIf="sidebarCollapsed" class="logo-mini">ST</span>
          </div>
          <button class="toggle-btn" (click)="toggleSidebar($event)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav class="sidebar-nav">
          <ul class="nav-list">
            <li *ngFor="let item of menuItems" class="nav-item">
              <a 
                *ngIf="!item.submenu"
                [routerLink]="item.route" 
                routerLinkActive="active"
                class="nav-link"
                [title]="sidebarCollapsed ? item.label : ''"
              >
                <i [class]="item.icon"></i>
                <span *ngIf="!sidebarCollapsed">{{ item.label }}</span>
              </a>
              
              <div *ngIf="item.submenu" class="nav-item-dropdown">
                <button 
                  class="nav-link dropdown-toggle"
                  [title]="sidebarCollapsed ? item.label : ''"
                  (click)="toggleSubmenu(item)"
                  [class.expanded]="item.expanded"
                >
                  <i [class]="item.icon"></i>
                  <span *ngIf="!sidebarCollapsed">{{ item.label }}</span>
                  <i *ngIf="!sidebarCollapsed" class="fas fa-chevron-down submenu-arrow" [class.rotated]="item.expanded"></i>
                </button>
                
                <ul class="submenu" *ngIf="item.expanded && !sidebarCollapsed">
                  <li *ngFor="let subitem of item.submenu" class="submenu-item">
                    <a 
                      [routerLink]="subitem.route" 
                      routerLinkActive="active"
                      class="submenu-link"
                    >
                      <i [class]="subitem.icon"></i>
                      <span>{{ subitem.label }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <div class="sidebar-footer" *ngIf="currentUser">
          <div class="user-profile" [class.collapsed]="sidebarCollapsed">
            <div class="user-avatar">
              <img 
                [src]="currentUser?.foto || '/assets/default-avatar.png'" 
                [alt]="currentUser?.nombre"
                onerror="this.src='/assets/default-avatar.png'"
              >
            </div>
            <div class="user-info" *ngIf="!sidebarCollapsed">
              <div class="user-name">{{ currentUser?.nombre }} {{ currentUser?.apellidos }}</div>
              <div class="user-role">{{ currentUser?.role?.name }}</div>
            </div>
            <button class="logout-btn" (click)="logout()" [title]="sidebarCollapsed ? 'Cerrar Sesión' : ''">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </aside>

      <div class="main-content" [class.sidebar-collapsed]="sidebarCollapsed">

        <header class="header" *ngIf="userRole !== 'estudiante'">
          <div class="header-left">
            <div class="header-top-row">
              <div class="greeting-section">
                <h1 class="greeting-title">¡Bienvenido, {{ currentUser?.nombre }}!</h1>
                <p class="greeting-subtitle">Panel de Administración - Universidad Nacional de Tumbes</p>
              </div>
              <button class="mobile-toggle-btn" (click)="toggleSidebar($event)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="breadcrumb">
              <span class="breadcrumb-item">{{ currentUser?.role?.name }}</span>
              <span class="separator">></span>
              <span class="breadcrumb-item">{{ getPageTitle() }}</span>
            </div>
          </div>

          <div class="header-right">

            <app-notification-bell></app-notification-bell>

            <div class="user-dropdown" *ngIf="currentUser">
              <button class="user-dropdown-btn" (click)="toggleUserDropdown($event)">
                <img
                  [src]="currentUser?.foto || '/assets/default-avatar.png'"
                  [alt]="currentUser?.nombre"
                  class="user-avatar-sm"
                  onerror="this.src='/assets/default-avatar.png'"
                >
                <div class="user-details">
                  <div class="user-name">{{ currentUser?.nombre }} {{ currentUser?.apellidos }}</div>
                  <div class="user-email">{{ currentUser?.correo }}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>

              <div class="dropdown-menu" [class.show]="showUserDropdown">
                <a href="#" class="dropdown-item" (click)="viewProfile($event)">
                  <i class="fas fa-user-circle"></i>
                  Ver Perfil
                </a>
                <a href="#" class="dropdown-item" (click)="changePassword($event)">
                  <i class="fas fa-key"></i>
                  Cambiar Contraseña
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item logout-item" (click)="logout($event)">
                  <i class="fas fa-sign-out-alt"></i>
                  Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </header>

        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>

      <app-modal></app-modal>

      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .sidebar {
      width: 280px;
      background: #2c3e50;
      color: white;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1000;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #34495e;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 70px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      font-size: 18px;
    }

    .logo img {
      width: 32px;
      height: 32px;
      border-radius: 6px;
    }

    .logo-mini {
      font-weight: 700;
      font-size: 16px;
      text-align: center;
      width: 100%;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .toggle-btn:hover {
      background: #34495e;
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 4px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #bdc3c7;
      text-decoration: none;
      transition: all 0.3s ease;
      gap: 12px;
    }

    .nav-link:hover {
      background: #34495e;
      color: white;
    }

    .nav-link.active {
      background: #3498db;
      color: white;
    }

    .nav-link i {
      width: 20px;
      text-align: center;
      font-size: 18px;
    }

    .sidebar.collapsed .nav-link {
      justify-content: center;
      padding: 12px;
    }

    .nav-item-dropdown {
      position: relative;
    }

    .dropdown-toggle {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      width: 100%;
      text-align: left;
    }

    .submenu-arrow {
      margin-left: auto;
      font-size: 12px !important;
      width: 12px !important;
      transition: transform 0.3s ease;
    }

    .submenu-arrow.rotated {
      transform: rotate(180deg);
    }

    .submenu {
      list-style: none;
      padding: 0;
      margin: 0;
      background: #1e2b37;
      border-radius: 4px;
      margin-top: 4px;
      overflow: hidden;
    }

    .submenu-item {
      margin-bottom: 0;
    }

    .submenu-link {
      display: flex;
      align-items: center;
      padding: 10px 20px 10px 40px;
      color: #bdc3c7;
      text-decoration: none;
      transition: all 0.3s ease;
      gap: 12px;
      font-size: 14px;
    }

    .submenu-link:hover {
      background: #34495e;
      color: white;
    }

    .submenu-link.active {
      background: #3498db;
      color: white;
    }

    .submenu-link i {
      width: 16px;
      text-align: center;
      font-size: 14px;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid #34495e;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }

    .user-profile.collapsed {
      justify-content: center;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: 12px;
      color: #95a5a6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .logout-btn {
      background: none;
      border: none;
      color: #bdc3c7;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
      font-size: 18px;
    }
    
    .logout-btn i {
      display: block;
    }

    .logout-btn:hover {
      color: #e74c3c;
      background: #34495e;
      transform: scale(1.05);
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .header {
      background: white;
      border-bottom: 1px solid #dee2e6;
      padding: 20px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 70px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .header-left {
      flex: 1;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 4px 0;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #6c757d;
    }

    .breadcrumb-item {
      color: #6c757d;
    }

    .separator {
      color: #dee2e6;
    }

    .header-top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
    }

    .greeting-section {
      flex: 1;
      margin-bottom: 8px;
    }

    .greeting-title {
      font-size: 28px;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 4px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .greeting-subtitle {
      font-size: 16px;
      color: #6c757d;
      margin: 0;
      font-weight: 400;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .mobile-toggle-btn {
      display: none;
      background: none;
      border: none;
      color: #6c757d;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .mobile-toggle-btn:hover {
      background: #f8f9fa;
      color: #2c3e50;
    }

    .user-dropdown {
      position: relative;
    }

    .user-dropdown-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .user-dropdown-btn:hover {
      background: #f8f9fa;
    }

    .user-avatar-sm {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-details {
      text-align: left;
    }

    .user-details .user-name {
      font-weight: 500;
      font-size: 14px;
      color: #2c3e50;
    }

    .user-details .user-email {
      font-size: 12px;
      color: #6c757d;
    }

    /* Notificaciones */
    .notifications-wrapper {
      position: relative;
      margin-right: 16px;
    }

    .notification-btn {
      background: transparent;
      border: none;
      padding: 8px;
      cursor: pointer;
      position: relative;
      color: #6c757d;
      font-size: 20px;
      transition: color 0.3s ease;
    }

    .notification-btn:hover {
      color: #495057;
    }

    .notification-btn.has-notifications {
      color: #2c5aa0;
    }

    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #dc3545;
      color: white;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    .notifications-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      width: 380px;
      max-height: 500px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1001;
      margin-top: 8px;
    }

    .notifications-dropdown.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .notifications-header {
      padding: 16px;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .notifications-header h3 {
      margin: 0;
      font-size: 16px;
      color: #2c3e50;
    }

    .mark-all-read {
      background: transparent;
      border: none;
      color: #2c5aa0;
      font-size: 12px;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .mark-all-read:hover {
      color: #1e3a5f;
      text-decoration: underline;
    }

    .notifications-body {
      max-height: 350px;
      overflow-y: auto;
    }

    .notification-item {
      padding: 12px 16px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background 0.3s ease;
      display: flex;
      gap: 12px;
    }

    .notification-item:hover {
      background: #f8f9fa;
    }

    .notification-item.unread {
      background: #f0f8ff;
      border-left: 3px solid #2c5aa0;
    }

    .notification-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .notification-icon.nuevo {
      background: #d4edda;
      color: #155724;
    }

    .notification-icon.derivado {
      background: #cce5ff;
      color: #004085;
    }

    .notification-icon.aprobado {
      background: #d1f2eb;
      color: #00695c;
    }

    .notification-icon.rechazado {
      background: #f8d7da;
      color: #721c24;
    }

    .notification-content {
      flex: 1;
    }

    .notification-content h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      font-weight: 600;
      color: #2c3e50;
    }

    .notification-content p {
      margin: 0 0 4px 0;
      font-size: 13px;
      color: #6c757d;
    }

    .notification-time {
      font-size: 11px;
      color: #adb5bd;
    }

    .empty-notifications {
      padding: 40px;
      text-align: center;
      color: #6c757d;
    }

    .empty-notifications i {
      font-size: 48px;
      color: #dee2e6;
      margin-bottom: 12px;
    }

    .notifications-footer {
      padding: 12px;
      border-top: 1px solid #e9ecef;
      text-align: center;
    }

    .notifications-footer a {
      color: #2c5aa0;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }

    .notifications-footer a:hover {
      text-decoration: underline;
    }

    /* Responsive para notificaciones */
    @media (max-width: 768px) {
      .notifications-wrapper {
        margin-right: 12px;
      }

      .notifications-dropdown {
        width: 320px;
        right: 50%;
        transform: translateX(50%);
        left: auto;
      }

      .notifications-dropdown.show {
        transform: translateX(50%) translateY(0);
      }

      .notification-item {
        padding: 10px 12px;
      }

      .notification-icon {
        width: 32px;
        height: 32px;
        font-size: 14px;
      }

      .notification-content h4 {
        font-size: 13px;
      }

      .notification-content p {
        font-size: 12px;
      }

      .notifications-header {
        padding: 12px;
      }

      .notifications-header h3 {
        font-size: 14px;
      }

      .mark-all-read {
        font-size: 11px;
      }

      .notifications-footer {
        padding: 10px;
      }

      .notifications-footer a {
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .notifications-dropdown {
        width: 300px;
        right: 50%;
        transform: translateX(50%);
        max-height: 400px;
        left: auto;
      }

      .notifications-dropdown.show {
        transform: translateX(50%) translateY(0);
      }

      .notification-item {
        padding: 8px 10px;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .notification-icon {
        width: 28px;
        height: 28px;
        font-size: 12px;
        align-self: center;
      }

      .notification-content {
        text-align: center;
        width: 100%;
      }

      .notification-content h4 {
        font-size: 12px;
        margin-bottom: 6px;
      }

      .notification-content p {
        font-size: 11px;
        line-height: 1.3;
      }

      .notification-time {
        font-size: 10px;
        margin-top: 4px;
      }

      .empty-notifications {
        padding: 20px;
      }

      .empty-notifications i {
        font-size: 32px;
      }

      .empty-notifications p {
        font-size: 12px;
      }
    }

    @media (max-width: 360px) {
      .notifications-dropdown {
        width: calc(100vw - 30px);
        right: 50%;
        transform: translateX(50%);
        left: auto;
        max-width: 350px;
      }

      .notifications-dropdown.show {
        transform: translateX(50%) translateY(0);
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      min-width: 200px;
      padding: 8px 0;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .dropdown-menu.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: #2c3e50;
      text-decoration: none;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    
    .dropdown-item i {
      width: 18px;
      text-align: center;
      color: #6c757d;
      font-size: 16px;
    }

    .dropdown-item:hover {
      background: #f8f9fa;
      color: #2c3e50;
    }
    
    .dropdown-item:hover i {
      color: #667eea;
    }
    
    .dropdown-item.logout-item i {
      color: #dc3545;
    }
    
    .dropdown-item.logout-item:hover {
      background: #fff5f5;
    }

    .dropdown-divider {
      height: 1px;
      background: #dee2e6;
      margin: 8px 0;
    }

    .page-content {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
      background: #f8f9fa;
    }

    .mobile-overlay {
      display: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: -320px;
        top: 0;
        bottom: 0;
        width: 320px;
        height: 100vh;
        z-index: 1001;
        box-shadow: 2px 0 15px rgba(0,0,0,0.2);
        transition: left 0.3s ease;
        overflow-y: auto;
      }

      .sidebar:not(.collapsed) {
        left: 0;
      }

      .main-content {
        width: 100%;
      }

      .header {
        padding: 15px 20px;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        min-height: auto;
      }
      
      .header-left {
        width: 100%;
      }
      
      .greeting-title {
        font-size: 24px;
      }
      
      .greeting-subtitle {
        font-size: 14px;
      }
      
      .header-right {
        width: 100%;
        justify-content: flex-end;
      }
      
      .mobile-toggle-btn {
        display: flex;
      }
      
      .mobile-overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
      }

      .page-content {
        padding: 20px;
      }

      .user-details {
        display: none;
      }
    }
    
    @media (max-width: 480px) {
      .header {
        padding: 10px 15px;
      }
      
      .greeting-title {
        font-size: 20px;
      }
      
      .greeting-subtitle {
        font-size: 12px;
      }
      
      .breadcrumb {
        font-size: 12px;
      }
    }
  `]
})
export class LayoutComponent implements OnInit {
  currentUser: User | null = null;
  sidebarCollapsed = false;
  showUserDropdown = false;
  menuItems: any[] = [];
  userRole = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.updateMenuItems();
      if (user) {
        this.userRole = user.role?.name?.toLowerCase() || '';
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

    const roleMenus: { [key: string]: any[] } = {
      'ADMIN': [
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
      ],
      'ADMINISTRATIVO': [
        { label: 'Inicio', route: '/administrativo/tablero', icon: 'fas fa-home' },
        { label: 'Mis Trámites', route: '/administrativo/mis-tramites', icon: 'fas fa-file-alt' }
      ],
      'USUARIO': [
        { label: 'Inicio', route: '/usuario/tablero', icon: 'fas fa-home' },
        { label: 'Mis Trámites', route: '/usuario/mis-tramites', icon: 'fas fa-file-alt' }
      ],
      'ESTUDIANTE': [
        { label: 'Inicio', route: '/estudiante/tablero', icon: 'fas fa-home' },
        { label: 'Mis Trámites', route: '/estudiante/mis-tramites', icon: 'fas fa-folder-open' }
      ],
      'estudiante': [
        { label: 'Inicio', route: '/estudiante/tablero', icon: 'fas fa-home' },
        { label: 'Mis Trámites', route: '/estudiante/mis-tramites', icon: 'fas fa-folder-open' }
      ],
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    
    const userDropdown = target.closest('.user-dropdown');
    if (!userDropdown) {
      this.showUserDropdown = false;
    }
  }
}