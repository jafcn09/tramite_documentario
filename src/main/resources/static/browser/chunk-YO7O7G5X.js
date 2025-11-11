import {
  MisTramitesService
} from "./chunk-OIH2ELY7.js";
import "./chunk-OF2WYGMW.js";
import {
  AuthService,
  Router,
  RouterModule
} from "./chunk-T5HD73DN.js";
import {
  CommonModule,
  HttpClient,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HL73AAZ4.js";

// src/app/estudiante/dashboard/student-dashboard-layout.component.ts
var _c0 = ["*"];
var StudentDashboardLayoutComponent = class _StudentDashboardLayoutComponent {
  constructor(router) {
    this.router = router;
  }
  ngOnInit() {
  }
  navigateToNewTramite() {
    this.router.navigate(["/estudiante/nuevo-tramite"]);
  }
  navigateToMisTramites() {
    this.router.navigate(["/estudiante/mis-tramites"]);
  }
  navigateToNotificaciones() {
    this.router.navigate(["/estudiante/notificaciones"]);
  }
  navigateToSearch() {
    this.router.navigate(["/buscar"]);
  }
  static {
    this.\u0275fac = function StudentDashboardLayoutComponent_Factory(t) {
      return new (t || _StudentDashboardLayoutComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StudentDashboardLayoutComponent, selectors: [["app-student-dashboard-layout"]], standalone: true, features: [\u0275\u0275StandaloneFeature], ngContentSelectors: _c0, decls: 25, vars: 0, consts: [[1, "dashboard-layout"], [1, "quick-actions-section"], [1, "section-header"], [1, "actions-grid"], [1, "action-card", 3, "click"], [1, "action-icon", "new-tramite"], [1, "fas", "fa-plus"], [1, "action-content"], [1, "action-icon", "mis-tramites"], [1, "fas", "fa-folder-open"]], template: function StudentDashboardLayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "h2");
        \u0275\u0275text(4, "Acciones R\xE1pidas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "\xBFQu\xE9 necesitas hacer hoy?");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 3)(8, "button", 4);
        \u0275\u0275listener("click", function StudentDashboardLayoutComponent_Template_button_click_8_listener() {
          return ctx.navigateToNewTramite();
        });
        \u0275\u0275elementStart(9, "div", 5);
        \u0275\u0275element(10, "i", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 7)(12, "h3");
        \u0275\u0275text(13, "Nueva Solicitud");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p");
        \u0275\u0275text(15, "Crear un nuevo tr\xE1mite");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "button", 4);
        \u0275\u0275listener("click", function StudentDashboardLayoutComponent_Template_button_click_16_listener() {
          return ctx.navigateToMisTramites();
        });
        \u0275\u0275elementStart(17, "div", 8);
        \u0275\u0275element(18, "i", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 7)(20, "h3");
        \u0275\u0275text(21, "Mis Tr\xE1mites");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "p");
        \u0275\u0275text(23, "Ver estado y seguimiento");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275projection(24);
        \u0275\u0275elementEnd();
      }
    }, dependencies: [CommonModule], styles: ["\n\n.dashboard-layout[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0;\n  padding: 2rem 2rem;\n}\n.quick-actions-section[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #6b7280;\n  margin: 0;\n}\n.actions-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}\n.action-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-align: left;\n}\n.action-card[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  transform: translateY(-1px);\n}\n.action-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  color: white;\n  flex-shrink: 0;\n}\n.action-icon.new-tramite[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981,\n      #059669);\n}\n.action-icon.mis-tramites[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6,\n      #2563eb);\n}\n.action-icon.notifications[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f59e0b,\n      #d97706);\n}\n.action-icon.search[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #8b5cf6,\n      #7c3aed);\n}\n.action-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 0.25rem 0;\n}\n.action-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .dashboard-layout[_ngcontent-%COMP%] {\n    padding: 1.5rem 1rem;\n  }\n  .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .action-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .action-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 18px;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-layout[_ngcontent-%COMP%] {\n    padding: 1rem 0.75rem;\n  }\n  .section-header[_ngcontent-%COMP%] {\n    margin-bottom: 1.5rem;\n  }\n  .quick-actions-section[_ngcontent-%COMP%] {\n    margin-bottom: 2rem;\n  }\n}\n/*# sourceMappingURL=student-dashboard-layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StudentDashboardLayoutComponent, { className: "StudentDashboardLayoutComponent" });
})();

// src/app/estudiante/dashboard/dashboard.component.ts
function EstudianteDashboardComponent_div_41_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22)(2, "div", 23)(3, "span", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 27)(10, "span");
    \u0275\u0275element(11, "i", 28);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275element(14, "i", 29);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 30)(17, "div", 31);
    \u0275\u0275element(18, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 33);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tramite_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(tramite_r1.codigo);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoClass(tramite_r1.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r1.estado, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r1.titulo);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", tramite_r1.fecha, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", tramite_r1.tipo, "");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r1.getValidatedProgress(tramite_r1), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getValidatedProgress(tramite_r1), "%");
  }
}
function EstudianteDashboardComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275template(1, EstudianteDashboardComponent_div_41_div_1_Template, 21, 10, "div", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.myRecentTramites);
  }
}
function EstudianteDashboardComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "i", 35);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No tienes tr\xE1mites recientes");
    \u0275\u0275elementEnd()();
  }
}
var EstudianteDashboardComponent = class _EstudianteDashboardComponent {
  constructor(authService, misTramitesService, http, router) {
    this.authService = authService;
    this.misTramitesService = misTramitesService;
    this.http = http;
    this.router = router;
    this.currentUser = null;
    this.stats = {
      enviados: 0,
      enProceso: 0,
      completados: 0,
      esteMes: 0
    };
    this.recentActivities = [];
    this.myRecentTramites = [];
    this.loadingActivities = false;
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.loadStudentStats();
    this.loadRecentActivities();
    this.loadMyRecentTramites();
  }
  loadStudentStats() {
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        const now = /* @__PURE__ */ new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const estadosCount = {
          enviados: tramites.length,
          enProceso: 0,
          completados: 0,
          esteMes: 0
        };
        tramites.forEach((t) => {
          const estado = t.estado?.nombre || "";
          const fechaCreacion = new Date(t.fechaCreacion);
          const estaVencido = t.estaVencido || false;
          if (fechaCreacion.getMonth() === currentMonth && fechaCreacion.getFullYear() === currentYear) {
            estadosCount.esteMes++;
          }
          if (estaVencido) {
            estadosCount.completados++;
          } else if (["En Revisi\xF3n", "Enviado", "En Proceso", "Aprobado", "Derivado"].includes(estado)) {
            estadosCount.enProceso++;
          } else if (["Finalizado", "Archivado"].includes(estado)) {
            estadosCount.completados++;
          }
        });
        this.stats = estadosCount;
      },
      error: (error) => {
      }
    });
  }
  loadRecentActivities() {
    this.loadingActivities = true;
    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        this.recentActivities = tramites.map((tramite) => {
          let icon = "fas fa-file-alt";
          let type = "tramite";
          let status = "pending";
          const estaVencido = tramite.estaVencido || false;
          if (estaVencido) {
            icon = "fas fa-check-circle";
            status = "completed";
          } else {
            const estadoNombre = tramite.estado?.nombre || "";
            if (estadoNombre === "Finalizado") {
              icon = "fas fa-check-circle";
              status = "completed";
            } else if (estadoNombre === "Observado" || estadoNombre === "Rechazado") {
              icon = "fas fa-exclamation-triangle";
              status = "rejected";
            } else if (estadoNombre === "En Proceso" || estadoNombre === "Aprobado") {
              icon = "fas fa-spinner";
              status = "pending";
            }
          }
          return {
            type,
            icon,
            description: `Tr\xE1mite ${tramite.codigo}: ${tramite.asunto || tramite.tipoTramite?.nombre}`,
            time: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
            status
          };
        });
        this.loadingActivities = false;
      },
      error: (error) => {
        this.loadingActivities = false;
      }
    });
  }
  loadMyRecentTramites() {
    this.misTramitesService.getMisTramites(1, 5).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        this.myRecentTramites = tramites.map((tramite) => {
          const estaVencido = tramite.estaVencido || false;
          return {
            id: tramite.id,
            codigo: tramite.codigo,
            titulo: tramite.asunto || `${tramite.tipoTramite?.nombre}`,
            estado: estaVencido ? "Finalizado" : tramite.estado?.nombre || "Sin estado",
            fecha: this.formatDate(tramite.fechaCreacion),
            tipo: tramite.tipoTramite?.nombre || "Sin tipo",
            progreso: tramite.progreso
          };
        });
      },
      error: (error) => {
      }
    });
  }
  getStatusLabel(status) {
    const labels = {
      "completed": "COMPLETADO",
      "pending": "EN PROCESO",
      "rejected": "OBSERVADO"
    };
    return labels[status] || status.toUpperCase();
  }
  getEstadoClass(estado) {
    const clases = {
      "En Revisi\xF3n": "en-revision",
      "En Proceso": "en-proceso",
      "Finalizado": "finalizado",
      "Observado": "observado",
      "Rechazado": "observado",
      "Aprobado": "en-proceso",
      "Enviado": "en-revision"
    };
    return clases[estado] || "";
  }
  formatTimeAgo(dateStr) {
    if (!dateStr)
      return "Fecha desconocida";
    const now = /* @__PURE__ */ new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1e3 * 60));
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    if (diffMs < 0)
      return "Ahora mismo";
    if (diffMins < 1)
      return "Ahora mismo";
    if (diffMins < 60)
      return `Hace ${diffMins} minuto${diffMins > 1 ? "s" : ""}`;
    if (diffHours < 24)
      return `Hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
    if (diffDays < 7)
      return `Hace ${diffDays} d\xEDa${diffDays > 1 ? "s" : ""}`;
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  formatDate(dateStr) {
    if (!dateStr)
      return "Sin fecha";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  createNewTramite() {
    this.router.navigate(["/estudiante/nuevo-tramite"]);
  }
  viewMyTramites() {
    this.router.navigate(["/estudiante/mis-tramites"]);
  }
  viewNotifications() {
    this.router.navigate(["/estudiante/notificaciones"]);
  }
  consultarEstado() {
    this.router.navigate(["/estudiante/mis-tramites"]);
  }
  getValidatedProgress(tramite) {
    if (!tramite)
      return 0;
    const progreso = tramite.progreso;
    if (progreso === void 0 || progreso === null || isNaN(progreso)) {
      return 0;
    }
    return Math.max(0, Math.min(100, progreso));
  }
  static {
    this.\u0275fac = function EstudianteDashboardComponent_Factory(t) {
      return new (t || _EstudianteDashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MisTramitesService), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EstudianteDashboardComponent, selectors: [["app-estudiante-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 43, vars: 5, consts: [[1, "dashboard-container"], [1, "stats-section"], [1, "section-header"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-icon", "processing"], [1, "fas", "fa-clock"], [1, "stat-content"], [1, "stat-icon", "completed"], [1, "fas", "fa-check-circle"], [1, "stat-icon", "month"], [1, "fas", "fa-calendar-alt"], [1, "card", "my-recent-tramites"], [1, "card-header"], [1, "fas", "fa-file-alt"], [1, "btn-link", 3, "click"], [1, "card-content"], ["class", "tramites-list", 4, "ngIf"], ["class", "empty-tramites", 4, "ngIf"], [1, "tramites-list"], ["class", "tramite-item", 4, "ngFor", "ngForOf"], [1, "tramite-item"], [1, "tramite-info"], [1, "tramite-header"], [1, "tramite-codigo"], [1, "estado-badge"], [1, "tramite-title"], [1, "tramite-meta"], [1, "fas", "fa-calendar"], [1, "fas", "fa-layer-group"], [1, "tramite-progress"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-text"], [1, "empty-tramites"], [1, "fas", "fa-inbox"]], template: function EstudianteDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "app-student-dashboard-layout")(2, "section", 1)(3, "div", 2)(4, "h2");
        \u0275\u0275text(5, "Resumen de Actividad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Estado actual de tus tr\xE1mites");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 3)(9, "div", 4)(10, "div", 5);
        \u0275\u0275element(11, "i", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 7)(13, "h3");
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "p");
        \u0275\u0275text(16, "En Proceso");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "div", 4)(18, "div", 8);
        \u0275\u0275element(19, "i", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 7)(21, "h3");
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "p");
        \u0275\u0275text(24, "Completados");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "div", 4)(26, "div", 10);
        \u0275\u0275element(27, "i", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 7)(29, "h3");
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "p");
        \u0275\u0275text(32, "Este Mes");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(33, "div", 12)(34, "div", 13)(35, "h3");
        \u0275\u0275element(36, "i", 14);
        \u0275\u0275text(37, " Mis \xDAltimos Tr\xE1mites");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "button", 15);
        \u0275\u0275listener("click", function EstudianteDashboardComponent_Template_button_click_38_listener() {
          return ctx.viewMyTramites();
        });
        \u0275\u0275text(39, "Ver todos \u2192");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 16);
        \u0275\u0275template(41, EstudianteDashboardComponent_div_41_Template, 2, 1, "div", 17)(42, EstudianteDashboardComponent_div_42_Template, 4, 0, "div", 18);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(14);
        \u0275\u0275textInterpolate(ctx.stats.enProceso);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.completados);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.esteMes);
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.myRecentTramites.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.myRecentTramites.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule, StudentDashboardLayoutComponent], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 0;\n  height: 100%;\n  overflow-y: auto;\n  background: #f8f9fc;\n}\n.welcome-banner[_ngcontent-%COMP%] {\n  display: none;\n}\n.welcome-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  margin: 0 0 8px 0;\n}\n.welcome-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  opacity: 0.9;\n  margin: 0;\n}\n.welcome-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 60px;\n  opacity: 0.2;\n}\n.stats-section[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n  padding: 0 2rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n  margin: 0;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  width: 100%;\n  margin: 0;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  border-color: rgba(102, 126, 234, 0.2);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  color: white;\n}\n.stat-icon.sent[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea,\n      #764ba2);\n}\n.stat-icon.processing[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f093fb,\n      #f5576c);\n}\n.stat-icon.completed[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe,\n      #00f2fe);\n}\n.stat-icon.month[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #43e97b,\n      #38f9d7);\n}\n.stat-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  margin: 0;\n  color: #2c3e50;\n}\n.stat-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #7f8c8d;\n  margin: 4px 0 0 0;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 1.5rem;\n  margin: 0 0 2rem 0;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  border-color: rgba(102, 126, 234, 0.2);\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 20px 25px;\n  border-bottom: 1px solid #f1f2f6;\n  background:\n    linear-gradient(\n      to right,\n      #fafbfc,\n      #ffffff);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #2c3e50;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #667eea;\n  font-size: 14px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: color 0.3s ease;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: #5a67d8;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.activity-list-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.activity-list[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e0 #f7fafc;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f7fafc;\n  border-radius: 3px;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e0;\n  border-radius: 3px;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 15px;\n  margin-bottom: 15px;\n}\n.activity-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.activity-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  color: white;\n  flex-shrink: 0;\n}\n.activity-icon.tramite[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea,\n      #764ba2);\n}\n.activity-icon.notification[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f093fb,\n      #f5576c);\n}\n.activity-icon.system[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe,\n      #00f2fe);\n}\n.activity-icon.empty[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #a0aec0;\n}\n.activity-icon.loading[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #999;\n}\n.activity-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  color: #2c3e50;\n  line-height: 1.4;\n}\n.activity-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 4px;\n}\n.activity-status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.activity-status.status-completed[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.activity-status.status-pending[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.activity-status.status-rejected[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n.actions-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 15px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa,\n      #ffffff);\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea,\n      #764ba2);\n  border-color: #667eea;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);\n}\n.action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #667eea;\n  transition: color 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  color: white;\n}\n.action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #2c3e50;\n  transition: color 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  color: white;\n}\n.my-recent-tramites[_ngcontent-%COMP%] {\n  margin: 0 0 2rem 0;\n  width: 100%;\n  padding: 0 2rem;\n}\n.tramites-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.tramite-item[_ngcontent-%COMP%] {\n  padding: 20px;\n  background:\n    linear-gradient(\n      to right,\n      #f8f9fa,\n      #ffffff);\n  border-radius: 12px;\n  border-left: 4px solid #667eea;\n  transition: all 0.3s ease;\n}\n.tramite-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.15);\n}\n.tramite-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.tramite-codigo[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #667eea;\n  background: rgba(102, 126, 234, 0.1);\n  padding: 4px 10px;\n  border-radius: 6px;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.estado-badge.en-revision[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fff3cd,\n      #ffeaa7);\n  color: #856404;\n}\n.estado-badge.en-proceso[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #cfe2ff,\n      #a6c5ff);\n  color: #004085;\n}\n.estado-badge.finalizado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d4edda,\n      #b2dfb2);\n  color: #155724;\n}\n.estado-badge.observado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8d7da,\n      #f5b7b1);\n  color: #721c24;\n}\n.tramite-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 10px;\n  font-size: 15px;\n}\n.tramite-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  font-size: 12px;\n  color: #7f8c8d;\n  margin-bottom: 12px;\n}\n.tramite-meta[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 5px;\n  color: #a0aec0;\n}\n.tramite-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 12px;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: #e2e8f0;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #667eea,\n      #764ba2);\n  transition: width 0.3s ease;\n}\n.progress-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: #667eea;\n  min-width: 40px;\n  text-align: right;\n}\n.empty-tramites[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #a0aec0;\n}\n.empty-tramites[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 15px;\n  opacity: 0.5;\n}\n.empty-tramites[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 20px 0;\n  font-size: 16px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea,\n      #764ba2);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);\n}\n.info-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  margin-top: 30px;\n}\n.info-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9fa,\n      #ffffff);\n  border-radius: 12px;\n  padding: 25px;\n  text-align: center;\n  border: 2px solid #f1f2f6;\n  transition: all 0.3s ease;\n}\n.info-card[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  transform: translateY(-4px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);\n}\n.info-card[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: #667eea;\n  margin-bottom: 15px;\n}\n.info-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 10px 0;\n}\n.info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #7f8c8d;\n  margin: 0;\n  line-height: 1.6;\n}\n.empty-state[_ngcontent-%COMP%]   .activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n  font-style: italic;\n}\n.loading-item[_ngcontent-%COMP%]   .activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    background: #f8f9fc;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n    margin: 1rem;\n    margin-bottom: 1.5rem;\n  }\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n    margin: 0 1rem 1.5rem 1rem;\n  }\n  .my-recent-tramites[_ngcontent-%COMP%] {\n    margin: 0 1rem 1.5rem 1rem;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 0.75rem;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    padding: 1rem;\n    font-size: 0.9rem;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 0.75rem;\n  }\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    font-size: 20px;\n  }\n  .stat-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n    margin: 0.75rem;\n    margin-bottom: 1rem;\n  }\n  .content-grid[_ngcontent-%COMP%] {\n    margin: 0 0.75rem 1rem 0.75rem;\n  }\n  .my-recent-tramites[_ngcontent-%COMP%] {\n    margin: 0 0.75rem 1rem 0.75rem;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    flex-direction: row;\n    justify-content: flex-start;\n    gap: 1rem;\n    padding: 1rem;\n    text-align: left;\n  }\n  .action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 1rem;\n  }\n  .stat-icon[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n    font-size: 18px;\n  }\n  .stat-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .stat-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 1rem 1.25rem;\n  }\n  .card-content[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n  }\n  .tramite-item[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EstudianteDashboardComponent, { className: "EstudianteDashboardComponent" });
})();
export {
  EstudianteDashboardComponent
};
//# sourceMappingURL=chunk-YO7O7G5X.js.map
