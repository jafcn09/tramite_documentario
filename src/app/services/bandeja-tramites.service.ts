import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  TramiteBandeja, 
  FiltrosBandeja, 
  EstadisticasBandeja,
  CambiarEstadoRequest,
  DerivarTramiteRequest,
  ReasignarTramiteRequest,
  NotificacionBandeja
} from '../shared/interfaces/bandeja-tramites.interface';
import { PaginacionResponse } from '../shared/interfaces/tramite.interface';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BandejaTramitesService {
  private apiUrl = `${environment.apiUrl}/api/bandeja-tramites`;
  
  private tramitesSubject = new BehaviorSubject<TramiteBandeja[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public tramites$ = this.tramitesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

 
  obtenerTramitesBandeja(
    page: number = 1, 
    limit: number = 15, 
    ordenarPor: string = 'fecha',
    ordenAscendente: boolean = false,
    estado?: string,
    prioridad?: string,
    tipo?: string
  ): Observable<any> {
    this.loadingSubject.next(true);
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('ordenarPor', ordenarPor)
      .set('ordenAscendente', ordenAscendente.toString());

    if (estado) params = params.set('estado', estado);
    if (prioridad) params = params.set('prioridad', prioridad);  
    if (tipo) params = params.set('tipo', tipo);

    return this.http.get<any>(`${this.apiUrl}`, { params })
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
     
          if (response && response.data) {
            this.tramitesSubject.next(response.data);
          }
        }),
        catchError(error => {
          this.loadingSubject.next(false);
          this.toastService.error(
            'Error al cargar trámites',
            'No se pudieron obtener los trámites de la bandeja. Inténtalo nuevamente.'
          );

          throw error;
        })
      );
  }

  getTramites(
    page: number = 1, 
    limit: number = 15, 
    filtros?: FiltrosBandeja,
    ordenarPor: string = 'fecha',
    ordenAscendente: boolean = false
  ): Observable<PaginacionResponse<TramiteBandeja>> {
    this.loadingSubject.next(true);
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('ordenarPor', ordenarPor)
      .set('ordenAscendente', ordenAscendente.toString());

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        const value = filtros[key as keyof FiltrosBandeja];
        if (value !== undefined && value !== null && value !== '') {
          if (value instanceof Date) {
            params = params.set(key, value.toISOString().split('T')[0]);
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }

    return this.http.get<PaginacionResponse<TramiteBandeja>>(`${this.apiUrl}`, { params })
      .pipe(
        tap(() => this.loadingSubject.next(false)),
        catchError(error => {
          this.loadingSubject.next(false);
          this.toastService.error(
            'Error al cargar trámites',
            'No se pudieron obtener los trámites de la bandeja. Inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }


  getEstadisticas(): Observable<EstadisticasBandeja> {

    return this.http.get<EstadisticasBandeja>(`${this.apiUrl}/estadisticas`)
      .pipe(
        tap(estadisticas => {
     
        }),
        catchError(error => {
       
          throw error;
        })
      );
  }

  getNotificaciones(): Observable<NotificacionBandeja[]> {
    return this.http.get<NotificacionBandeja[]>(`${this.apiUrl}/notificaciones`)
      .pipe(
        catchError(error => {
  
          return of([
            {
              id: 1,
              tipo: 'nuevo_tramite' as const,
              titulo: 'Nuevo trámite asignado',
              mensaje: 'Se te ha asignado el trámite TR-2024-001250',
              fecha: new Date(),
              leida: false,
              tramiteId: 1,
              icono: 'fas fa-file-alt',
              color: '#4299e1'
            },
            {
              id: 2,
              tipo: 'tramite_vencido' as const,
              titulo: 'Trámite vencido',
              mensaje: 'El trámite TR-2024-001248 ha vencido',
              fecha: new Date(Date.now() - 30 * 60 * 1000),
              leida: false,
              tramiteId: 2,
              icono: 'fas fa-exclamation-triangle',
              color: '#f56565'
            },
            {
              id: 3,
              tipo: 'calificacion_recibida' as const,
              titulo: 'Nueva calificación',
              mensaje: 'Recibiste 5 estrellas por el trámite TR-2024-001245',
              fecha: new Date(Date.now() - 2 * 60 * 60 * 1000),
              leida: true,
              tramiteId: 3,
              icono: 'fas fa-star',
              color: '#d69e2e'
            }
          ]);
        })
      );
  }

  // Cambiar estado de trámite
  cambiarEstado(request: CambiarEstadoRequest): Observable<TramiteBandeja> {
    const formData = new FormData();
    formData.append('nuevoEstadoId', request.nuevoEstadoId.toString());
    if (request.observaciones) {
      formData.append('observaciones', request.observaciones);
    }
    
    
    if (request.documentosAdicionales && request.documentosAdicionales.length > 0) {
      request.documentosAdicionales.forEach((doc, index) => {
        formData.append('documentosAdicionales', doc, doc.name);
      });
    }

    return this.http.put<TramiteBandeja>(`${this.apiUrl}/${request.tramiteId}/estado`, formData)
      .pipe(
        tap(tramiteActualizado => {
          this.toastService.success(
            'Estado actualizado',
            `El trámite ${tramiteActualizado.codigo} ha cambiado de estado exitosamente.`
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

  derivarTramite(request: DerivarTramiteRequest): Observable<TramiteBandeja> {

    const params = new HttpParams()
      .set('trabajadorNuevoId', request.trabajadorAsignadoId?.toString() || '')
      .set('motivo', request.observaciones);

 
    const tramitesUrl = `${environment.apiUrl}/api/tramites`;

    return this.http.post<TramiteBandeja>(`${tramitesUrl}/${request.tramiteId}/derivar`, {}, { params })
      .pipe(
        tap(tramiteDerivado => {
          this.toastService.success(
            'Trámite derivado',
            `El trámite ${tramiteDerivado.codigo} ha sido derivado exitosamente.`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al derivar trámite',
            'No se pudo derivar el trámite. Verifica los datos e inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

  
  reasignarTramite(request: ReasignarTramiteRequest): Observable<TramiteBandeja> {
    return this.http.put<TramiteBandeja>(`${this.apiUrl}/${request.tramiteId}/reasignar`, request)
      .pipe(
        tap(tramiteReasignado => {
          this.toastService.success(
            'Trámite reasignado',
            `El trámite ${tramiteReasignado.codigo} ha sido reasignado exitosamente.`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al reasignar trámite',
            'No se pudo reasignar el trámite.'
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

    return this.http.post<void>(`${this.apiUrl}/${tramiteId}/documentos`, formData)
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

  
  marcarNotificacionLeida(notificacionId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/notificaciones/${notificacionId}/leer`, {})
      .pipe(
        catchError(error => {
          return of();
        })
      );
  }


  getEstadosDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados-disponibles`)
      .pipe(
        catchError(() => {
 
          return of([
            { id: 2, nombre: 'Enviado', color: '#4299e1', icono: 'fas fa-paper-plane' },
            { id: 3, nombre: 'En Revisión', color: '#ed8936', icono: 'fas fa-eye' },
            { id: 4, nombre: 'Derivado', color: '#48bb78', icono: 'fas fa-share' },
            { id: 5, nombre: 'Observado', color: '#f56565', icono: 'fas fa-exclamation-circle' },
            { id: 6, nombre: 'Aprobado', color: '#38a169', icono: 'fas fa-check' },
            { id: 7, nombre: 'Rechazado', color: '#e53e3e', icono: 'fas fa-times' },
            { id: 8, nombre: 'Finalizado', color: '#319795', icono: 'fas fa-check-circle' }
          ]);
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
        mensaje: 'Solo se permiten archivos PDF, DOC, DOCX, JPG, JPEG y PNG.'
      };
    }

    const tamañoMaximo = 15 * 1024 * 1024; 
    if (archivo.size > tamañoMaximo) {
      return {
        valido: false,
        mensaje: 'El archivo no debe superar los 15MB.'
      };
    }

    return { valido: true };
  }


  exportarTramites(tramiteIds: number[]): Observable<Blob> {
    const params = { tramiteIds: tramiteIds.join(',') };
    
    return this.http.get(`${this.apiUrl}/exportar`, {
      params: params,
      responseType: 'blob'
    }).pipe(
      tap(() => {
        this.toastService.info(
          'Generando exportación',
          'Se está preparando el documento PDF con los trámites seleccionados.'
        );
      }),
      catchError(error => {
        this.toastService.error(
          'Error al exportar',
          'No se pudieron exportar los trámites. Inténtalo nuevamente.'
        );
        throw error;
      })
    );
  }
  archivarTramites(tramiteIds: number[]): Observable<any> {
    const request = {
      tramiteIds: tramiteIds,
      nuevoEstado: 'ARCHIVADO',
      observaciones: 'Trámites archivados desde la bandeja de gestión'
    };

    return this.http.put(`${this.apiUrl}/archivar`, request)
      .pipe(
        tap((response: any) => {
          this.toastService.success(
            'Trámites archivados',
            `Se han archivado ${tramiteIds.length} trámite(s) correctamente.`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al archivar',
            'No se pudieron archivar los trámites. Verifica los permisos e inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }
  desarchivarTramites(tramiteIds: number[]): Observable<any> {
    const request = {
      tramiteIds: tramiteIds,
      nuevoEstado: 'EN_REVISION',
      observaciones: 'Trámites desarchivados desde la bandeja de gestión'
    };

    return this.http.put(`${this.apiUrl}/desarchivar`, request)
      .pipe(
        tap((response: any) => {
          this.toastService.success(
            'Trámites desarchivados',
            `Se han desarchivado ${tramiteIds.length} trámite(s) correctamente.`
          );
        }),
        catchError(error => {
          this.toastService.error(
            'Error al desarchivar',
            'No se pudieron desarchivar los trámites. Verifica los permisos e inténtalo nuevamente.'
          );
          throw error;
        })
      );
  }

    cambiarEstadoTramitePorNombre(tramiteId: number, nuevoEstado: string, observaciones: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('nuevoEstado', nuevoEstado)
      .set('observaciones', observaciones);

    return this.http.put(`${environment.apiUrl}/api/tramites/${tramiteId}/cambiar-estado`, null, { params })
      .pipe(
        tap(() => {

        }),
        catchError(error => {
          throw error;
        })
      );
  }
  verificarPermisosAcciones(tramiteId: number): Observable<{
    puedeAprobar: boolean;
    puedeRechazar: boolean;
    puedeDerivar: boolean;
    puedeResponder: boolean;
    estaVencido: boolean;
  }> {
    const tramitesUrl = `${environment.apiUrl}/api/tramites`;
    return this.http.get<{
      puedeAprobar: boolean;
      puedeRechazar: boolean;
      puedeDerivar: boolean;
      puedeResponder: boolean;
      estaVencido: boolean;
    }>(`${tramitesUrl}/${tramiteId}/permisos`)
      .pipe(
        tap(permisos => {
          console.log(`[DEBUG FRONTEND] Permisos recibidos para trámite ${tramiteId}:`, permisos);
        }),
        catchError(error => {
          return of({
            puedeAprobar: false,
            puedeRechazar: false,
            puedeDerivar: false,
            puedeResponder: false,
            estaVencido: false
          });
        })
      );
  }
  clearTramites(): void {
    this.tramitesSubject.next([]);
  }
}