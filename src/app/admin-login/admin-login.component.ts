import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  loginError = '';
  loginSuccess = false;
  mustChangePassword = false;
  currentYear = new Date().getFullYear();
  returnUrl: string = '/';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
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

          let redirectRoute = '/';

          // Usar el usuario de la respuesta en lugar de currentUserValue para evitar race condition
          if (response.redirectUrl) {
            redirectRoute = response.redirectUrl;
          } else if (response.usuario && response.usuario.role) {
            const roleRoutes: { [key: string]: string } = {
              'admin': '/admin/tablero',
              'administrativo': '/administrativo/tablero',
              'usuario': '/usuario/tablero',
              'estudiante': '/estudiante/tablero'
            };
            redirectRoute = roleRoutes[response.usuario.role.name.toLowerCase()] || '/';
          }

          this.isLoading = false;
          this.router.navigate([redirectRoute]);
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 428) {
            this.mustChangePassword = true;
            this.loginError = 'Debes cambiar tu contraseña temporal';
          } else if (error.status === 403) {
            this.loginError = error.error?.message || 'Credenciales inválidas o cuenta bloqueada';
          } else {
            this.loginError = 'Error al iniciar sesión. Intente nuevamente.';
          }
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
      // localStorage no disponible
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