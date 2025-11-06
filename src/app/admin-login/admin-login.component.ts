import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html'
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
  private isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Get return URL
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // If already authenticated, redirect
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
      return;
    }

    // Check if user credentials are saved in localStorage (only in browser)
    if (this.isBrowser) {
      const savedCredentials = this.getSavedCredentials();
      if (savedCredentials) {
        this.loginForm.patchValue({
          usuario: savedCredentials.usuario,
          rememberMe: true
        });
      }
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
          this.isLoading = false;
          this.loginSuccess = true;
          
          if (rememberMe) {
            this.saveCredentials(usuario);
          } else {
            this.clearSavedCredentials();
          }
          

          let redirectRoute = '/';

          if (response.redirectUrl) {

            redirectRoute = response.redirectUrl;
          } else {

            const currentUser = this.authService.currentUserValue;
            if (currentUser && currentUser.role) {
              const roleRoutes: { [key: string]: string } = {
                'admin': '/admin/tablero',
                'administrativo': '/administrativo/tablero',
                'usuario': '/usuario/tablero',
                'estudiante': '/estudiante/tablero'
              };

              redirectRoute = roleRoutes[currentUser.role.name.toLowerCase()] || '/';

            }
          }

          setTimeout(() => {
            try {
              this.router.navigateByUrl(redirectRoute);
            } catch (err) {
              console.error('Navigation error:', err);

              window.location.href = redirectRoute;
            }
          }, 100);
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
    if (this.isBrowser) {
      localStorage.setItem('adminCredentials', JSON.stringify({ usuario }));
    }
  }

  private getSavedCredentials(): any {
    if (this.isBrowser) {
      const saved = localStorage.getItem('adminCredentials');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  }

  private clearSavedCredentials(): void {
    if (this.isBrowser) {
      localStorage.removeItem('adminCredentials');
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