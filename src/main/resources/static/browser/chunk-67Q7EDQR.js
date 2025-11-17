import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-T3F2XNQR.js";
import {
  CommonModule,
  HttpClient,
  NgForOf,
  NgIf,
  environment,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VDZBNFIH.js";

// src/app/components/user-management/user-management.component.ts
function UserManagementComponent_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function UserManagementComponent_button_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.filteredUsers.length, " resultado(s) encontrado(s)");
  }
}
function UserManagementComponent_option_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r3 = ctx.$implicit;
    \u0275\u0275property("value", area_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r3.nombre);
  }
}
function UserManagementComponent_tr_55_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", user_r5.celular, "");
  }
}
function UserManagementComponent_tr_55_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", user_r5.direccion, "");
  }
}
function UserManagementComponent_tr_55_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("inactive", !user_r5.area.activa);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r5.area.nombre, " ");
  }
}
function UserManagementComponent_tr_55_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "Sin \xE1rea");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_tr_55_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275element(1, "i", 64);
    \u0275\u0275text(2, " Bloqueado ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_tr_55_span_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275element(1, "i", 66);
    \u0275\u0275text(2, " Cambiar contrase\xF1a ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 34);
    \u0275\u0275element(3, "img", 35);
    \u0275\u0275elementStart(4, "div", 36)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(9, "td")(10, "div", 37)(11, "div");
    \u0275\u0275element(12, "i", 38);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, UserManagementComponent_tr_55_div_14_Template, 3, 1, "div", 39)(15, UserManagementComponent_tr_55_div_15_Template, 3, 1, "div", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td")(17, "span", 40);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td")(20, "div", 41);
    \u0275\u0275template(21, UserManagementComponent_tr_55_span_21_Template, 2, 3, "span", 42)(22, UserManagementComponent_tr_55_span_22_Template, 2, 0, "span", 43);
    \u0275\u0275elementStart(23, "button", 44);
    \u0275\u0275listener("click", function UserManagementComponent_tr_55_Template_button_click_23_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAreaAssignModal(user_r5));
    });
    \u0275\u0275element(24, "i", 45);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "td")(26, "div", 46)(27, "span", 47);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275template(29, UserManagementComponent_tr_55_span_29_Template, 3, 0, "span", 48)(30, UserManagementComponent_tr_55_span_30_Template, 3, 0, "span", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "td")(32, "div", 50)(33, "button", 51);
    \u0275\u0275listener("click", function UserManagementComponent_tr_55_Template_button_click_33_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editUser(user_r5));
    });
    \u0275\u0275element(34, "i", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 53);
    \u0275\u0275listener("click", function UserManagementComponent_tr_55_Template_button_click_35_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUserStatus(user_r5));
    });
    \u0275\u0275element(36, "i", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 53);
    \u0275\u0275listener("click", function UserManagementComponent_tr_55_Template_button_click_37_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUserLock(user_r5));
    });
    \u0275\u0275element(38, "i", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 55);
    \u0275\u0275listener("click", function UserManagementComponent_tr_55_Template_button_click_39_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openResetPasswordModal(user_r5));
    });
    \u0275\u0275element(40, "i", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 57);
    \u0275\u0275listener("click", function UserManagementComponent_tr_55_Template_button_click_41_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteUser(user_r5));
    });
    \u0275\u0275element(42, "i", 58);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    \u0275\u0275classProp("disabled-user", !user_r5.accountEnabled);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", user_r5.foto || "/assets/default-avatar.png", \u0275\u0275sanitizeUrl)("alt", user_r5.nombre);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r5.nombre, " ", user_r5.apellidos, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.usuario);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", user_r5.correo, "");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r5.celular);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r5.direccion);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("role-" + user_r5.role.name.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r5.role.name, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", user_r5.area);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r5.area);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("success", user_r5.accountEnabled)("danger", !user_r5.accountEnabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r5.accountEnabled ? "Habilitado" : "Deshabilitado", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r5.accountLocked);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r5.mustChangePassword);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("btn-danger", user_r5.accountEnabled)("btn-success", !user_r5.accountEnabled);
    \u0275\u0275property("title", user_r5.accountEnabled ? "Deshabilitar usuario" : "Habilitar usuario");
    \u0275\u0275attribute("data-status", user_r5.accountEnabled ? "enabled" : "disabled");
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-user-slash", user_r5.accountEnabled)("fa-user-check", !user_r5.accountEnabled);
    \u0275\u0275advance();
    \u0275\u0275classProp("btn-warning", !user_r5.accountLocked)("btn-info", user_r5.accountLocked);
    \u0275\u0275property("title", user_r5.accountLocked ? "Desbloquear acceso" : "Bloquear acceso");
    \u0275\u0275attribute("data-lock", user_r5.accountLocked ? "locked" : "unlocked");
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-lock-open", user_r5.accountLocked)("fa-user-lock", !user_r5.accountLocked);
  }
}
function UserManagementComponent_div_57_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 92);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r7.celular);
  }
}
function UserManagementComponent_div_57_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("inactive", !user_r7.area.activa);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r7.area.nombre, " ");
  }
}
function UserManagementComponent_div_57_span_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 94);
    \u0275\u0275text(1, "Sin \xE1rea");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_57_div_28_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 98);
    \u0275\u0275element(1, "i", 64);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Usuario bloqueado");
    \u0275\u0275elementEnd()();
  }
}
function UserManagementComponent_div_57_div_28_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275element(1, "i", 66);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Debe cambiar contrase\xF1a");
    \u0275\u0275elementEnd()();
  }
}
function UserManagementComponent_div_57_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275template(1, UserManagementComponent_div_57_div_28_div_1_Template, 4, 0, "div", 96)(2, UserManagementComponent_div_57_div_28_div_2_Template, 4, 0, "div", 97);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r7.accountLocked);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r7.mustChangePassword);
  }
}
function UserManagementComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "div", 70);
    \u0275\u0275element(4, "img", 71)(5, "div", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 73)(7, "h3");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 74);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 75);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, UserManagementComponent_div_57_p_13_Template, 2, 1, "p", 76);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 77)(15, "div", 78)(16, "span", 79);
    \u0275\u0275text(17, "Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 80);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 78)(21, "span", 79);
    \u0275\u0275text(22, "\xC1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 81);
    \u0275\u0275template(24, UserManagementComponent_div_57_span_24_Template, 2, 3, "span", 82)(25, UserManagementComponent_div_57_span_25_Template, 2, 0, "span", 83);
    \u0275\u0275elementStart(26, "button", 84);
    \u0275\u0275listener("click", function UserManagementComponent_div_57_Template_button_click_26_listener() {
      const user_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openAreaAssignModal(user_r7));
    });
    \u0275\u0275element(27, "i", 45);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(28, UserManagementComponent_div_57_div_28_Template, 3, 2, "div", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 86)(30, "button", 87);
    \u0275\u0275listener("click", function UserManagementComponent_div_57_Template_button_click_30_listener() {
      const user_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editUser(user_r7));
    });
    \u0275\u0275element(31, "i", 52);
    \u0275\u0275text(32, " Editar Datos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 88);
    \u0275\u0275listener("click", function UserManagementComponent_div_57_Template_button_click_33_listener() {
      const user_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUserStatus(user_r7));
    });
    \u0275\u0275element(34, "i", 54);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "button", 89);
    \u0275\u0275listener("click", function UserManagementComponent_div_57_Template_button_click_36_listener() {
      const user_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUserLock(user_r7));
    });
    \u0275\u0275element(37, "i", 54);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 90);
    \u0275\u0275listener("click", function UserManagementComponent_div_57_Template_button_click_39_listener() {
      const user_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openResetPasswordModal(user_r7));
    });
    \u0275\u0275element(40, "i", 56);
    \u0275\u0275text(41, " Restablecer Contrase\xF1a ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 91);
    \u0275\u0275listener("click", function UserManagementComponent_div_57_Template_button_click_42_listener() {
      const user_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteUser(user_r7));
    });
    \u0275\u0275element(43, "i", 58);
    \u0275\u0275text(44, " Eliminar Usuario ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r7 = ctx.$implicit;
    \u0275\u0275classProp("disabled-user", !user_r7.accountEnabled);
    \u0275\u0275advance(4);
    \u0275\u0275property("src", user_r7.foto || "/assets/default-avatar.png", \u0275\u0275sanitizeUrl)("alt", user_r7.nombre);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", user_r7.accountEnabled)("locked", user_r7.accountLocked);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r7.nombre, " ", user_r7.apellidos, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate("@" + user_r7.usuario);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r7.correo);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r7.celular);
    \u0275\u0275advance(5);
    \u0275\u0275classMap("role-" + user_r7.role.name.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r7.role.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", user_r7.area);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r7.area);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", user_r7.accountLocked || user_r7.mustChangePassword);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("enable", !user_r7.accountEnabled)("disable", user_r7.accountEnabled);
    \u0275\u0275advance();
    \u0275\u0275classProp("fa-user-check", !user_r7.accountEnabled)("fa-user-slash", user_r7.accountEnabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r7.accountEnabled ? "Deshabilitar" : "Habilitar", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("fa-lock-open", user_r7.accountLocked)("fa-user-lock", !user_r7.accountLocked);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r7.accountLocked ? "Desbloquear" : "Bloquear", " ");
  }
}
function UserManagementComponent_div_58_option_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r9 = ctx.$implicit;
    \u0275\u0275property("value", area_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", area_r9.nombre, " ");
  }
}
function UserManagementComponent_div_58_i_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 113);
  }
}
function UserManagementComponent_div_58_i_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 114);
  }
}
function UserManagementComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275listener("click", function UserManagementComponent_div_58_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeAreaModal());
    });
    \u0275\u0275elementStart(1, "div", 101);
    \u0275\u0275listener("click", function UserManagementComponent_div_58_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 102)(3, "h2");
    \u0275\u0275text(4, "Asignar \xC1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 103);
    \u0275\u0275listener("click", function UserManagementComponent_div_58_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeAreaModal());
    });
    \u0275\u0275element(6, "i", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 104)(8, "p");
    \u0275\u0275text(9, "Usuario: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p");
    \u0275\u0275text(13, "\xC1rea actual: ");
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 105)(17, "label", 106);
    \u0275\u0275text(18, "Nueva \xE1rea:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 107);
    \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_div_58_Template_select_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedAreaId, $event) || (ctx_r1.selectedAreaId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(20, "option", 16);
    \u0275\u0275text(21, "Sin \xE1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, UserManagementComponent_div_58_option_22_Template, 2, 2, "option", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 108)(24, "button", 109);
    \u0275\u0275listener("click", function UserManagementComponent_div_58_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeAreaModal());
    });
    \u0275\u0275text(25, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 110);
    \u0275\u0275listener("click", function UserManagementComponent_div_58_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.assignArea());
    });
    \u0275\u0275template(27, UserManagementComponent_div_58_i_27_Template, 1, 0, "i", 111)(28, UserManagementComponent_div_58_i_28_Template, 1, 0, "i", 112);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("", ctx_r1.selectedUser == null ? null : ctx_r1.selectedUser.nombre, " ", ctx_r1.selectedUser == null ? null : ctx_r1.selectedUser.apellidos, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r1.selectedUser == null ? null : ctx_r1.selectedUser.area == null ? null : ctx_r1.selectedUser.area.nombre) || "Sin \xE1rea asignada");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedAreaId);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.activeAreas);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLoading ? "Asignando..." : "Asignar", " ");
  }
}
function UserManagementComponent_div_59_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1, " El nombre es requerido ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1, " Los apellidos son requeridos ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1, " El tipo de documento es requerido ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_46_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El n\xFAmero de documento es requerido");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_46_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Debe tener exactamente 8 d\xEDgitos");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_46_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Solo se permiten n\xFAmeros");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275template(1, UserManagementComponent_div_59_div_46_span_1_Template, 2, 0, "span", 39)(2, UserManagementComponent_div_59_div_46_span_2_Template, 2, 0, "span", 39)(3, UserManagementComponent_div_59_div_46_span_3_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.createUserForm.get("numDocumento")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.createUserForm.get("numDocumento")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["minlength"]) || ((tmp_3_0 = ctx_r1.createUserForm.get("numDocumento")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r1.createUserForm.get("numDocumento")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["pattern"]);
  }
}
function UserManagementComponent_div_59_div_54_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El correo es requerido");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_54_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Ingrese un correo v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275template(1, UserManagementComponent_div_59_div_54_span_1_Template, 2, 0, "span", 39)(2, UserManagementComponent_div_59_div_54_span_2_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.createUserForm.get("correo")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.createUserForm.get("correo")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["email"]);
  }
}
function UserManagementComponent_div_59_div_64_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Debe tener exactamente 9 d\xEDgitos");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_64_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Solo se permiten n\xFAmeros");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275template(1, UserManagementComponent_div_59_div_64_span_1_Template, 2, 0, "span", 39)(2, UserManagementComponent_div_59_div_64_span_2_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.createUserForm.get("celular")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]) || ((tmp_2_0 = ctx_r1.createUserForm.get("celular")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.createUserForm.get("celular")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["pattern"]);
  }
}
function UserManagementComponent_div_59_option_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r11 = ctx.$implicit;
    \u0275\u0275property("value", role_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", role_r11.name, " - ", role_r11.description, " ");
  }
}
function UserManagementComponent_div_59_div_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1, " El rol es requerido ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_59_option_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r12 = ctx.$implicit;
    \u0275\u0275property("value", area_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", area_r12.nombre, " ");
  }
}
function UserManagementComponent_div_59_i_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 113);
  }
}
function UserManagementComponent_div_59_i_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 114);
  }
}
function UserManagementComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275listener("click", function UserManagementComponent_div_59_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCreateModal());
    });
    \u0275\u0275elementStart(1, "div", 115);
    \u0275\u0275listener("click", function UserManagementComponent_div_59_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 102)(3, "h2");
    \u0275\u0275element(4, "i", 116);
    \u0275\u0275text(5, " Crear Nuevo Usuario ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 103);
    \u0275\u0275listener("click", function UserManagementComponent_div_59_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCreateModal());
    });
    \u0275\u0275element(7, "i", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "form", 117)(9, "div", 118)(10, "div", 105)(11, "label", 119);
    \u0275\u0275text(12, "Nombre ");
    \u0275\u0275elementStart(13, "span", 120);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(15, "input", 121);
    \u0275\u0275template(16, UserManagementComponent_div_59_div_16_Template, 2, 0, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 105)(18, "label", 123);
    \u0275\u0275text(19, "Apellidos ");
    \u0275\u0275elementStart(20, "span", 120);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "input", 124);
    \u0275\u0275template(23, UserManagementComponent_div_59_div_23_Template, 2, 0, "div", 122);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 118)(25, "div", 105)(26, "label", 125);
    \u0275\u0275text(27, "Tipo de Documento ");
    \u0275\u0275elementStart(28, "span", 120);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "select", 126)(31, "option", 16);
    \u0275\u0275text(32, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 127);
    \u0275\u0275text(34, "DNI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 128);
    \u0275\u0275text(36, "Carnet de Extranjer\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 129);
    \u0275\u0275text(38, "Pasaporte");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(39, UserManagementComponent_div_59_div_39_Template, 2, 0, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 105)(41, "label", 130);
    \u0275\u0275text(42, "N\xFAmero de Documento ");
    \u0275\u0275elementStart(43, "span", 120);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(45, "input", 131);
    \u0275\u0275template(46, UserManagementComponent_div_59_div_46_Template, 4, 3, "div", 122);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 118)(48, "div", 105)(49, "label", 132);
    \u0275\u0275text(50, "Correo Electr\xF3nico ");
    \u0275\u0275elementStart(51, "span", 120);
    \u0275\u0275text(52, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(53, "input", 133);
    \u0275\u0275template(54, UserManagementComponent_div_59_div_54_Template, 3, 2, "div", 122);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 134);
    \u0275\u0275element(56, "i", 135);
    \u0275\u0275elementStart(57, "span");
    \u0275\u0275text(58, "El nombre de usuario y contrase\xF1a se generar\xE1n autom\xE1ticamente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 118)(60, "div", 105)(61, "label", 136);
    \u0275\u0275text(62, "Celular");
    \u0275\u0275elementEnd();
    \u0275\u0275element(63, "input", 137);
    \u0275\u0275template(64, UserManagementComponent_div_59_div_64_Template, 3, 2, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 105)(66, "label", 138);
    \u0275\u0275text(67, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(68, "input", 139);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 118)(70, "div", 105)(71, "label", 140);
    \u0275\u0275text(72, "Rol ");
    \u0275\u0275elementStart(73, "span", 120);
    \u0275\u0275text(74, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "select", 141)(76, "option", 16);
    \u0275\u0275text(77, "Seleccione un rol...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(78, UserManagementComponent_div_59_option_78_Template, 2, 3, "option", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(79, UserManagementComponent_div_59_div_79_Template, 2, 0, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 105)(81, "label", 142);
    \u0275\u0275text(82, "\xC1rea (Opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "select", 143)(84, "option", 16);
    \u0275\u0275text(85, "Sin \xE1rea asignada");
    \u0275\u0275elementEnd();
    \u0275\u0275template(86, UserManagementComponent_div_59_option_86_Template, 2, 2, "option", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(87, "div", 118)(88, "div", 144);
    \u0275\u0275element(89, "input", 145);
    \u0275\u0275elementStart(90, "label", 146);
    \u0275\u0275text(91, " El usuario debe cambiar contrase\xF1a en el primer inicio de sesi\xF3n ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(92, "div", 108)(93, "button", 147);
    \u0275\u0275listener("click", function UserManagementComponent_div_59_Template_button_click_93_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeCreateModal());
    });
    \u0275\u0275text(94, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "button", 148);
    \u0275\u0275listener("click", function UserManagementComponent_div_59_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createUser());
    });
    \u0275\u0275template(96, UserManagementComponent_div_59_i_96_Template, 1, 0, "i", 111)(97, UserManagementComponent_div_59_i_97_Template, 1, 0, "i", 112);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r1.createUserForm);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.createUserForm.get("nombre")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.createUserForm.get("nombre")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.createUserForm.get("apellidos")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.createUserForm.get("apellidos")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(16);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.createUserForm.get("tipoDocumento")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.createUserForm.get("tipoDocumento")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.createUserForm.get("numDocumento")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.createUserForm.get("numDocumento")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ((tmp_6_0 = ctx_r1.createUserForm.get("correo")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.createUserForm.get("correo")) == null ? null : tmp_6_0.touched));
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ((tmp_7_0 = ctx_r1.createUserForm.get("celular")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r1.createUserForm.get("celular")) == null ? null : tmp_7_0.touched));
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r1.roles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r1.createUserForm.get("roleId")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r1.createUserForm.get("roleId")) == null ? null : tmp_9_0.touched));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.activeAreas);
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r1.createUserForm.invalid || ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLoading ? "Creando..." : "Crear Usuario", " ");
  }
}
function UserManagementComponent_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 150);
    \u0275\u0275element(1, "i", 151);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMessage, " ");
  }
}
function UserManagementComponent_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 152);
    \u0275\u0275element(1, "i", 153);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function UserManagementComponent_div_62_div_25_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " La contrase\xF1a debe tener al menos 6 caracteres ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_62_div_25_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " La contrase\xF1a no puede exceder 50 caracteres ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_62_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275template(1, UserManagementComponent_div_62_div_25_span_1_Template, 2, 0, "span", 39)(2, UserManagementComponent_div_62_div_25_span_2_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.resetPasswordForm.get("newPassword")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.resetPasswordForm.get("newPassword")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function UserManagementComponent_div_62_i_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 66);
  }
}
function UserManagementComponent_div_62_i_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 114);
  }
}
function UserManagementComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275listener("click", function UserManagementComponent_div_62_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeResetPasswordModal());
    });
    \u0275\u0275elementStart(1, "div", 154);
    \u0275\u0275listener("click", function UserManagementComponent_div_62_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 102)(3, "h2");
    \u0275\u0275element(4, "i", 66);
    \u0275\u0275text(5, " Cambiar Contrase\xF1a ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 103);
    \u0275\u0275listener("click", function UserManagementComponent_div_62_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeResetPasswordModal());
    });
    \u0275\u0275element(7, "i", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 104)(9, "div", 155)(10, "p")(11, "strong");
    \u0275\u0275text(12, "Usuario:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p")(15, "strong");
    \u0275\u0275text(16, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "form", 156);
    \u0275\u0275listener("ngSubmit", function UserManagementComponent_div_62_Template_form_ngSubmit_18_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetUserPassword());
    });
    \u0275\u0275elementStart(19, "div", 105)(20, "label", 157);
    \u0275\u0275text(21, "Nueva Contrase\xF1a (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 158);
    \u0275\u0275elementStart(23, "small", 159);
    \u0275\u0275text(24, " Si dejas este campo vac\xEDo, se generar\xE1 una contrase\xF1a segura aleatoria (8-12 caracteres) y se enviar\xE1 por correo electr\xF3nico. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, UserManagementComponent_div_62_div_25_Template, 3, 2, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 105)(27, "label", 160);
    \u0275\u0275text(28, "Motivo del cambio (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "textarea", 161);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 144);
    \u0275\u0275element(31, "input", 162);
    \u0275\u0275elementStart(32, "label", 163);
    \u0275\u0275text(33, " El usuario debe cambiar la contrase\xF1a en su pr\xF3ximo inicio de sesi\xF3n ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "div", 108)(35, "button", 147);
    \u0275\u0275listener("click", function UserManagementComponent_div_62_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeResetPasswordModal());
    });
    \u0275\u0275text(36, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 148);
    \u0275\u0275listener("click", function UserManagementComponent_div_62_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetUserPassword());
    });
    \u0275\u0275template(38, UserManagementComponent_div_62_i_38_Template, 1, 0, "i", 164)(39, UserManagementComponent_div_62_i_39_Template, 1, 0, "i", 112);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate2(" ", ctx_r1.selectedUserForPassword == null ? null : ctx_r1.selectedUserForPassword.nombre, " ", ctx_r1.selectedUserForPassword == null ? null : ctx_r1.selectedUserForPassword.apellidos, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedUserForPassword == null ? null : ctx_r1.selectedUserForPassword.correo, "");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.resetPasswordForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.resetPasswordForm.get("newPassword")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.resetPasswordForm.get("newPassword")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r1.resettingPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.resettingPassword);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.resettingPassword);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.resettingPassword ? "Cambiando..." : "Cambiar Contrase\xF1a", " ");
  }
}
function UserManagementComponent_div_63_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1, " El nombre es requerido ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1, " Los apellidos son requeridos ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275text(1, " El tipo de documento es requerido ");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_46_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El n\xFAmero de documento es requerido");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_46_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Debe tener exactamente 8 d\xEDgitos");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_46_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Solo se permiten n\xFAmeros");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275template(1, UserManagementComponent_div_63_div_46_span_1_Template, 2, 0, "span", 39)(2, UserManagementComponent_div_63_div_46_span_2_Template, 2, 0, "span", 39)(3, UserManagementComponent_div_63_div_46_span_3_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.editUserForm.get("numDocumento")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.editUserForm.get("numDocumento")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["minlength"]) || ((tmp_3_0 = ctx_r1.editUserForm.get("numDocumento")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r1.editUserForm.get("numDocumento")) == null ? null : tmp_4_0.errors == null ? null : tmp_4_0.errors["pattern"]);
  }
}
function UserManagementComponent_div_63_div_52_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Debe tener exactamente 9 d\xEDgitos");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_52_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Solo se permiten n\xFAmeros");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275template(1, UserManagementComponent_div_63_div_52_span_1_Template, 2, 0, "span", 39)(2, UserManagementComponent_div_63_div_52_span_2_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.editUserForm.get("celular")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["minlength"]) || ((tmp_2_0 = ctx_r1.editUserForm.get("celular")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.editUserForm.get("celular")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["pattern"]);
  }
}
function UserManagementComponent_div_63_div_64_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El correo es requerido");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_64_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Ingrese un correo v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function UserManagementComponent_div_63_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 149);
    \u0275\u0275template(1, UserManagementComponent_div_63_div_64_span_1_Template, 2, 0, "span", 39)(2, UserManagementComponent_div_63_div_64_span_2_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.editUserForm.get("correo")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.editUserForm.get("correo")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["email"]);
  }
}
function UserManagementComponent_div_63_i_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 113);
  }
}
function UserManagementComponent_div_63_i_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 114);
  }
}
function UserManagementComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeEditModal());
    });
    \u0275\u0275elementStart(1, "div", 165);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 102)(3, "h2");
    \u0275\u0275element(4, "i", 52);
    \u0275\u0275text(5, " Editar Usuario ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 103);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeEditModal());
    });
    \u0275\u0275element(7, "i", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "form", 117)(9, "div", 118)(10, "div", 105)(11, "label", 166);
    \u0275\u0275text(12, "Nombre ");
    \u0275\u0275elementStart(13, "span", 120);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(15, "input", 167);
    \u0275\u0275template(16, UserManagementComponent_div_63_div_16_Template, 2, 0, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 105)(18, "label", 168);
    \u0275\u0275text(19, "Apellidos ");
    \u0275\u0275elementStart(20, "span", 120);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "input", 169);
    \u0275\u0275template(23, UserManagementComponent_div_63_div_23_Template, 2, 0, "div", 122);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 118)(25, "div", 105)(26, "label", 170);
    \u0275\u0275text(27, "Tipo de Documento ");
    \u0275\u0275elementStart(28, "span", 120);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "select", 171)(31, "option", 16);
    \u0275\u0275text(32, "Seleccione...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 127);
    \u0275\u0275text(34, "DNI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 128);
    \u0275\u0275text(36, "Carnet de Extranjer\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 129);
    \u0275\u0275text(38, "Pasaporte");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(39, UserManagementComponent_div_63_div_39_Template, 2, 0, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 105)(41, "label", 172);
    \u0275\u0275text(42, "N\xFAmero de Documento ");
    \u0275\u0275elementStart(43, "span", 120);
    \u0275\u0275text(44, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(45, "input", 173);
    \u0275\u0275template(46, UserManagementComponent_div_63_div_46_Template, 4, 3, "div", 122);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 118)(48, "div", 105)(49, "label", 174);
    \u0275\u0275text(50, "Celular");
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "input", 175);
    \u0275\u0275template(52, UserManagementComponent_div_63_div_52_Template, 3, 2, "div", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 105)(54, "label", 176);
    \u0275\u0275text(55, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(56, "input", 177);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 118)(58, "div", 105)(59, "label", 178);
    \u0275\u0275text(60, "Correo Electr\xF3nico ");
    \u0275\u0275elementStart(61, "span", 120);
    \u0275\u0275text(62, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(63, "input", 179);
    \u0275\u0275template(64, UserManagementComponent_div_63_div_64_Template, 3, 2, "div", 122);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 108)(66, "button", 147);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeEditModal());
    });
    \u0275\u0275text(67, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 148);
    \u0275\u0275listener("click", function UserManagementComponent_div_63_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateUser());
    });
    \u0275\u0275template(69, UserManagementComponent_div_63_i_69_Template, 1, 0, "i", 111)(70, UserManagementComponent_div_63_i_70_Template, 1, 0, "i", 112);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r1.editUserForm);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.editUserForm.get("nombre")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.editUserForm.get("nombre")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.editUserForm.get("apellidos")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.editUserForm.get("apellidos")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(16);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.editUserForm.get("tipoDocumento")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.editUserForm.get("tipoDocumento")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.editUserForm.get("numDocumento")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.editUserForm.get("numDocumento")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ((tmp_6_0 = ctx_r1.editUserForm.get("celular")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.editUserForm.get("celular")) == null ? null : tmp_6_0.touched));
    \u0275\u0275advance(12);
    \u0275\u0275property("ngIf", ((tmp_7_0 = ctx_r1.editUserForm.get("correo")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r1.editUserForm.get("correo")) == null ? null : tmp_7_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.editUserForm.invalid || ctx_r1.updatingUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.updatingUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.updatingUser);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.updatingUser ? "Actualizando..." : "Actualizar Usuario", " ");
  }
}
var UserManagementComponent = class _UserManagementComponent {
  constructor(http, fb) {
    this.http = http;
    this.fb = fb;
    this.users = [];
    this.filteredUsers = [];
    this.areas = [];
    this.activeAreas = [];
    this.roles = [];
    this.searchTerm = "";
    this.statusFilter = "";
    this.areaFilter = "";
    this.showAreaModal = false;
    this.showCreateModal = false;
    this.selectedUser = null;
    this.selectedAreaId = "";
    this.isLoading = false;
    this.successMessage = "";
    this.errorMessage = "";
    this.showEditModal = false;
    this.selectedUserForEdit = null;
    this.updatingUser = false;
    this.showResetPasswordModal = false;
    this.selectedUserForPassword = null;
    this.resettingPassword = false;
    this.createUserForm = this.fb.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      tipoDocumento: ["", Validators.required],
      numDocumento: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
      correo: ["", [Validators.required, Validators.email]],
      celular: ["", [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      direccion: [""],
      roleId: ["", Validators.required],
      areaId: [""],
      mustChangePassword: [true]
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ["", [Validators.minLength(6), Validators.maxLength(50)]],
      reason: [""],
      mustChangePassword: [false]
    });
    this.editUserForm = this.fb.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      tipoDocumento: ["", Validators.required],
      numDocumento: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
      correo: ["", [Validators.required, Validators.email]],
      celular: ["", [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      direccion: [""]
    });
  }
  ngOnInit() {
    this.loadUsers();
    this.loadAreas();
    this.loadRoles();
  }
  loadUsers() {
    const token = localStorage.getItem("auth_token");
    this.http.get(`${environment.apiUrl}/api/usuarios`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: () => {
        this.showError("Error al cargar los usuarios");
      }
    });
  }
  loadAreas() {
    const token = localStorage.getItem("auth_token");
    this.http.get(`${environment.apiUrl}/api/areas`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (areas) => {
        this.areas = areas;
        this.activeAreas = areas.filter((area) => area.activa);
      },
      error: () => {
      }
    });
  }
  filterUsers() {
    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch = !this.searchTerm || user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.apellidos.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.correo.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.usuario.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || this.statusFilter === "enabled" && user.accountEnabled || this.statusFilter === "disabled" && !user.accountEnabled || this.statusFilter === "locked" && user.accountLocked;
      const matchesArea = !this.areaFilter || this.areaFilter === "no-area" && !user.area || user.area && user.area.id.toString() === this.areaFilter;
      return matchesSearch && matchesStatus && matchesArea;
    });
  }
  editUser(user) {
    this.selectedUserForEdit = user;
    this.editUserForm.patchValue({
      nombre: user.nombre,
      apellidos: user.apellidos,
      tipoDocumento: user.tipoDocumento,
      numDocumento: user.numDocumento,
      correo: user.correo,
      celular: user.celular || "",
      direccion: user.direccion || ""
    });
    this.showEditModal = true;
  }
  closeEditModal() {
    this.showEditModal = false;
    this.selectedUserForEdit = null;
    this.editUserForm.reset();
    this.updatingUser = false;
  }
  updateUser() {
    if (this.editUserForm.invalid || !this.selectedUserForEdit) {
      Object.keys(this.editUserForm.controls).forEach((key) => {
        const control = this.editUserForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    this.updatingUser = true;
    const token = localStorage.getItem("auth_token");
    const formValue = this.editUserForm.value;
    const request = {
      nombre: formValue.nombre,
      apellidos: formValue.apellidos,
      tipoDocumento: formValue.tipoDocumento,
      numDocumento: formValue.numDocumento,
      correo: formValue.correo,
      celular: formValue.celular || null,
      direccion: formValue.direccion || null
    };
    this.http.put(`${environment.apiUrl}/api/usuarios/${this.selectedUserForEdit.id}`, request, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.showSuccess("Usuario actualizado exitosamente");
        this.loadUsers();
        this.closeEditModal();
      },
      error: (error) => {
        if (error.error?.message) {
          this.showError(error.error.message);
        } else {
          this.showError("Error al actualizar el usuario");
        }
        this.updatingUser = false;
      }
    });
  }
  toggleUserStatus(user) {
    const token = localStorage.getItem("auth_token");
    this.http.put(`${environment.apiUrl}/api/usuarios/${user.id}/toggle-status`, {}, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (updatedUser) => {
        this.showSuccess(`Usuario ${updatedUser.accountEnabled ? "habilitado" : "deshabilitado"} correctamente`);
        this.loadUsers();
      },
      error: () => {
        this.showError("Error al cambiar el estado del usuario");
      }
    });
  }
  toggleUserLock(user) {
    const token = localStorage.getItem("auth_token");
    this.http.put(`${environment.apiUrl}/api/usuarios/${user.id}/toggle-lock`, {}, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (updatedUser) => {
        this.showSuccess(`Usuario ${updatedUser.accountLocked ? "bloqueado" : "desbloqueado"} correctamente`);
        this.loadUsers();
      },
      error: () => {
        this.showError("Error al cambiar el bloqueo del usuario");
      }
    });
  }
  deleteUser(user) {
    if (confirm(`\xBFEst\xE1 seguro de que desea eliminar al usuario "${user.nombre} ${user.apellidos}"?`)) {
      const token = localStorage.getItem("auth_token");
      this.http.delete(`${environment.apiUrl}/api/usuarios/${user.id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.showSuccess("Usuario eliminado correctamente");
          this.loadUsers();
        },
        error: () => {
          this.showError("Error al eliminar el usuario");
        }
      });
    }
  }
  openAreaAssignModal(user) {
    this.selectedUser = user;
    this.selectedAreaId = user.area?.id || "";
    this.showAreaModal = true;
  }
  closeAreaModal() {
    this.showAreaModal = false;
    this.selectedUser = null;
    this.selectedAreaId = "";
  }
  assignArea() {
    if (!this.selectedUser)
      return;
    this.isLoading = true;
    const token = localStorage.getItem("auth_token");
    const request = this.selectedAreaId ? this.http.put(`${environment.apiUrl}/api/usuarios/${this.selectedUser.id}/assign-area/${this.selectedAreaId}`, {}, {
      headers: { "Authorization": `Bearer ${token}` }
    }) : this.http.delete(`${environment.apiUrl}/api/usuarios/${this.selectedUser.id}/remove-area`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    request.subscribe({
      next: () => {
        this.showSuccess("\xC1rea asignada correctamente");
        this.loadUsers();
        this.closeAreaModal();
        this.isLoading = false;
      },
      error: () => {
        this.showError("Error al asignar el \xE1rea");
        this.isLoading = false;
      }
    });
  }
  showSuccess(message) {
    this.successMessage = message;
    this.errorMessage = "";
    setTimeout(() => {
      this.successMessage = "";
    }, 5e3);
  }
  clearSearch() {
    this.searchTerm = "";
    this.filterUsers();
  }
  openResetPasswordModal(user) {
    this.selectedUserForPassword = user;
    this.showResetPasswordModal = true;
    this.resetPasswordForm.reset();
    this.resetPasswordForm.patchValue({
      mustChangePassword: false
    });
  }
  closeResetPasswordModal() {
    this.showResetPasswordModal = false;
    this.selectedUserForPassword = null;
    this.resetPasswordForm.reset();
    this.resettingPassword = false;
  }
  resetUserPassword() {
    if (!this.selectedUserForPassword) {
      return;
    }
    const passwordValue = this.resetPasswordForm.value.newPassword?.trim();
    if (passwordValue && this.resetPasswordForm.get("newPassword")?.invalid) {
      this.resetPasswordForm.get("newPassword")?.markAsTouched();
      return;
    }
    this.resettingPassword = true;
    const token = localStorage.getItem("auth_token");
    const request = {
      newPassword: passwordValue || "",
      reason: this.resetPasswordForm.value.reason?.trim() || "",
      mustChangePassword: this.resetPasswordForm.value.mustChangePassword || false
    };
    this.http.put(`${environment.apiUrl}/api/usuarios/${this.selectedUserForPassword.id}/admin-reset-password`, request, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: () => {
        const message = passwordValue ? "Contrase\xF1a restablecida correctamente" : "Contrase\xF1a generada y enviada por correo electr\xF3nico";
        this.showSuccess(message);
        this.loadUsers();
        this.closeResetPasswordModal();
      },
      error: (error) => {
        const errorMessage = error.error?.error || "Error al restablecer la contrase\xF1a";
        this.showError(errorMessage);
        this.resettingPassword = false;
      }
    });
  }
  loadRoles() {
    const token = localStorage.getItem("auth_token");
    this.http.get(`${environment.apiUrl}/api/roles`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: () => {
      }
    });
  }
  openCreateUserModal() {
    this.createUserForm.reset();
    this.showCreateModal = true;
  }
  closeCreateModal() {
    this.showCreateModal = false;
    this.createUserForm.reset();
  }
  createUser() {
    if (this.createUserForm.invalid) {
      Object.keys(this.createUserForm.controls).forEach((key) => {
        const control = this.createUserForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    this.isLoading = true;
    const token = localStorage.getItem("auth_token");
    const formValue = this.createUserForm.value;
    const request = {
      nombre: formValue.nombre,
      apellidos: formValue.apellidos,
      tipoDocumento: formValue.tipoDocumento,
      numDocumento: formValue.numDocumento,
      correo: formValue.correo,
      celular: formValue.celular || null,
      direccion: formValue.direccion || null,
      roleId: parseInt(formValue.roleId),
      areaId: formValue.areaId ? parseInt(formValue.areaId) : null,
      mustChangePassword: formValue.mustChangePassword
    };
    this.http.post(`${environment.apiUrl}/api/usuarios`, request, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.showSuccess("Usuario creado exitosamente");
        this.loadUsers();
        this.closeCreateModal();
        this.isLoading = false;
      },
      error: (error) => {
        if (error.error?.message) {
          this.showError(error.error.message);
        } else {
          this.showError("Error al crear el usuario");
        }
        this.isLoading = false;
      }
    });
  }
  showError(message) {
    this.errorMessage = message;
    this.successMessage = "";
    setTimeout(() => {
      this.errorMessage = "";
    }, 5e3);
  }
  static {
    this.\u0275fac = function UserManagementComponent_Factory(t) {
      return new (t || _UserManagementComponent)(\u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserManagementComponent, selectors: [["app-user-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 64, vars: 14, consts: [[1, "user-management-container"], [1, "header"], [1, "fas", "fa-users-cog"], [1, "header-actions"], [1, "btn-primary", 3, "click"], [1, "fas", "fa-plus"], [1, "search-filters"], [1, "search-section"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Buscar por nombre, email, usuario...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "clear-search", "title", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], ["class", "search-results", 4, "ngIf"], [1, "filters"], [1, "filter-group"], [1, "filter-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "enabled"], ["value", "disabled"], ["value", "locked"], ["value", "no-area"], [3, "value", 4, "ngFor", "ngForOf"], [1, "users-table-container", "desktop-only"], [1, "users-table"], [3, "disabled-user", 4, "ngFor", "ngForOf"], [1, "users-cards-container", "mobile-only"], ["class", "user-card", 3, "disabled-user", 4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["title", "Limpiar b\xFAsqueda", 1, "clear-search", 3, "click"], [1, "fas", "fa-times"], [1, "search-results"], [3, "value"], [1, "user-info"], ["onerror", "this.src='/assets/default-avatar.png'", 1, "user-avatar", 3, "src", "alt"], [1, "user-details"], [1, "contact-info"], [1, "fas", "fa-envelope"], [4, "ngIf"], [1, "role-badge"], [1, "area-info"], ["class", "area-badge", 3, "inactive", 4, "ngIf"], ["class", "no-area", 4, "ngIf"], ["title", "Asignar \xE1rea", 1, "btn-icon", "btn-small", 3, "click"], [1, "fas", "fa-building"], [1, "status-indicators"], [1, "status-badge"], ["class", "status-badge danger", 4, "ngIf"], ["class", "status-badge warning", 4, "ngIf"], [1, "user-actions"], ["title", "Editar datos del usuario", 1, "btn-icon", 3, "click"], [1, "fas", "fa-user-edit"], [1, "btn-icon", "toggle-btn", 3, "click", "title"], [1, "fas"], ["title", "Restablecer contrase\xF1a", 1, "btn-icon", "btn-secondary", 3, "click"], [1, "fas", "fa-shield-alt"], ["title", "Eliminar usuario permanentemente", 1, "btn-icon", "btn-danger", 3, "click"], [1, "fas", "fa-user-times"], [1, "fas", "fa-phone"], [1, "fas", "fa-map-marker-alt"], [1, "area-badge"], [1, "no-area"], [1, "status-badge", "danger"], [1, "fas", "fa-lock"], [1, "status-badge", "warning"], [1, "fas", "fa-key"], [1, "user-card"], [1, "card-header"], [1, "user-main"], [1, "avatar-section"], ["onerror", "this.src='/assets/default-avatar.png'", 1, "avatar", 3, "src", "alt"], [1, "status-indicator"], [1, "user-data"], [1, "username"], [1, "email"], ["class", "phone", 4, "ngIf"], [1, "card-content"], [1, "info-row"], [1, "info-label"], [1, "role-tag"], [1, "area-container"], ["class", "area-tag", 3, "inactive", 4, "ngIf"], ["class", "area-tag no-area", 4, "ngIf"], ["title", "Cambiar \xE1rea", 1, "edit-btn", 3, "click"], ["class", "alerts", 4, "ngIf"], [1, "card-actions"], [1, "action-btn", "primary", 3, "click"], [1, "action-btn", 3, "click"], [1, "action-btn", "warning", 3, "click"], [1, "action-btn", "secondary", 3, "click"], [1, "action-btn", "danger", 3, "click"], [1, "phone"], [1, "area-tag"], [1, "area-tag", "no-area"], [1, "alerts"], ["class", "alert locked", 4, "ngIf"], ["class", "alert password", 4, "ngIf"], [1, "alert", "locked"], [1, "alert", "password"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn-icon", 3, "click"], [1, "modal-content"], [1, "form-group"], ["for", "areaSelect"], ["id", "areaSelect", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-actions"], [1, "btn-secondary", 3, "click"], [1, "btn-primary", 3, "click", "disabled"], ["class", "fas fa-save", 4, "ngIf"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "fas", "fa-save"], [1, "fas", "fa-spinner", "fa-spin"], [1, "modal", "create-user-modal", 3, "click"], [1, "fas", "fa-user-plus"], [1, "modal-content", 3, "formGroup"], [1, "form-row"], ["for", "nombre"], [1, "required"], ["type", "text", "id", "nombre", "formControlName", "nombre", "placeholder", "Ingrese el nombre", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["for", "apellidos"], ["type", "text", "id", "apellidos", "formControlName", "apellidos", "placeholder", "Ingrese los apellidos", 1, "form-control"], ["for", "tipoDocumento"], ["id", "tipoDocumento", "formControlName", "tipoDocumento", 1, "form-control"], ["value", "DNI"], ["value", "CE"], ["value", "PASAPORTE"], ["for", "numDocumento"], ["type", "text", "id", "numDocumento", "formControlName", "numDocumento", "placeholder", "N\xFAmero de documento", "maxlength", "8", 1, "form-control"], ["for", "correo"], ["type", "email", "id", "correo", "formControlName", "correo", "placeholder", "ejemplo@correo.com", 1, "form-control"], [1, "auto-generate-info"], [1, "fas", "fa-info-circle"], ["for", "celular"], ["type", "text", "id", "celular", "formControlName", "celular", "placeholder", "999999999", "maxlength", "9", 1, "form-control"], ["for", "direccion"], ["type", "text", "id", "direccion", "formControlName", "direccion", "placeholder", "Direcci\xF3n completa", 1, "form-control"], ["for", "roleId"], ["id", "roleId", "formControlName", "roleId", 1, "form-control"], ["for", "areaId"], ["id", "areaId", "formControlName", "areaId", 1, "form-control"], [1, "form-check"], ["type", "checkbox", "id", "mustChangePassword", "formControlName", "mustChangePassword", 1, "form-check-input"], ["for", "mustChangePassword", 1, "form-check-label"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "submit", 1, "btn-primary", 3, "click", "disabled"], [1, "error-message"], [1, "alert", "alert-success"], [1, "fas", "fa-check-circle"], [1, "alert", "alert-error"], [1, "fas", "fa-exclamation-circle"], [1, "modal", "reset-password-modal", 3, "click"], [1, "user-info-section"], [3, "ngSubmit", "formGroup"], ["for", "newPassword"], ["type", "password", "id", "newPassword", "formControlName", "newPassword", "placeholder", "Dejar vac\xEDo para generar autom\xE1ticamente", 1, "form-control"], [1, "help-text"], ["for", "reason"], ["id", "reason", "formControlName", "reason", "rows", "3", "placeholder", "Ej: Solicitud del usuario, pol\xEDtica de seguridad, etc.", 1, "form-control"], ["type", "checkbox", "id", "mustChangePasswordReset", "formControlName", "mustChangePassword", 1, "form-check-input"], ["for", "mustChangePasswordReset", 1, "form-check-label"], ["class", "fas fa-key", 4, "ngIf"], [1, "modal", "edit-user-modal", 3, "click"], ["for", "editNombre"], ["type", "text", "id", "editNombre", "formControlName", "nombre", "placeholder", "Ingrese el nombre", 1, "form-control"], ["for", "editApellidos"], ["type", "text", "id", "editApellidos", "formControlName", "apellidos", "placeholder", "Ingrese los apellidos", 1, "form-control"], ["for", "editTipoDocumento"], ["id", "editTipoDocumento", "formControlName", "tipoDocumento", 1, "form-control"], ["for", "editNumDocumento"], ["type", "text", "id", "editNumDocumento", "formControlName", "numDocumento", "placeholder", "N\xFAmero de documento", "maxlength", "8", 1, "form-control"], ["for", "editCelular"], ["type", "text", "id", "editCelular", "formControlName", "celular", "placeholder", "999999999", "maxlength", "9", 1, "form-control"], ["for", "editDireccion"], ["type", "text", "id", "editDireccion", "formControlName", "direccion", "placeholder", "Direcci\xF3n completa", 1, "form-control"], ["for", "editCorreo"], ["type", "email", "id", "editCorreo", "formControlName", "correo", "placeholder", "ejemplo@correo.com", 1, "form-control"]], template: function UserManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275element(3, "i", 2);
        \u0275\u0275text(4, " Gesti\xF3n de Usuarios ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 3)(6, "button", 4);
        \u0275\u0275listener("click", function UserManagementComponent_Template_button_click_6_listener() {
          return ctx.openCreateUserModal();
        });
        \u0275\u0275element(7, "i", 5);
        \u0275\u0275text(8, " Nuevo Usuario ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "div", 8);
        \u0275\u0275element(12, "i", 9);
        \u0275\u0275elementStart(13, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function UserManagementComponent_Template_input_input_13_listener() {
          return ctx.filterUsers();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, UserManagementComponent_button_14_Template, 2, 0, "button", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, UserManagementComponent_div_15_Template, 3, 1, "div", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 13)(17, "div", 14)(18, "label");
        \u0275\u0275text(19, "Estado:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "select", 15);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_20_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UserManagementComponent_Template_select_change_20_listener() {
          return ctx.filterUsers();
        });
        \u0275\u0275elementStart(21, "option", 16);
        \u0275\u0275text(22, "Todos los estados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "option", 17);
        \u0275\u0275text(24, "Habilitados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "option", 18);
        \u0275\u0275text(26, "Deshabilitados");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "option", 19);
        \u0275\u0275text(28, "Bloqueados");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(29, "div", 14)(30, "label");
        \u0275\u0275text(31, "\xC1rea:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "select", 15);
        \u0275\u0275twoWayListener("ngModelChange", function UserManagementComponent_Template_select_ngModelChange_32_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.areaFilter, $event) || (ctx.areaFilter = $event);
          return $event;
        });
        \u0275\u0275listener("change", function UserManagementComponent_Template_select_change_32_listener() {
          return ctx.filterUsers();
        });
        \u0275\u0275elementStart(33, "option", 16);
        \u0275\u0275text(34, "Todas las \xE1reas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "option", 20);
        \u0275\u0275text(36, "Sin \xE1rea asignada");
        \u0275\u0275elementEnd();
        \u0275\u0275template(37, UserManagementComponent_option_37_Template, 2, 2, "option", 21);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "div", 22)(39, "table", 23)(40, "thead")(41, "tr")(42, "th");
        \u0275\u0275text(43, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "th");
        \u0275\u0275text(45, "Informaci\xF3n Personal");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "th");
        \u0275\u0275text(47, "Rol");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "th");
        \u0275\u0275text(49, "\xC1rea");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "th");
        \u0275\u0275text(51, "Estado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "th");
        \u0275\u0275text(53, "Acciones");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(54, "tbody");
        \u0275\u0275template(55, UserManagementComponent_tr_55_Template, 43, 42, "tr", 24);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(56, "div", 25);
        \u0275\u0275template(57, UserManagementComponent_div_57_Template, 45, 33, "div", 26);
        \u0275\u0275elementEnd();
        \u0275\u0275template(58, UserManagementComponent_div_58_Template, 30, 9, "div", 27)(59, UserManagementComponent_div_59_Template, 99, 14, "div", 27)(60, UserManagementComponent_div_60_Template, 3, 1, "div", 28)(61, UserManagementComponent_div_61_Template, 3, 1, "div", 29);
        \u0275\u0275elementEnd();
        \u0275\u0275template(62, UserManagementComponent_div_62_Template, 41, 9, "div", 27)(63, UserManagementComponent_div_63_Template, 72, 11, "div", 27);
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
        \u0275\u0275advance(12);
        \u0275\u0275twoWayProperty("ngModel", ctx.areaFilter);
        \u0275\u0275advance(5);
        \u0275\u0275property("ngForOf", ctx.areas);
        \u0275\u0275advance(18);
        \u0275\u0275property("ngForOf", ctx.filteredUsers);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.filteredUsers);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showAreaModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showCreateModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.successMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showResetPasswordModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showEditModal);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ['\n\n.user-management-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #2d3748;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.search-filters[_ngcontent-%COMP%] {\n  background: white;\n  padding: 20px;\n  border-radius: 12px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e2e8f0;\n  margin-bottom: 24px;\n}\n.search-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  background: #f8fafc;\n  border: 2px solid #e2e8f0;\n  border-radius: 12px;\n  transition: all 0.3s ease;\n}\n.search-box[_ngcontent-%COMP%]:focus-within {\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.search-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 16px;\n  color: #667eea;\n  font-size: 16px;\n}\n.search-input[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  outline: none;\n  padding: 16px 50px 16px 48px;\n  font-size: 16px;\n  width: 100%;\n  min-width: 400px;\n}\n.clear-search[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 16px;\n  background: #e2e8f0;\n  border: none;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  color: #718096;\n}\n.clear-search[_ngcontent-%COMP%]:hover {\n  background: #cbd5e0;\n  color: #2d3748;\n}\n.search-results[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #718096;\n  font-size: 14px;\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #e2e8f0;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 14px;\n}\n.filter-select[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  background: white;\n  min-width: 180px;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n.filter-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.users-table-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e2e8f0;\n}\n.users-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.users-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  padding: 16px;\n  text-align: left;\n  font-weight: 600;\n  color: #2d3748;\n  border-bottom: 1px solid #e2e8f0;\n}\n.users-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #f1f5f9;\n  vertical-align: top;\n}\n.disabled-user[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #e2e8f0;\n}\n.user-details[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #2d3748;\n  font-weight: 600;\n}\n.user-details[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 12px;\n}\n.contact-info[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 4px;\n  font-size: 13px;\n  color: #4a5568;\n}\n.contact-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 12px;\n  color: #a0aec0;\n}\n.role-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.role-admin[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n}\n.role-administrativo[_ngcontent-%COMP%] {\n  background: #bee3f8;\n  color: #3182ce;\n}\n.role-usuario[_ngcontent-%COMP%] {\n  background: #c6f6d5;\n  color: #38a169;\n}\n.area-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.area-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  background: #e6fffa;\n  color: #319795;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.area-badge.inactive[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n}\n.no-area[_ngcontent-%COMP%] {\n  color: #a0aec0;\n  font-style: italic;\n  font-size: 12px;\n}\n.status-indicators[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 11px;\n  font-weight: 600;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.status-badge.success[_ngcontent-%COMP%] {\n  background: #c6f6d5;\n  color: #38a169;\n}\n.status-badge.danger[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n}\n.status-badge.warning[_ngcontent-%COMP%] {\n  background: #faf089;\n  color: #d69e2e;\n}\n.user-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 2px solid #e2e8f0;\n  border-radius: 10px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  color: #4a5568;\n  position: relative;\n  overflow: hidden;\n}\n.btn-icon[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(255, 255, 255, 0.4),\n      transparent);\n  transition: left 0.5s;\n}\n.btn-icon[_ngcontent-%COMP%]:hover::before {\n  left: 100%;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: #667eea;\n  border-color: #667eea;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n}\n.btn-icon.btn-small[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.btn-icon.btn-danger[_ngcontent-%COMP%] {\n  color: #e53e3e;\n}\n.btn-icon.btn-danger[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fed7d7,\n      #feb2b2);\n  color: #e53e3e;\n  border-color: #f56565;\n}\n.btn-icon.btn-danger[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #e53e3e,\n      #c53030);\n  border-color: #e53e3e;\n  color: white;\n  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.4);\n}\n.btn-icon.btn-success[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #c6f6d5,\n      #9ae6b4);\n  color: #38a169;\n  border-color: #68d391;\n}\n.btn-icon.btn-success[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #38a169,\n      #2f855a);\n  border-color: #38a169;\n  color: white;\n  box-shadow: 0 4px 12px rgba(56, 161, 105, 0.4);\n}\n.btn-icon.btn-warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #faf089,\n      #f6e05e);\n  color: #d69e2e;\n  border-color: #ecc94b;\n}\n.btn-icon.btn-warning[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #d69e2e,\n      #b7791f);\n  border-color: #d69e2e;\n  color: white;\n  box-shadow: 0 4px 12px rgba(214, 158, 46, 0.4);\n}\n.btn-icon.btn-info[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #bee3f8,\n      #90cdf4);\n  color: #3182ce;\n  border-color: #63b3ed;\n}\n.btn-icon.btn-info[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #3182ce,\n      #2c5282);\n  border-color: #3182ce;\n  color: white;\n  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.4);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  width: 90%;\n  max-width: 400px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0;\n}\n.modal-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  color: #4a5568;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n  color: #2d3748;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 20px;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #5a67d8;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  background: #a0aec0;\n  cursor: not-allowed;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #4a5568;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e0;\n}\n.alert[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  padding: 16px 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n  z-index: 1001;\n  min-width: 300px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fff4;\n  color: #38a169;\n  border: 1px solid #9ae6b4;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n  border: 1px solid #feb2b2;\n}\n.create-user-modal[_ngcontent-%COMP%] {\n  max-width: 700px;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.edit-user-modal[_ngcontent-%COMP%] {\n  max-width: 700px;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.user-info-section[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  padding: 16px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  border-left: 4px solid #667eea;\n}\n.user-info-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 14px;\n  color: #4a5568;\n}\n.user-info-section[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2d3748;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n  margin-bottom: 20px;\n}\n.form-row[_ngcontent-%COMP%]:has( > .form-group[_ngcontent-%COMP%]:only-child), .form-row[_ngcontent-%COMP%]:last-child {\n  grid-template-columns: 1fr;\n}\n.form-check[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 8px;\n}\n.form-check-input[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid #e2e8f0;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background: #667eea;\n  border-color: #667eea;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #4a5568;\n  cursor: pointer;\n  margin: 0;\n}\n.required[_ngcontent-%COMP%] {\n  color: #e53e3e;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-size: 12px;\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.error-message[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 10px;\n}\n.auto-generate-info[_ngcontent-%COMP%] {\n  background: #e6fffa;\n  border: 1px solid #81e6d9;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #234e52;\n  font-size: 14px;\n}\n.auto-generate-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #319795;\n}\n.help-text[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #718096;\n  margin-top: 6px;\n  line-height: 1.4;\n}\n.desktop-only[_ngcontent-%COMP%] {\n  display: block;\n}\n.mobile-only[_ngcontent-%COMP%] {\n  display: none;\n}\n.users-cards-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.user-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n  transition: all 0.2s ease;\n  margin-bottom: 2px;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #fafbfc;\n  border-bottom: 1px solid #e5e7eb;\n}\n.user-main[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n.avatar-section[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n.avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 12px;\n  object-fit: cover;\n  border: 2px solid white;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.status-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -1px;\n  right: -1px;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  border: 2px solid white;\n  background: #ef4444;\n}\n.status-indicator.active[_ngcontent-%COMP%] {\n  background: #10b981;\n}\n.status-indicator.locked[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.user-data[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.user-data[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #111827;\n  margin: 0 0 4px 0;\n  line-height: 1.3;\n}\n.username[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n  margin: 0 0 8px 0;\n  font-weight: 500;\n}\n.email[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #4b5563;\n  margin: 0 0 2px 0;\n}\n.phone[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n}\n.info-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.info-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #374151;\n}\n.role-tag[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.role-admin[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.role-administrativo[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #2563eb;\n  border: 1px solid #dbeafe;\n}\n.role-usuario[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #16a34a;\n  border: 1px solid #bbf7d0;\n}\n.area-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.area-tag[_ngcontent-%COMP%] {\n  padding: 4px 10px;\n  background: #f0f9ff;\n  color: #0369a1;\n  border: 1px solid #bae6fd;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.area-tag.inactive[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border-color: #fecaca;\n}\n.area-tag.no-area[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  color: #6b7280;\n  border-color: #e5e7eb;\n}\n.edit-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #6b7280;\n  padding: 4px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.edit-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.alerts[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 500;\n}\n.alert.locked[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  color: #d97706;\n  border: 1px solid #fed7aa;\n}\n.alert.password[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.card-actions[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: #f9fafb;\n  border-top: 1px solid #e5e7eb;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n  background: white;\n  font-size: 13px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  color: #374151;\n}\n.action-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.action-btn.primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n  border-color: #3b82f6;\n}\n.action-btn.primary[_ngcontent-%COMP%]:active {\n  background: #2563eb;\n}\n.action-btn.enable[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #16a34a;\n  border-color: #bbf7d0;\n}\n.action-btn.enable[_ngcontent-%COMP%]:active {\n  background: #dcfce7;\n}\n.action-btn.disable[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border-color: #fecaca;\n}\n.action-btn.disable[_ngcontent-%COMP%]:active {\n  background: #fee2e2;\n}\n.action-btn.warning[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  color: #d97706;\n  border-color: #fed7aa;\n}\n.action-btn.warning[_ngcontent-%COMP%]:active {\n  background: #fef3c7;\n}\n.action-btn.danger[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  background: #fef2f2;\n  color: #dc2626;\n  border-color: #fecaca;\n  margin-top: 4px;\n}\n.action-btn.danger[_ngcontent-%COMP%]:active {\n  background: #fee2e2;\n}\n@media (max-width: 768px) {\n  .desktop-only[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .mobile-only[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n  }\n  .user-management-container[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 16px;\n    margin-bottom: 16px;\n  }\n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n    text-align: center;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .search-input[_ngcontent-%COMP%] {\n    min-width: 100%;\n    padding: 14px 50px 14px 48px;\n    font-size: 16px;\n  }\n  .filters[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .filter-select[_ngcontent-%COMP%] {\n    min-width: 100%;\n    font-size: 16px;\n  }\n  .modal[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 20px;\n  }\n  .create-user-modal[_ngcontent-%COMP%] {\n    max-height: 85vh;\n    width: 98%;\n    margin: 10px;\n  }\n  .edit-user-modal[_ngcontent-%COMP%] {\n    max-height: 85vh;\n    width: 98%;\n    margin: 10px;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    font-size: 16px;\n    padding: 12px;\n  }\n}\n@media (min-width: 769px) {\n  .desktop-only[_ngcontent-%COMP%] {\n    display: block !important;\n  }\n  .mobile-only[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n@media (max-width: 480px) {\n  .users-cards-container[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .card-content[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n  .card-actions[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n  }\n  .user-data[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n    border-radius: 12px;\n  }\n  .status-indicator[_ngcontent-%COMP%] {\n    width: 14px;\n    height: 14px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    padding: 8px 10px;\n    font-size: 12px;\n  }\n}\n.toggle-btn[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.toggle-btn[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  transition: width 0.6s, height 0.6s;\n}\n.toggle-btn[_ngcontent-%COMP%]:active::after {\n  width: 300px;\n  height: 300px;\n}\n.toggle-btn[data-status=enabled][_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulseEnabled 2s infinite;\n}\n.toggle-btn[data-lock=locked][_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulseLocked 2s infinite;\n}\n@keyframes _ngcontent-%COMP%_pulseEnabled {\n  0% {\n    box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4);\n  }\n  70% {\n    box-shadow: 0 0 0 6px rgba(229, 62, 62, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(229, 62, 62, 0);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulseLocked {\n  0% {\n    box-shadow: 0 0 0 0 rgba(49, 130, 206, 0.4);\n  }\n  70% {\n    box-shadow: 0 0 0 6px rgba(49, 130, 206, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(49, 130, 206, 0);\n  }\n}\n/*# sourceMappingURL=user-management.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserManagementComponent, { className: "UserManagementComponent" });
})();
export {
  UserManagementComponent
};
//# sourceMappingURL=chunk-67Q7EDQR.js.map
