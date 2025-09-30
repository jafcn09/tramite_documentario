import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Areas, Usuario } from './areas.interface';



@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="areas-container">
      <div class="header">
        <h1>
          <i class="fas fa-building"></i>
          Gestión de Áreas
        </h1>
        <button class="btn-primary" (click)="openCreateModal()">
          <i class="fas fa-plus"></i>
          Nueva Área
        </button>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" 
                 placeholder="Buscar áreas por nombre..." 
                 [(ngModel)]="searchTerm" 
                 (input)="filterAreas()"
                 class="search-input">
          <button *ngIf="searchTerm" 
                  class="clear-search" 
                  (click)="clearSearch()"
                  title="Limpiar búsqueda">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Search Results Message -->
      <div class="search-results" *ngIf="searchTerm && filteredAreas.length === 0">
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>No se encontraron áreas que coincidan con "{{ searchTerm }}"</p>
          <button class="btn-secondary" (click)="clearSearch()">Ver todas las áreas</button>
        </div>
      </div>

      <div class="search-info" *ngIf="searchTerm && filteredAreas.length > 0">
        <p>Mostrando {{ paginatedAreas.length }} de {{ filteredAreas.length }} resultado(s) para "{{ searchTerm }}"</p>
        <button class="btn-link" (click)="clearSearch()">Ver todas</button>
      </div>

      <div class="areas-grid">
        <div class="area-card" *ngFor="let area of paginatedAreas">
          <div class="area-header">
            <div class="area-info" (click)="selectArea(area)">
              <h3>{{ area.nombre }}</h3>
              <p>{{ area.descripcion || 'Sin descripción' }}</p>
            </div>
            <div class="area-actions-menu">
              <button class="menu-trigger" (click)="toggleMenu(area.id); $event.stopPropagation()" title="Opciones">
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div class="dropdown-menu" *ngIf="openMenuId === area.id" (click)="$event.stopPropagation()">
                <button class="dropdown-item" (click)="editArea(area); closeMenu()">
                  <i class="fas fa-edit"></i>
                  Editar
                </button>
                <button class="dropdown-item" (click)="toggleAreaStatus(area); closeMenu()">
                  <i [class]="area.activa ? 'fas fa-toggle-off' : 'fas fa-toggle-on'"></i>
                  {{ area.activa ? 'Desactivar' : 'Activar' }}
                </button>
                <button class="dropdown-item delete" (click)="confirmDeleteArea(area); closeMenu()">
                  <i class="fas fa-trash"></i>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          
          <div class="area-stats">
            <div class="stat">
              <i class="fas fa-users"></i>
              <span>{{ area.usuariosCount }} usuarios</span>
            </div>
            <div class="stat">
              <i class="fas fa-circle" [class.text-success]="area.activa" [class.text-danger]="!area.activa"></i>
              <span>{{ area.activa ? 'Activa' : 'Inactiva' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination" *ngIf="totalPages > 1">
        <button class="pagination-btn" 
                (click)="goToPage(currentPage - 1)" 
                [disabled]="currentPage === 1">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <span class="pagination-info">
          {{ currentPage }} de {{ totalPages }} ({{ totalAreas }} área(s))
        </span>
        
        <button class="pagination-btn" 
                (click)="goToPage(currentPage + 1)" 
                [disabled]="currentPage === totalPages">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Modal for Create/Edit Area -->
      <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ isEditing ? 'Editar Área' : 'Nueva Área' }}</h2>
            <button class="btn-icon modal-close" (click)="closeModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form [formGroup]="areaForm" (ngSubmit)="saveArea()">
            <div class="form-group">
              <label for="nombre">Nombre del Área *</label>
              <input type="text" 
                     id="nombre" 
                     formControlName="nombre" 
                     placeholder="Ingrese el nombre del área"
                     [class.error]="areaForm.get('nombre')?.invalid && areaForm.get('nombre')?.touched">
              <div class="error-message" *ngIf="areaForm.get('nombre')?.invalid && areaForm.get('nombre')?.touched">
                <span *ngIf="areaForm.get('nombre')?.errors?.['required']">El nombre es obligatorio</span>
                <span *ngIf="areaForm.get('nombre')?.errors?.['maxlength']">El nombre no puede tener más de 100 caracteres</span>
              </div>
            </div>

            <div class="form-group">
              <label for="descripcion">Descripción</label>
              <textarea id="descripcion" 
                        formControlName="descripcion" 
                        placeholder="Ingrese la descripción del área"
                        rows="3"
                        [class.error]="areaForm.get('descripcion')?.invalid && areaForm.get('descripcion')?.touched">
              </textarea>
              <div class="error-message" *ngIf="areaForm.get('descripcion')?.invalid && areaForm.get('descripcion')?.touched">
                <span *ngIf="areaForm.get('descripcion')?.errors?.['maxlength']">La descripción no puede tener más de 500 caracteres</span>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="activa">
                <span>Área activa</span>
              </label>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="closeModal()">
                Cancelar
              </button>
              <button type="submit" class="btn-primary" [disabled]="areaForm.invalid || isLoading">
                <i class="fas fa-save" *ngIf="!isLoading"></i>
                <i class="fas fa-spinner fa-spin" *ngIf="isLoading"></i>
                {{ isLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Area Detail Modal -->
      <div class="modal-overlay" *ngIf="showDetailModal" (click)="closeDetailModal()">
        <div class="modal modal-large" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>
              <i class="fas fa-building"></i>
              {{ selectedArea?.nombre }}
            </h2>
            <button class="btn-icon modal-close" (click)="closeDetailModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="area-detail-content">
            <div class="area-info-section">
              <div class="info-item">
                <label>Descripción:</label>
                <p>{{ selectedArea?.descripcion || 'Sin descripción' }}</p>
              </div>
              <div class="info-item">
                <label>Estado:</label>
                <span class="status-badge" [class.active]="selectedArea?.activa" [class.inactive]="!selectedArea?.activa">
                  <i class="fas fa-circle"></i>
                  {{ selectedArea?.activa ? 'Activa' : 'Inactiva' }}
                </span>
              </div>
            </div>
            
            <div class="users-section">
              <h3>
                <i class="fas fa-users"></i>
                Usuarios Asignados ({{ areaUsers.length }})
              </h3>
              
              <div class="users-list" *ngIf="areaUsers.length > 0; else noUsers">
                <div class="user-card" *ngFor="let user of areaUsers">
                  <div class="user-avatar">
                    <img *ngIf="user.foto" [src]="user.foto" [alt]="user.nombre">
                    <i *ngIf="!user.foto" class="fas fa-user"></i>
                  </div>
                  <div class="user-info">
                    <div class="user-name">{{ user.nombre }} {{ user.apellidos }}</div>
                    <div class="user-details">
                      <span class="user-email">{{ user.correo }}</span>
                      <span class="user-role">{{ user.role.name }}</span>
                    </div>
                    <div class="user-status">
                      <span class="status-indicator" [class.enabled]="user.accountEnabled" [class.disabled]="!user.accountEnabled">
                        {{ user.accountEnabled ? 'Habilitado' : 'Deshabilitado' }}
                      </span>
                      <span *ngIf="user.accountLocked" class="locked">Bloqueado</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <ng-template #noUsers>
                <div class="no-users">
                  <i class="fas fa-user-slash"></i>
                  <p>No hay usuarios asignados a esta área</p>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal-overlay" *ngIf="showDeleteModal" (click)="cancelDelete()">
        <div class="modal modal-small" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>
              <i class="fas fa-exclamation-triangle text-warning"></i>
              Confirmar eliminación
            </h2>
            <button class="btn-icon modal-close" (click)="cancelDelete()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="delete-content">
            <p>¿Estás seguro de que deseas eliminar el área <strong>"{{ areaToDelete?.nombre }}"</strong>?</p>
            <div class="warning-box" *ngIf="areaToDelete && areaToDelete.usuariosCount && areaToDelete.usuariosCount > 0">
              <i class="fas fa-users"></i>
              <span>Esta área tiene {{ areaToDelete?.usuariosCount }} usuario(s) asignado(s). No se puede eliminar.</span>
            </div>
            <p class="warning-text">Esta acción no se puede deshacer.</p>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="cancelDelete()">
              Cancelar
            </button>
            <button type="button" 
                    class="btn-danger" 
                    (click)="executeDelete()"
                    [disabled]="!!(areaToDelete && areaToDelete.usuariosCount && areaToDelete.usuariosCount > 0)">
              <i class="fas fa-trash"></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <!-- Alert Messages -->
      <div class="alert alert-success" *ngIf="successMessage">
        <i class="fas fa-check-circle"></i>
        {{ successMessage }}
      </div>
      
      <div class="alert alert-error" *ngIf="errorMessage">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .areas-container {
      padding: 24px;
      max-width: 1200px;
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
    }

    .areas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }
    
    @media (max-width: 768px) {
      .areas-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }

    .area-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }

    .area-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }

    .area-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .area-info h3 {
      font-size: 18px;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 8px 0;
    }

    .area-info p {
      color: #718096;
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }

    .area-actions-menu {
      position: relative;
    }

    .menu-trigger {
      background: transparent;
      border: none;
      color: #718096;
      font-size: 18px;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
    }

    .menu-trigger:hover {
      background: #f0f4f8;
      color: #2c5aa0;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 1px solid #e2e8f0;
      min-width: 160px;
      z-index: 10;
      margin-top: 4px;
      overflow: hidden;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 16px;
      background: transparent;
      border: none;
      color: #2d3748;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
      border-bottom: 1px solid #f7fafc;
    }

    .dropdown-item:last-child {
      border-bottom: none;
    }

    .dropdown-item:hover {
      background: #f7fafc;
      color: #2c5aa0;
    }

    .dropdown-item.delete {
      color: #dc3545;
    }

    .dropdown-item.delete:hover {
      background: #fff5f5;
      color: #c53030;
    }

    .dropdown-item i {
      width: 16px;
      text-align: center;
    }

    .area-stats {
      display: flex;
      gap: 20px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #4a5568;
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
      transform: translateY(-1px);
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

    .btn-icon {
      background: transparent;
      border: none;
      border-radius: 4px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #4a5568;
    }

    .btn-icon:hover {
      background: #f0f4f8;
      color: #2c5aa0;
    }

    .btn-icon.modal-close {
      width: 32px;
      height: 32px;
      border: 1px solid #e2e8f0;
      background: #f7fafc;
    }

    .btn-icon.modal-close:hover {
      background: #e2e8f0;
      color: #4a5568;
    }

    .text-success {
      color: #38a169;
    }

    .text-danger {
      color: #e53e3e;
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
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .modal-header h2 {
      font-size: 20px;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    @media (max-width: 768px) {
      .modal-header {
        margin-bottom: 16px;
        position: sticky;
        top: 0;
        background: white;
        z-index: 1;
        padding-bottom: 16px;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .modal-header h2 {
        font-size: 18px;
        flex: 1;
        margin-right: 16px;
        word-break: break-word;
      }
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #2d3748;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-group input.error,
    .form-group textarea.error {
      border-color: #e53e3e;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      width: auto;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    .error-message {
      color: #e53e3e;
      font-size: 12px;
      margin-top: 4px;
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

    /* Search Styles */
    .search-container {
      margin-bottom: 24px;
    }

    .search-box {
      position: relative;
      max-width: 400px;
    }

    .search-box i.fas.fa-search {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #a0aec0;
      z-index: 1;
    }

    .search-input {
      width: 100%;
      padding: 12px 12px 12px 40px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .clear-search {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
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
      transition: all 0.3s ease;
    }

    .clear-search:hover {
      background: #cbd5e0;
    }

    .search-results {
      margin-bottom: 24px;
    }

    .no-results {
      text-align: center;
      padding: 40px 20px;
      background: #f7fafc;
      border-radius: 12px;
      border: 2px dashed #e2e8f0;
    }

    .no-results i {
      font-size: 48px;
      color: #a0aec0;
      margin-bottom: 16px;
    }

    .no-results p {
      color: #718096;
      margin-bottom: 16px;
      font-size: 16px;
    }

    .search-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding: 12px 16px;
      background: #edf2f7;
      border-radius: 8px;
    }

    .search-info p {
      margin: 0;
      color: #4a5568;
      font-size: 14px;
    }

    .btn-link {
      background: none;
      border: none;
      color: #667eea;
      text-decoration: underline;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-link:hover {
      color: #5a67d8;
    }

    /* Pagination Styles */
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 32px;
      padding: 20px 0;
    }

    .pagination-btn {
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #4a5568;
    }

    .pagination-btn:hover:not(:disabled) {
      background: #667eea;
      border-color: #667eea;
      color: white;
    }

    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-info {
      color: #4a5568;
      font-weight: 500;
      font-size: 14px;
    }

    /* Area Card Hover Effect */
    .area-info {
      cursor: pointer;
    }

    /* Modal Large */
    .modal-large {
      max-width: 800px;
      width: 95%;
    }

    @media (max-width: 768px) {
      .modal-large {
        width: 98%;
        max-width: 100vw;
        max-height: 95vh;
        margin: 2.5vh 1vw;
      }
      
      .modal {
        padding: 16px;
        border-radius: 8px;
      }
    }

    /* Area Detail Styles */
    .area-detail-content {
      max-height: 70vh;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .area-detail-content {
        max-height: 80vh;
      }
    }

    .area-info-section {
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
    }

    .info-item {
      margin-bottom: 16px;
    }

    .info-item label {
      font-weight: 600;
      color: #2d3748;
      display: block;
      margin-bottom: 4px;
    }

    .info-item p {
      color: #4a5568;
      margin: 0;
    }

    @media (max-width: 768px) {
      .area-info-section {
        margin-bottom: 16px;
        padding-bottom: 16px;
      }
      
      .info-item {
        margin-bottom: 12px;
      }
      
      .info-item p {
        font-size: 14px;
        line-height: 1.5;
      }
      
      .users-section h3 {
        font-size: 16px;
        margin-bottom: 12px;
      }
      
      .status-badge {
        font-size: 11px;
        padding: 3px 10px;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.active {
      background: #c6f6d5;
      color: #22543d;
    }

    .status-badge.inactive {
      background: #fed7d7;
      color: #742a2a;
    }

    .users-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .users-list {
      display: grid;
      gap: 12px;
    }

    .user-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f7fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    @media (max-width: 768px) {
      .user-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 16px 12px;
      }
      
      .user-avatar {
        align-self: center;
        margin-bottom: 8px;
      }
      
      .user-info {
        text-align: center;
        width: 100%;
      }
      
      .user-details {
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .user-status {
        justify-content: center;
        gap: 12px;
      }
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-avatar i {
      color: #a0aec0;
      font-size: 18px;
    }

    .user-info {
      flex: 1;
    }

    .user-name {
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 4px;
    }

    .user-details {
      display: flex;
      gap: 12px;
      margin-bottom: 4px;
    }

    .user-email {
      color: #4a5568;
      font-size: 13px;
    }

    .user-role {
      color: #667eea;
      font-size: 13px;
      font-weight: 500;
    }

    .user-status {
      display: flex;
      gap: 8px;
    }

    .status-indicator {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 12px;
      font-weight: 500;
    }

    .status-indicator.enabled {
      background: #c6f6d5;
      color: #22543d;
    }

    .status-indicator.disabled {
      background: #fed7d7;
      color: #742a2a;
    }

    .status-indicator.locked {
      background: #fbb6ce;
      color: #702459;
    }

    .no-users {
      text-align: center;
      padding: 40px 20px;
      color: #718096;
    }

    .no-users i {
      font-size: 48px;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    .no-users p {
      margin: 0;
    }

    /* Delete Modal Styles */
    .modal-small {
      max-width: 500px;
      width: 90%;
    }

    .delete-content {
      margin-bottom: 24px;
    }

    .delete-content p {
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .warning-box {
      background: #fef5e7;
      border: 1px solid #f6ad55;
      border-radius: 8px;
      padding: 12px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #c05621;
    }

    .warning-box i {
      font-size: 16px;
    }

    .warning-text {
      color: #718096;
      font-size: 13px;
      margin-top: 8px !important;
    }

    .text-warning {
      color: #d69e2e;
    }

    .btn-danger {
      background: #e53e3e;
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

    .btn-danger:hover:not(:disabled) {
      background: #c53030;
      transform: translateY(-1px);
    }

    .btn-danger:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }
  `]
})
export class AreasComponent implements OnInit {
  areas: Areas[] = [];
  filteredAreas: Areas[] = [];
  paginatedAreas: Areas[] = [];
  showModal = false;
  showDetailModal = false;
  showDeleteModal = false;
  isEditing = false;
  isLoading = false;
  currentArea: Areas | null = null;
  selectedArea: Areas | null = null;
  areaToDelete: Areas | null = null;
  areaUsers: Usuario[] = [];
  areaForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  openMenuId: number | null = null;

  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  totalAreas = 0;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.areaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(500)]],
      activa: [true]
    });
  }

  ngOnInit() {
    this.loadAreas();
  }

  loadAreas() {
    const token = localStorage.getItem('auth_token');
    this.http.get<Areas[]>(`${environment.apiUrl}/api/areas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (areas) => {
        this.areas = areas;
        this.filterAreas();
      },
      error: (error) => {
        this.showError('Error al cargar las áreas');
        console.error('Error loading areas:', error);
      }
    });
  }

  openCreateModal() {
    this.isEditing = false;
    this.currentArea = null;
    this.areaForm.reset({ activa: true });
    this.showModal = true;
  }

  editArea(area: Areas) {
    this.isEditing = true;
    this.currentArea = area;
    this.areaForm.patchValue(area);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.clearMessages();
  }

  saveArea() {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const token = localStorage.getItem('auth_token');
    const areaData = this.areaForm.value;

    const request = this.isEditing
      ? this.http.put<Areas>(`${environment.apiUrl}/api/areas/${this.currentArea!.id}`, areaData, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      : this.http.post<Areas>(`${environment.apiUrl}/api/areas`, areaData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

    request.subscribe({
      next: (area) => {
        this.showSuccess(this.isEditing ? 'Área actualizada correctamente' : 'Área creada correctamente');
        this.loadAreas();
        this.closeModal();
        this.isLoading = false;
      },
      error: (error) => {
        this.showError(error.error?.error || 'Error al guardar el área');
        this.isLoading = false;
      }
    });
  }

  toggleAreaStatus(area: Areas) {
    const token = localStorage.getItem('auth_token');
    this.http.put<Areas>(`${environment.apiUrl}/api/areas/${area.id}/toggle-status`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (updatedArea) => {
        this.showSuccess(`Área ${updatedArea.activa ? 'activada' : 'desactivada'} correctamente`);
        this.loadAreas();
      },
      error: (error) => {
        this.showError('Error al cambiar el estado del área');
        console.error('Error toggling area status:', error);
      }
    });
  }

  confirmDeleteArea(area: Areas) {
    this.areaToDelete = area;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.areaToDelete = null;
  }

  executeDelete() {
    if (!this.areaToDelete) return;

    const token = localStorage.getItem('auth_token');
    this.http.delete(`${environment.apiUrl}/api/areas/${this.areaToDelete.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.showSuccess('Área eliminada correctamente');
        this.loadAreas();
        this.cancelDelete();
      },
      error: (error) => {
        this.showError(error.error?.error || 'Error al eliminar el área');
        this.cancelDelete();
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

  private showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  filterAreas() {
    if (!this.searchTerm.trim()) {
      this.filteredAreas = [...this.areas];
    } else {
      this.filteredAreas = this.areas.filter(area =>
        area.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (area.descripcion && area.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
    
    this.totalAreas = this.filteredAreas.length;
    this.totalPages = Math.ceil(this.totalAreas / this.itemsPerPage);
    
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    
    this.updatePaginatedAreas();
  }

  updatePaginatedAreas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAreas = this.filteredAreas.slice(startIndex, endIndex);
  }

  clearSearch() {
    this.searchTerm = '';
    this.currentPage = 1;
    this.filterAreas();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedAreas();
    }
  }

  selectArea(area: Areas) {
    this.selectedArea = area;
    this.loadAreaUsers(area.id);
    this.showDetailModal = true;
  }

  loadAreaUsers(areaId: number) {
    const token = localStorage.getItem('auth_token');
    console.log('Loading users for area ID:', areaId);
    this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuario-area/area/${areaId}/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (users) => {
        console.log('Received area users:', users);
        this.areaUsers = users;
      },
      error: (error) => {
        console.error('Error loading area users:', error);
        this.areaUsers = [];
      }
    });
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedArea = null;
    this.areaUsers = [];
  }

  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  toggleMenu(areaId: number) {
    this.openMenuId = this.openMenuId === areaId ? null : areaId;
  }

  closeMenu() {
    this.openMenuId = null;
  }
}