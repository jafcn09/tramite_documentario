import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReporteGradoService } from '../../services/reporte-grado.service';
import { WebSocketService } from '../../services/websocket.service';
import {
  ReporteGrado,
  ReporteEstadisticas,
  ReportePorTipo
} from '../../shared/interfaces/reporte-grado.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grados-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grados-admin.component.html',
  styleUrls: ['./grados-admin.component.css']
})
export class GradosAdminComponent implements OnInit, OnDestroy {

  estadisticas: ReporteEstadisticas = {
    total: 0,
    pendientes: 0,
    enRevision: 0,
    resueltos: 0,
    rechazados: 0
  };

  reportesPorTipo: ReportePorTipo[] = [];
  reportesRecientes: ReporteGrado[] = [];

  loadingEstadisticas = false;
  loadingReportes = false;
  loadingTipos = false;

  private wsSubscription?: Subscription;

  constructor(
    private reporteService: ReporteGradoService,
    private wsService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEstadisticas();
    this.cargarReportesRecientes();
    this.cargarReportesPorTipo();
    this.suscribirseAActualizaciones();
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  cargarEstadisticas() {
    this.loadingEstadisticas = true;
    this.reporteService.obtenerEstadisticas().subscribe({
      next: (stats) => {
        this.estadisticas = stats;
        this.loadingEstadisticas = false;
      },
      error: (error) => {
        console.error('Error cargando estadísticas:', error);
        this.loadingEstadisticas = false;
      }
    });
  }

  cargarReportesRecientes() {
    this.loadingReportes = true;
    this.reporteService.listarPaginado(0, 5, 'fechaCreacion', 'DESC').subscribe({
      next: (response) => {
        this.reportesRecientes = response.content || [];
        this.loadingReportes = false;
      },
      error: (error) => {
        console.error('Error cargando reportes recientes:', error);
        this.loadingReportes = false;
      }
    });
  }

  cargarReportesPorTipo() {
    this.loadingTipos = true;
    this.reporteService.obtenerReportesPorTipo().subscribe({
      next: (tipos) => {
        this.reportesPorTipo = tipos;
        this.loadingTipos = false;
      },
      error: (error) => {
        console.error('Error cargando reportes por tipo:', error);
        this.loadingTipos = false;
      }
    });
  }

  suscribirseAActualizaciones() {
    this.wsSubscription = this.wsService.connected$.subscribe(connected => {
      if (connected) {
        this.wsService.suscribirse('/topic/reportes', (data: any) => {
          if (data.tipo === 'NUEVO_REPORTE' || data.tipo === 'REPORTE_ACTUALIZADO') {
            this.cargarEstadisticas();
            this.cargarReportesRecientes();
          }
        });
      }
    });
  }

  verReportesPendientes() {
    this.router.navigate(['/admin/grados/reportes'], {
      queryParams: { estado: 'PENDIENTE' }
    });
  }

  verReportesEnRevision() {
    this.router.navigate(['/admin/grados/reportes'], {
      queryParams: { estado: 'EN_REVISION' }
    });
  }

  verTodosReportes() {
    this.router.navigate(['/admin/grados/reportes']);
  }

  gestionarGrados() {
    this.router.navigate(['/admin/grados/listado']);
  }

  verEstadisticas() {
    this.router.navigate(['/admin/grados/estadisticas']);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'estado-pendiente';
      case 'EN_REVISION':
        return 'estado-revision';
      case 'RESUELTO':
        return 'estado-resuelto';
      case 'RECHAZADO':
        return 'estado-rechazado';
      default:
        return '';
    }
  }

  getEstadoLabel(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'Pendiente';
      case 'EN_REVISION':
        return 'En Revisión';
      case 'RESUELTO':
        return 'Resuelto';
      case 'RECHAZADO':
        return 'Rechazado';
      default:
        return estado;
    }
  }

  formatTimeAgo(dateStr?: Date): string {
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

  trackByReporte(_: number, reporte: ReporteGrado): any {
    return reporte.id;
  }

  trackByTipo(_: number, tipo: ReportePorTipo): any {
    return tipo.tipoError;
  }
}