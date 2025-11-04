package com.example.demo.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.example.demo.dto.AprobarTramiteRequest;
import com.example.demo.dto.AprobarTramiteResponse;
import com.example.demo.dto.EditarTramiteRequest;
import com.example.demo.dto.TramiteConArchivosRequest;
import com.example.demo.dto.TramiteRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.enums.DepartamentoPeru;
import com.example.demo.model.FirmaDigital;
import com.example.demo.service.FileValidationService;
import com.example.demo.service.InputSanitizerService;
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
    private final FileValidationService fileValidationService;
    private final InputSanitizerService inputSanitizerService;
    

    @GetMapping("/public/buscar")
    public ResponseEntity<Page<TramiteResponse>> buscarTramitesPublico(
            @RequestParam(name = "codigo", required = false) String codigo,
            @RequestParam(name = "texto", required = false) String texto,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            @RequestParam(name = "sortBy", defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "desc") String sortDir) {

        int limitedSize = Math.min(size, 10);

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ?
            Sort.Direction.DESC : Sort.Direction.ASC;

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
    

    @GetMapping("/public/{codigo}/archivo/{nombreArchivo}")
    public ResponseEntity<byte[]> descargarArchivoPublico(
            @PathVariable String codigo,
            @PathVariable String nombreArchivo) {
        
        return tramiteService.descargarArchivoPublico(codigo, nombreArchivo);
    }

    @GetMapping("/public/{codigo}/documentos/descargar-todos")
    public ResponseEntity<byte[]> descargarTodosDocumentosPublico(@PathVariable String codigo) {
        return tramiteService.descargarTodosDocumentosPublico(codigo);
    }
    

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
        
        String sortField = "fechaCreacion".equals(sortBy) ? "id" : sortBy;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        Page<TramiteResponse> tramites = tramiteService.buscarTramitesAvanzado(
            usuarioId, rol, null, estado, tipo, prioridad, pageable
        );
        return ResponseEntity.ok(tramites);
    }
    
    @PostMapping(consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('USUARIO') || hasRole('ADMIN') || hasRole('ESTUDIANTE')")
    public ResponseEntity<?> crearTramite(
            @RequestParam("tipoTramiteId") Long tipoTramiteId,
            @RequestParam("asunto") String asunto,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("prioridadId") Long prioridadId,
            @RequestParam(value = "areaDestinoId", required = false) Long areaDestinoId,
            @RequestParam(value = "fechaVencimiento", required = false) String fechaVencimiento,
            @RequestParam(value = "documentos", required = false) List<MultipartFile> documentos,
            @RequestParam(value = "requiereFirmaDigital", required = false, defaultValue = "false") Boolean requiereFirmaDigital,
            @RequestParam(value = "firmanteId", required = false) Long firmanteId,
            @RequestParam(value = "tipoFirma", required = false, defaultValue = "SIMPLE") String tipoFirma,
            @RequestParam(value = "razonFirma", required = false) String razonFirma,
            @RequestParam(value = "ubicacionFirma", required = false) String ubicacionFirma,
            @RequestParam(value = "consentimientoFirma", required = false, defaultValue = "false") Boolean consentimientoFirma,
            @RequestParam(value = "firmaDigitalData", required = false) String firmaDigitalData,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }

  
        inputSanitizerService.validateNotEmpty("asunto", asunto);
        inputSanitizerService.validateNotEmpty("descripcion", descripcion);
        inputSanitizerService.validateLength("asunto", asunto, 255);
        inputSanitizerService.validateLength("descripcion", descripcion, 2000);

        String asuntoSanitizado = inputSanitizerService.sanitizeTextField(asunto);
        String descripcionSanitizada = inputSanitizerService.sanitizeTextField(descripcion);

   
        if (documentos != null && !documentos.isEmpty()) {
            fileValidationService.validateFiles(documentos);

            
            long totalSize = fileValidationService.getTotalSize(documentos);
            if (totalSize > 50 * 1024 * 1024) {
                throw new IllegalArgumentException(
                    "El tamaño total de los archivos excede el límite de 50MB"
                );
            }
        }
        String rol = getRole(principal);

        TramiteRequest request = new TramiteRequest();
        request.setTitulo(asuntoSanitizado);  
        request.setDescripcion(descripcionSanitizada);  
        
        String tipoString = mapTipoTramiteIdToString(tipoTramiteId);
        String prioridadString = mapPrioridadIdToString(prioridadId);
        
        request.setTipo(tipoString);
        request.setPrioridad(prioridadString);
        request.setAreaDestinoId(areaDestinoId);
        
        if (fechaVencimiento != null && !fechaVencimiento.isEmpty()) {
            try {
                if (fechaVencimiento.contains("T")) {
                    request.setFechaVencimiento(LocalDateTime.parse(fechaVencimiento.substring(0, 19)));
                } else {
                    request.setFechaVencimiento(java.time.LocalDate.parse(fechaVencimiento).atStartOfDay());
                }
            } catch (Exception e) {
                System.err.println("Error parsing date: " + fechaVencimiento + " - " + e.getMessage());
                request.setFechaVencimiento(null);
            }
        }

        if (requiereFirmaDigital != null && requiereFirmaDigital) {
            request.setRequiereFirmaDigital(true);
            request.setFirmanteId(firmanteId != null ? firmanteId : usuarioId);
            request.setTipoFirma(tipoFirma);
            request.setRazonFirma(razonFirma != null ? razonFirma : "Firma digital del trámite");
            if (ubicacionFirma != null && !ubicacionFirma.isEmpty()) {
                try {
                    request.setUbicacionFirma(com.example.demo.enums.DepartamentoPeru.valueOf(ubicacionFirma.toUpperCase()));
                } catch (IllegalArgumentException e) {
                    request.setUbicacionFirma(com.example.demo.enums.DepartamentoPeru.LIMA);
                }
            } else {
                request.setUbicacionFirma(com.example.demo.enums.DepartamentoPeru.LIMA);
            }
            request.setConsentimientoFirma(consentimientoFirma != null ? consentimientoFirma : false);
            request.setFirmaDigitalData(firmaDigitalData);
        } else {
            request.setRequiereFirmaDigital(false);
            request.setConsentimientoFirma(false);
        }

        TramiteResponse tramite;
        try {
            tramite = tramiteService.crearTramite(request, usuarioId, rol);
        } catch (RuntimeException e) {
            String mensaje = e.getMessage();
            if (mensaje != null && mensaje.contains("Ya existe un trámite con el mismo contenido")) {
                return ResponseEntity.badRequest().body(mensaje);
            }
            throw e;
        }

        if (documentos != null && !documentos.isEmpty()) {
            try {
                tramiteService.subirArchivosMultiples(tramite.getId(), documentos, usuarioId);
            } catch (Exception e) {
                System.err.println("Error uploading files: " + e.getMessage());
                e.printStackTrace();
            }
        }
        return ResponseEntity.ok(tramite);
    }
    

    @PutMapping(value = "/{id}/editar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('USUARIO') or hasRole('ADMIN')")
    public ResponseEntity<?> editarTramiteUsuario(
            @PathVariable(name = "id") Long id,
            @RequestPart(value = "descripcion", required = false) String descripcion,
            @RequestPart(value = "observaciones", required = false) String observaciones,
            @RequestPart(value = "documentosNuevos", required = false) List<MultipartFile> documentosNuevos,
            @RequestPart(value = "documentosAEliminar", required = false) String documentosAEliminarJson,
            @RequestPart(value = "firmaDigital", required = false) String firmaDigitalJson,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }

        try {
            com.example.demo.dto.EditarTramiteRequest request = com.example.demo.dto.EditarTramiteRequest.builder()
                .descripcion(descripcion)
                .observaciones(observaciones)
                .build();
            if (firmaDigitalJson != null && !firmaDigitalJson.trim().isEmpty()) {
                ObjectMapper mapper = new ObjectMapper();
                try {
                    Map<String, Object> firmaData = mapper.readValue(firmaDigitalJson, Map.class);

                    request.setTipoFirma((String) firmaData.get("tipoFirma"));
                    request.setRazonFirma((String) firmaData.get("razonFirma"));
                    request.setUbicacionFirma((String) firmaData.get("ubicacionFirma"));
                    request.setFirmaDigitalData((String) firmaData.get("firmaDigitalData"));
                    request.setRequiereFirmaDigital(firmaData.get("firmaDigitalData") != null);

                    System.out.println("✅ Firma digital procesada correctamente:");
                    System.out.println("- Tipo: " + request.getTipoFirma());
                    System.out.println("- Razón: " + request.getRazonFirma());
                    System.out.println("- Ubicación: " + request.getUbicacionFirma());
                    System.out.println("- Tiene firma: " + (request.getFirmaDigitalData() != null));

                } catch (JsonProcessingException e) {
                    System.err.println("❌ Error al procesar JSON de firma digital: " + e.getMessage());
                    return ResponseEntity.badRequest().body("Error al procesar datos de firma digital");
                }
            }

            TramiteResponse tramite = tramiteService.editarTramiteUsuario(id, request, usuarioId);
            return ResponseEntity.ok(tramite);
        } catch (RuntimeException e) {
            String mensaje = e.getMessage();
            if (mensaje != null && (mensaje.contains("mismo contenido que ya existe") ||
                                  mensaje.contains("No se detectaron cambios"))) {
                return ResponseEntity.badRequest().body(mensaje);
            }
            throw e;
        }
    }
    

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
    @PostMapping("/{id}/asignarse")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> asignarseTramite(
            @PathVariable(name = "id") Long id,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long trabajadorId = getUserIdFromToken(httpRequest);
        if (trabajadorId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }

        TramiteResponse tramite = tramiteService.asignarseTramite(id, trabajadorId);
        return ResponseEntity.ok(tramite);
    }
    

    @PostMapping("/{id}/derivar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<TramiteResponse> derivarTramite(
            @PathVariable(name = "id") Long id,
            @RequestParam(name = "trabajadorNuevoId") Long trabajadorNuevoId,
            @RequestParam(name = "motivo") String motivo,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long trabajadorActualId = getUserIdFromToken(httpRequest);
        if (trabajadorActualId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }

        try {
            TramiteResponse tramite = tramiteService.derivarTramite(id, trabajadorActualId, trabajadorNuevoId, motivo);
            return ResponseEntity.ok(tramite);
        } catch (Exception e) {
            System.err.println("❌ Error al derivar trámite: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
    

    @PostMapping("/{id}/aprobar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<AprobarTramiteResponse> aprobarTramite(
            @PathVariable(name = "id") Long id,
            @RequestBody AprobarTramiteRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long administrativoId = getUserIdFromToken(httpRequest);
        if (administrativoId == null) {
            throw new RuntimeException("Token inválido o expirado. No se pudo obtener el ID del usuario del token");
        }
        AprobarTramiteResponse response = tramiteService.aprobarTramite(id, request, administrativoId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/responder")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<com.example.demo.dto.ResponderTramiteResponse> responderTramite(
            @PathVariable(name = "id") Long id,
            @RequestParam("respuesta") String respuesta,
            @RequestParam(value = "observaciones", required = false) String observaciones,
            @RequestParam(value = "asunto", required = false) String asunto,
            @RequestParam(value = "archivos", required = false) List<MultipartFile> archivos,
            // Nuevos parámetros para firma digital
            @RequestParam(value = "requiereFirmaDigital", required = false, defaultValue = "false") Boolean requiereFirmaDigital,
            @RequestParam(value = "tipoFirma", required = false) String tipoFirma,
            @RequestParam(value = "razonFirma", required = false) String razonFirma,
            @RequestParam(value = "ubicacionFirma", required = false) String ubicacionFirma,
            @RequestParam(value = "consentimientoFirma", required = false, defaultValue = "false") Boolean consentimientoFirma,
            @RequestParam(value = "firmaDigitalArchivo", required = false) MultipartFile firmaDigitalArchivo,
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
        request.setRequiereFirmaDigital(requiereFirmaDigital);
        request.setTipoFirma(tipoFirma);
        request.setRazonFirma(razonFirma);
        if (ubicacionFirma != null && !ubicacionFirma.trim().isEmpty()) {
            try {
                DepartamentoPeru departamento = DepartamentoPeru.valueOf(ubicacionFirma.trim().toUpperCase());
                request.setUbicacionFirma(departamento);
            } catch (IllegalArgumentException e) {

                DepartamentoPeru departamento = DepartamentoPeru.fromNombre(ubicacionFirma);
                if (departamento != null) {
                    request.setUbicacionFirma(departamento);
                } else {
                    throw new RuntimeException("Departamento no válido: " + ubicacionFirma);
                }
            }
        }

        request.setConsentimientoFirma(consentimientoFirma);
        request.setFirmaDigitalArchivo(firmaDigitalArchivo);

        com.example.demo.dto.ResponderTramiteResponse response = tramiteService.responderTramite(id, request, administrativoId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/responder-con-firma")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> responderTramiteConFirma(
            @PathVariable(name = "id") Long id,
            @RequestParam("respuesta") String respuesta,
            @RequestParam(value = "observaciones", required = false) String observaciones,
            @RequestParam(value = "asunto", required = false) String asunto,
            @RequestParam(value = "archivos", required = false) List<MultipartFile> archivos,
            @RequestParam(value = "requiereFirma", defaultValue = "true") Boolean requiereFirma,
            @RequestParam(value = "nivelAutorizacion", defaultValue = "2") Integer nivelAutorizacion,
            Principal principal,
            HttpServletRequest httpRequest) {

        try {
            Long administrativoId = getUserIdFromToken(httpRequest);
            if (administrativoId == null) {
                throw new RuntimeException("No se pudo obtener el ID del usuario del token");
            }
            com.example.demo.dto.ResponderTramiteRequest request = new com.example.demo.dto.ResponderTramiteRequest();
            request.setRespuesta(respuesta);
            request.setObservaciones(observaciones);
            request.setAsunto(asunto);
            request.setArchivosRespuesta(archivos);

            com.example.demo.dto.ResponderTramiteResponse tramiteResponse = tramiteService.responderTramite(id, request, administrativoId);

            Map<String, Object> response = new HashMap<>();
            response.put("tramiteResponse", tramiteResponse);
            response.put("requiereFirma", requiereFirma);

            if (requiereFirma) {
                response.put("mensaje", "Trámite respondido. Se requiere firma digital para completar el proceso.");
                response.put("firmaRequerida", true);
                response.put("siguientePaso", "Proceder a firmar digitalmente la respuesta");
            } else {
                response.put("mensaje", "Trámite respondido exitosamente sin requerir firma digital.");
                response.put("firmaRequerida", false);
            }

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error al responder trámite con firma: " + e.getMessage());
            errorResponse.put("timestamp", java.time.LocalDateTime.now().toString());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }


    @GetMapping("/{id}/requiere-firma")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> verificarRequiereFirma(@PathVariable Long id) {
        try {
            Map<String, Object> resultado = new HashMap<>();
            resultado.put("tramiteId", id);
            resultado.put("requiereFirma", true); 
            resultado.put("nivelAutorizacionRequerido", 2); 
            resultado.put("tipoFirmaRecomendado", "APROBACION");
            resultado.put("razonamiento", "Los trámites administrativos requieren firma digital por política de seguridad");

            return ResponseEntity.ok(resultado);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error verificando requerimiento de firma: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
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


    @GetMapping("/{id}/edicion")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<TramiteResponse> obtenerTramiteParaEdicion(
            @PathVariable(name = "id") Long id,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        TramiteResponse tramite = tramiteService.obtenerTramiteParaEdicion(id, usuarioId, rol);
        return ResponseEntity.ok(tramite);
    }

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


    @PostMapping("/con-archivos")
    @PreAuthorize("hasRole('USUARIO') || hasRole('ADMIN') || hasRole('ESTUDIANTE')")
    public ResponseEntity<?> crearTramiteConArchivos(
            @RequestBody TramiteConArchivosRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);

        // 🔍 DEBUG: Log del request recibido en controller
        System.out.println("🔍 DEBUG CONTROLLER - TramiteConArchivosRequest recibido:");
        System.out.println("  - requiereFirmaDigital: " + request.getRequiereFirmaDigital());
        System.out.println("  - tipoFirma: '" + request.getTipoFirma() + "'");
        System.out.println("  - razonFirma: '" + request.getRazonFirma() + "'");
        System.out.println("  - ubicacionFirma: '" + request.getUbicacionFirma() + "'");
        System.out.println("  - consentimientoFirma: " + request.getConsentimientoFirma());
        System.out.println("  - firmaDigitalData presente: " + (request.getFirmaDigitalData() != null && !request.getFirmaDigitalData().isEmpty()));

        TramiteResponse tramiteCreado;
        try {
            tramiteCreado = tramiteService.crearTramiteConArchivos(request, usuarioId, rol);
        } catch (RuntimeException e) {
            String mensaje = e.getMessage();
            if (mensaje != null && mensaje.contains("Ya existe un trámite con el mismo contenido")) {
                return ResponseEntity.badRequest().body(mensaje);
            }
            throw e;
        }
        return ResponseEntity.ok(tramiteCreado);
    }

    @PutMapping("/{id}/con-archivos")
    @PreAuthorize("hasRole('USUARIO') || hasRole('ADMIN') || hasRole('ESTUDIANTE')")
    public ResponseEntity<?> editarTramiteConArchivos(
            @PathVariable Long id,
            @RequestBody TramiteConArchivosRequest request,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }

        // 🔍 DEBUG: Log del request recibido en controller
        System.out.println("🔍 DEBUG CONTROLLER - Editar TramiteConArchivosRequest recibido:");
        System.out.println("  - tramiteId: " + id);
        System.out.println("  - requiereFirmaDigital: " + request.getRequiereFirmaDigital());
        System.out.println("  - tipoFirma: '" + request.getTipoFirma() + "'");
        System.out.println("  - razonFirma: '" + request.getRazonFirma() + "'");
        System.out.println("  - ubicacionFirma: '" + request.getUbicacionFirma() + "'");
        System.out.println("  - consentimientoFirma: " + request.getConsentimientoFirma());

        // Convertir TramiteConArchivosRequest a EditarTramiteRequest
        EditarTramiteRequest editarRequest = EditarTramiteRequest.builder()
                .asunto(request.getAsunto())
                .descripcion(request.getDescripcion())
                .observaciones(request.getObservaciones())
                .requiereFirmaDigital(request.getRequiereFirmaDigital())
                .tipoFirma(request.getTipoFirma())
                .razonFirma(request.getRazonFirma())
                .ubicacionFirma(request.getUbicacionFirma())
                .firmaDigitalData(request.getFirmaDigitalData())
                .areaDestinoId(request.getAreaDestinoId())
                .build();

        try {
            TramiteResponse tramiteActualizado = tramiteService.editarTramiteUsuario(id, editarRequest, usuarioId);
            return ResponseEntity.ok(tramiteActualizado);
        } catch (RuntimeException e) {
            String mensaje = e.getMessage();
            if (mensaje != null && (mensaje.contains("No se encontró") || mensaje.contains("no encontrado"))) {
                return ResponseEntity.status(404).body(mensaje);
            }
            if (mensaje != null && mensaje.contains("No tienes permiso")) {
                return ResponseEntity.status(403).body(mensaje);
            }
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USUARIO') || hasRole('ADMIN') || hasRole('ESTUDIANTE')")
    public ResponseEntity<?> eliminarTramite(
            @PathVariable Long id,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }

        try {
            tramiteService.eliminarTramite(id, usuarioId);
            return ResponseEntity.ok(Map.of(
                "mensaje", "Trámite eliminado exitosamente",
                "tramiteId", id
            ));
        } catch (RuntimeException e) {
            String mensaje = e.getMessage();
            if (mensaje != null && (mensaje.contains("No se encontró") || mensaje.contains("no encontrado"))) {
                return ResponseEntity.status(404).body(Map.of("error", mensaje));
            }
            if (mensaje != null && mensaje.contains("No tienes permiso")) {
                return ResponseEntity.status(403).body(Map.of("error", mensaje));
            }
            if (mensaje != null && mensaje.contains("No se puede eliminar")) {
                return ResponseEntity.status(400).body(Map.of("error", mensaje));
            }
            return ResponseEntity.status(500).body(Map.of("error", "Error al eliminar el trámite"));
        }
    }

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

    @GetMapping("/estadisticas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> obtenerEstadisticas() {
        Object estadisticas = tramiteService.obtenerEstadisticas();
        return ResponseEntity.ok(estadisticas);
    }
    

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

    @GetMapping("/{id}/historial")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<java.util.Map<String, Object>> obtenerHistorialTramite(
            @PathVariable(name = "id") Long id,
            Principal principal,
            HttpServletRequest httpRequest) {

        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);

        java.util.Map<String, Object> resultado = tramiteService.obtenerHistorialConConteo(id, usuarioId, rol);
        return ResponseEntity.ok(resultado);
    }
    
   
    @GetMapping("/tipos")
    public ResponseEntity<List<java.util.Map<String, Object>>> obtenerTiposTramite(Principal principal) {
        List<java.util.Map<String, Object>> tipos = new java.util.ArrayList<>();
        String rol = getRole(principal);

        com.example.demo.model.Tramite.TipoTramite[] enumValues = com.example.demo.model.Tramite.TipoTramite.values();
        java.util.Set<String> tiposEstudiante = java.util.Set.of(
            "SOLICITUD_CERTIFICADO",
            "SOLICITUD_CONSTANCIA",
            "SOLICITUD_PERMISO",
            "TRAMITE_ACADEMICO",
            "OTRO"
        );

        for (int i = 0; i < enumValues.length; i++) {
            com.example.demo.model.Tramite.TipoTramite tipo = enumValues[i];
            if ("ESTUDIANTE".equalsIgnoreCase(rol) && !tiposEstudiante.contains(tipo.name())) {
                continue;
            }

            java.util.Map<String, Object> tipoMap = new java.util.HashMap<>();
            tipoMap.put("id", i + 1);
            tipoMap.put("nombre", formatearNombreTipo(tipo.name()));
            tipoMap.put("descripcion", obtenerDescripcionTipo(tipo.name()));
            tipos.add(tipoMap);
        }

        return ResponseEntity.ok(tipos);
    }
    
   
    @GetMapping("/prioridades")
    public ResponseEntity<List<java.util.Map<String, Object>>> obtenerPrioridadesTramite() {
        List<java.util.Map<String, Object>> prioridades = new java.util.ArrayList<>();

        com.example.demo.model.Tramite.PrioridadTramite[] enumValues = com.example.demo.model.Tramite.PrioridadTramite.values();
        int id = 1;
        for (int i = 0; i < enumValues.length; i++) {
            com.example.demo.model.Tramite.PrioridadTramite prioridad = enumValues[i];

            java.util.Map<String, Object> prioridadMap = new java.util.HashMap<>();
            prioridadMap.put("id", id++); // Use sequential IDs starting from 1
            prioridadMap.put("nombre", formatearNombrePrioridad(prioridad.name()));
            prioridadMap.put("nivel", id - 1);
            prioridadMap.put("color", obtenerColorPrioridad(prioridad.name()));
            prioridadMap.put("icono", obtenerIconoPrioridad(prioridad.name()));
            prioridades.add(prioridadMap);
        }

        return ResponseEntity.ok(prioridades);
    }
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
            case 1 -> "NORMAL";
            case 2 -> "ALTA";
            case 3 -> "URGENTE";
            default -> "NORMAL";
        };
    }
    
    private String formatearNombrePrioridad(String prioridad) {
        return switch (prioridad) {
            case "NORMAL" -> "Normal";
            case "ALTA" -> "Alta";
            case "URGENTE" -> "Urgente";
            default -> prioridad;
        };
    }
    
    private String obtenerColorPrioridad(String prioridad) {
        return switch (prioridad) {
            case "NORMAL" -> "#17a2b8";
            case "ALTA" -> "#ffc107";
            case "URGENTE" -> "#dc3545";
            default -> "#17a2b8";
        };
    }
    
    private String obtenerIconoPrioridad(String prioridad) {
        return switch (prioridad) {
            case "NORMAL" -> "fas fa-minus";
            case "ALTA" -> "fas fa-arrow-up";
            case "URGENTE" -> "fas fa-exclamation";
            default -> "fas fa-minus";
        };
    }

    @PutMapping("/{id}/rechazar")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<com.example.demo.dto.RechazarTramiteResponse> rechazarTramite(
            @PathVariable Long id,
            @RequestBody com.example.demo.dto.RechazarTramiteRequest request,
            Authentication authentication) {

        try {
            Long administrativoId = jwtService.extractUserId(
                authentication.getCredentials().toString());
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
            String htmlContent = tramiteService.generarHtmlParaImpresion(id, usuarioId);

            return ResponseEntity.ok()
                .header("Content-Type", "text/html; charset=UTF-8")
                .body(htmlContent);

        } catch (Exception e) {
            throw new RuntimeException("Error al generar documento para impresión: " + e.getMessage());
        }
    }
}