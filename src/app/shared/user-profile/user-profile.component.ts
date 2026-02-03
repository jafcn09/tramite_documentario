import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/auth.interface';

@Component({
    selector: 'app-user-profile',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  isEditMode = false;
  isUpdating = false;
  editForm: FormGroup;
  updateAttempts = 0;
  lastUpdateAttempt = 0;
  errorMessages: { [key: string]: string } = {};
  successMessage = '';
  isUploadingPhoto = false;
  selectedPhotoFile: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.editForm = this.fb.group({
      correo: ['', [Validators.email]],
      celular: ['', [Validators.pattern('^9[0-9]{8}$')]],
      direccion: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user && this.editForm) {
        this.editForm.patchValue({
          correo: user.correo,
          celular: user.celular || '',
          direccion: user.direccion || ''
        });
      }
    });

    setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) {
      }
    }, 5000);
  }

  toggleEditMode() {
    if (this.updateAttempts >= 2) {
      this.setError('general', 'Límite de ediciones alcanzado. Solo se permiten 2 actualizaciones.');
      return;
    }

    this.isEditMode = !this.isEditMode;

    this.clearMessages();

    if (this.isEditMode && this.currentUser) {
      this.editForm.patchValue({
        correo: this.currentUser.correo,
        celular: this.currentUser.celular || '',
        direccion: this.currentUser.direccion || ''
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
        celular: this.currentUser.celular || '',
        direccion: this.currentUser.direccion || ''
      });
      this.editForm.markAsUntouched();
    }
  }

  async saveProfile() {
    try {
      const storedUser = localStorage.getItem('current_user');
      const storedToken = localStorage.getItem('auth_token');

      if (this.editForm.invalid || this.isUpdating) {
        this.editForm.markAllAsTouched();
        return;
      }
    } catch (error) {
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
      let token = localStorage.getItem('auth_token');
      if (!token) {
        token = localStorage.getItem('token');
      }

      if (!token) {
        this.setError('general', 'No se encontró el token de autenticación. Revise la consola para más detalles.');

        return;
      }

      if (!this.currentUser || !this.currentUser.id) {
        this.setError('general', 'No se pudo obtener la información del usuario');
        return;
      }

      const updateData: any = {};

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
        this.setError('general', 'No hay cambios para guardar');
        this.isUpdating = false;
        return;
      }

      const apiUrl = `${environment.apiUrl}/api/usuarios/${this.currentUser.id}`;
      try {
        await this.http.get<any>(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).toPromise();

      } catch (getError: any) {
        if (getError.status === 401 || getError.status === 403) {
          this.setError('general', 'Token de autenticación no válido');
          return;
        }
      }

      const response = await this.http.put<any>(
        apiUrl,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      ).toPromise();

      if (response) {
        this.successMessage = 'Perfil actualizado correctamente';

        this.currentUser = response as User;

        localStorage.setItem('current_user', JSON.stringify(this.currentUser));

        (this.authService as any).currentUserSubject?.next(this.currentUser);

        this.editForm.patchValue({
          correo: this.currentUser.correo || '',
          celular: this.currentUser.celular || '',
          direccion: this.currentUser.direccion || ''
        });

        this.isEditMode = false;
        this.updateAttempts++;

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.setError('general', 'Por favor seleccione un archivo de imagen válido');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.setError('general', 'El archivo no puede ser mayor a 5MB');
      return;
    }

    this.selectedPhotoFile = file;
    this.uploadPhoto();
  }

  async uploadPhoto() {
    if (!this.selectedPhotoFile || !this.currentUser) return;

    if (this.updateAttempts >= 2) {
      this.setError('general', 'Límite de ediciones alcanzado. Solo se permiten 2 actualizaciones.');
      return;
    }

    try {
      this.isUploadingPhoto = true;
      this.clearMessages();

      const base64Photo = await this.convertFileToBase64(this.selectedPhotoFile);

      let token = localStorage.getItem('auth_token');
      if (!token) {
        this.setError('general', 'No se encontró el token de autenticación');
        return;
      }

      const updateData = {
        foto: base64Photo
      };

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

      if (response) {
        this.successMessage = 'Foto actualizada correctamente';

        this.currentUser = response as User;

        localStorage.setItem('current_user', JSON.stringify(this.currentUser));

        (this.authService as any).currentUserSubject?.next(this.currentUser);

        this.updateAttempts++;
        this.selectedPhotoFile = null;

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }

    } catch (error: any) {
      this.setError('general', 'Error al actualizar la foto: ' + (error.error?.message || error.message));
    } finally {
      this.isUploadingPhoto = false;
    }
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;

        const base64 = result.split(',')[1];
        resolve(`data:${file.type};base64,${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private handleUpdateError(error: any) {
    if (error.status === 400) {
      const backendMessage = error.error?.message || error.error?.error || 'Datos inválidos';
      this.setError('general', `Error del servidor: ${backendMessage}`);

    } else if (error.status === 401) {
      this.setError('general', 'No autorizado. Verifique sus permisos');
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
      if (errors['email']) return 'Ingrese un correo electrónico válido';
    }

    if (field === 'celular') {
      if (errors['pattern']) return 'El teléfono debe iniciar con 9 y tener 9 dígitos';
    }

    if (field === 'direccion') {
      if (errors['maxlength']) return 'La dirección es demasiado larga (máximo 200 caracteres)';
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

  getJoinDate(): string {
    return 'Enero 2024';
  }

  getRoleDescription(): string {
    const descriptions: { [key: string]: string } = {
      'ADMIN': 'Administrador del Sistema',
      'ADMINISTRATIVO': 'Personal Administrativo',
      'USUARIO': 'Usuario Estándar',
      'ALUMNO': 'Estudiante',
      'EXTERNO': 'Usuario Externo'
    };
    return descriptions[this.currentUser?.role?.name || ''] || 'Usuario del Sistema';
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getBackRoute(): string {
    const roleName = this.currentUser?.role?.name?.toUpperCase();

    switch (roleName) {
      case 'USUARIO':
        return '/usuario/tablero';
      case 'ADMINISTRATIVO':
        return '/administrativo/tablero';
      case 'ADMIN':
        return '/admin/tablero';
      case 'ESTUDIANTE':
        return '/estudiante/tablero';
      default:
        return '/';
    }
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.router.navigate([this.getBackRoute()]);
  }
}
