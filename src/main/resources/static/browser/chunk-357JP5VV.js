import {
  AuthService,
  Router,
  RouterModule
} from "./chunk-HNI5KL6U.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-T3F2XNQR.js";
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
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VDZBNFIH.js";

// src/app/shared/user-profile/user-profile.component.ts
function UserProfileComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275element(1, "i", 47);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Subiendo...");
    \u0275\u0275elementEnd()();
  }
}
function UserProfileComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "i", 45);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getRoleDescription());
  }
}
function UserProfileComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.successMessage, " ");
  }
}
function UserProfileComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "i", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.errorMessages["general"], " ");
  }
}
function UserProfileComponent_form_41_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275element(1, "i", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getErrorMessage("correo"), " ");
  }
}
function UserProfileComponent_form_41_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275element(1, "i", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getErrorMessage("celular"), " ");
  }
}
function UserProfileComponent_form_41_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275element(1, "i", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getErrorMessage("direccion"), " ");
  }
}
function UserProfileComponent_form_41_i_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
  }
}
function UserProfileComponent_form_41_i_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 47);
  }
}
function UserProfileComponent_form_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 52)(1, "div", 53)(2, "div", 54)(3, "label");
    \u0275\u0275text(4, "Nombres");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 54)(7, "label");
    \u0275\u0275text(8, "Apellidos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 54)(11, "label");
    \u0275\u0275text(12, "Correo Electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 56);
    \u0275\u0275template(14, UserProfileComponent_form_41_span_14_Template, 3, 1, "span", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 54)(16, "label");
    \u0275\u0275text(17, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 54)(20, "label");
    \u0275\u0275text(21, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 58);
    \u0275\u0275template(23, UserProfileComponent_form_41_span_23_Template, 3, 1, "span", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 54)(25, "label");
    \u0275\u0275text(26, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 59);
    \u0275\u0275template(28, UserProfileComponent_form_41_span_28_Template, 3, 1, "span", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 54)(30, "label");
    \u0275\u0275text(31, "Tipo de Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "input", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 54)(34, "label");
    \u0275\u0275text(35, "N\xFAmero de Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 60)(38, "button", 61);
    \u0275\u0275listener("click", function UserProfileComponent_form_41_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelEdit());
    });
    \u0275\u0275element(39, "i", 62);
    \u0275\u0275text(40, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 63);
    \u0275\u0275listener("click", function UserProfileComponent_form_41_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveProfile());
    });
    \u0275\u0275template(42, UserProfileComponent_form_41_i_42_Template, 1, 0, "i", 64)(43, UserProfileComponent_form_41_i_43_Template, 1, 0, "i", 65);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r2.editForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.nombre);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.apellidos);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_5_0 = ctx_r2.editForm.get("correo")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r2.editForm.get("correo")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_6_0 = ctx_r2.editForm.get("correo")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r2.editForm.get("correo")) == null ? null : tmp_6_0.touched) || ctx_r2.errorMessages["correo"]);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.usuario);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_8_0 = ctx_r2.editForm.get("celular")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r2.editForm.get("celular")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r2.editForm.get("celular")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r2.editForm.get("celular")) == null ? null : tmp_9_0.touched) || ctx_r2.errorMessages["celular"]);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("error", ((tmp_10_0 = ctx_r2.editForm.get("direccion")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx_r2.editForm.get("direccion")) == null ? null : tmp_10_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_11_0 = ctx_r2.editForm.get("direccion")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx_r2.editForm.get("direccion")) == null ? null : tmp_11_0.touched) || ctx_r2.errorMessages["direccion"]);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.tipoDocumento);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.numDocumento);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isUpdating);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.editForm.invalid || ctx_r2.isUpdating);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isUpdating);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isUpdating);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isUpdating ? "Guardando..." : "Guardar Cambios", " ");
  }
}
function UserProfileComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 54)(2, "label");
    \u0275\u0275text(3, "Nombres");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 68);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 54)(7, "label");
    \u0275\u0275text(8, "Apellidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 68);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 54)(12, "label");
    \u0275\u0275text(13, "Correo Electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 69);
    \u0275\u0275element(15, "i", 70);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 54)(18, "label");
    \u0275\u0275text(19, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 68);
    \u0275\u0275element(21, "i", 71);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 54)(24, "label");
    \u0275\u0275text(25, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 68);
    \u0275\u0275element(27, "i", 72);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 54)(30, "label");
    \u0275\u0275text(31, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 68);
    \u0275\u0275element(33, "i", 73);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 54)(36, "label");
    \u0275\u0275text(37, "Tipo de Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 68);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 54)(41, "label");
    \u0275\u0275text(42, "N\xFAmero de Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 68);
    \u0275\u0275element(44, "i", 74);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r2.currentUser == null ? null : ctx_r2.currentUser.nombre) || "No especificado");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r2.currentUser == null ? null : ctx_r2.currentUser.apellidos) || "No especificado");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.correo, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.currentUser == null ? null : ctx_r2.currentUser.usuario, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (ctx_r2.currentUser == null ? null : ctx_r2.currentUser.celular) || "No especificado", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (ctx_r2.currentUser == null ? null : ctx_r2.currentUser.direccion) || "No especificada", " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((ctx_r2.currentUser == null ? null : ctx_r2.currentUser.tipoDocumento) || "No especificado");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (ctx_r2.currentUser == null ? null : ctx_r2.currentUser.numDocumento) || "No especificado", " ");
  }
}
var UserProfileComponent = class _UserProfileComponent {
  constructor(authService, router, fb, http) {
    this.authService = authService;
    this.router = router;
    this.fb = fb;
    this.http = http;
    this.currentUser = null;
    this.isEditMode = false;
    this.isUpdating = false;
    this.updateAttempts = 0;
    this.lastUpdateAttempt = 0;
    this.errorMessages = {};
    this.successMessage = "";
    this.isUploadingPhoto = false;
    this.selectedPhotoFile = null;
    this.editForm = this.fb.group({
      correo: ["", [Validators.email]],
      celular: ["", [Validators.pattern("^9[0-9]{8}$")]],
      direccion: ["", [Validators.maxLength(200)]]
    });
  }
  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      if (user && this.editForm) {
        this.editForm.patchValue({
          correo: user.correo,
          celular: user.celular || "",
          direccion: user.direccion || ""
        });
      }
    });
    setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) {
      }
    }, 5e3);
  }
  toggleEditMode() {
    if (this.updateAttempts >= 2) {
      this.setError("general", "L\xEDmite de ediciones alcanzado. Solo se permiten 2 actualizaciones.");
      return;
    }
    this.isEditMode = !this.isEditMode;
    this.clearMessages();
    if (this.isEditMode && this.currentUser) {
      this.editForm.patchValue({
        correo: this.currentUser.correo,
        celular: this.currentUser.celular || "",
        direccion: this.currentUser.direccion || ""
      });
      this.editForm.markAsUntouched();
    }
  }
  cancelEdit() {
    this.isEditMode = false;
    this.clearMessages();
    if (this.currentUser) {
      this.editForm.patchValue({
        correo: this.currentUser.correo,
        celular: this.currentUser.celular || "",
        direccion: this.currentUser.direccion || ""
      });
      this.editForm.markAsUntouched();
    }
  }
  saveProfile() {
    return __async(this, null, function* () {
      try {
        const storedUser = localStorage.getItem("current_user");
        const storedToken = localStorage.getItem("auth_token");
        if (this.editForm.invalid || this.isUpdating) {
          this.editForm.markAllAsTouched();
          return;
        }
      } catch (error) {
        return;
      }
      const now = Date.now();
      const timeSinceLastAttempt = now - this.lastUpdateAttempt;
      if (timeSinceLastAttempt < 3e3) {
        this.setError("general", `Por favor espere ${Math.ceil((3e3 - timeSinceLastAttempt) / 1e3)} segundos antes de intentar nuevamente`);
        return;
      }
      if (this.updateAttempts >= 2) {
        if (now - this.lastUpdateAttempt < 3e4) {
          this.setError("general", "Has alcanzado el l\xEDmite de intentos. Por favor espera 30 segundos");
          return;
        } else {
          this.updateAttempts = 0;
        }
      }
      this.updateAttempts++;
      this.lastUpdateAttempt = now;
      this.isUpdating = true;
      this.clearMessages();
      try {
        let token = localStorage.getItem("auth_token");
        if (!token) {
          token = localStorage.getItem("token");
        }
        if (!token) {
          this.setError("general", "No se encontr\xF3 el token de autenticaci\xF3n. Revise la consola para m\xE1s detalles.");
          return;
        }
        if (!this.currentUser || !this.currentUser.id) {
          this.setError("general", "No se pudo obtener la informaci\xF3n del usuario");
          return;
        }
        const updateData = {};
        const correo = this.editForm.value.correo?.trim();
        const celular = this.editForm.value.celular?.trim();
        const direccion = this.editForm.value.direccion?.trim();
        if (correo && correo !== this.currentUser?.correo) {
          updateData.correo = correo.toLowerCase();
        } else if (direccion && direccion !== this.currentUser?.direccion) {
          updateData.direccion = direccion;
        } else if (celular && celular !== this.currentUser?.celular) {
          const testCelular = celular;
          updateData.celular = testCelular;
        }
        if (Object.keys(updateData).length === 0) {
          this.setError("general", "No hay cambios para guardar");
          this.isUpdating = false;
          return;
        }
        const apiUrl = `${environment.apiUrl}/api/usuarios/${this.currentUser.id}`;
        try {
          yield this.http.get(apiUrl, {
            headers: { "Authorization": `Bearer ${token}` }
          }).toPromise();
        } catch (getError) {
          if (getError.status === 401 || getError.status === 403) {
            this.setError("general", "Token de autenticaci\xF3n no v\xE1lido");
            return;
          }
        }
        const response = yield this.http.put(apiUrl, updateData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).toPromise();
        if (response) {
          this.successMessage = "Perfil actualizado correctamente";
          this.currentUser = response;
          localStorage.setItem("current_user", JSON.stringify(this.currentUser));
          this.authService.currentUserSubject?.next(this.currentUser);
          this.editForm.patchValue({
            correo: this.currentUser.correo || "",
            celular: this.currentUser.celular || "",
            direccion: this.currentUser.direccion || ""
          });
          this.isEditMode = false;
          this.updateAttempts++;
          setTimeout(() => {
            this.successMessage = "";
          }, 3e3);
        }
      } catch (error) {
        this.handleUpdateError(error);
      } finally {
        this.isUpdating = false;
      }
    });
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (!file)
      return;
    if (!file.type.startsWith("image/")) {
      this.setError("general", "Por favor seleccione un archivo de imagen v\xE1lido");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.setError("general", "El archivo no puede ser mayor a 5MB");
      return;
    }
    this.selectedPhotoFile = file;
    this.uploadPhoto();
  }
  uploadPhoto() {
    return __async(this, null, function* () {
      if (!this.selectedPhotoFile || !this.currentUser)
        return;
      if (this.updateAttempts >= 2) {
        this.setError("general", "L\xEDmite de ediciones alcanzado. Solo se permiten 2 actualizaciones.");
        return;
      }
      try {
        this.isUploadingPhoto = true;
        this.clearMessages();
        const base64Photo = yield this.convertFileToBase64(this.selectedPhotoFile);
        let token = localStorage.getItem("auth_token");
        if (!token) {
          this.setError("general", "No se encontr\xF3 el token de autenticaci\xF3n");
          return;
        }
        const updateData = {
          foto: base64Photo
        };
        const response = yield this.http.put(`${environment.apiUrl}/api/usuarios/${this.currentUser.id}`, updateData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).toPromise();
        if (response) {
          this.successMessage = "Foto actualizada correctamente";
          this.currentUser = response;
          localStorage.setItem("current_user", JSON.stringify(this.currentUser));
          this.authService.currentUserSubject?.next(this.currentUser);
          this.updateAttempts++;
          this.selectedPhotoFile = null;
          setTimeout(() => {
            this.successMessage = "";
          }, 3e3);
        }
      } catch (error) {
        this.setError("general", "Error al actualizar la foto: " + (error.error?.message || error.message));
      } finally {
        this.isUploadingPhoto = false;
      }
    });
  }
  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64 = result.split(",")[1];
        resolve(`data:${file.type};base64,${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  handleUpdateError(error) {
    if (error.status === 400) {
      const backendMessage = error.error?.message || error.error?.error || "Datos inv\xE1lidos";
      this.setError("general", `Error del servidor: ${backendMessage}`);
    } else if (error.status === 401) {
      this.setError("general", "No autorizado. Verifique sus permisos");
    } else if (error.status === 409) {
      this.setError("correo", "Este correo electr\xF3nico ya est\xE1 registrado");
    } else if (error.status === 422) {
      const errors = error.error.errors;
      if (errors) {
        Object.keys(errors).forEach((field) => {
          this.setError(field, errors[field]);
        });
      } else {
        this.setError("general", "Error de validaci\xF3n. Por favor verifique los datos");
      }
    } else if (error.status === 429) {
      this.setError("general", "Demasiadas solicitudes. Por favor espere un momento");
    } else if (error.status === 500) {
      this.setError("general", "Error del servidor. Por favor intente m\xE1s tarde");
    } else {
      this.setError("general", "Error de conexi\xF3n. Por favor verifique su internet");
    }
  }
  getErrorMessage(field) {
    if (this.errorMessages[field]) {
      return this.errorMessages[field];
    }
    const control = this.editForm.get(field);
    if (!control || !control.errors || !control.touched)
      return "";
    const errors = control.errors;
    if (field === "correo") {
      if (errors["email"])
        return "Ingrese un correo electr\xF3nico v\xE1lido";
    }
    if (field === "celular") {
      if (errors["pattern"])
        return "El tel\xE9fono debe iniciar con 9 y tener 9 d\xEDgitos";
    }
    if (field === "direccion") {
      if (errors["maxlength"])
        return "La direcci\xF3n es demasiado larga (m\xE1ximo 200 caracteres)";
    }
    return "";
  }
  setError(field, message) {
    this.errorMessages[field] = message;
  }
  clearMessages() {
    this.errorMessages = {};
    this.successMessage = "";
  }
  getJoinDate() {
    return "Enero 2024";
  }
  getRoleDescription() {
    const descriptions = {
      "ADMIN": "Administrador del Sistema",
      "ADMINISTRATIVO": "Personal Administrativo",
      "USUARIO": "Usuario Est\xE1ndar",
      "ALUMNO": "Estudiante",
      "EXTERNO": "Usuario Externo"
    };
    return descriptions[this.currentUser?.role?.name || ""] || "Usuario del Sistema";
  }
  getCurrentTime() {
    return (/* @__PURE__ */ new Date()).toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  getBackRoute() {
    const roleName = this.currentUser?.role?.name?.toUpperCase();
    switch (roleName) {
      case "USUARIO":
        return "/usuario/tablero";
      case "ADMINISTRATIVO":
        return "/administrativo/tablero";
      case "ADMIN":
        return "/admin/tablero";
      case "ESTUDIANTE":
        return "/estudiante/tablero";
      default:
        return "/";
    }
  }
  changePassword() {
    this.router.navigate(["/change-password"]);
  }
  logout() {
    this.authService.logout();
  }
  goBack() {
    this.router.navigate([this.getBackRoute()]);
  }
  static {
    this.\u0275fac = function UserProfileComponent_Factory(t) {
      return new (t || _UserProfileComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HttpClient));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserProfileComponent, selectors: [["app-user-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 74, vars: 34, consts: [["fileInput", ""], [1, "profile-container"], [1, "profile-header"], ["title", "Volver", 1, "back-btn", 3, "click"], [1, "fas", "fa-arrow-left"], [1, "profile-info"], [1, "avatar-section"], [1, "avatar-container"], ["onerror", "this.src='/assets/default-avatar.png'", 1, "profile-avatar", 3, "src", "alt"], ["class", "upload-overlay", 4, "ngIf"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "avatar-edit-btn", 3, "click", "title", "disabled"], [1, "fas"], [1, "online-indicator"], [1, "user-details"], [1, "user-name"], [1, "user-role"], [1, "user-email"], [1, "profile-stats"], [1, "stat-item"], [1, "fas", "fa-calendar"], ["class", "stat-item", 4, "ngIf"], [1, "profile-content"], [1, "profile-grid"], [1, "profile-card", "user-info-full"], [1, "card-header"], [1, "fas", "fa-user"], [1, "edit-btn", 3, "click", "title", "disabled"], [1, "card-content"], ["class", "alert alert-success", 4, "ngIf"], ["class", "alert alert-error", 4, "ngIf"], ["class", "edit-form", 3, "formGroup", 4, "ngIf"], ["class", "info-grid-full", 4, "ngIf"], [1, "profile-card", "activity-info"], [1, "fas", "fa-chart-line"], [1, "activity-list"], [1, "activity-item"], [1, "activity-icon", "login"], [1, "fas", "fa-sign-in-alt"], [1, "activity-details"], [1, "activity-title"], [1, "activity-time"], [1, "activity-icon", "profile"], [1, "fas", "fa-user-edit"], [1, "activity-icon", "security"], [1, "fas", "fa-shield-alt"], [1, "upload-overlay"], [1, "fas", "fa-spinner", "fa-spin"], [1, "alert", "alert-success"], [1, "fas", "fa-check-circle"], [1, "alert", "alert-error"], [1, "fas", "fa-exclamation-circle"], [1, "edit-form", 3, "formGroup"], [1, "info-grid-full"], [1, "info-item"], ["type", "text", "disabled", "", 1, "form-control", "readonly", 3, "value"], ["type", "email", "formControlName", "correo", "placeholder", "Ingrese correo electr\xF3nico", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["type", "tel", "formControlName", "celular", "placeholder", "Ingrese n\xFAmero de tel\xE9fono", "maxlength", "9", 1, "form-control"], ["type", "text", "formControlName", "direccion", "placeholder", "Ingrese direcci\xF3n", 1, "form-control"], [1, "form-actions"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], [1, "fas", "fa-times"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], ["class", "fas fa-save", 4, "ngIf"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "error-message"], [1, "fas", "fa-save"], [1, "value"], [1, "value", "email"], [1, "fas", "fa-envelope"], [1, "fas", "fa-at"], [1, "fas", "fa-phone"], [1, "fas", "fa-map-marker-alt"], [1, "fas", "fa-id-card"]], template: function UserProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
        \u0275\u0275listener("click", function UserProfileComponent_Template_button_click_2_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.goBack());
        });
        \u0275\u0275element(3, "i", 4);
        \u0275\u0275elementStart(4, "span");
        \u0275\u0275text(5, "Volver");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "div", 7);
        \u0275\u0275element(9, "img", 8);
        \u0275\u0275template(10, UserProfileComponent_div_10_Template, 4, 0, "div", 9);
        \u0275\u0275elementStart(11, "input", 10, 0);
        \u0275\u0275listener("change", function UserProfileComponent_Template_input_change_11_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFileSelected($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 11);
        \u0275\u0275listener("click", function UserProfileComponent_Template_button_click_13_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r2 = \u0275\u0275reference(12);
          return \u0275\u0275resetView(fileInput_r2.click());
        });
        \u0275\u0275element(14, "i", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(15, "div", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 14)(17, "h1", 15);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "p", 16);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "p", 17);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 18)(24, "div", 19);
        \u0275\u0275element(25, "i", 20);
        \u0275\u0275elementStart(26, "span");
        \u0275\u0275text(27);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(28, UserProfileComponent_div_28_Template, 4, 1, "div", 21);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(29, "div", 22)(30, "div", 23)(31, "div", 24)(32, "div", 25)(33, "h2");
        \u0275\u0275element(34, "i", 26);
        \u0275\u0275text(35, " Informaci\xF3n del Usuario ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "button", 27);
        \u0275\u0275listener("click", function UserProfileComponent_Template_button_click_36_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleEditMode());
        });
        \u0275\u0275element(37, "i", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "div", 28);
        \u0275\u0275template(39, UserProfileComponent_div_39_Template, 3, 1, "div", 29)(40, UserProfileComponent_div_40_Template, 3, 1, "div", 30)(41, UserProfileComponent_form_41_Template, 45, 20, "form", 31)(42, UserProfileComponent_div_42_Template, 46, 8, "div", 32);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "div", 33)(44, "div", 25)(45, "h2");
        \u0275\u0275element(46, "i", 34);
        \u0275\u0275text(47, " Actividad Reciente ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "div", 28)(49, "div", 35)(50, "div", 36)(51, "div", 37);
        \u0275\u0275element(52, "i", 38);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "div", 39)(54, "span", 40);
        \u0275\u0275text(55, "\xDAltimo inicio de sesi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "span", 41);
        \u0275\u0275text(57);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(58, "div", 36)(59, "div", 42);
        \u0275\u0275element(60, "i", 43);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "div", 39)(62, "span", 40);
        \u0275\u0275text(63, "Perfil visualizado");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "span", 41);
        \u0275\u0275text(65, "Hace unos segundos");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(66, "div", 36)(67, "div", 44);
        \u0275\u0275element(68, "i", 45);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "div", 39)(70, "span", 40);
        \u0275\u0275text(71, "Sesi\xF3n activa");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "span", 41);
        \u0275\u0275text(73, "Estado: Segura");
        \u0275\u0275elementEnd()()()()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275classProp("uploading", ctx.isUploadingPhoto);
        \u0275\u0275advance();
        \u0275\u0275property("src", (ctx.currentUser == null ? null : ctx.currentUser.foto) || "/assets/default-avatar.png", \u0275\u0275sanitizeUrl)("alt", ctx.currentUser == null ? null : ctx.currentUser.nombre);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isUploadingPhoto);
        \u0275\u0275advance(3);
        \u0275\u0275property("title", ctx.updateAttempts >= 2 ? "L\xEDmite de actualizaciones alcanzado" : "Cambiar foto")("disabled", ctx.updateAttempts >= 2 || ctx.isUploadingPhoto);
        \u0275\u0275advance();
        \u0275\u0275classProp("fa-camera", !ctx.isUploadingPhoto)("fa-spinner", ctx.isUploadingPhoto)("fa-spin", ctx.isUploadingPhoto);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate2("", ctx.currentUser == null ? null : ctx.currentUser.nombre, " ", ctx.currentUser == null ? null : ctx.currentUser.apellidos, "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.currentUser == null ? null : ctx.currentUser.role == null ? null : ctx.currentUser.role.name);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.currentUser == null ? null : ctx.currentUser.correo);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("Miembro desde ", ctx.getJoinDate(), "");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentUser == null ? null : ctx.currentUser.role == null ? null : ctx.currentUser.role.name);
        \u0275\u0275advance(8);
        \u0275\u0275classProp("disabled", ctx.updateAttempts >= 2);
        \u0275\u0275property("title", ctx.updateAttempts >= 2 ? "L\xEDmite de ediciones alcanzado" : "Editar informaci\xF3n")("disabled", ctx.updateAttempts >= 2);
        \u0275\u0275advance();
        \u0275\u0275classProp("fa-edit", !ctx.isEditMode)("fa-times", ctx.isEditMode)("fa-lock", ctx.updateAttempts >= 2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.successMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessages["general"]);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isEditMode);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isEditMode);
        \u0275\u0275advance(15);
        \u0275\u0275textInterpolate1("Hoy, ", ctx.getCurrentTime(), "");
      }
    }, dependencies: [CommonModule, NgIf, RouterModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.profile-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  min-height: 100vh;\n  background: #f8fafc;\n}\n.profile-header[_ngcontent-%COMP%] {\n  position: relative;\n  background: white;\n  padding: 24px 32px 32px;\n  margin-bottom: 24px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #64748B;\n  padding: 8px 0;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n  font-weight: 500;\n  transition: all 0.2s ease;\n  margin-bottom: 24px;\n}\n.back-btn[_ngcontent-%COMP%]:hover {\n  color: #1E293B;\n  gap: 12px;\n}\n.back-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.profile-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 24px;\n}\n.avatar-section[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n.avatar-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  border: 4px solid #F1F5F9;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  background: white;\n}\n.profile-avatar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.avatar-edit-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 5px;\n  right: 5px;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: #4F46E5;\n  border: 3px solid white;\n  color: white;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  font-size: 14px;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);\n}\n.avatar-edit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338CA;\n  transform: scale(1.05);\n}\n.avatar-edit-btn[_ngcontent-%COMP%]:disabled {\n  background: #a0aec0;\n  cursor: not-allowed;\n  opacity: 0.6;\n  transform: none;\n}\n.upload-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  border-radius: 50%;\n  font-size: 14px;\n}\n.upload-overlay[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-bottom: 5px;\n}\n.upload-overlay[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.avatar-container.uploading[_ngcontent-%COMP%]   .profile-avatar[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.online-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 18px;\n  height: 18px;\n  background: #10B981;\n  border-radius: 50%;\n  border: 3px solid white;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.user-details[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-top: 8px;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1E293B;\n  margin: 0 0 6px 0;\n  line-height: 1.3;\n}\n.user-role[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 13px;\n  color: #6366F1;\n  font-weight: 600;\n  margin: 0 0 8px 0;\n  padding: 4px 12px;\n  background: #EEF2FF;\n  border-radius: 6px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.user-email[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #64748B;\n  margin: 0 0 16px 0;\n}\n.profile-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n.stat-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #64748B;\n  font-size: 14px;\n}\n.stat-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #94A3B8;\n  width: 16px;\n}\n.profile-content[_ngcontent-%COMP%] {\n  padding: 0 20px;\n}\n.profile-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 25px;\n  margin-bottom: 30px;\n}\n.user-info-full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.profile-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.profile-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 25px 25px 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  color: #1a202c;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #6366F1;\n  font-size: 18px;\n}\n.edit-btn[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #718096;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.edit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #6366F1;\n  border-color: #6366F1;\n  color: white;\n  transform: scale(1.1);\n}\n.edit-btn[_ngcontent-%COMP%]:disabled, .edit-btn.disabled[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  border-color: #cbd5e0;\n  color: #a0aec0;\n  cursor: not-allowed;\n  opacity: 0.6;\n  transform: none;\n}\n.edit-btn[_ngcontent-%COMP%]:disabled   .fa-lock[_ngcontent-%COMP%] {\n  color: #e53e3e;\n}\n.card-content[_ngcontent-%COMP%] {\n  padding: 25px;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 20px;\n}\n.info-grid-full[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 20px;\n}\n.info-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #64748B;\n  text-transform: none;\n  letter-spacing: 0px;\n  margin-bottom: 2px;\n}\n.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #1E293B;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 14px;\n  background: #F8FAFC;\n  border-radius: 8px;\n  border: 1px solid #E2E8F0;\n  transition: all 0.2s ease;\n}\n.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]:hover {\n  background: #F1F5F9;\n  border-color: #CBD5E0;\n}\n.info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #64748B;\n  width: 16px;\n  font-size: 14px;\n}\n.info-item[_ngcontent-%COMP%]   .value.email[_ngcontent-%COMP%] {\n  color: #6366F1;\n}\n.security-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-align: left;\n  font-family: inherit;\n}\n.action-btn.primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4F46E5 0%,\n      #7C3AED 100%);\n  color: white;\n}\n.action-btn.primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);\n}\n.action-btn.danger[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fc8181 0%,\n      #f56565 100%);\n  color: white;\n}\n.action-btn.danger[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(245, 101, 101, 0.3);\n}\n.action-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n}\n.btn-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.btn-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n}\n.btn-desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  opacity: 0.9;\n}\n.activity-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  background: #f7fafc;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n}\n.activity-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 18px;\n}\n.activity-icon.login[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10B981 0%,\n      #059669 100%);\n}\n.activity-icon.profile[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366F1 0%,\n      #8B5CF6 100%);\n}\n.activity-icon.security[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #F59E0B 0%,\n      #D97706 100%);\n}\n.activity-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.activity-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  color: #2d3748;\n}\n.activity-time[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #718096;\n}\n.profile-actions[_ngcontent-%COMP%] {\n  padding: 0 20px 30px;\n  display: flex;\n  justify-content: center;\n}\n@media (max-width: 768px) {\n  .profile-container[_ngcontent-%COMP%] {\n    margin: 0;\n    background: white;\n  }\n  .profile-header[_ngcontent-%COMP%] {\n    padding: 20px 20px 24px;\n    margin-bottom: 16px;\n  }\n  .back-btn[_ngcontent-%COMP%] {\n    font-size: 14px;\n    margin-bottom: 20px;\n  }\n  .profile-info[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    gap: 16px;\n  }\n  .avatar-container[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n    border: 3px solid #F1F5F9;\n  }\n  .avatar-edit-btn[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    font-size: 13px;\n    bottom: 3px;\n    right: 3px;\n  }\n  .online-indicator[_ngcontent-%COMP%] {\n    width: 16px;\n    height: 16px;\n    border: 2.5px solid white;\n    top: 6px;\n    right: 6px;\n  }\n  .user-details[_ngcontent-%COMP%] {\n    padding-top: 0;\n  }\n  .user-name[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .user-role[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 3px 10px;\n  }\n  .user-email[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .profile-stats[_ngcontent-%COMP%] {\n    justify-content: center;\n    gap: 16px;\n  }\n  .stat-item[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .profile-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .profile-content[_ngcontent-%COMP%] {\n    padding: 0 16px;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 20px 20px 0;\n  }\n  .card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .card-content[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n  .info-grid-full[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 14px;\n    padding: 10px 12px;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    font-size: 14px;\n    padding: 10px 12px;\n  }\n  .profile-actions[_ngcontent-%COMP%] {\n    padding: 0 16px 20px;\n  }\n  .activity-item[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .activity-icon[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 16px;\n  }\n  .activity-title[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .activity-time[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .profile-header[_ngcontent-%COMP%] {\n    padding: 16px 16px 20px;\n  }\n  .back-btn[_ngcontent-%COMP%] {\n    font-size: 13px;\n    margin-bottom: 16px;\n  }\n  .back-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .avatar-container[_ngcontent-%COMP%] {\n    width: 90px;\n    height: 90px;\n  }\n  .avatar-edit-btn[_ngcontent-%COMP%] {\n    width: 28px;\n    height: 28px;\n    font-size: 12px;\n    bottom: 2px;\n    right: 2px;\n  }\n  .online-indicator[_ngcontent-%COMP%] {\n    width: 14px;\n    height: 14px;\n    border: 2px solid white;\n    top: 5px;\n    right: 5px;\n  }\n  .user-name[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n  .user-role[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 3px 8px;\n  }\n  .user-email[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .profile-stats[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .stat-item[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .profile-content[_ngcontent-%COMP%] {\n    padding: 0 12px;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 16px 16px 0;\n  }\n  .card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 16px;\n    gap: 8px;\n  }\n  .card-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .info-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 13px;\n    padding: 9px 10px;\n  }\n  .form-control[_ngcontent-%COMP%] {\n    font-size: 13px;\n    padding: 9px 10px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .btn-title[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .btn-desc[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .activity-item[_ngcontent-%COMP%] {\n    padding: 10px;\n    gap: 12px;\n  }\n  .activity-icon[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n    font-size: 14px;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 10px 20px;\n    font-size: 14px;\n  }\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 11px 14px;\n  border: 1.5px solid #E2E8F0;\n  border-radius: 8px;\n  font-size: 15px;\n  color: #1E293B;\n  background: white;\n  transition: all 0.2s ease;\n  font-family: inherit;\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366F1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  background: #FAFBFC;\n}\n.form-control.readonly[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n.form-control.error[_ngcontent-%COMP%] {\n  border-color: #e53e3e;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #e53e3e;\n  font-size: 12px;\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 14px;\n  font-weight: 500;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  color: #166534;\n  border: 1px solid #86efac;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #991b1b;\n  border: 1px solid #fca5a5;\n}\n.edit-form[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.form-actions[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  gap: 12px;\n  justify-content: flex-end;\n  margin-top: 20px;\n  padding-top: 20px;\n  border-top: 1px solid #e2e8f0;\n}\n.btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 24px;\n  border-radius: 10px;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: none;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4F46E5 0%,\n      #7C3AED 100%);\n  color: white;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #f7fafc;\n  border: 2px solid #e2e8f0;\n  color: #718096;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #edf2f7;\n  border-color: #cbd5e0;\n}\n@media (max-width: 768px) {\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=user-profile.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserProfileComponent, { className: "UserProfileComponent" });
})();
export {
  UserProfileComponent
};
//# sourceMappingURL=chunk-357JP5VV.js.map
