import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="edit-profile-container" *ngIf="isEditMode">
      <form [formGroup]="editForm" class="edit-form">
        <div class="form-row">
          <div class="form-group">
            <label>Nombres</label>
            <input type="text" class="form-control readonly" [value]="currentUser?.nombre" disabled>
          </div>
          <div class="form-group">
            <label>Apellidos</label>
            <input type="text" class="form-control readonly" [value]="currentUser?.apellidos" disabled>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Usuario</label>
            <input type="text" class="form-control readonly" [value]="currentUser?.usuario" disabled>
          </div>
          <div class="form-group">
            <label>Fecha de Nacimiento</label>
            <input type="text" class="form-control readonly" [value]="currentUser?.fechaNacimiento || 'No especificado'" disabled>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label>Correo Electrónico *</label>
            <input 
              type="email" 
              class="form-control" 
              formControlName="correo"
              [class.error]="editForm.get('correo')?.invalid && editForm.get('correo')?.touched"
              placeholder="Ingrese su correo electrónico"
            >
            <span class="error-message" *ngIf="(editForm.get('correo')?.invalid && editForm.get('correo')?.touched) || errorMessages['correo']">
              {{ getErrorMessage('correo') }}
            </span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Celular *</label>
            <input 
              type="tel" 
              class="form-control" 
              formControlName="celular"
              [class.error]="editForm.get('celular')?.invalid && editForm.get('celular')?.touched"
              placeholder="Ingrese su número celular"
              maxlength="9"
            >
            <span class="error-message" *ngIf="(editForm.get('celular')?.invalid && editForm.get('celular')?.touched) || errorMessages['celular']">
              {{ getErrorMessage('celular') }}
            </span>
          </div>
          <div class="form-group">
            <label>Dirección *</label>
            <input 
              type="text" 
              class="form-control" 
              formControlName="direccion"
              [class.error]="editForm.get('direccion')?.invalid && editForm.get('direccion')?.touched"
              placeholder="Ingrese su dirección"
            >
            <span class="error-message" *ngIf="(editForm.get('direccion')?.invalid && editForm.get('direccion')?.touched) || errorMessages['direccion']">
              {{ getErrorMessage('direccion') }}
            </span>
          </div>
        </div>

        <div class="alert alert-success" *ngIf="successMessage">
          <i class="fas fa-check-circle"></i>
          {{ successMessage }}
        </div>

        <div class="alert alert-error" *ngIf="errorMessages['general']">
          <i class="fas fa-exclamation-circle"></i>
          {{ errorMessages['general'] }}
        </div>

        <div class="form-actions">
          <button 
            type="button" 
            class="btn-secondary" 
            (click)="cancelEdit()"
            [disabled]="isUpdating"
          >
            <i class="fas fa-times"></i>
            Cancelar
          </button>
          <button 
            type="button" 
            class="btn-primary" 
            (click)="saveProfile()"
            [disabled]="editForm.invalid || isUpdating"
          >
            <i class="fas fa-save" *ngIf="!isUpdating"></i>
            <i class="fas fa-spinner fa-spin" *ngIf="isUpdating"></i>
            {{ isUpdating ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-profile-container {
      padding: 20px;
      background: white;
      border-radius: 12px;
      margin-top: 20px;
    }

    .edit-form {
      max-width: 800px;
      margin: 0 auto;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-group label {
      font-size: 14px;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .form-control {
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      font-size: 16px;
      color: #2d3748;
      background: white;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-control.readonly {
      background: #f7fafc;
      cursor: not-allowed;
      opacity: 0.7;
    }

    .form-control.error {
      border-color: #e53e3e;
    }

    .error-message {
      color: #e53e3e;
      font-size: 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      margin: 20px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }

    .alert-success {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #86efac;
    }

    .alert-error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fca5a5;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }

    .btn-primary, .btn-secondary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #f7fafc;
      border: 2px solid #e2e8f0;
      color: #718096;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #edf2f7;
      border-color: #cbd5e0;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class UserProfileEditComponent implements OnInit {
  currentUser: User | null = null;
  isEditMode = false;
  isUpdating = false;
  editForm: FormGroup;
  updateAttempts = 0;
  lastUpdateAttempt = 0;
  errorMessages: { [key: string]: string } = {};
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.editForm = this.fb.group({
      correo: ['', [
        Validators.required,
        Validators.email,
        this.emailValidator
      ]],
      celular: ['', [
        Validators.required,
        Validators.pattern('^9[0-9]{8}$'),
        this.phoneValidator
      ]],
      direccion: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200),
        this.addressValidator
      ]]
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.editForm.patchValue({
          correo: user.correo,
          celular: user.celular || '',
          direccion: user.direccion || ''
        });
      }
    });

    this.editForm.valueChanges.subscribe(() => {
      this.clearMessages();
    });
  }

  private emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value;
    if (!email) return null;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return { invalidEmail: true };
    }

    if (email.length > 100) {
      return { emailTooLong: true };
    }

    return null;
  }

  private phoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const phone = control.value;
    if (!phone) return null;

    if (!/^9\d{8}$/.test(phone)) {
      return { invalidPhone: true };
    }

    return null;
  }

  private addressValidator(control: AbstractControl): { [key: string]: any } | null {
    const address = control.value;
    if (!address) return null;

    if (address.trim().length < 5) {
      return { addressTooShort: true };
    }

    if (/<[^>]*>/.test(address)) {
      return { invalidCharacters: true };
    }

    return null;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.clearMessages();
    if (this.currentUser) {
      this.editForm.patchValue({
        correo: this.currentUser.correo,
        celular: this.currentUser.celular || '',
        direccion: this.currentUser.direccion || ''
      });
      this.editForm.markAsUntouched();
    }
  }

  async saveProfile() {
    if (this.editForm.invalid || this.isUpdating) {
      this.editForm.markAllAsTouched();
      return;
    }

    const now = Date.now();
    const timeSinceLastAttempt = now - this.lastUpdateAttempt;

    if (timeSinceLastAttempt < 3000) {
      this.setError('general', `Por favor espere ${Math.ceil((3000 - timeSinceLastAttempt) / 1000)} segundos antes de intentar nuevamente`);
      return;
    }

    if (this.updateAttempts >= 2) {
      if (now - this.lastUpdateAttempt < 30000) {
        this.setError('general', 'Has alcanzado el límite de intentos. Por favor espera 30 segundos');
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
      const token = localStorage.getItem('token');
      if (!token) {
        this.setError('general', 'Sesión expirada. Por favor inicie sesión nuevamente');
        this.authService.logout();
        return;
      }

      const updateData = {
        correo: this.editForm.value.correo.trim().toLowerCase(),
        celular: this.editForm.value.celular.trim(),
        direccion: this.editForm.value.direccion.trim()
      };

      if (!this.currentUser || !this.currentUser.id) {
        this.setError('general', 'No se pudo obtener la información del usuario');
        return;
      }

      const response = await this.http.put<any>(
        `${environment.apiUrl}/api/usuarios/${this.currentUser.id}`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      ).toPromise();

      if (response && response.success) {
        this.successMessage = 'Perfil actualizado correctamente';
        this.currentUser = { ...this.currentUser, ...updateData } as User;
        
        if (typeof (this.authService as any).updateCurrentUser === 'function') {
          (this.authService as any).updateCurrentUser(this.currentUser);
        }
        
        this.isEditMode = false;
        this.updateAttempts = 0;

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }
    } catch (error: any) {
      this.handleUpdateError(error);
    } finally {
      this.isUpdating = false;
    }
  }

  private handleUpdateError(error: any) {
    if (error.status === 400) {
      const errorData = error.error;
      if (errorData.field) {
        this.setError(errorData.field, errorData.message);
      } else {
        this.setError('general', errorData.message || 'Datos inválidos. Por favor verifique la información');
      }
    } else if (error.status === 401) {
      this.setError('general', 'Sesión expirada. Por favor inicie sesión nuevamente');
      setTimeout(() => this.authService.logout(), 2000);
    } else if (error.status === 409) {
      this.setError('correo', 'Este correo electrónico ya está registrado');
    } else if (error.status === 422) {
      const errors = error.error.errors;
      if (errors) {
        Object.keys(errors).forEach(field => {
          this.setError(field, errors[field]);
        });
      } else {
        this.setError('general', 'Error de validación. Por favor verifique los datos');
      }
    } else if (error.status === 429) {
      this.setError('general', 'Demasiadas solicitudes. Por favor espere un momento');
    } else if (error.status === 500) {
      this.setError('general', 'Error del servidor. Por favor intente más tarde');
    } else {
      this.setError('general', 'Error de conexión. Por favor verifique su internet');
    }
  }

  getErrorMessage(field: string): string {
    if (this.errorMessages[field]) {
      return this.errorMessages[field];
    }

    const control = this.editForm.get(field);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    if (field === 'correo') {
      if (errors['required']) return 'El correo electrónico es requerido';
      if (errors['email'] || errors['invalidEmail']) return 'Ingrese un correo electrónico válido';
      if (errors['emailTooLong']) return 'El correo es demasiado largo (máximo 100 caracteres)';
    }

    if (field === 'celular') {
      if (errors['required']) return 'El teléfono es requerido';
      if (errors['pattern'] || errors['invalidPhone']) return 'El teléfono debe iniciar con 9 y tener 9 dígitos';
    }

    if (field === 'direccion') {
      if (errors['required']) return 'La dirección es requerida';
      if (errors['minlength'] || errors['addressTooShort']) return 'La dirección debe tener al menos 5 caracteres';
      if (errors['maxlength']) return 'La dirección es demasiado larga (máximo 200 caracteres)';
      if (errors['invalidCharacters']) return 'La dirección contiene caracteres no permitidos';
    }

    return '';
  }

  private setError(field: string, message: string) {
    this.errorMessages[field] = message;
  }

  private clearMessages() {
    this.errorMessages = {};
    this.successMessage = '';
  }
}