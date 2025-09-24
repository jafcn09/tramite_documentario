package com.example.demo.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ActualizarTramiteConArchivosRequest;
import com.example.demo.dto.AprobarTramiteRequest;
import com.example.demo.dto.AprobarTramiteResponse;
import com.example.demo.dto.TramiteConArchivosRequest;
import com.example.demo.dto.TramiteRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.service.JwtService;
import com.example.demo.service.TramiteService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

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
            @RequestParam(name = "codigo", required = false) String codigo,
            @RequestParam(name = "texto", required = false) String texto,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir) {

        // Limitar tamaño máximo para búsquedas públicas para prevenir sobrecarga
        int limitedSize = Math.min(size, 10);

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ?
            Sort.Direction.DESC : Sort.Direction.ASC;

        // Usar ID para ordenamiento más eficiente
        String sortField = "fechaCreacion".equals(sortBy) ? "id" : sortBy;
        Pageable pageable = PageRequest.of(page, limitedSize, Sort.by(direction, sortField));
        
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
    
    // Descargar todos los documentos públicamente (sin token)
    @GetMapping("/public/{codigo}/documentos/descargar-todos")
    public ResponseEntity<byte[]> descargarTodosDocumentosPublico(@PathVariable String codigo) {
        return tramiteService.descargarTodosDocumentosPublico(codigo);
    }
    
    // Previsualizar trámite sin token
    @GetMapping("/public/preview/{codigo}")
    public ResponseEntity<TramiteResponse> previsualizarTramite(@PathVariable String codigo) {
        TramiteResponse tramite = tramiteService.obtenerTramitePublico(codigo);
        return ResponseEntity.ok(tramite);
    }
    

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<TramiteResponse>> obtenerTramites(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(name = "estado", required = false) String estado,
            @RequestParam(name = "tipo", required = false) String tipo,
            @RequestParam(name = "prioridad", required = false) String prioridad,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
            Sort.Direction.DESC : Sort.Direction.ASC;
        
        // Optimización: usar ID en lugar de fechaCreacion para mejor rendimiento MySQL
        String sortField = "fechaCreacion".equals(sortBy) ? "id" : sortBy;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        // Use the existing advanced search method
        Page<TramiteResponse> tramites = tramiteService.buscarTramitesAvanzado(
            usuarioId, rol, null, estado, tipo, prioridad, pageable
        );
        return ResponseEntity.ok(tramites);
    }
    
    // Crear trámite (USUARIO y ADMIN)
    @PostMapping(consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
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
                System.out.println("Subiendo " + documentos.size() + " archivos para el trámite " + tramite.getCodigo());
                tramiteService.subirArchivosMultiples(tramite.getId(), documentos, usuarioId);
                System.out.println("Archivos subidos exitosamente para el trámite " + tramite.getCodigo());
            } catch (Exception e) {
                // Log error but don't fail the trámite creation
                System.err.println("Error uploading files: " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            System.out.println("No se recibieron archivos para el trámite " + (tramite != null ? tramite.getCodigo() : "null"));
        }
        return ResponseEntity.ok(tramite);
    }
    
    // Editar trámite (USUARIO solo sus trámites, ADMIN todos)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> editarTramite(
            @PathVariable(name = "id") Long id,
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
            @PathVariable(name = "id") Long id,
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
            @PathVariable(name = "id") Long id,
            @RequestParam(name = "trabajadorNuevoId") Long trabajadorNuevoId,
            @RequestParam(name = "motivo") String motivo,
            Principal principal,
            HttpServletRequest httpRequest) {

        System.out.println("🔍 Derivar trámite - ID: " + id);
        System.out.println("🔍 Trabajador nuevo ID: " + trabajadorNuevoId);
        System.out.println("🔍 Motivo: " + motivo);

        Long trabajadorActualId = getUserIdFromToken(httpRequest);
        System.out.println("🔍 Trabajador actual ID (del token): " + trabajadorActualId);

        if (trabajadorActualId == null) {
            System.err.println("❌ Error: No se pudo obtener el ID del usuario del token");
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }

        try {
            TramiteResponse tramite = tramiteService.derivarTramite(id, trabajadorActualId, trabajadorNuevoId, motivo);
            System.out.println("✅ Trámite derivado exitosamente");
            return ResponseEntity.ok(tramite);
        } catch (Exception e) {
            System.err.println("❌ Error al derivar trámite: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    
    // Aprobar trámite (ADMINISTRATIVO/ADMIN)
    @PostMapping("/{id}/aprobar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<AprobarTramiteResponse> aprobarTramite(
            @PathVariable(name = "id") Long id,
            @RequestBody AprobarTramiteRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long administrativoId = getUserIdFromToken(httpRequest);
        if (administrativoId == null) {
            System.err.println("❌ Error en aprobarTramite: No se pudo obtener el ID del usuario del token");
            System.err.println("❌ Authorization header: " + httpRequest.getHeader("Authorization"));
            System.err.println("❌ Principal: " + principal);
            System.err.println("❌ Principal name: " + (principal != null ? principal.getName() : "null"));
            throw new RuntimeException("Token inválido o expirado. No se pudo obtener el ID del usuario del token");
        }
        AprobarTramiteResponse response = tramiteService.aprobarTramite(id, request, administrativoId);
        return ResponseEntity.ok(response);
    }
    
    // Responder trámite (ADMINISTRATIVO/ADMIN) - Nuevo endpoint
    @PostMapping("/{id}/responder")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<com.example.demo.dto.ResponderTramiteResponse> responderTramite(
            @PathVariable(name = "id") Long id,
            @RequestParam("respuesta") String respuesta,
            @RequestParam(value = "observaciones", required = false) String observaciones,
            @RequestParam(value = "asunto", required = false) String asunto,
            @RequestParam(value = "archivos", required = false) List<MultipartFile> archivos,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long administrativoId = getUserIdFromToken(httpRequest);
        if (administrativoId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        
        com.example.demo.dto.ResponderTramiteRequest request = new com.example.demo.dto.ResponderTramiteRequest();
        request.setRespuesta(respuesta);
        request.setObservaciones(observaciones);
        request.setAsunto(asunto);
        request.setArchivosRespuesta(archivos);
        
        com.example.demo.dto.ResponderTramiteResponse response = tramiteService.responderTramite(id, request, administrativoId);
        return ResponseEntity.ok(response);
    }
    
    // Cambiar estado (ADMINISTRATIVO/ADMIN)
    @PutMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> cambiarEstado(
            @PathVariable(name = "id") Long id,
            @RequestParam(name = "nuevoEstado") String nuevoEstado,
            @RequestParam(name = "observaciones", required = false) String observaciones,
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
            @PathVariable(name = "id") Long id,
            @RequestParam(name = "archivo") MultipartFile archivo,
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
            @PathVariable(name = "id") Long id,
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
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir,
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
            @PathVariable(name = "id") Long id,
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
            @RequestParam(name = "texto", required = false) String texto,
            @RequestParam(name = "estado", required = false) String estado,
            @RequestParam(name = "tipo", required = false) String tipo,
            @RequestParam(name = "prioridad", required = false) String prioridad,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir,
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
            @PathVariable(name = "id") Long id,
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
    
    // Subir documentos múltiples (alias para compatibilidad con frontend)
    @PostMapping("/{id}/documentos")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<String>> subirDocumentos(
            @PathVariable(name = "id") Long id,
            @RequestParam(value = "documentos", required = false) List<MultipartFile> documentos,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        
        if (documentos == null || documentos.isEmpty()) {
            return ResponseEntity.ok(new java.util.ArrayList<>());
        }
        
        List<String> urlsDocumentos = tramiteService.subirArchivosMultiples(id, documentos, usuarioId);
        return ResponseEntity.ok(urlsDocumentos);
    }

    // NUEVOS ENDPOINTS PARA ARCHIVOS EN BASE64

    // Crear trámite con archivos en base64
    @PostMapping("/con-archivos")
    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> crearTramiteConArchivos(
            @RequestBody TramiteConArchivosRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);

        TramiteResponse tramiteCreado = tramiteService.crearTramiteConArchivos(request, usuarioId, rol);
        return ResponseEntity.ok(tramiteCreado);
    }

    // Actualizar trámite con archivos en base64
    @PutMapping("/{id}/con-archivos")
    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> actualizarTramiteConArchivos(
            @PathVariable("id") Long id,
            @RequestBody ActualizarTramiteConArchivosRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);

        TramiteResponse tramiteActualizado = tramiteService.actualizarTramiteConArchivos(id, request, usuarioId, rol);
        return ResponseEntity.ok(tramiteActualizado);
    }

    // Descargar archivo (autenticado)
    @GetMapping("/{id}/archivos/{nombreArchivo}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> descargarArchivo(
            @PathVariable(name = "id") Long id,
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

    @GetMapping("/{id}/documentos/descargar-todos")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<byte[]> descargarTodosDocumentos(
            @PathVariable(name = "id") Long id,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        return tramiteService.descargarTodosDocumentos(id, usuarioId, rol);
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

    // Verificar permisos de acciones para un trámite (considerando vencimiento)
    @GetMapping("/{id}/permisos")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<java.util.Map<String, Boolean>> verificarPermisosAcciones(
            @PathVariable(name = "id") Long id,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);

        java.util.Map<String, Boolean> permisos = tramiteService.verificarPermisosAcciones(id, usuarioId, rol);
        return ResponseEntity.ok(permisos);
    }
    
    // Obtener tipos de trámite disponibles
    @GetMapping("/tipos")
    public ResponseEntity<List<java.util.Map<String, Object>>> obtenerTiposTramite() {
        List<java.util.Map<String, Object>> tipos = new java.util.ArrayList<>();
        
        com.example.demo.model.Tramite.TipoTramite[] enumValues = com.example.demo.model.Tramite.TipoTramite.values();
        for (int i = 0; i < enumValues.length; i++) {
            com.example.demo.model.Tramite.TipoTramite tipo = enumValues[i];
            java.util.Map<String, Object> tipoMap = new java.util.HashMap<>();
            tipoMap.put("id", i + 1); 
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

    // Rechazar trámite - SOLO administrativos
    @PutMapping("/{id}/rechazar")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<com.example.demo.dto.RechazarTramiteResponse> rechazarTramite(
            @PathVariable Long id,
            @RequestBody com.example.demo.dto.RechazarTramiteRequest request,
            Authentication authentication) {

        try {
            Long administrativoId = jwtService.extractUserId(
                authentication.getCredentials().toString());

            // Validar que el trámite ID coincida
            if (!id.equals(request.getTramiteId())) {
                throw new RuntimeException("El ID del trámite no coincide");
            }

            com.example.demo.dto.RechazarTramiteResponse response =
                tramiteService.rechazarTramite(id, request, administrativoId);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            throw new RuntimeException("Error al rechazar el trámite: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/imprimir")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO', 'USUARIO')")
    public ResponseEntity<String> imprimirTramite(@PathVariable Long id, HttpServletRequest request) {
        try {
            Long usuarioId = getUserIdFromToken(request);

            if (usuarioId == null) {
                throw new RuntimeException("No se pudo obtener el ID del usuario del token");
            }

            // Generar HTML para impresión
            String htmlContent = tramiteService.generarHtmlParaImpresion(id, usuarioId);

            return ResponseEntity.ok()
                .header("Content-Type", "text/html; charset=UTF-8")
                .body(htmlContent);

        } catch (Exception e) {
            throw new RuntimeException("Error al generar documento para impresión: " + e.getMessage());
        }
    }
}