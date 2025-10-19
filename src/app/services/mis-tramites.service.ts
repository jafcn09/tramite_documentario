import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  MiTramite, 
  FiltrosMisTramites, 
  EstadisticasMisTramites,
  EditarMiTramiteRequest,
  AprobarTramiteRequest,
  AprobarTramiteResponse,
  DocumentoMiTramite
} from '../shared/interfaces/mis-tramites.interface';
import { PaginacionResponse } from '../shared/interfaces/tramite.interface';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MisTramitesService {
  private apiUrl = `${environment.apiUrl}/api/tramites`;
  

  private misTramitesSubject = new BehaviorSubject<MiTramite[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public misTramites$ = this.misTramitesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private authService: AuthService
  ) {}
  getMisTramites(
    page: number = 1, 
    limit: number = 12, 
    filtros?: FiltrosMisTramites
  ): Observable<PaginacionResponse<MiTramite>> {
    this.loadingSubject.next(true);
    
    let params = new HttpParams()
      .set('page', (page - 1).toString()) 
      .set('size', limit.toString());

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        const value = filtros[key as keyof FiltrosMisTramites];
        if (value !== undefined && value !== null && value !== '') {
          if (value instanceof Date) {
            params = params.set(key, value.toISOString().split('T')[0]);
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }

    return this.http.get<any>(`${this.apiUrl}/mis-tramites`, { params })
      .pipe(
        map(response => ({
          data: this.mapTramitesToFrontendFormat(response.content || []),
          total: response.totalElements || 0,
          page: page,
          limit: limit,
          totalPages: response.totalPages || 0
        })),
        tap(() => this.loadingSubject.next(false)),
        catchError(error => {
          this.loadingSubject.next(false);
          this.toastService.error(
            'Error al cargar trámites',
            'No se pudieron obtener tus trámites. Inténtalo nuevamente.'
          );
       
          return of({
            data: [],
            total: 0,
            page: page,
            limit: limit,
            totalPages: 0
          });
        })
      );
  }


  getEstadisticas(): Observable<EstadisticasMisTramites> {
    return this.http.get<any>(`${this.apiUrl}/mis-tramites/estadisticas`)
      .pipe(
        map(response => ({
          total: response.total || 0,
          borrador: response.estado_BORRADOR || 0,
          enviado: response.estado_ENVIADO || 0,
          enRevision: response.estado_EN_REVISION || 0,
          derivado: response.estado_DERIVADO || 0,
          observado: response.estado_OBSERVADO || 0,
          aprobado: response.estado_APROBADO || 0,
          finalizado: response.estado_FINALIZADO || 0,
          promedioDias: response.promedioDias || 0,
          calificacionPromedio: response.calificacionPromedio || 0
        })),
        catchError(error => {
          this.toastService.error(
            'Error al cargar estadísticas',
            'No se pudieron obtener las estadísticas de tus trámites.'
          );

          return of({
            total: 0,
            borrador: 0,
            enviado: 0,
            enRevision: 0,
            derivado: 0,
            observado: 0,
            aprobado: 0,
            finalizado: 0,
            promedioDias: 0,
            calificacionPromedio: 0
          });
        })
      );
  }


  getMiTramiteById(id: number): Observable<MiTramite> {

    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(tramiteBackend => {

          const mappedTramite = this.mapSingleTramiteToFrontendFormat(tramiteBackend);

          return mappedTramite;
        }),
        catchError(error => {
          this.toastService.error(
            'Error al obtener trámite',
            'No se pudo obtener el detalle del trámite.'
          );
          throw error;
        })
      );
  }

  editarMiTramite(tramiteId: number, request: EditarMiTramiteRequest | FormData): Observable<MiTramite> {
    return this.http.put<MiTramite>(`${this.apiUrl}/${tramiteId}/editar`, request)
      .pipe(
        tap(tramiteActualizado => {
          this.toastService.success(
            'Trámite actualizado',
            `El trámite ${tramiteActualizado.codigo} ha sido actualizado exitosamente. Se ha enviado una notificación por correo.`
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


  subirDocumento(tramiteId: number, archivo: File, descripcion?: string): Observable<void> {
    const formData = new FormData();
    formData.append('documento', archivo, archivo.name);
    if (descripcion) {
      formData.append('descripcion', descripcion);
    }

    return this.http.post<void>(`${this.apiUrl}/${tramiteId}/archivos`, formData)
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

  descargarDocumento(tramiteId: number, nombreArchivo: string): Observable<Blob> {
    const url = `${this.apiUrl}/${tramiteId}/archivos/${nombreArchivo}`;

    return this.http.get(url, {
      responseType: 'blob'
    }).pipe(
      tap(blob => {

      }),
      catchError(error => {

        this.toastService.error(
          'Error al descargar documento',
          'No se pudo descargar el archivo.'
        );
        throw error;
      })
    );
  }


  descargarTodosDocumentos(tramiteId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${tramiteId}/documentos/descargar-todos`, {
      responseType: 'blob'
    }).pipe(
      tap(() => {
        this.toastService.info(
          'Preparando descarga',
          'Se está generando el archivo ZIP con todos los documentos.'
        );
      }),
      catchError(error => {
        this.toastService.error(
          'Error al descargar documentos',
          'No se pudieron descargar los archivos.'
        );
        throw error;
      })
    );
  }

  // Eliminar documento de mi trámite
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


  validarArchivo(archivo: File): { valido: boolean; mensaje?: string } {
    const tiposPermitidos = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      return {
        valido: false,
        mensaje: 'Solo se permiten archivos PDF, DOC, DOCX'
      };
    }

    const tamañoMaximo = 10 * 1024 * 1024; 
    if (archivo.size > tamañoMaximo) {
      return {
        valido: false,
        mensaje: 'El archivo no debe superar los 10MB.'
      };
    }

    return { valido: true };
  }


  getNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notificaciones`)
      .pipe(
        catchError(error => {
          return of([]);
        })
      );
  }

  marcarNotificacionLeida(notificacionId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/notificaciones/${notificacionId}/leer`, {})
      .pipe(
        catchError(error => {
          return of();
        })
      );
  }


  private mapSingleTramiteToFrontendFormat(tramiteBackend: any): MiTramite {

    // Mapear documentos si existen
    const documentosMapeados = this.mapDocumentos(tramiteBackend.documentos);

    const tramiteMapeado = {
      id: tramiteBackend.id,
      codigo: tramiteBackend.codigo,
      tipoTramite: {
        id: this.mapTipoTramiteStringToId(tramiteBackend.tipo),
        nombre: this.mapTipoTramiteStringToName(tramiteBackend.tipo),
        descripcion: tramiteBackend.tipo || ''
      },
      asunto: tramiteBackend.titulo || tramiteBackend.asunto || '',
      descripcion: tramiteBackend.descripcion || '',
      estado: {
        id: this.mapEstadoStringToId(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        nombre: tramiteBackend.estado?.nombre || this.mapEstadoStringToName(tramiteBackend.estado),
        color: this.mapEstadoStringToColor(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        icono: this.mapEstadoStringToIcon(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        descripcion: tramiteBackend.estado?.nombre || tramiteBackend.estado || ''
      },
      prioridad: {
        id: this.mapPrioridadStringToId(tramiteBackend.prioridad),
        nombre: this.mapPrioridadStringToName(tramiteBackend.prioridad),
        color: this.mapPrioridadStringToColor(tramiteBackend.prioridad),
        nivel: this.mapPrioridadStringToLevel(tramiteBackend.prioridad),
        icono: this.mapPrioridadStringToIcon(tramiteBackend.prioridad)
      },
      fechaCreacion: new Date(tramiteBackend.fechaCreacion),
      fechaActualizacion: tramiteBackend.fechaActualizacion ? new Date(tramiteBackend.fechaActualizacion) : undefined,
      fechaVencimiento: tramiteBackend.fechaVencimiento ? new Date(tramiteBackend.fechaVencimiento) : undefined,
      fechaRespuesta: tramiteBackend.fechaRespuesta ? new Date(tramiteBackend.fechaRespuesta) : undefined,
      areaDestino: tramiteBackend.areaActual ? {
        id: tramiteBackend.areaActual.id || 0,
        nombre: tramiteBackend.areaActual.nombre || ''
      } : undefined,
      trabajadorAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id || 0,
        nombre: tramiteBackend.usuarioAsignado.nombre || '',
        apellidos: tramiteBackend.usuarioAsignado.apellidos || ''
      } : undefined,
      usuarioRespondio: tramiteBackend.usuarioRespondio ? {
        id: tramiteBackend.usuarioRespondio.id || 0,
        nombre: tramiteBackend.usuarioRespondio.nombre || '',
        apellidos: tramiteBackend.usuarioRespondio.apellidos || ''
      } : undefined,
   
      usuarioSolicitante: tramiteBackend.usuarioSolicitante ? {
        id: tramiteBackend.usuarioSolicitante.id || 0,
        nombre: tramiteBackend.usuarioSolicitante.nombre || '',
        apellidos: tramiteBackend.usuarioSolicitante.apellidos || '',
        correo: tramiteBackend.usuarioSolicitante.correo || ''
      } : undefined,
      documentos: documentosMapeados,
      historial: tramiteBackend.historial || [],
      observaciones: tramiteBackend.observaciones,
      respuesta: tramiteBackend.respuesta,
      calificacion: tramiteBackend.calificacion,
      puedeEditar: tramiteBackend.puedeEditar || false,
      puedeCalificar: tramiteBackend.puedeCalificar || false,
      estaVencido: tramiteBackend.estaVencido || false,
      diasRestantes: tramiteBackend.diasRestantes
    };

    return tramiteMapeado;
  }

  private mapTramitesToFrontendFormat(tramitesBackend: any[]): MiTramite[] {
    return tramitesBackend.map(tramiteBackend => ({
      id: tramiteBackend.id,
      codigo: tramiteBackend.codigo,
      tipoTramite: {
        id: this.mapTipoTramiteStringToId(tramiteBackend.tipo),
        nombre: this.mapTipoTramiteStringToName(tramiteBackend.tipo),
        descripcion: tramiteBackend.tipo || ''
      },
      asunto: tramiteBackend.titulo || tramiteBackend.asunto || '',
      descripcion: tramiteBackend.descripcion || '',
      estado: {
        id: this.mapEstadoStringToId(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        nombre: tramiteBackend.estado?.nombre || this.mapEstadoStringToName(tramiteBackend.estado),
        color: this.mapEstadoStringToColor(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        icono: this.mapEstadoStringToIcon(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        descripcion: tramiteBackend.estado?.nombre || tramiteBackend.estado || ''
      },
      prioridad: {
        id: this.mapPrioridadStringToId(tramiteBackend.prioridad),
        nombre: this.mapPrioridadStringToName(tramiteBackend.prioridad),
        color: this.mapPrioridadStringToColor(tramiteBackend.prioridad),
        nivel: this.mapPrioridadStringToLevel(tramiteBackend.prioridad),
        icono: this.mapPrioridadStringToIcon(tramiteBackend.prioridad)
      },
      fechaCreacion: new Date(tramiteBackend.fechaCreacion),
      fechaActualizacion: tramiteBackend.fechaActualizacion ? new Date(tramiteBackend.fechaActualizacion) : undefined,
      fechaVencimiento: tramiteBackend.fechaVencimiento ? new Date(tramiteBackend.fechaVencimiento) : undefined,
      areaDestino: tramiteBackend.areaDestino ? {
        id: tramiteBackend.areaDestino.id || 0,
        nombre: tramiteBackend.areaDestino.nombre || tramiteBackend.areaDestino
      } : undefined,
      trabajadorAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id || 0,
        nombre: tramiteBackend.usuarioAsignado.nombre || '',
        apellidos: tramiteBackend.usuarioAsignado.apellidos || ''
      } : undefined,
      usuarioAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id || 0,
        nombre: tramiteBackend.usuarioAsignado.nombre || '',
        apellidos: tramiteBackend.usuarioAsignado.apellidos || ''
      } : undefined,
      usuarioSolicitante: tramiteBackend.usuarioSolicitante ? {
        id: tramiteBackend.usuarioSolicitante.id || 0,
        nombre: tramiteBackend.usuarioSolicitante.nombre || '',
        apellidos: tramiteBackend.usuarioSolicitante.apellidos || '',
        correo: tramiteBackend.usuarioSolicitante.correo || ''
      } : undefined,
      documentos: tramiteBackend.documentos || [],
      historial: tramiteBackend.historial || [],
      observaciones: tramiteBackend.observaciones,
      respuesta: tramiteBackend.respuesta,
      fechaRespuesta: tramiteBackend.fechaRespuesta ? new Date(tramiteBackend.fechaRespuesta) : undefined,
      usuarioRespondio: tramiteBackend.usuarioRespondio ? {
        id: tramiteBackend.usuarioRespondio.id || 0,
        nombre: tramiteBackend.usuarioRespondio.nombre || '',
        apellidos: tramiteBackend.usuarioRespondio.apellidos || ''
      } : undefined,
      calificacion: tramiteBackend.calificacion,
      puedeEditar: tramiteBackend.puedeEditar || false,
      puedeCalificar: tramiteBackend.puedeCalificar || false,
      estaVencido: tramiteBackend.estaVencido || false,
      diasRestantes: tramiteBackend.diasRestantes
    }));
  }


  private mapTipoTramiteStringToId(tipo: string): number {
    const tipoMap: { [key: string]: number } = {
      'SOLICITUD_CONSTANCIA': 1,
      'SOLICITUD_CERTIFICADO': 2,
      'SOLICITUD_PERMISO': 3,
      'SOLICITUD_LICENCIA': 4,
      'RECLAMO': 5,
      'SUGERENCIA': 6
    };
    return tipoMap[tipo] || 1;
  }

  private mapTipoTramiteStringToName(tipo: string): string {
    const tipoMap: { [key: string]: string } = {
      'SOLICITUD_CONSTANCIA': 'Solicitud de Constancia',
      'SOLICITUD_CERTIFICADO': 'Solicitud de Certificado',
      'SOLICITUD_PERMISO': 'Solicitud de Permiso',
      'SOLICITUD_LICENCIA': 'Solicitud de Licencia',
      'RECLAMO': 'Reclamo',
      'SUGERENCIA': 'Sugerencia'
    };
    return tipoMap[tipo] || tipo;
  }

  private mapEstadoStringToId(estado: string): number {
    const estadoMap: { [key: string]: number } = {
      'BORRADOR': 1,
      'ENVIADO': 2,
      'EN_REVISION': 3,
      'EN_PROCESO': 4,
      'DERIVADO': 5,
      'OBSERVADO': 6,
      'APROBADO': 7,
      'FINALIZADO': 8,
      // Mapeo para estados que lleguen en formato legible del backend
      'Borrador': 1,
      'Enviado': 2,
      'En Revisión': 3,
      'En Proceso': 4,
      'Derivado': 5,
      'Observado': 6,
      'Aprobado': 7,
      'Finalizado': 8
    };
    return estadoMap[estado] || 2;
  }

  private mapEstadoStringToName(estado: string): string {
    const estadoMap: { [key: string]: string } = {
      'BORRADOR': 'Borrador',
      'ENVIADO': 'Enviado',
      'EN_REVISION': 'En Revisión',
      'EN_PROCESO': 'En Proceso',
      'DERIVADO': 'Derivado',
      'OBSERVADO': 'Observado',
      'APROBADO': 'Aprobado',
      'FINALIZADO': 'Finalizado',
      // Si ya llega en formato legible, mantenerlo
      'Borrador': 'Borrador',
      'Enviado': 'Enviado',
      'En Revisión': 'En Revisión',
      'En Proceso': 'En Proceso',
      'Derivado': 'Derivado',
      'Observado': 'Observado',
      'Aprobado': 'Aprobado',
      'Finalizado': 'Finalizado'
    };
    return estadoMap[estado] || estado;
  }

  private mapEstadoStringToColor(estado: string): string {
    const colorMap: { [key: string]: string } = {
      'BORRADOR': '#6c757d',
      'ENVIADO': '#007bff',
      'EN_REVISION': '#ffc107',
      'EN_PROCESO': '#3498db',
      'DERIVADO': '#17a2b8',
      'OBSERVADO': '#fd7e14',
      'APROBADO': '#28a745',
      'FINALIZADO': '#6f42c1',
      // Mapeo para estados en formato legible
      'Borrador': '#6c757d',
      'Enviado': '#007bff',
      'En Revisión': '#ffc107',
      'En Proceso': '#3498db',
      'Derivado': '#17a2b8',
      'Observado': '#fd7e14',
      'Aprobado': '#28a745',
      'Finalizado': '#6f42c1'
    };
    return colorMap[estado] || '#007bff';
  }

  private mapEstadoStringToIcon(estado: string): string {
    const iconMap: { [key: string]: string } = {
      'BORRADOR': 'fas fa-edit',
      'ENVIADO': 'fas fa-paper-plane',
      'EN_REVISION': 'fas fa-search',
      'EN_PROCESO': 'fas fa-spinner',
      'DERIVADO': 'fas fa-share',
      'OBSERVADO': 'fas fa-exclamation-triangle',
      'APROBADO': 'fas fa-check-circle',
      'FINALIZADO': 'fas fa-flag-checkered',
      // Mapeo para estados en formato legible
      'Borrador': 'fas fa-edit',
      'Enviado': 'fas fa-paper-plane',
      'En Revisión': 'fas fa-search',
      'En Proceso': 'fas fa-spinner',
      'Derivado': 'fas fa-share',
      'Observado': 'fas fa-exclamation-triangle',
      'Aprobado': 'fas fa-check-circle',
      'Finalizado': 'fas fa-flag-checkered'
    };
    return iconMap[estado] || 'fas fa-file';
  }


  private mapPrioridadStringToId(prioridad: string): number {
    const prioridadMap: { [key: string]: number } = {
      'BAJA': 1,
      'NORMAL': 2,
      'ALTA': 3,
      'URGENTE': 4
    };
    return prioridadMap[prioridad] || 2;
  }

  private mapPrioridadStringToName(prioridad: string): string {
    const prioridadMap: { [key: string]: string } = {
      'BAJA': 'Baja',
      'NORMAL': 'Normal',
      'ALTA': 'Alta',
      'URGENTE': 'Urgente'
    };
    return prioridadMap[prioridad] || prioridad;
  }

  private mapPrioridadStringToColor(prioridad: string): string {
    const colorMap: { [key: string]: string } = {
      'BAJA': '#28a745',
      'NORMAL': '#007bff',
      'ALTA': '#ffc107',
      'URGENTE': '#dc3545'
    };
    return colorMap[prioridad] || '#007bff';
  }

  private mapPrioridadStringToLevel(prioridad: string): number {
    const levelMap: { [key: string]: number } = {
      'BAJA': 1,
      'NORMAL': 2,
      'ALTA': 3,
      'URGENTE': 4
    };
    return levelMap[prioridad] || 2;
  }

  private mapPrioridadStringToIcon(prioridad: string): string {
    const iconMap: { [key: string]: string } = {
      'BAJA': 'fas fa-arrow-down',
      'NORMAL': 'fas fa-minus',
      'ALTA': 'fas fa-arrow-up',
      'URGENTE': 'fas fa-exclamation-circle'
    };
    return iconMap[prioridad] || 'fas fa-minus';
  }

  private mapDocumentos(documentosBackend: any[]): DocumentoMiTramite[] {

    if (!documentosBackend || !Array.isArray(documentosBackend)) {

      return [];
    }

    const documentosMapeados = documentosBackend.map((doc: any, index: number) => {

      const documentoMapeado = {
        id: doc.id || 0,
        nombre: doc.nombre || doc.nombreArchivo || `documento_${index}`,
        nombreOriginal: doc.nombreOriginal || doc.nombre || doc.nombreArchivo || '',
        tamano: doc.tamano || doc.tamanio || doc.size || 0,
        tipo: doc.tipo || doc.tipoArchivo || doc.mimeType || 'application/octet-stream',
        fechaSubida: doc.fechaSubida ? new Date(doc.fechaSubida) : new Date(),
        esSubidoPorUsuario: doc.esSubidoPorUsuario || true,
        descripcion: doc.descripcion || ''
      };

      return documentoMapeado;
    });

    return documentosMapeados;
  }

  // Aprobar trámite (solo para administrativos)
  aprobarTramite(request: AprobarTramiteRequest): Observable<AprobarTramiteResponse> {
    return this.http.post<AprobarTramiteResponse>(`${this.apiUrl}/${request.tramiteId}/aprobar`, request)
      .pipe(
        tap((response) => {
          this.toastService.success(
            'Trámite aprobado',
            `El trámite ha sido aprobado exitosamente. Responsable asignado: ${response.responsableAsignado.nombre} ${response.responsableAsignado.apellidos}`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al aprobar trámite',
            'No se pudo aprobar el trámite. Inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

  
  rechazarTramite(tramiteId: number, motivoRechazo: string, observaciones?: string): Observable<any> {
    this.loadingSubject.next(true);

    const requestBody = {
      tramiteId: tramiteId,
      motivoRechazo: motivoRechazo,
      observaciones: observaciones
    };

    return this.http.put<any>(`${this.apiUrl}/${tramiteId}/rechazar`, requestBody)
      .pipe(
        tap(response => {
          this.loadingSubject.next(false);
          this.toastService.success(
            'Trámite rechazado',
            `El trámite ha sido rechazado exitosamente. Se notificó al usuario remitente.`
          );
        }),
        catchError(error => {
          this.loadingSubject.next(false);
          this.toastService.error(
            'Error al rechazar trámite',
            'No se pudo rechazar el trámite. Inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }
  clearMisTramites(): void {
    this.misTramitesSubject.next([]);
  }
}