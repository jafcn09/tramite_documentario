import {
  MisTramitesService
} from "./chunk-D6OJPHZD.js";
import {
  TramiteService
} from "./chunk-DLKCR3ZE.js";
import {
  ToastService
} from "./chunk-NXAITARR.js";
import {
  AuthService
} from "./chunk-HNI5KL6U.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-T3F2XNQR.js";
import {
  BehaviorSubject,
  CommonModule,
  EventEmitter,
  HttpClient,
  HttpParams,
  NgForOf,
  NgIf,
  catchError,
  environment,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-VDZBNFIH.js";

// src/app/shared/interfaces/firma-digital.interface.ts
var TipoFirma;
(function(TipoFirma2) {
  TipoFirma2["SIMPLE"] = "SIMPLE";
  TipoFirma2["AVANZADA"] = "AVANZADA";
  TipoFirma2["CUALIFICADA"] = "CUALIFICADA";
  TipoFirma2["APROBACION"] = "APROBACION";
  TipoFirma2["RECHAZO"] = "RECHAZO";
  TipoFirma2["REVISION"] = "REVISION";
  TipoFirma2["CONFORMIDAD"] = "CONFORMIDAD";
})(TipoFirma || (TipoFirma = {}));
var EstadoFirma;
(function(EstadoFirma2) {
  EstadoFirma2["PENDIENTE"] = "PENDIENTE";
  EstadoFirma2["FIRMADO"] = "FIRMADO";
  EstadoFirma2["RECHAZADO"] = "RECHAZADO";
  EstadoFirma2["EXPIRADO"] = "EXPIRADO";
  EstadoFirma2["REVOCADO"] = "REVOCADO";
  EstadoFirma2["INVALIDADO"] = "INVALIDADO";
  EstadoFirma2["ERROR"] = "ERROR";
  EstadoFirma2["VERIFICANDO"] = "VERIFICANDO";
  EstadoFirma2["VERIFICADO"] = "VERIFICADO";
})(EstadoFirma || (EstadoFirma = {}));
var EstadoAutorizacion;
(function(EstadoAutorizacion2) {
  EstadoAutorizacion2["PENDIENTE"] = "PENDIENTE";
  EstadoAutorizacion2["AUTORIZADO"] = "AUTORIZADO";
  EstadoAutorizacion2["DENEGADO"] = "DENEGADO";
  EstadoAutorizacion2["REVOCADO"] = "REVOCADO";
  EstadoAutorizacion2["EXPIRADO"] = "EXPIRADO";
  EstadoAutorizacion2["NO_REQUERIDO"] = "NO_REQUERIDO";
})(EstadoAutorizacion || (EstadoAutorizacion = {}));

// src/app/services/firma-digital.service.ts
var FirmaDigitalService = class _FirmaDigitalService {
  constructor(http, toastService) {
    this.http = http;
    this.toastService = toastService;
    this.apiUrl = `${environment.apiUrl}/api/firmas-digitales`;
    this.firmasSubject = new BehaviorSubject([]);
    this.firmas$ = this.firmasSubject.asObservable();
    this.loadingSubject = new BehaviorSubject(false);
    this.loading$ = this.loadingSubject.asObservable();
    this.estadisticasSubject = new BehaviorSubject(null);
    this.estadisticas$ = this.estadisticasSubject.asObservable();
  }
  crearSolicitudFirma(request) {
    this.loadingSubject.next(true);
    return this.http.post(this.apiUrl, request).pipe(tap((response) => {
      this.toastService.success("Solicitud Creada", "La solicitud de firma digital ha sido creada exitosamente");
      this.cargarFirmas();
    }), catchError((error) => {
      this.toastService.error("Error al Crear Solicitud", "No se pudo crear la solicitud de firma digital");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  obtenerFirma(id) {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(catchError((error) => {
      this.toastService.error("Error al Cargar Firma", "No se pudo cargar la informaci\xF3n de la firma");
      return throwError(() => error);
    }));
  }
  actualizarFirma(id, request) {
    this.loadingSubject.next(true);
    return this.http.put(`${this.apiUrl}/${id}`, request).pipe(tap((response) => {
      this.toastService.success("Firma Actualizada", "La firma digital ha sido actualizada exitosamente");
      this.cargarFirmas();
    }), catchError((error) => {
      this.toastService.error("Error al Actualizar", "No se pudo actualizar la firma digital");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  eliminarFirma(id) {
    this.loadingSubject.next(true);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => {
      this.toastService.success("Firma Eliminada", "La firma digital ha sido eliminada exitosamente");
      this.cargarFirmas();
    }), catchError((error) => {
      this.toastService.error("Error al Eliminar", "No se pudo eliminar la firma digital");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  cargarFirmas(filtros, paginacion) {
    this.loadingSubject.next(true);
    let params = new HttpParams();
    if (paginacion) {
      params = params.set("page", paginacion.page.toString());
      params = params.set("size", paginacion.size.toString());
      if (paginacion.sort) {
        params = params.set("sort", paginacion.sort);
        params = params.set("direction", paginacion.direction || "asc");
      }
    }
    if (filtros) {
      if (filtros.estadoFirma && filtros.estadoFirma.length > 0) {
        params = params.set("estadoFirma", filtros.estadoFirma.join(","));
      }
      if (filtros.estadoAutorizacion && filtros.estadoAutorizacion.length > 0) {
        params = params.set("estadoAutorizacion", filtros.estadoAutorizacion.join(","));
      }
      if (filtros.tipoFirma && filtros.tipoFirma.length > 0) {
        params = params.set("tipoFirma", filtros.tipoFirma.join(","));
      }
      if (filtros.fechaDesde) {
        params = params.set("fechaDesde", filtros.fechaDesde.toISOString());
      }
      if (filtros.fechaHasta) {
        params = params.set("fechaHasta", filtros.fechaHasta.toISOString());
      }
      if (filtros.firmanteId) {
        params = params.set("firmanteId", filtros.firmanteId.toString());
      }
      if (filtros.tramiteId) {
        params = params.set("tramiteId", filtros.tramiteId.toString());
      }
      if (filtros.nivelAutorizacion && filtros.nivelAutorizacion.length > 0) {
        params = params.set("nivelAutorizacion", filtros.nivelAutorizacion.join(","));
      }
      if (filtros.requierePinAdicional !== void 0) {
        params = params.set("requierePinAdicional", filtros.requierePinAdicional.toString());
      }
    }
    return this.http.get(this.apiUrl, { params }).pipe(tap((response) => {
      this.firmasSubject.next(response.content);
    }), catchError((error) => {
      this.toastService.error("Error al Cargar Firmas", "No se pudieron cargar las firmas digitales");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  procesarAutorizacion(request) {
    this.loadingSubject.next(true);
    return this.http.post(`${this.apiUrl}/${request.firmaId}/autorizar`, request).pipe(tap((response) => {
      const mensaje = request.autorizar ? "autorizada" : "denegada";
      this.toastService.success("Autorizaci\xF3n Procesada", `La firma ha sido ${mensaje} exitosamente`);
      this.cargarFirmas();
    }), catchError((error) => {
      this.toastService.error("Error en Autorizaci\xF3n", "No se pudo procesar la autorizaci\xF3n");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  firmarDocumento(request) {
    this.loadingSubject.next(true);
    return this.http.post(`${this.apiUrl}/${request.firmaId}/firmar`, request).pipe(tap((response) => {
      this.toastService.success("Documento Firmado", "El documento ha sido firmado digitalmente");
      this.cargarFirmas();
    }), catchError((error) => {
      this.toastService.error("Error al Firmar", "No se pudo firmar el documento");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  verificarFirma(id) {
    return this.http.get(`${this.apiUrl}/${id}/verificar`).pipe(tap(() => {
      this.toastService.success("Verificaci\xF3n Completa", "La firma digital ha sido verificada");
    }), catchError((error) => {
      this.toastService.error("Error en Verificaci\xF3n", "No se pudo verificar la firma");
      return throwError(() => error);
    }));
  }
  obtenerFirmasPendientesAutorizacion(paginacion) {
    this.loadingSubject.next(true);
    let params = new HttpParams();
    if (paginacion) {
      params = params.set("page", paginacion.page.toString());
      params = params.set("size", paginacion.size.toString());
    }
    return this.http.get(`${this.apiUrl}/pendientes-autorizacion`, { params }).pipe(catchError((error) => {
      this.toastService.error("Error al Cargar", "No se pudieron cargar las firmas pendientes");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  obtenerFirmasPorTramite(tramiteId) {
    return this.http.get(`${this.apiUrl}/tramite/${tramiteId}`).pipe(catchError((error) => {
      this.toastService.error("Error al Cargar", "No se pudieron cargar las firmas del tr\xE1mite");
      return throwError(() => error);
    }));
  }
  verificarRequiereFirma(tramiteId) {
    return this.http.get(`${this.apiUrl}/tramite/${tramiteId}/requiere-firma`).pipe(catchError((error) => {
      return throwError(() => error);
    }));
  }
  responderTramiteConFirma(request) {
    this.loadingSubject.next(true);
    return this.http.post(`${this.apiUrl}/responder-tramite`, request).pipe(tap(() => {
      this.toastService.success("Respuesta Enviada", "La respuesta con firma digital ha sido enviada");
    }), catchError((error) => {
      this.toastService.error("Error al Responder", "No se pudo enviar la respuesta con firma");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  obtenerEstadisticas() {
    return this.http.get(`${this.apiUrl}/estadisticas`).pipe(tap((estadisticas) => {
      this.estadisticasSubject.next(estadisticas);
    }), catchError((error) => {
      this.toastService.error("Error al Cargar Estad\xEDsticas", "No se pudieron cargar las estad\xEDsticas de firmas");
      return throwError(() => error);
    }));
  }
  descargarDocumentoFirmado(id) {
    return this.http.get(`${this.apiUrl}/${id}/descargar-firmado`, {
      responseType: "blob"
    }).pipe(catchError((error) => {
      this.toastService.error("Error al Descargar", "No se pudo descargar el documento firmado");
      return throwError(() => error);
    }));
  }
  obtenerHistorialFirma(id) {
    return this.http.get(`${this.apiUrl}/${id}/historial`).pipe(catchError((error) => {
      this.toastService.error("Error al Cargar Historial", "No se pudo cargar el historial de la firma");
      return throwError(() => error);
    }));
  }
  revocarFirma(id, motivo) {
    this.loadingSubject.next(true);
    return this.http.post(`${this.apiUrl}/${id}/revocar`, { motivo }).pipe(tap(() => {
      this.toastService.success("Firma Revocada", "La firma ha sido revocada exitosamente");
      this.cargarFirmas();
    }), catchError((error) => {
      this.toastService.error("Error al Revocar", "No se pudo revocar la firma");
      return throwError(() => error);
    }), tap(() => this.loadingSubject.next(false)));
  }
  validarCertificado(id) {
    return this.http.post(`${this.apiUrl}/${id}/validar-certificado`, {}).pipe(tap(() => {
      this.toastService.success("Certificado Validado", "El certificado ha sido validado correctamente");
    }), catchError((error) => {
      this.toastService.error("Error en Validaci\xF3n", "No se pudo validar el certificado");
      return throwError(() => error);
    }));
  }
  obtenerTiposFirma() {
    return Object.values(TipoFirma);
  }
  obtenerEstadosFirma() {
    return Object.values(EstadoFirma);
  }
  obtenerEstadosAutorizacion() {
    return Object.values(EstadoAutorizacion);
  }
  getDescripcionTipoFirma(tipo) {
    const descripciones = {
      [TipoFirma.SIMPLE]: "Firma Simple",
      [TipoFirma.AVANZADA]: "Firma Electr\xF3nica Avanzada",
      [TipoFirma.CUALIFICADA]: "Firma Electr\xF3nica Cualificada",
      [TipoFirma.APROBACION]: "Firma de Aprobaci\xF3n",
      [TipoFirma.RECHAZO]: "Firma de Rechazo",
      [TipoFirma.REVISION]: "Firma de Revisi\xF3n",
      [TipoFirma.CONFORMIDAD]: "Firma de Conformidad"
    };
    return descripciones[tipo] || tipo;
  }
  getDescripcionEstadoFirma(estado) {
    const descripciones = {
      [EstadoFirma.PENDIENTE]: "Pendiente de Firma",
      [EstadoFirma.FIRMADO]: "Documento Firmado",
      [EstadoFirma.RECHAZADO]: "Firma Rechazada",
      [EstadoFirma.EXPIRADO]: "Tiempo de Firma Expirado",
      [EstadoFirma.REVOCADO]: "Firma Revocada",
      [EstadoFirma.INVALIDADO]: "Firma Invalidada",
      [EstadoFirma.ERROR]: "Error en el Proceso",
      [EstadoFirma.VERIFICANDO]: "Verificando Firma",
      [EstadoFirma.VERIFICADO]: "Firma Verificada"
    };
    return descripciones[estado] || estado;
  }
  getDescripcionEstadoAutorizacion(estado) {
    const descripciones = {
      [EstadoAutorizacion.PENDIENTE]: "Esperando Autorizaci\xF3n",
      [EstadoAutorizacion.AUTORIZADO]: "Autorizado para Firmar",
      [EstadoAutorizacion.DENEGADO]: "Autorizaci\xF3n Denegada",
      [EstadoAutorizacion.REVOCADO]: "Autorizaci\xF3n Revocada",
      [EstadoAutorizacion.EXPIRADO]: "Autorizaci\xF3n Expirada",
      [EstadoAutorizacion.NO_REQUERIDO]: "No Requiere Autorizaci\xF3n"
    };
    return descripciones[estado] || estado;
  }
  getColorEstadoFirma(estado) {
    const colores = {
      [EstadoFirma.PENDIENTE]: "bg-yellow-100 text-yellow-800",
      [EstadoFirma.FIRMADO]: "bg-green-100 text-green-800",
      [EstadoFirma.RECHAZADO]: "bg-red-100 text-red-800",
      [EstadoFirma.EXPIRADO]: "bg-gray-100 text-gray-800",
      [EstadoFirma.REVOCADO]: "bg-purple-100 text-purple-800",
      [EstadoFirma.INVALIDADO]: "bg-red-100 text-red-800",
      [EstadoFirma.ERROR]: "bg-red-100 text-red-800",
      [EstadoFirma.VERIFICANDO]: "bg-blue-100 text-blue-800",
      [EstadoFirma.VERIFICADO]: "bg-green-100 text-green-800"
    };
    return colores[estado] || "bg-gray-100 text-gray-800";
  }
  getColorEstadoAutorizacion(estado) {
    const colores = {
      [EstadoAutorizacion.PENDIENTE]: "bg-yellow-100 text-yellow-800",
      [EstadoAutorizacion.AUTORIZADO]: "bg-green-100 text-green-800",
      [EstadoAutorizacion.DENEGADO]: "bg-red-100 text-red-800",
      [EstadoAutorizacion.REVOCADO]: "bg-purple-100 text-purple-800",
      [EstadoAutorizacion.EXPIRADO]: "bg-gray-100 text-gray-800",
      [EstadoAutorizacion.NO_REQUERIDO]: "bg-blue-100 text-blue-800"
    };
    return colores[estado] || "bg-gray-100 text-gray-800";
  }
  static {
    this.\u0275fac = function FirmaDigitalService_Factory(t) {
      return new (t || _FirmaDigitalService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(ToastService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FirmaDigitalService, factory: _FirmaDigitalService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/tramites/components/responder-tramite-modal/responder-tramite-modal.component.ts
var _c0 = ["signatureCanvas"];
function ResponderTramiteModalComponent_div_84_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57);
    \u0275\u0275element(2, "i", 58);
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 61);
    \u0275\u0275listener("click", function ResponderTramiteModalComponent_div_84_div_1_Template_button_click_7_listener() {
      const i_r3 = \u0275\u0275restoreView(_r2).index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeFile(i_r3));
    });
    \u0275\u0275element(8, "i", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const archivo_r5 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(archivo_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r3.formatFileSize(archivo_r5.size), ")");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.loading);
  }
}
function ResponderTramiteModalComponent_div_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275template(1, ResponderTramiteModalComponent_div_84_div_1_Template, 9, 3, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.respuestaForm.archivos);
  }
}
function ResponderTramiteModalComponent_div_94_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r7 = ctx.$implicit;
    \u0275\u0275property("value", tipo_r7.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tipo_r7.label, " ");
  }
}
function ResponderTramiteModalComponent_div_94_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const depto_r8 = ctx.$implicit;
    \u0275\u0275property("value", depto_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", depto_r8.label, " ");
  }
}
function ResponderTramiteModalComponent_div_94_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95)(1, "label", 40);
    \u0275\u0275element(2, "i", 96);
    \u0275\u0275text(3, " Firma Capturada ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 97);
    \u0275\u0275element(5, "img", 98);
    \u0275\u0275elementStart(6, "button", 99);
    \u0275\u0275listener("click", function ResponderTramiteModalComponent_div_94_div_33_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.clearCanvas();
      return \u0275\u0275resetView(ctx_r3.respuestaForm.firmaDigitalData = null);
    });
    \u0275\u0275element(7, "i", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("src", ctx_r3.respuestaForm.firmaDigitalData, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.loading);
  }
}
function ResponderTramiteModalComponent_div_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 63)(2, "div", 64)(3, "label", 65);
    \u0275\u0275element(4, "i", 66);
    \u0275\u0275text(5, " Tipo de Firma ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 67);
    \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_div_94_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.respuestaForm.tipoFirma, $event) || (ctx_r3.respuestaForm.tipoFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(7, ResponderTramiteModalComponent_div_94_option_7_Template, 2, 2, "option", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 64)(9, "label", 69);
    \u0275\u0275element(10, "i", 70);
    \u0275\u0275text(11, " Departamento ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "select", 71);
    \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_div_94_Template_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.respuestaForm.ubicacionFirma, $event) || (ctx_r3.respuestaForm.ubicacionFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(13, ResponderTramiteModalComponent_div_94_option_13_Template, 2, 2, "option", 68);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 72)(15, "label", 73);
    \u0275\u0275element(16, "i", 74);
    \u0275\u0275text(17, " Raz\xF3n de la Firma ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_div_94_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.respuestaForm.razonFirma, $event) || (ctx_r3.respuestaForm.razonFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 76)(20, "label", 40);
    \u0275\u0275element(21, "i", 77);
    \u0275\u0275text(22, " Dibuje su Firma ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 78);
    \u0275\u0275element(24, "canvas", 79, 1);
    \u0275\u0275elementStart(26, "div", 80)(27, "button", 81);
    \u0275\u0275listener("click", function ResponderTramiteModalComponent_div_94_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearCanvas());
    });
    \u0275\u0275element(28, "i", 82);
    \u0275\u0275text(29, " Limpiar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 83);
    \u0275\u0275listener("click", function ResponderTramiteModalComponent_div_94_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.captureSignature());
    });
    \u0275\u0275element(31, "i", 84);
    \u0275\u0275text(32, " Capturar ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(33, ResponderTramiteModalComponent_div_94_div_33_Template, 8, 2, "div", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 86)(35, "label", 87)(36, "input", 88);
    \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_div_94_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.respuestaForm.consentimientoFirma, $event) || (ctx_r3.respuestaForm.consentimientoFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 89);
    \u0275\u0275element(38, "i", 90);
    \u0275\u0275text(39, " Confirmo que he dibujado mi firma digital y acepto que esta respuesta sea firmada electr\xF3nicamente bajo mi responsabilidad ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 91)(41, "div", 92);
    \u0275\u0275element(42, "i", 14);
    \u0275\u0275elementStart(43, "div", 93)(44, "strong");
    \u0275\u0275text(45, "Informaci\xF3n sobre la Firma Digital:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "ul")(47, "li");
    \u0275\u0275text(48, "Su firma ser\xE1 asociada con su usuario y ser\xE1 auditable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "li");
    \u0275\u0275text(50, "Se registrar\xE1 la fecha, hora y ubicaci\xF3n de la firma");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "li");
    \u0275\u0275text(52, "El documento firmado tendr\xE1 validez legal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "li");
    \u0275\u0275text(54, "No podr\xE1 ser modificado despu\xE9s de ser enviado");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.respuestaForm.tipoFirma);
    \u0275\u0275property("disabled", ctx_r3.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.tiposFirmaRespuesta);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.respuestaForm.ubicacionFirma);
    \u0275\u0275property("disabled", ctx_r3.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.departamentosPeru);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.respuestaForm.razonFirma);
    \u0275\u0275property("disabled", ctx_r3.loading);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("has-signature", ctx_r3.signatureExists);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r3.loading);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r3.loading || !ctx_r3.signatureExists);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r3.respuestaForm.firmaDigitalData);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.respuestaForm.consentimientoFirma);
    \u0275\u0275property("disabled", ctx_r3.loading);
  }
}
function ResponderTramiteModalComponent_span_119_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275text(2, " Enviar Respuesta ");
    \u0275\u0275elementEnd();
  }
}
function ResponderTramiteModalComponent_span_120_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275element(1, "i", 101);
    \u0275\u0275text(2, " Enviando... ");
    \u0275\u0275elementEnd();
  }
}
var ResponderTramiteModalComponent = class _ResponderTramiteModalComponent {
  constructor(tramiteService, toastService, firmaDigitalService, authService, http) {
    this.tramiteService = tramiteService;
    this.toastService = toastService;
    this.firmaDigitalService = firmaDigitalService;
    this.authService = authService;
    this.http = http;
    this.show = false;
    this.close = new EventEmitter();
    this.tramiteRespondido = new EventEmitter();
    this.respuestaForm = {
      respuesta: "",
      observaciones: "",
      asunto: "",
      archivos: [],
      requiereFirmaDigital: false,
      tipoFirma: TipoFirma.CONFORMIDAD,
      razonFirma: "",
      ubicacionFirma: "LIMA",
      firmaDigitalData: null,
      consentimientoFirma: false
    };
    this.ctx = null;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.signatureExists = false;
    this.tiposFirmaRespuesta = [];
    this.esEstudiante = false;
    this.departamentosPeru = [
      { value: "AMAZONAS", label: "Amazonas" },
      { value: "ANCASH", label: "\xC1ncash" },
      { value: "APURIMAC", label: "Apur\xEDmac" },
      { value: "AREQUIPA", label: "Arequipa" },
      { value: "AYACUCHO", label: "Ayacucho" },
      { value: "CAJAMARCA", label: "Cajamarca" },
      { value: "CALLAO", label: "Callao" },
      { value: "CUSCO", label: "Cusco" },
      { value: "HUANCAVELICA", label: "Huancavelica" },
      { value: "HUANUCO", label: "Hu\xE1nuco" },
      { value: "ICA", label: "Ica" },
      { value: "JUNIN", label: "Jun\xEDn" },
      { value: "LA_LIBERTAD", label: "La Libertad" },
      { value: "LAMBAYEQUE", label: "Lambayeque" },
      { value: "LIMA", label: "Lima" },
      { value: "LORETO", label: "Loreto" },
      { value: "MADRE_DE_DIOS", label: "Madre de Dios" },
      { value: "MOQUEGUA", label: "Moquegua" },
      { value: "PASCO", label: "Pasco" },
      { value: "PIURA", label: "Piura" },
      { value: "PUNO", label: "Puno" },
      { value: "SAN_MARTIN", label: "San Mart\xEDn" },
      { value: "TACNA", label: "Tacna" },
      { value: "TUMBES", label: "Tumbes" },
      { value: "UCAYALI", label: "Ucayali" }
    ];
    this.loading = false;
  }
  ngOnInit() {
    this.verificarRolUsuario();
    if (this.tramite) {
      this.respuestaForm.asunto = `Respuesta a su tr\xE1mite ${this.tramite.codigo} - ${this.tramite.asunto}`;
      this.respuestaForm.razonFirma = `Respuesta oficial al tr\xE1mite ${this.tramite.codigo}`;
    }
  }
  verificarRolUsuario() {
    const user = this.authService.currentUserValue;
    this.esEstudiante = user?.role?.name === "ESTUDIANTE";
    if (this.esEstudiante) {
      this.respuestaForm.tipoFirma = TipoFirma.SIMPLE;
      this.tiposFirmaRespuesta = [
        { value: TipoFirma.SIMPLE, label: "Firma Simple" }
      ];
    } else {
      this.tiposFirmaRespuesta = [
        { value: TipoFirma.SIMPLE, label: "Firma Simple" },
        { value: TipoFirma.CONFORMIDAD, label: "Conformidad" },
        { value: TipoFirma.AVANZADA, label: "Firma Avanzada" }
      ];
    }
  }
  ngAfterViewInit() {
    this.initializeCanvas();
  }
  initializeCanvas() {
    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;
      this.ctx = canvas.getContext("2d");
      if (this.ctx) {
        canvas.width = canvas.offsetWidth;
        canvas.height = 200;
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.clearCanvas();
        canvas.addEventListener("mousedown", this.startDrawing.bind(this));
        canvas.addEventListener("mousemove", this.draw.bind(this));
        canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
        canvas.addEventListener("mouseout", this.stopDrawing.bind(this));
        canvas.addEventListener("touchstart", this.handleTouchStart.bind(this));
        canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
        canvas.addEventListener("touchend", this.stopDrawing.bind(this));
      }
    }
  }
  startDrawing(e) {
    this.isDrawing = true;
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
  }
  draw(e) {
    if (!this.isDrawing || !this.ctx)
      return;
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    this.lastX = currentX;
    this.lastY = currentY;
    this.signatureExists = true;
  }
  stopDrawing() {
    this.isDrawing = false;
  }
  handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    this.isDrawing = true;
    this.lastX = touch.clientX - rect.left;
    this.lastY = touch.clientY - rect.top;
  }
  handleTouchMove(e) {
    e.preventDefault();
    if (!this.isDrawing || !this.ctx)
      return;
    const touch = e.touches[0];
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    this.lastX = currentX;
    this.lastY = currentY;
    this.signatureExists = true;
  }
  clearCanvas() {
    if (this.ctx && this.signatureCanvas) {
      const canvas = this.signatureCanvas.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.ctx.strokeStyle = "#ddd";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(50, canvas.height - 30);
      this.ctx.lineTo(canvas.width - 50, canvas.height - 30);
      this.ctx.stroke();
      this.ctx.fillStyle = "#888";
      this.ctx.font = "14px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Firme aqu\xED", canvas.width / 2, canvas.height - 10);
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 2;
      this.signatureExists = false;
      this.respuestaForm.firmaDigitalData = null;
    }
  }
  captureSignature() {
    if (this.signatureCanvas && this.signatureExists) {
      const canvas = this.signatureCanvas.nativeElement;
      this.respuestaForm.firmaDigitalData = canvas.toDataURL("image/png");
      this.toastService.success("Firma capturada", "La firma digital ha sido capturada correctamente");
    } else {
      this.toastService.warning("Sin firma", "Por favor, dibuje su firma antes de capturar");
    }
  }
  onRequiereFirmaChange() {
    if (this.respuestaForm.requiereFirmaDigital) {
      if (!this.respuestaForm.razonFirma) {
        this.respuestaForm.razonFirma = `Respuesta oficial al tr\xE1mite ${this.tramite.codigo}`;
      }
      setTimeout(() => {
        this.initializeCanvas();
      }, 100);
      this.toastService.info("Firma digital activada", "Complete los datos de la firma digital");
    } else {
      this.clearCanvas();
      this.respuestaForm.firmaDigitalData = null;
      this.respuestaForm.consentimientoFirma = false;
    }
  }
  onFileChange(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      for (const file of newFiles) {
        if (file.size > 10 * 1024 * 1024) {
          this.toastService.error("Archivo muy grande", "El archivo " + file.name + " excede el tama\xF1o m\xE1ximo de 10MB");
          event.target.value = "";
          return;
        }
        const archivoExistente = this.respuestaForm.archivos.find((existingFile) => existingFile.name === file.name && existingFile.size === file.size);
        if (archivoExistente) {
          this.toastService.warning("Archivo duplicado", "El archivo " + file.name + " ya ha sido seleccionado");
          continue;
        }
        this.respuestaForm.archivos.push(file);
      }
      event.target.value = "";
    }
  }
  removeFile(index) {
    this.respuestaForm.archivos.splice(index, 1);
  }
  onSubmit() {
    if (!this.respuestaForm.respuesta.trim()) {
      this.toastService.error("Respuesta requerida", "La respuesta es obligatoria");
      return;
    }
    if (this.respuestaForm.requiereFirmaDigital) {
      if (!this.respuestaForm.razonFirma.trim()) {
        this.toastService.error("Raz\xF3n de firma requerida", "Por favor indique la raz\xF3n de la firma digital");
        return;
      }
      if (!this.respuestaForm.consentimientoFirma) {
        this.toastService.error("Consentimiento requerido", "Debe confirmar que acepta firmar digitalmente esta respuesta");
        return;
      }
      if (!this.signatureExists || !this.respuestaForm.firmaDigitalData) {
        this.toastService.error("Firma requerida", "Por favor dibuje su firma antes de enviar");
        return;
      }
    }
    this.loading = true;
    const formData = new FormData();
    formData.append("respuesta", this.respuestaForm.respuesta);
    formData.append("observaciones", this.respuestaForm.observaciones);
    formData.append("asunto", this.respuestaForm.asunto);
    for (const archivo of this.respuestaForm.archivos) {
      formData.append("archivos", archivo);
    }
    if (this.respuestaForm.requiereFirmaDigital) {
      formData.append("requiereFirmaDigital", "true");
      formData.append("tipoFirma", this.respuestaForm.tipoFirma);
      formData.append("razonFirma", this.respuestaForm.razonFirma);
      formData.append("ubicacionFirma", this.respuestaForm.ubicacionFirma);
      formData.append("consentimientoFirma", String(this.respuestaForm.consentimientoFirma));
      if (this.respuestaForm.firmaDigitalData) {
        const base64Data = this.respuestaForm.firmaDigitalData.split(",")[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: "image/png" });
        formData.append("firmaDigitalArchivo", blob, "firma-digital.png");
      }
    }
    this.tramiteService.responderTramite(this.tramite.id, formData).subscribe({
      next: (response) => {
        const mensaje = this.respuestaForm.requiereFirmaDigital ? "Tr\xE1mite respondido con firma digital. Se ha enviado notificaci\xF3n al solicitante." : "Tr\xE1mite respondido. Se ha enviado notificaci\xF3n al solicitante por correo electr\xF3nico.";
        this.toastService.success("Respuesta enviada", mensaje);
        this.tramiteRespondido.emit(response);
        this.closeModal();
      },
      error: (error) => {
        this.toastService.error("Error al responder", "No se pudo responder el tr\xE1mite. Intente nuevamente.");
        this.loading = false;
      }
    });
  }
  closeModal() {
    const tipoFirmaInicial = this.esEstudiante ? TipoFirma.SIMPLE : TipoFirma.CONFORMIDAD;
    this.respuestaForm = {
      respuesta: "",
      observaciones: "",
      asunto: "",
      archivos: [],
      requiereFirmaDigital: false,
      tipoFirma: tipoFirmaInicial,
      razonFirma: "",
      ubicacionFirma: "LIMA",
      firmaDigitalData: null,
      consentimientoFirma: false
    };
    if (this.signatureCanvas) {
      this.clearCanvas();
    }
    this.signatureExists = false;
    this.loading = false;
    this.close.emit();
  }
  formatFileSize(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }
  static {
    this.\u0275fac = function ResponderTramiteModalComponent_Factory(t) {
      return new (t || _ResponderTramiteModalComponent)(\u0275\u0275directiveInject(TramiteService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(FirmaDigitalService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(HttpClient));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResponderTramiteModalComponent, selectors: [["app-responder-tramite-modal"]], viewQuery: function ResponderTramiteModalComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.signatureCanvas = _t.first);
      }
    }, inputs: { tramite: "tramite", show: "show" }, outputs: { close: "close", tramiteRespondido: "tramiteRespondido" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 121, vars: 28, consts: [["respuestaFormRef", "ngForm"], ["signatureCanvas", ""], [1, "modal-overlay", 3, "click"], [1, "modal-container", 3, "click"], [1, "modal-header"], [1, "header-content"], [1, "header-icon"], [1, "fas", "fa-paper-plane"], [1, "header-text"], ["type", "button", 1, "close-btn", 3, "click", "disabled"], [1, "fas", "fa-times"], [1, "modal-body"], [1, "tramite-info"], [1, "section-title"], [1, "fas", "fa-info-circle"], [1, "info-grid"], [1, "info-item"], [1, "estado-badge"], [1, "info-item", "full-width"], [1, "respuesta-form", 3, "ngSubmit"], [1, "form-group"], ["for", "asunto", 1, "form-label", "required"], [1, "fas", "fa-envelope"], ["type", "text", "id", "asunto", "name", "asunto", "required", "", "placeholder", "Asunto del correo de notificaci\xF3n", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], ["for", "respuesta", 1, "form-label", "required"], [1, "fas", "fa-comment-dots"], ["id", "respuesta", "name", "respuesta", "rows", "6", "required", "", "placeholder", "Escriba aqu\xED la respuesta al tr\xE1mite. Esta respuesta ser\xE1 enviada por correo al solicitante.", 1, "form-control", "textarea-respuesta", 3, "ngModelChange", "ngModel", "disabled"], [1, "form-help"], ["for", "observaciones", 1, "form-label"], [1, "fas", "fa-sticky-note"], ["id", "observaciones", "name", "observaciones", "rows", "3", "placeholder", "Observaciones adicionales (no se enviar\xE1n al solicitante)", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], ["for", "archivos", 1, "form-label"], [1, "fas", "fa-paperclip"], [1, "file-upload-area"], ["type", "file", "id", "archivos", "multiple", "", "accept", ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png", 1, "file-input", 3, "change", "disabled"], ["for", "archivos", 1, "file-upload-label"], [1, "fas", "fa-cloud-upload-alt"], ["class", "files-list", 4, "ngIf"], [1, "form-group", "signature-section"], [1, "signature-header"], [1, "form-label"], [1, "fas", "fa-signature"], [1, "signature-toggle"], ["type", "checkbox", "id", "requiereFirmaDigital", 3, "ngModelChange", "change", "ngModel", "disabled"], ["for", "requiereFirmaDigital", 1, "toggle-label"], ["class", "signature-config", 4, "ngIf"], [1, "important-notice"], [1, "notice-header"], [1, "fas", "fa-exclamation-triangle"], [1, "notice-content"], [1, "modal-footer"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], ["class", "btn-content", 4, "ngIf"], [1, "files-list"], ["class", "file-item", 4, "ngFor", "ngForOf"], [1, "file-item"], [1, "file-info"], [1, "fas", "fa-file-alt"], [1, "file-name"], [1, "file-size"], ["type", "button", 1, "remove-file-btn", 3, "click", "disabled"], [1, "signature-config"], [1, "signature-row"], [1, "signature-field"], ["for", "tipoFirma", 1, "form-label"], [1, "fas", "fa-certificate"], ["id", "tipoFirma", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "ubicacionFirma", 1, "form-label"], [1, "fas", "fa-map-marker-alt"], ["id", "ubicacionFirma", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], [1, "signature-field", "full-width"], ["for", "razonFirma", 1, "form-label", "required"], [1, "fas", "fa-comment"], ["type", "text", "id", "razonFirma", "placeholder", "Motivo por el cual se firma esta respuesta", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], [1, "signature-canvas-container"], [1, "fas", "fa-pen-fancy"], [1, "canvas-wrapper"], [1, "signature-canvas"], [1, "canvas-controls"], ["type", "button", 1, "btn-canvas", "clear", 3, "click", "disabled"], [1, "fas", "fa-eraser"], ["type", "button", 1, "btn-canvas", "capture", 3, "click", "disabled"], [1, "fas", "fa-save"], ["class", "signature-preview", 4, "ngIf"], [1, "signature-consent"], [1, "consent-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel", "disabled"], [1, "consent-text"], [1, "fas", "fa-shield-alt"], [1, "signature-info"], [1, "info-box"], [1, "info-content"], [3, "value"], [1, "signature-preview"], [1, "fas", "fa-eye"], [1, "preview-container"], ["alt", "Firma digital capturada", 1, "signature-image", 3, "src"], ["type", "button", 1, "btn-remove-signature", 3, "click", "disabled"], [1, "btn-content"], [1, "fas", "fa-spinner", "fa-spin"]], template: function ResponderTramiteModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2);
        \u0275\u0275listener("click", function ResponderTramiteModalComponent_Template_div_click_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275elementStart(1, "div", 3);
        \u0275\u0275listener("click", function ResponderTramiteModalComponent_Template_div_click_1_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView($event.stopPropagation());
        });
        \u0275\u0275elementStart(2, "div", 4)(3, "div", 5)(4, "div", 6);
        \u0275\u0275element(5, "i", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 8)(7, "h2");
        \u0275\u0275text(8, "Responder Tr\xE1mite");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p");
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "button", 9);
        \u0275\u0275listener("click", function ResponderTramiteModalComponent_Template_button_click_11_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275element(12, "i", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 11)(14, "div", 12)(15, "h3", 13);
        \u0275\u0275element(16, "i", 14);
        \u0275\u0275text(17, " Informaci\xF3n del Tr\xE1mite ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 15)(19, "div", 16)(20, "label");
        \u0275\u0275text(21, "C\xF3digo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "span");
        \u0275\u0275text(23);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 16)(25, "label");
        \u0275\u0275text(26, "Solicitante");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "span");
        \u0275\u0275text(28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 16)(30, "label");
        \u0275\u0275text(31, "Tipo");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "span");
        \u0275\u0275text(33);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "div", 16)(35, "label");
        \u0275\u0275text(36, "Estado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "span", 17);
        \u0275\u0275text(38);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 18)(40, "label");
        \u0275\u0275text(41, "Asunto");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "span");
        \u0275\u0275text(43);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(44, "div", 18)(45, "label");
        \u0275\u0275text(46, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "span");
        \u0275\u0275text(48);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(49, "form", 19, 0);
        \u0275\u0275listener("ngSubmit", function ResponderTramiteModalComponent_Template_form_ngSubmit_49_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275elementStart(51, "div", 20)(52, "label", 21);
        \u0275\u0275element(53, "i", 22);
        \u0275\u0275text(54, " Asunto del correo ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "input", 23);
        \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_Template_input_ngModelChange_55_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.respuestaForm.asunto, $event) || (ctx.respuestaForm.asunto = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "div", 20)(57, "label", 24);
        \u0275\u0275element(58, "i", 25);
        \u0275\u0275text(59, " Respuesta ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "textarea", 26);
        \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_Template_textarea_ngModelChange_60_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.respuestaForm.respuesta, $event) || (ctx.respuestaForm.respuesta = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275text(61, "          ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "small", 27);
        \u0275\u0275element(63, "i", 14);
        \u0275\u0275text(64, " Esta respuesta ser\xE1 enviada autom\xE1ticamente por correo electr\xF3nico al solicitante. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(65, "div", 20)(66, "label", 28);
        \u0275\u0275element(67, "i", 29);
        \u0275\u0275text(68, " Observaciones internas (opcional) ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "textarea", 30);
        \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_Template_textarea_ngModelChange_69_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.respuestaForm.observaciones, $event) || (ctx.respuestaForm.observaciones = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275text(70, "          ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(71, "div", 20)(72, "label", 31);
        \u0275\u0275element(73, "i", 32);
        \u0275\u0275text(74, " Archivos de respuesta (opcional) ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "div", 33)(76, "input", 34);
        \u0275\u0275listener("change", function ResponderTramiteModalComponent_Template_input_change_76_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFileChange($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(77, "label", 35);
        \u0275\u0275element(78, "i", 36);
        \u0275\u0275elementStart(79, "span");
        \u0275\u0275text(80, "Seleccionar archivos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(81, "small", 27);
        \u0275\u0275element(82, "i", 14);
        \u0275\u0275text(83, " M\xE1ximo 10MB por archivo. Formatos: PDF, Word, Excel, im\xE1genes. ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(84, ResponderTramiteModalComponent_div_84_Template, 2, 1, "div", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "div", 38)(86, "div", 39)(87, "label", 40);
        \u0275\u0275element(88, "i", 41);
        \u0275\u0275text(89, " Firma Digital ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "div", 42)(91, "input", 43);
        \u0275\u0275twoWayListener("ngModelChange", function ResponderTramiteModalComponent_Template_input_ngModelChange_91_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.respuestaForm.requiereFirmaDigital, $event) || (ctx.respuestaForm.requiereFirmaDigital = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("change", function ResponderTramiteModalComponent_Template_input_change_91_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onRequiereFirmaChange());
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(92, "label", 44);
        \u0275\u0275text(93, " Firmar digitalmente esta respuesta ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(94, ResponderTramiteModalComponent_div_94_Template, 55, 15, "div", 45);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "div", 46)(96, "div", 47);
        \u0275\u0275element(97, "i", 48);
        \u0275\u0275elementStart(98, "strong");
        \u0275\u0275text(99, "Importante");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(100, "div", 49)(101, "p");
        \u0275\u0275text(102, "Al responder este tr\xE1mite:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(103, "ul")(104, "li");
        \u0275\u0275text(105, "Se enviar\xE1 una notificaci\xF3n por correo electr\xF3nico al solicitante");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(106, "li");
        \u0275\u0275text(107, "El tr\xE1mite cambiar\xE1 a estado ");
        \u0275\u0275elementStart(108, "strong");
        \u0275\u0275text(109, "FINALIZADO");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(110, "li");
        \u0275\u0275text(111, "Se registrar\xE1 como documento procesado en las estad\xEDsticas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "li");
        \u0275\u0275text(113, "Usted quedar\xE1 registrado como el responsable de la respuesta");
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(114, "div", 50)(115, "button", 51);
        \u0275\u0275listener("click", function ResponderTramiteModalComponent_Template_button_click_115_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.closeModal());
        });
        \u0275\u0275element(116, "i", 10);
        \u0275\u0275text(117, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(118, "button", 52);
        \u0275\u0275listener("click", function ResponderTramiteModalComponent_Template_button_click_118_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275template(119, ResponderTramiteModalComponent_span_119_Template, 3, 0, "span", 53)(120, ResponderTramiteModalComponent_span_120_Template, 3, 0, "span", 53);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("show", ctx.show);
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate(ctx.tramite == null ? null : ctx.tramite.codigo);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(12);
        \u0275\u0275textInterpolate(ctx.tramite == null ? null : ctx.tramite.codigo);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate2("", (ctx.tramite == null ? null : ctx.tramite.usuarioSolicitante == null ? null : ctx.tramite.usuarioSolicitante.nombre) || "No asignado", " ", (ctx.tramite == null ? null : ctx.tramite.usuarioSolicitante == null ? null : ctx.tramite.usuarioSolicitante.apellidos) || "", "");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.tramite == null ? null : ctx.tramite.tipoTramite == null ? null : ctx.tramite.tipoTramite.nombre);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.tramite == null ? null : ctx.tramite.estado == null ? null : ctx.tramite.estado.nombre);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.tramite == null ? null : ctx.tramite.asunto);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.tramite == null ? null : ctx.tramite.descripcion);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.respuestaForm.asunto);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.respuestaForm.respuesta);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.respuestaForm.observaciones);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275classProp("disabled", ctx.loading);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.respuestaForm.archivos.length > 0);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.respuestaForm.requiereFirmaDigital);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.respuestaForm.requiereFirmaDigital);
        \u0275\u0275advance(21);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.loading || !(ctx.respuestaForm.respuesta == null ? null : ctx.respuestaForm.respuesta.trim()));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n.modal-overlay.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);\n  width: 90%;\n  max-width: 800px;\n  max-height: 90vh;\n  overflow: hidden;\n  transform: translateY(30px) scale(0.9);\n  transition: transform 0.3s ease;\n}\n.modal-overlay.show[_ngcontent-%COMP%]   .modal-container[_ngcontent-%COMP%] {\n  transform: translateY(0) scale(1);\n}\n.modal-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: white;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n}\n.header-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 600;\n}\n.header-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0 0;\n  opacity: 0.9;\n  font-size: 14px;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  border: none;\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  color: white;\n  cursor: pointer;\n  transition: background 0.2s ease;\n  font-size: 16px;\n}\n.close-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(255, 255, 255, 0.3);\n}\n.close-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-height: 60vh;\n  overflow-y: auto;\n}\n.tramite-info[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 24px;\n}\n.section-title[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 16px;\n  font-weight: 600;\n  margin: 0 0 16px 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.info-item.full-width[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #334155;\n  font-size: 14px;\n  line-height: 1.4;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  background: #ddd6fe;\n  color: #7c3aed;\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  width: fit-content;\n}\n.respuesta-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #374151;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.form-label.required[_ngcontent-%COMP%]::after {\n  content: "*";\n  color: #ef4444;\n  font-weight: bold;\n}\n.form-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n  width: 16px;\n}\n.form-control[_ngcontent-%COMP%] {\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 12px 16px;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  background: white;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-control[_ngcontent-%COMP%]:disabled {\n  background: #f9fafb;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.textarea-respuesta[_ngcontent-%COMP%] {\n  min-height: 120px;\n  resize: vertical;\n}\n.form-help[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.form-help[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.file-upload-area[_ngcontent-%COMP%] {\n  position: relative;\n}\n.file-input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n.file-upload-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 16px;\n  border: 2px dashed #d1d5db;\n  border-radius: 8px;\n  background: #f9fafb;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.file-upload-label[_ngcontent-%COMP%]:hover:not(.disabled) {\n  border-color: #667eea;\n  background: #f0f4ff;\n  color: #667eea;\n}\n.file-upload-label.disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.files-list[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.file-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n.file-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #374151;\n  font-size: 14px;\n}\n.file-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.file-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.file-size[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 12px;\n}\n.remove-file-btn[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 12px;\n}\n.remove-file-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fee2e2;\n  border-color: #f87171;\n}\n.remove-file-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.important-notice[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border: 1px solid #fed7aa;\n  border-radius: 8px;\n  padding: 16px;\n}\n.notice-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #92400e;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.notice-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n.notice-content[_ngcontent-%COMP%] {\n  color: #92400e;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.notice-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n}\n.notice-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 20px;\n}\n.notice-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  background: #f8fafc;\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  border-top: 1px solid #e2e8f0;\n}\n.btn-secondary[_ngcontent-%COMP%], .btn-primary[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #374151;\n  border: 1px solid #d1d5db;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #5a67d8 0%,\n      #6b3d8f 100%);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.btn-secondary[_ngcontent-%COMP%]:disabled, .btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.btn-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n@media (max-width: 768px) {\n  .modal-container[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 20px;\n    max-height: 95vh;\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 16px 20px;\n  }\n  .header-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding: 16px 20px;\n    flex-direction: column;\n  }\n  .btn-secondary[_ngcontent-%COMP%], .btn-primary[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n.signature-section[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9ff 0%,\n      #f0f4ff 100%);\n  border: 2px solid #e0e7ff;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 20px 0;\n}\n.signature-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #e0e7ff;\n}\n.signature-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.toggle-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #374151;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.signature-toggle[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  accent-color: #667eea;\n}\n.signature-config[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease-out;\n}\n.signature-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.signature-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.signature-field.full-width[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.signature-canvas-container[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.canvas-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  border: 2px dashed #667eea;\n  border-radius: 8px;\n  background: white;\n  padding: 16px;\n}\n.signature-canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  cursor: crosshair;\n  background: white;\n  touch-action: none;\n}\n.signature-canvas.has-signature[_ngcontent-%COMP%] {\n  border-color: #10b981;\n  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);\n}\n.canvas-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n  justify-content: center;\n}\n.btn-canvas[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.2s ease;\n}\n.btn-canvas.clear[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.btn-canvas.clear[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fecaca;\n}\n.btn-canvas.capture[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #059669;\n}\n.btn-canvas.capture[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #a7f3d0;\n}\n.btn-canvas[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.signature-preview[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 16px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n.preview-container[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  background: white;\n  padding: 8px;\n}\n.signature-image[_ngcontent-%COMP%] {\n  max-width: 200px;\n  max-height: 100px;\n  display: block;\n}\n.btn-remove-signature[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  width: 24px;\n  height: 24px;\n  border: none;\n  border-radius: 50%;\n  background: #ef4444;\n  color: white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  transition: background 0.2s ease;\n}\n.btn-remove-signature[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dc2626;\n}\n.signature-consent[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  padding: 16px;\n  background: #fef3c7;\n  border: 1px solid #f59e0b;\n  border-radius: 8px;\n}\n.consent-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.consent-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  margin-top: 2px;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  accent-color: #f59e0b;\n}\n.consent-text[_ngcontent-%COMP%] {\n  color: #92400e;\n  font-size: 14px;\n  line-height: 1.4;\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n}\n.consent-text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-top: 2px;\n  color: #f59e0b;\n}\n.signature-info[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.info-box[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #eff6ff;\n  border: 1px solid #dbeafe;\n  border-radius: 8px;\n  display: flex;\n  gap: 12px;\n}\n.info-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  margin-top: 2px;\n}\n.info-content[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #1e40af;\n  font-size: 14px;\n}\n.info-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  color: #1d4ed8;\n}\n.info-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 16px;\n}\n.info-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n  line-height: 1.4;\n}\n.signature-notice[_ngcontent-%COMP%] {\n  color: #7c3aed !important;\n  font-weight: 600 !important;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.signature-field[_ngcontent-%COMP%]   input.ng-invalid.ng-touched[_ngcontent-%COMP%], .signature-field[_ngcontent-%COMP%]   select.ng-invalid.ng-touched[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);\n}\n.signature-field[_ngcontent-%COMP%]   input.ng-valid.ng-touched[_ngcontent-%COMP%], .signature-field[_ngcontent-%COMP%]   select.ng-valid.ng-touched[_ngcontent-%COMP%] {\n  border-color: #10b981;\n  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);\n}\n@media (max-width: 768px) {\n  .signature-section[_ngcontent-%COMP%] {\n    margin: 16px 0;\n    padding: 16px;\n  }\n  .signature-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .signature-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .canvas-wrapper[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .signature-canvas[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .canvas-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .btn-canvas[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .consent-label[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .consent-text[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .signature-image[_ngcontent-%COMP%] {\n    max-width: 150px;\n    max-height: 75px;\n  }\n}\n/*# sourceMappingURL=responder-tramite-modal.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResponderTramiteModalComponent, { className: "ResponderTramiteModalComponent" });
})();

// src/app/features/bandeja-tramites/components/rechazar-tramite-modal/rechazar-tramite-modal.component.ts
function RechazarTramiteModalComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function RechazarTramiteModalComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrar());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function RechazarTramiteModalComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "h2");
    \u0275\u0275text(4, "Rechazar Tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 4);
    \u0275\u0275listener("click", function RechazarTramiteModalComponent_div_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrar());
    });
    \u0275\u0275element(6, "i", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "span", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 9)(12, "label", 10);
    \u0275\u0275text(13, "Motivo del Rechazo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "textarea", 11);
    \u0275\u0275twoWayListener("ngModelChange", function RechazarTramiteModalComponent_div_0_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.motivo, $event) || (ctx_r1.motivo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 12);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 9)(18, "label", 13);
    \u0275\u0275text(19, "Observaciones (Opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "textarea", 14);
    \u0275\u0275twoWayListener("ngModelChange", function RechazarTramiteModalComponent_div_0_Template_textarea_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.observaciones, $event) || (ctx_r1.observaciones = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 12);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 15);
    \u0275\u0275element(24, "i", 16);
    \u0275\u0275elementStart(25, "div", 17)(26, "strong");
    \u0275\u0275text(27, "Al rechazar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "ul")(29, "li");
    \u0275\u0275text(30, 'El estado cambiar\xE1 a "RECHAZADO"');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "li");
    \u0275\u0275text(32, "Se notificar\xE1 al solicitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "li");
    \u0275\u0275text(34, "Esta acci\xF3n no se puede deshacer");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(35, "div", 18)(36, "button", 19);
    \u0275\u0275listener("click", function RechazarTramiteModalComponent_div_0_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrar());
    });
    \u0275\u0275text(37, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 20);
    \u0275\u0275listener("click", function RechazarTramiteModalComponent_div_0_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmar());
    });
    \u0275\u0275element(39, "i", 21);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.cargando);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramite == null ? null : ctx_r1.tramite.codigo);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.motivo);
    \u0275\u0275property("disabled", ctx_r1.cargando);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.motivo.length, "/1000");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.observaciones);
    \u0275\u0275property("disabled", ctx_r1.cargando);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.observaciones.length, "/500");
    \u0275\u0275advance(14);
    \u0275\u0275property("disabled", ctx_r1.cargando);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.motivo.trim() || ctx_r1.cargando);
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-spinner", ctx_r1.cargando)("fa-spin", ctx_r1.cargando)("fa-times-circle", !ctx_r1.cargando);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.cargando ? "Rechazando..." : "Rechazar", " ");
  }
}
var RechazarTramiteModalComponent = class _RechazarTramiteModalComponent {
  constructor(misTramitesService, toastService) {
    this.misTramitesService = misTramitesService;
    this.toastService = toastService;
    this.show = false;
    this.tramite = null;
    this.close = new EventEmitter();
    this.rechazado = new EventEmitter();
    this.motivo = "";
    this.observaciones = "";
    this.cargando = false;
  }
  ngOnInit() {
  }
  confirmar() {
    if (!this.tramite || !this.motivo.trim()) {
      this.toastService.warning("Motivo requerido", "Debe proporcionar un motivo para el rechazo");
      return;
    }
    this.cargando = true;
    this.misTramitesService.rechazarTramite(this.tramite.id, this.motivo.trim(), this.observaciones.trim() || void 0).subscribe({
      next: () => {
        this.cargando = false;
        this.toastService.success("Tr\xE1mite rechazado", `El tr\xE1mite ${this.tramite?.codigo} ha sido rechazado correctamente`);
        this.rechazado.emit({ codigo: this.tramite?.codigo });
        this.cerrar();
      },
      error: () => {
        this.cargando = false;
        this.toastService.error("Error al rechazar", "No se pudo rechazar el tr\xE1mite. Intente nuevamente.");
      }
    });
  }
  cerrar() {
    this.motivo = "";
    this.observaciones = "";
    this.cargando = false;
    this.close.emit();
  }
  static {
    this.\u0275fac = function RechazarTramiteModalComponent_Factory(t) {
      return new (t || _RechazarTramiteModalComponent)(\u0275\u0275directiveInject(MisTramitesService), \u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RechazarTramiteModalComponent, selectors: [["app-rechazar-tramite-modal"]], inputs: { show: "show", tramite: "tramite" }, outputs: { close: "close", rechazado: "rechazado" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "modal-overlay", 3, "click"], [1, "modal-dialog", 3, "click"], [1, "modal-header"], [1, "close-btn", 3, "click", "disabled"], [1, "fas", "fa-times"], [1, "modal-body"], [1, "tramite-info"], [1, "codigo-label"], [1, "form-group"], ["for", "motivo"], ["id", "motivo", "placeholder", "Describa brevemente el motivo...", "rows", "4", "maxlength", "1000", 3, "ngModelChange", "ngModel", "disabled"], [1, "char-count"], ["for", "observaciones"], ["id", "observaciones", "placeholder", "Observaciones adicionales...", "rows", "3", "maxlength", "500", 3, "ngModelChange", "ngModel", "disabled"], [1, "info-box"], [1, "fas", "fa-info-circle"], [1, "info-text"], [1, "modal-footer"], [1, "btn", "btn-cancel", 3, "click", "disabled"], [1, "btn", "btn-reject", 3, "click", "disabled"], [1, "fas"]], template: function RechazarTramiteModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, RechazarTramiteModalComponent_div_0_Template, 41, 17, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.show);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ['\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  width: 100%;\n  max-width: 480px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 28px 28px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #f0f0f0;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 700;\n  color: #1a202c;\n  letter-spacing: -0.3px;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #a0aec0;\n  transition: all 0.2s ease;\n  font-size: 18px;\n}\n.close-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f7fafc;\n  color: #4a5568;\n}\n.close-btn[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 28px;\n  max-height: calc(80vh - 160px);\n  overflow-y: auto;\n}\n.tramite-info[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.codigo-label[_ngcontent-%COMP%] {\n  background: #f0f4ff;\n  color: #667eea;\n  padding: 6px 12px;\n  border-radius: 8px;\n  font-family: "Courier New", monospace;\n  font-size: 13px;\n  font-weight: 600;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 8px;\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 14px;\n  border: 1.5px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 14px;\n  font-family: inherit;\n  color: #2d3748;\n  resize: none;\n  transition: all 0.2s ease;\n  background: #fafbfc;\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  background: white;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background: #f7fafc;\n  color: #a0aec0;\n  cursor: not-allowed;\n}\n.char-count[_ngcontent-%COMP%] {\n  display: block;\n  text-align: right;\n  font-size: 12px;\n  color: #a0aec0;\n  margin-top: 6px;\n}\n.info-box[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fef5e7 0%,\n      #fef9f0 100%);\n  border-left: 4px solid #ed8936;\n  padding: 16px 14px;\n  border-radius: 10px;\n  display: flex;\n  gap: 12px;\n  margin: 24px 0 0;\n}\n.info-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #ed8936;\n  font-size: 16px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.info-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.info-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #744210;\n  font-size: 13px;\n  margin-bottom: 6px;\n}\n.info-text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 18px;\n  font-size: 12px;\n  color: #744210;\n  line-height: 1.6;\n}\n.info-text[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 3px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 20px 28px 28px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  border-top: 1px solid #f0f0f0;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 11px 24px;\n  border-radius: 10px;\n  font-size: 14px;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.2s ease;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  background: #f0f4ff;\n  color: #667eea;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e8edff;\n}\n.btn-cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-reject[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e53e3e,\n      #c53030);\n  color: white;\n}\n.btn-reject[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #c53030,\n      #9c2626);\n  box-shadow: 0 8px 16px rgba(229, 62, 62, 0.3);\n  transform: translateY(-1px);\n}\n.btn-reject[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n@media (max-width: 480px) {\n  .modal-dialog[_ngcontent-%COMP%] {\n    margin: 16px;\n    max-width: calc(100% - 32px);\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 20px;\n    max-height: calc(80vh - 120px);\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding: 16px 20px 20px;\n    gap: 8px;\n  }\n  .btn[_ngcontent-%COMP%] {\n    padding: 10px 18px;\n    font-size: 13px;\n  }\n  .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n/*# sourceMappingURL=rechazar-tramite-modal.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RechazarTramiteModalComponent, { className: "RechazarTramiteModalComponent" });
})();

export {
  TipoFirma,
  FirmaDigitalService,
  ResponderTramiteModalComponent,
  RechazarTramiteModalComponent
};
//# sourceMappingURL=chunk-QHHF3ZTO.js.map
