import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Area, Role, User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  areas: Area[] = [];
  activeAreas: Area[] = [];
  roles: Role[] = [];
  searchTerm = '';
  statusFilter = '';
  areaFilter = '';
  showAreaModal = false;
  showCreateModal = false;
  selectedUser: User | null = null;
  selectedAreaId: number | string = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  createUserForm: FormGroup;

  // Edit User Modal Properties
  showEditModal = false;
  selectedUserForEdit: User | null = null;
  editUserForm: FormGroup;
  updatingUser = false;

  // Reset Password Modal Properties
  showResetPasswordModal = false;
  selectedUserForPassword: User | null = null;
  resetPasswordForm: FormGroup;
  resettingPassword = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.createUserForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      direccion: [''],
      roleId: ['', Validators.required],
      areaId: [''],
      mustChangePassword: [true]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.minLength(6), Validators.maxLength(50)]],
      reason: [''],
      mustChangePassword: [false]
    });

    this.editUserForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      direccion: [''],
      roleId: ['', Validators.required],
      areaId: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadAreas();
    this.loadRoles();
  }

  loadUsers() {
    const token = localStorage.getItem('auth_token');
    this.http.get<User[]>(`${environment.apiUrl}/api/usuarios`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: () => {
        this.showError('Error al cargar los usuarios');
      }
    });
  }

  loadAreas() {
    const token = localStorage.getItem('auth_token');
    this.http.get<Area[]>(`${environment.apiUrl}/api/areas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (areas) => {
        this.areas = areas;
        this.activeAreas = areas.filter(area => area.activa);
      },
      error: () => {
      }
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm ||
        user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.apellidos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.correo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.usuario.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = !this.statusFilter ||
        (this.statusFilter === 'enabled' && user.accountEnabled) ||
        (this.statusFilter === 'disabled' && !user.accountEnabled) ||
        (this.statusFilter === 'locked' && user.accountLocked);

      const matchesArea = !this.areaFilter ||
        (this.areaFilter === 'no-area' && !user.area) ||
        (user.area && user.area.id.toString() === this.areaFilter);

      return matchesSearch && matchesStatus && matchesArea;
    });
  }

  editUser(user: User) {
    this.selectedUserForEdit = user;
    this.editUserForm.patchValue({
      nombre: user.nombre,
      apellidos: user.apellidos,
      tipoDocumento: user.tipoDocumento,
      numDocumento: user.numDocumento,
      correo: user.correo,
      celular: user.celular || '',
      direccion: user.direccion || '',
      roleId: user.role.id,
      areaId: user.area?.id || ''
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedUserForEdit = null;
    this.editUserForm.reset();
    this.updatingUser = false;
  }

  updateUser() {
    if (this.editUserForm.invalid || !this.selectedUserForEdit) {
      Object.keys(this.editUserForm.controls).forEach(key => {
        const control = this.editUserForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.updatingUser = true;
    const token = localStorage.getItem('auth_token');
    const formValue = this.editUserForm.value;

    const request = {
      nombre: formValue.nombre,
      apellidos: formValue.apellidos,
      tipoDocumento: formValue.tipoDocumento,
      numDocumento: formValue.numDocumento,
      correo: formValue.correo,
      celular: formValue.celular || null,
      direccion: formValue.direccion || null,
      roleId: parseInt(formValue.roleId),
      areaId: formValue.areaId ? parseInt(formValue.areaId) : null
    };

    this.http.put<User>(`${environment.apiUrl}/api/usuarios/${this.selectedUserForEdit.id}`, request, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.showSuccess('Usuario actualizado exitosamente');
        this.loadUsers();
        this.closeEditModal();
      },
      error: (error) => {
        if (error.error?.message) {
          this.showError(error.error.message);
        } else {
          this.showError('Error al actualizar el usuario');
        }
        this.updatingUser = false;
      }
    });
  }

  toggleUserStatus(user: User) {
    const token = localStorage.getItem('auth_token');
    this.http.put<User>(`${environment.apiUrl}/api/usuarios/${user.id}/toggle-status`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (updatedUser) => {
        this.showSuccess(`Usuario ${updatedUser.accountEnabled ? 'habilitado' : 'deshabilitado'} correctamente`);
        this.loadUsers();
      },
      error: () => {
        this.showError('Error al cambiar el estado del usuario');
      }
    });
  }

  toggleUserLock(user: User) {
    const token = localStorage.getItem('auth_token');
    this.http.put<User>(`${environment.apiUrl}/api/usuarios/${user.id}/toggle-lock`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (updatedUser) => {
        this.showSuccess(`Usuario ${updatedUser.accountLocked ? 'bloqueado' : 'desbloqueado'} correctamente`);
        this.loadUsers();
      },
      error: () => {
        this.showError('Error al cambiar el bloqueo del usuario');
      }
    });
  }

  deleteUser(user: User) {
    if (confirm(`¿Está seguro de que desea eliminar al usuario "${user.nombre} ${user.apellidos}"?`)) {
      const token = localStorage.getItem('auth_token');
      this.http.delete(`${environment.apiUrl}/api/usuarios/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.showSuccess('Usuario eliminado correctamente');
          this.loadUsers();
        },
        error: () => {
          this.showError('Error al eliminar el usuario');
        }
      });
    }
  }

  openAreaAssignModal(user: User) {
    this.selectedUser = user;
    this.selectedAreaId = user.area?.id || '';
    this.showAreaModal = true;
  }

  closeAreaModal() {
    this.showAreaModal = false;
    this.selectedUser = null;
    this.selectedAreaId = '';
  }

  assignArea() {
    if (!this.selectedUser) return;

    this.isLoading = true;
    const token = localStorage.getItem('auth_token');

    const request = this.selectedAreaId
      ? this.http.put<User>(`${environment.apiUrl}/api/usuarios/${this.selectedUser.id}/assign-area/${this.selectedAreaId}`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      : this.http.delete<User>(`${environment.apiUrl}/api/usuarios/${this.selectedUser.id}/remove-area`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

    request.subscribe({
      next: () => {
        this.showSuccess('Área asignada correctamente');
        this.loadUsers();
        this.closeAreaModal();
        this.isLoading = false;
      },
      error: () => {
        this.showError('Error al asignar el área');
        this.isLoading = false;
      }
    });
  }

  private showSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterUsers();
  }

  // Reset Password Methods
  openResetPasswordModal(user: User) {
    this.selectedUserForPassword = user;
    this.showResetPasswordModal = true;
    this.resetPasswordForm.reset();
    this.resetPasswordForm.patchValue({
      mustChangePassword: false
    });
  }

  closeResetPasswordModal() {
    this.showResetPasswordModal = false;
    this.selectedUserForPassword = null;
    this.resetPasswordForm.reset();
    this.resettingPassword = false;
  }

  resetUserPassword() {
    if (!this.selectedUserForPassword) {
      return;
    }

    const passwordValue = this.resetPasswordForm.value.newPassword?.trim();

    if (passwordValue && this.resetPasswordForm.get('newPassword')?.invalid) {
      this.resetPasswordForm.get('newPassword')?.markAsTouched();
      return;
    }

    this.resettingPassword = true;
    const token = localStorage.getItem('auth_token');
    const request = {
      newPassword: passwordValue || '',
      reason: this.resetPasswordForm.value.reason?.trim() || '',
      mustChangePassword: this.resetPasswordForm.value.mustChangePassword || false
    };

    this.http.put(`${environment.apiUrl}/api/usuarios/${this.selectedUserForPassword.id}/admin-reset-password`, request, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: () => {
        const message = passwordValue
          ? 'Contraseña restablecida correctamente'
          : 'Contraseña generada y enviada por correo electrónico';
        this.showSuccess(message);
        this.loadUsers();
        this.closeResetPasswordModal();
      },
      error: (error) => {
        const errorMessage = error.error?.error || 'Error al restablecer la contraseña';
        this.showError(errorMessage);
        this.resettingPassword = false;
      }
    });
  }

  loadRoles() {
    const token = localStorage.getItem('auth_token');
    this.http.get<Role[]>(`${environment.apiUrl}/api/roles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: () => {
      }
    });
  }

  openCreateUserModal() {
    this.createUserForm.reset();
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.createUserForm.reset();
  }

  createUser() {
    if (this.createUserForm.invalid) {
      Object.keys(this.createUserForm.controls).forEach(key => {
        const control = this.createUserForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.isLoading = true;
    const token = localStorage.getItem('auth_token');
    const formValue = this.createUserForm.value;

    const request = {
      nombre: formValue.nombre,
      apellidos: formValue.apellidos,
      tipoDocumento: formValue.tipoDocumento,
      numDocumento: formValue.numDocumento,
      correo: formValue.correo,
      celular: formValue.celular || null,
      direccion: formValue.direccion || null,
      roleId: parseInt(formValue.roleId),
      areaId: formValue.areaId ? parseInt(formValue.areaId) : null,
      mustChangePassword: formValue.mustChangePassword
    };

    this.http.post<User>(`${environment.apiUrl}/api/usuarios`, request, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.showSuccess('Usuario creado exitosamente');
        this.loadUsers();
        this.closeCreateModal();
        this.isLoading = false;
      },
      error: (error) => {
        if (error.error?.message) {
          this.showError(error.error.message);
        } else {
          this.showError('Error al crear el usuario');
        }
        this.isLoading = false;
      }
    });
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }
}
