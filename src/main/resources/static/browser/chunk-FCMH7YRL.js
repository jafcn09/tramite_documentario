import {
  AuthService
} from "./chunk-T5HD73DN.js";
import {
  BehaviorSubject,
  HttpClient,
  HttpParams,
  Subject,
  __spreadProps,
  __spreadValues,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HL73AAZ4.js";

// src/app/services/notificacion.service.ts
var NotificacionService = class _NotificacionService {
  constructor(http, authService) {
    this.http = http;
    this.authService = authService;
    this.apiUrl = `${environment.apiUrl}/api/notificaciones`;
    this.notificacionesSubject = new BehaviorSubject([]);
    this.contadorNoLeidasSubject = new BehaviorSubject(0);
    this.nuevaNotificacionSubject = new Subject();
    this.notificaciones$ = this.notificacionesSubject.asObservable();
    this.contadorNoLeidas$ = this.contadorNoLeidasSubject.asObservable();
    this.nuevaNotificacion$ = this.nuevaNotificacionSubject.asObservable();
    this.contarNotificacionesNoLeidas().subscribe((count) => {
      this.contadorNoLeidasSubject.next(count);
    });
  }
  obtenerMisNotificaciones(page = 0, size = 10, sortBy = "fechaCreacion", sortDir = "desc", soloNoLeidas) {
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString()).set("sortBy", sortBy).set("sortDir", sortDir);
    if (soloNoLeidas !== void 0) {
      params = params.set("soloNoLeidas", soloNoLeidas.toString());
    }
    const token = this.authService.getToken();
    const endpoint = token ? this.apiUrl : `${this.apiUrl}/public`;
    return this.http.get(endpoint, { params });
  }
  obtenerNotificacionPorId(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  contarNotificacionesNoLeidas() {
    const token = this.authService.getToken();
    const endpoint = token ? `${this.apiUrl}/no-leidas/count` : `${this.apiUrl}/public/no-leidas/count`;
    return this.http.get(endpoint);
  }
  marcarComoLeida(id) {
    return this.http.put(`${this.apiUrl}/${id}/marcar-leida`, {});
  }
  marcarTodasComoLeidas() {
    return this.http.put(`${this.apiUrl}/marcar-todas-leidas`, {});
  }
  obtenerNotificacionesFiltradas(filtros, page = 0, size = 10, sortBy = "fechaCreacion", sortDir = "desc") {
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString()).set("sortBy", sortBy).set("sortDir", sortDir);
    if (filtros.tipo) {
      params = params.set("tipo", filtros.tipo);
    }
    if (filtros.prioridad) {
      params = params.set("prioridad", filtros.prioridad);
    }
    if (filtros.esLeida !== void 0) {
      params = params.set("esLeida", filtros.esLeida.toString());
    }
    if (filtros.tramiteId) {
      params = params.set("tramiteId", filtros.tramiteId.toString());
    }
    return this.http.get(`${this.apiUrl}/filtradas`, { params });
  }
  obtenerNotificacionesPorTramite(tramiteId, page = 0, size = 10) {
    const params = new HttpParams().set("page", page.toString()).set("size", size.toString());
    return this.http.get(`${this.apiUrl}/tramite/${tramiteId}`, { params });
  }
  reenviarPorEmail(id) {
    return this.http.post(`${this.apiUrl}/${id}/reenviar-email`, {});
  }
  obtenerConfiguracion() {
    return this.http.get(`${this.apiUrl}/configuracion`);
  }
  actualizarConfiguracion(configuracion) {
    return this.http.put(`${this.apiUrl}/configuracion`, configuracion);
  }
  obtenerTodasNotificaciones(page = 0, size = 10, sortBy = "fechaCreacion", sortDir = "desc") {
    const params = new HttpParams().set("page", page.toString()).set("size", size.toString()).set("sortBy", sortBy).set("sortDir", sortDir);
    return this.http.get(`${this.apiUrl}/admin/todas`, { params });
  }
  crearNotificacion(request) {
    return this.http.post(`${this.apiUrl}/admin`, request);
  }
  actualizarNotificacion(id, request) {
    return this.http.put(`${this.apiUrl}/admin/${id}`, request);
  }
  eliminarNotificacion(id) {
    return this.http.delete(`${this.apiUrl}/admin/${id}`);
  }
  eliminarNotificacionUsuario(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  eliminarTodasNotificaciones() {
    return this.http.delete(`${this.apiUrl}/eliminar-todas`);
  }
  limpiarNotificacionesAntiguas(diasAntiguedad = 30) {
    const params = new HttpParams().set("diasAntiguedad", diasAntiguedad.toString());
    const url = `${this.apiUrl}/limpiar-antiguas`;
    return this.http.delete(url, { params });
  }
  previsualizarNotificacionesAntiguas(diasAntiguedad = 30) {
    const params = new HttpParams().set("diasAntiguedad", diasAntiguedad.toString());
    return this.http.get(`${this.apiUrl}/admin/preview-antiguas`, { params });
  }
  obtenerEstadisticas() {
    return this.http.get(`${this.apiUrl}/admin/estadisticas`);
  }
  actualizarContadorNoLeidas() {
    this.contarNotificacionesNoLeidas().subscribe({
      next: (count) => {
        this.contadorNoLeidasSubject.next(count || 0);
      },
      error: (error) => {
        this.contadorNoLeidasSubject.next(0);
      }
    });
  }
  agregarNuevaNotificacion(notificacion) {
    const notificacionesActuales = this.notificacionesSubject.value;
    this.notificacionesSubject.next([notificacion, ...notificacionesActuales]);
    if (!notificacion.esLeida) {
      const contadorActual = this.contadorNoLeidasSubject.value;
      this.contadorNoLeidasSubject.next(contadorActual + 1);
    }
    this.nuevaNotificacionSubject.next(notificacion);
  }
  marcarLeidaLocal(id) {
    this.marcarComoLeida(id).subscribe(() => {
      const notificaciones = this.notificacionesSubject.value;
      const index = notificaciones.findIndex((n) => n.id === id);
      if (index >= 0 && !notificaciones[index].esLeida) {
        notificaciones[index].esLeida = true;
        notificaciones[index].fechaLectura = /* @__PURE__ */ new Date();
        this.notificacionesSubject.next([...notificaciones]);
        const contadorActual = this.contadorNoLeidasSubject.value;
        this.contadorNoLeidasSubject.next(Math.max(0, contadorActual - 1));
      }
    });
  }
  marcarTodasLeidasLocal() {
    this.marcarTodasComoLeidas().subscribe(() => {
      const notificaciones = this.notificacionesSubject.value;
      const notificacionesActualizadas = notificaciones.map((n) => __spreadProps(__spreadValues({}, n), {
        esLeida: true,
        fechaLectura: n.esLeida ? n.fechaLectura : /* @__PURE__ */ new Date()
      }));
      this.notificacionesSubject.next(notificacionesActualizadas);
      this.contadorNoLeidasSubject.next(0);
    });
  }
  getIcono(tipo) {
    const iconos = {
      "TRAMITE_CREADO": "fas fa-plus-circle",
      "TRAMITE_APROBADO": "fas fa-check-circle",
      "TRAMITE_RECHAZADO": "fas fa-times-circle",
      "TRAMITE_OBSERVADO": "fas fa-exclamation-triangle",
      "DERIVACION": "fas fa-share",
      "SISTEMA": "fas fa-info-circle"
    };
    return iconos[tipo] || "fas fa-bell";
  }
  getClaseTipo(tipo) {
    const clases = {
      "TRAMITE_CREADO": "nuevo",
      "TRAMITE_APROBADO": "aprobado",
      "TRAMITE_RECHAZADO": "rechazado",
      "TRAMITE_OBSERVADO": "observado",
      "DERIVACION": "derivado",
      "SISTEMA": "sistema"
    };
    return clases[tipo] || "nuevo";
  }
  getClasePrioridad(prioridad) {
    const clases = {
      "ALTA": "prioridad-alta",
      "NORMAL": "prioridad-normal",
      "BAJA": "prioridad-baja"
    };
    return clases[prioridad] || "prioridad-normal";
  }
  obtenerUsuarios() {
    return this.http.get(`${environment.apiUrl}/api/usuarios`);
  }
  obtenerRoles() {
    return this.http.get(`${environment.apiUrl}/api/roles`);
  }
  limpiarEstado() {
    this.notificacionesSubject.next([]);
    this.contadorNoLeidasSubject.next(0);
  }
  static {
    this.\u0275fac = function NotificacionService_Factory(t) {
      return new (t || _NotificacionService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(AuthService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificacionService, factory: _NotificacionService.\u0275fac, providedIn: "root" });
  }
};

export {
  NotificacionService
};
//# sourceMappingURL=chunk-FCMH7YRL.js.map
