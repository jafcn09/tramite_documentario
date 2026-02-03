import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import {
  MiTramite,
  EstadisticasMisTramites,
  EditarMiTramiteRequest
} from '../../shared/interfaces/mis-tramites.interface';
import { TipoFirma, FirmaDigitalResponse } from '../../shared/interfaces/firma-digital.interface';
import { FirmaDigitalService } from '../../services/firma-digital.service';
import { ResponderTramiteModalComponent } from '../tramites/components/responder-tramite-modal/responder-tramite-modal.component';
import { NuevoTramiteModalComponent } from '../tramites/components/nuevo-tramite-modal/nuevo-tramite-modal.component';
import { RechazarTramiteModalComponent } from '../bandeja-tramites/components/rechazar-tramite-modal/rechazar-tramite-modal.component';
import { AdministrativeUser } from '../../shared/interfaces/auth.interface';

@Component({
    selector: 'app-mis-tramites',
    imports: [CommonModule, FormsModule, RouterModule, ResponderTramiteModalComponent, NuevoTramiteModalComponent, RechazarTramiteModalComponent],
    templateUrl: './mis-tramites.component.html',
    styleUrl: './mis-tramites.component.css'
})
export class MisTramitesComponent implements OnInit, OnDestroy, AfterViewInit {
  misTramites: MiTramite[] = [];
  estadisticas: EstadisticasMisTramites | null = null;
  loading$ = this.misTramitesService.loading$;
  isDarkMode = false;
  private themeSubscription?: Subscription;


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
  showRechazarModal = false;
  tramiteSeleccionado: MiTramite | null = null;

  modoEdicion = false;
  tramiteParaEditar: MiTramite | null = null;
  
  private subscriptions = new Subscription();

  private cdr: ChangeDetectorRef;

  constructor(
    private misTramitesService: MisTramitesService,
    private bandejaTramitesService: BandejaTramitesService,
    private tramiteService: TramiteService,
    private toastService: ToastService,
    private authService: AuthService,
    private firmaDigitalService: FirmaDigitalService,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    cdr: ChangeDetectorRef
  ) {
    this.cdr = cdr;
  }


  get userRole(): string {
    return this.authService.currentUserValue?.role?.name || '';
  }

  get currentUserName(): string {
    const user = this.authService.currentUserValue;
    return user ? `${user.nombre} ${user.apellidos}` : '';
  }

  get isAdministrativo(): boolean {
    return this.userRole === 'administrativo';
  }

  get isUsuario(): boolean {
    return this.userRole === 'usuario';
  }

  get shouldShowCreateButton(): boolean {

    return this.authService.hasRole('usuario');
  }

  get canProcessTramites(): boolean {
    return this.isAdministrativo;
  }

  get canCreateAdvancedTramites(): boolean {
    return this.isAdministrativo;
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });

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


  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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
    this.modoEdicion = false;
    this.tramiteParaEditar = null;
    this.showNuevoTramiteModal = true;
  }

  cerrarModalNuevoTramite() {
    this.showNuevoTramiteModal = false;
    this.modoEdicion = false;
    this.tramiteParaEditar = null;
  }

  onTramiteCreado(nuevoTramite: any) {
    this.cargarMisTramites();
    this.cerrarModalNuevoTramite();
  }

  onTramiteActualizado(tramiteActualizado: any) {
  
    const index = this.misTramites.findIndex(t => t.id === tramiteActualizado.id);
    if (index !== -1) {
      this.misTramites[index] = { ...this.misTramites[index], ...tramiteActualizado };
      this.filteredTramites = [...this.misTramites];
    }
    this.cerrarModalNuevoTramite();
  }

  verDetalle(tramite: MiTramite) {
    this.subscriptions.add(
      this.misTramitesService.getMiTramiteById(tramite.id).subscribe({
        next: (tramiteCompleto) => {
          this.tramiteSeleccionado = tramiteCompleto;
          this.showDetalleTramiteModal = true;
        },
        error: (error) => {
          this.tramiteSeleccionado = tramite;
          this.showDetalleTramiteModal = true;
        }
      })
    );
  }
  puedeEditarTramite(tramite: MiTramite): boolean {
    if (this.userRole !== 'usuario') {
      return false;
    }
    if (this.estaVencido(tramite)) {
      return false;
    }
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

    this.modoEdicion = true;
    this.tramiteParaEditar = tramite;
    this.showNuevoTramiteModal = true;
  }

  private abrirModalConDatosOriginales(tramite: MiTramite) {
    this.tramiteSeleccionado = tramite;
    this.formEditar = {
      descripcion: tramite.descripcion,
      observaciones: tramite.observaciones || ''
    };
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
    const hayNuevaFirmaDigital = this.editarFirmaDigital &&
                                !!this.editFirmaDigitalData &&
                                this.editConsentimientoFirma &&
                                !!this.editRazonFirma?.trim() &&
                                !!this.editUbicacionFirma?.trim();

    return hayCambiosTexto || hayCambiosDocumentos || hayNuevaFirmaDigital;
  }

  puedeGuardarFormulario(): boolean {
    if (!this.tramiteSeleccionado) return false;

    if (!this.hayCambiosEnFormulario()) return false;

    if (!this.puedeEditarTramite(this.tramiteSeleccionado)) return false;
    if (this.editarFirmaDigital) {
      if (this.editFirmaDigitalData) {
        const firmaCompletaParaEnvio = this.editConsentimientoFirma &&
                                      !!this.editRazonFirma?.trim() &&
                                      !!this.editUbicacionFirma?.trim();
        if (!firmaCompletaParaEnvio) {
          return false;
        }
      }
     
    }
    if (this.guardandoEdicion) return false;

    return true;
  }

  guardarEdicion() {
    if (!this.tramiteSeleccionado || !this.hayCambiosEnFormulario()) {
      return;
    }
    if (this.guardandoEdicion) {
      return;
    }

    this.guardandoEdicion = true;
    const formData = new FormData();
    if (this.formEditar.descripcion !== this.tramiteSeleccionado.descripcion) {
      formData.append('descripcion', this.formEditar.descripcion || '');
    }

    if (this.formEditar.observaciones !== (this.tramiteSeleccionado.observaciones || '')) {
      formData.append('observaciones', this.formEditar.observaciones || '');
    }
    this.archivosNuevos.forEach((archivo) => {
      formData.append('documentosNuevos', archivo, archivo.name);
    });
    if (this.documentosAEliminar.length > 0) {
      formData.append('documentosAEliminar', JSON.stringify(this.documentosAEliminar));
    }
    if (this.editarFirmaDigital) {
      const hayDatosFirma = !!this.editRazonFirma?.trim() ||
                           !!this.editUbicacionFirma?.trim() ||
                           !!this.editFirmaDigitalData ||
                           this.editConsentimientoFirma ||
                           this.editTipoFirma !== TipoFirma.CONFORMIDAD;

      if (hayDatosFirma) {
        const firmaDigitalData = {
          tipoFirma: this.editTipoFirma,
          razonFirma: this.editRazonFirma?.trim() || null,
          ubicacionFirma: this.editUbicacionFirma?.trim() || null,
          firmaDigitalData: this.editFirmaDigitalData || null,
          consentimientoFirma: this.editConsentimientoFirma,
          fechaFirma: this.editFirmaDigitalData ? new Date().toISOString() : null
        };

        formData.append('firmaDigital', JSON.stringify(firmaDigitalData));


        this.toastService.info(
          'Datos de firma incluidos',
          'Los campos de firma digital serán guardados junto con los cambios del trámite'
        );
      } else {
      }
    }

    this.subscriptions.add(
      this.tramiteService.editarTramiteUsuario(this.tramiteSeleccionado.id, formData)
        .subscribe({
          next: (response) => {
            this.guardandoEdicion = false;

            this.toastService.success(
              'Trámite actualizado',
              'Los cambios han sido guardados exitosamente.'
            );
            this.cargarMisTramites();
            this.cargarEstadisticas();
            const tramiteId = this.tramiteSeleccionado?.id;
            const detalleAbierto = this.showDetalleTramiteModal;

            this.cerrarModalEditar();
            if (detalleAbierto && typeof tramiteId === 'number') {
              this.recargarYMostrarDetalle(tramiteId);
            }
          },
          error: (error) => {
            this.guardandoEdicion = false;
            this.toastService.error(
              'Error al guardar',
              'No se pudieron guardar los cambios. Intente nuevamente.'
            );
          }
        })
    );
  }
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
      this.descargarDocumentoIndividual(tramite.id, tramite.documentos[0]);
    } else {
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

  cerrarModalDetalle() {
    this.showDetalleTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  recargarYMostrarDetalle(tramiteId: number) {
    this.subscriptions.add(
      this.misTramitesService.getMiTramiteById(tramiteId).subscribe({
        next: (tramiteActualizado) => {
          this.tramiteSeleccionado = tramiteActualizado;
          this.showDetalleTramiteModal = true;

          this.toastService.info(
            'Vista actualizada',
            'Los datos del trámite han sido actualizados en el detalle.'
          );
        },
        error: (error) => {
          const tramiteEnLista = this.misTramites.find(t => t.id === tramiteId);
          if (tramiteEnLista) {
            this.tramiteSeleccionado = tramiteEnLista;
            this.showDetalleTramiteModal = true;
            this.toastService.warning(
              'Datos parciales',
              'Se muestran los datos básicos. Algunos cambios podrían no estar visibles.'
            );
          } else {
            this.toastService.error(
              'Error de recarga',
              'No se pudo recargar el detalle del trámite.'
            );
          }
        }
      })
    );
  }

  cerrarModalEditar() {
    this.showEditarTramiteModal = false;

    if (!this.showDetalleTramiteModal) {
      this.tramiteSeleccionado = null;
    }

    this.formEditar = {};
    this.guardandoEdicion = false;
    this.archivosNuevos = [];
    this.documentosAEliminar = [];
    this.resetEditFirmaDigitalForm();
  }

  cerrarModalAprobar() {
    this.showAprobarModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalResponder() {
    this.showResponderTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalRechazar() {
    this.showRechazarModal = false;
    this.tramiteSeleccionado = null;
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
  aprobarTramite(tramite: MiTramite) {
    if (!this.canProcessTramites) return;
    
    this.tramiteSeleccionado = tramite;
    this.showAprobarModal = true;
  }
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
    const estadosParaAprobar = ['En Revisión', 'Derivado', 'EN_REVISION', 'DERIVADO'];
    const puede = this.isAdministrativo && estadosParaAprobar.includes(tramite.estado.nombre);

    return puede;
  }

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

    if (this.userRole === 'estudiante') {
      return false;
    }
    if (!this.isAdministrativo) {
      return false;
    }

    // Si el trámite está derivado, no se puede rechazar
    if (['Derivado', 'DERIVADO'].includes(tramite.estado.nombre)) {
      return false;
    }

    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeRechazar;
    }
    const estadosNoRechazables = ['Finalizado', 'FINALIZADO', 'Rechazado', 'RECHAZADO', 'Archivado', 'ARCHIVADO'];
    const puede = this.isAdministrativo && !estadosNoRechazables.includes(tramite.estado.nombre);

    return puede;
  }

  puedeDerivar(tramite: MiTramite): boolean {
    if (this.userRole === 'estudiante') {
      return false;
    }

    if (!this.isAdministrativo) {
      return false;
    }

    if (tramite.respuesta && tramite.respuesta.trim().length > 0) {
      return false;
    }

    // Si el trámite está derivado, no se puede derivar nuevamente
    if (['Derivado', 'DERIVADO'].includes(tramite.estado.nombre)) {
      return false;
    }

    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {

      return permisos.puedeDerivar;
    }

    const estadosParaDerivar = ['En Revisión', 'EN_REVISION', 'En Proceso', 'EN_PROCESO'];
    const estadosNoDerivar = ['Derivado', 'DERIVADO'];
    const puede = this.isAdministrativo &&
                 estadosParaDerivar.includes(tramite.estado.nombre) &&
                 !estadosNoDerivar.includes(tramite.estado.nombre);

    return puede;
  }

  estaVencido(tramite: MiTramite): boolean {
    if (tramite.estaVencido !== undefined && tramite.estaVencido !== null) {
      return tramite.estaVencido;
    }
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.estaVencido;
    }
    if (tramite.diasRestantes !== undefined && tramite.diasRestantes !== null) {
      return tramite.diasRestantes <= 0;
    }
    if (tramite.fechaVencimiento) {
      const fechaVencimiento = new Date(tramite.fechaVencimiento);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      fechaVencimiento.setHours(0, 0, 0, 0);
      return fechaVencimiento < hoy;
    }
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

  onTramiteRechazado(response: any) {
    this.toastService.success(
      'Trámite rechazado',
      `El trámite ${response.codigo} ha sido rechazado correctamente`
    );
    this.cargarMisTramites();
    this.cargarEstadisticas();
    this.cerrarModalRechazar();
  }

  rechazarTramite(tramite: MiTramite) {
    if (!this.canProcessTramites) return;

    this.tramiteSeleccionado = tramite;
    this.showRechazarModal = true;
  }

  derivarTramite(tramite: MiTramite) {
    if (!this.canProcessTramites) return;

    this.tramiteSeleccionado = tramite;
    this.mostrarModalDerivacion = true;
    this.cargarTrabajadoresDisponibles();
  }
  mostrarModalDerivacion = false;
  trabajadoresDisponibles: AdministrativeUser[] = [];
  trabajadorSeleccionado: AdministrativeUser | null = null;
  observacionesDerivacion = '';
  cargandoTrabajadores = false;
  guardandoEdicion = false;
  formEditar: {
    descripcion?: string;
    observaciones?: string;
  } = {};
  archivosNuevos: File[] = [];
  documentosAEliminar: number[] = [];
  @ViewChild('editSignatureCanvas') editSignatureCanvas!: ElementRef<HTMLCanvasElement>;
  private editCanvas!: HTMLCanvasElement;
  private editCtx!: CanvasRenderingContext2D;
  private editIsDrawing = false;
  private editStartX = 0;
  private editStartY = 0;

  editarFirmaDigital = false;
  editTipoFirma: TipoFirma = TipoFirma.CONFORMIDAD;
  editRazonFirma = '';
  editUbicacionFirma = '';
  editFirmaDigitalData: string | null = null;
  editSignatureExists = false;
  editConsentimientoFirma = false;
  showEditConfirmationModal = false;
  tiposFirmaEdit = [
    { value: TipoFirma.CONFORMIDAD, label: 'Conformidad' },
    { value: TipoFirma.APROBACION, label: 'Aprobación' },
    { value: TipoFirma.REVISION, label: 'Revisión' },
    { value: TipoFirma.SIMPLE, label: 'Simple' }
  ];

 
  departamentosPeruEdit = [
    'AMAZONAS', 'ANCASH', 'APURIMAC', 'AREQUIPA', 'AYACUCHO', 'CAJAMARCA',
    'CALLAO', 'CUSCO', 'HUANCAVELICA', 'HUANUCO', 'ICA', 'JUNIN',
    'LA_LIBERTAD', 'LAMBAYEQUE', 'LIMA', 'LORETO', 'MADRE_DE_DIOS', 'MOQUEGUA',
    'PASCO', 'PIURA', 'PUNO', 'SAN_MARTIN', 'TACNA', 'TUMBES', 'UCAYALI'
  ];


  firmaDigitalDetallada: FirmaDigitalResponse | null = null;

  
  usarDatosBasicosFirmaDigital(tramiteId: number): void {
    if (!this.tramiteSeleccionado) {
      return;
    }


    const firmaFallback = {
      tipoFirma: this.tramiteSeleccionado.tipoFirma ?
        TipoFirma[this.tramiteSeleccionado.tipoFirma as keyof typeof TipoFirma] || TipoFirma.SIMPLE :
        this.extraerTipoFirmaDeMetodo(this.tramiteSeleccionado.metodoVerificacion) || TipoFirma.CONFORMIDAD,
      razonFirma: this.tramiteSeleccionado.razonFirma ||
        (this.tramiteSeleccionado.fechaFirma ?
          `Firma digital del trámite - ${new Date(this.tramiteSeleccionado.fechaFirma).toLocaleDateString('es-PE')}` :
          'Firma digital del trámite'),
      ubicacionFirma: this.tramiteSeleccionado.ubicacionFirma || 'LIMA',
      fechaFirma: this.tramiteSeleccionado.fechaFirma,
      hashFirma: this.tramiteSeleccionado.hashFirma
    };

    this.inicializarCamposFirmaDigitalFallback(firmaFallback);
  }
  extraerTipoFirmaDeMetodo(metodoVerificacion?: string): TipoFirma | null {
    if (!metodoVerificacion) return null;

    const metodo = metodoVerificacion.toUpperCase();

    if (metodo.includes('SIMPLE')) return TipoFirma.SIMPLE;
    if (metodo.includes('AVANZADA')) return TipoFirma.APROBACION;
    if (metodo.includes('CUALIFICADA')) return TipoFirma.REVISION;
    if (metodo.includes('CONFORMIDAD')) return TipoFirma.CONFORMIDAD;

    return null;
  }
  inicializarCamposFirmaDigitalFallback(firmaFallback: any): void {

    this.editTipoFirma = firmaFallback.tipoFirma;
    this.editRazonFirma = firmaFallback.razonFirma;
    this.editUbicacionFirma = firmaFallback.ubicacionFirma;

    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);

    this.toastService.info(
      'Datos de firma cargados (básicos)',
      'Se han precargado datos básicos de la firma digital existente'
    );
  }


  cargarDatosDetalladosFirmaDigital(tramiteId: number): void {

    this.subscriptions.add(
      this.firmaDigitalService.obtenerFirmasPorTramite(tramiteId).subscribe({
        next: (firmas: FirmaDigitalResponse[]) => {

          if (firmas && firmas.length > 0) {
            this.firmaDigitalDetallada = firmas[0];
            this.inicializarCamposFirmaDigitalExistente(this.firmaDigitalDetallada);
          } else {
            this.usarDatosBasicosFirmaDigital(tramiteId);
          }
        },
        error: (error) => {
        }
      })
    );
  }
  inicializarCamposFirmaDigitalExistente(firma: FirmaDigitalResponse): void {

    if (firma.tipoFirma) {
      this.editTipoFirma = firma.tipoFirma;
    } else {
    }

    if (firma.razonFirma) {
      this.editRazonFirma = firma.razonFirma;
    } else {
    }

    if (firma.ubicacionFirma) {
      this.editUbicacionFirma = firma.ubicacionFirma;
    } else {
    }

    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);

    this.toastService.info(
      'Datos de firma cargados',
      'Se han precargado los datos de la firma digital existente'
    );
  }

  cargarTrabajadoresDisponibles() {
    this.cargandoTrabajadores = true;
    this.trabajadoresDisponibles = [];

    const currentUserId = this.authService.currentUserValue?.id;
    this.authService.getAdministrativosDisponibles(currentUserId).subscribe({
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

  getDiasVencimiento(fechaVencimiento?: Date): number | null {
    if (!fechaVencimiento) return null;
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  getDiasHabilesRestantes(fechaVencimiento?: Date): number | null {
    if (!fechaVencimiento) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); 

    const vencimiento = new Date(fechaVencimiento);
    vencimiento.setHours(0, 0, 0, 0); 
    if (vencimiento < hoy) {
      return this.calcularDiasHabilesEntre(vencimiento, hoy) * -1;
    }

    return this.calcularDiasHabilesEntre(hoy, vencimiento);
  }

  private calcularDiasHabilesEntre(fechaInicio: Date, fechaFin: Date): number {
    let diasHabiles = 0;
    const fechaActual = new Date(fechaInicio);

    while (fechaActual < fechaFin) {
      const diaSemana = fechaActual.getDay();
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasHabiles++;
      }
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return diasHabiles;
  }

  getProgressoPorcentaje(tramite: MiTramite): number {
    if (!tramite) return 0;

    const progreso = tramite.progreso;
    if (progreso === undefined || progreso === null || isNaN(progreso)) {
      return 0;
    }
    return Math.max(0, Math.min(100, progreso));
  }

  trackByTramiteId(_: number, tramite: MiTramite): number {
    return tramite.id;
  }

  getProgresoDetallado(tramite: MiTramite) {
    if (!tramite) {
      return {
        porcentaje: 0,
        tipoProgreso: 'temporal',
        descripcion: 'Cargando...',
        tiempoRestante: 'Calculando...'
      };
    }
    const porcentaje = this.getProgressoPorcentaje(tramite);

    if (tramite.estaVencido) {
      return {
        porcentaje: 100,
        tipoProgreso: 'vencido',
        descripcion: 'Trámite vencido',
        tiempoRestante: 'Vencido'
      };
    }

    if (tramite.estado?.nombre === 'Finalizado') {
      return {
        porcentaje: 100,
        tipoProgreso: 'estado',
        descripcion: 'Trámite completado',
        tiempoRestante: 'Finalizado'
      };
    }

    const tiempoRestante = this.formatearTiempoRestante(tramite);

    return {
      porcentaje,
      tipoProgreso: 'temporal',
      descripcion: `Progreso: ${porcentaje}%`,
      tiempoRestante
    };
  }

  private formatearTiempoRestante(tramite: MiTramite): string {
    if (!tramite.fechaVencimiento) {
      return 'Sin fecha límite';
    }

    const diasHabiles = this.getDiasHabilesRestantes(tramite.fechaVencimiento);

    if (diasHabiles === null) {
      return 'Sin fecha límite';
    }

    if (diasHabiles < 0) {
      const diasVencido = Math.abs(diasHabiles);
      return `Vencido hace ${diasVencido} día${diasVencido === 1 ? '' : 's'} hábil${diasVencido === 1 ? '' : 'es'}`;
    }

    if (diasHabiles === 0) {
      const ahora = new Date();
      const fechaVencimiento = new Date(tramite.fechaVencimiento);
      ahora.setHours(0, 0, 0, 0);
      fechaVencimiento.setHours(0, 0, 0, 0);

      if (ahora.getTime() === fechaVencimiento.getTime()) {
        const horasRestantes = 24 - new Date().getHours();
        return `${horasRestantes} hora${horasRestantes === 1 ? '' : 's'} restante${horasRestantes === 1 ? '' : 's'} (último día)`;
      }
      return 'Vence hoy';
    }

    return `${diasHabiles} día${diasHabiles === 1 ? '' : 's'} hábil${diasHabiles === 1 ? '' : 'es'} restante${diasHabiles === 1 ? '' : 's'}`;
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

  getTramiteForEdit(): any {
    if (!this.tramiteSeleccionado) return null;


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
      solicitante: null,
      areaOrigen: null,
      documentos: [],
      historial: []
    };
  }

  mostrarFirmaDigitalEnDetalle(tramite?: MiTramite): boolean {
    if (!tramite) {
      return false;
    }

    if (!tramite.firmaDigitalActiva) {
      return false;
    }

    if (this.isAdministrativo) {
      return true;
    }

    if (this.isUsuario) {
      const currentUserId = this.authService.currentUserValue?.id;
      const solicitanteId = tramite.usuarioSolicitante?.id;
      return currentUserId === solicitanteId;
    }

    return false;
  }

  mostrarDatosPersonalesFirma(): boolean {
    return this.isAdministrativo;
  }

  obtenerMetodoVerificacion(metodo?: string | null): string {
    if (!metodo) return 'No especificado';

    const metodos: { [key: string]: string } = {
      'SIMPLE': 'Firma Digital Simple',
      'AVANZADA': 'Firma Digital Avanzada',
      'CUALIFICADA': 'Firma Digital Cualificada'
    };

    return metodos[metodo] || metodo;
  }
  initializeEditCanvas(): void {
    if (!this.editSignatureCanvas) return;

    this.editCanvas = this.editSignatureCanvas.nativeElement;
    this.editCtx = this.editCanvas.getContext('2d')!;
    this.editCanvas.width = 400;
    this.editCanvas.height = 150;
    this.editCtx.strokeStyle = '#000';
    this.editCtx.lineWidth = 2;
    this.editCtx.lineCap = 'round';
    this.editCanvas.addEventListener('mousedown', this.editStartDrawing.bind(this));
    this.editCanvas.addEventListener('mousemove', this.editDraw.bind(this));
    this.editCanvas.addEventListener('mouseup', this.editStopDrawing.bind(this));
    this.editCanvas.addEventListener('touchstart', this.editStartDrawingTouch.bind(this));
    this.editCanvas.addEventListener('touchmove', this.editDrawTouch.bind(this));
    this.editCanvas.addEventListener('touchend', this.editStopDrawing.bind(this));
  }

  editStartDrawing(e: MouseEvent): void {
    this.editIsDrawing = true;
    const rect = this.editCanvas.getBoundingClientRect();
    this.editStartX = e.clientX - rect.left;
    this.editStartY = e.clientY - rect.top;
  }

  editDraw(e: MouseEvent): void {
    if (!this.editIsDrawing) return;

    const rect = this.editCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.editCtx.beginPath();
    this.editCtx.moveTo(this.editStartX, this.editStartY);
    this.editCtx.lineTo(x, y);
    this.editCtx.stroke();

    this.editStartX = x;
    this.editStartY = y;
    this.editSignatureExists = true;
  }

  editStopDrawing(): void {
    this.editIsDrawing = false;
  }

  editStartDrawingTouch(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.editCanvas.getBoundingClientRect();
    this.editIsDrawing = true;
    this.editStartX = touch.clientX - rect.left;
    this.editStartY = touch.clientY - rect.top;
  }

  editDrawTouch(e: TouchEvent): void {
    e.preventDefault();
    if (!this.editIsDrawing) return;

    const touch = e.touches[0];
    const rect = this.editCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    this.editCtx.beginPath();
    this.editCtx.moveTo(this.editStartX, this.editStartY);
    this.editCtx.lineTo(x, y);
    this.editCtx.stroke();

    this.editStartX = x;
    this.editStartY = y;
    this.editSignatureExists = true;
  }

  editClearCanvas(): void {
    if (this.editCtx && this.editCanvas) {
      this.editCtx.clearRect(0, 0, this.editCanvas.width, this.editCanvas.height);
      this.editSignatureExists = false;
      this.editFirmaDigitalData = null;
    }
  }

  editCaptureSignature(): void {
    if (this.editCanvas && this.editSignatureExists) {
      this.editFirmaDigitalData = this.editCanvas.toDataURL('image/png');
      this.toastService.success('Firma capturada', 'Su nueva firma ha sido capturada exitosamente');
    }
  }

  toggleEditarFirmaDigital(): void {
    this.editarFirmaDigital = !this.editarFirmaDigital;

    if (this.editarFirmaDigital) {
      this.resetEditFirmaDigitalForm();
      this.toastService.info('Edición de firma activada', 'Complete los datos para crear una nueva firma digital');

      setTimeout(() => {
        this.initializeEditCanvas();
      }, 100);
    } else {
      this.clearEditFirmaDigitalData();
    }
  }

  resetEditFirmaDigitalForm(): void {
    this.editTipoFirma = TipoFirma.CONFORMIDAD;
    this.editRazonFirma = '';
    this.editUbicacionFirma = '';
    this.editFirmaDigitalData = null;
    this.editSignatureExists = false;
    this.editConsentimientoFirma = false;
    this.showEditConfirmationModal = false;
  }

  clearEditFirmaDigitalData(): void {
    this.editFirmaDigitalData = null;
    this.editSignatureExists = false;
    this.editConsentimientoFirma = false;
    this.showEditConfirmationModal = false;
    if (this.editCtx && this.editCanvas) {
      this.editCtx.clearRect(0, 0, this.editCanvas.width, this.editCanvas.height);
    }
  }

  mostrarEditConfirmationModal(): void {
    if (!this.validarEditFirmaDigital()) {
      return;
    }
    this.showEditConfirmationModal = true;
  }

  validarEditFirmaDigital(): boolean {
    if (!this.editSignatureExists) {
      this.toastService.warning('Firma requerida', 'Debe dibujar su firma en el recuadro');
      return false;
    }

    if (!this.editFirmaDigitalData) {
      this.toastService.warning('Firma no capturada', 'Debe capturar su firma haciendo clic en "Capturar Firma"');
      return false;
    }

    if (!this.editRazonFirma.trim()) {
      this.toastService.warning('Razón requerida', 'Debe especificar el motivo de la firma');
      return false;
    }

    if (!this.editUbicacionFirma.trim()) {
      this.toastService.warning('Ubicación requerida', 'Debe especificar su ubicación');
      return false;
    }

    if (!this.editConsentimientoFirma) {
      this.toastService.warning('Consentimiento requerido', 'Debe aceptar los términos y condiciones');
      return false;
    }

    return true;
  }

  cerrarEditConfirmationModal(): void {
    this.showEditConfirmationModal = false;
  }

  confirmarEditFirmaDigital(): void {
    if (!this.validarEditFirmaDigital()) {
      return;
    }

    this.toastService.success(
      'Firma digital agregada',
      'La nueva firma digital se guardará al confirmar la edición del trámite'
    );

    this.showEditConfirmationModal = false;
  }

  puedeEliminarTramite(tramite: MiTramite): boolean {
    if (this.userRole !== 'usuario' && this.userRole !== 'estudiante') {
      return false;
    }

    const estadosNoEliminables = ['Finalizado', 'FINALIZADO', 'Archivado', 'ARCHIVADO', 'Rechazado', 'RECHAZADO'];
    if (estadosNoEliminables.includes(tramite.estado?.nombre)) {
      return false;
    }
    const currentUserId = this.authService.currentUserValue?.id;
    const solicitanteId = tramite.usuarioSolicitante?.id;

    return currentUserId === solicitanteId;
  }

  showDeleteConfirmModal = false;
  tramiteParaEliminar: MiTramite | null = null;

  eliminarTramite(tramite: MiTramite) {
    if (!this.puedeEliminarTramite(tramite)) {
      this.toastService.warning(
        'Acción no permitida',
        'No tienes permiso para eliminar este trámite.'
      );
      return;
    }

    this.tramiteParaEliminar = tramite;
    this.showDeleteConfirmModal = true;
  }

  cancelarEliminacion() {
    this.showDeleteConfirmModal = false;
    this.tramiteParaEliminar = null;
  }

  confirmarEliminacion() {
    if (!this.tramiteParaEliminar) return;

    this.subscriptions.add(
      this.tramiteService.eliminarTramite(this.tramiteParaEliminar.id)
        .subscribe({
          next: () => {
            this.showDeleteConfirmModal = false;
            this.tramiteParaEliminar = null;
            this.cargarMisTramites();
            this.cargarEstadisticas();
          },
          error: (error) => {
            this.showDeleteConfirmModal = false;
            this.tramiteParaEliminar = null;
          }
        })
    );
  }
}