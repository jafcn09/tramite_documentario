package com.example.demo.controller;

import com.example.demo.service.TramiteService;
import com.example.demo.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bandeja-tramites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BandejaTramitesController {
    
    private final TramiteService tramiteService;
    private final JwtService jwtService;
    
    // Obtener estadísticas de la bandeja para el dashboard
    @GetMapping("/estadisticas")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN') or hasRole('USUARIO')")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas(
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        // Obtener estadísticas del servicio existente
        Object estadisticasRaw = tramiteService.obtenerEstadisticasUsuario(usuarioId, rol);
        
        // Convertir a Map para poder manipular
        @SuppressWarnings("unchecked")
        Map<String, Object> estadisticasOriginales = (Map<String, Object>) estadisticasRaw;
        
        // Adaptar al formato que espera el frontend para la bandeja
        Map<String, Object> estadisticasBandeja = new HashMap<>();
        
        if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            // Para administrativos: estadísticas de todos los trámites
            estadisticasBandeja.put("totalAsignados", estadisticasOriginales.getOrDefault("total", 0L));
            
            // Pendientes de revisión: trámites enviados que aún no han sido procesados
            estadisticasBandeja.put("pendientesRevision", 
                (Long) estadisticasOriginales.getOrDefault("estado_ENVIADO", 0L) + 
                (Long) estadisticasOriginales.getOrDefault("estado_EN_REVISION", 0L));
            
            // Por procesar: trámites aprobados que necesitan respuesta/documentación
            estadisticasBandeja.put("enProceso", 
                (Long) estadisticasOriginales.getOrDefault("estado_APROBADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_EN_PROCESO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_DERIVADO", 0L));
            
            // Finalizados: trámites que ya tienen respuesta completa
            estadisticasBandeja.put("finalizadosHoy", 
                (Long) estadisticasOriginales.getOrDefault("estado_FINALIZADO", 0L));
            
            // Rechazados/Observados: trámites con problemas
            estadisticasBandeja.put("vencidos", 
                (Long) estadisticasOriginales.getOrDefault("estado_RECHAZADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_OBSERVADO", 0L));
            estadisticasBandeja.put("promedioAtencion", 5.2);
            estadisticasBandeja.put("calificacionPromedio", 4.4);
            
            // Productividad semanal mock
            estadisticasBandeja.put("productividadSemanal", java.util.Arrays.asList(
                java.util.Map.of("fecha", "2024-01-15", "completados", 8),
                java.util.Map.of("fecha", "2024-01-16", "completados", 12),
                java.util.Map.of("fecha", "2024-01-17", "completados", 10),
                java.util.Map.of("fecha", "2024-01-18", "completados", 9),
                java.util.Map.of("fecha", "2024-01-19", "completados", 11)
            ));
        } else {
            // Para usuarios: solo sus estadísticas
            estadisticasBandeja.put("totalAsignados", estadisticasOriginales.getOrDefault("total", 0L));
            
            // Pendientes de revisión: trámites enviados que aún no han sido procesados
            estadisticasBandeja.put("pendientesRevision", 
                (Long) estadisticasOriginales.getOrDefault("estado_ENVIADO", 0L) + 
                (Long) estadisticasOriginales.getOrDefault("estado_EN_REVISION", 0L));
            
            // Por procesar: trámites aprobados que necesitan respuesta/documentación
            estadisticasBandeja.put("enProceso", 
                (Long) estadisticasOriginales.getOrDefault("estado_APROBADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_EN_PROCESO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_DERIVADO", 0L));
            
            // Finalizados: trámites que ya tienen respuesta completa
            estadisticasBandeja.put("finalizadosHoy", 
                (Long) estadisticasOriginales.getOrDefault("estado_FINALIZADO", 0L));
            
            // Rechazados/Observados: trámites con problemas
            estadisticasBandeja.put("vencidos", 
                (Long) estadisticasOriginales.getOrDefault("estado_RECHAZADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_OBSERVADO", 0L));
            estadisticasBandeja.put("promedioAtencion", 0.0);
            estadisticasBandeja.put("calificacionPromedio", 0.0);
            estadisticasBandeja.put("productividadSemanal", java.util.Collections.emptyList());
        }
        
        return ResponseEntity.ok(estadisticasBandeja);
    }
    
    // Métodos auxiliares
    private String getRole(Principal principal) {
        if (principal instanceof Authentication auth) {
            return auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        }
        return "USUARIO";
    }
    
    private Long getUserIdFromToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            return jwtService.extractUserId(token);
        }
        return null;
    }
}