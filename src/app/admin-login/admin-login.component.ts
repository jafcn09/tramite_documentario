import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { ToastComponent } from '../shared/components/toast/toast.component';

@Component({
    selector: 'app-admin-login',
    imports: [CommonModule, ReactiveFormsModule, ToastComponent],
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  loginError = '';
  errorType: 'credentials' | 'not_found' | 'disabled' | 'blocked' | 'network' | 'server' | 'general' = 'general';
  loginSuccess = false;
  mustChangePassword = false;
  currentYear = new Date().getFullYear();
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
      return;
    }

    const savedCredentials = this.getSavedCredentials();
    if (savedCredentials) {
      this.loginForm.patchValue({
        usuario: savedCredentials.usuario,
        rememberMe: true
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';
      this.mustChangePassword = false;

      const { usuario, password, rememberMe } = this.loginForm.value;

      this.authService.login({ usuario, password }).subscribe({
        next: (response) => {
          if (rememberMe) {
            this.saveCredentials(usuario);
          } else {
            this.clearSavedCredentials();
          }

          this.isLoading = false;


          const loginData = response?.data || response;

      
          const changePasswordRequired = loginData?.changePasswordRequired === true;
          const usuario_response = loginData?.usuario;
          const mustChangePassword = usuario_response?.mustChangePassword === true;

          if (changePasswordRequired || mustChangePassword) {
            console.log('Usuario requiere cambiar contraseña. Redirigiendo a /cambiar-contrasena');
            this.mustChangePassword = true;
           
            this.router.navigate(['/cambiar-contrasena'], {
              queryParams: {
                reason: 'first-login',
                userId: usuario_response?.id
              }
            });
            return;
          }


          const redirectUrl = loginData?.redirectUrl;

     
          if (redirectUrl && redirectUrl !== '/cambiar-contrasena') {
          
            this.router.navigate([redirectUrl]);
          } else {
         
            console.warn('No redirectUrl in response, using role-based fallback');
            const roleRoutes: { [key: string]: string } = {
              'admin': '/admin/tablero',
              'administrativo': '/administrativo/tablero',
              'usuario': '/usuario/tablero',
              'estudiante': '/estudiante/tablero',
              'grados': '/grados-admin/tablero',
              'director': '/grados-admin/tablero'
            };
            const userRole = usuario_response?.role?.name?.toLowerCase() || '';
            const route = roleRoutes[userRole] || '/';
            this.router.navigate([route]);
          }
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 0 || (error.name === 'HttpErrorResponse' && !navigator.onLine)) {
            this.errorType = 'network';
            this.loginError = 'No hay conexión a internet. Verifica tu conexión e intenta nuevamente.';
            this.toastService.warning('Sin conexión', this.loginError);
            this.cdr.detectChanges();
            return;
          }

          if (error.status === 428) {
            this.mustChangePassword = true;
            this.errorType = 'general';
            this.loginError = 'Debes cambiar tu contraseña temporal';
            this.toastService.warning('Cambio requerido', this.loginError);
          } else if (error.status === 401) {
            // Credenciales incorrectas
            this.errorType = 'credentials';
            this.loginError = error.error?.message || 'Usuario o contraseña incorrectos';
            this.toastService.error('Credenciales incorrectas', this.loginError);
          } else if (error.status === 404) {
            // Usuario no encontrado
            this.errorType = 'not_found';
            this.loginError = error.error?.message || 'El usuario no existe en el sistema';
            this.toastService.error('Usuario no encontrado', this.loginError);
          } else if (error.status === 403) {
            // Cuenta deshabilitada o bloqueada
            const message = error.error?.message?.toLowerCase() || '';
            if (message.includes('bloqueado') || message.includes('bloqueada')) {
              this.errorType = 'blocked';
              this.loginError = error.error?.message || 'Tu cuenta ha sido bloqueada temporalmente por múltiples intentos fallidos';
              this.toastService.error('Cuenta bloqueada', this.loginError);
            } else if (message.includes('deshabilitad') || message.includes('inactiv')) {
              this.errorType = 'disabled';
              this.loginError = error.error?.message || 'Tu cuenta se encuentra deshabilitada. Contacta al administrador';
              this.toastService.warning('Cuenta deshabilitada', this.loginError);
            } else {
              this.errorType = 'credentials';
              this.loginError = error.error?.message || 'Credenciales inválidas o cuenta bloqueada';
              this.toastService.error('Error de acceso', this.loginError);
            }
          } else if (error.status >= 500) {
            // Error del servidor
            this.errorType = 'server';
            this.loginError = 'Error en el servidor. Por favor, intenta más tarde.';
            this.toastService.error('Error del servidor', this.loginError);
          } else {
            this.errorType = 'general';
            this.loginError = error.error?.message || 'Error al iniciar sesión. Intente nuevamente.';
            this.toastService.error('Error de acceso', this.loginError);
          }

          this.cdr.detectChanges();
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private saveCredentials(usuario: string): void {
    try {
      localStorage.setItem('adminCredentials', JSON.stringify({ usuario }));
    } catch (e) {

    }
  }

  private getSavedCredentials(): any {
    try {
      const saved = localStorage.getItem('adminCredentials');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  private clearSavedCredentials(): void {
    try {
      localStorage.removeItem('adminCredentials');
    } catch (e) {
      // localStorage no disponible
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) {
        return `${this.getFieldLabel(fieldName)} es obligatorio`;
      }
      if (field.errors?.['minlength']) {
        const requiredLength = field.errors?.['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'usuario': 'El nombre de usuario',
      'password': 'La contraseña'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}