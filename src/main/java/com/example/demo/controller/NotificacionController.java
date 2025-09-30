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

    // Public endpoint for demo/testing
    @GetMapping("/public")
    public ResponseEntity<Page<NotificacionResponse>> obtenerNotificacionesPublic(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir) {

        // Return empty page for public access
        return ResponseEntity.ok(Page.empty());
    }

    // Public endpoint for notification count
    @GetMapping("/public/no-leidas/count")
    public ResponseEntity<Long> contarNotificacionesNoLeidasPublic() {
        // Return 0 for public access
        return ResponseEntity.ok(0L);
    }

    // CRUD para ADMIN

    // Obtener todas las notificaciones (solo ADMIN)
    @GetMapping("/admin/todas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<NotificacionResponse>> obtenerTodasNotificaciones(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir) {

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
            @PathVariable(name = "id") Long id,
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

    // Obtener estadísticas (solo ADMIN)
    @GetMapping("/admin/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> obtenerEstadisticas() {
        Object estadisticas = notificacionService.obtenerEstadisticasNotificaciones();
        return ResponseEntity.ok(estadisticas);
    }

    // Limpiar notificaciones antiguas (solo ADMIN)
    @DeleteMapping("/limpiar-antiguas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Integer> limpiarNotificacionesAntiguas(
            @RequestParam(name = "diasAntiguedad", defaultValue = "30") int diasAntiguedad) {
        int eliminadas = notificacionService.limpiarNotificacionesAntiguas(diasAntiguedad);
        return ResponseEntity.ok(eliminadas);
    }

    // ENDPOINTS PARA USUARIOS

    // Obtener notificación por ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<NotificacionResponse> obtenerNotificacionPorId(
            @PathVariable(name = "id") Long id,
            Principal principal) {

        Long usuarioId = getUserId(principal);
        NotificacionResponse notificacion = notificacionService.obtenerNotificacionPorId(id, usuarioId);
        return ResponseEntity.ok(notificacion);
    }

    // Obtener mis notificaciones
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<NotificacionResponse>> obtenerMisNotificaciones(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(name = "soloNoLeidas", required = false) Boolean soloNoLeidas,
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
            @PathVariable(name = "id") Long id,
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

    // Eliminar todas las notificaciones del usuario
    @DeleteMapping("/eliminar-todas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> eliminarTodasMisNotificaciones(Principal principal) {
        Long usuarioId = getUserId(principal);
        notificacionService.eliminarTodasNotificacionesUsuario(usuarioId);
        return ResponseEntity.noContent().build();
    }

    // Eliminar notificación (usuario propietario)
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> eliminarMiNotificacion(
            @PathVariable(name = "id") Long id,
            Principal principal) {

        Long usuarioId = getUserId(principal);
        notificacionService.eliminarNotificacionUsuario(id, usuarioId);
        return ResponseEntity.noContent().build();
    }
}