import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Area, Role, User } from './user.interface';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="user-management-container">
      <div class="header">
        <h1>
          <i class="fas fa-users-cog"></i>
          Gestión de Usuarios
        </h1>
        <div class="header-actions">
          <button class="btn-primary" (click)="openCreateUserModal()">
            <i class="fas fa-plus"></i>
            Nuevo Usuario
          </button>
        </div>
      </div>
      <div class="search-filters">
        <div class="search-section">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" 
                   [(ngModel)]="searchTerm" 
                   (input)="filterUsers()" 
                   placeholder="Buscar por nombre, email, usuario..."
                   class="search-input">
            <button *ngIf="searchTerm" 
                    class="clear-search" 
                    (click)="clearSearch()"
                    title="Limpiar búsqueda">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="search-results" *ngIf="searchTerm">
            <small>{{ filteredUsers.length }} resultado(s) encontrado(s)</small>
          </div>
        </div>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Estado:</label>
          <select [(ngModel)]="statusFilter" (change)="filterUsers()" class="filter-select">
            <option value="">Todos los estados</option>
            <option value="enabled">Habilitados</option>
            <option value="disabled">Deshabilitados</option>
            <option value="locked">Bloqueados</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Área:</label>
          <select [(ngModel)]="areaFilter" (change)="filterUsers()" class="filter-select">
            <option value="">Todas las áreas</option>
            <option value="no-area">Sin área asignada</option>
            <option *ngFor="let area of areas" [value]="area.id">{{ area.nombre }}</option>
          </select>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="users-table-container desktop-only">
        <table class="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Información Personal</th>
              <th>Rol</th>
              <th>Área</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of filteredUsers" [class.disabled-user]="!user.accountEnabled">
              <td>
                <div class="user-info">
                  <img [src]="user.foto || '/assets/default-avatar.png'" 
                       [alt]="user.nombre" 
                       class="user-avatar"
                       onerror="this.src='/assets/default-avatar.png'">
                  <div class="user-details">
                    <strong>{{ user.nombre }} {{ user.apellidos }}</strong>
                    <small>{{ user.usuario }}</small>
                  </div>
                </div>
              </td>
              
              <td>
                <div class="contact-info">
                  <div><i class="fas fa-envelope"></i> {{ user.correo }}</div>
                  <div *ngIf="user.celular"><i class="fas fa-phone"></i> {{ user.celular }}</div>
                  <div *ngIf="user.direccion"><i class="fas fa-map-marker-alt"></i> {{ user.direccion }}</div>
                </div>
              </td>
              
              <td>
                <span class="role-badge" [class]="'role-' + user.role.name.toLowerCase()">
                  {{ user.role.name }}
                </span>
              </td>
              
              <td>
                <div class="area-info">
                  <span *ngIf="user.area" class="area-badge" [class.inactive]="!user.area.activa">
                    {{ user.area.nombre }}
                  </span>
                  <span *ngIf="!user.area" class="no-area">Sin área</span>
                  <button class="btn-icon btn-small" (click)="openAreaAssignModal(user)" title="Asignar área">
                    <i class="fas fa-building"></i>
                  </button>
                </div>
              </td>
              
              <td>
                <div class="status-indicators">
                  <span class="status-badge" 
                        [class.success]="user.accountEnabled" 
                        [class.danger]="!user.accountEnabled">
                    {{ user.accountEnabled ? 'Habilitado' : 'Deshabilitado' }}
                  </span>
                  <span *ngIf="user.accountLocked" class="status-badge danger">
                    <i class="fas fa-lock"></i> Bloqueado
                  </span>
                  <span *ngIf="user.mustChangePassword" class="status-badge warning">
                    <i class="fas fa-key"></i> Cambiar contraseña
                  </span>
                </div>
              </td>
              
              <td>
                <div class="user-actions">
                  <button class="btn-icon" 
                          (click)="editUser(user)" 
                          title="Editar datos del usuario">
                    <i class="fas fa-user-edit"></i>
                  </button>
                  
                  <button class="btn-icon toggle-btn" 
                          [class.btn-danger]="user.accountEnabled"
                          [class.btn-success]="!user.accountEnabled"
                          (click)="toggleUserStatus(user)" 
                          [title]="user.accountEnabled ? 'Deshabilitar usuario' : 'Habilitar usuario'"
                          [attr.data-status]="user.accountEnabled ? 'enabled' : 'disabled'">
                    <i class="fas" [class.fa-user-slash]="user.accountEnabled" [class.fa-user-check]="!user.accountEnabled"></i>
                  </button>
                  
                  <button class="btn-icon toggle-btn" 
                          [class.btn-warning]="!user.accountLocked"
                          [class.btn-info]="user.accountLocked"
                          (click)="toggleUserLock(user)" 
                          [title]="user.accountLocked ? 'Desbloquear acceso' : 'Bloquear acceso'"
                          [attr.data-lock]="user.accountLocked ? 'locked' : 'unlocked'">
                    <i class="fas" [class.fa-lock-open]="user.accountLocked" [class.fa-user-lock]="!user.accountLocked"></i>
                  </button>
                  
                  <button class="btn-icon btn-secondary" 
                          (click)="openResetPasswordModal(user)" 
                          title="Restablecer contraseña">
                    <i class="fas fa-shield-alt"></i>
                  </button>
                  
                  <button class="btn-icon btn-danger" 
                          (click)="deleteUser(user)" 
                          title="Eliminar usuario permanentemente">
                    <i class="fas fa-user-times"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="users-cards-container mobile-only">
        <div class="user-card" *ngFor="let user of filteredUsers" [class.disabled-user]="!user.accountEnabled">
          <!-- Clean Header -->
          <div class="card-header">
            <div class="user-main">
              <div class="avatar-section">
                <img [src]="user.foto || '/assets/default-avatar.png'" 
                     [alt]="user.nombre" 
                     class="avatar"
                     onerror="this.src='/assets/default-avatar.png'">
                <div class="status-indicator" 
                     [class.active]="user.accountEnabled" 
                     [class.locked]="user.accountLocked"></div>
              </div>
              <div class="user-data">
                <h3>{{ user.nombre }} {{ user.apellidos }}</h3>
                <p class="username">{{ '@' + user.usuario }}</p>
                <p class="email">{{ user.correo }}</p>
                <p class="phone" *ngIf="user.celular">{{ user.celular }}</p>
              </div>
            </div>
          </div>

          <!-- Metadata -->
          <div class="card-content">
            <div class="info-row">
              <span class="info-label">Rol</span>
              <span class="role-tag" [class]="'role-' + user.role.name.toLowerCase()">
                {{ user.role.name }}
              </span>
            </div>
            
            <div class="info-row">
              <span class="info-label">Área</span>
              <div class="area-container">
                <span *ngIf="user.area" class="area-tag" [class.inactive]="!user.area.activa">
                  {{ user.area.nombre }}
                </span>
                <span *ngIf="!user.area" class="area-tag no-area">Sin área</span>
                <button class="edit-btn" (click)="openAreaAssignModal(user)" title="Cambiar área">
                  <i class="fas fa-building"></i>
                </button>
              </div>
            </div>

            <!-- Status Alerts -->
            <div class="alerts" *ngIf="user.accountLocked || user.mustChangePassword">
              <div *ngIf="user.accountLocked" class="alert locked">
                <i class="fas fa-lock"></i>
                <span>Usuario bloqueado</span>
              </div>
              <div *ngIf="user.mustChangePassword" class="alert password">
                <i class="fas fa-key"></i>
                <span>Debe cambiar contraseña</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="card-actions">
            <button class="action-btn primary" (click)="editUser(user)">
              <i class="fas fa-user-edit"></i>
              Editar Datos
            </button>
            
            <button class="action-btn" 
                    [class.enable]="!user.accountEnabled"
                    [class.disable]="user.accountEnabled"
                    (click)="toggleUserStatus(user)">
              <i class="fas" [class.fa-user-check]="!user.accountEnabled" [class.fa-user-slash]="user.accountEnabled"></i>
              {{ user.accountEnabled ? 'Deshabilitar' : 'Habilitar' }}
            </button>
            
            <button class="action-btn warning" 
                    (click)="toggleUserLock(user)">
              <i class="fas" [class.fa-lock-open]="user.accountLocked" [class.fa-user-lock]="!user.accountLocked"></i>
              {{ user.accountLocked ? 'Desbloquear' : 'Bloquear' }}
            </button>
            
            <button class="action-btn secondary" (click)="openResetPasswordModal(user)">
              <i class="fas fa-shield-alt"></i>
              Restablecer Contraseña
            </button>
            
            <button class="action-btn danger" (click)="deleteUser(user)">
              <i class="fas fa-user-times"></i>
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="showAreaModal" (click)="closeAreaModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Asignar Área</h2>
            <button class="btn-icon" (click)="closeAreaModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-content">
            <p>Usuario: <strong>{{ selectedUser?.nombre }} {{ selectedUser?.apellidos }}</strong></p>
            <p>Área actual: <strong>{{ selectedUser?.area?.nombre || 'Sin área asignada' }}</strong></p>
            
            <div class="form-group">
              <label for="areaSelect">Nueva área:</label>
              <select id="areaSelect" [(ngModel)]="selectedAreaId" class="form-control">
                <option value="">Sin área</option>
                <option *ngFor="let area of activeAreas" [value]="area.id">
                  {{ area.nombre }}
                </option>
              </select>
            </div>
            
            <div class="form-actions">
              <button class="btn-secondary" (click)="closeAreaModal()">
                Cancelar
              </button>
              <button class="btn-primary" (click)="assignArea()" [disabled]="isLoading">
                <i class="fas fa-save" *ngIf="!isLoading"></i>
                <i class="fas fa-spinner fa-spin" *ngIf="isLoading"></i>
                {{ isLoading ? 'Asignando...' : 'Asignar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-overlay" *ngIf="showCreateModal" (click)="closeCreateModal()">
        <div class="modal create-user-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>
              <i class="fas fa-user-plus"></i>
              Crear Nuevo Usuario
            </h2>
            <button class="btn-icon" (click)="closeCreateModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form [formGroup]="createUserForm" class="modal-content">
            <div class="form-row">
              <div class="form-group">
                <label for="nombre">Nombre <span class="required">*</span></label>
                <input type="text" id="nombre" formControlName="nombre" 
                       class="form-control" placeholder="Ingrese el nombre">
                <div class="error-message" *ngIf="createUserForm.get('nombre')?.invalid && createUserForm.get('nombre')?.touched">
                  El nombre es requerido
                </div>
              </div>
              
              <div class="form-group">
                <label for="apellidos">Apellidos <span class="required">*</span></label>
                <input type="text" id="apellidos" formControlName="apellidos" 
                       class="form-control" placeholder="Ingrese los apellidos">
                <div class="error-message" *ngIf="createUserForm.get('apellidos')?.invalid && createUserForm.get('apellidos')?.touched">
                  Los apellidos son requeridos
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="tipoDocumento">Tipo de Documento <span class="required">*</span></label>
                <select id="tipoDocumento" formControlName="tipoDocumento" class="form-control">
                  <option value="">Seleccione...</option>
                  <option value="DNI">DNI</option>
                  <option value="CE">Carnet de Extranjería</option>
                  <option value="PASAPORTE">Pasaporte</option>
                </select>
                <div class="error-message" *ngIf="createUserForm.get('tipoDocumento')?.invalid && createUserForm.get('tipoDocumento')?.touched">
                  El tipo de documento es requerido
                </div>
              </div>
              
              <div class="form-group">
                <label for="numDocumento">Número de Documento <span class="required">*</span></label>
                <input type="text" id="numDocumento" formControlName="numDocumento"
                       class="form-control" placeholder="Número de documento" maxlength="8">
                <div class="error-message" *ngIf="createUserForm.get('numDocumento')?.invalid && createUserForm.get('numDocumento')?.touched">
                  <span *ngIf="createUserForm.get('numDocumento')?.errors?.['required']">El número de documento es requerido</span>
                  <span *ngIf="createUserForm.get('numDocumento')?.errors?.['minlength'] || createUserForm.get('numDocumento')?.errors?.['maxlength']">Debe tener exactamente 8 dígitos</span>
                  <span *ngIf="createUserForm.get('numDocumento')?.errors?.['pattern']">Solo se permiten números</span>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="correo">Correo Electrónico <span class="required">*</span></label>
                <input type="email" id="correo" formControlName="correo" 
                       class="form-control" placeholder="ejemplo@correo.com">
                <div class="error-message" *ngIf="createUserForm.get('correo')?.invalid && createUserForm.get('correo')?.touched">
                  <span *ngIf="createUserForm.get('correo')?.errors?.['required']">El correo es requerido</span>
                  <span *ngIf="createUserForm.get('correo')?.errors?.['email']">Ingrese un correo válido</span>
                </div>
              </div>
            </div>

            <div class="auto-generate-info">
              <i class="fas fa-info-circle"></i>
              <span>El nombre de usuario y contraseña se generarán automáticamente</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="celular">Celular</label>
                <input type="text" id="celular" formControlName="celular"
                       class="form-control" placeholder="999999999" maxlength="9">
                <div class="error-message" *ngIf="createUserForm.get('celular')?.invalid && createUserForm.get('celular')?.touched">
                  <span *ngIf="createUserForm.get('celular')?.errors?.['minlength'] || createUserForm.get('celular')?.errors?.['maxlength']">Debe tener exactamente 9 dígitos</span>
                  <span *ngIf="createUserForm.get('celular')?.errors?.['pattern']">Solo se permiten números</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="direccion">Dirección</label>
                <input type="text" id="direccion" formControlName="direccion" 
                       class="form-control" placeholder="Dirección completa">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="roleId">Rol <span class="required">*</span></label>
                <select id="roleId" formControlName="roleId" class="form-control">
                  <option value="">Seleccione un rol...</option>
                  <option *ngFor="let role of roles" [value]="role.id">
                    {{ role.name }} - {{ role.description }}
                  </option>
                </select>
                <div class="error-message" *ngIf="createUserForm.get('roleId')?.invalid && createUserForm.get('roleId')?.touched">
                  El rol es requerido
                </div>
              </div>
              
              <div class="form-group">
                <label for="areaId">Área (Opcional)</label>
                <select id="areaId" formControlName="areaId" class="form-control">
                  <option value="">Sin área asignada</option>
                  <option *ngFor="let area of activeAreas" [value]="area.id">
                    {{ area.nombre }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-check">
                <input type="checkbox" id="mustChangePassword" formControlName="mustChangePassword" 
                       class="form-check-input">
                <label for="mustChangePassword" class="form-check-label">
                  El usuario debe cambiar contraseña en el primer inicio de sesión
                </label>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="closeCreateModal()">
                Cancelar
              </button>
              <button type="submit" class="btn-primary" 
                      (click)="createUser()" 
                      [disabled]="createUserForm.invalid || isLoading">
                <i class="fas fa-save" *ngIf="!isLoading"></i>
                <i class="fas fa-spinner fa-spin" *ngIf="isLoading"></i>
                {{ isLoading ? 'Creando...' : 'Crear Usuario' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="alert alert-success" *ngIf="successMessage">
        <i class="fas fa-check-circle"></i>
        {{ successMessage }}
      </div>
      
      <div class="alert alert-error" *ngIf="errorMessage">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage }}
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div class="modal-overlay" *ngIf="showResetPasswordModal" (click)="closeResetPasswordModal()">
      <div class="modal reset-password-modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>
            <i class="fas fa-key"></i>
            Cambiar Contraseña
          </h2>
          <button class="btn-icon" (click)="closeResetPasswordModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-content">
          <div class="user-info-section">
            <p><strong>Usuario:</strong> {{ selectedUserForPassword?.nombre }} {{ selectedUserForPassword?.apellidos }}</p>
            <p><strong>Email:</strong> {{ selectedUserForPassword?.correo }}</p>
          </div>
          
          <form [formGroup]="resetPasswordForm" (ngSubmit)="resetUserPassword()">
            <div class="form-group">
              <label for="newPassword">Nueva Contraseña (opcional)</label>
              <input type="password" 
                     id="newPassword" 
                     formControlName="newPassword"
                     class="form-control"
                     placeholder="Dejar vacío para generar automáticamente">
              <small class="help-text">Si no especificas una contraseña, se generará una automáticamente y se enviará por email.</small>
            </div>
            
            <div class="form-group">
              <label for="reason">Motivo del cambio (opcional)</label>
              <textarea id="reason" 
                       formControlName="reason"
                       class="form-control"
                       rows="3"
                       placeholder="Ej: Solicitud del usuario, política de seguridad, etc."></textarea>
            </div>
            
            <div class="form-check">
              <input type="checkbox" 
                     id="mustChangePasswordReset" 
                     formControlName="mustChangePassword"
                     class="form-check-input">
              <label for="mustChangePasswordReset" class="form-check-label">
                El usuario debe cambiar la contraseña en su próximo inicio de sesión
              </label>
            </div>
          </form>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="closeResetPasswordModal()">
            Cancelar
          </button>
          <button type="submit" 
                  class="btn-primary" 
                  (click)="resetUserPassword()"
                  [disabled]="resettingPassword">
            <i class="fas fa-key" *ngIf="!resettingPassword"></i>
            <i class="fas fa-spinner fa-spin" *ngIf="resettingPassword"></i>
            {{ resettingPassword ? 'Cambiando...' : 'Cambiar Contraseña' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div class="modal-overlay" *ngIf="showEditModal" (click)="closeEditModal()">
      <div class="modal edit-user-modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>
            <i class="fas fa-user-edit"></i>
            Editar Usuario
          </h2>
          <button class="btn-icon" (click)="closeEditModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form [formGroup]="editUserForm" class="modal-content">

          <div class="form-row">
            <div class="form-group">
              <label for="editNombre">Nombre <span class="required">*</span></label>
              <input type="text" id="editNombre" formControlName="nombre" 
                     class="form-control" placeholder="Ingrese el nombre">
              <div class="error-message" *ngIf="editUserForm.get('nombre')?.invalid && editUserForm.get('nombre')?.touched">
                El nombre es requerido
              </div>
            </div>
            
            <div class="form-group">
              <label for="editApellidos">Apellidos <span class="required">*</span></label>
              <input type="text" id="editApellidos" formControlName="apellidos" 
                     class="form-control" placeholder="Ingrese los apellidos">
              <div class="error-message" *ngIf="editUserForm.get('apellidos')?.invalid && editUserForm.get('apellidos')?.touched">
                Los apellidos son requeridos
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="editTipoDocumento">Tipo de Documento <span class="required">*</span></label>
              <select id="editTipoDocumento" formControlName="tipoDocumento" class="form-control">
                <option value="">Seleccione...</option>
                <option value="DNI">DNI</option>
                <option value="CE">Carnet de Extranjería</option>
                <option value="PASAPORTE">Pasaporte</option>
              </select>
              <div class="error-message" *ngIf="editUserForm.get('tipoDocumento')?.invalid && editUserForm.get('tipoDocumento')?.touched">
                El tipo de documento es requerido
              </div>
            </div>
            
            <div class="form-group">
              <label for="editNumDocumento">Número de Documento <span class="required">*</span></label>
              <input type="text" id="editNumDocumento" formControlName="numDocumento"
                     class="form-control" placeholder="Número de documento" maxlength="8">
              <div class="error-message" *ngIf="editUserForm.get('numDocumento')?.invalid && editUserForm.get('numDocumento')?.touched">
                <span *ngIf="editUserForm.get('numDocumento')?.errors?.['required']">El número de documento es requerido</span>
                <span *ngIf="editUserForm.get('numDocumento')?.errors?.['minlength'] || editUserForm.get('numDocumento')?.errors?.['maxlength']">Debe tener exactamente 8 dígitos</span>
                <span *ngIf="editUserForm.get('numDocumento')?.errors?.['pattern']">Solo se permiten números</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="editCorreo">Correo Electrónico <span class="required">*</span></label>
              <input type="email" id="editCorreo" formControlName="correo" 
                     class="form-control" placeholder="ejemplo@correo.com">
              <div class="error-message" *ngIf="editUserForm.get('correo')?.invalid && editUserForm.get('correo')?.touched">
                <span *ngIf="editUserForm.get('correo')?.errors?.['required']">El correo es requerido</span>
                <span *ngIf="editUserForm.get('correo')?.errors?.['email']">Ingrese un correo válido</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="editCelular">Celular</label>
              <input type="text" id="editCelular" formControlName="celular"
                     class="form-control" placeholder="999999999" maxlength="9">
              <div class="error-message" *ngIf="editUserForm.get('celular')?.invalid && editUserForm.get('celular')?.touched">
                <span *ngIf="editUserForm.get('celular')?.errors?.['minlength'] || editUserForm.get('celular')?.errors?.['maxlength']">Debe tener exactamente 9 dígitos</span>
                <span *ngIf="editUserForm.get('celular')?.errors?.['pattern']">Solo se permiten números</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="editDireccion">Dirección</label>
              <input type="text" id="editDireccion" formControlName="direccion" 
                     class="form-control" placeholder="Dirección completa">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="editRoleId">Rol <span class="required">*</span></label>
              <select id="editRoleId" formControlName="roleId" class="form-control">
                <option value="">Seleccione un rol...</option>
                <option *ngFor="let role of roles" [value]="role.id">
                  {{ role.name }} - {{ role.description }}
                </option>
              </select>
              <div class="error-message" *ngIf="editUserForm.get('roleId')?.invalid && editUserForm.get('roleId')?.touched">
                El rol es requerido
              </div>
            </div>
            
            <div class="form-group">
              <label for="editAreaId">Área</label>
              <select id="editAreaId" formControlName="areaId" class="form-control">
                <option value="">Sin área asignada</option>
                <option *ngFor="let area of activeAreas" [value]="area.id">
                  {{ area.nombre }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="closeEditModal()">
              Cancelar
            </button>
            <button type="submit" class="btn-primary" 
                    (click)="updateUser()" 
                    [disabled]="editUserForm.invalid || updatingUser">
              <i class="fas fa-save" *ngIf="!updatingUser"></i>
              <i class="fas fa-spinner fa-spin" *ngIf="updatingUser"></i>
              {{ updatingUser ? 'Actualizando...' : 'Actualizar Usuario' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .user-management-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header h1 {
      font-size: 28px;
      color: #2d3748;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 16px;
    }

    .search-filters {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      margin-bottom: 24px;
    }

    .search-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .search-box:focus-within {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .search-box i {
      position: absolute;
      left: 16px;
      color: #667eea;
      font-size: 16px;
    }

    .search-input {
      background: transparent;
      border: none;
      outline: none;
      padding: 16px 50px 16px 48px;
      font-size: 16px;
      width: 100%;
      min-width: 400px;
    }

    .clear-search {
      position: absolute;
      right: 16px;
      background: #e2e8f0;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #718096;
    }

    .clear-search:hover {
      background: #cbd5e0;
      color: #2d3748;
    }

    .search-results {
      text-align: center;
      color: #718096;
      font-size: 14px;
    }

    .filters {
      display: flex;
      gap: 24px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-group label {
      font-weight: 600;
      color: #2d3748;
      font-size: 14px;
    }

    .filter-select {
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      background: white;
      min-width: 180px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .filter-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .users-table-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;
    }

    .users-table th {
      background: #f7fafc;
      padding: 16px;
      text-align: left;
      font-weight: 600;
      color: #2d3748;
      border-bottom: 1px solid #e2e8f0;
    }

    .users-table td {
      padding: 16px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
    }

    .disabled-user {
      opacity: 0.6;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #e2e8f0;
    }

    .user-details strong {
      display: block;
      color: #2d3748;
      font-weight: 600;
    }

    .user-details small {
      color: #718096;
      font-size: 12px;
    }

    .contact-info div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-size: 13px;
      color: #4a5568;
    }

    .contact-info i {
      width: 12px;
      color: #a0aec0;
    }

    .role-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-admin {
      background: #fed7d7;
      color: #e53e3e;
    }

    .role-administrativo {
      background: #bee3f8;
      color: #3182ce;
    }

    .role-usuario {
      background: #c6f6d5;
      color: #38a169;
    }

    .area-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .area-badge {
      padding: 4px 8px;
      background: #e6fffa;
      color: #319795;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
    }

    .area-badge.inactive {
      background: #fed7d7;
      color: #e53e3e;
    }

    .no-area {
      color: #a0aec0;
      font-style: italic;
      font-size: 12px;
    }

    .status-indicators {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .status-badge {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .status-badge.success {
      background: #c6f6d5;
      color: #38a169;
    }

    .status-badge.danger {
      background: #fed7d7;
      color: #e53e3e;
    }

    .status-badge.warning {
      background: #faf089;
      color: #d69e2e;
    }

    .user-actions {
      display: flex;
      gap: 4px;
    }

    .btn-icon {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #4a5568;
      position: relative;
      overflow: hidden;
    }

    .btn-icon::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s;
    }

    .btn-icon:hover::before {
      left: 100%;
    }

    .btn-icon:hover {
      background: #667eea;
      border-color: #667eea;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .btn-icon.btn-small {
      width: 24px;
      height: 24px;
    }

    .btn-icon.btn-danger {
      color: #e53e3e;
    }

    .btn-icon.btn-danger {
      background: linear-gradient(135deg, #fed7d7, #feb2b2);
      color: #e53e3e;
      border-color: #f56565;
    }

    .btn-icon.btn-danger:hover {
      background: linear-gradient(135deg, #e53e3e, #c53030);
      border-color: #e53e3e;
      color: white;
      box-shadow: 0 4px 12px rgba(229, 62, 62, 0.4);
    }

    .btn-icon.btn-success {
      background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
      color: #38a169;
      border-color: #68d391;
    }

    .btn-icon.btn-success:hover {
      background: linear-gradient(135deg, #38a169, #2f855a);
      border-color: #38a169;
      color: white;
      box-shadow: 0 4px 12px rgba(56, 161, 105, 0.4);
    }

    .btn-icon.btn-warning {
      background: linear-gradient(135deg, #faf089, #f6e05e);
      color: #d69e2e;
      border-color: #ecc94b;
    }

    .btn-icon.btn-warning:hover {
      background: linear-gradient(135deg, #d69e2e, #b7791f);
      border-color: #d69e2e;
      color: white;
      box-shadow: 0 4px 12px rgba(214, 158, 46, 0.4);
    }

    .btn-icon.btn-info {
      background: linear-gradient(135deg, #bee3f8, #90cdf4);
      color: #3182ce;
      border-color: #63b3ed;
    }

    .btn-icon.btn-info:hover {
      background: linear-gradient(135deg, #3182ce, #2c5282);
      border-color: #3182ce;
      color: white;
      box-shadow: 0 4px 12px rgba(49, 130, 206, 0.4);
    }

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
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .modal-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    .modal-content p {
      margin-bottom: 12px;
      color: #4a5568;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #2d3748;
    }

    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .btn-primary {
      background: #667eea;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5a67d8;
    }

    .btn-primary:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #e2e8f0;
      color: #4a5568;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #cbd5e0;
    }

    .alert {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      z-index: 1001;
      min-width: 300px;
    }

    .alert-success {
      background: #f0fff4;
      color: #38a169;
      border: 1px solid #9ae6b4;
    }

    .alert-error {
      background: #fed7d7;
      color: #e53e3e;
      border: 1px solid #feb2b2;
    }

    /* Create User Modal Styles */
    .create-user-modal {
      max-width: 700px;
      max-height: 90vh;
      overflow-y: auto;
    }

    /* Edit User Modal Styles */
    .edit-user-modal {
      max-width: 700px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .user-info-section {
      background: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #667eea;
    }

    .user-info-section p {
      margin: 4px 0;
      font-size: 14px;
      color: #4a5568;
    }

    .user-info-section strong {
      color: #2d3748;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-row:last-child {
      grid-template-columns: 1fr;
    }

    .form-check {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .form-check-input {
      width: 18px;
      height: 18px;
      border: 2px solid #e2e8f0;
      border-radius: 4px;
      cursor: pointer;
    }

    .form-check-input:checked {
      background: #667eea;
      border-color: #667eea;
    }

    .form-check-label {
      font-size: 14px;
      color: #4a5568;
      cursor: pointer;
      margin: 0;
    }

    .required {
      color: #e53e3e;
    }

    .error-message {
      color: #e53e3e;
      font-size: 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .error-message::before {
      content: '⚠';
      font-size: 10px;
    }

    .auto-generate-info {
      background: #e6fffa;
      border: 1px solid #81e6d9;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #234e52;
      font-size: 14px;
    }

    .auto-generate-info i {
      color: #319795;
    }

    /* Desktop/Mobile Toggle - Fixed */
    .desktop-only {
      display: block;
    }

    .mobile-only {
      display: none;
    }

    /* Modern Mobile Cards */
    .users-cards-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .user-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e5e7eb;
      overflow: hidden;
      transition: all 0.2s ease;
      margin-bottom: 2px;
    }

    .card-header {
      padding: 16px;
      background: #fafbfc;
      border-bottom: 1px solid #e5e7eb;
    }

    .user-main {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .avatar-section {
      position: relative;
      flex-shrink: 0;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .status-indicator {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      background: #ef4444;
    }

    .status-indicator.active {
      background: #10b981;
    }

    .status-indicator.locked {
      background: #f59e0b;
    }

    .user-data {
      flex: 1;
      min-width: 0;
    }

    .user-data h3 {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 4px 0;
      line-height: 1.3;
    }

    .username {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 8px 0;
      font-weight: 500;
    }

    .email {
      font-size: 13px;
      color: #4b5563;
      margin: 0 0 2px 0;
    }

    .phone {
      font-size: 13px;
      color: #6b7280;
      margin: 0;
    }

    .card-content {
      padding: 12px 16px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .info-row:last-child {
      margin-bottom: 0;
    }

    .info-label {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
    }

    .role-tag {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .role-admin {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .role-administrativo {
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #dbeafe;
    }

    .role-usuario {
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #bbf7d0;
    }

    .area-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .area-tag {
      padding: 4px 10px;
      background: #f0f9ff;
      color: #0369a1;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
    }

    .area-tag.inactive {
      background: #fef2f2;
      color: #dc2626;
      border-color: #fecaca;
    }

    .area-tag.no-area {
      background: #f9fafb;
      color: #6b7280;
      border-color: #e5e7eb;
    }

    .edit-btn {
      background: none;
      border: none;
      color: #6b7280;
      padding: 4px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .edit-btn:hover {
      background: #f3f4f6;
      color: #374151;
    }

    .alerts {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .alert {
      padding: 8px 12px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
    }

    .alert.locked {
      background: #fffbeb;
      color: #d97706;
      border: 1px solid #fed7aa;
    }

    .alert.password {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .card-actions {
      padding: 12px 16px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .action-btn {
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      background: white;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #374151;
    }

    .action-btn:active {
      transform: scale(0.95);
    }

    .action-btn.primary {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .action-btn.primary:active {
      background: #2563eb;
    }

    .action-btn.enable {
      background: #f0fdf4;
      color: #16a34a;
      border-color: #bbf7d0;
    }

    .action-btn.enable:active {
      background: #dcfce7;
    }

    .action-btn.disable {
      background: #fef2f2;
      color: #dc2626;
      border-color: #fecaca;
    }

    .action-btn.disable:active {
      background: #fee2e2;
    }

    .action-btn.warning {
      background: #fffbeb;
      color: #d97706;
      border-color: #fed7aa;
    }

    .action-btn.warning:active {
      background: #fef3c7;
    }

    .action-btn.danger {
      grid-column: 1 / -1;
      background: #fef2f2;
      color: #dc2626;
      border-color: #fecaca;
      margin-top: 4px;
    }

    .action-btn.danger:active {
      background: #fee2e2;
    }

    /* Mobile Responsive - Proper Toggle */
    @media (max-width: 768px) {
      /* Hide desktop table completely on mobile */
      .desktop-only {
        display: none !important;
      }

      /* Show mobile cards only on mobile */
      .mobile-only {
        display: flex !important;
        flex-direction: column;
      }

      .user-management-container {
        padding: 12px;
      }

      .header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
        margin-bottom: 16px;
      }

      .header h1 {
        font-size: 22px;
        text-align: center;
      }

      .header-actions {
        justify-content: center;
      }

      .search-input {
        min-width: 100%;
        padding: 14px 50px 14px 48px;
        font-size: 16px;
      }

      .filters {
        flex-direction: column;
        gap: 12px;
      }

      .filter-select {
        min-width: 100%;
        font-size: 16px;
      }

      .modal {
        width: 95%;
        margin: 20px;
      }

      .create-user-modal {
        max-height: 85vh;
        width: 98%;
        margin: 10px;
      }

      .edit-user-modal {
        max-height: 85vh;
        width: 98%;
        margin: 10px;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .modal-header h2 {
        font-size: 16px;
      }

      .form-control {
        font-size: 16px;
        padding: 12px;
      }
    }

    /* Ensure desktop shows table on larger screens */
    @media (min-width: 769px) {
      .desktop-only {
        display: block !important;
      }

      .mobile-only {
        display: none !important;
      }
    }

    @media (max-width: 480px) {
      .users-cards-container {
        gap: 8px;
      }

      .card-header {
        padding: 16px;
      }

      .card-content {
        padding: 12px 16px;
      }

      .card-actions {
        padding: 12px 16px;
      }

      .user-data h3 {
        font-size: 16px;
      }

      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 12px;
      }

      .status-indicator {
        width: 14px;
        height: 14px;
      }

      .action-btn {
        padding: 8px 10px;
        font-size: 12px;
      }
    }

    /* Toggle Button Animations */
    .toggle-btn {
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .toggle-btn::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .toggle-btn:active::after {
      width: 300px;
      height: 300px;
    }

    .toggle-btn[data-status="enabled"] {
      animation: pulseEnabled 2s infinite;
    }

    .toggle-btn[data-lock="locked"] {
      animation: pulseLocked 2s infinite;
    }

    @keyframes pulseEnabled {
      0% {
        box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4);
      }
      70% {
        box-shadow: 0 0 0 6px rgba(229, 62, 62, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(229, 62, 62, 0);
      }
    }

    @keyframes pulseLocked {
      0% {
        box-shadow: 0 0 0 0 rgba(49, 130, 206, 0.4);
      }
      70% {
        box-shadow: 0 0 0 6px rgba(49, 130, 206, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(49, 130, 206, 0);
      }
    }
  `]
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
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
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
      error: (error) => {
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
      error: (error) => {
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
      next: (user) => {
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
      error: (error) => {
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
      error: (error) => {
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
        error: (error) => {
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
      next: (updatedUser) => {
        this.showSuccess('Área asignada correctamente');
        this.loadUsers();
        this.closeAreaModal();
        this.isLoading = false;
      },
      error: (error) => {
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
    if (!this.selectedUserForPassword || this.resetPasswordForm.invalid) {
      return;
    }

    this.resettingPassword = true;
    const token = localStorage.getItem('auth_token');
    const request = {
      newPassword: this.resetPasswordForm.value.newPassword,
      reason: this.resetPasswordForm.value.reason || 'Restablecida por administrador',
      mustChangePassword: this.resetPasswordForm.value.mustChangePassword || false
    };

    this.http.put(`${environment.apiUrl}/api/usuarios/${this.selectedUserForPassword.id}/admin-reset-password`, request, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (response: any) => {
        this.showSuccess('Contraseña restablecida correctamente');
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
      error: (error) => {
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
      next: (user) => {
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