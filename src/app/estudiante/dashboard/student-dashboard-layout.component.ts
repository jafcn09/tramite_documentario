import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-layout">
      <section class="quick-actions-section">
        <div class="section-header">
          <h2>Acciones Rápidas</h2>
          <p>¿Qué necesitas hacer hoy?</p>
        </div>
        <div class="actions-grid">
          <button class="action-card" (click)="navigateToNewTramite()">
            <div class="action-icon new-tramite">
              <i class="fas fa-plus"></i>
            </div>
            <div class="action-content">
              <h3>Nueva Solicitud</h3>
              <p>Crear un nuevo trámite</p>
            </div>
          </button>
          <button class="action-card" (click)="navigateToMisTramites()">
            <div class="action-icon mis-tramites">
              <i class="fas fa-folder-open"></i>
            </div>
            <div class="action-content">
              <h3>Mis Trámites</h3>
              <p>Ver estado y seguimiento</p>
            </div>
          </button>
          
        </div>
      </section>


      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      width: 100%;
      margin: 0;
      padding: 2rem 2rem;
    }

    .quick-actions-section {
      margin-bottom: 3rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .section-header h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .section-header p {
      font-size: 1rem;
      color: #6b7280;
      margin: 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }

    .action-card:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transform: translateY(-1px);
    }

    .action-icon {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;
      flex-shrink: 0;
    }

    .action-icon.new-tramite {
      background: linear-gradient(135deg, #10b981, #059669);
    }

    .action-icon.mis-tramites {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    .action-icon.notifications {
      background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .action-icon.search {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    }

    .action-content h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 0.25rem 0;
    }

    .action-content p {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }

    @media (max-width: 768px) {
      .dashboard-layout {
        padding: 1.5rem 1rem;
      }

      .section-header h2 {
        font-size: 1.5rem;
      }

      .actions-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .action-card {
        padding: 1rem;
      }

      .action-icon {
        width: 40px;
        height: 40px;
        font-size: 18px;
      }
    }

    @media (max-width: 480px) {
      .dashboard-layout {
        padding: 1rem 0.75rem;
      }

      .section-header {
        margin-bottom: 1.5rem;
      }

      .quick-actions-section {
        margin-bottom: 2rem;
      }
    }
  `]
})
export class StudentDashboardLayoutComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToNewTramite() {
    this.router.navigate(['/estudiante/nuevo-tramite']);
  }

  navigateToMisTramites() {
    this.router.navigate(['/estudiante/mis-tramites']);
  }

  navigateToNotificaciones() {
    this.router.navigate(['/estudiante/notificaciones']);
  }

  navigateToSearch() {
    this.router.navigate(['/buscar']);
  }
}