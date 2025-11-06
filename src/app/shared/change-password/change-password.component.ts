import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  showNewPassword = false;
  showConfirmPassword = false;
  changeAttempts = 0;
  lastChangeAttempt = 0;
  canSubmit = true;
  errorMessages: { [key: string]: string } = {};
  showSuccessModalFlag = false;

  passwordRequirements = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [this.passwordMatchValidator]
    });
  }

  ngOnInit() {
    this.changePasswordForm.get('newPassword')?.valueChanges.subscribe(password => {
      this.updatePasswordRequirements(password);
    });

    this.changePasswordForm.valueChanges.subscribe(() => {
      this.clearMessages();
    });
  }

  private passwordStrengthValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecial;

    return valid ? null : { passwordWeak: true };
  }



  private passwordMatchValidator(group: AbstractControl): { [key: string]: any } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!newPassword || !confirmPassword) return null;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  updatePasswordRequirements(password: string) {
    this.passwordRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  }

  togglePasswordVisibility(field: 'new' | 'confirm') {
    switch (field) {
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.changePasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit() {
    if (this.changePasswordForm.invalid || this.loading) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const now = Date.now();
    const timeSinceLastAttempt = now - this.lastChangeAttempt;

    if (timeSinceLastAttempt < 3000) {
      this.setError('general', `Espere ${Math.ceil((3000 - timeSinceLastAttempt) / 1000)} segundos antes de intentar nuevamente`);
      return;
    }

    if (this.changeAttempts >= 2) {
      if (now - this.lastChangeAttempt < 30000) {
        this.setError('general', 'Límite de intentos alcanzado. Espere 30 segundos');
        this.canSubmit = false;
        setTimeout(() => {
          this.canSubmit = true;
          this.changeAttempts = 0;
        }, 30000);
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
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.setError('general', 'Sesión expirada. Por favor inicie sesión nuevamente');
        this.authService.logout();
        return;
      }

      const user = this.authService.currentUserValue;
      if (!user || !user.id) {
        this.setError('general', 'No se pudo obtener la información del usuario');
        return;
      }

      const url = `${environment.apiUrl}/api/usuarios/${user.id}/change-password`;

      const response = await this.http.put<any>(
        url,
        {
          newPassword: this.changePasswordForm.value.newPassword,
          confirmPassword: this.changePasswordForm.value.confirmPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      ).toPromise();

      if (response) {
        this.showSuccessModal();
        this.changeAttempts = 0;
        setTimeout(() => {
          this.goBack();
        }, 2000);
      }
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  private handleError(error: any) {

    if (error.status === 400) {
      const message = error.error.error || error.error.message || 'Error al cambiar contraseña';
      this.setError('general', message);
    } else if (error.status === 401) {
      this.setError('general', 'No autorizado. Verifique sus permisos');
    } else if (error.status === 422) {
      this.setError('newPassword', 'La contraseña no cumple con los requisitos de seguridad');
    } else if (error.status === 429) {
      this.setError('general', 'Demasiados intentos. Por favor espere un momento');
    } else if (error.status === 500) {
      this.setError('general', 'Error del servidor. Por favor intente más tarde');
    } else {
      this.setError('general', 'Error de conexión. Por favor verifique su internet');
    }
  }

  private setError(field: string, message: string) {
    this.errorMessages[field] = message;
  }

  private clearMessages() {
    this.errorMessages = {};
  }

  goBack() {
    const user = this.authService.currentUserValue;
    const roleName = user?.role?.name?.toUpperCase();

    let route = '/';
    switch (roleName) {
      case 'USUARIO':
        route = '/usuario/tablero';
        break;
      case 'ADMINISTRATIVO':
        route = '/administrativo/tablero';
        break;
      case 'ADMIN':
        route = '/admin/tablero';
        break;
      case 'ESTUDIANTE':
        route = '/estudiante/tablero';
        break;
      default:
        route = '/';
    }

    this.router.navigate([route]);
  }

  showSuccessModal() {
    this.showSuccessModalFlag = true;
  }

  closeSuccessModal() {
    this.showSuccessModalFlag = false;
  }
}
