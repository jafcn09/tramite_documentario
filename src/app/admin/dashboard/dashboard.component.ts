import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BandejaTramitesService } from '../../services/bandeja-tramites.service';
import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
  allTramites: any[] = [];
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
    this.loadUserCount(); 
    this.loadRecentActivities(); 
  }

  loadUserCount() {
    this.loadingUserCount = true;

    const countUrl = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/count` : '/api/usuarios/count';
    this.http.get<{totalUsers: number}>(countUrl).subscribe({
      next: (response) => {

        this.stats.totalUsers = response.totalUsers;
        this.loadingUserCount = false;
      },
      error: (error) => {

        const recentUrl = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/public/recent?limit=1000` : '/api/usuarios/public/recent?limit=1000';
        this.http.get<any[]>(recentUrl).subscribe({
          next: (users) => {

            this.stats.totalUsers = users.length;
            this.loadingUserCount = false;
          },
          error: (fallbackError) => {
            this.stats.totalUsers = 0;
            this.loadingUserCount = false;
          }
        });
      }
    });
  }


  loadAllTramitesAndPermissions() {
    this.bandejaTramitesService.getTramites(1, 1000).subscribe({
      next: (response) => {
        this.allTramites = response.data || [];
     

        this.loadPermissionsForTramites();
      },
      error: (error) => {

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
          return null;
        })
    );

    Promise.all(tramitePromises).then(() => {

      this.calculateStatsWithExpiredTramites();
      this.generateRecentActivitiesFromTramites();
    });
  }

  private calculateStatsWithExpiredTramites() {

    const expiredCount = this.getTramitesVencidos();


    const baseStats = this.getBaseStatistics();

    if (this.stats.totalUsers === 0) {

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
  
    const recentTramites = this.allTramites
      .sort((a, b) => new Date(b.fechaActualizacion || b.fechaCreacion).getTime() -
                      new Date(a.fechaActualizacion || a.fechaCreacion).getTime())
      .slice(0, 5);

    this.recentActivities = recentTramites.map(tramite => {
      const isExpired = this.tramitePermisos.get(tramite.id)?.estaVencido || false;

      let userName = 'Usuario Desconocido';
      if (tramite.usuario && tramite.usuario.nombre && tramite.usuario.apellidos) {
        userName = `${tramite.usuario.nombre} ${tramite.usuario.apellidos}`;
      } else if (tramite.trabajadorAsignado && tramite.trabajadorAsignado.nombre) {
        userName = `${tramite.trabajadorAsignado.nombre} ${tramite.trabajadorAsignado.apellidos || ''}`.trim();
      }

    
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

        this.stats.pendingTramites = (response.pendientesRevision || 0) + (response.enProceso || 0);
        this.stats.completedTramites = response.finalizadosHoy || 0;
      },
      error: (error) => {
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
        this.loadingActivities = false;
 
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

    if (diffMs < 0) return 'Ahora mismo'; 
    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
   
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