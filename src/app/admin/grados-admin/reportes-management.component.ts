import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteGradoService } from '../../services/reporte-grado.service';
import { WebSocketService } from '../../services/websocket.service';
import { ToastService } from '../../services/toast.service';
import {
  ReporteGrado,
  UpdateReporteRequest
} from '../../shared/interfaces/reporte-grado.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-reportes-management',
    imports: [CommonModule, FormsModule],
    templateUrl: './reportes-management.component.html',
    styleUrls: ['./reportes-management.component.css']
})
export class ReportesManagementComponent implements OnInit, OnDestroy {

  reportes: ReporteGrado[] = [];
  reportesFiltrados: ReporteGrado[] = [];

  // Pagination
  currentPage = 0;
  pageSize = 15;
  totalPages = 0;
  totalElements = 0;


  filtroEstado: string = 'TODOS';
  filtroBusqueda: string = '';
  sortBy: string = 'fechaCreacion';
  sortDirection: string = 'DESC';


  loading = false;
  loadingAction = false;

  showModal = false;
  reporteSeleccionado: ReporteGrado | null = null;
  nuevoEstado: 'PENDIENTE' | 'EN_REVISION' | 'RESUELTO' | 'RECHAZADO' = 'PENDIENTE';
  comentarioAdmin: string = '';

  showDeleteModal = false;
  reporteAEliminar: ReporteGrado | null = null;

  private wsSubscription?: Subscription;

  constructor(
    private reporteService: ReporteGradoService,
    private wsService: WebSocketService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params['estado']) {
        this.filtroEstado = params['estado'];
      }
      this.cargarReportes();
    });

    this.suscribirseAActualizaciones();
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  cargarReportes() {
    this.loading = true;

    if (this.filtroEstado !== 'TODOS') {
      this.reporteService.listarPorEstadoPaginado(
        this.filtroEstado,
        this.currentPage,
        this.pageSize
      ).subscribe({
        next: (response) => {
          this.procesarRespuesta(response);
        },
        error: (error) => {
          console.error('Error cargando reportes:', error);
          this.loading = false;
          this.toastService.show({
            title: 'Error',
            message: 'No se pudieron cargar los reportes',
            type: 'error'
          });
        }
      });
    } else {
      this.reporteService.listarPaginado(
        this.currentPage,
        this.pageSize,
        this.sortBy,
        this.sortDirection
      ).subscribe({
        next: (response) => {
          this.procesarRespuesta(response);
        },
        error: (error) => {
          console.error('Error cargando reportes:', error);
          this.loading = false;
          this.toastService.show({
            title: 'Error',
            message: 'No se pudieron cargar los reportes',
            type: 'error'
          });
        }
      });
    }
  }

  procesarRespuesta(response: any) {
    this.reportes = response.content || [];
    this.totalPages = response.totalPages || 0;
    this.totalElements = response.totalElements || 0;
    this.aplicarFiltros();
    this.loading = false;
  }

  aplicarFiltros() {
    this.reportesFiltrados = this.reportes.filter(reporte => {
      const matchBusqueda = !this.filtroBusqueda ||
        reporte.tipoError.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        reporte.descripcion.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        reporte.alumnoNombre?.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        reporte.codigoDiploma?.toLowerCase().includes(this.filtroBusqueda.toLowerCase());

      return matchBusqueda;
    });
  }

  onFiltroEstadoChange() {
    this.currentPage = 0;
    this.cargarReportes();
  }

  onBusquedaChange() {
    this.aplicarFiltros();
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.cargarReportes();
    }
  }

  changeSort(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = column;
      this.sortDirection = 'DESC';
    }
    this.currentPage = 0;
    this.cargarReportes();
  }

  abrirModalActualizar(reporte: ReporteGrado) {
    this.reporteSeleccionado = reporte;
    this.nuevoEstado = reporte.estado;
    this.comentarioAdmin = reporte.comentarioAdmin || '';
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.reporteSeleccionado = null;
    this.comentarioAdmin = '';
  }

  actualizarReporte() {
    if (!this.reporteSeleccionado || !this.reporteSeleccionado.id) return;

    this.loadingAction = true;

    const request: UpdateReporteRequest = {
      estado: this.nuevoEstado,
      comentarioAdmin: this.comentarioAdmin || undefined
    };

    this.reporteService.actualizarEstado(this.reporteSeleccionado.id, request).subscribe({
      next: (response) => {
        this.toastService.show({
          title: 'Actualizado',
          message: 'Reporte actualizado exitosamente',
          type: 'success'
        });
        this.loadingAction = false;
        this.cerrarModal();
        this.cargarReportes();
      },
      error: (error) => {
        console.error('Error actualizando reporte:', error);
        this.toastService.show({
          title: 'Error',
          message: 'No se pudo actualizar el reporte',
          type: 'error'
        });
        this.loadingAction = false;
      }
    });
  }

  eliminarReporte(reporte: ReporteGrado) {
    if (!reporte.id) return;
    this.reporteAEliminar = reporte;
    this.showDeleteModal = true;
  }

  cerrarModalEliminar() {
    this.showDeleteModal = false;
    this.reporteAEliminar = null;
  }

  confirmarEliminar() {
    if (!this.reporteAEliminar || !this.reporteAEliminar.id) return;

    this.loadingAction = true;

    this.reporteService.eliminar(this.reporteAEliminar.id).subscribe({
      next: () => {
        this.toastService.show({
          title: 'Eliminado',
          message: 'Reporte eliminado exitosamente',
          type: 'success'
        });
        this.loadingAction = false;
        this.cerrarModalEliminar();
        this.cargarReportes();
      },
      error: (error) => {
        console.error('Error eliminando reporte:', error);
        this.toastService.show({
          title: 'Error',
          message: 'No se pudo eliminar el reporte',
          type: 'error'
        });
        this.loadingAction = false;
      }
    });
  }

  suscribirseAActualizaciones() {
    this.wsSubscription = this.wsService.connected$.subscribe(connected => {
      if (connected) {
        this.wsService.suscribirse('/topic/reportes', (data: any) => {
          if (data.tipo === 'NUEVO_REPORTE' || data.tipo === 'REPORTE_ACTUALIZADO') {
            this.cargarReportes();
          }
        });
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'badge-pendiente';
      case 'EN_REVISION':
        return 'badge-revision';
      case 'RESUELTO':
        return 'badge-resuelto';
      case 'RECHAZADO':
        return 'badge-rechazado';
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

  formatDate(dateStr?: Date): string {
    if (!dateStr) return 'N/A';

    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  get paginaInicio(): number {
    return this.currentPage * this.pageSize + 1;
  }

  get paginaFin(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalElements);
  }

  trackByReporte(_: number, reporte: ReporteGrado): any {
    return reporte.id;
  }
}