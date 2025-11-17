import {
  TramiteService
} from "./chunk-DLKCR3ZE.js";
import {
  WebSocketService
} from "./chunk-3GF4E6GS.js";
import {
  NotificacionService
} from "./chunk-5ECQPUWI.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-KYM3LYO5.js";
import {
  BandejaTramitesService
} from "./chunk-KT4AJKHL.js";
import {
  ToastService
} from "./chunk-NXAITARR.js";
import {
  AuthService,
  Router
} from "./chunk-HNI5KL6U.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-T3F2XNQR.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  __spreadValues,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VDZBNFIH.js";

// src/app/shared/interfaces/notificacion.interface.ts
var TipoDestinatario;
(function(TipoDestinatario2) {
  TipoDestinatario2["USUARIO_ESPECIFICO"] = "USUARIO_ESPECIFICO";
  TipoDestinatario2["ROL_COMPLETO"] = "ROL_COMPLETO";
  TipoDestinatario2["TODOS_USUARIOS"] = "TODOS_USUARIOS";
})(TipoDestinatario || (TipoDestinatario = {}));
var TipoNotificacion;
(function(TipoNotificacion2) {
  TipoNotificacion2["TRAMITE_CREADO"] = "TRAMITE_CREADO";
  TipoNotificacion2["TRAMITE_APROBADO"] = "TRAMITE_APROBADO";
  TipoNotificacion2["TRAMITE_RECHAZADO"] = "TRAMITE_RECHAZADO";
  TipoNotificacion2["TRAMITE_OBSERVADO"] = "TRAMITE_OBSERVADO";
  TipoNotificacion2["DERIVACION"] = "DERIVACION";
  TipoNotificacion2["SISTEMA"] = "SISTEMA";
})(TipoNotificacion || (TipoNotificacion = {}));
var PrioridadNotificacion;
(function(PrioridadNotificacion2) {
  PrioridadNotificacion2["BAJA"] = "BAJA";
  PrioridadNotificacion2["NORMAL"] = "NORMAL";
  PrioridadNotificacion2["ALTA"] = "ALTA";
})(PrioridadNotificacion || (PrioridadNotificacion = {}));

// src/app/components/notificaciones/notificaciones.component.ts
function NotificacionesComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function NotificacionesComponent_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirModalCrear());
    });
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275elementStart(2, "span", 54);
    \u0275\u0275text(3, "Crear notificaci\xF3n");
    \u0275\u0275elementEnd()();
  }
}
function NotificacionesComponent_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function NotificacionesComponent_button_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.marcarTodasLeidas());
    });
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275elementStart(2, "span", 54);
    \u0275\u0275text(3, "Marcar todas le\xEDdas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 57);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.contadorNoLeidas);
  }
}
function NotificacionesComponent_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function NotificacionesComponent_button_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limpiarNotificacionesAntiguas());
    });
    \u0275\u0275element(1, "i", 59);
    \u0275\u0275elementStart(2, "span", 54);
    \u0275\u0275text(3, "Limpiar antiguas");
    \u0275\u0275elementEnd()();
  }
}
function NotificacionesComponent_button_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 60);
    \u0275\u0275listener("click", function NotificacionesComponent_button_67_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.filtros.busqueda = "";
      ctx_r1.aplicarFiltros();
      return \u0275\u0275resetView(ctx_r1.agruparNotificaciones());
    });
    \u0275\u0275element(1, "i", 61);
    \u0275\u0275elementStart(2, "span", 54);
    \u0275\u0275text(3, "Limpiar b\xFAsqueda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 62);
    \u0275\u0275text(5, "Limpiar");
    \u0275\u0275elementEnd()();
  }
}
function NotificacionesComponent_div_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "div", 64)(2, "div", 65);
    \u0275\u0275element(3, "div", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 67);
    \u0275\u0275text(5, "Cargando notificaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 68);
    \u0275\u0275text(7, "Obteniendo tus \xFAltimas actualizaciones...");
    \u0275\u0275elementEnd()()();
  }
}
function NotificacionesComponent_div_78_div_1_div_9_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 102);
  }
}
function NotificacionesComponent_div_78_div_1_div_9_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 103);
    \u0275\u0275element(1, "i", 104);
    \u0275\u0275text(2, " Urgente ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_78_div_1_div_9_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 105);
    \u0275\u0275listener("click", function NotificacionesComponent_div_78_div_1_div_9_button_22_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const notificacion_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.asignarseTramite(notificacion_r7, $event));
    });
    \u0275\u0275element(1, "i", 106);
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_78_div_1_div_9_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 107);
    \u0275\u0275listener("click", function NotificacionesComponent_div_78_div_1_div_9_button_23_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const notificacion_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.responderTramiteRapido(notificacion_r7, $event));
    });
    \u0275\u0275element(1, "i", 108);
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_78_div_1_div_9_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 109);
    \u0275\u0275listener("click", function NotificacionesComponent_div_78_div_1_div_9_button_24_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const notificacion_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.derivarTramiteRapido(notificacion_r7, $event));
    });
    \u0275\u0275element(1, "i", 110);
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_78_div_1_div_9_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 111);
    \u0275\u0275listener("click", function NotificacionesComponent_div_78_div_1_div_9_button_25_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const notificacion_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.marcarLeida(notificacion_r7, $event));
    });
    \u0275\u0275element(1, "i", 112);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notificacion_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r1.esNotificacionAntigua(notificacion_r7) ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-green-600 hover:bg-green-50");
    \u0275\u0275property("disabled", ctx_r1.esNotificacionAntigua(notificacion_r7))("title", ctx_r1.esNotificacionAntigua(notificacion_r7) ? "Notificaci\xF3n antigua" : "Marcar como le\xEDda");
  }
}
function NotificacionesComponent_div_78_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275listener("click", function NotificacionesComponent_div_78_div_1_div_9_Template_div_click_0_listener() {
      const notificacion_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.abrirNotificacion(notificacion_r7));
    });
    \u0275\u0275elementStart(1, "div", 81)(2, "div", 82)(3, "div", 83)(4, "div", 84);
    \u0275\u0275element(5, "i", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, NotificacionesComponent_div_78_div_1_div_9_div_6_Template, 1, 0, "div", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 87)(8, "div", 88)(9, "h4", 89);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 90);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 91);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 92)(16, "div", 93)(17, "span", 94);
    \u0275\u0275element(18, "i", 95);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, NotificacionesComponent_div_78_div_1_div_9_span_20_Template, 3, 0, "span", 96);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 97);
    \u0275\u0275template(22, NotificacionesComponent_div_78_div_1_div_9_button_22_Template, 2, 0, "button", 98)(23, NotificacionesComponent_div_78_div_1_div_9_button_23_Template, 2, 0, "button", 99)(24, NotificacionesComponent_div_78_div_1_div_9_button_24_Template, 2, 0, "button", 100)(25, NotificacionesComponent_div_78_div_1_div_9_button_25_Template, 2, 4, "button", 101);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const notificacion_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("ring-2", !notificacion_r7.esLeida)("ring-blue-100", !notificacion_r7.esLeida)("border-orange-200", notificacion_r7.prioridad === "ALTA");
    \u0275\u0275property("@slideIn", void 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.getClaseTipo(notificacion_r7.tipo));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getIcono(notificacion_r7.tipo));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !notificacion_r7.esLeida);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(notificacion_r7.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearTiempo(notificacion_r7.fechaCreacion));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notificacion_r7.mensaje);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r1.getClaseTipo(notificacion_r7.tipo));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getIcono(notificacion_r7.tipo));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTipoDisplay(notificacion_r7.tipo), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", notificacion_r7.prioridad === "ALTA");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.esTramiteNotificacion(notificacion_r7.tipo) && notificacion_r7.referenciaId && !ctx_r1.esNotificacionAntigua(notificacion_r7) && ctx_r1.esAdministrativo());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.esTramiteNotificacion(notificacion_r7.tipo) && notificacion_r7.referenciaId && !ctx_r1.esNotificacionAntigua(notificacion_r7) && ctx_r1.esAdministrativo());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.esTramiteNotificacion(notificacion_r7.tipo) && notificacion_r7.referenciaId && !ctx_r1.esNotificacionAntigua(notificacion_r7) && ctx_r1.esAdministrativo());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !notificacion_r7.esLeida);
  }
}
function NotificacionesComponent_div_78_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73)(2, "div", 74);
    \u0275\u0275element(3, "i", 75);
    \u0275\u0275elementStart(4, "span", 76);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 77);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 78);
    \u0275\u0275template(9, NotificacionesComponent_div_78_div_1_div_9_Template, 26, 23, "div", 79);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const grupo_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(grupo_r12.fecha);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", grupo_r12.notificaciones.length, " ", grupo_r12.notificaciones.length === 1 ? "notificaci\xF3n" : "notificaciones", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", grupo_r12.notificaciones)("ngForTrackBy", ctx_r1.trackNotification);
  }
}
function NotificacionesComponent_div_78_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "div", 114);
    \u0275\u0275element(2, "i", 115);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 67);
    \u0275\u0275text(4, "\xA1Todo est\xE1 al d\xEDa!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 68);
    \u0275\u0275text(6, "No tienes notificaciones que coincidan con los filtros seleccionados.");
    \u0275\u0275elementEnd()();
  }
}
function NotificacionesComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275template(1, NotificacionesComponent_div_78_div_1_Template, 10, 6, "div", 70)(2, NotificacionesComponent_div_78_div_2_Template, 7, 0, "div", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.notificacionesAgrupadas)("ngForTrackBy", ctx_r1.trackGroup);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacionesAgrupadas.length === 0);
  }
}
function NotificacionesComponent_div_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 116)(1, "div", 117)(2, "button", 118);
    \u0275\u0275listener("click", function NotificacionesComponent_div_79_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cargarMas());
    });
    \u0275\u0275element(3, "i", 119);
    \u0275\u0275text(4, " Cargar m\xE1s notificaciones ");
    \u0275\u0275elementEnd()()();
  }
}
function NotificacionesComponent_div_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 120)(1, "div", 23)(2, "div", 121)(3, "button", 122);
    \u0275\u0275listener("click", function NotificacionesComponent_div_80_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limpiarNotificacionesAntiguas());
    });
    \u0275\u0275element(4, "i", 123);
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Limpiar antiguas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 124);
    \u0275\u0275text(8, "(30+ d\xEDas)");
    \u0275\u0275elementEnd()()()()();
  }
}
function NotificacionesComponent_div_81_p_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getError("destinatario"), " ");
  }
}
function NotificacionesComponent_div_81_div_26_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 161);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const usuario_r17 = ctx.$implicit;
    \u0275\u0275property("value", usuario_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4(" ", usuario_r17.nombre, " ", usuario_r17.apellidos, " - ", usuario_r17.usuario, " (", usuario_r17.role.name, ") ");
  }
}
function NotificacionesComponent_div_81_div_26_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getError("usuarioDestinatarioId"), " ");
  }
}
function NotificacionesComponent_div_81_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 132);
    \u0275\u0275text(2, "Seleccionar Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 159);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_div_26_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevaNotificacion.usuarioDestinatarioId, $event) || (ctx_r1.nuevaNotificacion.usuarioDestinatarioId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 144);
    \u0275\u0275text(5, "Seleccionar usuario...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, NotificacionesComponent_div_81_div_26_option_6_Template, 2, 5, "option", 160);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, NotificacionesComponent_div_81_div_26_p_7_Template, 2, 1, "p", 138);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-red-300", ctx_r1.tieneError("usuarioDestinatarioId"))("border-gray-300", !ctx_r1.tieneError("usuarioDestinatarioId"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevaNotificacion.usuarioDestinatarioId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.usuarios);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tieneError("usuarioDestinatarioId"));
  }
}
function NotificacionesComponent_div_81_div_27_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 161);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rol_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", rol_r19.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", rol_r19.name, " (", ctx_r1.getUsuariosPorRol(rol_r19.name), " usuarios) ");
  }
}
function NotificacionesComponent_div_81_div_27_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getError("roleDestinatario"), " ");
  }
}
function NotificacionesComponent_div_81_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 132);
    \u0275\u0275text(2, "Seleccionar Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 162);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_div_27_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevaNotificacion.roleDestinatario, $event) || (ctx_r1.nuevaNotificacion.roleDestinatario = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 144);
    \u0275\u0275text(5, "Seleccionar rol...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, NotificacionesComponent_div_81_div_27_option_6_Template, 2, 3, "option", 160);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, NotificacionesComponent_div_81_div_27_p_7_Template, 2, 1, "p", 138);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-red-300", ctx_r1.tieneError("roleDestinatario"))("border-gray-300", !ctx_r1.tieneError("roleDestinatario"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevaNotificacion.roleDestinatario);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.roles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tieneError("roleDestinatario"));
  }
}
function NotificacionesComponent_div_81_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 163)(1, "div", 164);
    \u0275\u0275element(2, "i", 165);
    \u0275\u0275elementStart(3, "div")(4, "h4", 166);
    \u0275\u0275text(5, "Notificaci\xF3n masiva");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 167);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Esta notificaci\xF3n se enviar\xE1 a todos los usuarios activos del sistema (", ctx_r1.usuarios.length, " usuarios).");
  }
}
function NotificacionesComponent_div_81_p_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getError("titulo"), " ");
  }
}
function NotificacionesComponent_div_81_p_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getError("mensaje"), " ");
  }
}
function NotificacionesComponent_div_81_p_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getError("tipo"), " ");
  }
}
function NotificacionesComponent_div_81_p_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 158);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getError("prioridad"), " ");
  }
}
function NotificacionesComponent_div_81_span_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 168);
    \u0275\u0275text(2, " Creando... ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_81_span_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 169);
    \u0275\u0275text(2, " Crear Notificaci\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 125);
    \u0275\u0275listener("click", function NotificacionesComponent_div_81_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mostrarModalCrear = false);
    });
    \u0275\u0275elementStart(1, "div", 126);
    \u0275\u0275listener("click", function NotificacionesComponent_div_81_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 127)(3, "h3", 128);
    \u0275\u0275text(4, "Crear Nueva Notificaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 129);
    \u0275\u0275listener("click", function NotificacionesComponent_div_81_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.mostrarModalCrear = false);
    });
    \u0275\u0275element(6, "i", 130);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 131, 0);
    \u0275\u0275listener("ngSubmit", function NotificacionesComponent_div_81_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.crearNotificacion());
    });
    \u0275\u0275elementStart(9, "div")(10, "label", 132);
    \u0275\u0275text(11, "Destinatario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 133)(13, "label", 13)(14, "input", 134);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tipoDestinatario, $event) || (ctx_r1.tipoDestinatario = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NotificacionesComponent_div_81_Template_input_ngModelChange_14_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTipoDestinatarioChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 135);
    \u0275\u0275text(16, "Usuario espec\xEDfico");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label", 13)(18, "input", 136);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tipoDestinatario, $event) || (ctx_r1.tipoDestinatario = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NotificacionesComponent_div_81_Template_input_ngModelChange_18_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTipoDestinatarioChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 135);
    \u0275\u0275text(20, "Todos los usuarios de un rol");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "label", 13)(22, "input", 137);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tipoDestinatario, $event) || (ctx_r1.tipoDestinatario = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NotificacionesComponent_div_81_Template_input_ngModelChange_22_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTipoDestinatarioChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 135);
    \u0275\u0275text(24, "Todos los usuarios del sistema");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, NotificacionesComponent_div_81_p_25_Template, 2, 1, "p", 138);
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, NotificacionesComponent_div_81_div_26_Template, 8, 7, "div", 139)(27, NotificacionesComponent_div_81_div_27_Template, 8, 7, "div", 139)(28, NotificacionesComponent_div_81_div_28_Template, 8, 1, "div", 140);
    \u0275\u0275elementStart(29, "div")(30, "label", 132);
    \u0275\u0275text(31, "T\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 141);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevaNotificacion.titulo, $event) || (ctx_r1.nuevaNotificacion.titulo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, NotificacionesComponent_div_81_p_33_Template, 2, 1, "p", 138);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div")(35, "label", 132);
    \u0275\u0275text(36, "Mensaje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "textarea", 142);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_Template_textarea_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevaNotificacion.mensaje, $event) || (ctx_r1.nuevaNotificacion.mensaje = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, NotificacionesComponent_div_81_p_38_Template, 2, 1, "p", 138);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div")(40, "label", 132);
    \u0275\u0275text(41, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "select", 143);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_Template_select_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevaNotificacion.tipo, $event) || (ctx_r1.nuevaNotificacion.tipo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(43, "option", 144);
    \u0275\u0275text(44, "Seleccionar tipo...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 145);
    \u0275\u0275text(46, "Tr\xE1mite Creado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "option", 146);
    \u0275\u0275text(48, "Tr\xE1mite Aprobado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "option", 147);
    \u0275\u0275text(50, "Tr\xE1mite Rechazado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "option", 148);
    \u0275\u0275text(52, "Tr\xE1mite Observado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "option", 149);
    \u0275\u0275text(54, "Derivaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "option", 150);
    \u0275\u0275text(56, "Sistema");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(57, NotificacionesComponent_div_81_p_57_Template, 2, 1, "p", 138);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div")(59, "label", 132);
    \u0275\u0275text(60, "Prioridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "select", 151);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_81_Template_select_ngModelChange_61_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.nuevaNotificacion.prioridad, $event) || (ctx_r1.nuevaNotificacion.prioridad = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(62, "option", 144);
    \u0275\u0275text(63, "Seleccionar prioridad...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "option", 152);
    \u0275\u0275text(65, "Baja");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "option", 153);
    \u0275\u0275text(67, "Normal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "option", 154);
    \u0275\u0275text(69, "Alta");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(70, NotificacionesComponent_div_81_p_70_Template, 2, 1, "p", 138);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "div", 155)(72, "button", 156);
    \u0275\u0275listener("click", function NotificacionesComponent_div_81_Template_button_click_72_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarCreacion());
    });
    \u0275\u0275text(73, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "button", 157);
    \u0275\u0275template(75, NotificacionesComponent_div_81_span_75_Template, 3, 0, "span", 139)(76, NotificacionesComponent_div_81_span_76_Template, 3, 0, "span", 139);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const notificacionForm_r20 = \u0275\u0275reference(8);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tipoDestinatario);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tipoDestinatario);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tipoDestinatario);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.tieneError("destinatario"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tipoDestinatario === "USUARIO_ESPECIFICO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tipoDestinatario === "ROL_COMPLETO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tipoDestinatario === "TODOS_USUARIOS");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-300", ctx_r1.tieneError("titulo"))("border-gray-300", !ctx_r1.tieneError("titulo"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevaNotificacion.titulo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tieneError("titulo"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-300", ctx_r1.tieneError("mensaje"))("border-gray-300", !ctx_r1.tieneError("mensaje"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevaNotificacion.mensaje);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tieneError("mensaje"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-300", ctx_r1.tieneError("tipo"))("border-gray-300", !ctx_r1.tieneError("tipo"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevaNotificacion.tipo);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngIf", ctx_r1.tieneError("tipo"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-300", ctx_r1.tieneError("prioridad"))("border-gray-300", !ctx_r1.tieneError("prioridad"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.nuevaNotificacion.prioridad);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r1.tieneError("prioridad"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !notificacionForm_r20.valid || ctx_r1.enviandoNotificacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.enviandoNotificacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.enviandoNotificacion);
  }
}
function NotificacionesComponent_div_82_span_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 168);
    \u0275\u0275text(2, " Actualizando... ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_82_span_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 184);
    \u0275\u0275text(2, " Guardar Cambios ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 170)(1, "div", 171)(2, "div", 127)(3, "h3", 128);
    \u0275\u0275element(4, "i", 172);
    \u0275\u0275text(5, " Editar Notificaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 173);
    \u0275\u0275listener("click", function NotificacionesComponent_div_82_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalEditar());
    });
    \u0275\u0275element(7, "i", 174);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "form", 175, 1);
    \u0275\u0275listener("ngSubmit", function NotificacionesComponent_div_82_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarEditarNotificacion());
    });
    \u0275\u0275elementStart(10, "div", 176)(11, "label", 132);
    \u0275\u0275text(12, "T\xEDtulo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 177);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_82_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notificacionEditando.titulo, $event) || (ctx_r1.notificacionEditando.titulo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 176)(15, "label", 132);
    \u0275\u0275text(16, "Mensaje *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 178);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_82_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notificacionEditando.mensaje, $event) || (ctx_r1.notificacionEditando.mensaje = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 176)(19, "label", 132);
    \u0275\u0275text(20, "Tipo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 179);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_82_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notificacionEditando.tipo, $event) || (ctx_r1.notificacionEditando.tipo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(22, "option", 145);
    \u0275\u0275text(23, "Tr\xE1mite Creado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 146);
    \u0275\u0275text(25, "Tr\xE1mite Aprobado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 147);
    \u0275\u0275text(27, "Tr\xE1mite Rechazado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 148);
    \u0275\u0275text(29, "Tr\xE1mite Observado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 149);
    \u0275\u0275text(31, "Derivaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "option", 150);
    \u0275\u0275text(33, "Sistema");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 176)(35, "label", 132);
    \u0275\u0275text(36, "Prioridad *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 180);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_82_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notificacionEditando.prioridad, $event) || (ctx_r1.notificacionEditando.prioridad = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(38, "option", 152);
    \u0275\u0275text(39, "Baja");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "option", 153);
    \u0275\u0275text(41, "Normal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "option", 154);
    \u0275\u0275text(43, "Alta");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 176)(45, "label", 132);
    \u0275\u0275text(46, "Ruta Destino (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "input", 181);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_82_Template_input_ngModelChange_47_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.notificacionEditando.rutaDestino, $event) || (ctx_r1.notificacionEditando.rutaDestino = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 155)(49, "button", 182);
    \u0275\u0275listener("click", function NotificacionesComponent_div_82_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalEditar());
    });
    \u0275\u0275text(50, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 183);
    \u0275\u0275template(52, NotificacionesComponent_div_82_span_52_Template, 3, 0, "span", 139)(53, NotificacionesComponent_div_82_span_53_Template, 3, 0, "span", 139);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const editarForm_r22 = \u0275\u0275reference(9);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notificacionEditando.titulo);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notificacionEditando.mensaje);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notificacionEditando.tipo);
    \u0275\u0275advance(16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notificacionEditando.prioridad);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.notificacionEditando.rutaDestino);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !editarForm_r22.valid || ctx_r1.editandoNotificacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editandoNotificacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.editandoNotificacion);
  }
}
function NotificacionesComponent_div_83_span_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 168);
    \u0275\u0275text(2, " Eliminando... ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_83_span_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 200);
    \u0275\u0275text(2, " Eliminar Notificaci\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_83_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 170)(1, "div", 185)(2, "div", 127)(3, "h3", 128);
    \u0275\u0275element(4, "i", 186);
    \u0275\u0275text(5, " Confirmar Eliminaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 173);
    \u0275\u0275listener("click", function NotificacionesComponent_div_83_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalEliminar());
    });
    \u0275\u0275element(7, "i", 174);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 187)(9, "div", 176)(10, "p", 188);
    \u0275\u0275text(11, " \xBFEst\xE1s seguro de que deseas eliminar esta notificaci\xF3n? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 189)(13, "h4", 190);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 191);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 192)(18, "span");
    \u0275\u0275element(19, "i", 193);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275element(22, "i", 194);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "p", 195);
    \u0275\u0275element(25, "i", 196);
    \u0275\u0275text(26, " Esta acci\xF3n no se puede deshacer. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 197)(28, "button", 198);
    \u0275\u0275listener("click", function NotificacionesComponent_div_83_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalEliminar());
    });
    \u0275\u0275text(29, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 199);
    \u0275\u0275listener("click", function NotificacionesComponent_div_83_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarEliminarNotificacion());
    });
    \u0275\u0275template(31, NotificacionesComponent_div_83_span_31_Template, 3, 0, "span", 139)(32, NotificacionesComponent_div_83_span_32_Template, 3, 0, "span", 139);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx_r1.notificacionEliminar == null ? null : ctx_r1.notificacionEliminar.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.notificacionEliminar == null ? null : ctx_r1.notificacionEliminar.mensaje);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getTipoDisplay((ctx_r1.notificacionEliminar == null ? null : ctx_r1.notificacionEliminar.tipo) || ""));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.notificacionEliminar == null ? null : ctx_r1.notificacionEliminar.prioridad);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.eliminandoNotificacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.eliminandoNotificacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.eliminandoNotificacion);
  }
}
function NotificacionesComponent_div_84_span_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 168);
    \u0275\u0275text(2, " Limpiando... ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_84_span_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 211);
    \u0275\u0275text(2, " Limpiar Notificaciones ");
    \u0275\u0275elementEnd();
  }
}
function NotificacionesComponent_div_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 170)(1, "div", 185)(2, "div", 127)(3, "h3", 128);
    \u0275\u0275element(4, "i", 201);
    \u0275\u0275text(5, " Limpiar Notificaciones Antiguas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 173);
    \u0275\u0275listener("click", function NotificacionesComponent_div_84_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalLimpiar());
    });
    \u0275\u0275element(7, "i", 174);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 187)(9, "div", 176)(10, "div", 202)(11, "label", 132);
    \u0275\u0275text(12, " Eliminar notificaciones con m\xE1s de: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 74)(14, "input", 203);
    \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_div_84_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.diasAntiguedad, $event) || (ctx_r1.diasAntiguedad = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 204);
    \u0275\u0275text(16, "d\xEDas de antig\xFCedad");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "p", 205);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 206)(20, "div", 13);
    \u0275\u0275element(21, "i", 207);
    \u0275\u0275elementStart(22, "div")(23, "p", 208)(24, "strong");
    \u0275\u0275text(25, "Optimizaci\xF3n de almacenamiento:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "br");
    \u0275\u0275text(27, " Esta operaci\xF3n liberar\xE1 espacio eliminando notificaciones obsoletas. ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(28, "p", 195);
    \u0275\u0275element(29, "i", 209);
    \u0275\u0275text(30, " Esta acci\xF3n no se puede deshacer. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 197)(32, "button", 198);
    \u0275\u0275listener("click", function NotificacionesComponent_div_84_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalLimpiar());
    });
    \u0275\u0275text(33, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 210);
    \u0275\u0275listener("click", function NotificacionesComponent_div_84_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarLimpiarAntiguas());
    });
    \u0275\u0275template(35, NotificacionesComponent_div_84_span_35_Template, 3, 0, "span", 139)(36, NotificacionesComponent_div_84_span_36_Template, 3, 0, "span", 139);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@slideDown", void 0);
    \u0275\u0275advance(14);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.diasAntiguedad);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Configuraci\xF3n actual: ", ctx_r1.diasAntiguedad, " d\xEDas ");
    \u0275\u0275advance(16);
    \u0275\u0275property("disabled", ctx_r1.limpiandoAntiguas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.limpiandoAntiguas);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.limpiandoAntiguas);
  }
}
var NotificacionesComponent = class _NotificacionesComponent {
  get estadisticasLocales() {
    const now = /* @__PURE__ */ new Date();
    const mesAnterior = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return {
      totalNotificaciones: this.notificaciones.length,
      noLeidas: this.notificaciones.filter((n) => !n.esLeida).length,
      leidas: this.notificaciones.filter((n) => n.esLeida).length,
      ultimoMes: this.notificaciones.filter((n) => new Date(n.fechaCreacion) >= mesAnterior).length
    };
  }
  constructor(notificacionService, webSocketService, authService, router, tramiteService, bandejaTramitesService, toastService) {
    this.notificacionService = notificacionService;
    this.webSocketService = webSocketService;
    this.authService = authService;
    this.router = router;
    this.tramiteService = tramiteService;
    this.bandejaTramitesService = bandejaTramitesService;
    this.toastService = toastService;
    this.notificaciones = [];
    this.notificacionesFiltradas = [];
    this.notificacionesAgrupadas = [];
    this.estadisticas = {
      totalNotificaciones: 0,
      noLeidas: 0,
      leidas: 0,
      ultimoMes: 0
    };
    this.contadorNoLeidas = 0;
    this.currentPage = 0;
    this.pageSize = 20;
    this.totalElements = 0;
    this.totalPages = 0;
    this.isLastPage = true;
    this.filtros = {};
    this.mostrarFiltros = false;
    this.cargando = false;
    this.estaConectadoWs = false;
    this.subscriptions = [];
    this.mostrarModalCrear = false;
    this.enviandoNotificacion = false;
    this.mostrarModalEditar = false;
    this.editandoNotificacion = false;
    this.notificacionEditando = null;
    this.mostrarModalEliminar = false;
    this.eliminandoNotificacion = false;
    this.notificacionEliminar = null;
    this.mostrarModalLimpiar = false;
    this.limpiandoAntiguas = false;
    this.cargandoPreview = false;
    this.previewNotificaciones = null;
    this.diasAntiguedad = 7;
    this.usuarios = [];
    this.roles = [];
    this.tipoDestinatario = TipoDestinatario.USUARIO_ESPECIFICO;
    this.nuevaNotificacion = {
      usuarioDestinatarioId: 0,
      titulo: "",
      mensaje: "",
      tipo: "",
      prioridad: "NORMAL"
    };
    this.validationErrors = {};
  }
  ngOnInit() {
    this.inicializarComponente();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  inicializarComponente() {
    this.cargarNotificaciones();
    if (this.esAdmin()) {
      this.cargarUsuarios();
      this.cargarRoles();
    }
    this.subscriptions.push(this.notificacionService.nuevaNotificacion$.subscribe((notificacion) => {
      this.agregarNuevaNotificacion(notificacion);
    }));
    this.subscriptions.push(this.notificacionService.contadorNoLeidas$.subscribe((count) => {
      this.contadorNoLeidas = count;
    }));
    this.subscriptions.push(this.webSocketService.connected$.subscribe((conectado) => {
      this.estaConectadoWs = conectado;
    }));
  }
  cargarNotificaciones() {
    this.cargando = true;
    const observable = this.esAdmin() ? this.notificacionService.obtenerTodasNotificaciones(this.currentPage, this.pageSize, "fechaCreacion", "desc") : this.notificacionService.obtenerMisNotificaciones(this.currentPage, this.pageSize, "fechaCreacion", "desc");
    this.subscriptions.push(observable.subscribe({
      next: (response) => {
        if (this.currentPage === 0) {
          this.notificaciones = response.content;
        } else {
          this.notificaciones = [...this.notificaciones, ...response.content];
        }
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLastPage = response.last;
        this.aplicarFiltros();
        this.agruparNotificaciones();
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
      }
    }));
  }
  cargarMas() {
    if (!this.isLastPage && !this.cargando) {
      this.currentPage++;
      this.cargarNotificaciones();
    }
  }
  aplicarFiltros() {
    let filtradas = [...this.notificaciones];
    if (this.filtros.tipo) {
      filtradas = filtradas.filter((n) => n.tipo === this.filtros.tipo);
    }
    if (this.filtros.prioridad) {
      filtradas = filtradas.filter((n) => n.prioridad === this.filtros.prioridad);
    }
    if (this.filtros.esLeida !== void 0) {
      filtradas = filtradas.filter((n) => n.esLeida === this.filtros.esLeida);
    }
    if (this.filtros.busqueda) {
      const busqueda = this.filtros.busqueda.toLowerCase();
      filtradas = filtradas.filter((n) => n.titulo.toLowerCase().includes(busqueda) || n.mensaje.toLowerCase().includes(busqueda));
    }
    this.notificacionesFiltradas = filtradas;
  }
  agruparNotificaciones() {
    const grupos = {};
    this.notificacionesFiltradas.forEach((notificacion) => {
      const fecha = this.formatearFechaGrupo(notificacion.fechaCreacion);
      if (!grupos[fecha]) {
        grupos[fecha] = [];
      }
      grupos[fecha].push(notificacion);
    });
    this.notificacionesAgrupadas = Object.keys(grupos).map((fecha) => ({
      fecha,
      notificaciones: grupos[fecha].sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
    })).sort((a, b) => this.compararFechasGrupo(b.fecha, a.fecha));
  }
  marcarLeida(notificacion, event) {
    if (event) {
      event.stopPropagation();
    }
    if (notificacion.esLeida)
      return;
    this.notificacionService.marcarLeidaLocal(notificacion.id);
  }
  marcarTodasLeidas() {
    const noLeidas = this.notificaciones.filter((n) => !n.esLeida);
    if (noLeidas.length === 0)
      return;
    this.notificacionService.marcarTodasLeidasLocal();
  }
  crearNotificacion() {
    if (!this.esAdmin())
      return;
    if (!this.validarFormulario()) {
      return;
    }
    this.enviandoNotificacion = true;
    const request = {
      titulo: this.nuevaNotificacion.titulo.trim(),
      mensaje: this.nuevaNotificacion.mensaje.trim(),
      tipo: this.nuevaNotificacion.tipo,
      prioridad: this.nuevaNotificacion.prioridad,
      rutaDestino: this.nuevaNotificacion.rutaDestino?.trim() || void 0
    };
    switch (this.tipoDestinatario) {
      case TipoDestinatario.USUARIO_ESPECIFICO:
        request.usuarioDestinatarioId = this.nuevaNotificacion.usuarioDestinatarioId;
        break;
      case TipoDestinatario.ROL_COMPLETO:
        request.roleDestinatario = this.nuevaNotificacion.roleDestinatario;
        break;
      case TipoDestinatario.TODOS_USUARIOS:
        request.enviarATodos = true;
        break;
    }
    this.subscriptions.push(this.notificacionService.crearNotificacion(request).subscribe({
      next: () => {
        this.mostrarModalCrear = false;
        this.resetearFormulario();
        this.cargarNotificaciones();
        this.enviandoNotificacion = false;
      },
      error: (error) => {
        this.enviandoNotificacion = false;
      }
    }));
  }
  abrirNotificacion(notificacion) {
    this.marcarLeida(notificacion);
    if (this.esTramiteNotificacion(notificacion.tipo) && notificacion.referenciaId) {
      const userRole = this.authService.currentUserValue?.role?.name;
      if (userRole === "ADMINISTRATIVO" || userRole === "ADMIN") {
        this.router.navigate(["/administrativo/mis-tramites"], {
          queryParams: { tramiteId: notificacion.referenciaId, openDetail: true }
        });
      } else {
        this.router.navigate(["/usuario/mis-tramites"], {
          queryParams: { tramiteId: notificacion.referenciaId, openDetail: true }
        });
      }
    } else if (notificacion.rutaDestino) {
      this.router.navigate([notificacion.rutaDestino]);
    } else {
      this.mostrarDetalleNotificacion(notificacion);
    }
  }
  esTramiteNotificacion(tipo) {
    if (!tipo)
      return false;
    return tipo.includes("TRAMITE") || tipo === "DERIVACION";
  }
  esNotificacionAntigua(notificacion) {
    const ahora = /* @__PURE__ */ new Date();
    const fechaCreacion = new Date(notificacion.fechaCreacion);
    const diferenciaHoras = (ahora.getTime() - fechaCreacion.getTime()) / (1e3 * 60 * 60);
    return diferenciaHoras > 24;
  }
  puedeInteractuarConNotificacion(notificacion) {
    return !notificacion.esLeida || !this.esNotificacionAntigua(notificacion);
  }
  esAdministrativo() {
    const userRole = this.authService.currentUserValue?.role?.name;
    return userRole === "ADMINISTRATIVO" || userRole === "ADMIN";
  }
  asignarseTramite(notificacion, event) {
    event.stopPropagation();
    if (!notificacion.referenciaId)
      return;
    if (!this.puedeAsignarseAsiMismo()) {
      return;
    }
    if (confirm("\xBFDeseas asignarte este tr\xE1mite?")) {
      this.tramiteService.asignarseTramite(notificacion.referenciaId).subscribe({
        next: () => {
          this.marcarLeida(notificacion, event);
          this.cargarNotificaciones();
        },
        error: (error) => {
        }
      });
    }
  }
  responderTramiteRapido(notificacion, event) {
    event.stopPropagation();
    if (!notificacion.referenciaId)
      return;
    const userRole = this.authService.currentUserValue?.role?.name;
    if (userRole === "ADMINISTRATIVO" || userRole === "ADMIN") {
      this.router.navigate(["/administrativo/mis-tramites"], {
        queryParams: { tramiteId: notificacion.referenciaId, action: "responder" }
      });
    }
  }
  derivarTramiteRapido(notificacion, event) {
    event.stopPropagation();
    if (!notificacion.referenciaId)
      return;
    if (!this.puedeDerivarTramite()) {
      return;
    }
    this.bandejaTramitesService.verificarPermisosAcciones(notificacion.referenciaId).subscribe({
      next: (permisos) => {
        if (!permisos.puedeDerivar) {
          this.toastService.error("Acci\xF3n no permitida", "No puedes derivar este tr\xE1mite. Solo se puede derivar si no est\xE1s asignado al mismo.");
          return;
        }
        const userRole = this.authService.currentUserValue?.role?.name;
        if (userRole === "ADMINISTRATIVO" || userRole === "ADMIN") {
          this.router.navigate(["/administrativo/mis-tramites"], {
            queryParams: { tramiteId: notificacion.referenciaId, action: "derivar" }
          });
        }
      },
      error: () => {
        this.toastService.error("Error", "No se pudieron verificar los permisos del tr\xE1mite");
      }
    });
  }
  mostrarDetalleNotificacion(notificacion) {
    const modalContent = `
      <div style="background: white; padding: 20px; border-radius: 8px; max-width: 500px; margin: 50px auto;">
        <h3 style="margin-top: 0; color: #333;">${notificacion.titulo}</h3>
        <p style="color: #666; line-height: 1.5;">${notificacion.mensaje}</p>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <strong>Fecha:</strong> ${this.formatearTiempo(notificacion.fechaCreacion)}<br>
          <strong>Tipo:</strong> ${this.getTipoDisplay(notificacion.tipo)}<br>
          <strong>Prioridad:</strong> ${notificacion.prioridad}
        </div>
        <div style="text-align: right; margin-top: 20px;">
          <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                  style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
            Cerrar
          </button>
        </div>
      </div>
    `;
    const overlay = document.createElement("div");
    overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;";
    overlay.innerHTML = modalContent;
    overlay.onclick = (e) => {
      if (e.target === overlay)
        overlay.remove();
    };
    document.body.appendChild(overlay);
  }
  reenviarPorEmail(notificacion, event) {
    event.stopPropagation();
    this.subscriptions.push(this.notificacionService.reenviarPorEmail(notificacion.id).subscribe({
      next: () => {
      },
      error: (error) => {
      }
    }));
  }
  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }
  setFiltroEstado(esLeida) {
    this.filtros.esLeida = esLeida;
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }
  setFiltroTipo(tipo) {
    this.filtros.tipo = tipo;
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }
  setFiltroPrioridad(prioridad) {
    this.filtros.prioridad = prioridad;
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }
  limpiarFiltros() {
    this.filtros = {};
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }
  limpiarNotificacionesAntiguas() {
    if (!this.esAdmin())
      return;
    this.diasAntiguedad = 7;
    this.mostrarModalLimpiar = true;
    this.previewNotificaciones = null;
  }
  confirmarLimpiarAntiguas() {
    if (!this.esAdmin())
      return;
    this.limpiandoAntiguas = true;
    this.subscriptions.push(this.notificacionService.limpiarNotificacionesAntiguas(this.diasAntiguedad).subscribe({
      next: (eliminadas) => {
        if (eliminadas > 0) {
          alert(`\u2705 Se eliminaron ${eliminadas} notificaciones antiguas exitosamente.`);
        } else {
          alert(`\u2139\uFE0F No se encontraron notificaciones antiguas para eliminar.`);
        }
        this.cerrarModalLimpiar();
        this.cargarNotificaciones();
        this.limpiandoAntiguas = false;
      },
      error: (error) => {
        alert("\u274C Error al limpiar notificaciones antiguas. Int\xE9ntalo nuevamente.");
        this.limpiandoAntiguas = false;
      }
    }));
  }
  editarNotificacion(notificacion, event) {
    if (!this.esAdmin())
      return;
    event.stopPropagation();
    this.notificacionEditando = __spreadValues({}, notificacion);
    this.mostrarModalEditar = true;
  }
  eliminarNotificacion(notificacion, event) {
    if (!this.esAdmin())
      return;
    event.stopPropagation();
    this.notificacionEliminar = notificacion;
    this.mostrarModalEliminar = true;
  }
  confirmarEditarNotificacion() {
    if (!this.notificacionEditando || !this.esAdmin())
      return;
    if (!this.notificacionEditando.titulo.trim() || !this.notificacionEditando.mensaje.trim()) {
      return;
    }
    this.editandoNotificacion = true;
    const request = {
      titulo: this.notificacionEditando.titulo.trim(),
      mensaje: this.notificacionEditando.mensaje.trim(),
      tipo: this.notificacionEditando.tipo,
      prioridad: this.notificacionEditando.prioridad,
      rutaDestino: this.notificacionEditando.rutaDestino || void 0
    };
    this.subscriptions.push(this.notificacionService.actualizarNotificacion(this.notificacionEditando.id, request).subscribe({
      next: () => {
        this.cerrarModalEditar();
        this.cargarNotificaciones();
        this.editandoNotificacion = false;
      },
      error: (error) => {
        this.editandoNotificacion = false;
      }
    }));
  }
  confirmarEliminarNotificacion() {
    if (!this.notificacionEliminar || !this.esAdmin())
      return;
    this.eliminandoNotificacion = true;
    this.subscriptions.push(this.notificacionService.eliminarNotificacion(this.notificacionEliminar.id).subscribe({
      next: () => {
        this.notificaciones = this.notificaciones.filter((n) => n.id !== this.notificacionEliminar.id);
        this.aplicarFiltros();
        this.agruparNotificaciones();
        this.cerrarModalEliminar();
        this.eliminandoNotificacion = false;
      },
      error: (error) => {
        this.eliminandoNotificacion = false;
      }
    }));
  }
  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.editandoNotificacion = false;
    this.notificacionEditando = null;
  }
  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
    this.eliminandoNotificacion = false;
    this.notificacionEliminar = null;
  }
  cerrarModalLimpiar() {
    this.mostrarModalLimpiar = false;
    this.limpiandoAntiguas = false;
    this.cargandoPreview = false;
    this.previewNotificaciones = null;
  }
  agregarNuevaNotificacion(notificacion) {
    const existe = this.notificaciones.some((n) => n.id === notificacion.id);
    if (existe) {
      return;
    }
    this.notificaciones = [notificacion, ...this.notificaciones];
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }
  esAdmin() {
    return this.authService.hasRole("ADMIN");
  }
  getIcono(tipo) {
    return this.notificacionService.getIcono(tipo);
  }
  getClaseTipo(tipo) {
    return "notificacion-icon " + this.notificacionService.getClaseTipo(tipo);
  }
  getClasePrioridad(prioridad) {
    return this.notificacionService.getClasePrioridad(prioridad);
  }
  formatearTiempo(fecha) {
    const ahora = /* @__PURE__ */ new Date();
    const fechaNot = new Date(fecha);
    const diff = ahora.getTime() - fechaNot.getTime();
    const minutos = Math.floor(diff / 6e4);
    const horas = Math.floor(diff / 36e5);
    const dias = Math.floor(diff / 864e5);
    if (minutos < 1)
      return "Ahora mismo";
    if (minutos < 60)
      return `Hace ${minutos} minuto${minutos > 1 ? "s" : ""}`;
    if (horas < 24)
      return `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
    if (dias < 7)
      return `Hace ${dias} d\xEDa${dias > 1 ? "s" : ""}`;
    return fechaNot.toLocaleDateString("es-PE");
  }
  formatearFechaGrupo(fecha) {
    const fechaNot = new Date(fecha);
    const ahora = /* @__PURE__ */ new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const ayer = new Date(hoy.getTime() - 24 * 60 * 60 * 1e3);
    if (fechaNot >= hoy)
      return "Hoy";
    if (fechaNot >= ayer)
      return "Ayer";
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return fechaNot.toLocaleDateString("es-PE", opciones);
  }
  compararFechasGrupo(fechaA, fechaB) {
    const prioridades = {
      "Hoy": 3,
      "Ayer": 2
    };
    const prioridadA = prioridades[fechaA] || 1;
    const prioridadB = prioridades[fechaB] || 1;
    if (prioridadA !== prioridadB) {
      return prioridadA - prioridadB;
    }
    return fechaA.localeCompare(fechaB);
  }
  trackGroup(_index, grupo) {
    return grupo.fecha;
  }
  trackNotification(_index, notificacion) {
    return notificacion.id;
  }
  getTipoDisplay(tipo) {
    const tipos = {
      "TRAMITE_CREADO": "Tr\xE1mite Creado",
      "TRAMITE_APROBADO": "Tr\xE1mite Aprobado",
      "TRAMITE_RECHAZADO": "Tr\xE1mite Rechazado",
      "TRAMITE_OBSERVADO": "Tr\xE1mite Observado",
      "DERIVACION": "Derivaci\xF3n",
      "SISTEMA": "Sistema"
    };
    return tipos[tipo] || tipo;
  }
  tienesFiltrosActivos() {
    return !!(this.filtros.tipo || this.filtros.prioridad || this.filtros.busqueda || this.filtros.esLeida !== void 0);
  }
  cargarUsuarios() {
    if (!this.esAdmin())
      return;
    this.subscriptions.push(this.notificacionService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios.filter((usuario) => usuario.role?.name !== "ADMIN");
      },
      error: (error) => {
        this.usuarios = [
          { id: 2, nombre: "Usuario Demo", usuario: "demo", role: { name: "USUARIO" } }
        ];
      }
    }));
  }
  cargarRoles() {
    if (!this.esAdmin())
      return;
    this.subscriptions.push(this.notificacionService.obtenerRoles().subscribe({
      next: (roles) => {
        this.roles = roles.filter((rol) => rol.name !== "ADMIN");
      },
      error: (error) => {
        this.roles = [
          { id: 2, name: "USUARIO", description: "Usuario", userCount: 0 },
          { id: 3, name: "ALUMNO", description: "Alumno", userCount: 0 },
          { id: 4, name: "EXTERNO", description: "Usuario Externo", userCount: 0 },
          { id: 5, name: "ADMINISTRATIVO", description: "Administrativo", userCount: 0 }
        ];
      }
    }));
  }
  resetearFormulario() {
    this.tipoDestinatario = TipoDestinatario.USUARIO_ESPECIFICO;
    this.nuevaNotificacion = {
      usuarioDestinatarioId: 0,
      titulo: "",
      mensaje: "",
      tipo: "",
      prioridad: "NORMAL"
    };
    this.validationErrors = {};
  }
  cancelarCreacion() {
    this.mostrarModalCrear = false;
    this.resetearFormulario();
    this.enviandoNotificacion = false;
  }
  validarFormulario() {
    this.validationErrors = {};
    let esValido = true;
    if (this.tipoDestinatario === TipoDestinatario.USUARIO_ESPECIFICO) {
      if (!this.nuevaNotificacion.usuarioDestinatarioId || this.nuevaNotificacion.usuarioDestinatarioId === 0) {
        this.validationErrors.usuarioDestinatarioId = "Debe seleccionar un usuario destinatario";
        esValido = false;
      }
    } else if (this.tipoDestinatario === TipoDestinatario.ROL_COMPLETO) {
      if (!this.nuevaNotificacion.roleDestinatario || this.nuevaNotificacion.roleDestinatario.trim().length === 0) {
        this.validationErrors.roleDestinatario = "Debe seleccionar un rol destinatario";
        esValido = false;
      }
    }
    if (!this.nuevaNotificacion.titulo || this.nuevaNotificacion.titulo.trim().length === 0) {
      this.validationErrors.titulo = "El t\xEDtulo es requerido";
      esValido = false;
    } else if (this.nuevaNotificacion.titulo.trim().length > 200) {
      this.validationErrors.titulo = "El t\xEDtulo no puede exceder 200 caracteres";
      esValido = false;
    }
    if (!this.nuevaNotificacion.mensaje || this.nuevaNotificacion.mensaje.trim().length === 0) {
      this.validationErrors.mensaje = "El mensaje es requerido";
      esValido = false;
    } else if (this.nuevaNotificacion.mensaje.trim().length > 500) {
      this.validationErrors.mensaje = "El mensaje no puede exceder 500 caracteres";
      esValido = false;
    }
    if (!this.nuevaNotificacion.tipo || this.nuevaNotificacion.tipo.trim().length === 0) {
      this.validationErrors.tipo = "Debe seleccionar un tipo de notificaci\xF3n";
      esValido = false;
    }
    if (!this.nuevaNotificacion.prioridad || this.nuevaNotificacion.prioridad.trim().length === 0) {
      this.validationErrors.prioridad = "Debe seleccionar una prioridad";
      esValido = false;
    }
    return esValido;
  }
  tieneError(campo) {
    return !!this.validationErrors[campo];
  }
  getError(campo) {
    return this.validationErrors[campo] || "";
  }
  onTipoDestinatarioChange() {
    this.nuevaNotificacion.usuarioDestinatarioId = 0;
    this.nuevaNotificacion.roleDestinatario = void 0;
    this.nuevaNotificacion.enviarATodos = void 0;
    this.validationErrors.destinatario = void 0;
    this.validationErrors.usuarioDestinatarioId = void 0;
    this.validationErrors.roleDestinatario = void 0;
  }
  getUsuariosPorRol(roleName) {
    const rol = this.roles.find((r) => r.name === roleName);
    if (rol && rol.userCount > 0) {
      return rol.userCount;
    }
    return this.usuarios.filter((u) => u.role?.name === roleName).length;
  }
  abrirModalCrear() {
    if (!this.esAdmin())
      return;
    this.cargarUsuarios();
    this.cargarRoles();
    this.mostrarModalCrear = true;
  }
  puedeAsignarseAsiMismo() {
    const userRole = this.authService.currentUserValue?.role?.name;
    return userRole === "ADMINISTRATIVO" || userRole === "ADMIN";
  }
  puedeDerivarTramite() {
    const userRole = this.authService.currentUserValue?.role?.name;
    if (userRole === "ESTUDIANTE") {
      this.toastService.warning("Acci\xF3n no permitida", "Los estudiantes no pueden derivar tr\xE1mites");
      return false;
    }
    if (userRole !== "ADMINISTRATIVO" && userRole !== "ADMIN") {
      this.toastService.warning("Acci\xF3n no permitida", "Solo el personal administrativo puede derivar tr\xE1mites");
      return false;
    }
    return true;
  }
  puedeAprobarTramite() {
    const userRole = this.authService.currentUserValue?.role?.name;
    if (userRole === "ESTUDIANTE") {
      this.toastService.warning("Acci\xF3n no permitida", "Los estudiantes no pueden aprobar tr\xE1mites");
      return false;
    }
    return userRole === "ADMINISTRATIVO" || userRole === "ADMIN";
  }
  puedeRechazarTramite() {
    const userRole = this.authService.currentUserValue?.role?.name;
    if (userRole === "ESTUDIANTE") {
      this.toastService.warning("Acci\xF3n no permitida", "Los estudiantes no pueden rechazar tr\xE1mites");
      return false;
    }
    return userRole === "ADMINISTRATIVO" || userRole === "ADMIN";
  }
  puedeDescargarDocumentos() {
    const userRole = this.authService.currentUserValue?.role?.name;
    if (userRole === "ESTUDIANTE") {
      this.toastService.warning("Acci\xF3n no permitida", "Los estudiantes no pueden descargar documentos de tr\xE1mites");
      return false;
    }
    return true;
  }
  puedeVerAccionesRapidas(accion) {
    const userRole = this.authService.currentUserValue?.role?.name;
    if (userRole === "ESTUDIANTE") {
      return false;
    }
    if (userRole === "USUARIO") {
      return accion === "responder";
    }
    return userRole === "ADMINISTRATIVO" || userRole === "ADMIN";
  }
  static {
    this.\u0275fac = function NotificacionesComponent_Factory(t) {
      return new (t || _NotificacionesComponent)(\u0275\u0275directiveInject(NotificacionService), \u0275\u0275directiveInject(WebSocketService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TramiteService), \u0275\u0275directiveInject(BandejaTramitesService), \u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificacionesComponent, selectors: [["app-notificaciones"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 85, vars: 26, consts: [["notificacionForm", "ngForm"], ["editarForm", "ngForm"], [1, "min-h-screen", "bg-gray-50"], [1, "bg-white", "border-b", "border-gray-200", "sticky", "top-0", "z-40"], [1, "px-3", "sm:px-4", "lg:px-6", "max-w-7xl", "mx-auto"], [1, "flex", "flex-col", "space-y-3", "py-3", "sm:flex-row", "sm:items-center", "sm:justify-between", "sm:py-4", "sm:space-y-0"], [1, "flex", "items-center", "space-x-3"], [1, "flex-shrink-0"], [1, "w-8", "h-8", "sm:w-10", "sm:h-10", "bg-blue-100", "rounded-lg", "flex", "items-center", "justify-center"], [1, "fas", "fa-bell", "text-blue-600", "text-sm", "sm:text-lg"], [1, "min-w-0", "flex-1"], [1, "text-lg", "sm:text-xl", "font-semibold", "text-gray-900", "truncate"], [1, "text-xs", "sm:text-sm", "text-gray-500", "hidden", "sm:block"], [1, "flex", "items-center"], [1, "flex", "items-center", "space-x-1"], [1, "w-2", "h-2", "rounded-full"], [1, "text-xs", "text-gray-500", "hidden", "sm:inline"], [1, "flex", "flex-nowrap", "gap-2", "justify-end", "overflow-x-auto"], ["class", "inline-flex items-center justify-center px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[36px] min-w-[36px] sm:min-w-0 touch-manipulation", 3, "click", 4, "ngIf"], ["class", "inline-flex items-center justify-center px-2 sm:px-3 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[36px] min-w-[36px] sm:min-w-0 touch-manipulation relative", 3, "click", 4, "ngIf"], ["class", "inline-flex items-center justify-center px-2 sm:px-3 py-2 border border-red-300 text-red-700 bg-white rounded-lg text-xs sm:text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors min-h-[36px] min-w-[36px] sm:min-w-0 touch-manipulation", 3, "click", 4, "ngIf"], [1, "px-3", "sm:px-4", "lg:px-6", "max-w-7xl", "mx-auto", "py-4", "sm:py-6"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-3", "sm:gap-4"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "p-3", "sm:p-4"], [1, "w-6", "h-6", "sm:w-8", "sm:h-8", "bg-blue-100", "rounded-lg", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "fas", "fa-bell", "text-blue-600", "text-xs", "sm:text-sm"], [1, "ml-2", "sm:ml-3", "min-w-0"], [1, "text-base", "sm:text-lg", "font-semibold", "text-gray-900"], [1, "text-xs", "sm:text-sm", "text-gray-500", "truncate"], [1, "w-6", "h-6", "sm:w-8", "sm:h-8", "bg-orange-100", "rounded-lg", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "fas", "fa-envelope", "text-orange-600", "text-xs", "sm:text-sm"], [1, "w-6", "h-6", "sm:w-8", "sm:h-8", "bg-green-100", "rounded-lg", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "fas", "fa-check-circle", "text-green-600", "text-xs", "sm:text-sm"], [1, "w-6", "h-6", "sm:w-8", "sm:h-8", "bg-purple-100", "rounded-lg", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "fas", "fa-calendar-alt", "text-purple-600", "text-xs", "sm:text-sm"], [1, "px-3", "sm:px-4", "lg:px-6", "max-w-7xl", "mx-auto", "pb-4", "sm:pb-6"], [1, "flex", "flex-col", "gap-3", "mb-3", "sm:flex-row", "sm:gap-4", "sm:mb-4"], [1, "flex-1", "relative"], [1, "absolute", "inset-y-0", "left-0", "pl-3", "flex", "items-center", "pointer-events-none"], [1, "fas", "fa-search", "text-gray-400", "text-sm"], ["type", "text", "placeholder", "Buscar notificaciones...", 1, "w-full", "pl-10", "pr-4", "py-3", "sm:py-2", "border", "border-gray-300", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "transition-colors", "touch-manipulation", 3, "ngModelChange", "ngModel"], ["class", "inline-flex items-center justify-center px-3 py-3 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[44px] sm:min-h-auto touch-manipulation", 3, "click", 4, "ngIf"], [1, "flex", "flex-wrap", "gap-2"], [1, "inline-flex", "items-center", "px-4", "py-2", "sm:px-3", "sm:py-1.5", "rounded-full", "text-sm", "font-medium", "transition-colors", "min-h-[40px]", "sm:min-h-auto", "touch-manipulation", 3, "click"], [1, "w-2", "h-2", "bg-orange-400", "rounded-full", "mr-2"], [1, "w-2", "h-2", "bg-green-400", "rounded-full", "mr-2"], ["class", "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", 4, "ngIf"], ["class", "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6", 4, "ngIf"], ["class", "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8", 4, "ngIf"], ["class", "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-8", 4, "ngIf"], ["class", "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", 3, "click", 4, "ngIf"], ["class", "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4", 4, "ngIf"], [1, "inline-flex", "items-center", "justify-center", "px-2", "sm:px-3", "py-2", "border", "border-gray-300", "rounded-lg", "text-xs", "sm:text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "transition-colors", "min-h-[36px]", "min-w-[36px]", "sm:min-w-0", "touch-manipulation", 3, "click"], [1, "fas", "fa-plus", "text-xs", "sm:mr-2"], [1, "hidden", "sm:inline"], [1, "inline-flex", "items-center", "justify-center", "px-2", "sm:px-3", "py-2", "bg-blue-600", "text-white", "rounded-lg", "text-xs", "sm:text-sm", "font-medium", "hover:bg-blue-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "transition-colors", "min-h-[36px]", "min-w-[36px]", "sm:min-w-0", "touch-manipulation", "relative", 3, "click"], [1, "fas", "fa-check-double", "text-xs", "sm:mr-2"], [1, "absolute", "-top-1", "-right-1", "sm:static", "sm:ml-1", "px-1.5", "sm:px-2", "py-0.5", "bg-red-500", "text-white", "rounded-full", "text-xs", "min-w-[18px]", "text-center"], [1, "inline-flex", "items-center", "justify-center", "px-2", "sm:px-3", "py-2", "border", "border-red-300", "text-red-700", "bg-white", "rounded-lg", "text-xs", "sm:text-sm", "font-medium", "hover:bg-red-50", "focus:outline-none", "focus:ring-2", "focus:ring-red-500", "transition-colors", "min-h-[36px]", "min-w-[36px]", "sm:min-w-0", "touch-manipulation", 3, "click"], [1, "fas", "fa-broom", "text-xs", "sm:mr-2"], [1, "inline-flex", "items-center", "justify-center", "px-3", "py-3", "sm:py-2", "border", "border-gray-300", "rounded-lg", "text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "transition-colors", "min-h-[44px]", "sm:min-h-auto", "touch-manipulation", 3, "click"], [1, "fas", "fa-times", "text-xs", "mr-2"], [1, "sm:hidden"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "p-8", "text-center"], [1, "inline-flex", "items-center", "justify-center", "w-12", "h-12", "bg-blue-100", "rounded-lg", "mb-4"], [1, "animate-spin", "rounded-full", "h-6", "w-6", "border-2", "border-blue-600", "border-t-transparent"], [1, "text-lg", "font-semibold", "text-gray-900", "mb-2"], [1, "text-sm", "text-gray-500"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "space-y-6"], ["class", "notification-group", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "bg-white rounded-lg border border-gray-200 p-12 text-center", 4, "ngIf"], [1, "notification-group"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "flex", "items-center", "space-x-2"], [1, "fas", "fa-calendar-day", "text-gray-400", "text-sm"], [1, "text-sm", "font-medium", "text-gray-900"], [1, "text-xs", "text-gray-500"], [1, "space-y-3"], ["class", "bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer", 3, "ring-2", "ring-blue-100", "border-orange-200", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "hover:border-gray-300", "transition-colors", "cursor-pointer", 3, "click"], [1, "p-4"], [1, "flex", "items-start", "space-x-3"], [1, "flex-shrink-0", "relative"], [1, "w-10", "h-10", "rounded-lg", "flex", "items-center", "justify-center", 3, "ngClass"], [1, "text-sm"], ["class", "absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full", 4, "ngIf"], [1, "flex-1", "min-w-0"], [1, "flex", "items-start", "justify-between"], [1, "text-sm", "font-semibold", "text-gray-900", "truncate", "pr-2"], [1, "text-xs", "text-gray-500", "whitespace-nowrap"], [1, "text-sm", "text-gray-600", "mt-1", "line-clamp-2"], [1, "flex", "items-center", "justify-between", "flex-wrap", "gap-2", "mt-3"], [1, "flex", "items-center", "flex-wrap", "gap-2"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded-full", "text-xs", "font-medium", 3, "ngClass"], [1, "text-xs", "mr-1"], ["class", "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800", 4, "ngIf"], [1, "flex", "items-center", "gap-1"], ["class", "p-1.5 rounded transition-colors text-purple-600 hover:bg-purple-50", "title", "Asignarse este tr\xE1mite", 3, "click", 4, "ngIf"], ["class", "p-1.5 rounded transition-colors text-blue-600 hover:bg-blue-50", "title", "Responder tr\xE1mite", 3, "click", 4, "ngIf"], ["class", "p-1.5 rounded transition-colors text-orange-600 hover:bg-orange-50", "title", "Derivar tr\xE1mite", 3, "click", 4, "ngIf"], ["class", "p-1.5 rounded transition-colors", 3, "class", "disabled", "title", "click", 4, "ngIf"], [1, "absolute", "-top-1", "-right-1", "w-3", "h-3", "bg-blue-400", "rounded-full"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded-full", "text-xs", "font-medium", "bg-red-100", "text-red-800"], [1, "fas", "fa-exclamation", "text-xs", "mr-1"], ["title", "Asignarse este tr\xE1mite", 1, "p-1.5", "rounded", "transition-colors", "text-purple-600", "hover:bg-purple-50", 3, "click"], [1, "fas", "fa-user-check", "text-xs"], ["title", "Responder tr\xE1mite", 1, "p-1.5", "rounded", "transition-colors", "text-blue-600", "hover:bg-blue-50", 3, "click"], [1, "fas", "fa-edit", "text-xs"], ["title", "Derivar tr\xE1mite", 1, "p-1.5", "rounded", "transition-colors", "text-orange-600", "hover:bg-orange-50", 3, "click"], [1, "fas", "fa-arrow-right", "text-xs"], [1, "p-1.5", "rounded", "transition-colors", 3, "click", "disabled", "title"], [1, "fas", "fa-check", "text-xs"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "p-12", "text-center"], [1, "w-16", "h-16", "bg-gray-100", "rounded-full", "flex", "items-center", "justify-center", "mx-auto", "mb-4"], [1, "fas", "fa-bell-slash", "text-gray-400", "text-xl"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8", "pb-8"], [1, "text-center"], [1, "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:ring-offset-2", "transition-colors", 3, "click"], [1, "fas", "fa-chevron-down", "text-xs", "mr-2"], [1, "max-w-7xl", "mx-auto", "px-3", "sm:px-6", "lg:px-8", "pb-8"], [1, "flex", "flex-col", "sm:flex-row", "gap-3"], [1, "inline-flex", "items-center", "justify-center", "px-3", "py-2", "border", "border-red-300", "rounded-lg", "text-sm", "font-medium", "text-red-700", "bg-white", "hover:bg-red-50", "focus:outline-none", "focus:ring-2", "focus:ring-red-500", "transition-colors", "whitespace-nowrap", 3, "click"], [1, "fas", "fa-trash-alt", "text-xs", "mr-2"], [1, "text-xs", "text-gray-500", "ml-1"], [1, "fixed", "inset-0", "bg-black", "bg-opacity-50", "z-50", "flex", "items-center", "justify-center", "p-4", 3, "click"], [1, "bg-white", "rounded-lg", "shadow-xl", "max-w-lg", "w-full", "max-h-screen", "overflow-y-auto", 3, "click"], [1, "flex", "items-center", "justify-between", "p-6", "border-b", "border-gray-200"], [1, "text-lg", "font-semibold", "text-gray-900"], [1, "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click"], [1, "fas", "fa-times"], [1, "p-6", "space-y-4", 3, "ngSubmit"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-2"], [1, "space-y-2"], ["type", "radio", "name", "tipoDestinatario", "value", "USUARIO_ESPECIFICO", 1, "form-radio", "text-blue-600", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], [1, "ml-2", "text-sm", "text-gray-700"], ["type", "radio", "name", "tipoDestinatario", "value", "ROL_COMPLETO", 1, "form-radio", "text-blue-600", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "tipoDestinatario", "value", "TODOS_USUARIOS", 1, "form-radio", "text-blue-600", "focus:ring-blue-500", 3, "ngModelChange", "ngModel"], ["class", "mt-1 text-sm text-red-600", 4, "ngIf"], [4, "ngIf"], ["class", "bg-yellow-50 border border-yellow-200 rounded-lg p-3", 4, "ngIf"], ["type", "text", "name", "titulo", "placeholder", "Ingrese el t\xEDtulo de la notificaci\xF3n", "required", "", "maxlength", "200", 1, "w-full", "px-3", "py-2", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["rows", "4", "name", "mensaje", "placeholder", "Escriba el mensaje de la notificaci\xF3n", "required", "", "maxlength", "500", 1, "w-full", "px-3", "py-2", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "resize-none", 3, "ngModelChange", "ngModel"], ["name", "tipo", "required", "", 1, "w-full", "px-3", "py-2", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "TRAMITE_CREADO"], ["value", "TRAMITE_APROBADO"], ["value", "TRAMITE_RECHAZADO"], ["value", "TRAMITE_OBSERVADO"], ["value", "DERIVACION"], ["value", "SISTEMA"], ["name", "prioridad", "required", "", 1, "w-full", "px-3", "py-2", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], ["value", "BAJA"], ["value", "NORMAL"], ["value", "ALTA"], [1, "flex", "justify-end", "space-x-3", "pt-4", "border-t", "border-gray-200"], ["type", "button", 1, "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "transition-colors", 3, "click"], ["type", "submit", 1, "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "text-sm", "font-medium", "hover:bg-blue-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:ring-offset-2", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", 3, "disabled"], [1, "mt-1", "text-sm", "text-red-600"], ["name", "usuarioDestinatarioId", 1, "w-full", "px-3", "py-2", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["name", "roleDestinatario", 1, "w-full", "px-3", "py-2", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [1, "bg-yellow-50", "border", "border-yellow-200", "rounded-lg", "p-3"], [1, "flex"], [1, "fas", "fa-exclamation-triangle", "text-yellow-400", "mt-0.5", "mr-2"], [1, "text-sm", "font-medium", "text-yellow-800"], [1, "text-sm", "text-yellow-700"], [1, "fas", "fa-spinner", "fa-spin", "mr-2"], [1, "fas", "fa-plus", "mr-2"], [1, "fixed", "inset-0", "bg-gray-600", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50", "p-4"], [1, "bg-white", "rounded-xl", "shadow-xl", "max-w-2xl", "w-full", "max-h-screen", "overflow-y-auto"], [1, "fas", "fa-edit", "text-orange-500", "mr-2"], ["type", "button", 1, "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click"], [1, "fas", "fa-times", "text-xl"], [1, "p-6", 3, "ngSubmit"], [1, "mb-6"], ["type", "text", "name", "titulo", "required", "", "maxlength", "200", "placeholder", "T\xEDtulo de la notificaci\xF3n", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-orange-500", "focus:border-orange-500", 3, "ngModelChange", "ngModel"], ["name", "mensaje", "required", "", "maxlength", "500", "placeholder", "Contenido del mensaje...", "rows", "4", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-orange-500", "focus:border-orange-500", "min-h-[100px]", 3, "ngModelChange", "ngModel"], ["name", "tipo", "required", "", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-orange-500", "focus:border-orange-500", 3, "ngModelChange", "ngModel"], ["name", "prioridad", "required", "", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-orange-500", "focus:border-orange-500", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "rutaDestino", "placeholder", "/dashboard, /tramites/123, etc.", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-orange-500", "focus:border-orange-500", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-orange-500", "transition-colors", 3, "click"], ["type", "submit", 1, "px-4", "py-2", "bg-orange-600", "text-white", "rounded-lg", "text-sm", "font-medium", "hover:bg-orange-700", "focus:outline-none", "focus:ring-2", "focus:ring-orange-500", "focus:ring-offset-2", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", 3, "disabled"], [1, "fas", "fa-save", "mr-2"], [1, "bg-white", "rounded-xl", "shadow-xl", "max-w-md", "w-full"], [1, "fas", "fa-exclamation-triangle", "text-red-500", "mr-2"], [1, "p-6"], [1, "text-gray-700", "mb-4"], [1, "bg-gray-50", "border", "border-gray-200", "rounded-lg", "p-4"], [1, "font-medium", "text-gray-900", "mb-2"], [1, "text-sm", "text-gray-600", "line-clamp-3"], [1, "flex", "items-center", "mt-3", "space-x-4", "text-xs", "text-gray-500"], [1, "fas", "fa-tag", "mr-1"], [1, "fas", "fa-flag", "mr-1"], [1, "text-sm", "text-red-600", "mt-3"], [1, "fas", "fa-exclamation-circle", "mr-1"], [1, "flex", "justify-end", "space-x-3"], ["type", "button", 1, "px-4", "py-2", "border", "border-gray-300", "rounded-lg", "text-sm", "font-medium", "text-gray-700", "bg-white", "hover:bg-gray-50", "focus:outline-none", "focus:ring-2", "focus:ring-gray-500", "transition-colors", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-red-600", "text-white", "rounded-lg", "text-sm", "font-medium", "hover:bg-red-700", "focus:outline-none", "focus:ring-2", "focus:ring-red-500", "focus:ring-offset-2", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", 3, "click", "disabled"], [1, "fas", "fa-trash", "mr-2"], [1, "fas", "fa-broom", "text-blue-500", "mr-2"], [1, "mb-4"], ["type", "number", "min", "1", "max", "365", "name", "diasAntiguedad", 1, "w-20", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "ngModelChange", "ngModel"], [1, "text-gray-600"], [1, "text-xs", "text-gray-500", "mt-1"], [1, "bg-blue-50", "border", "border-blue-200", "rounded-lg", "p-4"], [1, "fas", "fa-info-circle", "text-blue-500", "mr-2"], [1, "text-sm", "text-blue-700"], [1, "fas", "fa-exclamation-triangle", "mr-1"], ["type", "button", 1, "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "text-sm", "font-medium", "hover:bg-blue-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:ring-offset-2", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", 3, "click", "disabled"], [1, "fas", "fa-broom", "mr-2"]], template: function NotificacionesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6)(5, "div", 7)(6, "div", 8);
        \u0275\u0275element(7, "i", 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 10)(9, "h1", 11);
        \u0275\u0275text(10, "Centro de Notificaciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 12);
        \u0275\u0275text(12, "Mantente al d\xEDa con tus actualizaciones");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 13)(14, "div", 14);
        \u0275\u0275element(15, "div", 15);
        \u0275\u0275elementStart(16, "span", 16);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(18, "div", 17);
        \u0275\u0275template(19, NotificacionesComponent_button_19_Template, 4, 0, "button", 18)(20, NotificacionesComponent_button_20_Template, 6, 1, "button", 19)(21, NotificacionesComponent_button_21_Template, 4, 0, "button", 20);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(22, "div", 21)(23, "div", 22)(24, "div", 23)(25, "div", 13)(26, "div", 24);
        \u0275\u0275element(27, "i", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 26)(29, "div", 27);
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "div", 28);
        \u0275\u0275text(32, "Total");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(33, "div", 23)(34, "div", 13)(35, "div", 29);
        \u0275\u0275element(36, "i", 30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "div", 26)(38, "div", 27);
        \u0275\u0275text(39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 28);
        \u0275\u0275text(41, "Sin leer");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(42, "div", 23)(43, "div", 13)(44, "div", 31);
        \u0275\u0275element(45, "i", 32);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "div", 26)(47, "div", 27);
        \u0275\u0275text(48);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "div", 28);
        \u0275\u0275text(50, "Le\xEDdas");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(51, "div", 23)(52, "div", 13)(53, "div", 33);
        \u0275\u0275element(54, "i", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "div", 26)(56, "div", 27);
        \u0275\u0275text(57);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "div", 28);
        \u0275\u0275text(59, "Este mes");
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(60, "div", 35)(61, "div", 23)(62, "div", 36)(63, "div", 37)(64, "div", 38);
        \u0275\u0275element(65, "i", 39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "input", 40);
        \u0275\u0275twoWayListener("ngModelChange", function NotificacionesComponent_Template_input_ngModelChange_66_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtros.busqueda, $event) || (ctx.filtros.busqueda = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function NotificacionesComponent_Template_input_ngModelChange_66_listener() {
          ctx.aplicarFiltros();
          return ctx.agruparNotificaciones();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(67, NotificacionesComponent_button_67_Template, 6, 0, "button", 41);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "div", 42)(69, "button", 43);
        \u0275\u0275listener("click", function NotificacionesComponent_Template_button_click_69_listener() {
          return ctx.setFiltroEstado(void 0);
        });
        \u0275\u0275text(70, " Todas ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "button", 43);
        \u0275\u0275listener("click", function NotificacionesComponent_Template_button_click_71_listener() {
          return ctx.setFiltroEstado(false);
        });
        \u0275\u0275element(72, "span", 44);
        \u0275\u0275text(73, " No le\xEDdas ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "button", 43);
        \u0275\u0275listener("click", function NotificacionesComponent_Template_button_click_74_listener() {
          return ctx.setFiltroEstado(true);
        });
        \u0275\u0275element(75, "span", 45);
        \u0275\u0275text(76, " Le\xEDdas ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(77, NotificacionesComponent_div_77_Template, 8, 0, "div", 46)(78, NotificacionesComponent_div_78_Template, 3, 3, "div", 47)(79, NotificacionesComponent_div_79_Template, 5, 0, "div", 48)(80, NotificacionesComponent_div_80_Template, 9, 0, "div", 49)(81, NotificacionesComponent_div_81_Template, 77, 34, "div", 50);
        \u0275\u0275elementEnd();
        \u0275\u0275template(82, NotificacionesComponent_div_82_Template, 54, 9, "div", 51)(83, NotificacionesComponent_div_83_Template, 33, 8, "div", 51)(84, NotificacionesComponent_div_84_Template, 37, 6, "div", 51);
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275classMap(ctx.estaConectadoWs ? "bg-green-400" : "bg-red-400");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.estaConectadoWs ? "Conectado" : "Desconectado", " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.esAdmin());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.contadorNoLeidas > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.esAdmin());
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.estadisticasLocales.totalNotificaciones);
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.estadisticasLocales.noLeidas);
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.estadisticasLocales.leidas);
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate(ctx.estadisticasLocales.ultimoMes);
        \u0275\u0275advance(9);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtros.busqueda);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filtros.busqueda);
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.filtros.esLeida === void 0 ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.filtros.esLeida === false ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200");
        \u0275\u0275advance(3);
        \u0275\u0275classMap(ctx.filtros.esLeida === true ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.cargando);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cargando);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLastPage && !ctx.cargando && ctx.notificacionesAgrupadas.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.esAdmin());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarModalCrear);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarModalEditar);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarModalEliminar);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarModalLimpiar);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, MinValidator, MaxValidator, NgModel, NgForm], styles: ["\n\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.modern-notifications-container[_ngcontent-%COMP%] {\n  max-width: 1024px;\n  margin: 0 auto;\n  padding: 20px;\n  background: #ffffff;\n  min-height: 100vh;\n  font-family:\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\n.modern-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  background: #3b82f6;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.header-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: white;\n}\n.header-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.header-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 4px 0 0 0;\n}\n.connection-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  background: #f3f4f6;\n  border-radius: 16px;\n  font-size: 12px;\n  color: #6b7280;\n}\n.connection-badge.online[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.connection-badge.offline[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #991b1b;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.modern-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: white;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  color: #374151;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.15s;\n}\n.modern-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n.modern-btn.primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n  border-color: #3b82f6;\n}\n.modern-btn.primary[_ngcontent-%COMP%]:hover {\n  background: #2563eb;\n}\n.modern-btn.secondary[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #475569;\n  border-color: #cbd5e1;\n}\n.modern-btn.secondary[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n  border-color: #94a3b8;\n}\n.btn-badge[_ngcontent-%COMP%] {\n  background: #ef4444;\n  color: white;\n  padding: 0 6px;\n  border-radius: 10px;\n  font-size: 11px;\n  min-width: 18px;\n  text-align: center;\n}\n.modern-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 32px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f9fafb;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  width: 32px;\n  height: 32px;\n  align-items: center;\n  justify-content: center;\n  background: white;\n  border-radius: 6px;\n  margin-bottom: 8px;\n  color: #3b82f6;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 4px 0 0 0;\n}\n.simple-search-bar[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  display: flex;\n  gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.search-container[_ngcontent-%COMP%] {\n  flex: 1;\n  position: relative;\n  min-width: 250px;\n}\n.search-container[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  font-size: 14px;\n}\n.search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px 10px 36px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  color: #374151;\n  background: white;\n  transition: all 0.15s;\n}\n.search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);\n}\n.quick-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.quick-filter-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 13px;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.quick-filter-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n.quick-filter-btn.active[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  border-color: #3b82f6;\n  color: #1e40af;\n}\n.filter-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  display: inline-block;\n}\n.filter-dot.unread[_ngcontent-%COMP%] {\n  background: #3b82f6;\n}\n.filter-dot.urgent[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.modern-loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #6b7280;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  border: 2px solid #e5e7eb;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 12px;\n}\n.loading-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  margin: 0;\n}\n.modern-notifications-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.notification-group[_ngcontent-%COMP%] {\n  border: none;\n}\n.group-header[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.group-date[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #374151;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.group-date[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n}\n.group-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #6b7280;\n}\n.modern-notification[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f3f4f6;\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  cursor: pointer;\n  transition: background 0.15s;\n  background: white;\n}\n.modern-notification[_ngcontent-%COMP%]:hover {\n  background: #fafafa;\n}\n.modern-notification.unread[_ngcontent-%COMP%] {\n  background: #f0f9ff;\n  border-left: 2px solid #3b82f6;\n}\n.notification-main[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex: 1;\n}\n.notification-avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.avatar-bg[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  color: white;\n}\n.avatar-bg.tramite-creado[_ngcontent-%COMP%] {\n  background: #10b981;\n}\n.avatar-bg.tramite-aprobado[_ngcontent-%COMP%] {\n  background: #3b82f6;\n}\n.avatar-bg.tramite-rechazado[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.avatar-bg.tramite-observado[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.avatar-bg.derivacion[_ngcontent-%COMP%] {\n  background: #8b5cf6;\n}\n.avatar-bg.sistema[_ngcontent-%COMP%] {\n  background: #6b7280;\n}\n.unread-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  background: #3b82f6;\n  border-radius: 50%;\n  margin-left: 4px;\n  display: inline-block;\n}\n.notification-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.notification-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 4px;\n}\n.notification-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #111827;\n  margin: 0;\n}\n.notification-time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n  white-space: nowrap;\n}\n.notification-message[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0 0 8px 0;\n  line-height: 1.4;\n}\n.notification-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.meta-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 8px;\n  background: #f3f4f6;\n  border-radius: 12px;\n  font-size: 11px;\n  color: #6b7280;\n}\n.meta-tag.type[_ngcontent-%COMP%] {\n  background: #e0e7ff;\n  color: #3730a3;\n}\n.meta-tag.priority[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.notification-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 1px solid #e5e7eb;\n  background: white;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-size: 12px;\n  color: #6b7280;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  border-color: #d1d5db;\n}\n.action-btn.mark-read[_ngcontent-%COMP%] {\n  color: #10b981;\n}\n.action-btn.resend[_ngcontent-%COMP%] {\n  color: #3b82f6;\n}\n.modern-empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #e5e7eb;\n  margin-bottom: 16px;\n}\n.empty-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  color: #374151;\n  margin: 0 0 8px 0;\n}\n.empty-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #9ca3af;\n  margin: 0 0 16px 0;\n}\n.empty-particles[_ngcontent-%COMP%] {\n  display: none;\n}\n.modern-load-more[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  text-align: center;\n}\n.load-more-btn[_ngcontent-%COMP%] {\n  padding: 8px 24px;\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.load-more-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n.load-more-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.load-more-indicator[_ngcontent-%COMP%] {\n  display: none;\n}\n.modern-admin-panel[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  padding: 16px;\n  background: #fef3c7;\n  border-radius: 8px;\n  border: 1px solid #fde68a;\n}\n.admin-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #92400e;\n  margin: 0 0 12px 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.admin-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.admin-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.admin-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background: white;\n  border: 1px solid #fde68a;\n  border-radius: 6px;\n  font-size: 12px;\n  color: #92400e;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.15s;\n}\n.admin-btn[_ngcontent-%COMP%]:hover {\n  background: #fef9c3;\n}\n.admin-btn.danger[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-color: #fecaca;\n  color: #991b1b;\n}\n.admin-btn.danger[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n}\n.admin-btn[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  opacity: 0.8;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 640px) {\n  button[class*=inline-flex][_ngcontent-%COMP%] {\n    min-width: 40px !important;\n    width: 40px !important;\n    padding: 8px !important;\n    justify-content: center !important;\n  }\n  button[class*=inline-flex][_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:not([class*=absolute]):not([class*=bg-red]):not([class*=bg-blue]) {\n    display: none !important;\n  }\n  button[class*=inline-flex][_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n    margin: 0 !important;\n  }\n  button[class*=inline-flex][_ngcontent-%COMP%]   span[class*=absolute][_ngcontent-%COMP%] {\n    position: absolute !important;\n    top: -4px !important;\n    right: -4px !important;\n    margin: 0 !important;\n  }\n}\n@media (max-width: 768px) {\n  .modern-notifications-container[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    gap: 8px;\n    overflow-x: auto;\n  }\n  .header-actions[_ngcontent-%COMP%]   .modern-btn[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    font-size: 13px;\n    padding: 7px 12px;\n  }\n  .header-actions[_ngcontent-%COMP%]   .modern-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .header-actions[_ngcontent-%COMP%]   .modern-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n  .modern-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 8px;\n  }\n  .filters-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-grid[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .search-input-container[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .notification-main[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .notification-actions[_ngcontent-%COMP%] {\n    margin-top: 8px;\n  }\n  .admin-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .admin-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n@media (max-width: 480px) {\n  .header-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .header-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    flex-wrap: nowrap;\n  }\n  .header-actions[_ngcontent-%COMP%]   .modern-btn[_ngcontent-%COMP%] {\n    min-width: 40px;\n    padding: 8px 10px;\n    justify-content: center;\n  }\n  .quick-filters[_ngcontent-%COMP%] {\n    flex-wrap: nowrap;\n    overflow-x: auto;\n    width: 100%;\n    padding-bottom: 4px;\n  }\n  .quick-filter-btn[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 7px 12px;\n  }\n  .modern-stats[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .modern-btn[_ngcontent-%COMP%] {\n    padding: 6px 12px;\n    font-size: 12px;\n  }\n  .notification-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 4px;\n  }\n  .notification-meta[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .notification-actions[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n  }\n}\n/*# sourceMappingURL=notificaciones.component.css.map */"], data: { animation: [
      trigger("slideDown", [
        transition(":enter", [
          style({ height: "0", opacity: 0 }),
          animate("300ms ease-out", style({ height: "*", opacity: 1 }))
        ]),
        transition(":leave", [
          animate("300ms ease-in", style({ height: "0", opacity: 0 }))
        ])
      ]),
      trigger("slideIn", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateX(-20px)" }),
          animate("200ms ease-out", style({ opacity: 1, transform: "translateX(0)" }))
        ])
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificacionesComponent, { className: "NotificacionesComponent" });
})();
export {
  NotificacionesComponent
};
//# sourceMappingURL=chunk-BUT7HTAZ.js.map
