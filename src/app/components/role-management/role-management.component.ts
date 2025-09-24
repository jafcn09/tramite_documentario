import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Role, RoleRequest } from './role.interface';
import { catchError, finalize, of } from 'rxjs';






@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <header class="header">
        <h1><i class="fas fa-university"></i>Gestión de Roles</h1>
        <button class="btn-primary" (click)="openCreateModal()">
          <i class="fas fa-plus-circle"></i>Nuevo Rol
        </button>
      </header>

      <section class="search-box">
        <div class="search-input-wrapper">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            (input)="filterRoles()" 
            placeholder="Buscar roles por nombre o descripción...">
          <button 
            *ngIf="searchTerm" 
            class="clear-btn" 
            (click)="clearSearch()">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
        <div *ngIf="searchTerm" class="search-results">
          <small class="results-count" [class.no-results]="!hasSearchResults()">
            {{ searchMessage() }}
          </small>
        </div>
      </section>

      <section class="table-wrapper" *ngIf="!isMobile()">
        <div class="table-info">
          <span>Mostrando {{ filteredRoles().length }} de {{ roles().length }} roles</span>
        </div>
        
        <table class="data-table">
          <thead>
            <tr>
              <th>Rol</th>
              <th>Descripción</th>
              <th>Usuarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let role of filteredRoles()">
              <td>
                <div class="role-cell">
                  <div class="role-icon" [class]="getRoleClass(role.name)">
                    <i [class]="getRoleIcon(role.name)"></i>
                  </div>
                  <div>
                    <strong>{{ role.name }}</strong>
                    <span class="badge" [class]="'badge-' + role.name.toLowerCase()">
                      {{ role.name.toUpperCase() }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="desc-cell">{{ role.description }}</td>
              <td class="center">
                <span class="count-badge">
                  {{ role.userCount }}
                </span>
              </td>
              <td class="center">
                <div class="action-group">
                  <button class="btn-icon edit" (click)="editRole(role)">
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button 
                    class="btn-icon delete" 
                    (click)="confirmDelete(role)"
                    [disabled]="role.userCount > 0">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="cards-wrapper" *ngIf="isMobile()">
        <article class="role-card" *ngFor="let role of filteredRoles()">
          <header class="card-header">
            <div class="role-icon-lg" [class]="getRoleClass(role.name)">
              <i [class]="getRoleIcon(role.name)"></i>
            </div>
            <div class="card-info">
              <h3>{{ role.name }}</h3>
              <span class="badge" [class]="'badge-' + role.name.toLowerCase()">
                {{ role.name.toUpperCase() }}
              </span>
              <p>{{ role.description }}</p>
            </div>
          </header>
          
          <div class="card-stats">
            <div class="stat">
              <span class="info-label">Usuarios:</span>
              <strong>{{ role.userCount }}</strong>
            </div>
          </div>
          
          <footer class="card-actions">
            <button class="btn-action primary" (click)="editRole(role)">
              <i class="fas fa-pencil-alt"></i>Editar
            </button>
            <button 
              class="btn-action danger" 
              (click)="confirmDelete(role)"
              [disabled]="role.userCount > 0">
              <i class="fas fa-trash-alt"></i>Eliminar
            </button>
          </footer>
        </article>
      </section>

      <div *ngIf="filteredRoles().length === 0" class="empty-state">
        <i class="fas fa-search"></i>
        <h3>No se encontraron roles</h3>
        <p>{{ searchTerm ? 'No hay coincidencias para "' + searchTerm + '"' : 'No hay roles registrados' }}</p>
        <button *ngIf="!searchTerm" class="btn-primary" (click)="openCreateModal()">
          <i class="fas fa-plus-circle"></i>Crear Primer Rol
        </button>
      </div>

      <div class="modal-overlay" *ngIf="showModal()" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <header class="modal-header">
            <h2>
              <i [class]="isEditing() ? 'fas fa-pencil-alt' : 'fas fa-plus-circle'"></i>
              {{ isEditing() ? 'Editar Rol' : 'Crear Nuevo Rol' }}
            </h2>
            <button class="btn-close" (click)="closeModal()">
              <i class="fas fa-times"></i>
            </button>
          </header>
          
          <form [formGroup]="roleForm" class="modal-body">
            <div class="form-field">
              <label>Nombre del Rol <span class="required">*</span></label>
              <input 
                type="text" 
                formControlName="name" 
                placeholder="Ej: Administrador"
                [class.error]="isFieldInvalid('name')">
              <span class="error-msg" *ngIf="isFieldInvalid('name')">
                {{ getFieldError('name') }}
              </span>
            </div>

            <div class="form-field">
              <label>Descripción <span class="required">*</span></label>
              <textarea 
                formControlName="description" 
                rows="3"
                placeholder="Describe las responsabilidades..."
                [class.error]="isFieldInvalid('description')"></textarea>
              <span class="error-msg" *ngIf="isFieldInvalid('description')">
                {{ getFieldError('description') }}
              </span>
            </div>
            
            <div class="modal-actions">
              <button type="button" class="btn-secondary" (click)="closeModal()">
                Cancelar
              </button>
              <button 
                type="button" 
                class="btn-primary" 
                (click)="saveRole()" 
                [disabled]="roleForm.invalid || isLoading()">
                <i [class]="isLoading() ? 'fas fa-spinner fa-spin' : 'fas fa-check-circle'"></i>
                {{ isLoading() ? 'Guardando...' : (isEditing() ? 'Actualizar' : 'Crear') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="showDeleteModal()" (click)="cancelDelete()">
        <div class="modal delete" (click)="$event.stopPropagation()">
          <header class="modal-header">
            <h2><i class="fas fa-exclamation-triangle"></i>Confirmar Eliminación</h2>
            <button class="btn-close" (click)="cancelDelete()">
              <i class="fas fa-times"></i>
            </button>
          </header>
          
          <div class="modal-body">
            <p>¿Eliminar el rol <strong>"{{ roleToDelete()?.name }}"</strong>?</p>
            <div class="warning" *ngIf="roleToDelete()?.userCount && roleToDelete()!.userCount > 0">
              <i class="fas fa-users"></i>
              <span>Este rol tiene {{ roleToDelete()?.userCount }} usuario(s) asignado(s).</span>
            </div>
            <p class="text-muted">Esta acción no se puede deshacer.</p>
          </div>
          
          <div class="modal-actions">
            <button class="btn-secondary" (click)="cancelDelete()">Cancelar</button>
            <button 
              class="btn-danger" 
              (click)="executeDelete()"
              [disabled]="(roleToDelete()?.userCount || 0) > 0">
              <i class="fas fa-trash"></i>Eliminar
            </button>
          </div>
        </div>
      </div>

      <div class="toast success" *ngIf="successMessage()">
        <i class="fas fa-check-circle"></i>{{ successMessage() }}
      </div>
      
      <div class="toast error" *ngIf="errorMessage()">
        <i class="fas fa-exclamation-circle"></i>{{ errorMessage() }}
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background: #f5f7fa;
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, #2c5aa0, #1e3a5f);
      padding: 20px 24px;
      border-radius: 8px;
      color: white;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(44,90,160,0.3);
    }

    .header h1 {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
    }

    .header h1 i { color: #ffd700; }

    .btn-primary {
      background: white;
      color: #2c5aa0;
      border: 2px solid white;
      padding: 10px 20px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
      font-size: 14px;
    }

    .btn-primary:hover:not(:disabled) {
      background: #f8f9ff;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .search-box {
      background: white;
      padding: 18px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px solid #d1d9e0;
      margin-bottom: 20px;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background: #fafbfc;
      border: 1px solid #d1d9e0;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .search-input-wrapper:focus-within {
      border-color: #2c5aa0;
      box-shadow: 0 0 0 2px rgba(44,90,160,0.1);
    }

    .search-input-wrapper i {
      position: absolute;
      left: 12px;
      color: #64748b;
    }

    .search-input-wrapper input {
      background: transparent;
      border: none;
      outline: none;
      padding: 12px 40px;
      font-size: 14px;
      width: 100%;
      color: #374151;
    }

    .clear-btn {
      position: absolute;
      right: 12px;
      background: #e2e8f0;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #718096;
      transition: all 0.3s;
    }

    .clear-btn:hover {
      background: #cbd5e0;
      color: #2d3748;
    }

    .search-results {
      margin-top: 12px;
      text-align: center;
    }

    .results-count {
      display: block;
      color: #718096;
      font-weight: 500;
    }

    .results-count.no-results {
      color: #dc2626;
      font-weight: 600;
    }

    .table-wrapper {
      background: white;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #d1d9e0;
    }

    .table-info {
      padding: 12px 20px;
      background: #f1f5f9;
      border-bottom: 2px solid #2c5aa0;
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background: #2c5aa0;
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: white;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .data-table td {
      padding: 14px 16px;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: middle;
      font-size: 14px;
    }

    .data-table tr:hover {
      background: #f8fafc;
    }

    .data-table tr:nth-child(even) {
      background: #fafbfc;
    }

    .role-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .role-icon {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      background: #2c5aa0;
      color: white;
    }

    .role-icon.admin { background: #f59e0b; }
    .role-icon.administrativo { background: #3b82f6; }
    .role-icon.usuario { background: #22c55e; }

    .badge {
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      width: fit-content;
    }

    .badge-admin {
      background: #fef9f2;
      color: #92400e;
      border: 1px solid #f59e0b;
    }

    .badge-administrativo {
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #3b82f6;
    }

    .badge-usuario {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #22c55e;
    }

    .desc-cell {
      max-width: 300px;
      color: #64748b;
      line-height: 1.5;
    }

    .center {
      text-align: center;
    }

    .count-badge {
      background: #f1f5f9;
      color: #374151;
      padding: 4px 12px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 13px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid #d1d5db;
    }

    .action-group {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .btn-icon {
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      color: #6b7280;
    }

    .btn-icon:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-icon:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-icon.edit {
      color: #2563eb;
    }

    .btn-icon.edit:hover:not(:disabled) {
      background: #eff6ff;
      border-color: #2563eb;
    }

    .btn-icon.delete {
      color: #dc2626;
    }

    .btn-icon.delete:hover:not(:disabled) {
      background: #fef2f2;
      border-color: #dc2626;
    }

    .cards-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .role-card {
      background: white;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px solid #d1d5db;
      overflow: hidden;
      transition: all 0.2s;
    }

    .role-card:hover {
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }

    .card-header {
      padding: 16px;
      background: #f8f9fa;
      border-bottom: 2px solid #2c5aa0;
      display: flex;
      gap: 12px;
    }

    .role-icon-lg {
      width: 48px;
      height: 48px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: #2c5aa0;
      color: white;
      flex-shrink: 0;
    }

    .card-info {
      flex: 1;
      min-width: 0;
    }

    .card-info h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 6px 0;
    }

    .card-info p {
      color: #64748b;
      font-size: 14px;
      line-height: 1.5;
      margin: 8px 0 0 0;
    }

    .card-stats {
      padding: 12px 16px;
    }

    .stat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
      color: #4b5563;
    }

    .info-label {
      font-weight: 500;
      color: #6b7280;
    }

    .stat strong {
      font-weight: 600;
      color: #1f2937;
      font-size: 16px;
    }

    .card-actions {
      padding: 12px 16px;
      background: #f8f9fa;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }

    .btn-action {
      flex: 1;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-action:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .btn-action.primary {
      background: #2c5aa0;
      color: white;
      border-color: #2c5aa0;
    }

    .btn-action.primary:hover:not(:disabled) {
      background: #1e3a5f;
    }

    .btn-action.danger {
      background: white;
      color: #dc2626;
      border-color: #d1d5db;
    }

    .btn-action.danger:hover:not(:disabled) {
      background: #fef2f2;
      border-color: #dc2626;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #64748b;
    }

    .empty-state i {
      font-size: 48px;
      color: #cbd5e0;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 20px;
      font-weight: 600;
      color: #374151;
      margin: 0 0 8px 0;
    }

    .empty-state p {
      margin: 0 0 24px 0;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 6px;
      width: 90%;
      max-width: 480px;
      max-height: 85vh;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .modal.delete {
      max-width: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 2px solid #2c5aa0;
      background: linear-gradient(135deg, #2c5aa0, #1e3a5f);
    }

    .modal-header h2 {
      font-size: 16px;
      font-weight: 600;
      color: white;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-close {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-close:hover {
      background: rgba(255,255,255,0.3);
    }

    .modal-body {
      padding: 24px;
    }

    .form-field {
      margin-bottom: 20px;
    }

    .form-field label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #374151;
      font-size: 14px;
    }

    .form-field input,
    .form-field textarea {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.2s;
      background: white;
      font-family: inherit;
    }

    .form-field input:focus,
    .form-field textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    }

    .form-field input.error,
    .form-field textarea.error {
      border-color: #dc2626;
      box-shadow: 0 0 0 3px rgba(220,38,38,0.1);
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    .required {
      color: #dc2626;
    }

    .error-msg {
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .error-msg::before {
      content: '⚠';
      font-size: 10px;
    }

    .modal-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }

    .btn-secondary {
      background: white;
      color: #6b7280;
      border: 1px solid #d1d5db;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }

    .btn-secondary:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .btn-danger {
      background: #dc2626;
      color: white;
      border: 1px solid #dc2626;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
      font-size: 14px;
    }

    .btn-danger:hover:not(:disabled) {
      background: #b91c1c;
    }

    .btn-danger:disabled {
      background: #9ca3af;
      border-color: #9ca3af;
      cursor: not-allowed;
    }

    .warning {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 12px 16px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #92400e;
    }

    .warning i {
      color: #f59e0b;
      font-size: 16px;
    }

    .text-muted {
      color: #6b7280;
      font-size: 14px;
      font-style: italic;
    }

    .toast {
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
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease;
    }

    .toast.success {
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #bbf7d0;
    }

    .toast.error {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 16px;
      }

      .header {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .header h1 {
        justify-content: center;
      }

      .modal {
        width: 95%;
        margin: 10px;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 12px;
      }

      .card-actions {
        flex-direction: column;
      }

      .btn-action {
        width: 100%;
      }
    }
  `]
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
    console.log('Loading roles with token:', token ? 'present' : 'missing');
    this.http.get<Role[]>(`${environment.apiUrl}/api/roles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe(
      catchError(err => {
        console.error('Error loading roles:', err);
        this.showError('Error al cargar los roles');
        return of([]);
      })
    ).subscribe(roles => {
      console.log('Received roles:', roles);
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