import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { BandejaTramitesService } from '../../services/bandeja-tramites.service';
import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon users">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <h3 [class.loading]=\"loadingUserCount\">{{ loadingUserCount ? '...' : stats.totalUsers }}</h3>
            <p>Total de Usuarios</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon tramites">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.totalTramites }}</h3>
            <p>Trámites Registrados</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon pending">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.pendingTramites }}</h3>
            <p>Trámites Pendientes</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon completed">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.completedTramites }}</h3>
            <p>Trámites Completados</p>
            <small *ngIf="getTramitesVencidos() > 0" class="expired-note">
              (incluye {{ getTramitesVencidos() }} vencidos)
            </small>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="card recent-activity">
          <div class="card-header">
            <h3>Actividad Reciente</h3>
          </div>
          <div class="card-content">
            <div class="activity-list-container">
              <div class="activity-list" #activityList>
                <div *ngFor="let activity of recentActivities; trackBy: trackByActivity" class="activity-item">
                  <div class="activity-icon" [class]="activity.type">
                    <i [class]="activity.icon"></i>
                  </div>
                  <div class="activity-content">
                    <p>{{ activity.description }}</p>
                    <div class="activity-meta">
                      <span class="activity-role" 
                            [class.role-admin]="activity.role === 'ADMIN'"
                            [class.role-administrativo]="activity.role === 'ADMINISTRATIVO'"
                            [class.role-usuario]="activity.role === 'USUARIO'"
                            *ngIf="activity.role">{{ activity.role }}</span>
                      <span class="activity-status" 
                            [class.status-completed]="activity.status === 'completed'"
                            [class.status-pending]="activity.status === 'pending'"
                            *ngIf="activity.status">{{ activity.status }}</span>
                      <span class="activity-time">{{ activity.time }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Loading indicator -->
                <div *ngIf="loadingActivities" class="activity-item loading-item">
                  <div class="activity-icon loading">
                    <i class="fas fa-spinner fa-spin"></i>
                  </div>
                  <div class="activity-content">
                    <p>Cargando más actividades...</p>
                  </div>
                </div>
                
                <!-- Load more button -->
                <div *ngIf="canLoadMore && !loadingActivities && recentActivities.length > 0" 
                     class="activity-item load-more-item">
                  <button class="load-more-btn" (click)="loadMoreActivities()">
                    <i class="fas fa-chevron-down"></i>
                    Cargar más actividades
                  </button>
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
              </div>
            </div>
          </div>
        </div>

        <div class="card quick-actions">
          <div class="card-header">
            <h3>Acciones Rápidas</h3>
          </div>
          <div class="card-content">
            <div class="actions-grid">
              <button class="action-btn" (click)="manageUsers()">
                <i class="fas fa-users"></i>
                <span>Gestionar Usuarios</span>
              </button>
              <button class="action-btn" (click)="viewReports()">
                <i class="fas fa-chart-bar"></i>
                <span>Ver Reportes</span>
              </button>
              <button class="action-btn" (click)="manageDocuments()">
                <i class="fas fa-file-alt"></i>
                <span>Gestionar Trámites</span>
              </button>
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

    .stat-icon.users { background: #3498db; }
    .stat-icon.tramites { background: #e74c3c; }
    .stat-icon.pending { background: #f39c12; }
    .stat-icon.completed { background: #27ae60; }

    .stat-content h3 {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      color: #2c3e50;
    }
    
    .stat-content h3.loading {
      opacity: 0.6;
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
    }

    .card-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
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
    
    .activity-list::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }

    .activity-list > .activity-item {
      margin-bottom: 15px;
    }
    
    .activity-list > .activity-item:last-child {
      margin-bottom: 0;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 15px;
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
    }

    .activity-icon.user { background: #3498db; }
    .activity-icon.tramite { background: #e74c3c; }
    .activity-icon.system { background: #95a5a6; }
    .activity-icon.area { background: #9b59b6; }
    .activity-icon.login { background: #2ecc71; }
    .activity-icon.expired { background: #f39c12; }

    .activity-content p {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #2c3e50;
    }

    .activity-time {
      font-size: 12px;
      color: #7f8c8d;
    }

    .activity-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
    }

    .activity-role {
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #95a5a6; /* Color por defecto */
    }
    
    .activity-role.role-admin {
      background: #e74c3c;
    }
    
    .activity-role.role-administrativo {
      background: #3498db;
    }
    
    .activity-role.role-usuario {
      background: #27ae60;
    }
    
    .activity-status {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-left: 5px;
    }
    
    .activity-status.status-completed {
      background: #d4edda;
      color: #155724;
    }

    .activity-status.status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .activity-status.status-expired {
      background: #f8d7da;
      color: #721c24;
    }
    
    .loading-item .activity-icon.loading {
      background: #f0f0f0;
      color: #999;
    }
    
    .load-more-item {
      justify-content: center;
      padding: 10px 0;
    }
    
    .load-more-btn {
      background: none;
      border: 1px dashed #cbd5e0;
      border-radius: 8px;
      padding: 10px 20px;
      color: #667eea;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .load-more-btn:hover {
      border-color: #667eea;
      background: #f7fafc;
    }
    
    .empty-state .activity-icon.empty {
      background: #e2e8f0;
      color: #a0aec0;
    }
    
    .empty-state .activity-content p {
      color: #a0aec0;
      font-style: italic;
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
      text-decoration: none;
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

    /* Expired tramites styles */
    .expired-note {
      display: block;
      font-size: 11px;
      color: #f39c12;
      margin-top: 2px;
      font-weight: 500;
    }

    .expired-summary {
      margin-top: 20px;
      padding: 15px;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .expired-info {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #856404;
    }

    .expired-info i {
      color: #f39c12;
      font-size: 16px;
    }

    .btn-outline {
      background: transparent;
      border: 1px solid #f39c12;
      color: #f39c12;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-outline:hover {
      background: #f39c12;
      color: white;
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
      .dashboard-container {
        padding: 10px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }
      
      .actions-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .action-btn {
        padding: 20px;
        flex-direction: row;
        justify-content: flex-start;
        gap: 15px;
        text-align: left;
      }
      
      .action-btn i {
        font-size: 20px;
        width: auto;
      }
      
      .action-btn span {
        font-size: 14px;
        font-weight: 500;
      }
      
      .stat-card {
        padding: 20px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  stats = {
    totalUsers: 0,
    totalTramites: 0,
    pendingTramites: 0,
    completedTramites: 0
  };

  recentActivities: any[] = [];
  loadingActivities = false;
  loadingUserCount = false;
  canLoadMore = true;
  currentOffset = 0;
  activitiesLimit = 5;

  // Lista de trámites para calcular vencidos
  allTramites: any[] = [];

  // Cache for tramite permissions
  tramitePermisos: Map<number, {
    puedeAprobar: boolean;
    puedeRechazar: boolean;
    puedeDerivar: boolean;
    puedeResponder: boolean;
    estaVencido: boolean;
  }> = new Map();

  constructor(
    private authService: AuthService,
    private bandejaTramitesService: BandejaTramitesService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.loadAllTramitesAndPermissions();
    this.loadUserCount(); // Cargar el contador de usuarios
    this.loadRecentActivities(); // Cargar actividades recientes del sistema
  }

  loadUserCount() {
    this.loadingUserCount = true;


    // Use the proper endpoint to get the user count
    const countUrl = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/count` : '/api/usuarios/count';
    this.http.get<{totalUsers: number}>(countUrl).subscribe({
      next: (response) => {

        this.stats.totalUsers = response.totalUsers;
        this.loadingUserCount = false;
      },
      error: (error) => {
        console.error('❌ Error loading user count:', error);

        const recentUrl = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/public/recent?limit=1000` : '/api/usuarios/public/recent?limit=1000';
        this.http.get<any[]>(recentUrl).subscribe({
          next: (users) => {

            this.stats.totalUsers = users.length;
            this.loadingUserCount = false;
          },
          error: (fallbackError) => {
            console.error('❌ All user count methods failed:', fallbackError);
            this.stats.totalUsers = 0;
            this.loadingUserCount = false;
          }
        });
      }
    });
  }

  // Load all tramites and their permissions for accurate statistics
  loadAllTramitesAndPermissions() {
    this.bandejaTramitesService.getTramites(1, 1000).subscribe({
      next: (response) => {
        this.allTramites = response.data || [];
     

        // Load permissions for each tramite
        this.loadPermissionsForTramites();
      },
      error: (error) => {
        console.error('❌ Error al cargar trámites desde bandeja-tramites:', error);

        this.loadTramitesStatistics();
      }
    });
  }

  private loadPermissionsForTramites() {
    const tramitePromises = this.allTramites.map(tramite =>
      firstValueFrom(this.bandejaTramitesService.verificarPermisosAcciones(tramite.id))
        .then(permisos => {
          if (permisos) {
            this.tramitePermisos.set(tramite.id, permisos);
          }
          return permisos;
        })
        .catch(error => {
          console.error(`❌ Error al cargar permisos para trámite ${tramite.codigo}:`, error);
          return null;
        })
    );

    Promise.all(tramitePromises).then(() => {

      this.calculateStatsWithExpiredTramites();
      this.generateRecentActivitiesFromTramites();
    });
  }

  private calculateStatsWithExpiredTramites() {
    // Get expired tramites count
    const expiredCount = this.getTramitesVencidos();

    // Calculate base statistics
    const baseStats = this.getBaseStatistics();

    // Only estimate users if we don't have a real count yet
    if (this.stats.totalUsers === 0) {
      // Estimate unique users from tramites (as fallback)
      const uniqueUserEmails = new Set();
      this.allTramites.forEach(tramite => {
        if (tramite.usuario?.email) {
          uniqueUserEmails.add(tramite.usuario.email);
        }
        if (tramite.trabajadorAsignado?.email) {
          uniqueUserEmails.add(tramite.trabajadorAsignado.email);
        }
      });
      this.stats.totalUsers = uniqueUserEmails.size || 0;
    }

    // Update stats WITHOUT overwriting totalUsers if it already has a value
    this.stats.totalTramites = this.allTramites.length;
    this.stats.pendingTramites = baseStats.pending;
    this.stats.completedTramites = baseStats.completed + expiredCount;

  
  }

  getTramitesVencidos(): number {
    return this.allTramites.filter(tramite => {
      const permisos = this.tramitePermisos.get(tramite.id);
      return permisos?.estaVencido || false;
    }).length;
  }

  private getBaseStatistics() {
    const stats = {
      pending: 0,
      completed: 0
    };

    this.allTramites.forEach(tramite => {
      const estado = tramite.estado?.nombre || '';

      if (['En Revisión', 'Enviado', 'En Proceso', 'Aprobado', 'Derivado'].includes(estado)) {
        stats.pending++;
      } else if (['Finalizado'].includes(estado)) {
        stats.completed++;
      }
    });

    return stats;
  }

  private generateRecentActivitiesFromTramites() {
    // Generate activities from recent tramites
    const recentTramites = this.allTramites
      .sort((a, b) => new Date(b.fechaActualizacion || b.fechaCreacion).getTime() -
                      new Date(a.fechaActualizacion || a.fechaCreacion).getTime())
      .slice(0, 5);



    this.recentActivities = recentTramites.map(tramite => {
      const isExpired = this.tramitePermisos.get(tramite.id)?.estaVencido || false;

      // Better user name handling
      let userName = 'Usuario Desconocido';
      if (tramite.usuario && tramite.usuario.nombre && tramite.usuario.apellidos) {
        userName = `${tramite.usuario.nombre} ${tramite.usuario.apellidos}`;
      } else if (tramite.trabajadorAsignado && tramite.trabajadorAsignado.nombre) {
        userName = `${tramite.trabajadorAsignado.nombre} ${tramite.trabajadorAsignado.apellidos || ''}`.trim();
      }

      // Better tramite description
      const tramiteTitle = tramite.asunto || tramite.tipoTramite?.nombre || 'Trámite sin título';
      const estadoNombre = tramite.estado?.nombre || 'Sin estado';

      let description = '';
      let icon = 'fas fa-file-alt';
      let type = 'tramite';

      if (isExpired) {
        description = `Trámite ${tramite.codigo || 'N/A'} vencido - ${tramiteTitle}`;
        icon = 'fas fa-exclamation-triangle';
        type = 'expired';
      } else {
        description = `${userName} - ${tramiteTitle} (${estadoNombre})`;
        icon = estadoNombre === 'Finalizado' ? 'fas fa-check-circle' : 'fas fa-file-alt';
      }

      return {
        type,
        icon,
        description,
        time: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
       
        status: isExpired ? 'expirado' : (estadoNombre === 'Finalizado' ? 'completado' : 'pendiente')
      };
    });


  }

  loadTramitesStatistics() {
    const url = environment.apiUrl ? `${environment.apiUrl}/api/bandeja-tramites/estadisticas` : '/api/bandeja-tramites/estadisticas';
    this.http.get<any>(url).subscribe({
      next: (response) => {
        
        this.stats.totalTramites = response.totalAsignados || 0;
        // Pendientes = En Revisión + Por Procesar (incluye aprobados)
        this.stats.pendingTramites = (response.pendientesRevision || 0) + (response.enProceso || 0);
        this.stats.completedTramites = response.finalizadosHoy || 0;
      },
      error: (error) => {
        console.error('Error loading tramites statistics:', error);
        this.stats.totalTramites = 0;
        this.stats.pendingTramites = 0;
        this.stats.completedTramites = 0;
      }
    });
  }

  loadRecentActivities(append = false) {
    this.loadingActivities = true;
    const offset = append ? this.currentOffset : 0;
    const url = environment.apiUrl ?
      `${environment.apiUrl}/api/activities/recent?limit=${this.activitiesLimit}&offset=${offset}` :
      `/api/activities/recent?limit=${this.activitiesLimit}&offset=${offset}`;

    this.http.get<any[]>(url).subscribe({
      next: (activities) => {
     
        const mappedActivities = activities.map(activity => {
          let roleColor = activity.userRole || 'SISTEMA';
          let statusLabel = '';

          // Personalizar según el tipo de actividad
          switch(activity.type) {
            case 'user':
              activity.icon = activity.icon || 'fas fa-user-plus';
              break;
            case 'tramite':
              if (activity.status === 'pending') {
                statusLabel = 'PENDIENTE';
              } else if (activity.status === 'completed') {
                statusLabel = 'COMPLETADO';
              }
              break;
            case 'notification':
              activity.icon = activity.status === 'unread' ? 'fas fa-bell' : 'fas fa-envelope-open';
              statusLabel = activity.status === 'unread' ? 'NO LEÍDA' : 'LEÍDA';
              break;
            case 'area':
              activity.icon = 'fas fa-building';
              break;
            case 'alert':
              activity.icon = 'fas fa-exclamation-triangle';
              statusLabel = 'ALERTA';
              break;
          }

          return {
            type: activity.type,
            icon: activity.icon || 'fas fa-circle',
            description: activity.description,
            time: this.formatTimeAgo(activity.timestamp),
            role: roleColor,
            status: statusLabel || activity.status,
            action: activity.action
          };
        });

        if (append) {
          this.recentActivities = [...this.recentActivities, ...mappedActivities];
        } else {
          this.recentActivities = mappedActivities;
          this.currentOffset = 0;
        }

        this.currentOffset += activities.length;
        this.canLoadMore = activities.length === this.activitiesLimit;
        this.loadingActivities = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar actividades recientes:', error);
        this.loadingActivities = false;
        // Si falla, generar actividades desde trámites locales
        if (!append) {
          this.generateRecentActivitiesFromTramites();
        }
      }
    });
  }
  
  private loadRecentUsersAsFallback() {
    const url = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/public/recent?limit=5` : '/api/usuarios/public/recent?limit=5';
    this.http.get<any[]>(url).subscribe({
      next: (users) => {
     
        this.recentActivities = users.map(user => ({
          type: 'user',
          icon: 'fas fa-user-plus',
          description: `Nuevo usuario: ${user.nombre} ${user.apellidos}`,
          time: this.formatTimeAgo(user.fechaCreacion),
        
        }));
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.recentActivities = [];
      }
    });
  }

  manageUsers() {
    this.router.navigate(['/admin/user-management']);
  }

  viewReports() {
    this.router.navigate(['/admin/reportes']);
  }

  manageDocuments() {
    this.router.navigate(['/admin/tramites']);
  }

  private formatTimeAgo(dateStr: string): string {
    if (!dateStr) return 'Fecha desconocida';
    
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 0) return 'Ahora mismo'; // Para fechas futuras o muy recientes
    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    
    // Para fechas más antiguas, mostrar la fecha completa
    return date.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
  
  loadMoreActivities() {
    if (!this.loadingActivities && this.canLoadMore) {
      this.loadRecentActivities(true);
    }
  }
  
  trackByActivity(_: number, activity: any): any {
    return activity.description + activity.time;
  }
}