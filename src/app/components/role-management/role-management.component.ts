import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Role, RoleRequest } from '../../shared/interfaces/role.interface';
import { catchError, finalize, of } from 'rxjs';

@Component({
    selector: 'app-role-management',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './role-management.component.html',
    styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  roles = signal<Role[]>([]);
  searchTerm = '';
  showModal = signal(false);
  showDeleteModal = signal(false);
  isEditing = signal(false);
  isLoading = signal(false);
  currentRole = signal<Role | null>(null);
  roleToDelete = signal<Role | null>(null);
  successMessage = signal('');
  errorMessage = signal('');
  isMobile = signal(false);

  roleForm: FormGroup;

  filteredRoles = computed(() => {
    const term = this.searchTerm.toLowerCase().trim();
    const allRoles = this.roles();

    if (!term) return allRoles;

    return allRoles.filter(role =>
      role.name.toLowerCase().includes(term) ||
      role.description.toLowerCase().includes(term)
    );
  });

  hasSearchResults = computed(() => {
    return this.searchTerm ? this.filteredRoles().length > 0 : true;
  });

  searchMessage = computed(() => {
    if (!this.searchTerm) return '';
    const count = this.filteredRoles().length;
    return count === 0
      ? `No se encontraron roles que coincidan con "${this.searchTerm}"`
      : `${count} rol(es) encontrado(s) para "${this.searchTerm}"`;
  });

  constructor() {
    this.roleForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s0-9]+$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]]
    });

    this.checkViewport();
    window.addEventListener('resize', () => this.checkViewport());
  }

  ngOnInit() {
    this.loadRoles();
  }

  private checkViewport() {
    this.isMobile.set(window.innerWidth < 768);
  }

  loadRoles() {
    const token = localStorage.getItem('auth_token');

    this.http.get<Role[]>(`${environment.apiUrl}/api/roles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe(
      catchError(() => {
        this.showError('Error al cargar los roles');
        return of([]);
      })
    ).subscribe(roles => {
      this.roles.set(roles);
    });
  }

  filterRoles() {
    this.filteredRoles();
  }

  clearSearch() {
    this.searchTerm = '';
  }

  openCreateModal() {
    this.isEditing.set(false);
    this.currentRole.set(null);
    this.roleForm.reset();
    this.showModal.set(true);
  }

  editRole(role: Role) {
    this.isEditing.set(true);
    this.currentRole.set(role);
    this.roleForm.patchValue({
      name: role.name,
      description: role.description
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.currentRole.set(null);
    this.roleForm.reset();
  }

  saveRole() {
    if (this.roleForm.invalid) {
      Object.keys(this.roleForm.controls).forEach(key => {
        const control = this.roleForm.get(key);
        if (control?.invalid) control.markAsTouched();
      });
      return;
    }

    this.isLoading.set(true);
    const token = localStorage.getItem('auth_token');
    const roleData: RoleRequest = this.roleForm.value;
    const current = this.currentRole();

    const request$ = this.isEditing() && current
      ? this.http.put<Role>(`${environment.apiUrl}/api/roles/${current.id}`, roleData, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      : this.http.post<Role>(`${environment.apiUrl}/api/roles`, roleData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

    request$.pipe(
      finalize(() => this.isLoading.set(false)),
      catchError(err => {
        this.showError(err.error?.message || err.error?.error || 'Error al guardar el rol');
        return of(null);
      })
    ).subscribe(role => {
      if (role) {
        this.showSuccess(this.isEditing() ? 'Rol actualizado' : 'Rol creado');
        this.loadRoles();
        this.closeModal();
      }
    });
  }

  confirmDelete(role: Role) {
    this.roleToDelete.set(role);
    this.showDeleteModal.set(true);
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.roleToDelete.set(null);
  }

  executeDelete() {
    const role = this.roleToDelete();
    if (!role) return;

    const token = localStorage.getItem('auth_token');
    this.http.delete(`${environment.apiUrl}/api/roles/${role.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe(
      catchError(err => {
        this.showError(err.error?.message || err.error?.error || 'Error al eliminar');
        return of(null);
      })
    ).subscribe(result => {
      if (result !== null) {
        this.showSuccess('Rol eliminado');
        this.loadRoles();
        this.cancelDelete();
      }
    });
  }

  getRoleIcon(roleName: string): string {
    const icons: Record<string, string> = {
      'admin': 'fas fa-university',
      'administrativo': 'fas fa-graduation-cap',
      'usuario': 'fas fa-user-graduate'
    };
    return icons[roleName.toLowerCase()] || 'fas fa-book';
  }

  getRoleClass(roleName: string): string {
    return roleName.toLowerCase();
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';

    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.roleForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.roleForm.get(fieldName);
    if (!field?.errors) return '';

    const errors: Record<string, string> = {
      required: 'Este campo es requerido',
      minlength: `Mínimo ${field.errors['minlength']?.requiredLength} caracteres`,
      maxlength: `Máximo ${field.errors['maxlength']?.requiredLength} caracteres`,
      pattern: 'Formato inválido'
    };

    const firstError = Object.keys(field.errors)[0];
    return errors[firstError] || 'Error de validación';
  }

  private showSuccess(message: string) {
    this.successMessage.set(message);
    this.errorMessage.set('');
    setTimeout(() => this.successMessage.set(''), 5000);
  }

  private showError(message: string) {
    this.errorMessage.set(message);
    this.successMessage.set('');
    setTimeout(() => this.errorMessage.set(''), 5000);
  }
}
