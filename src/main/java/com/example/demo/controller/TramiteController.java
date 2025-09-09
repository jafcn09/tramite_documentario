package com.example.demo.controller;

import com.example.demo.dto.TramiteRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.service.TramiteService;
import com.example.demo.service.JwtService;
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
import jakarta.servlet.http.HttpServletRequest;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tramites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TramiteController {
    
    private final TramiteService tramiteService;
    private final JwtService jwtService;
    
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
    
    // Obtener todos los trámites con paginación (autenticado)
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<TramiteResponse>> obtenerTramites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String prioridad,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        // Use the existing advanced search method
        Page<TramiteResponse> tramites = tramiteService.buscarTramitesAvanzado(
            null, null, null, estado, tipo, prioridad, pageable
        );
        return ResponseEntity.ok(tramites);
    }
    
    // Crear trámite (solo USUARIO)
    @PostMapping(consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('USUARIO')")
    public ResponseEntity<TramiteResponse> crearTramite(
            @RequestParam("tipoTramiteId") Long tipoTramiteId,
            @RequestParam("asunto") String asunto,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("prioridadId") Long prioridadId,
            @RequestParam(value = "areaDestinoId", required = false) Long areaDestinoId,
            @RequestParam(value = "fechaVencimiento", required = false) String fechaVencimiento,
            @RequestParam(value = "documentos", required = false) List<MultipartFile> documentos,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        // Create TramiteRequest from form parameters
        TramiteRequest request = new TramiteRequest();
        request.setTitulo(asunto);
        request.setDescripcion(descripcion);
        
        // Map numeric IDs to enum strings
        String tipoString = mapTipoTramiteIdToString(tipoTramiteId);
        String prioridadString = mapPrioridadIdToString(prioridadId);
        
        request.setTipo(tipoString);
        request.setPrioridad(prioridadString);
        request.setAreaDestinoId(areaDestinoId);
        
        if (fechaVencimiento != null && !fechaVencimiento.isEmpty()) {
            try {
                // Frontend sends ISO 8601 date string like "2025-09-08T15:30:00.000Z"
                // or just date like "2025-09-08"
                if (fechaVencimiento.contains("T")) {
                    // Full datetime
                    request.setFechaVencimiento(LocalDateTime.parse(fechaVencimiento.substring(0, 19)));
                } else {
                    // Date only, set to start of day
                    request.setFechaVencimiento(java.time.LocalDate.parse(fechaVencimiento).atStartOfDay());
                }
            } catch (Exception e) {
                System.err.println("Error parsing date: " + fechaVencimiento + " - " + e.getMessage());
                // Continue without fecha vencimiento instead of failing
                request.setFechaVencimiento(null);
            }
        }
        
        TramiteResponse tramite = tramiteService.crearTramite(request, usuarioId, rol);
        
        // Handle file uploads if any
        if (documentos != null && !documentos.isEmpty()) {
            try {
                tramiteService.subirArchivosMultiples(tramite.getId(), documentos, usuarioId);
            } catch (Exception e) {
                // Log error but don't fail the trámite creation
                System.err.println("Error uploading files: " + e.getMessage());
            }
        }
        return ResponseEntity.ok(tramite);
    }
    
    // Editar trámite (USUARIO solo sus trámites, ADMIN todos)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> editarTramite(
            @PathVariable Long id,
            @RequestBody TramiteRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        TramiteResponse tramite = tramiteService.editarTramite(id, request, usuarioId, rol);
        return ResponseEntity.ok(tramite);
    }
    
    // Recepcionar trámite (ADMINISTRATIVO)
    @PostMapping("/{id}/recepcionar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> recepcionarTramite(
            @PathVariable Long id,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long trabajadorId = getUserIdFromToken(httpRequest);
        if (trabajadorId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
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
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long trabajadorActualId = getUserIdFromToken(httpRequest);
        if (trabajadorActualId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
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
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        TramiteResponse tramite = tramiteService.cambiarEstado(id, nuevoEstado, usuarioId, observaciones);
        return ResponseEntity.ok(tramite);
    }
    
    // Finalizar con archivo (ADMINISTRATIVO/ADMIN)
    @PostMapping("/{id}/finalizar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> finalizarConArchivo(
            @PathVariable Long id,
            @RequestParam MultipartFile archivo,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String urlArchivo = tramiteService.guardarArchivoRespuesta(archivo);
        TramiteResponse tramite = tramiteService.finalizarConArchivo(id, urlArchivo, usuarioId);
        return ResponseEntity.ok(tramite);
    }
    
    // Eliminar trámite (solo ADMIN)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarTramite(
            @PathVariable Long id,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
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
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        Page<TramiteResponse> tramites = tramiteService.obtenerMisTramites(usuarioId, rol, pageable);
        return ResponseEntity.ok(tramites);
    }
    
    // Obtener trámite por ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TramiteResponse> obtenerTramite(
            @PathVariable Long id,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
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
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
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
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        List<String> urlsArchivos = tramiteService.subirArchivosMultiples(id, archivos, usuarioId);
        return ResponseEntity.ok(urlsArchivos);
    }
    
    // Descargar archivo (autenticado)
    @GetMapping("/{id}/archivos/{nombreArchivo}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> descargarArchivo(
            @PathVariable Long id,
            @PathVariable String nombreArchivo,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        return tramiteService.descargarArchivo(id, nombreArchivo, usuarioId, rol);
    }
    
    // Estadísticas generales (ADMIN)
    @GetMapping("/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> obtenerEstadisticas() {
        Object estadisticas = tramiteService.obtenerEstadisticas();
        return ResponseEntity.ok(estadisticas);
    }
    
    // Estadísticas del usuario (todos los roles autenticados)
    @GetMapping("/mis-tramites/estadisticas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> obtenerMisEstadisticas(
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        Object estadisticas = tramiteService.obtenerEstadisticasUsuario(usuarioId, rol);
        return ResponseEntity.ok(estadisticas);
    }
    
    // Obtener tipos de trámite disponibles
    @GetMapping("/tipos")
    public ResponseEntity<List<java.util.Map<String, Object>>> obtenerTiposTramite() {
        List<java.util.Map<String, Object>> tipos = new java.util.ArrayList<>();
        
        com.example.demo.model.Tramite.TipoTramite[] enumValues = com.example.demo.model.Tramite.TipoTramite.values();
        for (int i = 0; i < enumValues.length; i++) {
            com.example.demo.model.Tramite.TipoTramite tipo = enumValues[i];
            java.util.Map<String, Object> tipoMap = new java.util.HashMap<>();
            tipoMap.put("id", i + 1); // Use 1-based numeric IDs
            tipoMap.put("nombre", formatearNombreTipo(tipo.name()));
            tipoMap.put("descripcion", obtenerDescripcionTipo(tipo.name()));
            tipos.add(tipoMap);
        }
        
        return ResponseEntity.ok(tipos);
    }
    
    // Obtener prioridades de trámite disponibles
    @GetMapping("/prioridades")
    public ResponseEntity<List<java.util.Map<String, Object>>> obtenerPrioridadesTramite() {
        List<java.util.Map<String, Object>> prioridades = new java.util.ArrayList<>();
        
        com.example.demo.model.Tramite.PrioridadTramite[] enumValues = com.example.demo.model.Tramite.PrioridadTramite.values();
        for (int i = 0; i < enumValues.length; i++) {
            com.example.demo.model.Tramite.PrioridadTramite prioridad = enumValues[i];
            java.util.Map<String, Object> prioridadMap = new java.util.HashMap<>();
            prioridadMap.put("id", i + 1); // Use 1-based numeric IDs
            prioridadMap.put("nombre", formatearNombrePrioridad(prioridad.name()));
            prioridadMap.put("nivel", i + 1);
            prioridadMap.put("color", obtenerColorPrioridad(prioridad.name()));
            prioridadMap.put("icono", obtenerIconoPrioridad(prioridad.name()));
            prioridades.add(prioridadMap);
        }
        
        return ResponseEntity.ok(prioridades);
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
    
    private String formatearNombreTipo(String tipo) {
        return switch (tipo) {
            case "SOLICITUD_CERTIFICADO" -> "Solicitud de Certificado";
            case "SOLICITUD_CONSTANCIA" -> "Solicitud de Constancia";
            case "SOLICITUD_PERMISO" -> "Solicitud de Permiso";
            case "RECLAMO" -> "Reclamo";
            case "SUGERENCIA" -> "Sugerencia";
            case "CONSULTA" -> "Consulta";
            case "LICENCIA" -> "Licencia";
            case "AUTORIZACION" -> "Autorización";
            case "REVISION_EXPEDIENTE" -> "Revisión de Expediente";
            case "TRAMITE_ACADEMICO" -> "Trámite Académico";
            case "TRAMITE_ADMINISTRATIVO" -> "Trámite Administrativo";
            case "OTRO" -> "Otro";
            default -> tipo.replace("_", " ");
        };
    }
    
    private String obtenerDescripcionTipo(String tipo) {
        return switch (tipo) {
            case "SOLICITUD_CERTIFICADO" -> "Solicitud para obtener certificados oficiales";
            case "SOLICITUD_CONSTANCIA" -> "Solicitud para obtener constancias oficiales";
            case "SOLICITUD_PERMISO" -> "Solicitud para obtener permisos especiales";
            case "RECLAMO" -> "Presentación de reclamos o quejas";
            case "SUGERENCIA" -> "Envío de sugerencias para mejoras";
            case "CONSULTA" -> "Consultas sobre procedimientos o servicios";
            case "LICENCIA" -> "Solicitud de licencias especializadas";
            case "AUTORIZACION" -> "Solicitud de autorizaciones especiales";
            case "REVISION_EXPEDIENTE" -> "Revisión y actualización de expedientes";
            case "TRAMITE_ACADEMICO" -> "Trámites relacionados con estudios académicos";
            case "TRAMITE_ADMINISTRATIVO" -> "Trámites de índole administrativa general";
            case "OTRO" -> "Otros tipos de trámites no especificados";
            default -> "Descripción no disponible";
        };
    }
    
    private String mapTipoTramiteIdToString(Long tipoTramiteId) {
        return switch (tipoTramiteId.intValue()) {
            case 1 -> "SOLICITUD_CERTIFICADO";
            case 2 -> "SOLICITUD_CONSTANCIA";
            case 3 -> "SOLICITUD_PERMISO";
            case 4 -> "RECLAMO";
            case 5 -> "SUGERENCIA";
            case 6 -> "CONSULTA";
            case 7 -> "LICENCIA";
            case 8 -> "AUTORIZACION";
            case 9 -> "REVISION_EXPEDIENTE";
            case 10 -> "TRAMITE_ACADEMICO";
            case 11 -> "TRAMITE_ADMINISTRATIVO";
            case 12 -> "OTRO";
            default -> "OTRO";
        };
    }
    
    private String mapPrioridadIdToString(Long prioridadId) {
        return switch (prioridadId.intValue()) {
            case 1 -> "BAJA";
            case 2 -> "NORMAL";
            case 3 -> "ALTA";
            case 4 -> "URGENTE";
            default -> "NORMAL";
        };
    }
    
    private String formatearNombrePrioridad(String prioridad) {
        return switch (prioridad) {
            case "BAJA" -> "Baja";
            case "NORMAL" -> "Normal";
            case "ALTA" -> "Alta";
            case "URGENTE" -> "Urgente";
            default -> prioridad;
        };
    }
    
    private String obtenerColorPrioridad(String prioridad) {
        return switch (prioridad) {
            case "BAJA" -> "#28a745";
            case "NORMAL" -> "#17a2b8";
            case "ALTA" -> "#ffc107";
            case "URGENTE" -> "#dc3545";
            default -> "#17a2b8";
        };
    }
    
    private String obtenerIconoPrioridad(String prioridad) {
        return switch (prioridad) {
            case "BAJA" -> "fas fa-arrow-down";
            case "NORMAL" -> "fas fa-minus";
            case "ALTA" -> "fas fa-arrow-up";
            case "URGENTE" -> "fas fa-exclamation";
            default -> "fas fa-minus";
        };
    }
}