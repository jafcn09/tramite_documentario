import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <button class="back-btn" (click)="goBack()" title="Volver">
          <i class="fas fa-arrow-left"></i>
          <span>Volver</span>
        </button>

        <div class="profile-info">
          <div class="avatar-section">
            <div class="avatar-container" [class.uploading]="isUploadingPhoto">
              <img
                [src]="currentUser?.foto || '/assets/default-avatar.png'"
                [alt]="currentUser?.nombre"
                class="profile-avatar"
                onerror="this.src='/assets/default-avatar.png'"
              >
              <div class="upload-overlay" *ngIf="isUploadingPhoto">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Subiendo...</span>
              </div>
              <input type="file"
                     #fileInput
                     accept="image/*"
                     (change)="onFileSelected($event)"
                     style="display: none;">
              <button class="avatar-edit-btn"
                      [title]="updateAttempts >= 2 ? 'Límite de actualizaciones alcanzado' : 'Cambiar foto'"
                      (click)="fileInput.click()"
                      [disabled]="updateAttempts >= 2 || isUploadingPhoto">
                <i class="fas"
                   [class.fa-camera]="!isUploadingPhoto"
                   [class.fa-spinner]="isUploadingPhoto"
                   [class.fa-spin]="isUploadingPhoto"></i>
              </button>
            </div>
            <div class="online-indicator"></div>
          </div>

          <div class="user-details">
            <h1 class="user-name">{{ currentUser?.nombre }} {{ currentUser?.apellidos }}</h1>
            <p class="user-role">{{ currentUser?.role?.name }}</p>
            <p class="user-email">{{ currentUser?.correo }}</p>

            <div class="profile-stats">
              <div class="stat-item">
                <i class="fas fa-calendar"></i>
                <span>Miembro desde {{ getJoinDate() }}</span>
              </div>
              <div class="stat-item" *ngIf="currentUser?.role?.name">
                <i class="fas fa-shield-alt"></i>
                <span>{{ getRoleDescription() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-content">
        <div class="profile-grid">
          <div class="profile-card user-info-full">
            <div class="card-header">
              <h2>
                <i class="fas fa-user"></i>
                Información del Usuario
              </h2>
              <button class="edit-btn" 
                      [title]="updateAttempts >= 2 ? 'Límite de ediciones alcanzado' : 'Editar información'" 
                      (click)="toggleEditMode()" 
                      [disabled]="updateAttempts >= 2"
                      [class.disabled]="updateAttempts >= 2">
                <i class="fas" [class.fa-edit]="!isEditMode" [class.fa-times]="isEditMode" [class.fa-lock]="updateAttempts >= 2"></i>
              </button>
            </div>
            
            <div class="card-content">
              <div class="alert alert-success" *ngIf="successMessage">
                <i class="fas fa-check-circle"></i>
                {{ successMessage }}
              </div>
              
              <div class="alert alert-error" *ngIf="errorMessages['general']">
                <i class="fas fa-exclamation-circle"></i>
                {{ errorMessages['general'] }}
              </div>
              
              <form [formGroup]="editForm" *ngIf="isEditMode" class="edit-form">
                <div class="info-grid-full">
                  <div class="info-item">
                    <label>Nombres</label>
                    <input type="text" class="form-control readonly" [value]="currentUser?.nombre" disabled>
                  </div>
                  <div class="info-item">
                    <label>Apellidos</label>
                    <input type="text" class="form-control readonly" [value]="currentUser?.apellidos" disabled>
                  </div>
                  <div class="info-item">
                    <label>Correo Electrónico</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      formControlName="correo"
                      [class.error]="editForm.get('correo')?.invalid && editForm.get('correo')?.touched"
                      placeholder="Ingrese correo electrónico"
                    >
                    <span class="error-message" *ngIf="(editForm.get('correo')?.invalid && editForm.get('correo')?.touched) || errorMessages['correo']">
                      <i class="fas fa-exclamation-circle"></i>
                      {{ getErrorMessage('correo') }}
                    </span>
                  </div>
                  <div class="info-item">
                    <label>Usuario</label>
                    <input type="text" class="form-control readonly" [value]="currentUser?.usuario" disabled>
                  </div>
                  <div class="info-item">
                    <label>Teléfono</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      formControlName="celular"
                      [class.error]="editForm.get('celular')?.invalid && editForm.get('celular')?.touched"
                      placeholder="Ingrese número de teléfono"
                      maxlength="9"
                    >
                    <span class="error-message" *ngIf="(editForm.get('celular')?.invalid && editForm.get('celular')?.touched) || errorMessages['celular']">
                      <i class="fas fa-exclamation-circle"></i>
                      {{ getErrorMessage('celular') }}
                    </span>
                  </div>
                  <div class="info-item">
                    <label>Dirección</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="direccion"
                      [class.error]="editForm.get('direccion')?.invalid && editForm.get('direccion')?.touched"
                      placeholder="Ingrese dirección"
                    >
                    <span class="error-message" *ngIf="(editForm.get('direccion')?.invalid && editForm.get('direccion')?.touched) || errorMessages['direccion']">
                      <i class="fas fa-exclamation-circle"></i>
                      {{ getErrorMessage('direccion') }}
                    </span>
                  </div>
                  <div class="info-item">
                    <label>Tipo de Documento</label>
                    <input type="text" class="form-control readonly" [value]="currentUser?.tipoDocumento" disabled>
                  </div>
                  <div class="info-item">
                    <label>Número de Documento</label>
                    <input type="text" class="form-control readonly" [value]="currentUser?.numDocumento" disabled>
                  </div>
                  
                  <div class="form-actions">
                    <button type="button" class="btn-secondary" (click)="cancelEdit()" [disabled]="isUpdating">
                      <i class="fas fa-times"></i>
                      Cancelar
                    </button>
                    <button type="button" class="btn-primary" (click)="saveProfile()" [disabled]="editForm.invalid || isUpdating">
                      <i class="fas fa-save" *ngIf="!isUpdating"></i>
                      <i class="fas fa-spinner fa-spin" *ngIf="isUpdating"></i>
                      {{ isUpdating ? 'Guardando...' : 'Guardar Cambios' }}
                    </button>
                  </div>
                </div>
              </form>
              
              <div class="info-grid-full" *ngIf="!isEditMode">
                <div class="info-item">
                  <label>Nombres</label>
                  <div class="value">{{ currentUser?.nombre || 'No especificado' }}</div>
                </div>
                <div class="info-item">
                  <label>Apellidos</label>
                  <div class="value">{{ currentUser?.apellidos || 'No especificado' }}</div>
                </div>
                <div class="info-item">
                  <label>Correo Electrónico</label>
                  <div class="value email">
                    <i class="fas fa-envelope"></i>
                    {{ currentUser?.correo }}
                  </div>
                </div>
                <div class="info-item">
                  <label>Usuario</label>
                  <div class="value">
                    <i class="fas fa-at"></i>
                    {{ currentUser?.usuario }}
                  </div>
                </div>
                <div class="info-item">
                  <label>Teléfono</label>
                  <div class="value">
                    <i class="fas fa-phone"></i>
                    {{ currentUser?.celular || 'No especificado' }}
                  </div>
                </div>
                <div class="info-item">
                  <label>Dirección</label>
                  <div class="value">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ currentUser?.direccion || 'No especificada' }}
                  </div>
                </div>
                <div class="info-item">
                  <label>Tipo de Documento</label>
                  <div class="value">{{ currentUser?.tipoDocumento || 'No especificado' }}</div>
                </div>
                <div class="info-item">
                  <label>Número de Documento</label>
                  <div class="value">
                    <i class="fas fa-id-card"></i>
                    {{ currentUser?.numDocumento || 'No especificado' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

    

          <div class="profile-card activity-info">
            <div class="card-header">
              <h2>
                <i class="fas fa-chart-line"></i>
                Actividad Reciente
              </h2>
            </div>
            
            <div class="card-content">
              <div class="activity-list">
                <div class="activity-item">
                  <div class="activity-icon login">
                    <i class="fas fa-sign-in-alt"></i>
                  </div>
                  <div class="activity-details">
                    <span class="activity-title">Último inicio de sesión</span>
                    <span class="activity-time">Hoy, {{ getCurrentTime() }}</span>
                  </div>
                </div>
                
                <div class="activity-item">
                  <div class="activity-icon profile">
                    <i class="fas fa-user-edit"></i>
                  </div>
                  <div class="activity-details">
                    <span class="activity-title">Perfil visualizado</span>
                    <span class="activity-time">Hace unos segundos</span>
                  </div>
                </div>
                
                <div class="activity-item">
                  <div class="activity-icon security">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <div class="activity-details">
                    <span class="activity-title">Sesión activa</span>
                    <span class="activity-time">Estado: Segura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      background: #f8fafc;
    }

    .profile-header {
      position: relative;
      background: white;
      padding: 24px 32px 32px;
      margin-bottom: 24px;
    }

    .back-btn {
      background: transparent;
      border: none;
      color: #64748B;
      padding: 8px 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.2s ease;
      margin-bottom: 24px;
    }

    .back-btn:hover {
      color: #1E293B;
      gap: 12px;
    }

    .back-btn i {
      font-size: 14px;
    }

    .profile-info {
      display: flex;
      align-items: flex-start;
      gap: 24px;
    }

    .avatar-section {
      position: relative;
      flex-shrink: 0;
    }

    .avatar-container {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid #F1F5F9;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      background: white;
    }

    .profile-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-edit-btn {
      position: absolute;
      bottom: 5px;
      right: 5px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #4F46E5;
      border: 3px solid white;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
    }

    .avatar-edit-btn:hover:not(:disabled) {
      background: #4338CA;
      transform: scale(1.05);
    }

    .avatar-edit-btn:disabled {
      background: #a0aec0;
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
    }

    .upload-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      border-radius: 50%;
      font-size: 14px;
    }

    .upload-overlay i {
      font-size: 18px;
      margin-bottom: 5px;
    }

    .upload-overlay span {
      font-size: 12px;
    }

    .avatar-container.uploading .profile-avatar {
      opacity: 0.5;
    }

    .online-indicator {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 18px;
      height: 18px;
      background: #10B981;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }

    .user-details {
      flex: 1;
      padding-top: 8px;
    }

    .user-name {
      font-size: 28px;
      font-weight: 700;
      color: #1E293B;
      margin: 0 0 6px 0;
      line-height: 1.3;
    }

    .user-role {
      display: inline-block;
      font-size: 13px;
      color: #6366F1;
      font-weight: 600;
      margin: 0 0 8px 0;
      padding: 4px 12px;
      background: #EEF2FF;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .user-email {
      font-size: 15px;
      color: #64748B;
      margin: 0 0 16px 0;
    }

    .profile-stats {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #64748B;
      font-size: 14px;
    }

    .stat-item i {
      color: #94A3B8;
      width: 16px;
    }

    .profile-content {
      padding: 0 20px;
    }

    .profile-grid {
      display: grid;
      gap: 25px;
      margin-bottom: 30px;
    }

    .user-info-full {
      grid-column: 1 / -1;
    }

    .profile-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .profile-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }

    .card-header {
      padding: 25px 25px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .card-header h2 {
      font-size: 20px;
      font-weight: 600;
      color: #1a202c;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .card-header h2 i {
      color: #6366F1;
      font-size: 18px;
    }

    .edit-btn {
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #718096;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .edit-btn:hover:not(:disabled) {
      background: #6366F1;
      border-color: #6366F1;
      color: white;
      transform: scale(1.1);
    }
    
    .edit-btn:disabled, .edit-btn.disabled {
      background: #e2e8f0;
      border-color: #cbd5e0;
      color: #a0aec0;
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
    }
    
    .edit-btn:disabled .fa-lock {
      color: #e53e3e;
    }

    .card-content {
      padding: 25px;
    }

    .info-grid {
      display: grid;
      gap: 20px;
    }

    .info-grid-full {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .info-item label {
      font-size: 13px;
      font-weight: 600;
      color: #64748B;
      text-transform: none;
      letter-spacing: 0px;
      margin-bottom: 2px;
    }

    .info-item .value {
      font-size: 15px;
      color: #1E293B;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      background: #F8FAFC;
      border-radius: 8px;
      border: 1px solid #E2E8F0;
      transition: all 0.2s ease;
    }

    .info-item .value:hover {
      background: #F1F5F9;
      border-color: #CBD5E0;
    }

    .info-item .value i {
      color: #64748B;
      width: 16px;
      font-size: 14px;
    }

    .info-item .value.email {
      color: #6366F1;
    }

    .security-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
      font-family: inherit;
    }

    .action-btn.primary {
      background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
      color: white;
    }

    .action-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
    }

    .action-btn.danger {
      background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
      color: white;
    }

    .action-btn.danger:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(245, 101, 101, 0.3);
    }

    .action-btn i {
      font-size: 24px;
      width: 24px;
    }

    .btn-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .btn-title {
      font-size: 16px;
      font-weight: 600;
    }

    .btn-desc {
      font-size: 14px;
      opacity: 0.9;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: #f7fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .activity-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
    }

    .activity-icon.login {
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    }

    .activity-icon.profile {
      background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    }

    .activity-icon.security {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    }

    .activity-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .activity-title {
      font-size: 16px;
      font-weight: 500;
      color: #2d3748;
    }

    .activity-time {
      font-size: 14px;
      color: #718096;
    }

    .profile-actions {
      padding: 0 20px 30px;
      display: flex;
      justify-content: center;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 32px;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 50px;
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;
      font-family: inherit;
      font-size: 16px;
    }

    .back-btn:hover {
      background: #667eea;
      border-color: #667eea;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .profile-container {
        margin: 0;
        background: white;
      }

      .profile-header {
        padding: 20px 20px 24px;
        margin-bottom: 16px;
      }

      .back-btn {
        font-size: 14px;
        margin-bottom: 20px;
      }

      .profile-info {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 16px;
      }

      .avatar-container {
        width: 100px;
        height: 100px;
        border: 3px solid #F1F5F9;
      }

      .avatar-edit-btn {
        width: 32px;
        height: 32px;
        font-size: 13px;
        bottom: 3px;
        right: 3px;
      }

      .online-indicator {
        width: 16px;
        height: 16px;
        border: 2.5px solid white;
        top: 6px;
        right: 6px;
      }

      .user-details {
        padding-top: 0;
      }

      .user-name {
        font-size: 22px;
      }

      .user-role {
        font-size: 12px;
        padding: 3px 10px;
      }

      .user-email {
        font-size: 14px;
      }

      .profile-stats {
        justify-content: center;
        gap: 16px;
      }

      .stat-item {
        font-size: 13px;
      }

      .profile-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .profile-content {
        padding: 0 16px;
      }

      .card-header {
        padding: 20px 20px 0;
      }

      .card-header h2 {
        font-size: 18px;
      }

      .card-content {
        padding: 20px;
      }

      .info-grid-full {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .info-item label {
        font-size: 12px;
      }

      .info-item .value {
        font-size: 14px;
        padding: 10px 12px;
      }

      .form-control {
        font-size: 14px;
        padding: 10px 12px;
      }

      .profile-actions {
        padding: 0 16px 20px;
      }

      .activity-item {
        padding: 12px;
      }

      .activity-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }

      .activity-title {
        font-size: 14px;
      }

      .activity-time {
        font-size: 12px;
      }
    }

    @media (max-width: 480px) {
      .profile-header {
        padding: 16px 16px 20px;
      }

      .back-btn {
        font-size: 13px;
        margin-bottom: 16px;
      }

      .back-btn span {
        display: none;
      }

      .avatar-container {
        width: 90px;
        height: 90px;
      }

      .avatar-edit-btn {
        width: 28px;
        height: 28px;
        font-size: 12px;
        bottom: 2px;
        right: 2px;
      }

      .online-indicator {
        width: 14px;
        height: 14px;
        border: 2px solid white;
        top: 5px;
        right: 5px;
      }

      .user-name {
        font-size: 20px;
      }

      .user-role {
        font-size: 11px;
        padding: 3px 8px;
      }

      .user-email {
        font-size: 13px;
      }

      .profile-stats {
        gap: 12px;
      }

      .stat-item {
        font-size: 12px;
      }

      .profile-content {
        padding: 0 12px;
      }

      .card-header {
        padding: 16px 16px 0;
      }

      .card-header h2 {
        font-size: 16px;
        gap: 8px;
      }

      .card-content {
        padding: 16px;
      }

      .info-item label {
        font-size: 11px;
      }

      .info-item .value {
        font-size: 13px;
        padding: 9px 10px;
      }

      .form-control {
        font-size: 13px;
        padding: 9px 10px;
      }

      .action-btn {
        padding: 14px;
      }

      .btn-title {
        font-size: 14px;
      }

      .btn-desc {
        font-size: 12px;
      }

      .activity-item {
        padding: 10px;
        gap: 12px;
      }

      .activity-icon {
        width: 36px;
        height: 36px;
        font-size: 14px;
      }

      .form-actions {
        flex-direction: column;
        gap: 8px;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
        justify-content: center;
        padding: 10px 20px;
        font-size: 14px;
      }
    }

    .form-control {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid #E2E8F0;
      border-radius: 8px;
      font-size: 15px;
      color: #1E293B;
      background: white;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #6366F1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      background: #FAFBFC;
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

    .error-message i {
      font-size: 12px;
    }

    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 500;
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

    .edit-form {
      margin: 0;
    }

    .form-actions {
      grid-column: 1 / -1;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 20px;
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
      background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
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
      correo: ['', [Validators.email]], // Optional
      celular: ['', [Validators.pattern('^9[0-9]{8}$')]], // Optional
      direccion: ['', [Validators.maxLength(200)]] // Optional, removed minLength
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
    
    // Debug: Monitor token every 5 seconds
    setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('TOKEN LOST at:', new Date().toLocaleTimeString());
      }
    }, 5000);
  }

  toggleEditMode() {
    console.log('toggleEditMode called, current mode:', this.isEditMode);
    console.log('Update attempts:', this.updateAttempts);
    
    // Check if limit reached
    if (this.updateAttempts >= 2) {
      console.log('Edit limit reached, blocking toggle');
      this.setError('general', 'Límite de ediciones alcanzado. Solo se permiten 2 actualizaciones.');
      return;
    }
    
    const tokenAtToggle = localStorage.getItem('token');
    console.log('Token at toggle:', tokenAtToggle ? 'Present' : 'Missing');
    
    this.isEditMode = !this.isEditMode;
    console.log('New edit mode:', this.isEditMode);
    this.clearMessages();
    
    if (this.isEditMode && this.currentUser) {
      console.log('Setting form values for user:', this.currentUser);
      this.editForm.patchValue({
        correo: this.currentUser.correo,
        celular: this.currentUser.celular || '',
        direccion: this.currentUser.direccion || ''
      });
      this.editForm.markAsUntouched();
      
      const tokenAfterPatch = localStorage.getItem('token');
      console.log('Token after form patch:', tokenAfterPatch ? 'Present' : 'Missing');
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
      console.log('saveProfile called');
      console.log('Form valid:', this.editForm.valid);
      console.log('Form value:', this.editForm.value);
      console.log('Is updating:', this.isUpdating);
      console.log('Current user:', this.currentUser);
      console.log('Current user ID:', this.currentUser?.id);
      console.log('Current user role:', this.currentUser?.role);
      
      // Debug localStorage
      const storedUser = localStorage.getItem('current_user');
      const storedToken = localStorage.getItem('auth_token');
      console.log('Stored user in localStorage:', storedUser);
      console.log('Has token in localStorage:', !!storedToken);
      
      if (this.editForm.invalid || this.isUpdating) {
        console.log('Form invalid or updating, stopping');
        this.editForm.markAllAsTouched();
        return;
      }
    } catch (error) {
      console.error('Error at start of saveProfile:', error);
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
      // Use the correct token key
      let token = localStorage.getItem('auth_token'); // This is the correct key
      if (!token) {
        token = localStorage.getItem('token'); // Fallback
      }
      
      console.log('Token from localStorage:', token ? 'Present' : 'Missing');
      console.log('Token length:', token?.length);
      console.log('All localStorage keys:', Object.keys(localStorage));
      
      if (!token) {
        this.setError('general', 'No se encontró el token de autenticación. Revise la consola para más detalles.');
        console.log('No token found in any storage');
        return;
      }

      if (!this.currentUser || !this.currentUser.id) {
        this.setError('general', 'No se pudo obtener la información del usuario');
        return;
      }

      // Build update data, only including fields with values
      const updateData: any = {};
      
      // TEST: Send only one field at a time to isolate the problem
      const correo = this.editForm.value.correo?.trim();
      const celular = this.editForm.value.celular?.trim();
      const direccion = this.editForm.value.direccion?.trim();
      
      // For debugging, let's try correo first, then celular
      if (correo && correo !== this.currentUser?.correo) {
        updateData.correo = correo.toLowerCase();
        console.log('Sending only correo for testing:', updateData.correo);
      } else if (direccion && direccion !== this.currentUser?.direccion) {
        updateData.direccion = direccion;
        console.log('Sending only direccion for testing:', updateData.direccion);
      } else if (celular && celular !== this.currentUser?.celular) {
        // Test with a different phone format to rule out validation issues
        const testCelular = celular;
        updateData.celular = testCelular;
        console.log('Sending celular for testing:', updateData.celular);
      }
      
      console.log('Data to send:', updateData);
      console.log('Fields included:', Object.keys(updateData));
      
      // Check if there's actually something to update
      if (Object.keys(updateData).length === 0) {
        this.setError('general', 'No hay cambios para guardar');
        this.isUpdating = false;
        return;
      }

      const apiUrl = `${environment.apiUrl}/api/usuarios/${this.currentUser.id}`;
      console.log('Making API call to:', apiUrl);
      console.log('With data:', updateData);
      console.log('With headers Authorization Bearer:', token ? token.substring(0, 20) + '...' : 'No token');
      
      // First, let's test if we can GET the user data with this token
      try {
        console.log('Testing GET request first...');
        const getUserResponse = await this.http.get<any>(apiUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).toPromise();
        console.log('GET request successful:', getUserResponse);
      } catch (getError: any) {
        console.error('GET request failed:', getError);
        console.error('GET error status:', getError.status);
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
        console.log('Update response from server:', response);
        this.successMessage = 'Perfil actualizado correctamente';
        
        // Use the complete user object from server response
        this.currentUser = response as User;
        console.log('Updated currentUser:', this.currentUser);
        
        // Update localStorage with the new user data
        localStorage.setItem('current_user', JSON.stringify(this.currentUser));
        console.log('Updated localStorage with:', this.currentUser);
        
        // Update the AuthService's current user subject
        (this.authService as any).currentUserSubject?.next(this.currentUser);
        
        // Update the form with the new values from server
        this.editForm.patchValue({
          correo: this.currentUser.correo || '',
          celular: this.currentUser.celular || '',
          direccion: this.currentUser.direccion || ''
        });
        console.log('Form updated with values:', {
          correo: this.currentUser.correo,
          celular: this.currentUser.celular,
          direccion: this.currentUser.direccion
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

    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.setError('general', 'Por favor seleccione un archivo de imagen válido');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.setError('general', 'El archivo no puede ser mayor a 5MB');
      return;
    }

    this.selectedPhotoFile = file;
    this.uploadPhoto();
  }

  async uploadPhoto() {
    if (!this.selectedPhotoFile || !this.currentUser) return;

    // Check update attempts limit
    if (this.updateAttempts >= 2) {
      this.setError('general', 'Límite de ediciones alcanzado. Solo se permiten 2 actualizaciones.');
      return;
    }

    try {
      this.isUploadingPhoto = true;
      this.clearMessages();

      // Convert file to base64
      const base64Photo = await this.convertFileToBase64(this.selectedPhotoFile);
      
      console.log('Uploading photo for user:', this.currentUser.id);
      
      // Get token
      let token = localStorage.getItem('auth_token');
      if (!token) {
        this.setError('general', 'No se encontró el token de autenticación');
        return;
      }

      // Prepare update data with photo
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
        console.log('Photo update response:', response);
        this.successMessage = 'Foto actualizada correctamente';
        
        // Update the current user with new photo
        this.currentUser = response as User;
        
        // Update localStorage
        localStorage.setItem('current_user', JSON.stringify(this.currentUser));
        
        // Update AuthService
        (this.authService as any).currentUserSubject?.next(this.currentUser);
        
        this.updateAttempts++;
        this.selectedPhotoFile = null;

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }

    } catch (error: any) {
      console.error('Error uploading photo:', error);
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
        // Remove the data:image/...;base64, prefix
        const base64 = result.split(',')[1];
        resolve(`data:${file.type};base64,${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private handleUpdateError(error: any) {
    console.error('Error completo:', error);
    console.error('Status:', error.status);
    console.error('Error body:', error.error);
    console.error('Error message:', error.error?.message);
    console.error('Error details:', error.error?.error);
    
    if (error.status === 400) {
      // Try to show the specific error message from backend
      const backendMessage = error.error?.message || error.error?.error || 'Datos inválidos';
      this.setError('general', `Error del servidor: ${backendMessage}`);
      // Additional 400 error handling
      console.log('Handling 400 error with more detail');
    } else if (error.status === 401) {
      this.setError('general', 'No autorizado. Verifique sus permisos');
      console.error('Error 401:', error);
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
    const roleRoutes: { [key: string]: string } = {
      'ADMIN': '/admin/tablero',
      'ADMINISTRATIVO': '/administrativo/tablero',
      'USUARIO': '/usuario/tablero',
    };
    return roleRoutes[this.currentUser?.role?.name || ''] || '/';
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