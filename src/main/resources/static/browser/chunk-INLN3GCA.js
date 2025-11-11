import {
  NotificacionService
} from "./chunk-FCMH7YRL.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-T5HD73DN.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HL73AAZ4.js";

// src/app/components/notificaciones/notificacion-detalle/notificacion-detalle.component.ts
function NotificacionDetalleComponent_div_7_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "i", 28);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Le\xEDda: ", ctx_r1.formatearFecha(ctx_r1.notificacion.fechaLectura), "");
  }
}
function NotificacionDetalleComponent_div_7_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Vence: ", ctx_r1.formatearFecha(ctx_r1.notificacion.fechaVencimiento), "");
  }
}
function NotificacionDetalleComponent_div_7_div_27_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 35);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r3.key, ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.value);
  }
}
function NotificacionDetalleComponent_div_7_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "h3");
    \u0275\u0275text(2, "Informaci\xF3n Adicional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 31);
    \u0275\u0275template(4, NotificacionDetalleComponent_div_7_div_27_div_4_Template, 5, 2, "div", 32);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.getMetadatosArray());
  }
}
function NotificacionDetalleComponent_div_7_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function NotificacionDetalleComponent_div_7_button_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.marcarComoLeida());
    });
    \u0275\u0275element(1, "i", 37);
    \u0275\u0275text(2, " Marcar como le\xEDda ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionDetalleComponent_div_7_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 38);
    \u0275\u0275listener("click", function NotificacionDetalleComponent_div_7_button_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.irARutaDestino());
    });
    \u0275\u0275element(1, "i", 39);
    \u0275\u0275text(2, " Ir al contenido relacionado ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionDetalleComponent_div_7_button_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function NotificacionDetalleComponent_div_7_button_31_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verTramite());
    });
    \u0275\u0275element(1, "i", 41);
    \u0275\u0275text(2, " Ver tr\xE1mite ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionDetalleComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "div", 9);
    \u0275\u0275element(3, "i");
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 10);
    \u0275\u0275element(7, "i", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 12)(10, "h1");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 13);
    \u0275\u0275element(13, "i", 14);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 15)(16, "div", 16);
    \u0275\u0275element(17, "i", 17);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, NotificacionDetalleComponent_div_7_div_20_Template, 4, 1, "div", 18)(21, NotificacionDetalleComponent_div_7_div_21_Template, 4, 1, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 19)(23, "h3");
    \u0275\u0275text(24, "Mensaje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 20);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(27, NotificacionDetalleComponent_div_7_div_27_Template, 5, 1, "div", 21);
    \u0275\u0275elementStart(28, "div", 22);
    \u0275\u0275template(29, NotificacionDetalleComponent_div_7_button_29_Template, 3, 0, "button", 23)(30, NotificacionDetalleComponent_div_7_button_30_Template, 3, 0, "button", 24)(31, NotificacionDetalleComponent_div_7_button_31_Template, 3, 0, "button", 25);
    \u0275\u0275elementStart(32, "button", 26);
    \u0275\u0275listener("click", function NotificacionDetalleComponent_div_7_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.eliminarNotificacion());
    });
    \u0275\u0275element(33, "i", 27);
    \u0275\u0275text(34, " Eliminar notificaci\xF3n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "tipo-" + ctx_r1.notificacion.tipo.toLowerCase());
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getIcono(ctx_r1.notificacion.tipo));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getTipoLabel(ctx_r1.notificacion.tipo));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.notificacion.esLeida ? "leida" : "no-leida");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.notificacion.esLeida ? "fa-check-circle" : "fa-circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificacion.esLeida ? "Le\xEDda" : "No le\xEDda", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.notificacion.titulo);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "prioridad-" + ctx_r1.notificacion.prioridad.toLowerCase());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Prioridad ", ctx_r1.notificacion.prioridad, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Recibida: ", ctx_r1.formatearFecha(ctx_r1.notificacion.fechaCreacion), "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacion.fechaLectura);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacion.fechaVencimiento);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificacion.mensaje, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacion.metadatos);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.notificacion.esLeida);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacion.rutaDestino);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacion.referenciaId && ctx_r1.esTramite());
  }
}
function NotificacionDetalleComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "i", 43);
    \u0275\u0275text(2, " Cargando notificaci\xF3n... ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionDetalleComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "i", 45);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 36);
    \u0275\u0275listener("click", function NotificacionDetalleComponent_div_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cargarNotificacion());
    });
    \u0275\u0275text(5, "Reintentar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
var NotificacionDetalleComponent = class _NotificacionDetalleComponent {
  constructor(route, router, notificacionService) {
    this.route = route;
    this.router = router;
    this.notificacionService = notificacionService;
    this.notificacion = null;
    this.cargando = false;
    this.error = "";
    this.notificacionId = 0;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.notificacionId = +params["id"];
      if (this.notificacionId) {
        this.cargarNotificacion();
      }
    });
  }
  cargarNotificacion() {
    this.cargando = true;
    this.error = "";
    this.notificacionService.obtenerNotificacionPorId(this.notificacionId).subscribe({
      next: (notificacion) => {
        this.notificacion = notificacion;
        this.cargando = false;
        if (!notificacion.esLeida) {
          this.marcarComoLeida();
        }
      },
      error: (error) => {
        this.error = "Error al cargar la notificaci\xF3n. Por favor, intente nuevamente.";
        this.cargando = false;
      }
    });
  }
  marcarComoLeida() {
    if (!this.notificacion)
      return;
    this.notificacionService.marcarComoLeida(this.notificacion.id).subscribe({
      next: () => {
        if (this.notificacion) {
          this.notificacion.esLeida = true;
          this.notificacion.fechaLectura = /* @__PURE__ */ new Date();
        }
      },
      error: (error) => {
      }
    });
  }
  eliminarNotificacion() {
    if (!this.notificacion || !confirm("\xBFEst\xE1 seguro de eliminar esta notificaci\xF3n?"))
      return;
    this.notificacionService.eliminarNotificacion(this.notificacion.id).subscribe({
      next: () => {
        alert("Notificaci\xF3n eliminada exitosamente");
        this.volver();
      },
      error: (error) => {
        alert("Error al eliminar la notificaci\xF3n");
      }
    });
  }
  irARutaDestino() {
    if (this.notificacion?.rutaDestino) {
      this.router.navigate([this.notificacion.rutaDestino]);
    }
  }
  verTramite() {
    if (this.notificacion?.referenciaId) {
      this.router.navigate(["/administrativo/tramite-detalle", this.notificacion.referenciaId]);
    }
  }
  esTramite() {
    return this.notificacion?.tipo?.includes("TRAMITE") || false;
  }
  volver() {
    this.router.navigate(["/notificaciones"]);
  }
  formatearFecha(fecha) {
    if (!fecha)
      return "";
    const date = new Date(fecha);
    return date.toLocaleString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  getIcono(tipo) {
    const iconos = {
      "TRAMITE_NUEVO": "fas fa-file-alt",
      "TRAMITE_DERIVADO": "fas fa-share",
      "TRAMITE_APROBADO": "fas fa-check-circle",
      "TRAMITE_RECHAZADO": "fas fa-times-circle",
      "SISTEMA": "fas fa-info-circle",
      "URGENTE": "fas fa-exclamation-triangle"
    };
    return iconos[tipo] || "fas fa-bell";
  }
  getTipoLabel(tipo) {
    const labels = {
      "TRAMITE_NUEVO": "Nuevo Tr\xE1mite",
      "TRAMITE_DERIVADO": "Tr\xE1mite Derivado",
      "TRAMITE_APROBADO": "Tr\xE1mite Aprobado",
      "TRAMITE_RECHAZADO": "Tr\xE1mite Rechazado",
      "SISTEMA": "Notificaci\xF3n del Sistema",
      "URGENTE": "Urgente"
    };
    return labels[tipo] || tipo;
  }
  getMetadatosArray() {
    if (!this.notificacion?.metadatos)
      return [];
    return Object.keys(this.notificacion.metadatos).map((key) => ({
      key: key.replace(/_/g, " "),
      value: this.notificacion?.metadatos[key]
    }));
  }
  static {
    this.\u0275fac = function NotificacionDetalleComponent_Factory(t) {
      return new (t || _NotificacionDetalleComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificacionService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificacionDetalleComponent, selectors: [["app-notificacion-detalle"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 10, vars: 3, consts: [[1, "notificacion-detalle-container"], [1, "header"], [1, "btn-back", 3, "click"], [1, "fas", "fa-arrow-left"], ["class", "notificacion-card", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "notificacion-card"], [1, "notificacion-header", 3, "ngClass"], [1, "tipo-badge"], [1, "estado-badge", 3, "ngClass"], [1, "fas", 3, "ngClass"], [1, "notificacion-titulo"], [1, "prioridad-badge", 3, "ngClass"], [1, "fas", "fa-flag"], [1, "info-temporal"], [1, "fecha-item"], [1, "far", "fa-calendar"], ["class", "fecha-item", 4, "ngIf"], [1, "mensaje-completo"], [1, "mensaje-content"], ["class", "informacion-adicional", 4, "ngIf"], [1, "acciones"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], ["class", "btn btn-secondary", 3, "click", 4, "ngIf"], ["class", "btn btn-info", 3, "click", 4, "ngIf"], [1, "btn", "btn-danger", 3, "click"], [1, "fas", "fa-trash"], [1, "far", "fa-eye"], [1, "far", "fa-clock"], [1, "informacion-adicional"], [1, "metadatos"], ["class", "metadato-item", 4, "ngFor", "ngForOf"], [1, "metadato-item"], [1, "metadato-key"], [1, "metadato-value"], [1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-check"], [1, "btn", "btn-secondary", 3, "click"], [1, "fas", "fa-external-link-alt"], [1, "btn", "btn-info", 3, "click"], [1, "fas", "fa-file-alt"], [1, "loading"], [1, "fas", "fa-spinner", "fa-spin"], [1, "error-message"], [1, "fas", "fa-exclamation-triangle"]], template: function NotificacionDetalleComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275listener("click", function NotificacionDetalleComponent_Template_button_click_2_listener() {
          return ctx.volver();
        });
        \u0275\u0275element(3, "i", 3);
        \u0275\u0275text(4, " Volver ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h2");
        \u0275\u0275text(6, "Detalle de Notificaci\xF3n");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, NotificacionDetalleComponent_div_7_Template, 35, 18, "div", 4)(8, NotificacionDetalleComponent_div_8_Template, 3, 0, "div", 5)(9, NotificacionDetalleComponent_div_9_Template, 6, 1, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.notificacion);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.cargando);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.error);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf], styles: ["\n\n.notificacion-detalle-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 20px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.btn-back[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  padding: 10px 20px;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #2c3e50;\n  font-size: 24px;\n}\n.notificacion-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.notificacion-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 2px solid #f8f9fa;\n}\n.notificacion-header.tipo-tramite_nuevo[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.notificacion-header.tipo-tramite_derivado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f093fb 0%,\n      #f5576c 100%);\n  color: white;\n}\n.notificacion-header.tipo-sistema[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe 0%,\n      #00f2fe 100%);\n  color: white;\n}\n.tipo-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 16px;\n  font-weight: 500;\n}\n.tipo-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.estado-badge.leida[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.3);\n}\n.estado-badge.no-leida[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.5);\n}\n.notificacion-titulo[_ngcontent-%COMP%] {\n  padding: 25px;\n  border-bottom: 1px solid #e9ecef;\n}\n.notificacion-titulo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 15px 0;\n  color: #2c3e50;\n  font-size: 28px;\n  font-weight: 600;\n}\n.prioridad-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 12px;\n  border-radius: 5px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.prioridad-badge.prioridad-alta[_ngcontent-%COMP%] {\n  background: #fee;\n  color: #dc3545;\n}\n.prioridad-badge.prioridad-normal[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.prioridad-badge.prioridad-baja[_ngcontent-%COMP%] {\n  background: #d1ecf1;\n  color: #0c5460;\n}\n.info-temporal[_ngcontent-%COMP%] {\n  padding: 20px 25px;\n  background: #f8f9fa;\n  display: flex;\n  gap: 30px;\n  flex-wrap: wrap;\n}\n.fecha-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #6c757d;\n  font-size: 14px;\n}\n.fecha-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #007bff;\n}\n.mensaje-completo[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.mensaje-completo[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 15px 0;\n  color: #495057;\n  font-size: 18px;\n  font-weight: 600;\n}\n.mensaje-content[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 20px;\n  border-radius: 8px;\n  line-height: 1.6;\n  color: #495057;\n  font-size: 15px;\n  white-space: pre-wrap;\n}\n.informacion-adicional[_ngcontent-%COMP%] {\n  padding: 25px;\n  background: #fff;\n  border-top: 1px solid #e9ecef;\n}\n.informacion-adicional[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  color: #495057;\n  font-size: 18px;\n  font-weight: 600;\n}\n.metadatos[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 15px;\n}\n.metadato-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 10px;\n  background: #f8f9fa;\n  border-radius: 5px;\n}\n.metadato-key[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  text-transform: capitalize;\n}\n.metadato-value[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.acciones[_ngcontent-%COMP%] {\n  padding: 25px;\n  background: #f8f9fa;\n  display: flex;\n  gap: 15px;\n  justify-content: flex-start;\n  flex-wrap: wrap;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #0056b3;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #545b62;\n}\n.btn-info[_ngcontent-%COMP%] {\n  background: #17a2b8;\n  color: white;\n}\n.btn-info[_ngcontent-%COMP%]:hover {\n  background: #117a8b;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #c82333;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px;\n  font-size: 18px;\n  color: #6c757d;\n}\n.loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 32px;\n  margin-bottom: 15px;\n  color: #007bff;\n}\n.error-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px;\n  color: #dc3545;\n}\n.error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 20px;\n}\n.error-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin: 20px 0;\n}\n@media (max-width: 768px) {\n  .notificacion-detalle-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .notificacion-titulo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .info-temporal[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n  }\n  .acciones[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=notificacion-detalle.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificacionDetalleComponent, { className: "NotificacionDetalleComponent" });
})();
export {
  NotificacionDetalleComponent
};
//# sourceMappingURL=chunk-INLN3GCA.js.map
