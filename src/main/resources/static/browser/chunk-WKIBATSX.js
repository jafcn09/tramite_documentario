import {
  AuthService,
  Router
} from "./chunk-T5HD73DN.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-6M6PSWXB.js";
import {
  CommonModule,
  HttpClient,
  NgIf,
  __async,
  environment,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
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
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-HL73AAZ4.js";

// src/app/shared/change-password/change-password.component.ts
function ChangePasswordComponent__svg_svg_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 28)(2, "path", 29);
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordComponent__svg_svg_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 30)(2, "path", 29);
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessages["newPassword"] || "La contrase\xF1a no cumple con los requisitos", " ");
  }
}
function ChangePasswordComponent__svg_svg_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 28)(2, "path", 29);
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordComponent__svg_svg_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 30)(2, "path", 29);
    \u0275\u0275elementEnd();
  }
}
function ChangePasswordComponent_div_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r0.changePasswordForm.errors == null ? null : ctx_r0.changePasswordForm.errors["passwordMismatch"]) ? "Las contrase\xF1as no coinciden" : "Debes confirmar la contrase\xF1a", " ");
  }
}
function ChangePasswordComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessages["general"], " ");
  }
}
function ChangePasswordComponent_span_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
function ChangePasswordComponent_div_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275listener("click", function ChangePasswordComponent_div_76_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.closeSuccessModal());
    });
    \u0275\u0275elementStart(1, "div", 35);
    \u0275\u0275listener("click", function ChangePasswordComponent_div_76_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 36);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 37);
    \u0275\u0275element(4, "circle", 38)(5, "path", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7, "\xA1Contrase\xF1a Actualizada!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Tu contrase\xF1a ha sido cambiada exitosamente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 40);
    \u0275\u0275listener("click", function ChangePasswordComponent_div_76_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goBack());
    });
    \u0275\u0275text(11, " Continuar ");
    \u0275\u0275elementEnd()()();
  }
}
var ChangePasswordComponent = class _ChangePasswordComponent {
  constructor(fb, authService, router, http) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.http = http;
    this.loading = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;
    this.changeAttempts = 0;
    this.lastChangeAttempt = 0;
    this.canSubmit = true;
    this.errorMessages = {};
    this.showSuccessModalFlag = false;
    this.passwordRequirements = {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    };
    this.changePasswordForm = this.fb.group({
      newPassword: ["", [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validators: [this.passwordMatchValidator]
    });
  }
  ngOnInit() {
    this.changePasswordForm.get("newPassword")?.valueChanges.subscribe((password) => {
      this.updatePasswordRequirements(password);
    });
    this.changePasswordForm.valueChanges.subscribe(() => {
      this.clearMessages();
    });
  }
  passwordStrengthValidator(control) {
    const password = control.value;
    if (!password)
      return null;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecial;
    return valid ? null : { passwordWeak: true };
  }
  passwordMatchValidator(group) {
    const newPassword = group.get("newPassword")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    if (!newPassword || !confirmPassword)
      return null;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  updatePasswordRequirements(password) {
    this.passwordRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  }
  togglePasswordVisibility(field) {
    switch (field) {
      case "new":
        this.showNewPassword = !this.showNewPassword;
        break;
      case "confirm":
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }
  isFieldInvalid(fieldName) {
    const field = this.changePasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.changePasswordForm.invalid || this.loading) {
        this.changePasswordForm.markAllAsTouched();
        return;
      }
      const now = Date.now();
      const timeSinceLastAttempt = now - this.lastChangeAttempt;
      if (timeSinceLastAttempt < 3e3) {
        this.setError("general", `Espere ${Math.ceil((3e3 - timeSinceLastAttempt) / 1e3)} segundos antes de intentar nuevamente`);
        return;
      }
      if (this.changeAttempts >= 2) {
        if (now - this.lastChangeAttempt < 3e4) {
          this.setError("general", "L\xEDmite de intentos alcanzado. Espere 30 segundos");
          this.canSubmit = false;
          setTimeout(() => {
            this.canSubmit = true;
            this.changeAttempts = 0;
          }, 3e4);
          return;
        } else {
          this.changeAttempts = 0;
        }
      }
      this.changeAttempts++;
      this.lastChangeAttempt = now;
      this.loading = true;
      this.clearMessages();
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          this.setError("general", "Sesi\xF3n expirada. Por favor inicie sesi\xF3n nuevamente");
          this.authService.logout();
          return;
        }
        const user = this.authService.currentUserValue;
        if (!user || !user.id) {
          this.setError("general", "No se pudo obtener la informaci\xF3n del usuario");
          return;
        }
        const url = `${environment.apiUrl}/api/usuarios/${user.id}/change-password`;
        const response = yield this.http.put(url, {
          newPassword: this.changePasswordForm.value.newPassword,
          confirmPassword: this.changePasswordForm.value.confirmPassword
        }, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).toPromise();
        if (response) {
          this.showSuccessModal();
          this.changeAttempts = 0;
          setTimeout(() => {
            this.goBack();
          }, 2e3);
        }
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    });
  }
  handleError(error) {
    if (error.status === 400) {
      const message = error.error.error || error.error.message || "Error al cambiar contrase\xF1a";
      this.setError("general", message);
    } else if (error.status === 401) {
      this.setError("general", "No autorizado. Verifique sus permisos");
    } else if (error.status === 422) {
      this.setError("newPassword", "La contrase\xF1a no cumple con los requisitos de seguridad");
    } else if (error.status === 429) {
      this.setError("general", "Demasiados intentos. Por favor espere un momento");
    } else if (error.status === 500) {
      this.setError("general", "Error del servidor. Por favor intente m\xE1s tarde");
    } else {
      this.setError("general", "Error de conexi\xF3n. Por favor verifique su internet");
    }
  }
  setError(field, message) {
    this.errorMessages[field] = message;
  }
  clearMessages() {
    this.errorMessages = {};
  }
  goBack() {
    const user = this.authService.currentUserValue;
    const roleName = user?.role?.name?.toUpperCase();
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
  showSuccessModal() {
    this.showSuccessModalFlag = true;
  }
  closeSuccessModal() {
    this.showSuccessModalFlag = false;
  }
  static {
    this.\u0275fac = function ChangePasswordComponent_Factory(t) {
      return new (t || _ChangePasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(HttpClient));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordComponent, selectors: [["app-change-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 77, vars: 34, consts: [[1, "change-password-container"], [1, "change-password-card"], [1, "card-header"], ["type", "button", 1, "back-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "none"], ["d", "M12.5 15L7.5 10L12.5 5", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "header-content"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "newPassword"], [1, "input-wrapper"], ["id", "newPassword", "formControlName", "newPassword", "placeholder", "Ingresa tu nueva contrase\xF1a", 1, "form-control", 3, "type"], ["type", "button", "tabindex", "-1", 1, "toggle-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "none", 4, "ngIf"], [1, "password-requirements"], [1, "requirement"], [1, "icon"], ["class", "error-message", 4, "ngIf"], ["for", "confirmPassword"], ["id", "confirmPassword", "formControlName", "confirmPassword", "placeholder", "Confirma tu nueva contrase\xF1a", 1, "form-control", 3, "type"], ["class", "alert alert-error", 4, "ngIf"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["class", "spinner", 4, "ngIf"], [1, "security-tips"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["d", "M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z", "stroke", "currentColor", "stroke-width", "1.5"], ["d", "M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3Z", "stroke", "currentColor", "stroke-width", "1.5"], ["d", "M3 3L17 17M10.5 7.5C11.3284 7.5 12 8.17157 12 9M7.5 12.5C6.67157 12.5 6 11.8284 6 11", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round"], [1, "error-message"], [1, "alert", "alert-error"], [1, "spinner"], [1, "modal-overlay", 3, "click"], [1, "modal-content", 3, "click"], [1, "success-icon"], ["width", "48", "height", "48", "viewBox", "0 0 48 48", "fill", "none"], ["cx", "24", "cy", "24", "r", "22", "stroke", "#10b981", "stroke-width", "3"], ["d", "M14 24L20 30L34 16", "stroke", "#10b981", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "btn", "btn-primary", 3, "click"]], template: function ChangePasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
        \u0275\u0275listener("click", function ChangePasswordComponent_Template_button_click_3_listener() {
          return ctx.goBack();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 4);
        \u0275\u0275element(5, "path", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "div", 6)(7, "h1");
        \u0275\u0275text(8, "Cambiar Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p");
        \u0275\u0275text(10, "Actualiza tu contrase\xF1a de forma segura");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(11, "div", 7)(12, "form", 8);
        \u0275\u0275listener("ngSubmit", function ChangePasswordComponent_Template_form_ngSubmit_12_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(13, "div", 9)(14, "label", 10);
        \u0275\u0275text(15, "Nueva Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 11);
        \u0275\u0275element(17, "input", 12);
        \u0275\u0275elementStart(18, "button", 13);
        \u0275\u0275listener("click", function ChangePasswordComponent_Template_button_click_18_listener() {
          return ctx.togglePasswordVisibility("new");
        });
        \u0275\u0275template(19, ChangePasswordComponent__svg_svg_19_Template, 3, 0, "svg", 14)(20, ChangePasswordComponent__svg_svg_20_Template, 3, 0, "svg", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 15)(22, "div", 16)(23, "span", 17);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "span");
        \u0275\u0275text(26, "M\xEDnimo 8 caracteres");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "div", 16)(28, "span", 17);
        \u0275\u0275text(29);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "span");
        \u0275\u0275text(31, "Una letra may\xFAscula");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 16)(33, "span", 17);
        \u0275\u0275text(34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span");
        \u0275\u0275text(36, "Una letra min\xFAscula");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 16)(38, "span", 17);
        \u0275\u0275text(39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "span");
        \u0275\u0275text(41, "Un n\xFAmero");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(42, "div", 16)(43, "span", 17);
        \u0275\u0275text(44);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "span");
        \u0275\u0275text(46, "Un car\xE1cter especial");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(47, ChangePasswordComponent_div_47_Template, 2, 1, "div", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "div", 9)(49, "label", 19);
        \u0275\u0275text(50, "Confirmar Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "div", 11);
        \u0275\u0275element(52, "input", 20);
        \u0275\u0275elementStart(53, "button", 13);
        \u0275\u0275listener("click", function ChangePasswordComponent_Template_button_click_53_listener() {
          return ctx.togglePasswordVisibility("confirm");
        });
        \u0275\u0275template(54, ChangePasswordComponent__svg_svg_54_Template, 3, 0, "svg", 14)(55, ChangePasswordComponent__svg_svg_55_Template, 3, 0, "svg", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(56, ChangePasswordComponent_div_56_Template, 2, 1, "div", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275template(57, ChangePasswordComponent_div_57_Template, 2, 1, "div", 21);
        \u0275\u0275elementStart(58, "div", 22)(59, "button", 23);
        \u0275\u0275listener("click", function ChangePasswordComponent_Template_button_click_59_listener() {
          return ctx.goBack();
        });
        \u0275\u0275text(60, " Cancelar ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "button", 24);
        \u0275\u0275template(62, ChangePasswordComponent_span_62_Template, 1, 0, "span", 25);
        \u0275\u0275text(63);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(64, "div", 26)(65, "h3");
        \u0275\u0275text(66, "Consejos de Seguridad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "ul")(68, "li");
        \u0275\u0275text(69, "Usa una combinaci\xF3n \xFAnica de caracteres");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(70, "li");
        \u0275\u0275text(71, "Evita informaci\xF3n personal f\xE1cil de adivinar");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "li");
        \u0275\u0275text(73, "No reutilices contrase\xF1as de otras cuentas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "li");
        \u0275\u0275text(75, "Cambia tu contrase\xF1a peri\xF3dicamente");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(76, ChangePasswordComponent_div_76_Template, 12, 0, "div", 27);
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("formGroup", ctx.changePasswordForm);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("error", ctx.isFieldInvalid("newPassword"));
        \u0275\u0275property("type", ctx.showNewPassword ? "text" : "password");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.showNewPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showNewPassword);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("valid", ctx.passwordRequirements.length);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.passwordRequirements.length ? "\u2713" : "\u25CB");
        \u0275\u0275advance(3);
        \u0275\u0275classProp("valid", ctx.passwordRequirements.uppercase);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.passwordRequirements.uppercase ? "\u2713" : "\u25CB");
        \u0275\u0275advance(3);
        \u0275\u0275classProp("valid", ctx.passwordRequirements.lowercase);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.passwordRequirements.lowercase ? "\u2713" : "\u25CB");
        \u0275\u0275advance(3);
        \u0275\u0275classProp("valid", ctx.passwordRequirements.number);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.passwordRequirements.number ? "\u2713" : "\u25CB");
        \u0275\u0275advance(3);
        \u0275\u0275classProp("valid", ctx.passwordRequirements.special);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.passwordRequirements.special ? "\u2713" : "\u25CB");
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.isFieldInvalid("newPassword") || ctx.errorMessages["newPassword"]);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("error", ctx.isFieldInvalid("confirmPassword") || (ctx.changePasswordForm.errors == null ? null : ctx.changePasswordForm.errors["passwordMismatch"]));
        \u0275\u0275property("type", ctx.showConfirmPassword ? "text" : "password");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", !ctx.showConfirmPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showConfirmPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isFieldInvalid("confirmPassword") || (ctx.changePasswordForm.errors == null ? null : ctx.changePasswordForm.errors["passwordMismatch"]));
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessages["general"]);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.changePasswordForm.invalid || ctx.loading || !ctx.canSubmit);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Guardando..." : "Cambiar Contrase\xF1a", " ");
        \u0275\u0275advance(13);
        \u0275\u0275property("ngIf", ctx.showSuccessModalFlag);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ['\n\n.change-password-container[_ngcontent-%COMP%] {\n  max-width: 520px;\n  margin: 0 auto;\n  padding: 24px 16px;\n  min-height: 100vh;\n}\n.change-password-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n  margin-bottom: 24px;\n}\n.card-header[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  display: flex;\n  align-items: flex-start;\n  gap: 16px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e5e7eb;\n  color: #6b7280;\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n  color: #374151;\n}\n.header-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.card-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 4px 0;\n}\n.card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 32px 24px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 8px;\n}\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 44px 12px 14px;\n  border: 1px solid #d1d5db;\n  border-radius: 10px;\n  font-size: 15px;\n  color: #111827;\n  background: white;\n  transition: all 0.2s;\n  font-family: inherit;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.form-control.error[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.form-control.error[_ngcontent-%COMP%]:focus {\n  border-color: #ef4444;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  color: #9ca3af;\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 6px;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.toggle-btn[_ngcontent-%COMP%]:hover {\n  color: #6b7280;\n  background: #f3f4f6;\n}\n.password-requirements[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding: 14px;\n  background: #f9fafb;\n  border-radius: 10px;\n  border: 1px solid #e5e7eb;\n}\n.requirement[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  color: #6b7280;\n  margin-bottom: 6px;\n  transition: color 0.2s;\n}\n.requirement[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.requirement[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 600;\n}\n.requirement.valid[_ngcontent-%COMP%] {\n  color: #10b981;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 13px;\n  margin-top: 8px;\n  font-weight: 500;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 10px;\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #dc2626;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 32px;\n  padding-top: 24px;\n  border-top: 1px solid #e5e7eb;\n}\n.btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px 24px;\n  border-radius: 10px;\n  font-size: 15px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-family: inherit;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #374151;\n  border: 1px solid #d1d5db;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #2563eb;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.security-tips[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  border: 1px solid #e5e7eb;\n  padding: 24px;\n}\n.security-tips[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 16px 0;\n}\n.security-tips[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.security-tips[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  margin-bottom: 10px;\n  padding-left: 20px;\n  position: relative;\n}\n.security-tips[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.security-tips[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2022";\n  position: absolute;\n  left: 6px;\n  color: #9ca3af;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  padding: 16px;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 400px;\n  width: 100%;\n  text-align: center;\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n.success-icon[_ngcontent-%COMP%] {\n  margin: 0 auto 20px;\n  width: 64px;\n  height: 64px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #111827;\n  margin: 0 0 8px 0;\n  font-size: 22px;\n  font-weight: 600;\n}\n.modal-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  margin: 0 0 24px 0;\n  font-size: 15px;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 640px) {\n  .change-password-container[_ngcontent-%COMP%] {\n    padding: 16px 12px;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .card-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=change-password.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordComponent, { className: "ChangePasswordComponent" });
})();
export {
  ChangePasswordComponent
};
//# sourceMappingURL=chunk-WKIBATSX.js.map
