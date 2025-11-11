import {
  NotificacionService
} from "./chunk-FCMH7YRL.js";
import {
  ToastService
} from "./chunk-OF2WYGMW.js";
import {
  AuthService
} from "./chunk-T5HD73DN.js";
import {
  BehaviorSubject,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HL73AAZ4.js";

// src/app/services/websocket.service.ts
import SockJS from "sockjs-client";
import Stomp from "stompjs";
var WebSocketService = class _WebSocketService {
  constructor(authService, notificacionService, toastService) {
    this.authService = authService;
    this.notificacionService = notificacionService;
    this.toastService = toastService;
    this.stompClient = null;
    this.connectionSubject = new BehaviorSubject(false);
    this.connected$ = this.connectionSubject.asObservable();
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.conectar();
      } else {
        this.desconectar();
      }
    });
  }
  ngOnDestroy() {
    this.desconectar();
  }
  conectar() {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }
    const serverUrl = environment.wsUrl || "ws://localhost:8081/ws";
    const socket = new SockJS(serverUrl);
    this.stompClient = Stomp.over(socket);
    const token = this.authService.getToken();
    const headers = token ? { "Authorization": `Bearer ${token}` } : {};
    this.stompClient.connect(headers, (frame) => {
      this.connectionSubject.next(true);
      this.suscribirseANotificaciones();
    }, (error) => {
      this.connectionSubject.next(false);
      this.intentarReconectar();
    });
    if (!environment.production) {
      this.stompClient.debug = (str) => {
      };
    } else {
      this.stompClient.debug = null;
    }
  }
  desconectar() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        this.connectionSubject.next(false);
      });
    }
    this.stompClient = null;
  }
  suscribirseANotificaciones() {
    if (!this.stompClient || !this.stompClient.connected) {
      return;
    }
    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      return;
    }
    this.stompClient.subscribe(`/user/queue/notificaciones`, (message) => {
      this.manejarNuevaNotificacion(JSON.parse(message.body));
    });
    this.stompClient.subscribe(`/user/queue/notificaciones/leida`, (message) => {
      this.manejarNotificacionLeida(JSON.parse(message.body));
    });
    this.stompClient.subscribe(`/user/queue/notificaciones/todas-leidas`, (message) => {
      this.manejarTodasLeidas();
    });
  }
  manejarNuevaNotificacion(notificacion) {
    this.notificacionService.agregarNuevaNotificacion(notificacion);
    this.mostrarToastNotificacion(notificacion);
    this.reproducirSonidoNotificacion(notificacion);
    this.mostrarNotificacionNavegador(notificacion);
  }
  manejarNotificacionLeida(notificacionId) {
  }
  manejarTodasLeidas() {
    this.notificacionService.actualizarContadorNoLeidas();
  }
  mostrarToastNotificacion(notificacion) {
    let tipo = "info";
    switch (notificacion.tipo) {
      case "TRAMITE_APROBADO":
        tipo = "success";
        break;
      case "TRAMITE_RECHAZADO":
        tipo = "error";
        break;
      case "TRAMITE_OBSERVADO":
        tipo = "warning";
        break;
      default:
        tipo = "info";
    }
    this.toastService.show({
      title: notificacion.titulo,
      message: notificacion.mensaje,
      type: tipo,
      duration: notificacion.prioridad === "ALTA" ? 8e3 : 5e3
    });
  }
  reproducirSonidoNotificacion(notificacion) {
    if (notificacion.prioridad === "ALTA") {
      try {
        const audio = new Audio("/assets/sounds/notification.mp3");
        audio.volume = 0.5;
        audio.play().catch((e) => {
        });
      } catch (error) {
      }
    }
  }
  mostrarNotificacionNavegador(notificacion) {
    if (notificacion.prioridad !== "ALTA") {
      return;
    }
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        const notification = new Notification(notificacion.titulo, {
          body: notificacion.mensaje,
          icon: "/assets/icons/notification.png",
          badge: "/assets/icons/badge.png",
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
        }, 1e4);
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            this.mostrarNotificacionNavegador(notificacion);
          }
        });
      }
    }
  }
  intentarReconectar() {
    if (!this.authService.isAuthenticated()) {
      return;
    }
    setTimeout(() => {
      this.conectar();
    }, 5e3);
  }
  enviarMensaje(destino, mensaje) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destino, {}, JSON.stringify(mensaje));
    } else {
    }
  }
  suscribirse(canal, callback) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(canal, (message) => {
        callback(JSON.parse(message.body));
      });
    } else {
    }
  }
  solicitarPermisosNotificacion() {
    if ("Notification" in window) {
      return Notification.requestPermission();
    } else {
      return Promise.resolve("denied");
    }
  }
  estaConectado() {
    return this.stompClient && this.stompClient.connected;
  }
  static {
    this.\u0275fac = function WebSocketService_Factory(t) {
      return new (t || _WebSocketService)(\u0275\u0275inject(AuthService), \u0275\u0275inject(NotificacionService), \u0275\u0275inject(ToastService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WebSocketService, factory: _WebSocketService.\u0275fac, providedIn: "root" });
  }
};

export {
  WebSocketService
};
//# sourceMappingURL=chunk-BMCKY33E.js.map
