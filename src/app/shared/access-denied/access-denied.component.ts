import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="access-denied-container">
      <div class="access-denied-card">
        <div class="icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
        </div>
        
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos suficientes para acceder a esta página.</p>
        
        <div class="user-info" *ngIf="currentUser">
          <p><strong>Usuario:</strong> {{ currentUser?.nombre }} {{ currentUser?.apellidos }}</p>
        </div>

        <div class="actions">
          <button class="btn btn-primary" (click)="goToHome()">
            Ir al Inicio
          </button>
          <button class="btn btn-secondary" (click)="goBack()">
            Regresar
          </button>
          <button class="btn btn-outline" (click)="logout()">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .access-denied-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .access-denied-card {
      background: white;
      border-radius: 15px;
      padding: 50px 40px;
      text-align: center;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      width: 100%;
    }

    .icon {
      color: #e74c3c;
      margin-bottom: 20px;
    }

    h1 {
      color: #2c3e50;
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    p {
      color: #7f8c8d;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .user-info {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }

    .user-info p {
      margin: 8px 0;
      color: #495057;
      font-size: 14px;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 30px;
    }

    .btn {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: #667eea;
      color: white;
    }

    .btn-primary:hover {
      background: #5a67d8;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      color: #6c757d;
      border: 2px solid #dee2e6;
    }

    .btn-outline:hover {
      background: #f8f9fa;
      border-color: #adb5bd;
    }

    @media (min-width: 768px) {
      .actions {
        flex-direction: row;
        justify-content: center;
      }
    }
  `]
})
export class AccessDeniedComponent {
  currentUser = this.authService.currentUserValue;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToHome() {
    this.router.navigate(['/home']);
  }

  goBack() {
    // Solo permitir regresar si hay historial válido, sino ir a home
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.authService.logout();
  }
}