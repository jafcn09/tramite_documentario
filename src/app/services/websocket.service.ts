import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { NotificacionService } from './notificacion.service';
import { Notificacion } from '../components/notificaciones/notificacion.interface';
import { ToastService } from './toast.service';

declare const SockJS: any;
declare const Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private stompClient: any = null;
  private connectionSubject = new BehaviorSubject<boolean>(false);
  
  public connected$ = this.connectionSubject.asObservable();
  
  constructor(
    private authService: AuthService,
    private notificacionService: NotificacionService,
    private toastService: ToastService
  ) {
    // Conectar automáticamente si el usuario está autenticado
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.conectar();
      } else {
        this.desconectar();
      }
    });
  }

  ngOnDestroy(): void {
    this.desconectar();
  }

  private conectar(): void {
    if (this.stompClient && this.stompClient.connected) {
      return; // Ya está conectado
    }

    const serverUrl = environment.apiUrl || `${environment.apiUrl}/ws`;
    const socket = new SockJS(serverUrl);
    this.stompClient = Stomp.over(socket);
    
    // Configurar headers con token de autenticación
    const token = this.authService.getToken();
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    this.stompClient.connect(
      headers,
      (frame: any) => {

        this.connectionSubject.next(true);
        this.suscribirseANotificaciones();
      },
      (error: any) => {
        this.connectionSubject.next(false);
        this.intentarReconectar();
      }
    );

    // Configurar debug (desactivar en producción)
    if (!environment.production) {
      this.stompClient.debug = (str: string) => {

      };
    } else {
      this.stompClient.debug = null;
    }
  }

  private desconectar(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {

        this.connectionSubject.next(false);
      });
    }
    this.stompClient = null;
  }

  private suscribirseANotificaciones(): void {
    if (!this.stompClient || !this.stompClient.connected) {
      return;
    }

    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return;
    }

    // Suscribirse a notificaciones de usuario específico (solo una suscripción)
    this.stompClient.subscribe(
      `/user/queue/notificaciones`,
      (message: any) => {
        this.manejarNuevaNotificacion(JSON.parse(message.body));
      }
    );

    // Suscribirse a actualizaciones de lectura
    this.stompClient.subscribe(
      `/user/queue/notificaciones/leida`,
      (message: any) => {
        this.manejarNotificacionLeida(JSON.parse(message.body));
      }
    );

    // Suscribirse a marcar todas como leídas
    this.stompClient.subscribe(
      `/user/queue/notificaciones/todas-leidas`,
      (message: any) => {
        this.manejarTodasLeidas();
      }
    );

  }

  private manejarNuevaNotificacion(notificacion: Notificacion): void {

    // Agregar a la lista de notificaciones
    this.notificacionService.agregarNuevaNotificacion(notificacion);
    
    // Mostrar toast de notificación
    this.mostrarToastNotificacion(notificacion);
    
    // Reproducir sonido de notificación (opcional)
    this.reproducirSonidoNotificacion(notificacion);
    
    // Mostrar notificación del navegador (si están permitidas)
    this.mostrarNotificacionNavegador(notificacion);
  }

  private manejarNotificacionLeida(notificacionId: number): void {

    // El NotificacionService ya maneja esto localmente
  }

  private manejarTodasLeidas(): void {

    this.notificacionService.actualizarContadorNoLeidas();
  }

  private mostrarToastNotificacion(notificacion: Notificacion): void {
    let tipo: 'success' | 'warning' | 'error' | 'info' = 'info';
    
    switch (notificacion.tipo) {
      case 'TRAMITE_APROBADO':
        tipo = 'success';
        break;
      case 'TRAMITE_RECHAZADO':
        tipo = 'error';
        break;
      case 'TRAMITE_OBSERVADO':
        tipo = 'warning';
        break;
      default:
        tipo = 'info';
    }

    this.toastService.show({
      title: notificacion.titulo,
      message: notificacion.mensaje,
      type: tipo,
      duration: notificacion.prioridad === 'ALTA' ? 8000 : 5000
    });
  }

  private reproducirSonidoNotificacion(notificacion: Notificacion): void {
    // Solo reproducir sonido para prioridad ALTA
    if (notificacion.prioridad === 'ALTA') {
      try {
        const audio = new Audio('/assets/sounds/notification.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => {

        });
      } catch (error) {

      }
    }
  }

  private mostrarNotificacionNavegador(notificacion: Notificacion): void {
    // Solo para notificaciones de prioridad alta
    if (notificacion.prioridad !== 'ALTA') {
      return;
    }

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        const notification = new Notification(notificacion.titulo, {
          body: notificacion.mensaje,
          icon: '/assets/icons/notification.png',
          badge: '/assets/icons/badge.png',
          tag: `notificacion-${notificacion.id}`,
          requireInteraction: true
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
          
          // Navegar a la notificación si tiene ruta
          if (notificacion.rutaDestino) {
            // Aquí podrías usar Router para navegar
            window.location.href = notificacion.rutaDestino;
          }
        };

        // Auto cerrar después de 10 segundos
        setTimeout(() => {
          notification.close();
        }, 10000);
      } else if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.mostrarNotificacionNavegador(notificacion);
          }
        });
      }
    }
  }

  private intentarReconectar(): void {
    if (!this.authService.isAuthenticated()) {
      return; // No reconectar si no está autenticado
    }

    setTimeout(() => {
      this.conectar();
    }, 5000); // Esperar 5 segundos antes de reconectar
  }

  // Método público para enviar mensajes (si es necesario)
  public enviarMensaje(destino: string, mensaje: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destino, {}, JSON.stringify(mensaje));
    } else {
    }
  }

  // Método público para suscribirse a canales adicionales
  public suscribirse(canal: string, callback: (mensaje: any) => void): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(canal, (message: any) => {
        callback(JSON.parse(message.body));
      });
    } else {
    }
  }

  // Método público para solicitar permisos de notificación
  public solicitarPermisosNotificacion(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return Notification.requestPermission();
    } else {
      return Promise.resolve('denied' as NotificationPermission);
    }
  }

  // Método público para verificar estado de conexión
  public estaConectado(): boolean {
    return this.stompClient && this.stompClient.connected;
  }
}