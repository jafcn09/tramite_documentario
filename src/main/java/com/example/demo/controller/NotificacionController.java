package com.example.demo.controller;

import com.example.demo.dto.NotificacionRequest;
import com.example.demo.dto.NotificacionResponse;
import com.example.demo.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import com.example.demo.service.UsuarioService;

@RestController
@RequestMapping("/api/notificaciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificacionController {
    
    private final NotificacionService notificacionService;
    private final UsuarioService usuarioService;
    
    // Helper method to get user ID from principal
    private Long getUserId(Principal principal) {
        try {
            // Try to parse as Long (if it's already an ID)
            return Long.parseLong(principal.getName());
        } catch (NumberFormatException e) {
            // If it's a username, look up the user
            var usuario = usuarioService.findByUsuario(principal.getName());
            return usuario != null ? usuario.getId() : null;
        }
    }
    
    // CRUD para ADMIN
    
    // Obtener todas las notificaciones (solo ADMIN)
    @GetMapping("/admin/todas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<NotificacionResponse>> obtenerTodasNotificaciones(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Page<NotificacionResponse> notificaciones = notificacionService.obtenerTodasNotificaciones(pageable);
        return ResponseEntity.ok(notificaciones);
    }
    
    // Crear notificación (solo ADMIN)
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificacionResponse> crearNotificacion(@RequestBody NotificacionRequest request) {
        NotificacionResponse notificacion = notificacionService.crearNotificacion(request);
        return ResponseEntity.ok(notificacion);
    }
    
    // Actualizar notificación (solo ADMIN)
    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificacionResponse> actualizarNotificacion(
            @PathVariable Long id,
            @RequestBody NotificacionRequest request) {
        
        NotificacionResponse notificacion = notificacionService.actualizarNotificacion(id, request);
        return ResponseEntity.ok(notificacion);
    }
    
    // Eliminar notificación (solo ADMIN)
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarNotificacion(@PathVariable Long id) {
        notificacionService.eliminarNotificacion(id);
        return ResponseEntity.noContent().build();
    }
    
    // ENDPOINTS PARA USUARIOS
    
    // Obtener mis notificaciones
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<NotificacionResponse>> obtenerMisNotificaciones(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) Boolean soloNoLeidas,
            Principal principal) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Long usuarioId = getUserId(principal);
        
        Page<NotificacionResponse> notificaciones;
        if (Boolean.TRUE.equals(soloNoLeidas)) {
            notificaciones = notificacionService.obtenerNotificacionesNoLeidas(usuarioId, pageable);
        } else {
            notificaciones = notificacionService.obtenerNotificacionesUsuario(usuarioId, pageable);
        }
        
        return ResponseEntity.ok(notificaciones);
    }
    
    // Contar notificaciones no leídas
    @GetMapping("/no-leidas/count")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Long> contarNotificacionesNoLeidas(Principal principal) {
        Long usuarioId = getUserId(principal);
        Long count = notificacionService.contarNotificacionesNoLeidas(usuarioId);
        return ResponseEntity.ok(count);
    }
    
    // Marcar notificación como leída
    @PutMapping("/{id}/marcar-leida")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> marcarComoLeida(
            @PathVariable Long id,
            Principal principal) {
        
        Long usuarioId = getUserId(principal);
        notificacionService.marcarComoLeida(id, usuarioId);
        return ResponseEntity.ok().build();
    }
    
    // Marcar todas las notificaciones como leídas
    @PutMapping("/marcar-todas-leidas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> marcarTodasComoLeidas(Principal principal) {
        Long usuarioId = getUserId(principal);
        notificacionService.marcarTodasComoLeidas(usuarioId);
        return ResponseEntity.ok().build();
    }
    
    // Obtener notificaciones filtradas
    @GetMapping("/filtradas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<NotificacionResponse>> obtenerNotificacionesFiltradas(
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String prioridad,
            @RequestParam(required = false) Boolean esLeida,
            @RequestParam(required = false) Long tramiteId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Principal principal) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Long usuarioId = getUserId(principal);
        
        // Construir filtros
        Page<NotificacionResponse> notificaciones = notificacionService.obtenerNotificacionesFiltradas(
            usuarioId, tipo, prioridad, esLeida, tramiteId, pageable
        );
        
        return ResponseEntity.ok(notificaciones);
    }
    
    // Obtener notificaciones por trámite específico
    @GetMapping("/tramite/{tramiteId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<NotificacionResponse>> obtenerNotificacionesPorTramite(
            @PathVariable Long tramiteId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Principal principal) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "fechaCreacion"));
        Long usuarioId = getUserId(principal);
        
        Page<NotificacionResponse> notificaciones = notificacionService.obtenerNotificacionesPorTramite(
            usuarioId, tramiteId, pageable
        );
        
        return ResponseEntity.ok(notificaciones);
    }
    
    // Eliminar notificaciones antiguas (tarea de limpieza)
    @DeleteMapping("/limpiar-antiguas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Integer> limpiarNotificacionesAntiguas(
            @RequestParam(defaultValue = "30") int diasAntiguedad) {
        
        Integer eliminadas = notificacionService.limpiarNotificacionesAntiguas(diasAntiguedad);
        return ResponseEntity.ok(eliminadas);
    }
    
    // Reenviar notificación por email
    @PostMapping("/{id}/reenviar-email")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> reenviarPorEmail(
            @PathVariable Long id,
            Principal principal) {
        
        Long usuarioId = getUserId(principal);
        notificacionService.reenviarNotificacionPorEmail(id, usuarioId);
        return ResponseEntity.ok().build();
    }
    
    // Estadísticas de notificaciones (ADMIN)
    @GetMapping("/admin/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> obtenerEstadisticasNotificaciones() {
        Object estadisticas = notificacionService.obtenerEstadisticasNotificaciones();
        return ResponseEntity.ok(estadisticas);
    }
    
    // Obtener configuración de notificaciones del usuario
    @GetMapping("/configuracion")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> obtenerConfiguracionNotificaciones(Principal principal) {
        Long usuarioId = getUserId(principal);
        Object configuracion = notificacionService.obtenerConfiguracionUsuario(usuarioId);
        return ResponseEntity.ok(configuracion);
    }
    
    // Actualizar configuración de notificaciones del usuario
    @PutMapping("/configuracion")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> actualizarConfiguracionNotificaciones(
            @RequestBody Object configuracion,
            Principal principal) {
        
        Long usuarioId = getUserId(principal);
        notificacionService.actualizarConfiguracionUsuario(usuarioId, configuracion);
        return ResponseEntity.ok().build();
    }
}