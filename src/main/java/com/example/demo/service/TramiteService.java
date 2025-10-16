package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.AreaResponse;
import com.example.demo.dto.TramiteRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.dto.TramiteHistorialResponse;
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.dto.TramiteConArchivosRequest;
import com.example.demo.dto.ActualizarTramiteConArchivosRequest;
import com.example.demo.dto.DocumentoBase64Request;
import com.example.demo.model.Tramite;
import com.example.demo.model.TramiteHistorial;
import com.example.demo.repository.TramiteHistorialRepository;
import com.example.demo.repository.TramiteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TramiteService {

    private final TramiteRepository tramiteRepository;
    private final TramiteHistorialRepository historialRepository;
    private final NotificacionService notificacionService;
    private final UsuarioService usuarioService;
    private final AreaService areaService;
    private final EmailService emailService;
    
    private static final int MAX_TRAMITES_POR_TRABAJADOR = 20;
    private static final int DIAS_PROCESAMIENTO = 3;
    private static final Long AREA_SECRETARIA_GENERAL_ID = 1L;
    
    public TramiteResponse crearTramite(TramiteRequest request, Long usuarioSolicitanteId, String rol) {
        if (!"USUARIO".equals(rol) && !"ADMIN".equals(rol)) {
            throw new RuntimeException("Solo los usuarios y administradores pueden crear trámites");
        }
        
        // Generar código único
        String codigo = generarCodigoTramite();
        
        Tramite tramite = new Tramite();
        tramite.setCodigo(codigo);
        tramite.setTitulo(request.getTitulo());
        tramite.setAsunto(request.getAsunto() != null ? request.getAsunto() : request.getTitulo());
        tramite.setDescripcion(request.getDescripcion());
        tramite.setTipo(Tramite.TipoTramite.valueOf(request.getTipo()));
        tramite.setEstado(Tramite.EstadoTramite.ENVIADO);
        tramite.setPrioridad(Tramite.PrioridadTramite.valueOf(request.getPrioridad()));
        tramite.setUsuarioSolicitanteId(usuarioSolicitanteId);
        tramite.setAreaActualId(AREA_SECRETARIA_GENERAL_ID);
        tramite.setAreaOrigenId(AREA_SECRETARIA_GENERAL_ID);
        tramite.setNumeroExpediente(request.getNumeroExpediente());
        tramite.setObservaciones(request.getObservaciones());
        tramite.setFechaVencimiento(LocalDateTime.now().plusDays(DIAS_PROCESAMIENTO));
        
        if (request.getDocumentosAdjuntos() != null) {
            tramite.setDocumentosAdjuntos(request.getDocumentosAdjuntos());
        }
        
        Tramite saved = tramiteRepository.save(tramite);
        
        registrarHistorial(saved.getId(), usuarioSolicitanteId, 
                         TramiteHistorial.TipoAccion.CREADO, 
                         null, "ENVIADO", 
                         "Trámite creado y enviado");
        
        notificacionService.notificarNuevoTramite(saved.getId(), AREA_SECRETARIA_GENERAL_ID);
        
        
        return convertirAResponse(saved);
    }
    
    public TramiteResponse editarTramite(Long tramiteId, TramiteRequest request, Long usuarioId, String rol) {
                
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        
        if ("USUARIO".equals(rol)) {
            if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                throw new RuntimeException("No autorizado para editar este trámite");
            }
            if (!Arrays.asList(Tramite.EstadoTramite.BORRADOR, Tramite.EstadoTramite.ENVIADO, Tramite.EstadoTramite.OBSERVADO)
                    .contains(tramite.getEstado())) {
                throw new RuntimeException("El trámite ya está en proceso avanzado y no puede ser editado");
            }
        }
        else if ("ADMIN".equals(rol)) {
            if (Arrays.asList(Tramite.EstadoTramite.FINALIZADO, Tramite.EstadoTramite.ARCHIVADO, Tramite.EstadoTramite.CANCELADO)
                    .contains(tramite.getEstado())) {
                throw new RuntimeException("No se puede editar un trámite " + tramite.getEstado().toString().toLowerCase());
            }
        }
        
        boolean actualizado = false;
        
        // Título
        if (isValidString(request.getTitulo())) {
            tramite.setTitulo(request.getTitulo().trim());
            actualizado = true;
        }
        
        // Descripción
        if (isValidString(request.getDescripcion())) {
            tramite.setDescripcion(request.getDescripcion().trim());
            actualizado = true;
        }
        
        if (isValidString(request.getTipo())) {
            Tramite.TipoTramite nuevoTipo = parseEnumSafely(request.getTipo(), Tramite.TipoTramite.class);
            if (nuevoTipo != null) {
                tramite.setTipo(nuevoTipo);
                actualizado = true;
            }
        }

        if (isValidString(request.getPrioridad())) {
            Tramite.PrioridadTramite nuevaPrioridad = parseEnumSafely(request.getPrioridad(), Tramite.PrioridadTramite.class);
            if (nuevaPrioridad != null) {
                tramite.setPrioridad(nuevaPrioridad);
                actualizado = true;
            }
        }
        
        if (request.getObservaciones() != null) {
            tramite.setObservaciones(request.getObservaciones().trim());
            actualizado = true;
        }
        
        if (request.getFechaVencimiento() != null) {
            tramite.setFechaVencimiento(request.getFechaVencimiento());
            actualizado = true;
        }
        
        if (isValidString(request.getDocumentosAdjuntos())) {
            tramite.setDocumentosAdjuntos(request.getDocumentosAdjuntos().trim());
            actualizado = true;
        }
        
        if (!actualizado) {
            return convertirAResponse(tramite); // Retornar sin guardar si no hay cambios
        }
        
        Tramite updated = tramiteRepository.save(tramite);
        
        registrarHistorial(tramiteId, usuarioId, 
                         TramiteHistorial.TipoAccion.MODIFICADO,
                         null, null, 
                         "Trámite modificado");
        
        
        TramiteResponse response = convertirAResponse(updated);
        
        return response;
    }
    
    private boolean isValidString(String value) {
        return value != null && !value.trim().isEmpty();
    }
    
    private <T extends Enum<T>> T parseEnumSafely(String value, Class<T> enumClass) {
        if (!isValidString(value)) {
            return null;
        }
        
        try {
            return Enum.valueOf(enumClass, value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
    
    public TramiteResponse recepcionarTramite(Long tramiteId, Long trabajadorId) {
        if (!puedeAsumirTramite(trabajadorId)) {
            throw new RuntimeException("Ha alcanzado el límite máximo de trámites activos");
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        if (tramite.getEstado() != Tramite.EstadoTramite.ENVIADO) {
            throw new RuntimeException("El trámite no está disponible para recepcionar");
        }
        
        String estadoAnterior = tramite.getEstado().name();
        tramite.setUsuarioAsignadoId(trabajadorId);
        tramite.setEstado(Tramite.EstadoTramite.EN_REVISION);
        tramite.setFechaVencimiento(LocalDateTime.now().plusDays(DIAS_PROCESAMIENTO));
        
        Tramite saved = tramiteRepository.save(tramite);
        
        registrarHistorial(tramiteId, trabajadorId,
                         TramiteHistorial.TipoAccion.ASIGNADO,
                         estadoAnterior, "EN_REVISION",
                         "Trámite recepcionado");
        
        notificacionService.notificarRecepcionTramite(tramiteId, trabajadorId, 
                                                     tramite.getUsuarioSolicitanteId());
        

        return convertirAResponse(saved);
    }

    public TramiteResponse asignarseTramite(Long tramiteId, Long trabajadorId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Tramite no encontrado"));

        List<Tramite.EstadoTramite> estadosValidos = Arrays.asList(
            Tramite.EstadoTramite.ENVIADO,
            Tramite.EstadoTramite.EN_REVISION,
            Tramite.EstadoTramite.DERIVADO
        );

        if (!estadosValidos.contains(tramite.getEstado())) {
            throw new RuntimeException("El tramite no esta disponible para asignarse. Estado actual: " + tramite.getEstado());
        }

        String estadoAnterior = tramite.getEstado().name();
        tramite.setUsuarioAsignadoId(trabajadorId);
        tramite.setEstado(Tramite.EstadoTramite.EN_PROCESO);
        tramite.setFechaVencimiento(LocalDateTime.now().plusDays(DIAS_PROCESAMIENTO));

        Tramite saved = tramiteRepository.save(tramite);

        registrarHistorial(tramiteId, trabajadorId,
                         TramiteHistorial.TipoAccion.ASIGNADO,
                         estadoAnterior, "EN_PROCESO",
                         "Trabajador se asigno el tramite");

        notificacionService.notificarAutoasignacionTramite(tramiteId, trabajadorId,
                                                          tramite.getUsuarioSolicitanteId());

        return convertirAResponse(saved);
    }

    public TramiteResponse derivarTramite(Long tramiteId, Long trabajadorActual,
                                         Long trabajadorNuevo, String motivo) {
        if (!puedeAsumirTramite(trabajadorNuevo)) {
            Long trabajadorAlternativo = buscarTrabajadorConCapacidad();
            if (trabajadorAlternativo == null) {
                throw new RuntimeException("No hay trabajadores disponibles con capacidad");
            }
            trabajadorNuevo = trabajadorAlternativo;
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        Long usuarioAsignado = tramite.getUsuarioAsignadoId();
        if (usuarioAsignado != null && !usuarioAsignado.equals(trabajadorActual)) {
            throw new RuntimeException("No autorizado para derivar este trámite - está asignado a otro trabajador");
        }
        
        String estadoAnterior = tramite.getEstado().name();
        Long trabajadorAnterior = tramite.getUsuarioAsignadoId();
        
        // Cambiar asignación
        tramite.setUsuarioAsignadoId(trabajadorNuevo);
        tramite.setEstado(Tramite.EstadoTramite.DERIVADO);
        
        Tramite saved = tramiteRepository.save(tramite);
        
        TramiteHistorial historial = new TramiteHistorial();
        historial.setTramiteId(tramiteId);
        historial.setUsuarioId(trabajadorActual);
        historial.setAccion(TramiteHistorial.TipoAccion.DERIVADO);
        historial.setEstadoAnterior(estadoAnterior);
        historial.setEstadoNuevo("DERIVADO");
        historial.setUsuarioAnteriorId(trabajadorAnterior);
        historial.setUsuarioNuevoId(trabajadorNuevo);
        historial.setMotivo(motivo);
        historial.setObservaciones("Trámite derivado: " + motivo);
        historialRepository.save(historial);
        
        // Notificaciones
        notificacionService.notificarDerivacionTramite(tramiteId, trabajadorActual, 
                                                      trabajadorNuevo, motivo);
        
        
        return convertirAResponse(saved);
    }
    
    public TramiteResponse cambiarEstado(Long tramiteId, String nuevoEstado, 
                                        Long usuarioId, String observaciones) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        String estadoAnterior = tramite.getEstado().name();
        Tramite.EstadoTramite estado = Tramite.EstadoTramite.valueOf(nuevoEstado);
        
        tramite.setEstado(estado);
        if (observaciones != null) {
            tramite.setObservaciones(observaciones);
        }
        
        if (estado == Tramite.EstadoTramite.FINALIZADO || 
            estado == Tramite.EstadoTramite.APROBADO) {
            tramite.setFechaCompletado(LocalDateTime.now());
        }
        
        Tramite saved = tramiteRepository.save(tramite);
        
        registrarHistorial(tramiteId, usuarioId,
                         mapearAccionPorEstado(estado),
                         estadoAnterior, nuevoEstado,
                         observaciones);
        
        notificacionService.notificarCambioEstadoAutomatico(tramiteId, estadoAnterior, nuevoEstado);
        
        
        return convertirAResponse(saved);
    }
    
    public TramiteResponse finalizarConArchivo(Long tramiteId, String urlArchivo, Long usuarioId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        String estadoAnterior = tramite.getEstado().name();
        tramite.setEstado(Tramite.EstadoTramite.FINALIZADO);
        tramite.setFechaCompletado(LocalDateTime.now());
        
        String documentosActuales = tramite.getDocumentosAdjuntos();
        if (documentosActuales != null) {
            tramite.setDocumentosAdjuntos(documentosActuales + "," + urlArchivo);
        } else {
            tramite.setDocumentosAdjuntos(urlArchivo);
        }
        
        Tramite saved = tramiteRepository.save(tramite);
        
        registrarHistorial(tramiteId, usuarioId,
                         TramiteHistorial.TipoAccion.FINALIZADO,
                         estadoAnterior, "FINALIZADO",
                         "Trámite finalizado con archivo de respuesta");
        
        notificacionService.notificarFinalizacionConArchivo(tramiteId, urlArchivo);
        
        
        return convertirAResponse(saved);
    }
    
    public void eliminarTramite(Long tramiteId, Long usuarioId, String rol) {
        if (!"ADMIN".equals(rol)) {
            throw new RuntimeException("Solo el administrador puede eliminar trámites");
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        tramiteRepository.deleteById(tramiteId);
        
    }
    
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarTramites(String texto, Pageable pageable) {
        Page<Tramite> tramites = tramiteRepository
            .findByTituloOrDescripcionContaining(texto, pageable);
        
        return tramites.map(this::convertirAResponse);
    }
    
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerMisTramites(Long usuarioId, String rol, Pageable pageable) {
        Page<Tramite> tramites;
        
        org.springframework.data.domain.PageRequest pageableOptimizado = 
            org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        
        if ("USUARIO".equals(rol) || "ESTUDIANTE".equalsIgnoreCase(rol)) {
            tramites = tramiteRepository.findByUsuarioSolicitanteIdOrderById(usuarioId, pageableOptimizado);
        } else if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            tramites = tramiteRepository.findAllOrderById(pageableOptimizado);
        } else {
            // Cualquier otro rol ve trámites ordenados por ID
            tramites = tramiteRepository.findAllOrderById(pageableOptimizado);
        }
        
        return tramites.map(this::convertirAResponse);
    }
    
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerTramitesBandeja(Long usuarioId, String rol, Pageable pageable, String estado, String prioridad, String tipo) {
        Page<Tramite> tramites;
        
        org.springframework.data.domain.PageRequest pageableOptimizado = 
            org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        
        if ("USUARIO".equals(rol) || "ESTUDIANTE".equalsIgnoreCase(rol)) {
            if (estado == null) {
                tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoNotOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else if ("ARCHIVADO".equals(estado)) {
                tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else {
                // Filtrar por estado específico
                Tramite.EstadoTramite estadoEnum;
                try {
                    estadoEnum = Tramite.EstadoTramite.valueOf(estado);
                    tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoOrderById(usuarioId, estadoEnum, pageableOptimizado);
                } catch (IllegalArgumentException e) {
                    tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoNotOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
                }
            }
        } else {
            if (estado == null) {
                tramites = tramiteRepository.findByEstadoNotOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else if ("ARCHIVADO".equals(estado)) {
                tramites = tramiteRepository.findByEstadoOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else {
                // Filtrar por estado específico
                Tramite.EstadoTramite estadoEnum;
                try {
                    estadoEnum = Tramite.EstadoTramite.valueOf(estado);
                    tramites = tramiteRepository.findByEstadoOrderByIdDesc(estadoEnum, pageableOptimizado);
                } catch (IllegalArgumentException e) {
                    tramites = tramiteRepository.findByEstadoNotOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
                }
            }
        }
        
        return tramites.map(this::convertirAResponse);
    }
    
    // Métodos públicos (sin autenticación)
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarPorCodigo(String codigo, Pageable pageable) {
        if (codigo == null || codigo.trim().length() < 3) {
            org.springframework.data.domain.Pageable limitedPageable =
                org.springframework.data.domain.PageRequest.of(
                    pageable.getPageNumber(),
                    Math.min(pageable.getPageSize(), 5),
                    org.springframework.data.domain.Sort.by("id").descending()
                );
            return tramiteRepository.findByCodigoContaining(codigo, limitedPageable)
                .map(this::convertirAResponse);
        }

        org.springframework.data.domain.Pageable safePageable =
            org.springframework.data.domain.PageRequest.of(
                pageable.getPageNumber(),
                Math.min(pageable.getPageSize(), 10),
                pageable.getSort()
            );

        return tramiteRepository.findByCodigoContaining(codigo, safePageable)
            .map(this::convertirAResponse);
    }
    
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerTramitesPublicos(Pageable pageable) {
        return tramiteRepository.findByEstado(Tramite.EstadoTramite.FINALIZADO, pageable)
            .map(this::convertirAResponse);
    }
    
    @Transactional(readOnly = true)
    public TramiteResponse obtenerTramitePublico(String codigo) {
        return tramiteRepository.findByCodigo(codigo)
            .map(this::convertirAResponse)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
    }
    
    public String guardarArchivoRespuesta(org.springframework.web.multipart.MultipartFile archivo) {
        try {
            byte[] bytes = archivo.getBytes();
            String base64Content = java.util.Base64.getEncoder().encodeToString(bytes);
            
            String archivoJson = String.format(
                "{\"nombre\":\"%s\",\"tipo\":\"%s\",\"tamanio\":%d,\"contenido\":\"%s\",\"fechaSubida\":\"%s\"}",
                archivo.getOriginalFilename(),
                archivo.getContentType(),
                archivo.getSize(),
                base64Content,
                java.time.LocalDateTime.now().toString()
            );
            
            return archivoJson;
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar archivo: " + e.getMessage(), e);
        }
    }
    
    public org.springframework.http.ResponseEntity<byte[]> descargarArchivoPublico(String codigo, String nombreArchivo) {
        tramiteRepository.findByCodigo(codigo)
            .filter(t -> t.getEstado() == Tramite.EstadoTramite.FINALIZADO)
            .orElseThrow(() -> new RuntimeException("Archivo no disponible"));
        
        byte[] archivo = new byte[0]; // Placeholder
        return org.springframework.http.ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
            .body(archivo);
    }
    
    // Métodos extendidos
    @Transactional(readOnly = true)
    public TramiteResponse obtenerTramite(Long id, Long usuarioId, String rol) {
        Tramite tramite = tramiteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        if ("USUARIO".equals(rol) && !tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
            throw new RuntimeException("No autorizado");
        }
        if ("ADMINISTRATIVO".equals(rol) && !tramite.getUsuarioAsignadoId().equals(usuarioId)) {
            throw new RuntimeException("No autorizado");
        }
        
        return convertirAResponse(tramite);
    }
    
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarTramitesAvanzado(Long usuarioId, String rol, String texto, 
                                                       String estado, String tipo, String prioridad, 
                                                       Pageable pageable) {
        Tramite.EstadoTramite estadoEnum = estado != null ? Tramite.EstadoTramite.valueOf(estado) : null;
        Tramite.TipoTramite tipoEnum = tipo != null ? Tramite.TipoTramite.valueOf(tipo) : null;
        Tramite.PrioridadTramite prioridadEnum = prioridad != null ? Tramite.PrioridadTramite.valueOf(prioridad) : null;
        
        Long solicitanteId = "USUARIO".equals(rol) ? usuarioId : null;
        Long asignadoId = "ADMINISTRATIVO".equals(rol) ? usuarioId : null;
        
        return tramiteRepository.findWithFilters(
            solicitanteId, asignadoId, null, estadoEnum, tipoEnum, prioridadEnum, pageable
        ).map(this::convertirAResponse);
    }
    
    public java.util.List<String> subirArchivosMultiples(Long tramiteId, java.util.List<org.springframework.web.multipart.MultipartFile> archivos, Long usuarioId) {
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        
        java.util.List<String> archivosBase64 = new java.util.ArrayList<>();
        
        for (org.springframework.web.multipart.MultipartFile archivo : archivos) {
            // Validar tamaño y tipo
            if (archivo.getSize() > 50 * 1024 * 1024) { // 50MB límite por archivo
                throw new RuntimeException("Archivo " + archivo.getOriginalFilename() + " excede el límite de 50MB");
            }
            
            String archivoJson = guardarArchivoRespuesta(archivo);
            archivosBase64.add(archivoJson);
        }
        
        String documentosActuales = tramite.getDocumentosAdjuntos();
        String nuevosDocumentos;
        
        if (documentosActuales != null && !documentosActuales.trim().isEmpty()) {
            if (documentosActuales.startsWith("[") && documentosActuales.endsWith("]")) {
                nuevosDocumentos = documentosActuales.substring(0, documentosActuales.length() - 1) 
                    + "," + String.join(",", archivosBase64) + "]";
            } else {
                nuevosDocumentos = "[" + documentosActuales + "," + String.join(",", archivosBase64) + "]";
            }
        } else {
            nuevosDocumentos = "[" + String.join(",", archivosBase64) + "]";
        }
        
        tramite.setDocumentosAdjuntos(nuevosDocumentos);
        tramiteRepository.save(tramite);
        
        
        return archivosBase64;
    }
    
    public org.springframework.http.ResponseEntity<byte[]> descargarArchivo(Long tramiteId, String nombreArchivo, Long usuarioId, String rol) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        if ("USUARIO".equals(rol) && !tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para acceder a este trámite");
        }

        String documentosJson = tramite.getDocumentosAdjuntos();
        if (documentosJson == null || documentosJson.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }

        try {

            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            java.util.List<java.util.Map<String, Object>> documentos =
                mapper.readValue(documentosJson, java.util.List.class);

            for (int i = 0; i < documentos.size(); i++) {
                java.util.Map<String, Object> documento = documentos.get(i);
                String nombre = (String) documento.get("nombre");

                if (nombreArchivo.equals(nombre)) {

                    String contenidoBase64 = (String) documento.get("contenido");

                    if (contenidoBase64 != null) {
                    }

                    if (contenidoBase64 != null && !contenidoBase64.isEmpty()) {
                        try {
                            byte[] archivo = java.util.Base64.getDecoder().decode(contenidoBase64);

                            String tipoArchivo = (String) documento.get("tipo");
                            if (tipoArchivo == null) tipoArchivo = "application/octet-stream";

                            return org.springframework.http.ResponseEntity.ok()
                                .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
                                .header("Content-Type", tipoArchivo)
                                .body(archivo);
                        } catch (Exception decodeError) {
                        }
                    } else {
                    }
                }
            }

            return org.springframework.http.ResponseEntity.notFound().build();

        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.internalServerError().build();
        }
    }
    
    public org.springframework.http.ResponseEntity<byte[]> descargarTodosDocumentos(Long tramiteId, Long usuarioId, String rol) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        if ("USUARIO".equals(rol) && !tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para acceder a este trámite");
        }
        
        String documentosJson = tramite.getDocumentosAdjuntos();
        if (documentosJson == null || documentosJson.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }
        
        try {
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.util.zip.ZipOutputStream zos = new java.util.zip.ZipOutputStream(baos);
            
            if (documentosJson.startsWith("[")) {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>> typeRef = 
                    new com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>>() {};
                java.util.List<java.util.Map<String, Object>> documentos = mapper.readValue(documentosJson, typeRef);
                
                for (java.util.Map<String, Object> doc : documentos) {
                    String nombre = (String) doc.get("nombre");
                    String contenidoBase64 = (String) doc.get("contenido");
                    
                    if (nombre != null && contenidoBase64 != null) {
                        byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                        
                        String hash = calcularHashArchivo(contenido);
                        
                        java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                        zos.putNextEntry(entry);
                        zos.write(contenido);
                        zos.closeEntry();
                        
                        String nombreHash = nombre + ".hash";
                        java.util.zip.ZipEntry hashEntry = new java.util.zip.ZipEntry(nombreHash);
                        zos.putNextEntry(hashEntry);
                        zos.write(hash.getBytes("UTF-8"));
                        zos.closeEntry();
                    }
                }
            } else if (documentosJson.startsWith("{")) {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                java.util.Map<String, Object> doc = mapper.readValue(documentosJson, java.util.Map.class);
                String nombre = (String) doc.get("nombre");
                String contenidoBase64 = (String) doc.get("contenido");
                
                if (nombre != null && contenidoBase64 != null) {
                    byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                    
                    String hash = calcularHashArchivo(contenido);
                    
                    java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                    zos.putNextEntry(entry);
                    zos.write(contenido);
                    zos.closeEntry();
                    
                    String nombreHash = nombre + ".hash";
                    java.util.zip.ZipEntry hashEntry = new java.util.zip.ZipEntry(nombreHash);
                    zos.putNextEntry(hashEntry);
                    zos.write(hash.getBytes("UTF-8"));
                    zos.closeEntry();
                }
            }
            
            zos.close();
            byte[] zipBytes = baos.toByteArray();
            baos.close();
            
            if (zipBytes.length == 0) {
                throw new RuntimeException("No se pudieron procesar los documentos adjuntos");
            }
            
            return org.springframework.http.ResponseEntity.ok()
                .header("Content-Type", "application/zip")
                .header("Content-Disposition", "attachment; filename=\"documentos_tramite_" + tramite.getCodigo() + ".zip\"")
                .body(zipBytes);
                
        } catch (Exception e) {
            throw new RuntimeException("Error al crear el archivo ZIP: " + e.getMessage(), e);
        }
    }
    
    public org.springframework.http.ResponseEntity<byte[]> descargarTodosDocumentosPublico(String codigo) {
        Tramite tramite = tramiteRepository.findByCodigo(codigo)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado con código: " + codigo));
        
        String documentosJson = tramite.getDocumentosAdjuntos();
        if (documentosJson == null || documentosJson.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }
        
        try {
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.util.zip.ZipOutputStream zos = new java.util.zip.ZipOutputStream(baos);
            
            if (documentosJson.startsWith("[")) {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>> typeRef = 
                    new com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>>() {};
                java.util.List<java.util.Map<String, Object>> documentos = mapper.readValue(documentosJson, typeRef);
                
                for (java.util.Map<String, Object> doc : documentos) {
                    String nombre = (String) doc.get("nombre");
                    String contenidoBase64 = (String) doc.get("contenido");
                    
                    if (nombre != null && contenidoBase64 != null) {
                        byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                        
                        String hash = calcularHashArchivo(contenido);
                        
                        java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                        zos.putNextEntry(entry);
                        zos.write(contenido);
                        zos.closeEntry();
                        
                        String nombreHash = nombre + ".hash";
                        java.util.zip.ZipEntry hashEntry = new java.util.zip.ZipEntry(nombreHash);
                        zos.putNextEntry(hashEntry);
                        zos.write(hash.getBytes("UTF-8"));
                        zos.closeEntry();
                    }
                }
            } else if (documentosJson.startsWith("{")) {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                java.util.Map<String, Object> doc = mapper.readValue(documentosJson, java.util.Map.class);
                String nombre = (String) doc.get("nombre");
                String contenidoBase64 = (String) doc.get("contenido");
                
                if (nombre != null && contenidoBase64 != null) {
                    byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                    
                    String hash = calcularHashArchivo(contenido);
                    
                    java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                    zos.putNextEntry(entry);
                    zos.write(contenido);
                    zos.closeEntry();
                    
                    String nombreHash = nombre + ".hash";
                    java.util.zip.ZipEntry hashEntry = new java.util.zip.ZipEntry(nombreHash);
                    zos.putNextEntry(hashEntry);
                    zos.write(hash.getBytes("UTF-8"));
                    zos.closeEntry();
                }
            }
            
            zos.close();
            byte[] zipBytes = baos.toByteArray();
            baos.close();
            
            if (zipBytes.length == 0) {
                throw new RuntimeException("No se pudieron procesar los documentos adjuntos");
            }
            
            return org.springframework.http.ResponseEntity.ok()
                .header("Content-Type", "application/zip")
                .header("Content-Disposition", "attachment; filename=\"documentos_tramite_" + tramite.getCodigo() + ".zip\"")
                .body(zipBytes);
                
        } catch (Exception e) {
            throw new RuntimeException("Error al crear el archivo ZIP: " + e.getMessage(), e);
        }
    }
    
    private String calcularHashArchivo(byte[] contenido) {
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(contenido);
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al calcular hash SHA-256", e);
        }
    }
    
    @Transactional(readOnly = true)
    public Object obtenerEstadisticas() {
        java.util.Map<String, Object> estadisticas = new java.util.HashMap<>();
        
        // Contar por estado
        for (Tramite.EstadoTramite estado : Tramite.EstadoTramite.values()) {
            Long count = tramiteRepository.countByEstado(estado);
            estadisticas.put("estado_" + estado.name(), count);
        }
        
        // Contar por tipo
        for (Tramite.TipoTramite tipo : Tramite.TipoTramite.values()) {
            Long count = tramiteRepository.countByTipo(tipo);
            estadisticas.put("tipo_" + tipo.name(), count);
        }
        
        estadisticas.put("total", tramiteRepository.count());
        
        return estadisticas;
    }
    
    @Transactional(readOnly = true)
    public Object obtenerEstadisticasUsuario(Long usuarioId, String rol) {
        java.util.Map<String, Object> estadisticas = new java.util.HashMap<>();

        if ("USUARIO".equals(rol)) {
            estadisticas.put("total", tramiteRepository.countByUsuarioSolicitanteId(usuarioId));

            for (Tramite.EstadoTramite estado : Tramite.EstadoTramite.values()) {
                Long count = tramiteRepository.countByUsuarioSolicitanteIdAndEstado(usuarioId, estado);
                estadisticas.put("estado_" + estado.name(), count);
            }

            for (Tramite.TipoTramite tipo : Tramite.TipoTramite.values()) {
                Long count = tramiteRepository.countByUsuarioSolicitanteIdAndTipo(usuarioId, tipo);
                estadisticas.put("tipo_" + tipo.name(), count);
            }

        } else if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            return obtenerEstadisticas();
        } else {
            // Cualquier otro rol ve estadísticas generales
            return obtenerEstadisticas();
        }

        return estadisticas;
    }

    @Transactional(readOnly = true)
    public java.util.Map<String, Object> obtenerHistorialConConteo(Long tramiteId, Long usuarioId, String rol) {
        java.util.Map<String, Object> resultado = new java.util.HashMap<>();

        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        if (!("ADMIN".equals(rol) ||
              "ADMINISTRATIVO".equals(rol) ||
              tramite.getUsuarioSolicitanteId().equals(usuarioId))) {
            throw new RuntimeException("No tiene permisos para ver este trámite");
        }

        List<TramiteHistorial> historialList = historialRepository.findByTramiteIdOrderByFechaAccionDesc(tramiteId);
        Long totalModificaciones = historialRepository.countModificacionesByTramiteId(tramiteId);

        List<TramiteHistorialResponse> historialResponse = new ArrayList<>();
        for (TramiteHistorial h : historialList) {
            TramiteHistorialResponse.TramiteHistorialResponseBuilder builder = TramiteHistorialResponse.builder()
                .id(h.getId())
                .accion(h.getAccion().name())
                .estadoAnterior(h.getEstadoAnterior())
                .estadoNuevo(h.getEstadoNuevo())
                .observaciones(h.getObservaciones())
                .motivo(h.getMotivo())
                .fechaAccion(h.getFechaAccion())
                .totalModificaciones(totalModificaciones);

            if (h.getUsuarioId() != null) {
                try {
                    UsuarioResponse usuario = usuarioService.obtenerUsuarioPorId(h.getUsuarioId());
                    builder.usuario(TramiteHistorialResponse.UsuarioBasicInfo.builder()
                        .id(usuario.getId())
                        .nombre(usuario.getNombre())
                        .apellidos(usuario.getApellidos())
                        .rol(usuario.getRole() != null ? usuario.getRole().getName() : null)
                        .build());
                } catch (Exception e) {
                }
            }

            if (h.getAreaOrigenId() != null) {
                areaService.getAreaById(h.getAreaOrigenId()).ifPresent(areaOrigen ->
                    builder.areaOrigen(TramiteHistorialResponse.AreaBasicInfo.builder()
                        .id(areaOrigen.getId())
                        .nombre(areaOrigen.getNombre())
                        .build())
                );
            }

            if (h.getAreaDestinoId() != null) {
                areaService.getAreaById(h.getAreaDestinoId()).ifPresent(areaDestino ->
                    builder.areaDestino(TramiteHistorialResponse.AreaBasicInfo.builder()
                        .id(areaDestino.getId())
                        .nombre(areaDestino.getNombre())
                        .build())
                );
            }

            historialResponse.add(builder.build());
        }

        resultado.put("historial", historialResponse);
        resultado.put("totalModificaciones", totalModificaciones);

        return resultado;
    }
    
    @Scheduled(cron = "0 0 */1 * * *") // Cada hora
    public void actualizarEstadosAutomaticos() {
        LocalDateTime ahora = LocalDateTime.now();
        
        List<Tramite> enRevision = tramiteRepository.findByEstado(
            Tramite.EstadoTramite.EN_REVISION, 
            Pageable.unpaged()
        ).getContent();
        
        for (Tramite tramite : enRevision) {
            if (tramite.getFechaActualizacion().plusDays(1).isBefore(ahora)) {
                tramite.setEstado(Tramite.EstadoTramite.EN_PROCESO);
                tramiteRepository.save(tramite);
                
                notificacionService.notificarCambioEstadoAutomatico(
                    tramite.getId(), "EN_REVISION", "EN_PROCESO"
                );
                
            }
        }
        
        // Marcar trámites vencidos
        List<Tramite> vencidos = tramiteRepository.findTramitesVencidos(
            ahora, 
            Arrays.asList(Tramite.EstadoTramite.FINALIZADO, 
                         Tramite.EstadoTramite.ARCHIVADO,
                         Tramite.EstadoTramite.CANCELADO)
        );
        
        for (Tramite tramite : vencidos) {
        }
    }
    
    // Métodos auxiliares
    private boolean puedeAsumirTramite(Long trabajadorId) {
        Long tramitesActivos = tramiteRepository.countByUsuarioAsignadoIdAndEstado(
            trabajadorId, 
            Tramite.EstadoTramite.EN_PROCESO
        );
        return tramitesActivos < MAX_TRAMITES_POR_TRABAJADOR;
    }
    
    private Long buscarTrabajadorConCapacidad() {
        List<Long> trabajadores = usuarioService.obtenerTrabajadoresDeArea(AREA_SECRETARIA_GENERAL_ID);
        
        for (Long trabajadorId : trabajadores) {
            if (puedeAsumirTramite(trabajadorId)) {
                return trabajadorId;
            }
        }
        return null;
    }
    
    private synchronized String generarCodigoTramite() {
        String anio = String.valueOf(Year.now().getValue());
        
        // Retry mechanism to handle potential race conditions
        int maxRetries = 5;
        for (int retry = 0; retry < maxRetries; retry++) {
            Integer siguiente = tramiteRepository.getNextCodigoNumber(anio);
            if (siguiente == null) siguiente = 1;
            
            String codigo = String.format("TRM-%s-%04d", anio, siguiente);
            
            if (!tramiteRepository.findByCodigo(codigo).isPresent()) {
                return codigo;
            } else {
                // Small delay before retry
                try {
                    Thread.sleep(10 + (retry * 10)); // 10ms, 20ms, 30ms, etc.
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Error generando código de trámite", e);
                }
            }
        }
        
        String codigo = String.format("TRM-%s-%04d-%d", anio, 
            tramiteRepository.getNextCodigoNumber(anio), 
            System.currentTimeMillis() % 1000);
        return codigo;
    }
    
    private void registrarHistorial(Long tramiteId, Long usuarioId, 
                                   TramiteHistorial.TipoAccion accion,
                                   String estadoAnterior, String estadoNuevo,
                                   String observaciones) {
        TramiteHistorial historial = new TramiteHistorial();
        historial.setTramiteId(tramiteId);
        historial.setUsuarioId(usuarioId);
        historial.setAccion(accion);
        historial.setEstadoAnterior(estadoAnterior);
        historial.setEstadoNuevo(estadoNuevo);
        historial.setObservaciones(observaciones);
        
        historialRepository.save(historial);
    }
    
    private TramiteHistorial.TipoAccion mapearAccionPorEstado(Tramite.EstadoTramite estado) {
        return switch (estado) {
            case APROBADO -> TramiteHistorial.TipoAccion.APROBADO;
            case RECHAZADO -> TramiteHistorial.TipoAccion.RECHAZADO;
            case OBSERVADO -> TramiteHistorial.TipoAccion.OBSERVADO;
            case FINALIZADO -> TramiteHistorial.TipoAccion.FINALIZADO;
            case ARCHIVADO -> TramiteHistorial.TipoAccion.ARCHIVADO;
            case CANCELADO -> TramiteHistorial.TipoAccion.CANCELADO;
            default -> TramiteHistorial.TipoAccion.MODIFICADO;
        };
    }
    
    private TramiteResponse convertirAResponse(Tramite tramite) {
        
        TramiteResponse.TramiteResponseBuilder builder = TramiteResponse.builder()
            .id(tramite.getId())
            .codigo(tramite.getCodigo())
            .titulo(tramite.getTitulo())
            .descripcion(tramite.getDescripcion())
            .tipo(tramite.getTipo() != null ? tramite.getTipo().name() : "OTRO")
            .estado(tramite.getEstado() != null ? tramite.getEstado().name() : "EN_REVISION")
            .prioridad(tramite.getPrioridad() != null ? tramite.getPrioridad().name() : "NORMAL")
            .numeroExpediente(tramite.getNumeroExpediente())
            .observaciones(tramite.getObservaciones())
            .calificacion(tramite.getCalificacion())
            .comentarioCalificacion(tramite.getComentarioCalificacion())
            .fechaCreacion(tramite.getFechaCreacion())
            .fechaActualizacion(tramite.getFechaActualizacion())
            .fechaVencimiento(tramite.getFechaVencimiento())
            .fechaCompletado(tramite.getFechaCompletado());
            
        if (tramite.getUsuarioSolicitanteId() != null) {
            Optional<UsuarioResponse> usuarioOpt = usuarioService.getUsuarioById(tramite.getUsuarioSolicitanteId());
            if (usuarioOpt.isPresent()) {
                var usuario = usuarioOpt.get();
                builder.usuarioSolicitante(TramiteResponse.UsuarioBasicInfo.builder()
                    .id(usuario.getId())
                    .nombre(usuario.getNombre())
                    .apellidos(usuario.getApellidos())
                    .correo(usuario.getCorreo())
                    .rol(usuario.getRole() != null ? usuario.getRole().getName() : null)
                    .build());
            } else {
                builder.usuarioSolicitante(TramiteResponse.UsuarioBasicInfo.builder()
                    .id(tramite.getUsuarioSolicitanteId())
                    .nombre("Usuario no encontrado")
                    .apellidos("")
                    .correo("usuario@noejemplo.com")
                    .rol("USUARIO")
                    .build());
            }
        } else {
            // Proporcionar datos por defecto
            builder.usuarioSolicitante(TramiteResponse.UsuarioBasicInfo.builder()
                .id(0L)
                .nombre("Usuario no disponible") 
                .apellidos("")
                .correo("usuario@noejemplo.com")
                .rol("USUARIO")
                .build());
        }
        
        if (tramite.getUsuarioAsignadoId() != null) {
            usuarioService.getUsuarioById(tramite.getUsuarioAsignadoId()).ifPresent(usuario -> 
                builder.usuarioAsignado(TramiteResponse.UsuarioBasicInfo.builder()
                    .id(usuario.getId())
                    .nombre(usuario.getNombre())
                    .apellidos(usuario.getApellidos())
                    .correo(usuario.getCorreo())
                    .rol(usuario.getRole() != null ? usuario.getRole().getName() : null)
                    .build()));
        }
        
        if (tramite.getAreaActualId() != null) {
            Optional<AreaResponse> areaOpt = areaService.getAreaById(tramite.getAreaActualId());
            if (areaOpt.isPresent()) {
                var area = areaOpt.get();
                builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                    .id(area.getId())
                    .nombre(area.getNombre())
                    .descripcion(area.getDescripcion())
                    .build());
            } else {
                // Proporcionar datos por defecto
                builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                    .id(tramite.getAreaActualId())
                    .nombre("area no encontrada")
                    .descripcion("descripcion no disponible")
                    .build());
            }
        } else {
            // Proporcionar datos por defecto
            builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                .id(0L)
                .nombre("area no disponible")
                .descripcion("area no disponible")
                .build());
        }
        
        if (tramite.getAreaOrigenId() != null) {
            areaService.getAreaById(tramite.getAreaOrigenId()).ifPresent(area -> 
                builder.areaOrigen(TramiteResponse.AreaBasicInfo.builder()
                    .id(area.getId())
                    .nombre(area.getNombre())
                    .descripcion(area.getDescripcion())
                    .build()));
        }
        
        if (tramite.getRespuesta() != null) {
            builder.respuesta(tramite.getRespuesta());
        }
        if (tramite.getFechaRespuesta() != null) {
            builder.fechaRespuesta(tramite.getFechaRespuesta());
        }
        
        if (tramite.getUsuarioRespondioId() != null) {
            usuarioService.getUsuarioById(tramite.getUsuarioRespondioId()).ifPresent(usuario -> 
                builder.usuarioRespondio(TramiteResponse.UsuarioBasicInfo.builder()
                    .id(usuario.getId())
                    .nombre(usuario.getNombre())
                    .apellidos(usuario.getApellidos())
                    .correo(usuario.getCorreo())
                    .rol(usuario.getRole() != null ? usuario.getRole().getName() : null)
                    .build()));
        }
        
        // Mapear contadores
        builder.contadorProcesados(tramite.getContadorProcesados() != null ? tramite.getContadorProcesados() : 0);
        builder.contadorPorProcesar(tramite.getContadorPorProcesar() != null ? tramite.getContadorPorProcesar() : 0);

        if (tramite.getDocumentosAdjuntos() != null && !tramite.getDocumentosAdjuntos().isEmpty()) {
            try {
                // Intentar parsear como JSON array primero
                if (tramite.getDocumentosAdjuntos().trim().startsWith("[")) {
                    com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                    mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
                    mapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

                    java.util.List<java.util.Map<String, Object>> rawDocumentos = mapper.readValue(
                        tramite.getDocumentosAdjuntos(),
                        mapper.getTypeFactory().constructCollectionType(java.util.List.class, java.util.Map.class)
                    );

                    java.util.List<TramiteResponse.DocumentoAdjunto> documentosList = new java.util.ArrayList<>();
                    for (java.util.Map<String, Object> rawDoc : rawDocumentos) {
                        TramiteResponse.DocumentoAdjunto doc = new TramiteResponse.DocumentoAdjunto();
                        doc.setNombre((String) rawDoc.getOrDefault("nombre", "documento"));
                        doc.setTipo((String) rawDoc.getOrDefault("tipo", "application/octet-stream"));
                        doc.setUrl((String) rawDoc.get("url"));
                        doc.setDescripcion((String) rawDoc.get("descripcion"));

                        Object tamanoObj = rawDoc.get("tamano");
                        if (tamanoObj != null) {
                            doc.setTamanio(((Number) tamanoObj).longValue());
                        }

                        Object fechaObj = rawDoc.get("fechaSubida");
                        if (fechaObj instanceof String) {
                            try {
                                doc.setFechaSubida(java.time.LocalDateTime.parse((String) fechaObj));
                            } catch (Exception e) {
                                doc.setFechaSubida(java.time.LocalDateTime.now());
                            }
                        } else {
                            doc.setFechaSubida(java.time.LocalDateTime.now());
                        }

                        documentosList.add(doc);
                    }

                    builder.documentosAdjuntos(documentosList);
                    for (TramiteResponse.DocumentoAdjunto doc : documentosList) {
                    }
                } else {
                    TramiteResponse.DocumentoAdjunto doc = new TramiteResponse.DocumentoAdjunto();
                    doc.setNombre(tramite.getDocumentosAdjuntos());
                    doc.setTipo("application/octet-stream");
                    doc.setFechaSubida(java.time.LocalDateTime.now());
                    builder.documentosAdjuntos(java.util.Arrays.asList(doc));
                }
            } catch (Exception e) {
                builder.documentosAdjuntos(new java.util.ArrayList<>());
            }
        } else {
            builder.documentosAdjuntos(new java.util.ArrayList<>());
        }

        if (tramite.getArchivosRespuesta() != null && !tramite.getArchivosRespuesta().isEmpty()) {
            try {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
                mapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                java.util.List<TramiteResponse.DocumentoAdjunto> archivosList = mapper.readValue(tramite.getArchivosRespuesta(),
                    mapper.getTypeFactory().constructCollectionType(java.util.List.class,
                        TramiteResponse.DocumentoAdjunto.class));
                builder.archivosRespuesta(archivosList);
            } catch (Exception e) {
                builder.archivosRespuesta(new java.util.ArrayList<>());
            }
        } else {
            builder.archivosRespuesta(new java.util.ArrayList<>());
        }

        boolean estaVencido = false;
        Long diasRestantes = null;

        if (tramite.getFechaVencimiento() != null) {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime fechaVencimiento = tramite.getFechaVencimiento();

            estaVencido = now.isAfter(fechaVencimiento);

            long horas = java.time.Duration.between(now, fechaVencimiento).toHours();
            diasRestantes = horas / 24; // Convertir horas a días

        }

        builder.estaVencido(estaVencido);
        builder.diasRestantes(diasRestantes);

        return builder.build();
    }
    
    // Responder trámite con notificación obligatoria
    public com.example.demo.dto.ResponderTramiteResponse responderTramite(Long tramiteId, com.example.demo.dto.ResponderTramiteRequest request, Long administrativoId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        if (tramite.getEstado() == Tramite.EstadoTramite.FINALIZADO || 
            tramite.getEstado() == Tramite.EstadoTramite.ARCHIVADO ||
            tramite.getEstado() == Tramite.EstadoTramite.CANCELADO) {
            throw new RuntimeException("No se puede responder un trámite en estado: " + tramite.getEstado());
        }
        
        String estadoAnterior = tramite.getEstado().name();
        
        // Actualizar trámite con respuesta
        tramite.setRespuesta(request.getRespuesta());
        tramite.setFechaRespuesta(LocalDateTime.now());
        tramite.setUsuarioRespondioId(administrativoId);
        tramite.setEstado(Tramite.EstadoTramite.FINALIZADO);
        tramite.setFechaCompletado(LocalDateTime.now());
        
        if (tramite.getContadorProcesados() == null) {
            tramite.setContadorProcesados(0);
        }
        tramite.setContadorProcesados(tramite.getContadorProcesados() + 1);
        
        if (tramite.getContadorPorProcesar() != null && tramite.getContadorPorProcesar() > 0) {
            tramite.setContadorPorProcesar(tramite.getContadorPorProcesar() - 1);
        }
        
        if (request.getArchivosRespuesta() != null && !request.getArchivosRespuesta().isEmpty()) {
            List<String> archivosJsonList = new java.util.ArrayList<>();
            for (org.springframework.web.multipart.MultipartFile archivo : request.getArchivosRespuesta()) {
                String archivoJson = guardarArchivoRespuesta(archivo);
                archivosJsonList.add(archivoJson);
            }
            // Guardar como array JSON válido
            tramite.setArchivosRespuesta("[" + String.join(",", archivosJsonList) + "]");
        }
        
        if (request.getObservaciones() != null) {
            tramite.setObservaciones(request.getObservaciones());
        }
        
        tramite = tramiteRepository.save(tramite);
        
        registrarHistorial(tramiteId, administrativoId,
                         TramiteHistorial.TipoAccion.RESPONDIDO,
                         estadoAnterior, "FINALIZADO",
                         "Trámite respondido y finalizado");
        

        com.example.demo.dto.ResponderTramiteResponse.ResponsableInfo.ResponsableInfoBuilder responsableBuilder = 
            com.example.demo.dto.ResponderTramiteResponse.ResponsableInfo.builder();
        
        usuarioService.getUsuarioById(administrativoId).ifPresent(usuario -> {
            responsableBuilder
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .apellidos(usuario.getApellidos())
                .correo(usuario.getCorreo());
            
            if (usuario.getArea() != null && usuario.getArea().getId() != null) {
                responsableBuilder.area(usuario.getArea().getNombre());
            }
        });
        
        com.example.demo.dto.ResponderTramiteResponse.ResponsableInfo responsableInfo = responsableBuilder.build();
        

        Integer cantidadDocumentosRespuesta = 0;
        if (request.getArchivosRespuesta() != null) {
            cantidadDocumentosRespuesta = request.getArchivosRespuesta().size();
        }

        boolean emailEnviado = notificacionService.notificarRespuestaTramite(
            tramiteId,
            tramite.getUsuarioSolicitanteId(),
            administrativoId,
            request.getRespuesta(),
            request.getAsunto() != null ? request.getAsunto() : "Respuesta a su trámite " + tramite.getCodigo(),
            cantidadDocumentosRespuesta
        );
        
        
        return com.example.demo.dto.ResponderTramiteResponse.builder()
            .success(true)
            .mensaje("Trámite respondido exitosamente y notificación enviada")
            .tramiteId(tramite.getId())
            .codigoTramite(tramite.getCodigo())
            .estadoActual(tramite.getEstado().name())
            .responsable(responsableInfo)
            .fechaRespuesta(tramite.getFechaRespuesta())
            .emailEnviado(emailEnviado)
            .build();
    }
    
    public com.example.demo.dto.AprobarTramiteResponse aprobarTramite(Long tramiteId, com.example.demo.dto.AprobarTramiteRequest request, Long administrativoId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        if (!tramite.getEstado().equals(Tramite.EstadoTramite.ENVIADO) && 
            !tramite.getEstado().equals(Tramite.EstadoTramite.EN_REVISION)) {
            throw new RuntimeException("El trámite no se puede aprobar en su estado actual: " + tramite.getEstado());
        }
        

        Tramite.EstadoTramite estadoAnterior = tramite.getEstado();
        tramite.setEstado(Tramite.EstadoTramite.APROBADO);
        tramite.setFechaActualizacion(LocalDateTime.now());
        
        tramite.setContadorPorProcesar((tramite.getContadorPorProcesar() != null ? tramite.getContadorPorProcesar() : 0) + 1);
        
        if (tramite.getUsuarioAsignadoId() == null) {
            // Asignar al administrativo que aprueba
            tramite.setUsuarioAsignadoId(administrativoId);
        }
        
        // Guardar cambios
        tramite = tramiteRepository.save(tramite);
        
        TramiteHistorial historial = new TramiteHistorial();
        historial.setTramiteId(tramite.getId());
        historial.setEstadoAnterior(estadoAnterior.toString());
        historial.setEstadoNuevo(Tramite.EstadoTramite.APROBADO.toString());
        historial.setUsuarioId(administrativoId);
        historial.setFechaAccion(LocalDateTime.now());
        historial.setAccion(TramiteHistorial.TipoAccion.APROBADO);
        historial.setObservaciones(request.getObservaciones());
        historialRepository.save(historial);
        
        com.example.demo.dto.AprobarTramiteResponse response = new com.example.demo.dto.AprobarTramiteResponse();
        response.setSuccess(true);
        response.setMensaje("Trámite aprobado exitosamente");
        
        com.example.demo.dto.AprobarTramiteResponse.ResponsableAsignado responsableAsignado = 
            new com.example.demo.dto.AprobarTramiteResponse.ResponsableAsignado();
        
        responsableAsignado.setId(administrativoId);
        responsableAsignado.setNombre("Administrativo");
        responsableAsignado.setApellidos("Asignado");
        responsableAsignado.setArea("Secretaría General");
        
        response.setResponsableAsignado(responsableAsignado);
        response.setTramiteActualizado(convertirAResponse(tramite));
        
       
        
        
        return response;
    }
    

    @org.springframework.transaction.annotation.Transactional
    public void actualizarContadoresTramitesExistentes() {
        java.util.List<Tramite> tramitesAprobados = tramiteRepository.findAll().stream()
                .filter(t -> t.getEstado() == Tramite.EstadoTramite.APROBADO)
                .collect(java.util.stream.Collectors.toList());
        
        for (Tramite tramite : tramitesAprobados) {
            // Si no tiene respuesta, debe estar "por procesar"
            if (tramite.getRespuesta() == null || tramite.getRespuesta().isEmpty()) {
                if (tramite.getContadorPorProcesar() == null || tramite.getContadorPorProcesar() == 0) {
                    tramite.setContadorPorProcesar(1);
                    tramiteRepository.save(tramite);
                }
            }
        }
        
        // Actualizar trámites FINALIZADOS que fueron respondidos pero no tienen contadores actualizados  
        java.util.List<Tramite> tramitesFinalizados = tramiteRepository.findAll().stream()
                .filter(t -> t.getEstado() == Tramite.EstadoTramite.FINALIZADO)
                .collect(java.util.stream.Collectors.toList());
        
        for (Tramite tramite : tramitesFinalizados) {
            if (tramite.getRespuesta() != null && !tramite.getRespuesta().isEmpty()) {
                if (tramite.getContadorProcesados() == null || tramite.getContadorProcesados() == 0) {
                    tramite.setContadorProcesados(1);
                    tramite.setContadorPorProcesar(0); // Ya fue procesado
                    tramiteRepository.save(tramite);
                }
            }
        }
    }
    
    public void cambiarEstadoTramite(Long tramiteId, String nuevoEstado, String observaciones, Long usuarioId, String rol) {
        Optional<Tramite> tramiteOpt = tramiteRepository.findById(tramiteId);
        if (!tramiteOpt.isPresent()) {
            throw new RuntimeException("Trámite no encontrado con ID: " + tramiteId);
        }
        
        Tramite tramite = tramiteOpt.get();
        
        if ("USUARIO".equals(rol)) {
            if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                throw new RuntimeException("No tiene permisos para modificar este trámite");
            }
        }
        
        try {
            Tramite.EstadoTramite estadoEnum = Tramite.EstadoTramite.valueOf(nuevoEstado);
            tramite.setEstado(estadoEnum);
            tramite.setFechaActualizacion(LocalDateTime.now());
            
            if (observaciones != null && !observaciones.trim().isEmpty()) {
                String observacionesActuales = tramite.getObservaciones();
                String nuevasObservaciones = (observacionesActuales != null ? observacionesActuales + "\n" : "") + 
                    "[" + LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")) + "] " + observaciones;
                tramite.setObservaciones(nuevasObservaciones);
            }
            
            tramiteRepository.save(tramite);
            
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Estado no válido: " + nuevoEstado);
        }
    }
    
    public byte[] exportarTramitesAPdf(java.util.List<Long> tramiteIds, Long usuarioId, String rol) {
        try {
            // Obtener trámites
            java.util.List<Tramite> tramites = new java.util.ArrayList<>();
            for (Long id : tramiteIds) {
                Optional<Tramite> tramiteOpt = tramiteRepository.findById(id);
                if (tramiteOpt.isPresent()) {
                    Tramite tramite = tramiteOpt.get();
                    
                    // Validar permisos
                    if ("USUARIO".equals(rol) && !tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                        continue; // Saltar trámites que no le pertenecen al usuario
                    }
                    
                    tramites.add(tramite);
                }
            }
            
            if (tramites.isEmpty()) {
                throw new RuntimeException("No se encontraron trámites válidos para exportar");
            }
            
            return generarPdfSimple(tramites);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF: " + e.getMessage());
        }
    }
    
    private byte[] generarPdfSimple(java.util.List<Tramite> tramites) {
        StringBuilder contenido = new StringBuilder();
        contenido.append("EXPORTACICON DE TRA MITES\n");
        contenido.append("Fecha de generación: ").append(LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))).append("\n");
        contenido.append("Total de trámites: ").append(tramites.size()).append("\n\n");
        contenido.append("=".repeat(80)).append("\n\n");
        
        for (int i = 0; i < tramites.size(); i++) {
            Tramite tramite = tramites.get(i);
            contenido.append("TRAMITE ").append(i + 1).append("\n");
            contenido.append("-".repeat(40)).append("\n");
            contenido.append("Código: ").append(tramite.getCodigo()).append("\n");
            contenido.append("Título: ").append(tramite.getTitulo()).append("\n");
            contenido.append("Tipo: ").append(tramite.getTipo()).append("\n");
            contenido.append("Estado: ").append(tramite.getEstado()).append("\n");
            contenido.append("Prioridad: ").append(tramite.getPrioridad()).append("\n");
            contenido.append("Fecha creación: ").append(tramite.getFechaCreacion() != null ? 
                tramite.getFechaCreacion().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")) : "N/A").append("\n");
            contenido.append("Fecha vencimiento: ").append(tramite.getFechaVencimiento() != null ? 
                tramite.getFechaVencimiento().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy")) : "N/A").append("\n");

            contenido.append("Solicitante ID: ").append(tramite.getUsuarioSolicitanteId()).append("\n");
            contenido.append("Descripción: ").append(tramite.getDescripcion() != null ? tramite.getDescripcion() : "N/A").append("\n");
            
            if (tramite.getObservaciones() != null && !tramite.getObservaciones().trim().isEmpty()) {
                contenido.append("Observaciones: ").append(tramite.getObservaciones()).append("\n");
            }
            
            contenido.append("\n");
        }
        
        return contenido.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
    }

    public java.util.Map<String, Boolean> verificarPermisosAcciones(Long tramiteId, Long usuarioId, String rol) {
        java.util.Map<String, Boolean> permisos = new java.util.HashMap<>();

        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        boolean estaVencido = false;
        if (tramite.getFechaVencimiento() != null) {
            estaVencido = LocalDateTime.now().isAfter(tramite.getFechaVencimiento());
        }

        boolean esAdministrativo = "ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol);

        if (!esAdministrativo) {
            permisos.put("puedeAprobar", false);
            permisos.put("puedeRechazar", false);
            permisos.put("puedeDerivar", false);
            permisos.put("puedeResponder", false);
            permisos.put("estaVencido", estaVencido);
            return permisos;
        }

        // Si está vencido, deshabilitar todas las acciones
        if (estaVencido) {
            permisos.put("puedeAprobar", false);
            permisos.put("puedeRechazar", false);
            permisos.put("puedeDerivar", false);
            permisos.put("puedeResponder", false);
            permisos.put("estaVencido", true);
            return permisos;
        }

        String estadoNombre = tramite.getEstado() != null ? tramite.getEstado().name() : "";

        boolean puedeAprobar = true;
        boolean puedeRechazar = true;
        boolean puedeDerivar = true;

        Long usuarioAsignado = tramite.getUsuarioAsignadoId();

        List<String> estadosParaResponder = Arrays.asList("APROBADO", "DERIVADO");
        boolean puedeResponder = false;

        if (usuarioAsignado != null && usuarioAsignado.equals(usuarioId) && estadosParaResponder.contains(estadoNombre)) {
            puedeResponder = true;
        }

        permisos.put("puedeAprobar", puedeAprobar);
        permisos.put("puedeRechazar", puedeRechazar);
        permisos.put("puedeDerivar", puedeDerivar);
        permisos.put("puedeResponder", puedeResponder);
        permisos.put("estaVencido", false);

        return permisos;
    }

    @Transactional
    public TramiteResponse crearTramiteConArchivos(TramiteConArchivosRequest request, Long usuarioId, String rol) {
        try {
            TramiteRequest tramiteRequest = new TramiteRequest();
            tramiteRequest.setTitulo(request.getAsunto());
            tramiteRequest.setAsunto(request.getAsunto());
            tramiteRequest.setDescripcion(request.getDescripcion());
            tramiteRequest.setObservaciones(request.getObservaciones());
            tramiteRequest.setFechaVencimiento(request.getFechaVencimiento());
            tramiteRequest.setAreaDestinoId(request.getAreaDestinoId());

            String tipoString = mapTipoTramiteIdToString(request.getTipoTramiteId());
            String prioridadString = mapPrioridadIdToString(request.getPrioridadId());
            tramiteRequest.setTipo(tipoString);
            tramiteRequest.setPrioridad(prioridadString);

            TramiteResponse tramiteCreado = crearTramite(tramiteRequest, usuarioId, rol);

            if (request.getDocumentos() != null && !request.getDocumentos().isEmpty()) {
                procesarDocumentosBase64(tramiteCreado.getId(), request.getDocumentos(), usuarioId);
            }

            return tramiteCreado;

        } catch (Exception e) {
            throw new RuntimeException("Error al crear trámite con archivos: " + e.getMessage(), e);
        }
    }

    @Transactional
    public TramiteResponse actualizarTramiteConArchivos(Long tramiteId, ActualizarTramiteConArchivosRequest request, Long usuarioId, String rol) {
        try {
            TramiteRequest tramiteRequest = new TramiteRequest();
            tramiteRequest.setTitulo(request.getAsunto() != null ? request.getAsunto() : request.getTitulo());
            tramiteRequest.setDescripcion(request.getDescripcion());
            tramiteRequest.setObservaciones(request.getObservaciones());
            tramiteRequest.setFechaVencimiento(request.getFechaVencimiento());
            tramiteRequest.setAreaDestinoId(request.getAreaDestinoId());
            tramiteRequest.setTipo(request.getTipo());
            tramiteRequest.setPrioridad(request.getPrioridad());

            Optional<Tramite> tramiteExistente = tramiteRepository.findById(tramiteId);
            if (tramiteExistente.isEmpty()) {
                throw new RuntimeException("Trámite no encontrado con ID: " + tramiteId);
            }

            Tramite tramite = tramiteExistente.get();

            if (request.getAsunto() != null) {
              
                tramite.setTitulo(request.getAsunto());
            } else if (request.getTitulo() != null) {
                tramite.setTitulo(request.getTitulo());
            }
            if (request.getDescripcion() != null) {
               
                tramite.setDescripcion(request.getDescripcion());
            }
            if (request.getObservaciones() != null) {
                tramite.setObservaciones(request.getObservaciones());
            }
            if (request.getFechaVencimiento() != null) {
                tramite.setFechaVencimiento(request.getFechaVencimiento());
            }

            if (request.getTipoId() != null) {

                Tramite.TipoTramite tipoEnum = mapearTipoTramiteDesdeId(request.getTipoId());
                if (tipoEnum != null) {
                    tramite.setTipo(tipoEnum);
                }
            } else if (request.getTipo() != null) {
                try {
                    Tramite.TipoTramite tipoEnum = Tramite.TipoTramite.valueOf(request.getTipo().toUpperCase());
                    tramite.setTipo(tipoEnum);
                } catch (IllegalArgumentException e) {
                }
            }

            if (request.getPrioridadId() != null) {
    
                Tramite.PrioridadTramite prioridadEnum = mapearPrioridadDesdeId(request.getPrioridadId());
                if (prioridadEnum != null) {
           
                    tramite.setPrioridad(prioridadEnum);
                }
            } else if (request.getPrioridad() != null) {
                try {
                    Tramite.PrioridadTramite prioridadEnum = Tramite.PrioridadTramite.valueOf(request.getPrioridad().toUpperCase());
                    tramite.setPrioridad(prioridadEnum);
                } catch (IllegalArgumentException e) {
                }
            }

            // Guardar cambios
            Tramite tramiteGuardado = tramiteRepository.save(tramite);

            TramiteResponse tramiteActualizado = new TramiteResponse();
            tramiteActualizado.setId(tramiteGuardado.getId());
            tramiteActualizado.setCodigo(tramiteGuardado.getCodigo() != null ? tramiteGuardado.getCodigo() : "TRM-" + tramiteGuardado.getId());
            tramiteActualizado.setTitulo(tramiteGuardado.getTitulo() != null ? tramiteGuardado.getTitulo() : "Trámite actualizado");
            tramiteActualizado.setDescripcion(tramiteGuardado.getDescripcion() != null ? tramiteGuardado.getDescripcion() : "");
            if (tramiteGuardado.getObservaciones() != null) {
                tramiteActualizado.setObservaciones(tramiteGuardado.getObservaciones());
            }

            if (request.getDocumentosAEliminar() != null && !request.getDocumentosAEliminar().isEmpty()) {
                eliminarDocumentos(tramiteId, request.getDocumentosAEliminar(), usuarioId);
            }

            if (request.getDocumentos() != null && !request.getDocumentos().isEmpty()) {
                procesarDocumentosBase64(tramiteId, request.getDocumentos(), usuarioId);
            }

            return tramiteActualizado;

        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar trámite con archivos: " + e.getMessage(), e);
        }
    }

    private void procesarDocumentosBase64(Long tramiteId, List<DocumentoBase64Request> documentos, Long usuarioId) {
        if (documentos == null || documentos.isEmpty()) {
            return; // No hay documentos que procesar
        }

        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        List<String> archivosJsonList = new ArrayList<>();

        for (DocumentoBase64Request documento : documentos) {
            try {

                if (documento.getContenido() == null || documento.getContenido().isEmpty()) {
                    continue; // Saltar documentos sin contenido
                }

                String archivoJson = String.format(
                    "{\"nombre\":\"%s\",\"tipo\":\"%s\",\"tamano\":%d,\"contenido\":\"%s\",\"descripcion\":\"%s\",\"fechaSubida\":\"%s\"}",
                    documento.getNombre() != null ? documento.getNombre() : "documento.pdf",
                    documento.getTipo() != null ? documento.getTipo() : "application/pdf",
                    documento.getTamano() != null ? documento.getTamano() : 0,
                    documento.getContenido(),
                    documento.getDescripcion() != null ? documento.getDescripcion() : "",
                    java.time.LocalDateTime.now().toString()
                );

                archivosJsonList.add(archivoJson);

            } catch (Exception e) {
          
            }
        }

        if (!archivosJsonList.isEmpty()) {
            String documentosActuales = tramite.getDocumentosAdjuntos();
            String nuevosDocumentos;

            if (documentosActuales != null && !documentosActuales.trim().isEmpty()) {
                if (documentosActuales.startsWith("[") && documentosActuales.endsWith("]")) {
                    nuevosDocumentos = documentosActuales.substring(0, documentosActuales.length() - 1)
                        + "," + String.join(",", archivosJsonList) + "]";
                } else {
                    nuevosDocumentos = "[" + documentosActuales + "," + String.join(",", archivosJsonList) + "]";
                }
            } else {
                nuevosDocumentos = "[" + String.join(",", archivosJsonList) + "]";
            }

            tramite.setDocumentosAdjuntos(nuevosDocumentos);
            tramiteRepository.save(tramite);
        }
    }

    private void eliminarDocumentos(Long tramiteId, List<Long> documentoIds, Long usuarioId) {
        if (documentoIds == null || documentoIds.isEmpty()) {
            return; // No hay documentos que eliminar
        }

        for (Long documentoId : documentoIds) {
            try {
        

            } catch (Exception e) {
            }
        }
    }

    private String obtenerExtensionDeNombre(String nombreArchivo) {
        int puntoIndex = nombreArchivo.lastIndexOf('.');
        return puntoIndex > 0 ? nombreArchivo.substring(puntoIndex) : "";
    }

    private String guardarArchivo(byte[] contenido, String nombreArchivo, Long tramiteId) {
        try {

            java.nio.file.Path directorioTramite = java.nio.file.Paths.get("uploads", "tramites", tramiteId.toString());
            java.nio.file.Files.createDirectories(directorioTramite);

            // Guardar archivo
            java.nio.file.Path rutaCompleta = directorioTramite.resolve(nombreArchivo);
            java.nio.file.Files.write(rutaCompleta, contenido);

            return rutaCompleta.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar archivo " + nombreArchivo + ": " + e.getMessage(), e);
        }
    }

    private String mapTipoTramiteIdToString(Long tipoTramiteId) {
        return switch (tipoTramiteId.intValue()) {
            case 1 -> "SOLICITUD";
            case 2 -> "RECLAMO";
            case 3 -> "CONSULTA";
            case 4 -> "PETICION";
            case 5 -> "CERTIFICACION";
            case 6 -> "PERMISO";
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

    // Rechazar trámite con notificación por correo
    @Transactional
    public com.example.demo.dto.RechazarTramiteResponse rechazarTramite(Long tramiteId, com.example.demo.dto.RechazarTramiteRequest request, Long administrativoId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        if (tramite.getEstado().equals(Tramite.EstadoTramite.FINALIZADO) ||
            tramite.getEstado().equals(Tramite.EstadoTramite.ARCHIVADO)) {
            throw new RuntimeException("El trámite no se puede rechazar en su estado actual: " + tramite.getEstado());
        }

        Tramite.EstadoTramite estadoAnterior = tramite.getEstado();
        tramite.setEstado(Tramite.EstadoTramite.RECHAZADO);
        tramite.setFechaActualizacion(LocalDateTime.now());

        tramite.setContadorRechazados((tramite.getContadorRechazados() != null ? tramite.getContadorRechazados() : 0) + 1);

        // Guardar cambios
        tramite = tramiteRepository.save(tramite);

        TramiteHistorial historial = new TramiteHistorial();
        historial.setTramiteId(tramite.getId());
        historial.setEstadoAnterior(estadoAnterior.toString());
        historial.setEstadoNuevo(Tramite.EstadoTramite.RECHAZADO.toString());
        historial.setUsuarioId(administrativoId);
        historial.setFechaAccion(LocalDateTime.now());
        historial.setAccion(TramiteHistorial.TipoAccion.RECHAZADO);
        historial.setObservaciones(request.getMotivoRechazo());
        historialRepository.save(historial);

        UsuarioResponse administrativo = usuarioService.obtenerUsuarioPorId(administrativoId);
        String nombreAdministrativo = administrativo.getNombre() + " " + administrativo.getApellidos();

        // Enviar notificación por correo al solicitante
        boolean notificacionEnviada = false;
        try {
            if (tramite.getUsuarioSolicitanteId() != null) {
                emailService.enviarCorreoRechazoTramite(
                    tramite.getUsuarioSolicitanteId(),
                    tramiteId,
                    request.getMotivoRechazo(),
                    request.getObservaciones(),
                    nombreAdministrativo
                );
                notificacionEnviada = true;

                notificacionService.crearNotificacionRechazoTramite(
                    tramite.getUsuarioSolicitanteId(),
                    tramiteId,
                    tramite.getCodigo(),
                    tramite.getAsunto(),
                    request.getMotivoRechazo()
                );
            }
        } catch (Exception e) {
        }

        return com.example.demo.dto.RechazarTramiteResponse.builder()
            .tramiteId(tramite.getId())
            .codigo(tramite.getCodigo())
            .estado(tramite.getEstado().toString())
            .motivoRechazo(request.getMotivoRechazo())
            .observaciones(request.getObservaciones())
            .fechaRechazo(LocalDateTime.now())
            .rechazadoPor(nombreAdministrativo)
            .notificacionEnviada(notificacionEnviada)
            .mensaje("Trámite rechazado exitosamente")
            .build();
    }

    public byte[] generarPdfTramite(Long tramiteId, Long usuarioId, String rol) {
        try {
            Tramite tramite = tramiteRepository.findById(tramiteId)
                .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

            if (!"ADMIN".equals(rol) && !"ADMINISTRATIVO".equals(rol)) {
                if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                    throw new RuntimeException("No tiene permisos para imprimir este trámite");
                }
            }

            String htmlContent = generarHtmlTramite(tramite);

            return convertirHtmlAPdf(htmlContent);

        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF: " + e.getMessage(), e);
        }
    }

    private String generarHtmlTramite(Tramite tramite) {
        UsuarioResponse solicitante = null;
        UsuarioResponse asignado = null;

        try {
            if (tramite.getUsuarioSolicitanteId() != null) {
                solicitante = usuarioService.obtenerUsuarioPorId(tramite.getUsuarioSolicitanteId());
            }
            if (tramite.getUsuarioAsignadoId() != null) {
                asignado = usuarioService.obtenerUsuarioPorId(tramite.getUsuarioAsignadoId());
            }
        } catch (Exception e) {
        }

        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html><html><head>")
            .append("<meta charset='UTF-8'>")
            .append("<title>Trámite ").append(tramite.getCodigo()).append("</title>")
            .append("<style>")
            .append("body { font-family: Arial, sans-serif; margin: 20px; }")
            .append(".header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }")
            .append(".section { margin-bottom: 15px; }")
            .append(".label { font-weight: bold; color: #555; }")
            .append(".value { margin-left: 10px; }")
            .append(".estado { padding: 5px 10px; border-radius: 5px; color: white; display: inline-block; }")
            .append(".estado.ENVIADO { background-color: #007bff; }")
            .append(".estado.EN_REVISION { background-color: #ffc107; color: black; }")
            .append(".estado.APROBADO { background-color: #28a745; }")
            .append(".estado.FINALIZADO { background-color: #17a2b8; }")
            .append(".estado.RECHAZADO { background-color: #dc3545; }")
            .append(".footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }")
            .append("</style>")
            .append("</head><body>");

        // Header
        html.append("<div class='header'>")
            .append("<h1>SISTEMA DE TRÁMITES DOCUMENTARIOS</h1>")
            .append("<h2>Detalle del Trámite</h2>")
            .append("</div>");

        // Información básica
        html.append("<div class='section'>")
            .append("<span class='label'>Código:</span>")
            .append("<span class='value'>").append(tramite.getCodigo()).append("</span>")
            .append("</div>");

        html.append("<div class='section'>")
            .append("<span class='label'>Tipo:</span>")
            .append("<span class='value'>").append(formatearNombreEstado(tramite.getTipo().name())).append("</span>")
            .append("</div>");

        html.append("<div class='section'>")
            .append("<span class='label'>Estado:</span>")
            .append("<span class='estado ").append(tramite.getEstado().name()).append("'>")
            .append(formatearNombreEstado(tramite.getEstado().name())).append("</span>")
            .append("</div>");

        html.append("<div class='section'>")
            .append("<span class='label'>Prioridad:</span>")
            .append("<span class='value'>").append(tramite.getPrioridad().name()).append("</span>")
            .append("</div>");

        if (tramite.getTitulo() != null) {
            html.append("<div class='section'>")
                .append("<span class='label'>Título:</span>")
                .append("<span class='value'>").append(tramite.getTitulo()).append("</span>")
                .append("</div>");
        }

        if (tramite.getDescripcion() != null) {
            html.append("<div class='section'>")
                .append("<span class='label'>Descripción:</span>")
                .append("<div class='value'>").append(tramite.getDescripcion().replace("\n", "<br>")).append("</div>")
                .append("</div>");
        }

        if (solicitante != null) {
            html.append("<div class='section'>")
                .append("<span class='label'>Solicitante:</span>")
                .append("<span class='value'>").append(solicitante.getNombre()).append(" ").append(solicitante.getApellidos()).append("</span>")
                .append("</div>");
        }

        if (asignado != null) {
            html.append("<div class='section'>")
                .append("<span class='label'>Asignado a:</span>")
                .append("<span class='value'>").append(asignado.getNombre()).append(" ").append(asignado.getApellidos()).append("</span>")
                .append("</div>");
        }

        html.append("<div class='section'>")
            .append("<span class='label'>Fecha de Creación:</span>")
            .append("<span class='value'>").append(formatearFecha(tramite.getFechaCreacion())).append("</span>")
            .append("</div>");

        if (tramite.getFechaVencimiento() != null) {
            html.append("<div class='section'>")
                .append("<span class='label'>Fecha de Vencimiento:</span>")
                .append("<span class='value'>").append(formatearFecha(tramite.getFechaVencimiento())).append("</span>")
                .append("</div>");
        }

        if (tramite.getObservaciones() != null && !tramite.getObservaciones().trim().isEmpty()) {
            html.append("<div class='section'>")
                .append("<span class='label'>Observaciones:</span>")
                .append("<div class='value'>").append(tramite.getObservaciones().replace("\n", "<br>")).append("</div>")
                .append("</div>");
        }

        // Footer
        html.append("<div class='footer'>")
            .append("<p>Documento generado el ").append(formatearFecha(LocalDateTime.now())).append("</p>")
            .append("<p>Sistema de Trámites Documentarios</p>")
            .append("</div>");

        html.append("</body></html>");

        return html.toString();
    }

    private byte[] convertirHtmlAPdf(String htmlContent) {
        try {
  
            String pdfContent = "PDF CONTENT FOR: " + htmlContent.substring(0, Math.min(100, htmlContent.length()));
            return pdfContent.getBytes("UTF-8");

        } catch (Exception e) {
            throw new RuntimeException("Error al convertir HTML a PDF", e);
        }
    }

    private String formatearFecha(LocalDateTime fecha) {
        if (fecha == null) return "N/A";
        return fecha.format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
    }

    private String formatearNombreEstado(String estado) {
        return switch (estado) {
            case "ENVIADO" -> "Enviado";
            case "EN_REVISION" -> "En Revisión";
            case "APROBADO" -> "Aprobado";
            case "FINALIZADO" -> "Finalizado";
            case "RECHAZADO" -> "Rechazado";
            case "OBSERVADO" -> "Observado";
            case "DERIVADO" -> "Derivado";
            case "EN_PROCESO" -> "En Proceso";
            default -> estado;
        };
    }

    public String generarHtmlParaImpresion(Long tramiteId, Long usuarioId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        UsuarioResponse usuarioSolicitante = null;
        UsuarioResponse usuarioAsignado = null;
        AreaResponse areaActual = null;
        AreaResponse areaOrigen = null;

        try {
            if (tramite.getUsuarioSolicitanteId() != null) {
                usuarioSolicitante = usuarioService.obtenerUsuarioPorId(tramite.getUsuarioSolicitanteId());
            }
            if (tramite.getUsuarioAsignadoId() != null) {
                usuarioAsignado = usuarioService.obtenerUsuarioPorId(tramite.getUsuarioAsignadoId());
            }
            if (tramite.getAreaActualId() != null) {
                areaActual = areaService.getAreaById(tramite.getAreaActualId()).orElse(null);
            }
            if (tramite.getAreaOrigenId() != null) {
                areaOrigen = areaService.getAreaById(tramite.getAreaOrigenId()).orElse(null);
            }
        } catch (Exception e) {
        }

        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>")
            .append("<html lang='es'>")
            .append("<head>")
            .append("<meta charset='UTF-8'>")
            .append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>")
            .append("<title>Documento Oficial - Trámite ").append(tramite.getCodigo()).append("</title>")
            .append("<style>")
            .append("* { margin: 0; padding: 0; box-sizing: border-box; }")
            .append("body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; color: #000; background: #fff; max-width: 210mm; margin: 0 auto; padding: 20mm; }")

            // Header oficial
            .append(".header { text-align: center; border-bottom: 3px solid #1f4788; padding-bottom: 20px; margin-bottom: 30px; }")
            .append(".logo-section { margin-bottom: 15px; }")
            .append(".institution-name { font-size: 18pt; font-weight: bold; color: #1f4788; text-transform: uppercase; letter-spacing: 1px; }")
            .append(".department { font-size: 14pt; color: #2c5aa0; margin: 5px 0; }")
            .append(".document-title { font-size: 16pt; font-weight: bold; margin-top: 15px; text-transform: uppercase; }")

            .append(".document-info { background: #f8f9fa; border: 2px solid #dee2e6; padding: 15px; margin: 20px 0; border-radius: 5px; }")
            .append(".doc-number { text-align: center; font-size: 14pt; font-weight: bold; color: #d63384; margin-bottom: 10px; }")
            .append(".doc-date { text-align: right; font-style: italic; color: #6c757d; }")

            .append(".info-section { margin: 25px 0; }")
            .append(".section-title { font-size: 14pt; font-weight: bold; color: #1f4788; border-bottom: 1px solid #1f4788; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase; }")
            .append(".info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }")
            .append(".info-table td { padding: 8px 12px; border: 1px solid #dee2e6; vertical-align: top; }")
            .append(".info-table .label { background: #e9ecef; font-weight: bold; width: 30%; color: #495057; }")
            .append(".info-table .value { background: #fff; }")

            .append(".status-badge { display: inline-block; padding: 4px 12px; border-radius: 15px; font-size: 10pt; font-weight: bold; text-transform: uppercase; }")
            .append(".status-enviado { background: #cce5ff; color: #004085; }")
            .append(".status-en_revision { background: #fff3cd; color: #856404; }")
            .append(".status-en_proceso { background: #d4edda; color: #155724; }")
            .append(".status-finalizado { background: #d1ecf1; color: #0c5460; }")
            .append(".status-aprobado { background: #d4edda; color: #155724; }")
            .append(".status-rechazado { background: #f8d7da; color: #721c24; }")
            .append(".status-observado { background: #ffeaa7; color: #856404; }")

            .append(".priority-badge { display: inline-block; padding: 4px 12px; border-radius: 15px; font-size: 10pt; font-weight: bold; text-transform: uppercase; }")
            .append(".priority-baja { background: #e2e3e5; color: #383d41; }")
            .append(".priority-normal { background: #bee5eb; color: #0c5460; }")
            .append(".priority-alta { background: #f8d7da; color: #721c24; }")
            .append(".priority-urgente { background: #dc3545; color: #fff; }")

            .append(".content-section { margin: 25px 0; }")
            .append(".content-box { border: 1px solid #dee2e6; padding: 15px; background: #fff; border-radius: 5px; }")
            .append(".content-text { text-align: justify; line-height: 1.6; }")

            // Footer
            .append(".footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #1f4788; }")
            .append(".signatures { display: flex; justify-content: space-between; margin-top: 60px; }")
            .append(".signature-box { text-align: center; width: 45%; }")
            .append(".signature-line { border-top: 1px solid #000; margin-top: 50px; padding-top: 5px; font-size: 10pt; }")

            .append("@media print {")
            .append("  body { margin: 0; padding: 15mm; font-size: 11pt; }")
            .append("  .header { page-break-after: avoid; }")
            .append("  .info-section { page-break-inside: avoid; }")
            .append("  .content-section { page-break-inside: avoid; }")
            .append("  .no-print { display: none; }")
            .append("}")

            .append("</style>")
            .append("</head>")
            .append("<body>");

        // Header oficial
        html.append("<div class='header'>")
            .append("<div class='logo-section'>")
            .append("<div class='institution-name'>Sistema de Trámite Documentario</div>")
            .append("<div class='department'>Secretaría General</div>")
            .append("</div>")
            .append("<div class='document-title'>Documento Oficial de Trámite</div>")
            .append("</div>");

        html.append("<div class='document-info'>")
            .append("<div class='doc-number'>DOCUMENTO N° ").append(tramite.getCodigo()).append("</div>")
            .append("<div class='doc-date'>Generado el: ").append(formatearFecha(LocalDateTime.now())).append("</div>")
            .append("</div>");

        html.append("<div class='info-section'>")
            .append("<div class='section-title'>Información General</div>")
            .append("<table class='info-table'>")
            .append("<tr><td class='label'>Código de Trámite:</td><td class='value'>").append(tramite.getCodigo()).append("</td></tr>")
            .append("<tr><td class='label'>Título:</td><td class='value'>").append(tramite.getTitulo() != null ? tramite.getTitulo() : "N/A").append("</td></tr>")
            .append("<tr><td class='label'>Asunto:</td><td class='value'>").append(tramite.getAsunto() != null ? tramite.getAsunto() : "N/A").append("</td></tr>")
            .append("<tr><td class='label'>Tipo de Trámite:</td><td class='value'>").append(formatearTipoTramite(tramite.getTipo())).append("</td></tr>")
            .append("<tr><td class='label'>Estado Actual:</td><td class='value'>")
            .append("<span class='status-badge status-").append(tramite.getEstado().name().toLowerCase()).append("'>")
            .append(formatearNombreEstado(tramite.getEstado().name())).append("</span></td></tr>")
            .append("<tr><td class='label'>Prioridad:</td><td class='value'>")
            .append("<span class='priority-badge priority-").append(tramite.getPrioridad().name().toLowerCase()).append("'>")
            .append(formatearPrioridad(tramite.getPrioridad())).append("</span></td></tr>");

        if (tramite.getNumeroExpediente() != null) {
            html.append("<tr><td class='label'>N° Expediente:</td><td class='value'>").append(tramite.getNumeroExpediente()).append("</td></tr>");
        }

        html.append("</table>")
            .append("</div>");

        html.append("<div class='info-section'>")
            .append("<div class='section-title'>Información Temporal</div>")
            .append("<table class='info-table'>")
            .append("<tr><td class='label'>Fecha de Creación:</td><td class='value'>").append(formatearFecha(tramite.getFechaCreacion())).append("</td></tr>");

        if (tramite.getFechaVencimiento() != null) {
            html.append("<tr><td class='label'>Fecha de Vencimiento:</td><td class='value'>").append(formatearFecha(tramite.getFechaVencimiento())).append("</td></tr>");
        }
        if (tramite.getFechaCompletado() != null) {
            html.append("<tr><td class='label'>Fecha de Finalización:</td><td class='value'>").append(formatearFecha(tramite.getFechaCompletado())).append("</td></tr>");
        }
        if (tramite.getFechaRespuesta() != null) {
            html.append("<tr><td class='label'>Fecha de Respuesta:</td><td class='value'>").append(formatearFecha(tramite.getFechaRespuesta())).append("</td></tr>");
        }

        html.append("</table>")
            .append("</div>");

        html.append("<div class='info-section'>")
            .append("<div class='section-title'>Personas y Áreas Involucradas</div>")
            .append("<table class='info-table'>");

        if (usuarioSolicitante != null) {
            html.append("<tr><td class='label'>Solicitante:</td><td class='value'>")
                .append(usuarioSolicitante.getNombre()).append(" ").append(usuarioSolicitante.getApellidos());
            if (usuarioSolicitante.getCorreo() != null) {
                html.append(" (").append(usuarioSolicitante.getCorreo()).append(")");
            }
            html.append("</td></tr>");
        }

        if (usuarioAsignado != null) {
            html.append("<tr><td class='label'>Asignado a:</td><td class='value'>")
                .append(usuarioAsignado.getNombre()).append(" ").append(usuarioAsignado.getApellidos());
            if (usuarioAsignado.getCorreo() != null) {
                html.append(" (").append(usuarioAsignado.getCorreo()).append(")");
            }
            html.append("</td></tr>");
        }

        if (areaOrigen != null) {
            html.append("<tr><td class='label'>Área de Origen:</td><td class='value'>").append(areaOrigen.getNombre()).append("</td></tr>");
        }

        if (areaActual != null) {
            html.append("<tr><td class='label'>Área Actual:</td><td class='value'>").append(areaActual.getNombre()).append("</td></tr>");
        }

        html.append("</table>")
            .append("</div>");

        if (tramite.getDescripcion() != null && !tramite.getDescripcion().trim().isEmpty()) {
            html.append("<div class='content-section'>")
                .append("<div class='section-title'>Descripción del Trámite</div>")
                .append("<div class='content-box'>")
                .append("<div class='content-text'>").append(tramite.getDescripcion().replace("\n", "<br>")).append("</div>")
                .append("</div>")
                .append("</div>");
        }

        if (tramite.getObservaciones() != null && !tramite.getObservaciones().trim().isEmpty()) {
            html.append("<div class='content-section'>")
                .append("<div class='section-title'>Observaciones</div>")
                .append("<div class='content-box'>")
                .append("<div class='content-text'>").append(tramite.getObservaciones().replace("\n", "<br>")).append("</div>")
                .append("</div>")
                .append("</div>");
        }

        // Respuesta
        if (tramite.getRespuesta() != null && !tramite.getRespuesta().trim().isEmpty()) {
            html.append("<div class='content-section'>")
                .append("<div class='section-title'>Respuesta Oficial</div>")
                .append("<div class='content-box'>")
                .append("<div class='content-text'>").append(tramite.getRespuesta().replace("\n", "<br>")).append("</div>")
                .append("</div>")
                .append("</div>");
        }

        // Footer con firmas
        html.append("<div class='footer'>")
            .append("<div class='signatures'>")
            .append("<div class='signature-box'>")
            .append("<div class='signature-line'>Firma del Solicitante</div>")
            .append("</div>")
            .append("<div class='signature-box'>")
            .append("<div class='signature-line'>Firma del Responsable</div>")
            .append("</div>")
            .append("</div>")
            .append("<div style='text-align: center; margin-top: 30px; font-size: 10pt; color: #6c757d;'>")
            .append("Este documento ha sido generado automáticamente por el Sistema de Trámite Documentario<br>")
            .append("Fecha y hora de generación: ").append(formatearFecha(LocalDateTime.now()))
            .append("</div>")
            .append("</div>");

        html.append("</body></html>");

        return html.toString();
    }

    private String formatearTipoTramite(Tramite.TipoTramite tipo) {
        if (tipo == null) return "N/A";

        return switch (tipo) {
            case SOLICITUD_CERTIFICADO -> "Solicitud de Certificado";
            case SOLICITUD_CONSTANCIA -> "Solicitud de Constancia";
            case SOLICITUD_PERMISO -> "Solicitud de Permiso";
            case RECLAMO -> "Reclamo";
            case SUGERENCIA -> "Sugerencia";
            case CONSULTA -> "Consulta";
            case LICENCIA -> "Licencia";
            case AUTORIZACION -> "Autorización";
            case REVISION_EXPEDIENTE -> "Revisión de Expediente";
            case TRAMITE_ACADEMICO -> "Trámite Académico";
            case TRAMITE_ADMINISTRATIVO -> "Trámite Administrativo";
            case OTRO -> "Otro";
        };
    }

    private String formatearPrioridad(Tramite.PrioridadTramite prioridad) {
        if (prioridad == null) return "Normal";

        return switch (prioridad) {
            case BAJA -> "Baja";
            case NORMAL -> "Normal";
            case ALTA -> "Alta";
            case URGENTE -> "Urgente";
        };
    }

    private Tramite.TipoTramite mapearTipoTramiteDesdeId(Long tipoId) {
        return switch (tipoId.intValue()) {
            case 1 -> Tramite.TipoTramite.TRAMITE_ADMINISTRATIVO;
            case 2 -> Tramite.TipoTramite.TRAMITE_ACADEMICO;
            case 3 -> Tramite.TipoTramite.SOLICITUD_CERTIFICADO;
            case 4 -> Tramite.TipoTramite.SOLICITUD_CONSTANCIA;
            case 5 -> Tramite.TipoTramite.SOLICITUD_PERMISO;
            case 6 -> Tramite.TipoTramite.LICENCIA;
            case 7 -> Tramite.TipoTramite.AUTORIZACION;
            case 8 -> Tramite.TipoTramite.RECLAMO;
            case 9 -> Tramite.TipoTramite.CONSULTA;
            case 10 -> Tramite.TipoTramite.SUGERENCIA;
            case 11 -> Tramite.TipoTramite.REVISION_EXPEDIENTE;
            case 12 -> Tramite.TipoTramite.OTRO;
            default -> {
           
                yield null;
            }
        };
    }

    private Tramite.PrioridadTramite mapearPrioridadDesdeId(Long prioridadId) {
        return switch (prioridadId.intValue()) {
            case 1 -> Tramite.PrioridadTramite.BAJA;
            case 2 -> Tramite.PrioridadTramite.NORMAL;
            case 3 -> Tramite.PrioridadTramite.ALTA;
            case 4 -> Tramite.PrioridadTramite.URGENTE;
            default -> {
                yield null;
            }
        };
    }

    @Transactional
    public TramiteResponse editarTramiteUsuario(Long tramiteId, com.example.demo.dto.EditarTramiteRequest request, Long usuarioId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para editar este trámite");
        }

        if (tramite.getEstado() == Tramite.EstadoTramite.FINALIZADO ||
            tramite.getEstado() == Tramite.EstadoTramite.RECHAZADO ||
            tramite.getEstado() == Tramite.EstadoTramite.ARCHIVADO) {
            throw new RuntimeException("No se pueden editar trámites en estado FINALIZADO, RECHAZADO o ARCHIVADO");
        }

        String tituloAnterior = tramite.getTitulo();
        String asuntoAnterior = tramite.getAsunto();

        if (request.getTitulo() != null && !request.getTitulo().trim().isEmpty()) {
            tramite.setTitulo(request.getTitulo().trim());
        }
        if (request.getAsunto() != null && !request.getAsunto().trim().isEmpty()) {
            tramite.setAsunto(request.getAsunto().trim());
        }
        if (request.getDescripcion() != null) {
            tramite.setDescripcion(request.getDescripcion().trim());
        }
        if (request.getNumeroExpediente() != null) {
            tramite.setNumeroExpediente(request.getNumeroExpediente().trim());
        }
        if (request.getObservaciones() != null) {
            tramite.setObservaciones(request.getObservaciones().trim());
        }
        if (request.getTipo() != null && !request.getTipo().trim().isEmpty()) {
            try {
                tramite.setTipo(Tramite.TipoTramite.valueOf(request.getTipo().toUpperCase()));
            } catch (IllegalArgumentException e) {
            }
        }
        if (request.getPrioridad() != null && !request.getPrioridad().trim().isEmpty()) {
            try {
                tramite.setPrioridad(Tramite.PrioridadTramite.valueOf(request.getPrioridad().toUpperCase()));
            } catch (IllegalArgumentException e) {
            }
        }
        if (request.getAreaDestinoId() != null) {
            tramite.setAreaActualId(request.getAreaDestinoId());
        }

        // Guardar cambios
        Tramite tramiteActualizado = tramiteRepository.save(tramite);

        TramiteHistorial historial = new TramiteHistorial();
        historial.setTramiteId(tramiteId);
        historial.setUsuarioId(usuarioId);
        historial.setAccion(TramiteHistorial.TipoAccion.MODIFICADO);
        historial.setEstadoAnterior(tramite.getEstado().name());
        historial.setEstadoNuevo(tramite.getEstado().name());
        historial.setObservaciones(String.format(
            "Trámite editado por el usuario. Título anterior: %s. Asunto anterior: %s",
            tituloAnterior,
            asuntoAnterior
        ));
        historialRepository.save(historial);

        emailService.notificarEdicionTramiteAUsuario(usuarioId, tramiteId, tituloAnterior, tramite.getTitulo());

        return convertirAResponse(tramiteActualizado);
    }

}