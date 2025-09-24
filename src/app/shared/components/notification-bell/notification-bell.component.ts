import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificacionService } from '../../../services/notificacion.service';
import { WebSocketService } from '../../../services/websocket.service';
import { AuthService } from '../../../services/auth.service';
import { Notificacion } from '../../../components/notificaciones/notificacion.interface';
import { NotificationDetailModalComponent } from '../notification-detail-modal/notification-detail-modal.component';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, NotificationDetailModalComponent],
  template: `
    <div class="relative inline-block" *ngIf="usuarioAutenticado">
      <!-- Bell Icon -->
      <div class="bell-btn" (click)="toggleDropdown()">
        <i class="fas fa-bell"></i>
        <span class="badge" *ngIf="contadorNoLeidas > 0">{{ contadorNoLeidas }}</span>
      </div>
    </div>

    <!-- Simple Dropdown -->
    <div *ngIf="mostrarDropdown" class="dropdown">
      <!-- Header -->
      <div class="header">
        <span>Notificaciones ({{ contadorNoLeidas }})</span>
        <div class="header-actions">
          <button *ngIf="notificacionesRecientes.length > 0"
                  class="clear-all"
                  (click)="eliminarTodasNotificaciones($event)"
                  title="Eliminar todas">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button class="close" (click)="cerrarDropdown()">×</button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="list" #notificationsList (scroll)="onScroll($event)">

        <!-- Loading -->
        <div *ngIf="cargando && notificacionesRecientes.length === 0" class="loading">
          <div class="spinner"></div>
          <span>Cargando...</span>
        </div>

        <!-- Notification Items -->
        <div *ngFor="let notif of notificacionesRecientes; trackBy: trackNotification"
             class="item"
             [class.unread]="!notif.esLeida">
          <div class="dot" *ngIf="!notif.esLeida"></div>
          <div class="content" (click)="abrirNotificacion(notif)">
            <div class="title">{{ notif.titulo }}</div>
            <div class="message">{{ getMessagePreview(notif.mensaje) }}</div>
            <div class="time">{{ formatearTiempo(notif.fechaCreacion) }}</div>
          </div>
          <div class="actions">
            <button class="delete-btn"
                    (click)="eliminarNotificacion(notif.id, $event)"
                    title="Eliminar notificación">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Loading More -->
        <div *ngIf="loadingMore" class="loading-more">
          <div class="spinner-sm"></div>
          <span>Cargando más...</span>
        </div>

        <!-- End Message -->
        <div *ngIf="showEndMessage && !hasMoreNotifications && notificacionesRecientes.length > 0"
             class="end">
          <i class="fas fa-check"></i>
          <span>No hay más notificaciones</span>
        </div>

        <!-- Empty State -->
        <div *ngIf="notificacionesRecientes.length === 0 && !cargando" class="empty">
          <i class="fas fa-bell-slash"></i>
          <span>Sin notificaciones</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <button class="view-all" (click)="verTodasNotificaciones()">
          Ver todas
        </button>
      </div>
    </div>

    <!-- Modal -->
    <app-notification-detail-modal
      [isVisible]="modalVisible"
      [notificationId]="selectedNotificationId"
      (modalClosed)="closeModal()">
    </app-notification-detail-modal>
  `,
  styles: [`
    /* Bell Button - Simple */
    .bell-btn {
      position: relative;
      cursor: pointer;
      padding: 8px;
      color: #666;
      font-size: 18px;
    }

    .bell-btn:hover {
      color: #333;
    }

    .badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: #ff4757;
      color: white;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 11px;
      min-width: 16px;
      text-align: center;
    }

    /* Dropdown - Clean */
    .dropdown {
      position: fixed;
      top: 60px;
      right: 20px;
      width: 300px;
      max-width: calc(100vw - 40px);
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
    }

    /* Header - Simple */
    .header {
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 14px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .clear-all, .close {
      background: none;
      border: none;
      cursor: pointer;
      color: #999;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .clear-all {
      font-size: 14px;
    }

    .close {
      font-size: 20px;
    }

    .clear-all:hover {
      background: #ffebee;
      color: #d32f2f;
    }

    .close:hover {
      color: #666;
      background: #f5f5f5;
    }

    /* List - Clean */
    .list {
      max-height: 300px;
      overflow-y: auto;
    }

    /* Item - Minimal */
    .item {
      padding: 12px 16px;
      border-bottom: 1px solid #f5f5f5;
      position: relative;
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }

    .item:hover {
      background: #f8f9fa;
    }

    .item:hover .actions {
      opacity: 1;
    }

    .item.unread {
      background: #f0f8ff;
      border-left: 3px solid #007bff;
    }

    .dot {
      width: 8px;
      height: 8px;
      background: #007bff;
      border-radius: 50%;
      margin-top: 4px;
      flex-shrink: 0;
    }

    .content {
      flex: 1;
      min-width: 0;
      cursor: pointer;
    }

    .actions {
      display: flex;
      align-items: flex-start;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #999;
      padding: 2px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      font-size: 12px;
      transition: all 0.2s;
    }

    .delete-btn:hover {
      background: #ffebee;
      color: #d32f2f;
    }

    .title {
      font-weight: 500;
      font-size: 13px;
      margin-bottom: 4px;
      color: #333;
      line-height: 1.3;
    }

    .message {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .time {
      font-size: 11px;
      color: #999;
    }

    /* Loading States */
    .loading, .loading-more {
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 13px;
    }

    .spinner, .spinner-sm {
      border: 2px solid #f3f3f3;
      border-top: 2px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 8px;
    }

    .spinner {
      width: 20px;
      height: 20px;
    }

    .spinner-sm {
      width: 16px;
      height: 16px;
    }

    /* End & Empty States */
    .end, .empty {
      padding: 20px;
      text-align: center;
      color: #999;
      font-size: 13px;
    }

    .end i, .empty i {
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
    }

    /* Footer */
    .footer {
      padding: 12px 16px;
      border-top: 1px solid #eee;
    }

    .view-all {
      width: 100%;
      padding: 8px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }

    .view-all:hover {
      background: #0056b3;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Mobile */
    @media (max-width: 480px) {
      .dropdown {
        right: 10px;
        left: 10px;
        width: auto;
      }

      .actions {
        opacity: 1;
      }

      .delete-btn {
        width: 24px;
        height: 24px;
        font-size: 14px;
      }

      .clear-all {
        width: 28px;
        height: 28px;
        font-size: 16px;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  usuarioAutenticado = false;
  mostrarDropdown = false;
  contadorNoLeidas = 0;
  notificacionesRecientes: Notificacion[] = [];
  cargando = false;
  estaConectado = false;
  hayNuevasNotificaciones = false;
  modalVisible = false;
  selectedNotificationId: number | null = null;
  
  // Nuevas propiedades para scroll infinito
  currentPage = 0;
  pageSize = 10;
  totalNotifications = 0;
  loadingMore = false;
  hasMoreNotifications = true;
  showEndMessage = false;
  
  private subscriptions: Subscription[] = [];
  private shakeTimeout: any;
  private ignoreNextClick = false;

  constructor(
    private notificacionService: NotificacionService,
    private webSocketService: WebSocketService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Verificar autenticación
    this.subscriptions.push(
      this.authService.currentUser.subscribe(user => {
        this.usuarioAutenticado = !!user;

        if (user && user.id) {
          this.inicializarNotificaciones();
        } else {
          this.limpiarEstado();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.shakeTimeout) {
      clearTimeout(this.shakeTimeout);
    }
  }

  private inicializarNotificaciones(): void {
    // Solo cargar si el usuario está autenticado
    if (!this.usuarioAutenticado) {

      return;
    }


    // Cargar contador inicial
    this.actualizarContador();

    // Cargar notificaciones recientes
    this.cargarNotificacionesRecientes();
    
    // Suscribirse al contador de no leídas
    this.subscriptions.push(
      this.notificacionService.contadorNoLeidas$.subscribe(count => {
        const anteriorContador = this.contadorNoLeidas;
        this.contadorNoLeidas = count;
        
        // Activar animación de campana si hay nuevas notificaciones
        if (count > anteriorContador && count > 0) {
          this.activarAnimacionCampana();
        }
      })
    );
    
    // Suscribirse a nuevas notificaciones
    this.subscriptions.push(
      this.notificacionService.nuevaNotificacion$.subscribe(notificacion => {
        this.agregarNotificacionReciente(notificacion);
        this.activarAnimacionCampana();
      })
    );
    
    // Suscribirse al estado de conexión WebSocket
    this.subscriptions.push(
      this.webSocketService.connected$.subscribe(conectado => {
        this.estaConectado = conectado;
      })
    );
  }

  private cargarNotificacionesRecientes(): void {
    this.cargando = true;
    this.currentPage = 0;
    this.hasMoreNotifications = true;
    this.showEndMessage = false;

    this.subscriptions.push(
      this.notificacionService.obtenerMisNotificaciones(0, this.pageSize, 'fechaCreacion', 'desc').subscribe({
        next: (response) => {
          this.notificacionesRecientes = response.content || [];
          this.totalNotifications = response.totalElements || 0;
          this.hasMoreNotifications = this.notificacionesRecientes.length < this.totalNotifications;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error cargando notificaciones recientes:', error);
          // En caso de error, establecer valores por defecto
          this.notificacionesRecientes = [];
          this.totalNotifications = 0;
          this.hasMoreNotifications = false;
          this.cargando = false;
        }
      })
    );
  }

  private cargarMasNotificaciones(): void {
    if (this.loadingMore || !this.hasMoreNotifications) return;
    
    this.loadingMore = true;
    const nextPage = this.currentPage + 1;
    
    this.subscriptions.push(
      this.notificacionService.obtenerMisNotificaciones(nextPage, this.pageSize, 'fechaCreacion', 'desc').subscribe({
        next: (response) => {
          const newNotifications = response.content;
          this.notificacionesRecientes = [...this.notificacionesRecientes, ...newNotifications];
          this.currentPage = nextPage;
          this.hasMoreNotifications = this.notificacionesRecientes.length < this.totalNotifications;
          this.loadingMore = false;
          
          // Mostrar mensaje de fin si ya no hay más notificaciones
          if (!this.hasMoreNotifications && this.notificacionesRecientes.length > 0) {
            setTimeout(() => {
              this.showEndMessage = true;
            }, 500);
          }
        },
        error: (error) => {
          console.error('Error cargando más notificaciones:', error);
          this.loadingMore = false;
        }
      })
    );
  }

  private actualizarContador(): void {
    this.subscriptions.push(
      this.notificacionService.contadorNoLeidas$.subscribe({
        next: (count) => {
          this.contadorNoLeidas = count || 0;
        },
        error: (error) => {
          console.error('Error obteniendo contador:', error);
          // En caso de error, establecer contador en 0
          this.contadorNoLeidas = 0;
        }
      })
    );

    // También hacer una llamada inicial para actualizar el contador
    this.notificacionService.actualizarContadorNoLeidas();
  }

  private agregarNotificacionReciente(notificacion: Notificacion): void {
    // Agregar al inicio de la lista sin limitar - el scroll infinito maneja el tamaño
    this.notificacionesRecientes = [notificacion, ...this.notificacionesRecientes];
    // Actualizar el contador total
    this.totalNotifications += 1;
  }

  private activarAnimacionCampana(): void {
    this.hayNuevasNotificaciones = true;
    
    if (this.shakeTimeout) {
      clearTimeout(this.shakeTimeout);
    }
    
    this.shakeTimeout = setTimeout(() => {
      this.hayNuevasNotificaciones = false;
    }, 2000);
  }

  private limpiarEstado(): void {
    this.mostrarDropdown = false;
    this.contadorNoLeidas = 0;
    this.notificacionesRecientes = [];
    this.estaConectado = false;
    this.currentPage = 0;
    this.totalNotifications = 0;
    this.loadingMore = false;
    this.hasMoreNotifications = true;
    this.showEndMessage = false;
  }

  toggleDropdown(): void {
    this.mostrarDropdown = !this.mostrarDropdown;
    
    // Ignorar el próximo click del documento para evitar cerrar inmediatamente
    this.ignoreNextClick = true;
    setTimeout(() => {
      this.ignoreNextClick = false;
    }, 100);
    
    // Forzar detección de cambios
    this.cdr.detectChanges();
    
    if (this.mostrarDropdown) {
      this.cargarNotificacionesRecientes();
    }
  }

  cerrarDropdown(): void {
    this.mostrarDropdown = false;
  }

  marcarLeida(notificacion: Notificacion, event: Event): void {
    event.stopPropagation();
    
    if (notificacion.esLeida) return;
    
    this.notificacionService.marcarLeidaLocal(notificacion.id);
    
    // Actualizar localmente
    notificacion.esLeida = true;
    notificacion.fechaLectura = new Date();
  }

  marcarTodasLeidas(): void {
    if (this.contadorNoLeidas === 0) return;
    
    this.notificacionService.marcarTodasLeidasLocal();
    
    // Actualizar notificaciones recientes localmente
    this.notificacionesRecientes = this.notificacionesRecientes.map(n => ({
      ...n,
      esLeida: true,
      fechaLectura: n.esLeida ? n.fechaLectura : new Date()
    }));
  }

  abrirNotificacion(notificacion: Notificacion): void {
    // Marcar como leída
    this.marcarLeida(notificacion, new Event('click'));
    
    // Cerrar el dropdown
    this.cerrarDropdown();
    
    // Abrir modal con el detalle de la notificación
    this.selectedNotificationId = notificacion.id;
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedNotificationId = null;
  }

  verTodasNotificaciones(): void {
    this.cerrarDropdown();
    
    // Determinar la ruta base según el rol del usuario
    this.authService.currentUser.subscribe(user => {
      let baseRoute = '/admin'; // default
      
      if (user?.role?.name === 'ADMIN') {
        baseRoute = '/admin';
      } else if (user?.role?.name === 'ADMINISTRATIVO') {
        baseRoute = '/administrativo';
      } else if (user?.role?.name === 'USUARIO') {
        baseRoute = '/usuario';
      }
      
      this.router.navigate([baseRoute, 'notificaciones']);
    });
  }

  getIcono(tipo: string): string {
    return this.notificacionService.getIcono(tipo);
  }

  getClaseTipo(tipo: string): string {
    return this.notificacionService.getClaseTipo(tipo);
  }

  formatearTiempo(fecha: Date | string): string {
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

  getMessagePreview(mensaje: string): string {
    return mensaje.length > 85 ? mensaje.slice(0, 85) + '...' : mensaje;
  }

  trackNotification(_index: number, notificacion: Notificacion): number {
    return notificacion.id;
  }

  onNotificationHover(event: Event, isHovering: boolean): void {
    const target = event.target as HTMLElement;
    if (target) {
      target.style.backgroundColor = isHovering ? '#f8f9fa' : 'transparent';
    }
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const threshold = 100; // Pixels before reaching the bottom
    
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - threshold) {
      this.cargarMasNotificaciones();
    }
  }

  // Cerrar dropdown al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Si debemos ignorar este click, salir
    if (this.ignoreNextClick) {
      return;
    }
    
    const target = event.target as HTMLElement;
    
    if (!target.closest('.notification-bell') && !target.closest('.modern-notification-bell')) {
      this.cerrarDropdown();
    }
  }

  // Cerrar dropdown con tecla Escape
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.cerrarDropdown();
  }

  eliminarNotificacion(notificacionId: number, event: Event): void {
    event.stopPropagation();

    this.subscriptions.push(
      this.notificacionService.eliminarNotificacionUsuario(notificacionId).subscribe({
        next: () => {
          this.notificacionesRecientes = this.notificacionesRecientes.filter(n => n.id !== notificacionId);
          this.totalNotifications = Math.max(0, this.totalNotifications - 1);
          this.notificacionService.actualizarContadorNoLeidas();
        },
        error: (error: any) => {
          console.error('Error eliminando notificación:', error);
        }
      })
    );
  }

  eliminarTodasNotificaciones(event: Event): void {
    event.stopPropagation();

    if (this.notificacionesRecientes.length === 0) return;

    this.subscriptions.push(
      this.notificacionService.eliminarTodasNotificaciones().subscribe({
        next: () => {
          this.notificacionesRecientes = [];
          this.totalNotifications = 0;
          this.contadorNoLeidas = 0;
          this.hasMoreNotifications = false;
          this.showEndMessage = false;
          this.notificacionService.actualizarContadorNoLeidas();
        },
        error: (error: any) => {
          console.error('Error eliminando todas las notificaciones:', error);
        }
      })
    );
  }
}