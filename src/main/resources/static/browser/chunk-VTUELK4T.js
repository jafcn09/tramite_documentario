import {
  AuthService,
  Router
} from "./chunk-HNI5KL6U.js";
import {
  CommonModule,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate2
} from "./chunk-VDZBNFIH.js";

// src/app/shared/access-denied/access-denied.component.ts
function AccessDeniedComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "p")(2, "strong");
    \u0275\u0275text(3, "Usuario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.nombre, " ", ctx_r0.currentUser == null ? null : ctx_r0.currentUser.apellidos, "");
  }
}
var AccessDeniedComponent = class _AccessDeniedComponent {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
    this.currentUser = this.authService.currentUserValue;
  }
  goToHome() {
    const roleName = this.currentUser?.role?.name?.toUpperCase();
    let route = "/";
    switch (roleName) {
      case "USUARIO":
        route = "/usuario/tablero";
        break;
      case "ADMINISTRATIVO":
        route = "/administrativo/tablero";
        break;
      case "ADMIN":
        route = "/admin/tablero";
        break;
      case "ESTUDIANTE":
        route = "/estudiante/tablero";
        break;
      default:
        route = "/";
    }
    this.router.navigate([route]);
  }
  goBack() {
    const roleName = this.currentUser?.role?.name?.toUpperCase();
    let route = "/";
    switch (roleName) {
      case "USUARIO":
        route = "/usuario/tablero";
        break;
      case "ADMINISTRATIVO":
        route = "/administrativo/tablero";
        break;
      case "ADMIN":
        route = "/admin/tablero";
        break;
      case "ESTUDIANTE":
        route = "/estudiante/tablero";
        break;
      default:
        route = "/";
    }
    this.router.navigate([route]);
  }
  logout() {
    this.authService.logout();
  }
  static {
    this.\u0275fac = function AccessDeniedComponent_Factory(t) {
      return new (t || _AccessDeniedComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccessDeniedComponent, selectors: [["app-access-denied"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 18, vars: 1, consts: [[1, "access-denied-container"], [1, "access-denied-card"], [1, "icon"], ["width", "80", "height", "80", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "4.93", "y1", "4.93", "x2", "19.07", "y2", "19.07"], ["class", "user-info", 4, "ngIf"], [1, "actions"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-outline", 3, "click"], [1, "user-info"]], template: function AccessDeniedComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "circle", 4)(5, "line", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "h1");
        \u0275\u0275text(7, "Acceso Denegado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "No tienes permisos suficientes para acceder a esta p\xE1gina.");
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, AccessDeniedComponent_div_10_Template, 5, 2, "div", 6);
        \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
        \u0275\u0275listener("click", function AccessDeniedComponent_Template_button_click_12_listener() {
          return ctx.goToHome();
        });
        \u0275\u0275text(13, " Ir al Inicio ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 9);
        \u0275\u0275listener("click", function AccessDeniedComponent_Template_button_click_14_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(15, " Regresar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "button", 10);
        \u0275\u0275listener("click", function AccessDeniedComponent_Template_button_click_16_listener() {
          return ctx.logout();
        });
        \u0275\u0275text(17, " Cerrar Sesi\xF3n ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngIf", ctx.currentUser);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.access-denied-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 20px;\n}\n.access-denied-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 15px;\n  padding: 50px 40px;\n  text-align: center;\n  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n  width: 100%;\n}\n.icon[_ngcontent-%COMP%] {\n  color: #e74c3c;\n  margin-bottom: 20px;\n}\nh1[_ngcontent-%COMP%] {\n  color: #2c3e50;\n  font-size: 28px;\n  font-weight: 600;\n  margin-bottom: 15px;\n}\np[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-size: 16px;\n  line-height: 1.6;\n  margin-bottom: 20px;\n}\n.user-info[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 20px;\n  border-radius: 10px;\n  margin: 20px 0;\n}\n.user-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  color: #495057;\n  font-size: 14px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 30px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-decoration: none;\n  display: inline-block;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #5a67d8;\n  transform: translateY(-2px);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #545b62;\n  transform: translateY(-2px);\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #6c757d;\n  border: 2px solid #dee2e6;\n}\n.btn-outline[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n  border-color: #adb5bd;\n}\n@media (min-width: 768px) {\n  .actions[_ngcontent-%COMP%] {\n    flex-direction: row;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=access-denied.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccessDeniedComponent, { className: "AccessDeniedComponent" });
})();
export {
  AccessDeniedComponent
};
//# sourceMappingURL=chunk-VTUELK4T.js.map
