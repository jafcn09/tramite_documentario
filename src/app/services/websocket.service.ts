import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { NotificacionService } from './notificacion.service';
import { Notificacion } from '../shared/interfaces/notificacion.interface';
import { ToastService } from './toast.service';


declare global {
  interface Window {
    SockJS: any;
    Stomp: any;
  }
}

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
      return;
    }

    const serverUrl = (environment as any).wsUrl || 'http://localhost:8081/ws';
    const socket = new (window.SockJS as any)(serverUrl);
    this.stompClient = (window.Stomp as any).over(socket);
    
   
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

    this.stompClient.subscribe(
      `/user/queue/notificaciones`,
      (message: any) => {
        this.manejarNuevaNotificacion(JSON.parse(message.body));
      }
    );


    this.stompClient.subscribe(
      `/user/queue/notificaciones/leida`,
      (message: any) => {
        this.manejarNotificacionLeida(JSON.parse(message.body));
      }
    );

    this.stompClient.subscribe(
      `/user/queue/notificaciones/todas-leidas`,
      (message: any) => {
        this.manejarTodasLeidas();
      }
    );

   
    this.stompClient.subscribe(
      `/topic/reportes`,
      (message: any) => {
        this.manejarNotificacionReporte(JSON.parse(message.body));
      }
    );

  }

  private manejarNuevaNotificacion(notificacion: Notificacion): void {

    this.notificacionService.agregarNuevaNotificacion(notificacion);

    this.mostrarToastNotificacion(notificacion);
    
    this.reproducirSonidoNotificacion(notificacion);
    
  
    this.mostrarNotificacionNavegador(notificacion);
  }

  private manejarNotificacionLeida(notificacionId: number): void {

  }

  private manejarTodasLeidas(): void {

    this.notificacionService.actualizarContadorNoLeidas();
  }

  private manejarNotificacionReporte(data: any): void {

    if (data.tipo === 'NUEVO_REPORTE') {
      this.toastService.show({
        title: 'Nuevo Reporte de Grado',
        message: `${data.tipoError} - ${data.gradoCodigo}`,
        type: 'info',
        duration: 6000
      });
    } else if (data.tipo === 'REPORTE_ACTUALIZADO') {
      this.toastService.show({
        title: 'Reporte Actualizado',
        message: data.mensaje || `Reporte #${data.reporteId} actualizado`,
        type: 'success',
        duration: 5000
      });
    }
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
          

          if (notificacion.rutaDestino) {
        
            window.location.href = notificacion.rutaDestino;
          }
        };


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
      return;
    }

    setTimeout(() => {
      this.conectar();
    }, 5000); 
  }

  public enviarMensaje(destino: string, mensaje: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destino, {}, JSON.stringify(mensaje));
    } else {
    }
  }

  
  public suscribirse(canal: string, callback: (mensaje: any) => void): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(canal, (message: any) => {
        callback(JSON.parse(message.body));
      });
    } else {
    }
  }

 
  public solicitarPermisosNotificacion(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return Notification.requestPermission();
    } else {
      return Promise.resolve('denied' as NotificationPermission);
    }
  }

  
  public estaConectado(): boolean {
    return this.stompClient && this.stompClient.connected;
  }
}