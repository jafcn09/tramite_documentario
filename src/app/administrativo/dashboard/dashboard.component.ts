import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { BandejaTramitesService } from '../../services/bandeja-tramites.service';
import { MisTramitesService } from '../../services/mis-tramites.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-administrativo-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="stats-grid" *ngIf="isAdministrativo">
        <div class="stat-card">
          <div class="stat-icon pending">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.pendingTramites }}</h3>
            <p>Pendientes de Revisión</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon processing">
            <i class="fas fa-spinner"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.processingTramites }}</h3>
            <p>Por Procesar</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon completed">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.completedTramites }}</h3>
            <p>Procesados</p>
            <small *ngIf="getTramitesVencidos() > 0" class="expired-note">
              (incluye {{ getTramitesVencidos() }} vencidos)
            </small>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon rejected">
            <i class="fas fa-times-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ stats.rejectedTramites }}</h3>
            <p>Rechazados</p>
          </div>
        </div>
      </div>


      <div class="stats-grid" *ngIf="isUsuario">
        <div class="stat-card">
          <div class="stat-icon pending">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-content">
            <h3>{{ userStats.enRevision }}</h3>
            <p>En Revisión</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon processing">
            <i class="fas fa-spinner"></i>
          </div>
          <div class="stat-content">
            <h3>{{ userStats.enProceso }}</h3>
            <p>En Proceso</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon completed">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ userStats.completedTramites }}</h3>
            <p>Completados</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon rejected">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <div class="stat-content">
            <h3>{{ userStats.observedTramites }}</h3>
            <p>Observados</p>
          </div>
        </div>
      </div>

      <div class="content-grid" *ngIf="isAdministrativo">
        <div class="card pending-tramites">
          <div class="card-header">
            <h3>Trámites Pendientes</h3>
          </div>
          <div class="card-content">
            <div class="tramites-list">
              <div *ngFor="let tramite of pendingTramites" class="tramite-item">
                <div class="tramite-info">
                  <div class="tramite-title">{{ tramite.title }}</div>
                  <div class="tramite-user">{{ tramite.user }}</div>
                  <div class="tramite-metadata">
                    <span class="tramite-tipo">📋 {{ tramite.tipoTramite }}</span>
                    <span class="tramite-area">🏢 {{ tramite.areaOrigen }}</span>
                    <span class="tramite-usuario-tipo">{{ tramite.tipoUsuario }}</span>
                  </div>
                  <div class="tramite-date">{{ tramite.date }}</div>
                </div>
                <div class="tramite-actions">
                  <button class="btn btn-sm btn-primary" (click)="reviewTramite(tramite.id)">
                    Revisar
                  </button>
                </div>
              </div>
            </div>

            <div *ngIf="getTramitesVencidos() > 0" class="expired-summary">
              <div class="expired-info">
                <i class="fas fa-exclamation-triangle"></i>
                <span>{{ getTramitesVencidos() }} trámites vencidos contabilizados como procesados</span>
              </div>
              <button class="btn btn-sm btn-outline" (click)="viewExpiredTramites()">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>

        <div class="card quick-actions">
          <div class="card-header">
            <h3>Acciones Rápidas</h3>
          </div>
          <div class="card-content">
            <div class="actions-list">
              <button class="action-item" (click)="generateReport()">
                <i class="fas fa-chart-bar"></i>
                <span>Generar Reporte</span>
              </button>
              <button class="action-item" (click)="viewAllTramites()">
                <i class="fas fa-file-alt"></i>
                <span>Ver Todos los Trámites</span>
              </button>
             
            </div>
          </div>
        </div>
      </div>

      <div class="content-grid usuario-content" *ngIf="isUsuario">
        <div class="card my-tramites">
          <div class="card-header">
            <h3>Mis Trámites</h3>
          </div>
          <div class="card-content">
            <div class="tramites-list">
              <div *ngFor="let tramite of userTramites" class="tramite-item">
                <div class="tramite-info">
                  <div class="tramite-title">{{ tramite.title }}</div>
                  <div class="tramite-estado">
                    <span class="estado-badge" [ngClass]="getEstadoClase(tramite.estado)">{{ tramite.estado }}</span>
                  </div>
                  <div class="tramite-date">{{ tramite.date }}</div>
                </div>
                <div class="tramite-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="getValidatedProgress(tramite)"></div>
                  </div>
                  <span class="progress-text">{{ getValidatedProgress(tramite) }}% avanzado</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="viewAllMyTramites()">
                Ver Todos Mis Trámites
              </button>
            </div>
          </div>
        </div>

        <div class="card status-summary">
          <div class="card-header">
            <h3>Estado de Documentos</h3>
          </div>
          <div class="card-content">
            <div class="status-list">
              <div class="status-item" *ngFor="let status of documentStatus">
                <div class="status-icon" [ngClass]="status.clase">
                  <i [class]="status.icono"></i>
                </div>
                <div class="status-info">
                  <div class="status-title">{{ status.titulo }}</div>
                  <div class="status-count">{{ status.cantidad }} documentos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      width: 100%;
      padding: 0 20px;
      margin: 0;
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
    .stat-icon.rejected { background: #e74c3c; }

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

    .tramites-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .tramite-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #f39c12;
    }

    .tramite-title {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 4px;
    }

    .tramite-user {
      font-size: 14px;
      color: #7f8c8d;
      margin-bottom: 2px;
    }

    .tramite-date {
      font-size: 12px;
      color: #95a5a6;
    }

    .tramite-metadata {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin: 8px 0;
    }

    .tramite-tipo,
    .tramite-area,
    .tramite-usuario-tipo {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      background: #f1f2f6;
      color: #2c3e50;
      display: inline-block;
      max-width: fit-content;
    }

    .tramite-tipo {
      background: #e3f2fd;
      color: #1976d2;
    }

    .tramite-area {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    .tramite-usuario-tipo {
      background: #fff3e0;
      color: #f57c00;
    }

    .btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .actions-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .action-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px;
      background: #f8f9fa;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-item:hover {
      background: #e74c3c;
      color: white;
    }

    .action-item i {
      color: #e74c3c;
      transition: color 0.3s ease;
    }

    .action-item:hover i {
      color: white;
    }

    /* USUARIO-specific styles */
    .usuario-content {
      grid-template-columns: 1.5fr 1fr;
      gap: 25px;
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
      background: #f1f2f6;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #27ae60, #2ecc71);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      min-width: 35px;
    }

    .estado-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .estado-proceso {
      background: #3498db;
      color: white;
    }

    .estado-completado {
      background: #27ae60;
      color: white;
    }

    .estado-observado {
      background: #f39c12;
      color: white;
    }

    .estado-rechazado {
      background: #e74c3c;
      color: white;
    }

    .estado-aprobado {
      background: #27ae60;
      color: white;
    }

    .card-footer {
      padding: 15px 25px;
      border-top: 1px solid #f1f2f6;
      background: #fafbfc;
      text-align: center;
    }

    .status-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .status-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
    }

    .status-approved {
      background: #27ae60;
    }

    .status-review {
      background: #3498db;
    }

    .status-action {
      background: #f39c12;
    }

    .status-processing {
      background: #3498db;
    }

    .status-completed {
      background: #27ae60;
    }

    .status-rejected {
      background: #e74c3c;
    }

    .status-title {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 2px;
    }

    .status-count {
      font-size: 12px;
      color: #7f8c8d;
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
    }

    .btn-outline:hover {
      background: #f39c12;
      color: white;
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .usuario-content {
        grid-template-columns: 1fr;
      }

      .expired-summary {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;


  get userRole(): string {
    return this.currentUser?.role?.name || '';
  }

  get isAdministrativo(): boolean {
    return this.userRole === 'ADMINISTRATIVO';
  }

  get isUsuario(): boolean {
    return this.userRole === 'USUARIO';
  }

  get isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  // Stats for ADMINISTRATIVO role
  stats = {
    pendingTramites: 0,
    processingTramites: 0,
    completedTramites: 0,
    rejectedTramites: 0
  };

  loading = true;

  allTramites: any[] = [];

  tramitePermisos: Map<number, {
    puedeAprobar: boolean;
    puedeRechazar: boolean;
    puedeDerivar: boolean;
    puedeResponder: boolean;
    estaVencido: boolean;
  }> = new Map();
  userStats = {
    enRevision: 0,
    enProceso: 0,
    completedTramites: 0,
    observedTramites: 0
  };

  pendingTramites: any[] = [];
  userTramites: any[] = [];


  documentStatus: any[] = [];

  constructor(
    private authService: AuthService,
    private bandejaTramitesService: BandejaTramitesService,
    private misTramitesService: MisTramitesService,
    private reportesService: ReportesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;

    if (this.isAdministrativo) {
      this.loadAllTramitesAndPermissions();
    } else if (this.isUsuario) {
      this.loadUserStats();
      this.loadUserTramites();
      this.loadDocumentStatus();
    }
  }

  private loadAllTramitesAndPermissions() {
    this.loading = true;
    this.misTramitesService.getMisTramites(1, 1000).subscribe({
      next: (response) => {
        this.allTramites = response.data || [];


        this.loadPermissionsForTramites();
      },
      error: (error) => {
        this.loading = false;

        this.loadBasicStats();
      }
    });
  }

  private loadPermissionsForTramites() {
    const tramitePromises = this.allTramites.map(tramite =>
      this.bandejaTramitesService.verificarPermisosAcciones(tramite.id).toPromise()
        .then(permisos => {
          if (permisos) {
            this.tramitePermisos.set(tramite.id, permisos);
          }
          return permisos;
        })
        .catch(error => {
          return null;
        })
    );

    Promise.all(tramitePromises).then(() => {

      this.calculateStatsWithExpiredTramites();
      this.loadPendingTramitesWithPermissions();
      this.loading = false;
    });
  }

  private calculateStatsWithExpiredTramites() {

    const expiredCount = this.getTramitesVencidos();


    const baseStats = this.getBaseStatistics();

    this.stats = {
      pendingTramites: baseStats.pending,
      processingTramites: Math.max(0, baseStats.processing - expiredCount),
      completedTramites: baseStats.completed + expiredCount,
      rejectedTramites: baseStats.rejected
    };

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
      processing: 0,
      completed: 0,
      rejected: 0
    };

    this.allTramites.forEach(tramite => {
      const estado = tramite.estado?.nombre || '';

      if (['En Revisión', 'Enviado'].includes(estado)) {
        stats.pending++;
      } else if (['En Proceso', 'Aprobado', 'Derivado'].includes(estado)) {
        stats.processing++;
      } else if (['Finalizado'].includes(estado)) {
        stats.completed++;
      } else if (['Rechazado', 'Observado'].includes(estado)) {
        stats.rejected++;
      }
    });

    return stats;
  }

  private loadBasicStats() {
    this.bandejaTramitesService.getEstadisticas().subscribe({
      next: (estadisticas) => {
        this.stats = {
          pendingTramites: estadisticas.pendientesRevision || 0,
          processingTramites: estadisticas.enProceso || 0,
          completedTramites: estadisticas.finalizadosHoy || 0,
          rejectedTramites: estadisticas.vencidos || 0
        };
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

  private loadUserStats() {
    if (!this.isUsuario) return;
    

    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
       
        const tramites = response.data || [];
        
        if (tramites.length > 0) {
         
          
        }

        const estadosCount = {
          enRevision: 0,
          enProceso: 0,
          completados: 0,
          observados: 0
        };
        
        tramites.forEach((t: any) => {
          const estado = t.estado?.nombre || '';
       
          
          if (['En Revisión', 'Enviado'].includes(estado)) {
            estadosCount.enRevision++;
          }
          if (['En Proceso', 'Aprobado', 'Derivado'].includes(estado)) {
            estadosCount.enProceso++;
          }
          if (['Finalizado'].includes(estado)) {
            estadosCount.completados++;
          }
          if (['Observado', 'Rechazado'].includes(estado)) {
            estadosCount.observados++;
          }
        });
        
   
        
        this.userStats = {
          enRevision: estadosCount.enRevision,
          enProceso: estadosCount.enProceso,
          completedTramites: estadosCount.completados,
          observedTramites: estadosCount.observados
        };
      },
      error: (error) => {
        
      }
    });
  }

  private loadUserTramites() {
    if (!this.isUsuario) return;
    
    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        this.userTramites = tramites
          .slice(0, 3)
          .map((tramite: any) => ({
            id: tramite.id,
            title: tramite.asunto || `${tramite.tipoTramite?.nombre}`,
            estado: tramite.estado?.nombre,
            date: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
            progreso: tramite.progreso
          }));
      },
      error: (error) => {
      
      }
    });
  }

  private loadDocumentStatus() {
    if (!this.isUsuario) return;
    
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        const estadosConDocumentos = [];
        
        const aprobados = tramites.filter((t: any) => t.estado?.nombre === 'Aprobado').length;
        if (aprobados > 0) {
          estadosConDocumentos.push({
            titulo: 'Documentos Aprobados',
            cantidad: aprobados,
            icono: 'fas fa-check-circle',
            clase: 'status-approved'
          });
        }
        
        const enRevision = tramites.filter((t: any) => 
          ['En Revisión', 'Enviado'].includes(t.estado?.nombre)
        ).length;
        if (enRevision > 0) {
          estadosConDocumentos.push({
            titulo: 'En Revisión',
            cantidad: enRevision,
            icono: 'fas fa-clock',
            clase: 'status-review'
          });
        }
        
        const enProceso = tramites.filter((t: any) => 
          ['En Proceso', 'Derivado'].includes(t.estado?.nombre)
        ).length;
        if (enProceso > 0) {
          estadosConDocumentos.push({
            titulo: 'En Proceso',
            cantidad: enProceso,
            icono: 'fas fa-spinner',
            clase: 'status-processing'
          });
        }
        
        const observados = tramites.filter((t: any) => t.estado?.nombre === 'Observado').length;
        if (observados > 0) {
          estadosConDocumentos.push({
            titulo: 'Requieren Acción',
            cantidad: observados,
            icono: 'fas fa-exclamation-triangle',
            clase: 'status-action'
          });
        }
        
        const rechazados = tramites.filter((t: any) => t.estado?.nombre === 'Rechazado').length;
        if (rechazados > 0) {
          estadosConDocumentos.push({
            titulo: 'Rechazados',
            cantidad: rechazados,
            icono: 'fas fa-times-circle',
            clase: 'status-rejected'
          });
        }
        
        const finalizados = tramites.filter((t: any) => t.estado?.nombre === 'Finalizado').length;
        if (finalizados > 0) {
          estadosConDocumentos.push({
            titulo: 'Finalizados',
            cantidad: finalizados,
            icono: 'fas fa-flag-checkered',
            clase: 'status-completed'
          });
        }
        
        this.documentStatus = estadosConDocumentos;
      },
      error: (error) => {
       
      }
    });
  }


  private loadPendingTramitesWithPermissions() {

    const filteredTramites = this.allTramites.filter(tramite => {
      const estado = tramite.estado?.nombre || tramite.estado || '';
      const isPendingState = ['En Revisión', 'Aprobado', 'Derivado', 'Enviado', 'En Proceso'].includes(estado);
      const permisos = this.tramitePermisos.get(tramite.id);
      const isNotExpired = !permisos?.estaVencido;
      return isPendingState && isNotExpired;
    });

    this.pendingTramites = filteredTramites
      .slice(0, 3)
      .map(tramite => ({
        id: tramite.id,
        title: tramite.asunto || tramite.titulo || `${tramite.tipoTramite?.nombre || 'Trámite'}`,
        user: tramite.usuarioSolicitante ?
              `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` :
              'Usuario no identificado',
        date: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
        codigo: tramite.codigo,
        tipoTramite: tramite.tipoTramite?.nombre || tramite.tipo || 'No especificado',
        areaOrigen: tramite.areaOrigen?.nombre || tramite.areaDestino?.nombre || 'Área general',
        tipoUsuario: this.determinarTipoUsuario(tramite),
        isExpired: false
      }));
  }

  private loadPendingTramites() {

    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        this.pendingTramites = response.data
          .filter(tramite => ['En Revisión', 'Aprobado', 'Derivado', 'Enviado'].includes(tramite.estado.nombre))
          .slice(0, 3)
          .map(tramite => ({
            id: tramite.id,
            title: tramite.asunto || `${tramite.tipoTramite.nombre}`,
            user: tramite.trabajadorAsignado ?
                  `${tramite.trabajadorAsignado.nombre} ${tramite.trabajadorAsignado.apellidos}` :
                  'Sin asignar',
            date: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
            codigo: tramite.codigo
          }));
      },
      error: (error) => {
      }
    });
  }

  private formatTimeAgo(fecha: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(fecha).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `${diffMins} minutos`;
    if (diffHours < 24) return `${diffHours} horas`;
    return `${Math.floor(diffHours / 24)} días`;
  }

  reviewTramite(id: number) {
    this.router.navigate(['/administrativo/mis-tramites']);
  }

  generateReport() {

    this.router.navigate(['/administrativo/reportes']);
  }

  viewAllTramites() {
    this.router.navigate(['/administrativo/mis-tramites']);
  }

  viewExpiredTramites() {
    this.router.navigate(['/administrativo/mis-tramites'], {
      queryParams: { showExpired: true }
    });
  }

  manageTemplates() {
  
  }


  viewAllMyTramites() {
    const userRole = this.userRole;
    if (userRole === 'USUARIO') {
      window.location.href = '/usuario/mis-tramites';
    } else if (userRole === 'ADMINISTRATIVO') {
      window.location.href = '/administrativo/mis-tramites';
    }
  }

  getEstadoClase(estado: string): string {
    const clases: { [key: string]: string } = {
      'En Proceso': 'estado-proceso',
      'Completado': 'estado-completado',
      'Observado': 'estado-observado',
      'Rechazado': 'estado-rechazado',
      'Aprobado': 'estado-aprobado'
    };
    return clases[estado] || 'estado-default';
  }

  determinarTipoUsuario(tramite: any): string {
    // Verificar si es estudiante por el rol del usuario solicitante
    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase().includes('estudiante')) {
      return '👨‍🎓 Estudiante';
    }

    // Verificar si es usuario estándar
    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase() === 'usuario') {
      return '👤 Usuario';
    }

    // Verificar si es administrativo
    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase().includes('administrativo')) {
      return '👔 Administrativo';
    }

   
    if (tramite.usuarioSolicitante?.correo) {
      const email = tramite.usuarioSolicitante.correo.toLowerCase();
      if (email.includes('student') || email.includes('estudiante') || email.includes('@univ') || email.includes('@edu')) {
        return '👨‍🎓 Estudiante';
      }
    }
    return '👤 Usuario';
  }

  getValidatedProgress(tramite: any): number {
    if (!tramite || tramite.progreso === undefined || tramite.progreso === null) return 0;

    const progreso = tramite.progreso;
    if (isNaN(progreso)) {
      return 0;
    }

    return Math.max(0, Math.min(100, progreso));
  }
}