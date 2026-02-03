import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradoService } from '../../services/grado.service';
import { ToastService } from '../../services/toast.service';
import { Grado, GradoRequest } from '../../shared/interfaces/grado.interface';

@Component({
    selector: 'app-grados-crud',
    imports: [CommonModule, FormsModule],
    templateUrl: './grados-crud.component.html',
    styleUrls: ['./grados-crud.component.css']
})
export class GradosCrudComponent implements OnInit {

  grados: Grado[] = [];
  gradosFiltrados: Grado[] = [];

  // Pagination
  currentPage = 0;
  pageSize = 20;
  totalPages = 0;
  totalElements = 0;

  // Filters
  filtroBusqueda: string = '';
  filtroFacultad: string = 'TODAS';
  filtroGradoAcademico: string = 'TODOS';
  sortBy: string = 'id';
  sortDirection: string = 'DESC';

  // Data for filters
  facultades: string[] = [];
  tiposGrado: string[] = [];

  // Loading states
  loading = false;
  loadingAction = false;
  loadingFiltros = false;

  // Modal states
  showModal = false;
  gradoSeleccionado: Grado | null = null;
  gradoForm: GradoRequest = this.getEmptyGradoForm();

  constructor(
    private gradoService: GradoService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.cargarFiltros();
    this.cargarGrados();
  }

  cargarFiltros() {
    this.loadingFiltros = true;
    this.gradoService.listarFacultades().subscribe({
      next: (facultades) => {
        this.facultades = facultades;
      },
      error: (error) => console.error('Error cargando facultades:', error)
    });

    this.gradoService.listarTipos().subscribe({
      next: (tipos) => {
        this.tiposGrado = tipos;
        this.loadingFiltros = false;
      },
      error: (error) => {
        console.error('Error cargando tipos de grado:', error);
        this.loadingFiltros = false;
      }
    });
  }

  cargarGrados() {
    this.loading = true;

    this.gradoService.listarTodosPaginado(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortDirection,
      this.filtroFacultad,
      this.filtroGradoAcademico,
      this.filtroBusqueda
    ).subscribe({
      next: (response) => {
        this.grados = response.content || [];
        this.gradosFiltrados = response.content || [];
        this.totalPages = response.totalPages || 0;
        this.totalElements = response.totalElements || 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando grados:', error);
        this.toastService.show({
          title: 'Error',
          message: 'No se pudieron cargar los grados',
          type: 'error'
        });
        this.loading = false;
      }
    });
  }

  onFiltroChange() {
    this.currentPage = 0;
    this.cargarGrados();
  }

  onBusquedaChange() {
    this.currentPage = 0;
    this.cargarGrados();
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.cargarGrados();
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
    this.cargarGrados();
  }

  abrirModalEditar(grado: Grado) {
    this.gradoSeleccionado = grado;
    this.gradoForm = {
      numeroRegistro: grado.numeroRegistro,
      numeroLibro: grado.numeroLibro,
      alumno: grado.alumno,
      dni: grado.dni,
      facultad: grado.facultad,
      programaAcademico: grado.programaAcademico,
      numeroInscripcion: grado.numeroInscripcion,
      resolucion: grado.resolucion,
      fechaSesionResolucion: grado.fechaSesionResolucion,
      codigoDiploma: grado.codigoDiploma,
      especialidad: grado.especialidad,
      gradoAcademico: grado.gradoAcademico,
      fechaExpedicionGrado: grado.fechaExpedicionGrado,
      fechaExpedicionDiploma: grado.fechaExpedicionDiploma,
      rector: grado.rector,
      coordinadorAcademico: grado.coordinadorAcademico,
      secretarioGeneral: grado.secretarioGeneral,
      condicion: grado.condicion
    };
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.gradoSeleccionado = null;
    this.gradoForm = this.getEmptyGradoForm();
  }

  guardarGrado() {
    if (!this.gradoSeleccionado) return;

    this.loadingAction = true;

    this.gradoService.actualizar(this.gradoSeleccionado.id, this.gradoForm).subscribe({
      next: () => {
        this.toastService.show({
          title: 'Actualizado',
          message: 'Grado actualizado exitosamente',
          type: 'success'
        });
        this.loadingAction = false;
        this.cerrarModal();
        this.cargarGrados();
      },
      error: (error) => {
        console.error('Error actualizando grado:', error);
        this.toastService.show({
          title: 'Error',
          message: 'No se pudo actualizar el grado',
          type: 'error'
        });
        this.loadingAction = false;
      }
    });
  }

  eliminarGrado(grado: Grado) {
    if (!confirm(`¿Está seguro de eliminar el grado de ${grado.alumno}?`)) {
      return;
    }

    this.loadingAction = true;

    this.gradoService.eliminar(grado.id).subscribe({
      next: () => {
        this.toastService.show({
          title: 'Eliminado',
          message: 'Grado eliminado exitosamente',
          type: 'success'
        });
        this.loadingAction = false;
        this.cargarGrados();
      },
      error: (error) => {
        console.error('Error eliminando grado:', error);
        this.toastService.show({
          title: 'Error',
          message: 'No se pudo eliminar el grado',
          type: 'error'
        });
        this.loadingAction = false;
      }
    });
  }

  private getEmptyGradoForm(): GradoRequest {
    return {
      numeroRegistro: '',
      numeroLibro: '',
      alumno: '',
      dni: '',
      facultad: '',
      programaAcademico: '',
      numeroInscripcion: '',
      resolucion: '',
      fechaSesionResolucion: '',
      codigoDiploma: '',
      especialidad: '',
      gradoAcademico: '',
      fechaExpedicionGrado: '',
      fechaExpedicionDiploma: '',
      rector: '',
      coordinadorAcademico: '',
      secretarioGeneral: '',
      condicion: ''
    };
  }

  get paginaInicio(): number {
    return this.currentPage * this.pageSize + 1;
  }

  get paginaFin(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalElements);
  }

  trackByGrado(_: number, grado: Grado): any {
    return grado.id;
  }
}
