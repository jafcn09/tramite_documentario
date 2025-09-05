package com.example.demo.controller;

import com.example.demo.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
@Slf4j
public class NotificacionWebSocketController {
    
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificacionService notificacionService;
    
    @MessageMapping("/notificaciones.subscribe")
    @SendToUser("/queue/notificaciones")
    public String subscribeToNotifications(Principal user) {
        log.info("Usuario {} se suscribió a notificaciones", user.getName());
        return "Suscripción exitosa";
    }
    
    @MessageMapping("/notificaciones.count")
    @SendToUser("/queue/count")
    public Long getUnreadCount(Principal user) {
        Long userId = Long.parseLong(user.getName());
        Long count = notificacionService.contarNotificacionesNoLeidas(userId);
        log.info("Contador de notificaciones para usuario {}: {}", userId, count);
        return count;
    }
    
    @MessageMapping("/notificaciones.markRead")
    public void markAsRead(Long notificationId, Principal user) {
        Long userId = Long.parseLong(user.getName());
        notificacionService.marcarComoLeida(notificationId, userId);
        log.info("Notificación {} marcada como leída por usuario {}", notificationId, userId);
    }
    
    @MessageMapping("/notificaciones.markAllRead")
    public void markAllAsRead(Principal user) {
        Long userId = Long.parseLong(user.getName());
        notificacionService.marcarTodasComoLeidas(userId);
        log.info("Todas las notificaciones marcadas como leídas por usuario {}", userId);
    }
}