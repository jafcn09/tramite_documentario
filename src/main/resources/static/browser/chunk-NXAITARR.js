import {
  BehaviorSubject,
  __spreadProps,
  __spreadValues,
  timer,
  ɵɵdefineInjectable
} from "./chunk-VDZBNFIH.js";

// src/app/services/toast.service.ts
var ToastService = class _ToastService {
  constructor() {
    this.toasts = new BehaviorSubject([]);
    this.toasts$ = this.toasts.asObservable();
    this.defaultConfig = {
      position: "top-right",
      maxToasts: 5,
      defaultDuration: 5e3,
      closeOnClick: true,
      preventDuplicates: true
    };
    this.config = __spreadValues({}, this.defaultConfig);
  }
  configure(config) {
    this.config = __spreadValues(__spreadValues({}, this.config), config);
  }
  show(toast) {
    const newToast = __spreadProps(__spreadValues({}, toast), {
      id: this.generateId(),
      timestamp: /* @__PURE__ */ new Date(),
      duration: toast.duration ?? this.config.defaultDuration,
      showCloseButton: toast.showCloseButton ?? true
    });
    if (this.config.preventDuplicates && this.isDuplicate(newToast)) {
      return;
    }
    const currentToasts = this.toasts.value;
    let updatedToasts = [...currentToasts, newToast];
    if (this.config.maxToasts && updatedToasts.length > this.config.maxToasts) {
      updatedToasts = updatedToasts.slice(-this.config.maxToasts);
    }
    this.toasts.next(updatedToasts);
    if (newToast.duration && newToast.duration > 0) {
      timer(newToast.duration).subscribe(() => {
        this.remove(newToast.id);
      });
    }
  }
  success(title, message, duration) {
    this.show({
      type: "success",
      title,
      message,
      duration
    });
  }
  error(title, message, duration) {
    this.show({
      type: "error",
      title,
      message,
      duration: duration ?? 8e3
    });
  }
  warning(title, message, duration) {
    this.show({
      type: "warning",
      title,
      message,
      duration
    });
  }
  info(title, message, duration) {
    this.show({
      type: "info",
      title,
      message,
      duration
    });
  }
  remove(id) {
    const currentToasts = this.toasts.value;
    const updatedToasts = currentToasts.filter((toast) => toast.id !== id);
    this.toasts.next(updatedToasts);
  }
  clear() {
    this.toasts.next([]);
  }
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  isDuplicate(newToast) {
    const currentToasts = this.toasts.value;
    return currentToasts.some((toast) => toast.title === newToast.title && toast.message === newToast.message && toast.type === newToast.type);
  }
  static {
    this.\u0275fac = function ToastService_Factory(t) {
      return new (t || _ToastService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
  }
};

export {
  ToastService
};
//# sourceMappingURL=chunk-NXAITARR.js.map
