import {
  MisTramitesService
} from "./chunk-OIH2ELY7.js";
import {
  WebSocketService
} from "./chunk-BMCKY33E.js";
import {
  NotificacionService
} from "./chunk-FCMH7YRL.js";
import {
  animate,
  style,
  transition,
  trigger
} from "./chunk-SL73FFWH.js";
import {
  ToastService
} from "./chunk-OF2WYGMW.js";
import {
  AuthService,
  ModalService,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from "./chunk-T5HD73DN.js";
import {
  ChangeDetectorRef,
  CommonModule,
  EventEmitter,
  NgClass,
  NgForOf,
  NgIf,
  Subscription,
  __spreadProps,
  __spreadValues,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-HL73AAZ4.js";

// src/app/shared/modal/modal.component.ts
function ModalComponent_div_0_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function ModalComponent_div_0_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalState.config == null ? null : ctx_r1.modalState.config.cancelText, " ");
  }
}
function ModalComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function ModalComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayClick());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function ModalComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "div", 4);
    \u0275\u0275element(4, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 5)(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 6);
    \u0275\u0275template(11, ModalComponent_div_0_button_11_Template, 2, 1, "button", 7);
    \u0275\u0275elementStart(12, "button", 8);
    \u0275\u0275listener("click", function ModalComponent_div_0_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onConfirm());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getHeaderClass());
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getIcon());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.modalState.config == null ? null : ctx_r1.modalState.config.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.modalState.config == null ? null : ctx_r1.modalState.config.message);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.modalState.config == null ? null : ctx_r1.modalState.config.showCancel);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getConfirmButtonClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.modalState.config == null ? null : ctx_r1.modalState.config.confirmText, " ");
  }
}
var ModalComponent = class _ModalComponent {
  constructor(modalService) {
    this.modalService = modalService;
    this.modalState = {
      isOpen: false,
      config: null,
      resolve: null
    };
  }
  ngOnInit() {
    this.subscription = this.modalService.modalState$.subscribe((state) => this.modalState = state);
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  onOverlayClick() {
    this.onCancel();
  }
  onConfirm() {
    this.modalService.closeModal(true);
  }
  onCancel() {
    this.modalService.closeModal(false);
  }
  getHeaderClass() {
    return this.modalState.config?.type || "info";
  }
  getIcon() {
    const icons = {
      warning: "fas fa-exclamation-triangle",
      error: "fas fa-times-circle",
      info: "fas fa-info-circle",
      success: "fas fa-check-circle"
    };
    return icons[this.modalState.config?.type || "info"];
  }
  getConfirmButtonClass() {
    const classes = {
      warning: "btn-warning",
      error: "btn-danger",
      info: "btn-primary",
      success: "btn-success"
    };
    return classes[this.modalState.config?.type || "info"];
  }
  static {
    this.\u0275fac = function ModalComponent_Factory(t) {
      return new (t || _ModalComponent)(\u0275\u0275directiveInject(ModalService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ModalComponent, selectors: [["app-modal"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "modal-overlay", 3, "click"], [1, "modal-container", 3, "click"], [1, "modal-header", 3, "ngClass"], [1, "modal-icon"], [1, "modal-body"], [1, "modal-footer"], ["class", "btn btn-secondary", 3, "click", 4, "ngIf"], [1, "btn", 3, "click", "ngClass"], [1, "btn", "btn-secondary", 3, "click"]], template: function ModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ModalComponent_div_0_Template, 14, 8, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.modalState.isOpen);
      }
    }, dependencies: [CommonModule, NgClass, NgIf], styles: ["\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10000;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: scale(0.8) translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);\n  min-width: 400px;\n  max-width: 500px;\n  width: 90%;\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;\n  overflow: hidden;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 24px 24px 20px 24px;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  border-bottom: 1px solid #e9ecef;\n}\n.modal-header.warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fff3cd,\n      #ffeaa7);\n}\n.modal-header.error[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f8d7da,\n      #ff7675);\n}\n.modal-header.info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d1ecf1,\n      #74b9ff);\n}\n.modal-header.success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #d4edda,\n      #00b894);\n}\n.modal-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  color: white;\n  flex-shrink: 0;\n}\n.modal-header.warning[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: #f39c12;\n}\n.modal-header.error[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: #e74c3c;\n}\n.modal-header.info[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: #3498db;\n}\n.modal-header.success[_ngcontent-%COMP%]   .modal-icon[_ngcontent-%COMP%] {\n  background: #27ae60;\n}\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n  line-height: 1.6;\n}\n.modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #495057;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  padding: 20px 24px 24px 24px;\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  background: #f8f9fa;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-width: 100px;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #545b62;\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #2c5aa0;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #1e3a5f;\n  transform: translateY(-1px);\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background: #f39c12;\n  color: white;\n}\n.btn-warning[_ngcontent-%COMP%]:hover {\n  background: #d68910;\n  transform: translateY(-1px);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: white;\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background: #c0392b;\n  transform: translateY(-1px);\n}\n.btn-success[_ngcontent-%COMP%] {\n  background: #27ae60;\n  color: white;\n}\n.btn-success[_ngcontent-%COMP%]:hover {\n  background: #229954;\n  transform: translateY(-1px);\n}\n@media (max-width: 768px) {\n  .modal-container[_ngcontent-%COMP%] {\n    min-width: 320px;\n    margin: 20px;\n    max-width: calc(100vw - 40px);\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 20px 20px 16px 20px;\n  }\n  .modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .modal-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 20px;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .modal-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding: 16px 20px 20px 20px;\n    flex-direction: column-reverse;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 14px;\n    font-size: 16px;\n  }\n}\n@media (max-width: 480px) {\n  .modal-container[_ngcontent-%COMP%] {\n    margin: 10px;\n    max-width: calc(100vw - 20px);\n  }\n}\n/*# sourceMappingURL=modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ModalComponent, { className: "ModalComponent" });
})();

// src/app/shared/components/toast/toast.component.ts
function ToastComponent_div_1_div_8_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function ToastComponent_div_1_div_8_button_1_Template_button_click_0_listener($event) {
      const action_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const toast_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.executeAction(action_r5.action, toast_r2.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r5 = ctx.$implicit;
    \u0275\u0275classProp("primary", action_r5.style === "primary")("secondary", action_r5.style === "secondary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r5.label, " ");
  }
}
function ToastComponent_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275template(1, ToastComponent_div_1_div_8_button_1_Template, 2, 5, "button", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const toast_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", toast_r2.actions);
  }
}
function ToastComponent_div_1_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function ToastComponent_div_1_button_9_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const toast_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.removeToast(toast_r2.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(1, "i", 14);
    \u0275\u0275elementEnd();
  }
}
function ToastComponent_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 15);
  }
  if (rf & 2) {
    const toast_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275styleProp("animation-duration", toast_r2.duration, "ms");
  }
}
function ToastComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function ToastComponent_div_1_Template_div_click_0_listener() {
      const toast_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeToast(toast_r2.id));
    });
    \u0275\u0275elementStart(1, "div", 3);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 4)(4, "div", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, ToastComponent_div_1_div_8_Template, 2, 1, "div", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, ToastComponent_div_1_button_9_Template, 2, 0, "button", 8)(10, ToastComponent_div_1_div_10_Template, 1, 2, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap("toast-" + toast_r2.type);
    \u0275\u0275property("@toastAnimation", void 0);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getToastIcon(toast_r2.type));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(toast_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(toast_r2.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", toast_r2.actions && toast_r2.actions.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", toast_r2.showCloseButton);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", toast_r2.duration && toast_r2.duration > 0);
  }
}
var ToastComponent = class _ToastComponent {
  constructor(toastService) {
    this.toastService = toastService;
    this.toasts = [];
    this.subscription = new Subscription();
  }
  ngOnInit() {
    this.subscription = this.toastService.toasts$.subscribe((toasts) => this.toasts = toasts);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  removeToast(id) {
    this.toastService.remove(id);
  }
  getToastIcon(type) {
    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
      info: "fas fa-info-circle"
    };
    return icons[type] || "fas fa-bell";
  }
  executeAction(action, toastId) {
    action();
    this.removeToast(toastId);
  }
  trackByToastId(index, toast) {
    return toast.id || index.toString();
  }
  static {
    this.\u0275fac = function ToastComponent_Factory(t) {
      return new (t || _ToastComponent)(\u0275\u0275directiveInject(ToastService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ToastComponent, selectors: [["app-toast"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 2, consts: [[1, "toast-container"], ["class", "toast", 3, "class", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "toast", 3, "click"], [1, "toast-icon"], [1, "toast-content"], [1, "toast-title"], [1, "toast-message"], ["class", "toast-actions", 4, "ngIf"], ["class", "toast-close", 3, "click", 4, "ngIf"], ["class", "toast-progress", 3, "animation-duration", 4, "ngIf"], [1, "toast-actions"], ["class", "toast-action-btn", 3, "primary", "secondary", "click", 4, "ngFor", "ngForOf"], [1, "toast-action-btn", 3, "click"], [1, "toast-close", 3, "click"], [1, "fas", "fa-times"], [1, "toast-progress"]], template: function ToastComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, ToastComponent_div_1_Template, 11, 10, "div", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngForOf", ctx.toasts)("ngForTrackBy", ctx.trackByToastId);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n\n.toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  z-index: 9999;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  max-width: 400px;\n  width: 100%;\n}\n.toast[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n  padding: 16px;\n  border-left: 4px solid;\n  position: relative;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  overflow: hidden;\n}\n.toast[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);\n}\n.toast-success[_ngcontent-%COMP%] {\n  border-left-color: #28a745;\n}\n.toast-error[_ngcontent-%COMP%] {\n  border-left-color: #dc3545;\n}\n.toast-warning[_ngcontent-%COMP%] {\n  border-left-color: #ffc107;\n}\n.toast-info[_ngcontent-%COMP%] {\n  border-left-color: #17a2b8;\n}\n.toast-icon[_ngcontent-%COMP%] {\n  margin-right: 12px;\n  margin-top: 2px;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.toast-success[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: #28a745;\n}\n.toast-error[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.toast-warning[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: #ffc107;\n}\n.toast-info[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n  color: #17a2b8;\n}\n.toast-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.toast-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: #2c3e50;\n  margin-bottom: 4px;\n  line-height: 1.3;\n}\n.toast-message[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6c757d;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.toast-actions[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.toast-action-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border: none;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: #f8f9fa;\n  color: #495057;\n}\n.toast-action-btn.primary[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n}\n.toast-action-btn.secondary[_ngcontent-%COMP%] {\n  background: #6c757d;\n  color: white;\n}\n.toast-action-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  opacity: 0.9;\n}\n.toast-close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: none;\n  border: none;\n  color: #adb5bd;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  font-size: 12px;\n  line-height: 1;\n  transition: all 0.2s ease;\n}\n.toast-close[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n  color: #6c757d;\n}\n.toast-progress[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      #007bff,\n      #0056b3);\n  border-radius: 0 0 12px 0;\n  animation: _ngcontent-%COMP%_progressBar linear forwards;\n  transform-origin: left center;\n}\n@keyframes _ngcontent-%COMP%_progressBar {\n  from {\n    width: 100%;\n  }\n  to {\n    width: 0%;\n  }\n}\n.toast-success[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #28a745,\n      #1e7e34);\n}\n.toast-error[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #dc3545,\n      #bd2130);\n}\n.toast-warning[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #ffc107,\n      #e0a800);\n}\n.toast-info[_ngcontent-%COMP%]   .toast-progress[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #17a2b8,\n      #138496);\n}\n@media (max-width: 768px) {\n  .toast-container[_ngcontent-%COMP%] {\n    top: 10px;\n    right: 10px;\n    left: 10px;\n    max-width: none;\n  }\n  .toast[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .toast-title[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .toast-message[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .toast-actions[_ngcontent-%COMP%] {\n    margin-top: 10px;\n  }\n  .toast-action-btn[_ngcontent-%COMP%] {\n    padding: 5px 10px;\n    font-size: 11px;\n  }\n}\n@media (max-width: 480px) {\n  .toast-container[_ngcontent-%COMP%] {\n    top: 5px;\n    right: 5px;\n    left: 5px;\n  }\n  .toast[_ngcontent-%COMP%] {\n    padding: 12px;\n    border-radius: 8px;\n  }\n  .toast-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n    margin-right: 10px;\n  }\n  .toast-title[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .toast-message[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .toast-close[_ngcontent-%COMP%] {\n    top: 8px;\n    right: 8px;\n    font-size: 11px;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideInRight {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideOutRight {\n  from {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n}\n.toast[_ngcontent-%COMP%]:hover   .toast-progress[_ngcontent-%COMP%] {\n  animation-play-state: paused;\n}\n@media (prefers-reduced-motion: reduce) {\n  .toast[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .toast-progress[_ngcontent-%COMP%] {\n    animation: none;\n  }\n  .toast[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .toast-container[_ngcontent-%COMP%] {\n    top: 10px;\n    right: 10px;\n    left: 10px;\n    max-width: none;\n  }\n  .toast[_ngcontent-%COMP%] {\n    background: #2c3e50;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\n  }\n  .toast-title[_ngcontent-%COMP%] {\n    color: #ecf0f1;\n  }\n  .toast-message[_ngcontent-%COMP%] {\n    color: #ecf0f1;\n  }\n}\n/*# sourceMappingURL=toast.component.css.map */"], data: { animation: [
      trigger("toastAnimation", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateX(100%)" }),
          animate("300ms ease-in", style({ opacity: 1, transform: "translateX(0)" }))
        ]),
        transition(":leave", [
          animate("300ms ease-out", style({ opacity: 0, transform: "translateX(100%)" }))
        ])
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ToastComponent, { className: "ToastComponent" });
})();

// src/app/shared/components/notification-detail-modal/notification-detail-modal.component.ts
function NotificationDetailModalComponent_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function NotificationDetailModalComponent_div_0_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 11);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_div_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadNotification());
    });
    \u0275\u0275text(5, "Reintentar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function NotificationDetailModalComponent_div_0_div_4_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_div_4_button_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.marcarComoLeida());
    });
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275text(2, " Marcar le\xEDda ");
    \u0275\u0275elementEnd();
  }
}
function NotificationDetailModalComponent_div_0_div_4_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_div_4_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.irARutaDestino());
    });
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275text(2, " Ver contenido ");
    \u0275\u0275elementEnd();
  }
}
function NotificationDetailModalComponent_div_0_div_4_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_div_4_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.verTramite());
    });
    \u0275\u0275element(1, "i", 33);
    \u0275\u0275text(2, " Ver tr\xE1mite ");
    \u0275\u0275elementEnd();
  }
}
function NotificationDetailModalComponent_div_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "div", 14);
    \u0275\u0275element(3, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 16)(8, "span", 17);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 18);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 19);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_div_4_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275element(13, "i", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 21);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 22);
    \u0275\u0275template(17, NotificationDetailModalComponent_div_0_div_4_button_17_Template, 3, 0, "button", 23)(18, NotificationDetailModalComponent_div_0_div_4_button_18_Template, 3, 0, "button", 24)(19, NotificationDetailModalComponent_div_0_div_4_button_19_Template, 3, 0, "button", 25);
    \u0275\u0275elementStart(20, "button", 26);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_div_4_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmDelete());
    });
    \u0275\u0275element(21, "i", 27);
    \u0275\u0275text(22, " Eliminar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "type-" + ctx_r1.notificacion.tipo.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getIcono(ctx_r1.notificacion.tipo));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.notificacion.titulo);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatearTiempo(ctx_r1.notificacion.fechaCreacion));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "priority-" + ctx_r1.notificacion.prioridad.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificacion.prioridad, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.notificacion.mensaje, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.notificacion.esLeida);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacion.rutaDestino);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.shouldShowTramiteButton());
  }
}
function NotificationDetailModalComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 3);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(2, NotificationDetailModalComponent_div_0_div_2_Template, 4, 0, "div", 4)(3, NotificationDetailModalComponent_div_0_div_3_Template, 6, 1, "div", 5)(4, NotificationDetailModalComponent_div_0_div_4_Template, 23, 11, "div", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.cargando);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacion && !ctx_r1.cargando && !ctx_r1.error);
  }
}
function NotificationDetailModalComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275elementStart(1, "div", 35);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_1_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 36);
    \u0275\u0275element(3, "i", 37);
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5, "\xBFEliminar notificaci\xF3n?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Esta acci\xF3n no se puede deshacer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 38)(9, "button", 39);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275text(10, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 40);
    \u0275\u0275listener("click", function NotificationDetailModalComponent_div_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.executeDelete());
    });
    \u0275\u0275text(12, "Eliminar");
    \u0275\u0275elementEnd()()()()();
  }
}
var NotificationDetailModalComponent = class _NotificationDetailModalComponent {
  constructor(router, notificacionService, authService) {
    this.router = router;
    this.notificacionService = notificacionService;
    this.authService = authService;
    this.isVisible = false;
    this.notificationId = null;
    this.modalClosed = new EventEmitter();
    this.notificacion = null;
    this.cargando = false;
    this.error = "";
    this.showDeleteConfirm = false;
  }
  ngOnChanges(changes) {
    if (changes["notificationId"] && this.notificationId && this.isVisible) {
      this.loadNotification();
    }
    if (changes["isVisible"] && !this.isVisible) {
      this.resetState();
    }
  }
  loadNotification() {
    if (!this.notificationId)
      return;
    this.cargando = true;
    this.error = "";
    this.notificacionService.obtenerNotificacionPorId(this.notificationId).subscribe({
      next: (notificacion) => {
        this.notificacion = notificacion;
        this.cargando = false;
        if (!notificacion.esLeida) {
          this.marcarComoLeida();
        }
      },
      error: () => {
        this.error = "Error al cargar la notificaci\xF3n";
        this.cargando = false;
      }
    });
  }
  closeModal() {
    this.modalClosed.emit();
  }
  resetState() {
    this.notificacion = null;
    this.cargando = false;
    this.error = "";
    this.showDeleteConfirm = false;
  }
  marcarComoLeida() {
    if (!this.notificacion)
      return;
    this.notificacionService.marcarComoLeida(this.notificacion.id).subscribe({
      next: () => {
        if (this.notificacion) {
          this.notificacion.esLeida = true;
          this.notificacion.fechaLectura = /* @__PURE__ */ new Date();
          this.notificacionService.actualizarContadorNoLeidas();
        }
      }
    });
  }
  confirmDelete() {
    this.showDeleteConfirm = true;
  }
  cancelDelete() {
    this.showDeleteConfirm = false;
  }
  executeDelete() {
    if (!this.notificacion)
      return;
    this.notificacionService.eliminarNotificacionUsuario(this.notificacion.id).subscribe({
      next: () => {
        this.closeModal();
      }
    });
  }
  irARutaDestino() {
    this.closeModal();
    this.authService.currentUser.subscribe((user) => {
      if (!user)
        return;
      const role = user.role?.name;
      if (role === "ADMIN") {
        this.router.navigate(["/admin/tramites"]);
      } else if (role === "ADMINISTRATIVO") {
        this.router.navigate(["/administrativo/mis-tramites"]);
      } else if (role === "USUARIO") {
        this.router.navigate(["/usuario/mis-tramites"]);
      } else if (role === "ALUMNO") {
        this.router.navigate(["/alumno/mis-tramites"]);
      } else if (role === "EXTERNO") {
        this.router.navigate(["/externo/mis-tramites"]);
      } else {
        this.router.navigate(["/home"]);
      }
    });
  }
  verTramite() {
    if (this.notificacion?.referenciaId) {
      this.closeModal();
      this.authService.currentUser.subscribe((user) => {
        let baseRoute = "/administrativo";
        if (user?.role?.name) {
          const roleName = user.role.name.toUpperCase();
          if (roleName === "ADMIN") {
            baseRoute = "/admin";
          } else if (roleName === "ADMINISTRATIVO") {
            baseRoute = "/administrativo";
          } else if (roleName === "USUARIO") {
            baseRoute = "/usuario";
          } else if (roleName === "ESTUDIANTE") {
            baseRoute = "/estudiante";
          }
        }
        this.router.navigate([baseRoute, "mis-tramites"], {
          queryParams: { tramiteId: this.notificacion.referenciaId }
        });
      });
    }
  }
  shouldShowTramiteButton() {
    return !!(this.notificacion?.referenciaId && this.notificacion?.tipo?.includes("TRAMITE"));
  }
  formatearTiempo(fecha) {
    if (!fecha)
      return "";
    const ahora = /* @__PURE__ */ new Date();
    const fechaNot = new Date(fecha);
    const diff = ahora.getTime() - fechaNot.getTime();
    const minutos = Math.floor(diff / 6e4);
    const horas = Math.floor(diff / 36e5);
    const dias = Math.floor(diff / 864e5);
    if (minutos < 1)
      return "Ahora";
    if (minutos < 60)
      return `${minutos}m`;
    if (horas < 24)
      return `${horas}h`;
    if (dias < 7)
      return `${dias}d`;
    return fechaNot.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit" });
  }
  getIcono(tipo) {
    const iconos = {
      "TRAMITE_NUEVO": "fas fa-file-alt",
      "TRAMITE_CREADO": "fas fa-file-alt",
      "TRAMITE_DERIVADO": "fas fa-share",
      "DERIVACION": "fas fa-share",
      "TRAMITE_APROBADO": "fas fa-check-circle",
      "TRAMITE_RECHAZADO": "fas fa-times-circle",
      "SISTEMA": "fas fa-info-circle",
      "URGENTE": "fas fa-exclamation-triangle"
    };
    return iconos[tipo] || "fas fa-bell";
  }
  static {
    this.\u0275fac = function NotificationDetailModalComponent_Factory(t) {
      return new (t || _NotificationDetailModalComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(NotificacionService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationDetailModalComponent, selectors: [["app-notification-detail-modal"]], inputs: { isVisible: "isVisible", notificationId: "notificationId" }, outputs: { modalClosed: "modalClosed" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 2, vars: 2, consts: [["class", "modal-backdrop", 3, "click", 4, "ngIf"], ["class", "confirm-backdrop", 3, "click", 4, "ngIf"], [1, "modal-backdrop", 3, "click"], [1, "modal-card", 3, "click"], ["class", "loading", 4, "ngIf"], ["class", "error", 4, "ngIf"], ["class", "notification-content", 4, "ngIf"], [1, "loading"], [1, "fas", "fa-spinner", "fa-spin"], [1, "error"], [1, "fas", "fa-exclamation-triangle"], [1, "retry-btn", 3, "click"], [1, "notification-content"], [1, "header"], [1, "type-indicator", 3, "ngClass"], [1, "title-section"], [1, "meta"], [1, "time"], [1, "priority", 3, "ngClass"], [1, "close-btn", 3, "click"], [1, "fas", "fa-times"], [1, "message"], [1, "actions"], ["class", "action-btn mark-read", 3, "click", 4, "ngIf"], ["class", "action-btn view-content", 3, "click", 4, "ngIf"], ["class", "action-btn view-tramite", 3, "click", 4, "ngIf"], [1, "action-btn", "delete", 3, "click"], [1, "fas", "fa-trash-alt"], [1, "action-btn", "mark-read", 3, "click"], [1, "fas", "fa-check"], [1, "action-btn", "view-content", 3, "click"], [1, "fas", "fa-external-link-alt"], [1, "action-btn", "view-tramite", 3, "click"], [1, "fas", "fa-file-alt"], [1, "confirm-backdrop", 3, "click"], [1, "confirm-dialog", 3, "click"], [1, "confirm-content"], [1, "fas", "fa-trash-alt", "delete-icon"], [1, "confirm-actions"], [1, "cancel-btn", 3, "click"], [1, "delete-btn", 3, "click"]], template: function NotificationDetailModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, NotificationDetailModalComponent_div_0_Template, 5, 3, "div", 0)(1, NotificationDetailModalComponent_div_1_Template, 13, 0, "div", 1);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.isVisible);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteConfirm);
      }
    }, dependencies: [CommonModule, NgClass, NgIf], styles: ["\n\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10000;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 480px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease-out;\n  overflow: hidden;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.loading[_ngcontent-%COMP%], .error[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n}\n.loading[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 12px;\n  color: #007bff;\n}\n.error[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #dc3545;\n  margin-bottom: 16px;\n}\n.error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 20px;\n  color: #6c757d;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  background: #007bff;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background-color 0.2s;\n}\n.retry-btn[_ngcontent-%COMP%]:hover {\n  background: #0056b3;\n}\n.notification-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.type-indicator[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.type-indicator[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: white;\n}\n.type-tramite_nuevo[_ngcontent-%COMP%], .type-tramite_creado[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea,\n      #764ba2);\n}\n.type-tramite_derivado[_ngcontent-%COMP%], .type-derivacion[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f093fb,\n      #f5576c);\n}\n.type-sistema[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe,\n      #00f2fe);\n}\n.title-section[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.title-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #2c3e50;\n  line-height: 1.4;\n}\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 12px;\n}\n.time[_ngcontent-%COMP%] {\n  color: #8e9aaf;\n}\n.priority[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-weight: 500;\n  text-transform: uppercase;\n  font-size: 10px;\n  letter-spacing: 0.5px;\n}\n.priority-alta[_ngcontent-%COMP%] {\n  background: #ffeaea;\n  color: #d32f2f;\n}\n.priority-normal[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.priority-baja[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #8e9aaf;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: #f1f3f4;\n  color: #5f6368;\n}\n.message[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 16px;\n  border-radius: 8px;\n  color: #495057;\n  line-height: 1.5;\n  font-size: 14px;\n  margin-bottom: 20px;\n  border-left: 3px solid #e9ecef;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  padding: 8px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.2s;\n  color: #495057;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.mark-read[_ngcontent-%COMP%] {\n  background: #d4edda;\n  border-color: #c3e6cb;\n  color: #155724;\n}\n.mark-read[_ngcontent-%COMP%]:hover {\n  background: #c3e6cb;\n}\n.view-content[_ngcontent-%COMP%], .view-tramite[_ngcontent-%COMP%] {\n  background: #cce5ff;\n  border-color: #99ccff;\n  color: #004085;\n}\n.view-content[_ngcontent-%COMP%]:hover, .view-tramite[_ngcontent-%COMP%]:hover {\n  background: #99ccff;\n}\n.delete[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  border-color: #f1aeb5;\n  color: #721c24;\n}\n.delete[_ngcontent-%COMP%]:hover {\n  background: #f1aeb5;\n}\n.confirm-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10001;\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n.confirm-dialog[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 380px;\n  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);\n  animation: _ngcontent-%COMP%_slideUp 0.25s ease-out;\n}\n.confirm-content[_ngcontent-%COMP%] {\n  padding: 32px 24px 24px;\n  text-align: center;\n}\n.delete-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  color: #dc3545;\n  margin-bottom: 16px;\n}\n.confirm-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.confirm-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n  color: #6c757d;\n  font-size: 14px;\n}\n.confirm-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.cancel-btn[_ngcontent-%COMP%], .delete-btn[_ngcontent-%COMP%] {\n  padding: 10px 24px;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n}\n.cancel-btn[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  color: #6c757d;\n  border: 1px solid #dee2e6;\n}\n.cancel-btn[_ngcontent-%COMP%]:hover {\n  background: #e9ecef;\n}\n.delete-btn[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n}\n.delete-btn[_ngcontent-%COMP%]:hover {\n  background: #c82333;\n}\n@media (max-width: 640px) {\n  .modal-card[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 20px 0;\n  }\n  .notification-content[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .confirm-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=notification-detail-modal.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationDetailModalComponent, { className: "NotificationDetailModalComponent" });
})();

// src/app/shared/components/notification-bell/notification-bell.component.ts
function NotificationBellComponent_div_0_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.contadorNoLeidas);
  }
}
function NotificationBellComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6);
    \u0275\u0275listener("click", function NotificationBellComponent_div_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDropdown());
    });
    \u0275\u0275element(2, "i", 7);
    \u0275\u0275template(3, NotificationBellComponent_div_0_span_3_Template, 2, 1, "span", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.contadorNoLeidas > 0);
  }
}
function NotificationBellComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("click", function NotificationBellComponent_div_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarDropdown());
    });
    \u0275\u0275elementEnd();
  }
}
function NotificationBellComponent_div_2_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 24);
    \u0275\u0275listener("click", function NotificationBellComponent_div_2_button_5_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarTodasNotificaciones($event));
    });
    \u0275\u0275element(1, "i", 25);
    \u0275\u0275elementEnd();
  }
}
function NotificationBellComponent_div_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "div", 27);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_div_2_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 37);
  }
}
function NotificationBellComponent_div_2_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, NotificationBellComponent_div_2_div_11_div_1_Template, 1, 0, "div", 29);
    \u0275\u0275elementStart(2, "div", 30);
    \u0275\u0275listener("click", function NotificationBellComponent_div_2_div_11_Template_div_click_2_listener() {
      const notif_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.abrirNotificacion(notif_r7));
    });
    \u0275\u0275elementStart(3, "div", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 34)(10, "button", 35);
    \u0275\u0275listener("click", function NotificationBellComponent_div_2_div_11_Template_button_click_10_listener($event) {
      const notif_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eliminarNotificacion(notif_r7.id, $event));
    });
    \u0275\u0275element(11, "i", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const notif_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("unread", !notif_r7.esLeida);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !notif_r7.esLeida);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(notif_r7.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getMessagePreview(notif_r7.mensaje));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatearTiempo(notif_r7.fechaCreacion));
  }
}
function NotificationBellComponent_div_2_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275element(1, "div", 39);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando m\xE1s...");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_div_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275element(1, "i", 41);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "No hay m\xE1s notificaciones");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_div_2_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "i", 43);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Sin notificaciones");
    \u0275\u0275elementEnd()();
  }
}
function NotificationBellComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13);
    \u0275\u0275template(5, NotificationBellComponent_div_2_button_5_Template, 2, 0, "button", 14);
    \u0275\u0275elementStart(6, "button", 15);
    \u0275\u0275listener("click", function NotificationBellComponent_div_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cerrarDropdown());
    });
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 16, 0);
    \u0275\u0275listener("scroll", function NotificationBellComponent_div_2_Template_div_scroll_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onScroll($event));
    });
    \u0275\u0275template(10, NotificationBellComponent_div_2_div_10_Template, 4, 0, "div", 17)(11, NotificationBellComponent_div_2_div_11_Template, 12, 6, "div", 18)(12, NotificationBellComponent_div_2_div_12_Template, 4, 0, "div", 19)(13, NotificationBellComponent_div_2_div_13_Template, 4, 0, "div", 20)(14, NotificationBellComponent_div_2_div_14_Template, 4, 0, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 22)(16, "button", 23);
    \u0275\u0275listener("click", function NotificationBellComponent_div_2_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.verTodasNotificaciones());
    });
    \u0275\u0275text(17, " Ver todas ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Notificaciones (", ctx_r1.contadorNoLeidas, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.notificacionesRecientes.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.cargando && ctx_r1.notificacionesRecientes.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.notificacionesRecientes)("ngForTrackBy", ctx_r1.trackNotification);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loadingMore);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showEndMessage && !ctx_r1.hasMoreNotifications && ctx_r1.notificacionesRecientes.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.notificacionesRecientes.length === 0 && !ctx_r1.cargando);
  }
}
var NotificationBellComponent = class _NotificationBellComponent {
  constructor(notificacionService, webSocketService, authService, router, cdr) {
    this.notificacionService = notificacionService;
    this.webSocketService = webSocketService;
    this.authService = authService;
    this.router = router;
    this.cdr = cdr;
    this.usuarioAutenticado = false;
    this.mostrarDropdown = false;
    this.contadorNoLeidas = 0;
    this.notificacionesRecientes = [];
    this.cargando = false;
    this.estaConectado = false;
    this.hayNuevasNotificaciones = false;
    this.modalVisible = false;
    this.selectedNotificationId = null;
    this.currentPage = 0;
    this.pageSize = 10;
    this.totalNotifications = 0;
    this.loadingMore = false;
    this.hasMoreNotifications = true;
    this.showEndMessage = false;
    this.subscriptions = [];
    this.ignoreNextClick = false;
  }
  ngOnInit() {
    this.subscriptions.push(this.authService.currentUser.subscribe((user) => {
      this.usuarioAutenticado = !!user;
      if (user && user.id) {
        this.inicializarNotificaciones();
      } else {
        this.limpiarEstado();
      }
    }));
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    if (this.shakeTimeout) {
      clearTimeout(this.shakeTimeout);
    }
  }
  inicializarNotificaciones() {
    if (!this.usuarioAutenticado) {
      return;
    }
    this.actualizarContador();
    this.cargarNotificacionesRecientes();
    this.subscriptions.push(this.notificacionService.contadorNoLeidas$.subscribe((count) => {
      const anteriorContador = this.contadorNoLeidas;
      this.contadorNoLeidas = count;
      if (count > anteriorContador && count > 0) {
        this.activarAnimacionCampana();
      }
    }));
    this.subscriptions.push(this.notificacionService.nuevaNotificacion$.subscribe((notificacion) => {
      this.agregarNotificacionReciente(notificacion);
      this.activarAnimacionCampana();
    }));
    this.subscriptions.push(this.webSocketService.connected$.subscribe((conectado) => {
      this.estaConectado = conectado;
    }));
  }
  cargarNotificacionesRecientes() {
    this.cargando = true;
    this.currentPage = 0;
    this.hasMoreNotifications = true;
    this.showEndMessage = false;
    this.subscriptions.push(this.notificacionService.obtenerMisNotificaciones(0, this.pageSize, "fechaCreacion", "desc").subscribe({
      next: (response) => {
        this.notificacionesRecientes = response.content || [];
        this.totalNotifications = response.totalElements || 0;
        this.hasMoreNotifications = this.notificacionesRecientes.length < this.totalNotifications;
        this.cargando = false;
      },
      error: () => {
        this.notificacionesRecientes = [];
        this.totalNotifications = 0;
        this.hasMoreNotifications = false;
        this.cargando = false;
      }
    }));
  }
  cargarMasNotificaciones() {
    if (this.loadingMore || !this.hasMoreNotifications)
      return;
    this.loadingMore = true;
    const nextPage = this.currentPage + 1;
    this.subscriptions.push(this.notificacionService.obtenerMisNotificaciones(nextPage, this.pageSize, "fechaCreacion", "desc").subscribe({
      next: (response) => {
        const newNotifications = response.content;
        this.notificacionesRecientes = [...this.notificacionesRecientes, ...newNotifications];
        this.currentPage = nextPage;
        this.hasMoreNotifications = this.notificacionesRecientes.length < this.totalNotifications;
        this.loadingMore = false;
        if (!this.hasMoreNotifications && this.notificacionesRecientes.length > 0) {
          setTimeout(() => {
            this.showEndMessage = true;
          }, 500);
        }
      },
      error: () => {
        this.loadingMore = false;
      }
    }));
  }
  actualizarContador() {
    this.subscriptions.push(this.notificacionService.contadorNoLeidas$.subscribe({
      next: (count) => {
        this.contadorNoLeidas = count || 0;
      },
      error: () => {
        this.contadorNoLeidas = 0;
      }
    }));
    this.notificacionService.actualizarContadorNoLeidas();
  }
  agregarNotificacionReciente(notificacion) {
    this.notificacionesRecientes = [notificacion, ...this.notificacionesRecientes];
    this.totalNotifications += 1;
  }
  activarAnimacionCampana() {
    this.hayNuevasNotificaciones = true;
    if (this.shakeTimeout) {
      clearTimeout(this.shakeTimeout);
    }
    this.shakeTimeout = setTimeout(() => {
      this.hayNuevasNotificaciones = false;
    }, 2e3);
  }
  limpiarEstado() {
    this.mostrarDropdown = false;
    this.contadorNoLeidas = 0;
    this.notificacionesRecientes = [];
    this.estaConectado = false;
    this.currentPage = 0;
    this.totalNotifications = 0;
    this.loadingMore = false;
    this.hasMoreNotifications = true;
    this.showEndMessage = false;
  }
  toggleDropdown() {
    this.mostrarDropdown = !this.mostrarDropdown;
    this.ignoreNextClick = true;
    setTimeout(() => {
      this.ignoreNextClick = false;
    }, 100);
    this.cdr.detectChanges();
    if (this.mostrarDropdown) {
      this.cargarNotificacionesRecientes();
    }
  }
  cerrarDropdown() {
    this.mostrarDropdown = false;
  }
  marcarLeida(notificacion, event) {
    event.stopPropagation();
    if (notificacion.esLeida)
      return;
    this.notificacionService.marcarLeidaLocal(notificacion.id);
    notificacion.esLeida = true;
    notificacion.fechaLectura = /* @__PURE__ */ new Date();
  }
  marcarTodasLeidas() {
    if (this.contadorNoLeidas === 0)
      return;
    this.notificacionService.marcarTodasLeidasLocal();
    this.notificacionesRecientes = this.notificacionesRecientes.map((n) => __spreadProps(__spreadValues({}, n), {
      esLeida: true,
      fechaLectura: n.esLeida ? n.fechaLectura : /* @__PURE__ */ new Date()
    }));
  }
  abrirNotificacion(notificacion) {
    this.marcarLeida(notificacion, new Event("click"));
    this.cerrarDropdown();
    this.selectedNotificationId = notificacion.id;
    this.modalVisible = true;
  }
  closeModal() {
    this.modalVisible = false;
    this.selectedNotificationId = null;
  }
  verTodasNotificaciones() {
    this.cerrarDropdown();
    this.authService.currentUser.subscribe((user) => {
      let baseRoute = "/admin";
      if (user?.role?.name) {
        const roleName = user.role.name.toUpperCase();
        if (roleName === "ADMIN") {
          baseRoute = "/admin";
        } else if (roleName === "ADMINISTRATIVO") {
          baseRoute = "/administrativo";
        } else if (roleName === "USUARIO") {
          baseRoute = "/usuario";
        } else if (roleName === "ESTUDIANTE") {
          baseRoute = "/estudiante";
        }
      }
      this.router.navigate([baseRoute, "notificaciones"]);
    });
  }
  getIcono(tipo) {
    return this.notificacionService.getIcono(tipo);
  }
  getClaseTipo(tipo) {
    return this.notificacionService.getClaseTipo(tipo);
  }
  formatearTiempo(fecha) {
    const ahora = /* @__PURE__ */ new Date();
    const fechaNot = new Date(fecha);
    const diff = ahora.getTime() - fechaNot.getTime();
    const minutos = Math.floor(diff / 6e4);
    const horas = Math.floor(diff / 36e5);
    const dias = Math.floor(diff / 864e5);
    if (minutos < 1)
      return "Ahora";
    if (minutos < 60)
      return `${minutos}m`;
    if (horas < 24)
      return `${horas}h`;
    if (dias < 7)
      return `${dias}d`;
    return fechaNot.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit" });
  }
  getMessagePreview(mensaje) {
    return mensaje.length > 85 ? mensaje.slice(0, 85) + "..." : mensaje;
  }
  trackNotification(_index, notificacion) {
    return notificacion.id;
  }
  onNotificationHover(event, isHovering) {
    const target = event.target;
    if (target) {
      target.style.backgroundColor = isHovering ? "#f8f9fa" : "transparent";
    }
  }
  onScroll(event) {
    const element = event.target;
    const threshold = 100;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - threshold) {
      this.cargarMasNotificaciones();
    }
  }
  onDocumentClick(event) {
    if (this.ignoreNextClick) {
      return;
    }
    const target = event.target;
    if (!target.closest(".notification-bell") && !target.closest(".modern-notification-bell")) {
      this.cerrarDropdown();
    }
  }
  onEscapeKey() {
    this.cerrarDropdown();
  }
  eliminarNotificacion(notificacionId, event) {
    event.stopPropagation();
    this.subscriptions.push(this.notificacionService.eliminarNotificacionUsuario(notificacionId).subscribe({
      next: () => {
        this.notificacionesRecientes = this.notificacionesRecientes.filter((n) => n.id !== notificacionId);
        this.totalNotifications = Math.max(0, this.totalNotifications - 1);
        this.notificacionService.actualizarContadorNoLeidas();
      },
      error: () => {
      }
    }));
  }
  eliminarTodasNotificaciones(event) {
    event.stopPropagation();
    if (this.notificacionesRecientes.length === 0)
      return;
    this.subscriptions.push(this.notificacionService.eliminarTodasNotificaciones().subscribe({
      next: () => {
        this.notificacionesRecientes = [];
        this.totalNotifications = 0;
        this.contadorNoLeidas = 0;
        this.hasMoreNotifications = false;
        this.showEndMessage = false;
        this.notificacionService.actualizarContadorNoLeidas();
      },
      error: () => {
      }
    }));
  }
  static {
    this.\u0275fac = function NotificationBellComponent_Factory(t) {
      return new (t || _NotificationBellComponent)(\u0275\u0275directiveInject(NotificacionService), \u0275\u0275directiveInject(WebSocketService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationBellComponent, selectors: [["app-notification-bell"]], hostBindings: function NotificationBellComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function NotificationBellComponent_click_HostBindingHandler($event) {
          return ctx.onDocumentClick($event);
        }, false, \u0275\u0275resolveDocument)("keydown.escape", function NotificationBellComponent_keydown_escape_HostBindingHandler() {
          return ctx.onEscapeKey();
        }, false, \u0275\u0275resolveDocument);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 5, consts: [["notificationsList", ""], ["class", "relative inline-block", 4, "ngIf"], ["class", "backdrop", 3, "click", 4, "ngIf"], ["class", "dropdown", 4, "ngIf"], [3, "modalClosed", "isVisible", "notificationId"], [1, "relative", "inline-block"], [1, "bell-btn", 3, "click"], [1, "fas", "fa-bell"], ["class", "badge", 4, "ngIf"], [1, "badge"], [1, "backdrop", 3, "click"], [1, "dropdown"], [1, "header"], [1, "header-actions"], ["class", "clear-all", "title", "Eliminar todas", 3, "click", 4, "ngIf"], [1, "close", 3, "click"], [1, "list", 3, "scroll"], ["class", "loading", 4, "ngIf"], ["class", "item", 3, "unread", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "loading-more", 4, "ngIf"], ["class", "end", 4, "ngIf"], ["class", "empty", 4, "ngIf"], [1, "footer"], [1, "view-all", 3, "click"], ["title", "Eliminar todas", 1, "clear-all", 3, "click"], [1, "fas", "fa-trash-alt"], [1, "loading"], [1, "spinner"], [1, "item"], ["class", "dot", 4, "ngIf"], [1, "content", 3, "click"], [1, "title"], [1, "message"], [1, "time"], [1, "actions"], ["title", "Eliminar notificaci\xF3n", 1, "delete-btn", 3, "click"], [1, "fas", "fa-times"], [1, "dot"], [1, "loading-more"], [1, "spinner-sm"], [1, "end"], [1, "fas", "fa-check"], [1, "empty"], [1, "fas", "fa-bell-slash"]], template: function NotificationBellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, NotificationBellComponent_div_0_Template, 4, 1, "div", 1)(1, NotificationBellComponent_div_1_Template, 1, 0, "div", 2)(2, NotificationBellComponent_div_2_Template, 18, 8, "div", 3);
        \u0275\u0275elementStart(3, "app-notification-detail-modal", 4);
        \u0275\u0275listener("modalClosed", function NotificationBellComponent_Template_app_notification_detail_modal_modalClosed_3_listener() {
          return ctx.closeModal();
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.usuarioAutenticado);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarDropdown);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mostrarDropdown);
        \u0275\u0275advance();
        \u0275\u0275property("isVisible", ctx.modalVisible)("notificationId", ctx.selectedNotificationId);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, NotificationDetailModalComponent], styles: ["/* src/app/shared/components/notification-bell/notification-bell.component.css */\n.bell-btn {\n  position: relative;\n  cursor: pointer;\n  padding: 8px;\n  color: #666;\n  font-size: 18px;\n}\n.bell-btn:hover {\n  color: #333;\n}\n.badge {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  background: #ff4757;\n  color: white;\n  border-radius: 10px;\n  padding: 2px 6px;\n  font-size: 11px;\n  min-width: 16px;\n  text-align: center;\n}\n.backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 999;\n}\n.dropdown {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 350px;\n  max-width: calc(100vw - 40px);\n  background: white;\n  border: 1px solid #ddd;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n  z-index: 1001;\n}\n.header {\n  padding: 12px 16px;\n  border-bottom: 1px solid #eee;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: 600;\n  font-size: 14px;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.clear-all,\n.close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #999;\n  padding: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.clear-all {\n  font-size: 14px;\n}\n.close {\n  font-size: 20px;\n}\n.clear-all:hover {\n  background: #ffebee;\n  color: #d32f2f;\n}\n.close:hover {\n  color: #666;\n  background: #f5f5f5;\n}\n.list {\n  max-height: 300px;\n  overflow-y: auto;\n}\n.item {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f5f5f5;\n  position: relative;\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n}\n.item:hover {\n  background: #f8f9fa;\n}\n.item:hover .actions {\n  opacity: 1;\n}\n.item.unread {\n  background: #f0f8ff;\n  border-left: 3px solid #007bff;\n}\n.dot {\n  width: 8px;\n  height: 8px;\n  background: #007bff;\n  border-radius: 50%;\n  margin-top: 4px;\n  flex-shrink: 0;\n}\n.content {\n  flex: 1;\n  min-width: 0;\n  cursor: pointer;\n}\n.actions {\n  display: flex;\n  align-items: flex-start;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.delete-btn {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #999;\n  padding: 2px;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 3px;\n  font-size: 12px;\n  transition: all 0.2s;\n}\n.delete-btn:hover {\n  background: #ffebee;\n  color: #d32f2f;\n}\n.title {\n  font-weight: 500;\n  font-size: 13px;\n  margin-bottom: 4px;\n  color: #333;\n  line-height: 1.3;\n}\n.message {\n  font-size: 12px;\n  color: #666;\n  margin-bottom: 4px;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.time {\n  font-size: 11px;\n  color: #999;\n}\n.loading,\n.loading-more {\n  padding: 20px;\n  text-align: center;\n  color: #666;\n  font-size: 13px;\n}\n.spinner,\n.spinner-sm {\n  border: 2px solid #f3f3f3;\n  border-top: 2px solid #007bff;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 8px;\n}\n.spinner {\n  width: 20px;\n  height: 20px;\n}\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n}\n.end,\n.empty {\n  padding: 20px;\n  text-align: center;\n  color: #999;\n  font-size: 13px;\n}\n.end i,\n.empty i {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 16px;\n}\n.footer {\n  padding: 12px 16px;\n  border-top: 1px solid #eee;\n}\n.view-all {\n  width: 100%;\n  padding: 8px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 13px;\n}\n.view-all:hover {\n  background: #0056b3;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 480px) {\n  .dropdown {\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: calc(100vw - 20px);\n    max-width: none;\n  }\n  .actions {\n    opacity: 1;\n  }\n  .delete-btn {\n    width: 24px;\n    height: 24px;\n    font-size: 14px;\n  }\n  .clear-all {\n    width: 28px;\n    height: 28px;\n    font-size: 16px;\n  }\n}\n/*# sourceMappingURL=notification-bell.component.css.map */\n"], encapsulation: 2, data: { animation: [
      trigger("fadeIn", [
        transition(":enter", [
          style({ opacity: 0, transform: "scale(0)" }),
          animate("200ms ease-out", style({ opacity: 1, transform: "scale(1)" }))
        ])
      ]),
      trigger("slideDown", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(-10px)" }),
          animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
        ]),
        transition(":leave", [
          animate("200ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))
        ])
      ]),
      trigger("slideIn", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateX(-20px)" }),
          animate("200ms ease-out", style({ opacity: 1, transform: "translateX(0)" }))
        ])
      ])
    ] } });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationBellComponent, { className: "NotificationBellComponent" });
})();

// src/app/shared/layout/layout.component.ts
function LayoutComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275listener("click", function LayoutComponent_div_1_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSidebar($event));
    });
    \u0275\u0275elementEnd();
  }
}
function LayoutComponent_img_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 22);
  }
}
function LayoutComponent_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sistema Tr\xE1mites");
    \u0275\u0275elementEnd();
  }
}
function LayoutComponent_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "ST");
    \u0275\u0275elementEnd();
  }
}
function LayoutComponent_li_15_a_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.label);
  }
}
function LayoutComponent_li_15_a_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 27);
    \u0275\u0275element(1, "i");
    \u0275\u0275template(2, LayoutComponent_li_15_a_1_span_2_Template, 2, 1, "span", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", item_r3.route)("title", ctx_r1.sidebarCollapsed ? item_r3.label : "");
    \u0275\u0275advance();
    \u0275\u0275classMap(item_r3.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.sidebarCollapsed);
  }
}
function LayoutComponent_li_15_div_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.label);
  }
}
function LayoutComponent_li_15_div_2_i_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 32);
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("rotated", item_r3.expanded);
  }
}
function LayoutComponent_li_15_div_2_ul_5_li_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 35)(1, "a", 36);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const subitem_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", subitem_r5.route);
    \u0275\u0275advance();
    \u0275\u0275classMap(subitem_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(subitem_r5.label);
  }
}
function LayoutComponent_li_15_div_2_ul_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 33);
    \u0275\u0275template(1, LayoutComponent_li_15_div_2_ul_5_li_1_Template, 5, 4, "li", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", item_r3.submenu);
  }
}
function LayoutComponent_li_15_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "button", 29);
    \u0275\u0275listener("click", function LayoutComponent_li_15_div_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const item_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSubmenu(item_r3));
    });
    \u0275\u0275element(2, "i");
    \u0275\u0275template(3, LayoutComponent_li_15_div_2_span_3_Template, 2, 1, "span", 6)(4, LayoutComponent_li_15_div_2_i_4_Template, 1, 2, "i", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, LayoutComponent_li_15_div_2_ul_5_Template, 2, 1, "ul", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("expanded", item_r3.expanded);
    \u0275\u0275property("title", ctx_r1.sidebarCollapsed ? item_r3.label : "");
    \u0275\u0275advance();
    \u0275\u0275classMap(item_r3.icon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.sidebarCollapsed);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.sidebarCollapsed);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r3.expanded && !ctx_r1.sidebarCollapsed);
  }
}
function LayoutComponent_li_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 24);
    \u0275\u0275template(1, LayoutComponent_li_15_a_1_Template, 3, 5, "a", 25)(2, LayoutComponent_li_15_div_2_Template, 6, 8, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r3.submenu);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r3.submenu);
  }
}
function LayoutComponent_div_16_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre, " ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.apellidos, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.role == null ? null : ctx_r1.currentUser.role.name);
  }
}
function LayoutComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38)(2, "div", 39);
    \u0275\u0275element(3, "img", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, LayoutComponent_div_16_div_4_Template, 5, 3, "div", 41);
    \u0275\u0275elementStart(5, "button", 42);
    \u0275\u0275listener("click", function LayoutComponent_div_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275element(6, "i", 43);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("collapsed", ctx_r1.sidebarCollapsed);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.foto) || "/assets/default-avatar.png", \u0275\u0275sanitizeUrl)("alt", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.sidebarCollapsed);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r1.sidebarCollapsed ? "Cerrar Sesi\xF3n" : "");
  }
}
function LayoutComponent_header_18_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 59)(1, "button", 60);
    \u0275\u0275listener("click", function LayoutComponent_header_18_div_22_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleUserDropdown($event));
    });
    \u0275\u0275element(2, "img", 61);
    \u0275\u0275elementStart(3, "div", 62)(4, "div", 45);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 63);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 64);
    \u0275\u0275element(9, "polyline", 65);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 66)(11, "a", 67);
    \u0275\u0275listener("click", function LayoutComponent_header_18_div_22_Template_a_click_11_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewProfile($event));
    });
    \u0275\u0275element(12, "i", 68);
    \u0275\u0275text(13, " Ver Perfil ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "a", 67);
    \u0275\u0275listener("click", function LayoutComponent_header_18_div_22_Template_a_click_14_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changePassword($event));
    });
    \u0275\u0275element(15, "i", 69);
    \u0275\u0275text(16, " Cambiar Contrase\xF1a ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "div", 70);
    \u0275\u0275elementStart(18, "a", 71);
    \u0275\u0275listener("click", function LayoutComponent_header_18_div_22_Template_a_click_18_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logout($event));
    });
    \u0275\u0275element(19, "i", 43);
    \u0275\u0275text(20, " Cerrar Sesi\xF3n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.foto) || "/assets/default-avatar.png", \u0275\u0275sanitizeUrl)("alt", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre, " ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.apellidos, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.correo);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("show", ctx_r1.showUserDropdown);
  }
}
function LayoutComponent_header_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 47)(1, "div", 48)(2, "div", 49)(3, "div", 50)(4, "h1", 51);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 52);
    \u0275\u0275text(7, "Panel de Administraci\xF3n - Universidad Nacional de Tumbes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 53);
    \u0275\u0275listener("click", function LayoutComponent_header_18_Template_button_click_8_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSidebar($event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 9);
    \u0275\u0275element(10, "line", 10)(11, "line", 11)(12, "line", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "div", 54)(14, "span", 55);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 56);
    \u0275\u0275text(17, ">");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 55);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 57);
    \u0275\u0275element(21, "app-notification-bell");
    \u0275\u0275template(22, LayoutComponent_header_18_div_22_Template, 21, 7, "div", 58);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\xA1Bienvenido, ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre, "!");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.role == null ? null : ctx_r1.currentUser.role.name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getPageTitle());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.currentUser);
  }
}
function LayoutComponent_header_19_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 79)(1, "button", 80);
    \u0275\u0275listener("click", function LayoutComponent_header_19_div_16_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleUserDropdown($event));
    });
    \u0275\u0275element(2, "img", 81);
    \u0275\u0275elementStart(3, "div", 82)(4, "div", 83);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 84);
    \u0275\u0275text(7, "Estudiante");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 64);
    \u0275\u0275element(9, "polyline", 65);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 85)(11, "a", 86);
    \u0275\u0275listener("click", function LayoutComponent_header_19_div_16_Template_a_click_11_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewProfile($event));
    });
    \u0275\u0275element(12, "i", 68);
    \u0275\u0275text(13, " Mi Perfil ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "a", 86);
    \u0275\u0275listener("click", function LayoutComponent_header_19_div_16_Template_a_click_14_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewStudentNotifications($event));
    });
    \u0275\u0275element(15, "i", 87);
    \u0275\u0275text(16, " Ver Notificaciones ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "a", 86);
    \u0275\u0275listener("click", function LayoutComponent_header_19_div_16_Template_a_click_17_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.changePassword($event));
    });
    \u0275\u0275element(18, "i", 69);
    \u0275\u0275text(19, " Cambiar Contrase\xF1a ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "div", 88);
    \u0275\u0275elementStart(21, "a", 89);
    \u0275\u0275listener("click", function LayoutComponent_header_19_div_16_Template_a_click_21_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.logout($event));
    });
    \u0275\u0275element(22, "i", 43);
    \u0275\u0275text(23, " Cerrar Sesi\xF3n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.foto) || "/assets/default-avatar.png", \u0275\u0275sanitizeUrl)("alt", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre, " ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.apellidos, "");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("show", ctx_r1.showUserDropdown);
  }
}
function LayoutComponent_header_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 72)(1, "div", 73)(2, "div", 74)(3, "button", 53);
    \u0275\u0275listener("click", function LayoutComponent_header_19_Template_button_click_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSidebar($event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 9);
    \u0275\u0275element(5, "line", 10)(6, "line", 11)(7, "line", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 75)(9, "h1");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Bienvenido");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(13, "div", 76);
    \u0275\u0275elementStart(14, "div", 77);
    \u0275\u0275element(15, "app-notification-bell");
    \u0275\u0275template(16, LayoutComponent_header_19_div_16_Template, 24, 6, "div", 78);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("\xA1Hola, ", ctx_r1.getFirstName(ctx_r1.currentUser == null ? null : ctx_r1.currentUser.nombre), "!");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.currentUser);
  }
}
var LayoutComponent = class _LayoutComponent {
  constructor(authService, router, misTramitesService) {
    this.authService = authService;
    this.router = router;
    this.misTramitesService = misTramitesService;
    this.currentUser = null;
    this.sidebarCollapsed = false;
    this.showUserDropdown = false;
    this.menuItems = [];
    this.userRole = "";
    this.studentStats = null;
  }
  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.updateMenuItems();
      if (user) {
        this.userRole = user.role?.name?.toLowerCase() || "";
        if (this.userRole === "estudiante") {
          this.loadStudentStats();
        }
      }
    });
  }
  loadStudentStats() {
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];
        const tramitesActivos = tramites.filter((t) => ["En Revisi\xF3n", "Enviado", "En Proceso", "Aprobado", "Derivado"].includes(t.estado?.nombre)).length;
        const tramitesCompletados = tramites.filter((t) => ["Finalizado", "Archivado"].includes(t.estado?.nombre) || t.estaVencido).length;
        this.studentStats = {
          tramitesActivos,
          tramitesCompletados,
          totalTramites: tramites.length
        };
      },
      error: () => {
        this.studentStats = {
          tramitesActivos: 0,
          tramitesCompletados: 0,
          totalTramites: 0
        };
      }
    });
  }
  toggleSidebar(event) {
    if (event) {
      event.stopPropagation();
    }
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  toggleUserDropdown(event) {
    if (event) {
      event.stopPropagation();
    }
    this.showUserDropdown = !this.showUserDropdown;
  }
  toggleSubmenu(item) {
    item.expanded = !item.expanded;
  }
  getPageTitle() {
    return "Inicio";
  }
  updateMenuItems() {
    if (!this.currentUser || !this.currentUser.role)
      return;
    const adminMenu = [
      { label: "Inicio", route: "/admin/tablero", icon: "fas fa-home" },
      { label: "Gesti\xF3n de Tr\xE1mites", route: "/admin/tramites", icon: "fas fa-file-alt" },
      { label: "Reportes", route: "/admin/reportes", icon: "fas fa-chart-bar" },
      {
        label: "Configuraci\xF3n",
        icon: "fas fa-cog",
        submenu: [
          { label: "Gesti\xF3n de usuarios", route: "/admin/gestion-usuarios", icon: "fas fa-users" },
          { label: "Gesti\xF3n de roles", route: "/admin/gestion-roles", icon: "fas fa-shield-alt" }
        ]
      },
      {
        label: "Administraci\xF3n Institucional",
        icon: "fas fa-university",
        submenu: [
          { label: "Organigrama", route: "/admin/organigrama", icon: "fas fa-sitemap" },
          { label: "Gesti\xF3n de \xE1reas", route: "/admin/areas", icon: "fas fa-building" }
        ]
      }
    ];
    const administrativoMenu = [
      { label: "Inicio", route: "/administrativo/tablero", icon: "fas fa-home" },
      { label: "Mis Tr\xE1mites", route: "/administrativo/mis-tramites", icon: "fas fa-file-alt" }
    ];
    const usuarioMenu = [
      { label: "Inicio", route: "/usuario/tablero", icon: "fas fa-home" },
      { label: "Mis Tr\xE1mites", route: "/usuario/mis-tramites", icon: "fas fa-file-alt" }
    ];
    const estudianteMenu = [
      { label: "Inicio", route: "/estudiante/tablero", icon: "fas fa-home" },
      { label: "Mis Tr\xE1mites", route: "/estudiante/mis-tramites", icon: "fas fa-folder-open" }
    ];
    const roleMenus = {
      "ADMIN": adminMenu,
      "admin": adminMenu,
      "Admin": adminMenu,
      "ADMINISTRATIVO": administrativoMenu,
      "administrativo": administrativoMenu,
      "Administrativo": administrativoMenu,
      "USUARIO": usuarioMenu,
      "usuario": usuarioMenu,
      "Usuario": usuarioMenu,
      "ESTUDIANTE": estudianteMenu,
      "estudiante": estudianteMenu,
      "Estudiante": estudianteMenu
    };
    this.menuItems = roleMenus[this.currentUser.role.name] || [];
  }
  viewProfile(event) {
    event.preventDefault();
    this.showUserDropdown = false;
    const profileRoute = this.getProfileRoute();
    if (profileRoute) {
      window.location.href = profileRoute;
    }
  }
  getProfileRoute() {
    return "/perfil";
  }
  changePassword(event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(["/cambiar-contrasena"]);
  }
  logout(event) {
    if (event) {
      event.preventDefault();
    }
    this.showUserDropdown = false;
    this.authService.logout();
  }
  getFirstName(fullName) {
    if (!fullName)
      return "Estudiante";
    return fullName.split(" ")[0];
  }
  viewStudentNotifications(event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(["/estudiante/notificaciones"]);
  }
  onDocumentClick(event) {
    const target = event.target;
    const userDropdown = target.closest(".user-dropdown");
    if (!userDropdown) {
      this.showUserDropdown = false;
    }
  }
  static {
    this.\u0275fac = function LayoutComponent_Factory(t) {
      return new (t || _LayoutComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MisTramitesService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LayoutComponent, selectors: [["app-layout"]], hostBindings: function LayoutComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function LayoutComponent_click_HostBindingHandler($event) {
          return ctx.onDocumentClick($event);
        }, false, \u0275\u0275resolveDocument);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 12, consts: [[1, "layout-container"], ["class", "mobile-overlay", 3, "click", 4, "ngIf"], [1, "sidebar"], [1, "sidebar-header"], [1, "logo"], ["src", "/assets/logo.png", "alt", "Logo", 4, "ngIf"], [4, "ngIf"], ["class", "logo-mini", 4, "ngIf"], [1, "toggle-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["x1", "3", "y1", "12", "x2", "21", "y2", "12"], ["x1", "3", "y1", "18", "x2", "21", "y2", "18"], [1, "sidebar-nav"], [1, "nav-list"], ["class", "nav-item", 4, "ngFor", "ngForOf"], ["class", "sidebar-footer", 4, "ngIf"], [1, "main-content"], ["class", "header", 4, "ngIf"], ["class", "student-clean-header", 4, "ngIf"], [1, "page-content"], [1, "mobile-overlay", 3, "click"], ["src", "/assets/logo.png", "alt", "Logo"], [1, "logo-mini"], [1, "nav-item"], ["routerLinkActive", "active", "class", "nav-link", 3, "routerLink", "title", 4, "ngIf"], ["class", "nav-item-dropdown", 4, "ngIf"], ["routerLinkActive", "active", 1, "nav-link", 3, "routerLink", "title"], [1, "nav-item-dropdown"], [1, "nav-link", "dropdown-toggle", 3, "click", "title"], ["class", "fas fa-chevron-down submenu-arrow", 3, "rotated", 4, "ngIf"], ["class", "submenu", 4, "ngIf"], [1, "fas", "fa-chevron-down", "submenu-arrow"], [1, "submenu"], ["class", "submenu-item", 4, "ngFor", "ngForOf"], [1, "submenu-item"], ["routerLinkActive", "active", 1, "submenu-link", 3, "routerLink"], [1, "sidebar-footer"], [1, "user-profile"], [1, "user-avatar"], ["onerror", "this.src='/assets/default-avatar.png'", 3, "src", "alt"], ["class", "user-info", 4, "ngIf"], [1, "logout-btn", 3, "click", "title"], [1, "fas", "fa-sign-out-alt"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "header"], [1, "header-left"], [1, "header-top-row"], [1, "greeting-section"], [1, "greeting-title"], [1, "greeting-subtitle"], [1, "mobile-toggle-btn", 3, "click"], [1, "breadcrumb"], [1, "breadcrumb-item"], [1, "separator"], [1, "header-right"], ["class", "user-dropdown", 4, "ngIf"], [1, "user-dropdown"], [1, "user-dropdown-btn", 3, "click"], ["onerror", "this.src='/assets/default-avatar.png'", 1, "user-avatar-sm", 3, "src", "alt"], [1, "user-details"], [1, "user-email"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "6,9 12,15 18,9"], [1, "dropdown-menu"], ["href", "#", 1, "dropdown-item", 3, "click"], [1, "fas", "fa-user-circle"], [1, "fas", "fa-key"], [1, "dropdown-divider"], ["href", "#", 1, "dropdown-item", "logout-item", 3, "click"], [1, "student-clean-header"], [1, "student-header-content"], [1, "student-greeting"], [1, "greeting-text"], [1, "student-center-space"], [1, "student-user-actions"], ["class", "student-user-dropdown", 4, "ngIf"], [1, "student-user-dropdown"], [1, "student-user-btn", 3, "click"], ["onerror", "this.src='/assets/default-avatar.png'", 1, "student-user-avatar", 3, "src", "alt"], [1, "student-user-info"], [1, "student-user-name"], [1, "student-user-role"], [1, "student-dropdown-menu"], ["href", "#", 1, "student-dropdown-item", 3, "click"], [1, "fas", "fa-bell"], [1, "student-dropdown-divider"], ["href", "#", 1, "student-dropdown-item", "logout-item", 3, "click"]], template: function LayoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, LayoutComponent_div_1_Template, 1, 0, "div", 1);
        \u0275\u0275elementStart(2, "aside", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275template(5, LayoutComponent_img_5_Template, 1, 0, "img", 5)(6, LayoutComponent_span_6_Template, 2, 0, "span", 6)(7, LayoutComponent_span_7_Template, 2, 0, "span", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "button", 8);
        \u0275\u0275listener("click", function LayoutComponent_Template_button_click_8_listener($event) {
          return ctx.toggleSidebar($event);
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 9);
        \u0275\u0275element(10, "line", 10)(11, "line", 11)(12, "line", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(13, "nav", 13)(14, "ul", 14);
        \u0275\u0275template(15, LayoutComponent_li_15_Template, 3, 2, "li", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(16, LayoutComponent_div_16_Template, 7, 6, "div", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div", 17);
        \u0275\u0275template(18, LayoutComponent_header_18_Template, 23, 4, "header", 18)(19, LayoutComponent_header_19_Template, 17, 2, "header", 19);
        \u0275\u0275elementStart(20, "main", 20);
        \u0275\u0275element(21, "router-outlet");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(22, "app-modal")(23, "app-toast");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.sidebarCollapsed);
        \u0275\u0275advance();
        \u0275\u0275classProp("collapsed", ctx.sidebarCollapsed);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", !ctx.sidebarCollapsed);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.sidebarCollapsed);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.sidebarCollapsed);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngForOf", ctx.menuItems);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentUser);
        \u0275\u0275advance();
        \u0275\u0275classProp("sidebar-collapsed", ctx.sidebarCollapsed);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.userRole !== "estudiante");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.userRole === "estudiante");
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule, RouterOutlet, RouterLink, RouterLinkActive, ModalComponent, ToastComponent, NotificationBellComponent], styles: ["\n\n.layout-container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  overflow: hidden;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 280px;\n  background: #2c3e50;\n  color: white;\n  transition: all 0.3s ease;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  z-index: 1000;\n}\n.sidebar.collapsed[_ngcontent-%COMP%] {\n  width: 70px;\n}\n.sidebar-header[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-bottom: 1px solid #34495e;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 70px;\n}\n.logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-weight: 600;\n  font-size: 18px;\n}\n.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n}\n.logo-mini[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n  text-align: center;\n  width: 100%;\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  background: #34495e;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px 0;\n  overflow-y: auto;\n}\n.nav-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.nav-item[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.nav-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px 20px;\n  color: #bdc3c7;\n  text-decoration: none;\n  transition: all 0.3s ease;\n  gap: 12px;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  background: #34495e;\n  color: white;\n}\n.nav-link.active[_ngcontent-%COMP%] {\n  background: #3498db;\n  color: white;\n}\n.nav-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 20px;\n  text-align: center;\n  font-size: 18px;\n}\n.sidebar.collapsed[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 12px;\n}\n.nav-item-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n.dropdown-toggle[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n  width: 100%;\n  text-align: left;\n}\n.submenu-arrow[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 12px !important;\n  width: 12px !important;\n  transition: transform 0.3s ease;\n}\n.submenu-arrow.rotated[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.submenu[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  background: #1e2b37;\n  border-radius: 4px;\n  margin-top: 4px;\n  overflow: hidden;\n}\n.submenu-item[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.submenu-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 10px 20px 10px 40px;\n  color: #bdc3c7;\n  text-decoration: none;\n  transition: all 0.3s ease;\n  gap: 12px;\n  font-size: 14px;\n}\n.submenu-link[_ngcontent-%COMP%]:hover {\n  background: #34495e;\n  color: white;\n}\n.submenu-link.active[_ngcontent-%COMP%] {\n  background: #3498db;\n  color: white;\n}\n.submenu-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 16px;\n  text-align: center;\n  font-size: 14px;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-top: 1px solid #34495e;\n}\n.user-profile[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  position: relative;\n}\n.user-profile.collapsed[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.user-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #95a5a6;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #bdc3c7;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 4px;\n  transition: all 0.3s ease;\n  font-size: 18px;\n}\n.logout-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  display: block;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  color: #e74c3c;\n  background: #34495e;\n  transform: scale(1.05);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  transition: all 0.3s ease;\n  overflow: hidden;\n}\n.header[_ngcontent-%COMP%] {\n  background: white;\n  border-bottom: 1px solid #dee2e6;\n  padding: 20px 30px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 70px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.header-left[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 4px 0;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #6c757d;\n}\n.breadcrumb-item[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.separator[_ngcontent-%COMP%] {\n  color: #dee2e6;\n}\n.header-top-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  width: 100%;\n}\n.greeting-section[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-bottom: 8px;\n}\n.greeting-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 4px 0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.greeting-subtitle[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #6c757d;\n  margin: 0;\n  font-weight: 400;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n}\n.mobile-toggle-btn[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: none;\n  color: #6c757d;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.mobile-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n  color: #2c3e50;\n}\n.user-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n.user-dropdown-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 8px 12px;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n}\n.user-dropdown-btn[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n.user-avatar-sm[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.user-details[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.user-details[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 14px;\n  color: #2c3e50;\n}\n.user-details[_ngcontent-%COMP%]   .user-email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6c757d;\n}\n.notifications-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  margin-right: 16px;\n}\n.notification-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n  position: relative;\n  color: #6c757d;\n  font-size: 20px;\n  transition: color 0.3s ease;\n}\n.notification-btn[_ngcontent-%COMP%]:hover {\n  color: #495057;\n}\n.notification-btn.has-notifications[_ngcontent-%COMP%] {\n  color: #2c5aa0;\n}\n.notification-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  background: #dc3545;\n  color: white;\n  font-size: 10px;\n  font-weight: bold;\n  padding: 2px 6px;\n  border-radius: 10px;\n  min-width: 18px;\n  text-align: center;\n}\n.notifications-dropdown[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n  width: 380px;\n  max-height: 500px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1001;\n  margin-top: 8px;\n}\n.notifications-dropdown.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n.notifications-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #e9ecef;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.notifications-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  color: #2c3e50;\n}\n.mark-all-read[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #2c5aa0;\n  font-size: 12px;\n  cursor: pointer;\n  transition: color 0.3s ease;\n}\n.mark-all-read[_ngcontent-%COMP%]:hover {\n  color: #1e3a5f;\n  text-decoration: underline;\n}\n.notifications-body[_ngcontent-%COMP%] {\n  max-height: 350px;\n  overflow-y: auto;\n}\n.notification-item[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-bottom: 1px solid #f0f0f0;\n  cursor: pointer;\n  transition: background 0.3s ease;\n  display: flex;\n  gap: 12px;\n}\n.notification-item[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n.notification-item.unread[_ngcontent-%COMP%] {\n  background: #f0f8ff;\n  border-left: 3px solid #2c5aa0;\n}\n.notification-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: 16px;\n}\n.notification-icon.nuevo[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.notification-icon.derivado[_ngcontent-%COMP%] {\n  background: #cce5ff;\n  color: #004085;\n}\n.notification-icon.aprobado[_ngcontent-%COMP%] {\n  background: #d1f2eb;\n  color: #00695c;\n}\n.notification-icon.rechazado[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.notification-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.notification-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #2c3e50;\n}\n.notification-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 13px;\n  color: #6c757d;\n}\n.notification-time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #adb5bd;\n}\n.empty-notifications[_ngcontent-%COMP%] {\n  padding: 40px;\n  text-align: center;\n  color: #6c757d;\n}\n.empty-notifications[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #dee2e6;\n  margin-bottom: 12px;\n}\n.notifications-footer[_ngcontent-%COMP%] {\n  padding: 12px;\n  border-top: 1px solid #e9ecef;\n  text-align: center;\n}\n.notifications-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #2c5aa0;\n  text-decoration: none;\n  font-size: 14px;\n  font-weight: 500;\n}\n.notifications-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n@media (max-width: 768px) {\n  .notifications-wrapper[_ngcontent-%COMP%] {\n    margin-right: 12px;\n  }\n  .notifications-dropdown[_ngcontent-%COMP%] {\n    width: 320px;\n    right: 50%;\n    transform: translateX(50%);\n    left: auto;\n  }\n  .notifications-dropdown.show[_ngcontent-%COMP%] {\n    transform: translateX(50%) translateY(0);\n  }\n  .notification-item[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n  }\n  .notification-icon[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: 14px;\n  }\n  .notification-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .notification-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .notifications-header[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .notifications-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .mark-all-read[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .notifications-footer[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .notifications-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .notifications-dropdown[_ngcontent-%COMP%] {\n    width: 300px;\n    right: 50%;\n    transform: translateX(50%);\n    max-height: 400px;\n    left: auto;\n  }\n  .notifications-dropdown.show[_ngcontent-%COMP%] {\n    transform: translateX(50%) translateY(0);\n  }\n  .notification-item[_ngcontent-%COMP%] {\n    padding: 8px 10px;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .notification-icon[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n    font-size: 12px;\n    align-self: center;\n  }\n  .notification-content[_ngcontent-%COMP%] {\n    text-align: center;\n    width: 100%;\n  }\n  .notification-content[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 6px;\n  }\n  .notification-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 11px;\n    line-height: 1.3;\n  }\n  .notification-time[_ngcontent-%COMP%] {\n    font-size: 10px;\n    margin-top: 4px;\n  }\n  .empty-notifications[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .empty-notifications[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n  .empty-notifications[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 360px) {\n  .notifications-dropdown[_ngcontent-%COMP%] {\n    width: calc(100vw - 30px);\n    right: 50%;\n    transform: translateX(50%);\n    left: auto;\n    max-width: 350px;\n  }\n  .notifications-dropdown.show[_ngcontent-%COMP%] {\n    transform: translateX(50%) translateY(0);\n  }\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  min-width: 200px;\n  padding: 8px 0;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n}\n.dropdown-menu.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  color: #2c3e50;\n  text-decoration: none;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.dropdown-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 18px;\n  text-align: center;\n  color: #6c757d;\n  font-size: 16px;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n  color: #2c3e50;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.dropdown-item.logout-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.dropdown-item.logout-item[_ngcontent-%COMP%]:hover {\n  background: #fff5f5;\n}\n.dropdown-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #dee2e6;\n  margin: 8px 0;\n}\n.page-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 30px;\n  overflow-y: auto;\n  background: #f8f9fa;\n}\n.mobile-overlay[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 768px) {\n  .sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    left: -320px;\n    top: 0;\n    bottom: 0;\n    width: 320px;\n    height: 100vh;\n    z-index: 1001;\n    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.2);\n    transition: left 0.3s ease;\n    overflow-y: auto;\n  }\n  .sidebar[_ngcontent-%COMP%]:not(.collapsed) {\n    left: 0;\n  }\n  .main-content[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .header[_ngcontent-%COMP%] {\n    padding: 15px 20px;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n    min-height: auto;\n  }\n  .header-left[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .greeting-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .greeting-subtitle[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .header-right[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n  .mobile-toggle-btn[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .mobile-overlay[_ngcontent-%COMP%] {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 1000;\n  }\n  .page-content[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .user-details[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 480px) {\n  .header[_ngcontent-%COMP%] {\n    padding: 10px 15px;\n  }\n  .greeting-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .greeting-subtitle[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .breadcrumb[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n.student-clean-header[_ngcontent-%COMP%] {\n  background: white;\n  border-bottom: 1px solid #e9ecef;\n  padding: 20px 30px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-height: 70px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);\n}\n.student-header-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: center;\n  width: 100%;\n  gap: 1rem;\n}\n.student-greeting[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.greeting-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #2c3e50;\n  margin: 0 0 4px 0;\n}\n.greeting-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6c757d;\n  margin: 0;\n}\n.student-user-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 15px;\n}\n.student-user-dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n.student-user-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 8px 12px;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n}\n.student-user-btn[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n}\n.student-user-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.student-user-info[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.student-user-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 14px;\n  color: #2c3e50;\n  margin: 0;\n}\n.student-user-role[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6c757d;\n  margin: 0;\n}\n.student-dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  background: white;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n  min-width: 200px;\n  padding: 8px 0;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n  margin-top: 8px;\n}\n.student-dropdown-menu.show[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n.student-dropdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  color: #2c3e50;\n  text-decoration: none;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.student-dropdown-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 18px;\n  text-align: center;\n  color: #6c757d;\n  font-size: 16px;\n}\n.student-dropdown-item[_ngcontent-%COMP%]:hover {\n  background: #f8f9fa;\n  color: #2c3e50;\n}\n.student-dropdown-item[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.student-dropdown-item.logout-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.student-dropdown-item.logout-item[_ngcontent-%COMP%]:hover {\n  background: #fff5f5;\n}\n.student-dropdown-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #dee2e6;\n  margin: 8px 0;\n}\n@media (max-width: 768px) {\n  .student-clean-header[_ngcontent-%COMP%] {\n    padding: 15px 20px;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n    min-height: auto;\n  }\n  .student-header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 15px;\n  }\n  .greeting-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .greeting-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .student-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-end;\n  }\n}\n@media (max-width: 480px) {\n  .student-clean-header[_ngcontent-%COMP%] {\n    padding: 12px 15px;\n  }\n  .greeting-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .greeting-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .student-user-info[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .student-user-avatar[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n  }\n}\n/*# sourceMappingURL=layout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LayoutComponent, { className: "LayoutComponent" });
})();
export {
  LayoutComponent
};
//# sourceMappingURL=chunk-FX2ATXMW.js.map
