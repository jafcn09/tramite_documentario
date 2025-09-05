package com.example.demo.controller;

import com.example.demo.dto.TramiteRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.service.TramiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tramites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TramiteController {
    
    private final TramiteService tramiteService;
    
    // ENDPOINTS PÚBLICOS (sin token)
    
    // Búsqueda pública de trámites por código
    @GetMapping("/public/buscar")
    public ResponseEntity<Page<TramiteResponse>> buscarTramitesPublico(
            @RequestParam(required = false) String codigo,
            @RequestParam(required = false) String texto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Page<TramiteResponse> tramites;
        if (codigo != null && !codigo.trim().isEmpty()) {
            tramites = tramiteService.buscarPorCodigo(codigo, pageable);
        } else if (texto != null && !texto.trim().isEmpty()) {
            tramites = tramiteService.buscarTramites(texto, pageable);
        } else {
            tramites = tramiteService.obtenerTramitesPublicos(pageable);
        }
        
        return ResponseEntity.ok(tramites);
    }
    
    // Descargar archivo sin token (con código de trámite)
    @GetMapping("/public/{codigo}/archivo/{nombreArchivo}")
    public ResponseEntity<byte[]> descargarArchivoPublico(
            @PathVariable String codigo,
            @PathVariable String nombreArchivo) {
        
        return tramiteService.descargarArchivoPublico(codigo, nombreArchivo);
    }
    
    // Previsualizar trámite sin token
    @GetMapping("/public/preview/{codigo}")
    public ResponseEntity<TramiteResponse> previsualizarTramite(@PathVariable String codigo) {
        TramiteResponse tramite = tramiteService.obtenerTramitePublico(codigo);
        return ResponseEntity.ok(tramite);
    }
    
    // ENDPOINTS PROTEGIDOS (con token)
    
    // Crear trámite (solo USUARIO)
    @PostMapping
    @PreAuthorize("hasRole('USUARIO')")
    public ResponseEntity<TramiteResponse> crearTramite(
            @RequestBody TramiteRequest request,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        String rol = getRole(principal);
        TramiteResponse tramite = tramiteService.crearTramite(request, usuarioId, rol);
        return ResponseEntity.ok(tramite);
    }
    
    // Editar trámite (USUARIO solo sus trámites, ADMIN todos)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> editarTramite(
            @PathVariable Long id,
            @RequestBody TramiteRequest request,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        String rol = getRole(principal);
        TramiteResponse tramite = tramiteService.editarTramite(id, request, usuarioId, rol);
        return ResponseEntity.ok(tramite);
    }
    
    // Recepcionar trámite (ADMINISTRATIVO)
    @PostMapping("/{id}/recepcionar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> recepcionarTramite(
            @PathVariable Long id,
            Principal principal) {
        
        Long trabajadorId = Long.parseLong(principal.getName());
        TramiteResponse tramite = tramiteService.recepcionarTramite(id, trabajadorId);
        return ResponseEntity.ok(tramite);
    }
    
    // Derivar trámite (ADMINISTRATIVO)
    @PostMapping("/{id}/derivar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> derivarTramite(
            @PathVariable Long id,
            @RequestParam Long trabajadorNuevoId,
            @RequestParam String motivo,
            Principal principal) {
        
        Long trabajadorActualId = Long.parseLong(principal.getName());
        TramiteResponse tramite = tramiteService.derivarTramite(id, trabajadorActualId, trabajadorNuevoId, motivo);
        return ResponseEntity.ok(tramite);
    }
    
    // Cambiar estado (ADMINISTRATIVO/ADMIN)
    @PutMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> cambiarEstado(
            @PathVariable Long id,
            @RequestParam String nuevoEstado,
            @RequestParam(required = false) String observaciones,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        TramiteResponse tramite = tramiteService.cambiarEstado(id, nuevoEstado, usuarioId, observaciones);
        return ResponseEntity.ok(tramite);
    }
    
    // Finalizar con archivo (ADMINISTRATIVO/ADMIN)
    @PostMapping("/{id}/finalizar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> finalizarConArchivo(
            @PathVariable Long id,
            @RequestParam MultipartFile archivo,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        String urlArchivo = tramiteService.guardarArchivoRespuesta(archivo);
        TramiteResponse tramite = tramiteService.finalizarConArchivo(id, urlArchivo, usuarioId);
        return ResponseEntity.ok(tramite);
    }
    
    // Eliminar trámite (solo ADMIN)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarTramite(
            @PathVariable Long id,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        String rol = getRole(principal);
        tramiteService.eliminarTramite(id, usuarioId, rol);
        return ResponseEntity.noContent().build();
    }
    
    // Obtener mis trámites
    @GetMapping("/mis-tramites")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<TramiteResponse>> obtenerMisTramites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Principal principal) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Long usuarioId = Long.parseLong(principal.getName());
        String rol = getRole(principal);
        
        Page<TramiteResponse> tramites = tramiteService.obtenerMisTramites(usuarioId, rol, pageable);
        return ResponseEntity.ok(tramites);
    }
    
    // Obtener trámite por ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TramiteResponse> obtenerTramite(
            @PathVariable Long id,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        String rol = getRole(principal);
        TramiteResponse tramite = tramiteService.obtenerTramite(id, usuarioId, rol);
        return ResponseEntity.ok(tramite);
    }
    
    // Búsqueda avanzada (autenticado)
    @GetMapping("/buscar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<TramiteResponse>> buscarTramites(
            @RequestParam(required = false) String texto,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String prioridad,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Principal principal) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Long usuarioId = Long.parseLong(principal.getName());
        String rol = getRole(principal);
        
        Page<TramiteResponse> tramites = tramiteService.buscarTramitesAvanzado(
            usuarioId, rol, texto, estado, tipo, prioridad, pageable
        );
        return ResponseEntity.ok(tramites);
    }
    
    // Subir archivos múltiples
    @PostMapping("/{id}/archivos")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<String>> subirArchivos(
            @PathVariable Long id,
            @RequestParam("archivos") List<MultipartFile> archivos,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        List<String> urlsArchivos = tramiteService.subirArchivosMultiples(id, archivos, usuarioId);
        return ResponseEntity.ok(urlsArchivos);
    }
    
    // Descargar archivo (autenticado)
    @GetMapping("/{id}/archivos/{nombreArchivo}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> descargarArchivo(
            @PathVariable Long id,
            @PathVariable String nombreArchivo,
            Principal principal) {
        
        Long usuarioId = Long.parseLong(principal.getName());
        String rol = getRole(principal);
        return tramiteService.descargarArchivo(id, nombreArchivo, usuarioId, rol);
    }
    
    // Estadísticas (ADMIN)
    @GetMapping("/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> obtenerEstadisticas() {
        Object estadisticas = tramiteService.obtenerEstadisticas();
        return ResponseEntity.ok(estadisticas);
    }
    
    // Métodos auxiliares
    private String getRole(Principal principal) {
        if (principal instanceof Authentication auth) {
            return auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        }
        return "USUARIO";
    }
}