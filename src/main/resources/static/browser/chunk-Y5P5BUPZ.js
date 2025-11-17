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
  HttpClient,
  NgForOf,
  NgIf,
  environment,
  firstValueFrom,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VDZBNFIH.js";

// src/app/admin/dashboard/dashboard.component.ts
function DashboardComponent_small_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (incluye ", ctx_r1.getTramitesVencidos(), " vencidos) ");
  }
}
function DashboardComponent_div_44_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const activity_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("role-admin", activity_r3.role === "ADMIN")("role-administrativo", activity_r3.role === "ADMINISTRATIVO")("role-usuario", activity_r3.role === "USUARIO");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(activity_r3.role);
  }
}
function DashboardComponent_div_44_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const activity_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("status-completed", activity_r3.status === "completed")("status-pending", activity_r3.status === "pending");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(activity_r3.status);
  }
}
function DashboardComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 31)(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 32);
    \u0275\u0275template(7, DashboardComponent_div_44_span_7_Template, 2, 7, "span", 33)(8, DashboardComponent_div_44_span_8_Template, 2, 5, "span", 34);
    \u0275\u0275elementStart(9, "span", 35);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const activity_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(activity_r3.type);
    \u0275\u0275advance();
    \u0275\u0275classMap(activity_r3.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(activity_r3.description);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", activity_r3.role);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", activity_r3.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(activity_r3.time);
  }
}
function DashboardComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39);
    \u0275\u0275element(2, "i", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 31)(4, "p");
    \u0275\u0275text(5, "Cargando m\xE1s actividades...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "button", 42);
    \u0275\u0275listener("click", function DashboardComponent_div_46_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadMoreActivities());
    });
    \u0275\u0275element(2, "i", 43);
    \u0275\u0275text(3, " Cargar m\xE1s actividades ");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45);
    \u0275\u0275element(2, "i", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 31)(4, "p");
    \u0275\u0275text(5, "No hay actividades recientes");
    \u0275\u0275elementEnd()()();
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(authService, bandejaTramitesService, http, router) {
    this.authService = authService;
    this.bandejaTramitesService = bandejaTramitesService;
    this.http = http;
    this.router = router;
    this.currentUser = null;
    this.stats = {
      totalUsers: 0,
      totalTramites: 0,
      pendingTramites: 0,
      completedTramites: 0
    };
    this.recentActivities = [];
    this.loadingActivities = false;
    this.loadingUserCount = false;
    this.canLoadMore = true;
    this.currentOffset = 0;
    this.activitiesLimit = 5;
    this.allTramites = [];
    this.tramitePermisos = /* @__PURE__ */ new Map();
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.loadAllTramitesAndPermissions();
    this.loadUserCount();
    this.loadRecentActivities();
  }
  loadUserCount() {
    this.loadingUserCount = true;
    const countUrl = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/count` : "/api/usuarios/count";
    this.http.get(countUrl).subscribe({
      next: (response) => {
        this.stats.totalUsers = response.totalUsers;
        this.loadingUserCount = false;
      },
      error: (error) => {
        const recentUrl = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/public/recent?limit=1000` : "/api/usuarios/public/recent?limit=1000";
        this.http.get(recentUrl).subscribe({
          next: (users) => {
            this.stats.totalUsers = users.length;
            this.loadingUserCount = false;
          },
          error: (fallbackError) => {
            this.stats.totalUsers = 0;
            this.loadingUserCount = false;
          }
        });
      }
    });
  }
  loadAllTramitesAndPermissions() {
    this.bandejaTramitesService.getTramites(1, 1e3).subscribe({
      next: (response) => {
        this.allTramites = response.data || [];
        this.loadPermissionsForTramites();
      },
      error: (error) => {
        this.loadTramitesStatistics();
      }
    });
  }
  loadPermissionsForTramites() {
    if (!Array.isArray(this.allTramites)) {
      return;
    }
    const tramitePromises = this.allTramites.map((tramite) => firstValueFrom(this.bandejaTramitesService.verificarPermisosAcciones(tramite.id)).then((permisos) => {
      if (permisos) {
        this.tramitePermisos.set(tramite.id, permisos);
      }
      return permisos;
    }).catch((error) => {
      return null;
    }));
    Promise.all(tramitePromises).then(() => {
      this.calculateStatsWithExpiredTramites();
      this.generateRecentActivitiesFromTramites();
    });
  }
  calculateStatsWithExpiredTramites() {
    const expiredCount = this.getTramitesVencidos();
    const baseStats = this.getBaseStatistics();
    if (this.stats.totalUsers === 0) {
      const uniqueUserEmails = /* @__PURE__ */ new Set();
      this.allTramites.forEach((tramite) => {
        if (tramite.usuario?.email) {
          uniqueUserEmails.add(tramite.usuario.email);
        }
        if (tramite.trabajadorAsignado?.email) {
          uniqueUserEmails.add(tramite.trabajadorAsignado.email);
        }
      });
      this.stats.totalUsers = uniqueUserEmails.size || 0;
    }
    this.stats.totalTramites = this.allTramites.length;
    this.stats.pendingTramites = baseStats.pending;
    this.stats.completedTramites = baseStats.completed + expiredCount;
  }
  getTramitesVencidos() {
    if (!Array.isArray(this.allTramites)) {
      return 0;
    }
    return this.allTramites.filter((tramite) => {
      const permisos = this.tramitePermisos.get(tramite.id);
      return permisos?.estaVencido || false;
    }).length;
  }
  getBaseStatistics() {
    const stats = {
      pending: 0,
      completed: 0
    };
    this.allTramites.forEach((tramite) => {
      const estado = tramite.estado?.nombre || "";
      if (["En Revisi\xF3n", "Enviado", "En Proceso", "Aprobado", "Derivado"].includes(estado)) {
        stats.pending++;
      } else if (["Finalizado"].includes(estado)) {
        stats.completed++;
      }
    });
    return stats;
  }
  generateRecentActivitiesFromTramites() {
    const recentTramites = this.allTramites.sort((a, b) => new Date(b.fechaActualizacion || b.fechaCreacion).getTime() - new Date(a.fechaActualizacion || a.fechaCreacion).getTime()).slice(0, 5);
    this.recentActivities = recentTramites.map((tramite) => {
      const isExpired = this.tramitePermisos.get(tramite.id)?.estaVencido || false;
      let userName = "Usuario Desconocido";
      if (tramite.usuario && tramite.usuario.nombre && tramite.usuario.apellidos) {
        userName = `${tramite.usuario.nombre} ${tramite.usuario.apellidos}`;
      } else if (tramite.trabajadorAsignado && tramite.trabajadorAsignado.nombre) {
        userName = `${tramite.trabajadorAsignado.nombre} ${tramite.trabajadorAsignado.apellidos || ""}`.trim();
      }
      const tramiteTitle = tramite.asunto || tramite.tipoTramite?.nombre || "Tr\xE1mite sin t\xEDtulo";
      const estadoNombre = tramite.estado?.nombre || "Sin estado";
      let description = "";
      let icon = "fas fa-file-alt";
      let type = "tramite";
      if (isExpired) {
        description = `Tr\xE1mite ${tramite.codigo || "N/A"} vencido - ${tramiteTitle}`;
        icon = "fas fa-exclamation-triangle";
        type = "expired";
      } else {
        description = `${userName} - ${tramiteTitle} (${estadoNombre})`;
        icon = estadoNombre === "Finalizado" ? "fas fa-check-circle" : "fas fa-file-alt";
      }
      return {
        type,
        icon,
        description,
        time: this.formatTimeAgo(tramite.fechaActualizacion || tramite.fechaCreacion),
        status: isExpired ? "expirado" : estadoNombre === "Finalizado" ? "completado" : "pendiente"
      };
    });
  }
  loadTramitesStatistics() {
    const url = environment.apiUrl ? `${environment.apiUrl}/api/bandeja-tramites/estadisticas` : "/api/bandeja-tramites/estadisticas";
    this.http.get(url).subscribe({
      next: (response) => {
        this.stats.totalTramites = response.totalAsignados || 0;
        this.stats.pendingTramites = (response.pendientesRevision || 0) + (response.enProceso || 0);
        this.stats.completedTramites = response.finalizadosHoy || 0;
      },
      error: (error) => {
        this.stats.totalTramites = 0;
        this.stats.pendingTramites = 0;
        this.stats.completedTramites = 0;
      }
    });
  }
  loadRecentActivities(append = false) {
    this.loadingActivities = true;
    const offset = append ? this.currentOffset : 0;
    const url = environment.apiUrl ? `${environment.apiUrl}/api/activities/recent?limit=${this.activitiesLimit}&offset=${offset}` : `/api/activities/recent?limit=${this.activitiesLimit}&offset=${offset}`;
    this.http.get(url).subscribe({
      next: (response) => {
        const activitiesArray = Array.isArray(response) ? response : Array.isArray(response?.data) ? response.data : [];
        const mappedActivities = activitiesArray.map((activity) => {
          let roleColor = activity.userRole || "SISTEMA";
          let statusLabel = "";
          switch (activity.type) {
            case "user":
              activity.icon = activity.icon || "fas fa-user-plus";
              break;
            case "tramite":
              if (activity.status === "pending") {
                statusLabel = "PENDIENTE";
              } else if (activity.status === "completed") {
                statusLabel = "COMPLETADO";
              }
              break;
            case "notification":
              activity.icon = activity.status === "unread" ? "fas fa-bell" : "fas fa-envelope-open";
              statusLabel = activity.status === "unread" ? "NO LE\xCDDA" : "LE\xCDDA";
              break;
            case "area":
              activity.icon = "fas fa-building";
              break;
            case "alert":
              activity.icon = "fas fa-exclamation-triangle";
              statusLabel = "ALERTA";
              break;
          }
          return {
            type: activity.type,
            icon: activity.icon || "fas fa-circle",
            description: activity.description,
            time: this.formatTimeAgo(activity.timestamp),
            role: roleColor,
            status: statusLabel || activity.status,
            action: activity.action
          };
        });
        if (append) {
          this.recentActivities = [...this.recentActivities, ...mappedActivities];
        } else {
          this.recentActivities = mappedActivities;
          this.currentOffset = 0;
        }
        this.currentOffset += activitiesArray.length;
        this.canLoadMore = activitiesArray.length === this.activitiesLimit;
        this.loadingActivities = false;
      },
      error: (error) => {
        this.loadingActivities = false;
        if (!append) {
          this.generateRecentActivitiesFromTramites();
        }
      }
    });
  }
  loadRecentUsersAsFallback() {
    const url = environment.apiUrl ? `${environment.apiUrl}/api/usuarios/public/recent?limit=5` : "/api/usuarios/public/recent?limit=5";
    this.http.get(url).subscribe({
      next: (users) => {
        this.recentActivities = users.map((user) => ({
          type: "user",
          icon: "fas fa-user-plus",
          description: `Nuevo usuario: ${user.nombre} ${user.apellidos}`,
          time: this.formatTimeAgo(user.fechaCreacion)
        }));
      },
      error: (error) => {
        this.recentActivities = [];
      }
    });
  }
  manageUsers() {
    this.router.navigate(["/admin/gestion-usuarios"]);
  }
  viewReports() {
    this.router.navigate(["/admin/reportes"]);
  }
  manageDocuments() {
    this.router.navigate(["/admin/tramites"]);
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
    if (diffDays < 30)
      return `Hace ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? "s" : ""}`;
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  loadMoreActivities() {
    if (!this.loadingActivities && this.canLoadMore) {
      this.loadRecentActivities(true);
    }
  }
  trackByActivity(_, activity) {
    return activity.description + activity.time;
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(BandejaTramitesService), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-admin-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 66, vars: 12, consts: [["activityList", ""], [1, "dashboard-container"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-icon", "users"], [1, "fas", "fa-users"], [1, "stat-content"], [1, "stat-icon", "tramites"], [1, "fas", "fa-file-alt"], [1, "stat-icon", "pending"], [1, "fas", "fa-clock"], [1, "stat-icon", "completed"], [1, "fas", "fa-check-circle"], ["class", "expired-note", 4, "ngIf"], [1, "content-grid"], [1, "card", "recent-activity"], [1, "card-header"], [1, "card-content"], [1, "activity-list-container"], [1, "activity-list"], ["class", "activity-item", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "activity-item loading-item", 4, "ngIf"], ["class", "activity-item load-more-item", 4, "ngIf"], ["class", "activity-item empty-state", 4, "ngIf"], [1, "card", "quick-actions"], [1, "actions-grid"], [1, "action-btn", 3, "click"], [1, "fas", "fa-chart-bar"], [1, "expired-note"], [1, "activity-item"], [1, "activity-icon"], [1, "activity-content"], [1, "activity-meta"], ["class", "activity-role", 3, "role-admin", "role-administrativo", "role-usuario", 4, "ngIf"], ["class", "activity-status", 3, "status-completed", "status-pending", 4, "ngIf"], [1, "activity-time"], [1, "activity-role"], [1, "activity-status"], [1, "activity-item", "loading-item"], [1, "activity-icon", "loading"], [1, "fas", "fa-spinner", "fa-spin"], [1, "activity-item", "load-more-item"], [1, "load-more-btn", 3, "click"], [1, "fas", "fa-chevron-down"], [1, "activity-item", "empty-state"], [1, "activity-icon", "empty"], [1, "fas", "fa-inbox"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
        \u0275\u0275element(4, "i", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 6)(6, "h3");
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "Total de Usuarios");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 3)(11, "div", 7);
        \u0275\u0275element(12, "i", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 6)(14, "h3");
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p");
        \u0275\u0275text(17, "Tr\xE1mites Registrados");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "div", 3)(19, "div", 9);
        \u0275\u0275element(20, "i", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 6)(22, "h3");
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "p");
        \u0275\u0275text(25, "Tr\xE1mites Pendientes");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(26, "div", 3)(27, "div", 11);
        \u0275\u0275element(28, "i", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "div", 6)(30, "h3");
        \u0275\u0275text(31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p");
        \u0275\u0275text(33, "Tr\xE1mites Completados");
        \u0275\u0275elementEnd();
        \u0275\u0275template(34, DashboardComponent_small_34_Template, 2, 1, "small", 13);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(35, "div", 14)(36, "div", 15)(37, "div", 16)(38, "h3");
        \u0275\u0275text(39, "Actividad Reciente");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 17)(41, "div", 18)(42, "div", 19, 0);
        \u0275\u0275template(44, DashboardComponent_div_44_Template, 11, 8, "div", 20)(45, DashboardComponent_div_45_Template, 6, 0, "div", 21)(46, DashboardComponent_div_46_Template, 4, 0, "div", 22)(47, DashboardComponent_div_47_Template, 6, 0, "div", 23);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(48, "div", 24)(49, "div", 16)(50, "h3");
        \u0275\u0275text(51, "Acciones R\xE1pidas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(52, "div", 17)(53, "div", 25)(54, "button", 26);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_54_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.manageUsers());
        });
        \u0275\u0275element(55, "i", 5);
        \u0275\u0275elementStart(56, "span");
        \u0275\u0275text(57, "Gestionar Usuarios");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "button", 26);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_58_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.viewReports());
        });
        \u0275\u0275element(59, "i", 27);
        \u0275\u0275elementStart(60, "span");
        \u0275\u0275text(61, "Ver Reportes");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(62, "button", 26);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_62_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.manageDocuments());
        });
        \u0275\u0275element(63, "i", 8);
        \u0275\u0275elementStart(64, "span");
        \u0275\u0275text(65, "Gestionar Tr\xE1mites");
        \u0275\u0275elementEnd()()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275classProp("loading", ctx.loadingUserCount);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.loadingUserCount ? "..." : ctx.stats.totalUsers);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.totalTramites);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.pendingTramites);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.completedTramites);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.getTramitesVencidos() > 0);
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.recentActivities)("ngForTrackBy", ctx.trackByActivity);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loadingActivities);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.canLoadMore && !ctx.loadingActivities && ctx.recentActivities.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.recentActivities.length === 0 && !ctx.loadingActivities);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  height: 100%;\n  overflow-y: auto;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 25px;\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  transition: transform 0.3s ease;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.stat-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  color: white;\n}\n.stat-icon.users[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.stat-icon.tramites[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.stat-icon.pending[_ngcontent-%COMP%] {\n  background: #f39c12;\n}\n.stat-icon.completed[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.stat-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  margin: 0;\n  color: #2c3e50;\n}\n.stat-content[_ngcontent-%COMP%]   h3.loading[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.stat-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #7f8c8d;\n  margin: 4px 0 0 0;\n}\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 20px;\n}\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 20px 25px;\n  border-bottom: 1px solid #f1f2f6;\n  background: #fafbfc;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.activity-list-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.activity-list[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e0 #f7fafc;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f7fafc;\n  border-radius: 3px;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #cbd5e0;\n  border-radius: 3px;\n}\n.activity-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a0aec0;\n}\n.activity-list[_ngcontent-%COMP%]    > .activity-item[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n.activity-list[_ngcontent-%COMP%]    > .activity-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.activity-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  color: white;\n}\n.activity-icon.user[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.activity-icon.tramite[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.activity-icon.system[_ngcontent-%COMP%] {\n  background: #95a5a6;\n}\n.activity-icon.area[_ngcontent-%COMP%] {\n  background: #9b59b6;\n}\n.activity-icon.login[_ngcontent-%COMP%] {\n  background: #2ecc71;\n}\n.activity-icon.expired[_ngcontent-%COMP%] {\n  background: #f39c12;\n}\n.activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  color: #2c3e50;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #7f8c8d;\n}\n.activity-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 4px;\n}\n.activity-role[_ngcontent-%COMP%] {\n  color: white;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 10px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  background: #95a5a6;\n}\n.activity-role.role-admin[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.activity-role.role-administrativo[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.activity-role.role-usuario[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.activity-status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 10px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-left: 5px;\n}\n.activity-status.status-completed[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.activity-status.status-pending[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.activity-status.status-expired[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.loading-item[_ngcontent-%COMP%]   .activity-icon.loading[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #999;\n}\n.load-more-item[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 10px 0;\n}\n.load-more-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px dashed #cbd5e0;\n  border-radius: 8px;\n  padding: 10px 20px;\n  color: #667eea;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.load-more-btn[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  background: #f7fafc;\n}\n.empty-state[_ngcontent-%COMP%]   .activity-icon.empty[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #a0aec0;\n}\n.empty-state[_ngcontent-%COMP%]   .activity-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #a0aec0;\n  font-style: italic;\n}\n.actions-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 15px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 2px solid #e9ecef;\n  border-radius: 10px;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-decoration: none;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: #667eea;\n  border-color: #667eea;\n  color: white;\n  transform: translateY(-2px);\n}\n.action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #667eea;\n  transition: color 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  color: white;\n}\n.action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #2c3e50;\n  transition: color 0.3s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] {\n  color: white;\n}\n.expired-note[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #f39c12;\n  margin-top: 2px;\n  font-weight: 500;\n}\n.expired-summary[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 15px;\n  background: #fff3cd;\n  border: 1px solid #ffeaa7;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.expired-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  color: #856404;\n}\n.expired-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #f39c12;\n  font-size: 16px;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid #f39c12;\n  color: #f39c12;\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  background: #f39c12;\n  color: white;\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 15px;\n  }\n  .content-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 10px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    padding: 15px 10px;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n  .actions-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    padding: 20px;\n    flex-direction: row;\n    justify-content: flex-start;\n    gap: 15px;\n    text-align: left;\n  }\n  .action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 20px;\n    width: auto;\n  }\n  .action-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    font-size: 14px;\n    font-weight: 500;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent" });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-Y5P5BUPZ.js.map
