import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { MisTramitesService } from '../../services/mis-tramites.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-usuario-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Stats Grid con tarjetas de estadísticas -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon pending">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.enRevision }}</h3>
            <p>En Revisión</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon processing">
            <i class="fas fa-spinner"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.enProceso }}</h3>
            <p>En Proceso</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon completed">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.completados }}</h3>
            <p>Procesados</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon total">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalTramites }}</h3>
            <p>Total de Trámites</p>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Actividad Reciente -->
        <div class="card recent-activity">
          <div class="card-header">
            <h3>Actividad Reciente</h3>
          </div>
          <div class="card-content">
            <div class="activity-list-container">
              <div class="activity-list">
                <div *ngFor="let activity of recentActivities" class="activity-item">
                  <div class="activity-icon" [class]="activity.type">
                    <i [class]="activity.icon"></i>
                  </div>
                  <div class="activity-content">
                    <p>{{ activity.description }}</p>
                    <div class="activity-meta">
                      <span class="activity-status"
                            [class.status-completed]="activity.status === 'completed'"
                            [class.status-pending]="activity.status === 'pending'"
                            [class.status-rejected]="activity.status === 'rejected'"
                            *ngIf="activity.status">{{ getStatusLabel(activity.status) }}</span>
                      <span class="activity-time">{{ activity.time }}</span>
                    </div>
                  </div>
                </div>

                <!-- Empty state -->
                <div *ngIf="recentActivities.length === 0 && !loadingActivities" class="activity-item empty-state">
                  <div class="activity-icon empty">
                    <i class="fas fa-inbox"></i>
                  </div>
                  <div class="activity-content">
                    <p>No hay actividades recientes</p>
                  </div>
                </div>

                <!-- Loading indicator -->
                <div *ngIf="loadingActivities" class="activity-item loading-item">
                  <div class="activity-icon loading">
                    <i class="fas fa-spinner fa-spin"></i>
                  </div>
                  <div class="activity-content">
                    <p>Cargando actividades...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel de Acciones Rápidas -->
        <div class="card quick-actions">
          <div class="card-header">
            <h3>Acciones Rápidas</h3>
          </div>
          <div class="card-content">
            <div class="actions-grid">
              <button class="action-btn" (click)="createNewTramite()">
                <i class="fas fa-plus"></i>
                <span>Nuevo Trámite</span>
              </button>
              <button class="action-btn" (click)="viewMyTramites()">
                <i class="fas fa-folder-open"></i>
                <span>Mis Trámites</span>
              </button>
              <button class="action-btn" (click)="viewNotifications()">
                <i class="fas fa-bell"></i>
                <span>Notificaciones</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mis Últimos Trámites -->
      <div class="card my-recent-tramites">
        <div class="card-header">
          <h3>Mis Últimos Trámites</h3>
          <button class="btn-link" (click)="viewMyTramites()">Ver todos →</button>
        </div>
        <div class="card-content">
          <div class="tramites-list">
            <div *ngFor="let tramite of myRecentTramites" class="tramite-item">
              <div class="tramite-info">
                <div class="tramite-header">
                  <span class="tramite-codigo">{{ tramite.codigo }}</span>
                  <span class="estado-badge" [class]="getEstadoClass(tramite.estado)">
                    {{ tramite.estado }}
                  </span>
                </div>
                <div class="tramite-title">{{ tramite.titulo }}</div>
                <div class="tramite-meta">
                  <span><i class="fas fa-calendar"></i> {{ tramite.fecha }}</span>
                  <span><i class="fas fa-layer-group"></i> {{ tramite.tipo }}</span>
                </div>
              </div>
              <div class="tramite-progress">
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="tramite.progreso"></div>
                </div>
                <span class="progress-text">{{ tramite.progreso }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      height: 100%;
      overflow-y: auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: white;
    }

    .stat-icon.pending { background: #f39c12; }
    .stat-icon.processing { background: #3498db; }
    .stat-icon.completed { background: #27ae60; }
    .stat-icon.total { background: #9b59b6; }

    .stat-content h3 {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      color: #2c3e50;
    }

    .stat-content p {
      font-size: 14px;
      color: #7f8c8d;
      margin: 4px 0 0 0;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .card-header {
      padding: 20px 25px;
      border-bottom: 1px solid #f1f2f6;
      background: #fafbfc;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .btn-link {
      background: none;
      border: none;
      color: #667eea;
      font-size: 14px;
      cursor: pointer;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .btn-link:hover {
      color: #5a67d8;
    }

    .card-content {
      padding: 25px;
    }

    .activity-list-container {
      position: relative;
    }

    .activity-list {
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #cbd5e0 #f7fafc;
    }

    .activity-list::-webkit-scrollbar {
      width: 6px;
    }

    .activity-list::-webkit-scrollbar-track {
      background: #f7fafc;
      border-radius: 3px;
    }

    .activity-list::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 3px;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      margin-bottom: 15px;
    }

    .activity-item:last-child {
      margin-bottom: 0;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: white;
      flex-shrink: 0;
    }

    .activity-icon.tramite { background: #3498db; }
    .activity-icon.notification { background: #e74c3c; }
    .activity-icon.user { background: #27ae60; }
    .activity-icon.empty { background: #e2e8f0; color: #a0aec0; }
    .activity-icon.loading { background: #f0f0f0; color: #999; }

    .activity-content {
      flex: 1;
    }

    .activity-content p {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #2c3e50;
      line-height: 1.4;
    }

    .activity-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
    }

    .activity-status {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .activity-status.status-completed {
      background: #d4edda;
      color: #155724;
    }

    .activity-status.status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .activity-status.status-rejected {
      background: #f8d7da;
      color: #721c24;
    }

    .activity-time {
      font-size: 12px;
      color: #7f8c8d;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }

    .action-btn {
      background: #f8f9fa;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      background: #667eea;
      border-color: #667eea;
      color: white;
      transform: translateY(-2px);
    }

    .action-btn i {
      font-size: 24px;
      color: #667eea;
      transition: color 0.3s ease;
    }

    .action-btn:hover i {
      color: white;
    }

    .action-btn span {
      font-size: 12px;
      font-weight: 600;
      color: #2c3e50;
      transition: color 0.3s ease;
    }

    .action-btn:hover span {
      color: white;
    }

    .my-recent-tramites {
      margin-top: 30px;
    }

    .tramites-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .tramite-item {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }

    .tramite-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .tramite-codigo {
      font-size: 12px;
      font-weight: 600;
      color: #667eea;
    }

    .estado-badge {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .estado-badge.en-revision {
      background: #fff3cd;
      color: #856404;
    }

    .estado-badge.en-proceso {
      background: #cfe2ff;
      color: #004085;
    }

    .estado-badge.finalizado {
      background: #d4edda;
      color: #155724;
    }

    .estado-badge.observado {
      background: #f8d7da;
      color: #721c24;
    }

    .tramite-title {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 8px;
    }

    .tramite-meta {
      display: flex;
      gap: 20px;
      font-size: 12px;
      color: #7f8c8d;
      margin-bottom: 10px;
    }

    .tramite-meta i {
      margin-right: 5px;
      color: #a0aec0;
    }

    .tramite-progress {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    }

    .progress-bar {
      flex: 1;
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #9f7aea);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 12px;
      font-weight: 600;
      color: #667eea;
      min-width: 40px;
      text-align: right;
    }

    .empty-state .activity-content p {
      color: #a0aec0;
      font-style: italic;
    }

    .loading-item .activity-content p {
      color: #999;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 15px;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
      }

      .content-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .actions-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      .action-btn {
        padding: 15px 10px;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .actions-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .action-btn {
        flex-direction: row;
        justify-content: flex-start;
        gap: 15px;
        padding: 15px;
      }

      .action-btn i {
        font-size: 20px;
      }
    }
  `]
})
export class UsuarioDashboardComponent implements OnInit {
  currentUser: User | null = null;

  stats = {
    enRevision: 0,
    enProceso: 0,
    completados: 0,
    totalTramites: 0
  };

  recentActivities: any[] = [];
  myRecentTramites: any[] = [];
  loadingActivities = false;

  constructor(
    private authService: AuthService,
    private misTramitesService: MisTramitesService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.loadUserStats();
    this.loadRecentActivities();
    this.loadMyRecentTramites();
  }

  loadUserStats() {
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];

        // Contar por estados
        const estadosCount = {
          enRevision: 0,
          enProceso: 0,
          completados: 0,
          total: tramites.length
        };

        const now = new Date();

        tramites.forEach((t: any) => {
          const estado = t.estado?.nombre || '';

          // Verificar si está vencido
          const fechaVencimiento = t.fechaVencimiento ? new Date(t.fechaVencimiento) : null;
          const estaVencido = fechaVencimiento && fechaVencimiento < now;

          if (['En Revisión', 'Enviado'].includes(estado)) {
            estadosCount.enRevision++;
          }
          if (['En Proceso', 'Aprobado', 'Derivado'].includes(estado)) {
            estadosCount.enProceso++;
          }
          // Incluir en procesadas/completados: Finalizados, Archivados, Cancelados, Rechazados y Vencidos
          if (['Finalizado', 'Archivado', 'Cancelado', 'Rechazado'].includes(estado) || estaVencido) {
            estadosCount.completados++;
          }
        });

        this.stats = {
          enRevision: estadosCount.enRevision,
          enProceso: estadosCount.enProceso,
          completados: estadosCount.completados,
          totalTramites: estadosCount.total
        };
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }

  loadRecentActivities() {
    this.loadingActivities = true;

    // Obtener actividades recientes del usuario
    this.misTramitesService.getMisTramites(1, 10).subscribe({
      next: (response) => {
        const tramites = response.data || [];

        // Convertir trámites en actividades
        this.recentActivities = tramites.slice(0, 5).map((tramite: any) => {
          let icon = 'fas fa-file-alt';
          let type = 'tramite';
          let status = 'pending';

          // Determinar icono y estado según el estado del trámite
          const estadoNombre = tramite.estado?.nombre || '';
          if (estadoNombre === 'Finalizado') {
            icon = 'fas fa-check-circle';
            status = 'completed';
          } else if (estadoNombre === 'Observado' || estadoNombre === 'Rechazado') {
            icon = 'fas fa-exclamation-triangle';
            status = 'rejected';
          } else if (estadoNombre === 'En Proceso' || estadoNombre === 'Aprobado') {
            icon = 'fas fa-spinner';
            status = 'pending';
          }

          return {
            type,
            icon,
            description: `Trámite ${tramite.codigo}: ${tramite.asunto || tramite.tipoTramite?.nombre}`,
            time: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
            status
          };
        });

        this.loadingActivities = false;
      },
      error: (error) => {
        console.error('Error al cargar actividades:', error);
        this.loadingActivities = false;
      }
    });
  }

  loadMyRecentTramites() {
    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        const tramites = response.data || [];

        this.myRecentTramites = tramites.map((tramite: any) => ({
          id: tramite.id,
          codigo: tramite.codigo,
          titulo: tramite.asunto || `${tramite.tipoTramite?.nombre}`,
          estado: tramite.estado?.nombre || 'Sin estado',
          fecha: this.formatDate(tramite.fechaCreacion),
          tipo: tramite.tipoTramite?.nombre || 'Sin tipo',
          progreso: this.calculateProgreso(tramite.estado?.nombre)
        }));
      },
      error: (error) => {
        console.error('Error al cargar trámites recientes:', error);
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'completed': 'COMPLETADO',
      'pending': 'EN PROCESO',
      'rejected': 'OBSERVADO'
    };
    return labels[status] || status.toUpperCase();
  }

  getEstadoClass(estado: string): string {
    const clases: { [key: string]: string } = {
      'En Revisión': 'en-revision',
      'En Proceso': 'en-proceso',
      'Finalizado': 'finalizado',
      'Observado': 'observado',
      'Rechazado': 'observado',
      'Aprobado': 'en-proceso',
      'Enviado': 'en-revision'
    };
    return clases[estado] || '';
  }

  calculateProgreso(estado: string): number {
    const progresoMap: { [key: string]: number } = {
      'Borrador': 10,
      'Enviado': 20,
      'En Revisión': 35,
      'Derivado': 45,
      'En Proceso': 60,
      'Aprobado': 75,
      'Finalizado': 100,
      'Observado': 30,
      'Rechazado': 0,
      'Archivado': 100,
      'Cancelado': 0
    };
    return progresoMap[estado] || 50;
  }

  formatTimeAgo(dateStr: string): string {
    if (!dateStr) return 'Fecha desconocida';

    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 0) return 'Ahora mismo';
    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;

    return date.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return 'Sin fecha';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  createNewTramite() {
    this.router.navigate(['/usuario/nuevo-tramite']);
  }

  viewMyTramites() {
    this.router.navigate(['/usuario/mis-tramites']);
  }

  viewNotifications() {
    this.router.navigate(['/usuario/notificaciones']);
  }
}