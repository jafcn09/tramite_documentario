import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MisTramitesService } from '../../services/mis-tramites.service';
import { User } from '../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-usuario-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
        const estadosCount = {
          enRevision: 0,
          enProceso: 0,
          completados: 0,
          total: tramites.length
        };

        const now = new Date();

        tramites.forEach((t: any) => {
          const estado = t.estado?.nombre || '';

          const estaVencido = t.estaVencido !== undefined ? t.estaVencido :
                              (t.fechaVencimiento ? new Date(t.fechaVencimiento) < now : false);

          if (estaVencido) {
            estadosCount.completados++;
          }

          else if (['En Revisión', 'Enviado'].includes(estado)) {
            estadosCount.enRevision++;
          }
          else if (['En Proceso', 'Aprobado', 'Derivado'].includes(estado)) {
            estadosCount.enProceso++;
          }

          else if (['Finalizado', 'Archivado', 'Cancelado', 'Rechazado'].includes(estado)) {
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
      error: () => {
      }
    });
  }

  loadRecentActivities() {
    this.loadingActivities = true;

    this.misTramitesService.getMisTramites(1, 10).subscribe({
      next: (response) => {
        const tramites = response.data || [];

        this.recentActivities = tramites.slice(0, 5).map((tramite: any) => {
          let icon = 'fas fa-file-alt';
          let type = 'tramite';
          let status = 'pending';

          const estaVencido = tramite.estaVencido || false;

          if (estaVencido) {
            icon = 'fas fa-check-circle';
            status = 'completed';
          } else {

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
      error: () => {
        this.loadingActivities = false;
      }
    });
  }

  loadMyRecentTramites() {
    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        const tramites = response.data || [];

        this.myRecentTramites = tramites.map((tramite: any) => {

          const estaVencido = tramite.estaVencido || false;

          return {
            id: tramite.id,
            codigo: tramite.codigo,
            titulo: tramite.asunto || `${tramite.tipoTramite?.nombre}`,

            estado: estaVencido ? 'Finalizado' : (tramite.estado?.nombre || 'Sin estado'),
            fecha: this.formatDate(tramite.fechaCreacion),
            tipo: tramite.tipoTramite?.nombre || 'Sin tipo',

            progreso: estaVencido ? 100 : tramite.progreso
          };
        });
      },
      error: () => {
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

  getValidatedProgress(tramite: any): number {
    if (!tramite || tramite.progreso === undefined || tramite.progreso === null) return 0;

    const progreso = tramite.progreso;
    if (isNaN(progreso)) {
      return 0;
    }

    return Math.max(0, Math.min(100, progreso));
  }
}
