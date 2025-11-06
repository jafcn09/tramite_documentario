import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificacionService } from '../../../services/notificacion.service';
import { WebSocketService } from '../../../services/websocket.service';
import { AuthService } from '../../../services/auth.service';
import { Notificacion } from '../../interfaces/notificacion.interface';
import { NotificationDetailModalComponent } from '../notification-detail-modal/notification-detail-modal.component';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule, NotificationDetailModalComponent],
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css'],
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

    if (!this.usuarioAutenticado) {

      return;
    }


    this.actualizarContador();

    this.cargarNotificacionesRecientes();


    this.subscriptions.push(
      this.notificacionService.contadorNoLeidas$.subscribe(count => {
        const anteriorContador = this.contadorNoLeidas;
        this.contadorNoLeidas = count;


        if (count > anteriorContador && count > 0) {
          this.activarAnimacionCampana();
        }
      })
    );

    this.subscriptions.push(
      this.notificacionService.nuevaNotificacion$.subscribe(notificacion => {
        this.agregarNotificacionReciente(notificacion);
        this.activarAnimacionCampana();
      })
    );


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
        error: () => {

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


          if (!this.hasMoreNotifications && this.notificacionesRecientes.length > 0) {
            setTimeout(() => {
              this.showEndMessage = true;
            }, 500);
          }
        },
        error: () => {
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
        error: () => {
          this.contadorNoLeidas = 0;
        }
      })
    );


    this.notificacionService.actualizarContadorNoLeidas();
  }

  private agregarNotificacionReciente(notificacion: Notificacion): void {
    this.notificacionesRecientes = [notificacion, ...this.notificacionesRecientes];
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

    this.ignoreNextClick = true;
    setTimeout(() => {
      this.ignoreNextClick = false;
    }, 100);

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

    notificacion.esLeida = true;
    notificacion.fechaLectura = new Date();
  }

  marcarTodasLeidas(): void {
    if (this.contadorNoLeidas === 0) return;

    this.notificacionService.marcarTodasLeidasLocal();

    this.notificacionesRecientes = this.notificacionesRecientes.map(n => ({
      ...n,
      esLeida: true,
      fechaLectura: n.esLeida ? n.fechaLectura : new Date()
    }));
  }

  abrirNotificacion(notificacion: Notificacion): void {
    this.marcarLeida(notificacion, new Event('click'));

    this.cerrarDropdown();


    this.selectedNotificationId = notificacion.id;
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
    this.selectedNotificationId = null;
  }

  verTodasNotificaciones(): void {
    this.cerrarDropdown();

    this.authService.currentUser.subscribe(user => {
      let baseRoute = '/admin';

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
    const threshold = 100;

    if (element.scrollTop + element.clientHeight >= element.scrollHeight - threshold) {
      this.cargarMasNotificaciones();
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {

    if (this.ignoreNextClick) {
      return;
    }

    const target = event.target as HTMLElement;

    if (!target.closest('.notification-bell') && !target.closest('.modern-notification-bell')) {
      this.cerrarDropdown();
    }
  }


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
        error: () => {
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
        error: () => {
        }
      })
    );
  }
}
