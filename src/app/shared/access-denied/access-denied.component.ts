import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-access-denied',
    imports: [CommonModule],
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent {
  currentUser = this.authService.currentUserValue;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToHome() {
    const roleName = this.currentUser?.role?.name?.toUpperCase();

    let route = '/';
    switch (roleName) {
      case 'USUARIO':
        route = '/usuario/tablero';
        break;
      case 'ADMINISTRATIVO':
        route = '/administrativo/tablero';
        break;
      case 'ADMIN':
        route = '/admin/tablero';
        break;
      case 'ESTUDIANTE':
        route = '/estudiante/tablero';
        break;
      default:
        route = '/';
    }

    this.router.navigate([route]);
  }

  goBack() {
    const roleName = this.currentUser?.role?.name?.toUpperCase();

    let route = '/';
    switch (roleName) {
      case 'USUARIO':
        route = '/usuario/tablero';
        break;
      case 'ADMINISTRATIVO':
        route = '/administrativo/tablero';
        break;
      case 'ADMIN':
        route = '/admin/tablero';
        break;
      case 'ESTUDIANTE':
        route = '/estudiante/tablero';
        break;
      default:
        route = '/';
    }

    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }
}
