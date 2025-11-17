import {
  CheckboxControlValueAccessor,
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
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VDZBNFIH.js";

// src/app/components/areas/areas.component.ts
function AreasComponent_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function AreasComponent_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275elementEnd();
  }
}
function AreasComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275element(2, "i", 8);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 23);
    \u0275\u0275listener("click", function AreasComponent_div_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275text(6, "Ver todas las \xE1reas");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('No se encontraron \xE1reas que coincidan con "', ctx_r1.searchTerm, '"');
  }
}
function AreasComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 25);
    \u0275\u0275listener("click", function AreasComponent_div_14_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275text(4, "Ver todas");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("Mostrando ", ctx_r1.paginatedAreas.length, " de ", ctx_r1.filteredAreas.length, ' resultado(s) para "', ctx_r1.searchTerm, '"');
  }
}
function AreasComponent_div_16_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275listener("click", function AreasComponent_div_16_div_10_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "button", 38);
    \u0275\u0275listener("click", function AreasComponent_div_16_div_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const area_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.editArea(area_r6);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275element(2, "i", 39);
    \u0275\u0275text(3, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 38);
    \u0275\u0275listener("click", function AreasComponent_div_16_div_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const area_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.toggleAreaStatus(area_r6);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275element(5, "i");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 40);
    \u0275\u0275listener("click", function AreasComponent_div_16_div_10_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const area_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.confirmDeleteArea(area_r6);
      return \u0275\u0275resetView(ctx_r1.closeMenu());
    });
    \u0275\u0275element(8, "i", 41);
    \u0275\u0275text(9, " Eliminar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const area_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275classMap(area_r6.activa ? "fas fa-toggle-off" : "fas fa-toggle-on");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", area_r6.activa ? "Desactivar" : "Activar", " ");
  }
}
function AreasComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28);
    \u0275\u0275listener("click", function AreasComponent_div_16_Template_div_click_2_listener() {
      const area_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectArea(area_r6));
    });
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 29)(8, "button", 30);
    \u0275\u0275listener("click", function AreasComponent_div_16_Template_button_click_8_listener($event) {
      const area_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.toggleMenu(area_r6.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(9, "i", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, AreasComponent_div_16_div_10_Template, 10, 3, "div", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 33)(12, "div", 34);
    \u0275\u0275element(13, "i", 35);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 34);
    \u0275\u0275element(17, "i", 36);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const area_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(area_r6.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(area_r6.descripcion || "Sin descripci\xF3n");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.openMenuId === area_r6.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", area_r6.usuariosCount, " usuarios");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-success", area_r6.activa)("text-danger", !area_r6.activa);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(area_r6.activa ? "Activa" : "Inactiva");
  }
}
function AreasComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "button", 43);
    \u0275\u0275listener("click", function AreasComponent_div_17_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage - 1));
    });
    \u0275\u0275element(2, "i", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 43);
    \u0275\u0275listener("click", function AreasComponent_div_17_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage + 1));
    });
    \u0275\u0275element(6, "i", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" ", ctx_r1.currentPage, " de ", ctx_r1.totalPages, " (", ctx_r1.totalAreas, " \xE1rea(s)) ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
  }
}
function AreasComponent_div_18_div_12_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El nombre es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function AreasComponent_div_18_div_12_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "El nombre no puede tener m\xE1s de 100 caracteres");
    \u0275\u0275elementEnd();
  }
}
function AreasComponent_div_18_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275template(1, AreasComponent_div_18_div_12_span_1_Template, 2, 0, "span", 66)(2, AreasComponent_div_18_div_12_span_2_Template, 2, 0, "span", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.areaForm.get("nombre")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["required"]);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_3_0 = ctx_r1.areaForm.get("nombre")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["maxlength"]);
  }
}
function AreasComponent_div_18_div_18_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "La descripci\xF3n no puede tener m\xE1s de 500 caracteres");
    \u0275\u0275elementEnd();
  }
}
function AreasComponent_div_18_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275template(1, AreasComponent_div_18_div_18_span_1_Template, 2, 0, "span", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (tmp_2_0 = ctx_r1.areaForm.get("descripcion")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxlength"]);
  }
}
function AreasComponent_div_18_i_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
  }
}
function AreasComponent_div_18_i_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 68);
  }
}
function AreasComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function AreasComponent_div_18_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 48);
    \u0275\u0275listener("click", function AreasComponent_div_18_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function AreasComponent_div_18_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275element(6, "i", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 51);
    \u0275\u0275listener("ngSubmit", function AreasComponent_div_18_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveArea());
    });
    \u0275\u0275elementStart(8, "div", 52)(9, "label", 53);
    \u0275\u0275text(10, "Nombre del \xC1rea *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 54);
    \u0275\u0275template(12, AreasComponent_div_18_div_12_Template, 3, 2, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 52)(14, "label", 56);
    \u0275\u0275text(15, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "textarea", 57);
    \u0275\u0275text(17, "          ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, AreasComponent_div_18_div_18_Template, 2, 1, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 52)(20, "label", 58);
    \u0275\u0275element(21, "input", 59);
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "\xC1rea activa");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 60)(25, "button", 61);
    \u0275\u0275listener("click", function AreasComponent_div_18_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(26, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 62);
    \u0275\u0275template(28, AreasComponent_div_18_i_28_Template, 1, 0, "i", 63)(29, AreasComponent_div_18_i_29_Template, 1, 0, "i", 64);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditing ? "Editar \xC1rea" : "Nueva \xC1rea");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r1.areaForm);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_3_0 = ctx_r1.areaForm.get("nombre")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.areaForm.get("nombre")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.areaForm.get("nombre")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.areaForm.get("nombre")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_5_0 = ctx_r1.areaForm.get("descripcion")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.areaForm.get("descripcion")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ((tmp_6_0 = ctx_r1.areaForm.get("descripcion")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.areaForm.get("descripcion")) == null ? null : tmp_6_0.touched));
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r1.areaForm.invalid || ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLoading ? "Guardando..." : ctx_r1.isEditing ? "Actualizar" : "Crear", " ");
  }
}
function AreasComponent_div_19_div_25_div_1_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 90);
  }
  if (rf & 2) {
    const user_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", user_r11.foto, \u0275\u0275sanitizeUrl)("alt", user_r11.nombre);
  }
}
function AreasComponent_div_19_div_25_div_1_i_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 91);
  }
}
function AreasComponent_div_19_div_25_div_1_span_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "Bloqueado");
    \u0275\u0275elementEnd();
  }
}
function AreasComponent_div_19_div_25_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78)(1, "div", 79);
    \u0275\u0275template(2, AreasComponent_div_19_div_25_div_1_img_2_Template, 1, 2, "img", 80)(3, AreasComponent_div_19_div_25_div_1_i_3_Template, 1, 0, "i", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 82)(5, "div", 83);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 84)(8, "span", 85);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 86);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 87)(13, "span", 88);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, AreasComponent_div_19_div_25_div_1_span_15_Template, 2, 0, "span", 89);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", user_r11.foto);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r11.foto);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", user_r11.nombre, " ", user_r11.apellidos, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r11.correo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r11.role.name);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("enabled", user_r11.accountEnabled)("disabled", !user_r11.accountEnabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r11.accountEnabled ? "Habilitado" : "Deshabilitado", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", user_r11.accountLocked);
  }
}
function AreasComponent_div_19_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76);
    \u0275\u0275template(1, AreasComponent_div_19_div_25_div_1_Template, 16, 12, "div", 77);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.areaUsers);
  }
}
function AreasComponent_div_19_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93);
    \u0275\u0275element(1, "i", 94);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay usuarios asignados a esta \xE1rea");
    \u0275\u0275elementEnd()();
  }
}
function AreasComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function AreasComponent_div_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetailModal());
    });
    \u0275\u0275elementStart(1, "div", 69);
    \u0275\u0275listener("click", function AreasComponent_div_19_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275element(4, "i", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 50);
    \u0275\u0275listener("click", function AreasComponent_div_19_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDetailModal());
    });
    \u0275\u0275element(7, "i", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 70)(9, "div", 71)(10, "div", 72)(11, "label");
    \u0275\u0275text(12, "Descripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 72)(16, "label");
    \u0275\u0275text(17, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 73);
    \u0275\u0275element(19, "i", 36);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 74)(22, "h3");
    \u0275\u0275element(23, "i", 35);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, AreasComponent_div_19_div_25_Template, 2, 1, "div", 75)(26, AreasComponent_div_19_ng_template_26_Template, 4, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const noUsers_r12 = \u0275\u0275reference(27);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedArea == null ? null : ctx_r1.selectedArea.nombre, " ");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((ctx_r1.selectedArea == null ? null : ctx_r1.selectedArea.descripcion) || "Sin descripci\xF3n");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.selectedArea == null ? null : ctx_r1.selectedArea.activa)("inactive", !(ctx_r1.selectedArea == null ? null : ctx_r1.selectedArea.activa));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.selectedArea == null ? null : ctx_r1.selectedArea.activa) ? "Activa" : "Inactiva", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Usuarios Asignados (", ctx_r1.areaUsers.length, ") ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.areaUsers.length > 0)("ngIfElse", noUsers_r12);
  }
}
function AreasComponent_div_20_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 101);
    \u0275\u0275element(1, "i", 35);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Esta \xE1rea tiene ", ctx_r1.areaToDelete == null ? null : ctx_r1.areaToDelete.usuariosCount, " usuario(s) asignado(s). No se puede eliminar.");
  }
}
function AreasComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function AreasComponent_div_20_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275elementStart(1, "div", 95);
    \u0275\u0275listener("click", function AreasComponent_div_20_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 49)(3, "h2");
    \u0275\u0275element(4, "i", 96);
    \u0275\u0275text(5, " Confirmar eliminaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 50);
    \u0275\u0275listener("click", function AreasComponent_div_20_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275element(7, "i", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 97)(9, "p");
    \u0275\u0275text(10, "\xBFEst\xE1s seguro de que deseas eliminar el \xE1rea ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, "?");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, AreasComponent_div_20_div_14_Template, 4, 1, "div", 98);
    \u0275\u0275elementStart(15, "p", 99);
    \u0275\u0275text(16, "Esta acci\xF3n no se puede deshacer.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 60)(18, "button", 61);
    \u0275\u0275listener("click", function AreasComponent_div_20_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275text(19, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 100);
    \u0275\u0275listener("click", function AreasComponent_div_20_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.executeDelete());
    });
    \u0275\u0275element(21, "i", 41);
    \u0275\u0275text(22, " Eliminar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1('"', ctx_r1.areaToDelete == null ? null : ctx_r1.areaToDelete.nombre, '"');
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.areaToDelete && ctx_r1.areaToDelete.usuariosCount && ctx_r1.areaToDelete.usuariosCount > 0);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", !!(ctx_r1.areaToDelete && ctx_r1.areaToDelete.usuariosCount && ctx_r1.areaToDelete.usuariosCount > 0));
  }
}
function AreasComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102);
    \u0275\u0275element(1, "i", 103);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMessage, " ");
  }
}
function AreasComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 104);
    \u0275\u0275element(1, "i", 105);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
var AreasComponent = class _AreasComponent {
  constructor(http, fb) {
    this.http = http;
    this.fb = fb;
    this.areas = [];
    this.filteredAreas = [];
    this.paginatedAreas = [];
    this.showModal = false;
    this.showDetailModal = false;
    this.showDeleteModal = false;
    this.isEditing = false;
    this.isLoading = false;
    this.currentArea = null;
    this.selectedArea = null;
    this.areaToDelete = null;
    this.areaUsers = [];
    this.successMessage = "";
    this.errorMessage = "";
    this.openMenuId = null;
    this.searchTerm = "";
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.totalPages = 0;
    this.totalAreas = 0;
    this.areaForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      descripcion: ["", [Validators.maxLength(500)]],
      activa: [true]
    });
  }
  ngOnInit() {
    this.loadAreas();
  }
  loadAreas() {
    const token = localStorage.getItem("auth_token");
    this.http.get(`${environment.apiUrl}/api/areas`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (areas) => {
        this.areas = areas;
        this.filterAreas();
      },
      error: (error) => {
        this.showError("Error al cargar las \xE1reas");
      }
    });
  }
  openCreateModal() {
    this.isEditing = false;
    this.currentArea = null;
    this.areaForm.reset({ activa: true });
    this.showModal = true;
  }
  editArea(area) {
    this.isEditing = true;
    this.currentArea = area;
    this.areaForm.patchValue(area);
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.clearMessages();
  }
  saveArea() {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const token = localStorage.getItem("auth_token");
    const areaData = this.areaForm.value;
    const request = this.isEditing ? this.http.put(`${environment.apiUrl}/api/areas/${this.currentArea.id}`, areaData, {
      headers: { "Authorization": `Bearer ${token}` }
    }) : this.http.post(`${environment.apiUrl}/api/areas`, areaData, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    request.subscribe({
      next: (area) => {
        this.showSuccess(this.isEditing ? "\xC1rea actualizada correctamente" : "\xC1rea creada correctamente");
        this.loadAreas();
        this.closeModal();
        this.isLoading = false;
      },
      error: (error) => {
        this.showError(error.error?.error || "Error al guardar el \xE1rea");
        this.isLoading = false;
      }
    });
  }
  toggleAreaStatus(area) {
    const token = localStorage.getItem("auth_token");
    this.http.put(`${environment.apiUrl}/api/areas/${area.id}/toggle-status`, {}, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (updatedArea) => {
        this.showSuccess(`\xC1rea ${updatedArea.activa ? "activada" : "desactivada"} correctamente`);
        this.loadAreas();
      },
      error: (error) => {
        this.showError("Error al cambiar el estado del \xE1rea");
      }
    });
  }
  confirmDeleteArea(area) {
    this.areaToDelete = area;
    this.showDeleteModal = true;
  }
  cancelDelete() {
    this.showDeleteModal = false;
    this.areaToDelete = null;
  }
  executeDelete() {
    if (!this.areaToDelete)
      return;
    const token = localStorage.getItem("auth_token");
    this.http.delete(`${environment.apiUrl}/api/areas/${this.areaToDelete.id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.showSuccess("\xC1rea eliminada correctamente");
        this.loadAreas();
        this.cancelDelete();
      },
      error: (error) => {
        this.showError(error.error?.error || "Error al eliminar el \xE1rea");
        this.cancelDelete();
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
  showError(message) {
    this.errorMessage = message;
    this.successMessage = "";
    setTimeout(() => {
      this.errorMessage = "";
    }, 5e3);
  }
  filterAreas() {
    if (!this.searchTerm.trim()) {
      this.filteredAreas = [...this.areas];
    } else {
      this.filteredAreas = this.areas.filter((area) => area.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || area.descripcion && area.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    this.totalAreas = this.filteredAreas.length;
    this.totalPages = Math.ceil(this.totalAreas / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    this.updatePaginatedAreas();
  }
  updatePaginatedAreas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAreas = this.filteredAreas.slice(startIndex, endIndex);
  }
  clearSearch() {
    this.searchTerm = "";
    this.currentPage = 1;
    this.filterAreas();
  }
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedAreas();
    }
  }
  selectArea(area) {
    this.selectedArea = area;
    this.loadAreaUsers(area.id);
    this.showDetailModal = true;
  }
  loadAreaUsers(areaId) {
    const token = localStorage.getItem("auth_token");
    this.http.get(`${environment.apiUrl}/api/usuario-area/area/${areaId}/users`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).subscribe({
      next: (users) => {
        this.areaUsers = users;
      },
      error: (error) => {
        this.areaUsers = [];
      }
    });
  }
  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedArea = null;
    this.areaUsers = [];
  }
  clearMessages() {
    this.successMessage = "";
    this.errorMessage = "";
  }
  toggleMenu(areaId) {
    this.openMenuId = this.openMenuId === areaId ? null : areaId;
  }
  closeMenu() {
    this.openMenuId = null;
  }
  static {
    this.\u0275fac = function AreasComponent_Factory(t) {
      return new (t || _AreasComponent)(\u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AreasComponent, selectors: [["app-areas"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 11, consts: [["noUsers", ""], [1, "areas-container"], [1, "header"], [1, "fas", "fa-building"], [1, "btn-primary", 3, "click"], [1, "fas", "fa-plus"], [1, "search-container"], [1, "search-box"], [1, "fas", "fa-search"], ["type", "text", "placeholder", "Buscar \xE1reas por nombre...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], ["class", "clear-search", "title", "Limpiar b\xFAsqueda", 3, "click", 4, "ngIf"], ["class", "search-results", 4, "ngIf"], ["class", "search-info", 4, "ngIf"], [1, "areas-grid"], ["class", "area-card", 4, "ngFor", "ngForOf"], ["class", "pagination", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["title", "Limpiar b\xFAsqueda", 1, "clear-search", 3, "click"], [1, "fas", "fa-times"], [1, "search-results"], [1, "no-results"], [1, "btn-secondary", 3, "click"], [1, "search-info"], [1, "btn-link", 3, "click"], [1, "area-card"], [1, "area-header"], [1, "area-info", 3, "click"], [1, "area-actions-menu"], ["title", "Opciones", 1, "menu-trigger", 3, "click"], [1, "fas", "fa-ellipsis-v"], ["class", "dropdown-menu", 3, "click", 4, "ngIf"], [1, "area-stats"], [1, "stat"], [1, "fas", "fa-users"], [1, "fas", "fa-circle"], [1, "dropdown-menu", 3, "click"], [1, "dropdown-item", 3, "click"], [1, "fas", "fa-edit"], [1, "dropdown-item", "delete", 3, "click"], [1, "fas", "fa-trash"], [1, "pagination"], [1, "pagination-btn", 3, "click", "disabled"], [1, "fas", "fa-chevron-left"], [1, "pagination-info"], [1, "fas", "fa-chevron-right"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn-icon", "modal-close", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "nombre"], ["type", "text", "id", "nombre", "formControlName", "nombre", "placeholder", "Ingrese el nombre del \xE1rea"], ["class", "error-message", 4, "ngIf"], ["for", "descripcion"], ["id", "descripcion", "formControlName", "descripcion", "placeholder", "Ingrese la descripci\xF3n del \xE1rea", "rows", "3"], [1, "checkbox-label"], ["type", "checkbox", "formControlName", "activa"], [1, "form-actions"], ["type", "button", 1, "btn-secondary", 3, "click"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["class", "fas fa-save", 4, "ngIf"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "error-message"], [4, "ngIf"], [1, "fas", "fa-save"], [1, "fas", "fa-spinner", "fa-spin"], [1, "modal", "modal-large", 3, "click"], [1, "area-detail-content"], [1, "area-info-section"], [1, "info-item"], [1, "status-badge"], [1, "users-section"], ["class", "users-list", 4, "ngIf", "ngIfElse"], [1, "users-list"], ["class", "user-card", 4, "ngFor", "ngForOf"], [1, "user-card"], [1, "user-avatar"], [3, "src", "alt", 4, "ngIf"], ["class", "fas fa-user", 4, "ngIf"], [1, "user-info"], [1, "user-name"], [1, "user-details"], [1, "user-email"], [1, "user-role"], [1, "user-status"], [1, "status-indicator"], ["class", "locked", 4, "ngIf"], [3, "src", "alt"], [1, "fas", "fa-user"], [1, "locked"], [1, "no-users"], [1, "fas", "fa-user-slash"], [1, "modal", "modal-small", 3, "click"], [1, "fas", "fa-exclamation-triangle", "text-warning"], [1, "delete-content"], ["class", "warning-box", 4, "ngIf"], [1, "warning-text"], ["type", "button", 1, "btn-danger", 3, "click", "disabled"], [1, "warning-box"], [1, "alert", "alert-success"], [1, "fas", "fa-check-circle"], [1, "alert", "alert-error"], [1, "fas", "fa-exclamation-circle"]], template: function AreasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
        \u0275\u0275element(3, "i", 3);
        \u0275\u0275text(4, " Gesti\xF3n de \xC1reas ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 4);
        \u0275\u0275listener("click", function AreasComponent_Template_button_click_5_listener() {
          return ctx.openCreateModal();
        });
        \u0275\u0275element(6, "i", 5);
        \u0275\u0275text(7, " Nueva \xC1rea ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 6)(9, "div", 7);
        \u0275\u0275element(10, "i", 8);
        \u0275\u0275elementStart(11, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function AreasComponent_Template_input_ngModelChange_11_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("input", function AreasComponent_Template_input_input_11_listener() {
          return ctx.filterAreas();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, AreasComponent_button_12_Template, 2, 0, "button", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(13, AreasComponent_div_13_Template, 7, 1, "div", 11)(14, AreasComponent_div_14_Template, 5, 3, "div", 12);
        \u0275\u0275elementStart(15, "div", 13);
        \u0275\u0275template(16, AreasComponent_div_16_Template, 20, 9, "div", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, AreasComponent_div_17_Template, 7, 5, "div", 15)(18, AreasComponent_div_18_Template, 31, 12, "div", 16)(19, AreasComponent_div_19_Template, 28, 10, "div", 16)(20, AreasComponent_div_20_Template, 23, 3, "div", 16)(21, AreasComponent_div_21_Template, 3, 1, "div", 17)(22, AreasComponent_div_22_Template, 3, 1, "div", 18);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm && ctx.filteredAreas.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.searchTerm && ctx.filteredAreas.length > 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.paginatedAreas);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.totalPages > 1);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDetailModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showDeleteModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.successMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.areas-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #2d3748;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.areas-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 24px;\n}\n@media (max-width: 768px) {\n  .areas-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n}\n.area-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e2e8f0;\n  transition: all 0.3s ease;\n}\n.area-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);\n}\n.area-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n.area-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0 0 8px 0;\n}\n.area-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  margin: 0;\n  font-size: 14px;\n  line-height: 1.4;\n}\n.area-actions-menu[_ngcontent-%COMP%] {\n  position: relative;\n}\n.menu-trigger[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #718096;\n  font-size: 18px;\n  padding: 8px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n}\n.menu-trigger[_ngcontent-%COMP%]:hover {\n  background: #f0f4f8;\n  color: #2c5aa0;\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  border: 1px solid #e2e8f0;\n  min-width: 160px;\n  z-index: 10;\n  margin-top: 4px;\n  overflow: hidden;\n}\n.dropdown-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  padding: 12px 16px;\n  background: transparent;\n  border: none;\n  color: #2d3748;\n  font-size: 14px;\n  font-weight: 500;\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-bottom: 1px solid #f7fafc;\n}\n.dropdown-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover {\n  background: #f7fafc;\n  color: #2c5aa0;\n}\n.dropdown-item.delete[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.dropdown-item.delete[_ngcontent-%COMP%]:hover {\n  background: #fff5f5;\n  color: #c53030;\n}\n.dropdown-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 16px;\n  text-align: center;\n}\n.area-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  padding-top: 16px;\n  border-top: 1px solid #e2e8f0;\n}\n.stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #4a5568;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #5a67d8;\n  transform: translateY(-1px);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  background: #a0aec0;\n  cursor: not-allowed;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #4a5568;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #cbd5e0;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  border-radius: 4px;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  color: #4a5568;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: #f0f4f8;\n  color: #2c5aa0;\n}\n.btn-icon.modal-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 1px solid #e2e8f0;\n  background: #f7fafc;\n}\n.btn-icon.modal-close[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: #4a5568;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #38a169;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #e53e3e;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.modal[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  width: 90%;\n  max-width: 500px;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  color: #2d3748;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .modal-header[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n    position: sticky;\n    top: 0;\n    background: white;\n    z-index: 1;\n    padding-bottom: 16px;\n    border-bottom: 1px solid #e2e8f0;\n  }\n  .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 18px;\n    flex: 1;\n    margin-right: 16px;\n    word-break: break-word;\n  }\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n  color: #2d3748;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: border-color 0.3s ease;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-group[_ngcontent-%COMP%]   input.error[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea.error[_ngcontent-%COMP%] {\n  border-color: #e53e3e;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n.checkbox-label[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: auto;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 24px;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-size: 12px;\n  margin-top: 4px;\n}\n.alert[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  padding: 16px 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n  z-index: 1001;\n  min-width: 300px;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fff4;\n  color: #38a169;\n  border: 1px solid #9ae6b4;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #e53e3e;\n  border: 1px solid #feb2b2;\n}\n.search-container[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 400px;\n}\n.search-box[_ngcontent-%COMP%]   i.fas.fa-search[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #a0aec0;\n  z-index: 1;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 12px 12px 40px;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.clear-search[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: #e2e8f0;\n  border: none;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: #718096;\n  transition: all 0.3s ease;\n}\n.clear-search[_ngcontent-%COMP%]:hover {\n  background: #cbd5e0;\n}\n.search-results[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.no-results[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  background: #f7fafc;\n  border-radius: 12px;\n  border: 2px dashed #e2e8f0;\n}\n.no-results[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #a0aec0;\n  margin-bottom: 16px;\n}\n.no-results[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  margin-bottom: 16px;\n  font-size: 16px;\n}\n.search-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding: 12px 16px;\n  background: #edf2f7;\n  border-radius: 8px;\n}\n.search-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #4a5568;\n  font-size: 14px;\n}\n.btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #667eea;\n  text-decoration: underline;\n  cursor: pointer;\n  font-size: 14px;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  color: #5a67d8;\n}\n.pagination[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  margin-top: 32px;\n  padding: 20px 0;\n}\n.pagination-btn[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  color: #4a5568;\n}\n.pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #667eea;\n  border-color: #667eea;\n  color: white;\n}\n.pagination-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.pagination-info[_ngcontent-%COMP%] {\n  color: #4a5568;\n  font-weight: 500;\n  font-size: 14px;\n}\n.area-info[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.modal-large[_ngcontent-%COMP%] {\n  max-width: 800px;\n  width: 95%;\n}\n@media (max-width: 768px) {\n  .modal-large[_ngcontent-%COMP%] {\n    width: 98%;\n    max-width: 100vw;\n    max-height: 95vh;\n    margin: 2.5vh 1vw;\n  }\n  .modal[_ngcontent-%COMP%] {\n    padding: 16px;\n    border-radius: 8px;\n  }\n}\n.area-detail-content[_ngcontent-%COMP%] {\n  max-height: 70vh;\n  overflow-y: auto;\n}\n@media (max-width: 768px) {\n  .area-detail-content[_ngcontent-%COMP%] {\n    max-height: 80vh;\n  }\n}\n.area-info-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.info-item[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  display: block;\n  margin-bottom: 4px;\n}\n.info-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #4a5568;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .area-info-section[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n    padding-bottom: 16px;\n  }\n  .info-item[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n  }\n  .info-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n    line-height: 1.5;\n  }\n  .users-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 16px;\n    margin-bottom: 12px;\n  }\n  .status-badge[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 3px 10px;\n  }\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.status-badge.active[_ngcontent-%COMP%] {\n  background: #c6f6d5;\n  color: #22543d;\n}\n.status-badge.inactive[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #742a2a;\n}\n.users-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.users-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n.user-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  background: #f7fafc;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n}\n@media (max-width: 768px) {\n  .user-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n    padding: 16px 12px;\n  }\n  .user-avatar[_ngcontent-%COMP%] {\n    align-self: center;\n    margin-bottom: 8px;\n  }\n  .user-info[_ngcontent-%COMP%] {\n    text-align: center;\n    width: 100%;\n  }\n  .user-details[_ngcontent-%COMP%] {\n    justify-content: center;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .user-status[_ngcontent-%COMP%] {\n    justify-content: center;\n    gap: 12px;\n  }\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #e2e8f0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.user-avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.user-avatar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #a0aec0;\n  font-size: 18px;\n}\n.user-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  margin-bottom: 4px;\n}\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 4px;\n}\n.user-email[_ngcontent-%COMP%] {\n  color: #4a5568;\n  font-size: 13px;\n}\n.user-role[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-size: 13px;\n  font-weight: 500;\n}\n.user-status[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.status-indicator[_ngcontent-%COMP%] {\n  font-size: 11px;\n  padding: 2px 6px;\n  border-radius: 12px;\n  font-weight: 500;\n}\n.status-indicator.enabled[_ngcontent-%COMP%] {\n  background: #c6f6d5;\n  color: #22543d;\n}\n.status-indicator.disabled[_ngcontent-%COMP%] {\n  background: #fed7d7;\n  color: #742a2a;\n}\n.status-indicator.locked[_ngcontent-%COMP%] {\n  background: #fbb6ce;\n  color: #702459;\n}\n.no-users[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #718096;\n}\n.no-users[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 12px;\n  opacity: 0.5;\n}\n.no-users[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.modal-small[_ngcontent-%COMP%] {\n  max-width: 500px;\n  width: 90%;\n}\n.delete-content[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.delete-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  line-height: 1.5;\n}\n.warning-box[_ngcontent-%COMP%] {\n  background: #fef5e7;\n  border: 1px solid #f6ad55;\n  border-radius: 8px;\n  padding: 12px;\n  margin: 16px 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #c05621;\n}\n.warning-box[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.warning-text[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 13px;\n  margin-top: 8px !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #d69e2e;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background: #e53e3e;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #c53030;\n  transform: translateY(-1px);\n}\n.btn-danger[_ngcontent-%COMP%]:disabled {\n  background: #a0aec0;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=areas.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AreasComponent, { className: "AreasComponent" });
})();
export {
  AreasComponent
};
//# sourceMappingURL=chunk-4RAB74G5.js.map
