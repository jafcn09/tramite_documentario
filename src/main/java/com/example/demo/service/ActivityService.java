package com.example.demo.service;

import com.example.demo.dto.ActivityResponse;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.entity.Area;
import com.example.demo.repository.AreaRepository;
import com.example.demo.model.Tramite;
import com.example.demo.repository.TramiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {
    
    private final UsuarioRepository usuarioRepository;
    private final AreaRepository areaRepository;
    private final TramiteRepository tramiteRepository;
    
    public List<ActivityResponse> getRecentActivities(int limit, int offset) {
        List<ActivityResponse> activities = new ArrayList<>();
        
        // Obtener últimos usuarios registrados
        List<Usuario> recentUsers = usuarioRepository.findAll().stream()
                .sorted(Comparator.comparing(Usuario::getFechaCreacion).reversed())
                .limit(3)
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
        
        // Obtener últimas áreas creadas
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
                    .action("created")
                    .build());
        }
        
        // Obtener actividades reales de trámites
        List<Tramite> recentTramites = tramiteRepository.findAll().stream()
                .sorted(Comparator.comparing(Tramite::getFechaActualizacion).reversed())
                .limit(5)
                .collect(Collectors.toList());
        
        for (Tramite tramite : recentTramites) {
            String icon = getIconForEstado(tramite.getEstado().name());
            String description = getDescriptionForTramite(tramite);
            String status = getStatusForEstado(tramite.getEstado().name());
            
            activities.add(ActivityResponse.builder()
                    .type("tramite")
                    .icon(icon)
                    .description(description)
                    .timestamp(tramite.getFechaActualizacion())
                    .userRole("USUARIO") // Se puede mejorar obteniendo el rol del usuario solicitante
                    .status(status)
                    .action("updated")
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