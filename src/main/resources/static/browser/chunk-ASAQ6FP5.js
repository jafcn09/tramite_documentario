import {
  ReportesService
} from "./chunk-LXQLFYAL.js";
import {
  MisTramitesService
} from "./chunk-D6OJPHZD.js";
import {
  BandejaTramitesService
} from "./chunk-KT4AJKHL.js";
import "./chunk-NXAITARR.js";
import {
  AuthService,
  Router
} from "./chunk-HNI5KL6U.js";
import {
  FormsModule
} from "./chunk-T3F2XNQR.js";
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
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VDZBNFIH.js";

// src/app/administrativo/dashboard/dashboard.component.ts
function DashboardComponent_div_1_small_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (incluye ", ctx_r0.getTramitesVencidos(), " vencidos) ");
  }
}
function DashboardComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6);
    \u0275\u0275element(3, "i", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Pendientes de Revisi\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 5)(10, "div", 9);
    \u0275\u0275element(11, "i", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 8)(13, "h3");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16, "Por Procesar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 5)(18, "div", 11);
    \u0275\u0275element(19, "i", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 8)(21, "h3");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Procesados");
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, DashboardComponent_div_1_small_25_Template, 2, 1, "small", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 5)(27, "div", 14);
    \u0275\u0275element(28, "i", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 8)(30, "h3");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33, "Rechazados");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.stats.pendingTramites);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.stats.processingTramites);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.stats.completedTramites);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.getTramitesVencidos() > 0);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.stats.rejectedTramites);
  }
}
function DashboardComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6);
    \u0275\u0275element(3, "i", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "En Revisi\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 5)(10, "div", 9);
    \u0275\u0275element(11, "i", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 8)(13, "h3");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16, "En Proceso");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 5)(18, "div", 11);
    \u0275\u0275element(19, "i", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 8)(21, "h3");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Completados");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 5)(26, "div", 14);
    \u0275\u0275element(27, "i", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 8)(29, "h3");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p");
    \u0275\u0275text(32, "Observados");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.userStats.enRevision);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.userStats.enProceso);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.userStats.completedTramites);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.userStats.observedTramites);
  }
}
function DashboardComponent_div_3_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "div", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 34)(7, "span", 35);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 36);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 37);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 38);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 39)(16, "button", 40);
    \u0275\u0275listener("click", function DashboardComponent_div_3_div_7_Template_button_click_16_listener() {
      const tramite_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.reviewTramite(tramite_r4.id));
    });
    \u0275\u0275text(17, " Revisar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tramite_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r4.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r4.user);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4CB} ", tramite_r4.tipoTramite, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F3E2} ", tramite_r4.areaOrigen, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r4.tipoUsuario);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r4.date);
  }
}
function DashboardComponent_div_3_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 42);
    \u0275\u0275element(2, "i", 43);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 44);
    \u0275\u0275listener("click", function DashboardComponent_div_3_div_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.viewExpiredTramites());
    });
    \u0275\u0275text(6, " Ver Detalles ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r0.getTramitesVencidos(), " tr\xE1mites vencidos contabilizados como procesados");
  }
}
function DashboardComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "h3");
    \u0275\u0275text(4, "Tr\xE1mites Pendientes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 21)(6, "div", 22);
    \u0275\u0275template(7, DashboardComponent_div_3_div_7_Template, 18, 6, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, DashboardComponent_div_3_div_8_Template, 7, 1, "div", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 25)(10, "div", 20)(11, "h3");
    \u0275\u0275text(12, "Acciones R\xE1pidas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 21)(14, "div", 26)(15, "button", 27);
    \u0275\u0275listener("click", function DashboardComponent_div_3_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.generateReport());
    });
    \u0275\u0275element(16, "i", 28);
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "Generar Reporte");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "button", 27);
    \u0275\u0275listener("click", function DashboardComponent_div_3_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewAllTramites());
    });
    \u0275\u0275element(20, "i", 29);
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Ver Todos los Tr\xE1mites");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r0.pendingTramites);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.getTramitesVencidos() > 0);
  }
}
function DashboardComponent_div_4_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "div", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 52)(5, "span", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 38);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 54)(10, "div", 55);
    \u0275\u0275element(11, "div", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 57);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tramite_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tramite_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.getEstadoClase(tramite_r7.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tramite_r7.estado);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r7.date);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r0.getValidatedProgress(tramite_r7), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.getValidatedProgress(tramite_r7), "% avanzado");
  }
}
function DashboardComponent_div_4_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "div", 59);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 60)(4, "div", 61);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 62);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const status_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", status_r8.clase);
    \u0275\u0275advance();
    \u0275\u0275classMap(status_r8.icono);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(status_r8.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", status_r8.cantidad, " documentos");
  }
}
function DashboardComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "div", 20)(3, "h3");
    \u0275\u0275text(4, "Mis Tr\xE1mites");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 21)(6, "div", 22);
    \u0275\u0275template(7, DashboardComponent_div_4_div_7_Template, 14, 7, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 47)(9, "button", 48);
    \u0275\u0275listener("click", function DashboardComponent_div_4_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewAllMyTramites());
    });
    \u0275\u0275text(10, " Ver Todos Mis Tr\xE1mites ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "div", 49)(12, "div", 20)(13, "h3");
    \u0275\u0275text(14, "Estado de Documentos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 21)(16, "div", 50);
    \u0275\u0275template(17, DashboardComponent_div_4_div_17_Template, 8, 5, "div", 51);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r0.userTramites);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r0.documentStatus);
  }
}
var DashboardComponent = class _DashboardComponent {
  get userRole() {
    return this.currentUser?.role?.name || "";
  }
  get isAdministrativo() {
    return this.userRole === "administrativo";
  }
  get isUsuario() {
    return this.userRole === "usuario";
  }
  get isAdmin() {
    return this.userRole === "admin";
  }
  constructor(authService, bandejaTramitesService, misTramitesService, reportesService, router) {
    this.authService = authService;
    this.bandejaTramitesService = bandejaTramitesService;
    this.misTramitesService = misTramitesService;
    this.reportesService = reportesService;
    this.router = router;
    this.currentUser = null;
    this.stats = {
      pendingTramites: 0,
      processingTramites: 0,
      completedTramites: 0,
      rejectedTramites: 0
    };
    this.loading = true;
    this.allTramites = [];
    this.tramitePermisos = /* @__PURE__ */ new Map();
    this.userStats = {
      enRevision: 0,
      enProceso: 0,
      completedTramites: 0,
      observedTramites: 0
    };
    this.pendingTramites = [];
    this.userTramites = [];
    this.documentStatus = [];
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (this.isAdministrativo) {
      this.loadAllTramitesAndPermissions();
    } else if (this.isUsuario) {
      this.loadUserStats();
      this.loadUserTramites();
      this.loadDocumentStatus();
    }
  }
  loadAllTramitesAndPermissions() {
    this.loading = true;
    this.misTramitesService.getMisTramites(1, 1e3).subscribe({
      next: (response) => {
        this.allTramites = response.data || [];
        this.loadPermissionsForTramites();
      },
      error: (error) => {
        this.loading = false;
        this.loadBasicStats();
      }
    });
  }
  loadPermissionsForTramites() {
    const tramitePromises = this.allTramites.map((tramite) => this.bandejaTramitesService.verificarPermisosAcciones(tramite.id).toPromise().then((permisos) => {
      if (permisos) {
        this.tramitePermisos.set(tramite.id, permisos);
      }
      return permisos;
    }).catch((error) => {
      return null;
    }));
    Promise.all(tramitePromises).then(() => {
      this.calculateStatsWithExpiredTramites();
      this.loadPendingTramitesWithPermissions();
      this.loading = false;
    });
  }
  calculateStatsWithExpiredTramites() {
    const expiredCount = this.getTramitesVencidos();
    const baseStats = this.getBaseStatistics();
    this.stats = {
      pendingTramites: baseStats.pending,
      processingTramites: Math.max(0, baseStats.processing - expiredCount),
      completedTramites: baseStats.completed + expiredCount,
      rejectedTramites: baseStats.rejected
    };
  }
  getTramitesVencidos() {
    return this.allTramites.filter((tramite) => {
      const permisos = this.tramitePermisos.get(tramite.id);
      return permisos?.estaVencido || false;
    }).length;
  }
  getBaseStatistics() {
    const stats = {
      pending: 0,
      processing: 0,
      completed: 0,
      rejected: 0
    };
    this.allTramites.forEach((tramite) => {
      const estado = tramite.estado?.nombre || "";
      if (["En Revisi\xF3n", "Enviado"].includes(estado)) {
        stats.pending++;
      } else if (["En Proceso", "Aprobado", "Derivado"].includes(estado)) {
        stats.processing++;
      } else if (["Finalizado"].includes(estado)) {
        stats.completed++;
      } else if (["Rechazado", "Observado"].includes(estado)) {
        stats.rejected++;
      }
    });
    return stats;
  }
  loadBasicStats() {
    this.bandejaTramitesService.getEstadisticas().subscribe({
      next: (estadisticas) => {
        this.stats = {
          pendingTramites: estadisticas.pendientesRevision || 0,
          processingTramites: estadisticas.enProceso || 0,
          completedTramites: estadisticas.finalizadosHoy || 0,
          rejectedTramites: estadisticas.vencidos || 0
        };
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }
  loadUserStats() {
    if (!this.isUsuario)
      return;
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        if (tramites.length > 0) {
        }
        const estadosCount = {
          enRevision: 0,
          enProceso: 0,
          completados: 0,
          observados: 0
        };
        tramites.forEach((t) => {
          const estado = t.estado?.nombre || "";
          if (["En Revisi\xF3n", "Enviado"].includes(estado)) {
            estadosCount.enRevision++;
          }
          if (["En Proceso", "Aprobado", "Derivado"].includes(estado)) {
            estadosCount.enProceso++;
          }
          if (["Finalizado"].includes(estado)) {
            estadosCount.completados++;
          }
          if (["Observado", "Rechazado"].includes(estado)) {
            estadosCount.observados++;
          }
        });
        this.userStats = {
          enRevision: estadosCount.enRevision,
          enProceso: estadosCount.enProceso,
          completedTramites: estadosCount.completados,
          observedTramites: estadosCount.observados
        };
      },
      error: (error) => {
      }
    });
  }
  loadUserTramites() {
    if (!this.isUsuario)
      return;
    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        this.userTramites = tramites.slice(0, 3).map((tramite) => ({
          id: tramite.id,
          title: tramite.asunto || `${tramite.tipoTramite?.nombre}`,
          estado: tramite.estado?.nombre,
          date: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
          progreso: tramite.progreso
        }));
      },
      error: (error) => {
      }
    });
  }
  loadDocumentStatus() {
    if (!this.isUsuario)
      return;
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        const estadosConDocumentos = [];
        const aprobados = tramites.filter((t) => t.estado?.nombre === "Aprobado").length;
        if (aprobados > 0) {
          estadosConDocumentos.push({
            titulo: "Documentos Aprobados",
            cantidad: aprobados,
            icono: "fas fa-check-circle",
            clase: "status-approved"
          });
        }
        const enRevision = tramites.filter((t) => ["En Revisi\xF3n", "Enviado"].includes(t.estado?.nombre)).length;
        if (enRevision > 0) {
          estadosConDocumentos.push({
            titulo: "En Revisi\xF3n",
            cantidad: enRevision,
            icono: "fas fa-clock",
            clase: "status-review"
          });
        }
        const enProceso = tramites.filter((t) => ["En Proceso", "Derivado"].includes(t.estado?.nombre)).length;
        if (enProceso > 0) {
          estadosConDocumentos.push({
            titulo: "En Proceso",
            cantidad: enProceso,
            icono: "fas fa-spinner",
            clase: "status-processing"
          });
        }
        const observados = tramites.filter((t) => t.estado?.nombre === "Observado").length;
        if (observados > 0) {
          estadosConDocumentos.push({
            titulo: "Requieren Acci\xF3n",
            cantidad: observados,
            icono: "fas fa-exclamation-triangle",
            clase: "status-action"
          });
        }
        const rechazados = tramites.filter((t) => t.estado?.nombre === "Rechazado").length;
        if (rechazados > 0) {
          estadosConDocumentos.push({
            titulo: "Rechazados",
            cantidad: rechazados,
            icono: "fas fa-times-circle",
            clase: "status-rejected"
          });
        }
        const finalizados = tramites.filter((t) => t.estado?.nombre === "Finalizado").length;
        if (finalizados > 0) {
          estadosConDocumentos.push({
            titulo: "Finalizados",
            cantidad: finalizados,
            icono: "fas fa-flag-checkered",
            clase: "status-completed"
          });
        }
        this.documentStatus = estadosConDocumentos;
      },
      error: (error) => {
      }
    });
  }
  loadPendingTramitesWithPermissions() {
    const filteredTramites = this.allTramites.filter((tramite) => {
      const estado = tramite.estado?.nombre || tramite.estado || "";
      const isPendingState = ["En Revisi\xF3n", "Aprobado", "Derivado", "Enviado", "En Proceso"].includes(estado);
      const permisos = this.tramitePermisos.get(tramite.id);
      const isNotExpired = !permisos?.estaVencido;
      return isPendingState && isNotExpired;
    });
    this.pendingTramites = filteredTramites.slice(0, 3).map((tramite) => ({
      id: tramite.id,
      title: tramite.asunto || tramite.titulo || `${tramite.tipoTramite?.nombre || "Tr\xE1mite"}`,
      user: tramite.usuarioSolicitante ? `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` : "Usuario no identificado",
      date: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
      codigo: tramite.codigo,
      tipoTramite: tramite.tipoTramite?.nombre || tramite.tipo || "No especificado",
      areaOrigen: tramite.areaOrigen?.nombre || tramite.areaDestino?.nombre || "\xC1rea general",
      tipoUsuario: this.determinarTipoUsuario(tramite),
      isExpired: false
    }));
  }
  loadPendingTramites() {
    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        this.pendingTramites = response.data.filter((tramite) => ["En Revisi\xF3n", "Aprobado", "Derivado", "Enviado"].includes(tramite.estado.nombre)).slice(0, 3).map((tramite) => ({
          id: tramite.id,
          title: tramite.asunto || `${tramite.tipoTramite.nombre}`,
          user: tramite.trabajadorAsignado ? `${tramite.trabajadorAsignado.nombre} ${tramite.trabajadorAsignado.apellidos}` : "Sin asignar",
          date: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
          codigo: tramite.codigo
        }));
      },
      error: (error) => {
      }
    });
  }
  formatTimeAgo(fecha) {
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - new Date(fecha).getTime();
    const diffMins = Math.floor(diffMs / (1e3 * 60));
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    if (diffMins < 1)
      return "Ahora mismo";
    if (diffMins < 60)
      return `${diffMins} minutos`;
    if (diffHours < 24)
      return `${diffHours} horas`;
    return `${Math.floor(diffHours / 24)} d\xEDas`;
  }
  reviewTramite(id) {
    this.router.navigate(["/administrativo/mis-tramites"]);
  }
  generateReport() {
    this.router.navigate(["/administrativo/reportes"]);
  }
  viewAllTramites() {
    this.router.navigate(["/administrativo/mis-tramites"]);
  }
  viewExpiredTramites() {
    this.router.navigate(["/administrativo/mis-tramites"], {
      queryParams: { showExpired: true }
    });
  }
  manageTemplates() {
  }
  viewAllMyTramites() {
    const userRole = this.userRole;
    if (userRole === "usuario") {
      window.location.href = "/usuario/mis-tramites";
    } else if (userRole === "administrativo") {
      window.location.href = "/administrativo/mis-tramites";
    }
  }
  getEstadoClase(estado) {
    const clases = {
      "En Proceso": "estado-proceso",
      "Completado": "estado-completado",
      "Observado": "estado-observado",
      "Rechazado": "estado-rechazado",
      "Aprobado": "estado-aprobado"
    };
    return clases[estado] || "estado-default";
  }
  determinarTipoUsuario(tramite) {
    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase().includes("estudiante")) {
      return "\u{1F468}\u200D\u{1F393} Estudiante";
    }
    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase() === "usuario") {
      return "\u{1F464} Usuario";
    }
    if (tramite.usuarioSolicitante?.rol && tramite.usuarioSolicitante.rol.toLowerCase().includes("administrativo")) {
      return "\u{1F454} Administrativo";
    }
    if (tramite.usuarioSolicitante?.correo) {
      const email = tramite.usuarioSolicitante.correo.toLowerCase();
      if (email.includes("student") || email.includes("estudiante") || email.includes("@univ") || email.includes("@edu")) {
        return "\u{1F468}\u200D\u{1F393} Estudiante";
      }
    }
    return "\u{1F464} Usuario";
  }
  getValidatedProgress(tramite) {
    if (!tramite || tramite.progreso === void 0 || tramite.progreso === null)
      return 0;
    const progreso = tramite.progreso;
    if (isNaN(progreso)) {
      return 0;
    }
    return Math.max(0, Math.min(100, progreso));
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(BandejaTramitesService), \u0275\u0275directiveInject(MisTramitesService), \u0275\u0275directiveInject(ReportesService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-administrativo-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 4, consts: [[1, "dashboard-container"], ["class", "stats-grid", 4, "ngIf"], ["class", "content-grid", 4, "ngIf"], ["class", "content-grid usuario-content", 4, "ngIf"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-icon", "pending"], [1, "fas", "fa-clock"], [1, "stat-content"], [1, "stat-icon", "processing"], [1, "fas", "fa-spinner"], [1, "stat-icon", "completed"], [1, "fas", "fa-check-circle"], ["class", "expired-note", 4, "ngIf"], [1, "stat-icon", "rejected"], [1, "fas", "fa-times-circle"], [1, "expired-note"], [1, "fas", "fa-exclamation-circle"], [1, "content-grid"], [1, "card", "pending-tramites"], [1, "card-header"], [1, "card-content"], [1, "tramites-list"], ["class", "tramite-item", 4, "ngFor", "ngForOf"], ["class", "expired-summary", 4, "ngIf"], [1, "card", "quick-actions"], [1, "actions-list"], [1, "action-item", 3, "click"], [1, "fas", "fa-chart-bar"], [1, "fas", "fa-file-alt"], [1, "tramite-item"], [1, "tramite-info"], [1, "tramite-title"], [1, "tramite-user"], [1, "tramite-metadata"], [1, "tramite-tipo"], [1, "tramite-area"], [1, "tramite-usuario-tipo"], [1, "tramite-date"], [1, "tramite-actions"], [1, "btn", "btn-sm", "btn-primary", 3, "click"], [1, "expired-summary"], [1, "expired-info"], [1, "fas", "fa-exclamation-triangle"], [1, "btn", "btn-sm", "btn-outline", 3, "click"], [1, "content-grid", "usuario-content"], [1, "card", "my-tramites"], [1, "card-footer"], [1, "btn", "btn-primary", 3, "click"], [1, "card", "status-summary"], [1, "status-list"], ["class", "status-item", 4, "ngFor", "ngForOf"], [1, "tramite-estado"], [1, "estado-badge", 3, "ngClass"], [1, "tramite-progress"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-text"], [1, "status-item"], [1, "status-icon", 3, "ngClass"], [1, "status-info"], [1, "status-title"], [1, "status-count"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, DashboardComponent_div_1_Template, 34, 5, "div", 1)(2, DashboardComponent_div_2_Template, 33, 4, "div", 1)(3, DashboardComponent_div_3_Template, 23, 2, "div", 2)(4, DashboardComponent_div_4_Template, 18, 2, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isAdministrativo);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isUsuario);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isAdministrativo);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isUsuario);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0 20px;\n  margin: 0;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 25px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  color: white;\n}\n.stat-icon.pending[_ngcontent-%COMP%] {\n  background: #f39c12;\n}\n.stat-icon.processing[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.stat-icon.completed[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.stat-icon.rejected[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.stat-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  margin: 0;\n  color: #2c3e50;\n}\n.stat-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #7f8c8d;\n  margin: 4px 0 0 0;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 20px;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 20px 25px;\n  border-bottom: 1px solid #f1f2f6;\n  background: #fafbfc;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.tramites-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.tramite-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 15px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border-left: 4px solid #f39c12;\n}\n.tramite-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 4px;\n}\n.tramite-user[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #7f8c8d;\n  margin-bottom: 2px;\n}\n.tramite-date[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #95a5a6;\n}\n.tramite-metadata[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin: 8px 0;\n}\n.tramite-tipo[_ngcontent-%COMP%], .tramite-area[_ngcontent-%COMP%], .tramite-usuario-tipo[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 6px;\n  border-radius: 4px;\n  background: #f1f2f6;\n  color: #2c3e50;\n  display: inline-block;\n  max-width: fit-content;\n}\n.tramite-tipo[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.tramite-area[_ngcontent-%COMP%] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n}\n.tramite-usuario-tipo[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: none;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #3498db;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #2980b9;\n}\n.actions-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.action-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 15px;\n  background: #f8f9fa;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.action-item[_ngcontent-%COMP%]:hover {\n  background: #e74c3c;\n  color: white;\n}\n.action-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #e74c3c;\n  transition: color 0.3s ease;\n}\n.action-item[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  color: white;\n}\n.usuario-content[_ngcontent-%COMP%] {\n  grid-template-columns: 1.5fr 1fr;\n  gap: 25px;\n}\n.tramite-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 10px;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: #f1f2f6;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #27ae60,\n      #2ecc71);\n  transition: width 0.3s ease;\n}\n.progress-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #334155;\n  min-width: 35px;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.estado-proceso[_ngcontent-%COMP%] {\n  background: #3498db;\n  color: white;\n}\n.estado-completado[_ngcontent-%COMP%] {\n  background: #27ae60;\n  color: white;\n}\n.estado-observado[_ngcontent-%COMP%] {\n  background: #f39c12;\n  color: white;\n}\n.estado-rechazado[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: white;\n}\n.estado-aprobado[_ngcontent-%COMP%] {\n  background: #27ae60;\n  color: white;\n}\n.card-footer[_ngcontent-%COMP%] {\n  padding: 15px 25px;\n  border-top: 1px solid #f1f2f6;\n  background: #fafbfc;\n  text-align: center;\n}\n.status-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.status-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  padding: 12px;\n  background: #f8f9fa;\n  border-radius: 8px;\n}\n.status-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 16px;\n}\n.status-approved[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.status-review[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.status-action[_ngcontent-%COMP%] {\n  background: #f39c12;\n}\n.status-processing[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.status-completed[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.status-rejected[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.status-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 2px;\n}\n.status-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n.expired-note[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #f39c12;\n  margin-top: 2px;\n  font-weight: 500;\n}\n.expired-summary[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 15px;\n  background: #fff3cd;\n  border: 1px solid #ffeaa7;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.expired-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #856404;\n}\n.expired-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #f39c12;\n  font-size: 16px;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #f39c12;\n  color: #f39c12;\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  background: #f39c12;\n  color: white;\n}\n@media (max-width: 768px) {\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .usuario-content[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .expired-summary[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent" });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-ASAQ6FP5.js.map
