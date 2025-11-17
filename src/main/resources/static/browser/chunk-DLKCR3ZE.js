import {
  ToastService
} from "./chunk-NXAITARR.js";
import {
  BehaviorSubject,
  HttpClient,
  HttpParams,
  __spreadProps,
  __spreadValues,
  catchError,
  environment,
  map,
  of,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-VDZBNFIH.js";

// src/app/shared/data/tramite-data.ts
var TIPOS_TRAMITE = [
  {
    id: 1,
    nombre: "Resoluci\xF3n Rectoral",
    descripcion: "Resoluciones emitidas por la Rector\xEDa",
    requiereAprobacion: true,
    tiempoEstimado: 15,
    activo: true
  },
  {
    id: 2,
    nombre: "Resoluci\xF3n Decanal",
    descripcion: "Resoluciones emitidas por las Decanaturas",
    requiereAprobacion: true,
    tiempoEstimado: 10,
    activo: true
  },
  {
    id: 3,
    nombre: "Certificaci\xF3n de Documentos",
    descripcion: "Certificaci\xF3n de documentos acad\xE9micos y administrativos",
    requiereAprobacion: false,
    tiempoEstimado: 5,
    activo: true
  },
  {
    id: 4,
    nombre: "Autorizaci\xF3n de Eventos",
    descripcion: "Autorizaci\xF3n para eventos acad\xE9micos y culturales",
    requiereAprobacion: true,
    tiempoEstimado: 7,
    activo: true
  },
  {
    id: 5,
    nombre: "Permisos de Infraestructura",
    descripcion: "Permisos para uso de instalaciones y laboratorios",
    requiereAprobacion: true,
    tiempoEstimado: 12,
    activo: true
  },
  {
    id: 6,
    nombre: "Convenios Interinstitucionales",
    descripcion: "Tramitaci\xF3n de convenios con otras instituciones",
    requiereAprobacion: true,
    tiempoEstimado: 30,
    activo: true
  }
];
var ESTADOS_TRAMITE = [
  {
    id: 1,
    nombre: "Borrador",
    descripcion: "Tr\xE1mite en proceso de creaci\xF3n",
    color: "#6c757d",
    icono: "fas fa-edit",
    esFinal: false,
    permiteEdicion: true
  },
  {
    id: 2,
    nombre: "Enviado",
    descripcion: "Tr\xE1mite enviado para revisi\xF3n",
    color: "#17a2b8",
    icono: "fas fa-paper-plane",
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 3,
    nombre: "En Revisi\xF3n",
    descripcion: "Tr\xE1mite siendo revisado por el responsable",
    color: "#ffc107",
    icono: "fas fa-eye",
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 4,
    nombre: "Derivado",
    descripcion: "Tr\xE1mite derivado a otra \xE1rea",
    color: "#fd7e14",
    icono: "fas fa-share",
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 5,
    nombre: "Observado",
    descripcion: "Tr\xE1mite con observaciones que requiere correcci\xF3n",
    color: "#dc3545",
    icono: "fas fa-exclamation-triangle",
    esFinal: false,
    permiteEdicion: true
  },
  {
    id: 6,
    nombre: "Aprobado",
    descripcion: "Tr\xE1mite aprobado",
    color: "#28a745",
    icono: "fas fa-check-circle",
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 7,
    nombre: "Rechazado",
    descripcion: "Tr\xE1mite rechazado",
    color: "#dc3545",
    icono: "fas fa-times-circle",
    esFinal: true,
    permiteEdicion: false
  },
  {
    id: 8,
    nombre: "Finalizado",
    descripcion: "Tr\xE1mite completado exitosamente",
    color: "#20c997",
    icono: "fas fa-flag-checkered",
    esFinal: true,
    permiteEdicion: false
  },
  {
    id: 9,
    nombre: "Archivado",
    descripcion: "Tr\xE1mite archivado",
    color: "#6f42c1",
    icono: "fas fa-archive",
    esFinal: true,
    permiteEdicion: false
  }
];
var PRIORIDADES_TRAMITE = [
  {
    id: 2,
    nombre: "Normal",
    nivel: 2,
    color: "#17a2b8",
    icono: "fas fa-minus"
  },
  {
    id: 3,
    nombre: "Alta",
    nivel: 3,
    color: "#ffc107",
    icono: "fas fa-arrow-up"
  },
  {
    id: 4,
    nombre: "Urgente",
    nivel: 4,
    color: "#dc3545",
    icono: "fas fa-exclamation"
  }
];
var TAMA\u00D1O_MAXIMO_ARCHIVO = 10 * 1024 * 1024;

// src/app/services/tramite.service.ts
var TramiteService = class _TramiteService {
  constructor(http, toastService) {
    this.http = http;
    this.toastService = toastService;
    this.apiUrl = `${environment.apiUrl}/api/tramites`;
    this.tramitesSubject = new BehaviorSubject([]);
    this.loadingSubject = new BehaviorSubject(false);
    this.tramites$ = this.tramitesSubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();
  }
  getTramites(page = 1, limit = 10, filtros) {
    this.loadingSubject.next(true);
    let params = new HttpParams().set("page", page.toString()).set("limit", limit.toString());
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
    return this.http.get(`${this.apiUrl}`, { params }).pipe(map((response) => __spreadProps(__spreadValues({}, response), {
      content: response.content.map((tramite) => this.mapTramiteFromBackend(tramite))
    })), tap(() => this.loadingSubject.next(false)), catchError((error) => {
      this.loadingSubject.next(false);
      this.toastService.error("Error al cargar tr\xE1mites", "No se pudieron obtener los tr\xE1mites. Int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  getTramiteById(id) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(map((tramiteBackend) => this.mapTramiteFromBackend(tramiteBackend)), catchError((error) => {
      this.toastService.error("Error al obtener tr\xE1mite", "No se pudo obtener el detalle del tr\xE1mite.");
      throw error;
    }));
  }
  getTramiteParaEdicion(id) {
    return this.http.get(`${this.apiUrl}/${id}/edicion`).pipe(map((tramiteBackend) => this.mapTramiteFromBackendConFirma(tramiteBackend)), catchError((error) => {
      this.toastService.error("Error al obtener tr\xE1mite para edici\xF3n", "No se pudo obtener el tr\xE1mite con la informaci\xF3n de firma digital.");
      throw error;
    }));
  }
  responderTramite(tramiteId, formData) {
    return this.http.post(`${this.apiUrl}/${tramiteId}/responder`, formData).pipe(tap((response) => {
      this.toastService.success("Tr\xE1mite respondido", "El tr\xE1mite ha sido respondido exitosamente y se ha notificado al solicitante.");
    }), catchError((error) => {
      this.toastService.error("Error al responder tr\xE1mite", "No se pudo responder el tr\xE1mite. Verifique los datos e intente nuevamente.");
      throw error;
    }));
  }
  asignarseTramite(tramiteId) {
    return this.http.post(`${this.apiUrl}/${tramiteId}/asignarse`, {}).pipe(tap((response) => {
      this.toastService.success("Tr\xE1mite asignado", "Te has asignado el tr\xE1mite exitosamente. Se ha enviado una notificaci\xF3n por correo.");
    }), catchError((error) => {
      this.toastService.error("Error al asignarse", error.error?.message || "No se pudo asignar el tr\xE1mite. Intente nuevamente.");
      throw error;
    }));
  }
  crearTramite(tramite) {
    const formData = new FormData();
    formData.append("tipoTramiteId", tramite.tipoTramiteId.toString());
    formData.append("asunto", tramite.asunto);
    formData.append("descripcion", tramite.descripcion);
    formData.append("prioridadId", tramite.prioridadId.toString());
    if (tramite.areaDestinoId) {
      formData.append("areaDestinoId", tramite.areaDestinoId.toString());
    }
    if (tramite.fechaVencimiento) {
      formData.append("fechaVencimiento", tramite.fechaVencimiento.toISOString());
    }
    if (tramite.requiereFirmaDigital !== void 0) {
      formData.append("requiereFirmaDigital", tramite.requiereFirmaDigital.toString());
    }
    if (tramite.tipoFirma) {
      formData.append("tipoFirma", tramite.tipoFirma);
    }
    if (tramite.razonFirma) {
      formData.append("razonFirma", tramite.razonFirma);
    }
    if (tramite.ubicacionFirma) {
      formData.append("ubicacionFirma", tramite.ubicacionFirma);
    }
    if (tramite.consentimientoFirma !== void 0) {
      formData.append("consentimientoFirma", tramite.consentimientoFirma.toString());
    }
    if (tramite.firmaDigitalData) {
      formData.append("firmaDigitalData", tramite.firmaDigitalData);
    }
    if (tramite.documentos && tramite.documentos.length > 0) {
      tramite.documentos.forEach((documento, index) => {
        formData.append(`documentos`, documento, documento.name);
      });
    }
    return this.http.post(`${this.apiUrl}`, formData).pipe(tap((nuevoTramite) => {
      const tramitesActuales = this.tramitesSubject.value;
      this.tramitesSubject.next([nuevoTramite, ...tramitesActuales]);
      this.toastService.success("Tr\xE1mite creado", `El tr\xE1mite ${nuevoTramite.codigo} ha sido creado exitosamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al crear tr\xE1mite", "No se pudo crear el tr\xE1mite. Verifica los datos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  crearTramiteConArchivos(tramiteData) {
    const request = {
      tipoTramiteId: tramiteData.tipoTramiteId,
      asunto: tramiteData.asunto,
      descripcion: tramiteData.descripcion,
      prioridadId: tramiteData.prioridadId,
      fechaVencimiento: tramiteData.fechaVencimiento ? new Date(tramiteData.fechaVencimiento).toISOString() : null,
      areaDestinoId: tramiteData.areaDestinoId,
      observaciones: tramiteData.observaciones,
      documentos: tramiteData.documentos || [],
      // Campos de firma digital (NUEVOS - requeridos por backend)
      requiereFirmaDigital: tramiteData.requiereFirmaDigital || false,
      firmanteId: tramiteData.firmanteId || null,
      tipoFirma: tramiteData.tipoFirma && tramiteData.tipoFirma !== "null" ? tramiteData.tipoFirma : null,
      razonFirma: tramiteData.razonFirma && tramiteData.razonFirma !== "null" ? tramiteData.razonFirma : null,
      ubicacionFirma: tramiteData.ubicacionFirma && tramiteData.ubicacionFirma !== "null" ? tramiteData.ubicacionFirma : null,
      consentimientoFirma: tramiteData.consentimientoFirma || false,
      firmaDigitalData: tramiteData.firmaDigitalData || null,
      // Campos de firma digital (OBSOLETOS - mantener por compatibilidad)
      firmaDigitalActiva: tramiteData.requiereFirmaDigital || false,
      firmaDigitalRequiereBiometria: false,
      firmaDigitalValida: false,
      firmaDigitalHash: tramiteData.firmaDigitalData || null,
      firmaDigitalFecha: tramiteData.requiereFirmaDigital ? (/* @__PURE__ */ new Date()).toISOString() : null,
      firmaDigitalMetodoVerificacion: tramiteData.tipoFirma && tramiteData.tipoFirma !== "null" ? tramiteData.tipoFirma : null
    };
    return this.http.post(`${this.apiUrl}/con-archivos`, request).pipe(tap((nuevoTramite) => {
      const tramitesActuales = this.tramitesSubject.value;
      this.tramitesSubject.next([nuevoTramite, ...tramitesActuales]);
    }), catchError((error) => {
      this.toastService.error("Error al crear tr\xE1mite", "No se pudo crear el tr\xE1mite con los archivos. Verifica los datos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  actualizarEstado(request) {
    return this.http.put(`${this.apiUrl}/${request.tramiteId}/estado`, request).pipe(tap((tramiteActualizado) => {
      const tramitesActuales = this.tramitesSubject.value;
      const tramitesActualizados = tramitesActuales.map((t) => t.id === tramiteActualizado.id ? tramiteActualizado : t);
      this.tramitesSubject.next(tramitesActualizados);
      const estadoNuevo = ESTADOS_TRAMITE.find((e) => e.id === request.nuevoEstadoId);
      this.toastService.success("Estado actualizado", `El tr\xE1mite ${tramiteActualizado.codigo} cambi\xF3 a "${estadoNuevo?.nombre}".`);
    }), catchError((error) => {
      this.toastService.error("Error al actualizar estado", "No se pudo actualizar el estado del tr\xE1mite.");
      throw error;
    }));
  }
  cambiarEstado(tramiteId, nuevoEstado, observaciones) {
    let params = new HttpParams().set("nuevoEstado", nuevoEstado);
    if (observaciones) {
      params = params.set("observaciones", observaciones);
    }
    return this.http.put(`${this.apiUrl}/${tramiteId}/estado`, {}, { params }).pipe(tap((tramiteActualizado) => {
      const tramitesActuales = this.tramitesSubject.value;
      const tramitesActualizados = tramitesActuales.map((t) => t.id === tramiteActualizado.id ? this.mapTramiteFromBackend(tramiteActualizado) : t);
      this.tramitesSubject.next(tramitesActualizados);
      this.toastService.success("Estado actualizado", `El tr\xE1mite ${tramiteActualizado.codigo} cambi\xF3 a "${this.getEstadoNombreFromEnum(nuevoEstado)}".`);
    }), catchError((error) => {
      this.toastService.error("Error al cambiar estado", "No se pudo cambiar el estado del tr\xE1mite.");
      throw error;
    }));
  }
  actualizarTramite(tramiteId, tramiteData) {
    const request = {
      titulo: tramiteData.asunto,
      descripcion: tramiteData.descripcion,
      tipo: tramiteData.tipoId ? this.mapTipoTramiteToEnum(tramiteData.tipoId) : void 0,
      prioridad: tramiteData.prioridadId ? this.mapPrioridadToEnum(tramiteData.prioridadId) : void 0,
      observaciones: tramiteData.observaciones,
      fechaVencimiento: tramiteData.fechaVencimiento ? new Date(tramiteData.fechaVencimiento).toISOString() : null,
      areaDestinoId: tramiteData.areaDestinoId
    };
    return this.http.put(`${this.apiUrl}/${tramiteId}`, request).pipe(tap((tramiteActualizado) => {
      const tramitesActuales = this.tramitesSubject.value;
      const tramitesActualizados = tramitesActuales.map((t) => t.id === tramiteActualizado.id ? tramiteActualizado : t);
      this.tramitesSubject.next(tramitesActualizados);
      this.toastService.success("Tr\xE1mite actualizado", `El tr\xE1mite ${tramiteActualizado.codigo} ha sido actualizado exitosamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al actualizar tr\xE1mite", "No se pudo actualizar el tr\xE1mite. Verifica los datos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  actualizarTramiteConArchivos(tramiteId, tramiteData) {
    const request = {
      titulo: tramiteData.asunto,
      descripcion: tramiteData.descripcion,
      tipo: tramiteData.tipoId ? this.mapTipoTramiteToEnum(tramiteData.tipoId) : void 0,
      prioridad: tramiteData.prioridadId ? this.mapPrioridadToEnum(tramiteData.prioridadId) : void 0,
      observaciones: tramiteData.observaciones,
      fechaVencimiento: tramiteData.fechaVencimiento ? new Date(tramiteData.fechaVencimiento).toISOString() : null,
      areaDestinoId: tramiteData.areaDestinoId,
      documentos: tramiteData.documentos || [],
      documentosAEliminar: tramiteData.documentosAEliminar || []
    };
    return this.http.put(`${this.apiUrl}/${tramiteId}/con-archivos`, request).pipe(tap((tramiteActualizado) => {
      const tramitesActuales = this.tramitesSubject.value;
      const tramitesActualizados = tramitesActuales.map((t) => t.id === tramiteActualizado.id ? tramiteActualizado : t);
      this.tramitesSubject.next(tramitesActualizados);
    }), catchError((error) => {
      this.toastService.error("Error al actualizar tr\xE1mite", "No se pudo actualizar el tr\xE1mite con los archivos. Verifica los datos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  subirDocumento(tramiteId, archivo) {
    const formData = new FormData();
    formData.append("documento", archivo, archivo.name);
    return this.http.post(`${this.apiUrl}/${tramiteId}/documentos`, formData).pipe(tap(() => {
      this.toastService.success("Documento subido", `El archivo "${archivo.name}" se subi\xF3 correctamente.`);
    }), catchError((error) => {
      this.toastService.error("Error al subir documento", "No se pudo subir el archivo. Verifica el formato y tama\xF1o.");
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
  descargarDocumento(tramiteId, nombreArchivo) {
    return this.http.get(`${this.apiUrl}/${tramiteId}/archivos/${nombreArchivo}`, {
      responseType: "blob"
    }).pipe(catchError((error) => {
      this.toastService.error("Error al descargar documento", "No se pudo descargar el archivo.");
      throw error;
    }));
  }
  getTiposTramite() {
    return this.http.get(`${this.apiUrl}/tipos`).pipe(catchError(() => {
      return of(TIPOS_TRAMITE);
    }));
  }
  getEstadosTramite() {
    return of(ESTADOS_TRAMITE);
  }
  getPrioridadesTramite() {
    return this.http.get(`${this.apiUrl}/prioridades`).pipe(catchError(() => {
      return of(PRIORIDADES_TRAMITE);
    }));
  }
  generarCodigoTramite() {
    return this.http.get(`${this.apiUrl}/generar-codigo`).pipe(map((response) => response.codigo), catchError(() => {
      const a\u00F1o = (/* @__PURE__ */ new Date()).getFullYear();
      const timestamp = Date.now().toString().slice(-6);
      return of(`TR-${a\u00F1o}-${timestamp}`);
    }));
  }
  validarArchivo(archivo) {
    const tiposPermitidos = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];
    if (!tiposPermitidos.includes(archivo.type)) {
      return {
        valido: false,
        mensaje: "Solo se permiten archivos PDF, DOC y DOCX."
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
  imprimirTramite(tramiteId) {
    return this.http.get(`${this.apiUrl}/${tramiteId}/imprimir`, {
      responseType: "blob",
      headers: {
        "Accept": "text/html"
      }
    }).pipe(tap(() => {
      this.toastService.info("Generando documento", "Preparando documento para impresi\xF3n...");
    }), catchError((error) => {
      this.toastService.error("Error al generar documento", "No se pudo generar el documento para impresi\xF3n.");
      throw error;
    }));
  }
  getHistorialConConteo(tramiteId) {
    return this.http.get(`${this.apiUrl}/${tramiteId}/historial`).pipe(catchError((error) => {
      this.toastService.error("Error al cargar historial", "No se pudo obtener el historial del tr\xE1mite.");
      throw error;
    }));
  }
  eliminarTramite(tramiteId) {
    return this.http.delete(`${this.apiUrl}/${tramiteId}`).pipe(tap(() => {
      const tramitesActuales = this.tramitesSubject.value;
      const tramitesActualizados = tramitesActuales.filter((t) => t.id !== tramiteId);
      this.tramitesSubject.next(tramitesActualizados);
      this.toastService.success("Tr\xE1mite eliminado", "El tr\xE1mite se elimin\xF3 correctamente.");
    }), catchError((error) => {
      this.toastService.error("Error al eliminar tr\xE1mite", error.error?.error || "No se pudo eliminar el tr\xE1mite. Verifica tus permisos e int\xE9ntalo nuevamente.");
      throw error;
    }));
  }
  mapTramiteFromBackend(tramiteBackend) {
    return {
      id: tramiteBackend.id,
      codigo: tramiteBackend.codigo,
      asunto: tramiteBackend.titulo || tramiteBackend.asunto,
      descripcion: tramiteBackend.descripcion,
      fechaCreacion: new Date(tramiteBackend.fechaCreacion),
      fechaActualizacion: tramiteBackend.fechaActualizacion ? new Date(tramiteBackend.fechaActualizacion) : void 0,
      fechaVencimiento: tramiteBackend.fechaVencimiento ? new Date(tramiteBackend.fechaVencimiento) : void 0,
      observaciones: tramiteBackend.observaciones,
      tipoTramite: {
        id: this.getTipoTramiteIdFromEnum(tramiteBackend.tipo),
        nombre: this.getTipoTramiteNombreFromEnum(tramiteBackend.tipo),
        descripcion: "",
        requiereAprobacion: false,
        tiempoEstimado: 0,
        activo: true
      },
      estado: {
        id: this.getEstadoIdFromEnum(tramiteBackend.estado),
        nombre: this.getEstadoNombreFromEnum(tramiteBackend.estado),
        descripcion: "",
        color: this.getEstadoColorFromEnum(tramiteBackend.estado),
        icono: this.getEstadoIconoFromEnum(tramiteBackend.estado),
        esFinal: this.isEstadoFinal(tramiteBackend.estado),
        permiteEdicion: this.permiteEdicionEstado(tramiteBackend.estado)
      },
      prioridad: {
        id: this.getPrioridadIdFromEnum(tramiteBackend.prioridad),
        nombre: this.getPrioridadNombreFromEnum(tramiteBackend.prioridad),
        descripcion: "",
        nivel: this.getPrioridadNivelFromEnum(tramiteBackend.prioridad),
        color: this.getPrioridadColorFromEnum(tramiteBackend.prioridad),
        icono: this.getPrioridadIconoFromEnum(tramiteBackend.prioridad)
      },
      solicitante: {
        id: tramiteBackend.usuarioSolicitante?.id || 0,
        nombre: tramiteBackend.usuarioSolicitante?.nombre || "Usuario",
        apellidos: tramiteBackend.usuarioSolicitante?.apellidos || "Solicitante",
        correo: tramiteBackend.usuarioSolicitante?.correo || "",
        usuario: tramiteBackend.usuarioSolicitante?.usuario || "",
        foto: tramiteBackend.usuarioSolicitante?.foto,
        area: {
          id: tramiteBackend.areaOrigen?.id || 0,
          nombre: tramiteBackend.areaOrigen?.nombre || "\xC1rea no especificada",
          descripcion: tramiteBackend.areaOrigen?.descripcion || "",
          activa: tramiteBackend.areaOrigen?.activa || true
        },
        role: {
          id: tramiteBackend.usuarioSolicitante?.role?.id || 0,
          name: tramiteBackend.usuarioSolicitante?.role?.name || "",
          description: tramiteBackend.usuarioSolicitante?.role?.description || ""
        }
      },
      areaOrigen: {
        id: tramiteBackend.areaOrigen?.id || 0,
        nombre: tramiteBackend.areaOrigen?.nombre || "\xC1rea no especificada",
        descripcion: tramiteBackend.areaOrigen?.descripcion || "",
        activa: tramiteBackend.areaOrigen?.activa || true
      },
      areaDestino: tramiteBackend.areaActual ? {
        id: tramiteBackend.areaActual.id,
        nombre: tramiteBackend.areaActual.nombre,
        descripcion: tramiteBackend.areaActual.descripcion || "",
        activa: tramiteBackend.areaActual.activa || true
      } : void 0,
      trabajadorAsignado: tramiteBackend.usuarioAsignado ? {
        id: tramiteBackend.usuarioAsignado.id,
        nombre: tramiteBackend.usuarioAsignado.nombre,
        apellidos: tramiteBackend.usuarioAsignado.apellidos,
        correo: tramiteBackend.usuarioAsignado.correo,
        usuario: tramiteBackend.usuarioAsignado.usuario,
        foto: tramiteBackend.usuarioAsignado.foto,
        area: tramiteBackend.usuarioAsignado.area || { id: 0, nombre: "", descripcion: "", activa: true },
        role: tramiteBackend.usuarioAsignado.role || { id: 0, name: "", description: "" }
      } : void 0,
      documentos: tramiteBackend.documentosAdjuntos || [],
      historial: tramiteBackend.historial || []
    };
  }
  mapTramiteFromBackendConFirma(tramiteBackend) {
    const tramite = this.mapTramiteFromBackend(tramiteBackend);
    return __spreadProps(__spreadValues({}, tramite), {
      firmaDigital: {
        activa: tramiteBackend.firmaDigitalActiva || false,
        requiereBiometria: tramiteBackend.requiereBiometria || false,
        firmaValida: tramiteBackend.firmaValida || false,
        hashFirma: tramiteBackend.hashFirma || null,
        fechaFirma: tramiteBackend.fechaFirma ? new Date(tramiteBackend.fechaFirma) : null,
        metodoVerificacion: tramiteBackend.metodoVerificacion || null
      }
    });
  }
  getTipoTramiteIdFromEnum(tipoEnum) {
    const tiposMap = {
      "SOLICITUD_CERTIFICADO": 1,
      "SOLICITUD_CONSTANCIA": 2,
      "SOLICITUD_PERMISO": 3,
      "RECLAMO": 4,
      "SUGERENCIA": 5,
      "CONSULTA": 6,
      "LICENCIA": 7,
      "AUTORIZACION": 8,
      "REVISION_EXPEDIENTE": 9,
      "TRAMITE_ACADEMICO": 10,
      "TRAMITE_ADMINISTRATIVO": 11,
      "OTRO": 12
    };
    return tiposMap[tipoEnum] || 1;
  }
  getTipoTramiteNombreFromEnum(tipoEnum) {
    const tiposMap = {
      "SOLICITUD_CERTIFICADO": "Solicitud de Certificado",
      "SOLICITUD_CONSTANCIA": "Solicitud de Constancia",
      "SOLICITUD_PERMISO": "Solicitud de Permiso",
      "RECLAMO": "Reclamo",
      "SUGERENCIA": "Sugerencia",
      "CONSULTA": "Consulta",
      "LICENCIA": "Licencia",
      "AUTORIZACION": "Autorizaci\xF3n",
      "REVISION_EXPEDIENTE": "Revisi\xF3n de Expediente",
      "TRAMITE_ACADEMICO": "Tr\xE1mite Acad\xE9mico",
      "TRAMITE_ADMINISTRATIVO": "Tr\xE1mite Administrativo",
      "OTRO": "Otro"
    };
    return tiposMap[tipoEnum] || "Solicitud de Constancia";
  }
  getEstadoIdFromEnum(estadoEnum) {
    const estadosMap = {
      "BORRADOR": 1,
      "ENVIADO": 2,
      "EN_REVISION": 3,
      "DERIVADO": 4,
      "OBSERVADO": 5,
      "EN_PROCESO": 6,
      "APROBADO": 7,
      "RECHAZADO": 8,
      "FINALIZADO": 9,
      "ARCHIVADO": 10,
      "CANCELADO": 11
    };
    return estadosMap[estadoEnum] || 1;
  }
  getEstadoNombreFromEnum(estadoEnum) {
    const estadosMap = {
      "BORRADOR": "Borrador",
      "ENVIADO": "Enviado",
      "EN_REVISION": "En Revisi\xF3n",
      "DERIVADO": "Derivado",
      "OBSERVADO": "Observado",
      "EN_PROCESO": "En Proceso",
      "APROBADO": "Aprobado",
      "RECHAZADO": "Rechazado",
      "FINALIZADO": "Finalizado",
      "ARCHIVADO": "Archivado",
      "CANCELADO": "Cancelado"
    };
    return estadosMap[estadoEnum] || "Borrador";
  }
  getEstadoColorFromEnum(estadoEnum) {
    const colores = {
      "BORRADOR": "#6c757d",
      "ENVIADO": "#007bff",
      "EN_REVISION": "#ffc107",
      "DERIVADO": "#17a2b8",
      "OBSERVADO": "#fd7e14",
      "EN_PROCESO": "#20c997",
      "APROBADO": "#28a745",
      "RECHAZADO": "#dc3545",
      "FINALIZADO": "#6f42c1",
      "ARCHIVADO": "#343a40",
      "CANCELADO": "#6c757d"
    };
    return colores[estadoEnum] || "#6c757d";
  }
  getEstadoIconoFromEnum(estadoEnum) {
    const iconos = {
      "BORRADOR": "fas fa-edit",
      "ENVIADO": "fas fa-paper-plane",
      "EN_REVISION": "fas fa-search",
      "DERIVADO": "fas fa-share",
      "OBSERVADO": "fas fa-exclamation-triangle",
      "EN_PROCESO": "fas fa-cog",
      "APROBADO": "fas fa-check-circle",
      "RECHAZADO": "fas fa-times-circle",
      "FINALIZADO": "fas fa-flag-checkered",
      "ARCHIVADO": "fas fa-archive",
      "CANCELADO": "fas fa-ban"
    };
    return iconos[estadoEnum] || "fas fa-file";
  }
  isEstadoFinal(estadoEnum) {
    const finales = ["FINALIZADO", "ARCHIVADO", "CANCELADO"];
    return finales.includes(estadoEnum);
  }
  permiteEdicionEstado(estadoEnum) {
    const noPermiteEdicion = ["FINALIZADO", "ARCHIVADO", "CANCELADO"];
    return !noPermiteEdicion.includes(estadoEnum);
  }
  getPrioridadIdFromEnum(prioridadEnum) {
    const prioridadesMap = {
      "BAJA": 1,
      "NORMAL": 2,
      "ALTA": 3,
      "URGENTE": 4
    };
    return prioridadesMap[prioridadEnum] || 2;
  }
  getPrioridadNombreFromEnum(prioridadEnum) {
    const prioridadesMap = {
      "BAJA": "Baja",
      "NORMAL": "Normal",
      "ALTA": "Alta",
      "URGENTE": "Urgente"
    };
    return prioridadesMap[prioridadEnum] || "Normal";
  }
  getPrioridadNivelFromEnum(prioridadEnum) {
    const niveles = {
      "BAJA": 1,
      "NORMAL": 2,
      "ALTA": 3,
      "URGENTE": 4
    };
    return niveles[prioridadEnum] || 2;
  }
  getPrioridadColorFromEnum(prioridadEnum) {
    const colores = {
      "BAJA": "#28a745",
      "NORMAL": "#17a2b8",
      "ALTA": "#ffc107",
      "URGENTE": "#dc3545"
    };
    return colores[prioridadEnum] || "#17a2b8";
  }
  getPrioridadIconoFromEnum(prioridadEnum) {
    const iconos = {
      "BAJA": "fas fa-arrow-down",
      "NORMAL": "fas fa-minus",
      "ALTA": "fas fa-arrow-up",
      "URGENTE": "fas fa-exclamation"
    };
    return iconos[prioridadEnum] || "fas fa-minus";
  }
  getTipoTramiteNombre(tipoId) {
    const tipo = TIPOS_TRAMITE.find((t) => t.id === tipoId);
    return tipo?.nombre || "";
  }
  getPrioridadTramiteNombre(prioridadId) {
    const prioridad = PRIORIDADES_TRAMITE.find((p) => p.id === prioridadId);
    return prioridad?.nombre || "";
  }
  mapTipoTramiteToEnum(tipoId) {
    const tipoMap = {
      1: "TRAMITE_ADMINISTRATIVO",
      2: "TRAMITE_ADMINISTRATIVO",
      3: "SOLICITUD_CERTIFICADO",
      4: "AUTORIZACION",
      5: "SOLICITUD_PERMISO",
      6: "TRAMITE_ADMINISTRATIVO"
      // Convenios Interinstitucionales
    };
    return tipoMap[tipoId] || "OTRO";
  }
  mapPrioridadToEnum(prioridadId) {
    const prioridadMap = {
      1: "NORMAL",
      2: "ALTA",
      3: "URGENTE"
    };
    return prioridadMap[prioridadId] || "NORMAL";
  }
  editarTramiteUsuario(tramiteId, request) {
    return this.http.put(`${this.apiUrl}/${tramiteId}/editar`, request).pipe(tap(() => {
      this.toastService.success("Tr\xE1mite editado", "El tr\xE1mite ha sido editado correctamente. Se ha enviado una notificaci\xF3n por correo.");
    }), catchError((error) => {
      const mensaje = error?.error?.message || "No se pudo editar el tr\xE1mite";
      this.toastService.error("Error al editar", mensaje);
      throw error;
    }));
  }
  clearTramites() {
    this.tramitesSubject.next([]);
  }
  obtenerUsuariosPorArea(areaId) {
    return this.http.get(`${environment.apiUrl}/api/usuario-area/area/${areaId}/users`).pipe(catchError((error) => {
      console.error("Error al obtener usuarios por \xE1rea:", error);
      throw error;
    }));
  }
  static {
    this.\u0275fac = function TramiteService_Factory(t) {
      return new (t || _TramiteService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(ToastService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TramiteService, factory: _TramiteService.\u0275fac, providedIn: "root" });
  }
};

export {
  TramiteService
};
//# sourceMappingURL=chunk-DLKCR3ZE.js.map
