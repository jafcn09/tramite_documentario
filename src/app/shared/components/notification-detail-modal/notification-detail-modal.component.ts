import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
import { AuthService } from '../../../services/auth.service';
import { Notificacion } from '../../../components/notificaciones/notificacion.interface';

@Component({
  selector: 'app-notification-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="modal-backdrop" (click)="closeModal()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        
        <div *ngIf="cargando" class="loading">
          <i class="fas fa-spinner fa-spin"></i>
          <span>Cargando...</span>
        </div>

        <div *ngIf="error" class="error">
          <i class="fas fa-exclamation-triangle"></i>
          <p>{{ error }}</p>
          <button class="retry-btn" (click)="loadNotification()">Reintentar</button>
        </div>

        <div *ngIf="notificacion && !cargando && !error" class="notification-content">
          <div class="header">
            <div class="type-indicator" [ngClass]="'type-' + notificacion.tipo.toLowerCase()">
              <i [class]="getIcono(notificacion.tipo)"></i>
            </div>
            <div class="title-section">
              <h3>{{ notificacion.titulo }}</h3>
              <div class="meta">
                <span class="time">{{ formatearTiempo(notificacion.fechaCreacion) }}</span>
                <span class="priority" [ngClass]="'priority-' + notificacion.prioridad.toLowerCase()">
                  {{ notificacion.prioridad }}
                </span>
              </div>
            </div>
            <button class="close-btn" (click)="closeModal()">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="message">
            {{ notificacion.mensaje }}
          </div>

          <div class="actions">
            <button *ngIf="!notificacion.esLeida" class="action-btn mark-read" (click)="marcarComoLeida()">
              <i class="fas fa-check"></i>
              Marcar leída
            </button>
            
            <button *ngIf="notificacion.rutaDestino" class="action-btn view-content" (click)="irARutaDestino()">
              <i class="fas fa-external-link-alt"></i>
              Ver contenido
            </button>

            <button *ngIf="shouldShowTramiteButton()" class="action-btn view-tramite" (click)="verTramite()">
              <i class="fas fa-file-alt"></i>
              Ver trámite
            </button>

            <button class="action-btn delete" (click)="confirmDelete()">
              <i class="fas fa-trash-alt"></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="showDeleteConfirm" class="confirm-backdrop" (click)="cancelDelete()">
      <div class="confirm-dialog" (click)="$event.stopPropagation()">
        <div class="confirm-content">
          <i class="fas fa-trash-alt delete-icon"></i>
          <h4>¿Eliminar notificación?</h4>
          <p>Esta acción no se puede deshacer</p>
          <div class="confirm-actions">
            <button class="cancel-btn" (click)="cancelDelete()">Cancelar</button>
            <button class="delete-btn" (click)="executeDelete()">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-card {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 480px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: slideUp 0.3s ease-out;
      overflow: hidden;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .loading, .error {
      padding: 40px;
      text-align: center;
    }

    .loading {
      color: #6c757d;
    }

    .loading i {
      font-size: 24px;
      margin-bottom: 12px;
      color: #007bff;
    }

    .error i {
      font-size: 32px;
      color: #dc3545;
      margin-bottom: 16px;
    }

    .error p {
      margin: 8px 0 20px;
      color: #6c757d;
    }

    .retry-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .retry-btn:hover {
      background: #0056b3;
    }

    .notification-content {
      padding: 24px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;
    }

    .type-indicator {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .type-indicator i {
      font-size: 18px;
      color: white;
    }

    .type-tramite_nuevo, .type-tramite_creado {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .type-tramite_derivado, .type-derivacion {
      background: linear-gradient(135deg, #f093fb, #f5576c);
    }

    .type-sistema {
      background: linear-gradient(135deg, #4facfe, #00f2fe);
    }

    .title-section {
      flex: 1;
    }

    .title-section h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: #2c3e50;
      line-height: 1.4;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
    }

    .time {
      color: #8e9aaf;
    }

    .priority {
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 10px;
      letter-spacing: 0.5px;
    }

    .priority-alta {
      background: #ffeaea;
      color: #d32f2f;
    }

    .priority-normal {
      background: #fff3cd;
      color: #856404;
    }

    .priority-baja {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .close-btn {
      background: none;
      border: none;
      color: #8e9aaf;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: #f1f3f4;
      color: #5f6368;
    }

    .message {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      color: #495057;
      line-height: 1.5;
      font-size: 14px;
      margin-bottom: 20px;
      border-left: 3px solid #e9ecef;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .action-btn {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      color: #495057;
    }

    .action-btn:hover {
      background: #e9ecef;
    }

    .action-btn i {
      font-size: 12px;
    }

    .mark-read {
      background: #d4edda;
      border-color: #c3e6cb;
      color: #155724;
    }

    .mark-read:hover {
      background: #c3e6cb;
    }

    .view-content, .view-tramite {
      background: #cce5ff;
      border-color: #99ccff;
      color: #004085;
    }

    .view-content:hover, .view-tramite:hover {
      background: #99ccff;
    }

    .delete {
      background: #f8d7da;
      border-color: #f1aeb5;
      color: #721c24;
    }

    .delete:hover {
      background: #f1aeb5;
    }

    .confirm-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
      animation: fadeIn 0.15s ease-out;
    }

    .confirm-dialog {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 380px;
      box-shadow: 0 25px 80px rgba(0,0,0,0.4);
      animation: slideUp 0.25s ease-out;
    }

    .confirm-content {
      padding: 32px 24px 24px;
      text-align: center;
    }

    .delete-icon {
      font-size: 32px;
      color: #dc3545;
      margin-bottom: 16px;
    }

    .confirm-content h4 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .confirm-content p {
      margin: 0 0 24px 0;
      color: #6c757d;
      font-size: 14px;
    }

    .confirm-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .cancel-btn, .delete-btn {
      padding: 10px 24px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .cancel-btn {
      background: #f8f9fa;
      color: #6c757d;
      border: 1px solid #dee2e6;
    }

    .cancel-btn:hover {
      background: #e9ecef;
    }

    .delete-btn {
      background: #dc3545;
      color: white;
    }

    .delete-btn:hover {
      background: #c82333;
    }

    @media (max-width: 640px) {
      .modal-card {
        width: 95%;
        margin: 20px 0;
      }

      .notification-content {
        padding: 20px;
      }

      .actions {
        flex-direction: column;
      }

      .action-btn {
        justify-content: center;
      }

      .confirm-actions {
        flex-direction: column;
      }
    }
  `]
})
export class NotificationDetailModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() notificationId: number | null = null;
  @Output() modalClosed = new EventEmitter<void>();

  notificacion: Notificacion | null = null;
  cargando = false;
  error = '';
  showDeleteConfirm = false;

  constructor(
    private router: Router,
    private notificacionService: NotificacionService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notificationId'] && this.notificationId && this.isVisible) {
      this.loadNotification();
    }
    if (changes['isVisible'] && !this.isVisible) {
      this.resetState();
    }
  }

  loadNotification(): void {
    if (!this.notificationId) return;
    this.cargando = true;
    this.error = '';
    this.notificacionService.obtenerNotificacionPorId(this.notificationId).subscribe({
      next: (notificacion) => {
        this.notificacion = notificacion;
        this.cargando = false;
        if (!notificacion.esLeida) {
          this.marcarComoLeida();
        }
      },
      error: () => {
        this.error = 'Error al cargar la notificación';
        this.cargando = false;
      }
    });
  }

  closeModal(): void {
    this.modalClosed.emit();
  }

  resetState(): void {
    this.notificacion = null;
    this.cargando = false;
    this.error = '';
    this.showDeleteConfirm = false;
  }

  marcarComoLeida(): void {
    if (!this.notificacion) return;
    this.notificacionService.marcarComoLeida(this.notificacion.id).subscribe({
      next: () => {
        if (this.notificacion) {
          this.notificacion.esLeida = true;
          this.notificacion.fechaLectura = new Date();
          this.notificacionService.actualizarContadorNoLeidas();
        }
      }
    });
  }

  confirmDelete(): void {
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  executeDelete(): void {
    if (!this.notificacion) return;
    this.notificacionService.eliminarNotificacionUsuario(this.notificacion.id).subscribe({
      next: () => {
        this.closeModal();
      }
    });
  }

  irARutaDestino(): void {
    this.closeModal();

    this.authService.currentUser.subscribe(user => {
      if (!user) return;

      const role = user.role?.name;

      // Redirigir según el rol del usuario
      if (role === 'ADMIN') {
        this.router.navigate(['/admin/tramites']);
      } else if (role === 'ADMINISTRATIVO') {
        this.router.navigate(['/administrativo/mis-tramites']);
      } else if (role === 'USUARIO') {
        this.router.navigate(['/usuario/mis-tramites']);
      } else if (role === 'ALUMNO') {
        this.router.navigate(['/alumno/mis-tramites']);
      } else if (role === 'EXTERNO') {
        this.router.navigate(['/externo/mis-tramites']);
      } else {
        // Fallback a una ruta genérica
        this.router.navigate(['/home']);
      }

    });
  }

  verTramite(): void {
    if (this.notificacion?.referenciaId) {
      this.closeModal();
      
      this.authService.currentUser.subscribe(user => {
        let baseRoute = '/administrativo';
        
        if (user?.role?.name === 'ADMIN') {
          baseRoute = '/admin';
        } else if (user?.role?.name === 'ADMINISTRATIVO') {
          baseRoute = '/administrativo';
        } else if (user?.role?.name === 'USUARIO') {
          baseRoute = '/usuario';
        }
        
        // Navegar a mis-tramites con el ID del trámite como query parameter
        this.router.navigate([baseRoute, 'mis-tramites'], { 
          queryParams: { tramiteId: this.notificacion!.referenciaId } 
        });
      });
    }
  }

  shouldShowTramiteButton(): boolean {
    return !!(this.notificacion?.referenciaId && this.notificacion?.tipo?.includes('TRAMITE'));
  }

  formatearTiempo(fecha: Date | string): string {
    if (!fecha) return '';
    const ahora = new Date();
    const fechaNot = new Date(fecha);
    const diff = ahora.getTime() - fechaNot.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `${minutos}m`;
    if (horas < 24) return `${horas}h`;
    if (dias < 7) return `${dias}d`;
    return fechaNot.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' });
  }

  getIcono(tipo: string): string {
    const iconos: { [key: string]: string } = {
      'TRAMITE_NUEVO': 'fas fa-file-alt',
      'TRAMITE_CREADO': 'fas fa-file-alt',
      'TRAMITE_DERIVADO': 'fas fa-share',
      'DERIVACION': 'fas fa-share',
      'TRAMITE_APROBADO': 'fas fa-check-circle',
      'TRAMITE_RECHAZADO': 'fas fa-times-circle',
      'SISTEMA': 'fas fa-info-circle',
      'URGENTE': 'fas fa-exclamation-triangle'
    };
    return iconos[tipo] || 'fas fa-bell';
  }
}