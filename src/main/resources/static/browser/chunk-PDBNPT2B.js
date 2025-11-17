import {
  OrganigramaService
} from "./chunk-JNC72FGQ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-T3F2XNQR.js";
import {
  CommonModule,
  NgForOf,
  NgIf,
  __async,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VDZBNFIH.js";

// src/app/features/organigrama/organigrama.component.ts
function OrganigramaComponent_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function OrganigramaComponent_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.limpiarBusqueda());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 20);
    \u0275\u0275element(2, "path", 21);
    \u0275\u0275elementEnd()();
  }
}
function OrganigramaComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275element(1, "div", 23);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function OrganigramaComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "p");
    \u0275\u0275text(2, "No se encontraron resultados");
    \u0275\u0275elementEnd()();
  }
}
function OrganigramaComponent_div_23_ng_container_1_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r4.codigoOrganigrama);
  }
}
function OrganigramaComponent_div_23_ng_container_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", area_r4.expanded ? "\u2212" : "+", " ");
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(child_r6.codigoOrganigrama);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const child_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", child_r6.expanded ? "\u2212" : "+", " ");
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const grandchild_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(grandchild_r8.codigoOrganigrama);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const grandchild_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", grandchild_r8.expanded ? "\u2212" : "+", " ");
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_div_8_ng_container_3_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const greatgrandchild_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(greatgrandchild_r9.codigoOrganigrama);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_div_8_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 51);
    \u0275\u0275element(2, "div", 52);
    \u0275\u0275elementStart(3, "div", 53)(4, "h6");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_div_8_ng_container_3_p_6_Template, 2, 1, "p", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const greatgrandchild_r9 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(greatgrandchild_r9.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", greatgrandchild_r9.codigoOrganigrama);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "div", 49);
    \u0275\u0275elementStart(2, "div", 50);
    \u0275\u0275template(3, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_div_8_ng_container_3_Template, 7, 2, "ng-container", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const grandchild_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", grandchild_r8.subAreas)("ngForTrackBy", ctx_r1.trackByAreaId);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 44);
    \u0275\u0275element(2, "div", 45);
    \u0275\u0275elementStart(3, "div", 46);
    \u0275\u0275listener("click", function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_Template_div_click_3_listener() {
      const grandchild_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.toggleExpansion(grandchild_r8));
    });
    \u0275\u0275elementStart(4, "h5");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_p_6_Template, 2, 1, "p", 29)(7, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_span_7_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_div_8_Template, 4, 2, "div", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const grandchild_r8 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(grandchild_r8.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", grandchild_r8.codigoOrganigrama);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", grandchild_r8.subAreas && grandchild_r8.subAreas.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", grandchild_r8.expanded && grandchild_r8.subAreas && grandchild_r8.subAreas.length > 0);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementStart(2, "div", 43);
    \u0275\u0275template(3, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_ng_container_3_Template, 9, 4, "ng-container", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const child_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", child_r6.subAreas)("ngForTrackBy", ctx_r1.trackByAreaId);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 37);
    \u0275\u0275element(2, "div", 38);
    \u0275\u0275elementStart(3, "div", 39);
    \u0275\u0275listener("click", function OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_Template_div_click_3_listener() {
      const child_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleExpansion(child_r6));
    });
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_p_6_Template, 2, 1, "p", 29)(7, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_span_7_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_div_8_Template, 4, 2, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const child_r6 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(child_r6.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", child_r6.codigoOrganigrama);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", child_r6.subAreas && child_r6.subAreas.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", child_r6.expanded && child_r6.subAreas && child_r6.subAreas.length > 0);
  }
}
function OrganigramaComponent_div_23_ng_container_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "div", 35);
    \u0275\u0275elementStart(2, "div", 36);
    \u0275\u0275template(3, OrganigramaComponent_div_23_ng_container_1_div_7_ng_container_3_Template, 9, 4, "ng-container", 26);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const area_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", area_r4.subAreas)("ngForTrackBy", ctx_r1.trackByAreaId);
  }
}
function OrganigramaComponent_div_23_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 27)(2, "div", 28);
    \u0275\u0275listener("click", function OrganigramaComponent_div_23_ng_container_1_Template_div_click_2_listener() {
      const area_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleExpansion(area_r4));
    });
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, OrganigramaComponent_div_23_ng_container_1_p_5_Template, 2, 1, "p", 29)(6, OrganigramaComponent_div_23_ng_container_1_span_6_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, OrganigramaComponent_div_23_ng_container_1_div_7_Template, 4, 2, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const area_r4 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(area_r4.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", area_r4.codigoOrganigrama);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", area_r4.subAreas && area_r4.subAreas.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", area_r4.expanded && area_r4.subAreas && area_r4.subAreas.length > 0);
  }
}
function OrganigramaComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275template(1, OrganigramaComponent_div_23_ng_container_1_Template, 8, 4, "ng-container", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.organigramaFiltrado)("ngForTrackBy", ctx_r1.trackByAreaId);
  }
}
var OrganigramaComponent = class _OrganigramaComponent {
  constructor(organigramaService) {
    this.organigramaService = organigramaService;
    this.organigrama = [];
    this.organigramaFiltrado = [];
    this.areasPlanas = [];
    this.vistaJerarquica = true;
    this.terminoBusqueda = "";
    this.cargando = true;
    this.totalAreas = 0;
    this.noResultados = false;
    this.expandirTodos = false;
    this.stats = {
      nivel1: 0,
      nivel2: 0,
      nivel3: 0,
      nivel4: 0
    };
  }
  ngOnInit() {
    this.cargarDatos();
  }
  cargarDatos() {
    return __async(this, null, function* () {
      this.cargando = true;
      try {
        this.organigramaService.obtenerOrganigramaCompleto().subscribe({
          next: (organigramaData) => {
            const datos = organigramaData || [];
            const rectorado = datos.find((a) => a.codigoOrganigrama === "RECTORADO" || a.nombre.includes("RECTORADO"));
            const otros = datos.filter((a) => a.id !== rectorado?.id);
            this.organigrama = rectorado ? [rectorado, ...otros] : datos;
            this.organigramaFiltrado = [...this.organigrama];
            this.totalAreas = this.organigramaService.contarTotalAreas(this.organigrama);
            this.calcularEstadisticas();
            this.cargando = false;
          },
          error: (error) => {
            this.cargando = false;
          }
        });
        this.organigramaService.obtenerAreasPlanas().subscribe({
          next: (areasData) => {
            this.areasPlanas = areasData || [];
          },
          error: (error) => {
          }
        });
      } catch (error) {
        this.cargando = false;
      }
    });
  }
  toggleVista() {
    this.vistaJerarquica = !this.vistaJerarquica;
    this.filtrarAreas();
  }
  filtrarAreas() {
    if (!this.terminoBusqueda.trim()) {
      this.organigramaFiltrado = [...this.organigrama];
      this.noResultados = false;
      return;
    }
    if (this.vistaJerarquica) {
      this.organigramaFiltrado = this.organigramaService.buscarAreaEnOrganigrama(this.organigrama, this.terminoBusqueda);
    } else {
      this.organigramaFiltrado = this.areasPlanas.filter((area) => area.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || area.descripcion?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || area.codigoOrganigrama?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));
    }
    this.noResultados = this.organigramaFiltrado.length === 0;
  }
  toggleExpansion(area) {
    area.expanded = !area.expanded;
  }
  obtenerClaseNivel(nivel) {
    const clases = ["nivel-1", "nivel-2", "nivel-3", "nivel-4", "nivel-5"];
    return clases[nivel - 1] || "nivel-default";
  }
  obtenerIconoArea(area) {
    if (area.nombre.includes("Consejo"))
      return "fas fa-university";
    if (area.nombre.includes("Rectorado"))
      return "fas fa-crown";
    if (area.nombre.includes("Vicerrectorado"))
      return "fas fa-user-tie";
    if (area.nombre.includes("Facultad"))
      return "fas fa-graduation-cap";
    if (area.nombre.includes("Escuela"))
      return "fas fa-school";
    if (area.nombre.includes("Oficina"))
      return "fas fa-building";
    if (area.nombre.includes("Direcci\xF3n"))
      return "fas fa-sitemap";
    if (area.nombre.includes("Instituto"))
      return "fas fa-flask";
    if (area.nombre.includes("Secretar\xEDa"))
      return "fas fa-file-alt";
    return "fas fa-folder";
  }
  calcularEstadisticas() {
    this.stats = { nivel1: 0, nivel2: 0, nivel3: 0, nivel4: 0 };
    this.contarPorNivel(this.organigrama);
  }
  contarPorNivel(areas) {
    areas.forEach((area) => {
      switch (area.nivelJerarquico) {
        case 1:
          this.stats.nivel1++;
          break;
        case 2:
          this.stats.nivel2++;
          break;
        case 3:
          this.stats.nivel3++;
          break;
        case 4:
          this.stats.nivel4++;
          break;
      }
      if (area.subAreas?.length) {
        this.contarPorNivel(area.subAreas);
      }
    });
  }
  toggleExpandirTodos() {
    this.expandirTodos = !this.expandirTodos;
    this.aplicarExpansionRecursiva(this.organigramaFiltrado, this.expandirTodos);
  }
  aplicarExpansionRecursiva(areas, expandir) {
    areas.forEach((area) => {
      area.expanded = expandir;
      if (area.subAreas?.length) {
        this.aplicarExpansionRecursiva(area.subAreas, expandir);
      }
    });
  }
  limpiarBusqueda() {
    this.terminoBusqueda = "";
    this.filtrarAreas();
  }
  inicializarEstructura() {
    return __async(this, null, function* () {
      try {
        this.organigramaService.inicializarEstructura().subscribe({
          next: () => {
            this.cargarDatos();
          },
          error: (error) => {
          }
        });
      } catch (error) {
      }
    });
  }
  formatearUsuarios(cantidad) {
    if (cantidad === 0)
      return "Sin usuarios";
    if (cantidad === 1)
      return "1 usuario";
    return `${cantidad} usuarios`;
  }
  exportarEstructura() {
    const datos = {
      totalAreas: this.totalAreas,
      fechaExportacion: (/* @__PURE__ */ new Date()).toISOString(),
      estructura: this.organigrama,
      estadisticas: this.stats
    };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `organigrama_untumbes_${(/* @__PURE__ */ new Date()).getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
  trackByAreaId(_, area) {
    return area.id;
  }
  static {
    this.\u0275fac = function OrganigramaComponent_Factory(t) {
      return new (t || _OrganigramaComponent)(\u0275\u0275directiveInject(OrganigramaService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrganigramaComponent, selectors: [["app-organigrama"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 6, consts: [[1, "org-container"], [1, "header"], [1, "header-content"], [1, "header-text"], [1, "search-controls"], [1, "search-box"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "none", 1, "search-icon"], ["d", "M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["type", "text", "placeholder", "Buscar \xE1rea o dependencia...", 3, "ngModelChange", "input", "ngModel"], ["class", "clear-btn", 3, "click", 4, "ngIf"], [1, "expand-btn", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 18 18", "fill", "none"], ["x", "2", "y", "2", "width", "6", "height", "6", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "10", "y", "2", "width", "6", "height", "6", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "2", "y", "10", "width", "6", "height", "6", "stroke", "currentColor", "stroke-width", "1.5"], ["x", "10", "y", "10", "width", "6", "height", "6", "stroke", "currentColor", "stroke-width", "1.5"], ["class", "loading", 4, "ngIf"], ["class", "empty", 4, "ngIf"], ["class", "org-chart", 4, "ngIf"], [1, "clear-btn", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 16 16", "fill", "none"], ["d", "M12 4L4 12M4 4l8 8", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], [1, "loading"], [1, "spinner"], [1, "empty"], [1, "org-chart"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "org-level"], [1, "org-box", 3, "click"], ["class", "code", 4, "ngIf"], ["class", "toggle", 4, "ngIf"], ["class", "children", 4, "ngIf"], [1, "code"], [1, "toggle"], [1, "children"], [1, "connector-line"], [1, "children-row"], [1, "child-wrapper"], [1, "connector-v"], [1, "org-box", "child", 3, "click"], ["class", "grandchildren", 4, "ngIf"], [1, "grandchildren"], [1, "connector-line-sm"], [1, "grandchildren-row"], [1, "grandchild-wrapper"], [1, "connector-v-sm"], [1, "org-box", "grandchild", 3, "click"], ["class", "greatgrandchildren", 4, "ngIf"], [1, "greatgrandchildren"], [1, "connector-line-xs"], [1, "greatgrandchildren-row"], [1, "greatgrandchild-wrapper"], [1, "connector-v-xs"], [1, "org-box", "greatgrandchild"]], template: function OrganigramaComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1");
        \u0275\u0275text(5, "Organigrama Institucional");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Universidad Nacional de Tumbes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 4)(9, "div", 5);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(10, "svg", 6);
        \u0275\u0275element(11, "path", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function OrganigramaComponent_Template_input_ngModelChange_12_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.terminoBusqueda, $event) || (ctx.terminoBusqueda = $event);
          return $event;
        });
        \u0275\u0275listener("input", function OrganigramaComponent_Template_input_input_12_listener() {
          return ctx.filtrarAreas();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, OrganigramaComponent_button_13_Template, 3, 0, "button", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 10);
        \u0275\u0275listener("click", function OrganigramaComponent_Template_button_click_14_listener() {
          return ctx.toggleExpandirTodos();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(15, "svg", 11);
        \u0275\u0275element(16, "rect", 12)(17, "rect", 13)(18, "rect", 14)(19, "rect", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275text(20);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(21, OrganigramaComponent_div_21_Template, 4, 0, "div", 16)(22, OrganigramaComponent_div_22_Template, 3, 0, "div", 17)(23, OrganigramaComponent_div_23_Template, 2, 2, "div", 18);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.terminoBusqueda);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.terminoBusqueda);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1(" ", ctx.expandirTodos ? "Contraer todo" : "Expandir todo", " ");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.cargando);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cargando && ctx.noResultados);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.cargando && !ctx.noResultados);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.org-container[_ngcontent-%COMP%] {\n  padding: 30px 20px;\n  max-width: 1600px;\n  margin: 0 auto;\n  background: #f8f9fa;\n  min-height: 100vh;\n}\n.header[_ngcontent-%COMP%] {\n  background: white;\n  padding: 24px 32px;\n  margin-bottom: 32px;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 32px;\n  flex-wrap: wrap;\n}\n.header-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 4px 0;\n}\n.header-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #7f8c8d;\n  margin: 0;\n}\n.search-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 320px;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #95a5a6;\n  pointer-events: none;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 11px 44px 11px 44px;\n  border: 1.5px solid #e0e0e0;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  outline: none;\n  transition: all 0.2s;\n  background: #fafafa;\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #3498db;\n  background: white;\n  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);\n}\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #b0b0b0;\n}\n.clear-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: transparent;\n  color: #95a5a6;\n  border: none;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n}\n.clear-btn[_ngcontent-%COMP%]:hover {\n  background: #f0f0f0;\n  color: #7f8c8d;\n}\n.expand-btn[_ngcontent-%COMP%] {\n  padding: 10px 18px;\n  background: white;\n  border: 1.5px solid #e0e0e0;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  color: #555;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  white-space: nowrap;\n}\n.expand-btn[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n  border-color: #3498db;\n  color: #3498db;\n}\n.expand-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: currentColor;\n}\n.loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #ecf0f1;\n  border-top-color: #95a5a6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n  margin: 0 auto 16px;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 0.95rem;\n  margin: 0;\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #7f8c8d;\n}\n.empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n}\n.org-chart[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 50px;\n  align-items: center;\n}\n.org-level[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\n.org-box[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #34495e;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n  cursor: pointer;\n  position: relative;\n  transition: all 0.2s;\n  min-width: 220px;\n  max-width: 400px;\n}\n.org-box[_ngcontent-%COMP%]:hover {\n  border-color: #2c3e50;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.org-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .org-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .org-box[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], .org-box[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  margin: 0 0 6px 0;\n  color: #2c3e50;\n  font-weight: 600;\n  line-height: 1.3;\n}\n.org-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.org-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.org-box[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.org-box[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.org-box[_ngcontent-%COMP%]   .code[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: #7f8c8d;\n  font-weight: 500;\n}\n.org-box[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 6px;\n  right: 10px;\n  background: #ecf0f1;\n  color: #2c3e50;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: bold;\n  line-height: 1;\n}\n.connector-line[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 30px;\n  background: #95a5a6;\n  margin: 0 auto;\n}\n.connector-line-sm[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 24px;\n  background: #b2bec3;\n  margin: 0 auto;\n}\n.connector-line-xs[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 20px;\n  background: #cbd5e0;\n  margin: 0 auto;\n}\n.connector-v[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 20px;\n  background: #95a5a6;\n  margin: 0 auto;\n}\n.connector-v-sm[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 16px;\n  background: #b2bec3;\n  margin: 0 auto;\n}\n.connector-v-xs[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 12px;\n  background: #cbd5e0;\n  margin: 0 auto;\n}\n.children[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0;\n}\n.children-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 30px;\n  max-width: 1400px;\n  margin: 0 auto;\n  justify-items: center;\n}\n.child-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n}\n.org-box.child[_ngcontent-%COMP%] {\n  border-color: #3498db;\n  max-width: 320px;\n}\n.grandchildren[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0;\n}\n.grandchildren-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  max-width: 100%;\n  margin: 0 auto;\n}\n.grandchild-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.org-box.grandchild[_ngcontent-%COMP%] {\n  border-color: #2ecc71;\n  padding: 16px;\n  min-width: 180px;\n  max-width: 280px;\n}\n.greatgrandchildren[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 0;\n}\n.greatgrandchildren-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 16px;\n}\n.greatgrandchild-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.org-box.greatgrandchild[_ngcontent-%COMP%] {\n  border-color: #e67e22;\n  padding: 14px;\n  min-width: 160px;\n  max-width: 240px;\n  border-width: 1px;\n}\n@media (max-width: 768px) {\n  .org-container[_ngcontent-%COMP%] {\n    padding: 20px 12px;\n  }\n  .header[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 20px;\n    align-items: stretch;\n  }\n  .header-text[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .header-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.4rem;\n  }\n  .search-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .search-box[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n  .expand-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .org-box[_ngcontent-%COMP%] {\n    min-width: 180px;\n    max-width: 100%;\n    padding: 16px;\n  }\n  .org-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .org-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .org-box[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .org-box[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n  .children-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n  }\n  .grandchildren-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .greatgrandchildren-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .org-box.child[_ngcontent-%COMP%], .org-box.grandchild[_ngcontent-%COMP%], .org-box.greatgrandchild[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n@media (max-width: 480px) {\n  .org-container[_ngcontent-%COMP%] {\n    padding: 16px 10px;\n  }\n  .header[_ngcontent-%COMP%] {\n    padding: 16px 12px;\n  }\n  .header-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .header-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n    padding: 10px 40px 10px 40px;\n  }\n  .expand-btn[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n    padding: 9px 14px;\n  }\n  .org-box[_ngcontent-%COMP%] {\n    padding: 14px;\n    min-width: 160px;\n  }\n  .org-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .org-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .org-box[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n  .org-box[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=organigrama.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrganigramaComponent, { className: "OrganigramaComponent" });
})();
export {
  OrganigramaComponent
};
//# sourceMappingURL=chunk-PDBNPT2B.js.map
