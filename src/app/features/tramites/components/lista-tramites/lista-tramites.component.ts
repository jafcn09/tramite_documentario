import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TramiteService } from '../../../../services/tramite.service';
import { ToastService } from '../../../../services/toast.service';
import { BandejaTramitesService } from '../../../../services/bandeja-tramites.service';
import { firstValueFrom } from 'rxjs';
import { NuevoTramiteModalComponent } from '../nuevo-tramite-modal/nuevo-tramite-modal.component';
import { DetalleTramiteModalComponent } from '../detalle-tramite-modal/detalle-tramite-modal.component';
import { EstadisticasTramites } from '../../../../shared/interfaces/estadistca_interface';



@Component({
  selector: 'app-lista-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NuevoTramiteModalComponent, DetalleTramiteModalComponent],
  templateUrl: './lista-tramites.component.html',
  styleUrl: './lista-tramites.component.css'
})

export class ListaTramitesComponent implements OnInit, OnDestroy {
  tramites: any[] = [];
  estadisticas: EstadisticasTramites = {
    total: 0,
    enRevision: 0,
    aprobados: 0,
    finalizados: 0
  };
  loading$ = this.tramiteService.loading$;

  tramitePermisos: Map<number, {
    puedeAprobar: boolean;
    puedeRechazar: boolean;
    puedeDerivar: boolean;
    puedeResponder: boolean;
    estaVencido: boolean;
  }> = new Map();
  

  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  

  searchTerm = '';
  private searchSubject = new Subject<string>();
  searchResults: any[] = [];
  showSearchDropdown = false;
  searchError = '';
  isSearching = false;
  selectedSearchIndex = -1;
  filteredTramites: any[] = [];


  vistaActual: 'tabla' | 'tarjetas' = 'tabla';
  ordenarPor: 'fecha' | 'codigo' | 'estado' | 'prioridad' = 'fecha';
  ordenAscendente = false;


  selectedTramites: number[] = [];
  mostrarArchivados = false;
  

  showNuevoTramiteModal = false;
  showDetalleTramiteModal = false;
  showEditarTramiteModal = false;
  showCambiarEstadoModal = false;
  tramiteSeleccionado: any = null;
  

  estadosDisponibles: string[] = [];
  nuevoEstadoSeleccionado = '';
  observacionesCambioEstado = '';
  procesandoCambioEstado = false;
  
  private subscriptions = new Subscription();

 
  Object = Object;
  Math = Math;

  constructor(
    private tramiteService: TramiteService,
    private toastService: ToastService,
    private bandejaTramitesService: BandejaTramitesService
  ) {}

  ngOnInit() {

    this.searchTerm = '';
    this.searchError = '';
    this.filteredTramites = [];

    this.setupSearch();
    this.cargarTramites();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setupSearch() {
    this.subscriptions.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(term => {
        this.performSearch(term);
      })
    );
  }

  private performSearch(term: string) {
    this.isSearching = true;
    this.searchError = '';
    this.selectedSearchIndex = -1;

    if (!term.trim()) {
      this.resetSearch();
      return;
    }


    const termLower = term.toLowerCase().trim();
    this.searchResults = this.tramites.filter(tramite =>
      this.matchesSearchTerm(tramite, termLower)
    );

    if (this.searchResults.length > 0) {
      this.showSearchDropdown = false; 
      this.filteredTramites = this.searchResults;
      this.searchError = '';

    } else {
      this.searchError = `No se encontraron trámites que coincidan con "${term}"`;
      this.showSearchDropdown = false;
      this.filteredTramites = [];

    }

    this.isSearching = false;
  }

  private matchesSearchTerm(tramite: any, searchLower: string): boolean {
    const normalize = (text: any): string => {
      if (!text) return '';
      return String(text).toLowerCase().trim();
    };

    return (
      normalize(tramite.codigo).includes(searchLower) ||
      normalize(tramite.asunto).includes(searchLower) ||
      normalize(tramite.titulo).includes(searchLower) ||
      normalize(tramite.descripcion).includes(searchLower) ||
      normalize(tramite.tipo).includes(searchLower) ||
      normalize(tramite.estado).includes(searchLower) ||
      normalize(tramite.prioridad).includes(searchLower) ||
   
      normalize(tramite.usuarioSolicitante?.nombre).includes(searchLower) ||
      normalize(tramite.usuarioSolicitante?.apellidos).includes(searchLower) ||
      normalize(tramite.solicitante?.nombre).includes(searchLower) ||
      normalize(tramite.solicitante?.apellidos).includes(searchLower) ||
     
      normalize(tramite.tipoTramite?.nombre).includes(searchLower) ||
 
      normalize(tramite.estado?.nombre).includes(searchLower) ||
 
      normalize(tramite.areaOrigen?.nombre).includes(searchLower) ||
      normalize(tramite.area?.nombre).includes(searchLower)
    );
  }

  private resetSearch() {
    this.showSearchDropdown = false;
    this.searchResults = [];
    this.searchError = '';
    this.isSearching = false;
    this.filteredTramites = [];

  }

  cargarTramites() {
    const estadoFiltro = this.mostrarArchivados ? 'ARCHIVADO' : undefined;
    
    this.subscriptions.add(
      this.bandejaTramitesService.obtenerTramitesBandeja(
        this.currentPage + 1, 
        this.pageSize, 
        this.ordenarPor, 
        this.ordenAscendente,
        estadoFiltro
      ).subscribe({
        next: (response) => {

          this.tramites = response.data;
          this.totalItems = response.total;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage - 1; 
          if (!this.mostrarArchivados) {
            this.calcularEstadisticas();
          }
        },
        error: (error) => {
        }
      })
    );
  }

  private calcularEstadisticas() {

    this.loadTramitesAndPermissions();
  }

  private loadTramitesAndPermissions() {

    
    this.subscriptions.add(
      this.bandejaTramitesService.getTramites(1, 1000).subscribe({
        next: (response) => {
          this.tramites = response.data || [];


          this.loadPermissionsForTramites();
        },
        error: (error) => {

          this.calcularEstadisticasBasicas();
        }
      })
    );
  }

  private loadPermissionsForTramites() {
    const tramitePromises = this.tramites.map(tramite =>
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
    });
  }

  private calculateStatsWithExpiredTramites() {

    const expiredCount = this.getTramitesVencidos();


    const baseStats = this.getBaseStatistics();

  
    this.estadisticas = {
      total: this.tramites.length,
      enRevision: baseStats.enRevision,
      aprobados: baseStats.aprobados,
      finalizados: baseStats.finalizados + expiredCount
    };

  }

  getTramitesVencidos(): number {
    return this.tramites.filter(tramite => {
      const permisos = this.tramitePermisos.get(tramite.id);
      return permisos?.estaVencido || false;
    }).length;
  }

  private getBaseStatistics() {
    const stats = {
      enRevision: 0,
      aprobados: 0,
      finalizados: 0
    };

    this.tramites.forEach(tramite => {
      const estado = tramite.estado?.nombre || '';

      if (['En Revisión', 'Enviado'].includes(estado)) {
        stats.enRevision++;
      } else if (['Aprobado'].includes(estado)) {
        stats.aprobados++;
      } else if (['Finalizado'].includes(estado)) {
        stats.finalizados++;
      }
    });

    return stats;
  }

  private calcularEstadisticasBasicas() {

    this.subscriptions.add(
      this.bandejaTramitesService.getEstadisticas().subscribe({
        next: (estadisticasBandeja) => {
          this.estadisticas = {
            total: estadisticasBandeja.totalAsignados,
            enRevision: estadisticasBandeja.pendientesRevision,
            aprobados: estadisticasBandeja.enProceso,
            finalizados: estadisticasBandeja.finalizadosHoy
          };
        },
        error: () => {
          
          this.estadisticas = {
            total: this.tramites?.length || 0,
            enRevision: this.tramites?.filter(t =>
              t.estado && (t.estado.nombre === 'En Revisión' || t.estado.nombre === 'Enviado')
            ).length || 0,
            aprobados: this.tramites?.filter(t => t.estado && t.estado.nombre === 'Aprobado').length || 0,
            finalizados: this.tramites?.filter(t => t.estado && t.estado.nombre === 'Finalizado').length || 0
          };
        }
      })
    );
  }

  onSearch(term: string) {

    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  onSearchInputFocus() {
    if (this.searchTerm.trim() && this.searchResults.length > 0) {
      this.showSearchDropdown = true;
    }
  }

  onSearchInputBlur() {
    setTimeout(() => {
      this.showSearchDropdown = false;
    }, 200);
  }

  onSearchKeyDown(event: KeyboardEvent) {
    if (!this.showSearchDropdown || this.searchResults.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedSearchIndex = Math.min(this.selectedSearchIndex + 1, this.searchResults.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedSearchIndex = Math.max(this.selectedSearchIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedSearchIndex >= 0) {
          this.selectSearchResult(this.searchResults[this.selectedSearchIndex]);
        }
        break;
      case 'Escape':
        this.showSearchDropdown = false;
        this.selectedSearchIndex = -1;
        break;
    }
  }

  selectSearchResult(tramite: any) {
    this.searchTerm = tramite.codigo || '';
    this.showSearchDropdown = false;
    this.filteredTramites = [tramite];
    this.searchError = '';
    
    setTimeout(() => {
      const element = document.getElementById(`tramite-${tramite.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-result');
        setTimeout(() => element.classList.remove('highlight-result'), 2000);
      }
    }, 100);
  }

  clearSearch() {
    this.searchTerm = '';
    this.resetSearch();
  }

  getTramitesParaMostrar(): any[] {

    if (this.searchTerm && this.searchTerm.trim().length > 0) {
      return this.filteredTramites;
    }

    return this.tramites;
  }

  exportarSeleccionados() {
    if (this.selectedTramites.length === 0) {
      this.toastService.warning('Sin selección', 'Debe seleccionar al menos un trámite para exportar');
      return;
    }

    this.subscriptions.add(
      this.bandejaTramitesService.exportarTramites(this.selectedTramites).subscribe({
        next: (blob) => {
          const fecha = new Date().toISOString().split('T')[0];
          this.descargarArchivo(blob, `tramites_${fecha}.pdf`);
          this.toastService.success(
            'Trámites exportados', 
            `Se han exportado ${this.selectedTramites.length} trámites correctamente`
          );
          this.selectedTramites = [];
        },
        error: (error) => {
          this.toastService.error('Error al exportar', 'No se pudieron exportar los trámites');
        }
      })
    );
  }

  archivarSeleccionados() {
    if (this.selectedTramites.length === 0) {
      this.toastService.warning('Sin selección', 'Debe seleccionar al menos un trámite para archivar');
      return;
    }

    this.subscriptions.add(
      this.bandejaTramitesService.archivarTramites(this.selectedTramites).subscribe({
        next: (response) => {
          this.toastService.success(
            'Trámites archivados', 
            `Se han archivado ${this.selectedTramites.length} trámites correctamente`
          );
          this.selectedTramites = [];
          this.cargarTramites(); // Recargar la lista
        },
        error: (error) => {
          this.toastService.error('Error al archivar', 'No se pudieron archivar los trámites');
        }
      })
    );
  }

  desarchivarSeleccionados() {
    if (this.selectedTramites.length === 0) {
      this.toastService.warning('Sin selección', 'Debe seleccionar al menos un trámite para desarchivar');
      return;
    }

    this.subscriptions.add(
      this.bandejaTramitesService.desarchivarTramites(this.selectedTramites).subscribe({
        next: (response) => {
          this.toastService.success(
            'Trámites desarchivados', 
            `Se han desarchivado ${this.selectedTramites.length} trámites correctamente`
          );
          this.selectedTramites = [];
          this.cargarTramites(); 
        },
        error: (error) => {
          this.toastService.error('Error al desarchivar', 'No se pudieron desarchivar los trámites');
        }
      })
    );
  }

  desarchivarTodos() {
    if (this.tramites.length === 0) {
      this.toastService.warning('Sin trámites', 'No hay trámites archivados para desarchivar');
      return;
    }

    const todosIds = this.tramites.map(t => t.id!);
    
    this.subscriptions.add(
      this.bandejaTramitesService.desarchivarTramites(todosIds).subscribe({
        next: (response) => {
          this.toastService.success(
            'Todos los trámites desarchivados', 
            `Se han desarchivado todos los ${todosIds.length} trámites archivados`
          );
          this.selectedTramites = [];
          this.cargarTramites();
        },
        error: (error) => {
          this.toastService.error('Error al desarchivar', 'No se pudieron desarchivar todos los trámites');
        }
      })
    );
  }

  toggleVistaArchivados() {
    this.mostrarArchivados = !this.mostrarArchivados;
    this.selectedTramites = [];
    this.currentPage = 0;
    this.cargarTramites();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  cambiarPagina(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.cargarTramites();
    }
  }

  cambiarTamanioPagina(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.cargarTramites();
  }

  toggleOrden(campo: 'fecha' | 'codigo' | 'estado' | 'prioridad') {
    if (this.ordenarPor === campo) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenarPor = campo;
      this.ordenAscendente = true;
    }
    this.cargarTramites();
  }

  toggleVista() {
    this.vistaActual = this.vistaActual === 'tabla' ? 'tarjetas' : 'tabla';
  }


  toggleSelectTramite(tramiteId: number) {
    const index = this.selectedTramites.indexOf(tramiteId);
    if (index > -1) {
      this.selectedTramites.splice(index, 1);
    } else {
      this.selectedTramites.push(tramiteId);
    }
  }

  selectAllTramites() {
    if (this.selectedTramites.length === this.tramites.length) {
      this.selectedTramites = [];
    } else {
      this.selectedTramites = this.tramites.map(t => t.id!);
    }
  }

  isSelected(tramiteId: number): boolean {
    return this.selectedTramites.includes(tramiteId);
  }


  abrirModalNuevo() {
    this.showNuevoTramiteModal = true;
  }

  cerrarModalNuevo() {
    this.showNuevoTramiteModal = false;
  }

  verDetalle(tramite: any) {
    this.tramiteSeleccionado = tramite;
    this.showDetalleTramiteModal = true;
  }

  cerrarModalDetalle() {
    this.showDetalleTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  puedeEditarTramite(tramite: any): boolean {
    const estadosEditables = ['BORRADOR', 'ENVIADO', 'EN_REVISION', 'OBSERVADO'];
    const estadoNombre = tramite.estado?.nombre || tramite.estado;
    return estadosEditables.includes(estadoNombre);
  }

  editarTramite(tramite: any) {

    if (!this.puedeEditarTramite(tramite)) {
      this.toastService.warning(
        'Acción no permitida',
        'Este trámite no se puede editar en su estado actual.'
      );
      return;
    }
    this.tramiteSeleccionado = tramite;
    this.showEditarTramiteModal = true;
  }

  cerrarModalEditar() {
    this.showEditarTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  onTramiteCreado(nuevoTramite: any) {
    this.cargarTramites();
    this.cerrarModalNuevo();
  }

  onTramiteActualizado(tramiteActualizado: any) {
    this.cargarTramites();
    this.cerrarModalEditar();
  }

  cambiarEstado(tramite: any) {
    this.tramiteSeleccionado = tramite;
    this.obtenerEstadosDisponibles(tramite.estado);
    this.nuevoEstadoSeleccionado = '';
    this.observacionesCambioEstado = '';
    this.showCambiarEstadoModal = true;
  }

  obtenerEstadosDisponibles(estadoActual: any) {
    const estadoKey = (estadoActual?.nombre || estadoActual || '').toUpperCase();

    const transicionesEstado: { [key: string]: string[] } = {
      'BORRADOR': ['ENVIADO', 'CANCELADO'],
      'ENVIADO': ['EN_REVISION', 'DERIVADO', 'CANCELADO'],
      'EN_REVISION': ['OBSERVADO', 'EN_PROCESO', 'RECHAZADO'],
      'DERIVADO': ['EN_REVISION', 'EN_PROCESO'],
      'OBSERVADO': ['EN_REVISION', 'CANCELADO'],
      'EN_PROCESO': ['APROBADO', 'RECHAZADO', 'FINALIZADO'],
      'APROBADO': ['FINALIZADO'],
      'RECHAZADO': ['ARCHIVADO'],
      'FINALIZADO': ['ARCHIVADO'],
      'ARCHIVADO': [],
      'CANCELADO': []
    };

    this.estadosDisponibles = transicionesEstado[estadoKey] || [];
  }

  confirmarCambioEstado() {
    if (!this.nuevoEstadoSeleccionado || !this.tramiteSeleccionado) {
      this.toastService.warning('Selección requerida', 'Debe seleccionar un nuevo estado.');
      return;
    }

    this.procesandoCambioEstado = true;

    this.tramiteService.cambiarEstado(
      this.tramiteSeleccionado.id,
      this.nuevoEstadoSeleccionado,
      this.observacionesCambioEstado || undefined
    ).subscribe({
      next: () => {
        this.procesandoCambioEstado = false;
        this.cerrarModalCambiarEstado();
        this.toastService.success('Estado cambiado', 'El estado del trámite ha sido actualizado correctamente.');
        this.cargarTramites();
      },
      error: (error) => {
        this.procesandoCambioEstado = false;
        this.toastService.error('Error', 'No se pudo cambiar el estado del trámite.');
      }
    });
  }

  seleccionarEstado(estado: string) {
   
    if (this.nuevoEstadoSeleccionado === estado) {
      this.nuevoEstadoSeleccionado = '';
    } else {
      this.nuevoEstadoSeleccionado = estado;
    }
  }

  cerrarModalCambiarEstado() {
    this.showCambiarEstadoModal = false;
    this.tramiteSeleccionado = null;
    this.nuevoEstadoSeleccionado = '';
    this.observacionesCambioEstado = '';
    this.estadosDisponibles = [];
  }

  getEstadoNombre(estadoEnum: string | undefined): string {
    if (!estadoEnum) return 'Sin estado';

    const estadosMap: { [key: string]: string } = {
      'BORRADOR': 'Borrador',
      'ENVIADO': 'Enviado',
      'EN_REVISION': 'En Revisión',
      'DERIVADO': 'Derivado',
      'OBSERVADO': 'Observado',
      'EN_PROCESO': 'En Proceso',
      'APROBADO': 'Aprobado',
      'RECHAZADO': 'Rechazado',
      'FINALIZADO': 'Finalizado',
      'ARCHIVADO': 'Archivado',
      'CANCELADO': 'Cancelado',
    };
    return estadosMap[estadoEnum] || estadoEnum;
  }

  getEstadoIcon(estado: string): string {
    const iconosEstado: { [key: string]: string } = {
      'BORRADOR': 'fas fa-edit',
      'ENVIADO': 'fas fa-paper-plane',
      'EN_REVISION': 'fas fa-search',
      'DERIVADO': 'fas fa-share',
      'OBSERVADO': 'fas fa-exclamation-triangle',
      'EN_PROCESO': 'fas fa-cogs',
      'APROBADO': 'fas fa-check-circle',
      'RECHAZADO': 'fas fa-times-circle',
      'FINALIZADO': 'fas fa-flag-checkered',
      'ARCHIVADO': 'fas fa-archive',
      'CANCELADO': 'fas fa-ban'
    };
    return iconosEstado[estado] || 'fas fa-file';
  }

  getEstadoDescripcion(estado: string): string {
    const descripcionesEstado: { [key: string]: string } = {
      'BORRADOR': 'Documento en edición',
      'ENVIADO': 'Enviado para revisión',
      'EN_REVISION': 'En proceso de revisión',
      'DERIVADO': 'Derivado a otra área',
      'OBSERVADO': 'Con observaciones',
      'EN_PROCESO': 'En proceso de atención',
      'APROBADO': 'Aprobado por el área',
      'RECHAZADO': 'Rechazado por el área',
      'FINALIZADO': 'Proceso completado',
      'ARCHIVADO': 'Archivado',
      'CANCELADO': 'Proceso cancelado'
    };
    return descripcionesEstado[estado] || 'Estado del trámite';
  }

  imprimirTramite(tramite: any) {
    this.tramiteService.imprimirTramite(tramite.id!)
      .subscribe({
        next: (blob) => {

          blob.text().then(html => {
     
            const printWindow = window.open('', '_blank', 'width=800,height=600');

            if (printWindow) {
              printWindow.document.write(html);
              printWindow.document.close();

              printWindow.onload = () => {
                setTimeout(() => {
                  printWindow.print();
                 
                }, 500);
              };
            } else {
    
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `tramite-${tramite.codigo}.html`;
              link.click();
              window.URL.revokeObjectURL(url);

              this.toastService.info(
                'Documento generado',
                'Abra el archivo descargado para imprimir'
              );
            }
          });
        },
        error: () => {
          this.toastService.error(
            'Error',
            'No se pudo generar el documento para impresión'
          );
        }
      });
  }

  eliminarTramite(tramite: any) {

    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.2s ease;
      ">
        <div style="
          background: white;
          border-radius: 12px;
          padding: 24px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        ">
          <div style="
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            color: #dc3545;
          ">
            <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-right: 12px;"></i>
            <h3 style="margin: 0; color: #2c3e50; font-size: 20px;">Confirmar Eliminación</h3>
          </div>
          <p style="color: #495057; margin: 16px 0;">
            ¿Está seguro de eliminar el trámite <strong>${tramite.codigo}</strong>?
          </p>
          <div style="
            background: #f8f9fa;
            border-left: 4px solid #dc3545;
            padding: 12px;
            margin: 16px 0;
            border-radius: 4px;
          ">
            <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 14px;">
              <strong>Asunto:</strong> ${tramite.asunto}
            </p>
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Estado:</strong> ${tramite.estado?.nombre || tramite.estado}
            </p>
          </div>
          <p style="color: #dc3545; font-size: 14px; margin: 16px 0;">
            <i class="fas fa-info-circle"></i>
            Esta acción no se puede deshacer.
          </p>
          <div style="
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 24px;
          ">
            <button id="cancelBtn" style="
              padding: 10px 20px;
              border: 1px solid #dee2e6;
              background: white;
              color: #6c757d;
              border-radius: 6px;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s;
            ">Cancelar</button>
            <button id="deleteBtn" style="
              padding: 10px 20px;
              border: none;
              background: linear-gradient(135deg, #dc3545, #c82333);
              color: white;
              border-radius: 6px;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s;
              box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
            ">
              <i class="fas fa-trash"></i>
              Eliminar Trámite
            </button>
          </div>
        </div>
      </div>
    `;

 
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modalDiv);


    const cancelBtn = modalDiv.querySelector('#cancelBtn') as HTMLButtonElement;
    const deleteBtn = modalDiv.querySelector('#deleteBtn') as HTMLButtonElement;

    const closeModal = () => {
      modalDiv.remove();
      style.remove();
    };

    cancelBtn?.addEventListener('click', closeModal);
    
    deleteBtn?.addEventListener('click', () => {
      closeModal();
      
   
      this.tramiteService.eliminarTramite(tramite.id!)
        .subscribe({
          next: () => {
            this.toastService.success(
              'Trámite eliminado',
              `El trámite ${tramite.codigo} ha sido eliminado correctamente.`
            );
            this.cargarTramites();
            
          
            const index = this.selectedTramites.indexOf(tramite.id!);
            if (index > -1) {
              this.selectedTramites.splice(index, 1);
            }
          },
          error: (error: any) => {
            this.toastService.error(
              'Error al eliminar',
              'No se pudo eliminar el trámite. Intente nuevamente.'
            );
          }
        });
    });
  }

  getEstadoClase(estado: any): string {
    const clases: { [key: string]: string } = {
      'Borrador': 'estado-borrador',
      'Enviado': 'estado-enviado',
      'En Revisión': 'estado-revision',
      'Derivado': 'estado-derivado',
      'Observado': 'estado-observado',
      'Aprobado': 'estado-aprobado',
      'Rechazado': 'estado-rechazado',
      'Finalizado': 'estado-finalizado',
      'Archivado': 'estado-archivado'
    };
    const nombreEstado = estado?.nombre || estado;
    return clases[nombreEstado] || 'estado-default';
  }

  getPrioridadNombre(prioridadEnum: string): string {
    const prioridadesMap: { [key: string]: string } = {
      'BAJA': 'Baja',
      'NORMAL': 'Normal',
      'ALTA': 'Alta',
      'URGENTE': 'Urgente'
    };
    return prioridadesMap[prioridadEnum] || prioridadEnum;
  }

  getPrioridadClase(prioridad: any): string {
    const clases: { [key: string]: string } = {
      'Baja': 'prioridad-baja',
      'Normal': 'prioridad-normal',
      'Alta': 'prioridad-alta',
      'Urgente': 'prioridad-urgente'
    };
    const nombrePrioridad = prioridad?.nombre || prioridad;
    return clases[nombrePrioridad] || 'prioridad-normal';
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getDiasVencimiento(fechaVencimiento?: Date): number | null {
    if (!fechaVencimiento) return null;
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }


  private descargarArchivo(blob: Blob, nombreArchivo: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  trackByTramiteId(index: number, tramite: any): number {
    return tramite.id || index;
  }
}