import {
  OrganigramaService
} from "./chunk-JNC72FGQ.js";
import {
  TramiteService
} from "./chunk-DLKCR3ZE.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-KYM3LYO5.js";
import {
  ToastService
} from "./chunk-NXAITARR.js";
import {
  AuthService
} from "./chunk-HNI5KL6U.js";
import {
  CheckboxControlValueAccessor,
  CheckboxRequiredValidator,
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
} from "./chunk-T3F2XNQR.js";
import {
  CommonModule,
  ElementRef,
  EventEmitter,
  HttpClient,
  NgClass,
  NgForOf,
  NgIf,
  Subscription,
  __async,
  environment,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-VDZBNFIH.js";

// src/app/shared/components/modal-base/modal-base.component.ts
var _c0 = ["*", [["", "slot", "footer"]]];
var _c1 = ["*", "[slot=footer]"];
function ModalBaseComponent_div_0_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function ModalBaseComponent_div_0_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275elementEnd();
  }
}
function ModalBaseComponent_div_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275element(2, "i", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function ModalBaseComponent_div_0_div_10_div_2_i_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 13);
  }
}
function ModalBaseComponent_div_0_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "button", 17);
    \u0275\u0275listener("click", function ModalBaseComponent_div_0_div_10_div_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(2, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 18);
    \u0275\u0275listener("click", function ModalBaseComponent_div_0_div_10_div_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onConfirm());
    });
    \u0275\u0275template(4, ModalBaseComponent_div_0_div_10_div_2_i_4_Template, 1, 0, "i", 19);
    \u0275\u0275text(5, " Confirmar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading);
  }
}
function ModalBaseComponent_div_0_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275projection(1, 1);
    \u0275\u0275template(2, ModalBaseComponent_div_0_div_10_div_2_Template, 6, 3, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showDefaultButtons);
  }
}
function ModalBaseComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function ModalBaseComponent_div_0_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayClick($event));
    })("keydown.escape", function ModalBaseComponent_div_0_Template_div_keydown_escape_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEscapeKey($event));
    });
    \u0275\u0275elementStart(1, "div", 2)(2, "div", 3)(3, "h2", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ModalBaseComponent_div_0_button_5_Template, 2, 0, "button", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6);
    \u0275\u0275template(7, ModalBaseComponent_div_0_div_7_Template, 5, 0, "div", 7);
    \u0275\u0275elementStart(8, "div");
    \u0275\u0275projection(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, ModalBaseComponent_div_0_div_10_Template, 3, 1, "div", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("@modalAnimation", void 0);
    \u0275\u0275advance();
    \u0275\u0275styleProp("max-height", ctx_r1.maxHeight);
    \u0275\u0275property("ngClass", "modal-" + ctx_r1.size)("@contentAnimation", void 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.closable);
    \u0275\u0275advance();
    \u0275\u0275classProp("loading", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275styleProp("display", ctx_r1.loading ? "none" : "block");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.showFooter);
  }
}
var ModalBaseComponent = class _ModalBaseComponent {
  constructor() {
    this.show = false;
    this.title = "";
    this.size = "md";
    this.closable = true;
    this.showFooter = true;
    this.showDefaultButtons = true;
    this.loading = false;
    this.maxHeight = "";
    this.close = new EventEmitter();
    this.confirm = new EventEmitter();
    this.cancel = new EventEmitter();
  }
  ngOnInit() {
    if (this.show) {
      document.body.classList.add("modal-open");
    }
  }
  ngOnDestroy() {
    document.body.classList.remove("modal-open");
  }
  ngOnChanges() {
    if (this.show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }
  onOverlayClick(event) {
    if (event.target === event.currentTarget && this.closable) {
      this.onClose();
    }
  }
  onClose() {
    this.close.emit();
  }
  onConfirm() {
    this.confirm.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
  onEscapeKey(event) {
    if (event.key === "Escape" && this.closable && this.show) {
      this.onClose();
    }
  }
  static {
    this.\u0275fac = function ModalBaseComponent_Factory(t) {
      return new (t || _ModalBaseComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ModalBaseComponent, selectors: [["app-modal-base"]], inputs: { show: "show", title: "title", size: "size", closable: "closable", showFooter: "showFooter", showDefaultButtons: "showDefaultButtons", loading: "loading", maxHeight: "maxHeight" }, outputs: { close: "close", confirm: "confirm", cancel: "cancel" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], ngContentSelectors: _c1, decls: 1, vars: 1, consts: [["class", "modal-overlay", "tabindex", "-1", 3, "click", "keydown.escape", 4, "ngIf"], ["tabindex", "-1", 1, "modal-overlay", 3, "click", "keydown.escape"], [1, "modal-container", 3, "ngClass"], [1, "modal-header"], [1, "modal-title"], ["class", "modal-close-btn", "type", "button", "aria-label", "Cerrar modal", 3, "click", 4, "ngIf"], [1, "modal-body"], ["class", "modal-loading", 4, "ngIf"], ["class", "modal-footer", 4, "ngIf"], ["type", "button", "aria-label", "Cerrar modal", 1, "modal-close-btn", 3, "click"], [1, "fas", "fa-times"], [1, "modal-loading"], [1, "spinner"], [1, "fas", "fa-spinner", "fa-spin"], [1, "modal-footer"], ["class", "default-footer-buttons", 4, "ngIf"], [1, "default-footer-buttons"], ["type", "button", 1, "btn", "btn-outline", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"]], template: function ModalBaseComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c0);
        \u0275\u0275template(0, ModalBaseComponent_div_0_Template, 11, 13, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.show);
      }
    }, dependencies: [CommonModule, NgClass, NgIf], styles: ['\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(15, 23, 42, 0.75);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 20px;\n  overflow-y: auto;\n  opacity: 0;\n  animation: _ngcontent-%COMP%_fadeInOverlay 300ms ease-out forwards;\n  min-height: 100vh;\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 20px;\n  box-shadow:\n    0 20px 60px rgba(15, 23, 42, 0.15),\n    0 8px 25px rgba(15, 23, 42, 0.1),\n    0 0 0 1px rgba(255, 255, 255, 0.05);\n  width: 100%;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  position: relative;\n  transform: scale(0.9) translateY(20px);\n  opacity: 0;\n  animation: _ngcontent-%COMP%_slideInModal 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n  border: 1px solid rgba(226, 232, 240, 0.8);\n  margin: auto;\n  align-self: center;\n  justify-self: center;\n}\n.modal-sm[_ngcontent-%COMP%] {\n  max-width: 450px;\n  min-width: 350px;\n}\n.modal-md[_ngcontent-%COMP%] {\n  max-width: 600px;\n}\n.modal-lg[_ngcontent-%COMP%] {\n  max-width: 800px;\n}\n.modal-xl[_ngcontent-%COMP%] {\n  max-width: 1200px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 28px 32px 24px 32px;\n  border-bottom: 1px solid rgba(226, 232, 240, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(248, 250, 252, 0.8) 0%,\n      rgba(241, 245, 249, 0.9) 100%);\n  flex-shrink: 0;\n  position: relative;\n}\n.modal-header[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6 0%,\n      #6366f1 50%,\n      #8b5cf6 100%);\n  border-radius: 20px 20px 0 0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  letter-spacing: -0.025em;\n  background:\n    linear-gradient(\n      135deg,\n      #1e293b 0%,\n      #334155 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.modal-close-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: none;\n  background: rgba(248, 250, 252, 0.8);\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  border: 1px solid rgba(226, 232, 240, 0.8);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n}\n.modal-close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, 0.1);\n  color: #ef4444;\n  border-color: rgba(239, 68, 68, 0.2);\n  transform: scale(1.05);\n  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);\n}\n.modal-close-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 32px;\n  flex: 1;\n  overflow-y: auto;\n  position: relative;\n  background: rgba(255, 255, 255, 0.95);\n  font-size: 16px;\n  line-height: 1.6;\n  color: #374151;\n}\n.modal-body.loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 200px;\n}\n.modal-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  color: #667eea;\n}\n.modal-loading[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 24px 32px 28px 32px;\n  border-top: 1px solid rgba(226, 232, 240, 0.6);\n  background:\n    linear-gradient(\n      135deg,\n      rgba(248, 250, 252, 0.8) 0%,\n      rgba(241, 245, 249, 0.9) 100%);\n  display: flex;\n  justify-content: flex-end;\n  gap: 16px;\n  flex-shrink: 0;\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n}\n.default-footer-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 14px 28px;\n  border-radius: 14px;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  border: none;\n  text-decoration: none;\n  line-height: 1.5;\n  letter-spacing: -0.025em;\n  position: relative;\n  overflow: hidden;\n  min-width: 120px;\n  justify-content: center;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #3b82f6 0%,\n      #6366f1 100%);\n  color: white;\n  border: 1px solid transparent;\n  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3), 0 2px 6px rgba(59, 130, 246, 0.2);\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb 0%,\n      #4f46e5 100%);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(59, 130, 246, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3), 0 1px 4px rgba(59, 130, 246, 0.2);\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  color: #64748b;\n  border: 1px solid rgba(226, 232, 240, 0.8);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n}\n.btn-outline[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(248, 250, 252, 0.95);\n  border-color: rgba(148, 163, 184, 0.6);\n  color: #475569;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);\n}\n.btn-outline[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.05);\n}\n[_ngcontent-%COMP%]:global(body.modal-open) {\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_fadeInOverlay {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInModal {\n  from {\n    opacity: 0;\n    transform: scale(0.9) translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_modalFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_modalSlideIn {\n  from {\n    opacity: 0;\n    transform: scale(0.8) translateY(-50px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: -200px 0;\n  }\n  100% {\n    background-position: calc(200px + 100%) 0;\n  }\n}\n@media (max-width: 768px) {\n  .modal-overlay[_ngcontent-%COMP%] {\n    padding: 16px;\n    align-items: center;\n    justify-content: center;\n    min-height: 100vh;\n  }\n  .modal-container[_ngcontent-%COMP%] {\n    max-height: calc(100vh - 32px);\n    border-radius: 16px;\n    animation-duration: 350ms;\n    margin: auto;\n    align-self: center;\n    justify-self: center;\n    transform: scale(0.95) translateY(15px);\n  }\n  .modal-sm[_ngcontent-%COMP%] {\n    min-width: 300px;\n    max-width: calc(100vw - 32px);\n    width: 100%;\n  }\n  .modal-md[_ngcontent-%COMP%], .modal-lg[_ngcontent-%COMP%], .modal-xl[_ngcontent-%COMP%] {\n    max-width: none;\n    width: 100%;\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 20px 24px 18px 24px;\n  }\n  .modal-header[_ngcontent-%COMP%]::before {\n    height: 3px;\n  }\n  .modal-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .modal-close-btn[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n    font-size: 14px;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 24px;\n    font-size: 15px;\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding: 20px 24px 24px 24px;\n    gap: 12px;\n  }\n  .btn[_ngcontent-%COMP%] {\n    padding: 12px 24px;\n    font-size: 14px;\n    min-width: 100px;\n  }\n}\n@media (max-width: 480px) {\n  .modal-overlay[_ngcontent-%COMP%] {\n    padding: 12px;\n    align-items: center;\n    justify-content: center;\n    min-height: 100vh;\n  }\n  .modal-container[_ngcontent-%COMP%] {\n    max-height: calc(100vh - 24px);\n    border-radius: 12px;\n    margin: auto;\n    align-self: center;\n    justify-self: center;\n    transform: scale(0.98) translateY(10px);\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 16px 20px 14px 20px;\n  }\n  .modal-header[_ngcontent-%COMP%]::before {\n    height: 2px;\n  }\n  .modal-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .modal-close-btn[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: 13px;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 20px;\n    font-size: 14px;\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding: 16px 20px 20px 20px;\n    flex-direction: column-reverse;\n    gap: 10px;\n  }\n  .default-footer-buttons[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n    width: 100%;\n    gap: 10px;\n  }\n  .default-footer-buttons[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 12px 20px;\n    font-size: 14px;\n    min-width: auto;\n  }\n}\n.modal-container.error[_ngcontent-%COMP%] {\n  border-left: 4px solid #dc3545;\n}\n.modal-container.success[_ngcontent-%COMP%] {\n  border-left: 4px solid #28a745;\n}\n.modal-container.warning[_ngcontent-%COMP%] {\n  border-left: 4px solid #ffc107;\n}\n.modal-container.info[_ngcontent-%COMP%] {\n  border-left: 4px solid #17a2b8;\n}\n.modal-body[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.modal-body[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 4px;\n}\n.modal-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 4px;\n}\n.modal-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a1a1a1;\n}\n/*# sourceMappingURL=modal-base.component.css.map */'], data: { animation: [
      trigger("modalAnimation", [
        transition(":enter", [
          style({ opacity: 0 }),
          animate("200ms ease-in", style({ opacity: 1 }))
        ]),
        transition(":leave", [
          animate("200ms ease-out", style({ opacity: 0 }))
        ])
      ]),
      trigger("contentAnimation", [
        transition(":enter", [
          style({ opacity: 0, transform: "scale(0.8) translateY(-50px)" }),
          animate("250ms ease-out", style({ opacity: 1, transform: "scale(1) translateY(0)" }))
        ]),
        transition(":leave", [
          animate("200ms ease-in", style({ opacity: 0, transform: "scale(0.8) translateY(-50px)" }))
        ])
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ModalBaseComponent, { className: "ModalBaseComponent" });
})();

// src/app/shared/directives/business-days-only.directive.ts
var BusinessDaysOnlyDirective = class _BusinessDaysOnlyDirective {
  constructor(el) {
    this.el = el;
  }
  ngAfterViewInit() {
    this.addWeekendDisableStyles();
  }
  onClick(event) {
    const input = this.el.nativeElement;
    setTimeout(() => {
      this.disableWeekendDatesInCalendar();
    }, 100);
  }
  onFocus(event) {
    setTimeout(() => {
      this.disableWeekendDatesInCalendar();
    }, 100);
  }
  addWeekendDisableStyles() {
    const style2 = document.createElement("style");
    style2.textContent = `
      /* Estilos para deshabilitar fines de semana en calendarios de fecha */
      input[type="date"]::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
      }

      /* Deshabilitar visualmente los fines de semana cuando sea posible */
      .weekend-disabled {
        background-color: #f5f5f5 !important;
        color: #ccc !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
      }
    `;
    if (!document.head.querySelector("#business-days-styles")) {
      style2.id = "business-days-styles";
      document.head.appendChild(style2);
    }
  }
  disableWeekendDatesInCalendar() {
    const input = this.el.nativeElement;
    input.setAttribute("data-business-days-only", "true");
    input.setAttribute("title", "Solo se permiten d\xEDas h\xE1biles (lunes a viernes)");
  }
  static {
    this.\u0275fac = function BusinessDaysOnlyDirective_Factory(t) {
      return new (t || _BusinessDaysOnlyDirective)(\u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _BusinessDaysOnlyDirective, selectors: [["", "appBusinessDaysOnly", ""]], hostBindings: function BusinessDaysOnlyDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function BusinessDaysOnlyDirective_click_HostBindingHandler($event) {
          return ctx.onClick($event);
        })("focus", function BusinessDaysOnlyDirective_focus_HostBindingHandler($event) {
          return ctx.onFocus($event);
        });
      }
    }, standalone: true });
  }
};

// src/app/features/tramites/components/nuevo-tramite-modal/nuevo-tramite-modal.component.ts
var _c02 = ["signatureCanvas"];
function NuevoTramiteModalComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r2 = ctx.$implicit;
    \u0275\u0275property("value", tipo_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tipo_r2.nombre, " ");
  }
}
function NuevoTramiteModalComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["tipoId"], " ");
  }
}
function NuevoTramiteModalComponent_option_23_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prioridad_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" - ", prioridad_r4.descripcion, "");
  }
}
function NuevoTramiteModalComponent_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275template(2, NuevoTramiteModalComponent_option_23_span_2_Template, 2, 1, "span", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prioridad_r4 = ctx.$implicit;
    \u0275\u0275property("value", prioridad_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", prioridad_r4.nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", prioridad_r4.descripcion);
  }
}
function NuevoTramiteModalComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["prioridadId"], " ");
  }
}
function NuevoTramiteModalComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "label", 51);
    \u0275\u0275text(2, "\xC1rea de Origen");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 52);
    \u0275\u0275elementStart(4, "small", 21);
    \u0275\u0275text(5, " \xC1rea asignada a tu usuario (no modificable) ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.getAreaNombre(ctx_r2.nuevoTramite.areaOrigenId));
  }
}
function NuevoTramiteModalComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["asunto"], " ");
  }
}
function NuevoTramiteModalComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["descripcion"], " ");
  }
}
function NuevoTramiteModalComponent_div_65_div_4_i_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 68);
  }
}
function NuevoTramiteModalComponent_div_65_div_4_i_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 69);
  }
}
function NuevoTramiteModalComponent_div_65_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 58);
    \u0275\u0275template(2, NuevoTramiteModalComponent_div_65_div_4_i_2_Template, 1, 0, "i", 59)(3, NuevoTramiteModalComponent_div_65_div_4_i_3_Template, 1, 0, "i", 60);
    \u0275\u0275elementStart(4, "div", 61)(5, "span", 62);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 63);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 64)(10, "input", 65);
    \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_div_65_div_4_Template_input_ngModelChange_10_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.documentosAdjuntos[i_r6].descripcion, $event) || (ctx_r2.documentosAdjuntos[i_r6].descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 66);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_65_div_4_Template_button_click_11_listener() {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.eliminarArchivo(i_r6));
    });
    \u0275\u0275element(12, "i", 67);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const archivo_r7 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", archivo_r7.type === "application/pdf");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", archivo_r7.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(archivo_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatearTamanioArchivo(archivo_r7.size));
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("name", "descripcion_", i_r6, "");
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.documentosAdjuntos[i_r6].descripcion);
  }
}
function NuevoTramiteModalComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "h4", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 55);
    \u0275\u0275template(4, NuevoTramiteModalComponent_div_65_div_4_Template, 13, 7, "div", 56);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Archivos Seleccionados (", ctx_r2.archivosSeleccionados.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.archivosSeleccionados);
  }
}
function NuevoTramiteModalComponent_div_85_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r9 = ctx.$implicit;
    \u0275\u0275property("value", tipo_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tipo_r9.label, " ");
  }
}
function NuevoTramiteModalComponent_div_85_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["tipoFirma"], " ");
  }
}
function NuevoTramiteModalComponent_div_85_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const depto_r10 = ctx.$implicit;
    \u0275\u0275property("value", depto_r10.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", depto_r10.label, " ");
  }
}
function NuevoTramiteModalComponent_div_85_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["ubicacionFirma"], " ");
  }
}
function NuevoTramiteModalComponent_div_85_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["razonFirma"], " ");
  }
}
function NuevoTramiteModalComponent_div_85_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["firmaDigital"], " ");
  }
}
function NuevoTramiteModalComponent_div_85_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 103)(1, "label", 29);
    \u0275\u0275element(2, "i", 104);
    \u0275\u0275text(3, " Firma Capturada ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 105);
    \u0275\u0275element(5, "img", 106);
    \u0275\u0275elementStart(6, "button", 107);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_85_div_37_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.clearCanvas();
      return \u0275\u0275resetView(ctx_r2.firmaDigitalData = null);
    });
    \u0275\u0275element(7, "i", 108);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("src", ctx_r2.firmaDigitalData, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.loading);
  }
}
function NuevoTramiteModalComponent_div_85_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.errors["consentimientoFirma"], " ");
  }
}
function NuevoTramiteModalComponent_div_85_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 71)(2, "div", 72)(3, "label", 73);
    \u0275\u0275element(4, "i", 74);
    \u0275\u0275text(5, " Tipo de Firma ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "select", 75);
    \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_div_85_Template_select_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.tipoFirma, $event) || (ctx_r2.tipoFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(7, NuevoTramiteModalComponent_div_85_option_7_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, NuevoTramiteModalComponent_div_85_div_8_Template, 2, 1, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 72)(10, "label", 76);
    \u0275\u0275element(11, "i", 77);
    \u0275\u0275text(12, " Departamento ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 78);
    \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_div_85_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.ubicacionFirma, $event) || (ctx_r2.ubicacionFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(14, NuevoTramiteModalComponent_div_85_option_14_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, NuevoTramiteModalComponent_div_85_div_15_Template, 2, 1, "div", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 79)(17, "label", 80);
    \u0275\u0275element(18, "i", 81);
    \u0275\u0275text(19, " Raz\xF3n de la Firma ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_div_85_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.razonFirma, $event) || (ctx_r2.razonFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, NuevoTramiteModalComponent_div_85_div_21_Template, 2, 1, "div", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 83)(23, "label", 29);
    \u0275\u0275element(24, "i", 84);
    \u0275\u0275text(25, " Dibuje su Firma ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 85);
    \u0275\u0275element(27, "canvas", 86, 1);
    \u0275\u0275elementStart(29, "div", 87)(30, "button", 88);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_85_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearCanvas());
    });
    \u0275\u0275element(31, "i", 89);
    \u0275\u0275text(32, " Limpiar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 90);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_85_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.captureSignature());
    });
    \u0275\u0275element(34, "i", 91);
    \u0275\u0275text(35, " Capturar ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(36, NuevoTramiteModalComponent_div_85_div_36_Template, 2, 1, "div", 92)(37, NuevoTramiteModalComponent_div_85_div_37_Template, 8, 2, "div", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 94)(39, "label", 95)(40, "input", 96);
    \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_div_85_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.consentimientoFirma, $event) || (ctx_r2.consentimientoFirma = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 97);
    \u0275\u0275element(42, "i", 98);
    \u0275\u0275text(43, " Confirmo que he dibujado mi firma digital y acepto que este tr\xE1mite sea firmado electr\xF3nicamente bajo mi responsabilidad ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(44, NuevoTramiteModalComponent_div_85_div_44_Template, 2, 1, "div", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 99)(46, "div", 100);
    \u0275\u0275element(47, "i", 7);
    \u0275\u0275elementStart(48, "div", 101)(49, "strong");
    \u0275\u0275text(50, "Informaci\xF3n sobre la Firma Digital:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "ul")(52, "li");
    \u0275\u0275text(53, "Su firma ser\xE1 asociada con su usuario y ser\xE1 auditable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "li");
    \u0275\u0275text(55, "Se registrar\xE1 la fecha, hora y ubicaci\xF3n de la firma");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "li");
    \u0275\u0275text(57, "El tr\xE1mite firmado tendr\xE1 validez legal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "li");
    \u0275\u0275text(59, "No podr\xE1 ser modificado despu\xE9s de ser creado");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("required", ctx_r2.requiereFirmaDigital);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r2.errors["tipoFirma"]);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.tipoFirma);
    \u0275\u0275property("disabled", ctx_r2.loading)("required", ctx_r2.requiereFirmaDigital);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.tiposFirmaCreacion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.errors["tipoFirma"]);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("required", ctx_r2.requiereFirmaDigital);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r2.errors["ubicacionFirma"]);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.ubicacionFirma);
    \u0275\u0275property("disabled", ctx_r2.loading)("required", ctx_r2.requiereFirmaDigital);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.departamentosPeru);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.errors["ubicacionFirma"]);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("required", ctx_r2.requiereFirmaDigital);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r2.errors["razonFirma"]);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.razonFirma);
    \u0275\u0275property("required", ctx_r2.requiereFirmaDigital)("disabled", ctx_r2.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.errors["razonFirma"]);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("required", ctx_r2.requiereFirmaDigital);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("has-signature", ctx_r2.signatureExists)("is-invalid", ctx_r2.errors["firmaDigital"]);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.loading);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.loading || !ctx_r2.signatureExists);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r2.errors["firmaDigital"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.firmaDigitalData);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-invalid", ctx_r2.errors["consentimientoFirma"]);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.consentimientoFirma);
    \u0275\u0275property("disabled", ctx_r2.loading)("required", ctx_r2.requiereFirmaDigital);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r2.errors["consentimientoFirma"]);
  }
}
function NuevoTramiteModalComponent_div_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 109);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_86_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCancelSignature());
    });
    \u0275\u0275elementStart(1, "div", 110);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_86_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 111)(3, "div", 112);
    \u0275\u0275element(4, "i", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6, "Confirmaci\xF3n de Firma Digital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 113);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_86_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCancelSignature());
    });
    \u0275\u0275element(8, "i", 108);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 114)(10, "div", 115)(11, "div", 116)(12, "h3");
    \u0275\u0275element(13, "i", 98);
    \u0275\u0275text(14, " Declaraci\xF3n de Responsabilidad ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 117)(16, "p")(17, "strong");
    \u0275\u0275text(18, "Al proceder con la firma digital, usted declara y acepta que:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "ul")(20, "li");
    \u0275\u0275text(21, "Es el titular autorizado de esta cuenta y tiene la capacidad legal para firmar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "li");
    \u0275\u0275text(23, "La informaci\xF3n proporcionada en este tr\xE1mite es veraz y completa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "li");
    \u0275\u0275text(25, "Comprende que la firma digital tiene plena validez legal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "li");
    \u0275\u0275text(27, "Se responsabiliza por todas las acciones realizadas con su firma digital");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "li");
    \u0275\u0275text(29, "Acepta que el documento firmado no podr\xE1 ser modificado posteriormente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "li");
    \u0275\u0275text(31, "Autoriza el registro de fecha, hora y ubicaci\xF3n de la firma para fines de auditor\xEDa");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "div", 118)(33, "h4");
    \u0275\u0275element(34, "i", 119);
    \u0275\u0275text(35, " T\xE9rminos y Condiciones de Firma Digital ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 120)(37, "p");
    \u0275\u0275text(38, "\u2022 Su firma ser\xE1 asociada permanentemente con su usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p");
    \u0275\u0275text(40, "\u2022 El tr\xE1mite firmado tendr\xE1 validez legal ante cualquier instancia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "p");
    \u0275\u0275text(42, "\u2022 Se generar\xE1 un registro de auditor\xEDa inmutable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p");
    \u0275\u0275text(44, "\u2022 No podr\xE1 negar la autor\xEDa del documento firmado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "p");
    \u0275\u0275text(46, "\u2022 Cualquier uso indebido de la firma digital ser\xE1 responsabilidad exclusiva del usuario");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(47, "div", 121);
    \u0275\u0275element(48, "i", 122);
    \u0275\u0275elementStart(49, "strong");
    \u0275\u0275text(50, "IMPORTANTE:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(51, " Solo proceda si est\xE1 completamente seguro de su decisi\xF3n. Esta acci\xF3n es irreversible. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 123)(53, "button", 124);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_86_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCancelSignature());
    });
    \u0275\u0275element(54, "i", 108);
    \u0275\u0275text(55, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 125);
    \u0275\u0275listener("click", function NuevoTramiteModalComponent_div_86_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onConfirmSignature());
    });
    \u0275\u0275element(57, "i", 84);
    \u0275\u0275text(58, " Acepto y Deseo Firmar ");
    \u0275\u0275elementEnd()()()();
  }
}
var NuevoTramiteModalComponent = class _NuevoTramiteModalComponent {
  constructor(tramiteService, toastService, organigramaService, authService, http) {
    this.tramiteService = tramiteService;
    this.toastService = toastService;
    this.organigramaService = organigramaService;
    this.authService = authService;
    this.http = http;
    this.show = false;
    this.modoEdicion = false;
    this.tramiteParaEditar = null;
    this.close = new EventEmitter();
    this.tramiteCreado = new EventEmitter();
    this.tramiteActualizado = new EventEmitter();
    this.nuevoTramite = {
      asunto: "",
      descripcion: "",
      observaciones: "",
      fechaInicio: "",
      prioridadId: 1
      // Valor por defecto: NORMAL
    };
    this.tiposTramite = [];
    this.prioridadesTramite = [];
    this.areasDisponibles = [];
    this.loading = false;
    this.archivosSeleccionados = [];
    this.documentosAdjuntos = [];
    this.requiereFirmaDigital = false;
    this.tipoFirma = "CONFORMIDAD";
    this.razonFirma = "";
    this.ubicacionFirma = "LIMA";
    this.firmaDigitalData = null;
    this.consentimientoFirma = false;
    this.signatureExists = false;
    this.showConfirmationModal = false;
    this.pendingFormData = null;
    this.tiposFirmaCreacion = [];
    this.departamentosPeru = [];
    this.errors = {};
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.subscriptions = new Subscription();
  }
  ngOnInit() {
    this.cargarDatosCatalogo();
    this.cargarAreas();
    this.cargarTiposFirmaBackend();
    this.cargarDepartamentosBackend();
    if (this.modoEdicion && this.tramiteParaEditar) {
      this.cargarDatosTramiteParaEdicion();
    } else {
      this.resetForm();
    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  cargarDatosCatalogo() {
    this.subscriptions.add(this.tramiteService.getTiposTramite().subscribe((tipos) => this.tiposTramite = tipos));
    this.subscriptions.add(this.tramiteService.getPrioridadesTramite().subscribe((prioridades) => this.prioridadesTramite = prioridades));
  }
  cargarAreas() {
    this.subscriptions.add(this.organigramaService.obtenerAreasPlanas().subscribe((areas) => {
      this.areasDisponibles = areas;
      this.configurarAreaSegunRol();
    }));
  }
  cargarTiposFirmaBackend() {
    this.subscriptions.add(this.http.get(`${environment.apiUrl}/api/departamentos/tipos-firma`).subscribe({
      next: (tipos) => {
        const currentUser = this.authService.currentUserValue;
        const roleName = currentUser?.role?.name?.toUpperCase();
        let tiposFiltrados = tipos;
        if (roleName === "ESTUDIANTE") {
          tiposFiltrados = tipos.filter((tipo) => tipo.codigo === "SIMPLE");
        } else {
          tiposFiltrados = tipos.filter((tipo) => tipo.codigo !== "SIMPLE");
        }
        this.tiposFirmaCreacion = tiposFiltrados.map((tipo) => ({
          value: tipo.codigo,
          label: this.capitalizarPalabras(tipo.descripcion)
        }));
        if (this.tiposFirmaCreacion.length > 0) {
          this.tipoFirma = this.tiposFirmaCreacion[0].value;
        }
      },
      error: (error) => {
        this.toastService.warning("Advertencia", "No se pudieron cargar los tipos de firma. Usando valores por defecto.");
      }
    }));
  }
  cargarDepartamentosBackend() {
    this.subscriptions.add(this.http.get(`${environment.apiUrl}/api/departamentos`).subscribe({
      next: (departamentos) => {
        this.departamentosPeru = departamentos.map((dept) => ({
          value: dept.codigo,
          label: dept.nombre
        }));
        const lima = this.departamentosPeru.find((d) => d.value === "LIMA");
        if (lima) {
          this.ubicacionFirma = lima.value;
        } else if (this.departamentosPeru.length > 0) {
          this.ubicacionFirma = this.departamentosPeru[0].value;
        }
      },
      error: (error) => {
        this.toastService.warning("Advertencia", "No se pudieron cargar los departamentos. Usando valores por defecto.");
      }
    }));
  }
  capitalizarPalabras(texto) {
    return texto.split(" ").map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()).join(" ");
  }
  configurarAreaSegunRol() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.role?.name === "USUARIO" && currentUser.area?.id) {
      this.nuevoTramite.areaOrigenId = currentUser.area.id;
    }
  }
  cargarDatosTramiteParaEdicion() {
    if (!this.tramiteParaEditar)
      return;
    this.nuevoTramite = {
      id: this.tramiteParaEditar.id,
      asunto: this.tramiteParaEditar.asunto || "",
      descripcion: this.tramiteParaEditar.descripcion || "",
      observaciones: this.tramiteParaEditar.observaciones || "",
      tipoId: this.tramiteParaEditar.tipo?.id || this.tramiteParaEditar.tipoId,
      prioridadId: this.tramiteParaEditar.prioridad?.id || this.tramiteParaEditar.prioridadId,
      areaOrigenId: this.tramiteParaEditar.areaOrigen?.id || this.tramiteParaEditar.areaOrigenId,
      fechaInicio: this.tramiteParaEditar.fechaCreacion ? this.tramiteParaEditar.fechaCreacion.split("T")[0] : this.getCurrentDate(),
      numeroExpediente: this.tramiteParaEditar.numeroExpediente || ""
    };
    if (this.tramiteParaEditar.firmaDigitalActiva) {
      this.requiereFirmaDigital = true;
      this.tipoFirma = this.tramiteParaEditar.tipoFirma || "CONFORMIDAD";
      this.razonFirma = this.tramiteParaEditar.razonFirma || `Edici\xF3n de tr\xE1mite - ${this.nuevoTramite.asunto}`;
      this.ubicacionFirma = this.tramiteParaEditar.ubicacionFirma || "LIMA";
      if (this.tramiteParaEditar.hashFirma) {
        this.firmaDigitalData = this.tramiteParaEditar.hashFirma;
        this.signatureExists = true;
        this.consentimientoFirma = true;
      }
    } else {
      this.requiereFirmaDigital = false;
    }
    this.archivosSeleccionados = [];
    this.documentosAdjuntos = [];
    this.errors = {};
  }
  resetForm() {
    const currentUser = this.authService.currentUserValue;
    let areaOrigenId = void 0;
    if (currentUser?.role?.name === "USUARIO" && currentUser.area?.id) {
      areaOrigenId = currentUser.area.id;
    }
    this.nuevoTramite = {
      asunto: "",
      descripcion: "",
      observaciones: "",
      fechaInicio: this.getCurrentDate(),
      areaOrigenId,
      prioridadId: 1
    };
    this.archivosSeleccionados = [];
    this.documentosAdjuntos = [];
    this.requiereFirmaDigital = false;
    this.tipoFirma = "CONFORMIDAD";
    this.razonFirma = "";
    this.ubicacionFirma = "LIMA";
    this.firmaDigitalData = null;
    this.consentimientoFirma = false;
    this.signatureExists = false;
    this.showConfirmationModal = false;
    this.pendingFormData = null;
    this.errors = {};
  }
  onFileSelected(event) {
    const input = event.target;
    if (input.files) {
      const nuevosArchivos = Array.from(input.files);
      if (this.archivosSeleccionados.length + nuevosArchivos.length > 3) {
        this.toastService.error("L\xEDmite de archivos excedido", "Solo se permiten m\xE1ximo 3 archivos por tr\xE1mite");
        input.value = "";
        return;
      }
      for (const archivo of nuevosArchivos) {
        if (this.validarArchivo(archivo)) {
          this.archivosSeleccionados.push(archivo);
          this.documentosAdjuntos.push({
            nombre: archivo.name,
            tipo: archivo.type,
            tamano: archivo.size,
            descripcion: ""
          });
        }
      }
      input.value = "";
    }
  }
  validarArchivo(archivo) {
    const tiposPermitidos = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const tamanioMaximo = 50 * 1024 * 1024;
    if (!tiposPermitidos.includes(archivo.type)) {
      this.toastService.error("Tipo de archivo no v\xE1lido", "Solo se permiten archivos PDF y DOCX");
      return false;
    }
    if (archivo.size > tamanioMaximo) {
      this.toastService.error("Archivo muy grande", `El archivo no debe superar los 50MB. Tama\xF1o actual: ${(archivo.size / 1024 / 1024).toFixed(2)}MB`);
      return false;
    }
    return true;
  }
  eliminarArchivo(index) {
    this.archivosSeleccionados.splice(index, 1);
    this.documentosAdjuntos.splice(index, 1);
  }
  validarFormulario() {
    this.errors = {};
    let esValido = true;
    if (this.modoEdicion) {
      return true;
    }
    if (!this.nuevoTramite.asunto?.trim()) {
      this.errors["asunto"] = "El asunto es obligatorio";
      esValido = false;
    }
    if (!this.nuevoTramite.tipoId) {
      this.errors["tipoId"] = "Debe seleccionar un tipo de tr\xE1mite";
      esValido = false;
    }
    return esValido;
  }
  validarFirmaDigital() {
    if (!this.requiereFirmaDigital) {
      return true;
    }
    let esValido = true;
    if (!this.tipoFirma) {
      this.errors["tipoFirma"] = "Debe seleccionar un tipo de firma";
      esValido = false;
    }
    if (!this.ubicacionFirma) {
      this.errors["ubicacionFirma"] = "Debe seleccionar un departamento";
      esValido = false;
    }
    if (!this.razonFirma?.trim()) {
      this.errors["razonFirma"] = "Debe indicar la raz\xF3n de la firma";
      esValido = false;
    }
    if (!this.consentimientoFirma) {
      this.errors["consentimientoFirma"] = "Debe aceptar los t\xE9rminos y condiciones";
      esValido = false;
    }
    if (!this.signatureExists || !this.firmaDigitalData) {
      this.errors["firmaDigital"] = "Debe dibujar su firma y presionar Capturar";
      esValido = false;
    }
    return esValido;
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (!this.validarFormulario()) {
        this.toastService.warning("Formulario incompleto", "Por favor, complete todos los campos obligatorios");
        return;
      }
      if (this.loading) {
        return;
      }
      try {
        const archivosBase64 = yield this.procesarArchivosABase64();
        const tramiteData = {
          tipoTramiteId: Number(this.nuevoTramite.tipoId),
          asunto: this.nuevoTramite.asunto,
          descripcion: this.nuevoTramite.descripcion,
          prioridadId: Number(this.nuevoTramite.prioridadId),
          observaciones: this.nuevoTramite.observaciones,
          documentos: archivosBase64,
          requiereFirmaDigital: this.requiereFirmaDigital
        };
        if (this.requiereFirmaDigital) {
          tramiteData.tipoFirma = this.tipoFirma;
          tramiteData.razonFirma = this.razonFirma;
          tramiteData.ubicacionFirma = this.ubicacionFirma;
          tramiteData.consentimientoFirma = this.consentimientoFirma;
          tramiteData.firmaDigitalData = this.firmaDigitalData;
        }
        if (this.isUsuarioRole && this.nuevoTramite.areaOrigenId) {
          tramiteData.areaOrigenId = Number(this.nuevoTramite.areaOrigenId);
        }
        if (this.requiereFirmaDigital) {
          if (!this.validarFirmaDigital()) {
            return;
          }
          this.submitTramite(tramiteData);
        } else {
          this.submitTramite(tramiteData);
        }
      } catch (error) {
        this.toastService.error("Error", "Ocurri\xF3 un error inesperado al procesar los archivos");
      }
    });
  }
  submitTramite(tramiteData) {
    this.loading = true;
    if (this.modoEdicion && this.tramiteParaEditar?.id) {
      this.subscriptions.add(this.tramiteService.actualizarTramiteConArchivos(this.tramiteParaEditar.id, tramiteData).subscribe({
        next: (tramiteActualizado) => {
          this.loading = false;
          this.toastService.success("Tr\xE1mite actualizado", `El tr\xE1mite ${tramiteActualizado.codigo} ha sido actualizado exitosamente`);
          this.tramiteActualizado.emit(tramiteActualizado);
          this.onClose();
        },
        error: (error) => {
          this.loading = false;
          this.toastService.error("Error", "No se pudo actualizar el tr\xE1mite. Int\xE9ntelo nuevamente.");
        }
      }));
    } else {
      this.subscriptions.add(this.tramiteService.crearTramiteConArchivos(tramiteData).subscribe({
        next: (tramiteCreado) => {
          this.loading = false;
          this.toastService.success("Tr\xE1mite creado", `El tr\xE1mite ${tramiteCreado.codigo} y sus documentos han sido creados exitosamente`);
          this.tramiteCreado.emit(tramiteCreado);
          this.onClose();
        },
        error: (error) => {
          this.loading = false;
          this.toastService.error("Error", "No se pudo crear el tr\xE1mite con los archivos. Int\xE9ntelo nuevamente.");
        }
      }));
    }
  }
  onClose() {
    this.resetForm();
    this.close.emit();
  }
  onCancel() {
    this.onClose();
  }
  getTipoTramiteNombre(tipoId) {
    const tipo = this.tiposTramite.find((t) => t.id === tipoId);
    return tipo?.nombre || "";
  }
  getPrioridadNombre(prioridadId) {
    const prioridad = this.prioridadesTramite.find((p) => p.id === prioridadId);
    return prioridad?.nombre || "";
  }
  formatearTamanioArchivo(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  getCurrentDate() {
    const today = /* @__PURE__ */ new Date();
    return today.toISOString().split("T")[0];
  }
  getAreaNombre(areaId) {
    const area = this.areasDisponibles.find((a) => a.id === areaId);
    return area?.nombre || "";
  }
  get isUsuarioRole() {
    const currentUser = this.authService.currentUserValue;
    return currentUser?.role?.name === "USUARIO";
  }
  get isEstudianteRole() {
    const currentUser = this.authService.currentUserValue;
    return currentUser?.role?.name === "ESTUDIANTE";
  }
  procesarArchivosABase64() {
    return __async(this, null, function* () {
      const archivosBase64 = [];
      for (let i = 0; i < this.archivosSeleccionados.length; i++) {
        const archivo = this.archivosSeleccionados[i];
        const descripcion = this.documentosAdjuntos[i]?.descripcion || "";
        try {
          const base64 = yield this.convertirArchivoABase64(archivo);
          archivosBase64.push({
            nombre: archivo.name,
            tipo: archivo.type,
            tamano: archivo.size,
            contenido: base64,
            descripcion
          });
        } catch (error) {
          throw new Error(`No se pudo procesar el archivo ${archivo.name}`);
        }
      }
      return archivosBase64;
    });
  }
  convertirArchivoABase64(archivo) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = () => {
        reject(new Error("Error al leer el archivo"));
      };
      reader.readAsDataURL(archivo);
    });
  }
  resetFirmaDigitalForm() {
    if (this.tiposFirmaCreacion.length > 0) {
      this.tipoFirma = this.tiposFirmaCreacion[0].value;
    } else {
      this.tipoFirma = "CONFORMIDAD";
    }
    if (this.modoEdicion) {
      this.razonFirma = `Modificaci\xF3n de tr\xE1mite - ${this.nuevoTramite.asunto || "Edici\xF3n de tr\xE1mite"}`;
    } else {
      this.razonFirma = `Creaci\xF3n de tr\xE1mite - ${this.nuevoTramite.asunto || "Nuevo tr\xE1mite"}`;
    }
    if (this.departamentosPeru.length > 0) {
      const lima = this.departamentosPeru.find((d) => d.value === "LIMA");
      this.ubicacionFirma = lima ? lima.value : this.departamentosPeru[0].value;
    } else {
      this.ubicacionFirma = "LIMA";
    }
    this.firmaDigitalData = null;
    this.consentimientoFirma = false;
    this.signatureExists = false;
  }
  clearFirmaDigitalData() {
    this.clearCanvas();
    this.firmaDigitalData = null;
    this.consentimientoFirma = false;
    this.signatureExists = false;
  }
  onConfirmSignature() {
    if (!this.validarFirmaDigital()) {
      return;
    }
    this.showConfirmationModal = false;
    if (this.pendingFormData) {
      this.submitTramite(this.pendingFormData);
      this.pendingFormData = null;
    }
  }
  onCancelSignature() {
    this.showConfirmationModal = false;
    this.pendingFormData = null;
  }
  onProceedToSignature() {
    this.showConfirmationModal = false;
    this.toastService.info("Complete su firma", 'Dibuje su firma en el \xE1rea designada y luego haga clic en "Capturar"');
    setTimeout(() => {
      this.initializeCanvas();
    }, 100);
  }
  ngAfterViewInit() {
    if (this.signatureCanvas && this.requiereFirmaDigital) {
      this.initializeCanvas();
    }
  }
  initializeCanvas() {
    if (!this.signatureCanvas)
      return;
    this.canvas = this.signatureCanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 400;
    this.canvas.height = 150;
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.canvas.addEventListener("mousedown", this.startDrawing.bind(this));
    this.canvas.addEventListener("mousemove", this.draw.bind(this));
    this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    this.canvas.addEventListener("touchstart", this.startDrawingTouch.bind(this));
    this.canvas.addEventListener("touchmove", this.drawTouch.bind(this));
    this.canvas.addEventListener("touchend", this.stopDrawing.bind(this));
  }
  startDrawing(e) {
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
  }
  draw(e) {
    if (!this.isDrawing)
      return;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.startX = x;
    this.startY = y;
    this.signatureExists = true;
  }
  stopDrawing() {
    this.isDrawing = false;
  }
  startDrawingTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.isDrawing = true;
    this.startX = touch.clientX - rect.left;
    this.startY = touch.clientY - rect.top;
  }
  drawTouch(e) {
    e.preventDefault();
    if (!this.isDrawing)
      return;
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.startX = x;
    this.startY = y;
    this.signatureExists = true;
  }
  clearCanvas() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.signatureExists = false;
      this.firmaDigitalData = null;
    }
  }
  captureSignature() {
    if (this.canvas && this.signatureExists) {
      this.firmaDigitalData = this.canvas.toDataURL("image/png");
      this.toastService.success("Firma capturada", "Su firma ha sido capturada exitosamente");
    }
  }
  onCheckboxChange(event) {
    const checkbox = event.target;
    this.requiereFirmaDigital = checkbox.checked;
    if (this.requiereFirmaDigital) {
      this.resetFirmaDigitalForm();
      this.toastService.info("Firma digital activada", "Complete los datos de la firma digital");
      setTimeout(() => {
        this.initializeCanvas();
      }, 100);
    } else {
      this.clearFirmaDigitalData();
    }
  }
  static {
    this.\u0275fac = function NuevoTramiteModalComponent_Factory(t) {
      return new (t || _NuevoTramiteModalComponent)(\u0275\u0275directiveInject(TramiteService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(OrganigramaService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(HttpClient));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NuevoTramiteModalComponent, selectors: [["app-nuevo-tramite-modal"]], viewQuery: function NuevoTramiteModalComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.signatureCanvas = _t.first);
      }
    }, inputs: { show: "show", modoEdicion: "modoEdicion", tramiteParaEditar: "tramiteParaEditar" }, outputs: { close: "close", tramiteCreado: "tramiteCreado", tramiteActualizado: "tramiteActualizado" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 87, vars: 41, consts: [["tramiteForm", "ngForm"], ["signatureCanvas", ""], ["size", "lg", 3, "close", "cancel", "confirm", "show", "title", "loading", "showFooter"], [1, "modal-content"], [3, "ngSubmit"], [1, "form-section"], [1, "section-title"], [1, "fas", "fa-info-circle"], [1, "form-row"], [1, "form-group", 3, "ngClass"], ["for", "tipoTramite", 1, "form-label"], ["id", "tipoTramite", "name", "tipoTramite", 1, "form-control", 3, "ngModelChange", "ngModel", "required"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "invalid-feedback", 4, "ngIf"], ["for", "prioridad", 1, "form-label"], ["id", "prioridad", "name", "prioridad", 1, "form-control", 3, "ngModelChange", "ngModel"], ["class", "form-group col-md-4", 4, "ngIf"], [1, "form-group", "col-md-12"], ["for", "fechaInicio", 1, "form-label"], ["type", "date", "id", "fechaInicio", "name", "fechaInicio", "readonly", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-text", "text-muted"], [1, "form-text", "text-info"], [1, "form-group"], ["for", "asunto", 1, "form-label"], ["type", "text", "id", "asunto", "name", "asunto", "placeholder", "Ingrese el asunto del tr\xE1mite", "maxlength", "200", 1, "form-control", 3, "ngModelChange", "ngModel", "required"], ["for", "descripcion", 1, "form-label"], ["id", "descripcion", "name", "descripcion", "placeholder", "Describa detalladamente el tr\xE1mite (opcional)", "rows", "4", "maxlength", "1000", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "fas", "fa-paperclip"], [1, "form-label"], [1, "file-upload-area"], ["type", "file", "id", "archivos", "multiple", "", "accept", ".pdf,.docx", 1, "file-input", 3, "change"], ["for", "archivos", 1, "file-upload-label"], [1, "fas", "fa-cloud-upload-alt"], ["class", "selected-files", 4, "ngIf"], [1, "fas", "fa-comment-alt"], ["for", "observaciones", 1, "form-label"], ["id", "observaciones", "name", "observaciones", "placeholder", "Informaci\xF3n adicional relevante para el tr\xE1mite", "rows", "3", "maxlength", "500", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-section", "signature-section"], [1, "signature-header"], [1, "fas", "fa-signature"], [1, "signature-toggle"], ["type", "checkbox", "id", "requiereFirmaDigitalCrear", 3, "change", "checked", "disabled"], ["for", "requiereFirmaDigitalCrear", 1, "toggle-label"], ["class", "signature-config", "style", "animation: slideDown 0.3s ease-out;", 4, "ngIf"], ["class", "confirmation-modal-overlay", 3, "click", 4, "ngIf"], [3, "value"], [1, "invalid-feedback"], ["class", "text-muted", 4, "ngIf"], [1, "text-muted"], [1, "form-group", "col-md-4"], ["for", "areaOrigen", 1, "form-label"], ["type", "text", "id", "areaOrigen", "name", "areaOrigen", "readonly", "", 1, "form-control", 3, "value"], [1, "selected-files"], [1, "files-title"], [1, "file-list"], ["class", "file-item", 4, "ngFor", "ngForOf"], [1, "file-item"], [1, "file-info"], ["class", "fas fa-file-pdf", 4, "ngIf"], ["class", "fas fa-file-word", 4, "ngIf"], [1, "file-details"], [1, "file-name"], [1, "file-size"], [1, "file-actions"], ["type", "text", "placeholder", "Descripci\xF3n del documento (opcional)", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel", "name"], ["type", "button", 1, "btn", "btn-sm", "btn-danger", 3, "click"], [1, "fas", "fa-trash"], [1, "fas", "fa-file-pdf"], [1, "fas", "fa-file-word"], [1, "signature-config", 2, "animation", "slideDown 0.3s ease-out"], [1, "signature-row"], [1, "signature-field"], ["for", "tipoFirmaCrear", 1, "form-label"], [1, "fas", "fa-certificate"], ["id", "tipoFirmaCrear", "name", "tipoFirmaCrear", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled", "required"], ["for", "ubicacionFirmaCrear", 1, "form-label"], [1, "fas", "fa-map-marker-alt"], ["id", "ubicacionFirmaCrear", "name", "ubicacionFirmaCrear", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled", "required"], [1, "signature-field", "full-width"], ["for", "razonFirmaCrear", 1, "form-label"], [1, "fas", "fa-comment"], ["type", "text", "id", "razonFirmaCrear", "name", "razonFirmaCrear", "placeholder", "Motivo por el cual se firma este tr\xE1mite", 1, "form-control", 3, "ngModelChange", "ngModel", "required", "disabled"], [1, "signature-canvas-container"], [1, "fas", "fa-pen-fancy"], [1, "canvas-wrapper"], [1, "signature-canvas"], [1, "canvas-controls"], ["type", "button", 1, "btn-canvas", "clear", 3, "click", "disabled"], [1, "fas", "fa-eraser"], ["type", "button", 1, "btn-canvas", "capture", 3, "click", "disabled"], [1, "fas", "fa-save"], ["class", "invalid-feedback", "style", "display: block;", 4, "ngIf"], ["class", "signature-preview", 4, "ngIf"], [1, "signature-consent"], [1, "consent-label"], ["type", "checkbox", "name", "consentimientoFirma", 3, "ngModelChange", "ngModel", "disabled", "required"], [1, "consent-text"], [1, "fas", "fa-shield-alt"], [1, "signature-info"], [1, "info-box"], [1, "info-content"], [1, "invalid-feedback", 2, "display", "block"], [1, "signature-preview"], [1, "fas", "fa-eye"], [1, "preview-container"], ["alt", "Firma digital capturada", 1, "signature-image", 3, "src"], ["type", "button", 1, "btn-remove-signature", 3, "click", "disabled"], [1, "fas", "fa-times"], [1, "confirmation-modal-overlay", 3, "click"], [1, "confirmation-modal-container", 3, "click"], [1, "confirmation-modal-header"], [1, "header-icon"], ["type", "button", 1, "close-btn", 3, "click"], [1, "confirmation-modal-body"], [1, "confirmation-content"], [1, "declaration-box"], [1, "declaration-text"], [1, "terms-box"], [1, "fas", "fa-file-contract"], [1, "terms-content"], [1, "warning-box"], [1, "fas", "fa-exclamation-triangle"], [1, "confirmation-modal-footer"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "button", 1, "btn-proceed", 3, "click"]], template: function NuevoTramiteModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "app-modal-base", 2);
        \u0275\u0275listener("close", function NuevoTramiteModalComponent_Template_app_modal_base_close_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onClose());
        })("cancel", function NuevoTramiteModalComponent_Template_app_modal_base_cancel_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onCancel());
        })("confirm", function NuevoTramiteModalComponent_Template_app_modal_base_confirm_0_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275elementStart(1, "div", 3)(2, "form", 4, 0);
        \u0275\u0275listener("ngSubmit", function NuevoTramiteModalComponent_Template_form_ngSubmit_2_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275elementStart(4, "div", 5)(5, "h3", 6);
        \u0275\u0275element(6, "i", 7);
        \u0275\u0275text(7, " Informaci\xF3n B\xE1sica ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 8)(9, "div", 9)(10, "label", 10);
        \u0275\u0275text(11, "Tipo de Tr\xE1mite");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "select", 11);
        \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_Template_select_ngModelChange_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.nuevoTramite.tipoId, $event) || (ctx.nuevoTramite.tipoId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementStart(13, "option", 12);
        \u0275\u0275text(14, "Seleccione un tipo");
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, NuevoTramiteModalComponent_option_15_Template, 2, 2, "option", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(16, NuevoTramiteModalComponent_div_16_Template, 2, 1, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 9)(18, "label", 15);
        \u0275\u0275text(19, "Prioridad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "select", 16);
        \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_Template_select_ngModelChange_20_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.nuevoTramite.prioridadId, $event) || (ctx.nuevoTramite.prioridadId = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementStart(21, "option", 12);
        \u0275\u0275text(22, "Seleccione prioridad");
        \u0275\u0275elementEnd();
        \u0275\u0275template(23, NuevoTramiteModalComponent_option_23_Template, 3, 3, "option", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, NuevoTramiteModalComponent_div_24_Template, 2, 1, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, NuevoTramiteModalComponent_div_25_Template, 6, 1, "div", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "div", 8)(27, "div", 18)(28, "label", 19);
        \u0275\u0275text(29, "Fecha de Inicio");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "input", 20);
        \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_Template_input_ngModelChange_30_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.nuevoTramite.fechaInicio, $event) || (ctx.nuevoTramite.fechaInicio = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "small", 21);
        \u0275\u0275text(32, " Fecha de inicio del tr\xE1mite (generada autom\xE1ticamente) ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "small", 22);
        \u0275\u0275element(34, "i", 7);
        \u0275\u0275text(35, " La fecha de vencimiento se calcular\xE1 autom\xE1ticamente (3 d\xEDas h\xE1biles desde la fecha de creaci\xF3n, excluyendo fines de semana). ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(36, "div", 23)(37, "label", 24);
        \u0275\u0275text(38, "Asunto");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "input", 25);
        \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_Template_input_ngModelChange_39_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.nuevoTramite.asunto, $event) || (ctx.nuevoTramite.asunto = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(40, NuevoTramiteModalComponent_div_40_Template, 2, 1, "div", 14);
        \u0275\u0275elementStart(41, "small", 21);
        \u0275\u0275text(42);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "div", 23)(44, "label", 26);
        \u0275\u0275text(45, "Descripci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "textarea", 27);
        \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_Template_textarea_ngModelChange_46_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.nuevoTramite.descripcion, $event) || (ctx.nuevoTramite.descripcion = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(47, NuevoTramiteModalComponent_div_47_Template, 2, 1, "div", 14);
        \u0275\u0275elementStart(48, "small", 21);
        \u0275\u0275text(49);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(50, "div", 5)(51, "h3", 6);
        \u0275\u0275element(52, "i", 28);
        \u0275\u0275text(53, " Documentos Adjuntos ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "div", 23)(55, "label", 29);
        \u0275\u0275text(56, "Subir Archivos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "div", 30)(58, "input", 31);
        \u0275\u0275listener("change", function NuevoTramiteModalComponent_Template_input_change_58_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFileSelected($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "label", 32);
        \u0275\u0275element(60, "i", 33);
        \u0275\u0275elementStart(61, "span");
        \u0275\u0275text(62, "Haga clic para seleccionar archivos o arr\xE1strelos aqu\xED");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "small");
        \u0275\u0275text(64, "Se permiten archivos PDF y DOCX (m\xE1x. 10MB cada uno)");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(65, NuevoTramiteModalComponent_div_65_Template, 5, 2, "div", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "div", 5)(67, "h3", 6);
        \u0275\u0275element(68, "i", 35);
        \u0275\u0275text(69, " Observaciones Adicionales ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "div", 23)(71, "label", 36);
        \u0275\u0275text(72, "Observaciones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "textarea", 37);
        \u0275\u0275twoWayListener("ngModelChange", function NuevoTramiteModalComponent_Template_textarea_ngModelChange_73_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.nuevoTramite.observaciones, $event) || (ctx.nuevoTramite.observaciones = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "small", 21);
        \u0275\u0275text(75);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(76, "div", 38)(77, "div", 39)(78, "h3", 6);
        \u0275\u0275element(79, "i", 40);
        \u0275\u0275text(80, " Firma Digital ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "div", 41)(82, "input", 42);
        \u0275\u0275listener("change", function NuevoTramiteModalComponent_Template_input_change_82_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onCheckboxChange($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(83, "label", 43);
        \u0275\u0275text(84, " Firmar digitalmente este tr\xE1mite (opcional) ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(85, NuevoTramiteModalComponent_div_85_Template, 60, 42, "div", 44);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(86, NuevoTramiteModalComponent_div_86_Template, 59, 0, "div", 45);
      }
      if (rf & 2) {
        \u0275\u0275property("show", ctx.show)("title", ctx.modoEdicion ? "Editar Tr\xE1mite" : "Nuevo Tr\xE1mite")("loading", ctx.loading)("showFooter", true);
        \u0275\u0275advance(9);
        \u0275\u0275property("ngClass", ctx.isUsuarioRole ? "col-md-4" : "col-md-6");
        \u0275\u0275advance();
        \u0275\u0275classProp("required", !ctx.modoEdicion);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("is-invalid", ctx.errors["tipoId"]);
        \u0275\u0275twoWayProperty("ngModel", ctx.nuevoTramite.tipoId);
        \u0275\u0275property("required", !ctx.modoEdicion);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.tiposTramite);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errors["tipoId"]);
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", ctx.isUsuarioRole ? "col-md-4" : "col-md-6");
        \u0275\u0275advance(3);
        \u0275\u0275classProp("is-invalid", ctx.errors["prioridadId"]);
        \u0275\u0275twoWayProperty("ngModel", ctx.nuevoTramite.prioridadId);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.prioridadesTramite);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errors["prioridadId"]);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isUsuarioRole);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.nuevoTramite.fechaInicio);
        \u0275\u0275advance(7);
        \u0275\u0275classProp("required", !ctx.modoEdicion);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("is-invalid", ctx.errors["asunto"]);
        \u0275\u0275twoWayProperty("ngModel", ctx.nuevoTramite.asunto);
        \u0275\u0275property("required", !ctx.modoEdicion);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errors["asunto"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", (ctx.nuevoTramite.asunto == null ? null : ctx.nuevoTramite.asunto.length) || 0, "/200 caracteres ");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("is-invalid", ctx.errors["descripcion"]);
        \u0275\u0275twoWayProperty("ngModel", ctx.nuevoTramite.descripcion);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errors["descripcion"]);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", (ctx.nuevoTramite.descripcion == null ? null : ctx.nuevoTramite.descripcion.length) || 0, "/1000 caracteres ");
        \u0275\u0275advance(16);
        \u0275\u0275property("ngIf", ctx.archivosSeleccionados.length > 0);
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.nuevoTramite.observaciones);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", (ctx.nuevoTramite.observaciones == null ? null : ctx.nuevoTramite.observaciones.length) || 0, "/500 caracteres ");
        \u0275\u0275advance(7);
        \u0275\u0275property("checked", ctx.requiereFirmaDigital)("disabled", ctx.loading);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.requiereFirmaDigital);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showConfirmationModal);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, CheckboxRequiredValidator, NgModel, NgForm, ModalBaseComponent], styles: ['\n\n.modal-content[_ngcontent-%COMP%] {\n  max-height: 70vh;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.form-section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n  border-bottom: 1px solid #e9ecef;\n  padding-bottom: 1.5rem;\n}\n.form-section[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #2c3e50;\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #3498db;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.col-md-6[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.form-label.required[_ngcontent-%COMP%]::after {\n  content: " *";\n  color: #dc3545;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #ced4da;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #3498db;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);\n}\n.form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  color: #dc3545;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6c757d;\n  margin-top: 0.25rem;\n}\n.file-upload-area[_ngcontent-%COMP%] {\n  position: relative;\n  margin-bottom: 1rem;\n}\n.file-input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.file-upload-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  border: 2px dashed #ced4da;\n  border-radius: 0.375rem;\n  background-color: #f8f9fa;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-align: center;\n}\n.file-upload-label[_ngcontent-%COMP%]:hover {\n  border-color: #3498db;\n  background-color: #e3f2fd;\n}\n.file-upload-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #6c757d;\n  margin-bottom: 0.5rem;\n}\n.file-upload-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.25rem;\n}\n.file-upload-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.selected-files[_ngcontent-%COMP%] {\n  border: 1px solid #dee2e6;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  background-color: #f8f9fa;\n}\n.files-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid #dee2e6;\n  padding-bottom: 0.5rem;\n}\n.file-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.file-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem;\n  background-color: white;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  transition: box-shadow 0.2s ease;\n}\n.file-item[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.file-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex: 1;\n}\n.file-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #dc3545;\n}\n.file-info[_ngcontent-%COMP%]   i.fa-file-word[_ngcontent-%COMP%] {\n  color: #2b579a;\n}\n.file-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.file-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  font-size: 0.875rem;\n}\n.file-size[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.75rem;\n}\n.file-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex: 1;\n  max-width: 300px;\n}\n.file-actions[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.375rem 0.5rem;\n}\n.file-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  padding: 0;\n}\n.modal-footer-custom[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #dee2e6;\n  background-color: #f8f9fa;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 0.375rem;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 0.2s ease;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #5a6268;\n  border-color: #545b62;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #3498db;\n  border-color: #3498db;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #2980b9;\n  border-color: #2574a9;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.signature-section[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8f9ff 0%,\n      #f0f4ff 100%);\n  border: 2px solid #e0e7ff;\n  border-radius: 12px;\n  padding: 20px;\n  margin: 20px 0;\n}\n.signature-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #e0e7ff;\n}\n.signature-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.toggle-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #374151;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.signature-toggle[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  accent-color: #667eea;\n}\n.signature-config[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease-out;\n}\n.signature-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.signature-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.signature-field.full-width[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.signature-canvas-container[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.canvas-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  border: 2px dashed #667eea;\n  border-radius: 8px;\n  background: white;\n  padding: 16px;\n}\n.signature-canvas[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  cursor: crosshair;\n  background: white;\n  touch-action: none;\n}\n.signature-canvas.has-signature[_ngcontent-%COMP%] {\n  border-color: #10b981;\n  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);\n}\n.canvas-controls[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n  justify-content: center;\n}\n.btn-canvas[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  background: white;\n  color: #374151;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.2s ease;\n}\n.btn-canvas[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n.btn-canvas[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-canvas.clear[_ngcontent-%COMP%] {\n  color: #ef4444;\n  border-color: #fecaca;\n}\n.btn-canvas.clear[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fef2f2;\n  border-color: #ef4444;\n}\n.btn-canvas.capture[_ngcontent-%COMP%] {\n  color: #10b981;\n  border-color: #a7f3d0;\n}\n.btn-canvas.capture[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #ecfdf5;\n  border-color: #10b981;\n}\n.signature-preview[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 16px;\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n}\n.preview-container[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.signature-image[_ngcontent-%COMP%] {\n  max-width: 200px;\n  max-height: 100px;\n  display: block;\n}\n.btn-remove-signature[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  width: 24px;\n  height: 24px;\n  border: none;\n  border-radius: 50%;\n  background: #ef4444;\n  color: white;\n  cursor: pointer;\n  font-size: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.2s ease;\n}\n.btn-remove-signature[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dc2626;\n}\n.signature-consent[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  padding: 16px;\n  background: #fef3c7;\n  border: 1px solid #f59e0b;\n  border-radius: 8px;\n}\n.consent-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.consent-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #92400e;\n  line-height: 1.5;\n}\n.signature-info[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.info-box[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #eff6ff;\n  border: 1px solid #dbeafe;\n  border-radius: 8px;\n  display: flex;\n  gap: 12px;\n}\n.info-content[_ngcontent-%COMP%] {\n  color: #1e40af;\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.info-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n.info-content[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 8px 0 0 16px;\n  padding: 0;\n}\n.info-content[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 768px) {\n  .modal-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .file-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n  }\n  .file-actions[_ngcontent-%COMP%] {\n    max-width: none;\n  }\n  .modal-footer-custom[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n    gap: 0.5rem;\n  }\n  .modal-footer-custom[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .signature-section[_ngcontent-%COMP%] {\n    margin: 16px 0;\n    padding: 16px;\n  }\n  .signature-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 12px;\n  }\n  .signature-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .canvas-wrapper[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .signature-canvas[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .canvas-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .btn-canvas[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .signature-image[_ngcontent-%COMP%] {\n    max-width: 150px;\n    max-height: 75px;\n  }\n}\n.confirmation-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n.confirmation-modal-overlay.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n.confirmation-modal-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  max-width: 600px;\n  width: 90%;\n  max-height: 80vh;\n  overflow-y: auto;\n  transform: scale(0.9) translateY(-20px);\n  transition: transform 0.3s ease;\n}\n.confirmation-modal-overlay.show[_ngcontent-%COMP%]   .confirmation-modal-container[_ngcontent-%COMP%] {\n  transform: scale(1) translateY(0);\n}\n.confirmation-modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #4f46e5 0%,\n      #7c3aed 100%);\n  color: white;\n  border-radius: 12px 12px 0 0;\n  position: relative;\n}\n.confirmation-modal-header[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 1rem;\n}\n.confirmation-modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  flex: 1;\n}\n.confirmation-modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 1.25rem;\n  cursor: pointer;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n}\n.confirmation-modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n}\n.confirmation-modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.declaration-box[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n.declaration-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  color: #1e293b;\n  font-size: 1.1rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.declaration-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #10b981;\n}\n.declaration-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem 0;\n  color: #475569;\n  font-weight: 500;\n}\n.declaration-text[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 1.25rem;\n  list-style-type: disc;\n}\n.declaration-text[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  color: #64748b;\n  line-height: 1.5;\n}\n.terms-box[_ngcontent-%COMP%] {\n  background: #fefce8;\n  border: 1px solid #fde047;\n  border-radius: 8px;\n  padding: 1.25rem;\n  margin-bottom: 1.5rem;\n}\n.terms-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  color: #a16207;\n  font-size: 1rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.terms-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  color: #a16207;\n  font-size: 0.9rem;\n  line-height: 1.4;\n}\n.warning-box[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  padding: 1rem;\n  color: #dc2626;\n  font-weight: 500;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.warning-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #ef4444;\n  margin-top: 2px;\n  flex-shrink: 0;\n}\n.confirmation-modal-footer[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-top: 1px solid #e2e8f0;\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  color: #64748b;\n  padding: 0.75rem 1.5rem;\n  border-radius: 6px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n  border-color: #cbd5e1;\n}\n.btn-proceed[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%);\n  border: none;\n  color: white;\n  padding: 0.75rem 1.5rem;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);\n}\n.btn-proceed[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #059669 0%,\n      #047857 100%);\n  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);\n  transform: translateY(-1px);\n}\n@media (max-width: 768px) {\n  .confirmation-modal-container[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 1rem;\n  }\n  .confirmation-modal-header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .confirmation-modal-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .confirmation-modal-footer[_ngcontent-%COMP%] {\n    padding: 1rem;\n    flex-direction: column;\n  }\n  .btn-cancel[_ngcontent-%COMP%], .btn-proceed[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=nuevo-tramite-modal.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NuevoTramiteModalComponent, { className: "NuevoTramiteModalComponent" });
})();

export {
  ModalBaseComponent,
  NuevoTramiteModalComponent
};
//# sourceMappingURL=chunk-YHPLPX4C.js.map
