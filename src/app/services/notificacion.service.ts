import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  Notificacion, 
  NotificacionRequest,
  NotificacionEstadisticas,
  NotificacionConfiguracion,
  PaginatedResponse,
  NotificacionFiltro,
  RoleInfo
} from '../components/notificaciones/notificacion.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = `${environment.apiUrl}/api/notificaciones`;

  private notificacionesSubject = new BehaviorSubject<Notificacion[]>([]);
  private contadorNoLeidasSubject = new BehaviorSubject<number>(0);
  private nuevaNotificacionSubject = new Subject<Notificacion>();
  
  public notificaciones$ = this.notificacionesSubject.asObservable();
  public contadorNoLeidas$ = this.contadorNoLeidasSubject.asObservable();
  public nuevaNotificacion$ = this.nuevaNotificacionSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.contarNotificacionesNoLeidas().subscribe(count => {
      this.contadorNoLeidasSubject.next(count);
    });
  }

  obtenerMisNotificaciones(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'fechaCreacion',
    sortDir: string = 'desc',
    soloNoLeidas?: boolean
  ): Observable<PaginatedResponse<Notificacion>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (soloNoLeidas !== undefined) {
      params = params.set('soloNoLeidas', soloNoLeidas.toString());
    }

    const token = this.authService.getToken();
    const endpoint = token ?
      this.apiUrl :
      `${this.apiUrl}/public`;
    return this.http.get<PaginatedResponse<Notificacion>>(endpoint, { params });
  }

  obtenerNotificacionPorId(id: number): Observable<Notificacion> {
    return this.http.get<Notificacion>(`${this.apiUrl}/${id}`);
  }

  contarNotificacionesNoLeidas(): Observable<number> {

    const token = this.authService.getToken();
    const endpoint = token ?
      `${this.apiUrl}/no-leidas/count` :
      `${this.apiUrl}/public/no-leidas/count`;

    return this.http.get<number>(endpoint);
  }

  marcarComoLeida(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/marcar-leida`, {});
  }

  marcarTodasComoLeidas(): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/marcar-todas-leidas`, {});
  }

  // Obtener notificaciones filtradas
  obtenerNotificacionesFiltradas(
    filtros: NotificacionFiltro,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'fechaCreacion',
    sortDir: string = 'desc'
  ): Observable<PaginatedResponse<Notificacion>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (filtros.tipo) {
      params = params.set('tipo', filtros.tipo);
    }
    if (filtros.prioridad) {
      params = params.set('prioridad', filtros.prioridad);
    }
    if (filtros.esLeida !== undefined) {
      params = params.set('esLeida', filtros.esLeida.toString());
    }
    if (filtros.tramiteId) {
      params = params.set('tramiteId', filtros.tramiteId.toString());
    }

    return this.http.get<PaginatedResponse<Notificacion>>(`${this.apiUrl}/filtradas`, { params });
  }

  // Obtener notificaciones por trámite
  obtenerNotificacionesPorTramite(
    tramiteId: number,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponse<Notificacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Notificacion>>(`${this.apiUrl}/tramite/${tramiteId}`, { params });
  }

  // Reenviar notificación por email
  reenviarPorEmail(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/reenviar-email`, {});
  }

  // Obtener configuración de notificaciones
  obtenerConfiguracion(): Observable<NotificacionConfiguracion> {
    return this.http.get<NotificacionConfiguracion>(`${this.apiUrl}/configuracion`);
  }

  // Actualizar configuración de notificaciones
  actualizarConfiguracion(configuracion: NotificacionConfiguracion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/configuracion`, configuracion);
  }

  // MÉTODOS PARA ADMIN

  // Obtener todas las notificaciones (solo ADMIN)
  obtenerTodasNotificaciones(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'fechaCreacion',
    sortDir: string = 'desc'
  ): Observable<PaginatedResponse<Notificacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<PaginatedResponse<Notificacion>>(`${this.apiUrl}/admin/todas`, { params });
  }

  // Crear notificación (solo ADMIN)
  crearNotificacion(request: NotificacionRequest): Observable<Notificacion> {
    return this.http.post<Notificacion>(`${this.apiUrl}/admin`, request);
  }

  // Actualizar notificación (solo ADMIN)
  actualizarNotificacion(id: number, request: NotificacionRequest): Observable<Notificacion> {
    return this.http.put<Notificacion>(`${this.apiUrl}/admin/${id}`, request);
  }

  // Eliminar notificación (solo ADMIN)
  eliminarNotificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
  }

  // Eliminar notificación (usuario)
  eliminarNotificacionUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Eliminar todas las notificaciones del usuario
  eliminarTodasNotificaciones(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar-todas`);
  }

  // Limpiar notificaciones antiguas (solo ADMIN)
  limpiarNotificacionesAntiguas(diasAntiguedad: number = 30): Observable<number> {
    const params = new HttpParams().set('diasAntiguedad', diasAntiguedad.toString());
    const url = `${this.apiUrl}/limpiar-antiguas`;

    return this.http.delete<number>(url, { params });
  }

  // Previsualizar notificaciones que serán eliminadas
  previsualizarNotificacionesAntiguas(diasAntiguedad: number = 30): Observable<any> {
    const params = new HttpParams().set('diasAntiguedad', diasAntiguedad.toString());
    return this.http.get<any>(`${this.apiUrl}/admin/preview-antiguas`, { params });
  }

  // Obtener estadísticas de notificaciones (solo ADMIN)
  obtenerEstadisticas(): Observable<NotificacionEstadisticas> {
    return this.http.get<NotificacionEstadisticas>(`${this.apiUrl}/admin/estadisticas`);
  }

  actualizarContadorNoLeidas(): void {
    this.contarNotificacionesNoLeidas().subscribe({
      next: (count) => {
        this.contadorNoLeidasSubject.next(count || 0);
      },
      error: (error) => {

        this.contadorNoLeidasSubject.next(0);
      }
    });
  }

  // Agregar nueva notificación en tiempo real
  agregarNuevaNotificacion(notificacion: Notificacion): void {
    const notificacionesActuales = this.notificacionesSubject.value;
    this.notificacionesSubject.next([notificacion, ...notificacionesActuales]);
    
    // Actualizar contador si no está leída
    if (!notificacion.esLeida) {
      const contadorActual = this.contadorNoLeidasSubject.value;
      this.contadorNoLeidasSubject.next(contadorActual + 1);
    }
    
    // Emitir evento de nueva notificación
    this.nuevaNotificacionSubject.next(notificacion);
  }

  marcarLeidaLocal(id: number): void {
    this.marcarComoLeida(id).subscribe(() => {
      // Actualizar en la lista local
      const notificaciones = this.notificacionesSubject.value;
      const index = notificaciones.findIndex(n => n.id === id);
      if (index >= 0 && !notificaciones[index].esLeida) {
        notificaciones[index].esLeida = true;
        notificaciones[index].fechaLectura = new Date();
        this.notificacionesSubject.next([...notificaciones]);
        
        // Decrementar contador
        const contadorActual = this.contadorNoLeidasSubject.value;
        this.contadorNoLeidasSubject.next(Math.max(0, contadorActual - 1));
      }
    });
  }

  // Marcar todas como leídas y actualizar estado local
  marcarTodasLeidasLocal(): void {
    this.marcarTodasComoLeidas().subscribe(() => {
      // Actualizar en la lista local
      const notificaciones = this.notificacionesSubject.value;
      const notificacionesActualizadas = notificaciones.map(n => ({
        ...n,
        esLeida: true,
        fechaLectura: n.esLeida ? n.fechaLectura : new Date()
      }));
      
      this.notificacionesSubject.next(notificacionesActualizadas);
      this.contadorNoLeidasSubject.next(0);
    });
  }

  // Obtener icono según tipo de notificación
  getIcono(tipo: string): string {
    const iconos: { [key: string]: string } = {
      'TRAMITE_CREADO': 'fas fa-plus-circle',
      'TRAMITE_APROBADO': 'fas fa-check-circle',
      'TRAMITE_RECHAZADO': 'fas fa-times-circle',
      'TRAMITE_OBSERVADO': 'fas fa-exclamation-triangle',
      'DERIVACION': 'fas fa-share',
      'SISTEMA': 'fas fa-info-circle'
    };
    return iconos[tipo] || 'fas fa-bell';
  }

  // Obtener clase CSS según tipo
  getClaseTipo(tipo: string): string {
    const clases: { [key: string]: string } = {
      'TRAMITE_CREADO': 'nuevo',
      'TRAMITE_APROBADO': 'aprobado',
      'TRAMITE_RECHAZADO': 'rechazado',
      'TRAMITE_OBSERVADO': 'observado',
      'DERIVACION': 'derivado',
      'SISTEMA': 'sistema'
    };
    return clases[tipo] || 'nuevo';
  }

  // Obtener clase CSS según prioridad
  getClasePrioridad(prioridad: string): string {
    const clases: { [key: string]: string } = {
      'ALTA': 'prioridad-alta',
      'NORMAL': 'prioridad-normal',
      'BAJA': 'prioridad-baja'
    };
    return clases[prioridad] || 'prioridad-normal';
  }

  // Obtener usuarios (solo ADMIN)
  obtenerUsuarios(): Observable<any[]> {

    return this.http.get<any[]>(`${environment.apiUrl}/api/usuarios`);
  }

  // Obtener roles (solo ADMIN)
  obtenerRoles(): Observable<RoleInfo[]> {
    return this.http.get<RoleInfo[]>(`${environment.apiUrl}/api/roles`);
  }

  // Limpiar estado al cerrar sesión
  limpiarEstado(): void {
    this.notificacionesSubject.next([]);
    this.contadorNoLeidasSubject.next(0);
  }
}