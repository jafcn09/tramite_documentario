import {
  NuevoTramiteModalComponent
} from "./chunk-YHPLPX4C.js";
import "./chunk-JNC72FGQ.js";
import "./chunk-DLKCR3ZE.js";
import "./chunk-KYM3LYO5.js";
import "./chunk-NXAITARR.js";
import {
  Router
} from "./chunk-HNI5KL6U.js";
import "./chunk-T3F2XNQR.js";
import {
  CommonModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-VDZBNFIH.js";

// src/app/features/tramites/pages/nuevo-tramite.component.ts
var NuevoTramitePageComponent = class _NuevoTramitePageComponent {
  constructor(router) {
    this.router = router;
  }
  goBack() {
    const currentPath = this.router.url;
    if (currentPath.includes("/admin/")) {
      this.router.navigate(["/admin/tramites"]);
    } else if (currentPath.includes("/administrativo/")) {
      this.router.navigate(["/administrativo/mis-tramites"]);
    } else if (currentPath.includes("/usuario/")) {
      this.router.navigate(["/usuario/mis-tramites"]);
    } else if (currentPath.includes("/estudiante/")) {
      this.router.navigate(["/estudiante/tablero"]);
    } else {
      this.router.navigate(["/"]);
    }
  }
  onTramiteCreado(tramite) {
    this.goBack();
  }
  static {
    this.\u0275fac = function NuevoTramitePageComponent_Factory(t) {
      return new (t || _NuevoTramitePageComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NuevoTramitePageComponent, selectors: [["app-nuevo-tramite-page"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 1, consts: [[1, "nuevo-tramite-page"], [1, "page-header"], [1, "fas", "fa-plus-circle"], [1, "btn", "btn-secondary", 3, "click"], [1, "fas", "fa-arrow-left"], [3, "close", "tramiteCreado", "show"]], template: function NuevoTramitePageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275element(3, "i", 2);
        \u0275\u0275text(4, " Nuevo Tr\xE1mite ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 3);
        \u0275\u0275listener("click", function NuevoTramitePageComponent_Template_button_click_5_listener() {
          return ctx.goBack();
        });
        \u0275\u0275element(6, "i", 4);
        \u0275\u0275text(7, " Volver ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "app-nuevo-tramite-modal", 5);
        \u0275\u0275listener("close", function NuevoTramitePageComponent_Template_app_nuevo_tramite_modal_close_8_listener() {
          return ctx.goBack();
        })("tramiteCreado", function NuevoTramitePageComponent_Template_app_nuevo_tramite_modal_tramiteCreado_8_listener($event) {
          return ctx.onTramiteCreado($event);
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("show", true);
      }
    }, dependencies: [CommonModule, NuevoTramiteModalComponent], styles: ["\n\n.nuevo-tramite-page[_ngcontent-%COMP%] {\n  padding: 20px;\n  min-height: 100vh;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding: 0 20px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 600;\n  color: #2c3e50;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #3498db;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-weight: 500;\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.2s;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #ecf0f1;\n  color: #2c3e50;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #d5dbdb;\n}\n/*# sourceMappingURL=nuevo-tramite.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NuevoTramitePageComponent, { className: "NuevoTramitePageComponent" });
})();
export {
  NuevoTramitePageComponent
};
//# sourceMappingURL=chunk-X2TQNJQN.js.map
