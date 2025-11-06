import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
import { AuthService } from '../../../services/auth.service';
import { Notificacion } from '../../interfaces/notificacion.interface';

@Component({
  selector: 'app-notification-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-detail-modal.component.html',
  styleUrls: ['./notification-detail-modal.component.css']
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

        if (user?.role?.name) {
          const roleName = user.role.name.toUpperCase();

          if (roleName === 'ADMIN') {
            baseRoute = '/admin';
          } else if (roleName === 'ADMINISTRATIVO') {
            baseRoute = '/administrativo';
          } else if (roleName === 'USUARIO') {
            baseRoute = '/usuario';
          } else if (roleName === 'ESTUDIANTE') {
            baseRoute = '/estudiante';
          }
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
