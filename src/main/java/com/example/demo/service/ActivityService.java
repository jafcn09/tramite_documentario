package com.example.demo.service;

import com.example.demo.dto.ActivityResponse;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.entity.Area;
import com.example.demo.repository.AreaRepository;
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
        
        // Agregar algunas actividades del sistema (simuladas por ahora)
        activities.add(ActivityResponse.builder()
                .type("system")
                .icon("fas fa-shield-alt")
                .description("Sistema de seguridad actualizado")
                .timestamp(LocalDateTime.now().minusHours(2))
                .action("updated")
                .build());
        
        activities.add(ActivityResponse.builder()
                .type("tramite")
                .icon("fas fa-file-alt")
                .description("10 nuevos trámites procesados hoy")
                .timestamp(LocalDateTime.now().minusHours(1))
                .status("completed")
                .action("processed")
                .build());
        
        activities.add(ActivityResponse.builder()
                .type("login")
                .icon("fas fa-sign-in-alt")
                .description("Múltiples inicios de sesión detectados")
                .timestamp(LocalDateTime.now().minusMinutes(30))
                .action("login")
                .build());
        
        // Ordenar todas las actividades por timestamp descendente
        activities.sort(Comparator.comparing(ActivityResponse::getTimestamp).reversed());
        
        // Aplicar offset y limit
        return activities.stream()
                .skip(offset)
                .limit(limit)
                .collect(Collectors.toList());
    }
}