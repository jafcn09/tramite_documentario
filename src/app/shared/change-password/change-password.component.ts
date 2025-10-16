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
  template: `
    <div class="change-password-container">
      <div class="change-password-card">
        <!-- Header minimalista -->
        <div class="card-header">
          <button class="back-btn" (click)="goBack()" type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="header-content">
            <h1>Cambiar Contraseña</h1>
            <p>Actualiza tu contraseña de forma segura</p>
          </div>
        </div>

        <!-- Formulario -->
        <div class="card-body">
          <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()">

            <!-- Nueva Contraseña -->
            <div class="form-group">
              <label for="newPassword">Nueva Contraseña</label>
              <div class="input-wrapper">
                <input
                  id="newPassword"
                  formControlName="newPassword"
                  [type]="showNewPassword ? 'text' : 'password'"
                  class="form-control"
                  [class.error]="isFieldInvalid('newPassword')"
                  placeholder="Ingresa tu nueva contraseña"
                >
                <button
                  type="button"
                  class="toggle-btn"
                  (click)="togglePasswordVisibility('new')"
                  tabindex="-1"
                >
                  <svg *ngIf="!showNewPassword" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                  <svg *ngIf="showNewPassword" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3L17 17M10.5 7.5C11.3284 7.5 12 8.17157 12 9M7.5 12.5C6.67157 12.5 6 11.8284 6 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
              </div>

              <!-- Requisitos de contraseña -->
              <div class="password-requirements">
                <div class="requirement" [class.valid]="passwordRequirements.length">
                  <span class="icon">{{ passwordRequirements.length ? '✓' : '○' }}</span>
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.uppercase">
                  <span class="icon">{{ passwordRequirements.uppercase ? '✓' : '○' }}</span>
                  <span>Una letra mayúscula</span>
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.lowercase">
                  <span class="icon">{{ passwordRequirements.lowercase ? '✓' : '○' }}</span>
                  <span>Una letra minúscula</span>
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.number">
                  <span class="icon">{{ passwordRequirements.number ? '✓' : '○' }}</span>
                  <span>Un número</span>
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.special">
                  <span class="icon">{{ passwordRequirements.special ? '✓' : '○' }}</span>
                  <span>Un carácter especial</span>
                </div>
              </div>

              <div class="error-message" *ngIf="isFieldInvalid('newPassword') || errorMessages['newPassword']">
                {{ errorMessages['newPassword'] || 'La contraseña no cumple con los requisitos' }}
              </div>
            </div>

            <!-- Confirmar Contraseña -->
            <div class="form-group">
              <label for="confirmPassword">Confirmar Contraseña</label>
              <div class="input-wrapper">
                <input
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  [class.error]="isFieldInvalid('confirmPassword') || changePasswordForm.errors?.['passwordMismatch']"
                  placeholder="Confirma tu nueva contraseña"
                >
                <button
                  type="button"
                  class="toggle-btn"
                  (click)="togglePasswordVisibility('confirm')"
                  tabindex="-1"
                >
                  <svg *ngIf="!showConfirmPassword" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                  <svg *ngIf="showConfirmPassword" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3L17 17M10.5 7.5C11.3284 7.5 12 8.17157 12 9M7.5 12.5C6.67157 12.5 6 11.8284 6 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('confirmPassword') || changePasswordForm.errors?.['passwordMismatch']">
                {{ changePasswordForm.errors?.['passwordMismatch'] ? 'Las contraseñas no coinciden' : 'Debes confirmar la contraseña' }}
              </div>
            </div>

            <!-- Error general -->
            <div class="alert alert-error" *ngIf="errorMessages['general']">
              {{ errorMessages['general'] }}
            </div>

            <!-- Botones -->
            <div class="form-actions">
              <button
                type="button"
                class="btn btn-secondary"
                (click)="goBack()"
                [disabled]="loading"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                [disabled]="changePasswordForm.invalid || loading || !canSubmit"
              >
                <span *ngIf="loading" class="spinner"></span>
                {{ loading ? 'Guardando...' : 'Cambiar Contraseña' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Consejos de seguridad -->
      <div class="security-tips">
        <h3>Consejos de Seguridad</h3>
        <ul>
          <li>Usa una combinación única de caracteres</li>
          <li>Evita información personal fácil de adivinar</li>
          <li>No reutilices contraseñas de otras cuentas</li>
          <li>Cambia tu contraseña periódicamente</li>
        </ul>
      </div>
    </div>

    <!-- Modal de éxito -->
    <div class="modal-overlay" *ngIf="showSuccessModalFlag" (click)="closeSuccessModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#10b981" stroke-width="3"/>
            <path d="M14 24L20 30L34 16" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>¡Contraseña Actualizada!</h2>
        <p>Tu contraseña ha sido cambiada exitosamente</p>
        <button class="btn btn-primary" (click)="goBack()">
          Continuar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .change-password-container {
      max-width: 520px;
      margin: 0 auto;
      padding: 24px 16px;
      min-height: 100vh;
    }

    .change-password-card {
      background: white;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      overflow: hidden;
      margin-bottom: 24px;
    }

    /* Header minimalista */
    .card-header {
      background: #f9fafb;
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .back-btn {
      background: white;
      border: 1px solid #e5e7eb;
      color: #6b7280;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .back-btn:hover {
      background: #f9fafb;
      border-color: #d1d5db;
      color: #374151;
    }

    .header-content {
      flex: 1;
    }

    .card-header h1 {
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 4px 0;
    }

    .card-header p {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    /* Formulario */
    .card-body {
      padding: 32px 24px;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }

    .input-wrapper {
      position: relative;
    }

    .form-control {
      width: 100%;
      padding: 12px 44px 12px 14px;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 15px;
      color: #111827;
      background: white;
      transition: all 0.2s;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-control::placeholder {
      color: #9ca3af;
    }

    .form-control.error {
      border-color: #ef4444;
    }

    .form-control.error:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .toggle-btn {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toggle-btn:hover {
      color: #6b7280;
      background: #f3f4f6;
    }

    /* Requisitos de contraseña */
    .password-requirements {
      margin-top: 12px;
      padding: 14px;
      background: #f9fafb;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
    }

    .requirement {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 6px;
      transition: color 0.2s;
    }

    .requirement:last-child {
      margin-bottom: 0;
    }

    .requirement .icon {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }

    .requirement.valid {
      color: #10b981;
    }

    .error-message {
      color: #ef4444;
      font-size: 13px;
      margin-top: 8px;
      font-weight: 500;
    }

    .alert {
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .alert-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
    }

    /* Botones */
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }

    .btn {
      flex: 1;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
    }

    .btn-secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Consejos de seguridad */
    .security-tips {
      background: white;
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      padding: 24px;
    }

    .security-tips h3 {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 16px 0;
    }

    .security-tips ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .security-tips li {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 10px;
      padding-left: 20px;
      position: relative;
    }

    .security-tips li:last-child {
      margin-bottom: 0;
    }

    .security-tips li::before {
      content: '•';
      position: absolute;
      left: 6px;
      color: #9ca3af;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 16px;
      animation: fadeIn 0.2s ease;
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      animation: slideUp 0.3s ease;
    }

    .success-icon {
      margin: 0 auto 20px;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-content h2 {
      color: #111827;
      margin: 0 0 8px 0;
      font-size: 22px;
      font-weight: 600;
    }

    .modal-content p {
      color: #6b7280;
      margin: 0 0 24px 0;
      font-size: 15px;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .change-password-container {
        padding: 16px 12px;
      }

      .card-header {
        padding: 20px 16px;
      }

      .card-header h1 {
        font-size: 20px;
      }

      .card-body {
        padding: 24px 16px;
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .btn {
        width: 100%;
      }
    }
  `]
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
    // No pedimos contraseña actual porque el usuario ya está autenticado con JWT
    // Mejor UX: el token ya valida su identidad
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

  // Ya no necesitamos este validator porque no pedimos contraseña actual

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
    this.router.navigate(['/perfil']);
  }

  showSuccessModal() {
    this.showSuccessModalFlag = true;
  }

  closeSuccessModal() {
    this.showSuccessModalFlag = false;
  }
}