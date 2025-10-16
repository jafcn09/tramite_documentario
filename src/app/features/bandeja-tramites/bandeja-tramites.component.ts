import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BandejaTramitesService } from '../../services/bandeja-tramites.service';
import { MisTramitesService } from '../../services/mis-tramites.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { ResponderTramiteModalComponent } from '../tramites/components/responder-tramite-modal/responder-tramite-modal.component';

import { Tramite } from '../../shared/interfaces/tramite.interface';
import { 
  TramiteBandeja, 
  FiltrosBandeja, 
  EstadisticasBandeja,
  CambiarEstadoRequest,
  DerivarTramiteRequest,
  ReasignarTramiteRequest,
  NotificacionBandeja
} from '../../shared/interfaces/bandeja-tramites.interface';

@Component({
  selector: 'app-bandeja-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ResponderTramiteModalComponent], 
  templateUrl: './bandeja-tramites.component.html',
  styleUrl: './bandeja-tramites.component.css'
})
export class BandejaTramitesComponent implements OnInit, OnDestroy {
  tramites: TramiteBandeja[] = [];
  estadisticas: EstadisticasBandeja | null = null;
  notificaciones: NotificacionBandeja[] = [];
  loading$ = this.bandejaTramitesService.loading$;
  

  currentPage = 1;
  pageSize = 15;
  totalItems = 0;
  totalPages = 0;
  
  filtros: FiltrosBandeja = {};
  searchTerm = '';
  private searchSubject = new Subject<string>();
  

  showFilters = false;
  vistaActual: 'lista' | 'kanban' | 'calendario' = 'lista';
  ordenarPor: 'fecha' | 'vencimiento' | 'prioridad' | 'estado' = 'vencimiento';
  ordenAscendente = false;
  
  Math = Math;
  

  selectedTramites: number[] = [];
  
  showDetalleTramiteModal = false;
  showCambiarEstadoModal = false;
  showDerivarModal = false;
  showReasignarModal = false;
  showNotificacionesModal = false;
  showResponderTramiteModal = false;
  showEditarTramiteModal = false;
  tramiteSeleccionado: TramiteBandeja | null = null;
  tramiteParaEditar: Tramite | null = null;
  

  cambiarEstadoForm: CambiarEstadoRequest = {
    tramiteId: 0,
    nuevoEstadoId: 0,
    observaciones: ''
  };
  
  derivarForm: DerivarTramiteRequest = {
    tramiteId: 0,
    areaDestinoId: 0,
    observaciones: '',
    mantenerEstado: false
  };
  
  reasignarForm: ReasignarTramiteRequest = {
    tramiteId: 0,
    nuevoTrabajadorId: 0,
    observaciones: ''
  };
  

  estadosDisponibles: any[] = [];
  areasDisponibles: any[] = [];
  trabajadoresDisponibles: any[] = [];
  
  private subscriptions = new Subscription();

  constructor(
    private bandejaTramitesService: BandejaTramitesService,
    private misTramitesService: MisTramitesService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setupSearch();
    this.cargarTramites();
    this.cargarEstadisticas();
    this.cargarNotificaciones();
    this.cargarOpcionesFormulario();
    
    setInterval(() => {
      if (!document.hidden) {
        this.cargarTramites();
        this.cargarNotificaciones();
      }
    }, 30000);
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
        this.filtros.busqueda = term;
        this.currentPage = 1;
        this.cargarTramites();
      })
    );
  }

  cargarTramites() {
    this.subscriptions.add(
      this.bandejaTramitesService.getTramites(this.currentPage, this.pageSize, this.filtros, this.ordenarPor, this.ordenAscendente)
        .subscribe({
          next: (response) => {
            response.data.forEach(tramite => {

            });

            this.tramites = response.data;
            this.totalItems = response.total;
            this.totalPages = response.totalPages;
            this.autoFinalizarTramitesVencidos();
          },
          error: (error) => {
          }
        })
    );
  }

  cargarEstadisticas() {
    this.subscriptions.add(
      this.bandejaTramitesService.getEstadisticas()
        .subscribe(estadisticas => this.estadisticas = estadisticas)
    );
  }

  cargarNotificaciones() {
    this.subscriptions.add(
      this.bandejaTramitesService.getNotificaciones()
        .subscribe(notificaciones => {
          this.notificaciones = notificaciones;
        })
    );
  }

  cargarOpcionesFormulario() {
    this.subscriptions.add(
      this.bandejaTramitesService.getEstadosDisponibles()
        .subscribe(estados => this.estadosDisponibles = estados)
    );
    
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  aplicarFiltros() {
    this.currentPage = 1;
    this.cargarTramites();
    this.showFilters = false;
  }

  limpiarFiltros() {
    this.filtros = {};
    this.searchTerm = '';
    this.currentPage = 1;
    this.cargarTramites();
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {

      this.currentPage = page;
      this.cargarTramites();
    }
  }

  toggleOrden(campo: 'fecha' | 'vencimiento' | 'prioridad' | 'estado') {
    if (this.ordenarPor === campo) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenarPor = campo;
      this.ordenAscendente = true;
    }
    this.cargarTramites();
  }

  toggleVista(vista: 'lista' | 'kanban' | 'calendario') {
    this.vistaActual = vista;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
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
      this.selectedTramites = this.tramites.map(t => t.id);
    }
  }

  isSelected(tramiteId: number): boolean {
    return this.selectedTramites.includes(tramiteId);
  }


  verDetalle(tramite: TramiteBandeja) {
    this.tramiteSeleccionado = tramite;
    this.showDetalleTramiteModal = true;
  }

  abrirCambiarEstado(tramite: TramiteBandeja) {
    this.tramiteSeleccionado = tramite;
    this.cambiarEstadoForm = {
      tramiteId: tramite.id,
      nuevoEstadoId: tramite.estado.id,
      observaciones: ''
    };
    this.showCambiarEstadoModal = true;
  }

  abrirDerivar(tramite: TramiteBandeja) {
    this.tramiteSeleccionado = tramite;
    this.derivarForm = {
      tramiteId: tramite.id,
      areaDestinoId: 0,
      observaciones: '',
      mantenerEstado: false
    };
    this.showDerivarModal = true;
  }

  abrirReasignar(tramite: TramiteBandeja) {
    this.tramiteSeleccionado = tramite;
    this.reasignarForm = {
      tramiteId: tramite.id,
      nuevoTrabajadorId: 0,
      observaciones: ''
    };
    this.showReasignarModal = true;
  }

  abrirAprobar(tramite: TramiteBandeja) {

    // Llamar directamente al endpoint de aprobación
    const request = {
      tramiteId: tramite.id,
      observaciones: 'Aprobado por trabajador administrativo'
    };

    this.subscriptions.add(
      this.misTramitesService.aprobarTramite(request)
        .subscribe({
          next: (response: any) => {

            this.cargarTramites();
            this.cargarEstadisticas();
            this.toastService.success('Trámite aprobado', `El trámite ${tramite.codigo} ha sido aprobado correctamente`);
          },
          error: (error: any) => {
            this.toastService.error('Error al aprobar', 'No se pudo aprobar el trámite. Intente nuevamente.');
          }
        })
    );
  }


  confirmarCambiarEstado() {
    this.subscriptions.add(
      this.bandejaTramitesService.cambiarEstado(this.cambiarEstadoForm)
        .subscribe({
          next: () => {
            this.cargarTramites();
            this.cargarEstadisticas();
            this.cerrarModalCambiarEstado();
          }
        })
    );
  }

  confirmarDerivar() {

    this.subscriptions.add(
      this.bandejaTramitesService.derivarTramite(this.derivarForm)
        .subscribe({
          next: (response) => {

            this.cargarTramites();
            this.cargarEstadisticas();
            this.cerrarModalDerivar();
            this.toastService.success('Trámite derivado', 'El trámite ha sido derivado correctamente');
          },
          error: (error) => {
            this.toastService.error('Error al derivar', 'No se pudo derivar el trámite. Intente nuevamente.');
          }
        })
    );
  }

  confirmarReasignar() {
    this.subscriptions.add(
      this.bandejaTramitesService.reasignarTramite(this.reasignarForm)
        .subscribe({
          next: () => {
            this.cargarTramites();
            this.cerrarModalReasignar();
          }
        })
    );
  }


  descargarDocumento(tramiteId: number, nombreArchivo: string) {
    this.subscriptions.add(
      this.bandejaTramitesService.descargarDocumento(tramiteId, nombreArchivo)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = nombreArchivo;
            link.click();
            window.URL.revokeObjectURL(url);
          }
        })
    );
  }

  descargarTodosDocumentos(tramite: TramiteBandeja) {
    this.subscriptions.add(
      this.bandejaTramitesService.descargarTodosDocumentos(tramite.id)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `tramite-${tramite.codigo}-documentos.zip`;
            link.click();
            window.URL.revokeObjectURL(url);
          }
        })
    );
  }

  subirDocumento(event: any, tramiteId: number) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        const validacion = this.bandejaTramitesService.validarArchivo(file);
        if (validacion.valido) {
          this.subscriptions.add(
            this.bandejaTramitesService.subirDocumento(tramiteId, file)
              .subscribe(() => {
                this.cargarTramites();
              })
          );
        } else {
          this.toastService.error('Archivo inválido', validacion.mensaje || '');
        }
      }
    }
  }


  marcarNotificacionLeida(notificacion: NotificacionBandeja) {
    if (!notificacion.leida) {
      this.subscriptions.add(
        this.bandejaTramitesService.marcarNotificacionLeida(notificacion.id)
          .subscribe(() => {
            notificacion.leida = true;
            if (notificacion.tramiteId) {
              const tramite = this.tramites.find(t => t.id === notificacion.tramiteId);
              if (tramite) {
                this.verDetalle(tramite);
              }
            }
          })
      );
    }
  }

  get notificacionesNoLeidas(): number {
    return this.notificaciones.filter(n => !n.leida).length;
  }


  cerrarModalDetalle() {
    this.showDetalleTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalCambiarEstado() {
    this.showCambiarEstadoModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalDerivar() {
    this.showDerivarModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalReasignar() {
    this.showReasignarModal = false;
    this.tramiteSeleccionado = null;
  }

  cerrarModalNotificaciones() {
    this.showNotificacionesModal = false;
  }

  // Modal de responder trámite
  abrirResponderTramite(tramite: TramiteBandeja) {
    this.tramiteSeleccionado = tramite;
    this.showResponderTramiteModal = true;
  }

  cerrarModalResponder() {
    this.showResponderTramiteModal = false;
    this.tramiteSeleccionado = null;
  }

  // Modal de editar trámite
  abrirEditarTramite(tramite: TramiteBandeja) {
    this.tramiteSeleccionado = tramite;
    this.tramiteParaEditar = this.convertirTramiteBandejaATramite(tramite);
    this.showEditarTramiteModal = true;
  }

  cerrarModalEditar() {
    this.showEditarTramiteModal = false;
    this.tramiteSeleccionado = null;
    this.tramiteParaEditar = null;
  }

  // Función para convertir TramiteBandeja a Tramite
  private convertirTramiteBandejaATramite(tramiteBandeja: TramiteBandeja): Tramite {
    return {
      id: tramiteBandeja.id,
      codigo: tramiteBandeja.codigo,
      asunto: tramiteBandeja.asunto,
      descripcion: tramiteBandeja.descripcion,
      tipoTramite: {
        id: tramiteBandeja.tipoTramite.id,
        nombre: tramiteBandeja.tipoTramite.nombre,
        descripcion: tramiteBandeja.tipoTramite.descripcion,
        tiempoEstimado: tramiteBandeja.tipoTramite.tiempoEstimado,
        requiereAprobacion: true, // Valor por defecto
        activo: true // Valor por defecto
      },
      estado: tramiteBandeja.estado.nombre as any,
      prioridad: tramiteBandeja.prioridad.nombre as any,
      fechaCreacion: new Date(tramiteBandeja.fechaCreacion),
      fechaActualizacion: tramiteBandeja.fechaActualizacion ? new Date(tramiteBandeja.fechaActualizacion) : undefined,
      fechaVencimiento: tramiteBandeja.fechaVencimiento ? new Date(tramiteBandeja.fechaVencimiento) : undefined,
      solicitante: {
        id: tramiteBandeja.solicitante.id,
        nombre: tramiteBandeja.solicitante.nombre,
        apellidos: tramiteBandeja.solicitante.apellidos,
        correo: tramiteBandeja.solicitante.correo,
        usuario: tramiteBandeja.solicitante.correo, 
        area: {
          id: 0,
          nombre: tramiteBandeja.solicitante.area || 'Sin área',
          descripcion: '',
          activa: true
        },
        role: {
          id: 1,
          name: 'USUARIO',
          description: 'Usuario estándar'
        }
      },
      documentos: (tramiteBandeja.documentos || []).map(doc => ({
        id: doc.id,
        tramiteId: tramiteBandeja.id,
        nombre: doc.nombre,
        nombreOriginal: doc.nombreOriginal,
        ruta: '', // No disponible en DocumentoBandeja
        tamano: doc.tamano, // Nota: tamano (sin ñ) en ambas interfaces
        tipo: doc.tipo,
        fechaSubida: new Date(doc.fechaSubida),
        version: doc.version,
        usuarioSubida: {
          id: tramiteBandeja.solicitante.id,
          nombre: tramiteBandeja.solicitante.nombre,
          apellidos: tramiteBandeja.solicitante.apellidos,
          correo: tramiteBandeja.solicitante.correo,
          usuario: tramiteBandeja.solicitante.correo, 
          area: {
            id: 0,
            nombre: tramiteBandeja.solicitante.area || 'Sin área',
            descripcion: '',
            activa: true
          },
          role: {
            id: 1,
            name: 'USUARIO',
            description: 'Usuario estándar'
          }
        }
      })),
      areaOrigen: {
        id: tramiteBandeja.areaOrigen.id,
        nombre: tramiteBandeja.areaOrigen.nombre,
        descripcion: '',
        activa: true
      },
      historial: (tramiteBandeja.historial || []).map(hist => ({
        id: hist.id,
        tramiteId: tramiteBandeja.id,
        estadoAnterior: hist.estadoAnterior ? {
          id: 0,
          nombre: hist.estadoAnterior,
          descripcion: '',
          color: '',
          icono: '',
          esFinal: false,
          permiteEdicion: false
        } : undefined,
        estadoNuevo: {
          id: 0,
          nombre: hist.estadoNuevo,
          descripcion: '',
          color: '',
          icono: '',
          esFinal: false,
          permiteEdicion: false
        },
        usuario: {
          id: hist.usuarioId,
          nombre: hist.usuario,
          apellidos: '',
          correo: '',
          usuario: hist.usuario,
          area: {
            id: 0,
            nombre: hist.area || 'Sin área',
            descripcion: '',
            activa: true
          },
          role: {
            id: 1,
            name: 'USUARIO',
            description: 'Usuario estándar'
          }
        },
        fecha: new Date(hist.fecha),
        descripcion: hist.descripcion,
        observaciones: hist.observaciones,
        accion: {
          id: 0,
          nombre: hist.accion.nombre,
          descripcion: '',
          icono: hist.accion.icono,
          color: hist.accion.color
        },
        area: hist.area ? {
          id: 0,
          nombre: hist.area,
          descripcion: '',
          activa: true
        } : undefined
      }))
    };
  }

  onTramiteRespondido(response: any) {
    // Refrescar la lista de trámites
    this.cargarTramites();
    // Actualizar estadísticas
    this.cargarEstadisticas();
    this.toastService.success('Trámite respondido exitosamente', 'El trámite ha sido procesado y se notificó al solicitante');
  }

  onTramiteEditado(response: any) {

    // Refrescar la lista de trámites
    this.cargarTramites();
    // Actualizar estadísticas
    this.cargarEstadisticas();
    this.toastService.success('Trámite actualizado exitosamente', 'Los cambios han sido guardados correctamente');
  }

  // Verificar si puede aprobar un trámite
  puedeAprobar(tramite: TramiteBandeja): boolean {

    const estadosParaAprobar = ['DERIVADO', 'Derivado'];
    const puede = estadosParaAprobar.includes(tramite.estado.nombre);

    return puede;
  }

  // Verificar si puede responder un trámite
  puedeResponder(tramite: TramiteBandeja): boolean {


    const estadosParaResponder = ['DERIVADO', 'Derivado', 'APROBADO', 'Aprobado', 'EN_PROCESO', 'En Proceso'];
    const puede = estadosParaResponder.includes(tramite.estado.nombre);

    return puede;
  }

  // Verificar si debe mostrar el botón derivar
  puedeMostrarDerivar(tramite: TramiteBandeja): boolean {

    const estadosDerivados = ['DERIVADO', 'Derivado'];
    const puede = tramite.puedeDerivar && !estadosDerivados.includes(tramite.estado.nombre);

    return puede;
  }

  // Utilidades
  getEstadoClase(estado: string): string {
    const clases: { [key: string]: string } = {
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatearFechaRelativa(fecha: Date): string {
    const ahora = new Date();
    const diferencia = ahora.getTime() - new Date(fecha).getTime();
    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (minutos < 60) {
      return `Hace ${minutos} min`;
    } else if (horas < 24) {
      return `Hace ${horas}h`;
    } else if (dias < 7) {
      return `Hace ${dias}d`;
    } else {
      return this.formatearFecha(fecha);
    }
  }

  getDiasVencimiento(fechaVencimiento?: Date): number | null {
    if (!fechaVencimiento) return null;
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  getUrgenciaClass(tramite: TramiteBandeja): string {
    if (tramite.diasVencimiento !== undefined && tramite.diasVencimiento < 0) {
      return 'vencido';
    }
    if (tramite.diasVencimiento !== undefined && tramite.diasVencimiento <= 2) {
      return 'urgente';
    }
    if (tramite.prioridad.nivel >= 3) {
      return 'alta-prioridad';
    }
    return '';
  }

  // Filter method for template
  filterTramites(property: string, value: any): TramiteBandeja[] {
    return this.tramites.filter(tramite => {
      const properties = property.split('.');
      let obj: any = tramite;
      
      for (const prop of properties) {
        if (obj && obj[prop] !== undefined) {
          obj = obj[prop];
        } else {
          return false;
        }
      }
      
      return obj === value;
    });
  }

  // Métodos para exportar trámites
  exportarTramite(tramite: TramiteBandeja) {
    this.subscriptions.add(
      this.bandejaTramitesService.exportarTramites([tramite.id]).subscribe({
        next: (blob) => {
          this.descargarArchivo(blob, `tramite_${tramite.codigo}.pdf`);
          this.toastService.success('Trámite exportado', `El trámite ${tramite.codigo} se ha exportado correctamente`);
        },
        error: (error) => {
          this.toastService.error('Error al exportar', 'No se pudo exportar el trámite');
        }
      })
    );
  }

  exportarTramitesSeleccionados() {
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

  // Métodos para archivar trámites
  archivarTramite(tramite: TramiteBandeja) {
    this.subscriptions.add(
      this.bandejaTramitesService.archivarTramites([tramite.id]).subscribe({
        next: (response) => {
          this.toastService.success('Trámite archivado', `El trámite ${tramite.codigo} se ha archivado correctamente`);
          this.cargarTramites(); // Recargar la lista
        },
        error: (error) => {
          this.toastService.error('Error al archivar', 'No se pudo archivar el trámite');
        }
      })
    );
  }

  archivarTramitesSeleccionados() {
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

  // Método auxiliar para descargar archivos
  private descargarArchivo(blob: Blob, nombreArchivo: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  trackByTramiteId(index: number, tramite: TramiteBandeja): number {
    return tramite.id;
  }

  // Generar páginas visibles para paginación
  getPaginasVisibles(): number[] {
    const totalPaginas = this.totalPages;
    const paginaActual = this.currentPage;
    const paginas: number[] = [];
    
    if (totalPaginas <= 7) {
      // Si hay 7 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // Lógica más robusta para páginas visibles
      let inicio: number;
      let fin: number;

      if (paginaActual <= 4) {
        // Si estamos cerca del inicio
        inicio = 1;
        fin = 5;
      } else if (paginaActual >= totalPaginas - 3) {
        // Si estamos cerca del final
        inicio = totalPaginas - 4;
        fin = totalPaginas;
      } else {
        // Si estamos en el medio
        inicio = paginaActual - 2;
        fin = paginaActual + 2;
      }
      
      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
    }
    
    return paginas;
  }

  // Auto-finalizar trámites vencidos
  private autoFinalizarTramitesVencidos() {
    const ahora = new Date();
    const tramitesParaFinalizar: number[] = [];

    this.tramites.forEach(tramite => {
      // Verificar si el trámite está vencido y no está ya finalizado
      const estaVencido = tramite.fechaVencimiento && new Date(tramite.fechaVencimiento) < ahora;
      const noEstaFinalizado = tramite.estado.nombre !== 'FINALIZADO' && tramite.estado.nombre !== 'ARCHIVADO';
      const estaActivo = tramite.estado.nombre !== 'INACTIVO' && tramite.estado.nombre !== 'CANCELADO';

      if (estaVencido && noEstaFinalizado && estaActivo) {

        tramitesParaFinalizar.push(tramite.id);
      }

      // También verificar si está marcado como dado de baja o inactivo
      if ((tramite.estado.nombre === 'INACTIVO' || tramite.estado.nombre === 'DADO_DE_BAJA') && noEstaFinalizado) {

        tramitesParaFinalizar.push(tramite.id);
      }
    });

    // Finalizar trámites en lote si hay alguno
    if (tramitesParaFinalizar.length > 0) {
      this.finalizarTramitesEnLote(tramitesParaFinalizar);
    }
  }

  private finalizarTramitesEnLote(tramiteIds: number[]) {
    const observaciones = 'Auto-finalizado por vencimiento o inactividad del trámite';

    tramiteIds.forEach(tramiteId => {
      // Cambiar estado individual del trámite a FINALIZADO
      this.subscriptions.add(
        this.bandejaTramitesService.cambiarEstadoTramitePorNombre(tramiteId, 'FINALIZADO', observaciones)
          .subscribe({
            next: () => {

              // Actualizar el estado en la lista local
              const tramite = this.tramites.find(t => t.id === tramiteId);
              if (tramite) {
                tramite.estado.nombre = 'FINALIZADO';
                tramite.estado.descripcion = 'Finalizado automáticamente';
              }
            },
            error: (error) => {
            }
          })
      );
    });

    // Mostrar toast informativo
    this.toastService.info(
      'Trámites auto-finalizados',
      `Se han finalizado automáticamente ${tramiteIds.length} trámite(s) vencido(s) o inactivo(s)`
    );

    // Recargar estadísticas después de un pequeño delay
    setTimeout(() => {
      this.cargarEstadisticas();
    }, 1000);
  }
}