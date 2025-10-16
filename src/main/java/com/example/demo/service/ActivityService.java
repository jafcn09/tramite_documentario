package com.example.demo.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ActivityResponse;
import com.example.demo.entity.Area;
import com.example.demo.model.Notificacion;
import com.example.demo.model.Tramite;
import com.example.demo.model.Usuario;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.NotificacionRepository;
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService {
    
    private final UsuarioRepository usuarioRepository;
    private final AreaRepository areaRepository;
    private final TramiteRepository tramiteRepository;
    private final NotificacionRepository notificacionRepository;
    
    public List<ActivityResponse> getRecentActivities(int limit, int offset) {
        List<ActivityResponse> activities = new ArrayList<>();


        List<Usuario> recentUsers = usuarioRepository.findAll().stream()
                .filter(u -> u.getFechaCreacion() != null)
                .sorted(Comparator.comparing(Usuario::getFechaCreacion).reversed())
                .limit(5)
                .collect(Collectors.toList());
        
        for (Usuario user : recentUsers) {
            activities.add(ActivityResponse.builder()
                    .type("user")
                    .icon("fas fa-user-plus")
                    .description("Nuevo usuario: " + user.getNombre() + " " + user.getApellidos())
                    .timestamp(user.getFechaCreacion())
                    .userRole(user.getRole() != null ? user.getRole().getName() : "Sin rol")
                    .action("created")
                    .build());
        }
        
       
        List<Tramite> pendingTramites = tramiteRepository.findAll().stream()
                .filter(t -> t.getEstado() != null &&
                        (t.getEstado().name().equals("EN_REVISION") ||
                         t.getEstado().name().equals("ENVIADO") ||
                         t.getEstado().name().equals("EN_PROCESO")))
                .sorted(Comparator.comparing(Tramite::getFechaActualizacion).reversed())
                .limit(5)
                .collect(Collectors.toList());

        for (Tramite tramite : pendingTramites) {
            String icon = getIconForEstado(tramite.getEstado().name());
            String description = String.format("Trámite %s pendiente de %s",
                    tramite.getCodigo(),
                    tramite.getEstado().name().equals("EN_REVISION") ? "revisión" : "aprobación");

            activities.add(ActivityResponse.builder()
                    .type("tramite")
                    .icon(icon)
                    .description(description)
                    .timestamp(tramite.getFechaActualizacion())
                    .userRole("USUARIO")
                    .status("pending")
                    .action("pending_review")
                    .build());
        }
        

        List<Notificacion> recentNotifications = notificacionRepository.findAll().stream()
                .filter(n -> n.getFechaCreacion() != null)
                .sorted(Comparator.comparing(Notificacion::getFechaCreacion).reversed())
                .limit(3)
                .collect(Collectors.toList());

        for (Notificacion notif : recentNotifications) {
            activities.add(ActivityResponse.builder()
                    .type("notification")
                    .icon(notif.getEsLeida() ? "fas fa-envelope-open" : "fas fa-bell")
                    .description(notif.getMensaje())
                    .timestamp(notif.getFechaCreacion())
                    .userRole("SISTEMA")
                    .status(notif.getEsLeida() ? "read" : "unread")
                    .action("notification")
                    .build());
        }

        List<Tramite> completedTramites = tramiteRepository.findAll().stream()
                .filter(t -> t.getEstado() != null && t.getEstado().name().equals("FINALIZADO"))
                .sorted(Comparator.comparing(Tramite::getFechaActualizacion).reversed())
                .limit(3)
                .collect(Collectors.toList());

        for (Tramite tramite : completedTramites) {
            activities.add(ActivityResponse.builder()
                    .type("tramite")
                    .icon("fas fa-check-circle")
                    .description(String.format("Trámite %s finalizado exitosamente", tramite.getCodigo()))
                    .timestamp(tramite.getFechaActualizacion())
                    .userRole("USUARIO")
                    .status("completed")
                    .action("completed")
                    .build());
        }

        List<Area> recentAreas = areaRepository.findAll().stream()
                .filter(area -> area.getCreatedAt() != null)
                .sorted(Comparator.comparing(Area::getCreatedAt).reversed())
                .limit(2)
                .collect(Collectors.toList());

        for (Area area : recentAreas) {
            activities.add(ActivityResponse.builder()
                    .type("area")
                    .icon("fas fa-building")
                    .description("Nueva área creada: " + area.getNombre())
                    .timestamp(area.getCreatedAt())
                    .userRole("ADMIN")
                    .status("completed")
                    .action("created")
                    .build());
        }
        
        // Ordenar todas las actividades por timestamp descendente
        activities.sort(Comparator.comparing(ActivityResponse::getTimestamp).reversed());
        
        // Aplicar offset y limit
        return activities.stream()
                .skip(offset)
                .limit(limit)
                .collect(Collectors.toList());
    }
    
    private String getIconForEstado(String estado) {
        return switch (estado) {
            case "ENVIADO" -> "fas fa-paper-plane";
            case "EN_REVISION" -> "fas fa-search";
            case "APROBADO" -> "fas fa-check-circle";
            case "FINALIZADO" -> "fas fa-flag-checkered";
            case "RECHAZADO" -> "fas fa-times-circle";
            case "OBSERVADO" -> "fas fa-exclamation-triangle";
            case "DERIVADO" -> "fas fa-share";
            case "EN_PROCESO" -> "fas fa-cog";
            default -> "fas fa-file-alt";
        };
    }
    
    private String getStatusForEstado(String estado) {
        return switch (estado) {
            case "FINALIZADO" -> "completed";
            case "APROBADO", "EN_PROCESO" -> "pending";
            case "RECHAZADO", "OBSERVADO" -> "failed";
            default -> "pending";
        };
    }
    
    private String getDescriptionForTramite(Tramite tramite) {
        String estadoTexto = switch (tramite.getEstado().name()) {
            case "ENVIADO" -> "enviado";
            case "EN_REVISION" -> "en revisión";
            case "APROBADO" -> "aprobado";
            case "FINALIZADO" -> "finalizado";
            case "RECHAZADO" -> "rechazado";
            case "OBSERVADO" -> "observado";
            case "DERIVADO" -> "derivado";
            case "EN_PROCESO" -> "en proceso";
            default -> "actualizado";
        };
        
        return String.format("Trámite %s %s", tramite.getCodigo(), estadoTexto);
    }
}