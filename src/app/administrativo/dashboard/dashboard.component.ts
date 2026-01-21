import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BandejaTramitesService } from '../../services/bandeja-tramites.service';
import { MisTramitesService } from '../../services/mis-tramites.service';
import { ReportesService } from '../../services/reportes.service';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../shared/interfaces/auth.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administrativo-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isDarkMode = false;
  private themeSubscription?: Subscription;


  get userRole(): string {
    return this.currentUser?.role?.name || '';
  }

  get isAdministrativo(): boolean {
    return this.userRole === 'administrativo';
  }

  get isUsuario(): boolean {
    return this.userRole === 'usuario';
  }

  get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

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
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });

    this.currentUser = this.authService.currentUserValue;

    if (this.isAdministrativo) {
      this.loadAllTramitesAndPermissions();
    } else if (this.isUsuario) {
      this.loadUserStats();
      this.loadUserTramites();
      this.loadDocumentStatus();
    }
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
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
    if (userRole === 'usuario') {
      window.location.href = '/usuario/mis-tramites';
    } else if (userRole === 'administrativo') {
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
    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase().includes('estudiante')) {
      return '👨‍🎓 Estudiante';
    }

    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase() === 'usuario') {
      return '👤 Usuario';
    }

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