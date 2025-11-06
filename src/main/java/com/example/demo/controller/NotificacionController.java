package com.example.demo.controller;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.NotificacionRequest;
import com.example.demo.dto.NotificacionResponse;
import com.example.demo.service.NotificacionService;
import com.example.demo.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notificaciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificacionController {

    private final NotificacionService notificacionService;
    private final UsuarioService usuarioService;


    private Long getUserId(Principal principal) {
        System.out.println("🔍 getUserId - Principal: " + (principal != null ? principal.getName() : "NULL"));

        if (principal == null) {
            System.out.println("❌ getUserId - Principal es NULL!");
            return null;
        }

        try {
            Long id = Long.parseLong(principal.getName());
            System.out.println("✅ getUserId - Parsed ID: " + id);
            return id;
        } catch (NumberFormatException e) {
            System.out.println("🔍 getUserId - No es un ID numérico, buscando por username: " + principal.getName());
            var usuario = usuarioService.findByUsuario(principal.getName());

            if (usuario != null) {
                System.out.println("✅ getUserId - Usuario encontrado: ID=" + usuario.getId() + ", Username=" + usuario.getUsuario() + ", Role=" + usuario.getRole().getName());
                return usuario.getId();
            } else {
                System.out.println("❌ getUserId - Usuario NO encontrado para username: " + principal.getName());
                return null;
            }
        }
    }

    // Public endpoint for demo/testing
    @GetMapping("/public")
    public ResponseEntity<Page<NotificacionResponse>> obtenerNotificacionesPublic(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir) {


        return ResponseEntity.ok(Page.empty());
    }


    @GetMapping("/public/no-leidas/count")
    public ResponseEntity<Long> contarNotificacionesNoLeidasPublic() {

        return ResponseEntity.ok(0L);
    }


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

    
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificacionResponse> crearNotificacion(@RequestBody NotificacionRequest request) {
        NotificacionResponse notificacion = notificacionService.crearNotificacion(request);
        return ResponseEntity.ok(notificacion);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificacionResponse> actualizarNotificacion(
            @PathVariable(name = "id") Long id,
            @RequestBody NotificacionRequest request) {

        NotificacionResponse notificacion = notificacionService.actualizarNotificacion(id, request);
        return ResponseEntity.ok(notificacion);
    }


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

        System.out.println("🔍 obtenerMisNotificaciones - Iniciando petición");
        System.out.println("🔍 Parámetros - page: " + page + ", size: " + size + ", soloNoLeidas: " + soloNoLeidas);

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ?
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Long usuarioId = getUserId(principal);
        System.out.println("🔍 usuarioId obtenido: " + usuarioId);

        if (usuarioId == null) {
            System.out.println("❌ ERROR: usuarioId es NULL, devolviendo página vacía");
            return ResponseEntity.ok(Page.empty());
        }

        Page<NotificacionResponse> notificaciones;
        if (Boolean.TRUE.equals(soloNoLeidas)) {
            System.out.println("🔍 Obteniendo solo notificaciones no leídas");
            notificaciones = notificacionService.obtenerNotificacionesNoLeidas(usuarioId, pageable);
        } else {
            System.out.println("🔍 Obteniendo todas las notificaciones del usuario");
            notificaciones = notificacionService.obtenerNotificacionesUsuario(usuarioId, pageable);
        }

        System.out.println("✅ Notificaciones obtenidas: " + notificaciones.getTotalElements() + " total");
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