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
  NgForOf,
  NgIf,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HL73AAZ4.js";

// src/app/usuario/dashboard/dashboard.component.ts
function UsuarioDashboardComponent_div_42_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const activity_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("status-completed", activity_r1.status === "completed")("status-pending", activity_r1.status === "pending")("status-rejected", activity_r1.status === "rejected");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getStatusLabel(activity_r1.status));
  }
}
function UsuarioDashboardComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 33)(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 34);
    \u0275\u0275template(7, UsuarioDashboardComponent_div_42_span_7_Template, 2, 7, "span", 35);
    \u0275\u0275elementStart(8, "span", 36);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const activity_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(activity_r1.type);
    \u0275\u0275advance();
    \u0275\u0275classMap(activity_r1.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(activity_r1.description);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", activity_r1.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r1.time);
  }
}
function UsuarioDashboardComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39);
    \u0275\u0275element(2, "i", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 33)(4, "p");
    \u0275\u0275text(5, "No hay actividades recientes");
    \u0275\u0275elementEnd()()();
  }
}
function UsuarioDashboardComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 42);
    \u0275\u0275element(2, "i", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 33)(4, "p");
    \u0275\u0275text(5, "Cargando actividades...");
    \u0275\u0275elementEnd()()();
  }
}
function UsuarioDashboardComponent_div_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45)(2, "div", 46)(3, "span", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 48);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 49);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 50)(10, "span");
    \u0275\u0275element(11, "i", 51);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275element(14, "i", 52);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 53)(17, "div", 54);
    \u0275\u0275element(18, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 56);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const tramite_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(tramite_r3.codigo);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getEstadoClass(tramite_r3.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tramite_r3.estado, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r3.titulo);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", tramite_r3.fecha, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", tramite_r3.tipo, "");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r1.getValidatedProgress(tramite_r3), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getValidatedProgress(tramite_r3), "%");
  }
}
var UsuarioDashboardComponent = class _UsuarioDashboardComponent {
  constructor(authService, misTramitesService, router) {
    this.authService = authService;
    this.misTramitesService = misTramitesService;
    this.router = router;
    this.currentUser = null;
    this.stats = {
      enRevision: 0,
      enProceso: 0,
      completados: 0,
      totalTramites: 0
    };
    this.recentActivities = [];
    this.myRecentTramites = [];
    this.loadingActivities = false;
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.loadUserStats();
    this.loadRecentActivities();
    this.loadMyRecentTramites();
  }
  loadUserStats() {
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        const estadosCount = {
          enRevision: 0,
          enProceso: 0,
          completados: 0,
          total: tramites.length
        };
        const now = /* @__PURE__ */ new Date();
        tramites.forEach((t) => {
          const estado = t.estado?.nombre || "";
          const estaVencido = t.estaVencido !== void 0 ? t.estaVencido : t.fechaVencimiento ? new Date(t.fechaVencimiento) < now : false;
          if (estaVencido) {
            estadosCount.completados++;
          } else if (["En Revisi\xF3n", "Enviado"].includes(estado)) {
            estadosCount.enRevision++;
          } else if (["En Proceso", "Aprobado", "Derivado"].includes(estado)) {
            estadosCount.enProceso++;
          } else if (["Finalizado", "Archivado", "Cancelado", "Rechazado"].includes(estado)) {
            estadosCount.completados++;
          }
        });
        this.stats = {
          enRevision: estadosCount.enRevision,
          enProceso: estadosCount.enProceso,
          completados: estadosCount.completados,
          totalTramites: estadosCount.total
        };
      },
      error: () => {
      }
    });
  }
  loadRecentActivities() {
    this.loadingActivities = true;
    this.misTramitesService.getMisTramites(1, 10).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        this.recentActivities = tramites.slice(0, 5).map((tramite) => {
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
      error: () => {
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
            progreso: estaVencido ? 100 : tramite.progreso
          };
        });
      },
      error: () => {
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
    this.router.navigate(["/usuario/nuevo-tramite"]);
  }
  viewMyTramites() {
    this.router.navigate(["/usuario/mis-tramites"]);
  }
  viewNotifications() {
    this.router.navigate(["/usuario/notificaciones"]);
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
    this.\u0275fac = function UsuarioDashboardComponent_Factory(t) {
      return new (t || _UsuarioDashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MisTramitesService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsuarioDashboardComponent, selectors: [["app-usuario-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 72, vars: 8, consts: [[1, "dashboard-container"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-icon", "pending"], [1, "fas", "fa-clock"], [1, "stat-content"], [1, "stat-icon", "processing"], [1, "fas", "fa-spinner"], [1, "stat-icon", "completed"], [1, "fas", "fa-check-circle"], [1, "stat-icon", "total"], [1, "fas", "fa-file-alt"], [1, "content-grid"], [1, "card", "recent-activity"], [1, "card-header"], [1, "card-content"], [1, "activity-list-container"], [1, "activity-list"], ["class", "activity-item", 4, "ngFor", "ngForOf"], ["class", "activity-item empty-state", 4, "ngIf"], ["class", "activity-item loading-item", 4, "ngIf"], [1, "card", "quick-actions"], [1, "actions-grid"], [1, "action-btn", 3, "click"], [1, "fas", "fa-plus"], [1, "fas", "fa-folder-open"], [1, "fas", "fa-bell"], [1, "card", "my-recent-tramites"], [1, "btn-link", 3, "click"], [1, "tramites-list"], ["class", "tramite-item", 4, "ngFor", "ngForOf"], [1, "activity-item"], [1, "activity-icon"], [1, "activity-content"], [1, "activity-meta"], ["class", "activity-status", 3, "status-completed", "status-pending", "status-rejected", 4, "ngIf"], [1, "activity-time"], [1, "activity-status"], [1, "activity-item", "empty-state"], [1, "activity-icon", "empty"], [1, "fas", "fa-inbox"], [1, "activity-item", "loading-item"], [1, "activity-icon", "loading"], [1, "fas", "fa-spinner", "fa-spin"], [1, "tramite-item"], [1, "tramite-info"], [1, "tramite-header"], [1, "tramite-codigo"], [1, "estado-badge"], [1, "tramite-title"], [1, "tramite-meta"], [1, "fas", "fa-calendar"], [1, "fas", "fa-layer-group"], [1, "tramite-progress"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-text"]], template: function UsuarioDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "i", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5)(6, "h3");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "En Revisi\xF3n");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 2)(11, "div", 6);
        \u0275\u0275element(12, "i", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 5)(14, "h3");
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p");
        \u0275\u0275text(17, "En Proceso");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "div", 2)(19, "div", 8);
        \u0275\u0275element(20, "i", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 5)(22, "h3");
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "p");
        \u0275\u0275text(25, "Procesados");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(26, "div", 2)(27, "div", 10);
        \u0275\u0275element(28, "i", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 5)(30, "h3");
        \u0275\u0275text(31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p");
        \u0275\u0275text(33, "Total de Tr\xE1mites");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(34, "div", 12)(35, "div", 13)(36, "div", 14)(37, "h3");
        \u0275\u0275text(38, "Actividad Reciente");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 15)(40, "div", 16)(41, "div", 17);
        \u0275\u0275template(42, UsuarioDashboardComponent_div_42_Template, 10, 7, "div", 18)(43, UsuarioDashboardComponent_div_43_Template, 6, 0, "div", 19)(44, UsuarioDashboardComponent_div_44_Template, 6, 0, "div", 20);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(45, "div", 21)(46, "div", 14)(47, "h3");
        \u0275\u0275text(48, "Acciones R\xE1pidas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 15)(50, "div", 22)(51, "button", 23);
        \u0275\u0275listener("click", function UsuarioDashboardComponent_Template_button_click_51_listener() {
          return ctx.createNewTramite();
        });
        \u0275\u0275element(52, "i", 24);
        \u0275\u0275elementStart(53, "span");
        \u0275\u0275text(54, "Nuevo Tr\xE1mite");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(55, "button", 23);
        \u0275\u0275listener("click", function UsuarioDashboardComponent_Template_button_click_55_listener() {
          return ctx.viewMyTramites();
        });
        \u0275\u0275element(56, "i", 25);
        \u0275\u0275elementStart(57, "span");
        \u0275\u0275text(58, "Mis Tr\xE1mites");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(59, "button", 23);
        \u0275\u0275listener("click", function UsuarioDashboardComponent_Template_button_click_59_listener() {
          return ctx.viewNotifications();
        });
        \u0275\u0275element(60, "i", 26);
        \u0275\u0275elementStart(61, "span");
        \u0275\u0275text(62, "Notificaciones");
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(63, "div", 27)(64, "div", 14)(65, "h3");
        \u0275\u0275text(66, "Mis \xDAltimos Tr\xE1mites");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "button", 28);
        \u0275\u0275listener("click", function UsuarioDashboardComponent_Template_button_click_67_listener() {
          return ctx.viewMyTramites();
        });
        \u0275\u0275text(68, "Ver todos \u2192");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(69, "div", 15)(70, "div", 29);
        \u0275\u0275template(71, UsuarioDashboardComponent_div_71_Template, 21, 10, "div", 30);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.stats.enRevision);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.enProceso);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.completados);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.totalTramites);
        \u0275\u0275advance(11);
        \u0275\u0275property("ngForOf", ctx.recentActivities);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.recentActivities.length === 0 && !ctx.loadingActivities);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loadingActivities);
        \u0275\u0275advance(27);
        \u0275\u0275property("ngForOf", ctx.myRecentTramites);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  height: 100%;\n  overflow-y: auto;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 25px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  transition: transform 0.3s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  color: white;\n}\n.stat-icon.pending[_ngcontent-%COMP%] {\n  background: #f39c12;\n}\n.stat-icon.processing[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.stat-icon.completed[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.stat-icon.total[_ngcontent-%COMP%] {\n  background: #9b59b6;\n}\n.stat-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  margin: 0;\n  color: #2c3e50;\n}\n.stat-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #7f8c8d;\n  margin: 4px 0 0 0;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 20px 25px;\n  border-bottom: 1px solid #f1f2f6;\n  background: #fafbfc;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #667eea;\n  font-size: 14px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: color 0.3s ease;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: #5a67d8;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.activity-list-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.activity-list[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e0 #f7fafc;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f7fafc;\n  border-radius: 3px;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e0;\n  border-radius: 3px;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 15px;\n  margin-bottom: 15px;\n}\n.activity-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.activity-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  color: white;\n  flex-shrink: 0;\n}\n.activity-icon.tramite[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.activity-icon.notification[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.activity-icon.user[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.activity-icon.empty[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #a0aec0;\n}\n.activity-icon.loading[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #999;\n}\n.activity-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  color: #2c3e50;\n  line-height: 1.4;\n}\n.activity-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 4px;\n}\n.activity-status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.activity-status.status-completed[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.activity-status.status-pending[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.activity-status.status-rejected[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n.actions-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 15px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 2px solid #e9ecef;\n  border-radius: 10px;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: #667eea;\n  border-color: #667eea;\n  color: white;\n  transform: translateY(-2px);\n}\n.action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #667eea;\n  transition: color 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  color: white;\n}\n.action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #2c3e50;\n  transition: color 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  color: white;\n}\n.my-recent-tramites[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n.tramites-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.tramite-item[_ngcontent-%COMP%] {\n  padding: 15px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border-left: 4px solid #667eea;\n}\n.tramite-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.tramite-codigo[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #667eea;\n}\n.estado-badge[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.estado-badge.en-revision[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.estado-badge.en-proceso[_ngcontent-%COMP%] {\n  background: #cfe2ff;\n  color: #004085;\n}\n.estado-badge.finalizado[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.estado-badge.observado[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.tramite-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 8px;\n}\n.tramite-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  font-size: 12px;\n  color: #7f8c8d;\n  margin-bottom: 10px;\n}\n.tramite-meta[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 5px;\n  color: #a0aec0;\n}\n.tramite-progress[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 10px;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: #e2e8f0;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #667eea,\n      #9f7aea);\n  transition: width 0.3s ease;\n}\n.progress-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #667eea;\n  min-width: 40px;\n  text-align: right;\n}\n.empty-state[_ngcontent-%COMP%]   .activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n  font-style: italic;\n}\n.loading-item[_ngcontent-%COMP%]   .activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 15px;\n  }\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 10px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    padding: 15px 10px;\n  }\n}\n@media (max-width: 480px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    flex-direction: row;\n    justify-content: flex-start;\n    gap: 15px;\n    padding: 15px;\n  }\n  .action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsuarioDashboardComponent, { className: "UsuarioDashboardComponent" });
})();
export {
  UsuarioDashboardComponent
};
//# sourceMappingURL=chunk-X7RB7SXD.js.map
