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


        if (principal == null) {

            return null;
        }

        try {
            Long id = Long.parseLong(principal.getName());

            return id;
        } catch (NumberFormatException e) {

            var usuario = usuarioService.findByUsuario(principal.getName());

            if (usuario != null) {

                return usuario.getId();
            } else {

                return null;
            }
        }
    }

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
    public ResponseEntity<Void> eliminarNotificacion(@PathVariable("id") Long notificacionId) {
        notificacionService.eliminarNotificacion(notificacionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> obtenerEstadisticas() {
        Object estadisticas = notificacionService.obtenerEstadisticasNotificaciones();
        return ResponseEntity.ok(estadisticas);
    }

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


        if (usuarioId == null) {

            return ResponseEntity.ok(Page.empty());
        }

        Page<NotificacionResponse> notificaciones;
        if (Boolean.TRUE.equals(soloNoLeidas)) {

            notificaciones = notificacionService.obtenerNotificacionesNoLeidas(usuarioId, pageable);
        } else {

            notificaciones = notificacionService.obtenerNotificacionesUsuario(usuarioId, pageable);
        }


        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/no-leidas/count")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Long> contarNotificacionesNoLeidas(Principal principal) {
        Long usuarioId = getUserId(principal);
        Long count = notificacionService.contarNotificacionesNoLeidas(usuarioId);
        return ResponseEntity.ok(count);
    }

    @PutMapping("/{id}/marcar-leida")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> marcarComoLeida(
            @PathVariable(name = "id") Long id,
            Principal principal) {

        Long usuarioId = getUserId(principal);
        notificacionService.marcarComoLeida(id, usuarioId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/marcar-todas-leidas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> marcarTodasComoLeidas(Principal principal) {
        Long usuarioId = getUserId(principal);
        notificacionService.marcarTodasComoLeidas(usuarioId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/eliminar-todas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> eliminarTodasMisNotificaciones(Principal principal) {
        Long usuarioId = getUserId(principal);
        notificacionService.eliminarTodasNotificacionesUsuario(usuarioId);
        return ResponseEntity.noContent().build();
    }

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