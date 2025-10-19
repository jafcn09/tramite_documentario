import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MisTramitesService } from '../../services/mis-tramites.service';
import { BandejaTramitesService } from '../../services/bandeja-tramites.service';
import { TramiteService } from '../../services/tramite.service';
import { ToastService } from '../../services/toast.service';
import { AuthService, AdministrativeUser } from '../../services/auth.service';
import {
  MiTramite,
  EstadisticasMisTramites,
  EditarMiTramiteRequest
} from '../../shared/interfaces/mis-tramites.interface';
import { ResponderTramiteModalComponent } from '../tramites/components/responder-tramite-modal/responder-tramite-modal.component';

@Component({
  selector: 'app-mis-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ResponderTramiteModalComponent],

  templateUrl: './mis-tramites.component.html',
  styleUrl: './mis-tramites.component.css'
})
export class MisTramitesComponent implements OnInit, OnDestroy {
  misTramites: MiTramite[] = [];
  estadisticas: EstadisticasMisTramites | null = null;
  loading$ = this.misTramitesService.loading$;


  tramitePermisos: Map<number, {
    puedeAprobar: boolean;
    puedeRechazar: boolean;
    puedeDerivar: boolean;
    puedeResponder: boolean;
    estaVencido: boolean;
  }> = new Map();
  

  currentPage = 1;
  pageSize = 12;
  totalItems = 0;
  totalPages = 0;
  

  searchTerm = '';
  private searchSubject = new Subject<string>();
  searchResults: MiTramite[] = [];
  showSearchDropdown = false;
  searchError = '';
  isSearching = false;
  selectedSearchIndex = -1;
  filteredTramites: MiTramite[] = [];

  vistaActual: 'tarjetas' | 'lista' = 'tarjetas';
  

  showNuevoTramiteModal = false;
  showDetalleTramiteModal = false;
  showEditarTramiteModal = false;
  showAprobarModal = false;
  showResponderTramiteModal = false;
  tramiteSeleccionado: MiTramite | null = null;
  
  private subscriptions = new Subscription();

  constructor(
    private misTramitesService: MisTramitesService,
    private bandejaTramitesService: BandejaTramitesService,
    private tramiteService: TramiteService,
    private toastService: ToastService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}


  get userRole(): string {
    return this.authService.currentUserValue?.role?.name || '';
  }

  get isAdministrativo(): boolean {
    return this.userRole === 'ADMINISTRATIVO';
  }

  get isUsuario(): boolean {
    return this.userRole === 'USUARIO';
  }

  get shouldShowCreateButton(): boolean {

    return this.authService.hasRole('USUARIO');
  }

  get canProcessTramites(): boolean {
    return this.isAdministrativo;
  }

  get canCreateAdvancedTramites(): boolean {
    return this.isAdministrativo;
  }

  ngOnInit() {
    this.setupSearch();
    this.cargarMisTramites();
    this.cargarEstadisticas();
    
    this.subscriptions.add(
      this.route.queryParams.subscribe(params => {
        const tramiteId = params['tramiteId'];
        const action = params['action'];

        if (tramiteId) {
          const id = parseInt(tramiteId);
          this.buscarYMostrarTramite(id, action);
        }
      })
    );
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

  cargarMisTramites() {

    this.subscriptions.add(
      this.misTramitesService.getMisTramites(this.currentPage, this.pageSize, {})
        .subscribe({
          next: (response) => {

            response.data.forEach(tramite => {
            });

            this.misTramites = response.data;
            this.totalItems = response.total;
            this.totalPages = response.totalPages;

            if (this.isAdministrativo) {
              this.cargarPermisosParaTramites();
            }

            this.applyDynamicFilters();

            if (!this.isAdministrativo) {
              this.calcularEstadisticasLocales();
            }
          },
          error: (error) => {
          }
        })
    );
  }

  cargarEstadisticas() {

    this.subscriptions.add(
      this.misTramitesService.getEstadisticas()
        .subscribe(estadisticas => {
          this.calcularEstadisticasLocales();
        })
    );
  }

  private calcularEstadisticasLocales() {
    if (!this.misTramites || this.misTramites.length === 0 || !this.estadisticas) {
      return;
    }

    let completados = 0;
    let enRevision = 0;
    let aprobado = 0;
    let derivado = 0;
    let observados = 0;
    let borrador = 0;
    let enviado = 0;

    this.misTramites.forEach(tramite => {
      const estado = tramite.estado?.nombre || '';
      const isVencido = this.estaVencido(tramite);

      // Si está vencido, siempre cuenta como completado
      if (isVencido) {
        completados++;
      }

      else if (['Finalizado', 'Archivado', 'Cancelado', 'Dado de Baja'].includes(estado)) {
        completados++;
      } else if (['Observado', 'Rechazado'].includes(estado)) {
        observados++;
      } else if (['En Revisión'].includes(estado)) {
        enRevision++;
      } else if (['Enviado'].includes(estado)) {
        enviado++;
      } else if (['Aprobado'].includes(estado)) {
        aprobado++;
      } else if (['Derivado'].includes(estado)) {
        derivado++;
      } else if (['Borrador'].includes(estado)) {
        borrador++;
      }
    });


    this.estadisticas = {
      ...this.estadisticas,
      finalizado: completados,
      enRevision: enRevision,
      aprobado: aprobado,
      derivado: derivado,
      observado: observados,
      borrador: borrador,
      enviado: enviado
    };

    const tramitesVencidos = this.misTramites.filter(t => this.estaVencido(t));
  }
  cargarPermisosParaTramites() {
    if (!this.isAdministrativo || this.misTramites.length === 0) {
      return;
    }

    let permisosCompletados = 0;
    const totalTramites = this.misTramites.length;

    this.misTramites.forEach(tramite => {
      this.subscriptions.add(
        this.bandejaTramitesService.verificarPermisosAcciones(tramite.id)
          .subscribe({
            next: (permisos) => {

              this.tramitePermisos.set(tramite.id, permisos);
              permisosCompletados++;

              // Recalcular estadísticas cuando se hayan cargado todos los permisos
              if (permisosCompletados === totalTramites) {
                this.calcularEstadisticasLocales();
              }
            },
            error: (error) => {

              permisosCompletados++;

              if (permisosCompletados === totalTramites) {
                this.calcularEstadisticasLocales();
              }
            }
          })
      );
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  private performSearch(term: string) {
    this.isSearching = true;
    this.searchError = '';
    this.selectedSearchIndex = -1;
    
    if (!term.trim()) {
      this.resetSearch();
      this.applyDynamicFilters();
      return;
    }

    this.searchResults = this.misTramites.filter(tramite => 
      this.matchesSearchTerm(tramite, term)
    );

    if (this.searchResults.length > 0) {
      this.showSearchDropdown = true;
    } else {
      this.showSearchDropdown = false;
    }
    
   
    this.applyDynamicFilters();
    
    this.isSearching = false;
  }

  private matchesSearchTerm(tramite: MiTramite, term: string): boolean {
    const searchTerm = term.toLowerCase();
    return !!(
      tramite.codigo?.toLowerCase().includes(searchTerm) ||
      tramite.asunto?.toLowerCase().includes(searchTerm) ||
      tramite.tipoTramite?.nombre?.toLowerCase().includes(searchTerm) ||
      tramite.estado?.nombre?.toLowerCase().includes(searchTerm) ||
      tramite.descripcion?.toLowerCase().includes(searchTerm) ||
      tramite.trabajadorAsignado?.nombre?.toLowerCase().includes(searchTerm) ||
      tramite.trabajadorAsignado?.apellidos?.toLowerCase().includes(searchTerm) ||
      tramite.areaDestino?.nombre?.toLowerCase().includes(searchTerm)
    );
  }

  private resetSearch() {
    this.searchResults = [];
    this.showSearchDropdown = false;
    this.searchError = '';
    this.isSearching = false;
  }

  selectSearchResult(tramite: MiTramite) {
    this.searchTerm = tramite.codigo;
    this.showSearchDropdown = false;
    this.applyDynamicFilters();
  }

  clearSearch() {
    this.searchTerm = '';
    this.resetSearch();
    this.applyDynamicFilters();
  }

  onSearchKeydown(event: KeyboardEvent) {
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
        break;
    }
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showSearchDropdown = false;
    }, 150);
  }

  private applyDynamicFilters() {
    let filtered = [...this.misTramites];

    if (this.searchTerm) {
      filtered = filtered.filter(tramite => this.matchesSearchTerm(tramite, this.searchTerm));
    }

    filtered = this.sortTramitesByPriority(filtered);

    this.filteredTramites = filtered;
  }

 
  private sortTramitesByPriority(tramites: MiTramite[]): MiTramite[] {
    return tramites.sort((a, b) => {
      const priorityA = this.getTramitePriority(a);
      const priorityB = this.getTramitePriority(b);


      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

     
      if (!this.estaVencido(a) && !this.estaVencido(b)) {
        const urgenciaA = a.prioridad?.nivel || 0;
        const urgenciaB = b.prioridad?.nivel || 0;
        if (urgenciaA !== urgenciaB) {
          return urgenciaB - urgenciaA; 
        }
      }

      const fechaA = new Date(a.fechaCreacion).getTime();
      const fechaB = new Date(b.fechaCreacion).getTime();
      return fechaB - fechaA;
    });
  }


  private getTramitePriority(tramite: MiTramite): number {
    const estado = tramite.estado?.nombre || '';
    const isVencido = this.estaVencido(tramite);


    if (!isVencido && tramite.prioridad?.nivel >= 4) {
      if (['En Revisión', 'Enviado'].includes(estado)) return 1;
      if (['Aprobado', 'Derivado'].includes(estado)) return 2;
    }


    if (!isVencido && ['En Revisión', 'Enviado'].includes(estado)) {
      return 3;
    }

 
    if (!isVencido && ['Aprobado', 'Derivado'].includes(estado)) {
      return 4;
    }

    if (!isVencido && ['Observado', 'Rechazado'].includes(estado)) {
      return 5;
    }


    if (!isVencido && ['Borrador'].includes(estado)) {
      return 6;
    }
    if (['Finalizado', 'Archivado'].includes(estado)) {
      return 7;
    }

    if (isVencido || ['Dado de Baja', 'Cancelado'].includes(estado)) {
      return 8;
    }

    // Por defecto
    return 9;
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarMisTramites();
    }
  }

  toggleVista() {
    this.vistaActual = this.vistaActual === 'tarjetas' ? 'lista' : 'tarjetas';
  }

  crearNuevoTramite() {
    const userRole = this.userRole;
    if (userRole === 'ADMIN') {
      window.location.href = '/admin/nuevo-tramite';
    } else if (userRole === 'ADMINISTRATIVO') {
      window.location.href = '/administrativo/nuevo-tramite';
    } else if (userRole === 'USUARIO') {
      window.location.href = '/usuario/nuevo-tramite';
    }
  }

  verDetalle(tramite: MiTramite) {
    this.tramiteSeleccionado = tramite;
    this.showDetalleTramiteModal = true;
  }

  // Verificar si el usuario actual puede editar el trámite
  puedeEditarTramite(tramite: MiTramite): boolean {
    if (this.userRole !== 'USUARIO') {
      return false;
    }

    // No permitir editar si está vencido
    if (this.estaVencido(tramite)) {
      return false;
    }

    // Solo permitir editar si el estado no es FINALIZADO, RECHAZADO o ARCHIVADO
    const estadosNoEditables = ['Finalizado', 'Rechazado', 'Archivado', 'FINALIZADO', 'RECHAZADO', 'ARCHIVADO'];
    return !estadosNoEditables.includes(tramite.estado?.nombre);
  }

  editarTramite(tramite: MiTramite) {
    if (!this.puedeEditarTramite(tramite)) {
      this.toastService.warning(
        'Acción no permitida',
        'Este trámite no se puede editar en su estado actual.'
      );
      return;
    }

    // Precargar datos en el formulario
    this.tramiteSeleccionado = tramite;
    this.formEditar = {
      descripcion: tramite.descripcion,
      observaciones: tramite.observaciones || ''
    };

    // Limpiar arrays de documentos
    this.archivosNuevos = [];
    this.documentosAEliminar = [];

    this.showEditarTramiteModal = true;
  }

  hayCambiosEnFormulario(): boolean {
    if (!this.tramiteSeleccionado) return false;

    const hayCambiosTexto = (
      this.formEditar.descripcion !== this.tramiteSeleccionado.descripcion ||
      this.formEditar.observaciones !== (this.tramiteSeleccionado.observaciones || '')
    );

    const hayCambiosDocumentos = this.archivosNuevos.length > 0 || this.documentosAEliminar.length > 0;

    return hayCambiosTexto || hayCambiosDocumentos;
  }

  guardarEdicion() {
    if (!this.tramiteSeleccionado || !this.hayCambiosEnFormulario()) {
      return;
    }

    // Prevenir múltiples submits
    if (this.guardandoEdicion) {
      return;
    }

    this.guardandoEdicion = true;

    // Construir FormData para enviar archivos y datos
    const formData = new FormData();

    // Agregar campos que cambiaron
    if (this.formEditar.descripcion !== this.tramiteSeleccionado.descripcion) {
      formData.append('descripcion', this.formEditar.descripcion || '');
    }

    if (this.formEditar.observaciones !== (this.tramiteSeleccionado.observaciones || '')) {
      formData.append('observaciones', this.formEditar.observaciones || '');
    }

    // Agregar documentos nuevos
    this.archivosNuevos.forEach((archivo) => {
      formData.append('documentosNuevos', archivo, archivo.name);
    });

    // Agregar IDs de documentos a eliminar
    if (this.documentosAEliminar.length > 0) {
      formData.append('documentosAEliminar', JSON.stringify(this.documentosAEliminar));
    }

    // Llamar al servicio
    this.subscriptions.add(
      this.tramiteService.editarTramiteUsuario(this.tramiteSeleccionado.id, formData)
        .subscribe({
          next: (response) => {
            this.guardandoEdicion = false;
            this.cargarMisTramites();
            this.cargarEstadisticas();
            this.cerrarModalEditar();
          },
          error: (error) => {
            this.guardandoEdicion = false;
          }
        })
    );
  }

  // Métodos para gestión de documentos
  getDocumentosVisibles() {
    if (!this.tramiteSeleccionado?.documentos) {
      return [];
    }
    return this.tramiteSeleccionado.documentos.filter(
      doc => !this.documentosAEliminar.includes(doc.id)
    );
  }

  removerDocumento(documentoId: number) {
    if (!this.documentosAEliminar.includes(documentoId)) {
      this.documentosAEliminar.push(documentoId);
      this.toastService.success('Documento eliminado', 'El documento ha sido eliminado de la lista');
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.procesarArchivos(files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('drag-over');

    const files = event.dataTransfer?.files;
    if (files) {
      this.procesarArchivos(files);
    }
  }

  procesarArchivos(files: FileList) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword',
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'image/jpeg', 'image/png'];

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        this.toastService.error('Archivo muy grande', `${file.name} excede el tamaño máximo de 10MB`);
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        this.toastService.error('Tipo no permitido', `${file.name} no es un tipo de archivo permitido`);
        return;
      }

      this.archivosNuevos.push(file);
      this.toastService.success('Archivo agregado', `${file.name} se agregará al guardar`);
    });
  }

  removerArchivoNuevo(index: number) {
    const archivo = this.archivosNuevos[index];
    this.archivosNuevos.splice(index, 1);
    this.toastService.info('Archivo removido', `${archivo.name} ha sido removido`);
  }

  formatearTamano(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  descargarDocumento(tramiteId: number, nombreArchivo: string) {
    // ESTUDIANTES no pueden descargar documentos
    if (this.userRole === 'ESTUDIANTE') {
      this.toastService.warning(
        'Acción no permitida',
        'Los estudiantes no pueden descargar documentos de trámites'
      );
      return;
    }

    this.subscriptions.add(
      this.misTramitesService.descargarDocumento(tramiteId, nombreArchivo)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = nombreArchivo;
            link.click();
            window.URL.revokeObjectURL(url);
          },
          error: () => {
            this.toastService.error(
              'Error',
              'No se pudo descargar el documento'
            );
          }
        })
    );
  }

  descargarTodosDocumentos(tramite: MiTramite) {
    // ESTUDIANTES no pueden descargar documentos
    if (this.userRole === 'ESTUDIANTE') {
      this.toastService.warning(
        'Acción no permitida',
        'Los estudiantes no pueden descargar documentos de trámites'
      );
      return;
    }

    const cantidadDocumentos = tramite.documentos ? tramite.documentos.length : 0;

    if (cantidadDocumentos === 0) {
      this.toastService.warning(
        'Sin documentos',
        'Este trámite no tiene documentos adjuntos para descargar.'
      );
      return;
    }

    if (cantidadDocumentos === 1) {
      // Un solo documento: descargar como PDF
      this.descargarDocumentoIndividual(tramite.id, tramite.documentos[0]);
    } else {
      // Múltiples documentos: descargar como ZIP
      this.descargarDocumentosComoZip(tramite);
    }
  }

  private descargarDocumentoIndividual(tramiteId: number, documento: any) {
    this.subscriptions.add(
      this.misTramitesService.descargarDocumento(tramiteId, documento.nombre)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = documento.nombre;
            link.click();
            window.URL.revokeObjectURL(url);

            this.toastService.success(
              'Descarga completada',
              `El documento "${documento.nombre}" se ha descargado exitosamente.`
            );
          },
          error: () => {
            this.toastService.error(
              'Error',
              `No se pudo descargar el documento "${documento.nombre}"`
            );
          }
        })
    );
  }

  private descargarDocumentosComoZip(tramite: MiTramite) {
    this.subscriptions.add(
      this.misTramitesService.descargarTodosDocumentos(tramite.id)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `tramite-${tramite.codigo}-documentos.zip`;
            link.click();
            window.URL.revokeObjectURL(url);

            this.toastService.success(
              'Descarga completada',
              `Se han descargado ${tramite.documentos?.length} documentos en formato ZIP.`
            );
          },
          error: () => {
            this.toastService.error(
              'Error',
              'No se pudieron descargar los documentos'
            );
          }
        })
    );
  }

  // Modales
  cerrarModalNuevo() {
    this.showNuevoTramiteModal = false;
  }

  cerrarModalDetalle() {
    this.showDetalleTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalEditar() {
    this.showEditarTramiteModal = false;
    this.tramiteSeleccionado = null;
    this.formEditar = {};
    this.guardandoEdicion = false;
  }

  cerrarModalAprobar() {
    this.showAprobarModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalResponder() {
    this.showResponderTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  onTramiteCreado() {
    this.cargarMisTramites();
    this.cargarEstadisticas();
    this.cerrarModalNuevo();
  }

  onTramiteActualizado(tramiteActualizado?: any) {

    this.toastService.success(
      'Trámite actualizado',
      'El trámite ha sido actualizado exitosamente.'
    );

    this.cargarMisTramites();
    this.cargarEstadisticas();
    this.cerrarModalEditar();
  }

  confirmarAprobacion() {
    if (!this.tramiteSeleccionado) return;

    const request = {
      tramiteId: this.tramiteSeleccionado.id,
      observaciones: 'Trámite aprobado por administrativo'
    };

    this.subscriptions.add(
      this.misTramitesService.aprobarTramite(request)
        .subscribe({
          next: (response) => {
            this.cargarMisTramites();
            this.cargarEstadisticas();
            this.cerrarModalAprobar();
          },
          error: (error) => {
          }
        })
    );
  }

  // Utilidades
  getEstadoClase(estado: string): string {
    const clases: { [key: string]: string } = {
      'Borrador': 'estado-borrador',
      'Enviado': 'estado-enviado',
      'En Revisión': 'estado-revision',
      'Derivado': 'estado-derivado',
      'Observado': 'estado-observado',
      'Aprobado': 'estado-aprobado',
      'Rechazado': 'estado-rechazado',
      'Finalizado': 'estado-finalizado'
    };
    return clases[estado] || 'estado-default';
  }

  getPrioridadClase(nivel: number): string {
    const clases: { [key: number]: string } = {
      1: 'prioridad-baja',
      2: 'prioridad-normal', 
      3: 'prioridad-alta',
      4: 'prioridad-urgente'
    };
    return clases[nivel] || 'prioridad-normal';
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Métodos de procesamiento para administrativos
  aprobarTramite(tramite: MiTramite) {
    if (!this.canProcessTramites) return;
    
    this.tramiteSeleccionado = tramite;
    this.showAprobarModal = true;
  }

  // Verificar si puede aprobar un trámite
  puedeAprobar(tramite: MiTramite): boolean {
  
    if (this.userRole === 'ESTUDIANTE') {
      return false;
    }


    if (!this.isAdministrativo) {
      return false;
    }

    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeAprobar;
    }

    // Fallback: local logic (backward compatibility)
    const estadosParaAprobar = ['En Revisión', 'Derivado', 'EN_REVISION', 'DERIVADO'];
    const puede = this.isAdministrativo && estadosParaAprobar.includes(tramite.estado.nombre);

    return puede;
  }

  // Verificar si puede responder un trámite
  puedeResponder(tramite: MiTramite): boolean {
   
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeResponder;
    }

    const estadosParaResponder = ['Aprobado', 'Derivado', 'APROBADO', 'DERIVADO', 'En Proceso', 'EN_PROCESO'];
    const puede = this.isAdministrativo && estadosParaResponder.includes(tramite.estado.nombre);
    return puede;
  }

  puedeRechazar(tramite: MiTramite): boolean {
    // ESTUDIANTES nunca pueden rechazar
    if (this.userRole === 'ESTUDIANTE') {
      return false;
    }

    // Solo ADMINISTRATIVO y ADMIN pueden rechazar
    if (!this.isAdministrativo) {
      return false;
    }

    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeRechazar;
    }

    // Fallback: local logic (backward compatibility)
    const estadosNoRechazables = ['Finalizado', 'FINALIZADO', 'Rechazado', 'RECHAZADO', 'Archivado', 'ARCHIVADO'];
    const puede = this.isAdministrativo && !estadosNoRechazables.includes(tramite.estado.nombre);

    return puede;
  }

  puedeDerivar(tramite: MiTramite): boolean {
    // ESTUDIANTES nunca pueden derivar
    if (this.userRole === 'ESTUDIANTE') {
      return false;
    }

    // Solo ADMINISTRATIVO y ADMIN pueden derivar
    if (!this.isAdministrativo) {
      return false;
    }

    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
 
      return permisos.puedeDerivar;
    }

    // Fallback local (backward compatibility)
    const estadosParaDerivar = ['En Revisión', 'EN_REVISION', 'En Proceso', 'EN_PROCESO'];
    const estadosNoDerivar = ['Derivado', 'DERIVADO'];
    const puede = this.isAdministrativo &&
                 estadosParaDerivar.includes(tramite.estado.nombre) &&
                 !estadosNoDerivar.includes(tramite.estado.nombre);

    return puede;
  }

  estaVencido(tramite: MiTramite): boolean {
    // Prioridad 1: Usar el campo estaVencido que viene del backend
    if (tramite.estaVencido !== undefined && tramite.estaVencido !== null) {
      return tramite.estaVencido;
    }

    // Prioridad 2: Verificar permisos cargados del backend
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.estaVencido;
    }

    // Prioridad 3: Usar diasRestantes si está disponible
    if (tramite.diasRestantes !== undefined && tramite.diasRestantes !== null) {
      return tramite.diasRestantes <= 0;
    }

    // Fallback 4: Calcular manualmente desde fechaVencimiento
    if (tramite.fechaVencimiento) {
      const fechaVencimiento = new Date(tramite.fechaVencimiento);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      fechaVencimiento.setHours(0, 0, 0, 0);
      return fechaVencimiento < hoy;
    }

    // Por defecto, no está vencido
    return false;
  }

  getEstadoVisual(tramite: MiTramite): { nombre: string, icono: string } {
    if (this.estaVencido(tramite)) {
      return {
        nombre: 'Finalizado',
        icono: 'fas fa-check-circle'
      };
    }
    return {
      nombre: tramite.estado.nombre,
      icono: tramite.estado.icono
    };
  }

  getEstadoVisualTexto(tramite: MiTramite): string {
    if (this.estaVencido(tramite)) {
      return 'Finalizado';
    }
    return tramite.estado.nombre;
  }

 
  getEstadoClaseCompleta(tramite: MiTramite): string {
    if (this.estaVencido(tramite)) {
      return 'estado-finalizado';
    }
    return this.getEstadoClase(tramite.estado.nombre);
  }

  handleAprobarClick(event: Event, tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeAprobar(tramite)) {
      return;
    }
    event.stopPropagation();
    this.aprobarTramite(tramite);
  }

  handleRechazarClick(event: Event, tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeRechazar(tramite)) {
      return;
    }
    event.stopPropagation();
    this.rechazarTramite(tramite);
  }

  handleDerivarClick(event: Event, tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeDerivar(tramite)) {
      return;
    }
    event.stopPropagation();
    this.derivarTramite(tramite);
  }

  // Table view click handlers (no need to stop propagation)
  handleAprobarClickTable(tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeAprobar(tramite)) {
      return;
    }
    this.aprobarTramite(tramite);
  }

  handleRechazarClickTable(tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeRechazar(tramite)) {
      return;
    }
    this.rechazarTramite(tramite);
  }

  handleDerivarClickTable(tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeDerivar(tramite)) {
      return;
    }
    this.derivarTramite(tramite);
  }

  handleResponderClick(event: Event, tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeResponder(tramite)) {
      return;
    }
    event.stopPropagation();
    this.abrirResponderTramite(tramite);
  }

  handleResponderClickTable(tramite: MiTramite) {
    if (this.estaVencido(tramite) || !this.puedeResponder(tramite)) {
      return;
    }
    this.abrirResponderTramite(tramite);
  }

  abrirResponderTramite(tramite: MiTramite) {
    if (!this.puedeResponder(tramite)) {
      this.toastService.warning(
        'Acción no permitida',
        'Solo se pueden responder trámites aprobados.'
      );
      return;
    }
    
    this.tramiteSeleccionado = tramite;
    this.showResponderTramiteModal = true;
  }

  onTramiteRespondido(response: any) {
    this.toastService.success(
      'Trámite respondido',
      'La respuesta ha sido enviada exitosamente.'
    );
    this.cargarMisTramites();
    this.cargarEstadisticas();
    this.cerrarModalResponder();
  }

  rechazarTramite(tramite: MiTramite) {
    if (!this.canProcessTramites) return;

    this.tramiteSeleccionado = tramite;
    this.mostrarModalRechazo = true;
  }

  derivarTramite(tramite: MiTramite) {
    if (!this.canProcessTramites) return;
    
    this.tramiteSeleccionado = tramite;
    this.mostrarModalDerivacion = true;
    this.cargarTrabajadoresDisponibles();
  }

  // Propiedades para el modal de derivación
  mostrarModalDerivacion = false;
  trabajadoresDisponibles: AdministrativeUser[] = [];
  trabajadorSeleccionado: AdministrativeUser | null = null;
  observacionesDerivacion = '';
  cargandoTrabajadores = false;

  // Propiedades para el modal de rechazo
  mostrarModalRechazo = false;
  motivoRechazo = '';
  observacionesRechazo = '';
  cargandoRechazo = false;

  // Propiedades para el modal de edición
  guardandoEdicion = false;
  formEditar: {
    descripcion?: string;
    observaciones?: string;
  } = {};

  // Propiedades para gestión de documentos en edición
  archivosNuevos: File[] = [];
  documentosAEliminar: number[] = [];

  cargarTrabajadoresDisponibles() {
    this.cargandoTrabajadores = true;
    this.trabajadoresDisponibles = [];
    
    this.authService.getAdministrativosDisponibles().subscribe({
      next: (usuarios) => {
        this.trabajadoresDisponibles = usuarios;
        this.cargandoTrabajadores = false;
      
      },
      error: (error) => {
        this.cargandoTrabajadores = false;
        this.toastService.error('Error', 'No se pudieron cargar los trabajadores disponibles');
      }
    });
  }

  seleccionarTrabajador(trabajador: AdministrativeUser) {

    const maxWorkload = 5;
    if (trabajador.workloadCount >= maxWorkload) {
      this.toastService.error(
        'Trabajador no disponible', 
        `Este trabajador cuenta con ${trabajador.workloadCount} documentos asignados por el día, elige a otro`
      );
      return;
    }
    

    if (this.trabajadorSeleccionado?.id === trabajador.id) {
      this.trabajadorSeleccionado = null;
      this.toastService.info('Trabajador deseleccionado', 'Puedes seleccionar otro trabajador');
      return;
    }
    
    // Seleccionar el nuevo trabajador
    this.trabajadorSeleccionado = trabajador;
    this.toastService.success(
      'Trabajador seleccionado', 
      `${trabajador.nombre} ${trabajador.apellidos} ha sido seleccionado para la derivación`
    );
  }

  confirmarDerivacion() {
    if (!this.trabajadorSeleccionado || !this.tramiteSeleccionado) {
      this.toastService.warning('Validación', 'Debe seleccionar un trabajador para derivar el trámite');
      return;
    }

    if (!this.trabajadorSeleccionado.id) {
      this.toastService.error('Error', 'El trabajador seleccionado no tiene un ID válido');
      return;
    }

    const request = {
      tramiteId: this.tramiteSeleccionado.id,
      areaDestinoId: 1, 
      trabajadorAsignadoId: this.trabajadorSeleccionado.id,
      observaciones: this.observacionesDerivacion || `Trámite derivado a ${this.trabajadorSeleccionado.nombre} ${this.trabajadorSeleccionado.apellidos}`,
      mantenerEstado: false
    };

    this.subscriptions.add(
      this.bandejaTramitesService.derivarTramite(request)
        .subscribe({
          next: (response) => {
      

            this.toastService.success(
              'Trámite derivado',
              `Se asignó el trámite ${this.tramiteSeleccionado!.codigo} a ${this.trabajadorSeleccionado!.nombre} ${this.trabajadorSeleccionado!.apellidos}`
            );

            this.cerrarModalDerivacion();

            this.cargarMisTramites();
            this.cargarEstadisticas();

 
            this.enviarNotificacionDerivacion();
          },
          error: (error) => {
            this.toastService.error('Error al derivar', 'No se pudo derivar el trámite. Intente nuevamente.');
          }
        })
    );
  }

  enviarNotificacionDerivacion() {
    if (!this.trabajadorSeleccionado || !this.tramiteSeleccionado) return;

    const mensaje = `Te ha sido asignado el trámite ${this.tramiteSeleccionado.codigo} para que lo atiendas. Asunto: ${this.tramiteSeleccionado.asunto}`;

    
    this.toastService.info(
      'Notificaciones enviadas', 
      `Se notificó a ${this.trabajadorSeleccionado.nombre} por email y notificación del sistema`
    );
  }

  cerrarModalDerivacion() {
    this.mostrarModalDerivacion = false;
    this.trabajadorSeleccionado = null;
    this.observacionesDerivacion = '';
    this.trabajadoresDisponibles = [];
    this.tramiteSeleccionado = null;
  }

  // Métodos para el modal de rechazo
  cerrarModalRechazo() {
    this.mostrarModalRechazo = false;
    this.motivoRechazo = '';
    this.observacionesRechazo = '';
    this.tramiteSeleccionado = null;
  }

  confirmarRechazo() {
    if (!this.tramiteSeleccionado || !this.motivoRechazo.trim()) {
      this.toastService.warning('Motivo requerido', 'Debe proporcionar un motivo para el rechazo');
      return;
    }

    this.cargandoRechazo = true;

    this.misTramitesService.rechazarTramite(
      this.tramiteSeleccionado.id,
      this.motivoRechazo.trim(),
      this.observacionesRechazo.trim() || undefined
    ).subscribe({
      next: (response) => {
        this.cargandoRechazo = false;
   
        this.cargarMisTramites();
        this.cargarEstadisticas();
        this.cerrarModalRechazo();
      },
      error: (error) => {
        this.cargandoRechazo = false;
      }
    });
  }

  getDiasVencimiento(fechaVencimiento?: Date): number | null {
    if (!fechaVencimiento) return null;
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  getProgressoPorcentaje(estado: string, tramite?: MiTramite): number {

    if (tramite && this.estaVencido(tramite)) {
      return 100;
    }

    const progresos: { [key: string]: number } = {
      'Borrador': 10,
      'Enviado': 25,
      'En Revisión': 50,
      'Derivado': 60,
      'Observado': 40,
      'Aprobado': 80,
      'Finalizado': 100
    };
    return progresos[estado] || 0;
  }

  trackByTramiteId(_: number, tramite: MiTramite): number {
    return tramite.id;
  }

  getTramitesVencidos(): number {
    if (!this.isAdministrativo) return 0;
    return this.misTramites.filter(tramite => this.estaVencido(tramite)).length;
  }

  getTramitesPorProcesar(): number {
    if (!this.estadisticas) return 0;

    const vencidos = this.getTramitesVencidos();
    const enProceso = this.estadisticas.aprobado + this.estadisticas.enRevision + this.estadisticas.derivado;
    return Math.max(0, enProceso - vencidos);
  }

  getTramitesProcesados(): number {
    if (!this.estadisticas) return 0;

    const vencidos = this.getTramitesVencidos();
    const finalizados = this.estadisticas.finalizado;

    // Sumar vencidos a los finalizados para mostrar como procesados
    return finalizados + vencidos;
  }


  private buscarYMostrarTramite(tramiteId: number, action?: string): void {
    setTimeout(() => {
      const tramiteEncontrado = this.misTramites.find(t => t.id === tramiteId);

      if (tramiteEncontrado) {
        if (action === 'responder') {
          this.abrirResponderTramite(tramiteEncontrado);
          this.toastService.success('Trámite encontrado', `Abriendo formulario para responder trámite ${tramiteEncontrado.codigo}`);
        } else if (action === 'derivar') {
          this.derivarTramite(tramiteEncontrado);
          this.toastService.success('Trámite encontrado', `Abriendo formulario para derivar trámite ${tramiteEncontrado.codigo}`);
        } else {
          this.verDetalle(tramiteEncontrado);
          this.toastService.success('Trámite encontrado', `Mostrando detalles del trámite ${tramiteEncontrado.codigo}`);
        }
      } else {
        this.toastService.info(
          'Trámite no visible',
          `El trámite ID ${tramiteId} no está en la página actual. Puedes buscarlo usando el filtro de búsqueda.`
        );
      }
    }, 1000);
  }

  handleDescargarClick(event: Event, tramite: MiTramite): void {
    event.stopPropagation();
    this.descargarTodosDocumentos(tramite);
  }

  handleDescargarTodoClick(tramite: MiTramite): void {
    this.descargarTodosDocumentos(tramite);
    this.cerrarModalDetalle();
  }

  imprimirTramite(tramite: MiTramite): void {
    if (!this.puedeImprimirTramite(tramite)) {
      this.toastService.warning(
        'Acción no permitida',
        'Solo se pueden imprimir trámites que no estén finalizados o dados de baja.'
      );
      return;
    }

    this.toastService.info(
      'Preparando impresión',
      'Generando vista previa para imprimir...'
    );

    this.subscriptions.add(
      this.tramiteService.imprimirTramite(tramite.id).subscribe({
        next: (blob) => {
       
          blob.text().then((htmlContent: string) => {

            const printWindow = window.open('', '_blank', 'width=800,height=600');

            if (printWindow) {
   
              printWindow.document.write(htmlContent);
              printWindow.document.close();

            
              printWindow.onload = () => {
                setTimeout(() => {
                  printWindow.print();
 
                  printWindow.onafterprint = () => {
                    printWindow.close();
                  };
                }, 500);
              };
            } else {
              this.toastService.error(
                'Error de impresión',
                'No se pudo abrir la ventana de impresión. Verifique que no esté bloqueada por el navegador.'
              );
            }
          });
        },
        error: (error) => {
          this.toastService.error(
            'Error de impresión',
            'No se pudo generar el documento del trámite.'
          );
        }
      })
    );
  }

  puedeImprimirTramite(tramite: MiTramite): boolean {

    if (!this.isUsuario) {
      return false;
    }


    const estadosNoImprimibles = ['Finalizado', 'Dado de Baja', 'Cancelado', 'Archivado'];
    return !estadosNoImprimibles.includes(tramite.estado?.nombre);
  }


  getDownloadTooltip(tramite: MiTramite): string {
    if (this.estaVencido(tramite)) {
      return 'Trámite finalizado - Descarga no disponible';
    }

    const cantidadDocumentos = tramite.documentos ? tramite.documentos.length : 0;

    if (cantidadDocumentos === 0) {
      return 'Este trámite no tiene documentos adjuntos';
    } else if (cantidadDocumentos === 1) {
      return `Descargar documento: ${tramite.documentos[0].nombre}`;
    } else {
      return `Descargar ${cantidadDocumentos} documentos en formato ZIP`;
    }
  }

  // Método para convertir MiTramite a formato compatible con el modal de editar
  getTramiteForEdit(): any {
    if (!this.tramiteSeleccionado) return null;

    // Crear un objeto compatible con la interfaz Tramite esperada por el modal
    return {
      id: this.tramiteSeleccionado.id,
      codigo: this.tramiteSeleccionado.codigo,
      asunto: this.tramiteSeleccionado.asunto,
      descripcion: this.tramiteSeleccionado.descripcion,
      observaciones: this.tramiteSeleccionado.observaciones,
      fechaVencimiento: this.tramiteSeleccionado.fechaVencimiento,
      tipoTramite: this.tramiteSeleccionado.tipoTramite,
      prioridad: this.tramiteSeleccionado.prioridad,
      estado: this.tramiteSeleccionado.estado,
      fechaCreacion: this.tramiteSeleccionado.fechaCreacion,
      fechaActualizacion: this.tramiteSeleccionado.fechaActualizacion,
      // Campos requeridos por la interfaz Tramite pero no necesarios para edición
      solicitante: null,
      areaOrigen: null,
      documentos: [],
      historial: []
    };
  }
}