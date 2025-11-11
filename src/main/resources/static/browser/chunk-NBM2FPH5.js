import {
  ReportesService
} from "./chunk-TSV7YY64.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  UpperCasePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HL73AAZ4.js";

// src/app/features/reportes/reportes.component.ts
function ReportesComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1, "Cargando datos...");
    \u0275\u0275elementEnd();
  }
}
function ReportesComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "div", 31);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 32);
    \u0275\u0275text(6, "TR\xC1MITES REGISTRADOS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 33)(8, "div", 31);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 32);
    \u0275\u0275text(12, "COMPLETADOS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 34)(14, "div", 31);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 32);
    \u0275\u0275text(18, "EN CURSO");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 35)(20, "div", 31);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 32);
    \u0275\u0275text(24, "VENCIDOS");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 4, ctx_r0.resumenGeneral.totalTramites || 0));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 6, ctx_r0.resumenGeneral.completados || 0));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 8, ctx_r0.resumenGeneral.enProceso || 0));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 10, ctx_r0.resumenGeneral.vencidos || 0));
  }
}
function ReportesComponent_tr_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 37);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 38);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 39);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tipo_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", i_r3 % 4 === 0 ? "azul" : i_r3 % 4 === 1 ? "verde" : i_r3 % 4 === 2 ? "morado" : "gris");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tipo_r2.tipo, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 5, tipo_r2.cantidad));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 7, tipo_r2.completados));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 9, tipo_r2.pendientes));
  }
}
function ReportesComponent_tr_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 40)(1, "td")(2, "strong");
    \u0275\u0275text(3, "TOTAL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 37)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 38)(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 39)(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 3, ctx_r0.resumenGeneral.totalTramites));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 5, ctx_r0.resumenGeneral.completados));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 7, ctx_r0.resumenGeneral.enProceso));
  }
}
function ReportesComponent_tr_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 41);
    \u0275\u0275text(2, "No hay datos disponibles");
    \u0275\u0275elementEnd()();
  }
}
function ReportesComponent_tr_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 42)(1, "td", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 17)(6, "span", 44);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tramite_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r0.obtenerClaseEstado(tramite_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r4.codigo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r4.asunto);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.obtenerClaseEstadoTexto(tramite_r4));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.obtenerEstadoUrgente(tramite_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r4.areaResponsable);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r4.responsable);
  }
}
function ReportesComponent_tr_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 45);
    \u0275\u0275text(2, "No hay tr\xE1mites urgentes");
    \u0275\u0275elementEnd()();
  }
}
var ReportesComponent = class _ReportesComponent {
  constructor(reportesService) {
    this.reportesService = reportesService;
    this.fechaGeneracion = /* @__PURE__ */ new Date();
    this.reporteCompleto = null;
    this.resumenGeneral = {};
    this.tramitesPorTipo = [];
    this.tramitesUrgentes = [];
    this.cargando = true;
  }
  ngOnInit() {
    this.cargarReportes();
  }
  cargarReportes() {
    this.cargando = true;
    this.reportesService.obtenerReporteCompleto().subscribe({
      next: (reporte) => {
        this.reporteCompleto = reporte;
        this.resumenGeneral = reporte.resumenGeneral;
        this.tramitesPorTipo = reporte.tramitesPorTipo;
        this.tramitesUrgentes = reporte.tramitesUrgentes;
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
      }
    });
  }
  imprimirReporte() {
    window.print();
  }
  exportarExcel() {
    if (!this.reporteCompleto) {
      alert("No hay datos para exportar");
      return;
    }
    let csvContent = "REPORTE DE TRAMITES - UNIVERSIDAD NACIONAL DE TUMBES\n";
    csvContent += "Fecha de generacion: " + this.fechaGeneracion.toLocaleDateString("es-PE") + "\n\n";
    csvContent += "RESUMEN GENERAL\n";
    csvContent += `Total Tramites,${this.resumenGeneral.totalTramites}
`;
    csvContent += `Completados,${this.resumenGeneral.completados}
`;
    csvContent += `En Proceso,${this.resumenGeneral.enProceso}
`;
    csvContent += `Vencidos,${this.resumenGeneral.vencidos}
`;
    csvContent += `Rechazados,${this.resumenGeneral.rechazados}
`;
    csvContent += `Observados,${this.resumenGeneral.observados}

`;
    csvContent += "TRAMITES POR TIPO DE DOCUMENTO\n";
    csvContent += "Tipo,Cantidad,Completados,Pendientes\n";
    this.tramitesPorTipo.forEach((tipo) => {
      csvContent += `${tipo.tipo},${tipo.cantidad},${tipo.completados},${tipo.pendientes}
`;
    });
    csvContent += "\n";
    csvContent += "TRAMITES QUE REQUIEREN ATENCION URGENTE\n";
    csvContent += "Codigo,Asunto,Estado,Area Responsable,Responsable,Dias Vencido\n";
    this.tramitesUrgentes.forEach((tramite) => {
      csvContent += `${tramite.codigo},${tramite.asunto},${tramite.estado},${tramite.areaResponsable},${tramite.responsable},${tramite.diasVencido}
`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "reporte_tramites_" + this.fechaGeneracion.getTime() + ".csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  obtenerEstadoUrgente(tramite) {
    if (tramite.diasVencido > 0) {
      return `VENCIDO HACE ${tramite.diasVencido} ${tramite.diasVencido === 1 ? "D\xCDA" : "D\xCDAS"}`;
    } else if (tramite.diasVencido === 0) {
      return "VENCE HOY A LAS 23:59 HRS";
    } else if (tramite.diasVencido === -1) {
      return "VENCE MA\xD1ANA";
    } else {
      return `VENCE EN ${Math.abs(tramite.diasVencido)} D\xCDAS`;
    }
  }
  obtenerClaseEstado(tramite) {
    if (tramite.diasVencido > 0) {
      return "fila-vencida";
    } else if (tramite.diasVencido === 0) {
      return "fila-hoy";
    } else {
      return "fila-pronto";
    }
  }
  obtenerClaseEstadoTexto(tramite) {
    if (tramite.diasVencido > 0) {
      return "vencido";
    } else if (tramite.diasVencido === 0) {
      return "hoy";
    } else {
      return "pronto";
    }
  }
  static {
    this.\u0275fac = function ReportesComponent_Factory(t) {
      return new (t || _ReportesComponent)(\u0275\u0275directiveInject(ReportesService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportesComponent, selectors: [["app-reportes"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 79, vars: 17, consts: [[1, "reportes-container"], [1, "encabezado"], [1, "fas", "fa-chart-bar"], [2, "color", "#666", "font-size", "14px", "margin", "5px 0 0 0"], [1, "botones"], [1, "btn", "btn-excel", 3, "click"], [1, "fas", "fa-file-excel"], [1, "btn", "btn-imprimir", 3, "click"], [1, "fas", "fa-print"], [1, "seccion", "resumen"], [2, "color", "#666", "font-size", "13px", "margin", "10px 0 20px 0"], ["class", "cargando", 4, "ngIf"], ["class", "tarjetas", 4, "ngIf"], [1, "seccion"], [2, "color", "#666", "font-size", "13px", "margin", "10px 0 15px 0"], [1, "tabla-responsive"], [1, "tabla"], [1, "centro"], [4, "ngFor", "ngForOf"], ["class", "total-fila", 4, "ngIf"], [4, "ngIf"], [1, "seccion", "alerta"], [1, "fas", "fa-exclamation-triangle"], [1, "tabla", "tabla-urgente"], [3, "ngClass", 4, "ngFor", "ngForOf"], [1, "pie"], [1, "linea"], [2, "font-size", "12px", "color", "#999"], [1, "cargando"], [1, "tarjetas"], [1, "tarjeta", "total"], [1, "numero"], [1, "texto"], [1, "tarjeta", "completado"], [1, "tarjeta", "proceso"], [1, "tarjeta", "vencido"], [1, "punto", 3, "ngClass"], [1, "centro", "numero"], [1, "centro", "numero", "verde"], [1, "centro", "numero", "naranja"], [1, "total-fila"], ["colspan", "4", 1, "centro"], [3, "ngClass"], [1, "codigo"], [1, "estado", 3, "ngClass"], ["colspan", "5", 1, "centro"]], template: function ReportesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
        \u0275\u0275element(4, "i", 2);
        \u0275\u0275text(5, " REPORTES DE TR\xC1MITES ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 3);
        \u0275\u0275text(7, "An\xE1lisis completo del estado de procesos documentarios");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "button", 5);
        \u0275\u0275listener("click", function ReportesComponent_Template_button_click_9_listener() {
          return ctx.exportarExcel();
        });
        \u0275\u0275element(10, "i", 6);
        \u0275\u0275text(11, " EXPORTAR ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 7);
        \u0275\u0275listener("click", function ReportesComponent_Template_button_click_12_listener() {
          return ctx.imprimirReporte();
        });
        \u0275\u0275element(13, "i", 8);
        \u0275\u0275text(14, " IMPRIMIR ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(15, "div", 9)(16, "h2");
        \u0275\u0275text(17);
        \u0275\u0275pipe(18, "date");
        \u0275\u0275pipe(19, "uppercase");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "p", 10);
        \u0275\u0275text(21, "Indicadores clave del desempe\xF1o del sistema de tr\xE1mites documentarios");
        \u0275\u0275elementEnd();
        \u0275\u0275template(22, ReportesComponent_div_22_Template, 2, 0, "div", 11)(23, ReportesComponent_div_23_Template, 25, 12, "div", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 13)(25, "h2");
        \u0275\u0275text(26, "DISTRIBUCI\xD3N DE TR\xC1MITES POR TIPO DE DOCUMENTO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "p", 14);
        \u0275\u0275text(28, "An\xE1lisis cuantitativo de procesos documentarios clasificados por tipolog\xEDa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 15)(30, "table", 16)(31, "thead")(32, "tr")(33, "th");
        \u0275\u0275text(34, "TIPO DE DOCUMENTO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "th", 17);
        \u0275\u0275text(36, "TOTAL");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "th", 17);
        \u0275\u0275text(38, "FINALIZADOS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "th", 17);
        \u0275\u0275text(40, "PENDIENTES");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(41, "tbody");
        \u0275\u0275template(42, ReportesComponent_tr_42_Template, 13, 11, "tr", 18)(43, ReportesComponent_tr_43_Template, 16, 9, "tr", 19)(44, ReportesComponent_tr_44_Template, 3, 0, "tr", 20);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(45, "div", 21)(46, "h2");
        \u0275\u0275element(47, "i", 22);
        \u0275\u0275text(48, " TR\xC1MITES PENDIENTES DE ATENCI\xD3N ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "p", 14);
        \u0275\u0275text(50, "Procesos documentarios pr\xF3ximos al vencimiento o que requieren seguimiento inmediato");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "div", 15)(52, "table", 23)(53, "thead")(54, "tr")(55, "th");
        \u0275\u0275text(56, "C\xD3DIGO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "th");
        \u0275\u0275text(58, "ASUNTO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "th", 17);
        \u0275\u0275text(60, "ESTADO DE VENCIMIENTO");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "th");
        \u0275\u0275text(62, "\xC1REA RESPONSABLE");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "th");
        \u0275\u0275text(64, "RESPONSABLE");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(65, "tbody");
        \u0275\u0275template(66, ReportesComponent_tr_66_Template, 12, 7, "tr", 24)(67, ReportesComponent_tr_67_Template, 3, 0, "tr", 20);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(68, "div", 25);
        \u0275\u0275element(69, "div", 26);
        \u0275\u0275elementStart(70, "p")(71, "strong");
        \u0275\u0275text(72, "SISTEMA DE GESTI\xD3N DE TR\xC1MITES DOCUMENTARIOS");
        \u0275\u0275elementEnd();
        \u0275\u0275element(73, "br");
        \u0275\u0275text(74, " Universidad Nacional de Tumbes");
        \u0275\u0275element(75, "br");
        \u0275\u0275elementStart(76, "span", 27);
        \u0275\u0275text(77);
        \u0275\u0275pipe(78, "date");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(17);
        \u0275\u0275textInterpolate1("RESUMEN GENERAL - ", \u0275\u0275pipeBind1(19, 12, \u0275\u0275pipeBind2(18, 9, ctx.fechaGeneracion, "MMMM yyyy")), "");
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.cargando);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cargando);
        \u0275\u0275advance(19);
        \u0275\u0275property("ngForOf", ctx.tramitesPorTipo);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tramitesPorTipo.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tramitesPorTipo.length === 0 && !ctx.cargando);
        \u0275\u0275advance(22);
        \u0275\u0275property("ngForOf", ctx.tramitesUrgentes);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tramitesUrgentes.length === 0 && !ctx.cargando);
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate1("Reporte generado el ", \u0275\u0275pipeBind2(78, 14, ctx.fechaGeneracion, "dd 'de' MMMM 'del' yyyy 'a las' hh:mm a"), "");
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, UpperCasePipe, DecimalPipe, DatePipe], styles: ['\n\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.reportes-container[_ngcontent-%COMP%] {\n  padding: 30px;\n  max-width: 1200px;\n  margin: 0 auto;\n  background: #f8f9fa;\n  min-height: 100vh;\n  font-family:\n    "Segoe UI",\n    Arial,\n    sans-serif;\n}\n.encabezado[_ngcontent-%COMP%] {\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n}\n.encabezado[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #2c3e50;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.encabezado[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #546e7a;\n}\n.botones[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 25px;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.btn-excel[_ngcontent-%COMP%] {\n  background: #5a8f6d;\n  color: white;\n}\n.btn-excel[_ngcontent-%COMP%]:hover {\n  background: #4a7c5e;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(90, 143, 109, 0.3);\n}\n.btn-imprimir[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.btn-imprimir[_ngcontent-%COMP%]:hover {\n  background: #5a6268;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);\n}\n.seccion[_ngcontent-%COMP%] {\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  margin-bottom: 30px;\n}\n.seccion[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #2c3e50;\n  margin: 0 0 25px 0;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #e9ecef;\n  font-weight: 600;\n}\n.tarjetas[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}\n.tarjeta[_ngcontent-%COMP%] {\n  padding: 25px;\n  border-radius: 10px;\n  text-align: center;\n  transition: transform 0.3s ease;\n}\n.tarjeta[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n}\n.tarjeta[_ngcontent-%COMP%]   .numero[_ngcontent-%COMP%] {\n  font-size: 48px;\n  font-weight: 700;\n  margin-bottom: 10px;\n}\n.tarjeta[_ngcontent-%COMP%]   .texto[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  opacity: 0.8;\n}\n.tarjeta.total[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #475569 0%,\n      #546e7a 100%);\n  color: white;\n  box-shadow: 0 4px 12px rgba(71, 85, 105, 0.15);\n}\n.tarjeta.completado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #5a8f6d 0%,\n      #4a7c5e 100%);\n  color: white;\n  box-shadow: 0 4px 12px rgba(90, 143, 109, 0.15);\n}\n.tarjeta.proceso[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #7a8f6d 0%,\n      #6b8060 100%);\n  color: white;\n  box-shadow: 0 4px 12px rgba(122, 143, 109, 0.15);\n}\n.tarjeta.vencido[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b6e63 0%,\n      #7a5c54 100%);\n  color: white;\n  box-shadow: 0 4px 12px rgba(139, 110, 99, 0.15);\n}\n.tabla[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 16px;\n  margin-top: 20px;\n}\n.tabla[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n}\n.tabla[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 15px;\n  text-align: left;\n  font-weight: 600;\n  color: #495057;\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 2px solid #dee2e6;\n}\n.tabla[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 15px;\n  border-bottom: 1px solid #e9ecef;\n  color: #495057;\n}\n.tabla[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n.centro[_ngcontent-%COMP%] {\n  text-align: center !important;\n}\n.numero[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 18px;\n}\n.punto[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n.punto.azul[_ngcontent-%COMP%] {\n  background: #546e7a;\n}\n.punto.verde[_ngcontent-%COMP%] {\n  background: #5a8f6d;\n}\n.punto.morado[_ngcontent-%COMP%] {\n  background: #7a8f6d;\n}\n.punto.gris[_ngcontent-%COMP%] {\n  background: #9ca3af;\n}\n.verde[_ngcontent-%COMP%] {\n  color: #5a8f6d;\n}\n.naranja[_ngcontent-%COMP%] {\n  color: #7a8f6d;\n}\n.rojo[_ngcontent-%COMP%] {\n  color: #8b6e63;\n}\n.total-fila[_ngcontent-%COMP%] {\n  background: #f1f3f5;\n  font-weight: bold;\n}\n.total-fila[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 18px 15px;\n  border-top: 2px solid #dee2e6;\n  font-size: 18px;\n}\n.seccion.alerta[_ngcontent-%COMP%] {\n  background: #f5f4f0;\n  border-left: 5px solid #a89968;\n}\n.seccion.alerta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #6b5b47;\n  border-bottom-color: #a89968;\n}\n.seccion.alerta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #8b6e63;\n  margin-right: 10px;\n}\n.tabla-urgente[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #a89968;\n}\n.tabla-urgente[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  color: white;\n  font-weight: 700;\n}\n.codigo[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-weight: 600;\n  color: #546e7a;\n}\n.estado[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  display: inline-block;\n}\n.estado.vencido[_ngcontent-%COMP%] {\n  background: #8b6e63;\n  color: white;\n}\n.estado.hoy[_ngcontent-%COMP%] {\n  background: #a89968;\n  color: white;\n}\n.estado.pronto[_ngcontent-%COMP%] {\n  background: #9ca3af;\n  color: white;\n}\n.fila-vencida[_ngcontent-%COMP%] {\n  background: #f5ebe0;\n}\n.fila-hoy[_ngcontent-%COMP%] {\n  background: #f5f3ed;\n}\n.fila-pronto[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n}\n.pie[_ngcontent-%COMP%] {\n  margin-top: 50px;\n  text-align: center;\n  color: #6c757d;\n}\n.pie[_ngcontent-%COMP%]   .linea[_ngcontent-%COMP%] {\n  height: 2px;\n  background: #dee2e6;\n  margin-bottom: 20px;\n}\n.pie[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.8;\n}\n.pie[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-size: 16px;\n}\n@media print {\n  @page {\n    margin: 0.5in;\n  }\n  *[_ngcontent-%COMP%] {\n    -webkit-print-color-adjust: exact !important;\n    color-adjust: exact !important;\n  }\n  body[_ngcontent-%COMP%] {\n    margin: 0;\n    padding: 0;\n    font-size: 12pt;\n    background: white;\n  }\n  .sidebar[_ngcontent-%COMP%], .navbar[_ngcontent-%COMP%], .main-nav[_ngcontent-%COMP%], .navigation[_ngcontent-%COMP%], .menu[_ngcontent-%COMP%], app-sidebar[_ngcontent-%COMP%], mat-sidenav[_ngcontent-%COMP%], .mat-sidenav-container[_ngcontent-%COMP%], .mat-sidenav-backdrop[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .botones[_ngcontent-%COMP%], .btn[_ngcontent-%COMP%], button[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .reportes-container[_ngcontent-%COMP%] {\n    width: 100% !important;\n    max-width: none !important;\n    margin: 0 !important;\n    padding: 0 !important;\n    background: white !important;\n    position: relative !important;\n  }\n  .encabezado[_ngcontent-%COMP%] {\n    background: white !important;\n    box-shadow: none !important;\n    border: 1px solid #000 !important;\n    margin-bottom: 15px !important;\n    padding: 15px !important;\n    page-break-inside: avoid;\n  }\n  .encabezado[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    color: #000 !important;\n    font-size: 18pt !important;\n    text-align: center !important;\n  }\n  .encabezado[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .seccion[_ngcontent-%COMP%] {\n    background: white !important;\n    box-shadow: none !important;\n    border: 1px solid #000 !important;\n    margin-bottom: 15px !important;\n    padding: 10px !important;\n    page-break-inside: avoid;\n  }\n  .seccion[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    color: #000 !important;\n    font-size: 14pt !important;\n    border-bottom: 1px solid #000 !important;\n    margin-bottom: 10px !important;\n  }\n  .tarjetas[_ngcontent-%COMP%] {\n    display: grid !important;\n    grid-template-columns: repeat(4, 1fr) !important;\n    gap: 10px !important;\n  }\n  .tarjeta[_ngcontent-%COMP%] {\n    background: white !important;\n    border: 1px solid #000 !important;\n    color: #000 !important;\n    padding: 10px !important;\n    text-align: center !important;\n  }\n  .tarjeta[_ngcontent-%COMP%]   .numero[_ngcontent-%COMP%] {\n    color: #000 !important;\n    font-size: 16pt !important;\n    font-weight: bold !important;\n  }\n  .tarjeta[_ngcontent-%COMP%]   .texto[_ngcontent-%COMP%] {\n    color: #000 !important;\n    font-size: 10pt !important;\n  }\n  .tabla[_ngcontent-%COMP%] {\n    width: 100% !important;\n    border-collapse: collapse !important;\n    font-size: 10pt !important;\n    margin-top: 10px !important;\n  }\n  .tabla[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .tabla[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    border: 1px solid #000 !important;\n    padding: 5px !important;\n    color: #000 !important;\n    background: white !important;\n  }\n  .tabla[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    background: #f0f0f0 !important;\n    font-weight: bold !important;\n  }\n  .punto[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .estado[_ngcontent-%COMP%] {\n    border: 1px solid #000 !important;\n    background: white !important;\n    color: #000 !important;\n    padding: 2px 4px !important;\n  }\n  .pie[_ngcontent-%COMP%] {\n    margin-top: 20px !important;\n    text-align: center !important;\n    border-top: 1px solid #000 !important;\n    padding-top: 10px !important;\n  }\n  .pie[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    color: #000 !important;\n    font-size: 10pt !important;\n  }\n}\n@media (max-width: 1024px) {\n  .reportes-container[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .tarjetas[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .reportes-container[_ngcontent-%COMP%] {\n    padding: 10px;\n    max-width: 100%;\n    margin: 0;\n  }\n  .encabezado[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 15px;\n    padding: 15px;\n  }\n  .encabezado[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n    gap: 8px;\n  }\n  .encabezado[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .botones[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 12px 20px;\n    font-size: 14px;\n    justify-content: center;\n  }\n  .tarjetas[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n  }\n  .tarjeta[_ngcontent-%COMP%] {\n    padding: 15px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    text-align: left;\n  }\n  .tarjeta[_ngcontent-%COMP%]   .numero[_ngcontent-%COMP%] {\n    font-size: 24px;\n    margin: 0;\n  }\n  .tarjeta[_ngcontent-%COMP%]   .texto[_ngcontent-%COMP%] {\n    font-size: 11px;\n    margin: 0;\n  }\n  .seccion[_ngcontent-%COMP%] {\n    padding: 15px;\n    margin-bottom: 15px;\n  }\n  .seccion[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n    margin-bottom: 15px;\n  }\n  .tabla-responsive[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  .tabla[_ngcontent-%COMP%] {\n    font-size: 11px;\n    min-width: 500px;\n  }\n  .tabla[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .tabla[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 6px 4px;\n    font-size: 10px;\n  }\n  .tabla[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .codigo[_ngcontent-%COMP%] {\n    font-size: 9px;\n  }\n  .estado[_ngcontent-%COMP%] {\n    padding: 3px 6px;\n    font-size: 8px;\n  }\n}\n@media (max-width: 480px) {\n  .reportes-container[_ngcontent-%COMP%] {\n    padding: 8px;\n    font-size: 12px;\n  }\n  .encabezado[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .encabezado[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .botones[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 10px;\n    font-size: 12px;\n  }\n  .tarjetas[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .tarjeta[_ngcontent-%COMP%] {\n    padding: 12px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .tarjeta[_ngcontent-%COMP%]   .numero[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .tarjeta[_ngcontent-%COMP%]   .texto[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .seccion[_ngcontent-%COMP%] {\n    padding: 12px;\n    margin-bottom: 12px;\n  }\n  .seccion[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .tabla[_ngcontent-%COMP%] {\n    font-size: 9px;\n    width: 100%;\n    display: block;\n    overflow-x: auto;\n    white-space: nowrap;\n  }\n  .tabla[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .tabla[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 4px 2px;\n    font-size: 8px;\n  }\n  .codigo[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .estado[_ngcontent-%COMP%] {\n    padding: 2px 4px;\n    font-size: 7px;\n  }\n}\n/*# sourceMappingURL=reportes.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportesComponent, { className: "ReportesComponent" });
})();
export {
  ReportesComponent
};
//# sourceMappingURL=chunk-NBM2FPH5.js.map
