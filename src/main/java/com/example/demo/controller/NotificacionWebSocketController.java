package com.example.demo.controller;

import com.example.demo.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class NotificacionWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificacionService notificacionService;

    @MessageMapping("/notificaciones.subscribe")
    @SendToUser("/queue/notificaciones")
    public String subscribeToNotifications(Principal user) {
        return "Suscripción exitosa";
    }

    @MessageMapping("/notificaciones.count")
    @SendToUser("/queue/count")
    public Long getUnreadCount(Principal user) {
        Long userId = Long.parseLong(user.getName());
        return notificacionService.contarNotificacionesNoLeidas(userId);
    }

    @MessageMapping("/notificaciones.markRead")
    public void markAsRead(Long notificationId, Principal user) {
        Long userId = Long.parseLong(user.getName());
        notificacionService.marcarComoLeida(notificationId, userId);
    }

    @MessageMapping("/notificaciones.markAllRead")
    public void markAllAsRead(Principal user) {
        Long userId = Long.parseLong(user.getName());
        notificacionService.marcarTodasComoLeidas(userId);
    }
}