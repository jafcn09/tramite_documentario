import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  FirmaDigital,
  FirmaDigitalRequest,
  FirmaDigitalResponse,
  FirmarDocumentoRequest,
  AutorizacionFirmaRequest,
  ResponderTramiteConFirmaRequest,
  EstadisticasFirmas,
  FiltrosFirma,
  PaginacionFirmas,
  FirmasResponse,
  EstadoFirma,
  EstadoAutorizacion,
  TipoFirma
} from '../shared/interfaces/firma-digital.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class FirmaDigitalService {
  private apiUrl = `${environment.apiUrl}/api/firmas-digitales`;

  private firmasSubject = new BehaviorSubject<FirmaDigitalResponse[]>([]);
  public firmas$ = this.firmasSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private estadisticasSubject = new BehaviorSubject<EstadisticasFirmas | null>(null);
  public estadisticas$ = this.estadisticasSubject.asObservable();

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  crearSolicitudFirma(request: FirmaDigitalRequest): Observable<FirmaDigitalResponse> {
    this.loadingSubject.next(true);
    return this.http.post<FirmaDigitalResponse>(this.apiUrl, request).pipe(
      tap(response => {
        this.toastService.success(
          'Solicitud Creada',
          'La solicitud de firma digital ha sido creada exitosamente'
        );
        this.cargarFirmas();
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Crear Solicitud',
          'No se pudo crear la solicitud de firma digital'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  obtenerFirma(id: number): Observable<FirmaDigitalResponse> {
    return this.http.get<FirmaDigitalResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        this.toastService.error(
          'Error al Cargar Firma',
          'No se pudo cargar la información de la firma'
        );
        return throwError(() => error);
      })
    );
  }

  actualizarFirma(id: number, request: FirmaDigitalRequest): Observable<FirmaDigitalResponse> {
    this.loadingSubject.next(true);
    return this.http.put<FirmaDigitalResponse>(`${this.apiUrl}/${id}`, request).pipe(
      tap(response => {
        this.toastService.success(
          'Firma Actualizada',
          'La firma digital ha sido actualizada exitosamente'
        );
        this.cargarFirmas();
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Actualizar',
          'No se pudo actualizar la firma digital'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  eliminarFirma(id: number): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.toastService.success(
          'Firma Eliminada',
          'La firma digital ha sido eliminada exitosamente'
        );
        this.cargarFirmas();
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Eliminar',
          'No se pudo eliminar la firma digital'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  cargarFirmas(filtros?: FiltrosFirma, paginacion?: PaginacionFirmas): Observable<FirmasResponse> {
    this.loadingSubject.next(true);

    let params = new HttpParams();

    if (paginacion) {
      params = params.set('page', paginacion.page.toString());
      params = params.set('size', paginacion.size.toString());
      if (paginacion.sort) {
        params = params.set('sort', paginacion.sort);
        params = params.set('direction', paginacion.direction || 'asc');
      }
    }

    if (filtros) {
      if (filtros.estadoFirma && filtros.estadoFirma.length > 0) {
        params = params.set('estadoFirma', filtros.estadoFirma.join(','));
      }
      if (filtros.estadoAutorizacion && filtros.estadoAutorizacion.length > 0) {
        params = params.set('estadoAutorizacion', filtros.estadoAutorizacion.join(','));
      }
      if (filtros.tipoFirma && filtros.tipoFirma.length > 0) {
        params = params.set('tipoFirma', filtros.tipoFirma.join(','));
      }
      if (filtros.fechaDesde) {
        params = params.set('fechaDesde', filtros.fechaDesde.toISOString());
      }
      if (filtros.fechaHasta) {
        params = params.set('fechaHasta', filtros.fechaHasta.toISOString());
      }
      if (filtros.firmanteId) {
        params = params.set('firmanteId', filtros.firmanteId.toString());
      }
      if (filtros.tramiteId) {
        params = params.set('tramiteId', filtros.tramiteId.toString());
      }
      if (filtros.nivelAutorizacion && filtros.nivelAutorizacion.length > 0) {
        params = params.set('nivelAutorizacion', filtros.nivelAutorizacion.join(','));
      }
      if (filtros.requierePinAdicional !== undefined) {
        params = params.set('requierePinAdicional', filtros.requierePinAdicional.toString());
      }
    }

    return this.http.get<FirmasResponse>(this.apiUrl, { params }).pipe(
      tap(response => {
        this.firmasSubject.next(response.content);
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Cargar Firmas',
          'No se pudieron cargar las firmas digitales'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  procesarAutorizacion(request: AutorizacionFirmaRequest): Observable<FirmaDigitalResponse> {
    this.loadingSubject.next(true);
    return this.http.post<FirmaDigitalResponse>(`${this.apiUrl}/${request.firmaId}/autorizar`, request).pipe(
      tap(response => {
        const mensaje = request.autorizar ? 'autorizada' : 'denegada';
        this.toastService.success(
          'Autorización Procesada',
          `La firma ha sido ${mensaje} exitosamente`
        );
        this.cargarFirmas();
      }),
      catchError(error => {
        this.toastService.error(
          'Error en Autorización',
          'No se pudo procesar la autorización'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  firmarDocumento(request: FirmarDocumentoRequest): Observable<FirmaDigitalResponse> {
    this.loadingSubject.next(true);
    return this.http.post<FirmaDigitalResponse>(`${this.apiUrl}/${request.firmaId}/firmar`, request).pipe(
      tap(response => {
        this.toastService.success(
          'Documento Firmado',
          'El documento ha sido firmado digitalmente'
        );
        this.cargarFirmas();
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Firmar',
          'No se pudo firmar el documento'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  verificarFirma(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/verificar`).pipe(
      tap(() => {
        this.toastService.success(
          'Verificación Completa',
          'La firma digital ha sido verificada'
        );
      }),
      catchError(error => {
        this.toastService.error(
          'Error en Verificación',
          'No se pudo verificar la firma'
        );
        return throwError(() => error);
      })
    );
  }

  obtenerFirmasPendientesAutorizacion(paginacion?: PaginacionFirmas): Observable<FirmasResponse> {
    this.loadingSubject.next(true);

    let params = new HttpParams();
    if (paginacion) {
      params = params.set('page', paginacion.page.toString());
      params = params.set('size', paginacion.size.toString());
    }

    return this.http.get<FirmasResponse>(`${this.apiUrl}/pendientes-autorizacion`, { params }).pipe(
      catchError(error => {
        this.toastService.error(
          'Error al Cargar',
          'No se pudieron cargar las firmas pendientes'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  obtenerFirmasPorTramite(tramiteId: number): Observable<FirmaDigitalResponse[]> {
    return this.http.get<FirmaDigitalResponse[]>(`${this.apiUrl}/tramite/${tramiteId}`).pipe(
      catchError(error => {
        this.toastService.error(
          'Error al Cargar',
          'No se pudieron cargar las firmas del trámite'
        );
        return throwError(() => error);
      })
    );
  }

  verificarRequiereFirma(tramiteId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/tramite/${tramiteId}/requiere-firma`).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  responderTramiteConFirma(request: ResponderTramiteConFirmaRequest): Observable<any> {
    this.loadingSubject.next(true);
    return this.http.post(`${this.apiUrl}/responder-tramite`, request).pipe(
      tap(() => {
        this.toastService.success(
          'Respuesta Enviada',
          'La respuesta con firma digital ha sido enviada'
        );
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Responder',
          'No se pudo enviar la respuesta con firma'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  obtenerEstadisticas(): Observable<EstadisticasFirmas> {
    return this.http.get<EstadisticasFirmas>(`${this.apiUrl}/estadisticas`).pipe(
      tap(estadisticas => {
        this.estadisticasSubject.next(estadisticas);
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Cargar Estadísticas',
          'No se pudieron cargar las estadísticas de firmas'
        );
        return throwError(() => error);
      })
    );
  }

  descargarDocumentoFirmado(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/descargar-firmado`, {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        this.toastService.error(
          'Error al Descargar',
          'No se pudo descargar el documento firmado'
        );
        return throwError(() => error);
      })
    );
  }

  obtenerHistorialFirma(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/historial`).pipe(
      catchError(error => {
        this.toastService.error(
          'Error al Cargar Historial',
          'No se pudo cargar el historial de la firma'
        );
        return throwError(() => error);
      })
    );
  }

  revocarFirma(id: number, motivo: string): Observable<FirmaDigitalResponse> {
    this.loadingSubject.next(true);
    return this.http.post<FirmaDigitalResponse>(`${this.apiUrl}/${id}/revocar`, { motivo }).pipe(
      tap(() => {
        this.toastService.success(
          'Firma Revocada',
          'La firma ha sido revocada exitosamente'
        );
        this.cargarFirmas();
      }),
      catchError(error => {
        this.toastService.error(
          'Error al Revocar',
          'No se pudo revocar la firma'
        );
        return throwError(() => error);
      }),
      tap(() => this.loadingSubject.next(false))
    );
  }

  validarCertificado(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/validar-certificado`, {}).pipe(
      tap(() => {
        this.toastService.success(
          'Certificado Validado',
          'El certificado ha sido validado correctamente'
        );
      }),
      catchError(error => {
        this.toastService.error(
          'Error en Validación',
          'No se pudo validar el certificado'
        );
        return throwError(() => error);
      })
    );
  }

  obtenerTiposFirma(): TipoFirma[] {
    return Object.values(TipoFirma);
  }

  obtenerEstadosFirma(): EstadoFirma[] {
    return Object.values(EstadoFirma);
  }

  obtenerEstadosAutorizacion(): EstadoAutorizacion[] {
    return Object.values(EstadoAutorizacion);
  }

  getDescripcionTipoFirma(tipo: TipoFirma): string {
    const descripciones = {
      [TipoFirma.SIMPLE]: 'Firma Simple',
      [TipoFirma.AVANZADA]: 'Firma Electrónica Avanzada',
      [TipoFirma.CUALIFICADA]: 'Firma Electrónica Cualificada',
      [TipoFirma.APROBACION]: 'Firma de Aprobación',
      [TipoFirma.RECHAZO]: 'Firma de Rechazo',
      [TipoFirma.REVISION]: 'Firma de Revisión',
      [TipoFirma.CONFORMIDAD]: 'Firma de Conformidad'
    };
    return descripciones[tipo] || tipo;
  }

  getDescripcionEstadoFirma(estado: EstadoFirma): string {
    const descripciones = {
      [EstadoFirma.PENDIENTE]: 'Pendiente de Firma',
      [EstadoFirma.FIRMADO]: 'Documento Firmado',
      [EstadoFirma.RECHAZADO]: 'Firma Rechazada',
      [EstadoFirma.EXPIRADO]: 'Tiempo de Firma Expirado',
      [EstadoFirma.REVOCADO]: 'Firma Revocada',
      [EstadoFirma.INVALIDADO]: 'Firma Invalidada',
      [EstadoFirma.ERROR]: 'Error en el Proceso',
      [EstadoFirma.VERIFICANDO]: 'Verificando Firma',
      [EstadoFirma.VERIFICADO]: 'Firma Verificada'
    };
    return descripciones[estado] || estado;
  }

  getDescripcionEstadoAutorizacion(estado: EstadoAutorizacion): string {
    const descripciones = {
      [EstadoAutorizacion.PENDIENTE]: 'Esperando Autorización',
      [EstadoAutorizacion.AUTORIZADO]: 'Autorizado para Firmar',
      [EstadoAutorizacion.DENEGADO]: 'Autorización Denegada',
      [EstadoAutorizacion.REVOCADO]: 'Autorización Revocada',
      [EstadoAutorizacion.EXPIRADO]: 'Autorización Expirada',
      [EstadoAutorizacion.NO_REQUERIDO]: 'No Requiere Autorización'
    };
    return descripciones[estado] || estado;
  }

  getColorEstadoFirma(estado: EstadoFirma): string {
    const colores = {
      [EstadoFirma.PENDIENTE]: 'bg-yellow-100 text-yellow-800',
      [EstadoFirma.FIRMADO]: 'bg-green-100 text-green-800',
      [EstadoFirma.RECHAZADO]: 'bg-red-100 text-red-800',
      [EstadoFirma.EXPIRADO]: 'bg-gray-100 text-gray-800',
      [EstadoFirma.REVOCADO]: 'bg-purple-100 text-purple-800',
      [EstadoFirma.INVALIDADO]: 'bg-red-100 text-red-800',
      [EstadoFirma.ERROR]: 'bg-red-100 text-red-800',
      [EstadoFirma.VERIFICANDO]: 'bg-blue-100 text-blue-800',
      [EstadoFirma.VERIFICADO]: 'bg-green-100 text-green-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  }

  getColorEstadoAutorizacion(estado: EstadoAutorizacion): string {
    const colores = {
      [EstadoAutorizacion.PENDIENTE]: 'bg-yellow-100 text-yellow-800',
      [EstadoAutorizacion.AUTORIZADO]: 'bg-green-100 text-green-800',
      [EstadoAutorizacion.DENEGADO]: 'bg-red-100 text-red-800',
      [EstadoAutorizacion.REVOCADO]: 'bg-purple-100 text-purple-800',
      [EstadoAutorizacion.EXPIRADO]: 'bg-gray-100 text-gray-800',
      [EstadoAutorizacion.NO_REQUERIDO]: 'bg-blue-100 text-blue-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  }
}