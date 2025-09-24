
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  Tramite, 
  CrearTramiteRequest, 
  ActualizarEstadoRequest,
  FiltrosTramite,
  PaginacionResponse,
  TipoTramite,
  EstadoTramite,
  PrioridadTramite,
  DocumentoTramite
} from '../shared/interfaces/tramite.interface';
import { 
  TIPOS_TRAMITE, 
  ESTADOS_TRAMITE, 
  PRIORIDADES_TRAMITE 
} from '../shared/data/tramite-data';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  private apiUrl = `${environment.apiUrl}/api/tramites`;
  
  // Subjects para manejar el estado
  private tramitesSubject = new BehaviorSubject<Tramite[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public tramites$ = this.tramitesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  // Obtener todos los trámites con paginación y filtros
  getTramites(
    page: number = 1, 
    limit: number = 10, 
    filtros?: FiltrosTramite
  ): Observable<any> {
    this.loadingSubject.next(true);
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        const value = filtros[key as keyof FiltrosTramite];
        if (value !== undefined && value !== null && value !== '') {
          if (value instanceof Date) {
            params = params.set(key, value.toISOString().split('T')[0]);
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }

    return this.http.get<any>(`${this.apiUrl}`, { params })
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map((tramite: any) => this.mapTramiteFromBackend(tramite))
        })),
        tap(() => this.loadingSubject.next(false)),
        catchError(error => {
          this.loadingSubject.next(false);
          this.toastService.error(
            'Error al cargar trámites',
            'No se pudieron obtener los trámites. Inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

  // Obtener trámite por ID
  getTramiteById(id: number): Observable<Tramite> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(tramiteBackend => this.mapTramiteFromBackend(tramiteBackend)),
        catchError(error => {
          this.toastService.error(
            'Error al obtener trámite',
            'No se pudo obtener el detalle del trámite.'
          );
          throw error;
        })
      );
  }

  // Responder trámite
  responderTramite(tramiteId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${tramiteId}/responder`, formData)
      .pipe(
        tap(response => {
          this.toastService.success(
            'Trámite respondido',
            'El trámite ha sido respondido exitosamente y se ha notificado al solicitante.'
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al responder trámite',
            'No se pudo responder el trámite. Verifique los datos e intente nuevamente.'
          );
          throw error;
        })
      );
  }

  // Crear nuevo trámite
  crearTramite(tramite: CrearTramiteRequest): Observable<Tramite> {
    const formData = new FormData();
    
    // Agregar campos del trámite
    formData.append('tipoTramiteId', tramite.tipoTramiteId.toString());
    formData.append('asunto', tramite.asunto);
    formData.append('descripcion', tramite.descripcion);
    formData.append('prioridadId', tramite.prioridadId.toString());
    
    if (tramite.areaDestinoId) {
      formData.append('areaDestinoId', tramite.areaDestinoId.toString());
    }
    
    if (tramite.fechaVencimiento) {
      formData.append('fechaVencimiento', tramite.fechaVencimiento.toISOString());
    }

    // Agregar documentos
    if (tramite.documentos && tramite.documentos.length > 0) {
      tramite.documentos.forEach((documento, index) => {
        formData.append(`documentos`, documento, documento.name);
      });
    }

    return this.http.post<Tramite>(`${this.apiUrl}`, formData)
      .pipe(
        tap(nuevoTramite => {
          // Actualizar lista local
          const tramitesActuales = this.tramitesSubject.value;
          this.tramitesSubject.next([nuevoTramite, ...tramitesActuales]);
          
          this.toastService.success(
            'Trámite creado',
            `El trámite ${nuevoTramite.codigo} ha sido creado exitosamente.`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al crear trámite',
            'No se pudo crear el trámite. Verifica los datos e inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

  // Crear trámite con archivos en base64
  crearTramiteConArchivos(tramiteData: any): Observable<Tramite> {
    const request = {
      tipoTramiteId: tramiteData.tipoTramiteId,
      asunto: tramiteData.asunto,
      descripcion: tramiteData.descripcion,
      prioridadId: tramiteData.prioridadId,
      fechaVencimiento: tramiteData.fechaVencimiento ? new Date(tramiteData.fechaVencimiento).toISOString() : null,
      areaDestinoId: tramiteData.areaDestinoId,
      observaciones: tramiteData.observaciones,
      documentos: tramiteData.documentos || []
    };

    return this.http.post<Tramite>(`${this.apiUrl}/con-archivos`, request)
      .pipe(
        tap(nuevoTramite => {
          // Actualizar lista local
          const tramitesActuales = this.tramitesSubject.value;
          this.tramitesSubject.next([nuevoTramite, ...tramitesActuales]);
        }),
        catchError(error => {
          this.toastService.error(
            'Error al crear trámite',
            'No se pudo crear el trámite con los archivos. Verifica los datos e inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

  // Actualizar estado del trámite
  actualizarEstado(request: ActualizarEstadoRequest): Observable<Tramite> {
    return this.http.put<Tramite>(`${this.apiUrl}/${request.tramiteId}/estado`, request)
      .pipe(
        tap(tramiteActualizado => {
          // Actualizar en lista local
          const tramitesActuales = this.tramitesSubject.value;
          const tramitesActualizados = tramitesActuales.map(t => 
            t.id === tramiteActualizado.id ? tramiteActualizado : t
          );
          this.tramitesSubject.next(tramitesActualizados);

          const estadoNuevo = ESTADOS_TRAMITE.find(e => e.id === request.nuevoEstadoId);
          this.toastService.success(
            'Estado actualizado',
            `El trámite ${tramiteActualizado.codigo} cambió a "${estadoNuevo?.nombre}".`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al actualizar estado',
            'No se pudo actualizar el estado del trámite.'
          );
          throw error;
        })
      );
  }

  // Cambiar estado del trámite (usando parámetros del backend)
  cambiarEstado(tramiteId: number, nuevoEstado: string, observaciones?: string): Observable<any> {
    let params = new HttpParams().set('nuevoEstado', nuevoEstado);
    
    if (observaciones) {
      params = params.set('observaciones', observaciones);
    }

    return this.http.put<any>(`${this.apiUrl}/${tramiteId}/estado`, {}, { params })
      .pipe(
        tap(tramiteActualizado => {
          // Actualizar en lista local
          const tramitesActuales = this.tramitesSubject.value;
          const tramitesActualizados = tramitesActuales.map(t => 
            t.id === tramiteActualizado.id ? this.mapTramiteFromBackend(tramiteActualizado) : t
          );
          this.tramitesSubject.next(tramitesActualizados);

          this.toastService.success(
            'Estado actualizado',
            `El trámite ${tramiteActualizado.codigo} cambió a "${this.getEstadoNombreFromEnum(nuevoEstado)}".`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al cambiar estado',
            'No se pudo cambiar el estado del trámite.'
          );
          throw error;
        })
      );
  }

  // Actualizar trámite completo
  actualizarTramite(tramiteId: number, tramiteData: any): Observable<Tramite> {
    const request = {
      titulo: tramiteData.asunto,
      descripcion: tramiteData.descripcion,
      tipo: tramiteData.tipoId ? this.mapTipoTramiteToEnum(tramiteData.tipoId) : undefined,
      prioridad: tramiteData.prioridadId ? this.mapPrioridadToEnum(tramiteData.prioridadId) : undefined,
      observaciones: tramiteData.observaciones,
      fechaVencimiento: tramiteData.fechaVencimiento ? new Date(tramiteData.fechaVencimiento).toISOString() : null,
      areaDestinoId: tramiteData.areaDestinoId
    };

    return this.http.put<Tramite>(`${this.apiUrl}/${tramiteId}`, request)
      .pipe(
        tap(tramiteActualizado => {
          // Actualizar en lista local
          const tramitesActuales = this.tramitesSubject.value;
          const tramitesActualizados = tramitesActuales.map(t => 
            t.id === tramiteActualizado.id ? tramiteActualizado : t
          );
          this.tramitesSubject.next(tramitesActualizados);

          this.toastService.success(
            'Trámite actualizado',
            `El trámite ${tramiteActualizado.codigo} ha sido actualizado exitosamente.`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al actualizar trámite',
            'No se pudo actualizar el trámite. Verifica los datos e inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

  // Actualizar trámite con archivos en base64
  actualizarTramiteConArchivos(tramiteId: number, tramiteData: any): Observable<Tramite> {
    const request = {
      titulo: tramiteData.asunto,
      descripcion: tramiteData.descripcion,
      tipo: tramiteData.tipoId ? this.mapTipoTramiteToEnum(tramiteData.tipoId) : undefined,
      prioridad: tramiteData.prioridadId ? this.mapPrioridadToEnum(tramiteData.prioridadId) : undefined,
      observaciones: tramiteData.observaciones,
      fechaVencimiento: tramiteData.fechaVencimiento ? new Date(tramiteData.fechaVencimiento).toISOString() : null,
      areaDestinoId: tramiteData.areaDestinoId,
      documentos: tramiteData.documentos || [],
      documentosAEliminar: tramiteData.documentosAEliminar || []
    };

    return this.http.put<Tramite>(`${this.apiUrl}/${tramiteId}/con-archivos`, request)
      .pipe(
        tap(tramiteActualizado => {
          // Actualizar en lista local
          const tramitesActuales = this.tramitesSubject.value;
          const tramitesActualizados = tramitesActuales.map(t =>
            t.id === tramiteActualizado.id ? tramiteActualizado : t
          );
          this.tramitesSubject.next(tramitesActualizados);
        }),
        catchError(error => {
          this.toastService.error(
            'Error al actualizar trámite',
            'No se pudo actualizar el trámite con los archivos. Verifica los datos e inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

  // Subir documento adicional
  subirDocumento(tramiteId: number, archivo: File): Observable<DocumentoTramite> {
    const formData = new FormData();
    formData.append('documento', archivo, archivo.name);

    return this.http.post<DocumentoTramite>(`${this.apiUrl}/${tramiteId}/documentos`, formData)
      .pipe(
        tap(() => {
          this.toastService.success(
            'Documento subido',
            `El archivo "${archivo.name}" se subió correctamente.`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al subir documento',
            'No se pudo subir el archivo. Verifica el formato y tamaño.'
          );
          throw error;
        })
      );
  }

  // Eliminar documento
  eliminarDocumento(tramiteId: number, documentoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tramiteId}/documentos/${documentoId}`)
      .pipe(
        tap(() => {
          this.toastService.success(
            'Documento eliminado',
            'El documento ha sido eliminado correctamente.'
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al eliminar documento',
            'No se pudo eliminar el documento.'
          );
          throw error;
        })
      );
  }

  // Descargar documento
  descargarDocumento(tramiteId: number, nombreArchivo: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${tramiteId}/archivos/${nombreArchivo}`, {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        this.toastService.error(
          'Error al descargar documento',
          'No se pudo descargar el archivo.'
        );
        throw error;
      })
    );
  }

  // Obtener tipos de trámite
  getTiposTramite(): Observable<TipoTramite[]> {
    return this.http.get<TipoTramite[]>(`${this.apiUrl}/tipos`)
      .pipe(
        catchError(() => {
          // Fallback a datos locales si falla el API
          return of(TIPOS_TRAMITE);
        })
      );
  }

  // Obtener estados de trámite
  getEstadosTramite(): Observable<EstadoTramite[]> {
    return of(ESTADOS_TRAMITE);
  }

  // Obtener prioridades de trámite
  getPrioridadesTramite(): Observable<PrioridadTramite[]> {
    return this.http.get<PrioridadTramite[]>(`${this.apiUrl}/prioridades`)
      .pipe(
        catchError(() => {
          // Fallback a datos locales si falla el API
          return of(PRIORIDADES_TRAMITE);
        })
      );
  }

  // Generar código de trámite automático
  generarCodigoTramite(): Observable<string> {
    return this.http.get<{codigo: string}>(`${this.apiUrl}/generar-codigo`)
      .pipe(
        map(response => response.codigo),
        catchError(() => {
          // Generar código local como fallback
          const año = new Date().getFullYear();
          const timestamp = Date.now().toString().slice(-6);
          return of(`TR-${año}-${timestamp}`);
        })
      );
  }

  // Validar archivo antes de subir
  validarArchivo(archivo: File): { valido: boolean; mensaje?: string } {
    const tiposPermitidos = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      return {
        valido: false,
        mensaje: 'Solo se permiten archivos PDF, DOC y DOCX.'
      };
    }

    const tamañoMaximo = 10 * 1024 * 1024; // 10MB
    if (archivo.size > tamañoMaximo) {
      return {
        valido: false,
        mensaje: 'El archivo no debe superar los 10MB.'
      };
    }

    return { valido: true };
  }

  // Imprimir trámite (generar documento HTML para impresión)
  imprimirTramite(tramiteId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${tramiteId}/imprimir`, {
      responseType: 'blob',
      headers: {
        'Accept': 'text/html'
      }
    }).pipe(
      tap(() => {
        this.toastService.info(
          'Generando documento',
          'Preparando documento para impresión...'
        );
      }),
      catchError(error => {
        this.toastService.error(
          'Error al generar documento',
          'No se pudo generar el documento para impresión.'
        );
        throw error;
      })
    );
  }

  // Eliminar trámite
  eliminarTramite(tramiteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tramiteId}`)
      .pipe(
        tap(() => {
          // Remover del estado local
          const tramitesActuales = this.tramitesSubject.value;
          const tramitesActualizados = tramitesActuales.filter(t => t.id !== tramiteId);
          this.tramitesSubject.next(tramitesActualizados);
        }),
        catchError(error => {
          this.toastService.error(
            'Error al eliminar trámite',
            'No se pudo eliminar el trámite. Intente nuevamente.'
          );
          throw error;
        })
      );
  }

  // Mapear tramite desde backend
  private mapTramiteFromBackend(tramiteBackend: any): Tramite {
    return {
      id: tramiteBackend.id,
      codigo: tramiteBackend.codigo,
      asunto: tramiteBackend.titulo || tramiteBackend.asunto,
      descripcion: tramiteBackend.descripcion,
      fechaCreacion: new Date(tramiteBackend.fechaCreacion),
      fechaActualizacion: tramiteBackend.fechaActualizacion ? new Date(tramiteBackend.fechaActualizacion) : undefined,
      fechaVencimiento: tramiteBackend.fechaVencimiento ? new Date(tramiteBackend.fechaVencimiento) : undefined,
      observaciones: tramiteBackend.observaciones,
      tipoTramite: {
        id: this.getTipoTramiteIdFromEnum(tramiteBackend.tipo),
        nombre: this.getTipoTramiteNombreFromEnum(tramiteBackend.tipo),
        descripcion: '',
        requiereAprobacion: false,
        tiempoEstimado: 0,
        activo: true
      },
      estado: {
        id: this.getEstadoIdFromEnum(tramiteBackend.estado),
        nombre: this.getEstadoNombreFromEnum(tramiteBackend.estado),
        descripcion: '',
        color: this.getEstadoColorFromEnum(tramiteBackend.estado),
        icono: this.getEstadoIconoFromEnum(tramiteBackend.estado),
        esFinal: this.isEstadoFinal(tramiteBackend.estado),
        permiteEdicion: this.permiteEdicionEstado(tramiteBackend.estado)
      },
      prioridad: {
        id: this.getPrioridadIdFromEnum(tramiteBackend.prioridad),
        nombre: this.getPrioridadNombreFromEnum(tramiteBackend.prioridad),
        descripcion: '',
        nivel: this.getPrioridadNivelFromEnum(tramiteBackend.prioridad),
        color: this.getPrioridadColorFromEnum(tramiteBackend.prioridad),
        icono: this.getPrioridadIconoFromEnum(tramiteBackend.prioridad)
      },
      solicitante: {
        id: tramiteBackend.usuarioSolicitante?.id || 0,
        nombre: tramiteBackend.usuarioSolicitante?.nombre || 'Usuario',
        apellidos: tramiteBackend.usuarioSolicitante?.apellidos || 'Solicitante',
        correo: tramiteBackend.usuarioSolicitante?.correo || '',
        usuario: tramiteBackend.usuarioSolicitante?.usuario || '',
        foto: tramiteBackend.usuarioSolicitante?.foto,
        area: {
          id: tramiteBackend.areaOrigen?.id || 0,
          nombre: tramiteBackend.areaOrigen?.nombre || 'Área no especificada',
          descripcion: tramiteBackend.areaOrigen?.descripcion || '',
          activa: tramiteBackend.areaOrigen?.activa || true
        },
        role: {
          id: tramiteBackend.usuarioSolicitante?.role?.id || 0,
          name: tramiteBackend.usuarioSolicitante?.role?.name || '',
          description: tramiteBackend.usuarioSolicitante?.role?.description || ''
        }
      },
      areaOrigen: {
        id: tramiteBackend.areaOrigen?.id || 0,
        nombre: tramiteBackend.areaOrigen?.nombre || 'Área no especificada',
        descripcion: tramiteBackend.areaOrigen?.descripcion || '',
        activa: tramiteBackend.areaOrigen?.activa || true
      },
      areaDestino: tramiteBackend.areaActual ? {
        id: tramiteBackend.areaActual.id,
        nombre: tramiteBackend.areaActual.nombre,
        descripcion: tramiteBackend.areaActual.descripcion || '',
        activa: tramiteBackend.areaActual.activa || true
      } : undefined,
      trabajadorAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id,
        nombre: tramiteBackend.usuarioAsignado.nombre,
        apellidos: tramiteBackend.usuarioAsignado.apellidos,
        correo: tramiteBackend.usuarioAsignado.correo,
        usuario: tramiteBackend.usuarioAsignado.usuario,
        foto: tramiteBackend.usuarioAsignado.foto,
        area: tramiteBackend.usuarioAsignado.area || { id: 0, nombre: '', descripcion: '', activa: true },
        role: tramiteBackend.usuarioAsignado.role || { id: 0, name: '', description: '' }
      } : undefined,
      documentos: tramiteBackend.documentosAdjuntos || [],
      historial: tramiteBackend.historial || []
    };
  }

  // Métodos para manejar TIPO TRAMITE desde enum backend
  private getTipoTramiteIdFromEnum(tipoEnum: string): number {
    const tiposMap: { [key: string]: number } = {
      'SOLICITUD_CERTIFICADO': 1,
      'SOLICITUD_CONSTANCIA': 2,
      'SOLICITUD_PERMISO': 3,
      'RECLAMO': 4,
      'SUGERENCIA': 5,
      'CONSULTA': 6,
      'LICENCIA': 7,
      'AUTORIZACION': 8,
      'REVISION_EXPEDIENTE': 9,
      'TRAMITE_ACADEMICO': 10,
      'TRAMITE_ADMINISTRATIVO': 11,
      'OTRO': 12
    };
    return tiposMap[tipoEnum] || 1;
  }

  private getTipoTramiteNombreFromEnum(tipoEnum: string): string {
    const tiposMap: { [key: string]: string } = {
      'SOLICITUD_CERTIFICADO': 'Solicitud de Certificado',
      'SOLICITUD_CONSTANCIA': 'Solicitud de Constancia',
      'SOLICITUD_PERMISO': 'Solicitud de Permiso',
      'RECLAMO': 'Reclamo',
      'SUGERENCIA': 'Sugerencia',
      'CONSULTA': 'Consulta',
      'LICENCIA': 'Licencia',
      'AUTORIZACION': 'Autorización',
      'REVISION_EXPEDIENTE': 'Revisión de Expediente',
      'TRAMITE_ACADEMICO': 'Trámite Académico',
      'TRAMITE_ADMINISTRATIVO': 'Trámite Administrativo',
      'OTRO': 'Otro'
    };
    return tiposMap[tipoEnum] || 'Solicitud de Constancia';
  }

  // Métodos para manejar ESTADO desde enum backend
  private getEstadoIdFromEnum(estadoEnum: string): number {
    const estadosMap: { [key: string]: number } = {
      'BORRADOR': 1,
      'ENVIADO': 2,
      'EN_REVISION': 3,
      'DERIVADO': 4,
      'OBSERVADO': 5,
      'EN_PROCESO': 6,
      'APROBADO': 7,
      'RECHAZADO': 8,
      'FINALIZADO': 9,
      'ARCHIVADO': 10,
      'CANCELADO': 11
    };
    return estadosMap[estadoEnum] || 1;
  }

  private getEstadoNombreFromEnum(estadoEnum: string): string {
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
      'CANCELADO': 'Cancelado'
    };
    return estadosMap[estadoEnum] || 'Borrador';
  }

  private getEstadoColorFromEnum(estadoEnum: string): string {
    const colores: { [key: string]: string } = {
      'BORRADOR': '#6c757d',
      'ENVIADO': '#007bff',
      'EN_REVISION': '#ffc107',
      'DERIVADO': '#17a2b8',
      'OBSERVADO': '#fd7e14',
      'EN_PROCESO': '#20c997',
      'APROBADO': '#28a745',
      'RECHAZADO': '#dc3545',
      'FINALIZADO': '#6f42c1',
      'ARCHIVADO': '#343a40',
      'CANCELADO': '#6c757d'
    };
    return colores[estadoEnum] || '#6c757d';
  }

  private getEstadoIconoFromEnum(estadoEnum: string): string {
    const iconos: { [key: string]: string } = {
      'BORRADOR': 'fas fa-edit',
      'ENVIADO': 'fas fa-paper-plane',
      'EN_REVISION': 'fas fa-search',
      'DERIVADO': 'fas fa-share',
      'OBSERVADO': 'fas fa-exclamation-triangle',
      'EN_PROCESO': 'fas fa-cog',
      'APROBADO': 'fas fa-check-circle',
      'RECHAZADO': 'fas fa-times-circle',
      'FINALIZADO': 'fas fa-flag-checkered',
      'ARCHIVADO': 'fas fa-archive',
      'CANCELADO': 'fas fa-ban'
    };
    return iconos[estadoEnum] || 'fas fa-file';
  }

  private isEstadoFinal(estadoEnum: string): boolean {
    const finales = ['FINALIZADO', 'ARCHIVADO', 'CANCELADO'];
    return finales.includes(estadoEnum);
  }

  private permiteEdicionEstado(estadoEnum: string): boolean {
    const noPermiteEdicion = ['FINALIZADO', 'ARCHIVADO', 'CANCELADO'];
    return !noPermiteEdicion.includes(estadoEnum);
  }

  // Métodos para manejar PRIORIDAD desde enum backend
  private getPrioridadIdFromEnum(prioridadEnum: string): number {
    const prioridadesMap: { [key: string]: number } = {
      'BAJA': 1,
      'NORMAL': 2,
      'ALTA': 3,
      'URGENTE': 4
    };
    return prioridadesMap[prioridadEnum] || 2;
  }

  private getPrioridadNombreFromEnum(prioridadEnum: string): string {
    const prioridadesMap: { [key: string]: string } = {
      'BAJA': 'Baja',
      'NORMAL': 'Normal',
      'ALTA': 'Alta',
      'URGENTE': 'Urgente'
    };
    return prioridadesMap[prioridadEnum] || 'Normal';
  }

  private getPrioridadNivelFromEnum(prioridadEnum: string): number {
    const niveles: { [key: string]: number } = {
      'BAJA': 1,
      'NORMAL': 2,
      'ALTA': 3,
      'URGENTE': 4
    };
    return niveles[prioridadEnum] || 2;
  }

  private getPrioridadColorFromEnum(prioridadEnum: string): string {
    const colores: { [key: string]: string } = {
      'BAJA': '#28a745',
      'NORMAL': '#17a2b8', 
      'ALTA': '#ffc107',
      'URGENTE': '#dc3545'
    };
    return colores[prioridadEnum] || '#17a2b8';
  }

  private getPrioridadIconoFromEnum(prioridadEnum: string): string {
    const iconos: { [key: string]: string } = {
      'BAJA': 'fas fa-arrow-down',
      'NORMAL': 'fas fa-minus',
      'ALTA': 'fas fa-arrow-up',
      'URGENTE': 'fas fa-exclamation'
    };
    return iconos[prioridadEnum] || 'fas fa-minus';
  }

  // Obtener nombre de tipo de trámite por ID
  private getTipoTramiteNombre(tipoId: number): string {
    const tipo = TIPOS_TRAMITE.find(t => t.id === tipoId);
    return tipo?.nombre || '';
  }

  // Obtener nombre de prioridad por ID
  private getPrioridadTramiteNombre(prioridadId: number): string {
    const prioridad = PRIORIDADES_TRAMITE.find(p => p.id === prioridadId);
    return prioridad?.nombre || '';
  }

  // Mapeo de frontend ID a backend enum para tipos de trámite
  private mapTipoTramiteToEnum(tipoId: number): string {
    const tipoMap: { [key: number]: string } = {
      1: 'TRAMITE_ADMINISTRATIVO',  // Resolución Rectoral
      2: 'TRAMITE_ADMINISTRATIVO',  // Resolución Decanal
      3: 'SOLICITUD_CERTIFICADO',   // Certificación de Documentos
      4: 'AUTORIZACION',            // Autorización de Eventos
      5: 'SOLICITUD_PERMISO',       // Permisos de Infraestructura
      6: 'TRAMITE_ADMINISTRATIVO'   // Convenios Interinstitucionales
    };
    return tipoMap[tipoId] || 'OTRO';
  }

  // Mapeo de frontend ID a backend enum para prioridades
  private mapPrioridadToEnum(prioridadId: number): string {
    const prioridadMap: { [key: number]: string } = {
      1: 'BAJA',
      2: 'NORMAL',
      3: 'ALTA',
      4: 'URGENTE'
    };
    return prioridadMap[prioridadId] || 'NORMAL';
  }

  // Limpiar estado local
  clearTramites(): void {
    this.tramitesSubject.next([]);
  }
}