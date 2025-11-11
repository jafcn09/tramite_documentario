import {
  FirmaDigitalService,
  ResponderTramiteModalComponent,
  TipoFirma
} from "./chunk-VW3MWU3E.js";
import {
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
  ActivatedRoute,
  AuthService,
  RouterModule
} from "./chunk-T5HD73DN.js";
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
} from "./chunk-6M6PSWXB.js";
import {
  AsyncPipe,
  ChangeDetectorRef,
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  SlicePipe,
  Subject,
  Subscription,
  TitleCasePipe,
  __spreadProps,
  __spreadValues,
  debounceTime,
  distinctUntilChanged,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-HL73AAZ4.js";

// src/app/features/mis-tramites/mis-tramites.component.ts
var _c0 = ["editSignatureCanvas"];
function MisTramitesComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function MisTramitesComponent_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.crearNuevoTramite());
    });
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275text(2, " Nuevo Tr\xE1mite ");
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 34)(2, "div", 35);
    \u0275\u0275element(3, "i", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 36)(5, "div", 37);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 38);
    \u0275\u0275text(8, "Total Asignados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 39)(10, "div", 35);
    \u0275\u0275element(11, "i", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 36)(13, "div", 37);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 38);
    \u0275\u0275text(16, "Por Procesar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 41)(18, "div", 35);
    \u0275\u0275element(19, "i", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 36)(21, "div", 37);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 38);
    \u0275\u0275text(24, "Procesados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.estadisticas.total);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.getTramitesPorProcesar());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.getTramitesProcesados());
  }
}
function MisTramitesComponent_div_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 34)(2, "div", 35);
    \u0275\u0275element(3, "i", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 36)(5, "div", 37);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 38);
    \u0275\u0275text(8, "Mis Tr\xE1mites");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 39)(10, "div", 35);
    \u0275\u0275element(11, "i", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 36)(13, "div", 37);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 38);
    \u0275\u0275text(16, "En Proceso");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 41)(18, "div", 35);
    \u0275\u0275element(19, "i", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 36)(21, "div", 37);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 38);
    \u0275\u0275text(24, "Completados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 43)(26, "div", 35);
    \u0275\u0275element(27, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 36)(29, "div", 37);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 38);
    \u0275\u0275text(32, "Observados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.estadisticas.total);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.getTramitesPorProcesar());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.getTramitesProcesados());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.estadisticas.observado);
  }
}
function MisTramitesComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275template(1, MisTramitesComponent_div_9_ng_container_1_Template, 25, 3, "ng-container", 33)(2, MisTramitesComponent_div_9_ng_container_2_Template, 33, 4, "ng-container", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isUsuario);
  }
}
function MisTramitesComponent_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function MisTramitesComponent_button_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275element(1, "i", 46);
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275element(1, "i", 48);
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_18_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275listener("click", function MisTramitesComponent_div_18_div_2_Template_div_click_0_listener() {
      const tramite_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectSearchResult(tramite_r5));
    })("mouseenter", function MisTramitesComponent_div_18_div_2_Template_div_mouseenter_0_listener() {
      const i_r6 = \u0275\u0275restoreView(_r4).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedSearchIndex = i_r6);
    });
    \u0275\u0275elementStart(1, "div", 53)(2, "span", 54);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 55);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 56)(7, "span", 57);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 58);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tramite_r5 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r1.selectedSearchIndex === i_r6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r5.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r5.asunto);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r5.tipoTramite.nombre);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoClase(tramite_r5.estado.nombre));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r5.estado.nombre, " ");
  }
}
function MisTramitesComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50);
    \u0275\u0275template(2, MisTramitesComponent_div_18_div_2_Template, 11, 8, "div", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.searchResults)("ngForTrackBy", ctx_r1.trackByTramiteId);
  }
}
function MisTramitesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 60);
    \u0275\u0275element(2, "i", 61);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.searchError);
  }
}
function MisTramitesComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "button", 63);
    \u0275\u0275listener("click", function MisTramitesComponent_div_20_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleVista());
    });
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.vistaActual === "tarjetas" ? "fas fa-list" : "fas fa-th-large");
  }
}
function MisTramitesComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "i", 48);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando tr\xE1mites...");
    \u0275\u0275elementEnd()();
  }
}
function MisTramitesComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275element(1, "i", 5);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No tienes tr\xE1mites");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Crea tu primer tr\xE1mite para empezar");
    \u0275\u0275elementEnd()();
  }
}
function MisTramitesComponent_div_26_div_1_div_11_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 98);
    \u0275\u0275element(1, "i", 99);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatearFecha(tramite_r9.fechaRespuesta), " ");
  }
}
function MisTramitesComponent_div_26_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93)(1, "div", 94);
    \u0275\u0275element(2, "i", 95);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Respuesta del Administrativo:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p", 96);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "slice");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, MisTramitesComponent_div_26_div_1_div_11_div_8_Template, 3, 1, "div", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(7, 3, tramite_r9.respuesta, 0, 100), "", tramite_r9.respuesta.length > 100 ? "..." : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", tramite_r9.fechaRespuesta);
  }
}
function MisTramitesComponent_div_26_div_1_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275element(1, "i", 101);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", tramite_r9.areaDestino.nombre, " ");
  }
}
function MisTramitesComponent_div_26_div_1_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_button_25_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const tramite_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(!ctx_r1.estaVencido(tramite_r9) ? ctx_r1.editarTramite(tramite_r9) : null);
    });
    \u0275\u0275element(1, "i", 102);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-action edit " + (ctx_r1.estaVencido(tramite_r9) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r9))("title", ctx_r1.estaVencido(tramite_r9) ? "Tr\xE1mite vencido - No se puede editar" : "Editar tr\xE1mite");
  }
}
function MisTramitesComponent_div_26_div_1_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 103);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_button_26_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const tramite_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.eliminarTramite(tramite_r9));
    });
    \u0275\u0275element(1, "i", 104);
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_26_div_1_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tramite_r9.documentos.length);
  }
}
function MisTramitesComponent_div_26_div_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275element(1, "i", 107);
    \u0275\u0275elementStart(2, "span", 108);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", tramite_r9.contadorProcesados || 0, "/", (tramite_r9.contadorProcesados || 0) + (tramite_r9.contadorPorProcesar || 0), " ");
  }
}
function MisTramitesComponent_div_26_div_1_ng_container_31_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_ng_container_31_button_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleAprobarClick($event, tramite_r9));
    });
    \u0275\u0275element(1, "i", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-action approve " + (ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeAprobar(tramite_r9) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeAprobar(tramite_r9))("title", ctx_r1.estaVencido(tramite_r9) ? "Tr\xE1mite vencido - No se puede aprobar" : ctx_r1.puedeAprobar(tramite_r9) ? "Aprobar tr\xE1mite" : "No se puede aprobar en este estado");
  }
}
function MisTramitesComponent_div_26_div_1_ng_container_31_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_ng_container_31_button_2_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleRechazarClick($event, tramite_r9));
    });
    \u0275\u0275element(1, "i", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-action reject " + (ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeRechazar(tramite_r9) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeRechazar(tramite_r9))("title", ctx_r1.estaVencido(tramite_r9) ? "Tr\xE1mite vencido - No se puede rechazar" : ctx_r1.puedeRechazar(tramite_r9) ? "Rechazar tr\xE1mite" : "No se puede rechazar en este estado");
  }
}
function MisTramitesComponent_div_26_div_1_ng_container_31_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_ng_container_31_button_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r14);
      const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleDerivarClick($event, tramite_r9));
    });
    \u0275\u0275element(1, "i", 110);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-action forward " + (ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeDerivar(tramite_r9) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeDerivar(tramite_r9))("title", ctx_r1.estaVencido(tramite_r9) ? "Tr\xE1mite vencido - No se puede derivar" : ctx_r1.puedeDerivar(tramite_r9) ? "Derivar tr\xE1mite" : "No se puede derivar en este estado");
  }
}
function MisTramitesComponent_div_26_div_1_ng_container_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, MisTramitesComponent_div_26_div_1_ng_container_31_button_1_Template, 2, 4, "button", 86)(2, MisTramitesComponent_div_26_div_1_ng_container_31_button_2_Template, 2, 4, "button", 86)(3, MisTramitesComponent_div_26_div_1_ng_container_31_button_3_Template, 2, 4, "button", 86);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
  }
}
function MisTramitesComponent_div_26_div_1_button_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_button_32_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      const tramite_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleResponderClick($event, tramite_r9));
    });
    \u0275\u0275element(1, "i", 111);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-action respond " + (ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeResponder(tramite_r9) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r9) || !ctx_r1.puedeResponder(tramite_r9))("title", ctx_r1.estaVencido(tramite_r9) ? "Tr\xE1mite vencido - No se puede responder" : ctx_r1.puedeResponder(tramite_r9) ? "Responder tr\xE1mite" : "No se puede responder en este estado");
  }
}
function MisTramitesComponent_div_26_div_1_div_33_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" -", -ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento), "d ");
  }
}
function MisTramitesComponent_div_26_div_1_div_33_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento), "d ");
  }
}
function MisTramitesComponent_div_26_div_1_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 112);
    \u0275\u0275element(1, "i", 40);
    \u0275\u0275template(2, MisTramitesComponent_div_26_div_1_div_33_span_2_Template, 2, 1, "span", 33)(3, MisTramitesComponent_div_26_div_1_div_33_span_3_Template, 2, 1, "span", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("vencido", ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento) < 0)("urgente", ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento) <= 3 && ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento) >= 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento) < 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento) >= 0);
  }
}
function MisTramitesComponent_div_26_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_Template_div_click_0_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verDetalle(tramite_r9));
    });
    \u0275\u0275elementStart(1, "div", 69)(2, "div", 70);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 71);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 72)(7, "h3", 73);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 74);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, MisTramitesComponent_div_26_div_1_div_11_Template, 9, 7, "div", 75);
    \u0275\u0275elementStart(12, "div", 76)(13, "span", 77);
    \u0275\u0275element(14, "i");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, MisTramitesComponent_div_26_div_1_span_16_Template, 3, 1, "span", 78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 79)(18, "div", 80);
    \u0275\u0275element(19, "div", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 82);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 83)(23, "button", 84);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_Template_button_click_23_listener($event) {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r1.verDetalle(tramite_r9));
    });
    \u0275\u0275element(24, "i", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, MisTramitesComponent_div_26_div_1_button_25_Template, 2, 4, "button", 86)(26, MisTramitesComponent_div_26_div_1_button_26_Template, 2, 0, "button", 87);
    \u0275\u0275elementStart(27, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_26_div_1_Template_button_click_27_listener($event) {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(!ctx_r1.estaVencido(tramite_r9) ? ctx_r1.handleDescargarClick($event, tramite_r9) : null);
    });
    \u0275\u0275element(28, "i", 89);
    \u0275\u0275template(29, MisTramitesComponent_div_26_div_1_span_29_Template, 2, 1, "span", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, MisTramitesComponent_div_26_div_1_div_30_Template, 4, 2, "div", 91)(31, MisTramitesComponent_div_26_div_1_ng_container_31_Template, 4, 3, "ng-container", 33)(32, MisTramitesComponent_div_26_div_1_button_32_Template, 2, 4, "button", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, MisTramitesComponent_div_26_div_1_div_33_Template, 4, 6, "div", 92);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r9.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(tramite_r9.fechaCreacion));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r9.asunto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r9.tipoTramite.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", tramite_r9.respuesta && (tramite_r9.estado == null ? null : tramite_r9.estado.nombre) === "FINALIZADO");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getPrioridadClase(tramite_r9.prioridad.nivel));
    \u0275\u0275advance();
    \u0275\u0275classMap(tramite_r9.prioridad.icono);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r9.prioridad.nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", tramite_r9.areaDestino && ctx_r1.isAdministrativo);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r1.getProgressoPorcentaje(tramite_r9), "%")("background-color", tramite_r9.estado.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.getProgressoPorcentaje(tramite_r9), "% - ", tramite_r9.estado.nombre, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.puedeEditarTramite(tramite_r9));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.puedeEliminarTramite(tramite_r9));
    \u0275\u0275advance();
    \u0275\u0275classMap("btn-action download " + (ctx_r1.estaVencido(tramite_r9) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r9))("title", ctx_r1.estaVencido(tramite_r9) ? "Tr\xE1mite finalizado - Descarga no disponible" : tramite_r9.documentos && tramite_r9.documentos.length > 0 ? "Descargar " + tramite_r9.documentos.length + " documento(s)" : "Descargar documentos");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", tramite_r9.documentos && tramite_r9.documentos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo && (tramite_r9.contadorProcesados || tramite_r9.contadorPorProcesar));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo && ctx_r1.canProcessTramites && tramite_r9.estado.id !== 7);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getDiasVencimiento(tramite_r9.fechaVencimiento) !== null);
  }
}
function MisTramitesComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275template(1, MisTramitesComponent_div_26_div_1_Template, 34, 28, "div", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredTramites)("ngForTrackBy", ctx_r1.trackByTramiteId);
  }
}
function MisTramitesComponent_div_28_tr_20_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const tramite_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(!ctx_r1.estaVencido(tramite_r17) ? ctx_r1.editarTramite(tramite_r17) : null);
    });
    \u0275\u0275element(1, "i", 102);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-mini edit " + (ctx_r1.estaVencido(tramite_r17) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r17))("title", ctx_r1.estaVencido(tramite_r17) ? "Tr\xE1mite vencido - No se puede editar" : "Editar");
  }
}
function MisTramitesComponent_div_28_tr_20_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 123);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const tramite_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarTramite(tramite_r17));
    });
    \u0275\u0275element(1, "i", 104);
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_28_tr_20_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tramite_r17.documentos.length);
  }
}
function MisTramitesComponent_div_28_tr_20_button_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_button_31_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const tramite_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleAprobarClickTable(tramite_r17));
    });
    \u0275\u0275element(1, "i", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-mini approve " + (ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeAprobar(tramite_r17) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeAprobar(tramite_r17))("title", ctx_r1.estaVencido(tramite_r17) ? "Tr\xE1mite vencido - No se puede aprobar" : ctx_r1.puedeAprobar(tramite_r17) ? "Aprobar" : "No se puede aprobar en este estado");
  }
}
function MisTramitesComponent_div_28_tr_20_button_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_button_32_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const tramite_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleRechazarClickTable(tramite_r17));
    });
    \u0275\u0275element(1, "i", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-mini reject " + (ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeRechazar(tramite_r17) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeRechazar(tramite_r17))("title", ctx_r1.estaVencido(tramite_r17) ? "Tr\xE1mite vencido - No se puede rechazar" : ctx_r1.puedeRechazar(tramite_r17) ? "Rechazar" : "No se puede rechazar en este estado");
  }
}
function MisTramitesComponent_div_28_tr_20_button_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_button_33_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r22);
      const tramite_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleDerivarClickTable(tramite_r17));
    });
    \u0275\u0275element(1, "i", 110);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-mini forward " + (ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeDerivar(tramite_r17) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeDerivar(tramite_r17))("title", ctx_r1.estaVencido(tramite_r17) ? "Tr\xE1mite vencido - No se puede derivar" : ctx_r1.puedeDerivar(tramite_r17) ? "Derivar" : "No se puede derivar en este estado");
  }
}
function MisTramitesComponent_div_28_tr_20_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_button_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const tramite_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleResponderClickTable(tramite_r17));
    });
    \u0275\u0275element(1, "i", 111);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("btn-mini respond " + (ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeResponder(tramite_r17) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r17) || !ctx_r1.puedeResponder(tramite_r17))("title", ctx_r1.estaVencido(tramite_r17) ? "Tr\xE1mite vencido - No se puede responder" : ctx_r1.puedeResponder(tramite_r17) ? "Responder" : "No se puede responder en este estado");
  }
}
function MisTramitesComponent_div_28_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 116);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 117);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_Template_div_click_5_listener() {
      const tramite_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verDetalle(tramite_r17));
    });
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "slice");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "span", 118);
    \u0275\u0275element(15, "i");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "span", 119);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td");
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td")(23, "div", 120)(24, "button", 121);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_Template_button_click_24_listener() {
      const tramite_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.verDetalle(tramite_r17));
    });
    \u0275\u0275element(25, "i", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, MisTramitesComponent_div_28_tr_20_button_26_Template, 2, 4, "button", 86)(27, MisTramitesComponent_div_28_tr_20_button_27_Template, 2, 0, "button", 122);
    \u0275\u0275elementStart(28, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_28_tr_20_Template_button_click_28_listener() {
      const tramite_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(!ctx_r1.estaVencido(tramite_r17) ? ctx_r1.descargarTodosDocumentos(tramite_r17) : null);
    });
    \u0275\u0275element(29, "i", 89);
    \u0275\u0275template(30, MisTramitesComponent_div_28_tr_20_span_30_Template, 2, 1, "span", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, MisTramitesComponent_div_28_tr_20_button_31_Template, 2, 4, "button", 86)(32, MisTramitesComponent_div_28_tr_20_button_32_Template, 2, 4, "button", 86)(33, MisTramitesComponent_div_28_tr_20_button_33_Template, 2, 4, "button", 86)(34, MisTramitesComponent_div_28_tr_20_button_34_Template, 2, 4, "button", 86);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tramite_r17 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r17.codigo);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(tramite_r17.asunto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind3(10, 24, tramite_r17.descripcion, 0, 50), "...");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r17.tipoTramite.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getEstadoClaseCompleta(tramite_r17));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoVisual(tramite_r17).icono);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEstadoVisual(tramite_r17).nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getPrioridadClase(tramite_r17.prioridad.nivel));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r17.prioridad.nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(tramite_r17.fechaCreacion));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.puedeEditarTramite(tramite_r17));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.puedeEliminarTramite(tramite_r17));
    \u0275\u0275advance();
    \u0275\u0275classMap("btn-mini download " + (ctx_r1.estaVencido(tramite_r17) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(tramite_r17))("title", ctx_r1.estaVencido(tramite_r17) ? "Tr\xE1mite finalizado - Descarga no disponible" : tramite_r17.documentos && tramite_r17.documentos.length > 0 ? "Descargar " + tramite_r17.documentos.length + " documento(s)" : "Descargar documentos");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", tramite_r17.documentos && tramite_r17.documentos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isAdministrativo);
  }
}
function MisTramitesComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 113)(1, "div", 114)(2, "table")(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Prioridad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, MisTramitesComponent_div_28_tr_20_Template, 35, 28, "tr", 115);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275property("ngForOf", ctx_r1.filteredTramites)("ngForTrackBy", ctx_r1.trackByTramiteId);
  }
}
function MisTramitesComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 124)(1, "button", 125);
    \u0275\u0275listener("click", function MisTramitesComponent_div_30_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(ctx_r1.currentPage - 1));
    });
    \u0275\u0275element(2, "i", 126);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 127);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 125);
    \u0275\u0275listener("click", function MisTramitesComponent_div_30_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cambiarPagina(ctx_r1.currentPage + 1));
    });
    \u0275\u0275element(6, "i", 128);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.currentPage, " de ", ctx_r1.totalPages, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
  }
}
function MisTramitesComponent_div_31_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 137)(1, "label");
    \u0275\u0275text(2, "\xC1rea:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.areaDestino.nombre);
  }
}
function MisTramitesComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275listener("click", function MisTramitesComponent_div_31_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalAprobar());
    });
    \u0275\u0275elementStart(1, "div", 130);
    \u0275\u0275listener("click", function MisTramitesComponent_div_31_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r25);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 131)(3, "h3");
    \u0275\u0275element(4, "i", 42);
    \u0275\u0275text(5, " Aprobar Tr\xE1mite ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 132);
    \u0275\u0275listener("click", function MisTramitesComponent_div_31_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalAprobar());
    });
    \u0275\u0275element(7, "i", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 133)(9, "div", 134)(10, "div", 135)(11, "h4");
    \u0275\u0275text(12, "\xBFEst\xE1 seguro de aprobar este tr\xE1mite?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 136)(14, "div", 137)(15, "label");
    \u0275\u0275text(16, "C\xF3digo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 138);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 137)(20, "label");
    \u0275\u0275text(21, "Asunto:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 137)(25, "label");
    \u0275\u0275text(26, "Tipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 137)(30, "label");
    \u0275\u0275text(31, "Estado actual:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 118);
    \u0275\u0275element(33, "i");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(35, "div", 139)(36, "div", 140)(37, "div", 141);
    \u0275\u0275element(38, "i", 142);
    \u0275\u0275elementStart(39, "h5");
    \u0275\u0275text(40, "Responsable Asignado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 143)(42, "div", 137)(43, "label");
    \u0275\u0275text(44, "Nombre:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span");
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(47, MisTramitesComponent_div_31_div_47_Template, 5, 1, "div", 144);
    \u0275\u0275elementStart(48, "div", 137)(49, "label");
    \u0275\u0275text(50, "Nuevo estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 145);
    \u0275\u0275element(52, "i", 42);
    \u0275\u0275text(53, " Aprobado ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(54, "div", 146);
    \u0275\u0275element(55, "i", 147);
    \u0275\u0275elementStart(56, "p");
    \u0275\u0275text(57, 'Una vez aprobado, el tr\xE1mite ser\xE1 notificado al responsable asignado y cambiar\xE1 su estado a "Aprobado".');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(58, "div", 148)(59, "button", 149);
    \u0275\u0275listener("click", function MisTramitesComponent_div_31_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalAprobar());
    });
    \u0275\u0275element(60, "i", 46);
    \u0275\u0275text(61, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 150);
    \u0275\u0275listener("click", function MisTramitesComponent_div_31_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarAprobacion());
    });
    \u0275\u0275element(63, "i", 109);
    \u0275\u0275text(64, " Aprobar Tr\xE1mite ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.codigo);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.asunto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.tipoTramite.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.getEstadoClaseCompleta(ctx_r1.tramiteSeleccionado));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoVisual(ctx_r1.tramiteSeleccionado).icono);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEstadoVisual(ctx_r1.tramiteSeleccionado).nombre, " ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate2("", (ctx_r1.tramiteSeleccionado.trabajadorAsignado == null ? null : ctx_r1.tramiteSeleccionado.trabajadorAsignado.nombre) || "Sistema", " ", (ctx_r1.tramiteSeleccionado.trabajadorAsignado == null ? null : ctx_r1.tramiteSeleccionado.trabajadorAsignado.apellidos) || "Autom\xE1tico", "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.areaDestino);
  }
}
function MisTramitesComponent_div_32_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 154)(1, "label");
    \u0275\u0275text(2, "Vencimiento:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(ctx_r1.tramiteSeleccionado.fechaVencimiento));
  }
}
function MisTramitesComponent_div_32_div_49_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Vencido hace ", -ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento), " d\xEDas h\xE1biles ");
  }
}
function MisTramitesComponent_div_32_div_49_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento), " d\xEDas h\xE1biles restantes ");
  }
}
function MisTramitesComponent_div_32_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 154)(1, "label");
    \u0275\u0275text(2, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275template(4, MisTramitesComponent_div_32_div_49_span_4_Template, 2, 1, "span", 33)(5, MisTramitesComponent_div_32_div_49_span_5_Template, 2, 1, "span", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-danger", ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento) < 0)("text-warning", ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento) <= 3 && ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento) >= 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento) < 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento) >= 0);
  }
}
function MisTramitesComponent_div_32_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 167)(1, "h4");
    \u0275\u0275element(2, "i", 168);
    \u0275\u0275text(3, " Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 169);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.descripcion);
  }
}
function MisTramitesComponent_div_32_div_51_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 173);
    \u0275\u0275listener("click", function MisTramitesComponent_div_32_div_51_div_5_Template_div_click_0_listener() {
      const documento_r28 = \u0275\u0275restoreView(_r27).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(!ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? ctx_r1.descargarDocumento(ctx_r1.tramiteSeleccionado.id, documento_r28.nombre) : null);
    });
    \u0275\u0275element(1, "i", 5);
    \u0275\u0275elementStart(2, "span", 174);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "i");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const documento_r28 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap("documento-item " + (ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? "disabled" : ""));
    \u0275\u0275styleProp("cursor", ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? "not-allowed" : "pointer")("opacity", ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? "0.5" : "1");
    \u0275\u0275attribute("title", ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? "Tr\xE1mite finalizado - Descarga no disponible" : "Descargar documento");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(documento_r28.nombre);
    \u0275\u0275advance();
    \u0275\u0275classMap("fas fa-download " + (ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? "text-muted" : ""));
  }
}
function MisTramitesComponent_div_32_div_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 170)(1, "h4");
    \u0275\u0275element(2, "i", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 171);
    \u0275\u0275template(5, MisTramitesComponent_div_32_div_51_div_5_Template, 5, 10, "div", 172);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Documentos Adjuntos (", ctx_r1.tramiteSeleccionado.documentos.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.tramiteSeleccionado.documentos);
  }
}
function MisTramitesComponent_div_32_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 175)(1, "h4");
    \u0275\u0275element(2, "i", 101);
    \u0275\u0275text(3, " Asignaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 154)(5, "label");
    \u0275\u0275text(6, "\xC1rea:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275element(8, "i", 101);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.areaDestino.nombre, " ");
  }
}
function MisTramitesComponent_div_32_div_53_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 189)(1, "div", 190);
    \u0275\u0275element(2, "i", 156);
    \u0275\u0275elementStart(3, "div", 191)(4, "span", 192);
    \u0275\u0275text(5, "Fecha de Firma");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 193);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 1, ctx_r1.tramiteSeleccionado.fechaFirma, "dd/MM/yyyy HH:mm:ss"));
  }
}
function MisTramitesComponent_div_32_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 176)(1, "h3");
    \u0275\u0275element(2, "i", 177);
    \u0275\u0275text(3, " Firma Digital ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 178)(5, "div", 179)(6, "div", 180);
    \u0275\u0275element(7, "i", 42);
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Documento Firmado Digitalmente");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 181);
    \u0275\u0275template(11, MisTramitesComponent_div_32_div_53_div_11_Template, 9, 4, "div", 182);
    \u0275\u0275elementStart(12, "div", 183)(13, "div", 184);
    \u0275\u0275element(14, "i", 185);
    \u0275\u0275elementStart(15, "div", 186)(16, "span", 187);
    \u0275\u0275text(17, "Validez Legal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 188);
    \u0275\u0275text(19, "Firma digital con validez legal equivalente a manuscrita");
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.fechaFirma);
  }
}
function MisTramitesComponent_div_32_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 194)(1, "div", 195);
    \u0275\u0275element(2, "div", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 196)(4, "span", 197);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 198);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 199)(9, "div", 200);
    \u0275\u0275element(10, "i", 147);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 201);
    \u0275\u0275element(13, "i", 40);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const progreso_r29 = ctx.ngIf;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", progreso_r29.porcentaje, "%")("background-color", ctx_r1.tramiteSeleccionado.estado.color);
    \u0275\u0275classProp("progress-vencido", progreso_r29.tipoProgreso === "vencido");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", progreso_r29.porcentaje, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getEstadoVisualTexto(ctx_r1.tramiteSeleccionado));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", progreso_r29.descripcion, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", progreso_r29.tiempoRestante, " ");
  }
}
function MisTramitesComponent_div_32_span_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 202);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r1.tramiteSeleccionado.documentos.length, ")");
  }
}
function MisTramitesComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275listener("click", function MisTramitesComponent_div_32_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalDetalle());
    });
    \u0275\u0275elementStart(1, "div", 151);
    \u0275\u0275listener("click", function MisTramitesComponent_div_32_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r26);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 131)(3, "h3");
    \u0275\u0275text(4, "Detalle del Tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 132);
    \u0275\u0275listener("click", function MisTramitesComponent_div_32_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalDetalle());
    });
    \u0275\u0275element(6, "i", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 133)(8, "div", 152)(9, "div", 153)(10, "h4");
    \u0275\u0275element(11, "i", 147);
    \u0275\u0275text(12, " Informaci\xF3n General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 154)(14, "label");
    \u0275\u0275text(15, "C\xF3digo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 138);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 154)(19, "label");
    \u0275\u0275text(20, "Asunto:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 154)(24, "label");
    \u0275\u0275text(25, "Tipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 154)(29, "label");
    \u0275\u0275text(30, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 118);
    \u0275\u0275element(32, "i");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 154)(35, "label");
    \u0275\u0275text(36, "Prioridad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 119);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 155)(40, "h4");
    \u0275\u0275element(41, "i", 156);
    \u0275\u0275text(42, " Fechas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 154)(44, "label");
    \u0275\u0275text(45, "Creaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(48, MisTramitesComponent_div_32_div_48_Template, 5, 1, "div", 157)(49, MisTramitesComponent_div_32_div_49_Template, 6, 6, "div", 157);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(50, MisTramitesComponent_div_32_div_50_Template, 6, 1, "div", 158)(51, MisTramitesComponent_div_32_div_51_Template, 6, 2, "div", 159)(52, MisTramitesComponent_div_32_div_52_Template, 10, 1, "div", 160)(53, MisTramitesComponent_div_32_div_53_Template, 20, 1, "div", 161);
    \u0275\u0275elementStart(54, "div", 162)(55, "h4");
    \u0275\u0275element(56, "i", 163);
    \u0275\u0275text(57, " Progreso del Tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275template(58, MisTramitesComponent_div_32_div_58_Template, 15, 10, "div", 164);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 148)(60, "button", 149);
    \u0275\u0275listener("click", function MisTramitesComponent_div_32_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalDetalle());
    });
    \u0275\u0275text(61, " Cerrar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 165)(63, "button", 88);
    \u0275\u0275listener("click", function MisTramitesComponent_div_32_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? ctx_r1.handleDescargarTodoClick(ctx_r1.tramiteSeleccionado) : null);
    });
    \u0275\u0275element(64, "i", 89);
    \u0275\u0275text(65, " Descargar Todo ");
    \u0275\u0275template(66, MisTramitesComponent_div_32_span_66_Template, 2, 1, "span", 166);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.codigo);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.asunto);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.tipoTramite.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.getEstadoClaseCompleta(ctx_r1.tramiteSeleccionado));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoVisual(ctx_r1.tramiteSeleccionado).icono);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEstadoVisual(ctx_r1.tramiteSeleccionado).nombre, " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.getPrioridadClase(ctx_r1.tramiteSeleccionado.prioridad.nivel));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.prioridad.nombre, " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.formatearFecha(ctx_r1.tramiteSeleccionado.fechaCreacion));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.fechaVencimiento);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getDiasHabilesRestantes(ctx_r1.tramiteSeleccionado.fechaVencimiento) !== null);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.documentos && ctx_r1.tramiteSeleccionado.documentos.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.areaDestino && ctx_r1.isAdministrativo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mostrarFirmaDigitalEnDetalle(ctx_r1.tramiteSeleccionado));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getProgresoDetallado(ctx_r1.tramiteSeleccionado));
    \u0275\u0275advance(5);
    \u0275\u0275classMap("btn-info " + (ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? "disabled" : ""));
    \u0275\u0275property("disabled", ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado))("title", ctx_r1.estaVencido(ctx_r1.tramiteSeleccionado) ? "Tr\xE1mite finalizado - Descarga no disponible" : ctx_r1.tramiteSeleccionado.documentos && ctx_r1.tramiteSeleccionado.documentos.length > 0 ? "Descargar " + ctx_r1.tramiteSeleccionado.documentos.length + " documento(s)" : "Descargar documentos");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.documentos && ctx_r1.tramiteSeleccionado.documentos.length > 0);
  }
}
function MisTramitesComponent_div_33_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 212)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "C\xF3digo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.asunto);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.codigo, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.estado.nombre, "");
  }
}
function MisTramitesComponent_div_33_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "i", 48);
    \u0275\u0275text(2, " Cargando trabajadores disponibles... ");
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_33_div_17_div_1_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 225);
  }
  if (rf & 2) {
    const trabajador_r32 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", trabajador_r32.foto, \u0275\u0275sanitizeUrl)("alt", trabajador_r32.nombre);
  }
}
function MisTramitesComponent_div_33_div_17_div_1_i_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 226);
  }
}
function MisTramitesComponent_div_33_div_17_div_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 227);
    \u0275\u0275element(1, "i", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajador_r32 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Este trabajador cuenta con ", trabajador_r32.workloadCount, " documentos asignados por el d\xEDa, elige a otro ");
  }
}
function MisTramitesComponent_div_33_div_17_div_1_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 228);
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2, " Disponible ");
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_33_div_17_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 215);
    \u0275\u0275listener("click", function MisTramitesComponent_div_33_div_17_div_1_Template_div_click_0_listener() {
      const trabajador_r32 = \u0275\u0275restoreView(_r31).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.seleccionarTrabajador(trabajador_r32));
    });
    \u0275\u0275elementStart(1, "div", 216);
    \u0275\u0275template(2, MisTramitesComponent_div_33_div_17_div_1_img_2_Template, 1, 2, "img", 217)(3, MisTramitesComponent_div_33_div_17_div_1_i_3_Template, 1, 0, "i", 218);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 219)(5, "h4");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 100);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 220)(10, "span", 221);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 80);
    \u0275\u0275element(13, "div", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 222);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, MisTramitesComponent_div_33_div_17_div_1_div_17_Template, 3, 1, "div", 223)(18, MisTramitesComponent_div_33_div_17_div_1_div_18_Template, 3, 0, "div", 224);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trabajador_r32 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", (ctx_r1.trabajadorSeleccionado == null ? null : ctx_r1.trabajadorSeleccionado.id) === trabajador_r32.id)("disabled", trabajador_r32.workloadCount >= 5);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", trabajador_r32.foto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !trabajador_r32.foto);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", trabajador_r32.nombre, " ", trabajador_r32.apellidos, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((trabajador_r32.area == null ? null : trabajador_r32.area.nombre) || "Sin \xE1rea asignada");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", trabajador_r32.workloadCount, "/5 tr\xE1mites ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", trabajador_r32.workloadCount / 5 * 100, "%");
    \u0275\u0275classProp("warning", trabajador_r32.workloadCount >= 4)("danger", trabajador_r32.workloadCount >= 5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(16, 19, trabajador_r32.workloadCount / 5 * 100, "1.0-0"), "%");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", trabajador_r32.workloadCount >= 5);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", trabajador_r32.workloadCount < 5);
  }
}
function MisTramitesComponent_div_33_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 213);
    \u0275\u0275template(1, MisTramitesComponent_div_33_div_17_div_1_Template, 19, 22, "div", 214);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.trabajadoresDisponibles);
  }
}
function MisTramitesComponent_div_33_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 229)(1, "h3");
    \u0275\u0275text(2, "Observaciones (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 230);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_33_div_18_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r33);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.observacionesDerivacion, $event) || (ctx_r1.observacionesDerivacion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(4, "        ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.observacionesDerivacion);
  }
}
function MisTramitesComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275listener("click", function MisTramitesComponent_div_33_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalDerivacion());
    });
    \u0275\u0275elementStart(1, "div", 203);
    \u0275\u0275listener("click", function MisTramitesComponent_div_33_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r30);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 131)(3, "h2");
    \u0275\u0275element(4, "i", 110);
    \u0275\u0275text(5, " Derivar Tr\xE1mite ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 204);
    \u0275\u0275listener("click", function MisTramitesComponent_div_33_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalDerivacion());
    });
    \u0275\u0275element(7, "i", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 133);
    \u0275\u0275template(9, MisTramitesComponent_div_33_div_9_Template, 11, 3, "div", 205);
    \u0275\u0275elementStart(10, "div", 206)(11, "h3");
    \u0275\u0275text(12, "Seleccionar Trabajador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 207);
    \u0275\u0275element(14, "i", 147);
    \u0275\u0275text(15, " Haz clic en un trabajador para seleccionarlo. Si ya est\xE1 seleccionado, haz clic nuevamente para deseleccionarlo. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, MisTramitesComponent_div_33_div_16_Template, 3, 0, "div", 20)(17, MisTramitesComponent_div_33_div_17_Template, 2, 1, "div", 208);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, MisTramitesComponent_div_33_div_18_Template, 5, 1, "div", 209);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 148)(20, "button", 210);
    \u0275\u0275listener("click", function MisTramitesComponent_div_33_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalDerivacion());
    });
    \u0275\u0275element(21, "i", 46);
    \u0275\u0275text(22, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 211);
    \u0275\u0275listener("click", function MisTramitesComponent_div_33_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarDerivacion());
    });
    \u0275\u0275element(24, "i", 110);
    \u0275\u0275text(25, " Derivar Tr\xE1mite ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.cargandoTrabajadores);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.cargandoTrabajadores);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.trabajadorSeleccionado);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.trabajadorSeleccionado);
  }
}
function MisTramitesComponent_div_34_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 212)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "C\xF3digo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p")(8, "strong");
    \u0275\u0275text(9, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p")(12, "strong");
    \u0275\u0275text(13, "Tipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.asunto);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.codigo, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.estado.nombre, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.tipoTramite.nombre, "");
  }
}
function MisTramitesComponent_div_34_i_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 48);
  }
}
function MisTramitesComponent_div_34_i_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 231);
  }
}
function MisTramitesComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275listener("click", function MisTramitesComponent_div_34_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalRechazo());
    });
    \u0275\u0275elementStart(1, "div", 203);
    \u0275\u0275listener("click", function MisTramitesComponent_div_34_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r34);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 131)(3, "h2");
    \u0275\u0275element(4, "i", 231);
    \u0275\u0275text(5, " Rechazar Tr\xE1mite ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 204);
    \u0275\u0275listener("click", function MisTramitesComponent_div_34_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalRechazo());
    });
    \u0275\u0275element(7, "i", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 133);
    \u0275\u0275template(9, MisTramitesComponent_div_34_div_9_Template, 15, 4, "div", 205);
    \u0275\u0275elementStart(10, "div", 232)(11, "div", 233)(12, "label", 234);
    \u0275\u0275element(13, "i", 44);
    \u0275\u0275text(14, " Motivo del Rechazo * ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "textarea", 235);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_34_Template_textarea_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.motivoRechazo, $event) || (ctx_r1.motivoRechazo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(16, "          ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "small", 236);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 233)(20, "label", 237);
    \u0275\u0275element(21, "i", 238);
    \u0275\u0275text(22, " Observaciones Adicionales ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "textarea", 239);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_34_Template_textarea_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.observacionesRechazo, $event) || (ctx_r1.observacionesRechazo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(24, "          ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "small", 236);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 146);
    \u0275\u0275element(28, "i", 44);
    \u0275\u0275elementStart(29, "strong");
    \u0275\u0275text(30, "\xA1Atenci\xF3n!");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " Al rechazar este tr\xE1mite: ");
    \u0275\u0275elementStart(32, "ul")(33, "li");
    \u0275\u0275text(34, "Se enviar\xE1 una notificaci\xF3n autom\xE1tica por correo al usuario remitente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "li");
    \u0275\u0275text(36, 'El tr\xE1mite cambiar\xE1 su estado a "RECHAZADO"');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "li");
    \u0275\u0275text(38, "Se registrar\xE1 esta acci\xF3n en el historial del tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "li");
    \u0275\u0275text(40, "El usuario podr\xE1 presentar un nuevo tr\xE1mite corregido");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(41, "div", 148)(42, "button", 240);
    \u0275\u0275listener("click", function MisTramitesComponent_div_34_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalRechazo());
    });
    \u0275\u0275element(43, "i", 46);
    \u0275\u0275text(44, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 241);
    \u0275\u0275listener("click", function MisTramitesComponent_div_34_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r34);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarRechazo());
    });
    \u0275\u0275template(46, MisTramitesComponent_div_34_i_46_Template, 1, 0, "i", 242)(47, MisTramitesComponent_div_34_i_47_Template, 1, 0, "i", 243);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.motivoRechazo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.motivoRechazo.length, "/1000 caracteres");
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.observacionesRechazo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.observacionesRechazo.length, "/500 caracteres");
    \u0275\u0275advance(16);
    \u0275\u0275property("disabled", ctx_r1.cargandoRechazo);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.motivoRechazo.trim() || ctx_r1.cargandoRechazo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.cargandoRechazo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.cargandoRechazo);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.cargandoRechazo ? "Rechazando..." : "Rechazar Tr\xE1mite", " ");
  }
}
function MisTramitesComponent_div_36_div_38_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 276)(1, "div", 277);
    \u0275\u0275element(2, "i", 278);
    \u0275\u0275elementStart(3, "span", 174);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 279);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 280);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_div_38_div_5_Template_button_click_7_listener() {
      const documento_r37 = \u0275\u0275restoreView(_r36).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removerDocumento(documento_r37.id));
    });
    \u0275\u0275element(8, "i", 104);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const documento_r37 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(documento_r37.nombreOriginal || documento_r37.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearTamano(documento_r37.tamano));
  }
}
function MisTramitesComponent_div_36_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 170)(1, "h4");
    \u0275\u0275element(2, "i", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 274);
    \u0275\u0275template(5, MisTramitesComponent_div_36_div_38_div_5_Template, 9, 2, "div", 275);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Documentos Adjuntos (", ctx_r1.getDocumentosVisibles().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getDocumentosVisibles());
  }
}
function MisTramitesComponent_div_36_div_53_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 283)(1, "div", 284);
    \u0275\u0275element(2, "i", 285);
    \u0275\u0275elementStart(3, "span", 286);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 287);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 288);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_div_53_div_3_Template_button_click_7_listener() {
      const i_r40 = \u0275\u0275restoreView(_r39).index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removerArchivoNuevo(i_r40));
    });
    \u0275\u0275element(8, "i", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const archivo_r41 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(archivo_r41.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearTamano(archivo_r41.size));
  }
}
function MisTramitesComponent_div_36_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 281)(1, "h5");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, MisTramitesComponent_div_36_div_53_div_3_Template, 9, 2, "div", 282);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Archivos por subir (", ctx_r1.archivosNuevos.length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.archivosNuevos);
  }
}
function MisTramitesComponent_div_36_span_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 289);
    \u0275\u0275element(1, "i", 42);
    \u0275\u0275text(2, " Activa ");
    \u0275\u0275elementEnd();
  }
}
function MisTramitesComponent_div_36_div_66_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 293)(1, "span", 294);
    \u0275\u0275text(2, "Fecha de Firma:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 295);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r1.tramiteSeleccionado.fechaFirma, "dd/MM/yyyy HH:mm"));
  }
}
function MisTramitesComponent_div_36_div_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 290)(1, "div", 291);
    \u0275\u0275template(2, MisTramitesComponent_div_36_div_66_div_2_Template, 6, 4, "div", 292);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado.fechaFirma);
  }
}
function MisTramitesComponent_div_36_div_67_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 327);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r43 = ctx.$implicit;
    \u0275\u0275property("value", tipo_r43.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tipo_r43.label, " ");
  }
}
function MisTramitesComponent_div_36_div_67_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 327);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const departamento_r44 = ctx.$implicit;
    \u0275\u0275property("value", departamento_r44);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, departamento_r44), " ");
  }
}
function MisTramitesComponent_div_36_div_67_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 328);
    \u0275\u0275element(1, "i", 329);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Firma dibujada");
    \u0275\u0275elementEnd()();
  }
}
function MisTramitesComponent_div_36_div_67_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 330);
    \u0275\u0275element(1, "i", 177);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Firme aqu\xED");
    \u0275\u0275elementEnd()();
  }
}
function MisTramitesComponent_div_36_div_67_div_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 331)(1, "label");
    \u0275\u0275text(2, "Vista Previa de la Firma:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 332);
    \u0275\u0275element(4, "img", 333);
    \u0275\u0275elementStart(5, "div", 334)(6, "p")(7, "strong");
    \u0275\u0275text(8, "Tipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p")(11, "strong");
    \u0275\u0275text(12, "Motivo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p")(15, "strong");
    \u0275\u0275text(16, "Ubicaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", ctx_r1.editFirmaDigitalData, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editTipoFirma, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editRazonFirma, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editUbicacionFirma, "");
  }
}
function MisTramitesComponent_div_36_div_67_div_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 335)(1, "label", 336)(2, "input", 337);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_36_div_67_div_49_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r45);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editConsentimientoFirma, $event) || (ctx_r1.editConsentimientoFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 338);
    \u0275\u0275element(4, "i", 339);
    \u0275\u0275text(5, " Confirmo que he dibujado mi firma digital y acepto que esta nueva firma reemplace la anterior y sea utilizada para validar los cambios en este tr\xE1mite ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editConsentimientoFirma);
  }
}
function MisTramitesComponent_div_36_div_67_div_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 340)(1, "button", 341);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_div_67_div_50_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.mostrarEditConfirmationModal());
    });
    \u0275\u0275element(2, "i", 42);
    \u0275\u0275text(3, " Confirmar Nueva Firma Digital ");
    \u0275\u0275elementEnd()();
  }
}
function MisTramitesComponent_div_36_div_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 296)(1, "div", 233)(2, "label", 297);
    \u0275\u0275element(3, "i", 298);
    \u0275\u0275text(4, " Tipo de Firma Digital * ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 299);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_36_div_67_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editTipoFirma, $event) || (ctx_r1.editTipoFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(6, MisTramitesComponent_div_36_div_67_option_6_Template, 2, 2, "option", 300);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 233)(8, "label", 301);
    \u0275\u0275element(9, "i", 302);
    \u0275\u0275text(10, " Motivo de la Firma * ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 303);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_36_div_67_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editRazonFirma, $event) || (ctx_r1.editRazonFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "small", 304);
    \u0275\u0275text(13, "Especifique el motivo por el cual est\xE1 firmando digitalmente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 233)(15, "label", 305);
    \u0275\u0275element(16, "i", 306);
    \u0275\u0275text(17, " Ubicaci\xF3n * ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 307);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_36_div_67_Template_select_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editUbicacionFirma, $event) || (ctx_r1.editUbicacionFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(19, "option", 308);
    \u0275\u0275text(20, "Seleccione un departamento");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, MisTramitesComponent_div_36_div_67_option_21_Template, 3, 4, "option", 300);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "small", 304);
    \u0275\u0275text(23, "Seleccione el departamento donde se encuentra firmando");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 309)(25, "div", 310)(26, "label", 311);
    \u0275\u0275element(27, "i", 312);
    \u0275\u0275text(28, " Dibuje su Firma Digital * ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, MisTramitesComponent_div_36_div_67_div_29_Template, 4, 0, "div", 313);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 314)(31, "div", 315);
    \u0275\u0275element(32, "canvas", 316, 1);
    \u0275\u0275template(34, MisTramitesComponent_div_36_div_67_div_34_Template, 4, 0, "div", 317);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 318)(36, "button", 319);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_div_67_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editClearCanvas());
    });
    \u0275\u0275element(37, "i", 320);
    \u0275\u0275elementStart(38, "span");
    \u0275\u0275text(39, "Limpiar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "button", 321);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_div_67_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editCaptureSignature());
    });
    \u0275\u0275element(41, "i", 322);
    \u0275\u0275elementStart(42, "span");
    \u0275\u0275text(43, "Capturar Firma");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 323);
    \u0275\u0275element(45, "i", 147);
    \u0275\u0275elementStart(46, "span");
    \u0275\u0275text(47, 'Dibuje su firma usando el mouse (escritorio) o dedo (m\xF3vil). Luego presione "Capturar Firma".');
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(48, MisTramitesComponent_div_36_div_67_div_48_Template, 18, 4, "div", 324)(49, MisTramitesComponent_div_36_div_67_div_49_Template, 6, 1, "div", 325)(50, MisTramitesComponent_div_36_div_67_div_50_Template, 4, 0, "div", 326);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editTipoFirma);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.tiposFirmaEdit);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editRazonFirma);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editUbicacionFirma);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.departamentosPeruEdit);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.editSignatureExists);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("has-signature", ctx_r1.editSignatureExists);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.editSignatureExists);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.editSignatureExists);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.editSignatureExists);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.editFirmaDigitalData);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editFirmaDigitalData);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editFirmaDigitalData && ctx_r1.editConsentimientoFirma);
  }
}
function MisTramitesComponent_div_36_div_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 342)(1, "div", 343);
    \u0275\u0275element(2, "i", 147);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Este tr\xE1mite no tiene firma digital. Puede activar la opci\xF3n arriba para crear una nueva firma.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 344);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_div_68_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r47);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleEditarFirmaDigital());
    });
    \u0275\u0275element(6, "i", 31);
    \u0275\u0275text(7, " Crear Firma Digital ");
    \u0275\u0275elementEnd()()();
  }
}
function MisTramitesComponent_div_36_i_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 48);
  }
}
function MisTramitesComponent_div_36_i_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 345);
  }
}
function MisTramitesComponent_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalEditar());
    });
    \u0275\u0275elementStart(1, "div", 203);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r35);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 131)(3, "h2");
    \u0275\u0275element(4, "i", 102);
    \u0275\u0275text(5, " Editar Tr\xE1mite ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 204);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalEditar());
    });
    \u0275\u0275element(7, "i", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 133)(9, "div", 212)(10, "h3");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p")(13, "strong");
    \u0275\u0275text(14, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 244);
    \u0275\u0275element(17, "i", 147);
    \u0275\u0275text(18, " Todos los campos son opcionales. Solo complete los que desea modificar. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "form", 245)(20, "div", 233)(21, "label", 246);
    \u0275\u0275element(22, "i", 168);
    \u0275\u0275text(23, " Descripci\xF3n Detallada ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "textarea", 247);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_36_Template_textarea_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formEditar.descripcion, $event) || (ctx_r1.formEditar.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(25, "          ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "small", 236);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 233)(29, "label", 248);
    \u0275\u0275element(30, "i", 238);
    \u0275\u0275text(31, " Observaciones Adicionales ");
    \u0275\u0275elementStart(32, "span", 249);
    \u0275\u0275text(33, "Opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "textarea", 250);
    \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_div_36_Template_textarea_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formEditar.observaciones, $event) || (ctx_r1.formEditar.observaciones = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(35, "          ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "small", 236);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, MisTramitesComponent_div_36_div_38_Template, 6, 2, "div", 159);
    \u0275\u0275elementStart(39, "div", 251)(40, "h4");
    \u0275\u0275element(41, "i", 252);
    \u0275\u0275text(42, " Agregar Nuevos Documentos ");
    \u0275\u0275elementStart(43, "span", 249);
    \u0275\u0275text(44, "Opcional");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 253);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_Template_div_click_45_listener() {
      \u0275\u0275restoreView(_r35);
      const fileInput_r38 = \u0275\u0275reference(52);
      return \u0275\u0275resetView(fileInput_r38.click());
    })("dragover", function MisTramitesComponent_div_36_Template_div_dragover_45_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragOver($event));
    })("dragleave", function MisTramitesComponent_div_36_Template_div_dragleave_45_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragLeave($event));
    })("drop", function MisTramitesComponent_div_36_Template_div_drop_45_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDrop($event));
    });
    \u0275\u0275element(46, "i", 254);
    \u0275\u0275elementStart(47, "p", 255);
    \u0275\u0275text(48, "Haga clic o arrastre archivos aqu\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p", 256);
    \u0275\u0275text(50, "PDF, DOC, DOCX, (Max. 10MB)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "input", 257, 0);
    \u0275\u0275listener("change", function MisTramitesComponent_div_36_Template_input_change_51_listener($event) {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(53, MisTramitesComponent_div_36_div_53_Template, 4, 2, "div", 258);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 176)(55, "div", 259)(56, "div", 260)(57, "h4");
    \u0275\u0275element(58, "i", 177);
    \u0275\u0275text(59, " Firma Digital ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(60, MisTramitesComponent_div_36_span_60_Template, 3, 0, "span", 261);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 262)(62, "button", 263);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_Template_button_click_62_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEditarFirmaDigital());
    });
    \u0275\u0275element(63, "i", 264);
    \u0275\u0275elementStart(64, "span");
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(66, MisTramitesComponent_div_36_div_66_Template, 3, 1, "div", 265)(67, MisTramitesComponent_div_36_div_67_Template, 51, 14, "div", 266)(68, MisTramitesComponent_div_36_div_68_Template, 8, 0, "div", 267);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 268)(70, "div", 269);
    \u0275\u0275element(71, "i", 270);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div", 271)(73, "strong");
    \u0275\u0275text(74, "Notificaci\xF3n autom\xE1tica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "p");
    \u0275\u0275text(76, "Se enviar\xE1 un correo electr\xF3nico confirmando los cambios realizados.");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(77, "div", 148)(78, "button", 240);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_Template_button_click_78_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarModalEditar());
    });
    \u0275\u0275element(79, "i", 46);
    \u0275\u0275text(80, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "button", 272);
    \u0275\u0275listener("click", function MisTramitesComponent_div_36_Template_button_click_81_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.guardarEdicion());
    });
    \u0275\u0275template(82, MisTramitesComponent_div_36_i_82_Template, 1, 0, "i", 242)(83, MisTramitesComponent_div_36_i_83_Template, 1, 0, "i", 273);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.tramiteSeleccionado.codigo);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteSeleccionado.estado.nombre, "");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formEditar.descripcion);
    \u0275\u0275property("name", "editDescripcion");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (ctx_r1.formEditar.descripcion || "").length, "/1000 caracteres");
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formEditar.observaciones);
    \u0275\u0275property("name", "editObservaciones");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (ctx_r1.formEditar.observaciones || "").length, "/500 caracteres");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getDocumentosVisibles().length > 0);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngIf", ctx_r1.archivosNuevos.length > 0);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.tramiteSeleccionado == null ? null : ctx_r1.tramiteSeleccionado.firmaDigitalActiva);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.editarFirmaDigital);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.editarFirmaDigital ? "fa-times" : "fa-edit");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.editarFirmaDigital ? "Cancelar Edici\xF3n" : "Editar/Crear Firma");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r1.tramiteSeleccionado == null ? null : ctx_r1.tramiteSeleccionado.firmaDigitalActiva) && !ctx_r1.editarFirmaDigital);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editarFirmaDigital || !(ctx_r1.tramiteSeleccionado == null ? null : ctx_r1.tramiteSeleccionado.firmaDigitalActiva));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r1.tramiteSeleccionado == null ? null : ctx_r1.tramiteSeleccionado.firmaDigitalActiva) && !ctx_r1.editarFirmaDigital);
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", ctx_r1.guardandoEdicion);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.guardandoEdicion || !ctx_r1.puedeGuardarFormulario);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.guardandoEdicion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.guardandoEdicion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.guardandoEdicion ? "Guardando..." : "Guardar Cambios", " ");
  }
}
function MisTramitesComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 346)(1, "div", 347);
    \u0275\u0275listener("click", function MisTramitesComponent_div_37_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r48);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 348)(3, "div", 349);
    \u0275\u0275element(4, "i", 185);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "Confirmaci\xF3n de Firma Digital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Nueva firma para modificaci\xF3n de tr\xE1mite");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 350)(10, "div", 351)(11, "h3");
    \u0275\u0275element(12, "i", 352);
    \u0275\u0275text(13, " Declaraci\xF3n de Responsabilidad ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 353)(15, "ul", 354)(16, "li");
    \u0275\u0275element(17, "i", 42);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Declaro que soy el titular leg\xEDtimo de esta firma digital y tengo plena autoridad para utilizarla en este tr\xE1mite");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "li");
    \u0275\u0275element(21, "i", 42);
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "Confirmo que todos los datos proporcionados en este tr\xE1mite son veraces y exactos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "li");
    \u0275\u0275element(25, "i", 42);
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27, "Acepto la responsabilidad legal de las modificaciones realizadas en este documento");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "li");
    \u0275\u0275element(29, "i", 42);
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "Esta nueva firma digital reemplazar\xE1 completamente la firma anterior del tr\xE1mite");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(32, "div", 355)(33, "h4");
    \u0275\u0275element(34, "i", 356);
    \u0275\u0275text(35, " T\xE9rminos y Condiciones de Firma Digital ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 357)(37, "div", 358)(38, "div", 359);
    \u0275\u0275element(39, "i", 339);
    \u0275\u0275elementStart(40, "div", 360)(41, "strong");
    \u0275\u0275text(42, "Validez Legal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span");
    \u0275\u0275text(44, "La firma digital tiene validez legal equivalente a la firma manuscrita");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 359);
    \u0275\u0275element(46, "i", 361);
    \u0275\u0275elementStart(47, "div", 360)(48, "strong");
    \u0275\u0275text(49, "Seguridad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "span");
    \u0275\u0275text(51, "Su firma ser\xE1 protegida con tecnolog\xEDa de encriptaci\xF3n avanzada");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 359);
    \u0275\u0275element(53, "i", 362);
    \u0275\u0275elementStart(54, "div", 360)(55, "strong");
    \u0275\u0275text(56, "Conservaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span");
    \u0275\u0275text(58, "El documento firmado se conservar\xE1 de manera permanente en nuestros sistemas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(59, "div", 359);
    \u0275\u0275element(60, "i", 102);
    \u0275\u0275elementStart(61, "div", 360)(62, "strong");
    \u0275\u0275text(63, "Modificaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "span");
    \u0275\u0275text(65, "Esta nueva firma reemplazar\xE1 la firma anterior y se aplicar\xE1 a los cambios realizados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "div", 359);
    \u0275\u0275element(67, "i", 40);
    \u0275\u0275elementStart(68, "div", 360)(69, "strong");
    \u0275\u0275text(70, "Registro Temporal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "span");
    \u0275\u0275text(72, "Se registrar\xE1 la fecha y hora exacta de esta nueva firma digital");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(73, "div", 359);
    \u0275\u0275element(74, "i", 363);
    \u0275\u0275elementStart(75, "div", 360)(76, "strong");
    \u0275\u0275text(77, "No Repudio:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "span");
    \u0275\u0275text(79, "Una vez firmado, no podr\xE1 negar la autor\xEDa del documento");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(80, "div", 364)(81, "div", 365);
    \u0275\u0275element(82, "i", 44);
    \u0275\u0275elementStart(83, "h4");
    \u0275\u0275text(84, "\xA1Importante! - Responsabilidades Legales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 366)(86, "p")(87, "strong");
    \u0275\u0275text(88, "Al firmar digitalmente este documento, usted est\xE1:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "ul", 367)(90, "li");
    \u0275\u0275text(91, "Asumiendo plena responsabilidad por el contenido modificado del tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "li");
    \u0275\u0275text(93, "Confirmando que tiene autoridad para realizar estos cambios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "li");
    \u0275\u0275text(95, "Aceptando que esta firma tendr\xE1 validez legal completa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "li");
    \u0275\u0275text(97, "Entendiendo que la firma anterior ser\xE1 reemplazada permanentemente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "div", 368);
    \u0275\u0275element(99, "i", 147);
    \u0275\u0275elementStart(100, "span");
    \u0275\u0275text(101, "Esta acci\xF3n es irreversible y tiene implicaciones legales importantes");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(102, "div", 369)(103, "h4");
    \u0275\u0275element(104, "i", 370);
    \u0275\u0275text(105, " Resumen de la Nueva Firma ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "div", 371)(107, "div", 372)(108, "span", 373);
    \u0275\u0275text(109, "Tipo de Firma:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(110, "span", 374);
    \u0275\u0275text(111);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(112, "div", 372)(113, "span", 373);
    \u0275\u0275text(114, "Motivo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "span", 374);
    \u0275\u0275text(116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(117, "div", 372)(118, "span", 373);
    \u0275\u0275text(119, "Ubicaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "span", 374);
    \u0275\u0275text(121);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(122, "div", 375)(123, "button", 376);
    \u0275\u0275listener("click", function MisTramitesComponent_div_37_Template_button_click_123_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarEditConfirmationModal());
    });
    \u0275\u0275element(124, "i", 46);
    \u0275\u0275text(125, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "button", 377);
    \u0275\u0275listener("click", function MisTramitesComponent_div_37_Template_button_click_126_listener() {
      \u0275\u0275restoreView(_r48);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarEditFirmaDigital());
    });
    \u0275\u0275element(127, "i", 378);
    \u0275\u0275text(128, " Acepto y Deseo Firmar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(111);
    \u0275\u0275textInterpolate(ctx_r1.editTipoFirma);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.editRazonFirma);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.editUbicacionFirma);
  }
}
function MisTramitesComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 379);
    \u0275\u0275listener("click", function MisTramitesComponent_div_38_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarEliminacion());
    });
    \u0275\u0275elementStart(1, "div", 380);
    \u0275\u0275listener("click", function MisTramitesComponent_div_38_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r49);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 381)(3, "div", 382);
    \u0275\u0275element(4, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6, "Eliminar Tr\xE1mite");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 383)(8, "p", 384);
    \u0275\u0275text(9, "\xBFEst\xE1 seguro de eliminar el tr\xE1mite ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 385);
    \u0275\u0275text(14, "Esta acci\xF3n no se puede deshacer.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 386)(16, "button", 387);
    \u0275\u0275listener("click", function MisTramitesComponent_div_38_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelarEliminacion());
    });
    \u0275\u0275element(17, "i", 46);
    \u0275\u0275text(18, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 388);
    \u0275\u0275listener("click", function MisTramitesComponent_div_38_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmarEliminacion());
    });
    \u0275\u0275element(20, "i", 104);
    \u0275\u0275text(21, " Eliminar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.tramiteParaEliminar == null ? null : ctx_r1.tramiteParaEliminar.codigo);
  }
}
var MisTramitesComponent = class _MisTramitesComponent {
  constructor(misTramitesService, bandejaTramitesService, tramiteService, toastService, authService, firmaDigitalService, route, cdr) {
    this.misTramitesService = misTramitesService;
    this.bandejaTramitesService = bandejaTramitesService;
    this.tramiteService = tramiteService;
    this.toastService = toastService;
    this.authService = authService;
    this.firmaDigitalService = firmaDigitalService;
    this.route = route;
    this.misTramites = [];
    this.estadisticas = null;
    this.loading$ = this.misTramitesService.loading$;
    this.tramitePermisos = /* @__PURE__ */ new Map();
    this.currentPage = 1;
    this.pageSize = 12;
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
    this.vistaActual = "tarjetas";
    this.showNuevoTramiteModal = false;
    this.showDetalleTramiteModal = false;
    this.showEditarTramiteModal = false;
    this.showAprobarModal = false;
    this.showResponderTramiteModal = false;
    this.tramiteSeleccionado = null;
    this.modoEdicion = false;
    this.tramiteParaEditar = null;
    this.subscriptions = new Subscription();
    this.mostrarModalDerivacion = false;
    this.trabajadoresDisponibles = [];
    this.trabajadorSeleccionado = null;
    this.observacionesDerivacion = "";
    this.cargandoTrabajadores = false;
    this.mostrarModalRechazo = false;
    this.motivoRechazo = "";
    this.observacionesRechazo = "";
    this.cargandoRechazo = false;
    this.guardandoEdicion = false;
    this.formEditar = {};
    this.archivosNuevos = [];
    this.documentosAEliminar = [];
    this.editIsDrawing = false;
    this.editStartX = 0;
    this.editStartY = 0;
    this.editarFirmaDigital = false;
    this.editTipoFirma = TipoFirma.CONFORMIDAD;
    this.editRazonFirma = "";
    this.editUbicacionFirma = "";
    this.editFirmaDigitalData = null;
    this.editSignatureExists = false;
    this.editConsentimientoFirma = false;
    this.showEditConfirmationModal = false;
    this.tiposFirmaEdit = [
      { value: TipoFirma.CONFORMIDAD, label: "Conformidad" },
      { value: TipoFirma.APROBACION, label: "Aprobaci\xF3n" },
      { value: TipoFirma.REVISION, label: "Revisi\xF3n" },
      { value: TipoFirma.SIMPLE, label: "Simple" }
    ];
    this.departamentosPeruEdit = [
      "AMAZONAS",
      "ANCASH",
      "APURIMAC",
      "AREQUIPA",
      "AYACUCHO",
      "CAJAMARCA",
      "CALLAO",
      "CUSCO",
      "HUANCAVELICA",
      "HUANUCO",
      "ICA",
      "JUNIN",
      "LA_LIBERTAD",
      "LAMBAYEQUE",
      "LIMA",
      "LORETO",
      "MADRE_DE_DIOS",
      "MOQUEGUA",
      "PASCO",
      "PIURA",
      "PUNO",
      "SAN_MARTIN",
      "TACNA",
      "TUMBES",
      "UCAYALI"
    ];
    this.firmaDigitalDetallada = null;
    this.showDeleteConfirmModal = false;
    this.tramiteParaEliminar = null;
    this.cdr = cdr;
  }
  get userRole() {
    return this.authService.currentUserValue?.role?.name || "";
  }
  get isAdministrativo() {
    return this.userRole === "administrativo";
  }
  get isUsuario() {
    return this.userRole === "usuario";
  }
  get shouldShowCreateButton() {
    return this.authService.hasRole("usuario");
  }
  get canProcessTramites() {
    return this.isAdministrativo;
  }
  get canCreateAdvancedTramites() {
    return this.isAdministrativo;
  }
  ngOnInit() {
    this.setupSearch();
    this.cargarMisTramites();
    this.cargarEstadisticas();
    this.subscriptions.add(this.route.queryParams.subscribe((params) => {
      const tramiteId = params["tramiteId"];
      const action = params["action"];
      if (tramiteId) {
        const id = parseInt(tramiteId);
        this.buscarYMostrarTramite(id, action);
      }
    }));
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  setupSearch() {
    this.subscriptions.add(this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.performSearch(term);
    }));
  }
  cargarMisTramites() {
    this.subscriptions.add(this.misTramitesService.getMisTramites(this.currentPage, this.pageSize, {}).subscribe({
      next: (response) => {
        response.data.forEach((tramite) => {
        });
        this.misTramites = response.data;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        if (this.isAdministrativo) {
          this.cargarPermisosParaTramites();
        }
        this.applyDynamicFilters();
        if (!this.isAdministrativo) {
          this.calcularEstadisticasLocales();
        }
      },
      error: (error) => {
      }
    }));
  }
  cargarEstadisticas() {
    this.subscriptions.add(this.misTramitesService.getEstadisticas().subscribe((estadisticas) => {
      this.calcularEstadisticasLocales();
    }));
  }
  calcularEstadisticasLocales() {
    if (!this.misTramites || this.misTramites.length === 0 || !this.estadisticas) {
      return;
    }
    let completados = 0;
    let enRevision = 0;
    let aprobado = 0;
    let derivado = 0;
    let observados = 0;
    let borrador = 0;
    let enviado = 0;
    this.misTramites.forEach((tramite) => {
      const estado = tramite.estado?.nombre || "";
      const isVencido = this.estaVencido(tramite);
      if (isVencido) {
        completados++;
      } else if (["Finalizado", "Archivado", "Cancelado", "Dado de Baja"].includes(estado)) {
        completados++;
      } else if (["Observado", "Rechazado"].includes(estado)) {
        observados++;
      } else if (["En Revisi\xF3n"].includes(estado)) {
        enRevision++;
      } else if (["Enviado"].includes(estado)) {
        enviado++;
      } else if (["Aprobado"].includes(estado)) {
        aprobado++;
      } else if (["Derivado"].includes(estado)) {
        derivado++;
      } else if (["Borrador"].includes(estado)) {
        borrador++;
      }
    });
    this.estadisticas = __spreadProps(__spreadValues({}, this.estadisticas), {
      finalizado: completados,
      enRevision,
      aprobado,
      derivado,
      observado: observados,
      borrador,
      enviado
    });
    const tramitesVencidos = this.misTramites.filter((t) => this.estaVencido(t));
  }
  cargarPermisosParaTramites() {
    if (!this.isAdministrativo || this.misTramites.length === 0) {
      return;
    }
    let permisosCompletados = 0;
    const totalTramites = this.misTramites.length;
    this.misTramites.forEach((tramite) => {
      this.subscriptions.add(this.bandejaTramitesService.verificarPermisosAcciones(tramite.id).subscribe({
        next: (permisos) => {
          this.tramitePermisos.set(tramite.id, permisos);
          permisosCompletados++;
          if (permisosCompletados === totalTramites) {
            this.calcularEstadisticasLocales();
          }
        },
        error: (error) => {
          permisosCompletados++;
          if (permisosCompletados === totalTramites) {
            this.calcularEstadisticasLocales();
          }
        }
      }));
    });
  }
  onSearch(term) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }
  performSearch(term) {
    this.isSearching = true;
    this.searchError = "";
    this.selectedSearchIndex = -1;
    if (!term.trim()) {
      this.resetSearch();
      this.applyDynamicFilters();
      return;
    }
    this.searchResults = this.misTramites.filter((tramite) => this.matchesSearchTerm(tramite, term));
    if (this.searchResults.length > 0) {
      this.showSearchDropdown = true;
    } else {
      this.showSearchDropdown = false;
    }
    this.applyDynamicFilters();
    this.isSearching = false;
  }
  matchesSearchTerm(tramite, term) {
    const searchTerm = term.toLowerCase();
    return !!(tramite.codigo?.toLowerCase().includes(searchTerm) || tramite.asunto?.toLowerCase().includes(searchTerm) || tramite.tipoTramite?.nombre?.toLowerCase().includes(searchTerm) || tramite.estado?.nombre?.toLowerCase().includes(searchTerm) || tramite.descripcion?.toLowerCase().includes(searchTerm) || tramite.trabajadorAsignado?.nombre?.toLowerCase().includes(searchTerm) || tramite.trabajadorAsignado?.apellidos?.toLowerCase().includes(searchTerm) || tramite.areaDestino?.nombre?.toLowerCase().includes(searchTerm));
  }
  resetSearch() {
    this.searchResults = [];
    this.showSearchDropdown = false;
    this.searchError = "";
    this.isSearching = false;
  }
  selectSearchResult(tramite) {
    this.searchTerm = tramite.codigo;
    this.showSearchDropdown = false;
    this.applyDynamicFilters();
  }
  clearSearch() {
    this.searchTerm = "";
    this.resetSearch();
    this.applyDynamicFilters();
  }
  onSearchKeydown(event) {
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
        break;
    }
  }
  onSearchBlur() {
    setTimeout(() => {
      this.showSearchDropdown = false;
    }, 150);
  }
  applyDynamicFilters() {
    let filtered = [...this.misTramites];
    if (this.searchTerm) {
      filtered = filtered.filter((tramite) => this.matchesSearchTerm(tramite, this.searchTerm));
    }
    filtered = this.sortTramitesByPriority(filtered);
    this.filteredTramites = filtered;
  }
  sortTramitesByPriority(tramites) {
    return tramites.sort((a, b) => {
      const priorityA = this.getTramitePriority(a);
      const priorityB = this.getTramitePriority(b);
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      if (!this.estaVencido(a) && !this.estaVencido(b)) {
        const urgenciaA = a.prioridad?.nivel || 0;
        const urgenciaB = b.prioridad?.nivel || 0;
        if (urgenciaA !== urgenciaB) {
          return urgenciaB - urgenciaA;
        }
      }
      const fechaA = new Date(a.fechaCreacion).getTime();
      const fechaB = new Date(b.fechaCreacion).getTime();
      return fechaB - fechaA;
    });
  }
  getTramitePriority(tramite) {
    const estado = tramite.estado?.nombre || "";
    const isVencido = this.estaVencido(tramite);
    if (!isVencido && tramite.prioridad?.nivel >= 4) {
      if (["En Revisi\xF3n", "Enviado"].includes(estado))
        return 1;
      if (["Aprobado", "Derivado"].includes(estado))
        return 2;
    }
    if (!isVencido && ["En Revisi\xF3n", "Enviado"].includes(estado)) {
      return 3;
    }
    if (!isVencido && ["Aprobado", "Derivado"].includes(estado)) {
      return 4;
    }
    if (!isVencido && ["Observado", "Rechazado"].includes(estado)) {
      return 5;
    }
    if (!isVencido && ["Borrador"].includes(estado)) {
      return 6;
    }
    if (["Finalizado", "Archivado"].includes(estado)) {
      return 7;
    }
    if (isVencido || ["Dado de Baja", "Cancelado"].includes(estado)) {
      return 8;
    }
    return 9;
  }
  cambiarPagina(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cargarMisTramites();
    }
  }
  toggleVista() {
    this.vistaActual = this.vistaActual === "tarjetas" ? "lista" : "tarjetas";
  }
  crearNuevoTramite() {
    this.modoEdicion = false;
    this.tramiteParaEditar = null;
    this.showNuevoTramiteModal = true;
  }
  cerrarModalNuevoTramite() {
    this.showNuevoTramiteModal = false;
    this.modoEdicion = false;
    this.tramiteParaEditar = null;
  }
  onTramiteCreado(nuevoTramite) {
    this.cargarMisTramites();
    this.cerrarModalNuevoTramite();
  }
  onTramiteActualizado(tramiteActualizado) {
    const index = this.misTramites.findIndex((t) => t.id === tramiteActualizado.id);
    if (index !== -1) {
      this.misTramites[index] = __spreadValues(__spreadValues({}, this.misTramites[index]), tramiteActualizado);
      this.filteredTramites = [...this.misTramites];
    }
    this.cerrarModalNuevoTramite();
  }
  verDetalle(tramite) {
    this.subscriptions.add(this.misTramitesService.getMiTramiteById(tramite.id).subscribe({
      next: (tramiteCompleto) => {
        this.tramiteSeleccionado = tramiteCompleto;
        this.showDetalleTramiteModal = true;
      },
      error: (error) => {
        this.tramiteSeleccionado = tramite;
        this.showDetalleTramiteModal = true;
      }
    }));
  }
  puedeEditarTramite(tramite) {
    if (this.userRole !== "usuario") {
      return false;
    }
    if (this.estaVencido(tramite)) {
      return false;
    }
    const estadosNoEditables = ["Finalizado", "Rechazado", "Archivado", "FINALIZADO", "RECHAZADO", "ARCHIVADO"];
    return !estadosNoEditables.includes(tramite.estado?.nombre);
  }
  editarTramite(tramite) {
    if (!this.puedeEditarTramite(tramite)) {
      this.toastService.warning("Acci\xF3n no permitida", "Este tr\xE1mite no se puede editar en su estado actual.");
      return;
    }
    this.modoEdicion = true;
    this.tramiteParaEditar = tramite;
    this.showNuevoTramiteModal = true;
  }
  abrirModalConDatosOriginales(tramite) {
    this.tramiteSeleccionado = tramite;
    this.formEditar = {
      descripcion: tramite.descripcion,
      observaciones: tramite.observaciones || ""
    };
    this.archivosNuevos = [];
    this.documentosAEliminar = [];
    this.showEditarTramiteModal = true;
  }
  hayCambiosEnFormulario() {
    if (!this.tramiteSeleccionado)
      return false;
    const hayCambiosTexto = this.formEditar.descripcion !== this.tramiteSeleccionado.descripcion || this.formEditar.observaciones !== (this.tramiteSeleccionado.observaciones || "");
    const hayCambiosDocumentos = this.archivosNuevos.length > 0 || this.documentosAEliminar.length > 0;
    const hayNuevaFirmaDigital = this.editarFirmaDigital && !!this.editFirmaDigitalData && this.editConsentimientoFirma && !!this.editRazonFirma?.trim() && !!this.editUbicacionFirma?.trim();
    return hayCambiosTexto || hayCambiosDocumentos || hayNuevaFirmaDigital;
  }
  puedeGuardarFormulario() {
    if (!this.tramiteSeleccionado)
      return false;
    if (!this.hayCambiosEnFormulario())
      return false;
    if (!this.puedeEditarTramite(this.tramiteSeleccionado))
      return false;
    if (this.editarFirmaDigital) {
      if (this.editFirmaDigitalData) {
        const firmaCompletaParaEnvio = this.editConsentimientoFirma && !!this.editRazonFirma?.trim() && !!this.editUbicacionFirma?.trim();
        if (!firmaCompletaParaEnvio) {
          return false;
        }
      }
    }
    if (this.guardandoEdicion)
      return false;
    return true;
  }
  guardarEdicion() {
    if (!this.tramiteSeleccionado || !this.hayCambiosEnFormulario()) {
      return;
    }
    if (this.guardandoEdicion) {
      return;
    }
    this.guardandoEdicion = true;
    const formData = new FormData();
    if (this.formEditar.descripcion !== this.tramiteSeleccionado.descripcion) {
      formData.append("descripcion", this.formEditar.descripcion || "");
    }
    if (this.formEditar.observaciones !== (this.tramiteSeleccionado.observaciones || "")) {
      formData.append("observaciones", this.formEditar.observaciones || "");
    }
    this.archivosNuevos.forEach((archivo) => {
      formData.append("documentosNuevos", archivo, archivo.name);
    });
    if (this.documentosAEliminar.length > 0) {
      formData.append("documentosAEliminar", JSON.stringify(this.documentosAEliminar));
    }
    if (this.editarFirmaDigital) {
      const hayDatosFirma = !!this.editRazonFirma?.trim() || !!this.editUbicacionFirma?.trim() || !!this.editFirmaDigitalData || this.editConsentimientoFirma || this.editTipoFirma !== TipoFirma.CONFORMIDAD;
      if (hayDatosFirma) {
        const firmaDigitalData = {
          tipoFirma: this.editTipoFirma,
          razonFirma: this.editRazonFirma?.trim() || null,
          ubicacionFirma: this.editUbicacionFirma?.trim() || null,
          firmaDigitalData: this.editFirmaDigitalData || null,
          consentimientoFirma: this.editConsentimientoFirma,
          fechaFirma: this.editFirmaDigitalData ? (/* @__PURE__ */ new Date()).toISOString() : null
        };
        formData.append("firmaDigital", JSON.stringify(firmaDigitalData));
        this.toastService.info("Datos de firma incluidos", "Los campos de firma digital ser\xE1n guardados junto con los cambios del tr\xE1mite");
      } else {
      }
    }
    this.subscriptions.add(this.tramiteService.editarTramiteUsuario(this.tramiteSeleccionado.id, formData).subscribe({
      next: (response) => {
        this.guardandoEdicion = false;
        this.toastService.success("Tr\xE1mite actualizado", "Los cambios han sido guardados exitosamente.");
        this.cargarMisTramites();
        this.cargarEstadisticas();
        const tramiteId = this.tramiteSeleccionado?.id;
        const detalleAbierto = this.showDetalleTramiteModal;
        this.cerrarModalEditar();
        if (detalleAbierto && typeof tramiteId === "number") {
          this.recargarYMostrarDetalle(tramiteId);
        }
      },
      error: (error) => {
        this.guardandoEdicion = false;
        this.toastService.error("Error al guardar", "No se pudieron guardar los cambios. Intente nuevamente.");
      }
    }));
  }
  getDocumentosVisibles() {
    if (!this.tramiteSeleccionado?.documentos) {
      return [];
    }
    return this.tramiteSeleccionado.documentos.filter((doc) => !this.documentosAEliminar.includes(doc.id));
  }
  removerDocumento(documentoId) {
    if (!this.documentosAEliminar.includes(documentoId)) {
      this.documentosAEliminar.push(documentoId);
      this.toastService.success("Documento eliminado", "El documento ha sido eliminado de la lista");
    }
  }
  onFileSelected(event) {
    const files = event.target.files;
    this.procesarArchivos(files);
  }
  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add("drag-over");
  }
  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove("drag-over");
  }
  onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove("drag-over");
    const files = event.dataTransfer?.files;
    if (files) {
      this.procesarArchivos(files);
    }
  }
  procesarArchivos(files) {
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png"
    ];
    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        this.toastService.error("Archivo muy grande", `${file.name} excede el tama\xF1o m\xE1ximo de 10MB`);
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        this.toastService.error("Tipo no permitido", `${file.name} no es un tipo de archivo permitido`);
        return;
      }
      this.archivosNuevos.push(file);
      this.toastService.success("Archivo agregado", `${file.name} se agregar\xE1 al guardar`);
    });
  }
  removerArchivoNuevo(index) {
    const archivo = this.archivosNuevos[index];
    this.archivosNuevos.splice(index, 1);
    this.toastService.info("Archivo removido", `${archivo.name} ha sido removido`);
  }
  formatearTamano(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }
  descargarDocumento(tramiteId, nombreArchivo) {
    if (this.userRole === "ESTUDIANTE") {
      this.toastService.warning("Acci\xF3n no permitida", "Los estudiantes no pueden descargar documentos de tr\xE1mites");
      return;
    }
    this.subscriptions.add(this.misTramitesService.descargarDocumento(tramiteId, nombreArchivo).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = nombreArchivo;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.toastService.error("Error", "No se pudo descargar el documento");
      }
    }));
  }
  descargarTodosDocumentos(tramite) {
    if (this.userRole === "ESTUDIANTE") {
      this.toastService.warning("Acci\xF3n no permitida", "Los estudiantes no pueden descargar documentos de tr\xE1mites");
      return;
    }
    const cantidadDocumentos = tramite.documentos ? tramite.documentos.length : 0;
    if (cantidadDocumentos === 0) {
      this.toastService.warning("Sin documentos", "Este tr\xE1mite no tiene documentos adjuntos para descargar.");
      return;
    }
    if (cantidadDocumentos === 1) {
      this.descargarDocumentoIndividual(tramite.id, tramite.documentos[0]);
    } else {
      this.descargarDocumentosComoZip(tramite);
    }
  }
  descargarDocumentoIndividual(tramiteId, documento) {
    this.subscriptions.add(this.misTramitesService.descargarDocumento(tramiteId, documento.nombre).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = documento.nombre;
        link.click();
        window.URL.revokeObjectURL(url);
        this.toastService.success("Descarga completada", `El documento "${documento.nombre}" se ha descargado exitosamente.`);
      },
      error: () => {
        this.toastService.error("Error", `No se pudo descargar el documento "${documento.nombre}"`);
      }
    }));
  }
  descargarDocumentosComoZip(tramite) {
    this.subscriptions.add(this.misTramitesService.descargarTodosDocumentos(tramite.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `tramite-${tramite.codigo}-documentos.zip`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.toastService.success("Descarga completada", `Se han descargado ${tramite.documentos?.length} documentos en formato ZIP.`);
      },
      error: () => {
        this.toastService.error("Error", "No se pudieron descargar los documentos");
      }
    }));
  }
  cerrarModalDetalle() {
    this.showDetalleTramiteModal = false;
    this.tramiteSeleccionado = null;
  }
  recargarYMostrarDetalle(tramiteId) {
    this.subscriptions.add(this.misTramitesService.getMiTramiteById(tramiteId).subscribe({
      next: (tramiteActualizado) => {
        this.tramiteSeleccionado = tramiteActualizado;
        this.showDetalleTramiteModal = true;
        this.toastService.info("Vista actualizada", "Los datos del tr\xE1mite han sido actualizados en el detalle.");
      },
      error: (error) => {
        const tramiteEnLista = this.misTramites.find((t) => t.id === tramiteId);
        if (tramiteEnLista) {
          this.tramiteSeleccionado = tramiteEnLista;
          this.showDetalleTramiteModal = true;
          this.toastService.warning("Datos parciales", "Se muestran los datos b\xE1sicos. Algunos cambios podr\xEDan no estar visibles.");
        } else {
          this.toastService.error("Error de recarga", "No se pudo recargar el detalle del tr\xE1mite.");
        }
      }
    }));
  }
  cerrarModalEditar() {
    this.showEditarTramiteModal = false;
    if (!this.showDetalleTramiteModal) {
      this.tramiteSeleccionado = null;
    }
    this.formEditar = {};
    this.guardandoEdicion = false;
    this.archivosNuevos = [];
    this.documentosAEliminar = [];
    this.resetEditFirmaDigitalForm();
  }
  cerrarModalAprobar() {
    this.showAprobarModal = false;
    this.tramiteSeleccionado = null;
  }
  cerrarModalResponder() {
    this.showResponderTramiteModal = false;
    this.tramiteSeleccionado = null;
  }
  confirmarAprobacion() {
    if (!this.tramiteSeleccionado)
      return;
    const request = {
      tramiteId: this.tramiteSeleccionado.id,
      observaciones: "Tr\xE1mite aprobado por administrativo"
    };
    this.subscriptions.add(this.misTramitesService.aprobarTramite(request).subscribe({
      next: (response) => {
        this.cargarMisTramites();
        this.cargarEstadisticas();
        this.cerrarModalAprobar();
      },
      error: (error) => {
      }
    }));
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
      "Finalizado": "estado-finalizado"
    };
    return clases[estado] || "estado-default";
  }
  getPrioridadClase(nivel) {
    const clases = {
      1: "prioridad-baja",
      2: "prioridad-normal",
      3: "prioridad-alta",
      4: "prioridad-urgente"
    };
    return clases[nivel] || "prioridad-normal";
  }
  formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  aprobarTramite(tramite) {
    if (!this.canProcessTramites)
      return;
    this.tramiteSeleccionado = tramite;
    this.showAprobarModal = true;
  }
  puedeAprobar(tramite) {
    if (this.userRole === "ESTUDIANTE") {
      return false;
    }
    if (!this.isAdministrativo) {
      return false;
    }
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeAprobar;
    }
    const estadosParaAprobar = ["En Revisi\xF3n", "Derivado", "EN_REVISION", "DERIVADO"];
    const puede = this.isAdministrativo && estadosParaAprobar.includes(tramite.estado.nombre);
    return puede;
  }
  puedeResponder(tramite) {
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeResponder;
    }
    const estadosParaResponder = ["Aprobado", "Derivado", "APROBADO", "DERIVADO", "En Proceso", "EN_PROCESO"];
    const puede = this.isAdministrativo && estadosParaResponder.includes(tramite.estado.nombre);
    return puede;
  }
  puedeRechazar(tramite) {
    if (this.userRole === "estudiante") {
      return false;
    }
    if (!this.isAdministrativo) {
      return false;
    }
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeRechazar;
    }
    const estadosNoRechazables = ["Finalizado", "FINALIZADO", "Rechazado", "RECHAZADO", "Archivado", "ARCHIVADO"];
    const puede = this.isAdministrativo && !estadosNoRechazables.includes(tramite.estado.nombre);
    return puede;
  }
  puedeDerivar(tramite) {
    if (this.userRole === "estudiante") {
      return false;
    }
    if (!this.isAdministrativo) {
      return false;
    }
    if (tramite.respuesta && tramite.respuesta.trim().length > 0) {
      return false;
    }
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeDerivar;
    }
    const estadosParaDerivar = ["En Revisi\xF3n", "EN_REVISION", "En Proceso", "EN_PROCESO"];
    const estadosNoDerivar = ["Derivado", "DERIVADO"];
    const puede = this.isAdministrativo && estadosParaDerivar.includes(tramite.estado.nombre) && !estadosNoDerivar.includes(tramite.estado.nombre);
    return puede;
  }
  estaVencido(tramite) {
    if (tramite.estaVencido !== void 0 && tramite.estaVencido !== null) {
      return tramite.estaVencido;
    }
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.estaVencido;
    }
    if (tramite.diasRestantes !== void 0 && tramite.diasRestantes !== null) {
      return tramite.diasRestantes <= 0;
    }
    if (tramite.fechaVencimiento) {
      const fechaVencimiento = new Date(tramite.fechaVencimiento);
      const hoy = /* @__PURE__ */ new Date();
      hoy.setHours(0, 0, 0, 0);
      fechaVencimiento.setHours(0, 0, 0, 0);
      return fechaVencimiento < hoy;
    }
    return false;
  }
  getEstadoVisual(tramite) {
    if (this.estaVencido(tramite)) {
      return {
        nombre: "Finalizado",
        icono: "fas fa-check-circle"
      };
    }
    return {
      nombre: tramite.estado.nombre,
      icono: tramite.estado.icono
    };
  }
  getEstadoVisualTexto(tramite) {
    if (this.estaVencido(tramite)) {
      return "Finalizado";
    }
    return tramite.estado.nombre;
  }
  getEstadoClaseCompleta(tramite) {
    if (this.estaVencido(tramite)) {
      return "estado-finalizado";
    }
    return this.getEstadoClase(tramite.estado.nombre);
  }
  handleAprobarClick(event, tramite) {
    if (this.estaVencido(tramite) || !this.puedeAprobar(tramite)) {
      return;
    }
    event.stopPropagation();
    this.aprobarTramite(tramite);
  }
  handleRechazarClick(event, tramite) {
    if (this.estaVencido(tramite) || !this.puedeRechazar(tramite)) {
      return;
    }
    event.stopPropagation();
    this.rechazarTramite(tramite);
  }
  handleDerivarClick(event, tramite) {
    if (this.estaVencido(tramite) || !this.puedeDerivar(tramite)) {
      return;
    }
    event.stopPropagation();
    this.derivarTramite(tramite);
  }
  handleAprobarClickTable(tramite) {
    if (this.estaVencido(tramite) || !this.puedeAprobar(tramite)) {
      return;
    }
    this.aprobarTramite(tramite);
  }
  handleRechazarClickTable(tramite) {
    if (this.estaVencido(tramite) || !this.puedeRechazar(tramite)) {
      return;
    }
    this.rechazarTramite(tramite);
  }
  handleDerivarClickTable(tramite) {
    if (this.estaVencido(tramite) || !this.puedeDerivar(tramite)) {
      return;
    }
    this.derivarTramite(tramite);
  }
  handleResponderClick(event, tramite) {
    if (this.estaVencido(tramite) || !this.puedeResponder(tramite)) {
      return;
    }
    event.stopPropagation();
    this.abrirResponderTramite(tramite);
  }
  handleResponderClickTable(tramite) {
    if (this.estaVencido(tramite) || !this.puedeResponder(tramite)) {
      return;
    }
    this.abrirResponderTramite(tramite);
  }
  abrirResponderTramite(tramite) {
    if (!this.puedeResponder(tramite)) {
      this.toastService.warning("Acci\xF3n no permitida", "Solo se pueden responder tr\xE1mites aprobados.");
      return;
    }
    this.tramiteSeleccionado = tramite;
    this.showResponderTramiteModal = true;
  }
  onTramiteRespondido(response) {
    this.toastService.success("Tr\xE1mite respondido", "La respuesta ha sido enviada exitosamente.");
    this.cargarMisTramites();
    this.cargarEstadisticas();
    this.cerrarModalResponder();
  }
  rechazarTramite(tramite) {
    if (!this.canProcessTramites)
      return;
    this.tramiteSeleccionado = tramite;
    this.mostrarModalRechazo = true;
  }
  derivarTramite(tramite) {
    if (!this.canProcessTramites)
      return;
    this.tramiteSeleccionado = tramite;
    this.mostrarModalDerivacion = true;
    this.cargarTrabajadoresDisponibles();
  }
  usarDatosBasicosFirmaDigital(tramiteId) {
    if (!this.tramiteSeleccionado) {
      return;
    }
    const firmaFallback = {
      tipoFirma: this.tramiteSeleccionado.tipoFirma ? TipoFirma[this.tramiteSeleccionado.tipoFirma] || TipoFirma.SIMPLE : this.extraerTipoFirmaDeMetodo(this.tramiteSeleccionado.metodoVerificacion) || TipoFirma.CONFORMIDAD,
      razonFirma: this.tramiteSeleccionado.razonFirma || (this.tramiteSeleccionado.fechaFirma ? `Firma digital del tr\xE1mite - ${new Date(this.tramiteSeleccionado.fechaFirma).toLocaleDateString("es-PE")}` : "Firma digital del tr\xE1mite"),
      ubicacionFirma: this.tramiteSeleccionado.ubicacionFirma || "LIMA",
      fechaFirma: this.tramiteSeleccionado.fechaFirma,
      hashFirma: this.tramiteSeleccionado.hashFirma
    };
    this.inicializarCamposFirmaDigitalFallback(firmaFallback);
  }
  extraerTipoFirmaDeMetodo(metodoVerificacion) {
    if (!metodoVerificacion)
      return null;
    const metodo = metodoVerificacion.toUpperCase();
    if (metodo.includes("SIMPLE"))
      return TipoFirma.SIMPLE;
    if (metodo.includes("AVANZADA"))
      return TipoFirma.APROBACION;
    if (metodo.includes("CUALIFICADA"))
      return TipoFirma.REVISION;
    if (metodo.includes("CONFORMIDAD"))
      return TipoFirma.CONFORMIDAD;
    return null;
  }
  inicializarCamposFirmaDigitalFallback(firmaFallback) {
    this.editTipoFirma = firmaFallback.tipoFirma;
    this.editRazonFirma = firmaFallback.razonFirma;
    this.editUbicacionFirma = firmaFallback.ubicacionFirma;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
    this.toastService.info("Datos de firma cargados (b\xE1sicos)", "Se han precargado datos b\xE1sicos de la firma digital existente");
  }
  cargarDatosDetalladosFirmaDigital(tramiteId) {
    this.subscriptions.add(this.firmaDigitalService.obtenerFirmasPorTramite(tramiteId).subscribe({
      next: (firmas) => {
        if (firmas && firmas.length > 0) {
          this.firmaDigitalDetallada = firmas[0];
          this.inicializarCamposFirmaDigitalExistente(this.firmaDigitalDetallada);
        } else {
          this.usarDatosBasicosFirmaDigital(tramiteId);
        }
      },
      error: (error) => {
      }
    }));
  }
  inicializarCamposFirmaDigitalExistente(firma) {
    if (firma.tipoFirma) {
      this.editTipoFirma = firma.tipoFirma;
    } else {
    }
    if (firma.razonFirma) {
      this.editRazonFirma = firma.razonFirma;
    } else {
    }
    if (firma.ubicacionFirma) {
      this.editUbicacionFirma = firma.ubicacionFirma;
    } else {
    }
    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
    this.toastService.info("Datos de firma cargados", "Se han precargado los datos de la firma digital existente");
  }
  cargarTrabajadoresDisponibles() {
    this.cargandoTrabajadores = true;
    this.trabajadoresDisponibles = [];
    this.authService.getAdministrativosDisponibles().subscribe({
      next: (usuarios) => {
        this.trabajadoresDisponibles = usuarios;
        this.cargandoTrabajadores = false;
      },
      error: (error) => {
        this.cargandoTrabajadores = false;
        this.toastService.error("Error", "No se pudieron cargar los trabajadores disponibles");
      }
    });
  }
  seleccionarTrabajador(trabajador) {
    const maxWorkload = 5;
    if (trabajador.workloadCount >= maxWorkload) {
      this.toastService.error("Trabajador no disponible", `Este trabajador cuenta con ${trabajador.workloadCount} documentos asignados por el d\xEDa, elige a otro`);
      return;
    }
    if (this.trabajadorSeleccionado?.id === trabajador.id) {
      this.trabajadorSeleccionado = null;
      this.toastService.info("Trabajador deseleccionado", "Puedes seleccionar otro trabajador");
      return;
    }
    this.trabajadorSeleccionado = trabajador;
    this.toastService.success("Trabajador seleccionado", `${trabajador.nombre} ${trabajador.apellidos} ha sido seleccionado para la derivaci\xF3n`);
  }
  confirmarDerivacion() {
    if (!this.trabajadorSeleccionado || !this.tramiteSeleccionado) {
      this.toastService.warning("Validaci\xF3n", "Debe seleccionar un trabajador para derivar el tr\xE1mite");
      return;
    }
    if (!this.trabajadorSeleccionado.id) {
      this.toastService.error("Error", "El trabajador seleccionado no tiene un ID v\xE1lido");
      return;
    }
    const request = {
      tramiteId: this.tramiteSeleccionado.id,
      areaDestinoId: 1,
      trabajadorAsignadoId: this.trabajadorSeleccionado.id,
      observaciones: this.observacionesDerivacion || `Tr\xE1mite derivado a ${this.trabajadorSeleccionado.nombre} ${this.trabajadorSeleccionado.apellidos}`,
      mantenerEstado: false
    };
    this.subscriptions.add(this.bandejaTramitesService.derivarTramite(request).subscribe({
      next: (response) => {
        this.toastService.success("Tr\xE1mite derivado", `Se asign\xF3 el tr\xE1mite ${this.tramiteSeleccionado.codigo} a ${this.trabajadorSeleccionado.nombre} ${this.trabajadorSeleccionado.apellidos}`);
        this.cerrarModalDerivacion();
        this.cargarMisTramites();
        this.cargarEstadisticas();
        this.enviarNotificacionDerivacion();
      },
      error: (error) => {
        this.toastService.error("Error al derivar", "No se pudo derivar el tr\xE1mite. Intente nuevamente.");
      }
    }));
  }
  enviarNotificacionDerivacion() {
    if (!this.trabajadorSeleccionado || !this.tramiteSeleccionado)
      return;
    const mensaje = `Te ha sido asignado el tr\xE1mite ${this.tramiteSeleccionado.codigo} para que lo atiendas. Asunto: ${this.tramiteSeleccionado.asunto}`;
    this.toastService.info("Notificaciones enviadas", `Se notific\xF3 a ${this.trabajadorSeleccionado.nombre} por email y notificaci\xF3n del sistema`);
  }
  cerrarModalDerivacion() {
    this.mostrarModalDerivacion = false;
    this.trabajadorSeleccionado = null;
    this.observacionesDerivacion = "";
    this.trabajadoresDisponibles = [];
    this.tramiteSeleccionado = null;
  }
  cerrarModalRechazo() {
    this.mostrarModalRechazo = false;
    this.motivoRechazo = "";
    this.observacionesRechazo = "";
    this.tramiteSeleccionado = null;
  }
  confirmarRechazo() {
    if (!this.tramiteSeleccionado || !this.motivoRechazo.trim()) {
      this.toastService.warning("Motivo requerido", "Debe proporcionar un motivo para el rechazo");
      return;
    }
    this.cargandoRechazo = true;
    this.misTramitesService.rechazarTramite(this.tramiteSeleccionado.id, this.motivoRechazo.trim(), this.observacionesRechazo.trim() || void 0).subscribe({
      next: (response) => {
        this.cargandoRechazo = false;
        this.cargarMisTramites();
        this.cargarEstadisticas();
        this.cerrarModalRechazo();
      },
      error: (error) => {
        this.cargandoRechazo = false;
      }
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
  getDiasHabilesRestantes(fechaVencimiento) {
    if (!fechaVencimiento)
      return null;
    const hoy = /* @__PURE__ */ new Date();
    hoy.setHours(0, 0, 0, 0);
    const vencimiento = new Date(fechaVencimiento);
    vencimiento.setHours(0, 0, 0, 0);
    if (vencimiento < hoy) {
      return this.calcularDiasHabilesEntre(vencimiento, hoy) * -1;
    }
    return this.calcularDiasHabilesEntre(hoy, vencimiento);
  }
  calcularDiasHabilesEntre(fechaInicio, fechaFin) {
    let diasHabiles = 0;
    const fechaActual = new Date(fechaInicio);
    while (fechaActual < fechaFin) {
      const diaSemana = fechaActual.getDay();
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasHabiles++;
      }
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return diasHabiles;
  }
  getProgressoPorcentaje(tramite) {
    if (!tramite)
      return 0;
    const progreso = tramite.progreso;
    if (progreso === void 0 || progreso === null || isNaN(progreso)) {
      return 0;
    }
    return Math.max(0, Math.min(100, progreso));
  }
  trackByTramiteId(_, tramite) {
    return tramite.id;
  }
  getProgresoDetallado(tramite) {
    if (!tramite) {
      return {
        porcentaje: 0,
        tipoProgreso: "temporal",
        descripcion: "Cargando...",
        tiempoRestante: "Calculando..."
      };
    }
    const porcentaje = this.getProgressoPorcentaje(tramite);
    if (tramite.estaVencido) {
      return {
        porcentaje: 100,
        tipoProgreso: "vencido",
        descripcion: "Tr\xE1mite vencido",
        tiempoRestante: "Vencido"
      };
    }
    if (tramite.estado?.nombre === "Finalizado") {
      return {
        porcentaje: 100,
        tipoProgreso: "estado",
        descripcion: "Tr\xE1mite completado",
        tiempoRestante: "Finalizado"
      };
    }
    const tiempoRestante = this.formatearTiempoRestante(tramite);
    return {
      porcentaje,
      tipoProgreso: "temporal",
      descripcion: `Progreso: ${porcentaje}%`,
      tiempoRestante
    };
  }
  formatearTiempoRestante(tramite) {
    if (!tramite.fechaVencimiento) {
      return "Sin fecha l\xEDmite";
    }
    const diasHabiles = this.getDiasHabilesRestantes(tramite.fechaVencimiento);
    if (diasHabiles === null) {
      return "Sin fecha l\xEDmite";
    }
    if (diasHabiles < 0) {
      const diasVencido = Math.abs(diasHabiles);
      return `Vencido hace ${diasVencido} d\xEDa${diasVencido === 1 ? "" : "s"} h\xE1bil${diasVencido === 1 ? "" : "es"}`;
    }
    if (diasHabiles === 0) {
      const ahora = /* @__PURE__ */ new Date();
      const fechaVencimiento = new Date(tramite.fechaVencimiento);
      ahora.setHours(0, 0, 0, 0);
      fechaVencimiento.setHours(0, 0, 0, 0);
      if (ahora.getTime() === fechaVencimiento.getTime()) {
        const horasRestantes = 24 - (/* @__PURE__ */ new Date()).getHours();
        return `${horasRestantes} hora${horasRestantes === 1 ? "" : "s"} restante${horasRestantes === 1 ? "" : "s"} (\xFAltimo d\xEDa)`;
      }
      return "Vence hoy";
    }
    return `${diasHabiles} d\xEDa${diasHabiles === 1 ? "" : "s"} h\xE1bil${diasHabiles === 1 ? "" : "es"} restante${diasHabiles === 1 ? "" : "s"}`;
  }
  getTramitesVencidos() {
    if (!this.isAdministrativo)
      return 0;
    return this.misTramites.filter((tramite) => this.estaVencido(tramite)).length;
  }
  getTramitesPorProcesar() {
    if (!this.estadisticas)
      return 0;
    const vencidos = this.getTramitesVencidos();
    const enProceso = this.estadisticas.aprobado + this.estadisticas.enRevision + this.estadisticas.derivado;
    return Math.max(0, enProceso - vencidos);
  }
  getTramitesProcesados() {
    if (!this.estadisticas)
      return 0;
    const vencidos = this.getTramitesVencidos();
    const finalizados = this.estadisticas.finalizado;
    return finalizados + vencidos;
  }
  buscarYMostrarTramite(tramiteId, action) {
    setTimeout(() => {
      const tramiteEncontrado = this.misTramites.find((t) => t.id === tramiteId);
      if (tramiteEncontrado) {
        if (action === "responder") {
          this.abrirResponderTramite(tramiteEncontrado);
          this.toastService.success("Tr\xE1mite encontrado", `Abriendo formulario para responder tr\xE1mite ${tramiteEncontrado.codigo}`);
        } else if (action === "derivar") {
          this.derivarTramite(tramiteEncontrado);
          this.toastService.success("Tr\xE1mite encontrado", `Abriendo formulario para derivar tr\xE1mite ${tramiteEncontrado.codigo}`);
        } else {
          this.verDetalle(tramiteEncontrado);
          this.toastService.success("Tr\xE1mite encontrado", `Mostrando detalles del tr\xE1mite ${tramiteEncontrado.codigo}`);
        }
      } else {
        this.toastService.info("Tr\xE1mite no visible", `El tr\xE1mite ID ${tramiteId} no est\xE1 en la p\xE1gina actual. Puedes buscarlo usando el filtro de b\xFAsqueda.`);
      }
    }, 1e3);
  }
  handleDescargarClick(event, tramite) {
    event.stopPropagation();
    this.descargarTodosDocumentos(tramite);
  }
  handleDescargarTodoClick(tramite) {
    this.descargarTodosDocumentos(tramite);
    this.cerrarModalDetalle();
  }
  imprimirTramite(tramite) {
    if (!this.puedeImprimirTramite(tramite)) {
      this.toastService.warning("Acci\xF3n no permitida", "Solo se pueden imprimir tr\xE1mites que no est\xE9n finalizados o dados de baja.");
      return;
    }
    this.toastService.info("Preparando impresi\xF3n", "Generando vista previa para imprimir...");
    this.subscriptions.add(this.tramiteService.imprimirTramite(tramite.id).subscribe({
      next: (blob) => {
        blob.text().then((htmlContent) => {
          const printWindow = window.open("", "_blank", "width=800,height=600");
          if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            printWindow.onload = () => {
              setTimeout(() => {
                printWindow.print();
                printWindow.onafterprint = () => {
                  printWindow.close();
                };
              }, 500);
            };
          } else {
            this.toastService.error("Error de impresi\xF3n", "No se pudo abrir la ventana de impresi\xF3n. Verifique que no est\xE9 bloqueada por el navegador.");
          }
        });
      },
      error: (error) => {
        this.toastService.error("Error de impresi\xF3n", "No se pudo generar el documento del tr\xE1mite.");
      }
    }));
  }
  puedeImprimirTramite(tramite) {
    if (!this.isUsuario) {
      return false;
    }
    const estadosNoImprimibles = ["Finalizado", "Dado de Baja", "Cancelado", "Archivado"];
    return !estadosNoImprimibles.includes(tramite.estado?.nombre);
  }
  getDownloadTooltip(tramite) {
    if (this.estaVencido(tramite)) {
      return "Tr\xE1mite finalizado - Descarga no disponible";
    }
    const cantidadDocumentos = tramite.documentos ? tramite.documentos.length : 0;
    if (cantidadDocumentos === 0) {
      return "Este tr\xE1mite no tiene documentos adjuntos";
    } else if (cantidadDocumentos === 1) {
      return `Descargar documento: ${tramite.documentos[0].nombre}`;
    } else {
      return `Descargar ${cantidadDocumentos} documentos en formato ZIP`;
    }
  }
  getTramiteForEdit() {
    if (!this.tramiteSeleccionado)
      return null;
    return {
      id: this.tramiteSeleccionado.id,
      codigo: this.tramiteSeleccionado.codigo,
      asunto: this.tramiteSeleccionado.asunto,
      descripcion: this.tramiteSeleccionado.descripcion,
      observaciones: this.tramiteSeleccionado.observaciones,
      fechaVencimiento: this.tramiteSeleccionado.fechaVencimiento,
      tipoTramite: this.tramiteSeleccionado.tipoTramite,
      prioridad: this.tramiteSeleccionado.prioridad,
      estado: this.tramiteSeleccionado.estado,
      fechaCreacion: this.tramiteSeleccionado.fechaCreacion,
      fechaActualizacion: this.tramiteSeleccionado.fechaActualizacion,
      solicitante: null,
      areaOrigen: null,
      documentos: [],
      historial: []
    };
  }
  mostrarFirmaDigitalEnDetalle(tramite) {
    if (!tramite) {
      return false;
    }
    if (!tramite.firmaDigitalActiva) {
      return false;
    }
    if (this.isAdministrativo) {
      return true;
    }
    if (this.isUsuario) {
      const currentUserId = this.authService.currentUserValue?.id;
      const solicitanteId = tramite.usuarioSolicitante?.id;
      return currentUserId === solicitanteId;
    }
    return false;
  }
  mostrarDatosPersonalesFirma() {
    return this.isAdministrativo;
  }
  obtenerMetodoVerificacion(metodo) {
    if (!metodo)
      return "No especificado";
    const metodos = {
      "SIMPLE": "Firma Digital Simple",
      "AVANZADA": "Firma Digital Avanzada",
      "CUALIFICADA": "Firma Digital Cualificada"
    };
    return metodos[metodo] || metodo;
  }
  initializeEditCanvas() {
    if (!this.editSignatureCanvas)
      return;
    this.editCanvas = this.editSignatureCanvas.nativeElement;
    this.editCtx = this.editCanvas.getContext("2d");
    this.editCanvas.width = 400;
    this.editCanvas.height = 150;
    this.editCtx.strokeStyle = "#000";
    this.editCtx.lineWidth = 2;
    this.editCtx.lineCap = "round";
    this.editCanvas.addEventListener("mousedown", this.editStartDrawing.bind(this));
    this.editCanvas.addEventListener("mousemove", this.editDraw.bind(this));
    this.editCanvas.addEventListener("mouseup", this.editStopDrawing.bind(this));
    this.editCanvas.addEventListener("touchstart", this.editStartDrawingTouch.bind(this));
    this.editCanvas.addEventListener("touchmove", this.editDrawTouch.bind(this));
    this.editCanvas.addEventListener("touchend", this.editStopDrawing.bind(this));
  }
  editStartDrawing(e) {
    this.editIsDrawing = true;
    const rect = this.editCanvas.getBoundingClientRect();
    this.editStartX = e.clientX - rect.left;
    this.editStartY = e.clientY - rect.top;
  }
  editDraw(e) {
    if (!this.editIsDrawing)
      return;
    const rect = this.editCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.editCtx.beginPath();
    this.editCtx.moveTo(this.editStartX, this.editStartY);
    this.editCtx.lineTo(x, y);
    this.editCtx.stroke();
    this.editStartX = x;
    this.editStartY = y;
    this.editSignatureExists = true;
  }
  editStopDrawing() {
    this.editIsDrawing = false;
  }
  editStartDrawingTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.editCanvas.getBoundingClientRect();
    this.editIsDrawing = true;
    this.editStartX = touch.clientX - rect.left;
    this.editStartY = touch.clientY - rect.top;
  }
  editDrawTouch(e) {
    e.preventDefault();
    if (!this.editIsDrawing)
      return;
    const touch = e.touches[0];
    const rect = this.editCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    this.editCtx.beginPath();
    this.editCtx.moveTo(this.editStartX, this.editStartY);
    this.editCtx.lineTo(x, y);
    this.editCtx.stroke();
    this.editStartX = x;
    this.editStartY = y;
    this.editSignatureExists = true;
  }
  editClearCanvas() {
    if (this.editCtx && this.editCanvas) {
      this.editCtx.clearRect(0, 0, this.editCanvas.width, this.editCanvas.height);
      this.editSignatureExists = false;
      this.editFirmaDigitalData = null;
    }
  }
  editCaptureSignature() {
    if (this.editCanvas && this.editSignatureExists) {
      this.editFirmaDigitalData = this.editCanvas.toDataURL("image/png");
      this.toastService.success("Firma capturada", "Su nueva firma ha sido capturada exitosamente");
    }
  }
  toggleEditarFirmaDigital() {
    this.editarFirmaDigital = !this.editarFirmaDigital;
    if (this.editarFirmaDigital) {
      this.resetEditFirmaDigitalForm();
      this.toastService.info("Edici\xF3n de firma activada", "Complete los datos para crear una nueva firma digital");
      setTimeout(() => {
        this.initializeEditCanvas();
      }, 100);
    } else {
      this.clearEditFirmaDigitalData();
    }
  }
  resetEditFirmaDigitalForm() {
    this.editTipoFirma = TipoFirma.CONFORMIDAD;
    this.editRazonFirma = "";
    this.editUbicacionFirma = "";
    this.editFirmaDigitalData = null;
    this.editSignatureExists = false;
    this.editConsentimientoFirma = false;
    this.showEditConfirmationModal = false;
  }
  clearEditFirmaDigitalData() {
    this.editFirmaDigitalData = null;
    this.editSignatureExists = false;
    this.editConsentimientoFirma = false;
    this.showEditConfirmationModal = false;
    if (this.editCtx && this.editCanvas) {
      this.editCtx.clearRect(0, 0, this.editCanvas.width, this.editCanvas.height);
    }
  }
  mostrarEditConfirmationModal() {
    if (!this.validarEditFirmaDigital()) {
      return;
    }
    this.showEditConfirmationModal = true;
  }
  validarEditFirmaDigital() {
    if (!this.editSignatureExists) {
      this.toastService.warning("Firma requerida", "Debe dibujar su firma en el recuadro");
      return false;
    }
    if (!this.editFirmaDigitalData) {
      this.toastService.warning("Firma no capturada", 'Debe capturar su firma haciendo clic en "Capturar Firma"');
      return false;
    }
    if (!this.editRazonFirma.trim()) {
      this.toastService.warning("Raz\xF3n requerida", "Debe especificar el motivo de la firma");
      return false;
    }
    if (!this.editUbicacionFirma.trim()) {
      this.toastService.warning("Ubicaci\xF3n requerida", "Debe especificar su ubicaci\xF3n");
      return false;
    }
    if (!this.editConsentimientoFirma) {
      this.toastService.warning("Consentimiento requerido", "Debe aceptar los t\xE9rminos y condiciones");
      return false;
    }
    return true;
  }
  cerrarEditConfirmationModal() {
    this.showEditConfirmationModal = false;
  }
  confirmarEditFirmaDigital() {
    if (!this.validarEditFirmaDigital()) {
      return;
    }
    this.toastService.success("Firma digital agregada", "La nueva firma digital se guardar\xE1 al confirmar la edici\xF3n del tr\xE1mite");
    this.showEditConfirmationModal = false;
  }
  puedeEliminarTramite(tramite) {
    if (this.userRole !== "usuario" && this.userRole !== "estudiante") {
      return false;
    }
    const estadosNoEliminables = ["Finalizado", "FINALIZADO", "Archivado", "ARCHIVADO"];
    if (estadosNoEliminables.includes(tramite.estado?.nombre)) {
      return false;
    }
    const currentUserId = this.authService.currentUserValue?.id;
    const solicitanteId = tramite.usuarioSolicitante?.id;
    return currentUserId === solicitanteId;
  }
  eliminarTramite(tramite) {
    if (!this.puedeEliminarTramite(tramite)) {
      this.toastService.warning("Acci\xF3n no permitida", "No tienes permiso para eliminar este tr\xE1mite.");
      return;
    }
    this.tramiteParaEliminar = tramite;
    this.showDeleteConfirmModal = true;
  }
  cancelarEliminacion() {
    this.showDeleteConfirmModal = false;
    this.tramiteParaEliminar = null;
  }
  confirmarEliminacion() {
    if (!this.tramiteParaEliminar)
      return;
    this.subscriptions.add(this.tramiteService.eliminarTramite(this.tramiteParaEliminar.id).subscribe({
      next: () => {
        this.showDeleteConfirmModal = false;
        this.tramiteParaEliminar = null;
        this.cargarMisTramites();
        this.cargarEstadisticas();
      },
      error: (error) => {
        this.showDeleteConfirmModal = false;
        this.tramiteParaEliminar = null;
      }
    }));
  }
  static {
    this.\u0275fac = function MisTramitesComponent_Factory(t) {
      return new (t || _MisTramitesComponent)(\u0275\u0275directiveInject(MisTramitesService), \u0275\u0275directiveInject(BandejaTramitesService), \u0275\u0275directiveInject(TramiteService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(FirmaDigitalService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MisTramitesComponent, selectors: [["app-mis-tramites"]], viewQuery: function MisTramitesComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.editSignatureCanvas = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 40, vars: 35, consts: [["fileInput", ""], ["editSignatureCanvas", ""], [1, "mis-tramites-container"], [1, "header-section"], [1, "title-area"], [1, "fas", "fa-file-alt"], ["class", "btn-nuevo", 3, "click", 4, "ngIf"], ["class", "stats-cards", 4, "ngIf"], [1, "toolbar"], [1, "search-section"], [1, "search-container"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Buscar por c\xF3digo, asunto, tipo...", "autocomplete", "off", 1, "search-input", 3, "ngModelChange", "input", "keydown", "blur", "ngModel"], ["class", "clear-search", 3, "click", 4, "ngIf"], ["class", "search-loading", 4, "ngIf"], ["class", "search-dropdown", 4, "ngIf"], ["class", "search-error", 4, "ngIf"], ["class", "toolbar-actions", 4, "ngIf"], [1, "tramites-content"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "tramites-grid", 4, "ngIf"], ["class", "tramites-table", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [3, "close", "tramiteRespondido", "show", "tramite"], ["class", "modal-overlay confirmation-modal-overlay", 4, "ngIf"], ["class", "modal-delete-overlay", 3, "click", 4, "ngIf"], [3, "close", "tramiteCreado", "tramiteActualizado", "show", "modoEdicion", "tramiteParaEditar"], [1, "btn-nuevo", 3, "click"], [1, "fas", "fa-plus"], [1, "stats-cards"], [4, "ngIf"], [1, "stat-card", "total"], [1, "stat-icon"], [1, "stat-content"], [1, "stat-number"], [1, "stat-label"], [1, "stat-card", "revision"], [1, "fas", "fa-clock"], [1, "stat-card", "finalizado"], [1, "fas", "fa-check-circle"], [1, "stat-card", "observado"], [1, "fas", "fa-exclamation-triangle"], [1, "clear-search", 3, "click"], [1, "fas", "fa-times"], [1, "search-loading"], [1, "fas", "fa-spinner", "fa-spin"], [1, "search-dropdown"], [1, "search-results"], ["class", "search-result-item", 3, "selected", "click", "mouseenter", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "search-result-item", 3, "click", "mouseenter"], [1, "result-main"], [1, "result-codigo"], [1, "result-asunto"], [1, "result-meta"], [1, "result-tipo"], [1, "result-estado"], [1, "search-error"], [1, "search-error-content"], [1, "fas", "fa-exclamation-circle"], [1, "toolbar-actions"], [1, "btn-view", 3, "click"], [1, "loading-state"], [1, "empty-state"], [1, "tramites-grid"], ["class", "tramite-card", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "tramite-card", 3, "click"], [1, "card-header"], [1, "tramite-codigo"], [1, "tramite-fecha"], [1, "card-content"], [1, "tramite-asunto"], [1, "tramite-tipo"], ["class", "respuesta-preview", 4, "ngIf"], [1, "tramite-meta"], [1, "prioridad"], ["class", "area", 4, "ngIf"], [1, "card-progress"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-text"], [1, "card-actions"], ["title", "Ver detalles del tr\xE1mite", 1, "btn-action", "view-detail", 3, "click"], [1, "fas", "fa-eye"], [3, "class", "disabled", "title", "click", 4, "ngIf"], ["class", "btn-action delete", "title", "Eliminar tr\xE1mite", 3, "click", 4, "ngIf"], [3, "click", "disabled", "title"], [1, "fas", "fa-download"], ["class", "download-count", 4, "ngIf"], ["class", "counter-display", 4, "ngIf"], ["class", "vencimiento-indicator", 3, "vencido", "urgente", 4, "ngIf"], [1, "respuesta-preview"], [1, "respuesta-header"], [1, "fas", "fa-reply"], [1, "respuesta-texto"], ["class", "respuesta-fecha", 4, "ngIf"], [1, "respuesta-fecha"], [1, "fas", "fa-calendar-check"], [1, "area"], [1, "fas", "fa-building"], [1, "fas", "fa-edit"], ["title", "Eliminar tr\xE1mite", 1, "btn-action", "delete", 3, "click"], [1, "fas", "fa-trash"], [1, "download-count"], [1, "counter-display"], [1, "fas", "fa-tasks"], [1, "counter-text"], [1, "fas", "fa-check"], [1, "fas", "fa-route"], [1, "fas", "fa-paper-plane"], [1, "vencimiento-indicator"], [1, "tramites-table"], [1, "table-responsive-wrapper"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "codigo"], [1, "asunto-cell", 3, "click"], [1, "estado-badge"], [1, "prioridad-badge"], [1, "table-actions"], ["title", "Ver detalle", 1, "btn-mini", "view-detail", 3, "click"], ["class", "btn-mini delete", "title", "Eliminar", 3, "click", 4, "ngIf"], ["title", "Eliminar", 1, "btn-mini", "delete", 3, "click"], [1, "pagination"], [1, "page-btn", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "page-info"], [1, "fas", "fa-chevron-right"], [1, "modal-overlay", 3, "click"], [1, "modal-content", "aprobar-modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], [1, "aprobar-content"], [1, "tramite-info"], [1, "tramite-datos"], [1, "dato-item"], [1, "codigo-destacado"], [1, "responsable-info"], [1, "responsable-card"], [1, "responsable-header"], [1, "fas", "fa-user-check"], [1, "responsable-datos"], ["class", "dato-item", 4, "ngIf"], [1, "estado-badge", "estado-aprobado"], [1, "warning-message"], [1, "fas", "fa-info-circle"], [1, "modal-footer"], [1, "btn-secondary", 3, "click"], [1, "btn-success", 3, "click"], [1, "modal-content", "detalle-modal", 3, "click"], [1, "detalle-grid"], [1, "info-section"], [1, "info-item"], [1, "fechas-section"], [1, "fas", "fa-calendar-alt"], ["class", "info-item", 4, "ngIf"], ["class", "descripcion-section", 4, "ngIf"], ["class", "documentos-section", 4, "ngIf"], ["class", "asignacion-section", 4, "ngIf"], ["class", "firma-digital-section", 4, "ngIf"], [1, "progreso-section"], [1, "fas", "fa-chart-line"], ["class", "progress-container", 4, "ngIf"], [1, "footer-actions"], ["class", "badge-modal", 4, "ngIf"], [1, "descripcion-section"], [1, "fas", "fa-align-left"], [1, "descripcion-text"], [1, "documentos-section"], [1, "documentos-list"], [3, "class", "cursor", "opacity", "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "documento-nombre"], [1, "asignacion-section"], [1, "firma-digital-section"], [1, "fas", "fa-signature"], [1, "firma-digital-info-large"], [1, "firma-status-large"], [1, "status-badge-large", "success"], [1, "firma-two-columns"], ["class", "column-left", 4, "ngIf"], [1, "column-right"], [1, "validez-legal-large"], [1, "fas", "fa-certificate"], [1, "validez-content"], [1, "validez-label"], [1, "validez-value"], [1, "column-left"], [1, "fecha-firma-large"], [1, "fecha-content"], [1, "fecha-label"], [1, "fecha-value"], [1, "progress-container"], [1, "progress-bar-detail"], [1, "progress-text-detail"], [1, "progress-percentage"], [1, "progress-status"], [1, "progress-info-detail"], [1, "progress-description"], [1, "progress-time-remaining"], [1, "badge-modal"], [1, "modal-content-large", 3, "click"], [1, "close-btn", 3, "click"], ["class", "tramite-info-card", 4, "ngIf"], [1, "trabajadores-section"], [1, "instruction-text"], ["class", "trabajadores-grid", 4, "ngIf"], ["class", "observaciones-section", 4, "ngIf"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "tramite-info-card"], [1, "trabajadores-grid"], ["class", "trabajador-card", 3, "selected", "disabled", "click", 4, "ngFor", "ngForOf"], [1, "trabajador-card", 3, "click"], [1, "trabajador-avatar"], [3, "src", "alt", 4, "ngIf"], ["class", "fas fa-user", 4, "ngIf"], [1, "trabajador-info"], [1, "carga-trabajo"], [1, "tramites-count"], [1, "workload-percentage"], ["class", "error-message", 4, "ngIf"], ["class", "status-available", 4, "ngIf"], [3, "src", "alt"], [1, "fas", "fa-user"], [1, "error-message"], [1, "status-available"], [1, "observaciones-section"], ["placeholder", "Agregue observaciones sobre la derivaci\xF3n...", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "fas", "fa-times-circle"], [1, "rechazo-form"], [1, "form-group"], ["for", "motivoRechazo"], ["id", "motivoRechazo", "placeholder", "Explique detalladamente el motivo del rechazo del tr\xE1mite...", "rows", "4", "required", "", "maxlength", "1000", 3, "ngModelChange", "ngModel"], [1, "char-counter"], ["for", "observacionesRechazo"], [1, "fas", "fa-comment"], ["id", "observacionesRechazo", "placeholder", "Agregue observaciones adicionales o recomendaciones para el solicitante...", "rows", "3", "maxlength", "500", 3, "ngModelChange", "ngModel"], [1, "btn-cancel", 3, "click", "disabled"], [1, "btn-danger", 3, "click", "disabled"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], ["class", "fas fa-times-circle", 4, "ngIf"], [1, "info-text"], [1, "edit-form"], ["for", "editDescripcion"], ["id", "editDescripcion", "placeholder", "Escriba aqu\xED los detalles completos de su tr\xE1mite...", "rows", "5", "maxlength", "1000", 1, "form-textarea", 3, "ngModelChange", "ngModel", "name"], ["for", "editObservaciones"], [1, "optional-badge"], ["id", "editObservaciones", "placeholder", "Agregue comentarios o notas adicionales si lo requiere...", "rows", "3", "maxlength", "500", 1, "form-textarea", 3, "ngModelChange", "ngModel", "name"], [1, "upload-section"], [1, "fas", "fa-upload"], [1, "upload-area", 3, "click", "dragover", "dragleave", "drop"], [1, "fas", "fa-cloud-upload-alt"], [1, "upload-text"], [1, "upload-hint"], ["type", "file", "multiple", "", "accept", ".pdf,.doc,.docx,.jpg,.jpeg,.png", 2, "display", "none", 3, "change"], ["class", "archivos-nuevos-list", 4, "ngIf"], [1, "firma-digital-header"], [1, "header-left"], ["class", "firma-status-badge", 4, "ngIf"], [1, "header-actions"], ["type", "button", "title", "Editar o crear nueva firma digital", 1, "btn-edit-signature", 3, "click"], [1, "fas", 3, "ngClass"], ["class", "firma-actual", 4, "ngIf"], ["class", "firma-edit-form", 4, "ngIf"], ["class", "no-firma-message", 4, "ngIf"], [1, "info-message"], [1, "info-icon"], [1, "fas", "fa-envelope"], [1, "info-content"], [1, "btn-primary", 3, "click", "disabled"], ["class", "fas fa-save", 4, "ngIf"], [1, "documentos-list-edit"], ["class", "documento-item-edit", 4, "ngFor", "ngForOf"], [1, "documento-item-edit"], [1, "documento-info"], [1, "fas", "fa-file-pdf"], [1, "documento-size"], ["type", "button", "title", "Eliminar documento", 1, "btn-remove-doc", 3, "click"], [1, "archivos-nuevos-list"], ["class", "archivo-nuevo-item", 4, "ngFor", "ngForOf"], [1, "archivo-nuevo-item"], [1, "archivo-info"], [1, "fas", "fa-file"], [1, "archivo-nombre"], [1, "archivo-size"], ["type", "button", "title", "Quitar archivo", 1, "btn-remove-new", 3, "click"], [1, "firma-status-badge"], [1, "firma-actual"], [1, "firma-details"], ["class", "detail-row", 4, "ngIf"], [1, "detail-row"], [1, "label"], [1, "value"], [1, "firma-edit-form"], ["for", "editTipoFirma"], [1, "fas", "fa-seal"], ["id", "editTipoFirma", 1, "form-control", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "editRazonFirma"], [1, "fas", "fa-clipboard-list"], ["id", "editRazonFirma", "type", "text", "placeholder", "Ej: Autorizaci\xF3n de modificaci\xF3n del tr\xE1mite", "maxlength", "100", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-hint"], ["for", "editUbicacionFirma"], [1, "fas", "fa-map-marker-alt"], ["id", "editUbicacionFirma", 1, "form-control", 3, "ngModelChange", "ngModel"], ["value", ""], [1, "signature-canvas-section"], [1, "canvas-header"], [1, "canvas-label"], [1, "fas", "fa-pencil-alt"], ["class", "canvas-status", 4, "ngIf"], [1, "signature-canvas-wrapper"], [1, "canvas-container"], [1, "signature-canvas"], ["class", "canvas-placeholder", 4, "ngIf"], [1, "canvas-actions"], ["type", "button", "title", "Limpiar firma y empezar de nuevo", 1, "btn-canvas-action", "btn-clear", 3, "click", "disabled"], [1, "fas", "fa-eraser"], ["type", "button", "title", "Capturar firma para continuar", 1, "btn-canvas-action", "btn-capture", 3, "click", "disabled"], [1, "fas", "fa-camera"], [1, "canvas-instructions"], ["class", "signature-preview", 4, "ngIf"], ["class", "signature-consent", 4, "ngIf"], ["class", "signature-submit", 4, "ngIf"], [3, "value"], [1, "canvas-status"], [1, "fas", "fa-check-circle", "text-success"], [1, "canvas-placeholder"], [1, "signature-preview"], [1, "signature-preview-container"], ["alt", "Firma capturada", 1, "signature-image", 3, "src"], [1, "signature-info"], [1, "signature-consent"], [1, "consent-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "consent-text"], [1, "fas", "fa-shield-alt"], [1, "signature-submit"], ["type", "button", 1, "btn-confirm-signature", 3, "click"], [1, "no-firma-message"], [1, "message-content"], ["type", "button", 1, "btn-create-signature", 3, "click"], [1, "fas", "fa-save"], [1, "modal-overlay", "confirmation-modal-overlay"], [1, "confirmation-modal-container", 3, "click"], [1, "confirmation-modal-header"], [1, "header-icon"], [1, "confirmation-modal-body"], [1, "declaration-box"], [1, "fas", "fa-gavel"], [1, "declaration-content"], [1, "declaration-list"], [1, "terms-box"], [1, "fas", "fa-file-contract"], [1, "terms-content"], [1, "terms-grid"], [1, "term-item"], [1, "term-text"], [1, "fas", "fa-lock"], [1, "fas", "fa-archive"], [1, "fas", "fa-user-shield"], [1, "warning-box"], [1, "warning-header"], [1, "warning-content"], [1, "warning-list"], [1, "legal-notice"], [1, "signature-summary"], [1, "fas", "fa-clipboard-check"], [1, "summary-content"], [1, "summary-row"], [1, "summary-label"], [1, "summary-value"], [1, "confirmation-modal-footer"], [1, "btn-cancel-confirmation", 3, "click"], [1, "btn-proceed-confirmation", 3, "click"], [1, "fas", "fa-pen-nib"], [1, "modal-delete-overlay", 3, "click"], [1, "modal-delete-content", 3, "click"], [1, "modal-delete-header"], [1, "modal-delete-icon"], [1, "modal-delete-body"], [1, "modal-delete-question"], [1, "modal-delete-warning"], [1, "modal-delete-footer"], [1, "btn-delete-cancel", 3, "click"], [1, "btn-delete-confirm", 3, "click"]], template: function MisTramitesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "h1");
        \u0275\u0275element(4, "i", 5);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, MisTramitesComponent_button_8_Template, 3, 0, "button", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, MisTramitesComponent_div_9_Template, 3, 2, "div", 7);
        \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "div", 10)(13, "div", 11);
        \u0275\u0275element(14, "i", 12);
        \u0275\u0275elementStart(15, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function MisTramitesComponent_Template_input_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function MisTramitesComponent_Template_input_input_15_listener() {
          return ctx.onSearch(ctx.searchTerm);
        })("keydown", function MisTramitesComponent_Template_input_keydown_15_listener($event) {
          return ctx.onSearchKeydown($event);
        })("blur", function MisTramitesComponent_Template_input_blur_15_listener() {
          return ctx.onSearchBlur();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, MisTramitesComponent_button_16_Template, 2, 0, "button", 14)(17, MisTramitesComponent_div_17_Template, 2, 0, "div", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275template(18, MisTramitesComponent_div_18_Template, 3, 2, "div", 16)(19, MisTramitesComponent_div_19_Template, 5, 1, "div", 17);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(20, MisTramitesComponent_div_20_Template, 3, 2, "div", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 19);
        \u0275\u0275template(22, MisTramitesComponent_div_22_Template, 4, 0, "div", 20);
        \u0275\u0275pipe(23, "async");
        \u0275\u0275template(24, MisTramitesComponent_div_24_Template, 6, 0, "div", 21);
        \u0275\u0275pipe(25, "async");
        \u0275\u0275template(26, MisTramitesComponent_div_26_Template, 2, 2, "div", 22);
        \u0275\u0275pipe(27, "async");
        \u0275\u0275template(28, MisTramitesComponent_div_28_Template, 21, 2, "div", 23);
        \u0275\u0275pipe(29, "async");
        \u0275\u0275elementEnd();
        \u0275\u0275template(30, MisTramitesComponent_div_30_Template, 7, 4, "div", 24)(31, MisTramitesComponent_div_31_Template, 65, 11, "div", 25)(32, MisTramitesComponent_div_32_Template, 67, 24, "div", 25)(33, MisTramitesComponent_div_33_Template, 26, 5, "div", 25)(34, MisTramitesComponent_div_34_Template, 49, 10, "div", 25);
        \u0275\u0275elementStart(35, "app-responder-tramite-modal", 26);
        \u0275\u0275listener("close", function MisTramitesComponent_Template_app_responder_tramite_modal_close_35_listener() {
          return ctx.cerrarModalResponder();
        })("tramiteRespondido", function MisTramitesComponent_Template_app_responder_tramite_modal_tramiteRespondido_35_listener($event) {
          return ctx.onTramiteRespondido($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(36, MisTramitesComponent_div_36_Template, 85, 23, "div", 25)(37, MisTramitesComponent_div_37_Template, 129, 3, "div", 27)(38, MisTramitesComponent_div_38_Template, 22, 1, "div", 28);
        \u0275\u0275elementStart(39, "app-nuevo-tramite-modal", 29);
        \u0275\u0275listener("close", function MisTramitesComponent_Template_app_nuevo_tramite_modal_close_39_listener() {
          return ctx.cerrarModalNuevoTramite();
        })("tramiteCreado", function MisTramitesComponent_Template_app_nuevo_tramite_modal_tramiteCreado_39_listener($event) {
          return ctx.onTramiteCreado($event);
        })("tramiteActualizado", function MisTramitesComponent_Template_app_nuevo_tramite_modal_tramiteActualizado_39_listener($event) {
          return ctx.onTramiteActualizado($event);
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.isAdministrativo ? "Gesti\xF3n de Tr\xE1mites" : "Mis Tr\xE1mites", " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.isAdministrativo ? "Procesa y gestiona tr\xE1mites asignados" : "Gestiona y da seguimiento a tus solicitudes");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.shouldShowCreateButton);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.estadisticas);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isSearching);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showSearchDropdown && ctx.searchResults.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchError && ctx.searchTerm && !ctx.isSearching);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.userRole !== "estudiante");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(23, 27, ctx.loading$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(25, 29, ctx.loading$) && ctx.misTramites && ctx.misTramites.length === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(27, 31, ctx.loading$) && ctx.filteredTramites.length > 0 && ctx.vistaActual === "tarjetas");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(29, 33, ctx.loading$) && ctx.filteredTramites.length > 0 && ctx.vistaActual === "lista");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.totalPages > 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showAprobarModal && ctx.tramiteSeleccionado);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDetalleTramiteModal && ctx.tramiteSeleccionado);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarModalDerivacion);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarModalRechazo);
        \u0275\u0275advance();
        \u0275\u0275property("show", ctx.showResponderTramiteModal)("tramite", ctx.tramiteSeleccionado);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showEditarTramiteModal && ctx.tramiteSeleccionado);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showEditConfirmationModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteConfirmModal);
        \u0275\u0275advance();
        \u0275\u0275property("show", ctx.showNuevoTramiteModal)("modoEdicion", ctx.modoEdicion)("tramiteParaEditar", ctx.tramiteParaEditar);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, AsyncPipe, SlicePipe, DecimalPipe, TitleCasePipe, DatePipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm, RouterModule, ResponderTramiteModalComponent, NuevoTramiteModalComponent], styles: [`

[_ngcontent-%COMP%]:root {
  --primary: #3b82f6;
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-900: #0f172a;
  --green-100: #dcfce7;
  --green-600: #16a34a;
  --red-100: #fee2e2;
  --red-600: #dc2626;
  --orange-100: #fed7aa;
  --orange-600: #ea580c;
  --blue-100: #dbeafe;
  --blue-600: #2563eb;
}
.mis-tramites-container[_ngcontent-%COMP%] {
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  background: #fafbfd;
  min-height: 100vh;
}
.header-section[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 1.625rem;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: var(--primary);
}
.title-area[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0.375rem 0 0 0;
  color: var(--gray-500);
  font-size: 0.875rem;
}
.btn-nuevo[_ngcontent-%COMP%] {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
}
.btn-nuevo[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.stats-cards[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.stat-card[_ngcontent-%COMP%] {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--gray-200);
  transition: transform 0.2s ease;
}
.stat-card[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.stat-icon[_ngcontent-%COMP%] {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}
.stat-card.total[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {
  background: #ede9fe;
  color: #7c3aed;
}
.stat-card.revision[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {
  background: var(--red-100);
  color: var(--red-600);
}
.stat-card.finalizado[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {
  background: var(--green-100);
  color: var(--green-600);
}
.stat-card.rating[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%], .stat-card.observado[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {
  background: var(--orange-100);
  color: var(--orange-600);
}
.stat-number[_ngcontent-%COMP%] {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  line-height: 1;
}
.stat-label[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: var(--gray-500);
  margin-top: 0.125rem;
}
.toolbar[_ngcontent-%COMP%] {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gray-200);
}
.search-section[_ngcontent-%COMP%] {
  flex: 1;
  max-width: 400px;
  position: relative;
}
.search-box[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
}
.search-box.has-dropdown[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-color: var(--primary);
  border-bottom-color: transparent;
}
.search-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  position: absolute;
  left: 0.875rem;
  color: var(--gray-400);
  z-index: 1;
  font-size: 0.875rem;
  pointer-events: none;
}
.search-box[_ngcontent-%COMP%]   i.searching[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_pulse 1s infinite;
  color: var(--primary);
}
@keyframes _ngcontent-%COMP%_pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.search-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.625rem 0.875rem 0.625rem 2.375rem;
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: var(--gray-50);
  position: relative;
  z-index: 2;
}
.search-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
}
.clear-search[_ngcontent-%COMP%] {
  position: absolute;
  right: 0.625rem;
  background: none;
  border: none;
  color: var(--gray-400);
  cursor: pointer;
  padding: 0.25rem;
  z-index: 3;
}
.clear-search[_ngcontent-%COMP%]:hover {
  color: var(--gray-500);
}
.search-dropdown[_ngcontent-%COMP%] {
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--primary);
  border-top: none;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.15);
  z-index: 1000;
  max-height: 320px;
  overflow-y: auto;
  animation: _ngcontent-%COMP%_slideDown 0.2s ease;
}
@keyframes _ngcontent-%COMP%_slideDown {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.search-results[_ngcontent-%COMP%] {
  padding: 0.5rem;
}
.search-result-item[_ngcontent-%COMP%] {
  padding: 0.625rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
}
.search-result-item[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.search-result-item[_ngcontent-%COMP%]:hover, .search-result-item.selected[_ngcontent-%COMP%] {
  background: #eff6ff;
}
.search-result-item.selected[_ngcontent-%COMP%] {
  background: var(--blue-100);
}
.result-main[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.25rem;
}
.result-codigo[_ngcontent-%COMP%] {
  font-weight: 600;
  color: var(--primary);
  font-family:
    "SF Mono",
    "Monaco",
    monospace;
  font-size: 0.75rem;
  background: #eff6ff;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
}
.result-tipo[_ngcontent-%COMP%] {
  background: var(--gray-100);
  color: var(--gray-600);
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-size: 0.625rem;
  text-transform: uppercase;
  font-weight: 500;
}
.result-details[_ngcontent-%COMP%] {
  margin-bottom: 0.25rem;
}
.result-asunto[_ngcontent-%COMP%] {
  color: var(--gray-700);
  font-size: 0.8125rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-bottom: 0.125rem;
}
.result-solicitante[_ngcontent-%COMP%] {
  color: var(--gray-400);
  font-size: 0.6875rem;
}
.result-meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.result-estado[_ngcontent-%COMP%] {
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-weight: 500;
}
.result-fecha[_ngcontent-%COMP%] {
  color: var(--gray-300);
  font-size: 0.625rem;
}
.search-error-content[_ngcontent-%COMP%] {
  padding: 1rem;
}
.error-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  color: #ef4444;
  font-weight: 500;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--red-100);
  font-size: 0.8125rem;
}
.error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  margin-top: 0.125rem;
}
.error-suggestions[_ngcontent-%COMP%] {
  color: var(--gray-500);
  font-size: 0.75rem;
}
.error-suggestions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0 0 0.375rem 0;
  font-weight: 500;
  color: var(--gray-600);
}
.error-suggestions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  margin: 0;
  padding-left: 0;
  list-style: none;
}
.error-suggestions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}
.error-suggestions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {
  content: "\\2192";
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 600;
}
.toolbar-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.5rem;
}
.btn-filter[_ngcontent-%COMP%], .btn-view[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid var(--gray-200);
  padding: 0.5rem 0.875rem;
  border-radius: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  color: var(--gray-600);
}
.btn-filter[_ngcontent-%COMP%]:active, .btn-view[_ngcontent-%COMP%]:active {
  transform: scale(0.95);
}
.btn-filter.active[_ngcontent-%COMP%] {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
.filters-panel[_ngcontent-%COMP%] {
  background: white;
  border-radius: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
  border: 1px solid var(--gray-200);
}
.filters-panel.active[_ngcontent-%COMP%] {
  max-height: 400px;
  border-color: var(--gray-300);
}
.filters-content[_ngcontent-%COMP%] {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-weight: 500;
  color: var(--gray-600);
  margin-bottom: 0.375rem;
  font-size: 0.8125rem;
}
.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: 0.625rem;
  background: white;
  font-size: 0.875rem;
  color: var(--gray-900);
}
.filter-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.btn-apply[_ngcontent-%COMP%], .btn-clear[_ngcontent-%COMP%] {
  flex: 1;
  padding: 0.625rem 1rem;
  border-radius: 0.625rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}
.btn-apply[_ngcontent-%COMP%] {
  background: #10b981;
  color: white;
}
.btn-clear[_ngcontent-%COMP%] {
  background: var(--gray-100);
  color: var(--gray-600);
}
.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%], .filter-error-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 3rem 1.25rem;
  color: var(--gray-500);
}
.loading-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 1.75rem;
  color: var(--primary);
  margin-bottom: 0.75rem;
}
.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 3rem;
  color: var(--gray-200);
  margin-bottom: 1rem;
}
.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}
.filter-error-state[_ngcontent-%COMP%] {
  background: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-200);
  margin-bottom: 1.5rem;
}
.filter-error-content[_ngcontent-%COMP%] {
  padding: 2.5rem 1.25rem;
}
.filter-error-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 3rem;
  color: #f59e0b;
  margin-bottom: 1rem;
}
.filter-error-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}
.filter-error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: var(--gray-500);
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.filter-error-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.btn-clear-filters[_ngcontent-%COMP%] {
  background: var(--gray-100);
  color: var(--gray-600);
  border: 1px solid var(--gray-200);
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
  text-decoration: none;
}
.btn-clear-filters[_ngcontent-%COMP%]:hover {
  background: var(--gray-200);
  border-color: var(--gray-300);
}
.btn-clear-filters[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.tramites-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 24px;
}
.tramite-card[_ngcontent-%COMP%] {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
  position: relative;
  min-height: 200px;
}
.tramite-card[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.card-header[_ngcontent-%COMP%] {
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.tramite-codigo[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #3b82f6;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.tramite-fecha[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #78350f;
  background: #fef3c7;
  padding: 4px 8px;
  border-radius: 20px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}
.card-content[_ngcontent-%COMP%] {
  padding: 0 14px 12px 14px;
}
.tramite-asunto[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 500;
  color: #0f172a;
  margin: 0 0 8px 0;
  line-height: 1.3;
}
.tramite-tipo[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 13px;
  margin: 0 0 12px 0;
}
.tramite-meta[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.prioridad[_ngcontent-%COMP%], .area[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: 500;
}
.prioridad.prioridad-baja[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #166534;
}
.prioridad.prioridad-normal[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #1e40af;
}
.prioridad.prioridad-alta[_ngcontent-%COMP%] {
  background: #fef3c7;
  color: #92400e;
}
.prioridad.prioridad-urgente[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #991b1b;
}
.area[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #475569;
}
.card-progress[_ngcontent-%COMP%] {
  padding: 0 14px;
  margin-bottom: 12px;
}
.progress-bar[_ngcontent-%COMP%] {
  height: 3px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}
.progress-fill[_ngcontent-%COMP%] {
  height: 100%;
  transition: width 0.3s ease;
  background: #3b82f6;
}
.progress-text[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #475569;
}
.card-actions[_ngcontent-%COMP%] {
  padding: 12px 12px 16px 12px;
  background: #f8fafc;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid #e5e7eb;
  gap: 8px;
  margin-bottom: 8px;
}
.btn-action[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid var(--gray-200);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  color: var(--gray-500);
  font-size: 1rem;
}
.btn-action[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
}
.btn-action.view-detail[_ngcontent-%COMP%], .btn-action.edit[_ngcontent-%COMP%] {
  color: var(--primary);
  background: #eff6ff;
  border: none;
}
.btn-action.download[_ngcontent-%COMP%], .btn-action.approve[_ngcontent-%COMP%] {
  color: #10b981;
  background: #ecfdf5;
  border: none;
}
.btn-action.rate[_ngcontent-%COMP%] {
  color: #f59e0b;
  background: #fef3c7;
  border: none;
}
.btn-action.reject[_ngcontent-%COMP%] {
  color: #ef4444;
  background: var(--red-100);
  border: none;
}
.btn-action.forward[_ngcontent-%COMP%] {
  color: #8b5cf6;
  background: #f3e8ff;
  border: none;
}
.btn-action.respond[_ngcontent-%COMP%] {
  color: #f97316;
  background: var(--orange-100);
  border: none;
}
.btn-action.disabled[_ngcontent-%COMP%] {
  background: var(--gray-100) !important;
  color: var(--gray-400) !important;
  border: 1px solid var(--gray-200) !important;
  cursor: not-allowed !important;
  opacity: 0.6;
}
.btn-action.disabled[_ngcontent-%COMP%]:hover {
  transform: none !important;
  box-shadow: none !important;
}
.tramites-grid[_ngcontent-%COMP%]   .btn-action.download[_ngcontent-%COMP%] {
  position: relative;
  overflow: visible;
}
.tramites-grid[_ngcontent-%COMP%]   .btn-action[_ngcontent-%COMP%]   .download-count[_ngcontent-%COMP%] {
  position: absolute;
  top: -4px;
  right: -4px;
  background:
    linear-gradient(
      135deg,
      #64748b 0%,
      #475569 100%);
  color: white;
  font-size: 9px;
  font-weight: 500;
  padding: 2px 4px;
  border-radius: 8px;
  line-height: 1.2;
  z-index: 2;
  min-width: 14px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border: 1.5px solid white;
  transition: all 0.2s ease;
}
.tramites-grid[_ngcontent-%COMP%]   .btn-action.download[_ngcontent-%COMP%]:hover   .download-count[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #475569 0%,
      #334155 100%);
  transform: scale(1.05);
}
.table-actions[_ngcontent-%COMP%]   .btn-mini.download[_ngcontent-%COMP%] {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  padding: 0 2px;
  overflow: hidden;
}
.table-actions[_ngcontent-%COMP%]   .btn-mini[_ngcontent-%COMP%]   .download-count[_ngcontent-%COMP%] {
  position: static;
  background:
    linear-gradient(
      135deg,
      #6b7280 0%,
      #4b5563 100%);
  color: white;
  font-size: 9px;
  font-weight: 500;
  padding: 2px 4px;
  border-radius: 5px;
  line-height: 1.1;
  min-width: 14px;
  text-align: center;
  margin-left: 2px;
  display: inline-block;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}
.table-actions[_ngcontent-%COMP%]   .btn-mini.download[_ngcontent-%COMP%]:hover   .download-count[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #4b5563 0%,
      #374151 100%);
}
@media (max-width: 768px) {
  .tramites-grid[_ngcontent-%COMP%]   .btn-action.download[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }
  .tramites-grid[_ngcontent-%COMP%]   .btn-action[_ngcontent-%COMP%]   .download-count[_ngcontent-%COMP%] {
    position: static;
    font-size: 8px;
    padding: 1px 3px;
    min-width: 12px;
    border-radius: 6px;
    margin-left: 2px;
  }
  .table-actions[_ngcontent-%COMP%]   .btn-mini[_ngcontent-%COMP%]   .download-count[_ngcontent-%COMP%] {
    font-size: 8px;
    padding: 1px 3px;
    min-width: 12px;
    border-radius: 4px;
  }
}
@media (max-width: 480px) {
  .tramites-grid[_ngcontent-%COMP%]   .btn-action.download[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 0 8px;
  }
  .tramites-grid[_ngcontent-%COMP%]   .btn-action[_ngcontent-%COMP%]   .download-count[_ngcontent-%COMP%] {
    position: static;
    font-size: 7px;
    padding: 1px 2px;
    min-width: 10px;
    border-radius: 4px;
    margin-left: 1px;
  }
  .table-actions[_ngcontent-%COMP%]   .btn-mini[_ngcontent-%COMP%] {
    width: 30px;
    height: 30px;
  }
  .table-actions[_ngcontent-%COMP%]   .btn-mini[_ngcontent-%COMP%]   .download-count[_ngcontent-%COMP%] {
    font-size: 7px;
    padding: 1px 2px;
    min-width: 10px;
  }
}
.btn-mini[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
  margin-left: 4px;
  background: #10b981;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 10px;
  display: inline-block;
  line-height: 1;
}
.badge-modal[_ngcontent-%COMP%] {
  margin-left: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 12px;
  display: inline-block;
  line-height: 1;
}
.counter-display[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  white-space: nowrap;
  min-width: 60px;
  justify-content: center;
}
.counter-display[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #94a3b8;
}
.counter-text[_ngcontent-%COMP%] {
  color: #475569;
  font-weight: 600;
}
.rating-display[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f59e0b;
  color: white;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}
.vencimiento-indicator[_ngcontent-%COMP%] {
  position: absolute;
  top: 52px;
  right: 14px;
  background: #fef3c7;
  color: #78350f;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  min-width: auto;
  width: auto;
  max-width: 80px;
}
.vencimiento-indicator.urgente[_ngcontent-%COMP%] {
  background: #fed7aa;
  color: #7c2d12;
  animation: _ngcontent-%COMP%_pulse 2s infinite;
}
.vencimiento-indicator.vencido[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
  color: white;
  animation: _ngcontent-%COMP%_pulse 1.5s infinite;
  box-shadow: 0 2px 12px rgba(239, 68, 68, 0.3);
}
@keyframes _ngcontent-%COMP%_pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
.tramites-table[_ngcontent-%COMP%] {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
}
.table-responsive-wrapper[_ngcontent-%COMP%] {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.tramites-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}
.tramites-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 12px 8px;
  text-align: left;
  font-weight: 500;
  color: #475569;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  white-space: nowrap;
}
.tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 12px 8px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
  font-size: 13px;
}
.tramites-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:active {
  background: #f8fafc;
}
.codigo[_ngcontent-%COMP%] {
  font-family:
    "SF Mono",
    "Monaco",
    monospace;
  background: #eff6ff;
  color: #1e40af;
  padding: 3px 6px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}
.asunto-cell[_ngcontent-%COMP%] {
  cursor: pointer;
}
.asunto-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  display: block;
  color: #0f172a;
  margin-bottom: 2px;
  font-size: 13px;
}
.asunto-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 11px;
}
.estado-badge[_ngcontent-%COMP%], .prioridad-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}
.estado-borrador[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #475569;
}
.estado-enviado[_ngcontent-%COMP%] {
  background: #dbeafe;
  color: #1e40af;
}
.estado-revision[_ngcontent-%COMP%] {
  background: #fef3c7;
  color: #92400e;
}
.estado-derivado[_ngcontent-%COMP%] {
  background: #d1fae5;
  color: #065f46;
}
.estado-observado[_ngcontent-%COMP%] {
  background: #fee2e2;
  color: #991b1b;
}
.estado-aprobado[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #166534;
}
.estado-finalizado[_ngcontent-%COMP%] {
  background: #cffafe;
  color: #155e75;
}
.table-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.btn-mini[_ngcontent-%COMP%] {
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 0.375rem;
  border: 1px solid var(--gray-200);
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 0.6875rem;
}
.btn-mini.view-detail[_ngcontent-%COMP%], .btn-mini.edit[_ngcontent-%COMP%] {
  color: var(--primary);
  background: #eff6ff;
}
.btn-mini.download[_ngcontent-%COMP%], .btn-mini.approve[_ngcontent-%COMP%] {
  color: #10b981;
  background: #ecfdf5;
}
.btn-mini.rate[_ngcontent-%COMP%] {
  color: #f59e0b;
  background: #fef3c7;
}
.btn-mini.reject[_ngcontent-%COMP%] {
  color: #ef4444;
  background: var(--red-100);
}
.btn-mini.forward[_ngcontent-%COMP%] {
  color: #8b5cf6;
  background: #f3e8ff;
}
.btn-mini.respond[_ngcontent-%COMP%] {
  color: #f97316;
  background: var(--orange-100);
}
.btn-mini.disabled[_ngcontent-%COMP%] {
  background: var(--gray-100) !important;
  color: var(--gray-400) !important;
  border: 1px solid var(--gray-200) !important;
  cursor: not-allowed !important;
  opacity: 0.6;
}
.btn-mini.disabled[_ngcontent-%COMP%]:hover {
  transform: none !important;
}
.btn-mini[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
}
.pagination[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
}
.page-btn[_ngcontent-%COMP%] {
  background: white;
  border: 1px solid #e5e7eb;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #475569;
}
.page-btn[_ngcontent-%COMP%]:active:not(:disabled) {
  transform: scale(0.9);
  background: #f1f5f9;
}
.page-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.page-info[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #475569;
  font-size: 14px;
  padding: 0 8px;
}
.modal-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.modal-content[_ngcontent-%COMP%] {
  background: white;
  border-radius: 1.25rem;
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.detalle-modal[_ngcontent-%COMP%] {
  max-width: 600px;
}
.modal-header[_ngcontent-%COMP%] {
  padding: 1.25rem;
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  color: var(--gray-900);
  font-size: 1.125rem;
  font-weight: 600;
}
.modal-close[_ngcontent-%COMP%] {
  background: var(--gray-100);
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-500);
  transition: all 0.2s ease;
}
.modal-close[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
  background: var(--gray-200);
}
.modal-body[_ngcontent-%COMP%] {
  padding: 1.25rem;
}
.detalle-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
.info-section[_ngcontent-%COMP%], .fechas-section[_ngcontent-%COMP%], .descripcion-section[_ngcontent-%COMP%], .documentos-section[_ngcontent-%COMP%], .asignacion-section[_ngcontent-%COMP%], .calificacion-section[_ngcontent-%COMP%], .progreso-section[_ngcontent-%COMP%] {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}
.info-section[_ngcontent-%COMP%]:hover, .fechas-section[_ngcontent-%COMP%]:hover, .descripcion-section[_ngcontent-%COMP%]:hover, .documentos-section[_ngcontent-%COMP%]:hover, .asignacion-section[_ngcontent-%COMP%]:hover, .calificacion-section[_ngcontent-%COMP%]:hover, .progreso-section[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.info-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .fechas-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .descripcion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .documentos-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .asignacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .calificacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .progreso-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 8px;
}
.info-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .fechas-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .descripcion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .documentos-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .asignacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .calificacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .progreso-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 16px;
}
.info-item[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 13px;
}
.info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #64748b;
  font-weight: 500;
}
.info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #0f172a;
  font-weight: 500;
}
.codigo-destacado[_ngcontent-%COMP%] {
  background: #eff6ff;
  color: #1e40af;
  padding: 3px 8px;
  border-radius: 6px;
  font-family: "SF Mono", monospace;
  font-size: 12px;
}
.descripcion-text[_ngcontent-%COMP%] {
  color: #475569;
  line-height: 1.5;
  font-size: 13px;
}
.documentos-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.documento-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
}
.documento-item[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
  background: #f1f5f9;
}
.documento-item.disabled[_ngcontent-%COMP%] {
  cursor: not-allowed !important;
  opacity: 0.5 !important;
  background: #f8fafc !important;
  color: var(--gray-400) !important;
}
.documento-item.disabled[_ngcontent-%COMP%]:hover {
  background: #f8fafc !important;
  transform: none !important;
}
.documento-nombre[_ngcontent-%COMP%] {
  flex: 1;
  color: #334155;
}
.progress-bar-detail[_ngcontent-%COMP%] {
  height: 12px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  border: 2px solid #f1f5f9;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
.progress-container[_ngcontent-%COMP%] {
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.progress-text-detail[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.progress-percentage[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 700;
  color: #1e40af;
}
.progress-status[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  background: #e2e8f0;
  padding: 4px 8px;
  border-radius: 6px;
}
.progress-fill.progress-vencido[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #ef4444 0%,
      #dc2626 100%) !important;
  animation: _ngcontent-%COMP%_warning-pulse 1.5s ease-in-out infinite;
}
@keyframes _ngcontent-%COMP%_progress-flow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
@keyframes _ngcontent-%COMP%_warning-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
.progress-info-detail[_ngcontent-%COMP%] {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.progress-description[_ngcontent-%COMP%], .progress-time-remaining[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
  padding: 6px 8px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}
.progress-description[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .progress-time-remaining[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 11px;
}
.progress-time-remaining[_ngcontent-%COMP%] {
  justify-content: flex-end;
  text-align: right;
}
.rating-section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .aspect-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .comment-section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-weight: 500;
  color: #475569;
  margin-bottom: 10px;
  font-size: 13px;
}
.stars-rating[_ngcontent-%COMP%] {
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
}
.star-btn[_ngcontent-%COMP%] {
  background: none;
  border: none;
  font-size: 24px;
  color: #e2e8f0;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0;
}
.star-btn.active[_ngcontent-%COMP%] {
  color: #f59e0b;
}
.star-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.9);
}
.aspects-rating[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 20px;
}
.aspect-item[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  font-size: 13px;
}
.comment-section[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  resize: vertical;
  font-family: inherit;
  font-size: 13px;
  background: white;
}
.modal-footer[_ngcontent-%COMP%] {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--gray-100);
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
  background: var(--gray-50);
}
.footer-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.btn-cancel[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {
  padding: 0.625rem 1rem;
  border-radius: 0.625rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
  background: transparent;
  color: var(--gray-600);
  font-size: 0.8125rem;
}
.btn-save[_ngcontent-%COMP%], .btn-primary[_ngcontent-%COMP%], .btn-info[_ngcontent-%COMP%], .btn-warning[_ngcontent-%COMP%] {
  padding: 0.625rem 1rem;
  border-radius: 0.625rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  color: var(--green-100);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
}
.btn-save[_ngcontent-%COMP%], .btn-primary[_ngcontent-%COMP%] {
  background: var(--primary);
}
.btn-info[_ngcontent-%COMP%] {
  background: #06b6d4;
}
.btn-warning[_ngcontent-%COMP%] {
  background: #f59e0b;
}
.btn-info.disabled[_ngcontent-%COMP%], .btn-info[_ngcontent-%COMP%]:disabled {
  background: var(--gray-300) !important;
  color: var(--gray-500) !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
  border: 1px solid var(--gray-200) !important;
}
.btn-info.disabled[_ngcontent-%COMP%]:hover, .btn-info[_ngcontent-%COMP%]:disabled:hover {
  background: var(--gray-300) !important;
  transform: none !important;
  box-shadow: none !important;
}
.text-danger[_ngcontent-%COMP%] {
  color: #dc2626;
}
.text-warning[_ngcontent-%COMP%] {
  color: #f59e0b;
}
.stars[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 14px;
  color: #e2e8f0;
}
.stars[_ngcontent-%COMP%]   i.active[_ngcontent-%COMP%] {
  color: #f59e0b;
}
.rating-text[_ngcontent-%COMP%] {
  margin-left: 8px;
  color: #64748b;
  font-size: 13px;
}
.rating-comment[_ngcontent-%COMP%] {
  margin-top: 8px;
  font-style: italic;
  color: #475569;
  font-size: 13px;
}
.aprobar-modal[_ngcontent-%COMP%] {
  max-width: 600px;
}
.aprobar-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.tramite-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}
.tramite-datos[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
}
.dato-item[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}
.dato-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #495057;
  flex-shrink: 0;
  margin-right: 1rem;
}
.dato-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  text-align: right;
  color: #2c3e50;
}
.codigo-destacado[_ngcontent-%COMP%] {
  background: #e3f2fd;
  color: #1565c0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 700;
  font-family: "Courier New", monospace;
}
.responsable-info[_ngcontent-%COMP%] {
  margin: 1rem 0;
}
.responsable-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #e8f5e8,
      #f0f8ff);
  border: 2px solid #28a745;
  border-radius: 0.75rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}
.responsable-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background:
    linear-gradient(
      90deg,
      #28a745,
      #20c997);
}
.responsable-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #c3e6cb;
}
.responsable-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #28a745;
  font-size: 1.25rem;
}
.responsable-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {
  color: #155724;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}
.responsable-datos[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
.responsable-datos[_ngcontent-%COMP%]   .dato-item[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.7);
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(40, 167, 69, 0.2);
}
.estado-aprobado[_ngcontent-%COMP%] {
  background-color: #d4edda !important;
  color: #155724 !important;
  border: 1px solid #c3e6cb;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
.warning-message[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #fff3cd,
      #fef8e6);
  border: 1px solid #ffeaa7;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.warning-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #856404;
  font-size: 1.125rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}
.warning-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #856404;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}
.btn-success[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #28a745,
      #20c997);
  border-color: #28a745;
  color: white;
  box-shadow: 0 2px 4px rgba(40, 167, 69, 0.3);
  position: relative;
  overflow: hidden;
}
.btn-success[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}
.btn-success[_ngcontent-%COMP%]:hover:not(:disabled) {
  background:
    linear-gradient(
      135deg,
      #218838,
      #1e7e34);
  border-color: #1e7e34;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.4);
}
.btn-success[_ngcontent-%COMP%]:hover:not(:disabled)::before {
  width: 300px;
  height: 300px;
}
@media (max-width: 768px) {
  .mis-tramites-container[_ngcontent-%COMP%] {
    padding: 0.75rem;
    background: #f3f4f6;
  }
  .header-section[_ngcontent-%COMP%] {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  .title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    font-size: 1.375rem;
  }
  .btn-nuevo[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
  .stats-cards[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
  }
  .toolbar[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 0.75rem;
  }
  .search-section[_ngcontent-%COMP%] {
    width: 100%;
    max-width: none;
  }
  .search-dropdown[_ngcontent-%COMP%] {
    border-radius: 0 0 0.75rem 0.75rem;
    max-height: 280px;
  }
  .search-result-item[_ngcontent-%COMP%] {
    padding: 0.5rem 0.625rem;
  }
  .error-suggestions[_ngcontent-%COMP%] {
    font-size: 0.6875rem;
  }
  .toolbar-actions[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: space-between;
  }
  .tramites-grid[_ngcontent-%COMP%] {
    gap: 1rem;
    padding: 0 0.25rem;
  }
  .tramite-card[_ngcontent-%COMP%] {
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
    background: white;
    overflow: hidden;
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;
  }
  .tramite-card[_ngcontent-%COMP%]:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
  .card-header[_ngcontent-%COMP%] {
    background:
      linear-gradient(
        135deg,
        #f8fafc 0%,
        #f1f5f9 100%);
    padding: 1rem 1rem 0.75rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .tramite-codigo[_ngcontent-%COMP%] {
    font-size: 0.875rem;
    font-weight: 600;
    color: #3b82f6;
    background: #eff6ff;
    padding: 0.375rem 0.75rem;
    border-radius: 0.75rem;
    font-family: "SF Mono", monospace;
    flex-shrink: 0;
  }
  .tramite-fecha[_ngcontent-%COMP%] {
    font-size: 0.75rem;
    padding: 0.25rem 0.625rem;
    border-radius: 1rem;
    background: #fef3c7;
    color: #78350f;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .card-content[_ngcontent-%COMP%] {
    padding: 0.75rem 1rem;
  }
  .tramite-asunto[_ngcontent-%COMP%] {
    font-size: 1rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #1e293b;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tramite-tipo[_ngcontent-%COMP%] {
    font-size: 0.8125rem;
    color: #64748b;
    margin-bottom: 0.75rem;
    font-weight: 500;
  }
  .tramite-meta[_ngcontent-%COMP%] {
    margin-bottom: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  .prioridad[_ngcontent-%COMP%], .area[_ngcontent-%COMP%] {
    font-size: 0.6875rem;
    padding: 0.375rem 0.75rem;
    border-radius: 1rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
  .card-progress[_ngcontent-%COMP%] {
    padding: 0 1rem 0.75rem 1rem;
  }
  .progress-bar[_ngcontent-%COMP%] {
    height: 4px;
    border-radius: 2px;
    margin-bottom: 0.5rem;
  }
  .progress-text[_ngcontent-%COMP%] {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
  }
  .card-actions[_ngcontent-%COMP%] {
    background: #f8fafc;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .btn-action[_ngcontent-%COMP%] {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
  }
  .btn-action[_ngcontent-%COMP%]:active {
    transform: scale(0.95);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }
  .vencimiento-indicator[_ngcontent-%COMP%] {
    top: 3.25rem;
    right: 1rem;
    left: auto;
    bottom: auto;
    padding: 0.125rem 0.375rem;
    font-size: 0.5rem;
    border-radius: 0.375rem;
    font-weight: 700;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    min-width: auto;
    width: auto;
    gap: 0.125rem;
    max-width: 5rem;
  }
  .tramites-table[_ngcontent-%COMP%] {
    display: none;
  }
  .tramites-table.mobile-view[_ngcontent-%COMP%] {
    display: block;
    background: transparent;
    border: none;
  }
  .tramites-table[_ngcontent-%COMP%] {
    display: block;
    background: transparent;
    border: none;
    padding: 0;
  }
  .table-responsive-wrapper[_ngcontent-%COMP%] {
    padding: 0;
  }
  .tramites-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {
    display: block;
    min-width: unset;
  }
  .tramites-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
    display: none;
  }
  .tramites-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%] {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .tramites-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
  }
  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border: none;
    font-size: 13px;
  }
  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
    order: -1;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 8px;
  }
  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 12px;
  }
  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3), .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(5), .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(6) {
    font-size: 12px;
    color: #6b7280;
  }
  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(4) {
    justify-content: flex-start;
    padding: 8px 0;
  }
  .tramites-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
    margin-top: 8px;
  }
  .table-actions[_ngcontent-%COMP%] {
    justify-content: center;
    gap: 8px;
  }
  .btn-mini[_ngcontent-%COMP%] {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    font-size: 12px;
  }
}
@media (max-width: 768px) {
  .modal-overlay[_ngcontent-%COMP%] {
    padding: 0.5rem;
  }
  .modal-content[_ngcontent-%COMP%] {
    width: 95vw !important;
    max-width: 95vw !important;
    margin: 0 auto;
    max-height: 95vh;
    border-radius: 1rem !important;
  }
  .detalle-modal[_ngcontent-%COMP%] {
    max-width: 95vw !important;
    width: 95vw !important;
  }
  .modal-header[_ngcontent-%COMP%] {
    padding: 1rem !important;
    border-radius: 1rem 1rem 0 0 !important;
  }
  .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    font-size: 1.125rem !important;
  }
  .modal-body[_ngcontent-%COMP%] {
    padding: 1rem !important;
    max-height: calc(95vh - 130px);
    overflow-y: auto;
  }
  .modal-footer[_ngcontent-%COMP%] {
    padding: 1rem !important;
    flex-direction: row !important;
    gap: 0.75rem;
    border-radius: 0 0 1rem 1rem !important;
  }
  .detalle-grid[_ngcontent-%COMP%] {
    gap: 1rem;
  }
  .info-section[_ngcontent-%COMP%], .fechas-section[_ngcontent-%COMP%], .descripcion-section[_ngcontent-%COMP%], .documentos-section[_ngcontent-%COMP%], .asignacion-section[_ngcontent-%COMP%], .calificacion-section[_ngcontent-%COMP%], .progreso-section[_ngcontent-%COMP%] {
    padding: 1rem;
    border-radius: 8px;
  }
  .info-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .fechas-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .descripcion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .documentos-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .asignacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .calificacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .progreso-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }
  .info-item[_ngcontent-%COMP%] {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
  .codigo-destacado[_ngcontent-%COMP%] {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
  .firma-digital-section[_ngcontent-%COMP%] {
    padding: 1rem;
    margin: 1rem 0;
  }
  .firma-digital-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  .firma-two-columns[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .status-badge-large.success[_ngcontent-%COMP%] {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
  .fecha-firma-large[_ngcontent-%COMP%], .validez-legal-large[_ngcontent-%COMP%] {
    padding: 1rem;
  }
  .progress-container[_ngcontent-%COMP%] {
    padding: 1rem;
  }
  .progress-percentage[_ngcontent-%COMP%] {
    font-size: 1rem;
  }
  .progress-info-detail[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
@media (max-width: 480px) {
  .mis-tramites-container[_ngcontent-%COMP%] {
    padding: 0.5rem;
  }
  .title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    font-size: 1.25rem;
  }
  .title-area[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
    font-size: 0.75rem;
  }
  .stats-cards[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .stat-card[_ngcontent-%COMP%] {
    padding: 0.75rem;
    flex-direction: column;
    text-align: center;
  }
  .stat-icon[_ngcontent-%COMP%] {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1rem;
  }
  .stat-number[_ngcontent-%COMP%] {
    font-size: 1.125rem;
  }
  .stat-label[_ngcontent-%COMP%] {
    font-size: 0.6875rem;
  }
  .search-dropdown[_ngcontent-%COMP%] {
    max-height: 240px;
  }
  .result-codigo[_ngcontent-%COMP%] {
    font-size: 0.6875rem;
  }
  .result-asunto[_ngcontent-%COMP%] {
    font-size: 0.75rem;
  }
  .filter-actions[_ngcontent-%COMP%] {
    flex-direction: column;
  }
  .btn-apply[_ngcontent-%COMP%], .btn-clear[_ngcontent-%COMP%] {
    width: 100%;
  }
  .tramite-card[_ngcontent-%COMP%] {
    border-radius: 0.625rem;
  }
  .card-header[_ngcontent-%COMP%] {
    padding: 0.5rem 0.625rem;
  }
  .tramite-fecha[_ngcontent-%COMP%] {
    font-size: 0.625rem;
    padding: 0.1875rem 0.375rem;
  }
  .card-content[_ngcontent-%COMP%] {
    padding: 0 0.625rem 0.5rem 0.625rem;
  }
  .tramite-asunto[_ngcontent-%COMP%] {
    font-size: 0.875rem;
  }
  .card-actions[_ngcontent-%COMP%] {
    padding: 0.375rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .btn-action[_ngcontent-%COMP%] {
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
  }
  .modal-overlay[_ngcontent-%COMP%] {
    padding: 0.25rem;
  }
  .modal-content[_ngcontent-%COMP%] {
    width: 98vw !important;
    max-width: 98vw !important;
    max-height: 98vh !important;
    border-radius: 0.75rem !important;
  }
  .detalle-modal[_ngcontent-%COMP%] {
    max-width: 98vw !important;
    width: 98vw !important;
  }
  .modal-header[_ngcontent-%COMP%] {
    padding: 0.75rem !important;
  }
  .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    font-size: 1rem !important;
  }
  .modal-body[_ngcontent-%COMP%] {
    padding: 0.75rem !important;
    max-height: calc(98vh - 120px);
  }
  .modal-footer[_ngcontent-%COMP%] {
    padding: 0.75rem !important;
    flex-direction: column !important;
    gap: 0.5rem;
  }
  .footer-actions[_ngcontent-%COMP%] {
    width: 100% !important;
    flex-direction: column !important;
  }
  .btn-cancel[_ngcontent-%COMP%], .btn-save[_ngcontent-%COMP%], .btn-primary[_ngcontent-%COMP%], .btn-info[_ngcontent-%COMP%], .btn-warning[_ngcontent-%COMP%] {
    width: 100% !important;
    padding: 0.75rem !important;
    font-size: 0.9rem !important;
  }
  .info-section[_ngcontent-%COMP%], .fechas-section[_ngcontent-%COMP%], .descripcion-section[_ngcontent-%COMP%], .documentos-section[_ngcontent-%COMP%], .asignacion-section[_ngcontent-%COMP%], .calificacion-section[_ngcontent-%COMP%], .progreso-section[_ngcontent-%COMP%] {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  .info-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .fechas-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .descripcion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .documentos-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .asignacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .calificacion-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .progreso-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  .info-item[_ngcontent-%COMP%] {
    font-size: 0.8rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
  .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
    font-weight: 600;
    color: #64748b;
  }
  .firma-digital-section[_ngcontent-%COMP%] {
    padding: 0.75rem;
    margin: 0.75rem 0;
  }
  .firma-digital-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  .status-badge-large.success[_ngcontent-%COMP%] {
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }
  .fecha-firma-large[_ngcontent-%COMP%], .validez-legal-large[_ngcontent-%COMP%] {
    padding: 0.75rem;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }
  .fecha-content[_ngcontent-%COMP%], .validez-content[_ngcontent-%COMP%] {
    gap: 0.25rem;
  }
  .fecha-label[_ngcontent-%COMP%], .validez-label[_ngcontent-%COMP%] {
    font-size: 0.8rem;
  }
  .fecha-value[_ngcontent-%COMP%] {
    font-size: 0.9rem;
  }
  .validez-value[_ngcontent-%COMP%] {
    font-size: 0.85rem;
  }
}
.respuesta-preview[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #e8f6ff 0%,
      #f3fbff 100%);
  border: 1px solid #b8daff;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-size: 0.85rem;
  position: relative;
}
.respuesta-preview[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  bottom: -1px;
  width: 3px;
  background:
    linear-gradient(
      180deg,
      #007bff 0%,
      #0056b3 100%);
  border-radius: 8px 0 0 8px;
}
.respuesta-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: #0056b3;
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
}
.respuesta-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #007bff;
  font-size: 0.75rem;
}
.respuesta-texto[_ngcontent-%COMP%] {
  color: #2c3e50;
  line-height: 1.4;
  margin: 0 0 0.4rem 0;
  font-weight: 500;
  word-break: break-word;
}
.respuesta-fecha[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #6c757d;
  font-size: 0.75rem;
  font-weight: 500;
}
.respuesta-fecha[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #28a745;
  font-size: 0.7rem;
}
@media (max-width: 768px) {
  .respuesta-preview[_ngcontent-%COMP%] {
    padding: 0.5rem;
    font-size: 0.8rem;
    margin: 0.4rem 0;
  }
  .respuesta-header[_ngcontent-%COMP%] {
    font-size: 0.75rem;
    gap: 0.3rem;
    margin-bottom: 0.3rem;
  }
  .respuesta-texto[_ngcontent-%COMP%] {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
  .respuesta-fecha[_ngcontent-%COMP%] {
    font-size: 0.7rem;
    gap: 0.25rem;
  }
  .respuesta-preview[_ngcontent-%COMP%]::before {
    width: 100%;
    height: 3px;
    top: -1px;
    bottom: auto;
    left: -1px;
    right: -1px;
    border-radius: 8px 8px 0 0;
    background:
      linear-gradient(
        90deg,
        #007bff 0%,
        #0056b3 100%);
  }
}
.modal-content-large[_ngcontent-%COMP%] {
  max-width: 900px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: none;
  background: white !important;
}
.modal-content-large[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {
  background: white !important;
  padding: 24px;
}
.modal-content-large[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {
  background: white !important;
  border-bottom: 1px solid #e2e8f0;
  border-radius: 20px 20px 0 0;
}
.modal-content-large[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {
  background: white !important;
  border-top: 1px solid #e2e8f0;
  border-radius: 0 0 20px 20px;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.modal-content-large[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #3b82f6 0%,
      #1d4ed8 100%) !important;
  border: none !important;
  color: white !important;
  padding: 12px 24px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
}
.modal-content-large[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background:
    linear-gradient(
      135deg,
      #2563eb 0%,
      #1e40af 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5) !important;
}
.modal-content-large[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:disabled {
  background:
    linear-gradient(
      135deg,
      #94a3b8 0%,
      #64748b 100%) !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: 0 2px 8px rgba(148, 163, 184, 0.3) !important;
}
.modal-content-large[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #6b7280 0%,
      #4b5563 100%) !important;
  border: none !important;
  color: white !important;
  padding: 12px 24px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
}
.modal-content-large[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {
  background:
    linear-gradient(
      135deg,
      #374151 0%,
      #1f2937 100%) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4) !important;
}
.tramite-info-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  border: none;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}
.tramite-info-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><circle cx="36" cy="24" r="2"/><circle cx="6" cy="44" r="2"/><circle cx="36" cy="4" r="2"/></g></g></svg>');
  opacity: 0.3;
}
.tramite-info-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 16px 0;
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
}
.tramite-info-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::before {
  content: "\\1f4cb";
  font-size: 24px;
}
.tramite-info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}
.tramite-info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: white;
  font-weight: 600;
}
.trabajadores-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin-bottom: 20px;
  color: #1e293b;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
}
.trabajadores-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::before {
  content: "\\1f465";
  font-size: 24px;
}
.instruction-text[_ngcontent-%COMP%] {
  margin: 0 0 20px 0;
  padding: 12px 16px;
  background:
    linear-gradient(
      135deg,
      #eff6ff 0%,
      #dbeafe 100%);
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  color: #1e40af;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}
.instruction-text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 16px;
}
.loading-state[_ngcontent-%COMP%] {
  text-align: center;
  padding: 60px 40px;
  color: #64748b;
  background:
    linear-gradient(
      135deg,
      #f1f5f9 0%,
      #e2e8f0 100%);
  border-radius: 16px;
  border: 2px dashed #cbd5e1;
  margin: 20px 0;
}
.loading-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  margin-right: 12px;
  font-size: 24px;
  color: #3b82f6;
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.trabajadores-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
}
.trabajador-card[_ngcontent-%COMP%] {
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background:
    linear-gradient(
      135deg,
      #ffffff 0%,
      #f8fafc 100%);
  display: flex;
  align-items: flex-start;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}
.trabajador-card[_ngcontent-%COMP%]:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}
.trabajador-card.selected[_ngcontent-%COMP%] {
  border-color: #22c55e;
  border-width: 2px;
  background:
    linear-gradient(
      135deg,
      #f0fdf4 0%,
      #dcfce7 100%);
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1), 0 8px 25px rgba(34, 197, 94, 0.25);
  transform: translateY(-2px);
  position: relative;
}
.trabajador-card.selected[_ngcontent-%COMP%]::before {
  content: "\\2713  Seleccionado";
  position: absolute;
  top: 12px;
  right: 12px;
  background:
    linear-gradient(
      135deg,
      #22c55e 0%,
      #16a34a 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
  letter-spacing: 0.3px;
  z-index: 1;
  transition: all 0.2s ease;
}
.trabajador-card.selected[_ngcontent-%COMP%]::after {
  content: "\\2713";
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background:
    linear-gradient(
      135deg,
      #22c55e 0%,
      #16a34a 100%);
  color: white;
  border-radius: 50%;
  font-size: 22px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
  animation: _ngcontent-%COMP%_checkmarkAppear 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center;
  line-height: 40px;
  z-index: 2;
}
@keyframes _ngcontent-%COMP%_checkmarkAppear {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
.trabajador-card.selected[_ngcontent-%COMP%]:hover {
  border-color: #16a34a;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.15), 0 12px 30px rgba(34, 197, 94, 0.3);
  transform: translateY(-3px);
  cursor: pointer;
}
.trabajador-card.selected[_ngcontent-%COMP%]:hover::before {
  content: "\\2713  Clic para deseleccionar";
  background:
    linear-gradient(
      135deg,
      #16a34a 0%,
      #15803d 100%);
  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.5);
  transform: scale(1.05);
}
.trabajador-card.disabled[_ngcontent-%COMP%] {
  opacity: 0.7;
  cursor: not-allowed;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #e2e8f0 100%);
  border-color: #cbd5e1;
}
.trabajador-card.disabled[_ngcontent-%COMP%]:hover {
  border-color: #e9ecef;
  box-shadow: none;
  transform: none;
}
.trabajador-avatar[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background:
    linear-gradient(
      135deg,
      #3b82f6 0%,
      #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
}
.trabajador-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}
.trabajador-avatar[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: -2px;
  padding: 2px;
  background:
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3),
      transparent);
  border-radius: 18px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
}
.trabajador-card.selected[_ngcontent-%COMP%]   .trabajador-avatar[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #22c55e 0%,
      #16a34a 100%);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
}
.trabajador-card.disabled[_ngcontent-%COMP%]   .trabajador-avatar[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #64748b 0%,
      #475569 100%);
  box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);
}
.trabajador-info[_ngcontent-%COMP%] {
  flex: 1;
}
.trabajador-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.025em;
}
.trabajador-info[_ngcontent-%COMP%]   .area[_ngcontent-%COMP%] {
  margin: 0 0 16px 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.trabajador-info[_ngcontent-%COMP%]   .area[_ngcontent-%COMP%]::before {
  content: "\\1f3e2";
  font-size: 12px;
}
.carga-trabajo[_ngcontent-%COMP%] {
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.5);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.tramites-count[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #475569;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}
.tramites-count[_ngcontent-%COMP%]::after {
  content: "\\1f4ca";
  font-size: 12px;
}
.workload-percentage[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  margin-top: 4px;
  text-align: center;
}
.progress-bar[_ngcontent-%COMP%] {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}
.progress-fill[_ngcontent-%COMP%] {
  height: 100%;
  background:
    linear-gradient(
      90deg,
      #22c55e 0%,
      #16a34a 100%);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
.progress-fill[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(
      45deg,
      transparent 25%,
      rgba(255, 255, 255, 0.2) 25%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 50%,
      transparent 75%,
      rgba(255, 255, 255, 0.2) 75%);
  background-size: 8px 8px;
  animation: _ngcontent-%COMP%_progress-stripes 1s linear infinite;
}
@keyframes _ngcontent-%COMP%_progress-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 8px 0;
  }
}
.progress-fill.warning[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #f59e0b 0%,
      #d97706 100%);
}
.progress-fill.danger[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      90deg,
      #ef4444 0%,
      #dc2626 100%);
}
.error-message[_ngcontent-%COMP%] {
  color: #dc2626;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  background: rgba(239, 68, 68, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  line-height: 1.4;
}
.error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #ef4444;
  animation: _ngcontent-%COMP%_shake 0.5s ease-in-out;
}
@keyframes _ngcontent-%COMP%_shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
}
.error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 14px;
}
.status-available[_ngcontent-%COMP%] {
  color: #16a34a;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  background: rgba(34, 197, 94, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(34, 197, 94, 0.2);
}
.status-available[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_pulse 2s infinite;
}
@keyframes _ngcontent-%COMP%_pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.observaciones-section[_ngcontent-%COMP%] {
  margin-top: 24px;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #e2e8f0 100%);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}
.observaciones-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin-bottom: 16px;
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}
.observaciones-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::before {
  content: "\\1f4dd";
  font-size: 20px;
}
.form-textarea[_ngcontent-%COMP%] {
  width: 100%;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 15px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-height: 100px;
}
.form-textarea[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}
@media (max-width: 768px) {
  .modal-content-large[_ngcontent-%COMP%] {
    max-width: 95vw !important;
    margin: 10px !important;
    max-height: 95vh !important;
    border-radius: 16px !important;
  }
  .modal-content-large[_ngcontent-%COMP%]   .modal-body[_ngcontent-%COMP%] {
    max-height: calc(95vh - 140px) !important;
    overflow-y: auto !important;
    padding: 16px !important;
  }
  .modal-content-large[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%] {
    padding: 16px !important;
    border-radius: 16px 16px 0 0 !important;
  }
  .modal-content-large[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
    font-size: 18px !important;
  }
  .modal-content-large[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%] {
    padding: 16px !important;
    gap: 12px !important;
    border-radius: 0 0 16px 16px !important;
  }
  .trabajadores-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
  }
  .trabajador-card[_ngcontent-%COMP%] {
    display: flex !important;
    flex-direction: row !important;
    padding: 12px !important;
    align-items: center !important;
    min-height: auto !important;
    height: auto !important;
    border-radius: 12px !important;
  }
  .trabajador-card.selected[_ngcontent-%COMP%]::before {
    content: "\\2713  SELECCIONADO" !important;
    top: -6px !important;
    font-size: 9px !important;
    padding: 2px 6px !important;
    border-radius: 8px !important;
  }
  .trabajador-avatar[_ngcontent-%COMP%] {
    width: 48px !important;
    height: 48px !important;
    margin-right: 12px !important;
    margin-bottom: 0 !important;
    flex-shrink: 0 !important;
    border-radius: 12px !important;
  }
  .trabajador-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
    width: 32px !important;
    height: 32px !important;
    border-radius: 8px !important;
  }
  .trabajador-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    font-size: 18px !important;
  }
  .trabajador-info[_ngcontent-%COMP%] {
    flex: 1 !important;
    text-align: left !important;
  }
  .trabajador-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
    font-size: 15px !important;
    margin-bottom: 3px !important;
    line-height: 1.3 !important;
    font-weight: 600 !important;
  }
  .trabajador-info[_ngcontent-%COMP%]   .area[_ngcontent-%COMP%] {
    font-size: 12px !important;
    margin-bottom: 6px !important;
    color: #64748b !important;
  }
  .carga-trabajo[_ngcontent-%COMP%] {
    margin-bottom: 6px !important;
  }
  .tramites-count[_ngcontent-%COMP%] {
    font-size: 11px !important;
    margin-bottom: 3px !important;
    font-weight: 500 !important;
  }
  .progress-bar[_ngcontent-%COMP%] {
    height: 4px !important;
    border-radius: 2px !important;
  }
  .error-message[_ngcontent-%COMP%] {
    font-size: 10px !important;
    padding: 6px 8px !important;
    line-height: 1.3 !important;
    border-radius: 6px !important;
  }
  .error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    font-size: 12px !important;
  }
  .status-available[_ngcontent-%COMP%] {
    font-size: 10px !important;
    padding: 4px 8px !important;
    border-radius: 6px !important;
  }
  .observaciones-section[_ngcontent-%COMP%] {
    margin-top: 16px !important;
    padding: 12px !important;
    border-radius: 12px !important;
  }
  .observaciones-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    font-size: 16px !important;
    margin-bottom: 10px !important;
  }
  .form-textarea[_ngcontent-%COMP%] {
    min-height: 70px !important;
    font-size: 14px !important;
    padding: 10px !important;
    border-radius: 8px !important;
  }
  .instruction-text[_ngcontent-%COMP%] {
    font-size: 12px !important;
    padding: 8px 12px !important;
    margin-bottom: 12px !important;
    border-radius: 8px !important;
    line-height: 1.4 !important;
  }
  .instruction-text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    font-size: 13px !important;
  }
  .modal-content-large[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
    padding: 12px 16px !important;
    font-size: 14px !important;
    border-radius: 10px !important;
  }
  .modal-content-large[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {
    padding: 12px 20px !important;
  }
}
.edit-form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 4px 0;
}
.edit-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.edit-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 8px;
}
.edit-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #6366f1;
  font-size: 16px;
}
.optional-badge[_ngcontent-%COMP%] {
  margin-left: auto;
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 8px;
}
.form-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 15px;
  color: #1e293b;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.form-input[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.form-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 12px rgba(99, 102, 241, 0.15);
  transform: translateY(-1px);
}
.form-input[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.form-textarea[_ngcontent-%COMP%] {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 15px;
  color: #1e293b;
  resize: vertical;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-height: 120px;
  line-height: 1.6;
}
.form-textarea[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.form-textarea[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 12px rgba(99, 102, 241, 0.15);
  transform: translateY(-1px);
}
.form-textarea[_ngcontent-%COMP%]::placeholder {
  color: #94a3b8;
}
.char-counter[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #64748b;
  text-align: right;
  margin-top: 4px;
}
.info-message[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background:
    linear-gradient(
      135deg,
      #eff6ff 0%,
      #dbeafe 100%);
  border-left: 4px solid #3b82f6;
  border-radius: 12px;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.08);
}
.info-icon[_ngcontent-%COMP%] {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background:
    linear-gradient(
      135deg,
      #3b82f6 0%,
      #2563eb 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
.info-content[_ngcontent-%COMP%] {
  flex: 1;
}
.info-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 4px;
}
.info-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 13px;
  color: #1e40af;
  line-height: 1.5;
}
.modal-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {
  padding: 12px 24px;
  background: #f1f5f9;
  color: #475569;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.modal-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #e2e8f0;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {
  padding: 12px 28px;
  background:
    linear-gradient(
      135deg,
      #6366f1 0%,
      #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}
.modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background:
    linear-gradient(
      135deg,
      #4f46e5 0%,
      #4338ca 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}
.modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:disabled, .modal-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
@media (max-width: 768px) {
  .edit-form[_ngcontent-%COMP%] {
    gap: 20px;
  }
  .form-input[_ngcontent-%COMP%], .form-textarea[_ngcontent-%COMP%] {
    font-size: 16px;
    padding: 12px 14px;
  }
  .form-textarea[_ngcontent-%COMP%] {
    min-height: 100px;
  }
  .info-message[_ngcontent-%COMP%] {
    padding: 14px;
    gap: 12px;
  }
  .info-icon[_ngcontent-%COMP%] {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  .info-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .info-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
    font-size: 12px;
  }
  .modal-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], .modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {
    padding: 10px 20px;
    font-size: 14px;
  }
}
.documentos-section[_ngcontent-%COMP%] {
  margin-top: 24px;
  padding: 20px;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #f1f5f9 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}
.documentos-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 16px 0;
  color: #1e293b;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}
.documentos-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #6366f1;
  font-size: 18px;
}
.documentos-list-edit[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.documento-item-edit[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}
.documento-item-edit[_ngcontent-%COMP%]:hover {
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}
.documento-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.documento-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #dc2626;
  font-size: 20px;
  flex-shrink: 0;
}
.documento-nombre[_ngcontent-%COMP%] {
  color: #334155;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  word-break: break-word;
  line-height: 1.4;
}
.documento-size[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 13px;
  font-weight: 400;
  margin-left: 8px;
  flex-shrink: 0;
  white-space: nowrap;
}
.btn-remove-doc[_ngcontent-%COMP%] {
  padding: 8px 12px;
  background:
    linear-gradient(
      135deg,
      #ef4444 0%,
      #dc2626 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-remove-doc[_ngcontent-%COMP%]:hover {
  background:
    linear-gradient(
      135deg,
      #dc2626 0%,
      #b91c1c 100%);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}
.btn-remove-doc[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.upload-section[_ngcontent-%COMP%] {
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  border: 2px dashed #cbd5e1;
  transition: all 0.3s ease;
}
.upload-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 16px 0;
  color: #1e293b;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}
.upload-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 18px;
}
.upload-area[_ngcontent-%COMP%] {
  padding: 40px 20px;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #f1f5f9 100%);
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-area[_ngcontent-%COMP%]:hover, .upload-area.drag-over[_ngcontent-%COMP%] {
  border-color: #6366f1;
  background:
    linear-gradient(
      135deg,
      #eef2ff 0%,
      #e0e7ff 100%);
  transform: scale(1.02);
}
.upload-area[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 48px;
  color: #6366f1;
  margin-bottom: 16px;
  display: block;
}
.upload-text[_ngcontent-%COMP%] {
  color: #334155;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
}
.upload-hint[_ngcontent-%COMP%] {
  color: #64748b;
  font-size: 13px;
  margin: 0;
}
.archivos-nuevos-list[_ngcontent-%COMP%] {
  margin-top: 20px;
}
.archivos-nuevos-list[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {
  margin: 0 0 12px 0;
  color: #1e293b;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.archivo-nuevo-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background:
    linear-gradient(
      135deg,
      #e0e7ff 0%,
      #c7d2fe 100%);
  border: 2px solid #a5b4fc;
  border-radius: 10px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}
.archivo-nuevo-item[_ngcontent-%COMP%]:hover {
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}
.archivo-info[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}
.archivo-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #4338ca;
  font-size: 18px;
}
.archivo-nombre[_ngcontent-%COMP%] {
  color: #1e293b;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
}
.archivo-size[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 13px;
  font-weight: 400;
  margin-left: 8px;
}
.btn-remove-new[_ngcontent-%COMP%] {
  padding: 6px 10px;
  background:
    linear-gradient(
      135deg,
      #64748b 0%,
      #475569 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
}
.btn-remove-new[_ngcontent-%COMP%]:hover {
  background:
    linear-gradient(
      135deg,
      #475569 0%,
      #334155 100%);
  transform: scale(1.05);
}
.btn-remove-new[_ngcontent-%COMP%]:active {
  transform: scale(0.95);
}
@media (max-width: 768px) {
  .documentos-section[_ngcontent-%COMP%], .upload-section[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .documento-item-edit[_ngcontent-%COMP%], .archivo-nuevo-item[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .documento-info[_ngcontent-%COMP%], .archivo-info[_ngcontent-%COMP%] {
    width: 100%;
  }
  .btn-remove-doc[_ngcontent-%COMP%], .btn-remove-new[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
  .upload-area[_ngcontent-%COMP%] {
    padding: 30px 16px;
  }
  .upload-area[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    font-size: 36px;
  }
  .upload-text[_ngcontent-%COMP%] {
    font-size: 14px;
  }
  .upload-hint[_ngcontent-%COMP%] {
    font-size: 12px;
  }
}
.firma-digital-section[_ngcontent-%COMP%] {
  margin: 1.5rem 0;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #e2e8f0 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.firma-digital-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.firma-digital-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #16a34a;
  font-size: 1.2rem;
}
.firma-status-clean[_ngcontent-%COMP%] {
  margin-bottom: 1rem;
}
.status-badge.success[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background:
    linear-gradient(
      135deg,
      #dcfce7 0%,
      #bbf7d0 100%);
  color: #166534;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  border: 1px solid #86efac;
  box-shadow: 0 1px 3px rgba(22, 101, 52, 0.1);
}
.status-badge.success[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #16a34a;
  font-size: 1.1rem;
}
.firma-details-clean[_ngcontent-%COMP%] {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.detail-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(203, 213, 225, 0.5);
}
.detail-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 1rem;
  width: 20px;
  text-align: center;
}
.detail-label[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #475569;
  min-width: 120px;
}
.detail-value[_ngcontent-%COMP%] {
  color: #1e293b;
  font-weight: 600;
}
.firma-legal-clean[_ngcontent-%COMP%] {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(203, 213, 225, 0.7);
}
.legal-content[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: rgba(59, 130, 246, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}
.legal-content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 1.2rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}
.legal-text[_ngcontent-%COMP%] {
  flex: 1;
}
.legal-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #1e293b;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
.legal-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}
@media (max-width: 768px) {
  .firma-digital-section[_ngcontent-%COMP%] {
    padding: 1rem;
    margin: 1rem 0;
  }
  .detail-item[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .detail-label[_ngcontent-%COMP%] {
    min-width: auto;
  }
  .legal-content[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 0.5rem;
  }
}
.firma-digital-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.firma-digital-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #16a34a;
  font-size: 1.6rem;
}
.firma-digital-info-large[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.firma-status-large[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.status-badge-large.success[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background:
    linear-gradient(
      135deg,
      #dcfce7 0%,
      #bbf7d0 100%);
  color: #166534;
  padding: 1.25rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  border: 2px solid #86efac;
  box-shadow: 0 4px 12px rgba(22, 101, 52, 0.15);
  text-align: center;
}
.status-badge-large.success[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #16a34a;
  font-size: 1.4rem;
}
.firma-two-columns[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
}
.column-left[_ngcontent-%COMP%], .column-right[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}
.fecha-firma-large[_ngcontent-%COMP%], .validez-legal-large[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(203, 213, 225, 0.6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.fecha-firma-large[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 1.5rem;
  margin-top: 0.25rem;
}
.validez-legal-large[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #f59e0b;
  font-size: 1.5rem;
  margin-top: 0.25rem;
}
.fecha-content[_ngcontent-%COMP%], .validez-content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
.fecha-label[_ngcontent-%COMP%], .validez-label[_ngcontent-%COMP%] {
  font-weight: 600;
  font-size: 0.95rem;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.fecha-value[_ngcontent-%COMP%] {
  font-size: 1.1rem;
  font-weight: 500;
  color: #1f2937;
}
.validez-value[_ngcontent-%COMP%] {
  font-size: 1rem;
  color: #374151;
  line-height: 1.4;
}
@media (max-width: 768px) {
  .firma-two-columns[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .status-badge-large.success[_ngcontent-%COMP%] {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
  .firma-digital-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    font-size: 1.2rem;
  }
  .fecha-firma-large[_ngcontent-%COMP%], .validez-legal-large[_ngcontent-%COMP%] {
    padding: 1.25rem;
  }
}
.firma-digital-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  background:
    linear-gradient(
      135deg,
      #f8fafc 0%,
      #f1f5f9 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.header-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-left[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-left[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #3b82f6;
  font-size: 20px;
}
.firma-status-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #dcfce7;
  color: #166534;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #bbf7d0;
}
.firma-status-badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 12px;
}
.header-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.btn-edit-signature[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  color: #374151;
  border: 2px solid #d1d5db;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  outline: none;
  white-space: nowrap;
}
.btn-edit-signature[_ngcontent-%COMP%]:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.btn-edit-signature.active[_ngcontent-%COMP%] {
  background: #ef4444;
  color: #ffffff;
  border-color: #dc2626;
}
.btn-edit-signature.active[_ngcontent-%COMP%]:hover {
  background: #dc2626;
  border-color: #b91c1c;
}
.btn-edit-signature[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 14px;
}
.signature-canvas-wrapper[_ngcontent-%COMP%] {
  background: #ffffff;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.canvas-container[_ngcontent-%COMP%] {
  position: relative;
  margin-bottom: 16px;
}
.signature-canvas[_ngcontent-%COMP%] {
  width: 100%;
  height: 200px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #fafbfc;
  cursor: crosshair;
  transition: all 0.2s ease;
  touch-action: none;
}
.signature-canvas[_ngcontent-%COMP%]:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}
.signature-canvas.has-signature[_ngcontent-%COMP%] {
  border-style: solid;
  border-color: #10b981;
  background: #ffffff;
}
.canvas-placeholder[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #9ca3af;
  pointer-events: none;
  z-index: 1;
}
.canvas-placeholder[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 32px;
  margin-bottom: 8px;
  display: block;
}
.canvas-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}
.canvas-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.btn-canvas-action[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  text-decoration: none;
  min-width: 120px;
  justify-content: center;
}
.btn-canvas-action[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}
.btn-clear[_ngcontent-%COMP%] {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.btn-clear[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #fee2e2;
  border-color: #fca5a5;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}
.btn-capture[_ngcontent-%COMP%] {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
}
.btn-capture[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #dbeafe;
  border-color: #93c5fd;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}
.btn-canvas-action[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 14px;
}
.canvas-status[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6b7280;
}
.canvas-status.success[_ngcontent-%COMP%] {
  color: #059669;
}
.canvas-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 12px;
}
.canvas-instructions[_ngcontent-%COMP%] {
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}
.canvas-instructions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 12px;
  color: #075985;
  text-align: center;
}
.signature-form-fields[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.signature-form-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.signature-form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 6px;
}
.signature-form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #6366f1;
  font-size: 14px;
}
.signature-form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .signature-form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: #ffffff;
  transition: all 0.2s ease;
}
.signature-form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .signature-form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
.signature-terms-section[_ngcontent-%COMP%] {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}
.signature-terms-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.signature-terms-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}
.signature-terms-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  color: #f59e0b;
  font-size: 18px;
}
.signature-terms-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  margin: 0 0 12px 0;
}
.signature-terms-checkbox[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 12px;
}
.signature-terms-checkbox[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  margin-top: 2px;
}
.signature-terms-checkbox[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  cursor: pointer;
  flex: 1;
}
.btn-open-terms[_ngcontent-%COMP%] {
  color: #6366f1;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
}
.btn-open-terms[_ngcontent-%COMP%]:hover {
  color: #4f46e5;
}
.terms-modal-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.terms-modal-content[_ngcontent-%COMP%] {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}
.terms-modal-header[_ngcontent-%COMP%] {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.terms-modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}
.terms-modal-close[_ngcontent-%COMP%] {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}
.terms-modal-close[_ngcontent-%COMP%]:hover {
  color: #374151;
}
.terms-modal-body[_ngcontent-%COMP%] {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}
.terms-modal-footer[_ngcontent-%COMP%] {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.btn-terms-modal[_ngcontent-%COMP%] {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}
.btn-terms-cancel[_ngcontent-%COMP%] {
  background: #f3f4f6;
  color: #374151;
}
.btn-terms-cancel[_ngcontent-%COMP%]:hover {
  background: #e5e7eb;
}
.btn-terms-accept[_ngcontent-%COMP%] {
  background: #6366f1;
  color: white;
}
.btn-terms-accept[_ngcontent-%COMP%]:hover {
  background: #4f46e5;
}
@media (max-width: 768px) {
  .firma-digital-header[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 12px;
    text-align: center;
    padding: 12px 16px;
  }
  .header-left[_ngcontent-%COMP%] {
    justify-content: center;
  }
  .btn-edit-signature[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: center;
  }
  .signature-canvas-wrapper[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .canvas-actions[_ngcontent-%COMP%] {
    flex-direction: column;
    gap: 8px;
  }
  .btn-canvas-action[_ngcontent-%COMP%] {
    width: 100%;
  }
  .signature-canvas[_ngcontent-%COMP%] {
    height: 150px;
  }
  .signature-form-fields[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .terms-modal-content[_ngcontent-%COMP%] {
    margin: 10px;
    max-height: 90vh;
  }
  .terms-modal-header[_ngcontent-%COMP%] {
    padding: 16px 20px;
  }
  .terms-modal-body[_ngcontent-%COMP%] {
    padding: 20px;
  }
  .terms-modal-footer[_ngcontent-%COMP%] {
    padding: 12px 20px;
    flex-direction: column;
  }
  .btn-terms-modal[_ngcontent-%COMP%] {
    width: 100%;
  }
}
.signature-preview[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #f0fdf4 0%,
      #dcfce7 100%);
  border: 2px solid #bbf7d0;
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
}
.signature-preview[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #166534;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.signature-preview[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]::before {
  content: "\\2713";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}
.signature-preview-container[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
.signature-image[_ngcontent-%COMP%] {
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 2px solid #16a34a;
  border-radius: 12px;
  background: white;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
}
.signature-info[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(34, 197, 94, 0.3);
}
.signature-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.signature-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.signature-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #166534;
  font-weight: 600;
  min-width: 80px;
  flex-shrink: 0;
}
.signature-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: #374151;
  flex: 1;
  word-break: break-word;
}
.signature-consent[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #eff6ff 0%,
      #dbeafe 100%);
  border: 2px solid #93c5fd;
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
.consent-label[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.6;
  color: #1e40af;
}
.consent-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  accent-color: #3b82f6;
  margin-top: 2px;
  flex-shrink: 0;
}
.consent-text[_ngcontent-%COMP%] {
  flex: 1;
  font-weight: 500;
}
.signature-consent[_ngcontent-%COMP%]::before {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background:
    linear-gradient(
      90deg,
      #3b82f6 0%,
      #1d4ed8 100%);
  border-radius: 3px;
  margin-bottom: 16px;
}
.signature-preview[_ngcontent-%COMP%]::after {
  content: "Firma Capturada";
  position: absolute;
  top: -10px;
  right: 20px;
  background:
    linear-gradient(
      135deg,
      #22c55e 0%,
      #16a34a 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
}
.signature-preview[_ngcontent-%COMP%] {
  position: relative;
}
@media (max-width: 768px) {
  .signature-preview-container[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .signature-image[_ngcontent-%COMP%] {
    max-width: 100%;
    justify-self: center;
  }
  .signature-preview[_ngcontent-%COMP%], .signature-consent[_ngcontent-%COMP%] {
    padding: 16px;
    margin: 16px 0;
  }
  .signature-preview[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
    font-size: 14px;
  }
  .signature-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
    font-size: 13px;
    flex-direction: column;
    gap: 4px;
  }
  .signature-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
    min-width: auto;
  }
  .consent-label[_ngcontent-%COMP%] {
    font-size: 13px;
    gap: 10px;
  }
  .consent-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
    width: 18px;
    height: 18px;
  }
}
.modal-delete-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;
  padding: 1rem;
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes _ngcontent-%COMP%_slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.modal-delete-content[_ngcontent-%COMP%] {
  background: white;
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;
  overflow: hidden;
}
.modal-delete-header[_ngcontent-%COMP%] {
  padding: 2rem 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid #f1f5f9;
}
.modal-delete-icon[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background:
    linear-gradient(
      135deg,
      #fef3c7 0%,
      #fde68a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: _ngcontent-%COMP%_pulse 2s infinite;
}
@keyframes _ngcontent-%COMP%_pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
.modal-delete-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 2.5rem;
  color: #f59e0b;
  animation: _ngcontent-%COMP%_shake 0.5s ease-in-out;
}
@keyframes _ngcontent-%COMP%_shake {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}
.modal-delete-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
}
.modal-delete-body[_ngcontent-%COMP%] {
  padding: 1.5rem 2rem 2rem;
  text-align: center;
}
.modal-delete-question[_ngcontent-%COMP%] {
  font-size: 1.125rem;
  color: #334155;
  margin: 0 0 1rem;
  line-height: 1.6;
}
.modal-delete-question[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: #dc2626;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  background: #fee2e2;
  border-radius: 4px;
}
.modal-delete-warning[_ngcontent-%COMP%] {
  font-size: 0.9375rem;
  color: #64748b;
  margin: 0;
  font-style: italic;
}
.modal-delete-footer[_ngcontent-%COMP%] {
  padding: 0 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.btn-delete-cancel[_ngcontent-%COMP%], .btn-delete-confirm[_ngcontent-%COMP%] {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: inherit;
}
.btn-delete-cancel[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #475569;
}
.btn-delete-cancel[_ngcontent-%COMP%]:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.btn-delete-cancel[_ngcontent-%COMP%]:active {
  transform: translateY(0);
}
.btn-delete-confirm[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #dc2626 0%,
      #b91c1c 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);
}
.btn-delete-confirm[_ngcontent-%COMP%]:hover {
  background:
    linear-gradient(
      135deg,
      #b91c1c 0%,
      #991b1b 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 12px -2px rgba(220, 38, 38, 0.4);
}
.btn-delete-confirm[_ngcontent-%COMP%]:active {
  transform: translateY(0);
}
.btn-delete-cancel[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .btn-delete-confirm[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 1.125rem;
}
@media (max-width: 640px) {
  .modal-delete-content[_ngcontent-%COMP%] {
    margin: 0 1rem;
    border-radius: 16px;
  }
  .modal-delete-header[_ngcontent-%COMP%] {
    padding: 1.5rem 1.5rem 1rem;
  }
  .modal-delete-icon[_ngcontent-%COMP%] {
    width: 70px;
    height: 70px;
    margin-bottom: 1rem;
  }
  .modal-delete-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
    font-size: 2rem;
  }
  .modal-delete-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
    font-size: 1.5rem;
  }
  .modal-delete-body[_ngcontent-%COMP%] {
    padding: 1rem 1.5rem 1.5rem;
  }
  .modal-delete-question[_ngcontent-%COMP%] {
    font-size: 1rem;
  }
  .modal-delete-footer[_ngcontent-%COMP%] {
    padding: 0 1.5rem 1.5rem;
    flex-direction: column;
  }
  .btn-delete-cancel[_ngcontent-%COMP%], .btn-delete-confirm[_ngcontent-%COMP%] {
    width: 100%;
  }
}
/*# sourceMappingURL=mis-tramites.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MisTramitesComponent, { className: "MisTramitesComponent" });
})();
export {
  MisTramitesComponent
};
//# sourceMappingURL=chunk-KJJCUKYY.js.map
