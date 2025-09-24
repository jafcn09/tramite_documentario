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
        <div class="card-header">
          <button class="back-btn" (click)="goBack()">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="header-content">
            <h1>
              <i class="fas fa-key"></i>
              Cambiar Contraseña
            </h1>
            <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
          </div>
        </div>

        <div class="card-body">
          <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()">
          

            <div class="form-group">
              <label for="currentPassword">Contraseña Actual</label>
              <div class="input-group">
                <input 
                  id="currentPassword"
                  formControlName="currentPassword"
                  [type]="showCurrentPassword ? 'text' : 'password'"
                  class="form-control"
                  [class.error]="isFieldInvalid('currentPassword') || errorMessages['currentPassword']"
                  placeholder="Ingresa tu contraseña actual"
                >
                <button 
                  type="button" 
                  class="toggle-password"
                  (click)="togglePasswordVisibility('current')"
                >
                  <i [class]="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('currentPassword') || errorMessages['currentPassword']">
                <i class="fas fa-exclamation-circle"></i>
                <span *ngIf="errorMessages['currentPassword']">{{ errorMessages['currentPassword'] }}</span>
                <span *ngIf="!errorMessages['currentPassword'] && changePasswordForm.get('currentPassword')?.errors?.['required']">
                  La contraseña actual es requerida
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="newPassword">Nueva Contraseña</label>
              <div class="input-group">
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
                  class="toggle-password"
                  (click)="togglePasswordVisibility('new')"
                >
                  <i [class]="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div class="password-requirements">
                <div class="requirement" [class.valid]="passwordRequirements.length">
                  <i [class]="passwordRequirements.length ? 'fas fa-check' : 'fas fa-times'"></i>
                  Mínimo 8 caracteres
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.uppercase">
                  <i [class]="passwordRequirements.uppercase ? 'fas fa-check' : 'fas fa-times'"></i>
                  Al menos una mayúscula
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.lowercase">
                  <i [class]="passwordRequirements.lowercase ? 'fas fa-check' : 'fas fa-times'"></i>
                  Al menos una minúscula
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.number">
                  <i [class]="passwordRequirements.number ? 'fas fa-check' : 'fas fa-times'"></i>
                  Al menos un número
                </div>
                <div class="requirement" [class.valid]="passwordRequirements.special">
                  <i [class]="passwordRequirements.special ? 'fas fa-check' : 'fas fa-times'"></i>
                  Al menos un carácter especial (!&#64;#$%^&amp;*)
                </div>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('newPassword') || errorMessages['newPassword']">
                <i class="fas fa-exclamation-circle"></i>
                <span *ngIf="errorMessages['newPassword']">{{ errorMessages['newPassword'] }}</span>
                <span *ngIf="!errorMessages['newPassword'] && changePasswordForm.get('newPassword')?.errors?.['required']">
                  La nueva contraseña es requerida
                </span>
                <span *ngIf="!errorMessages['newPassword'] && changePasswordForm.get('newPassword')?.errors?.['minlength']">
                  La contraseña debe tener al menos 8 caracteres
                </span>
                <span *ngIf="!errorMessages['newPassword'] && changePasswordForm.get('newPassword')?.errors?.['passwordWeak']">
                  La contraseña no cumple con todos los requisitos
                </span>
                <span *ngIf="!errorMessages['newPassword'] && changePasswordForm.errors?.['passwordSame']">
                  La nueva contraseña debe ser diferente a la actual
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirmar Nueva Contraseña</label>
              <div class="input-group">
                <input 
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  [type]="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  [class.error]="isFieldInvalid('confirmPassword')"
                  placeholder="Confirma tu nueva contraseña"
                >
                <button 
                  type="button" 
                  class="toggle-password"
                  (click)="togglePasswordVisibility('confirm')"
                >
                  <i [class]="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <div class="error-message" *ngIf="isFieldInvalid('confirmPassword') || changePasswordForm.errors?.['passwordMismatch']">
                <i class="fas fa-exclamation-circle"></i>
                <span *ngIf="changePasswordForm.get('confirmPassword')?.errors?.['required']">
                  Debes confirmar la nueva contraseña
                </span>
                <span *ngIf="changePasswordForm.errors?.['passwordMismatch']">
                  Las contraseñas no coinciden
                </span>
              </div>
            </div>

            <div class="form-actions">
              <button 
                type="button" 
                class="btn-secondary" 
                (click)="goBack()"
                [disabled]="loading"
              >
                <i class="fas fa-times"></i>
                Cancelar
              </button>
              <button 
                type="submit" 
                class="btn-primary"
                [disabled]="changePasswordForm.invalid || loading || !canSubmit"
              >
                <i *ngIf="loading" class="fas fa-spinner fa-spin"></i>
                <i *ngIf="!loading" class="fas fa-save"></i>
                {{ loading ? 'Guardando...' : 'Cambiar Contraseña' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="security-tips">
        <h3>
          <i class="fas fa-shield-alt"></i>
          Consejos de Seguridad
        </h3>
        <ul>
          <li>
            <i class="fas fa-check"></i>
            Usa una combinación de letras, números y símbolos
          </li>
          <li>
            <i class="fas fa-check"></i>
            Evita usar información personal como nombres o fechas
          </li>
          <li>
            <i class="fas fa-check"></i>
            No reutilices contraseñas de otras cuentas
          </li>
          <li>
            <i class="fas fa-check"></i>
            Cambia tu contraseña regularmente
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal de éxito -->
    <div class="success-modal-overlay" *ngIf="showSuccessModalFlag" (click)="closeSuccessModal()">
      <div class="success-modal" (click)="$event.stopPropagation()">
        <div class="success-icon-container">
          <div class="success-icon">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <h2>¡Contraseña Actualizada!</h2>
        <p>Tu contraseña ha sido cambiada exitosamente</p>
        <div class="modal-actions">
          <button class="btn-continue" (click)="goBack()">
            Continuar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .change-password-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px 20px;
      min-height: 100vh;
      background: #f8fafc;
    }

    .change-password-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      overflow: hidden;
      margin-bottom: 30px;
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 40px 30px;
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }

    .back-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .back-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: translateY(-2px);
    }

    .header-content {
      flex: 1;
    }

    .card-header h1 {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 8px 0;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .card-header h1 i {
      font-size: 28px;
    }

    .card-header p {
      font-size: 16px;
      margin: 0;
      opacity: 0.9;
      font-weight: 400;
    }

    .card-body {
      padding: 40px;
    }

    .form-group {
      margin-bottom: 30px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .form-control {
      width: 100%;
      padding: 16px 20px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 16px;
      color: #2d3748;
      background: #f7fafc;
      transition: all 0.3s ease;
      padding-right: 60px;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-control.error {
      border-color: #e53e3e;
      background: #fed7d7;
    }

    .form-control.error:focus {
      border-color: #e53e3e;
      box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }

    .toggle-password {
      position: absolute;
      right: 16px;
      background: none;
      border: none;
      color: #718096;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-size: 16px;
    }

    .toggle-password:hover {
      color: #667eea;
      background: #edf2f7;
    }

    .password-requirements {
      margin-top: 12px;
      padding: 16px;
      background: #f7fafc;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }

    .requirement {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #718096;
      margin-bottom: 8px;
    }

    .requirement:last-child {
      margin-bottom: 0;
    }

    .requirement i {
      width: 16px;
      font-size: 12px;
      color: #e53e3e;
    }

    .requirement.valid {
      color: #38a169;
    }

    .requirement.valid i {
      color: #38a169;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #e53e3e;
      font-size: 14px;
      margin-top: 8px;
      font-weight: 500;
    }

    .error-message i {
      font-size: 12px;
      flex-shrink: 0;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #e2e8f0;
    }

    .btn-secondary, .btn-primary {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      min-width: 160px;
      justify-content: center;
    }

    .btn-secondary {
      background: #f7fafc;
      color: #4a5568;
      border: 2px solid #e2e8f0;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #edf2f7;
      border-color: #cbd5e0;
      transform: translateY(-2px);
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .btn-primary:disabled, .btn-secondary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .security-tips {
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      padding: 30px;
    }

    .security-tips h3 {
      font-size: 20px;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .security-tips h3 i {
      color: #667eea;
      font-size: 18px;
    }

    .security-tips ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .security-tips li {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      color: #4a5568;
      margin-bottom: 12px;
      padding: 12px 16px;
      background: #f7fafc;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
    }

    .security-tips li:last-child {
      margin-bottom: 0;
    }

    .security-tips li i {
      color: #38a169;
      font-size: 12px;
      width: 16px;
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .change-password-container {
        padding: 20px 15px;
      }

      .card-header {
        padding: 25px 20px 20px;
        flex-direction: column;
        text-align: center;
        gap: 15px;
      }

      .header-content {
        text-align: center;
      }

      .card-header h1 {
        font-size: 26px;
        flex-direction: column;
        gap: 8px;
      }

      .card-body {
        padding: 25px 20px;
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .btn-secondary, .btn-primary {
        width: 100%;
        min-width: auto;
      }

      .security-tips {
        padding: 20px;
      }
    }

    @media (max-width: 480px) {
      .card-header h1 {
        font-size: 22px;
      }

      .card-header p {
        font-size: 14px;
      }

      .form-control {
        padding: 14px 16px;
        padding-right: 50px;
        font-size: 14px;
      }

      .toggle-password {
        right: 12px;
        font-size: 14px;
      }
    }

    /* Modal de éxito */
    .success-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    }

    .success-modal {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.4s ease;
    }

    .success-icon-container {
      margin-bottom: 25px;
    }

    .success-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: scaleIn 0.5s ease;
    }

    .success-icon i {
      font-size: 40px;
      color: white;
    }

    .success-modal h2 {
      color: #2d3748;
      margin: 0 0 10px 0;
      font-size: 24px;
      font-weight: 700;
    }

    .success-modal p {
      color: #718096;
      margin: 0 0 30px 0;
      font-size: 16px;
    }

    .modal-actions {
      display: flex;
      justify-content: center;
    }

    .btn-continue {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 40px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-continue:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  `]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  showCurrentPassword = false;
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
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validators: [this.passwordMatchValidator, this.passwordNotSameValidator] 
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

  private passwordNotSameValidator(group: AbstractControl): { [key: string]: any } | null {
    const currentPassword = group.get('currentPassword')?.value;
    const newPassword = group.get('newPassword')?.value;
    
    if (!currentPassword || !newPassword) return null;
    
    return currentPassword !== newPassword ? null : { passwordSame: true };
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

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
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
      const token = localStorage.getItem('auth_token'); // Use correct key
      if (!token) {
        this.setError('general', 'Sesión expirada. Por favor inicie sesión nuevamente');
        this.authService.logout();
        return;
      }

      const user = this.authService.currentUserValue;
      console.log('Current user:', user);
      if (!user || !user.id) {
        this.setError('general', 'No se pudo obtener la información del usuario');
        return;
      }
      console.log('User ID:', user.id);

      const url = `${environment.apiUrl}/api/usuarios/${user.id}/change-password`;
      console.log('Calling URL:', url);
      console.log('Token present:', !!token);
      
      const response = await this.http.put<any>(
        url,
        {
          currentPassword: this.changePasswordForm.value.currentPassword,
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
      
      console.log('Response:', response);

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
    console.error('Error completo:', error);
    console.error('Status:', error.status);
    console.error('Error body:', error.error);
    
    if (error.status === 400) {
      const message = error.error.message || 'Contraseña actual incorrecta';
      if (message.includes('actual') || message.includes('current')) {
        this.setError('currentPassword', 'La contraseña actual es incorrecta');
      } else {
        this.setError('general', message);
      }
    } else if (error.status === 401) {
      this.setError('general', 'No autorizado. Verifique sus permisos');
      console.error('Error 401:', error);
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
    this.router.navigate(['/profile']);
  }

  showSuccessModal() {
    this.showSuccessModalFlag = true;
  }

  closeSuccessModal() {
    this.showSuccessModalFlag = false;
  }
}