import {
  ModalBaseComponent,
  NuevoTramiteModalComponent
} from "./chunk-HNOTGUUJ.js";
import "./chunk-UIOATMJA.js";
import {
  MisTramitesService
} from "./chunk-OIH2ELY7.js";
import {
  TramiteService
} from "./chunk-337GPXUU.js";
import "./chunk-SL73FFWH.js";
import {
  BandejaTramitesService
} from "./chunk-4WDSHIDR.js";
import {
  ToastService
} from "./chunk-OF2WYGMW.js";
import {
  AuthService,
  DomSanitizer,
  RouterModule
} from "./chunk-T5HD73DN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-6M6PSWXB.js";
import {
  AsyncPipe,
  ChangeDetectorRef,
  CommonModule,
  EventEmitter,
  NgClass,
  NgForOf,
  NgIf,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HL73AAZ4.js";

// src/app/features/tramites/components/detalle-tramite-modal/detalle-tramite-modal.component.ts
function DetalleTramiteModalComponent_div_1_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.documentos.length);
  }
}
function DetalleTramiteModalComponent_div_1_span_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.historial.length);
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "label");
    \u0275\u0275text(2, "Fecha de Vencimiento:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 41);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(ctx_r1.tramite.fechaVencimiento));
    \u0275\u0275advance();
    \u0275\u0275classProp("vence-pronto", (ctx_r1.getDiasVencimiento(ctx_r1.tramite.fechaVencimiento) || 0) <= 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", ctx_r1.getDiasVencimiento(ctx_r1.tramite.fechaVencimiento), " d\xEDas h\xE1biles) ");
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "h3", 35);
    \u0275\u0275text(2, "Observaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 42)(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramite.observaciones);
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "h3", 35);
    \u0275\u0275text(2, "\u{1F464} Usuario Solicitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 43)(4, "p")(5, "strong");
    \u0275\u0275text(6, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p")(9, "strong");
    \u0275\u0275text(10, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "strong");
    \u0275\u0275text(14, "\xC1rea de Origen:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" ", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante.nombre, " ", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante.apellidos, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante.correo, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.areaDestino == null ? null : ctx_r1.tramiteCompleto.areaDestino.nombre) || "Secretaria General", "");
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "h3", 35);
    \u0275\u0275text(2, "\u{1F468}\u200D\u{1F4BC} Usuario Responsable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 43)(4, "p")(5, "strong");
    \u0275\u0275text(6, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p")(9, "strong");
    \u0275\u0275text(10, "\xC1rea:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" ", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.trabajadorAsignado == null ? null : ctx_r1.tramiteCompleto.trabajadorAsignado.nombre, " ", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.trabajadorAsignado == null ? null : ctx_r1.tramiteCompleto.trabajadorAsignado.apellidos, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.areaDestino == null ? null : ctx_r1.tramiteCompleto.areaDestino.nombre) || "No disponible", "");
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_41_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275element(1, "i", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" Respondido por: ", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioRespondio == null ? null : ctx_r1.tramiteCompleto.usuarioRespondio.nombre, " ", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioRespondio == null ? null : ctx_r1.tramiteCompleto.usuarioRespondio.apellidos, " ");
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_41_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275element(1, "i", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Fecha de respuesta: ", ctx_r1.formatearFecha(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.fechaRespuesta), " ");
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "h3", 35);
    \u0275\u0275text(2, "\u{1F4DD} Respuesta del Administrativo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44)(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 45)(7, "div", 46);
    \u0275\u0275template(8, DetalleTramiteModalComponent_div_1_div_34_div_41_span_8_Template, 3, 2, "span", 47)(9, DetalleTramiteModalComponent_div_1_div_34_div_41_span_9_Template, 3, 1, "span", 48);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.respuesta);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioRespondio);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.fechaRespuesta);
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_42_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "label");
    \u0275\u0275text(2, "Fecha de Firma:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearFechaFirma(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.fechaFirma));
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_42_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "label");
    \u0275\u0275text(2, "M\xE9todo de Verificaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getMetodoVerificacion(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.metodoVerificacion));
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_42_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "label");
    \u0275\u0275text(2, "Biometr\xEDa:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 66);
    \u0275\u0275element(4, "i", 67);
    \u0275\u0275text(5, " Verificaci\xF3n biom\xE9trica requerida ");
    \u0275\u0275elementEnd()();
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_42_div_15_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "label");
    \u0275\u0275text(2, "Hash de Verificaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 72);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.hashFirma);
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_42_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "h4", 69);
    \u0275\u0275element(2, "i", 70);
    \u0275\u0275text(3, " Informaci\xF3n del Firmante ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 71)(5, "div", 56)(6, "label");
    \u0275\u0275text(7, "Nombre Completo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 56)(11, "label");
    \u0275\u0275text(12, "Correo Electr\xF3nico:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, DetalleTramiteModalComponent_div_1_div_34_div_42_div_15_div_15_Template, 5, 1, "div", 59);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.getNombreCompleto(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante.correo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.hashFirma);
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_42_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "h4", 74);
    \u0275\u0275element(2, "i", 75);
    \u0275\u0275text(3, " Firma Digital Capturada ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 76)(5, "div", 77);
    \u0275\u0275element(6, "i", 53);
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Firma digital verificada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "small");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate((ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.fechaFirma) ? ctx_r1.formatearFechaFirma(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.fechaFirma) : "Fecha no disponible");
  }
}
function DetalleTramiteModalComponent_div_1_div_34_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "h3", 35);
    \u0275\u0275element(2, "i", 53);
    \u0275\u0275text(3, " Firma Digital ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 54)(5, "div", 55)(6, "div", 56)(7, "label");
    \u0275\u0275text(8, "Estado de la Firma:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 57);
    \u0275\u0275element(10, "i", 58);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, DetalleTramiteModalComponent_div_1_div_34_div_42_div_12_Template, 5, 1, "div", 59)(13, DetalleTramiteModalComponent_div_1_div_34_div_42_div_13_Template, 5, 1, "div", 59)(14, DetalleTramiteModalComponent_div_1_div_34_div_42_div_14_Template, 6, 0, "div", 59)(15, DetalleTramiteModalComponent_div_1_div_34_div_42_div_15_Template, 16, 3, "div", 60)(16, DetalleTramiteModalComponent_div_1_div_34_div_42_div_16_Template, 11, 1, "div", 61);
    \u0275\u0275elementStart(17, "div", 62)(18, "div", 63);
    \u0275\u0275element(19, "i", 64);
    \u0275\u0275elementStart(20, "div", 65)(21, "strong");
    \u0275\u0275text(22, "Declaraci\xF3n Legal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Este documento ha sido firmado digitalmente con validez legal. La firma digital tiene el mismo valor que una firma manuscrita seg\xFAn la legislaci\xF3n vigente sobre firma electr\xF3nica.");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(9);
    \u0275\u0275classProp("firma-valida", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.firmaValida)("firma-invalida", !(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.firmaValida));
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-check-circle", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.firmaValida)("fa-exclamation-triangle", !(ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.firmaValida));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.firmaValida) ? "Firma V\xE1lida" : "Firma Pendiente de Validaci\xF3n", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.fechaFirma);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.metodoVerificacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.requiereBiometria);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mostrarDatosPersonales() && (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mostrarDatosPersonales() && (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.hashFirma));
  }
}
function DetalleTramiteModalComponent_div_1_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "div", 34)(3, "h3", 35);
    \u0275\u0275text(4, "Informaci\xF3n General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 36)(6, "div", 37)(7, "label");
    \u0275\u0275text(8, "Tipo de Tr\xE1mite:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 37)(12, "label");
    \u0275\u0275text(13, "Solicitante:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 37)(17, "label");
    \u0275\u0275text(18, "\xC1rea de Destino:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 37)(22, "label");
    \u0275\u0275text(23, "Responsable:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 37)(27, "label");
    \u0275\u0275text(28, "Fecha de Creaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(31, DetalleTramiteModalComponent_div_1_div_34_div_31_Template, 7, 4, "div", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 34)(33, "h3", 35);
    \u0275\u0275text(34, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 39)(36, "p");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(38, DetalleTramiteModalComponent_div_1_div_34_div_38_Template, 6, 1, "div", 40)(39, DetalleTramiteModalComponent_div_1_div_34_div_39_Template, 16, 4, "div", 40)(40, DetalleTramiteModalComponent_div_1_div_34_div_40_Template, 12, 3, "div", 40)(41, DetalleTramiteModalComponent_div_1_div_34_div_41_Template, 10, 3, "div", 40)(42, DetalleTramiteModalComponent_div_1_div_34_div_42_Template, 25, 14, "div", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "info");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.tramite.tipoTramite == null ? null : ctx_r1.tramite.tipoTramite.nombre);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante.nombre) || "jhafet martin", " ", (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante.apellidos) || "Canepa", "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r1.tramite.areaDestino == null ? null : ctx_r1.tramite.areaDestino.nombre) || "No asignada");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", (ctx_r1.tramite.trabajadorAsignado == null ? null : ctx_r1.tramite.trabajadorAsignado.nombre) || "Sin asignar", " ", (ctx_r1.tramite.trabajadorAsignado == null ? null : ctx_r1.tramite.trabajadorAsignado.apellidos) || "", "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(ctx_r1.tramite.fechaCreacion));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramite.fechaVencimiento);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.tramite.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramite.observaciones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.usuarioSolicitante);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.trabajadorAsignado);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.respuesta) && (ctx_r1.tramiteCompleto == null ? null : ctx_r1.tramiteCompleto.estado == null ? null : ctx_r1.tramiteCompleto.estado.nombre) === "FINALIZADO");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mostrarFirmaSegunRol());
  }
}
function DetalleTramiteModalComponent_div_1_div_35_div_7_div_1_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 97);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const documento_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", documento_r4.descripcion, " ");
  }
}
function DetalleTramiteModalComponent_div_1_div_35_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 84)(1, "div", 85)(2, "div", 86);
    \u0275\u0275element(3, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 87)(5, "h4", 88);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 89)(8, "span", 90);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 12);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, DetalleTramiteModalComponent_div_1_div_35_div_7_div_1_p_12_Template, 2, 1, "p", 91);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 92)(14, "button", 93);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_1_div_35_div_7_div_1_Template_button_click_14_listener() {
      const documento_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.previsualizarDocumento(documento_r4));
    });
    \u0275\u0275element(15, "i", 94);
    \u0275\u0275text(16, " Ver ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 95);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_1_div_35_div_7_div_1_Template_button_click_17_listener() {
      const documento_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.descargarDocumento(documento_r4));
    });
    \u0275\u0275element(18, "i", 96);
    \u0275\u0275text(19, " Descargar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const documento_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getIconoTipoArchivo(documento_r4.tipo || ""));
    \u0275\u0275styleProp("color", ctx_r1.getColorIconoArchivo(documento_r4.tipo || ""));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(documento_r4.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatearTamanioArchivo(documento_r4.tamano));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(documento_r4.fechaSubida));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", documento_r4.descripcion);
  }
}
function DetalleTramiteModalComponent_div_1_div_35_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275template(1, DetalleTramiteModalComponent_div_1_div_35_div_7_div_1_Template, 20, 8, "div", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.documentos);
  }
}
function DetalleTramiteModalComponent_div_1_div_35_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 98);
    \u0275\u0275element(1, "i", 99);
    \u0275\u0275elementStart(2, "h4");
    \u0275\u0275text(3, "Sin documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Este tr\xE1mite no tiene documentos adjuntos.");
    \u0275\u0275elementEnd()();
  }
}
function DetalleTramiteModalComponent_div_1_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 78)(2, "div", 79)(3, "h3");
    \u0275\u0275text(4, "Documentos Adjuntos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 80);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, DetalleTramiteModalComponent_div_1_div_35_div_7_Template, 2, 1, "div", 81)(8, DetalleTramiteModalComponent_div_1_div_35_ng_template_8_Template, 6, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const noDocumentos_r5 = \u0275\u0275reference(9);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "documentos");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.documentos.length, " documento(s)");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.documentos.length > 0)("ngIfElse", noDocumentos_r5);
  }
}
function DetalleTramiteModalComponent_div_1_div_36_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 106);
    \u0275\u0275element(1, "i", 107);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.totalModificaciones, " modificaciones ");
  }
}
function DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 126);
    \u0275\u0275element(1, "i", 127);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evento_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", evento_r6.observaciones, " ");
  }
}
function DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128);
    \u0275\u0275element(1, "i", 129);
    \u0275\u0275elementStart(2, "div", 130)(3, "span", 131);
    \u0275\u0275text(4, "Realizado por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 132);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const evento_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(evento_r6.usuario);
  }
}
function DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128);
    \u0275\u0275element(1, "i", 133);
    \u0275\u0275elementStart(2, "div", 130)(3, "span", 131);
    \u0275\u0275text(4, "\xC1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 132);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const evento_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(evento_r6.area);
  }
}
function DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 134)(1, "span", 135);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "i", 136);
    \u0275\u0275elementStart(4, "span", 137);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const evento_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoClase(evento_r6.estadoAnterior));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", evento_r6.estadoAnterior, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getEstadoClase(evento_r6.estadoNuevo));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", evento_r6.estadoNuevo, " ");
  }
}
function DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110);
    \u0275\u0275element(1, "div", 111);
    \u0275\u0275elementStart(2, "div", 112);
    \u0275\u0275element(3, "i", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 113)(5, "div", 114)(6, "div", 115)(7, "div", 116)(8, "h4", 117);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 118);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 119);
    \u0275\u0275element(13, "i", 120);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 121);
    \u0275\u0275template(17, DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_p_17_Template, 3, 1, "p", 122);
    \u0275\u0275elementStart(18, "div", 123);
    \u0275\u0275template(19, DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_div_19_Template, 7, 1, "div", 124)(20, DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_div_20_Template, 7, 1, "div", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_div_21_Template, 6, 6, "div", 125);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const evento_r6 = ctx.$implicit;
    const last_r7 = ctx.last;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("last-item", last_r7);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getEventoIcon(evento_r6.accion));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEventoIconClass(evento_r6.accion));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(evento_r6.descripcion);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getAccionClase(evento_r6.accion));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", evento_r6.accion, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearFechaCompleta(evento_r6.fecha));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", evento_r6.observaciones);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", evento_r6.usuario);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", evento_r6.area);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", evento_r6.estadoAnterior && evento_r6.estadoNuevo);
  }
}
function DetalleTramiteModalComponent_div_1_div_36_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 108);
    \u0275\u0275template(1, DetalleTramiteModalComponent_div_1_div_36_div_9_div_1_Template, 22, 15, "div", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.historial);
  }
}
function DetalleTramiteModalComponent_div_1_div_36_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 138)(1, "div", 139);
    \u0275\u0275element(2, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h4");
    \u0275\u0275text(4, "Sin eventos en el historial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no se han registrado eventos para este tr\xE1mite.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 140);
    \u0275\u0275element(8, "i", 22);
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Los eventos aparecer\xE1n aqu\xED cuando se realicen acciones sobre el tr\xE1mite");
    \u0275\u0275elementEnd()()();
  }
}
function DetalleTramiteModalComponent_div_1_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 100)(2, "div", 101)(3, "h3");
    \u0275\u0275text(4, "Historial del Tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 102)(6, "span", 103);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, DetalleTramiteModalComponent_div_1_div_36_span_8_Template, 3, 1, "span", 104);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, DetalleTramiteModalComponent_div_1_div_36_div_9_Template, 2, 1, "div", 105)(10, DetalleTramiteModalComponent_div_1_div_36_ng_template_10_Template, 11, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const noHistorial_r8 = \u0275\u0275reference(11);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "historial");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getDiasTranscurridos(ctx_r1.tramite.fechaCreacion), " d\xEDas desde la creaci\xF3n ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.totalModificaciones);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.historial.length > 0)("ngIfElse", noHistorial_r8);
  }
}
function DetalleTramiteModalComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "h2", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 10)(7, "span", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 12);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 13)(12, "span", 14);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 15);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 16)(17, "button", 17);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_1_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.imprimirTramite());
    });
    \u0275\u0275element(18, "i", 18);
    \u0275\u0275text(19, " Imprimir ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 19)(21, "div", 20)(22, "button", 21);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_1_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("info"));
    });
    \u0275\u0275element(23, "i", 22);
    \u0275\u0275text(24, " Informaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 21);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("documentos"));
    });
    \u0275\u0275element(26, "i", 23);
    \u0275\u0275text(27, " Documentos ");
    \u0275\u0275template(28, DetalleTramiteModalComponent_div_1_span_28_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 21);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_1_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTab("historial"));
    });
    \u0275\u0275element(30, "i", 25);
    \u0275\u0275text(31, " Historial ");
    \u0275\u0275template(32, DetalleTramiteModalComponent_div_1_span_32_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 26);
    \u0275\u0275template(34, DetalleTramiteModalComponent_div_1_div_34_Template, 43, 16, "div", 27)(35, DetalleTramiteModalComponent_div_1_div_35_Template, 10, 5, "div", 27)(36, DetalleTramiteModalComponent_div_1_div_36_Template, 12, 6, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 28)(38, "button", 29);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_1_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275element(39, "i", 30);
    \u0275\u0275text(40, " Cerrar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramite.asunto);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.tramite.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(ctx_r1.tramite.fechaCreacion));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getEstadoClase((ctx_r1.tramite.estado == null ? null : ctx_r1.tramite.estado.nombre) || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramite.estado == null ? null : ctx_r1.tramite.estado.nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getPrioridadClase((ctx_r1.tramite.prioridad == null ? null : ctx_r1.tramite.prioridad.nombre) || ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramite.prioridad == null ? null : ctx_r1.tramite.prioridad.nombre, " ");
    \u0275\u0275advance(7);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "info");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.activeTab === "documentos");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.documentos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab === "historial");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.historial.length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "info");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "documentos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "historial");
  }
}
function DetalleTramiteModalComponent_div_2_iframe_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 153);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.previewUrl, \u0275\u0275sanitizeResourceUrl);
  }
}
function DetalleTramiteModalComponent_div_2_img_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 154);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.previewUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.documentoPreview.nombre);
  }
}
function DetalleTramiteModalComponent_div_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 155);
    \u0275\u0275element(1, "i", 156);
    \u0275\u0275elementStart(2, "h4");
    \u0275\u0275text(3, "Documento de Office");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "La vista previa no est\xE1 disponible para este tipo de archivo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Por favor, descarga el documento para visualizarlo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 157);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_2_div_13_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.descargarDesdePreview());
    });
    \u0275\u0275element(9, "i", 158);
    \u0275\u0275text(10, " Descargar documento ");
    \u0275\u0275elementEnd()();
  }
}
function DetalleTramiteModalComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 141)(1, "div", 142);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_2_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarPreview());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 143)(3, "div", 144)(4, "div", 145)(5, "h5", 146);
    \u0275\u0275element(6, "i", 147);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 148);
    \u0275\u0275listener("click", function DetalleTramiteModalComponent_div_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarPreview());
    });
    \u0275\u0275element(9, "i", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 149);
    \u0275\u0275template(11, DetalleTramiteModalComponent_div_2_iframe_11_Template, 1, 1, "iframe", 150)(12, DetalleTramiteModalComponent_div_2_img_12_Template, 1, 2, "img", 151)(13, DetalleTramiteModalComponent_div_2_div_13_Template, 11, 0, "div", 152);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.documentoPreview == null ? null : ctx_r1.documentoPreview.nombre, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.documentoPreview && ctx_r1.isPDF(ctx_r1.documentoPreview.tipo || ""));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.documentoPreview && ctx_r1.isImage(ctx_r1.documentoPreview.tipo || ""));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.documentoPreview && ctx_r1.isOfficeDocument(ctx_r1.documentoPreview.tipo || ""));
  }
}
var DetalleTramiteModalComponent = class _DetalleTramiteModalComponent {
  constructor(tramiteService, misTramitesService, toastService, sanitizer, cdr, authService) {
    this.tramiteService = tramiteService;
    this.misTramitesService = misTramitesService;
    this.toastService = toastService;
    this.sanitizer = sanitizer;
    this.cdr = cdr;
    this.authService = authService;
    this.show = false;
    this.tramite = null;
    this.close = new EventEmitter();
    this.tramiteCompleto = null;
    this.documentos = [];
    this.historial = [];
    this.totalModificaciones = 0;
    this.loading = false;
    this.activeTab = "info";
    this.showDocumentPreview = false;
    this.documentoPreview = null;
    this.previewUrl = null;
    this.subscriptions = new Subscription();
  }
  ngOnChanges(changes) {
    if (changes["show"] && changes["show"].currentValue === true && this.tramite?.id) {
      this.cargarDatosDetalle();
    }
    if (changes["tramite"] && this.show && this.tramite?.id) {
      this.cargarDatosDetalle();
    }
  }
  ngOnInit() {
    if (this.show && this.tramite) {
      this.cargarDatosDetalle();
    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  cargarDatosDetalle() {
    if (!this.tramite?.id)
      return;
    this.loading = true;
    this.subscriptions.add(this.misTramitesService.getMiTramiteById(this.tramite.id).subscribe({
      next: (tramiteCompleto) => {
        this.tramiteCompleto = tramiteCompleto;
        this.documentos = tramiteCompleto.documentos || [];
        this.historial = tramiteCompleto.historial || [];
        this.cargarHistorialConConteo();
        this.loading = false;
      },
      error: (error) => {
        this.tramiteCompleto = this.tramite;
        this.documentos = this.tramite.documentos || [];
        this.historial = this.tramite.historial || [];
        this.loading = false;
      }
    }));
  }
  cargarHistorialConConteo() {
    if (!this.tramite?.id)
      return;
    this.tramiteService.getHistorialConConteo(this.tramite.id).subscribe({
      next: (response) => {
        this.totalModificaciones = response.totalModificaciones || 0;
        if (response.historial && response.historial.length > 0) {
          this.historial = response.historial.map((evento) => ({
            id: evento.id,
            descripcion: this.getDescripcionAccion(evento.accion),
            fecha: evento.fechaAccion,
            usuario: evento.usuario ? `${evento.usuario.nombre} ${evento.usuario.apellidos}` : "Usuario desconocido",
            area: evento.areaDestino?.nombre || evento.areaOrigen?.nombre || "",
            estadoAnterior: evento.estadoAnterior,
            estadoNuevo: evento.estadoNuevo,
            observaciones: evento.observaciones || evento.motivo || "",
            accion: evento.accion
          }));
        }
      },
      error: (error) => {
        this.totalModificaciones = 0;
      }
    });
  }
  getDescripcionAccion(accion) {
    const descripciones = {
      "CREADO": "Tr\xE1mite creado",
      "ASIGNADO": "Tr\xE1mite asignado",
      "DERIVADO": "Tr\xE1mite derivado",
      "EN_REVISION": "En revisi\xF3n",
      "EN_PROCESO": "En proceso",
      "RESPONDIDO": "Respuesta enviada",
      "FINALIZADO": "Tr\xE1mite finalizado",
      "RECHAZADO": "Tr\xE1mite rechazado",
      "MODIFICADO": "Tr\xE1mite modificado",
      "DOCUMENTO_AGREGADO": "Documento agregado",
      "COMENTARIO_AGREGADO": "Comentario agregado"
    };
    return descripciones[accion] || accion;
  }
  cambiarTab(tab) {
    this.activeTab = tab;
  }
  descargarDocumento(documento) {
    if (!documento.id)
      return;
    this.subscriptions.add(this.misTramitesService.descargarDocumento(this.tramite.id, documento.nombre).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = documento.nombre || "documento";
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.toastService.error("Error", "No se pudo descargar el documento");
      }
    }));
  }
  imprimirTramite() {
    if (!this.tramite?.id)
      return;
    this.subscriptions.add(this.misTramitesService.descargarTodosDocumentos(this.tramite.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `tramite-${this.tramite?.codigo}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.toastService.error("Error", "No se pudo generar el documento para impresi\xF3n");
      }
    }));
  }
  onClose() {
    this.activeTab = "info";
    this.documentos = [];
    this.historial = [];
    this.close.emit();
  }
  getEstadoClase(estado) {
    const clases = {
      "Borrador": "estado-borrador",
      "Enviado": "estado-enviado",
      "En Revisi\xF3n": "estado-revision",
      "Derivado": "estado-derivado",
      "Observado": "estado-observado",
      "Aprobado": "estado-aprobado",
      "Rechazado": "estado-rechazado",
      "Finalizado": "estado-finalizado",
      "Archivado": "estado-archivado"
    };
    return clases[estado] || "estado-default";
  }
  getPrioridadClase(prioridad) {
    const clases = {
      "Baja": "prioridad-baja",
      "Normal": "prioridad-normal",
      "Alta": "prioridad-alta",
      "Urgente": "prioridad-urgente"
    };
    return clases[prioridad] || "prioridad-normal";
  }
  formatearFecha(fecha) {
    if (!fecha)
      return "Fecha no disponible";
    try {
      const fechaObj = typeof fecha === "string" ? new Date(fecha) : fecha;
      return fechaObj.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      return "Fecha inv\xE1lida";
    }
  }
  formatearFechaCompleta(fecha) {
    if (!fecha)
      return "Fecha no disponible";
    try {
      const fechaObj = typeof fecha === "string" ? new Date(fecha) : fecha;
      return fechaObj.toLocaleDateString("es-PE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      return "Fecha inv\xE1lida";
    }
  }
  getEventoIcon(accion) {
    if (!accion)
      return "marker-default";
    const icons = {
      "CREADO": "marker-created",
      "ASIGNADO": "marker-assigned",
      "DERIVADO": "marker-derivado",
      "EN_REVISION": "marker-revision",
      "EN_PROCESO": "marker-proceso",
      "RESPONDIDO": "marker-respondido",
      "FINALIZADO": "marker-finalizado",
      "RECHAZADO": "marker-rechazado",
      "MODIFICADO": "marker-modificado"
    };
    return icons[accion] || "marker-default";
  }
  getEventoIconClass(accion) {
    if (!accion)
      return "fa-circle";
    const iconClasses = {
      "CREADO": "fa-plus-circle",
      "ASIGNADO": "fa-user-check",
      "DERIVADO": "fa-share",
      "EN_REVISION": "fa-search",
      "EN_PROCESO": "fa-cog",
      "RESPONDIDO": "fa-comment-dots",
      "FINALIZADO": "fa-check-circle",
      "RECHAZADO": "fa-times-circle",
      "MODIFICADO": "fa-edit"
    };
    return iconClasses[accion] || "fa-circle";
  }
  getAccionClase(accion) {
    if (!accion)
      return "badge-default";
    const clases = {
      "CREADO": "badge-created",
      "ASIGNADO": "badge-assigned",
      "DERIVADO": "badge-derivado",
      "MODIFICADO": "badge-modificado",
      "FINALIZADO": "badge-finalizado",
      "RECHAZADO": "badge-rechazado"
    };
    return clases[accion] || "badge-default";
  }
  formatearTamanioArchivo(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  getDiasTranscurridos(fecha) {
    if (!fecha)
      return 0;
    try {
      const fechaObj = typeof fecha === "string" ? new Date(fecha) : fecha;
      const hoy = /* @__PURE__ */ new Date();
      const diferencia = hoy.getTime() - fechaObj.getTime();
      return Math.floor(diferencia / (1e3 * 60 * 60 * 24));
    } catch (error) {
      return 0;
    }
  }
  getDiasVencimiento(fechaVencimiento) {
    if (!fechaVencimiento)
      return null;
    const fechaObj = typeof fechaVencimiento === "string" ? new Date(fechaVencimiento) : fechaVencimiento;
    const hoy = /* @__PURE__ */ new Date();
    const diferencia = fechaObj.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1e3 * 60 * 60 * 24));
  }
  getIconoTipoArchivo(tipoArchivo) {
    if (tipoArchivo.includes("pdf"))
      return "fas fa-file-pdf";
    if (tipoArchivo.includes("word"))
      return "fas fa-file-word";
    if (tipoArchivo.includes("image"))
      return "fas fa-file-image";
    return "fas fa-file";
  }
  getColorIconoArchivo(tipoArchivo) {
    if (tipoArchivo.includes("pdf"))
      return "#dc3545";
    if (tipoArchivo.includes("word"))
      return "#2b579a";
    if (tipoArchivo.includes("image"))
      return "#28a745";
    return "#6c757d";
  }
  previsualizarDocumento(documento) {
    if (!this.tramite?.id || !documento.nombre) {
      this.toastService.warning("Advertencia", "No se puede previsualizar el documento");
      return;
    }
    if (this.isOfficeDocument(documento.tipo || "")) {
      this.documentoPreview = documento;
      this.showDocumentPreview = true;
      this.cdr.detectChanges();
      setTimeout(() => {
      }, 100);
      return;
    }
    this.loading = true;
    this.subscriptions.add(this.misTramitesService.descargarDocumento(this.tramite.id, documento.nombre || "").subscribe({
      next: (blob) => {
        if (blob.size === 0) {
          this.loading = false;
          this.toastService.error("Error", "El documento est\xE1 vac\xEDo");
          return;
        }
        const url = window.URL.createObjectURL(blob);
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.documentoPreview = documento;
        this.showDocumentPreview = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.toastService.error("Error", "No se pudo cargar la vista previa del documento");
      }
    }));
  }
  cerrarPreview() {
    this.showDocumentPreview = false;
    this.documentoPreview = null;
    if (this.previewUrl) {
      const url = this.previewUrl.toString();
      if (url.startsWith("blob:")) {
        window.URL.revokeObjectURL(url);
      }
      this.previewUrl = null;
    }
  }
  descargarDesdePreview() {
    if (this.documentoPreview) {
      this.descargarDocumento(this.documentoPreview);
      this.cerrarPreview();
    }
  }
  isPDF(tipo) {
    return tipo?.toLowerCase().includes("pdf") || false;
  }
  isImage(tipo) {
    const imageTypes = ["image/", "png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const tipoLower = tipo?.toLowerCase() || "";
    return imageTypes.some((t) => tipoLower.includes(t));
  }
  isOfficeDocument(tipo) {
    const officeTypes = [
      "word",
      "docx",
      "doc",
      "excel",
      "xlsx",
      "xls",
      "powerpoint",
      "pptx",
      "ppt",
      "msword",
      "ms-excel",
      "ms-powerpoint",
      "officedocument",
      "openxmlformats"
    ];
    const tipoLower = tipo?.toLowerCase() || "";
    return officeTypes.some((t) => tipoLower.includes(t));
  }
  get currentUserRole() {
    return this.authService.currentUserValue?.role?.name || "";
  }
  get isAdminOrAdministrative() {
    const role = this.currentUserRole;
    return role === "ADMINISTRADOR" || role === "ADMINISTRATIVO";
  }
  get isUserRole() {
    return this.currentUserRole === "USUARIO";
  }
  tieneFirmaDigital() {
    if (!this.tramiteCompleto)
      return false;
    return this.tramiteCompleto.firmaDigitalActiva === true;
  }
  getNombreCompleto(usuario) {
    if (!usuario)
      return "Usuario desconocido";
    return `${usuario.nombre || ""} ${usuario.apellidos || ""}`.trim();
  }
  formatearFechaFirma(fecha) {
    if (!fecha)
      return "No disponible";
    try {
      const fechaObj = typeof fecha === "string" ? new Date(fecha) : fecha;
      return fechaObj.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    } catch (error) {
      return "Fecha inv\xE1lida";
    }
  }
  getMetodoVerificacion(metodo) {
    if (!metodo)
      return "No especificado";
    const metodos = {
      "SIMPLE": "Firma Digital Simple",
      "AVANZADA": "Firma Digital Avanzada",
      "CUALIFICADA": "Firma Digital Cualificada"
    };
    return metodos[metodo] || metodo;
  }
  mostrarFirmaSegunRol() {
    if (!this.tieneFirmaDigital())
      return false;
    if (this.isAdminOrAdministrative)
      return true;
    if (this.isUserRole) {
      const currentUserId = this.authService.currentUserValue?.id;
      const solicitanteId = this.tramiteCompleto?.usuarioSolicitante?.id;
      return currentUserId === solicitanteId;
    }
    return false;
  }
  mostrarDatosPersonales() {
    return this.isAdminOrAdministrative;
  }
  static {
    this.\u0275fac = function DetalleTramiteModalComponent_Factory(t) {
      return new (t || _DetalleTramiteModalComponent)(\u0275\u0275directiveInject(TramiteService), \u0275\u0275directiveInject(MisTramitesService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(DomSanitizer), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetalleTramiteModalComponent, selectors: [["app-detalle-tramite-modal"]], inputs: { show: "show", tramite: "tramite" }, outputs: { close: "close" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 3, vars: 6, consts: [["noDocumentos", ""], ["noHistorial", ""], ["size", "xl", 3, "close", "show", "title", "loading", "showFooter"], ["class", "modal-content", 4, "ngIf"], ["class", "document-preview-modal", 4, "ngIf"], [1, "modal-content"], [1, "tramite-header"], [1, "header-main"], [1, "tramite-info"], [1, "tramite-titulo"], [1, "tramite-meta"], [1, "codigo"], [1, "fecha"], [1, "tramite-estado"], [1, "estado-badge"], [1, "prioridad-badge"], [1, "header-actions"], [1, "btn", "btn-outline-secondary", 3, "click"], [1, "fas", "fa-print"], [1, "tabs-container"], [1, "tabs-nav"], [1, "tab-button", 3, "click"], [1, "fas", "fa-info-circle"], [1, "fas", "fa-paperclip"], ["class", "badge", 4, "ngIf"], [1, "fas", "fa-history"], [1, "tab-content"], ["class", "tab-pane", 3, "active", 4, "ngIf"], [1, "modal-footer-custom"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "fas", "fa-times"], [1, "badge"], [1, "tab-pane"], [1, "info-grid"], [1, "info-section"], [1, "section-title"], [1, "info-list"], [1, "info-item"], ["class", "info-item", 4, "ngIf"], [1, "descripcion-content"], ["class", "info-section", 4, "ngIf"], [1, "dias-vencimiento"], [1, "observaciones-content"], [1, "usuario-info"], [1, "respuesta-content"], [1, "respuesta-meta"], [1, "respuesta-info"], ["class", "respondido-por", 4, "ngIf"], ["class", "fecha-respuesta", 4, "ngIf"], [1, "respondido-por"], [1, "fas", "fa-user-tie"], [1, "fecha-respuesta"], [1, "fas", "fa-calendar-check"], [1, "fas", "fa-signature"], [1, "firma-digital-content"], [1, "firma-digital-info"], [1, "info-row"], [1, "estado-firma"], [1, "fas"], ["class", "info-row", 4, "ngIf"], ["class", "firmante-info", 4, "ngIf"], ["class", "firma-visual", 4, "ngIf"], [1, "firma-legal-notice"], [1, "legal-box"], [1, "fas", "fa-shield-alt"], [1, "legal-text"], [1, "biometria-info"], [1, "fas", "fa-fingerprint"], [1, "firmante-info"], [1, "firmante-title"], [1, "fas", "fa-user-check"], [1, "firmante-details"], [1, "hash-firma"], [1, "firma-visual"], [1, "firma-visual-title"], [1, "fas", "fa-pen-fancy"], [1, "firma-container"], [1, "firma-placeholder"], [1, "documentos-container"], [1, "documentos-header"], [1, "documentos-count"], ["class", "documentos-list", 4, "ngIf", "ngIfElse"], [1, "documentos-list"], ["class", "documento-item", 4, "ngFor", "ngForOf"], [1, "documento-item"], [1, "documento-info"], [1, "documento-icon"], [1, "documento-details"], [1, "documento-nombre"], [1, "documento-meta"], [1, "tamanio"], ["class", "documento-descripcion", 4, "ngIf"], [1, "documento-actions"], ["title", "Ver documento", 1, "btn", "btn-sm", "btn-outline-info", "me-2", 3, "click"], [1, "fas", "fa-eye"], [1, "btn", "btn-sm", "btn-outline-primary", 3, "click"], [1, "fas", "fa-download"], [1, "documento-descripcion"], [1, "empty-state"], [1, "fas", "fa-folder-open"], [1, "historial-container"], [1, "historial-header"], [1, "historial-stats"], [1, "tiempo-transcurrido"], ["class", "modificaciones-count", 4, "ngIf"], ["class", "historial-timeline", 4, "ngIf", "ngIfElse"], [1, "modificaciones-count"], [1, "fas", "fa-edit"], [1, "historial-timeline"], ["class", "timeline-item", 3, "last-item", 4, "ngFor", "ngForOf"], [1, "timeline-item"], [1, "timeline-line"], [1, "timeline-marker"], [1, "timeline-content"], [1, "evento-card"], [1, "evento-header"], [1, "evento-title-group"], [1, "evento-accion"], [1, "evento-badge"], [1, "evento-time"], [1, "fas", "fa-clock"], [1, "evento-body"], ["class", "evento-descripcion", 4, "ngIf"], [1, "evento-meta-grid"], ["class", "meta-item", 4, "ngIf"], ["class", "estado-transition", 4, "ngIf"], [1, "evento-descripcion"], [1, "fas", "fa-comment-alt"], [1, "meta-item"], [1, "fas", "fa-user-circle"], [1, "meta-content"], [1, "meta-label"], [1, "meta-value"], [1, "fas", "fa-building"], [1, "estado-transition"], [1, "estado-badge", "anterior"], [1, "fas", "fa-long-arrow-alt-right", "transition-arrow"], [1, "estado-badge", "nuevo"], [1, "empty-state-modern"], [1, "empty-icon"], [1, "empty-hint"], [1, "document-preview-modal"], [1, "modal-backdrop-custom", 3, "click"], [1, "modal-dialog-custom"], [1, "modal-content-custom"], [1, "modal-header-custom"], [1, "modal-title-custom"], [1, "fas", "fa-file-alt", "me-2"], ["type", "button", 1, "btn-close-custom", 3, "click"], [1, "modal-body-custom"], ["class", "document-preview-iframe", 3, "src", 4, "ngIf"], ["class", "document-preview-image", 3, "src", "alt", 4, "ngIf"], ["class", "preview-message", 4, "ngIf"], [1, "document-preview-iframe", 3, "src"], [1, "document-preview-image", 3, "src", "alt"], [1, "preview-message"], [1, "fas", "fa-file-word", "fa-5x", "mb-3", "text-primary"], [1, "btn", "btn-primary", "mt-3", 3, "click"], [1, "fas", "fa-download", "me-2"]], template: function DetalleTramiteModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "app-modal-base", 2);
        \u0275\u0275listener("close", function DetalleTramiteModalComponent_Template_app_modal_base_close_0_listener() {
          return ctx.onClose();
        });
        \u0275\u0275template(1, DetalleTramiteModalComponent_div_1_Template, 41, 20, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275template(2, DetalleTramiteModalComponent_div_2_Template, 14, 4, "div", 4);
      }
      if (rf & 2) {
        \u0275\u0275property("show", ctx.show)("title", "Detalle del Tr\xE1mite " + ((ctx.tramite == null ? null : ctx.tramite.codigo) || ""))("loading", ctx.loading)("showFooter", false);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tramite);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDocumentPreview);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, ModalBaseComponent], styles: ['\n\n.modal-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.tramite-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 2rem;\n  border-radius: 12px;\n  margin-bottom: 2rem;\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.25);\n  position: relative;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease;\n}\n.tramite-header[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: -50%;\n  right: -10%;\n  width: 50%;\n  height: 200%;\n  background: rgba(255, 255, 255, 0.05);\n  transform: rotate(35deg);\n}\n.header-main[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 1rem;\n  position: relative;\n  z-index: 1;\n}\n.tramite-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 300px;\n}\n.tramite-titulo[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  margin: 0 0 0.75rem 0;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_slideInLeft 0.6s ease;\n}\n.tramite-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  font-size: 0.9rem;\n  opacity: 0.95;\n  animation: _ngcontent-%COMP%_slideInLeft 0.7s ease;\n}\n.codigo[_ngcontent-%COMP%], .fecha[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  padding: 0.25rem 0.75rem;\n  border-radius: 20px;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.tramite-estado[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  animation: _ngcontent-%COMP%_slideInRight 0.6s ease;\n}\n.estado-badge[_ngcontent-%COMP%], .prioridad-badge[_ngcontent-%COMP%] {\n  padding: 0.5rem 1.25rem;\n  border-radius: 25px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  background: rgba(255, 255, 255, 0.2);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  transition: transform 0.3s ease;\n}\n.estado-badge[_ngcontent-%COMP%]:hover, .prioridad-badge[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.header-actions[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  animation: _ngcontent-%COMP%_fadeInUp 0.8s ease;\n}\n.header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  font-weight: 600;\n  padding: 0.6rem 1.5rem;\n  transition: all 0.3s ease;\n}\n.header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.tabs-container[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.tabs-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  border-bottom: 2px solid #e2e8f0;\n  padding-bottom: 0;\n}\n.tab-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 1rem 1.5rem;\n  color: #718096;\n  font-weight: 500;\n  cursor: pointer;\n  position: relative;\n  transition: all 0.3s ease;\n  border-radius: 8px 8px 0 0;\n}\n.tab-button[_ngcontent-%COMP%]:hover {\n  color: #667eea;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.05) 0%,\n      rgba(118, 75, 162, 0.05) 100%);\n}\n.tab-button.active[_ngcontent-%COMP%] {\n  color: #667eea;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n}\n.tab-button.active[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\n}\n.tab-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.tab-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease;\n}\n.info-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.info-section[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);\n}\n.info-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #2d3748;\n  margin-bottom: 1.25rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 2px solid transparent;\n  border-image:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-image-slice: 1;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n  font-weight: 600;\n  margin-bottom: 0.25rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.info-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #2d3748;\n  font-weight: 500;\n}\n.descripcion-text[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  color: #4a5568;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.03) 0%,\n      rgba(118, 75, 162, 0.03) 100%);\n  padding: 1rem;\n  border-radius: 8px;\n  margin-top: 0.5rem;\n}\n.documentos-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.documentos-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid transparent;\n  border-image:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-image-slice: 1;\n}\n.documentos-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #2d3748;\n  margin: 0;\n}\n.documentos-count[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.documentos-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.documento-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.03) 0%,\n      rgba(118, 75, 162, 0.03) 100%);\n  border-radius: 10px;\n  border: 1px solid rgba(102, 126, 234, 0.1);\n  transition: all 0.3s ease;\n  animation: _ngcontent-%COMP%_fadeInUp 0.5s ease;\n}\n.documento-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(5px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);\n  border-color: rgba(102, 126, 234, 0.3);\n}\n.documento-info[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  flex: 1;\n}\n.documento-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  opacity: 0.8;\n}\n.documento-details[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.documento-nombre[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 0.25rem 0;\n  font-size: 1rem;\n}\n.documento-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  font-size: 0.875rem;\n  color: #718096;\n}\n.documento-descripcion[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #718096;\n  margin: 0.5rem 0 0 0;\n  font-style: italic;\n}\n.documento-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.documento-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  transition: all 0.3s ease;\n}\n.documento-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  color: #a0aec0;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0;\n}\n.historial-section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.historial-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid transparent;\n  border-image:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-image-slice: 1;\n}\n.historial-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #2d3748;\n  margin: 0 0 0.5rem 0;\n}\n.historial-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.tiempo-transcurrido[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-weight: 500;\n  font-size: 0.9rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.modificaciones-count[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-weight: 600;\n  font-size: 0.95rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.25rem 0.75rem;\n  background: rgba(102, 126, 234, 0.1);\n  border-radius: 20px;\n}\n.modificaciones-count[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.historial-timeline[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 1rem 0.5rem;\n}\n.timeline-item[_ngcontent-%COMP%] {\n  position: relative;\n  padding-left: 3rem;\n  padding-bottom: 2rem;\n  margin-bottom: 0.5rem;\n}\n.timeline-item[_ngcontent-%COMP%]:last-child {\n  padding-bottom: 0;\n}\n.timeline-line[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 1.25rem;\n  top: 2.5rem;\n  bottom: 0;\n  width: 2px;\n  background:\n    linear-gradient(\n      180deg,\n      #e2e8f0 0%,\n      transparent 100%);\n}\n.timeline-item.last-item[_ngcontent-%COMP%]   .timeline-line[_ngcontent-%COMP%] {\n  display: none;\n}\n.timeline-marker[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  z-index: 1;\n  flex-shrink: 0;\n}\n.timeline-marker[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: white;\n}\n.marker-created[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%);\n}\n.marker-assigned[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6 0%,\n      #2563eb 100%);\n}\n.marker-derivado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6 0%,\n      #7c3aed 100%);\n}\n.marker-revision[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b 0%,\n      #d97706 100%);\n}\n.marker-proceso[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #06b6d4 0%,\n      #0891b2 100%);\n}\n.marker-respondido[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #4f46e5 100%);\n}\n.marker-finalizado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%);\n}\n.marker-rechazado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef4444 0%,\n      #dc2626 100%);\n}\n.marker-modificado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b 0%,\n      #d97706 100%);\n}\n.marker-default[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #64748b 0%,\n      #475569 100%);\n}\n.evento-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  padding: 1rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border-left: 3px solid #667eea;\n  transition: all 0.3s ease;\n  overflow: hidden;\n  width: 100%;\n}\n.evento-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);\n}\n.evento-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n.evento-title-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.evento-accion[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #1e293b;\n  margin: 0;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.evento-badge[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 20px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.badge-created[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #059669;\n}\n.badge-assigned[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #2563eb;\n}\n.badge-derivado[_ngcontent-%COMP%] {\n  background: #ede9fe;\n  color: #7c3aed;\n}\n.badge-modificado[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #d97706;\n}\n.badge-finalizado[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #059669;\n}\n.badge-rechazado[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.badge-default[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #475569;\n}\n.evento-time[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #64748b;\n  font-size: 0.875rem;\n}\n.evento-time[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.evento-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.evento-descripcion[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 0.95rem;\n  margin: 0;\n  padding: 0.75rem;\n  background: #f8fafc;\n  border-radius: 8px;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.evento-descripcion[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n  margin-top: 0.25rem;\n}\n.evento-meta-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem;\n  background: #f8fafc;\n  border-radius: 8px;\n}\n.meta-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #667eea;\n}\n.meta-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n}\n.meta-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #94a3b8;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.meta-value[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #1e293b;\n  font-weight: 600;\n}\n.estado-transition[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8fafc 0%,\n      #f1f5f9 100%);\n  border-radius: 8px;\n  flex-wrap: wrap;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.transition-arrow[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 1.25rem;\n}\n.empty-state-modern[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f8fafc 0%,\n      #f1f5f9 100%);\n  border-radius: 16px;\n  border: 2px dashed #cbd5e1;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  margin: 0 auto 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);\n}\n.empty-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: white;\n}\n.empty-state-modern[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0 0 0.5rem 0;\n}\n.empty-state-modern[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 1rem;\n  margin: 0 0 1.5rem 0;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.5rem;\n  background: white;\n  border-radius: 20px;\n  color: #667eea;\n  font-size: 0.875rem;\n  font-weight: 500;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.empty-hint[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.historial-list[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: 0.75rem;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background:\n    linear-gradient(\n      180deg,\n      #667eea 0%,\n      #764ba2 100%);\n  opacity: 0.3;\n}\n.historial-item[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.03) 0%,\n      rgba(118, 75, 162, 0.03) 100%);\n  border-radius: 10px;\n  border: 1px solid rgba(102, 126, 234, 0.1);\n  transition: all 0.3s ease;\n  animation: _ngcontent-%COMP%_fadeInLeft 0.5s ease;\n}\n.historial-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(5px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);\n}\n.historial-item[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: -1.75rem;\n  top: 1.5rem;\n  width: 12px;\n  height: 12px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 50%;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.evento-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n  gap: 1rem;\n}\n.evento-accion[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0;\n}\n.evento-fecha[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.875rem;\n  flex-shrink: 0;\n}\n.evento-descripcion[_ngcontent-%COMP%] {\n  color: #4a5568;\n  margin: 0 0 1rem 0;\n  line-height: 1.5;\n}\n.evento-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n}\n.meta-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n  opacity: 0.7;\n}\n.meta-label[_ngcontent-%COMP%] {\n  color: #718096;\n  font-weight: 600;\n}\n.meta-value[_ngcontent-%COMP%] {\n  color: #2d3748;\n}\n.modal-footer-custom[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e2e8f0;\n}\n.modal-footer-custom[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.modal-footer-custom[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeInLeft {\n  from {\n    opacity: 0;\n    transform: translateX(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInLeft {\n  from {\n    transform: translateX(-30px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    transform: translateX(30px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: scaleX(0);\n  }\n  to {\n    transform: scaleX(1);\n  }\n}\n.estado-enviado[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2) !important;\n  color: white;\n}\n.estado-revision[_ngcontent-%COMP%] {\n  background: rgba(251, 146, 60, 0.2) !important;\n  color: white;\n}\n.estado-aprobado[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2) !important;\n  color: white;\n}\n.estado-rechazado[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2) !important;\n  color: white;\n}\n.estado-finalizado[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.2) !important;\n  color: white;\n}\n.prioridad-baja[_ngcontent-%COMP%] {\n  background: rgba(156, 163, 175, 0.2) !important;\n  color: white;\n}\n.prioridad-normal[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.2) !important;\n  color: white;\n}\n.prioridad-alta[_ngcontent-%COMP%] {\n  background: rgba(251, 146, 60, 0.2) !important;\n  color: white;\n}\n.prioridad-urgente[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2) !important;\n  color: white;\n}\n@media (max-width: 768px) {\n  .tramite-header[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    margin-bottom: 1rem;\n  }\n  .tramite-titulo[_ngcontent-%COMP%] {\n    font-size: 1.35rem;\n    line-height: 1.3;\n    word-break: break-word;\n  }\n  .header-main[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .tramite-meta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n  .tramite-estado[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n    align-items: flex-start;\n    width: 100%;\n  }\n  .estado-badge[_ngcontent-%COMP%], .prioridad-badge[_ngcontent-%COMP%] {\n    padding: 0.4rem 0.8rem;\n    font-size: 0.8rem;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    margin-top: 0.5rem;\n  }\n  .header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    padding: 0.75rem 1.5rem;\n    font-size: 0.9rem;\n  }\n  .tabs-nav[_ngcontent-%COMP%] {\n    flex-wrap: nowrap;\n    gap: 0;\n    overflow-x: auto;\n    padding-bottom: 0.5rem;\n    -webkit-overflow-scrolling: touch;\n  }\n  .tab-button[_ngcontent-%COMP%] {\n    min-width: auto;\n    flex: 1;\n    padding: 0.875rem 0.5rem;\n    font-size: 0.85rem;\n    text-align: center;\n    white-space: nowrap;\n  }\n  .tab-button[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.15rem 0.4rem;\n    margin-left: 0.25rem;\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n    padding: 0 0.5rem;\n  }\n  .info-section[_ngcontent-%COMP%] {\n    margin-bottom: 1.5rem;\n    padding: 1rem;\n    border-radius: 8px;\n    background: #f8f9fa;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 1.05rem;\n    margin-bottom: 0.75rem;\n  }\n  .info-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.25rem;\n    margin-bottom: 0.75rem;\n  }\n  .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-weight: 600;\n    color: #4a5568;\n    font-size: 0.9rem;\n  }\n  .info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n    line-height: 1.4;\n    word-break: break-word;\n  }\n  .documentos-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .documentos-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n    margin-bottom: 1rem;\n  }\n  .documentos-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n    margin: 0;\n  }\n  .documentos-count[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n    color: #6c757d;\n  }\n  .documento-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 1rem;\n    margin-bottom: 1rem;\n    border-radius: 8px;\n    background: #fff;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  }\n  .documento-info[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 1rem;\n  }\n  .documento-details[_ngcontent-%COMP%] {\n    margin-left: 0;\n    margin-top: 0.75rem;\n    width: 100%;\n  }\n  .documento-nombre[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n    line-height: 1.3;\n    word-break: break-word;\n    hyphens: auto;\n    margin-bottom: 0.5rem;\n  }\n  .documento-meta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.25rem;\n  }\n  .documento-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .documento-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n    gap: 0.75rem;\n    margin-top: 0.75rem;\n  }\n  .documento-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n    font-size: 0.85rem;\n    padding: 0.6rem 0.75rem;\n  }\n  .historial-container[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .historial-header[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n    padding-bottom: 0.75rem;\n  }\n  .historial-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n    margin-bottom: 0.5rem;\n  }\n  .historial-stats[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n  .tiempo-transcurrido[_ngcontent-%COMP%], .modificaciones-count[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    padding: 0.25rem 0.6rem;\n  }\n  .historial-timeline[_ngcontent-%COMP%] {\n    padding: 0.5rem 0;\n  }\n  .timeline-item[_ngcontent-%COMP%] {\n    padding-left: 2.75rem;\n    padding-bottom: 1.5rem;\n    margin-bottom: 0;\n  }\n  .timeline-line[_ngcontent-%COMP%] {\n    left: 1rem;\n    top: 2.25rem;\n  }\n  .timeline-marker[_ngcontent-%COMP%] {\n    width: 2rem;\n    height: 2rem;\n    font-size: 0.85rem;\n    left: 0;\n  }\n  .evento-card[_ngcontent-%COMP%] {\n    padding: 0.875rem;\n    border-radius: 8px;\n  }\n  .evento-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n    margin-bottom: 0.75rem;\n  }\n  .evento-title-group[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .evento-accion[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n    word-break: break-word;\n    line-height: 1.3;\n  }\n  .evento-badge[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n    padding: 0.2rem 0.6rem;\n    align-self: flex-start;\n  }\n  .evento-time[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n    gap: 0.4rem;\n  }\n  .evento-body[_ngcontent-%COMP%] {\n    gap: 0.75rem;\n  }\n  .evento-descripcion[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    padding: 0.6rem;\n    gap: 0.5rem;\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .evento-descripcion[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    margin-top: 0;\n  }\n  .evento-meta-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n  }\n  .meta-item[_ngcontent-%COMP%] {\n    padding: 0.6rem;\n    gap: 0.6rem;\n  }\n  .meta-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .meta-label[_ngcontent-%COMP%] {\n    font-size: 0.7rem;\n  }\n  .meta-value[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    word-break: break-word;\n  }\n  .estado-transition[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n    padding: 0.75rem;\n  }\n  .estado-badge[_ngcontent-%COMP%] {\n    padding: 0.4rem 0.8rem;\n    font-size: 0.8rem;\n    width: 100%;\n    text-align: center;\n  }\n  .transition-arrow[_ngcontent-%COMP%] {\n    transform: rotate(90deg);\n    font-size: 1rem;\n    align-self: center;\n  }\n  .empty-state-modern[_ngcontent-%COMP%] {\n    padding: 2.5rem 1rem;\n  }\n  .empty-icon[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n    margin-bottom: 1rem;\n  }\n  .empty-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .empty-state-modern[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n    margin-bottom: 0.5rem;\n  }\n  .empty-state-modern[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n    margin-bottom: 1rem;\n  }\n  .empty-hint[_ngcontent-%COMP%] {\n    padding: 0.6rem 1rem;\n    font-size: 0.8rem;\n    gap: 0.4rem;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 2rem 1rem;\n    text-align: center;\n  }\n  .empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n  .empty-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .modal-footer-custom[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.75rem;\n    padding-top: 1rem;\n    margin-top: 1.5rem;\n  }\n  .modal-footer-custom[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 0.875rem 1.25rem;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    overflow-x: hidden;\n  }\n}\n@media (max-width: 480px) {\n  .tramite-header[_ngcontent-%COMP%] {\n    padding: 1rem;\n    margin-bottom: 0.75rem;\n  }\n  .tramite-titulo[_ngcontent-%COMP%] {\n    font-size: 1.15rem;\n  }\n  .tab-button[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.35rem;\n    font-size: 0.8rem;\n  }\n  .tab-button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    margin-right: 0.25rem;\n    font-size: 0.85rem;\n  }\n  .timeline-item[_ngcontent-%COMP%] {\n    padding-left: 2.5rem;\n  }\n  .timeline-marker[_ngcontent-%COMP%] {\n    width: 1.75rem;\n    height: 1.75rem;\n    font-size: 0.75rem;\n  }\n  .timeline-line[_ngcontent-%COMP%] {\n    left: 0.875rem;\n    top: 2rem;\n  }\n  .evento-card[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .evento-accion[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n  .evento-badge[_ngcontent-%COMP%] {\n    font-size: 0.65rem;\n    padding: 0.15rem 0.5rem;\n  }\n  .evento-time[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n  .estado-badge[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.35rem 0.7rem;\n  }\n  .documento-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .documento-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (min-width: 769px) and (max-width: 1024px) {\n  .tramite-header[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .tramite-titulo[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .timeline-item[_ngcontent-%COMP%] {\n    padding-left: 3.25rem;\n  }\n  .timeline-marker[_ngcontent-%COMP%] {\n    width: 2.25rem;\n    height: 2.25rem;\n    font-size: 0.95rem;\n  }\n  .timeline-line[_ngcontent-%COMP%] {\n    left: 1.125rem;\n  }\n  .evento-card[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .evento-meta-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .info-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.preview-body[_ngcontent-%COMP%] {\n  min-height: 500px;\n  max-height: 80vh;\n  overflow: auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #f8f9fa;\n}\n.document-preview-iframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 75vh;\n  border: none;\n  background: white;\n}\n.document-preview-image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 75vh;\n  object-fit: contain;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.preview-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n}\n.preview-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n  opacity: 0.8;\n}\n.preview-message[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #2d3748;\n  margin-top: 1rem;\n  font-weight: 600;\n}\n.preview-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  margin: 0.5rem 0;\n}\n.btn-outline-info[_ngcontent-%COMP%] {\n  color: #667eea;\n  border-color: #667eea;\n}\n.btn-outline-info[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-color: transparent;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 9999;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: 0;\n}\n.modal.show[_ngcontent-%COMP%] {\n  display: block !important;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n.modal-xl[_ngcontent-%COMP%] {\n  max-width: 90%;\n}\n.modal-dialog[_ngcontent-%COMP%] {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none;\n}\n.modal-dialog-centered[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-height: calc(100% - 1rem);\n}\n.modal-content[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.5rem;\n  outline: 0;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem;\n  border-bottom: 1px solid #dee2e6;\n  border-top-left-radius: calc(0.5rem - 1px);\n  border-top-right-radius: calc(0.5rem - 1px);\n}\n.modal-title[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  line-height: 1.5;\n  font-size: 1.25rem;\n  font-weight: 500;\n}\n.btn-close[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.25rem;\n  margin: -0.25rem -0.25rem -0.25rem auto;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  opacity: 0.5;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  opacity: 0.75;\n}\n.modal-body[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 1rem;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 9998;\n  width: 100vw;\n  height: 100vh;\n}\n@media (min-width: 576px) {\n  .modal-dialog[_ngcontent-%COMP%] {\n    max-width: 500px;\n    margin: 1.75rem auto;\n  }\n  .modal-xl[_ngcontent-%COMP%] {\n    max-width: 1140px;\n  }\n}\n.document-preview-modal[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 10000;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n.modal-backdrop-custom[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  cursor: pointer;\n}\n.modal-dialog-custom[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10001;\n  width: 90%;\n  max-width: 1200px;\n  height: 90%;\n  max-height: 900px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  animation: _ngcontent-%COMP%_slideIn 0.4s ease;\n}\n.modal-content-custom[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  border: 2px solid #e2e8f0;\n}\n.modal-header-custom[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 1.25rem 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  flex-shrink: 0;\n}\n.modal-title-custom[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  color: white;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.modal-title-custom[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  opacity: 0.9;\n}\n.btn-close-custom[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  border: none;\n  color: white;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  font-size: 1rem;\n}\n.btn-close-custom[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: rotate(90deg) scale(1.1);\n}\n.modal-body-custom[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f8f9fa;\n  position: relative;\n}\n.modal-body-custom[_ngcontent-%COMP%]   .document-preview-iframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border: none;\n  background: white;\n}\n.modal-body-custom[_ngcontent-%COMP%]   .document-preview-image[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n  border-radius: 8px;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n.modal-body-custom[_ngcontent-%COMP%]   .preview-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n  color: #4a5568;\n}\n.modal-body-custom[_ngcontent-%COMP%]   .preview-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n  opacity: 0.8;\n  display: block;\n  margin-bottom: 1.5rem;\n}\n.modal-body-custom[_ngcontent-%COMP%]   .preview-message[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #2d3748;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  font-size: 1.5rem;\n}\n.modal-body-custom[_ngcontent-%COMP%]   .preview-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 1.1rem;\n  line-height: 1.6;\n  margin-bottom: 0.8rem;\n}\n.modal-body-custom[_ngcontent-%COMP%]   .preview-message[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  padding: 0.75rem 2rem;\n  border-radius: 25px;\n  font-weight: 500;\n  text-transform: none;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n  transition: all 0.3s ease;\n}\n.modal-body-custom[_ngcontent-%COMP%]   .preview-message[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: scale(0.9) translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n.firma-digital-content[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa 0%,\n      #e9ecef 100%);\n  border: 2px solid #28a745;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-top: 1rem;\n  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.1);\n}\n.firma-digital-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #dee2e6;\n}\n.firma-digital-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.firma-digital-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  font-size: 0.95rem;\n}\n.estado-firma[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  padding: 0.4rem 0.8rem;\n  border-radius: 20px;\n  font-size: 0.9rem;\n}\n.estado-firma.firma-valida[_ngcontent-%COMP%] {\n  background-color: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.estado-firma.firma-invalida[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  color: #856404;\n  border: 1px solid #ffeaa7;\n}\n.biometria-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6f42c1;\n  font-weight: 500;\n}\n.firmante-info[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  padding: 1.25rem;\n  margin-top: 1.5rem;\n}\n.firmante-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 1rem;\n  border-bottom: 2px solid #e9ecef;\n  padding-bottom: 0.5rem;\n}\n.firmante-details[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  padding: 0.5rem 0;\n}\n.hash-firma[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  background-color: #f8f9fa;\n  padding: 0.3rem 0.6rem;\n  border-radius: 4px;\n  font-size: 0.85rem;\n  color: #6c757d;\n  word-break: break-all;\n}\n.firma-visual[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  padding: 1.25rem;\n  margin-top: 1.5rem;\n}\n.firma-visual-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 1rem;\n}\n.firma-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 1rem;\n}\n.firma-placeholder[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 2rem;\n  border-radius: 12px;\n  text-align: center;\n  min-width: 300px;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n}\n.firma-placeholder[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n  opacity: 0.9;\n}\n.firma-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin: 0.5rem 0;\n}\n.firma-placeholder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  opacity: 0.8;\n}\n.firma-legal-notice[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding-top: 1rem;\n  border-top: 2px solid #dee2e6;\n}\n.legal-box[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fff3cd 0%,\n      #ffeaa7 100%);\n  border: 1px solid #ffeaa7;\n  border-radius: 8px;\n  padding: 1rem;\n  display: flex;\n  gap: 1rem;\n  align-items: flex-start;\n}\n.legal-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #856404;\n  font-size: 1.5rem;\n  margin-top: 0.2rem;\n}\n.legal-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.legal-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #856404;\n  font-size: 1rem;\n  display: block;\n  margin-bottom: 0.5rem;\n}\n.legal-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #856404;\n  font-size: 0.9rem;\n  line-height: 1.5;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .modal-dialog-custom[_ngcontent-%COMP%] {\n    width: 95%;\n    height: 95%;\n  }\n  .modal-header-custom[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .modal-title-custom[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .modal-body-custom[_ngcontent-%COMP%]   .preview-message[_ngcontent-%COMP%] {\n    padding: 2rem 1rem;\n  }\n  .firma-digital-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n  .firma-placeholder[_ngcontent-%COMP%] {\n    min-width: 100%;\n    padding: 1.5rem;\n  }\n  .legal-box[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n}\n/*# sourceMappingURL=detalle-tramite-modal.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetalleTramiteModalComponent, { className: "DetalleTramiteModalComponent" });
})();

// src/app/features/tramites/components/lista-tramites/lista-tramites.component.ts
function ListaTramitesComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (incluye ", ctx_r1.getTramitesVencidos(), " vencidos) ");
  }
}
function ListaTramitesComponent_button_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function ListaTramitesComponent_button_51_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "i", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.searchError, " ");
  }
}
function ListaTramitesComponent_div_62_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 79);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_62_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.archivarSeleccionados());
    });
    \u0275\u0275element(1, "i", 33);
    \u0275\u0275text(2, " Archivar ");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_62_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 80);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_62_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.desarchivarSeleccionados());
    });
    \u0275\u0275element(1, "i", 81);
    \u0275\u0275text(2, " Desarchivar ");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71)(1, "span", 72);
    \u0275\u0275element(2, "i", 73);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 74)(5, "button", 75);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_62_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportarSeleccionados());
    });
    \u0275\u0275element(6, "i", 76);
    \u0275\u0275text(7, " Exportar ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, ListaTramitesComponent_div_62_button_8_Template, 3, 0, "button", 77)(9, ListaTramitesComponent_div_62_button_9_Template, 3, 0, "button", 78);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedTramites.length, " seleccionados ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", !ctx_r1.mostrarArchivados);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mostrarArchivados);
  }
}
function ListaTramitesComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 82)(1, "button", 83);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_63_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.desarchivarTodos());
    });
    \u0275\u0275element(2, "i", 81);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Desarchivar Todos (", ctx_r1.tramites.length, ") ");
  }
}
function ListaTramitesComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84)(1, "div", 85);
    \u0275\u0275element(2, "i", 86);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Cargando tr\xE1mites...");
    \u0275\u0275elementEnd()()();
  }
}
function ListaTramitesComponent_div_66_i_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 98);
  }
}
function ListaTramitesComponent_div_66_i_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 99);
  }
}
function ListaTramitesComponent_div_66_i_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 100);
  }
}
function ListaTramitesComponent_div_66_i_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 98);
  }
}
function ListaTramitesComponent_div_66_i_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 99);
  }
}
function ListaTramitesComponent_div_66_i_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 100);
  }
}
function ListaTramitesComponent_div_66_i_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 98);
  }
}
function ListaTramitesComponent_div_66_i_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 99);
  }
}
function ListaTramitesComponent_div_66_i_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 100);
  }
}
function ListaTramitesComponent_div_66_i_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 98);
  }
}
function ListaTramitesComponent_div_66_i_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 99);
  }
}
function ListaTramitesComponent_div_66_i_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 100);
  }
}
function ListaTramitesComponent_div_66_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 101)(1, "td", 102)(2, "input", 90);
    \u0275\u0275listener("change", function ListaTramitesComponent_div_66_tr_35_Template_input_change_2_listener() {
      const tramite_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleSelectTramite(tramite_r10.id));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 103)(4, "span", 104);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 105)(7, "span", 106);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 107)(10, "div", 108);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 109)(13, "span", 110);
    \u0275\u0275element(14, "i", 111);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 112)(17, "span", 113);
    \u0275\u0275element(18, "i", 114);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 115)(21, "div", 116)(22, "div", 117);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 118);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "td", 119);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 120)(29, "div", 121)(30, "button", 122);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_tr_35_Template_button_click_30_listener() {
      const tramite_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verDetalle(tramite_r10));
    });
    \u0275\u0275element(31, "i", 123);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 124);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_tr_35_Template_button_click_32_listener() {
      const tramite_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarEstado(tramite_r10));
    });
    \u0275\u0275element(33, "i", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 125);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_tr_35_Template_button_click_34_listener() {
      const tramite_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.imprimirTramite(tramite_r10));
    });
    \u0275\u0275element(35, "i", 126);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 127);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_tr_35_Template_button_click_36_listener() {
      const tramite_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarTramite(tramite_r10));
    });
    \u0275\u0275element(37, "i", 128);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tramite_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "tramite-" + tramite_r10.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r1.isSelected(tramite_r10.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r10.codigo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tramite_r10.tipoTramite == null ? null : tramite_r10.tipoTramite.nombre) || tramite_r10.tipo || "Sin tipo");
    \u0275\u0275advance(2);
    \u0275\u0275property("title", tramite_r10.titulo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r10.titulo || "Sin asunto", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getEstadoClase(tramite_r10.estado));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEstadoNombre((tramite_r10.estado == null ? null : tramite_r10.estado.nombre) || tramite_r10.estado) || "Sin estado", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getPrioridadClase(tramite_r10.prioridad));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPrioridadNombre((tramite_r10.prioridad == null ? null : tramite_r10.prioridad.nombre) || tramite_r10.prioridad) || "Sin prioridad", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", (tramite_r10.usuarioSolicitante == null ? null : tramite_r10.usuarioSolicitante.nombre) || "Sin nombre", " ", (tramite_r10.usuarioSolicitante == null ? null : tramite_r10.usuarioSolicitante.apellidos) || "", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tramite_r10.areaOrigen == null ? null : tramite_r10.areaOrigen.nombre) || "Sin \xE1rea");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatearFecha(tramite_r10.fechaCreacion), " ");
  }
}
function ListaTramitesComponent_div_66_div_36_h3_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "No hay tr\xE1mites");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_66_div_36_h3_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "No se encontraron resultados");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_66_div_36_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No se encontraron tr\xE1mites que coincidan con los criterios de b\xFAsqueda.");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_66_div_36_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('No hay tr\xE1mites que coincidan con "', ctx_r1.searchTerm, '"');
  }
}
function ListaTramitesComponent_div_66_div_36_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 134);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_div_36_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275text(2, " Limpiar b\xFAsqueda ");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_66_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275element(2, "i", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ListaTramitesComponent_div_66_div_36_h3_3_Template, 2, 0, "h3", 131)(4, ListaTramitesComponent_div_66_div_36_h3_4_Template, 2, 0, "h3", 131)(5, ListaTramitesComponent_div_66_div_36_p_5_Template, 2, 0, "p", 131)(6, ListaTramitesComponent_div_66_div_36_p_6_Template, 2, 1, "p", 131);
    \u0275\u0275elementStart(7, "div", 132);
    \u0275\u0275template(8, ListaTramitesComponent_div_66_div_36_button_8_Template, 3, 0, "button", 133);
    \u0275\u0275elementStart(9, "button", 6);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_div_36_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirModalNuevo());
    });
    \u0275\u0275element(10, "i", 7);
    \u0275\u0275text(11, " Crear Nuevo Tr\xE1mite ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r1.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchTerm);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.searchTerm);
  }
}
function ListaTramitesComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "table", 88)(2, "thead")(3, "tr")(4, "th", 89)(5, "input", 90);
    \u0275\u0275listener("change", function ListaTramitesComponent_div_66_Template_input_change_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectAllTramites());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "th", 91);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_Template_th_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleOrden("codigo"));
    });
    \u0275\u0275text(7, " C\xF3digo ");
    \u0275\u0275template(8, ListaTramitesComponent_div_66_i_8_Template, 1, 0, "i", 92)(9, ListaTramitesComponent_div_66_i_9_Template, 1, 0, "i", 93)(10, ListaTramitesComponent_div_66_i_10_Template, 1, 0, "i", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 91);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_Template_th_click_15_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleOrden("estado"));
    });
    \u0275\u0275text(16, " Estado ");
    \u0275\u0275template(17, ListaTramitesComponent_div_66_i_17_Template, 1, 0, "i", 92)(18, ListaTramitesComponent_div_66_i_18_Template, 1, 0, "i", 93)(19, ListaTramitesComponent_div_66_i_19_Template, 1, 0, "i", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 91);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_Template_th_click_20_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleOrden("prioridad"));
    });
    \u0275\u0275text(21, " Prioridad ");
    \u0275\u0275template(22, ListaTramitesComponent_div_66_i_22_Template, 1, 0, "i", 92)(23, ListaTramitesComponent_div_66_i_23_Template, 1, 0, "i", 93)(24, ListaTramitesComponent_div_66_i_24_Template, 1, 0, "i", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "Solicitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 91);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_66_Template_th_click_27_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleOrden("fecha"));
    });
    \u0275\u0275text(28, " Fecha ");
    \u0275\u0275template(29, ListaTramitesComponent_div_66_i_29_Template, 1, 0, "i", 92)(30, ListaTramitesComponent_div_66_i_30_Template, 1, 0, "i", 93)(31, ListaTramitesComponent_div_66_i_31_Template, 1, 0, "i", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th", 95);
    \u0275\u0275text(33, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "tbody");
    \u0275\u0275template(35, ListaTramitesComponent_div_66_tr_35_Template, 38, 14, "tr", 96);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(36, ListaTramitesComponent_div_66_div_36_Template, 12, 5, "div", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("checked", ctx_r1.tramites && ctx_r1.selectedTramites.length === ctx_r1.tramites.length && ctx_r1.tramites.length > 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor !== "codigo");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "codigo" && ctx_r1.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "codigo" && !ctx_r1.ordenAscendente);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor !== "estado");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "estado" && ctx_r1.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "estado" && !ctx_r1.ordenAscendente);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor !== "prioridad");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "prioridad" && ctx_r1.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "prioridad" && !ctx_r1.ordenAscendente);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor !== "fecha");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "fecha" && ctx_r1.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ordenarPor === "fecha" && !ctx_r1.ordenAscendente);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.getTramitesParaMostrar())("ngForTrackBy", ctx_r1.trackByTramiteId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getTramitesParaMostrar().length === 0);
  }
}
function ListaTramitesComponent_div_68_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 137)(1, "div", 138)(2, "div", 139)(3, "input", 140);
    \u0275\u0275listener("change", function ListaTramitesComponent_div_68_div_1_Template_input_change_3_listener() {
      const tramite_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleSelectTramite(tramite_r14.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 104);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 141)(7, "span", 110);
    \u0275\u0275element(8, "i", 111);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 113);
    \u0275\u0275element(11, "i", 114);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 142)(14, "h4", 143);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 144)(17, "div", 145);
    \u0275\u0275element(18, "i", 146);
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 145);
    \u0275\u0275element(22, "i", 147);
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 145);
    \u0275\u0275element(26, "i", 148);
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 145);
    \u0275\u0275element(30, "i", 149);
    \u0275\u0275elementStart(31, "span");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 150)(34, "div", 151)(35, "button", 122);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_68_div_1_Template_button_click_35_listener() {
      const tramite_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verDetalle(tramite_r14));
    });
    \u0275\u0275element(36, "i", 123);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 152);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_68_div_1_Template_button_click_37_listener() {
      const tramite_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editarTramite(tramite_r14));
    });
    \u0275\u0275element(38, "i", 153);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 124);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_68_div_1_Template_button_click_39_listener() {
      const tramite_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarEstado(tramite_r14));
    });
    \u0275\u0275element(40, "i", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 125);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_68_div_1_Template_button_click_41_listener() {
      const tramite_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.imprimirTramite(tramite_r14));
    });
    \u0275\u0275element(42, "i", 126);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 127);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_68_div_1_Template_button_click_43_listener() {
      const tramite_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarTramite(tramite_r14));
    });
    \u0275\u0275element(44, "i", 128);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tramite_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "tramite-card-" + tramite_r14.id);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r1.isSelected(tramite_r14.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r14.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getEstadoClase(tramite_r14.estado));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEstadoNombre((tramite_r14.estado == null ? null : tramite_r14.estado.nombre) || tramite_r14.estado) || "Sin estado", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getPrioridadClase(tramite_r14.prioridad));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getPrioridadNombre((tramite_r14.prioridad == null ? null : tramite_r14.prioridad.nombre) || tramite_r14.prioridad) || "Sin prioridad", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r14.titulo || "Sin asunto");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tramite_r14.tipo || "Sin tipo");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", (tramite_r14.usuarioSolicitante == null ? null : tramite_r14.usuarioSolicitante.nombre) || "Sin nombre", " ", (tramite_r14.usuarioSolicitante == null ? null : tramite_r14.usuarioSolicitante.apellidos) || "", "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tramite_r14.areaOrigen == null ? null : tramite_r14.areaOrigen.nombre) || "Sin \xE1rea");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(tramite_r14.fechaCreacion));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.puedeEditarTramite(tramite_r14));
  }
}
function ListaTramitesComponent_div_68_div_2_h3_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "No hay tr\xE1mites");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_68_div_2_h3_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "No se encontraron resultados");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_68_div_2_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No se encontraron tr\xE1mites que coincidan con los criterios de b\xFAsqueda.");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_68_div_2_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1('No hay tr\xE1mites que coincidan con "', ctx_r1.searchTerm, '"');
  }
}
function ListaTramitesComponent_div_68_div_2_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 134);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_68_div_2_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275text(2, " Limpiar b\xFAsqueda ");
    \u0275\u0275elementEnd();
  }
}
function ListaTramitesComponent_div_68_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 130);
    \u0275\u0275element(2, "i", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ListaTramitesComponent_div_68_div_2_h3_3_Template, 2, 0, "h3", 131)(4, ListaTramitesComponent_div_68_div_2_h3_4_Template, 2, 0, "h3", 131)(5, ListaTramitesComponent_div_68_div_2_p_5_Template, 2, 0, "p", 131)(6, ListaTramitesComponent_div_68_div_2_p_6_Template, 2, 1, "p", 131);
    \u0275\u0275elementStart(7, "div", 132);
    \u0275\u0275template(8, ListaTramitesComponent_div_68_div_2_button_8_Template, 3, 0, "button", 133);
    \u0275\u0275elementStart(9, "button", 6);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_68_div_2_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirModalNuevo());
    });
    \u0275\u0275element(10, "i", 7);
    \u0275\u0275text(11, " Crear Nuevo Tr\xE1mite ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx_r1.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchTerm);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.searchTerm);
  }
}
function ListaTramitesComponent_div_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 135);
    \u0275\u0275template(1, ListaTramitesComponent_div_68_div_1_Template, 45, 14, "div", 136)(2, ListaTramitesComponent_div_68_div_2_Template, 12, 5, "div", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.getTramitesParaMostrar())("ngForTrackBy", ctx_r1.trackByTramiteId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getTramitesParaMostrar().length === 0);
  }
}
function ListaTramitesComponent_div_70_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 168);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_70_button_8_Template_button_click_0_listener() {
      const page_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(page_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.currentPage === page_r19);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r19, " ");
  }
}
function ListaTramitesComponent_div_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 154)(1, "div", 155);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 156)(4, "button", 157);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_70_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(ctx_r1.currentPage - 1));
    });
    \u0275\u0275element(5, "i", 158);
    \u0275\u0275text(6, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 159);
    \u0275\u0275template(8, ListaTramitesComponent_div_70_button_8_Template, 2, 3, "button", 160);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 157);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_70_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(ctx_r1.currentPage + 1));
    });
    \u0275\u0275text(10, " Siguiente ");
    \u0275\u0275element(11, "i", 161);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 162)(13, "label");
    \u0275\u0275text(14, "Mostrar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 163);
    \u0275\u0275twoWayListener("ngModelChange", function ListaTramitesComponent_div_70_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.pageSize, $event) || (ctx_r1.pageSize = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ListaTramitesComponent_div_70_Template_select_change_15_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarTamanioPagina(ctx_r1.pageSize));
    });
    \u0275\u0275elementStart(16, "option", 164);
    \u0275\u0275text(17, "10");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 165);
    \u0275\u0275text(19, "20");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 166);
    \u0275\u0275text(21, "50");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 167);
    \u0275\u0275text(23, "100");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "por p\xE1gina");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando ", (ctx_r1.currentPage - 1) * ctx_r1.pageSize + 1, " - ", ctx_r1.Math.min(ctx_r1.currentPage * ctx_r1.pageSize, ctx_r1.totalItems), " de ", ctx_r1.totalItems, " tr\xE1mites ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.getPageNumbers());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.pageSize);
  }
}
function ListaTramitesComponent_div_83_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 174);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.titulo, " ");
  }
}
function ListaTramitesComponent_div_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 169)(1, "div", 170)(2, "span", 171);
    \u0275\u0275element(3, "i", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 172);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, ListaTramitesComponent_div_83_div_7_Template, 2, 1, "div", 173);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.codigo, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getEstadoClase(ctx_r1.tramiteSeleccionado.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEstadoNombre((ctx_r1.tramiteSeleccionado.estado == null ? null : ctx_r1.tramiteSeleccionado.estado.nombre) || ctx_r1.tramiteSeleccionado.estado), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.titulo);
  }
}
function ListaTramitesComponent_div_88_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 177);
    \u0275\u0275listener("click", function ListaTramitesComponent_div_88_div_1_Template_div_click_0_listener() {
      const estado_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.seleccionarEstado(estado_r21));
    });
    \u0275\u0275elementStart(1, "div", 178);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 179)(4, "span", 180);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "small", 181);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 182);
    \u0275\u0275element(9, "i", 183);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const estado_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.nuevoEstadoSeleccionado === estado_r21);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getEstadoClase(estado_r21));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoIcon(estado_r21));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getEstadoNombre(estado_r21));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getEstadoDescripcion(estado_r21));
  }
}
function ListaTramitesComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 175);
    \u0275\u0275template(1, ListaTramitesComponent_div_88_div_1_Template, 10, 7, "div", 176);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.estadosDisponibles);
  }
}
function ListaTramitesComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 184);
    \u0275\u0275element(1, "i", 185);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay estados disponibles para cambiar desde ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getEstadoNombre(ctx_r1.tramiteSeleccionado == null ? null : ctx_r1.tramiteSeleccionado.estado));
  }
}
function ListaTramitesComponent_div_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 186);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.observacionesCambioEstado.length, " caracteres ");
  }
}
function ListaTramitesComponent_i_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 86);
  }
}
function ListaTramitesComponent_ng_template_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 183);
  }
}
var ListaTramitesComponent = class _ListaTramitesComponent {
  constructor(tramiteService, toastService, bandejaTramitesService) {
    this.tramiteService = tramiteService;
    this.toastService = toastService;
    this.bandejaTramitesService = bandejaTramitesService;
    this.tramites = [];
    this.estadisticas = {
      total: 0,
      enRevision: 0,
      aprobados: 0,
      finalizados: 0
    };
    this.loading$ = this.tramiteService.loading$;
    this.tramitePermisos = /* @__PURE__ */ new Map();
    this.currentPage = 0;
    this.pageSize = 10;
    this.totalItems = 0;
    this.totalPages = 0;
    this.searchTerm = "";
    this.searchSubject = new Subject();
    this.searchResults = [];
    this.showSearchDropdown = false;
    this.searchError = "";
    this.isSearching = false;
    this.selectedSearchIndex = -1;
    this.filteredTramites = [];
    this.vistaActual = "tabla";
    this.ordenarPor = "fecha";
    this.ordenAscendente = false;
    this.selectedTramites = [];
    this.mostrarArchivados = false;
    this.showNuevoTramiteModal = false;
    this.showDetalleTramiteModal = false;
    this.showEditarTramiteModal = false;
    this.showCambiarEstadoModal = false;
    this.tramiteSeleccionado = null;
    this.estadosDisponibles = [];
    this.nuevoEstadoSeleccionado = "";
    this.observacionesCambioEstado = "";
    this.procesandoCambioEstado = false;
    this.subscriptions = new Subscription();
    this.Object = Object;
    this.Math = Math;
  }
  ngOnInit() {
    this.searchTerm = "";
    this.searchError = "";
    this.filteredTramites = [];
    this.setupSearch();
    this.cargarTramites();
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  setupSearch() {
    this.subscriptions.add(this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.performSearch(term);
    }));
  }
  performSearch(term) {
    this.isSearching = true;
    this.searchError = "";
    this.selectedSearchIndex = -1;
    if (!term.trim()) {
      this.resetSearch();
      return;
    }
    const termLower = term.toLowerCase().trim();
    this.searchResults = this.tramites.filter((tramite) => this.matchesSearchTerm(tramite, termLower));
    if (this.searchResults.length > 0) {
      this.showSearchDropdown = false;
      this.filteredTramites = this.searchResults;
      this.searchError = "";
    } else {
      this.searchError = `No se encontraron tr\xE1mites que coincidan con "${term}"`;
      this.showSearchDropdown = false;
      this.filteredTramites = [];
    }
    this.isSearching = false;
  }
  matchesSearchTerm(tramite, searchLower) {
    const normalize = (text) => {
      if (!text)
        return "";
      return String(text).toLowerCase().trim();
    };
    return normalize(tramite.codigo).includes(searchLower) || normalize(tramite.asunto).includes(searchLower) || normalize(tramite.titulo).includes(searchLower) || normalize(tramite.descripcion).includes(searchLower) || normalize(tramite.tipo).includes(searchLower) || normalize(tramite.estado).includes(searchLower) || normalize(tramite.prioridad).includes(searchLower) || normalize(tramite.usuarioSolicitante?.nombre).includes(searchLower) || normalize(tramite.usuarioSolicitante?.apellidos).includes(searchLower) || normalize(tramite.solicitante?.nombre).includes(searchLower) || normalize(tramite.solicitante?.apellidos).includes(searchLower) || normalize(tramite.tipoTramite?.nombre).includes(searchLower) || normalize(tramite.estado?.nombre).includes(searchLower) || normalize(tramite.areaOrigen?.nombre).includes(searchLower) || normalize(tramite.area?.nombre).includes(searchLower);
  }
  resetSearch() {
    this.showSearchDropdown = false;
    this.searchResults = [];
    this.searchError = "";
    this.isSearching = false;
    this.filteredTramites = [];
  }
  cargarTramites() {
    const estadoFiltro = this.mostrarArchivados ? "ARCHIVADO" : void 0;
    this.subscriptions.add(this.bandejaTramitesService.obtenerTramitesBandeja(this.currentPage + 1, this.pageSize, this.ordenarPor, this.ordenAscendente, estadoFiltro).subscribe({
      next: (response) => {
        this.tramites = response.data;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage - 1;
        if (!this.mostrarArchivados) {
          this.calcularEstadisticas();
        }
      },
      error: (error) => {
      }
    }));
  }
  calcularEstadisticas() {
    this.loadTramitesAndPermissions();
  }
  loadTramitesAndPermissions() {
    this.subscriptions.add(this.bandejaTramitesService.getTramites(1, 1e3).subscribe({
      next: (response) => {
        this.tramites = response.data || [];
        this.loadPermissionsForTramites();
      },
      error: (error) => {
        this.calcularEstadisticasBasicas();
      }
    }));
  }
  loadPermissionsForTramites() {
    const tramitePromises = this.tramites.map((tramite) => firstValueFrom(this.bandejaTramitesService.verificarPermisosAcciones(tramite.id)).then((permisos) => {
      if (permisos) {
        this.tramitePermisos.set(tramite.id, permisos);
      }
      return permisos;
    }).catch((error) => {
      return null;
    }));
    Promise.all(tramitePromises).then(() => {
      this.calculateStatsWithExpiredTramites();
    });
  }
  calculateStatsWithExpiredTramites() {
    const expiredCount = this.getTramitesVencidos();
    const baseStats = this.getBaseStatistics();
    this.estadisticas = {
      total: this.tramites.length,
      enRevision: baseStats.enRevision,
      aprobados: baseStats.aprobados,
      finalizados: baseStats.finalizados + expiredCount
    };
  }
  getTramitesVencidos() {
    return this.tramites.filter((tramite) => {
      const permisos = this.tramitePermisos.get(tramite.id);
      return permisos?.estaVencido || false;
    }).length;
  }
  getBaseStatistics() {
    const stats = {
      enRevision: 0,
      aprobados: 0,
      finalizados: 0
    };
    this.tramites.forEach((tramite) => {
      const estado = tramite.estado?.nombre || "";
      if (["En Revisi\xF3n", "Enviado"].includes(estado)) {
        stats.enRevision++;
      } else if (["Aprobado"].includes(estado)) {
        stats.aprobados++;
      } else if (["Finalizado"].includes(estado)) {
        stats.finalizados++;
      }
    });
    return stats;
  }
  calcularEstadisticasBasicas() {
    this.subscriptions.add(this.bandejaTramitesService.getEstadisticas().subscribe({
      next: (estadisticasBandeja) => {
        this.estadisticas = {
          total: estadisticasBandeja.totalAsignados,
          enRevision: estadisticasBandeja.pendientesRevision,
          aprobados: estadisticasBandeja.enProceso,
          finalizados: estadisticasBandeja.finalizadosHoy
        };
      },
      error: () => {
        this.estadisticas = {
          total: this.tramites?.length || 0,
          enRevision: this.tramites?.filter((t) => t.estado && (t.estado.nombre === "En Revisi\xF3n" || t.estado.nombre === "Enviado")).length || 0,
          aprobados: this.tramites?.filter((t) => t.estado && t.estado.nombre === "Aprobado").length || 0,
          finalizados: this.tramites?.filter((t) => t.estado && t.estado.nombre === "Finalizado").length || 0
        };
      }
    }));
  }
  onSearch(term) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }
  onSearchInputFocus() {
    if (this.searchTerm.trim() && this.searchResults.length > 0) {
      this.showSearchDropdown = true;
    }
  }
  onSearchInputBlur() {
    setTimeout(() => {
      this.showSearchDropdown = false;
    }, 200);
  }
  onSearchKeyDown(event) {
    if (!this.showSearchDropdown || this.searchResults.length === 0)
      return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.selectedSearchIndex = Math.min(this.selectedSearchIndex + 1, this.searchResults.length - 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.selectedSearchIndex = Math.max(this.selectedSearchIndex - 1, -1);
        break;
      case "Enter":
        event.preventDefault();
        if (this.selectedSearchIndex >= 0) {
          this.selectSearchResult(this.searchResults[this.selectedSearchIndex]);
        }
        break;
      case "Escape":
        this.showSearchDropdown = false;
        this.selectedSearchIndex = -1;
        break;
    }
  }
  selectSearchResult(tramite) {
    this.searchTerm = tramite.codigo || "";
    this.showSearchDropdown = false;
    this.filteredTramites = [tramite];
    this.searchError = "";
    setTimeout(() => {
      const element = document.getElementById(`tramite-${tramite.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("highlight-result");
        setTimeout(() => element.classList.remove("highlight-result"), 2e3);
      }
    }, 100);
  }
  clearSearch() {
    this.searchTerm = "";
    this.resetSearch();
  }
  getTramitesParaMostrar() {
    if (this.searchTerm && this.searchTerm.trim().length > 0) {
      return this.filteredTramites;
    }
    return this.tramites;
  }
  exportarSeleccionados() {
    if (this.selectedTramites.length === 0) {
      this.toastService.warning("Sin selecci\xF3n", "Debe seleccionar al menos un tr\xE1mite para exportar");
      return;
    }
    this.subscriptions.add(this.bandejaTramitesService.exportarTramites(this.selectedTramites).subscribe({
      next: (blob) => {
        const fecha = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        this.descargarArchivo(blob, `tramites_${fecha}.pdf`);
        this.toastService.success("Tr\xE1mites exportados", `Se han exportado ${this.selectedTramites.length} tr\xE1mites correctamente`);
        this.selectedTramites = [];
      },
      error: (error) => {
        this.toastService.error("Error al exportar", "No se pudieron exportar los tr\xE1mites");
      }
    }));
  }
  archivarSeleccionados() {
    if (this.selectedTramites.length === 0) {
      this.toastService.warning("Sin selecci\xF3n", "Debe seleccionar al menos un tr\xE1mite para archivar");
      return;
    }
    this.subscriptions.add(this.bandejaTramitesService.archivarTramites(this.selectedTramites).subscribe({
      next: (response) => {
        this.toastService.success("Tr\xE1mites archivados", `Se han archivado ${this.selectedTramites.length} tr\xE1mites correctamente`);
        this.selectedTramites = [];
        this.cargarTramites();
      },
      error: (error) => {
        this.toastService.error("Error al archivar", "No se pudieron archivar los tr\xE1mites");
      }
    }));
  }
  desarchivarSeleccionados() {
    if (this.selectedTramites.length === 0) {
      this.toastService.warning("Sin selecci\xF3n", "Debe seleccionar al menos un tr\xE1mite para desarchivar");
      return;
    }
    this.subscriptions.add(this.bandejaTramitesService.desarchivarTramites(this.selectedTramites).subscribe({
      next: (response) => {
        this.toastService.success("Tr\xE1mites desarchivados", `Se han desarchivado ${this.selectedTramites.length} tr\xE1mites correctamente`);
        this.selectedTramites = [];
        this.cargarTramites();
      },
      error: (error) => {
        this.toastService.error("Error al desarchivar", "No se pudieron desarchivar los tr\xE1mites");
      }
    }));
  }
  desarchivarTodos() {
    if (this.tramites.length === 0) {
      this.toastService.warning("Sin tr\xE1mites", "No hay tr\xE1mites archivados para desarchivar");
      return;
    }
    const todosIds = this.tramites.map((t) => t.id);
    this.subscriptions.add(this.bandejaTramitesService.desarchivarTramites(todosIds).subscribe({
      next: (response) => {
        this.toastService.success("Todos los tr\xE1mites desarchivados", `Se han desarchivado todos los ${todosIds.length} tr\xE1mites archivados`);
        this.selectedTramites = [];
        this.cargarTramites();
      },
      error: (error) => {
        this.toastService.error("Error al desarchivar", "No se pudieron desarchivar todos los tr\xE1mites");
      }
    }));
  }
  toggleVistaArchivados() {
    this.mostrarArchivados = !this.mostrarArchivados;
    this.selectedTramites = [];
    this.currentPage = 0;
    this.cargarTramites();
  }
  getPageNumbers() {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  cambiarPagina(page) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.cargarTramites();
    }
  }
  cambiarTamanioPagina(size) {
    this.pageSize = size;
    this.currentPage = 0;
    this.cargarTramites();
  }
  toggleOrden(campo) {
    if (this.ordenarPor === campo) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.ordenarPor = campo;
      this.ordenAscendente = true;
    }
    this.cargarTramites();
  }
  toggleVista() {
    this.vistaActual = this.vistaActual === "tabla" ? "tarjetas" : "tabla";
  }
  toggleSelectTramite(tramiteId) {
    const index = this.selectedTramites.indexOf(tramiteId);
    if (index > -1) {
      this.selectedTramites.splice(index, 1);
    } else {
      this.selectedTramites.push(tramiteId);
    }
  }
  selectAllTramites() {
    if (this.selectedTramites.length === this.tramites.length) {
      this.selectedTramites = [];
    } else {
      this.selectedTramites = this.tramites.map((t) => t.id);
    }
  }
  isSelected(tramiteId) {
    return this.selectedTramites.includes(tramiteId);
  }
  abrirModalNuevo() {
    this.showNuevoTramiteModal = true;
  }
  cerrarModalNuevo() {
    this.showNuevoTramiteModal = false;
  }
  verDetalle(tramite) {
    this.tramiteSeleccionado = tramite;
    this.showDetalleTramiteModal = true;
  }
  cerrarModalDetalle() {
    this.showDetalleTramiteModal = false;
    this.tramiteSeleccionado = null;
  }
  puedeEditarTramite(tramite) {
    const estadosEditables = ["BORRADOR", "ENVIADO", "EN_REVISION", "OBSERVADO"];
    const estadoNombre = tramite.estado?.nombre || tramite.estado;
    return estadosEditables.includes(estadoNombre);
  }
  editarTramite(tramite) {
    if (!this.puedeEditarTramite(tramite)) {
      this.toastService.warning("Acci\xF3n no permitida", "Este tr\xE1mite no se puede editar en su estado actual.");
      return;
    }
    this.tramiteSeleccionado = tramite;
    this.showEditarTramiteModal = true;
  }
  cerrarModalEditar() {
    this.showEditarTramiteModal = false;
    this.tramiteSeleccionado = null;
  }
  onTramiteCreado(nuevoTramite) {
    this.cargarTramites();
    this.cerrarModalNuevo();
  }
  onTramiteActualizado(tramiteActualizado) {
    this.cargarTramites();
    this.cerrarModalEditar();
  }
  cambiarEstado(tramite) {
    this.tramiteSeleccionado = tramite;
    this.obtenerEstadosDisponibles(tramite.estado);
    this.nuevoEstadoSeleccionado = "";
    this.observacionesCambioEstado = "";
    this.showCambiarEstadoModal = true;
  }
  obtenerEstadosDisponibles(estadoActual) {
    const estadoKey = (estadoActual?.nombre || estadoActual || "").toUpperCase();
    const transicionesEstado = {
      "BORRADOR": ["ENVIADO", "CANCELADO"],
      "ENVIADO": ["EN_REVISION", "DERIVADO", "CANCELADO"],
      "EN_REVISION": ["OBSERVADO", "EN_PROCESO", "RECHAZADO"],
      "DERIVADO": ["EN_REVISION", "EN_PROCESO"],
      "OBSERVADO": ["EN_REVISION", "CANCELADO"],
      "EN_PROCESO": ["APROBADO", "RECHAZADO", "FINALIZADO"],
      "APROBADO": ["FINALIZADO"],
      "RECHAZADO": ["ARCHIVADO"],
      "FINALIZADO": ["ARCHIVADO"],
      "ARCHIVADO": [],
      "CANCELADO": []
    };
    this.estadosDisponibles = transicionesEstado[estadoKey] || [];
  }
  confirmarCambioEstado() {
    if (!this.nuevoEstadoSeleccionado || !this.tramiteSeleccionado) {
      this.toastService.warning("Selecci\xF3n requerida", "Debe seleccionar un nuevo estado.");
      return;
    }
    this.procesandoCambioEstado = true;
    this.tramiteService.cambiarEstado(this.tramiteSeleccionado.id, this.nuevoEstadoSeleccionado, this.observacionesCambioEstado || void 0).subscribe({
      next: () => {
        this.procesandoCambioEstado = false;
        this.cerrarModalCambiarEstado();
        this.toastService.success("Estado cambiado", "El estado del tr\xE1mite ha sido actualizado correctamente.");
        this.cargarTramites();
      },
      error: (error) => {
        this.procesandoCambioEstado = false;
        this.toastService.error("Error", "No se pudo cambiar el estado del tr\xE1mite.");
      }
    });
  }
  seleccionarEstado(estado) {
    if (this.nuevoEstadoSeleccionado === estado) {
      this.nuevoEstadoSeleccionado = "";
    } else {
      this.nuevoEstadoSeleccionado = estado;
    }
  }
  cerrarModalCambiarEstado() {
    this.showCambiarEstadoModal = false;
    this.tramiteSeleccionado = null;
    this.nuevoEstadoSeleccionado = "";
    this.observacionesCambioEstado = "";
    this.estadosDisponibles = [];
  }
  getEstadoNombre(estadoEnum) {
    if (!estadoEnum)
      return "Sin estado";
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
    return estadosMap[estadoEnum] || estadoEnum;
  }
  getEstadoIcon(estado) {
    const iconosEstado = {
      "BORRADOR": "fas fa-edit",
      "ENVIADO": "fas fa-paper-plane",
      "EN_REVISION": "fas fa-search",
      "DERIVADO": "fas fa-share",
      "OBSERVADO": "fas fa-exclamation-triangle",
      "EN_PROCESO": "fas fa-cogs",
      "APROBADO": "fas fa-check-circle",
      "RECHAZADO": "fas fa-times-circle",
      "FINALIZADO": "fas fa-flag-checkered",
      "ARCHIVADO": "fas fa-archive",
      "CANCELADO": "fas fa-ban"
    };
    return iconosEstado[estado] || "fas fa-file";
  }
  getEstadoDescripcion(estado) {
    const descripcionesEstado = {
      "BORRADOR": "Documento en edici\xF3n",
      "ENVIADO": "Enviado para revisi\xF3n",
      "EN_REVISION": "En proceso de revisi\xF3n",
      "DERIVADO": "Derivado a otra \xE1rea",
      "OBSERVADO": "Con observaciones",
      "EN_PROCESO": "En proceso de atenci\xF3n",
      "APROBADO": "Aprobado por el \xE1rea",
      "RECHAZADO": "Rechazado por el \xE1rea",
      "FINALIZADO": "Proceso completado",
      "ARCHIVADO": "Archivado",
      "CANCELADO": "Proceso cancelado"
    };
    return descripcionesEstado[estado] || "Estado del tr\xE1mite";
  }
  imprimirTramite(tramite) {
    this.tramiteService.imprimirTramite(tramite.id).subscribe({
      next: (blob) => {
        blob.text().then((html) => {
          const printWindow = window.open("", "_blank", "width=800,height=600");
          if (printWindow) {
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.onload = () => {
              setTimeout(() => {
                printWindow.print();
              }, 500);
            };
          } else {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `tramite-${tramite.codigo}.html`;
            link.click();
            window.URL.revokeObjectURL(url);
            this.toastService.info("Documento generado", "Abra el archivo descargado para imprimir");
          }
        });
      },
      error: () => {
        this.toastService.error("Error", "No se pudo generar el documento para impresi\xF3n");
      }
    });
  }
  eliminarTramite(tramite) {
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.2s ease;
      ">
        <div style="
          background: white;
          border-radius: 12px;
          padding: 24px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease;
        ">
          <div style="
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            color: #dc3545;
          ">
            <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-right: 12px;"></i>
            <h3 style="margin: 0; color: #2c3e50; font-size: 20px;">Confirmar Eliminaci\xF3n</h3>
          </div>
          <p style="color: #495057; margin: 16px 0;">
            \xBFEst\xE1 seguro de eliminar el tr\xE1mite <strong>${tramite.codigo}</strong>?
          </p>
          <div style="
            background: #f8f9fa;
            border-left: 4px solid #dc3545;
            padding: 12px;
            margin: 16px 0;
            border-radius: 4px;
          ">
            <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 14px;">
              <strong>Asunto:</strong> ${tramite.asunto}
            </p>
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Estado:</strong> ${tramite.estado?.nombre || tramite.estado}
            </p>
          </div>
          <p style="color: #dc3545; font-size: 14px; margin: 16px 0;">
            <i class="fas fa-info-circle"></i>
            Esta acci\xF3n no se puede deshacer.
          </p>
          <div style="
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 24px;
          ">
            <button id="cancelBtn" style="
              padding: 10px 20px;
              border: 1px solid #dee2e6;
              background: white;
              color: #6c757d;
              border-radius: 6px;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s;
            ">Cancelar</button>
            <button id="deleteBtn" style="
              padding: 10px 20px;
              border: none;
              background: linear-gradient(135deg, #dc3545, #c82333);
              color: white;
              border-radius: 6px;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s;
              box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
            ">
              <i class="fas fa-trash"></i>
              Eliminar Tr\xE1mite
            </button>
          </div>
        </div>
      </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modalDiv);
    const cancelBtn = modalDiv.querySelector("#cancelBtn");
    const deleteBtn = modalDiv.querySelector("#deleteBtn");
    const closeModal = () => {
      modalDiv.remove();
      style.remove();
    };
    cancelBtn?.addEventListener("click", closeModal);
    deleteBtn?.addEventListener("click", () => {
      closeModal();
      this.tramiteService.eliminarTramite(tramite.id).subscribe({
        next: () => {
          this.toastService.success("Tr\xE1mite eliminado", `El tr\xE1mite ${tramite.codigo} ha sido eliminado correctamente.`);
          this.cargarTramites();
          const index = this.selectedTramites.indexOf(tramite.id);
          if (index > -1) {
            this.selectedTramites.splice(index, 1);
          }
        },
        error: (error) => {
          this.toastService.error("Error al eliminar", "No se pudo eliminar el tr\xE1mite. Intente nuevamente.");
        }
      });
    });
  }
  getEstadoClase(estado) {
    const clases = {
      "Borrador": "estado-borrador",
      "Enviado": "estado-enviado",
      "En Revisi\xF3n": "estado-revision",
      "Derivado": "estado-derivado",
      "Observado": "estado-observado",
      "Aprobado": "estado-aprobado",
      "Rechazado": "estado-rechazado",
      "Finalizado": "estado-finalizado",
      "Archivado": "estado-archivado"
    };
    const nombreEstado = estado?.nombre || estado;
    return clases[nombreEstado] || "estado-default";
  }
  getPrioridadNombre(prioridadEnum) {
    const prioridadesMap = {
      "BAJA": "Baja",
      "NORMAL": "Normal",
      "ALTA": "Alta",
      "URGENTE": "Urgente"
    };
    return prioridadesMap[prioridadEnum] || prioridadEnum;
  }
  getPrioridadClase(prioridad) {
    const clases = {
      "Baja": "prioridad-baja",
      "Normal": "prioridad-normal",
      "Alta": "prioridad-alta",
      "Urgente": "prioridad-urgente"
    };
    const nombrePrioridad = prioridad?.nombre || prioridad;
    return clases[nombrePrioridad] || "prioridad-normal";
  }
  formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  getDiasVencimiento(fechaVencimiento) {
    if (!fechaVencimiento)
      return null;
    const hoy = /* @__PURE__ */ new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1e3 * 60 * 60 * 24));
  }
  descargarArchivo(blob, nombreArchivo) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nombreArchivo;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  trackByTramiteId(index, tramite) {
    return tramite.id || index;
  }
  static {
    this.\u0275fac = function ListaTramitesComponent_Factory(t) {
      return new (t || _ListaTramitesComponent)(\u0275\u0275directiveInject(TramiteService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(BandejaTramitesService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListaTramitesComponent, selectors: [["app-lista-tramites"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 111, vars: 50, consts: [["confirmIcon", ""], [1, "lista-tramites-container"], [1, "page-header"], [1, "header-content"], [1, "title-section"], [1, "header-actions"], [1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-plus"], [1, "stats-cards"], [1, "stat-card", "total"], [1, "stat-icon"], [1, "fas", "fa-file-alt"], [1, "stat-info"], [1, "stat-number"], [1, "stat-label"], [1, "stat-card", "revision"], [1, "fas", "fa-clock"], [1, "stat-card", "finalizado"], [1, "fas", "fa-check-circle"], [1, "stat-card", "rating"], [1, "fas", "fa-flag-checkered"], ["class", "stat-note", 4, "ngIf"], [1, "toolbar"], [1, "search-section"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Buscar por c\xF3digo, asunto o solicitante...", "autocomplete", "off", 1, "search-input", 3, "ngModelChange", "focus", "blur", "keydown", "ngModel"], ["class", "clear-search-btn", "title", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], ["class", "search-error-message", 4, "ngIf"], [1, "toolbar-actions"], [1, "btn", "btn-outline", 3, "click", "title"], [1, "btn-text"], [1, "btn", 3, "click", "title"], [1, "fas", "fa-archive"], ["class", "bulk-actions", 4, "ngIf"], ["class", "archived-actions", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "table-container", 4, "ngIf"], ["class", "cards-container", 4, "ngIf"], ["class", "pagination-container", 4, "ngIf"], [3, "close", "tramiteCreado", "show"], [3, "close", "show", "tramite"], [1, "modal-overlay", "change-state-modal", 3, "click"], [1, "modal-container", 3, "click"], [1, "modal-header"], [1, "modal-icon"], [1, "fas", "fa-exchange-alt"], [1, "modal-title"], [1, "btn-close", 3, "click"], [1, "fas", "fa-times"], [1, "modal-body"], ["class", "current-tramite-card", 4, "ngIf"], [1, "state-selection-section"], [1, "section-label"], [1, "fas", "fa-arrow-right"], ["class", "states-grid", 4, "ngIf"], ["class", "empty-states", 4, "ngIf"], [1, "observations-section"], [1, "fas", "fa-comment-alt"], [1, "optional"], [1, "textarea-container"], ["rows", "3", "placeholder", "Ingrese observaciones sobre el cambio de estado...", 1, "form-textarea", 3, "ngModelChange", "ngModel"], ["class", "char-counter", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-cancel", 3, "click"], [1, "btn", "btn-confirm", 3, "click", "disabled"], ["class", "fas fa-spinner fa-spin", 4, "ngIf", "ngIfElse"], [1, "stat-note"], ["title", "Limpiar b\xFAsqueda", 1, "clear-search-btn", 3, "click"], [1, "search-error-message"], [1, "fas", "fa-exclamation-circle"], [1, "bulk-actions"], [1, "selected-count"], [1, "fas", "fa-check-square"], [1, "bulk-action-buttons"], [1, "btn", "btn-sm", "btn-bulk-export", 3, "click"], [1, "fas", "fa-download"], ["class", "btn btn-sm btn-bulk-delete", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-bulk-unarchive", 3, "click", 4, "ngIf"], [1, "btn", "btn-sm", "btn-bulk-delete", 3, "click"], [1, "btn", "btn-sm", "btn-bulk-unarchive", 3, "click"], [1, "fas", "fa-box-open"], [1, "archived-actions"], [1, "btn", "btn-sm", "btn-warning", 3, "click"], [1, "loading-container"], [1, "loading-spinner"], [1, "fas", "fa-spinner", "fa-spin"], [1, "table-container"], [1, "tramites-table"], [1, "select-column"], ["type", "checkbox", 3, "change", "checked"], [1, "sortable", 3, "click"], ["class", "fas fa-sort", 4, "ngIf"], ["class", "fas fa-sort-up", 4, "ngIf"], ["class", "fas fa-sort-down", 4, "ngIf"], [1, "actions-column"], ["class", "tramite-row", 3, "id", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "empty-state", 4, "ngIf"], [1, "fas", "fa-sort"], [1, "fas", "fa-sort-up"], [1, "fas", "fa-sort-down"], [1, "tramite-row", 3, "id"], ["data-label", "", 1, "select-column"], ["data-label", "C\xF3digo", 1, "codigo-column"], [1, "codigo"], ["data-label", "Tipo"], [1, "tipo-tramite"], ["data-label", "Asunto", 1, "asunto-column"], [1, "asunto-text", 3, "title"], ["data-label", "Estado"], [1, "estado-badge", 3, "ngClass"], [1, "fas", "fa-circle"], ["data-label", "Prioridad"], [1, "prioridad-badge", 3, "ngClass"], [1, "fas", "fa-flag"], ["data-label", "Solicitante", 1, "solicitante-column"], [1, "solicitante-info"], [1, "nombre"], [1, "area"], ["data-label", "Fecha", 1, "fecha-column"], ["data-label", "", 1, "actions-column"], [1, "action-buttons"], ["title", "Ver detalle", 1, "btn-icon", 3, "click"], [1, "fas", "fa-eye"], ["title", "Cambiar estado", 1, "btn-icon", 3, "click"], ["title", "Imprimir", 1, "btn-icon", 3, "click"], [1, "fas", "fa-print"], ["title", "Eliminar tr\xE1mite", 1, "btn-icon", "btn-delete", 3, "click"], [1, "fas", "fa-trash"], [1, "empty-state"], [1, "empty-icon"], [4, "ngIf"], [1, "empty-actions"], ["class", "btn btn-outline", 3, "click", 4, "ngIf"], [1, "btn", "btn-outline", 3, "click"], [1, "cards-container"], ["class", "tramite-card", 3, "id", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "tramite-card", 3, "id"], [1, "card-header"], [1, "card-title"], ["type", "checkbox", 1, "card-checkbox", 3, "change", "checked"], [1, "card-badges"], [1, "card-content"], [1, "asunto"], [1, "card-details"], [1, "detail-item"], [1, "fas", "fa-tag"], [1, "fas", "fa-user"], [1, "fas", "fa-building"], [1, "fas", "fa-calendar"], [1, "card-footer"], [1, "card-actions"], ["title", "Editar", 1, "btn-icon", 3, "click", "disabled"], [1, "fas", "fa-edit"], [1, "pagination-container"], [1, "pagination-info"], [1, "pagination-controls"], [1, "btn", "btn-outline", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "page-numbers"], ["class", "page-btn", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "fas", "fa-chevron-right"], [1, "page-size-selector"], [3, "ngModelChange", "change", "ngModel"], ["value", "10"], ["value", "20"], ["value", "50"], ["value", "100"], [1, "page-btn", 3, "click"], [1, "current-tramite-card"], [1, "tramite-header"], [1, "tramite-code"], [1, "current-state-badge", 3, "ngClass"], ["class", "tramite-title", 4, "ngIf"], [1, "tramite-title"], [1, "states-grid"], ["class", "state-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "state-option", 3, "click"], [1, "state-icon", 3, "ngClass"], [1, "state-info"], [1, "state-name"], [1, "state-description"], [1, "state-selector"], [1, "fas", "fa-check"], [1, "empty-states"], [1, "fas", "fa-info-circle"], [1, "char-counter"]], template: function ListaTramitesComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h1");
        \u0275\u0275text(5, "Gesti\xF3n de Tr\xE1mites");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Administra y supervisa todos los tr\xE1mites documentarios");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 5)(9, "button", 6);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_button_click_9_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalNuevo());
        });
        \u0275\u0275element(10, "i", 7);
        \u0275\u0275text(11, " Nuevo Tr\xE1mite ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "div", 10);
        \u0275\u0275element(15, "i", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 12)(17, "div", 13);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 14);
        \u0275\u0275text(20, "Total de Tr\xE1mites");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "div", 15)(22, "div", 10);
        \u0275\u0275element(23, "i", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 12)(25, "div", 13);
        \u0275\u0275text(26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "div", 14);
        \u0275\u0275text(28, "En Revisi\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(29, "div", 17)(30, "div", 10);
        \u0275\u0275element(31, "i", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 12)(33, "div", 13);
        \u0275\u0275text(34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div", 14);
        \u0275\u0275text(36, "Aprobados");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(37, "div", 19)(38, "div", 10);
        \u0275\u0275element(39, "i", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 12)(41, "div", 13);
        \u0275\u0275text(42);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "div", 14);
        \u0275\u0275text(44, "Finalizados");
        \u0275\u0275elementEnd();
        \u0275\u0275template(45, ListaTramitesComponent_div_45_Template, 2, 1, "div", 21);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(46, "div", 22)(47, "div", 23)(48, "div", 24);
        \u0275\u0275element(49, "i", 25);
        \u0275\u0275elementStart(50, "input", 26);
        \u0275\u0275twoWayListener("ngModelChange", function ListaTramitesComponent_Template_input_ngModelChange_50_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("ngModelChange", function ListaTramitesComponent_Template_input_ngModelChange_50_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSearch($event));
        })("focus", function ListaTramitesComponent_Template_input_focus_50_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSearchInputFocus());
        })("blur", function ListaTramitesComponent_Template_input_blur_50_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSearchInputBlur());
        })("keydown", function ListaTramitesComponent_Template_input_keydown_50_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSearchKeyDown($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(51, ListaTramitesComponent_button_51_Template, 2, 0, "button", 27);
        \u0275\u0275elementEnd();
        \u0275\u0275template(52, ListaTramitesComponent_div_52_Template, 3, 1, "div", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "div", 29)(54, "button", 30);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_button_click_54_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleVista());
        });
        \u0275\u0275element(55, "i");
        \u0275\u0275elementStart(56, "span", 31);
        \u0275\u0275text(57);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "button", 32);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_button_click_58_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleVistaArchivados());
        });
        \u0275\u0275element(59, "i", 33);
        \u0275\u0275elementStart(60, "span", 31);
        \u0275\u0275text(61);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(62, ListaTramitesComponent_div_62_Template, 10, 3, "div", 34)(63, ListaTramitesComponent_div_63_Template, 4, 1, "div", 35);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(64, ListaTramitesComponent_div_64_Template, 5, 0, "div", 36);
        \u0275\u0275pipe(65, "async");
        \u0275\u0275template(66, ListaTramitesComponent_div_66_Template, 37, 16, "div", 37);
        \u0275\u0275pipe(67, "async");
        \u0275\u0275template(68, ListaTramitesComponent_div_68_Template, 3, 3, "div", 38);
        \u0275\u0275pipe(69, "async");
        \u0275\u0275template(70, ListaTramitesComponent_div_70_Template, 26, 7, "div", 39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "app-nuevo-tramite-modal", 40);
        \u0275\u0275listener("close", function ListaTramitesComponent_Template_app_nuevo_tramite_modal_close_71_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.cerrarModalNuevo());
        })("tramiteCreado", function ListaTramitesComponent_Template_app_nuevo_tramite_modal_tramiteCreado_71_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onTramiteCreado($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "app-detalle-tramite-modal", 41);
        \u0275\u0275listener("close", function ListaTramitesComponent_Template_app_detalle_tramite_modal_close_72_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.cerrarModalDetalle());
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "div", 42);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_div_click_73_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.cerrarModalCambiarEstado());
        });
        \u0275\u0275elementStart(74, "div", 43);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_div_click_74_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView($event.stopPropagation());
        });
        \u0275\u0275elementStart(75, "div", 44)(76, "div", 45);
        \u0275\u0275element(77, "i", 46);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "h3", 47);
        \u0275\u0275text(79, "Cambiar Estado del Tr\xE1mite");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "button", 48);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_button_click_80_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.cerrarModalCambiarEstado());
        });
        \u0275\u0275element(81, "i", 49);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(82, "div", 50);
        \u0275\u0275template(83, ListaTramitesComponent_div_83_Template, 8, 4, "div", 51);
        \u0275\u0275elementStart(84, "div", 52)(85, "label", 53);
        \u0275\u0275element(86, "i", 54);
        \u0275\u0275text(87, " Seleccionar nuevo estado ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(88, ListaTramitesComponent_div_88_Template, 2, 1, "div", 55)(89, ListaTramitesComponent_div_89_Template, 6, 1, "div", 56);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(90, "div", 57)(91, "label", 53);
        \u0275\u0275element(92, "i", 58);
        \u0275\u0275text(93, " Observaciones ");
        \u0275\u0275elementStart(94, "span", 59);
        \u0275\u0275text(95, "(opcional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(96, "div", 60)(97, "textarea", 61);
        \u0275\u0275twoWayListener("ngModelChange", function ListaTramitesComponent_Template_textarea_ngModelChange_97_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.observacionesCambioEstado, $event) || (ctx.observacionesCambioEstado = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275text(98, "          ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(99, ListaTramitesComponent_div_99_Template, 2, 1, "div", 62);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(100, "div", 63)(101, "button", 64);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_button_click_101_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.cerrarModalCambiarEstado());
        });
        \u0275\u0275element(102, "i", 49);
        \u0275\u0275elementStart(103, "span", 31);
        \u0275\u0275text(104, "Cancelar");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(105, "button", 65);
        \u0275\u0275listener("click", function ListaTramitesComponent_Template_button_click_105_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.confirmarCambioEstado());
        });
        \u0275\u0275template(106, ListaTramitesComponent_i_106_Template, 1, 0, "i", 66)(107, ListaTramitesComponent_ng_template_107_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(109, "span", 31);
        \u0275\u0275text(110);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        const confirmIcon_r22 = \u0275\u0275reference(108);
        \u0275\u0275advance(18);
        \u0275\u0275textInterpolate(ctx.estadisticas.total);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.estadisticas.enRevision);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.estadisticas.aprobados);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.estadisticas.finalizados);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.getTramitesVencidos() > 0);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("has-dropdown", ctx.searchTerm && ctx.searchTerm.trim());
        \u0275\u0275advance();
        \u0275\u0275classProp("searching", ctx.isSearching);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchError && ctx.searchTerm);
        \u0275\u0275advance(2);
        \u0275\u0275property("title", ctx.vistaActual === "tabla" ? "Ver tarjetas" : "Ver tabla");
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx.vistaActual === "tabla" ? "fas fa-th-large" : "fas fa-table");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.vistaActual === "tabla" ? "Tarjetas" : "Tabla");
        \u0275\u0275advance();
        \u0275\u0275classProp("btn-warning", ctx.mostrarArchivados)("btn-outline", !ctx.mostrarArchivados);
        \u0275\u0275property("title", ctx.mostrarArchivados ? "Ver tr\xE1mites activos" : "Ver tr\xE1mites archivados");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.mostrarArchivados ? "Activos" : "Archivados");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedTramites.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarArchivados && ctx.tramites.length > 0 && ctx.selectedTramites.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(65, 44, ctx.loading$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.vistaActual === "tabla" && !\u0275\u0275pipeBind1(67, 46, ctx.loading$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.vistaActual === "tarjetas" && !\u0275\u0275pipeBind1(69, 48, ctx.loading$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.totalPages > 1);
        \u0275\u0275advance();
        \u0275\u0275property("show", ctx.showNuevoTramiteModal);
        \u0275\u0275advance();
        \u0275\u0275property("show", ctx.showDetalleTramiteModal)("tramite", ctx.tramiteSeleccionado);
        \u0275\u0275advance();
        \u0275\u0275classProp("show", ctx.showCambiarEstadoModal);
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.tramiteSeleccionado);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.estadosDisponibles.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.estadosDisponibles.length === 0);
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.observacionesCambioEstado);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.observacionesCambioEstado);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("loading", ctx.procesandoCambioEstado);
        \u0275\u0275property("disabled", !ctx.nuevoEstadoSeleccionado);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.procesandoCambioEstado)("ngIfElse", confirmIcon_r22);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.procesandoCambioEstado ? "Procesando..." : "Cambiar Estado", " ");
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, AsyncPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, RouterModule, NuevoTramiteModalComponent, DetalleTramiteModalComponent], styles: ['\n\n.lista-tramites-container[_ngcontent-%COMP%] {\n  padding: 0;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\n.page-header[_ngcontent-%COMP%] {\n  background: white;\n  border-bottom: 1px solid #dee2e6;\n  padding: 24px 30px;\n  margin-bottom: 24px;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.title-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 8px 0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.title-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 16px;\n  margin: 0;\n}\n.header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-weight: 500;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.2s ease;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border: none;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #5a67d8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.toolbar[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  padding: 20px;\n  margin: 0 30px 24px 30px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  position: relative;\n  z-index: 100;\n}\n.search-section[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 400px;\n  position: relative;\n}\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-box.has-dropdown[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  border-color: #667eea;\n}\n.search-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 16px;\n  color: #adb5bd;\n  z-index: 1;\n  pointer-events: none;\n}\n.search-box[_ngcontent-%COMP%]   i.searching[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse 1s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 44px 12px 44px;\n  border: 2px solid #e9ecef;\n  border-radius: 8px;\n  font-size: 14px;\n  background: #f8f9fa;\n  transition: all 0.2s ease;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  background: white;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.clear-search[_ngcontent-%COMP%], .clear-search-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  background: none;\n  border: none;\n  color: #adb5bd;\n  cursor: pointer;\n  padding: 6px 8px;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.clear-search[_ngcontent-%COMP%]:hover, .clear-search-btn[_ngcontent-%COMP%]:hover {\n  color: #dc3545;\n  background: #fff1f0;\n}\n.search-error-message[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding: 10px 14px;\n  background: #fff5f5;\n  border: 1px solid #fee;\n  border-left: 3px solid #dc3545;\n  border-radius: 6px;\n  color: #dc3545;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\n}\n.search-error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.search-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n  border: 2px solid #667eea;\n  border-top: none;\n  border-radius: 0 0 8px 8px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  z-index: 1000;\n  max-height: 400px;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.search-results[_ngcontent-%COMP%] {\n  padding: 8px 0;\n}\n.search-result-item[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-bottom: 1px solid #f1f3f4;\n}\n.search-result-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.search-result-item[_ngcontent-%COMP%]:hover, .search-result-item.selected[_ngcontent-%COMP%] {\n  background: #f8f9ff;\n}\n.search-result-item.selected[_ngcontent-%COMP%] {\n  background: #667eea10;\n}\n.result-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 6px;\n}\n.result-codigo[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  font-family:\n    "Monaco",\n    "Menlo",\n    monospace;\n  font-size: 13px;\n}\n.result-tipo[_ngcontent-%COMP%] {\n  background: #e9ecef;\n  color: #495057;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n.result-details[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.result-asunto[_ngcontent-%COMP%] {\n  color: #495057;\n  font-size: 13px;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.result-solicitante[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 12px;\n}\n.result-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.result-estado[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.result-fecha[_ngcontent-%COMP%] {\n  color: #adb5bd;\n  font-size: 11px;\n}\n.search-error-content[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #dc3545;\n  font-weight: 500;\n  margin-bottom: 12px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #f1f3f4;\n}\n.error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.error-suggestions[_ngcontent-%COMP%] {\n  color: #495057;\n  font-size: 13px;\n}\n.error-suggestions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-weight: 500;\n}\n.error-suggestions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 20px;\n  list-style-type: none;\n}\n.error-suggestions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n  padding-left: 16px;\n  margin-bottom: 4px;\n}\n.error-suggestions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2022";\n  position: absolute;\n  left: 0;\n  color: #667eea;\n}\n.toolbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: 2px solid #dee2e6;\n  background: white;\n  color: #495057;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  color: #667eea;\n  background: #f8f9ff;\n}\n.btn-outline.active[_ngcontent-%COMP%] {\n  border-color: #667eea;\n  color: #667eea;\n  background: #f0f4ff;\n}\n.filter-count[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n  font-size: 11px;\n  padding: 2px 6px;\n  border-radius: 10px;\n  margin-left: 4px;\n}\n.bulk-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea15 0%,\n      #764ba215 100%);\n  border-radius: 10px;\n  border: 2px solid #667eea;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.selected-count[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #667eea;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.selected-count[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.bulk-action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-left: auto;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  font-size: 13px;\n  border-radius: 6px;\n  font-weight: 500;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-bulk-export[_ngcontent-%COMP%] {\n  background: #28a745;\n  color: white;\n}\n.btn-bulk-export[_ngcontent-%COMP%]:hover {\n  background: #218838;\n  transform: translateY(-1px);\n}\n.btn-bulk-delete[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n}\n.btn-bulk-delete[_ngcontent-%COMP%]:hover {\n  background: #c82333;\n  transform: translateY(-1px);\n}\n.btn-bulk-unarchive[_ngcontent-%COMP%] {\n  background: #17a2b8;\n  color: white;\n}\n.btn-bulk-unarchive[_ngcontent-%COMP%]:hover {\n  background: #138496;\n  transform: translateY(-1px);\n}\n.filters-panel[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  margin: 0 30px 24px 30px;\n  padding: 0;\n  border-top: 3px solid #667eea;\n  animation: _ngcontent-%COMP%_expandPanel 0.3s ease;\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_expandPanel {\n  from {\n    opacity: 0;\n    max-height: 0;\n  }\n  to {\n    opacity: 1;\n    max-height: 500px;\n  }\n}\n.filters-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea15 0%,\n      #764ba215 100%);\n  padding: 16px 20px;\n  border-bottom: 1px solid #e9ecef;\n}\n.filters-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #2c3e50;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.filters-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.filters-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  padding: 20px;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  color: #495057;\n}\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border: 1px solid #dee2e6;\n  border-radius: 6px;\n  font-size: 14px;\n  background: white;\n  transition: border-color 0.2s ease;\n}\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);\n}\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  padding: 16px 20px;\n  background: #f8f9fa;\n  border-top: 1px solid #e9ecef;\n}\n.btn-apply-filters[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-apply-filters[_ngcontent-%COMP%]:hover {\n  background: #5a67d8;\n  transform: translateY(-1px);\n}\n.btn-clear-filters[_ngcontent-%COMP%] {\n  background: white;\n  color: #6c757d;\n  padding: 10px 20px;\n  border: 2px solid #dee2e6;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-clear-filters[_ngcontent-%COMP%]:hover {\n  border-color: #6c757d;\n  color: #495057;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 12px;\n  margin: 0 30px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  color: #667eea;\n}\n.loading-spinner[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 32px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  margin: 0 30px;\n  overflow: hidden;\n}\n.tramites-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.tramites-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n}\n.tramites-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 16px 12px;\n  text-align: left;\n  font-weight: 600;\n  color: #495057;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.tramites-table[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  transition: all 0.2s ease;\n}\n.tramites-table[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n  color: #667eea;\n}\n.tramites-table[_ngcontent-%COMP%]   th.sortable[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  opacity: 0.6;\n}\n.select-column[_ngcontent-%COMP%] {\n  width: 40px;\n  text-align: center;\n}\n.actions-column[_ngcontent-%COMP%] {\n  width: 120px;\n  text-align: center;\n}\n.tramite-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f1f3f4;\n  transition: all 0.2s ease;\n}\n.tramite-row[_ngcontent-%COMP%]:hover {\n  background: #f8f9ff;\n}\n.tramite-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px 12px;\n  font-size: 14px;\n  vertical-align: middle;\n}\n.codigo-column[_ngcontent-%COMP%] {\n  font-family:\n    "Monaco",\n    "Menlo",\n    monospace;\n}\n.codigo[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  font-size: 13px;\n}\n.tipo-tramite[_ngcontent-%COMP%] {\n  color: #495057;\n  font-size: 13px;\n}\n.asunto-column[_ngcontent-%COMP%] {\n  max-width: 250px;\n}\n.asunto-text[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #2c3e50;\n  font-weight: 500;\n}\n.estado-badge[_ngcontent-%COMP%], .prioridad-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.estado-borrador[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  color: #6c757d;\n  border: 1px solid #dee2e6;\n}\n.estado-enviado[_ngcontent-%COMP%] {\n  background: #e1f5fe;\n  color: #01579b;\n  border: 1px solid #81d4fa;\n}\n.estado-revision[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n  border: 1px solid #ffcc02;\n}\n.estado-derivado[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #bf360c;\n  border: 1px solid #ff9800;\n}\n.estado-observado[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  border: 1px solid #ef5350;\n}\n.estado-aprobado[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n  border: 1px solid #4caf50;\n}\n.estado-rechazado[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  border: 1px solid #f44336;\n}\n.estado-finalizado[_ngcontent-%COMP%] {\n  background: #e0f2f1;\n  color: #00695c;\n  border: 1px solid #26a69a;\n}\n.estado-archivado[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n  border: 1px solid #ab47bc;\n}\n.prioridad-baja[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n  border: 1px solid #4caf50;\n}\n.prioridad-normal[_ngcontent-%COMP%] {\n  background: #e1f5fe;\n  color: #01579b;\n  border: 1px solid #03a9f4;\n}\n.prioridad-alta[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n  border: 1px solid #ff9800;\n}\n.prioridad-urgente[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  border: 1px solid #f44336;\n}\n.solicitante-column[_ngcontent-%COMP%] {\n  min-width: 180px;\n}\n.solicitante-info[_ngcontent-%COMP%]   .nombre[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #2c3e50;\n  font-size: 13px;\n}\n.solicitante-info[_ngcontent-%COMP%]   .area[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6c757d;\n  margin-top: 2px;\n}\n.fecha-column[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 13px;\n  min-width: 100px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: #f8f9fa;\n  color: #6c757d;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  transition: all 0.2s ease;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: #667eea;\n  color: white;\n  transform: translateY(-1px);\n}\n.btn-icon[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n}\n.btn-icon[_ngcontent-%COMP%]:disabled:hover {\n  background: #f8f9fa;\n  color: #6c757d;\n}\n.btn-icon.btn-delete[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n  border: 1px solid #c82333;\n  transition: all 0.2s ease;\n}\n.btn-icon.btn-delete[_ngcontent-%COMP%]:hover {\n  background: #c82333;\n  border-color: #bd2130;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);\n}\n.btn-icon.btn-delete[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n  background: #bd2130;\n}\n.cards-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n  margin: 0 30px;\n}\n.tramite-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  border: 1px solid #f1f3f4;\n  overflow: hidden;\n  transition: all 0.2s ease;\n}\n.tramite-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n  border-color: #667eea;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 16px 20px 12px 20px;\n  border-bottom: 1px solid #f1f3f4;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.card-checkbox[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.card-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  align-items: flex-end;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n}\n.card-content[_ngcontent-%COMP%]   .asunto[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 12px 0;\n  line-height: 1.3;\n}\n.card-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 13px;\n  color: #6c757d;\n}\n.detail-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 16px;\n  text-align: center;\n  color: #adb5bd;\n}\n.card-footer[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border-top: 1px solid #f1f3f4;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #f8f9fa;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.vencimiento[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 12px;\n  margin: 0 30px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: #dee2e6;\n  margin-bottom: 20px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #495057;\n  margin: 0 0 8px 0;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin: 0 0 24px 0;\n}\n.empty-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.pagination-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 30px;\n  background: white;\n  border-radius: 12px;\n  margin: 24px 30px 0 30px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n}\n.pagination-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6c757d;\n}\n.pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.page-numbers[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.page-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 1px solid #dee2e6;\n  background: white;\n  color: #495057;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n}\n.page-btn[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  color: #667eea;\n}\n.page-btn.active[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border-color: #667eea;\n}\n.page-size-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #6c757d;\n}\n.page-size-selector[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 6px 8px;\n  border: 1px solid #dee2e6;\n  border-radius: 4px;\n  font-size: 14px;\n}\n@media (max-width: 768px) {\n  .lista-tramites-container[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    padding: 16px 20px;\n    margin-bottom: 16px;\n  }\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .title-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    margin: 0 0 16px 0;\n    padding: 0;\n    background: transparent;\n    box-shadow: none;\n    flex-direction: column;\n    gap: 12px;\n  }\n  .search-section[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: none;\n    background: white;\n    padding: 16px;\n    border-radius: 12px;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  }\n  .search-dropdown[_ngcontent-%COMP%] {\n    border-radius: 0 0 8px 8px;\n    max-height: 350px;\n  }\n  .toolbar-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    background: white;\n    padding: 16px;\n    border-radius: 12px;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n  }\n  .btn-outline[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 12px 16px;\n  }\n  .btn-outline[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .btn-text[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .btn-outline[_ngcontent-%COMP%]::after {\n    content: attr(data-mobile-text);\n    font-size: 13px;\n  }\n  .bulk-actions[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    margin: 0;\n    padding: 16px;\n    border-radius: 12px;\n    flex-direction: column;\n    gap: 16px;\n    background: white;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  }\n  .selected-count[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    font-size: 15px;\n  }\n  .bulk-action-buttons[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 0;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n  }\n  .btn-sm[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 12px 16px;\n    font-size: 14px;\n  }\n  .filters-panel[_ngcontent-%COMP%] {\n    margin: 0 0 16px 0;\n  }\n  .filters-header[_ngcontent-%COMP%] {\n    background:\n      linear-gradient(\n        135deg,\n        #667eea 0%,\n        #764ba2 100%);\n    color: white;\n    padding: 16px;\n    border-radius: 12px 12px 0 0;\n  }\n  .filters-title[_ngcontent-%COMP%] {\n    color: white;\n    font-size: 15px;\n  }\n  .filters-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    color: white;\n  }\n  .filters-content[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    padding: 16px;\n  }\n  .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 4px;\n  }\n  .filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    padding: 12px;\n    font-size: 15px;\n    border-radius: 8px;\n  }\n  .filter-actions[_ngcontent-%COMP%] {\n    padding: 16px;\n    background: #f8f9fa;\n    border-radius: 0 0 12px 12px;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n  }\n  .btn-apply-filters[_ngcontent-%COMP%], .btn-clear-filters[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 12px;\n    font-size: 14px;\n  }\n  .table-container[_ngcontent-%COMP%] {\n    margin: 0;\n    border-radius: 8px;\n    overflow: visible;\n    padding: 0;\n  }\n  .tramites-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .tramites-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .tramite-row[_ngcontent-%COMP%] {\n    display: block;\n    margin-bottom: 16px;\n    background: white;\n    border-radius: 12px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n    border: 1px solid #e9ecef;\n    overflow: hidden;\n    transition: all 0.3s ease;\n  }\n  .tramite-row[_ngcontent-%COMP%]:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n    border-color: #667eea;\n  }\n  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    padding: 12px 16px;\n    border: none;\n    position: relative;\n  }\n  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    font-size: 12px;\n    color: #6c757d;\n    text-transform: uppercase;\n    letter-spacing: 0.5px;\n    margin-right: auto;\n    min-width: 100px;\n  }\n  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    background:\n      linear-gradient(\n        135deg,\n        #667eea15 0%,\n        #764ba215 100%);\n    border-bottom: 1px solid #e9ecef;\n    padding: 16px;\n    justify-content: center;\n  }\n  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child::before {\n    display: none;\n  }\n  .codigo-column[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start !important;\n    padding: 16px !important;\n    background: #f8f9fa;\n    border-bottom: 1px solid #e9ecef;\n  }\n  .codigo-column[_ngcontent-%COMP%]::before {\n    margin-bottom: 8px;\n  }\n  .codigo[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .tipo-tramite[_ngcontent-%COMP%] {\n    margin-top: 4px;\n  }\n  .asunto-column[_ngcontent-%COMP%] {\n    max-width: 100%;\n    padding: 16px !important;\n  }\n  .asunto-text[_ngcontent-%COMP%] {\n    white-space: normal;\n    overflow: visible;\n    text-overflow: initial;\n    line-height: 1.4;\n  }\n  .estado-badge[_ngcontent-%COMP%], .prioridad-badge[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .solicitante-column[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n  .solicitante-info[_ngcontent-%COMP%] {\n    margin-left: auto;\n    text-align: right;\n  }\n  .fecha-column[_ngcontent-%COMP%] {\n    justify-content: space-between;\n  }\n  .actions-column[_ngcontent-%COMP%] {\n    background: #f8f9fa;\n    border-top: 1px solid #e9ecef;\n    padding: 12px 16px !important;\n    justify-content: center;\n  }\n  .actions-column[_ngcontent-%COMP%]::before {\n    display: none;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    width: 100%;\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 8px;\n    padding: 8px;\n  }\n  .btn-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 14px;\n    border-radius: 8px;\n  }\n  .btn-icon.btn-delete[_ngcontent-%COMP%] {\n    background: #dc3545;\n    color: white;\n    border: 1px solid #dc3545;\n    grid-column: span 3;\n    width: 100%;\n    height: 36px;\n    margin-top: 4px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n  }\n  .btn-icon.btn-delete[_ngcontent-%COMP%]::after {\n    content: "Eliminar";\n    font-size: 12px;\n    margin-left: 4px;\n  }\n  .btn-icon.btn-delete[_ngcontent-%COMP%]:active {\n    transform: scale(0.98);\n    background: #c82333;\n  }\n  .cards-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    margin: 0;\n  }\n  .pagination-container[_ngcontent-%COMP%] {\n    margin: 16px 0 0 0;\n    padding: 16px;\n    flex-direction: column;\n    gap: 16px;\n  }\n  .pagination-controls[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .page-size-selector[_ngcontent-%COMP%] {\n    order: 1;\n  }\n  .empty-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    width: 100%;\n  }\n  .empty-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (max-width: 480px) {\n  .toolbar-actions[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n  }\n  .btn-outline[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .bulk-action-buttons[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filter-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .btn-clear-filters[_ngcontent-%COMP%] {\n    order: 2;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 6px;\n    padding: 8px 4px;\n    justify-content: center;\n  }\n  .btn-icon[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n    font-size: 13px;\n    flex: 0 0 auto;\n  }\n  .btn-icon.btn-delete[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-top: 6px;\n    flex: 1 1 100%;\n    height: 34px;\n  }\n  .btn-icon.btn-delete[_ngcontent-%COMP%]::after {\n    display: inline;\n  }\n  .tramite-row[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);\n  }\n  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n  }\n  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    font-size: 11px;\n    min-width: 80px;\n  }\n  .codigo-column[_ngcontent-%COMP%] {\n    padding: 12px !important;\n  }\n  .asunto-column[_ngcontent-%COMP%] {\n    padding: 12px !important;\n  }\n  .estado-badge[_ngcontent-%COMP%], .prioridad-badge[_ngcontent-%COMP%] {\n    padding: 4px 8px;\n    font-size: 11px;\n  }\n  .btn-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n  .page-btn[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: 13px;\n  }\n  .header-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n.stats-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin: 0 30px 24px 30px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  border: 1px solid #f1f3f4;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  transition: all 0.2s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n.stat-card.total[_ngcontent-%COMP%] {\n  border-left: 4px solid #667eea;\n}\n.stat-card.revision[_ngcontent-%COMP%] {\n  border-left: 4px solid #ff9800;\n}\n.stat-card.finalizado[_ngcontent-%COMP%] {\n  border-left: 4px solid #4caf50;\n}\n.stat-card.rating[_ngcontent-%COMP%] {\n  border-left: 4px solid #26a69a;\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  color: white;\n}\n.total[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.revision[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800 0%,\n      #ff5722 100%);\n}\n.finalizado[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #388e3c 100%);\n}\n.rating[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #26a69a 0%,\n      #00695c 100%);\n}\n.stat-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #2c3e50;\n  line-height: 1;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6c757d;\n  margin-top: 4px;\n  font-weight: 500;\n}\n.stat-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #f39c12;\n  margin-top: 2px;\n  font-weight: 500;\n}\n@media (max-width: 480px) {\n  .stats-cards[_ngcontent-%COMP%] {\n    margin: 0 0 16px 0;\n    grid-template-columns: 1fr;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 16px;\n  }\n  .stat-number[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .stat-label[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .title-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .title-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .tramite-card[_ngcontent-%COMP%] {\n    margin: 0 -5px;\n  }\n  .card-header[_ngcontent-%COMP%], .card-content[_ngcontent-%COMP%], .card-footer[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 40px 16px;\n  }\n  .empty-icon[_ngcontent-%COMP%] {\n    font-size: 48px;\n  }\n}\n.archived-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 8px 0;\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f39c12 0%,\n      #e67e22 100%);\n  color: white;\n  border: none;\n  box-shadow: 0 2px 4px rgba(243, 156, 18, 0.2);\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #e67e22 0%,\n      #d35400 100%);\n  box-shadow: 0 4px 8px rgba(243, 156, 18, 0.3);\n  transform: translateY(-1px);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%] {\n  position: fixed !important;\n  top: 0 !important;\n  left: 0 !important;\n  right: 0 !important;\n  bottom: 0 !important;\n  background: rgba(0, 0, 0, 0.6) !important;\n  -webkit-backdrop-filter: blur(8px) !important;\n  backdrop-filter: blur(8px) !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  z-index: 10000 !important;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;\n}\n.modal-overlay.change-state-modal.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);\n  max-width: 650px;\n  width: 90%;\n  max-height: 90vh;\n  overflow: hidden;\n  position: relative;\n  transform: scale(0.9) translateY(20px);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  display: flex;\n  flex-direction: column;\n}\n.modal-overlay.change-state-modal.show[_ngcontent-%COMP%]   .modal-container[_ngcontent-%COMP%] {\n  transform: scale(1) translateY(0);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 32px 40px 24px 40px;\n  color: white;\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.1) 25%,\n      transparent 25%),\n    linear-gradient(\n      -45deg,\n      rgba(255, 255, 255, 0.1) 25%,\n      transparent 25%),\n    linear-gradient(\n      45deg,\n      transparent 75%,\n      rgba(255, 255, 255, 0.1) 75%),\n    linear-gradient(\n      -45deg,\n      transparent 75%,\n      rgba(255, 255, 255, 0.1) 75%);\n  background-size: 30px 30px;\n  opacity: 0.3;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  margin: 0;\n  flex: 1;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n  border: none;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 18px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.25);\n  transform: scale(1.05);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n  padding: 40px;\n  background: #f8f9fb;\n  overflow-y: auto;\n  max-height: 60vh;\n  flex: 1;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .current-tramite-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 28px;\n  margin-bottom: 32px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e8ecf0;\n  position: relative;\n  overflow: hidden;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .current-tramite-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .tramite-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #f0f2f5;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .tramite-code[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-family:\n    "Monaco",\n    "Menlo",\n    monospace;\n  font-size: 16px;\n  font-weight: 600;\n  color: #2c3e50;\n  background: #f8f9fc;\n  padding: 10px 16px;\n  border-radius: 10px;\n  border: 1px solid #e8ecf0;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .tramite-code[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-size: 18px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .current-state-badge[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .tramite-title[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.4;\n  margin: 0;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-selection-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 16px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 20px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-size: 18px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .states-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e8ecf0;\n  border-radius: 16px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: transparent;\n  transition: all 0.3s ease;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);\n  transform: translateY(-4px);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option[_ngcontent-%COMP%]:hover::before {\n  background:\n    linear-gradient(\n      90deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%] {\n  border-color: #667eea;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea08 0%,\n      #764ba208 100%);\n  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);\n  transform: translateY(-2px);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]::before {\n  background:\n    linear-gradient(\n      90deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  color: white;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option[_ngcontent-%COMP%]:hover   .state-icon[_ngcontent-%COMP%] {\n  transform: scale(1.1) rotate(5deg);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #2c3e50;\n  text-transform: capitalize;\n  display: block;\n  margin-bottom: 4px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-description[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6c757d;\n  line-height: 1.4;\n  display: block;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]   .state-name[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-selector[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 2px solid #e8ecf0;\n  border-radius: 50%;\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]   .state-selector[_ngcontent-%COMP%] {\n  background: #667eea;\n  border-color: #667eea;\n  color: white;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]:hover {\n  border-color: #dc3545;\n  background:\n    linear-gradient(\n      135deg,\n      #dc354508 0%,\n      #fd707008 100%);\n  box-shadow: 0 8px 30px rgba(220, 53, 69, 0.2);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]:hover::before {\n  background:\n    linear-gradient(\n      90deg,\n      #dc3545 0%,\n      #fd7070 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]:hover   .state-name[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]:hover   .state-selector[_ngcontent-%COMP%] {\n  background: #dc3545;\n  border-color: #dc3545;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]:hover   .state-selector[_ngcontent-%COMP%]::after {\n  content: "\\d7";\n  font-size: 16px;\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option.selected[_ngcontent-%COMP%]:hover   .state-selector[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: none;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-enviado[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #00bcd4 0%,\n      #0097a7 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-revision[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800 0%,\n      #f57c00 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-derivado[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff5722 0%,\n      #d84315 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-observado[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336 0%,\n      #d32f2f 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-aprobado[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #388e3c 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-rechazado[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e91e63 0%,\n      #c2185b 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-finalizado[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #009688 0%,\n      #00695c 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .estado-archivado[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9c27b0 0%,\n      #7b1fa2 100%);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .observations-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .optional[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #9ca3af;\n  font-weight: 400;\n  margin-left: 8px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .textarea-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 2px solid #e8ecf0;\n  border-radius: 12px;\n  padding: 16px;\n  font-size: 14px;\n  font-family: inherit;\n  resize: vertical;\n  min-height: 100px;\n  transition: all 0.3s ease;\n  background: white;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .char-counter[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 8px;\n  right: 12px;\n  font-size: 11px;\n  color: #9ca3af;\n  background: white;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .empty-states[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  background: white;\n  border-radius: 16px;\n  border: 2px dashed #e8ecf0;\n  color: #6c757d;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .empty-states[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #d1d5db;\n  margin-bottom: 16px;\n  display: block;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .empty-states[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {\n  background: white;\n  padding: 24px 40px 32px 40px;\n  border-top: 1px solid #e8ecf0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 16px;\n  flex-shrink: 0;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 14px 28px;\n  border-radius: 12px;\n  font-weight: 600;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border: none;\n  text-decoration: none;\n  position: relative;\n  overflow: hidden;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: #f8f9fb;\n  color: #6c757d;\n  border: 2px solid #e8ecf0;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n  color: #495057;\n  border-color: #adb5bd;\n  transform: translateY(-1px);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: 2px solid transparent;\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #5a67d8 0%,\n      #6a5acd 100%);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:disabled {\n  background: #e9ecef;\n  color: #adb5bd;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-confirm.loading[_ngcontent-%COMP%] {\n  cursor: wait;\n}\n.modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-container[_ngcontent-%COMP%] {\n    margin: 0.5rem;\n    width: calc(100% - 1rem);\n    max-height: calc(100vh - 1rem);\n    border-radius: 16px;\n    display: flex;\n    flex-direction: column;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {\n    padding: 24px 24px 20px 24px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    font-size: 20px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {\n    padding: 20px 24px;\n    overflow-y: auto;\n    flex: 1;\n    max-height: calc(100vh - 200px);\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .current-tramite-card[_ngcontent-%COMP%] {\n    padding: 20px;\n    margin-bottom: 24px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .tramite-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .states-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-option[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .state-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 18px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {\n    padding: 16px 24px 20px 24px;\n    flex-direction: column-reverse;\n    gap: 12px;\n    flex-shrink: 0;\n    position: sticky;\n    bottom: 0;\n    background: white;\n    border-top: 1px solid #e8ecf0;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 16px 24px;\n  }\n  .modal-overlay.change-state-modal[_ngcontent-%COMP%]   .btn-text[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n@keyframes _ngcontent-%COMP%_modalSlideIn {\n  from {\n    transform: scale(0.8) translateY(30px);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1) translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n/*# sourceMappingURL=lista-tramites.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListaTramitesComponent, { className: "ListaTramitesComponent" });
})();
export {
  ListaTramitesComponent
};
//# sourceMappingURL=chunk-2SYSYAFT.js.map
