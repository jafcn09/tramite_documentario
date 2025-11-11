import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-6M6PSWXB.js";
import {
  CommonModule,
  HttpClient,
  NgForOf,
  NgIf,
  catchError,
  computed,
  environment,
  finalize,
  inject,
  of,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-HL73AAZ4.js";

// src/app/components/role-management/role-management.component.ts
function RoleManagementComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function RoleManagementComponent_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275element(1, "i", 18);
    \u0275\u0275elementEnd();
  }
}
function RoleManagementComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "small", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("no-results", !ctx_r1.hasSearchResults());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.searchMessage(), " ");
  }
}
function RoleManagementComponent_section_14_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 25)(3, "div", 26);
    \u0275\u0275element(4, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(8, "td", 27);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 28)(11, "span", 29);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 28)(14, "div", 30)(15, "button", 31);
    \u0275\u0275listener("click", function RoleManagementComponent_section_14_tr_16_Template_button_click_15_listener() {
      const role_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editRole(role_r4));
    });
    \u0275\u0275element(16, "i", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 33);
    \u0275\u0275listener("click", function RoleManagementComponent_section_14_tr_16_Template_button_click_17_listener() {
      const role_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmDelete(role_r4));
    });
    \u0275\u0275element(18, "i", 34);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const role_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getRoleClass(role_r4.name));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getRoleIcon(role_r4.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(role_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r4.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", role_r4.userCount, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", role_r4.userCount > 0);
  }
}
function RoleManagementComponent_section_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 21)(1, "div", 22)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "table", 23)(5, "thead")(6, "tr")(7, "th");
    \u0275\u0275text(8, "Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Usuarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, RoleManagementComponent_section_14_tr_16_Template, 19, 8, "tr", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Mostrando ", ctx_r1.filteredRoles().length, " de ", ctx_r1.roles().length, " roles");
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.filteredRoles());
  }
}
function RoleManagementComponent_section_15_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 37)(1, "header", 38)(2, "div", 39);
    \u0275\u0275element(3, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 40)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 41)(10, "div", 42)(11, "span", 43);
    \u0275\u0275text(12, "Usuarios:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "footer", 44)(16, "button", 45);
    \u0275\u0275listener("click", function RoleManagementComponent_section_15_article_1_Template_button_click_16_listener() {
      const role_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editRole(role_r6));
    });
    \u0275\u0275element(17, "i", 32);
    \u0275\u0275text(18, "Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 46);
    \u0275\u0275listener("click", function RoleManagementComponent_section_15_article_1_Template_button_click_19_listener() {
      const role_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.confirmDelete(role_r6));
    });
    \u0275\u0275element(20, "i", 34);
    \u0275\u0275text(21, "Eliminar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const role_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getRoleClass(role_r6.name));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getRoleIcon(role_r6.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(role_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r6.description);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(role_r6.userCount);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", role_r6.userCount > 0);
  }
}
function RoleManagementComponent_section_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 35);
    \u0275\u0275template(1, RoleManagementComponent_section_15_article_1_Template, 22, 8, "article", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.filteredRoles());
  }
}
function RoleManagementComponent_div_16_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function RoleManagementComponent_div_16_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCreateModal());
    });
    \u0275\u0275element(1, "i", 4);
    \u0275\u0275text(2, "Crear Primer Rol ");
    \u0275\u0275elementEnd();
  }
}
function RoleManagementComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No se encontraron roles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, RoleManagementComponent_div_16_button_6_Template, 3, 0, "button", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.searchTerm ? 'No hay coincidencias para "' + ctx_r1.searchTerm + '"' : "No hay roles registrados");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.searchTerm);
  }
}
function RoleManagementComponent_div_17_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("name"), " ");
  }
}
function RoleManagementComponent_div_17_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("description"), " ");
  }
}
function RoleManagementComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function RoleManagementComponent_div_17_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275listener("click", function RoleManagementComponent_div_17_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 51)(3, "h2");
    \u0275\u0275element(4, "i");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 52);
    \u0275\u0275listener("click", function RoleManagementComponent_div_17_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275element(7, "i", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "form", 54)(9, "div", 55)(10, "label");
    \u0275\u0275text(11, "Nombre del Rol ");
    \u0275\u0275elementStart(12, "span", 56);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 57);
    \u0275\u0275template(15, RoleManagementComponent_div_17_span_15_Template, 2, 1, "span", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 55)(17, "label");
    \u0275\u0275text(18, "Descripci\xF3n ");
    \u0275\u0275elementStart(19, "span", 56);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(21, "textarea", 59);
    \u0275\u0275template(22, RoleManagementComponent_div_17_span_22_Template, 2, 1, "span", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 60)(24, "button", 61);
    \u0275\u0275listener("click", function RoleManagementComponent_div_17_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(25, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 62);
    \u0275\u0275listener("click", function RoleManagementComponent_div_17_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveRole());
    });
    \u0275\u0275element(27, "i");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.isEditing() ? "fas fa-pencil-alt" : "fas fa-plus-circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEditing() ? "Editar Rol" : "Crear Nuevo Rol", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r1.roleForm);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("name"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("name"));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("error", ctx_r1.isFieldInvalid("description"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isFieldInvalid("description"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.roleForm.invalid || ctx_r1.isLoading());
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.isLoading() ? "fas fa-spinner fa-spin" : "fas fa-check-circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLoading() ? "Guardando..." : ctx_r1.isEditing() ? "Actualizar" : "Crear", " ");
  }
}
function RoleManagementComponent_div_18_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275element(1, "i", 73);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Este rol tiene ", (tmp_2_0 = ctx_r1.roleToDelete()) == null ? null : tmp_2_0.userCount, " usuario(s) asignado(s).");
  }
}
function RoleManagementComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275listener("click", function RoleManagementComponent_div_18_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275elementStart(1, "div", 64);
    \u0275\u0275listener("click", function RoleManagementComponent_div_18_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "header", 51)(3, "h2");
    \u0275\u0275element(4, "i", 65);
    \u0275\u0275text(5, "Confirmar Eliminaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 52);
    \u0275\u0275listener("click", function RoleManagementComponent_div_18_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275element(7, "i", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 66)(9, "p");
    \u0275\u0275text(10, "\xBFEliminar el rol ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, RoleManagementComponent_div_18_div_14_Template, 4, 1, "div", 67);
    \u0275\u0275elementStart(15, "p", 68);
    \u0275\u0275text(16, "Esta acci\xF3n no se puede deshacer.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 60)(18, "button", 69);
    \u0275\u0275listener("click", function RoleManagementComponent_div_18_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 70);
    \u0275\u0275listener("click", function RoleManagementComponent_div_18_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.executeDelete());
    });
    \u0275\u0275element(21, "i", 71);
    \u0275\u0275text(22, "Eliminar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1('"', (tmp_1_0 = ctx_r1.roleToDelete()) == null ? null : tmp_1_0.name, '"');
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.roleToDelete()) == null ? null : tmp_2_0.userCount) && ctx_r1.roleToDelete().userCount > 0);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", (((tmp_3_0 = ctx_r1.roleToDelete()) == null ? null : tmp_3_0.userCount) || 0) > 0);
  }
}
function RoleManagementComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275element(1, "i", 75);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.successMessage(), " ");
  }
}
function RoleManagementComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76);
    \u0275\u0275element(1, "i", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.errorMessage(), " ");
  }
}
var RoleManagementComponent = class _RoleManagementComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.fb = inject(FormBuilder);
    this.roles = signal([]);
    this.searchTerm = "";
    this.showModal = signal(false);
    this.showDeleteModal = signal(false);
    this.isEditing = signal(false);
    this.isLoading = signal(false);
    this.currentRole = signal(null);
    this.roleToDelete = signal(null);
    this.successMessage = signal("");
    this.errorMessage = signal("");
    this.isMobile = signal(false);
    this.filteredRoles = computed(() => {
      const term = this.searchTerm.toLowerCase().trim();
      const allRoles = this.roles();
      if (!term)
        return allRoles;
      return allRoles.filter((role) => role.name.toLowerCase().includes(term) || role.description.toLowerCase().includes(term));
    });
    this.hasSearchResults = computed(() => {
      return this.searchTerm ? this.filteredRoles().length > 0 : true;
    });
    this.searchMessage = computed(() => {
      if (!this.searchTerm)
        return "";
      const count = this.filteredRoles().length;
      return count === 0 ? `No se encontraron roles que coincidan con "${this.searchTerm}"` : `${count} rol(es) encontrado(s) para "${this.searchTerm}"`;
    });
    this.roleForm = this.fb.group({
      name: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s0-9]+$/)
      ]],
      description: ["", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]]
    });
    this.checkViewport();
    window.addEventListener("resize", () => this.checkViewport());
  }
  ngOnInit() {
    this.loadRoles();
  }
  checkViewport() {
    this.isMobile.set(window.innerWidth < 768);
  }
  loadRoles() {
    const token = localStorage.getItem("auth_token");
    this.http.get(`${environment.apiUrl}/api/roles`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).pipe(catchError(() => {
      this.showError("Error al cargar los roles");
      return of([]);
    })).subscribe((roles) => {
      this.roles.set(roles);
    });
  }
  filterRoles() {
    this.filteredRoles();
  }
  clearSearch() {
    this.searchTerm = "";
  }
  openCreateModal() {
    this.isEditing.set(false);
    this.currentRole.set(null);
    this.roleForm.reset();
    this.showModal.set(true);
  }
  editRole(role) {
    this.isEditing.set(true);
    this.currentRole.set(role);
    this.roleForm.patchValue({
      name: role.name,
      description: role.description
    });
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
    this.currentRole.set(null);
    this.roleForm.reset();
  }
  saveRole() {
    if (this.roleForm.invalid) {
      Object.keys(this.roleForm.controls).forEach((key) => {
        const control = this.roleForm.get(key);
        if (control?.invalid)
          control.markAsTouched();
      });
      return;
    }
    this.isLoading.set(true);
    const token = localStorage.getItem("auth_token");
    const roleData = this.roleForm.value;
    const current = this.currentRole();
    const request$ = this.isEditing() && current ? this.http.put(`${environment.apiUrl}/api/roles/${current.id}`, roleData, {
      headers: { "Authorization": `Bearer ${token}` }
    }) : this.http.post(`${environment.apiUrl}/api/roles`, roleData, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    request$.pipe(finalize(() => this.isLoading.set(false)), catchError((err) => {
      this.showError(err.error?.message || err.error?.error || "Error al guardar el rol");
      return of(null);
    })).subscribe((role) => {
      if (role) {
        this.showSuccess(this.isEditing() ? "Rol actualizado" : "Rol creado");
        this.loadRoles();
        this.closeModal();
      }
    });
  }
  confirmDelete(role) {
    this.roleToDelete.set(role);
    this.showDeleteModal.set(true);
  }
  cancelDelete() {
    this.showDeleteModal.set(false);
    this.roleToDelete.set(null);
  }
  executeDelete() {
    const role = this.roleToDelete();
    if (!role)
      return;
    const token = localStorage.getItem("auth_token");
    this.http.delete(`${environment.apiUrl}/api/roles/${role.id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).pipe(catchError((err) => {
      this.showError(err.error?.message || err.error?.error || "Error al eliminar");
      return of(null);
    })).subscribe((result) => {
      if (result !== null) {
        this.showSuccess("Rol eliminado");
        this.loadRoles();
        this.cancelDelete();
      }
    });
  }
  getRoleIcon(roleName) {
    const icons = {
      "admin": "fas fa-university",
      "administrativo": "fas fa-graduation-cap",
      "usuario": "fas fa-user-graduate"
    };
    return icons[roleName.toLowerCase()] || "fas fa-book";
  }
  getRoleClass(roleName) {
    return roleName.toLowerCase();
  }
  formatDate(dateString) {
    if (!dateString)
      return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return "N/A";
    }
  }
  isFieldInvalid(fieldName) {
    const field = this.roleForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
  getFieldError(fieldName) {
    const field = this.roleForm.get(fieldName);
    if (!field?.errors)
      return "";
    const errors = {
      required: "Este campo es requerido",
      minlength: `M\xEDnimo ${field.errors["minlength"]?.requiredLength} caracteres`,
      maxlength: `M\xE1ximo ${field.errors["maxlength"]?.requiredLength} caracteres`,
      pattern: "Formato inv\xE1lido"
    };
    const firstError = Object.keys(field.errors)[0];
    return errors[firstError] || "Error de validaci\xF3n";
  }
  showSuccess(message) {
    this.successMessage.set(message);
    this.errorMessage.set("");
    setTimeout(() => this.successMessage.set(""), 5e3);
  }
  showError(message) {
    this.errorMessage.set(message);
    this.successMessage.set("");
    setTimeout(() => this.errorMessage.set(""), 5e3);
  }
  static {
    this.\u0275fac = function RoleManagementComponent_Factory(t) {
      return new (t || _RoleManagementComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleManagementComponent, selectors: [["app-role-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 21, vars: 10, consts: [[1, "container"], [1, "header"], [1, "fas", "fa-university"], [1, "btn-primary", 3, "click"], [1, "fas", "fa-plus-circle"], [1, "search-box"], [1, "search-input-wrapper"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Buscar roles por nombre o descripci\xF3n...", 3, "ngModelChange", "input", "ngModel"], ["class", "clear-btn", 3, "click", 4, "ngIf"], ["class", "search-results", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["class", "cards-wrapper", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "toast success", 4, "ngIf"], ["class", "toast error", 4, "ngIf"], [1, "clear-btn", 3, "click"], [1, "fas", "fa-times-circle"], [1, "search-results"], [1, "results-count"], [1, "table-wrapper"], [1, "table-info"], [1, "data-table"], [4, "ngFor", "ngForOf"], [1, "role-cell"], [1, "role-icon"], [1, "desc-cell"], [1, "center"], [1, "count-badge"], [1, "action-group"], [1, "btn-icon", "edit", 3, "click"], [1, "fas", "fa-pencil-alt"], [1, "btn-icon", "delete", 3, "click", "disabled"], [1, "fas", "fa-trash-alt"], [1, "cards-wrapper"], ["class", "role-card", 4, "ngFor", "ngForOf"], [1, "role-card"], [1, "card-header"], [1, "role-icon-lg"], [1, "card-info"], [1, "card-stats"], [1, "stat"], [1, "info-label"], [1, "card-actions"], [1, "btn-action", "primary", 3, "click"], [1, "btn-action", "danger", 3, "click", "disabled"], [1, "empty-state"], ["class", "btn-primary", 3, "click", 4, "ngIf"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn-close", 3, "click"], [1, "fas", "fa-times"], [1, "modal-body", 3, "formGroup"], [1, "form-field"], [1, "required"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Administrador"], ["class", "error-msg", 4, "ngIf"], ["formControlName", "description", "rows", "3", "placeholder", "Describe las responsabilidades..."], [1, "modal-actions"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], [1, "error-msg"], [1, "modal", "delete", 3, "click"], [1, "fas", "fa-exclamation-triangle"], [1, "modal-body"], ["class", "warning", 4, "ngIf"], [1, "text-muted"], [1, "btn-secondary", 3, "click"], [1, "btn-danger", 3, "click", "disabled"], [1, "fas", "fa-trash"], [1, "warning"], [1, "fas", "fa-users"], [1, "toast", "success"], [1, "fas", "fa-check-circle"], [1, "toast", "error"], [1, "fas", "fa-exclamation-circle"]], template: function RoleManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1");
        \u0275\u0275element(3, "i", 2);
        \u0275\u0275text(4, "Gesti\xF3n de Roles");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 3);
        \u0275\u0275listener("click", function RoleManagementComponent_Template_button_click_5_listener() {
          return ctx.openCreateModal();
        });
        \u0275\u0275element(6, "i", 4);
        \u0275\u0275text(7, "Nuevo Rol ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "section", 5)(9, "div", 6);
        \u0275\u0275element(10, "i", 7);
        \u0275\u0275elementStart(11, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function RoleManagementComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function RoleManagementComponent_Template_input_input_11_listener() {
          return ctx.filterRoles();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, RoleManagementComponent_button_12_Template, 2, 0, "button", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, RoleManagementComponent_div_13_Template, 3, 3, "div", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, RoleManagementComponent_section_14_Template, 17, 3, "section", 11)(15, RoleManagementComponent_section_15_Template, 2, 1, "section", 12)(16, RoleManagementComponent_div_16_Template, 7, 2, "div", 13)(17, RoleManagementComponent_div_17_Template, 29, 14, "div", 14)(18, RoleManagementComponent_div_18_Template, 23, 3, "div", 14)(19, RoleManagementComponent_div_19_Template, 3, 1, "div", 15)(20, RoleManagementComponent_div_20_Template, 3, 1, "div", 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isMobile());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isMobile());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredRoles().length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteModal());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.successMessage());
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage());
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n  background: #f5f7fa;\n  min-height: 100vh;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background:\n    linear-gradient(\n      135deg,\n      #2c5aa0,\n      #1e3a5f);\n  padding: 20px 24px;\n  border-radius: 8px;\n  color: white;\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(44, 90, 160, 0.3);\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #ffd700;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: white;\n  color: #2c5aa0;\n  border: 2px solid white;\n  padding: 10px 20px;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s;\n  font-size: 14px;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8f9ff;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.search-box[_ngcontent-%COMP%] {\n  background: white;\n  padding: 18px;\n  border-radius: 6px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  border: 1px solid #d1d9e0;\n  margin-bottom: 20px;\n}\n.search-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  background: #fafbfc;\n  border: 1px solid #d1d9e0;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.search-input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: #2c5aa0;\n  box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);\n}\n.search-input-wrapper[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  color: #64748b;\n}\n.search-input-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  outline: none;\n  padding: 12px 40px;\n  font-size: 14px;\n  width: 100%;\n  color: #374151;\n}\n.clear-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  background: #e2e8f0;\n  border: none;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: #718096;\n  transition: all 0.3s;\n}\n.clear-btn[_ngcontent-%COMP%]:hover {\n  background: #cbd5e0;\n  color: #2d3748;\n}\n.search-results[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  text-align: center;\n}\n.results-count[_ngcontent-%COMP%] {\n  display: block;\n  color: #718096;\n  font-weight: 500;\n}\n.results-count.no-results[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: 600;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 6px;\n  overflow: hidden;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  border: 1px solid #d1d9e0;\n}\n.table-info[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  background: #f1f5f9;\n  border-bottom: 2px solid #2c5aa0;\n  font-size: 14px;\n  color: #64748b;\n  font-weight: 500;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #2c5aa0;\n  padding: 12px 16px;\n  text-align: left;\n  font-weight: 600;\n  color: white;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-bottom: 1px solid #e5e7eb;\n  vertical-align: middle;\n  font-size: 14px;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even) {\n  background: #fafbfc;\n}\n.role-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.role-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  background: #2c5aa0;\n  color: white;\n}\n.role-icon.admin[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.role-icon.administrativo[_ngcontent-%COMP%] {\n  background: #3b82f6;\n}\n.role-icon.usuario[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  width: fit-content;\n}\n.badge-admin[_ngcontent-%COMP%] {\n  background: #fef9f2;\n  color: #92400e;\n  border: 1px solid #f59e0b;\n}\n.badge-administrativo[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  color: #1e40af;\n  border: 1px solid #3b82f6;\n}\n.badge-usuario[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #166534;\n  border: 1px solid #22c55e;\n}\n.desc-cell[_ngcontent-%COMP%] {\n  max-width: 300px;\n  color: #64748b;\n  line-height: 1.5;\n}\n.center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.count-badge[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #374151;\n  padding: 4px 12px;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 13px;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid #d1d5db;\n}\n.action-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #d1d5db;\n  border-radius: 4px;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s;\n  color: #6b7280;\n}\n.btn-icon[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.btn-icon[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.btn-icon.edit[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.btn-icon.edit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #eff6ff;\n  border-color: #2563eb;\n}\n.btn-icon.delete[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.btn-icon.delete[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fef2f2;\n  border-color: #dc2626;\n}\n.cards-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.role-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 6px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  border: 1px solid #d1d5db;\n  overflow: hidden;\n  transition: all 0.2s;\n}\n.role-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #f8f9fa;\n  border-bottom: 2px solid #2c5aa0;\n  display: flex;\n  gap: 12px;\n}\n.role-icon-lg[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  background: #2c5aa0;\n  color: white;\n  flex-shrink: 0;\n}\n.card-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.card-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 6px 0;\n}\n.card-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 14px;\n  line-height: 1.5;\n  margin: 8px 0 0 0;\n}\n.card-stats[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n}\n.stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0;\n  font-size: 14px;\n  color: #4b5563;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #6b7280;\n}\n.stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1f2937;\n  font-size: 16px;\n}\n.card-actions[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: #f8f9fa;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  gap: 8px;\n}\n.btn-action[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 8px 12px;\n  border-radius: 4px;\n  border: 1px solid;\n  font-size: 13px;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.btn-action.primary[_ngcontent-%COMP%] {\n  background: #2c5aa0;\n  color: white;\n  border-color: #2c5aa0;\n}\n.btn-action.primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1e3a5f;\n}\n.btn-action.danger[_ngcontent-%COMP%] {\n  background: white;\n  color: #dc2626;\n  border-color: #d1d5db;\n}\n.btn-action.danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fef2f2;\n  border-color: #dc2626;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #64748b;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #cbd5e0;\n  margin-bottom: 16px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  color: #374151;\n  margin: 0 0 8px 0;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 6px;\n  width: 90%;\n  max-width: 480px;\n  max-height: 85vh;\n  overflow: hidden;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n}\n.modal.delete[_ngcontent-%COMP%] {\n  max-width: 400px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-bottom: 2px solid #2c5aa0;\n  background:\n    linear-gradient(\n      135deg,\n      #2c5aa0,\n      #1e3a5f);\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: white;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  color: white;\n  width: 28px;\n  height: 28px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.form-field[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 600;\n  color: #374151;\n  font-size: 14px;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s;\n  background: white;\n  font-family: inherit;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-field[_ngcontent-%COMP%]   input.error[_ngcontent-%COMP%], .form-field[_ngcontent-%COMP%]   textarea.error[_ngcontent-%COMP%] {\n  border-color: #dc2626;\n  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);\n}\ntextarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.required[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.error-msg[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 12px;\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.error-msg[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 10px;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n  padding-top: 20px;\n  border-top: 1px solid #e5e7eb;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: white;\n  color: #6b7280;\n  border: 1px solid #d1d5db;\n  padding: 10px 20px;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 14px;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #9ca3af;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #dc2626;\n  color: white;\n  border: 1px solid #dc2626;\n  padding: 10px 20px;\n  border-radius: 4px;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.2s;\n  font-size: 14px;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #b91c1c;\n}\n.btn-danger[_ngcontent-%COMP%]:disabled {\n  background: #9ca3af;\n  border-color: #9ca3af;\n  cursor: not-allowed;\n}\n.warning[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  border: 1px solid #f59e0b;\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin: 16px 0;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #92400e;\n}\n.warning[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #f59e0b;\n  font-size: 16px;\n}\n.text-muted[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 14px;\n  font-style: italic;\n}\n.toast[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  padding: 16px 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n  z-index: 1001;\n  min-width: 300px;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n  animation: _ngcontent-%COMP%_slideIn 0.3s ease;\n}\n.toast.success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #16a34a;\n  border: 1px solid #bbf7d0;\n}\n.toast.error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    text-align: center;\n  }\n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .modal[_ngcontent-%COMP%] {\n    width: 95%;\n    margin: 10px;\n  }\n}\n@media (max-width: 480px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .card-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .btn-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=role-management.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleManagementComponent, { className: "RoleManagementComponent" });
})();
export {
  RoleManagementComponent
};
//# sourceMappingURL=chunk-NRSWZSCP.js.map
