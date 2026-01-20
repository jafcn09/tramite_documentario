import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoading = true;
  showContent = false;
  showHomeButton = false;
  showHeader = true;
  showFooter = true;
  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeRoute();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.initializeRoute();
      }
    });
  }

  private initializeRoute(): void {
    const currentUrl = this.router.url;
    const adminRoutes = ['/servicios-administrativos', '/admin', '/administrativo', '/usuario', '/alumno', '/externo', '/estudiante', '/grados-admin'];
    const loginRoutes = ['/admin-login', '/usuario-login', '/alumno-login', '/externo-login'];
    const userRoutes = ['/perfil', '/cambiar-contrasena'];

    const isAdminRoute = adminRoutes.some(route => currentUrl.includes(route));
    const isLoginRoute = loginRoutes.some(route => currentUrl.includes(route));
    const isUserRoute = userRoutes.some(route => currentUrl.includes(route));

    if (isAdminRoute || isLoginRoute || isUserRoute) {
      this.showHeader = false;
      this.showFooter = false;
      this.showHomeButton = false;
      this.isLoading = false;
      this.showContent = true;
    } else {
      this.showHeader = true;
      this.showFooter = true;
      this.showHomeButton = currentUrl !== '/';
      this.startPreloader();
    }
  }

  private startPreloader(): void {
    this.isLoading = true;
    this.showContent = false;

    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        this.showContent = true;
      }, 100);
    }, 1500);
  }
  
  goHome(): void {
    const user = this.authService.currentUserValue;

    if (!user || !user.role) {

      this.router.navigate(['/']);
      return;
    }

    const roleName = user.role.name.toUpperCase();

    switch (roleName) {
      case 'USUARIO':
        this.router.navigate(['/usuario/mis-tramites']);
        break;
      case 'ADMINISTRATIVO':
        this.router.navigate(['/administrativo/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'ESTUDIANTE':
        this.router.navigate(['/estudiante/tablero']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}