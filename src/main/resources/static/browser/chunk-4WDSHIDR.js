import {
  ToastService
} from "./chunk-OF2WYGMW.js";
import {
  AuthService
} from "./chunk-T5HD73DN.js";
import {
  BehaviorSubject,
  HttpClient,
  HttpParams,
  catchError,
  environment,
  of,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HL73AAZ4.js";

// src/app/services/bandeja-tramites.service.ts
var BandejaTramitesService = class _BandejaTramitesService {
  constructor(http, toastService, authService) {
    this.http = http;
    this.toastService = toastService;
    this.authService = authService;
    this.apiUrl = `${environment.apiUrl}/api/bandeja-tramites`;
    this.tramitesSubject = new BehaviorSubject([]);
    this.loadingSubject = new BehaviorSubject(false);
    this.tramites$ = this.tramitesSubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();
  }
  obtenerTramitesBandeja(page = 1, limit = 15, ordenarPor = "fecha", ordenAscendente = false, estado, prioridad, tipo) {
    this.loadingSubject.next(true);
    let params = new HttpParams().set("page", page.toString()).set("limit", limit.toString()).set("ordenarPor", ordenarPor).set("ordenAscendente", ordenAscendente.toString());
    if (estado)
      params = params.set("estado", estado);
    if (prioridad)
      params = params.set("prioridad", prioridad);
    if (tipo)
      params = params.set("tipo", tipo);
    return this.http.get(`${this.apiUrl}`, { params }).pipe(tap((response) => {
      this.loadingSubject.next(false);
      if (response && response.data) {
        this.tramitesSubject.next(response.data);
      }
    }), catchError((error) => {
      this.loadingSubject.next(false);
      this.toastService.error("Error al cargar tr\xE1mites", "No se pudieron obtener los tr\xE1mites de la bandeja. Int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  getTramites(page = 1, limit = 15, filtros, ordenarPor = "fecha", ordenAscendente = false) {
    this.loadingSubject.next(true);
    let params = new HttpParams().set("page", page.toString()).set("limit", limit.toString()).set("ordenarPor", ordenarPor).set("ordenAscendente", ordenAscendente.toString());
    if (filtros) {
      Object.keys(filtros).forEach((key) => {
        const value = filtros[key];
        if (value !== void 0 && value !== null && value !== "") {
          if (value instanceof Date) {
            params = params.set(key, value.toISOString().split("T")[0]);
          } else {
            params = params.set(key, value.toString());
          }
        }
      });
    }
    return this.http.get(`${this.apiUrl}`, { params }).pipe(tap(() => this.loadingSubject.next(false)), catchError((error) => {
      this.loadingSubject.next(false);
      this.toastService.error("Error al cargar tr\xE1mites", "No se pudieron obtener los tr\xE1mites de la bandeja. Int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  getEstadisticas() {
    return this.http.get(`${this.apiUrl}/estadisticas`).pipe(tap((estadisticas) => {
    }), catchError((error) => {
      throw error;
    }));
  }
  getNotificaciones() {
    return this.http.get(`${this.apiUrl}/notificaciones`).pipe(catchError((error) => {
      return of([
        {
          id: 1,
          tipo: "nuevo_tramite",
          titulo: "Nuevo tr\xE1mite asignado",
          mensaje: "Se te ha asignado el tr\xE1mite TR-2024-001250",
          fecha: /* @__PURE__ */ new Date(),
          leida: false,
          tramiteId: 1,
          icono: "fas fa-file-alt",
          color: "#4299e1"
        },
        {
          id: 2,
          tipo: "tramite_vencido",
          titulo: "Tr\xE1mite vencido",
          mensaje: "El tr\xE1mite TR-2024-001248 ha vencido",
          fecha: new Date(Date.now() - 30 * 60 * 1e3),
          leida: false,
          tramiteId: 2,
          icono: "fas fa-exclamation-triangle",
          color: "#f56565"
        },
        {
          id: 3,
          tipo: "calificacion_recibida",
          titulo: "Nueva calificaci\xF3n",
          mensaje: "Recibiste 5 estrellas por el tr\xE1mite TR-2024-001245",
          fecha: new Date(Date.now() - 2 * 60 * 60 * 1e3),
          leida: true,
          tramiteId: 3,
          icono: "fas fa-star",
          color: "#d69e2e"
        }
      ]);
    }));
  }
  cambiarEstado(request) {
    const formData = new FormData();
    formData.append("nuevoEstadoId", request.nuevoEstadoId.toString());
    if (request.observaciones) {
      formData.append("observaciones", request.observaciones);
    }
    if (request.documentosAdicionales && request.documentosAdicionales.length > 0) {
      request.documentosAdicionales.forEach((doc, index) => {
        formData.append("documentosAdicionales", doc, doc.name);
      });
    }
    return this.http.put(`${this.apiUrl}/${request.tramiteId}/estado`, formData).pipe(tap((tramiteActualizado) => {
      this.toastService.success("Estado actualizado", `El tr\xE1mite ${tramiteActualizado.codigo} ha cambiado de estado exitosamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al actualizar estado", "No se pudo actualizar el estado del tr\xE1mite.");
      throw error;
    }));
  }
  derivarTramite(request) {
    const params = new HttpParams().set("trabajadorNuevoId", request.trabajadorAsignadoId?.toString() || "").set("motivo", request.observaciones);
    const tramitesUrl = `${environment.apiUrl}/api/tramites`;
    return this.http.post(`${tramitesUrl}/${request.tramiteId}/derivar`, {}, { params }).pipe(tap((tramiteDerivado) => {
      this.toastService.success("Tr\xE1mite derivado", `El tr\xE1mite ${tramiteDerivado.codigo} ha sido derivado exitosamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al derivar tr\xE1mite", "No se pudo derivar el tr\xE1mite. Verifica los datos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  reasignarTramite(request) {
    return this.http.put(`${this.apiUrl}/${request.tramiteId}/reasignar`, request).pipe(tap((tramiteReasignado) => {
      this.toastService.success("Tr\xE1mite reasignado", `El tr\xE1mite ${tramiteReasignado.codigo} ha sido reasignado exitosamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al reasignar tr\xE1mite", "No se pudo reasignar el tr\xE1mite.");
      throw error;
    }));
  }
  subirDocumento(tramiteId, archivo, descripcion) {
    const formData = new FormData();
    formData.append("documento", archivo, archivo.name);
    if (descripcion) {
      formData.append("descripcion", descripcion);
    }
    return this.http.post(`${this.apiUrl}/${tramiteId}/documentos`, formData).pipe(tap(() => {
      this.toastService.success("Documento subido", `El archivo "${archivo.name}" se subi\xF3 correctamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al subir documento", "No se pudo subir el archivo. Verifica el formato y tama\xF1o.");
      throw error;
    }));
  }
  descargarDocumento(tramiteId, nombreArchivo) {
    return this.http.get(`${this.apiUrl}/${tramiteId}/archivos/${nombreArchivo}`, {
      responseType: "blob"
    }).pipe(catchError((error) => {
      this.toastService.error("Error al descargar documento", "No se pudo descargar el archivo.");
      throw error;
    }));
  }
  descargarTodosDocumentos(tramiteId) {
    return this.http.get(`${this.apiUrl}/${tramiteId}/documentos/descargar-todos`, {
      responseType: "blob"
    }).pipe(tap(() => {
      this.toastService.info("Preparando descarga", "Se est\xE1 generando el archivo ZIP con todos los documentos.");
    }), catchError((error) => {
      this.toastService.error("Error al descargar documentos", "No se pudieron descargar los archivos.");
      throw error;
    }));
  }
  marcarNotificacionLeida(notificacionId) {
    return this.http.put(`${this.apiUrl}/notificaciones/${notificacionId}/leer`, {}).pipe(catchError((error) => {
      return of();
    }));
  }
  getEstadosDisponibles() {
    return this.http.get(`${this.apiUrl}/estados-disponibles`).pipe(catchError(() => {
      return of([
        { id: 2, nombre: "Enviado", color: "#4299e1", icono: "fas fa-paper-plane" },
        { id: 3, nombre: "En Revisi\xF3n", color: "#ed8936", icono: "fas fa-eye" },
        { id: 4, nombre: "Derivado", color: "#48bb78", icono: "fas fa-share" },
        { id: 5, nombre: "Observado", color: "#f56565", icono: "fas fa-exclamation-circle" },
        { id: 6, nombre: "Aprobado", color: "#38a169", icono: "fas fa-check" },
        { id: 7, nombre: "Rechazado", color: "#e53e3e", icono: "fas fa-times" },
        { id: 8, nombre: "Finalizado", color: "#319795", icono: "fas fa-check-circle" }
      ]);
    }));
  }
  validarArchivo(archivo) {
    const tiposPermitidos = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "image/jpeg",
      "image/png",
      "image/jpg"
    ];
    if (!tiposPermitidos.includes(archivo.type)) {
      return {
        valido: false,
        mensaje: "Solo se permiten archivos PDF, DOC, DOCX, JPG, JPEG y PNG."
      };
    }
    const tama\u00F1oMaximo = 15 * 1024 * 1024;
    if (archivo.size > tama\u00F1oMaximo) {
      return {
        valido: false,
        mensaje: "El archivo no debe superar los 15MB."
      };
    }
    return { valido: true };
  }
  exportarTramites(tramiteIds) {
    const params = { tramiteIds: tramiteIds.join(",") };
    return this.http.get(`${this.apiUrl}/exportar`, {
      params,
      responseType: "blob"
    }).pipe(tap(() => {
      this.toastService.info("Generando exportaci\xF3n", "Se est\xE1 preparando el documento PDF con los tr\xE1mites seleccionados.");
    }), catchError((error) => {
      this.toastService.error("Error al exportar", "No se pudieron exportar los tr\xE1mites. Int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  archivarTramites(tramiteIds) {
    const request = {
      tramiteIds,
      nuevoEstado: "ARCHIVADO",
      observaciones: "Tr\xE1mites archivados desde la bandeja de gesti\xF3n"
    };
    return this.http.put(`${this.apiUrl}/archivar`, request).pipe(tap((response) => {
      this.toastService.success("Tr\xE1mites archivados", `Se han archivado ${tramiteIds.length} tr\xE1mite(s) correctamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al archivar", "No se pudieron archivar los tr\xE1mites. Verifica los permisos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  desarchivarTramites(tramiteIds) {
    const request = {
      tramiteIds,
      nuevoEstado: "EN_REVISION",
      observaciones: "Tr\xE1mites desarchivados desde la bandeja de gesti\xF3n"
    };
    return this.http.put(`${this.apiUrl}/desarchivar`, request).pipe(tap((response) => {
      this.toastService.success("Tr\xE1mites desarchivados", `Se han desarchivado ${tramiteIds.length} tr\xE1mite(s) correctamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al desarchivar", "No se pudieron desarchivar los tr\xE1mites. Verifica los permisos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  cambiarEstadoTramitePorNombre(tramiteId, nuevoEstado, observaciones = "") {
    const params = new HttpParams().set("nuevoEstado", nuevoEstado).set("observaciones", observaciones);
    return this.http.put(`${environment.apiUrl}/api/tramites/${tramiteId}/cambiar-estado`, null, { params }).pipe(tap(() => {
    }), catchError((error) => {
      throw error;
    }));
  }
  verificarPermisosAcciones(tramiteId) {
    const tramitesUrl = `${environment.apiUrl}/api/tramites`;
    return this.http.get(`${tramitesUrl}/${tramiteId}/permisos`).pipe(tap((permisos) => {
      permisos;
    }), catchError((error) => {
      return of({
        puedeAprobar: false,
        puedeRechazar: false,
        puedeDerivar: false,
        puedeResponder: false,
        estaVencido: false
      });
    }));
  }
  clearTramites() {
    this.tramitesSubject.next([]);
  }
  static {
    this.\u0275fac = function BandejaTramitesService_Factory(t) {
      return new (t || _BandejaTramitesService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(ToastService), \u0275\u0275inject(AuthService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BandejaTramitesService, factory: _BandejaTramitesService.\u0275fac, providedIn: "root" });
  }
};

export {
  BandejaTramitesService
};
//# sourceMappingURL=chunk-4WDSHIDR.js.map
