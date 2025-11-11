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
  map,
  of,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HL73AAZ4.js";

// src/app/services/mis-tramites.service.ts
var MisTramitesService = class _MisTramitesService {
  constructor(http, toastService, authService) {
    this.http = http;
    this.toastService = toastService;
    this.authService = authService;
    this.apiUrl = `${environment.apiUrl}/api/tramites`;
    this.misTramitesSubject = new BehaviorSubject([]);
    this.loadingSubject = new BehaviorSubject(false);
    this.misTramites$ = this.misTramitesSubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();
  }
  getMisTramites(page = 1, limit = 12, filtros) {
    this.loadingSubject.next(true);
    let params = new HttpParams().set("page", (page - 1).toString()).set("size", limit.toString());
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
    return this.http.get(`${this.apiUrl}/mis-tramites`, { params }).pipe(map((response) => ({
      data: this.mapTramitesToFrontendFormat(response.content || []),
      total: response.totalElements || 0,
      page,
      limit,
      totalPages: response.totalPages || 0
    })), tap(() => this.loadingSubject.next(false)), catchError((error) => {
      this.loadingSubject.next(false);
      this.toastService.error("Error al cargar tr\xE1mites", "No se pudieron obtener tus tr\xE1mites. Int\xE9ntalo nuevamente.");
      return of({
        data: [],
        total: 0,
        page,
        limit,
        totalPages: 0
      });
    }));
  }
  getEstadisticas() {
    return this.http.get(`${this.apiUrl}/mis-tramites/estadisticas`).pipe(map((response) => ({
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
    })), catchError((error) => {
      this.toastService.error("Error al cargar estad\xEDsticas", "No se pudieron obtener las estad\xEDsticas de tus tr\xE1mites.");
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
    }));
  }
  getMiTramiteById(id) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(map((tramiteBackend) => {
      const mappedTramite = this.mapSingleTramiteToFrontendFormat(tramiteBackend);
      mappedTramite.firmaDigitalActiva = tramiteBackend.firmaDigitalActiva;
      mappedTramite.requiereBiometria = tramiteBackend.requiereBiometria;
      mappedTramite.firmaValida = tramiteBackend.firmaValida;
      mappedTramite.hashFirma = tramiteBackend.hashFirma;
      mappedTramite.fechaFirma = tramiteBackend.fechaFirma ? new Date(tramiteBackend.fechaFirma) : void 0;
      mappedTramite.metodoVerificacion = tramiteBackend.metodoVerificacion;
      mappedTramite.tipoFirma = tramiteBackend.tipoFirma;
      mappedTramite.razonFirma = tramiteBackend.razonFirma;
      mappedTramite.ubicacionFirma = tramiteBackend.ubicacionFirma;
      return mappedTramite;
    }), catchError((error) => {
      this.toastService.error("Error al obtener tr\xE1mite", "No se pudo obtener el detalle del tr\xE1mite.");
      throw error;
    }));
  }
  getMiTramiteParaEdicion(id) {
    return this.http.get(`${this.apiUrl}/${id}/edicion`).pipe(map((tramiteBackend) => {
      const mappedTramite = this.mapSingleTramiteToFrontendFormat(tramiteBackend);
      mappedTramite.firmaDigitalActiva = tramiteBackend.firmaDigitalActiva;
      mappedTramite.requiereBiometria = tramiteBackend.requiereBiometria;
      mappedTramite.firmaValida = tramiteBackend.firmaValida;
      mappedTramite.hashFirma = tramiteBackend.hashFirma;
      mappedTramite.fechaFirma = tramiteBackend.fechaFirma ? new Date(tramiteBackend.fechaFirma) : void 0;
      mappedTramite.metodoVerificacion = tramiteBackend.metodoVerificacion;
      mappedTramite.tipoFirma = tramiteBackend.tipoFirma;
      mappedTramite.razonFirma = tramiteBackend.razonFirma;
      mappedTramite.ubicacionFirma = tramiteBackend.ubicacionFirma;
      return mappedTramite;
    }), catchError((error) => {
      this.toastService.error("Error al obtener tr\xE1mite para edici\xF3n", "No se pudo obtener el tr\xE1mite con la informaci\xF3n de firma digital.");
      throw error;
    }));
  }
  editarMiTramite(tramiteId, request) {
    return this.http.put(`${this.apiUrl}/${tramiteId}/editar`, request).pipe(tap((tramiteActualizado) => {
      this.toastService.success("Tr\xE1mite actualizado", `El tr\xE1mite ${tramiteActualizado.codigo} ha sido actualizado exitosamente. Se ha enviado una notificaci\xF3n por correo.`);
    }), catchError((error) => {
      throw error;
    }));
  }
  subirDocumento(tramiteId, archivo, descripcion) {
    const formData = new FormData();
    formData.append("documento", archivo, archivo.name);
    if (descripcion) {
      formData.append("descripcion", descripcion);
    }
    return this.http.post(`${this.apiUrl}/${tramiteId}/archivos`, formData).pipe(tap(() => {
      this.toastService.success("Documento subido", `El archivo "${archivo.name}" se subi\xF3 correctamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al subir documento", "No se pudo subir el archivo. Verifica el formato y tama\xF1o.");
      throw error;
    }));
  }
  descargarDocumento(tramiteId, nombreArchivo) {
    const url = `${this.apiUrl}/${tramiteId}/archivos/${nombreArchivo}`;
    return this.http.get(url, {
      responseType: "blob"
    }).pipe(tap((blob) => {
    }), catchError((error) => {
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
  eliminarDocumento(tramiteId, documentoId) {
    return this.http.delete(`${this.apiUrl}/${tramiteId}/documentos/${documentoId}`).pipe(tap(() => {
      this.toastService.success("Documento eliminado", "El documento ha sido eliminado correctamente.");
    }), catchError((error) => {
      this.toastService.error("Error al eliminar documento", "No se pudo eliminar el documento.");
      throw error;
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
        mensaje: "Solo se permiten archivos PDF, DOC, DOCX"
      };
    }
    const tama\u00F1oMaximo = 10 * 1024 * 1024;
    if (archivo.size > tama\u00F1oMaximo) {
      return {
        valido: false,
        mensaje: "El archivo no debe superar los 10MB."
      };
    }
    return { valido: true };
  }
  getNotificaciones() {
    return this.http.get(`${this.apiUrl}/notificaciones`).pipe(catchError((error) => {
      return of([]);
    }));
  }
  marcarNotificacionLeida(notificacionId) {
    return this.http.put(`${this.apiUrl}/notificaciones/${notificacionId}/leer`, {}).pipe(catchError((error) => {
      return of();
    }));
  }
  mapSingleTramiteToFrontendFormat(tramiteBackend) {
    const documentosMapeados = this.mapDocumentos(tramiteBackend.documentos);
    const tramiteMapeado = {
      id: tramiteBackend.id,
      codigo: tramiteBackend.codigo,
      tipoTramite: {
        id: this.mapTipoTramiteStringToId(tramiteBackend.tipo),
        nombre: this.mapTipoTramiteStringToName(tramiteBackend.tipo),
        descripcion: tramiteBackend.tipo || ""
      },
      asunto: tramiteBackend.titulo || tramiteBackend.asunto || "",
      descripcion: tramiteBackend.descripcion || "",
      estado: {
        id: this.mapEstadoStringToId(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        nombre: tramiteBackend.estado?.nombre || this.mapEstadoStringToName(tramiteBackend.estado),
        color: this.mapEstadoStringToColor(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        icono: this.mapEstadoStringToIcon(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        descripcion: tramiteBackend.estado?.nombre || tramiteBackend.estado || ""
      },
      prioridad: {
        id: this.mapPrioridadStringToId(tramiteBackend.prioridad),
        nombre: this.mapPrioridadStringToName(tramiteBackend.prioridad),
        color: this.mapPrioridadStringToColor(tramiteBackend.prioridad),
        nivel: this.mapPrioridadStringToLevel(tramiteBackend.prioridad),
        icono: this.mapPrioridadStringToIcon(tramiteBackend.prioridad)
      },
      fechaCreacion: new Date(tramiteBackend.fechaCreacion),
      fechaActualizacion: tramiteBackend.fechaActualizacion ? new Date(tramiteBackend.fechaActualizacion) : void 0,
      fechaVencimiento: tramiteBackend.fechaVencimiento ? new Date(tramiteBackend.fechaVencimiento) : void 0,
      fechaRespuesta: tramiteBackend.fechaRespuesta ? new Date(tramiteBackend.fechaRespuesta) : void 0,
      areaDestino: tramiteBackend.areaActual ? {
        id: tramiteBackend.areaActual.id || 0,
        nombre: tramiteBackend.areaActual.nombre || ""
      } : void 0,
      trabajadorAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id || 0,
        nombre: tramiteBackend.usuarioAsignado.nombre || "",
        apellidos: tramiteBackend.usuarioAsignado.apellidos || ""
      } : void 0,
      usuarioRespondio: tramiteBackend.usuarioRespondio ? {
        id: tramiteBackend.usuarioRespondio.id || 0,
        nombre: tramiteBackend.usuarioRespondio.nombre || "",
        apellidos: tramiteBackend.usuarioRespondio.apellidos || ""
      } : void 0,
      usuarioSolicitante: tramiteBackend.usuarioSolicitante ? {
        id: tramiteBackend.usuarioSolicitante.id || 0,
        nombre: tramiteBackend.usuarioSolicitante.nombre || "",
        apellidos: tramiteBackend.usuarioSolicitante.apellidos || "",
        correo: tramiteBackend.usuarioSolicitante.correo || ""
      } : void 0,
      documentos: documentosMapeados,
      historial: tramiteBackend.historial || [],
      observaciones: tramiteBackend.observaciones,
      respuesta: tramiteBackend.respuesta,
      calificacion: tramiteBackend.calificacion,
      puedeEditar: tramiteBackend.puedeEditar || false,
      puedeCalificar: tramiteBackend.puedeCalificar || false,
      estaVencido: tramiteBackend.estaVencido || false,
      diasRestantes: tramiteBackend.diasRestantes,
      progreso: tramiteBackend.progreso
    };
    return tramiteMapeado;
  }
  mapTramitesToFrontendFormat(tramitesBackend) {
    return tramitesBackend.map((tramiteBackend) => ({
      id: tramiteBackend.id,
      codigo: tramiteBackend.codigo,
      tipoTramite: {
        id: this.mapTipoTramiteStringToId(tramiteBackend.tipo),
        nombre: this.mapTipoTramiteStringToName(tramiteBackend.tipo),
        descripcion: tramiteBackend.tipo || ""
      },
      asunto: tramiteBackend.titulo || tramiteBackend.asunto || "",
      descripcion: tramiteBackend.descripcion || "",
      estado: {
        id: this.mapEstadoStringToId(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        nombre: tramiteBackend.estado?.nombre || this.mapEstadoStringToName(tramiteBackend.estado),
        color: this.mapEstadoStringToColor(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        icono: this.mapEstadoStringToIcon(tramiteBackend.estado?.nombre || tramiteBackend.estado),
        descripcion: tramiteBackend.estado?.nombre || tramiteBackend.estado || ""
      },
      prioridad: {
        id: this.mapPrioridadStringToId(tramiteBackend.prioridad),
        nombre: this.mapPrioridadStringToName(tramiteBackend.prioridad),
        color: this.mapPrioridadStringToColor(tramiteBackend.prioridad),
        nivel: this.mapPrioridadStringToLevel(tramiteBackend.prioridad),
        icono: this.mapPrioridadStringToIcon(tramiteBackend.prioridad)
      },
      fechaCreacion: new Date(tramiteBackend.fechaCreacion),
      fechaActualizacion: tramiteBackend.fechaActualizacion ? new Date(tramiteBackend.fechaActualizacion) : void 0,
      fechaVencimiento: tramiteBackend.fechaVencimiento ? new Date(tramiteBackend.fechaVencimiento) : void 0,
      areaDestino: tramiteBackend.areaDestino ? {
        id: tramiteBackend.areaDestino.id || 0,
        nombre: tramiteBackend.areaDestino.nombre || tramiteBackend.areaDestino
      } : void 0,
      trabajadorAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id || 0,
        nombre: tramiteBackend.usuarioAsignado.nombre || "",
        apellidos: tramiteBackend.usuarioAsignado.apellidos || ""
      } : void 0,
      usuarioAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id || 0,
        nombre: tramiteBackend.usuarioAsignado.nombre || "",
        apellidos: tramiteBackend.usuarioAsignado.apellidos || ""
      } : void 0,
      usuarioSolicitante: tramiteBackend.usuarioSolicitante ? {
        id: tramiteBackend.usuarioSolicitante.id || 0,
        nombre: tramiteBackend.usuarioSolicitante.nombre || "",
        apellidos: tramiteBackend.usuarioSolicitante.apellidos || "",
        correo: tramiteBackend.usuarioSolicitante.correo || ""
      } : void 0,
      documentos: tramiteBackend.documentos || [],
      historial: tramiteBackend.historial || [],
      observaciones: tramiteBackend.observaciones,
      respuesta: tramiteBackend.respuesta,
      fechaRespuesta: tramiteBackend.fechaRespuesta ? new Date(tramiteBackend.fechaRespuesta) : void 0,
      usuarioRespondio: tramiteBackend.usuarioRespondio ? {
        id: tramiteBackend.usuarioRespondio.id || 0,
        nombre: tramiteBackend.usuarioRespondio.nombre || "",
        apellidos: tramiteBackend.usuarioRespondio.apellidos || ""
      } : void 0,
      calificacion: tramiteBackend.calificacion,
      puedeEditar: tramiteBackend.puedeEditar || false,
      puedeCalificar: tramiteBackend.puedeCalificar || false,
      estaVencido: tramiteBackend.estaVencido || false,
      diasRestantes: tramiteBackend.diasRestantes,
      progreso: tramiteBackend.progreso || 0
    }));
  }
  mapTipoTramiteStringToId(tipo) {
    const tipoMap = {
      "SOLICITUD_CONSTANCIA": 1,
      "SOLICITUD_CERTIFICADO": 2,
      "SOLICITUD_PERMISO": 3,
      "SOLICITUD_LICENCIA": 4,
      "RECLAMO": 5,
      "SUGERENCIA": 6
    };
    return tipoMap[tipo] || 1;
  }
  mapTipoTramiteStringToName(tipo) {
    const tipoMap = {
      "SOLICITUD_CONSTANCIA": "Solicitud de Constancia",
      "SOLICITUD_CERTIFICADO": "Solicitud de Certificado",
      "SOLICITUD_PERMISO": "Solicitud de Permiso",
      "SOLICITUD_LICENCIA": "Solicitud de Licencia",
      "RECLAMO": "Reclamo",
      "SUGERENCIA": "Sugerencia"
    };
    return tipoMap[tipo] || tipo;
  }
  mapEstadoStringToId(estado) {
    const estadoMap = {
      "BORRADOR": 1,
      "ENVIADO": 2,
      "EN_REVISION": 3,
      "EN_PROCESO": 4,
      "DERIVADO": 5,
      "OBSERVADO": 6,
      "APROBADO": 7,
      "FINALIZADO": 8,
      "Borrador": 1,
      "Enviado": 2,
      "En Revisi\xF3n": 3,
      "En Proceso": 4,
      "Derivado": 5,
      "Observado": 6,
      "Aprobado": 7,
      "Finalizado": 8
    };
    return estadoMap[estado] || 2;
  }
  mapEstadoStringToName(estado) {
    const estadoMap = {
      "BORRADOR": "Borrador",
      "ENVIADO": "Enviado",
      "EN_REVISION": "En Revisi\xF3n",
      "EN_PROCESO": "En Proceso",
      "DERIVADO": "Derivado",
      "OBSERVADO": "Observado",
      "APROBADO": "Aprobado",
      "FINALIZADO": "Finalizado",
      "Borrador": "Borrador",
      "Enviado": "Enviado",
      "En Revisi\xF3n": "En Revisi\xF3n",
      "En Proceso": "En Proceso",
      "Derivado": "Derivado",
      "Observado": "Observado",
      "Aprobado": "Aprobado",
      "Finalizado": "Finalizado"
    };
    return estadoMap[estado] || estado;
  }
  mapEstadoStringToColor(estado) {
    const colorMap = {
      "BORRADOR": "#6c757d",
      "ENVIADO": "#007bff",
      "EN_REVISION": "#ffc107",
      "EN_PROCESO": "#3498db",
      "DERIVADO": "#17a2b8",
      "OBSERVADO": "#fd7e14",
      "APROBADO": "#28a745",
      "FINALIZADO": "#6f42c1",
      "Borrador": "#6c757d",
      "Enviado": "#007bff",
      "En Revisi\xF3n": "#ffc107",
      "En Proceso": "#3498db",
      "Derivado": "#17a2b8",
      "Observado": "#fd7e14",
      "Aprobado": "#28a745",
      "Finalizado": "#6f42c1"
    };
    return colorMap[estado] || "#007bff";
  }
  mapEstadoStringToIcon(estado) {
    const iconMap = {
      "BORRADOR": "fas fa-edit",
      "ENVIADO": "fas fa-paper-plane",
      "EN_REVISION": "fas fa-search",
      "EN_PROCESO": "fas fa-spinner",
      "DERIVADO": "fas fa-share",
      "OBSERVADO": "fas fa-exclamation-triangle",
      "APROBADO": "fas fa-check-circle",
      "FINALIZADO": "fas fa-flag-checkered",
      "Borrador": "fas fa-edit",
      "Enviado": "fas fa-paper-plane",
      "En Revisi\xF3n": "fas fa-search",
      "En Proceso": "fas fa-spinner",
      "Derivado": "fas fa-share",
      "Observado": "fas fa-exclamation-triangle",
      "Aprobado": "fas fa-check-circle",
      "Finalizado": "fas fa-flag-checkered"
    };
    return iconMap[estado] || "fas fa-file";
  }
  mapPrioridadStringToId(prioridad) {
    const prioridadMap = {
      "BAJA": 1,
      "NORMAL": 2,
      "ALTA": 3,
      "URGENTE": 4
    };
    return prioridadMap[prioridad] || 2;
  }
  mapPrioridadStringToName(prioridad) {
    const prioridadMap = {
      "BAJA": "Baja",
      "NORMAL": "Normal",
      "ALTA": "Alta",
      "URGENTE": "Urgente"
    };
    return prioridadMap[prioridad] || prioridad;
  }
  mapPrioridadStringToColor(prioridad) {
    const colorMap = {
      "BAJA": "#28a745",
      "NORMAL": "#007bff",
      "ALTA": "#ffc107",
      "URGENTE": "#dc3545"
    };
    return colorMap[prioridad] || "#007bff";
  }
  mapPrioridadStringToLevel(prioridad) {
    const levelMap = {
      "BAJA": 1,
      "NORMAL": 2,
      "ALTA": 3,
      "URGENTE": 4
    };
    return levelMap[prioridad] || 2;
  }
  mapPrioridadStringToIcon(prioridad) {
    const iconMap = {
      "BAJA": "fas fa-arrow-down",
      "NORMAL": "fas fa-minus",
      "ALTA": "fas fa-arrow-up",
      "URGENTE": "fas fa-exclamation-circle"
    };
    return iconMap[prioridad] || "fas fa-minus";
  }
  mapDocumentos(documentosBackend) {
    if (!documentosBackend || !Array.isArray(documentosBackend)) {
      return [];
    }
    const documentosMapeados = documentosBackend.map((doc, index) => {
      const documentoMapeado = {
        id: doc.id || 0,
        nombre: doc.nombre || doc.nombreArchivo || `documento_${index}`,
        nombreOriginal: doc.nombreOriginal || doc.nombre || doc.nombreArchivo || "",
        tamano: doc.tamano || doc.tamanio || doc.size || 0,
        tipo: doc.tipo || doc.tipoArchivo || doc.mimeType || "application/octet-stream",
        fechaSubida: doc.fechaSubida ? new Date(doc.fechaSubida) : /* @__PURE__ */ new Date(),
        esSubidoPorUsuario: doc.esSubidoPorUsuario || true,
        descripcion: doc.descripcion || ""
      };
      return documentoMapeado;
    });
    return documentosMapeados;
  }
  aprobarTramite(request) {
    return this.http.post(`${this.apiUrl}/${request.tramiteId}/aprobar`, request).pipe(tap((response) => {
      this.toastService.success("Tr\xE1mite aprobado", `El tr\xE1mite ha sido aprobado exitosamente. Responsable asignado: ${response.responsableAsignado.nombre} ${response.responsableAsignado.apellidos}`);
    }), catchError((error) => {
      this.toastService.error("Error al aprobar tr\xE1mite", "No se pudo aprobar el tr\xE1mite. Int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  rechazarTramite(tramiteId, motivoRechazo, observaciones) {
    this.loadingSubject.next(true);
    const requestBody = {
      tramiteId,
      motivoRechazo,
      observaciones
    };
    return this.http.put(`${this.apiUrl}/${tramiteId}/rechazar`, requestBody).pipe(tap((response) => {
      this.loadingSubject.next(false);
      this.toastService.success("Tr\xE1mite rechazado", `El tr\xE1mite ha sido rechazado exitosamente. Se notific\xF3 al usuario remitente.`);
    }), catchError((error) => {
      this.loadingSubject.next(false);
      this.toastService.error("Error al rechazar tr\xE1mite", "No se pudo rechazar el tr\xE1mite. Int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  clearMisTramites() {
    this.misTramitesSubject.next([]);
  }
  static {
    this.\u0275fac = function MisTramitesService_Factory(t) {
      return new (t || _MisTramitesService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(ToastService), \u0275\u0275inject(AuthService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MisTramitesService, factory: _MisTramitesService.\u0275fac, providedIn: "root" });
  }
};

export {
  MisTramitesService
};
//# sourceMappingURL=chunk-OIH2ELY7.js.map
