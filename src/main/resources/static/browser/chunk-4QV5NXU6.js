import {
  RechazarTramiteModalComponent,
  ResponderTramiteModalComponent
} from "./chunk-QHHF3ZTO.js";
import {
  MisTramitesService
} from "./chunk-D6OJPHZD.js";
import {
  TramiteService
} from "./chunk-DLKCR3ZE.js";
import {
  BandejaTramitesService
} from "./chunk-KT4AJKHL.js";
import {
  ToastService
} from "./chunk-NXAITARR.js";
import {
  AuthService,
  RouterModule
} from "./chunk-HNI5KL6U.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-T3F2XNQR.js";
import {
  AsyncPipe,
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf,
  SlicePipe,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VDZBNFIH.js";

// src/app/features/bandeja-tramites/bandeja-tramites.component.ts
function BandejaTramitesComponent_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.notificacionesNoLeidas, " ");
  }
}
function BandejaTramitesComponent_div_19_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 58);
    \u0275\u0275element(2, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 60)(4, "div", 61);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 62);
    \u0275\u0275text(7, "Vencidos");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.estadisticas.vencidos);
  }
}
function BandejaTramitesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "div", 58);
    \u0275\u0275element(3, "i", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 60)(5, "div", 61);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 62);
    \u0275\u0275text(8, "Asignados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 63)(10, "div", 58);
    \u0275\u0275element(11, "i", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 60)(13, "div", 61);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 62);
    \u0275\u0275text(16, "En Revisi\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 65)(18, "div", 58);
    \u0275\u0275element(19, "i", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 60)(21, "div", 61);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 62);
    \u0275\u0275text(24, "En Proceso");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 67)(26, "div", 58);
    \u0275\u0275element(27, "i", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 60)(29, "div", 61);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 62);
    \u0275\u0275text(32, "Finalizados Hoy");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(33, BandejaTramitesComponent_div_19_div_33_Template, 8, 1, "div", 69);
    \u0275\u0275elementStart(34, "div", 70)(35, "div", 58);
    \u0275\u0275element(36, "i", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 60)(38, "div", 61);
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 62);
    \u0275\u0275text(42, "Calificaci\xF3n");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.estadisticas.totalAsignados);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.estadisticas.pendientesRevision);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.estadisticas.enProceso);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.estadisticas.finalizadosHoy);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.estadisticas.vencidos > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(40, 6, ctx_r0.estadisticas.calificacionPromedio, "1.1-1"));
  }
}
function BandejaTramitesComponent_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 73);
    \u0275\u0275listener("click", function BandejaTramitesComponent_button_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSearch(""));
    });
    \u0275\u0275element(1, "i", 74);
    \u0275\u0275elementEnd();
  }
}
function BandejaTramitesComponent_option_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const estado_r3 = ctx.$implicit;
    \u0275\u0275property("value", estado_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", estado_r3.nombre, " ");
  }
}
function BandejaTramitesComponent_option_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r4 = ctx.$implicit;
    \u0275\u0275property("value", area_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", area_r4.nombre, " ");
  }
}
function BandejaTramitesComponent_option_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajador_r5 = ctx.$implicit;
    \u0275\u0275property("value", trabajador_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", trabajador_r5.nombre, " ", trabajador_r5.apellidos, " ");
  }
}
function BandejaTramitesComponent_div_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 77)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 78)(5, "button", 79);
    \u0275\u0275element(6, "i", 80);
    \u0275\u0275text(7, " Cambiar Estado ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 81);
    \u0275\u0275element(9, "i", 82);
    \u0275\u0275text(10, " Derivar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 83);
    \u0275\u0275element(12, "i", 84);
    \u0275\u0275text(13, " Reasignar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 85);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_82_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.exportarTramitesSeleccionados());
    });
    \u0275\u0275element(15, "i", 86);
    \u0275\u0275text(16, " Exportar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 87);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_82_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.archivarTramitesSeleccionados());
    });
    \u0275\u0275element(18, "i", 88);
    \u0275\u0275text(19, " Archivar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r0.selectedTramites.length, " tr\xE1mites seleccionados");
  }
}
function BandejaTramitesComponent_div_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89);
    \u0275\u0275element(1, "i", 90);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando tr\xE1mites...");
    \u0275\u0275elementEnd()();
  }
}
function BandejaTramitesComponent_div_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91);
    \u0275\u0275element(1, "i", 5);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No hay tr\xE1mites");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No tienes tr\xE1mites asignados en este momento");
    \u0275\u0275elementEnd()();
  }
}
function BandejaTramitesComponent_div_88_i_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 109);
  }
}
function BandejaTramitesComponent_div_88_i_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 110);
  }
}
function BandejaTramitesComponent_div_88_i_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 111);
  }
}
function BandejaTramitesComponent_div_88_i_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 109);
  }
}
function BandejaTramitesComponent_div_88_i_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 110);
  }
}
function BandejaTramitesComponent_div_88_i_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 111);
  }
}
function BandejaTramitesComponent_div_88_i_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 109);
  }
}
function BandejaTramitesComponent_div_88_i_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 110);
  }
}
function BandejaTramitesComponent_div_88_i_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 111);
  }
}
function BandejaTramitesComponent_div_88_i_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 109);
  }
}
function BandejaTramitesComponent_div_88_i_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 110);
  }
}
function BandejaTramitesComponent_div_88_i_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 111);
  }
}
function BandejaTramitesComponent_div_88_div_37_div_29_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 156);
    \u0275\u0275element(1, "i", 157);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatearFechaRelativa(tramite_r9.fechaRespuesta), " ");
  }
}
function BandejaTramitesComponent_div_88_div_37_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "div", 154);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BandejaTramitesComponent_div_88_div_37_div_29_div_3_Template, 3, 1, "div", 155);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", tramite_r9.usuarioRespondio.nombre, " ", tramite_r9.usuarioRespondio.apellidos, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", tramite_r9.fechaRespuesta);
  }
}
function BandejaTramitesComponent_div_88_div_37_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 158)(1, "span", 159);
    \u0275\u0275text(2, "No respondido");
    \u0275\u0275elementEnd()();
  }
}
function BandejaTramitesComponent_div_88_div_37_div_34_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 163);
    \u0275\u0275element(1, "i", 157);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("vencido", tramite_r9.diasVencimiento !== void 0 && tramite_r9.diasVencimiento < 0)("urgente", tramite_r9.diasVencimiento !== void 0 && tramite_r9.diasVencimiento <= 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", tramite_r9.diasVencimiento < 0 ? "Vencido" : tramite_r9.diasVencimiento + " d\xEDas h\xE1biles restantes", " ");
  }
}
function BandejaTramitesComponent_div_88_div_37_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 160)(1, "div", 161);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BandejaTramitesComponent_div_88_div_37_div_34_div_3_Template, 3, 5, "div", 162);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatearFecha(tramite_r9.fechaVencimiento));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", tramite_r9.diasVencimiento !== void 0);
  }
}
function BandejaTramitesComponent_div_88_div_37_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164)(1, "span", 159);
    \u0275\u0275text(2, "Sin fecha l\xEDmite");
    \u0275\u0275elementEnd()();
  }
}
function BandejaTramitesComponent_div_88_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 112);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_div_click_0_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.verDetalle(tramite_r9));
    });
    \u0275\u0275elementStart(1, "div", 113);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "input", 95);
    \u0275\u0275listener("change", function BandejaTramitesComponent_div_88_div_37_Template_input_change_2_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleSelectTramite(tramite_r9.id));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "div", 114)(4, "span", 115);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 116);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 117)(9, "div", 118);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 119);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "slice");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 120)(15, "div", 121)(16, "div", 122);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 123);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 124)(21, "span", 125);
    \u0275\u0275element(22, "i");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 126)(25, "span", 127);
    \u0275\u0275element(26, "i");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 128);
    \u0275\u0275template(29, BandejaTramitesComponent_div_88_div_37_div_29_Template, 4, 3, "div", 129)(30, BandejaTramitesComponent_div_88_div_37_ng_template_30_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 130)(33, "div", 131);
    \u0275\u0275template(34, BandejaTramitesComponent_div_88_div_37_div_34_Template, 4, 2, "div", 132)(35, BandejaTramitesComponent_div_88_div_37_ng_template_35_Template, 3, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 133);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_div_click_37_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(38, "div", 134)(39, "button", 135);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_39_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.abrirEditarTramite(tramite_r9));
    });
    \u0275\u0275element(40, "i", 136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 137);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_41_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.abrirAprobar(tramite_r9));
    });
    \u0275\u0275element(42, "i", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 138);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_43_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.abrirRechazar(tramite_r9));
    });
    \u0275\u0275element(44, "i", 139);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 140);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_45_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.abrirResponderTramite(tramite_r9));
    });
    \u0275\u0275element(46, "i", 141);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 142);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_47_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.abrirCambiarEstado(tramite_r9));
    });
    \u0275\u0275element(48, "i", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 143);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_49_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.abrirDerivar(tramite_r9));
    });
    \u0275\u0275element(50, "i", 82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 144);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_51_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.descargarTodosDocumentos(tramite_r9));
    });
    \u0275\u0275element(52, "i", 86);
    \u0275\u0275elementStart(53, "span", 145);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 146)(56, "input", 147);
    \u0275\u0275listener("change", function BandejaTramitesComponent_div_88_div_37_Template_input_change_56_listener($event) {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.subirDocumento($event, tramite_r9.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "label", 148);
    \u0275\u0275element(58, "i", 149);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "button", 150);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_59_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.exportarTramite(tramite_r9));
    });
    \u0275\u0275element(60, "i", 151);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "button", 152);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_div_37_Template_button_click_61_listener() {
      const tramite_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.archivarTramite(tramite_r9));
    });
    \u0275\u0275element(62, "i", 88);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tramite_r9 = ctx.$implicit;
    const sinResponsable_r10 = \u0275\u0275reference(31);
    const sinFechaVencimiento_r11 = \u0275\u0275reference(36);
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r0.getUrgenciaClass(tramite_r9));
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r0.isSelected(tramite_r9.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r9.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r9.tipoTramite.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r9.asunto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind3(13, 37, tramite_r9.descripcion, 0, 60), "...");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", tramite_r9.solicitante.nombre, " ", tramite_r9.solicitante.apellidos, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r9.solicitante.area);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getEstadoClase(tramite_r9.estado.nombre));
    \u0275\u0275advance();
    \u0275\u0275classMap(tramite_r9.estado.icono);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r9.estado.nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.getPrioridadClase(tramite_r9.prioridad.nivel));
    \u0275\u0275advance();
    \u0275\u0275classMap(tramite_r9.prioridad.icono);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r9.prioridad.nombre, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", tramite_r9.usuarioRespondio)("ngIfElse", sinResponsable_r10);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", tramite_r9.fechaVencimiento)("ngIfElse", sinFechaVencimiento_r11);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", !ctx_r0.puedeAprobar(tramite_r9))("title", ctx_r0.puedeAprobar(tramite_r9) ? "Aprobar tr\xE1mite" : "No puedes aprobar este tr\xE1mite");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.puedeRechazar(tramite_r9))("title", ctx_r0.puedeRechazar(tramite_r9) ? "Rechazar tr\xE1mite" : "No puedes rechazar este tr\xE1mite");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.puedeResponder(tramite_r9))("title", ctx_r0.puedeResponder(tramite_r9) ? "Responder tr\xE1mite" : "No puedes responder este tr\xE1mite");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r0.puedeMostrarDerivar(tramite_r9))("title", ctx_r0.puedeMostrarDerivar(tramite_r9) ? "Derivar tr\xE1mite" : "No puedes derivar este tr\xE1mite");
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("title", "Descargar documentos (", tramite_r9.documentos.length, ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r9.documentos.length);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "file-" + tramite_r9.id);
    \u0275\u0275advance();
    \u0275\u0275property("for", "file-" + tramite_r9.id);
  }
}
function BandejaTramitesComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92)(1, "div", 93)(2, "div", 94)(3, "input", 95);
    \u0275\u0275listener("change", function BandejaTramitesComponent_div_88_Template_input_change_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectAllTramites());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 96);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_Template_div_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleOrden("fecha"));
    });
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, BandejaTramitesComponent_div_88_i_7_Template, 1, 0, "i", 97)(8, BandejaTramitesComponent_div_88_i_8_Template, 1, 0, "i", 98)(9, BandejaTramitesComponent_div_88_i_9_Template, 1, 0, "i", 99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 100);
    \u0275\u0275text(11, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 101);
    \u0275\u0275text(13, "Solicitante");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 102);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_Template_div_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleOrden("estado"));
    });
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, BandejaTramitesComponent_div_88_i_17_Template, 1, 0, "i", 97)(18, BandejaTramitesComponent_div_88_i_18_Template, 1, 0, "i", 98)(19, BandejaTramitesComponent_div_88_i_19_Template, 1, 0, "i", 99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 103);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_Template_div_click_20_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleOrden("prioridad"));
    });
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Prioridad");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, BandejaTramitesComponent_div_88_i_23_Template, 1, 0, "i", 97)(24, BandejaTramitesComponent_div_88_i_24_Template, 1, 0, "i", 98)(25, BandejaTramitesComponent_div_88_i_25_Template, 1, 0, "i", 99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 104);
    \u0275\u0275text(27, "Responsable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 105);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_88_Template_div_click_28_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleOrden("vencimiento"));
    });
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30, "Fecha Vencimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, BandejaTramitesComponent_div_88_i_31_Template, 1, 0, "i", 97)(32, BandejaTramitesComponent_div_88_i_32_Template, 1, 0, "i", 98)(33, BandejaTramitesComponent_div_88_i_33_Template, 1, 0, "i", 99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 106);
    \u0275\u0275text(35, "Acciones");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 107);
    \u0275\u0275template(37, BandejaTramitesComponent_div_88_div_37_Template, 63, 41, "div", 108);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", ctx_r0.selectedTramites.length === ctx_r0.tramites.length);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor !== "fecha");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "fecha" && ctx_r0.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "fecha" && !ctx_r0.ordenAscendente);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor !== "estado");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "estado" && ctx_r0.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "estado" && !ctx_r0.ordenAscendente);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor !== "prioridad");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "prioridad" && ctx_r0.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "prioridad" && !ctx_r0.ordenAscendente);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor !== "vencimiento");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "vencimiento" && ctx_r0.ordenAscendente);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.ordenarPor === "vencimiento" && !ctx_r0.ordenAscendente);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.tramites)("ngForTrackBy", ctx_r0.trackByTramiteId);
  }
}
function BandejaTramitesComponent_div_90_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 172);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_90_div_1_div_7_Template_div_click_0_listener() {
      const tramite_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.verDetalle(tramite_r13));
    });
    \u0275\u0275elementStart(1, "div", 173)(2, "span", 174);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 175);
    \u0275\u0275element(5, "i");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 176)(7, "h4");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 177)(12, "span", 178);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 179);
    \u0275\u0275element(15, "i", 180);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tramite_r13 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r0.getUrgenciaClass(tramite_r13));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r13.codigo);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getPrioridadClase(tramite_r13.prioridad.nivel));
    \u0275\u0275advance();
    \u0275\u0275classMap(tramite_r13.prioridad.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r13.asunto);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", tramite_r13.solicitante.nombre, " ", tramite_r13.solicitante.apellidos, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", tramite_r13.diasTranscurridos, "d");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", tramite_r13.documentos.length, " ");
  }
}
function BandejaTramitesComponent_div_90_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 167)(1, "div", 168)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 169);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 170);
    \u0275\u0275template(7, BandejaTramitesComponent_div_90_div_1_div_7_Template, 17, 12, "div", 171);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const estado_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(estado_r14.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.filterTramites("estado.nombre", estado_r14.nombre).length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.filterTramites("estado.nombre", estado_r14.nombre));
  }
}
function BandejaTramitesComponent_div_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 165);
    \u0275\u0275template(1, BandejaTramitesComponent_div_90_div_1_Template, 8, 3, "div", 166);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.estadosDisponibles);
  }
}
function BandejaTramitesComponent_div_92_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 188);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_92_ng_container_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cambiarPagina(1));
    });
    \u0275\u0275text(2, " 1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 189);
    \u0275\u0275text(4, "...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function BandejaTramitesComponent_div_92_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 190);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_92_button_5_Template_button_click_0_listener() {
      const page_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cambiarPagina(page_r18));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.currentPage === page_r18);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r18, " ");
  }
}
function BandejaTramitesComponent_div_92_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 189);
    \u0275\u0275text(2, "...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 191);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_92_ng_container_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cambiarPagina(ctx_r0.totalPages));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.totalPages, " ");
  }
}
function BandejaTramitesComponent_div_92_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 181)(1, "button", 182);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_92_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cambiarPagina(ctx_r0.currentPage - 1));
    });
    \u0275\u0275element(2, "i", 183);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 184);
    \u0275\u0275template(4, BandejaTramitesComponent_div_92_ng_container_4_Template, 5, 0, "ng-container", 185)(5, BandejaTramitesComponent_div_92_button_5_Template, 2, 3, "button", 186)(6, BandejaTramitesComponent_div_92_ng_container_6_Template, 5, 1, "ng-container", 185);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 182);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_92_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cambiarPagina(ctx_r0.currentPage + 1));
    });
    \u0275\u0275element(8, "i", 187);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.totalPages > 7 && ctx_r0.currentPage > 4);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.getPaginasVisibles());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.totalPages > 7 && ctx_r0.currentPage < ctx_r0.totalPages - 3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.currentPage === ctx_r0.totalPages);
  }
}
function BandejaTramitesComponent_div_93_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 200);
    \u0275\u0275element(1, "i", 201);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No tienes notificaciones");
    \u0275\u0275elementEnd()();
  }
}
function BandejaTramitesComponent_div_93_div_10_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 207);
  }
}
function BandejaTramitesComponent_div_93_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 202);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_93_div_10_Template_div_click_0_listener() {
      const notificacion_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.marcarNotificacionLeida(notificacion_r22));
    });
    \u0275\u0275elementStart(1, "div", 203);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 204)(4, "h4");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 205);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, BandejaTramitesComponent_div_93_div_10_div_10_Template, 1, 0, "div", 206);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notificacion_r22 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("unread", !notificacion_r22.leida);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", notificacion_r22.color);
    \u0275\u0275advance();
    \u0275\u0275classMap(notificacion_r22.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(notificacion_r22.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(notificacion_r22.mensaje);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatearFechaRelativa(notificacion_r22.fecha));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !notificacion_r22.leida);
  }
}
function BandejaTramitesComponent_div_93_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 192);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_93_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalNotificaciones());
    });
    \u0275\u0275elementStart(1, "div", 193);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_93_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r20);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 194)(3, "h3");
    \u0275\u0275text(4, "Notificaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 195);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_93_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalNotificaciones());
    });
    \u0275\u0275element(6, "i", 74);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 196);
    \u0275\u0275template(8, BandejaTramitesComponent_div_93_div_8_Template, 4, 0, "div", 197);
    \u0275\u0275elementStart(9, "div", 198);
    \u0275\u0275template(10, BandejaTramitesComponent_div_93_div_10_Template, 11, 10, "div", 199);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r0.notificaciones.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.notificaciones);
  }
}
function BandejaTramitesComponent_div_94_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const estado_r24 = ctx.$implicit;
    \u0275\u0275property("value", estado_r24.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", estado_r24.nombre, " ");
  }
}
function BandejaTramitesComponent_div_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 192);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_94_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalCambiarEstado());
    });
    \u0275\u0275elementStart(1, "div", 208);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_94_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r23);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 194)(3, "h3");
    \u0275\u0275text(4, "Cambiar Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 195);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_94_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalCambiarEstado());
    });
    \u0275\u0275element(6, "i", 74);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 196)(8, "p");
    \u0275\u0275text(9, "Tr\xE1mite: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 209)(13, "label");
    \u0275\u0275text(14, "Nuevo Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 35);
    \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_div_94_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.cambiarEstadoForm.nuevoEstadoId, $event) || (ctx_r0.cambiarEstadoForm.nuevoEstadoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(16, BandejaTramitesComponent_div_94_option_16_Template, 2, 2, "option", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 209)(18, "label");
    \u0275\u0275text(19, "Observaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "textarea", 210);
    \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_div_94_Template_textarea_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.cambiarEstadoForm.observaciones, $event) || (ctx_r0.cambiarEstadoForm.observaciones = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 211)(22, "button", 212);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_94_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalCambiarEstado());
    });
    \u0275\u0275text(23, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 213);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_94_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmarCambiarEstado());
    });
    \u0275\u0275element(25, "i", 80);
    \u0275\u0275text(26, " Cambiar Estado ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.tramiteSeleccionado == null ? null : ctx_r0.tramiteSeleccionado.codigo);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cambiarEstadoForm.nuevoEstadoId);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.estadosDisponibles);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.cambiarEstadoForm.observaciones);
  }
}
function BandejaTramitesComponent_div_95_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r26 = ctx.$implicit;
    \u0275\u0275property("value", area_r26.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", area_r26.nombre, " ");
  }
}
function BandejaTramitesComponent_div_95_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trabajador_r27 = ctx.$implicit;
    \u0275\u0275property("value", trabajador_r27.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", trabajador_r27.nombre, " ", trabajador_r27.apellidos, " ");
  }
}
function BandejaTramitesComponent_div_95_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 192);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_95_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalDerivar());
    });
    \u0275\u0275elementStart(1, "div", 208);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_95_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r25);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 194)(3, "h3");
    \u0275\u0275text(4, "Derivar Tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 195);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_95_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalDerivar());
    });
    \u0275\u0275element(6, "i", 74);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 196)(8, "p");
    \u0275\u0275text(9, "Tr\xE1mite: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 209)(13, "label");
    \u0275\u0275text(14, "\xC1rea Destino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 214);
    \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_div_95_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.derivarForm.areaDestinoId, $event) || (ctx_r0.derivarForm.areaDestinoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function BandejaTramitesComponent_div_95_Template_select_change_15_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAreaSeleccionada($event));
    });
    \u0275\u0275elementStart(16, "option", 36);
    \u0275\u0275text(17, "Seleccionar \xE1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, BandejaTramitesComponent_div_95_option_18_Template, 2, 2, "option", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 209)(20, "label");
    \u0275\u0275text(21, "Asignar a Trabajador (Opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 35);
    \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_div_95_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.derivarForm.trabajadorAsignadoId, $event) || (ctx_r0.derivarForm.trabajadorAsignadoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "option", 36);
    \u0275\u0275text(24, "Sin asignar");
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, BandejaTramitesComponent_div_95_option_25_Template, 2, 3, "option", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 209)(27, "label")(28, "input", 215);
    \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_div_95_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.derivarForm.mantenerEstado, $event) || (ctx_r0.derivarForm.mantenerEstado = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " Mantener estado actual ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 209)(31, "label");
    \u0275\u0275text(32, "Observaciones *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "textarea", 216);
    \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_div_95_Template_textarea_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.derivarForm.observaciones, $event) || (ctx_r0.derivarForm.observaciones = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 211)(35, "button", 212);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_95_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cerrarModalDerivar());
    });
    \u0275\u0275text(36, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 217);
    \u0275\u0275listener("click", function BandejaTramitesComponent_div_95_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmarDerivar());
    });
    \u0275\u0275element(38, "i", 82);
    \u0275\u0275text(39, " Derivar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.tramiteSeleccionado == null ? null : ctx_r0.tramiteSeleccionado.codigo);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.derivarForm.areaDestinoId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.areasDisponibles);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.derivarForm.trabajadorAsignadoId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.trabajadoresDisponibles);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.derivarForm.mantenerEstado);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.derivarForm.observaciones);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r0.derivarForm.areaDestinoId || !ctx_r0.derivarForm.observaciones);
  }
}
var BandejaTramitesComponent = class _BandejaTramitesComponent {
  constructor(bandejaTramitesService, misTramitesService, tramiteService, toastService, authService) {
    this.bandejaTramitesService = bandejaTramitesService;
    this.misTramitesService = misTramitesService;
    this.tramiteService = tramiteService;
    this.toastService = toastService;
    this.authService = authService;
    this.tramites = [];
    this.estadisticas = null;
    this.notificaciones = [];
    this.loading$ = this.bandejaTramitesService.loading$;
    this.tramitePermisos = /* @__PURE__ */ new Map();
    this.currentPage = 1;
    this.pageSize = 15;
    this.totalItems = 0;
    this.totalPages = 0;
    this.filtros = {};
    this.searchTerm = "";
    this.searchSubject = new Subject();
    this.showFilters = false;
    this.vistaActual = "lista";
    this.ordenarPor = "vencimiento";
    this.ordenAscendente = false;
    this.Math = Math;
    this.selectedTramites = [];
    this.showDetalleTramiteModal = false;
    this.showCambiarEstadoModal = false;
    this.showDerivarModal = false;
    this.showReasignarModal = false;
    this.showNotificacionesModal = false;
    this.showResponderTramiteModal = false;
    this.showEditarTramiteModal = false;
    this.showRechazarModal = false;
    this.tramiteSeleccionado = null;
    this.tramiteParaEditar = null;
    this.cambiarEstadoForm = {
      tramiteId: 0,
      nuevoEstadoId: 0,
      observaciones: ""
    };
    this.derivarForm = {
      tramiteId: 0,
      areaDestinoId: 0,
      observaciones: "",
      mantenerEstado: false
    };
    this.reasignarForm = {
      tramiteId: 0,
      nuevoTrabajadorId: 0,
      observaciones: ""
    };
    this.estadosDisponibles = [];
    this.areasDisponibles = [];
    this.trabajadoresDisponibles = [];
    this.subscriptions = new Subscription();
  }
  ngOnInit() {
    this.setupSearch();
    this.cargarTramites();
    this.cargarEstadisticas();
    this.cargarNotificaciones();
    this.cargarOpcionesFormulario();
    setInterval(() => {
      if (!document.hidden) {
        this.cargarTramites();
        this.cargarNotificaciones();
      }
    }, 3e4);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  setupSearch() {
    this.subscriptions.add(this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.filtros.busqueda = term;
      this.currentPage = 1;
      this.cargarTramites();
    }));
  }
  cargarTramites() {
    this.subscriptions.add(this.bandejaTramitesService.getTramites(this.currentPage, this.pageSize, this.filtros, this.ordenarPor, this.ordenAscendente).subscribe({
      next: (response) => {
        this.tramites = response.data;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.tramitePermisos.clear();
        this.cargarPermisosParaTramites();
        this.autoFinalizarTramitesVencidos();
      },
      error: (error) => {
      }
    }));
  }
  cargarEstadisticas() {
    this.subscriptions.add(this.bandejaTramitesService.getEstadisticas().subscribe((estadisticas) => this.estadisticas = estadisticas));
  }
  cargarNotificaciones() {
    this.subscriptions.add(this.bandejaTramitesService.getNotificaciones().subscribe((notificaciones) => {
      this.notificaciones = notificaciones;
    }));
  }
  cargarOpcionesFormulario() {
    this.subscriptions.add(this.bandejaTramitesService.getEstadosDisponibles().subscribe((estados) => this.estadosDisponibles = estados));
  }
  cargarPermisosParaTramites() {
    if (this.tramites.length === 0) {
      return;
    }
    this.tramites.forEach((tramite) => {
      this.subscriptions.add(this.bandejaTramitesService.verificarPermisosAcciones(tramite.id).subscribe({
        next: (permisos) => {
          this.tramitePermisos.set(tramite.id, permisos);
        },
        error: (error) => {
          this.tramitePermisos.set(tramite.id, {
            puedeAprobar: false,
            puedeRechazar: false,
            puedeDerivar: false,
            puedeResponder: false,
            estaVencido: false
          });
        }
      }));
    });
  }
  onSearch(term) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }
  aplicarFiltros() {
    this.currentPage = 1;
    this.cargarTramites();
    this.showFilters = false;
  }
  limpiarFiltros() {
    this.filtros = {};
    this.searchTerm = "";
    this.currentPage = 1;
    this.cargarTramites();
  }
  cambiarPagina(page) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.cargarTramites();
    }
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
  toggleVista(vista) {
    this.vistaActual = vista;
  }
  toggleFilters() {
    this.showFilters = !this.showFilters;
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
  verDetalle(tramite) {
    this.tramiteSeleccionado = tramite;
    this.showDetalleTramiteModal = true;
  }
  abrirCambiarEstado(tramite) {
    this.tramiteSeleccionado = tramite;
    this.cambiarEstadoForm = {
      tramiteId: tramite.id,
      nuevoEstadoId: tramite.estado.id,
      observaciones: ""
    };
    this.showCambiarEstadoModal = true;
  }
  abrirDerivar(tramite) {
    if (!this.puedeMostrarDerivar(tramite)) {
      this.toastService.error("Acci\xF3n no permitida", "No tienes permisos para derivar este tr\xE1mite");
      return;
    }
    this.tramiteSeleccionado = tramite;
    this.derivarForm = {
      tramiteId: tramite.id,
      areaDestinoId: 0,
      observaciones: "",
      mantenerEstado: false
    };
    this.trabajadoresDisponibles = [];
    this.showDerivarModal = true;
  }
  abrirReasignar(tramite) {
    this.tramiteSeleccionado = tramite;
    this.reasignarForm = {
      tramiteId: tramite.id,
      nuevoTrabajadorId: 0,
      observaciones: ""
    };
    this.showReasignarModal = true;
  }
  abrirAprobar(tramite) {
    if (!this.puedeAprobar(tramite)) {
      this.toastService.error("Acci\xF3n no permitida", "No tienes permisos para aprobar este tr\xE1mite");
      return;
    }
    const request = {
      tramiteId: tramite.id,
      observaciones: "Aprobado por trabajador administrativo"
    };
    this.subscriptions.add(this.misTramitesService.aprobarTramite(request).subscribe({
      next: (response) => {
        this.cargarTramites();
        this.cargarEstadisticas();
        this.toastService.success("Tr\xE1mite aprobado", `El tr\xE1mite ${tramite.codigo} ha sido aprobado correctamente`);
      },
      error: (error) => {
        this.toastService.error("Error al aprobar", "No se pudo aprobar el tr\xE1mite. Intente nuevamente.");
      }
    }));
  }
  confirmarCambiarEstado() {
    this.subscriptions.add(this.bandejaTramitesService.cambiarEstado(this.cambiarEstadoForm).subscribe({
      next: () => {
        this.cargarTramites();
        this.cargarEstadisticas();
        this.cerrarModalCambiarEstado();
      }
    }));
  }
  confirmarDerivar() {
    if (this.tramiteSeleccionado && !this.puedeMostrarDerivar(this.tramiteSeleccionado)) {
      this.toastService.error("Acci\xF3n no permitida", "No tienes permisos para derivar este tr\xE1mite");
      this.cerrarModalDerivar();
      return;
    }
    this.subscriptions.add(this.bandejaTramitesService.derivarTramite(this.derivarForm).subscribe({
      next: (response) => {
        this.cargarTramites();
        this.cargarEstadisticas();
        this.cerrarModalDerivar();
        this.toastService.success("Tr\xE1mite derivado", "El tr\xE1mite ha sido derivado correctamente");
      },
      error: (error) => {
        this.toastService.error("Error al derivar", "No se pudo derivar el tr\xE1mite. Intente nuevamente.");
      }
    }));
  }
  confirmarReasignar() {
    this.subscriptions.add(this.bandejaTramitesService.reasignarTramite(this.reasignarForm).subscribe({
      next: () => {
        this.cargarTramites();
        this.cerrarModalReasignar();
      }
    }));
  }
  descargarDocumento(tramiteId, nombreArchivo) {
    this.subscriptions.add(this.bandejaTramitesService.descargarDocumento(tramiteId, nombreArchivo).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = nombreArchivo;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    }));
  }
  descargarTodosDocumentos(tramite) {
    this.subscriptions.add(this.bandejaTramitesService.descargarTodosDocumentos(tramite.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `tramite-${tramite.codigo}-documentos.zip`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    }));
  }
  subirDocumento(event, tramiteId) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        const validacion = this.bandejaTramitesService.validarArchivo(file);
        if (validacion.valido) {
          this.subscriptions.add(this.bandejaTramitesService.subirDocumento(tramiteId, file).subscribe(() => {
            this.cargarTramites();
          }));
        } else {
          this.toastService.error("Archivo inv\xE1lido", validacion.mensaje || "");
        }
      }
    }
  }
  marcarNotificacionLeida(notificacion) {
    if (!notificacion.leida) {
      this.subscriptions.add(this.bandejaTramitesService.marcarNotificacionLeida(notificacion.id).subscribe(() => {
        notificacion.leida = true;
        if (notificacion.tramiteId) {
          const tramite = this.tramites.find((t) => t.id === notificacion.tramiteId);
          if (tramite) {
            this.verDetalle(tramite);
          }
        }
      }));
    }
  }
  get notificacionesNoLeidas() {
    return this.notificaciones.filter((n) => !n.leida).length;
  }
  cerrarModalDetalle() {
    this.showDetalleTramiteModal = false;
    this.tramiteSeleccionado = null;
  }
  cerrarModalCambiarEstado() {
    this.showCambiarEstadoModal = false;
    this.tramiteSeleccionado = null;
  }
  cerrarModalDerivar() {
    this.showDerivarModal = false;
    this.tramiteSeleccionado = null;
  }
  onAreaSeleccionada(event) {
    const areaId = this.derivarForm.areaDestinoId;
    if (!areaId) {
      this.trabajadoresDisponibles = [];
      return;
    }
    this.tramiteService.obtenerUsuariosPorArea(areaId).subscribe({
      next: (usuarios) => {
        this.trabajadoresDisponibles = usuarios;
      },
      error: (error) => {
        this.toastService.error("Error", "No se pudieron cargar los trabajadores del \xE1rea");
        this.trabajadoresDisponibles = [];
      }
    });
  }
  cerrarModalReasignar() {
    this.showReasignarModal = false;
    this.tramiteSeleccionado = null;
  }
  cerrarModalNotificaciones() {
    this.showNotificacionesModal = false;
  }
  abrirResponderTramite(tramite) {
    if (!this.puedeResponder(tramite)) {
      this.toastService.error("Acci\xF3n no permitida", "No tienes permisos para responder este tr\xE1mite");
      return;
    }
    this.tramiteSeleccionado = tramite;
    this.showResponderTramiteModal = true;
  }
  cerrarModalResponder() {
    this.showResponderTramiteModal = false;
    this.tramiteSeleccionado = null;
  }
  abrirEditarTramite(tramite) {
    this.tramiteSeleccionado = tramite;
    this.tramiteParaEditar = this.convertirTramiteBandejaATramite(tramite);
    this.showEditarTramiteModal = true;
  }
  cerrarModalEditar() {
    this.showEditarTramiteModal = false;
    this.tramiteSeleccionado = null;
    this.tramiteParaEditar = null;
  }
  abrirRechazar(tramite) {
    if (!this.puedeRechazar(tramite)) {
      this.toastService.error("Acci\xF3n no permitida", "No tienes permisos para rechazar este tr\xE1mite");
      return;
    }
    this.tramiteSeleccionado = tramite;
    this.showRechazarModal = true;
  }
  cerrarModalRechazar() {
    this.showRechazarModal = false;
    this.tramiteSeleccionado = null;
  }
  onTramiteRechazado(response) {
    this.cargarTramites();
    this.cargarEstadisticas();
    this.cerrarModalRechazar();
    this.cerrarModalDetalle();
  }
  convertirTramiteBandejaATramite(tramiteBandeja) {
    return {
      id: tramiteBandeja.id,
      codigo: tramiteBandeja.codigo,
      asunto: tramiteBandeja.asunto,
      descripcion: tramiteBandeja.descripcion,
      tipoTramite: {
        id: tramiteBandeja.tipoTramite.id,
        nombre: tramiteBandeja.tipoTramite.nombre,
        descripcion: tramiteBandeja.tipoTramite.descripcion,
        tiempoEstimado: tramiteBandeja.tipoTramite.tiempoEstimado,
        requiereAprobacion: true,
        // Valor por defecto
        activo: true
        // Valor por defecto
      },
      estado: tramiteBandeja.estado.nombre,
      prioridad: tramiteBandeja.prioridad.nombre,
      fechaCreacion: new Date(tramiteBandeja.fechaCreacion),
      fechaActualizacion: tramiteBandeja.fechaActualizacion ? new Date(tramiteBandeja.fechaActualizacion) : void 0,
      fechaVencimiento: tramiteBandeja.fechaVencimiento ? new Date(tramiteBandeja.fechaVencimiento) : void 0,
      solicitante: {
        id: tramiteBandeja.solicitante.id,
        nombre: tramiteBandeja.solicitante.nombre,
        apellidos: tramiteBandeja.solicitante.apellidos,
        correo: tramiteBandeja.solicitante.correo,
        usuario: tramiteBandeja.solicitante.correo,
        area: {
          id: 0,
          nombre: tramiteBandeja.solicitante.area || "Sin \xE1rea",
          descripcion: "",
          activa: true
        },
        role: {
          id: 1,
          name: "USUARIO",
          description: "Usuario est\xE1ndar"
        }
      },
      documentos: (tramiteBandeja.documentos || []).map((doc) => ({
        id: doc.id,
        tramiteId: tramiteBandeja.id,
        nombre: doc.nombre,
        nombreOriginal: doc.nombreOriginal,
        ruta: "",
        // No disponible en DocumentoBandeja
        tamano: doc.tamano,
        // Nota: tamano (sin ñ) en ambas interfaces
        tipo: doc.tipo,
        fechaSubida: new Date(doc.fechaSubida),
        version: doc.version,
        usuarioSubida: {
          id: tramiteBandeja.solicitante.id,
          nombre: tramiteBandeja.solicitante.nombre,
          apellidos: tramiteBandeja.solicitante.apellidos,
          correo: tramiteBandeja.solicitante.correo,
          usuario: tramiteBandeja.solicitante.correo,
          area: {
            id: 0,
            nombre: tramiteBandeja.solicitante.area || "Sin \xE1rea",
            descripcion: "",
            activa: true
          },
          role: {
            id: 1,
            name: "USUARIO",
            description: "Usuario est\xE1ndar"
          }
        }
      })),
      areaOrigen: {
        id: tramiteBandeja.areaOrigen.id,
        nombre: tramiteBandeja.areaOrigen.nombre,
        descripcion: "",
        activa: true
      },
      historial: (tramiteBandeja.historial || []).map((hist) => ({
        id: hist.id,
        tramiteId: tramiteBandeja.id,
        estadoAnterior: hist.estadoAnterior ? {
          id: 0,
          nombre: hist.estadoAnterior,
          descripcion: "",
          color: "",
          icono: "",
          esFinal: false,
          permiteEdicion: false
        } : void 0,
        estadoNuevo: {
          id: 0,
          nombre: hist.estadoNuevo,
          descripcion: "",
          color: "",
          icono: "",
          esFinal: false,
          permiteEdicion: false
        },
        usuario: {
          id: hist.usuarioId,
          nombre: hist.usuario,
          apellidos: "",
          correo: "",
          usuario: hist.usuario,
          area: {
            id: 0,
            nombre: hist.area || "Sin \xE1rea",
            descripcion: "",
            activa: true
          },
          role: {
            id: 1,
            name: "USUARIO",
            description: "Usuario est\xE1ndar"
          }
        },
        fecha: new Date(hist.fecha),
        descripcion: hist.descripcion,
        observaciones: hist.observaciones,
        accion: {
          id: 0,
          nombre: hist.accion.nombre,
          descripcion: "",
          icono: hist.accion.icono,
          color: hist.accion.color
        },
        area: hist.area ? {
          id: 0,
          nombre: hist.area,
          descripcion: "",
          activa: true
        } : void 0
      }))
    };
  }
  onTramiteRespondido(response) {
    this.cargarTramites();
    this.cargarEstadisticas();
    this.cerrarModalDetalle();
    this.toastService.success("Tr\xE1mite respondido exitosamente", "El tr\xE1mite ha sido procesado y se notific\xF3 al solicitante");
  }
  onTramiteEditado(response) {
    this.cargarTramites();
    this.cargarEstadisticas();
    this.toastService.success("Tr\xE1mite actualizado exitosamente", "Los cambios han sido guardados correctamente");
  }
  puedeAprobar(tramite) {
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeAprobar;
    }
    return false;
  }
  puedeResponder(tramite) {
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeResponder;
    }
    return false;
  }
  puedeMostrarDerivar(tramite) {
    if (tramite.estado.nombre === "RECHAZADO" || tramite.estado.nombre === "FINALIZADO" || tramite.estado.nombre === "ARCHIVADO") {
      return false;
    }
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeDerivar;
    }
    return false;
  }
  puedeRechazar(tramite) {
    const permisos = this.tramitePermisos.get(tramite.id);
    if (permisos) {
      return permisos.puedeRechazar;
    }
    return false;
  }
  getEstadoClase(estado) {
    const clases = {
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
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  formatearFechaRelativa(fecha) {
    const ahora = /* @__PURE__ */ new Date();
    const diferencia = ahora.getTime() - new Date(fecha).getTime();
    const minutos = Math.floor(diferencia / 6e4);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    if (minutos < 60) {
      return `Hace ${minutos} min`;
    } else if (horas < 24) {
      return `Hace ${horas}h`;
    } else if (dias < 7) {
      return `Hace ${dias}d`;
    } else {
      return this.formatearFecha(fecha);
    }
  }
  getDiasVencimiento(fechaVencimiento) {
    if (!fechaVencimiento)
      return null;
    const hoy = /* @__PURE__ */ new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1e3 * 60 * 60 * 24));
  }
  getUrgenciaClass(tramite) {
    if (tramite.diasVencimiento !== void 0 && tramite.diasVencimiento < 0) {
      return "vencido";
    }
    if (tramite.diasVencimiento !== void 0 && tramite.diasVencimiento <= 2) {
      return "urgente";
    }
    if (tramite.prioridad.nivel >= 3) {
      return "alta-prioridad";
    }
    return "";
  }
  filterTramites(property, value) {
    return this.tramites.filter((tramite) => {
      const properties = property.split(".");
      let obj = tramite;
      for (const prop of properties) {
        if (obj && obj[prop] !== void 0) {
          obj = obj[prop];
        } else {
          return false;
        }
      }
      return obj === value;
    });
  }
  exportarTramite(tramite) {
    this.subscriptions.add(this.bandejaTramitesService.exportarTramites([tramite.id]).subscribe({
      next: (blob) => {
        this.descargarArchivo(blob, `tramite_${tramite.codigo}.pdf`);
        this.toastService.success("Tr\xE1mite exportado", `El tr\xE1mite ${tramite.codigo} se ha exportado correctamente`);
      },
      error: (error) => {
        this.toastService.error("Error al exportar", "No se pudo exportar el tr\xE1mite");
      }
    }));
  }
  exportarTramitesSeleccionados() {
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
  archivarTramite(tramite) {
    this.subscriptions.add(this.bandejaTramitesService.archivarTramites([tramite.id]).subscribe({
      next: (response) => {
        this.toastService.success("Tr\xE1mite archivado", `El tr\xE1mite ${tramite.codigo} se ha archivado correctamente`);
        this.cargarTramites();
      },
      error: (error) => {
        this.toastService.error("Error al archivar", "No se pudo archivar el tr\xE1mite");
      }
    }));
  }
  archivarTramitesSeleccionados() {
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
  descargarArchivo(blob, nombreArchivo) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nombreArchivo;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  trackByTramiteId(index, tramite) {
    return tramite.id;
  }
  getPaginasVisibles() {
    const totalPaginas = this.totalPages;
    const paginaActual = this.currentPage;
    const paginas = [];
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      let inicio;
      let fin;
      if (paginaActual <= 4) {
        inicio = 1;
        fin = 5;
      } else if (paginaActual >= totalPaginas - 3) {
        inicio = totalPaginas - 4;
        fin = totalPaginas;
      } else {
        inicio = paginaActual - 2;
        fin = paginaActual + 2;
      }
      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
    }
    return paginas;
  }
  autoFinalizarTramitesVencidos() {
    const ahora = /* @__PURE__ */ new Date();
    const tramitesParaFinalizar = [];
    this.tramites.forEach((tramite) => {
      const estaVencido = tramite.fechaVencimiento && new Date(tramite.fechaVencimiento) < ahora;
      const noEstaFinalizado = tramite.estado.nombre !== "FINALIZADO" && tramite.estado.nombre !== "ARCHIVADO";
      const estaActivo = tramite.estado.nombre !== "INACTIVO" && tramite.estado.nombre !== "CANCELADO";
      if (estaVencido && noEstaFinalizado && estaActivo) {
        tramitesParaFinalizar.push(tramite.id);
      }
      if ((tramite.estado.nombre === "INACTIVO" || tramite.estado.nombre === "DADO_DE_BAJA") && noEstaFinalizado) {
        tramitesParaFinalizar.push(tramite.id);
      }
    });
    if (tramitesParaFinalizar.length > 0) {
      this.finalizarTramitesEnLote(tramitesParaFinalizar);
    }
  }
  finalizarTramitesEnLote(tramiteIds) {
    const observaciones = "Auto-finalizado por vencimiento o inactividad del tr\xE1mite";
    tramiteIds.forEach((tramiteId) => {
      this.subscriptions.add(this.bandejaTramitesService.cambiarEstadoTramitePorNombre(tramiteId, "FINALIZADO", observaciones).subscribe({
        next: () => {
          const tramite = this.tramites.find((t) => t.id === tramiteId);
          if (tramite) {
            tramite.estado.nombre = "FINALIZADO";
            tramite.estado.descripcion = "Finalizado autom\xE1ticamente";
          }
        },
        error: (error) => {
        }
      }));
    });
    this.toastService.info("Tr\xE1mites auto-finalizados", `Se han finalizado autom\xE1ticamente ${tramiteIds.length} tr\xE1mite(s) vencido(s) o inactivo(s)`);
    setTimeout(() => {
      this.cargarEstadisticas();
    }, 1e3);
  }
  static {
    this.\u0275fac = function BandejaTramitesComponent_Factory(t) {
      return new (t || _BandejaTramitesComponent)(\u0275\u0275directiveInject(BandejaTramitesService), \u0275\u0275directiveInject(MisTramitesService), \u0275\u0275directiveInject(TramiteService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BandejaTramitesComponent, selectors: [["app-bandeja-tramites"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 98, vars: 50, consts: [["sinResponsable", ""], ["sinFechaVencimiento", ""], [1, "bandeja-tramites-container"], [1, "header-section"], [1, "title-area"], [1, "fas", "fa-inbox"], [1, "header-actions"], [1, "btn-notifications", 3, "click"], [1, "fas", "fa-bell"], ["class", "notification-badge", 4, "ngIf"], [1, "view-toggles"], ["title", "Vista de lista", 1, "view-btn", 3, "click"], [1, "fas", "fa-list"], ["title", "Vista kanban", 1, "view-btn", 3, "click"], [1, "fas", "fa-columns"], ["title", "Vista calendario", 1, "view-btn", 3, "click"], [1, "fas", "fa-calendar"], ["class", "stats-dashboard", 4, "ngIf"], [1, "toolbar"], [1, "search-section"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Buscar por c\xF3digo, asunto o solicitante...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "clear-search", 3, "click", 4, "ngIf"], [1, "toolbar-actions"], [1, "quick-filters"], [1, "filter-chip", 3, "click"], [1, "fas", "fa-exclamation-triangle"], [1, "fas", "fa-bolt"], [1, "fas", "fa-user-slash"], [1, "btn-filter", 3, "click"], [1, "fas", "fa-sliders-h"], [1, "filters-panel"], [1, "filters-content"], [1, "filter-group"], [3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], [1, "filter-actions"], [1, "btn-apply", 3, "click"], [1, "btn-clear", 3, "click"], ["class", "bulk-actions", 4, "ngIf"], [1, "tramites-content"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "tramites-lista", 4, "ngIf"], ["class", "kanban-board", 4, "ngIf"], ["class", "pagination", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [3, "close", "tramiteRespondido", "tramite", "show"], [3, "close", "rechazado", "tramite", "show"], [1, "notification-badge"], [1, "stats-dashboard"], [1, "stat-card", "asignados"], [1, "stat-icon"], [1, "fas", "fa-user-check"], [1, "stat-content"], [1, "stat-number"], [1, "stat-label"], [1, "stat-card", "revision"], [1, "fas", "fa-eye"], [1, "stat-card", "proceso"], [1, "fas", "fa-cogs"], [1, "stat-card", "completados"], [1, "fas", "fa-check-circle"], ["class", "stat-card vencidos", 4, "ngIf"], [1, "stat-card", "rating"], [1, "fas", "fa-star"], [1, "stat-card", "vencidos"], [1, "clear-search", 3, "click"], [1, "fas", "fa-times"], [3, "value"], [1, "bulk-actions"], [1, "selection-info"], [1, "bulk-buttons"], [1, "bulk-btn", "estado"], [1, "fas", "fa-exchange-alt"], [1, "bulk-btn", "derivar"], [1, "fas", "fa-share"], [1, "bulk-btn", "asignar"], [1, "fas", "fa-user-plus"], [1, "bulk-btn", "exportar", 3, "click"], [1, "fas", "fa-download"], [1, "bulk-btn", "archivar", 3, "click"], [1, "fas", "fa-archive"], [1, "loading-state"], [1, "fas", "fa-spinner", "fa-spin"], [1, "empty-state"], [1, "tramites-lista"], [1, "lista-header"], [1, "bulk-select"], ["type", "checkbox", 3, "change", "checked"], [1, "header-col", "codigo", 3, "click"], ["class", "fas fa-sort", 4, "ngIf"], ["class", "fas fa-sort-up", 4, "ngIf"], ["class", "fas fa-sort-down", 4, "ngIf"], [1, "header-col", "asunto"], [1, "header-col", "solicitante"], [1, "header-col", "estado", 3, "click"], [1, "header-col", "prioridad", 3, "click"], [1, "header-col", "responsable"], [1, "header-col", "tiempo", 3, "click"], [1, "header-col", "acciones"], [1, "tramites-list"], ["class", "tramite-row", 3, "class", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "fas", "fa-sort"], [1, "fas", "fa-sort-up"], [1, "fas", "fa-sort-down"], [1, "tramite-row", 3, "click"], [1, "bulk-select", 3, "click"], [1, "row-col", "codigo"], [1, "codigo-badge"], [1, "tipo-tramite"], [1, "row-col", "asunto"], [1, "asunto-title"], [1, "asunto-desc"], [1, "row-col", "solicitante"], [1, "solicitante-info"], [1, "nombre"], [1, "area"], [1, "row-col", "estado"], [1, "estado-badge"], [1, "row-col", "prioridad"], [1, "prioridad-badge"], [1, "row-col", "responsable"], ["class", "responsable-info", 4, "ngIf", "ngIfElse"], [1, "row-col", "tiempo"], [1, "tiempo-info"], ["class", "fecha-vencimiento", 4, "ngIf", "ngIfElse"], [1, "row-col", "acciones", 3, "click"], [1, "action-buttons"], ["title", "Editar tr\xE1mite", 1, "action-btn", "editar", 3, "click"], [1, "fas", "fa-edit"], [1, "action-btn", "aprobar", 3, "click", "disabled", "title"], [1, "action-btn", "rechazar", 3, "click", "disabled", "title"], [1, "fas", "fa-times-circle"], [1, "action-btn", "responder", 3, "click", "disabled", "title"], [1, "fas", "fa-reply"], ["title", "Cambiar estado", 1, "action-btn", "estado", 3, "click"], [1, "action-btn", "derivar", 3, "click", "disabled", "title"], [1, "action-btn", "download", 3, "click", "title"], [1, "doc-count"], [1, "file-upload"], ["type", "file", "multiple", "", "accept", ".pdf,.doc,.docx,.jpg,.jpeg,.png", 3, "change", "id"], ["title", "Subir documentos", 1, "action-btn", "upload", 3, "for"], [1, "fas", "fa-upload"], ["title", "Exportar tr\xE1mite", 1, "action-btn", "export", 3, "click"], [1, "fas", "fa-file-export"], ["title", "Archivar tr\xE1mite", 1, "action-btn", "archive", 3, "click"], [1, "responsable-info"], [1, "responsable-nombre"], ["class", "responsable-fecha", 4, "ngIf"], [1, "responsable-fecha"], [1, "fas", "fa-clock"], [1, "sin-responsable"], [1, "text-muted"], [1, "fecha-vencimiento"], [1, "fecha-texto"], ["class", "estado-vencimiento", 3, "vencido", "urgente", 4, "ngIf"], [1, "estado-vencimiento"], [1, "sin-vencimiento"], [1, "kanban-board"], ["class", "kanban-column", 4, "ngFor", "ngForOf"], [1, "kanban-column"], [1, "column-header"], [1, "column-count"], [1, "column-content"], ["class", "kanban-card", 3, "class", "click", 4, "ngFor", "ngForOf"], [1, "kanban-card", 3, "click"], [1, "card-header"], [1, "codigo"], [1, "prioridad"], [1, "card-content"], [1, "card-footer"], [1, "tiempo"], [1, "documentos"], [1, "fas", "fa-paperclip"], [1, "pagination"], [1, "page-btn", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "page-numbers"], [4, "ngIf"], ["class", "page-number", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "fas", "fa-chevron-right"], ["title", "Primera p\xE1gina", 1, "page-number", 3, "click"], [1, "page-ellipsis"], [1, "page-number", 3, "click"], ["title", "\xDAltima p\xE1gina", 1, "page-number", 3, "click"], [1, "modal-overlay", 3, "click"], [1, "modal-content", "notifications-modal", 3, "click"], [1, "modal-header"], [1, "modal-close", 3, "click"], [1, "modal-body"], ["class", "empty-notifications", 4, "ngIf"], [1, "notifications-list"], ["class", "notification-item", 3, "unread", "click", 4, "ngFor", "ngForOf"], [1, "empty-notifications"], [1, "fas", "fa-bell-slash"], [1, "notification-item", 3, "click"], [1, "notification-icon"], [1, "notification-content"], [1, "notification-time"], ["class", "unread-indicator", 4, "ngIf"], [1, "unread-indicator"], [1, "modal-content", 3, "click"], [1, "form-group"], ["placeholder", "Observaciones sobre el cambio de estado...", "rows", "4", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], [1, "btn-cancel", 3, "click"], [1, "btn-save", 3, "click"], [3, "ngModelChange", "change", "ngModel"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["placeholder", "Motivo de la derivaci\xF3n y instrucciones...", "rows", "4", "required", "", 3, "ngModelChange", "ngModel"], [1, "btn-save", 3, "click", "disabled"]], template: function BandejaTramitesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "h1");
        \u0275\u0275element(4, "i", 5);
        \u0275\u0275text(5, " Bandeja de Tr\xE1mites ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Procesa y gestiona las solicitudes asignadas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 6)(9, "button", 7);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_9_listener() {
          return ctx.showNotificacionesModal = true;
        });
        \u0275\u0275element(10, "i", 8);
        \u0275\u0275template(11, BandejaTramitesComponent_span_11_Template, 2, 1, "span", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 10)(13, "button", 11);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_13_listener() {
          return ctx.toggleVista("lista");
        });
        \u0275\u0275element(14, "i", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 13);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_15_listener() {
          return ctx.toggleVista("kanban");
        });
        \u0275\u0275element(16, "i", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 15);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_17_listener() {
          return ctx.toggleVista("calendario");
        });
        \u0275\u0275element(18, "i", 16);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(19, BandejaTramitesComponent_div_19_Template, 43, 9, "div", 17);
        \u0275\u0275elementStart(20, "div", 18)(21, "div", 19)(22, "div", 20);
        \u0275\u0275element(23, "i", 21);
        \u0275\u0275elementStart(24, "input", 22);
        \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_Template_input_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function BandejaTramitesComponent_Template_input_input_24_listener() {
          return ctx.onSearch(ctx.searchTerm);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, BandejaTramitesComponent_button_25_Template, 2, 0, "button", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 24)(27, "div", 25)(28, "button", 26);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_28_listener() {
          ctx.filtros.soloVencidos = !ctx.filtros.soloVencidos;
          return ctx.aplicarFiltros();
        });
        \u0275\u0275element(29, "i", 27);
        \u0275\u0275text(30, " Vencidos ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "button", 26);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_31_listener() {
          ctx.filtros.soloUrgentes = !ctx.filtros.soloUrgentes;
          return ctx.aplicarFiltros();
        });
        \u0275\u0275element(32, "i", 28);
        \u0275\u0275text(33, " Urgentes ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 26);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_34_listener() {
          ctx.filtros.soloSinAsignar = !ctx.filtros.soloSinAsignar;
          return ctx.aplicarFiltros();
        });
        \u0275\u0275element(35, "i", 29);
        \u0275\u0275text(36, " Sin Asignar ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "button", 30);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_37_listener() {
          return ctx.toggleFilters();
        });
        \u0275\u0275element(38, "i", 31);
        \u0275\u0275text(39, " M\xE1s Filtros ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(40, "div", 32)(41, "div", 33)(42, "div", 34)(43, "label");
        \u0275\u0275text(44, "Estado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "select", 35);
        \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_Template_select_ngModelChange_45_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtros.estado, $event) || (ctx.filtros.estado = $event);
          return $event;
        });
        \u0275\u0275elementStart(46, "option", 36);
        \u0275\u0275text(47, "Todos los estados");
        \u0275\u0275elementEnd();
        \u0275\u0275template(48, BandejaTramitesComponent_option_48_Template, 2, 2, "option", 37);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 34)(50, "label");
        \u0275\u0275text(51, "\xC1rea de Origen");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "select", 35);
        \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_Template_select_ngModelChange_52_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtros.areaOrigen, $event) || (ctx.filtros.areaOrigen = $event);
          return $event;
        });
        \u0275\u0275elementStart(53, "option", 36);
        \u0275\u0275text(54, "Todas las \xE1reas");
        \u0275\u0275elementEnd();
        \u0275\u0275template(55, BandejaTramitesComponent_option_55_Template, 2, 2, "option", 37);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "div", 34)(57, "label");
        \u0275\u0275text(58, "Prioridad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "select", 35);
        \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_Template_select_ngModelChange_59_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtros.prioridad, $event) || (ctx.filtros.prioridad = $event);
          return $event;
        });
        \u0275\u0275elementStart(60, "option", 36);
        \u0275\u0275text(61, "Todas las prioridades");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "option", 38);
        \u0275\u0275text(63, "Baja");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "option", 39);
        \u0275\u0275text(65, "Normal");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "option", 40);
        \u0275\u0275text(67, "Alta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "option", 41);
        \u0275\u0275text(69, "Urgente");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(70, "div", 34)(71, "label");
        \u0275\u0275text(72, "Asignado a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "select", 35);
        \u0275\u0275twoWayListener("ngModelChange", function BandejaTramitesComponent_Template_select_ngModelChange_73_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.filtros.asignadoA, $event) || (ctx.filtros.asignadoA = $event);
          return $event;
        });
        \u0275\u0275elementStart(74, "option", 36);
        \u0275\u0275text(75, "Cualquier trabajador");
        \u0275\u0275elementEnd();
        \u0275\u0275template(76, BandejaTramitesComponent_option_76_Template, 2, 3, "option", 37);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(77, "div", 42)(78, "button", 43);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_78_listener() {
          return ctx.aplicarFiltros();
        });
        \u0275\u0275text(79, " Aplicar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(80, "button", 44);
        \u0275\u0275listener("click", function BandejaTramitesComponent_Template_button_click_80_listener() {
          return ctx.limpiarFiltros();
        });
        \u0275\u0275text(81, " Limpiar ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(82, BandejaTramitesComponent_div_82_Template, 20, 1, "div", 45);
        \u0275\u0275elementStart(83, "div", 46);
        \u0275\u0275template(84, BandejaTramitesComponent_div_84_Template, 4, 0, "div", 47);
        \u0275\u0275pipe(85, "async");
        \u0275\u0275template(86, BandejaTramitesComponent_div_86_Template, 6, 0, "div", 48);
        \u0275\u0275pipe(87, "async");
        \u0275\u0275template(88, BandejaTramitesComponent_div_88_Template, 38, 15, "div", 49);
        \u0275\u0275pipe(89, "async");
        \u0275\u0275template(90, BandejaTramitesComponent_div_90_Template, 2, 1, "div", 50);
        \u0275\u0275pipe(91, "async");
        \u0275\u0275elementEnd();
        \u0275\u0275template(92, BandejaTramitesComponent_div_92_Template, 9, 5, "div", 51);
        \u0275\u0275elementEnd();
        \u0275\u0275template(93, BandejaTramitesComponent_div_93_Template, 11, 2, "div", 52)(94, BandejaTramitesComponent_div_94_Template, 27, 4, "div", 52)(95, BandejaTramitesComponent_div_95_Template, 40, 8, "div", 52);
        \u0275\u0275elementStart(96, "app-responder-tramite-modal", 53);
        \u0275\u0275listener("close", function BandejaTramitesComponent_Template_app_responder_tramite_modal_close_96_listener() {
          return ctx.cerrarModalResponder();
        })("tramiteRespondido", function BandejaTramitesComponent_Template_app_responder_tramite_modal_tramiteRespondido_96_listener($event) {
          return ctx.onTramiteRespondido($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "app-rechazar-tramite-modal", 54);
        \u0275\u0275listener("close", function BandejaTramitesComponent_Template_app_rechazar_tramite_modal_close_97_listener() {
          return ctx.cerrarModalRechazar();
        })("rechazado", function BandejaTramitesComponent_Template_app_rechazar_tramite_modal_rechazado_97_listener($event) {
          return ctx.onTramiteRechazado($event);
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275classProp("has-notifications", ctx.notificacionesNoLeidas > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.notificacionesNoLeidas > 0);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.vistaActual === "lista");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.vistaActual === "kanban");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.vistaActual === "calendario");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.estadisticas);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.filtros.soloVencidos);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.filtros.soloUrgentes);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.filtros.soloSinAsignar);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.showFilters);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("active", ctx.showFilters);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtros.estado);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.estadosDisponibles);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtros.areaOrigen);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.areasDisponibles);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtros.prioridad);
        \u0275\u0275advance(14);
        \u0275\u0275twoWayProperty("ngModel", ctx.filtros.asignadoA);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.trabajadoresDisponibles);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.selectedTramites.length > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(85, 42, ctx.loading$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(87, 44, ctx.loading$) && ctx.tramites.length === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(89, 46, ctx.loading$) && ctx.tramites.length > 0 && ctx.vistaActual === "lista");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(91, 48, ctx.loading$) && ctx.tramites.length > 0 && ctx.vistaActual === "kanban");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.totalPages > 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showNotificacionesModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showCambiarEstadoModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDerivarModal);
        \u0275\u0275advance();
        \u0275\u0275property("tramite", ctx.tramiteSeleccionado)("show", ctx.showResponderTramiteModal);
        \u0275\u0275advance();
        \u0275\u0275property("tramite", ctx.tramiteSeleccionado)("show", ctx.showRechazarModal);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, AsyncPipe, SlicePipe, DecimalPipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, RequiredValidator, NgModel, RouterModule, ResponderTramiteModalComponent, RechazarTramiteModalComponent], styles: ['\n\n.bandeja-tramites-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1600px;\n  margin: 0 auto;\n  background: #f8fafc;\n  min-height: 100vh;\n}\n.header-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 25px;\n  padding: 0 5px;\n}\n.title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1a202c;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.title-area[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 0 0;\n  color: #718096;\n  font-size: 16px;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.btn-notifications[_ngcontent-%COMP%] {\n  position: relative;\n  background: white;\n  border: 2px solid #e2e8f0;\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  font-size: 16px;\n  color: #4a5568;\n}\n.btn-notifications[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  color: #667eea;\n}\n.btn-notifications.has-notifications[_ngcontent-%COMP%] {\n  border-color: #f56565;\n  color: #f56565;\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n.notification-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  background: #f56565;\n  color: white;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 6px;\n  border-radius: 10px;\n  line-height: 1;\n  min-width: 18px;\n  text-align: center;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.05);\n  }\n}\n.view-toggles[_ngcontent-%COMP%] {\n  display: flex;\n  background: white;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  overflow: hidden;\n}\n.view-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 10px 14px;\n  cursor: pointer;\n  color: #718096;\n  transition: all 0.3s ease;\n}\n.view-btn[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n  color: #4a5568;\n}\n.view-btn.active[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n}\n.stats-dashboard[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 20px;\n  margin-bottom: 25px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 18px;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  transition: transform 0.3s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n  color: white;\n}\n.stat-card.asignados[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4299e1 0%,\n      #3182ce 100%);\n}\n.stat-card.revision[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ed8936 0%,\n      #dd6b20 100%);\n}\n.stat-card.proceso[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9f7aea 0%,\n      #805ad5 100%);\n}\n.stat-card.completados[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78 0%,\n      #38a169 100%);\n}\n.stat-card.vencidos[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f56565 0%,\n      #e53e3e 100%);\n}\n.stat-card.rating[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d69e2e 0%,\n      #b7791f 100%);\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1a202c;\n  line-height: 1;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #718096;\n  margin-top: 4px;\n  font-weight: 500;\n}\n.toolbar[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.search-section[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 400px;\n}\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 16px;\n  color: #a0aec0;\n  z-index: 1;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px 12px 45px;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 14px;\n  transition: border-color 0.3s ease;\n  background: #f7fafc;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  background: white;\n}\n.clear-search[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  background: none;\n  border: none;\n  color: #a0aec0;\n  cursor: pointer;\n  padding: 4px;\n}\n.toolbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.quick-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.filter-chip[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  border: 2px solid #e2e8f0;\n  padding: 8px 12px;\n  border-radius: 20px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  color: #4a5568;\n}\n.filter-chip[_ngcontent-%COMP%]:hover {\n  border-color: #cbd5e0;\n}\n.filter-chip.active[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border-color: #667eea;\n}\n.btn-filter[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  border: 2px solid #e2e8f0;\n  padding: 10px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  color: #4a5568;\n}\n.btn-filter[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  color: #667eea;\n}\n.btn-filter.active[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border-color: #667eea;\n}\n.filters-panel[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  margin-bottom: 20px;\n  overflow: hidden;\n  max-height: 0;\n  transition: max-height 0.4s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.filters-panel.active[_ngcontent-%COMP%] {\n  max-height: 400px;\n}\n.filters-content[_ngcontent-%COMP%] {\n  padding: 20px;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  align-items: end;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  color: #4a5568;\n  margin-bottom: 8px;\n  font-size: 14px;\n}\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  background: white;\n  font-size: 14px;\n  color: #4a5568;\n}\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.btn-apply[_ngcontent-%COMP%], .btn-clear[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: all 0.3s ease;\n}\n.btn-apply[_ngcontent-%COMP%] {\n  background: #48bb78;\n  color: white;\n}\n.btn-clear[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #4a5568;\n}\n.bulk-actions[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  padding: 16px 20px;\n  border-radius: 10px;\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    transform: translateY(-10px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.selection-info[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.bulk-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.bulk-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.bulk-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #718096;\n}\n.loading-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #667eea;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: #e2e8f0;\n  margin-bottom: 20px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #4a5568;\n  margin: 0 0 12px 0;\n}\n.tramites-lista[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.lista-header[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 40px 150px 1fr 180px 120px 100px 160px 80px 120px;\n  gap: 16px;\n  padding: 16px 20px;\n  background: #f7fafc;\n  border-bottom: 2px solid #e2e8f0;\n  font-weight: 600;\n  color: #4a5568;\n  font-size: 14px;\n}\n.header-col[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  transition: color 0.3s ease;\n}\n.header-col[_ngcontent-%COMP%]:hover {\n  color: #667eea;\n}\n.header-col[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #a0aec0;\n}\n.tramites-list[_ngcontent-%COMP%] {\n  max-height: 600px;\n  overflow-y: auto;\n}\n.tramite-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 40px 150px 1fr 180px 120px 100px 160px 80px 120px;\n  gap: 16px;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  align-items: center;\n}\n.tramite-row[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n}\n.tramite-row.vencido[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  border-left: 4px solid #f56565;\n}\n.tramite-row.urgente[_ngcontent-%COMP%] {\n  background: #fef5e7;\n  border-left: 4px solid #ed8936;\n}\n.tramite-row.alta-prioridad[_ngcontent-%COMP%] {\n  background: #e6fffa;\n  border-left: 4px solid #319795;\n}\n.bulk-select[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.bulk-select[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n}\n.codigo-badge[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  background: #ebf8ff;\n  color: #3182ce;\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.tipo-tramite[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #718096;\n  margin-top: 2px;\n}\n.asunto-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1a202c;\n  margin-bottom: 4px;\n  line-height: 1.3;\n}\n.asunto-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #718096;\n  line-height: 1.4;\n}\n.solicitante-info[_ngcontent-%COMP%]   .nombre[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #4a5568;\n  font-size: 13px;\n}\n.solicitante-info[_ngcontent-%COMP%]   .area[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #718096;\n  margin-top: 2px;\n}\n.estado-badge[_ngcontent-%COMP%], .prioridad-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1;\n}\n.estado-enviado[_ngcontent-%COMP%] {\n  background: #ebf8ff;\n  color: #3182ce;\n}\n.estado-revision[_ngcontent-%COMP%] {\n  background: #fef5e7;\n  color: #d69e2e;\n}\n.estado-derivado[_ngcontent-%COMP%] {\n  background: #e6fffa;\n  color: #319795;\n}\n.estado-observado[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n}\n.estado-aprobado[_ngcontent-%COMP%] {\n  background: #f0fff4;\n  color: #38a169;\n}\n.estado-rechazado[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n}\n.estado-finalizado[_ngcontent-%COMP%] {\n  background: #e6fffa;\n  color: #319795;\n}\n.prioridad-baja[_ngcontent-%COMP%] {\n  background: #f0fff4;\n  color: #38a169;\n}\n.prioridad-normal[_ngcontent-%COMP%] {\n  background: #ebf8ff;\n  color: #3182ce;\n}\n.prioridad-alta[_ngcontent-%COMP%] {\n  background: #fef5e7;\n  color: #d69e2e;\n}\n.prioridad-urgente[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n}\n.tiempo-info[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.dias-transcurridos[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #4a5568;\n  font-size: 14px;\n}\n.vencimiento[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #718096;\n  margin-top: 2px;\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  justify-content: center;\n}\n.vencimiento.urgente[_ngcontent-%COMP%] {\n  color: #d69e2e;\n  font-weight: 600;\n}\n.vencimiento.vencido[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-weight: 600;\n}\n.responsable-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  text-align: center;\n}\n.responsable-nombre[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #2d3748;\n  font-size: 12px;\n  line-height: 1.3;\n}\n.responsable-fecha[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #718096;\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  justify-content: center;\n}\n.responsable-fecha[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 9px;\n}\n.sin-responsable[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n.sin-responsable[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #a0aec0;\n  font-style: italic;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 6px;\n  border: 1px solid #e2e8f0;\n  background: white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  font-size: 11px;\n  position: relative;\n}\n.action-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: scale(1.1);\n}\n.action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  background: #f5f5f5 !important;\n  color: #c0c0c0 !important;\n  border-color: #e0e0e0 !important;\n  transform: none !important;\n  box-shadow: none !important;\n}\n.action-btn.estado[_ngcontent-%COMP%] {\n  color: #667eea;\n  border-color: #bee3f8;\n}\n.action-btn.estado[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #667eea;\n  color: white;\n}\n.action-btn.derivar[_ngcontent-%COMP%] {\n  color: #48bb78;\n  border-color: #c6f6d5;\n}\n.action-btn.derivar[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #48bb78;\n  color: white;\n}\n.action-btn.download[_ngcontent-%COMP%] {\n  color: #4299e1;\n  border-color: #bee3f8;\n}\n.action-btn.download[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4299e1;\n  color: white;\n}\n.action-btn.upload[_ngcontent-%COMP%] {\n  color: #ed8936;\n  border-color: #fbd38d;\n}\n.action-btn.upload[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ed8936;\n  color: white;\n}\n.action-btn.responder[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78,\n      #38a169);\n  color: white;\n  border: none;\n  transition: all 0.3s ease;\n}\n.action-btn.responder[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #38a169,\n      #2f855a);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);\n}\n.action-btn.editar[_ngcontent-%COMP%] {\n  color: #9f7aea;\n  border-color: #e9d8fd;\n}\n.action-btn.editar[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #9f7aea;\n  color: white;\n}\n.action-btn.export[_ngcontent-%COMP%] {\n  color: #38a169;\n  border-color: #c6f6d5;\n}\n.action-btn.export[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #38a169;\n  color: white;\n}\n.action-btn.archive[_ngcontent-%COMP%] {\n  color: #d69e2e;\n  border-color: #faf089;\n}\n.action-btn.archive[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #d69e2e;\n  color: white;\n}\n.action-btn.aprobar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #48bb78,\n      #38a169);\n  color: white;\n  border: none;\n  transition: all 0.3s ease;\n}\n.action-btn.aprobar[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #38a169,\n      #2f855a);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);\n}\n.action-btn.rechazar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e53e3e,\n      #c53030);\n  color: white;\n  border: none;\n  transition: all 0.3s ease;\n}\n.action-btn.rechazar[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #c53030,\n      #9c2626);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);\n}\n.bulk-btn.exportar[_ngcontent-%COMP%] {\n  background: rgba(56, 161, 105, 0.2);\n  border-color: rgba(56, 161, 105, 0.3);\n}\n.bulk-btn.exportar[_ngcontent-%COMP%]:hover {\n  background: rgba(56, 161, 105, 0.3);\n}\n.bulk-btn.archivar[_ngcontent-%COMP%] {\n  background: rgba(214, 158, 46, 0.2);\n  border-color: rgba(214, 158, 46, 0.3);\n}\n.bulk-btn.archivar[_ngcontent-%COMP%]:hover {\n  background: rgba(214, 158, 46, 0.3);\n}\n.doc-count[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  background: #4299e1;\n  color: white;\n  font-size: 8px;\n  font-weight: 700;\n  padding: 1px 4px;\n  border-radius: 8px;\n  line-height: 1;\n  min-width: 14px;\n  text-align: center;\n}\n.file-upload[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.kanban-board[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  overflow-x: auto;\n  padding-bottom: 20px;\n}\n.kanban-column[_ngcontent-%COMP%] {\n  min-width: 280px;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.column-header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  background: #f7fafc;\n  border-bottom: 2px solid #e2e8f0;\n  border-radius: 12px 12px 0 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.column-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #4a5568;\n}\n.column-count[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n}\n.column-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  max-height: 500px;\n  overflow-y: auto;\n}\n.kanban-card[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  border-radius: 8px;\n  padding: 14px;\n  margin-bottom: 12px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border-left: 3px solid transparent;\n}\n.kanban-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.kanban-card.vencido[_ngcontent-%COMP%] {\n  border-left-color: #f56565;\n  background: #fed7d7;\n}\n.kanban-card.urgente[_ngcontent-%COMP%] {\n  border-left-color: #ed8936;\n  background: #fef5e7;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.card-header[_ngcontent-%COMP%]   .codigo[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 11px;\n  font-weight: 600;\n  color: #667eea;\n}\n.card-header[_ngcontent-%COMP%]   .prioridad[_ngcontent-%COMP%] {\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 10px;\n}\n.card-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 13px;\n  font-weight: 600;\n  color: #1a202c;\n  line-height: 1.3;\n}\n.card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  color: #718096;\n}\n.card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 10px;\n  padding-top: 8px;\n  border-top: 1px solid #e2e8f0;\n}\n.card-footer[_ngcontent-%COMP%]   .tiempo[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #718096;\n  font-weight: 600;\n}\n.card-footer[_ngcontent-%COMP%]   .documentos[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #4299e1;\n  display: flex;\n  align-items: center;\n  gap: 3px;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n  margin-top: 30px;\n}\n.page-btn[_ngcontent-%COMP%], .page-number[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e2e8f0;\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n  font-size: 14px;\n  font-weight: 500;\n  color: #4a5568;\n}\n.page-btn[_ngcontent-%COMP%]:hover:not(:disabled), .page-number[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  color: #667eea;\n}\n.page-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.page-number.active[_ngcontent-%COMP%] {\n  background: #667eea;\n  border-color: #667eea;\n  color: white;\n}\n.page-numbers[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.page-ellipsis[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  color: #718096;\n  font-weight: 500;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 20px;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 500px;\n  max-height: 80vh;\n  overflow-y: auto;\n}\n.notifications-modal[_ngcontent-%COMP%] {\n  max-width: 600px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 20px 20px 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #1a202c;\n  font-size: 18px;\n  font-weight: 600;\n}\n.modal-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #718096;\n  transition: all 0.3s ease;\n}\n.modal-close[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n  color: #4a5568;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  color: #4a5568;\n  margin-bottom: 8px;\n  font-size: 14px;\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  background: white;\n  font-size: 14px;\n  color: #4a5568;\n  resize: vertical;\n}\n.form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 16px 20px 20px 20px;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.btn-cancel[_ngcontent-%COMP%], .btn-save[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #4a5568;\n}\n.btn-save[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  background: #5a67d8;\n}\n.btn-save[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.empty-notifications[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #718096;\n}\n.empty-notifications[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #e2e8f0;\n  margin-bottom: 16px;\n}\n.notifications-list[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n}\n.notification-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 16px;\n  border-bottom: 1px solid #e2e8f0;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  position: relative;\n}\n.notification-item[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n}\n.notification-item.unread[_ngcontent-%COMP%] {\n  background: #ebf8ff;\n}\n.notification-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(102, 126, 234, 0.1);\n  flex-shrink: 0;\n}\n.notification-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.notification-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #1a202c;\n}\n.notification-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 6px 0;\n  font-size: 13px;\n  color: #4a5568;\n  line-height: 1.4;\n}\n.notification-time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #718096;\n}\n.unread-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  width: 8px;\n  height: 8px;\n  background: #667eea;\n  border-radius: 50%;\n}\n@media (max-width: 1024px) {\n  .bandeja-tramites-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .stats-dashboard[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 15px;\n  }\n  .lista-header[_ngcontent-%COMP%], .tramite-row[_ngcontent-%COMP%] {\n    grid-template-columns: 30px 120px 1fr 100px 80px 60px 100px;\n  }\n  .header-col.tiempo[_ngcontent-%COMP%], .row-col.tiempo[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 768px) {\n  .header-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 20px;\n  }\n  .title-area[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .stats-dashboard[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .search-section[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: none;\n  }\n  .toolbar-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .quick-filters[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n  .kanban-board[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .kanban-column[_ngcontent-%COMP%] {\n    min-width: auto;\n  }\n  .lista-header[_ngcontent-%COMP%], .tramite-row[_ngcontent-%COMP%] {\n    grid-template-columns: 30px 1fr 80px;\n    grid-template-areas: "check asunto actions" ". meta meta";\n  }\n  .bulk-select[_ngcontent-%COMP%] {\n    grid-area: check;\n  }\n  .row-col.asunto[_ngcontent-%COMP%] {\n    grid-area: asunto;\n  }\n  .row-col.acciones[_ngcontent-%COMP%] {\n    grid-area: actions;\n  }\n  .row-col.codigo[_ngcontent-%COMP%], .row-col.solicitante[_ngcontent-%COMP%], .row-col.estado[_ngcontent-%COMP%], .row-col.prioridad[_ngcontent-%COMP%] {\n    grid-area: meta;\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n    margin-top: 8px;\n  }\n}\n@media (max-width: 480px) {\n  .stats-dashboard[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .stat-number[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .filter-chip[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 6px 10px;\n  }\n  .bulk-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 12px;\n  }\n  .bulk-buttons[_ngcontent-%COMP%] {\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n}\n.fecha-vencimiento[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  align-items: center;\n}\n.modal-content[_ngcontent-%COMP%]   textarea.ng-invalid[_ngcontent-%COMP%], .modal-content[_ngcontent-%COMP%]   input.ng-invalid[_ngcontent-%COMP%], .modal-content[_ngcontent-%COMP%]   select.ng-invalid[_ngcontent-%COMP%] {\n  border-color: #e2e8f0 !important;\n  box-shadow: none !important;\n}\n.modal-content[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus, .modal-content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .modal-content[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #9ca3af !important;\n  box-shadow: 0 0 0 1px rgba(156, 163, 175, 0.1) !important;\n}\n.fecha-texto[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: #495057;\n  text-align: center;\n}\n.estado-vencimiento[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.estado-vencimiento.urgente[_ngcontent-%COMP%] {\n  color: #fd7e14;\n  font-weight: 500;\n}\n.estado-vencimiento.vencido[_ngcontent-%COMP%] {\n  color: #dc3545;\n  font-weight: 500;\n}\n.sin-vencimiento[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-style: italic;\n  font-size: 0.85rem;\n  text-align: center;\n}\n/*# sourceMappingURL=bandeja-tramites.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BandejaTramitesComponent, { className: "BandejaTramitesComponent" });
})();
export {
  BandejaTramitesComponent
};
//# sourceMappingURL=chunk-4QV5NXU6.js.map
