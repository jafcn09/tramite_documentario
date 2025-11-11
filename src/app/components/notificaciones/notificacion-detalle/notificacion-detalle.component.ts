import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../shared/interfaces/notificacion.interface';

@Component({
  selector: 'app-notificacion-detalle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notificacion-detalle-container">
      <div class="header">
        <button class="btn-back" (click)="volver()">
          <i class="fas fa-arrow-left"></i> Volver
        </button>
        <h2>Detalle de Notificación</h2>
      </div>

      <div class="notificacion-card" *ngIf="notificacion">
        <!-- Cabecera con tipo y estado -->
        <div class="notificacion-header" [ngClass]="'tipo-' + notificacion.tipo.toLowerCase()">
          <div class="tipo-badge">
            <i [class]="getIcono(notificacion.tipo)"></i>
            <span>{{ getTipoLabel(notificacion.tipo) }}</span>
          </div>
          <div class="estado-badge" [ngClass]="notificacion.esLeida ? 'leida' : 'no-leida'">
            <i class="fas" [ngClass]="notificacion.esLeida ? 'fa-check-circle' : 'fa-circle'"></i>
            {{ notificacion.esLeida ? 'Leída' : 'No leída' }}
          </div>
        </div>

        <!-- Título -->
        <div class="notificacion-titulo">
          <h1>{{ notificacion.titulo }}</h1>
          <div class="prioridad-badge" [ngClass]="'prioridad-' + notificacion.prioridad.toLowerCase()">
            <i class="fas fa-flag"></i> Prioridad {{ notificacion.prioridad }}
          </div>
        </div>

        <!-- Información temporal -->
        <div class="info-temporal">
          <div class="fecha-item">
            <i class="far fa-calendar"></i>
            <span>Recibida: {{ formatearFecha(notificacion.fechaCreacion) }}</span>
          </div>
          <div class="fecha-item" *ngIf="notificacion.fechaLectura">
            <i class="far fa-eye"></i>
            <span>Leída: {{ formatearFecha(notificacion.fechaLectura) }}</span>
          </div>
          <div class="fecha-item" *ngIf="notificacion.fechaVencimiento">
            <i class="far fa-clock"></i>
            <span>Vence: {{ formatearFecha(notificacion.fechaVencimiento) }}</span>
          </div>
        </div>

        <!-- Mensaje completo -->
        <div class="mensaje-completo">
          <h3>Mensaje</h3>
          <div class="mensaje-content">
            {{ notificacion.mensaje }}
          </div>
        </div>

        <!-- Información adicional -->
        <div class="informacion-adicional" *ngIf="notificacion.metadatos">
          <h3>Información Adicional</h3>
          <div class="metadatos">
            <div *ngFor="let item of getMetadatosArray()" class="metadato-item">
              <span class="metadato-key">{{ item.key }}:</span>
              <span class="metadato-value">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="acciones">
          <button class="btn btn-primary" *ngIf="!notificacion.esLeida" (click)="marcarComoLeida()">
            <i class="fas fa-check"></i> Marcar como leída
          </button>
          
          <button class="btn btn-secondary" *ngIf="notificacion.rutaDestino" (click)="irARutaDestino()">
            <i class="fas fa-external-link-alt"></i> Ir al contenido relacionado
          </button>

          <button class="btn btn-info" *ngIf="notificacion.referenciaId && esTramite()" (click)="verTramite()">
            <i class="fas fa-file-alt"></i> Ver trámite
          </button>

          <button class="btn btn-danger" (click)="eliminarNotificacion()">
            <i class="fas fa-trash"></i> Eliminar notificación
          </button>
        </div>
      </div>

      <!-- Estado de carga -->
      <div class="loading" *ngIf="cargando">
        <i class="fas fa-spinner fa-spin"></i> Cargando notificación...
      </div>

      <!-- Mensaje de error -->
      <div class="error-message" *ngIf="error">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button class="btn btn-primary" (click)="cargarNotificacion()">Reintentar</button>
      </div>
    </div>
  `,
  styles: [`
    .notificacion-detalle-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .btn-back {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .btn-back:hover {
      background: #e9ecef;
    }

    .header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 24px;
    }

    .notificacion-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .notificacion-header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #f8f9fa;
    }

    .notificacion-header.tipo-tramite_nuevo {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .notificacion-header.tipo-tramite_derivado {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .notificacion-header.tipo-sistema {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }

    .tipo-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 500;
    }

    .tipo-badge i {
      font-size: 20px;
    }

    .estado-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }

    .estado-badge.leida {
      background: rgba(255,255,255,0.3);
    }

    .estado-badge.no-leida {
      background: rgba(255,255,255,0.5);
    }

    .notificacion-titulo {
      padding: 25px;
      border-bottom: 1px solid #e9ecef;
    }

    .notificacion-titulo h1 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 28px;
      font-weight: 600;
    }

    .prioridad-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
    }

    .prioridad-badge.prioridad-alta {
      background: #fee;
      color: #dc3545;
    }

    .prioridad-badge.prioridad-normal {
      background: #fff3cd;
      color: #856404;
    }

    .prioridad-badge.prioridad-baja {
      background: #d1ecf1;
      color: #0c5460;
    }

    .info-temporal {
      padding: 20px 25px;
      background: #f8f9fa;
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
    }

    .fecha-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #6c757d;
      font-size: 14px;
    }

    .fecha-item i {
      color: #007bff;
    }

    .mensaje-completo {
      padding: 25px;
    }

    .mensaje-completo h3 {
      margin: 0 0 15px 0;
      color: #495057;
      font-size: 18px;
      font-weight: 600;
    }

    .mensaje-content {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      line-height: 1.6;
      color: #495057;
      font-size: 15px;
      white-space: pre-wrap;
    }

    .informacion-adicional {
      padding: 25px;
      background: #fff;
      border-top: 1px solid #e9ecef;
    }

    .informacion-adicional h3 {
      margin: 0 0 20px 0;
      color: #495057;
      font-size: 18px;
      font-weight: 600;
    }

    .metadatos {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }

    .metadato-item {
      display: flex;
      gap: 10px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 5px;
    }

    .metadato-key {
      font-weight: 600;
      color: #495057;
      text-transform: capitalize;
    }

    .metadato-value {
      color: #6c757d;
    }

    .acciones {
      padding: 25px;
      background: #f8f9fa;
      display: flex;
      gap: 15px;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
    }

    .btn-info {
      background: #17a2b8;
      color: white;
    }

    .btn-info:hover {
      background: #117a8b;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background: #c82333;
    }

    .loading {
      text-align: center;
      padding: 60px;
      font-size: 18px;
      color: #6c757d;
    }

    .loading i {
      font-size: 32px;
      margin-bottom: 15px;
      color: #007bff;
    }

    .error-message {
      text-align: center;
      padding: 60px;
      color: #dc3545;
    }

    .error-message i {
      font-size: 48px;
      margin-bottom: 20px;
    }

    .error-message p {
      font-size: 16px;
      margin: 20px 0;
    }

    @media (max-width: 768px) {
      .notificacion-detalle-container {
        padding: 15px;
      }

      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }

      .notificacion-titulo h1 {
        font-size: 22px;
      }

      .info-temporal {
        flex-direction: column;
        gap: 10px;
      }

      .acciones {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class NotificacionDetalleComponent implements OnInit {
  notificacion: Notificacion | null = null;
  cargando = false;
  error = '';
  notificacionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.notificacionId = +params['id'];
      if (this.notificacionId) {
        this.cargarNotificacion();
      }
    });
  }

  cargarNotificacion(): void {
    this.cargando = true;
    this.error = '';

    this.notificacionService.obtenerNotificacionPorId(this.notificacionId).subscribe({
      next: (notificacion) => {
        this.notificacion = notificacion;
        this.cargando = false;
        
        if (!notificacion.esLeida) {
          this.marcarComoLeida();
        }
      },
      error: (error) => {
        this.error = 'Error al cargar la notificación. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  marcarComoLeida(): void {
    if (!this.notificacion) return;

    this.notificacionService.marcarComoLeida(this.notificacion.id).subscribe({
      next: () => {
        if (this.notificacion) {
          this.notificacion.esLeida = true;
          this.notificacion.fechaLectura = new Date();
        }
      },
      error: (error) => {
      }
    });
  }

  eliminarNotificacion(): void {
    if (!this.notificacion || !confirm('¿Está seguro de eliminar esta notificación?')) return;

    this.notificacionService.eliminarNotificacion(this.notificacion.id).subscribe({
      next: () => {
        alert('Notificación eliminada exitosamente');
        this.volver();
      },
      error: (error) => {
        alert('Error al eliminar la notificación');
      }
    });
  }

  irARutaDestino(): void {
    if (this.notificacion?.rutaDestino) {
      this.router.navigate([this.notificacion.rutaDestino]);
    }
  }

  verTramite(): void {
    if (this.notificacion?.referenciaId) {
      this.router.navigate(['/administrativo/tramite-detalle', this.notificacion.referenciaId]);
    }
  }

  esTramite(): boolean {
    return this.notificacion?.tipo?.includes('TRAMITE') || false;
  }

  volver(): void {
    this.router.navigate(['/notificaciones']);
  }

  formatearFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getIcono(tipo: string): string {
    const iconos: { [key: string]: string } = {
      'TRAMITE_NUEVO': 'fas fa-file-alt',
      'TRAMITE_DERIVADO': 'fas fa-share',
      'TRAMITE_APROBADO': 'fas fa-check-circle',
      'TRAMITE_RECHAZADO': 'fas fa-times-circle',
      'SISTEMA': 'fas fa-info-circle',
      'URGENTE': 'fas fa-exclamation-triangle'
    };
    return iconos[tipo] || 'fas fa-bell';
  }

  getTipoLabel(tipo: string): string {
    const labels: { [key: string]: string } = {
      'TRAMITE_NUEVO': 'Nuevo Trámite',
      'TRAMITE_DERIVADO': 'Trámite Derivado',
      'TRAMITE_APROBADO': 'Trámite Aprobado',
      'TRAMITE_RECHAZADO': 'Trámite Rechazado',
      'SISTEMA': 'Notificación del Sistema',
      'URGENTE': 'Urgente'
    };
    return labels[tipo] || tipo;
  }

  getMetadatosArray(): Array<{key: string, value: any}> {
    if (!this.notificacion?.metadatos) return [];
    
    return Object.keys(this.notificacion.metadatos).map(key => ({
      key: key.replace(/_/g, ' '),
      value: this.notificacion?.metadatos[key]
    }));
  }
}