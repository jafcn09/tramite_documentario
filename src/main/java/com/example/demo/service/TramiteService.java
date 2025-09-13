package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.AreaResponse;
import com.example.demo.dto.TramiteRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.model.Tramite;
import com.example.demo.model.TramiteHistorial;
import com.example.demo.repository.TramiteHistorialRepository;
import com.example.demo.repository.TramiteRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TramiteService {
    
    private final TramiteRepository tramiteRepository;
    private final TramiteHistorialRepository historialRepository;
    private final NotificacionService notificacionService;
    private final UsuarioService usuarioService;
    private final AreaService areaService;
    
    private static final int MAX_TRAMITES_POR_TRABAJADOR = 20;
    private static final int DIAS_PROCESAMIENTO = 3;
    private static final Long AREA_SECRETARIA_GENERAL_ID = 1L;
    
    // Crear nuevo trámite (USUARIO y ADMIN pueden crear)
    public TramiteResponse crearTramite(TramiteRequest request, Long usuarioSolicitanteId, String rol) {
        // Verificar que solo usuarios autorizados puedan crear trámites
        if (!"USUARIO".equals(rol) && !"ADMIN".equals(rol)) {
            throw new RuntimeException("Solo los usuarios y administradores pueden crear trámites");
        }
        
        // Generar código único
        String codigo = generarCodigoTramite();
        
        // Crear trámite
        Tramite tramite = new Tramite();
        tramite.setCodigo(codigo);
        tramite.setTitulo(request.getTitulo());
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
        
        // Guardar archivos adjuntos si existen
        if (request.getDocumentosAdjuntos() != null) {
            tramite.setDocumentosAdjuntos(request.getDocumentosAdjuntos());
        }
        
        Tramite saved = tramiteRepository.save(tramite);
        
        // Registrar en historial
        registrarHistorial(saved.getId(), usuarioSolicitanteId, 
                         TramiteHistorial.TipoAccion.CREADO, 
                         null, "ENVIADO", 
                         "Trámite creado y enviado");
        
        // Notificar a trabajadores del área
        notificacionService.notificarNuevoTramite(saved.getId(), AREA_SECRETARIA_GENERAL_ID);
        
        log.info("Trámite {} creado por usuario {}", saved.getCodigo(), usuarioSolicitanteId);
        
        return convertirAResponse(saved);
    }
    
    // Editar trámite (REMITENTE solo si está en BORRADOR/ENVIADO)
    public TramiteResponse editarTramite(Long tramiteId, TramiteRequest request, Long usuarioId, String rol) {
        log.info("=== INICIO EDICIÓN TRÁMITE {} ===", tramiteId);
        log.info("Request completo: {}", request);
        log.info("Campos recibidos - Título: '{}', Descripción: '{}', Tipo: '{}', Prioridad: '{}'", 
                request.getTitulo(), request.getDescripcion(), request.getTipo(), request.getPrioridad());
                
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        log.info("Trámite encontrado: {}", tramite.getCodigo());
        
        // Validaciones de permisos más flexibles
        if ("USUARIO".equals(rol)) {
            if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                throw new RuntimeException("No autorizado para editar este trámite");
            }
            // Los usuarios solo pueden editar en estados iniciales
            if (!Arrays.asList(Tramite.EstadoTramite.BORRADOR, Tramite.EstadoTramite.ENVIADO, Tramite.EstadoTramite.OBSERVADO)
                    .contains(tramite.getEstado())) {
                log.warn("Usuario intentó editar trámite en estado: {}", tramite.getEstado());
                throw new RuntimeException("El trámite ya está en proceso avanzado y no puede ser editado");
            }
        }
        // Los administradores pueden editar en más estados
        else if ("ADMIN".equals(rol)) {
            log.info("Usuario administrador editando trámite en estado: {}", tramite.getEstado());
            // Los admins pueden editar en cualquier estado excepto FINALIZADO, ARCHIVADO, CANCELADO
            if (Arrays.asList(Tramite.EstadoTramite.FINALIZADO, Tramite.EstadoTramite.ARCHIVADO, Tramite.EstadoTramite.CANCELADO)
                    .contains(tramite.getEstado())) {
                log.warn("Admin intentó editar trámite en estado final: {}", tramite.getEstado());
                throw new RuntimeException("No se puede editar un trámite " + tramite.getEstado().toString().toLowerCase());
            }
        }
        
        // Actualizar campos de forma más robusta
        boolean actualizado = false;
        
        // Título
        if (isValidString(request.getTitulo())) {
            log.info("Actualizando título de '{}' a '{}'", tramite.getTitulo(), request.getTitulo());
            tramite.setTitulo(request.getTitulo().trim());
            actualizado = true;
        }
        
        // Descripción
        if (isValidString(request.getDescripcion())) {
            log.info("Actualizando descripción");
            tramite.setDescripcion(request.getDescripcion().trim());
            actualizado = true;
        }
        
        // Tipo de trámite
        if (isValidString(request.getTipo())) {
            log.info("Intentando actualizar tipo de trámite a: '{}'", request.getTipo());
            Tramite.TipoTramite nuevoTipo = parseEnumSafely(request.getTipo(), Tramite.TipoTramite.class);
            if (nuevoTipo != null) {
                log.info("Actualizando tipo de '{}' a '{}'", tramite.getTipo(), nuevoTipo);
                tramite.setTipo(nuevoTipo);
                actualizado = true;
            } else {
                log.warn("Tipo de trámite inválido ignorado: '{}'", request.getTipo());
            }
        }
        
        // Prioridad
        if (isValidString(request.getPrioridad())) {
            log.info("Intentando actualizar prioridad a: '{}'", request.getPrioridad());
            Tramite.PrioridadTramite nuevaPrioridad = parseEnumSafely(request.getPrioridad(), Tramite.PrioridadTramite.class);
            if (nuevaPrioridad != null) {
                log.info("Actualizando prioridad de '{}' a '{}'", tramite.getPrioridad(), nuevaPrioridad);
                tramite.setPrioridad(nuevaPrioridad);
                actualizado = true;
            } else {
                log.warn("Prioridad inválida ignorada: '{}'", request.getPrioridad());
            }
        }
        
        // Observaciones
        if (request.getObservaciones() != null) {
            log.info("Actualizando observaciones");
            tramite.setObservaciones(request.getObservaciones().trim());
            actualizado = true;
        }
        
        // Fecha de vencimiento
        if (request.getFechaVencimiento() != null) {
            log.info("Actualizando fecha de vencimiento a: {}", request.getFechaVencimiento());
            tramite.setFechaVencimiento(request.getFechaVencimiento());
            actualizado = true;
        }
        
        // Documentos adjuntos
        if (isValidString(request.getDocumentosAdjuntos())) {
            log.info("Actualizando documentos adjuntos");
            tramite.setDocumentosAdjuntos(request.getDocumentosAdjuntos().trim());
            actualizado = true;
        }
        
        if (!actualizado) {
            log.warn("No se actualizó ningún campo del trámite {}", tramiteId);
            return convertirAResponse(tramite); // Retornar sin guardar si no hay cambios
        }
        
        log.info("Guardando trámite actualizado...");
        Tramite updated = tramiteRepository.save(tramite);
        
        // Registrar en historial
        registrarHistorial(tramiteId, usuarioId, 
                         TramiteHistorial.TipoAccion.MODIFICADO,
                         null, null, 
                         "Trámite modificado");
        
        log.info("=== FIN EDICIÓN TRÁMITE {} EXITOSA ===", updated.getCodigo());
        
        TramiteResponse response = convertirAResponse(updated);
        log.info("Response enviada al frontend: {}", response);
        
        return response;
    }
    
    // Métodos auxiliares para validación
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
            log.warn("No se pudo parsear enum {} con valor: '{}'", enumClass.getSimpleName(), value);
            return null;
        }
    }
    
    // Recepcionar trámite (TRABAJADOR del área)
    public TramiteResponse recepcionarTramite(Long tramiteId, Long trabajadorId) {
        // Verificar capacidad del trabajador
        if (!puedeAsumirTramite(trabajadorId)) {
            throw new RuntimeException("Ha alcanzado el límite máximo de trámites activos");
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        if (tramite.getEstado() != Tramite.EstadoTramite.ENVIADO) {
            throw new RuntimeException("El trámite no está disponible para recepcionar");
        }
        
        // Asignar trabajador y cambiar estado
        String estadoAnterior = tramite.getEstado().name();
        tramite.setUsuarioAsignadoId(trabajadorId);
        tramite.setEstado(Tramite.EstadoTramite.EN_REVISION);
        tramite.setFechaVencimiento(LocalDateTime.now().plusDays(DIAS_PROCESAMIENTO));
        
        Tramite saved = tramiteRepository.save(tramite);
        
        // Registrar en historial
        registrarHistorial(tramiteId, trabajadorId,
                         TramiteHistorial.TipoAccion.ASIGNADO,
                         estadoAnterior, "EN_REVISION",
                         "Trámite recepcionado");
        
        // Notificar al solicitante
        notificacionService.notificarRecepcionTramite(tramiteId, trabajadorId, 
                                                     tramite.getUsuarioSolicitanteId());
        
        log.info("Trámite {} recepcionado por trabajador {}", tramite.getCodigo(), trabajadorId);
        
        return convertirAResponse(saved);
    }
    
    // Derivar trámite a otro trabajador
    public TramiteResponse derivarTramite(Long tramiteId, Long trabajadorActual, 
                                         Long trabajadorNuevo, String motivo) {
        // Verificar que el nuevo trabajador puede recibir el trámite
        if (!puedeAsumirTramite(trabajadorNuevo)) {
            // Buscar otro trabajador con capacidad
            Long trabajadorAlternativo = buscarTrabajadorConCapacidad();
            if (trabajadorAlternativo == null) {
                throw new RuntimeException("No hay trabajadores disponibles con capacidad");
            }
            trabajadorNuevo = trabajadorAlternativo;
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        // Verificar que el trabajador actual es quien tiene asignado el trámite
        if (!tramite.getUsuarioAsignadoId().equals(trabajadorActual)) {
            throw new RuntimeException("No autorizado para derivar este trámite");
        }
        
        String estadoAnterior = tramite.getEstado().name();
        Long trabajadorAnterior = tramite.getUsuarioAsignadoId();
        
        // Cambiar asignación
        tramite.setUsuarioAsignadoId(trabajadorNuevo);
        tramite.setEstado(Tramite.EstadoTramite.DERIVADO);
        
        Tramite saved = tramiteRepository.save(tramite);
        
        // Registrar en historial
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
        
        log.info("Trámite {} derivado de trabajador {} a {}", 
                tramite.getCodigo(), trabajadorActual, trabajadorNuevo);
        
        return convertirAResponse(saved);
    }
    
    // Cambiar estado del trámite
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
        
        // Si se completa, marcar fecha
        if (estado == Tramite.EstadoTramite.FINALIZADO || 
            estado == Tramite.EstadoTramite.APROBADO) {
            tramite.setFechaCompletado(LocalDateTime.now());
        }
        
        Tramite saved = tramiteRepository.save(tramite);
        
        // Registrar en historial
        registrarHistorial(tramiteId, usuarioId,
                         mapearAccionPorEstado(estado),
                         estadoAnterior, nuevoEstado,
                         observaciones);
        
        // Notificar cambio de estado
        notificacionService.notificarCambioEstadoAutomatico(tramiteId, estadoAnterior, nuevoEstado);
        
        log.info("Estado del trámite {} cambiado de {} a {}", 
                tramite.getCodigo(), estadoAnterior, nuevoEstado);
        
        return convertirAResponse(saved);
    }
    
    // Finalizar trámite con archivo de respuesta
    public TramiteResponse finalizarConArchivo(Long tramiteId, String urlArchivo, Long usuarioId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        String estadoAnterior = tramite.getEstado().name();
        tramite.setEstado(Tramite.EstadoTramite.FINALIZADO);
        tramite.setFechaCompletado(LocalDateTime.now());
        
        // Agregar archivo a documentos adjuntos
        String documentosActuales = tramite.getDocumentosAdjuntos();
        if (documentosActuales != null) {
            // Agregar el nuevo archivo al JSON existente
            tramite.setDocumentosAdjuntos(documentosActuales + "," + urlArchivo);
        } else {
            tramite.setDocumentosAdjuntos(urlArchivo);
        }
        
        Tramite saved = tramiteRepository.save(tramite);
        
        // Registrar en historial
        registrarHistorial(tramiteId, usuarioId,
                         TramiteHistorial.TipoAccion.FINALIZADO,
                         estadoAnterior, "FINALIZADO",
                         "Trámite finalizado con archivo de respuesta");
        
        // Notificar con archivo
        notificacionService.notificarFinalizacionConArchivo(tramiteId, urlArchivo);
        
        log.info("Trámite {} finalizado con archivo de respuesta", tramite.getCodigo());
        
        return convertirAResponse(saved);
    }
    
    // Eliminar trámite (solo ADMIN)
    public void eliminarTramite(Long tramiteId, Long usuarioId, String rol) {
        if (!"ADMIN".equals(rol)) {
            throw new RuntimeException("Solo el administrador puede eliminar trámites");
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        tramiteRepository.deleteById(tramiteId);
        
        log.info("Trámite {} eliminado por admin {}", tramite.getCodigo(), usuarioId);
    }
    
    // Búsqueda en tiempo real
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarTramites(String texto, Pageable pageable) {
        Page<Tramite> tramites = tramiteRepository
            .findByTituloOrDescripcionContaining(texto, pageable);
        
        return tramites.map(this::convertirAResponse);
    }
    
    // Obtener trámites del usuario
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerMisTramites(Long usuarioId, String rol, Pageable pageable) {
        Page<Tramite> tramites;
        
        // Crear un Pageable optimizado que solo use paginación sin ordenamiento
        // para evitar problemas de memoria con archivos base64 grandes
        org.springframework.data.domain.PageRequest pageableOptimizado = 
            org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        
        if ("USUARIO".equals(rol)) {
            // Usuario ve solo sus trámites creados - usar consulta optimizada por ID
            tramites = tramiteRepository.findByUsuarioSolicitanteIdOrderById(usuarioId, pageableOptimizado);
        } else if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            // Usar consulta optimizada que ordena por ID en lugar de fecha
            tramites = tramiteRepository.findAllOrderById(pageableOptimizado);
        } else {
            // Cualquier otro rol ve trámites ordenados por ID
            tramites = tramiteRepository.findAllOrderById(pageableOptimizado);
        }
        
        return tramites.map(this::convertirAResponse);
    }
    
    // Método específico para la bandeja que excluye archivados por defecto
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerTramitesBandeja(Long usuarioId, String rol, Pageable pageable, String estado, String prioridad, String tipo) {
        Page<Tramite> tramites;
        
        // Crear un Pageable optimizado que solo use paginación sin ordenamiento
        // para evitar problemas de memoria con archivos base64 grandes
        org.springframework.data.domain.PageRequest pageableOptimizado = 
            org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        
        if ("USUARIO".equals(rol)) {
            // Usuario ve solo sus trámites creados, excluyendo archivados por defecto
            if (estado == null) {
                // Excluir archivados por defecto
                tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoNotOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else if ("ARCHIVADO".equals(estado)) {
                // Mostrar solo archivados si se solicita explícitamente
                tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else {
                // Filtrar por estado específico
                Tramite.EstadoTramite estadoEnum;
                try {
                    estadoEnum = Tramite.EstadoTramite.valueOf(estado);
                    tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoOrderById(usuarioId, estadoEnum, pageableOptimizado);
                } catch (IllegalArgumentException e) {
                    // Si el estado no es válido, excluir archivados
                    tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoNotOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
                }
            }
        } else {
            // Administrativos ven todos los trámites, excluyendo archivados por defecto
            if (estado == null) {
                // Excluir archivados por defecto
                tramites = tramiteRepository.findByEstadoNotOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else if ("ARCHIVADO".equals(estado)) {
                // Mostrar solo archivados si se solicita explícitamente
                tramites = tramiteRepository.findByEstadoOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else {
                // Filtrar por estado específico
                Tramite.EstadoTramite estadoEnum;
                try {
                    estadoEnum = Tramite.EstadoTramite.valueOf(estado);
                    tramites = tramiteRepository.findByEstadoOrderByIdDesc(estadoEnum, pageableOptimizado);
                } catch (IllegalArgumentException e) {
                    // Si el estado no es válido, excluir archivados
                    tramites = tramiteRepository.findByEstadoNotOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
                }
            }
        }
        
        return tramites.map(this::convertirAResponse);
    }
    
    // Métodos públicos (sin autenticación)
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarPorCodigo(String codigo, Pageable pageable) {
        return tramiteRepository.findByCodigoContaining(codigo, pageable)
            .map(this::convertirAResponse);
    }
    
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerTramitesPublicos(Pageable pageable) {
        // Solo trámites en estados públicos
        return tramiteRepository.findByEstado(Tramite.EstadoTramite.FINALIZADO, pageable)
            .map(this::convertirAResponse);
    }
    
    @Transactional(readOnly = true)
    public TramiteResponse obtenerTramitePublico(String codigo) {
        return tramiteRepository.findByCodigo(codigo)
            .map(this::convertirAResponse)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
    }
    
    // Métodos de archivos
    public String guardarArchivoRespuesta(org.springframework.web.multipart.MultipartFile archivo) {
        try {
            // Convertir archivo a base64
            byte[] bytes = archivo.getBytes();
            String base64Content = java.util.Base64.getEncoder().encodeToString(bytes);
            
            // Crear objeto JSON con metadata del archivo
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
        // Verificar que el trámite existe y está finalizado
        tramiteRepository.findByCodigo(codigo)
            .filter(t -> t.getEstado() == Tramite.EstadoTramite.FINALIZADO)
            .orElseThrow(() -> new RuntimeException("Archivo no disponible"));
        
        // Implementar descarga de archivo
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
        
        // Verificar permisos
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
        // Convertir strings a enums si no son nulos
        Tramite.EstadoTramite estadoEnum = estado != null ? Tramite.EstadoTramite.valueOf(estado) : null;
        Tramite.TipoTramite tipoEnum = tipo != null ? Tramite.TipoTramite.valueOf(tipo) : null;
        Tramite.PrioridadTramite prioridadEnum = prioridad != null ? Tramite.PrioridadTramite.valueOf(prioridad) : null;
        
        // Filtros según el rol
        Long solicitanteId = "USUARIO".equals(rol) ? usuarioId : null;
        Long asignadoId = "ADMINISTRATIVO".equals(rol) ? usuarioId : null;
        
        return tramiteRepository.findWithFilters(
            solicitanteId, asignadoId, null, estadoEnum, tipoEnum, prioridadEnum, pageable
        ).map(this::convertirAResponse);
    }
    
    public java.util.List<String> subirArchivosMultiples(Long tramiteId, java.util.List<org.springframework.web.multipart.MultipartFile> archivos, Long usuarioId) {
        log.info("Iniciando subida de {} archivos para trámite ID: {}", archivos.size(), tramiteId);
        
        // Verificar que el trámite existe y el usuario tiene permisos
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        log.info("Trámite encontrado: {} - Estado actual documentos: {}", tramite.getCodigo(), 
            tramite.getDocumentosAdjuntos() != null ? "Existe" : "NULL");
        
        java.util.List<String> archivosBase64 = new java.util.ArrayList<>();
        
        for (org.springframework.web.multipart.MultipartFile archivo : archivos) {
            // Validar tamaño y tipo
            if (archivo.getSize() > 50 * 1024 * 1024) { // 50MB límite por archivo
                throw new RuntimeException("Archivo " + archivo.getOriginalFilename() + " excede el límite de 50MB");
            }
            
            // Convertir archivo a base64 y crear JSON
            String archivoJson = guardarArchivoRespuesta(archivo);
            archivosBase64.add(archivoJson);
        }
        
        // Actualizar documentos adjuntos del trámite en la base de datos
        String documentosActuales = tramite.getDocumentosAdjuntos();
        String nuevosDocumentos;
        
        if (documentosActuales != null && !documentosActuales.trim().isEmpty()) {
            // Si ya hay documentos, agregar los nuevos
            if (documentosActuales.startsWith("[") && documentosActuales.endsWith("]")) {
                // Es un array JSON válido, insertar antes del corchete de cierre
                nuevosDocumentos = documentosActuales.substring(0, documentosActuales.length() - 1) 
                    + "," + String.join(",", archivosBase64) + "]";
            } else {
                // Formato legacy, convertir a array
                nuevosDocumentos = "[" + documentosActuales + "," + String.join(",", archivosBase64) + "]";
            }
        } else {
            // Crear nuevo JSON array
            nuevosDocumentos = "[" + String.join(",", archivosBase64) + "]";
        }
        
        log.info("Estableciendo documentos en trámite: {} caracteres", nuevosDocumentos.length());
        tramite.setDocumentosAdjuntos(nuevosDocumentos);
        tramiteRepository.save(tramite);
        
        log.info("Guardados {} archivos en base64 para trámite {}", archivos.size(), tramite.getCodigo());
        
        return archivosBase64;
    }
    
    public org.springframework.http.ResponseEntity<byte[]> descargarArchivo(Long tramiteId, String nombreArchivo, Long usuarioId, String rol) {
        // Verificar permisos
        obtenerTramite(tramiteId, usuarioId, rol);
        
        // Implementar descarga
        byte[] archivo = new byte[0]; // Placeholder
        return org.springframework.http.ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
            .body(archivo);
    }
    
    public org.springframework.http.ResponseEntity<byte[]> descargarTodosDocumentos(Long tramiteId, Long usuarioId, String rol) {
        // Verificar permisos y obtener el trámite
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        // Verificar permisos según el rol
        if ("USUARIO".equals(rol) && !tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para acceder a este trámite");
        }
        
        String documentosJson = tramite.getDocumentosAdjuntos();
        if (documentosJson == null || documentosJson.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }
        
        try {
            // Crear un ZIP con todos los documentos
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.util.zip.ZipOutputStream zos = new java.util.zip.ZipOutputStream(baos);
            
            // Parsear el JSON que contiene múltiples documentos
            if (documentosJson.startsWith("[")) {
                // Array de documentos
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>> typeRef = 
                    new com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>>() {};
                java.util.List<java.util.Map<String, Object>> documentos = mapper.readValue(documentosJson, typeRef);
                
                for (java.util.Map<String, Object> doc : documentos) {
                    String nombre = (String) doc.get("nombre");
                    String contenidoBase64 = (String) doc.get("contenido");
                    
                    if (nombre != null && contenidoBase64 != null) {
                        byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                        
                        // Hashear el contenido del archivo antes de agregarlo al ZIP
                        String hash = calcularHashArchivo(contenido);
                        
                        // Crear entrada en el ZIP
                        java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                        zos.putNextEntry(entry);
                        zos.write(contenido);
                        zos.closeEntry();
                        
                        // Agregar archivo de hash junto al documento
                        String nombreHash = nombre + ".hash";
                        java.util.zip.ZipEntry hashEntry = new java.util.zip.ZipEntry(nombreHash);
                        zos.putNextEntry(hashEntry);
                        zos.write(hash.getBytes("UTF-8"));
                        zos.closeEntry();
                    }
                }
            } else if (documentosJson.startsWith("{")) {
                // Un solo documento como objeto
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                java.util.Map<String, Object> doc = mapper.readValue(documentosJson, java.util.Map.class);
                String nombre = (String) doc.get("nombre");
                String contenidoBase64 = (String) doc.get("contenido");
                
                if (nombre != null && contenidoBase64 != null) {
                    byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                    
                    // Hashear el contenido del archivo antes de agregarlo al ZIP
                    String hash = calcularHashArchivo(contenido);
                    
                    // Crear entrada en el ZIP
                    java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                    zos.putNextEntry(entry);
                    zos.write(contenido);
                    zos.closeEntry();
                    
                    // Agregar archivo de hash junto al documento
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
        // Buscar trámite por código sin verificar permisos (acceso público)
        Tramite tramite = tramiteRepository.findByCodigo(codigo)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado con código: " + codigo));
        
        String documentosJson = tramite.getDocumentosAdjuntos();
        if (documentosJson == null || documentosJson.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }
        
        try {
            // Crear un ZIP con todos los documentos
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.util.zip.ZipOutputStream zos = new java.util.zip.ZipOutputStream(baos);
            
            // Parsear el JSON que contiene múltiples documentos
            if (documentosJson.startsWith("[")) {
                // Array de documentos
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>> typeRef = 
                    new com.fasterxml.jackson.core.type.TypeReference<java.util.List<java.util.Map<String, Object>>>() {};
                java.util.List<java.util.Map<String, Object>> documentos = mapper.readValue(documentosJson, typeRef);
                
                for (java.util.Map<String, Object> doc : documentos) {
                    String nombre = (String) doc.get("nombre");
                    String contenidoBase64 = (String) doc.get("contenido");
                    
                    if (nombre != null && contenidoBase64 != null) {
                        byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                        
                        // Hashear el contenido del archivo antes de agregarlo al ZIP
                        String hash = calcularHashArchivo(contenido);
                        
                        // Crear entrada en el ZIP
                        java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                        zos.putNextEntry(entry);
                        zos.write(contenido);
                        zos.closeEntry();
                        
                        // Agregar archivo de hash junto al documento
                        String nombreHash = nombre + ".hash";
                        java.util.zip.ZipEntry hashEntry = new java.util.zip.ZipEntry(nombreHash);
                        zos.putNextEntry(hashEntry);
                        zos.write(hash.getBytes("UTF-8"));
                        zos.closeEntry();
                    }
                }
            } else if (documentosJson.startsWith("{")) {
                // Un solo documento como objeto
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                java.util.Map<String, Object> doc = mapper.readValue(documentosJson, java.util.Map.class);
                String nombre = (String) doc.get("nombre");
                String contenidoBase64 = (String) doc.get("contenido");
                
                if (nombre != null && contenidoBase64 != null) {
                    byte[] contenido = java.util.Base64.getDecoder().decode(contenidoBase64);
                    
                    // Hashear el contenido del archivo antes de agregarlo al ZIP
                    String hash = calcularHashArchivo(contenido);
                    
                    // Crear entrada en el ZIP
                    java.util.zip.ZipEntry entry = new java.util.zip.ZipEntry(nombre);
                    zos.putNextEntry(entry);
                    zos.write(contenido);
                    zos.closeEntry();
                    
                    // Agregar archivo de hash junto al documento
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
            // Estadísticas para usuario remitente - solo sus trámites
            estadisticas.put("total", tramiteRepository.countByUsuarioSolicitanteId(usuarioId));
            
            // Contar por estado para sus trámites
            for (Tramite.EstadoTramite estado : Tramite.EstadoTramite.values()) {
                Long count = tramiteRepository.countByUsuarioSolicitanteIdAndEstado(usuarioId, estado);
                estadisticas.put("estado_" + estado.name(), count);
            }
            
            // Contar por tipo para sus trámites
            for (Tramite.TipoTramite tipo : Tramite.TipoTramite.values()) {
                Long count = tramiteRepository.countByUsuarioSolicitanteIdAndTipo(usuarioId, tipo);
                estadisticas.put("tipo_" + tipo.name(), count);
            }
            
        } else if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            // Administrativo y Admin ven estadísticas generales de todos los trámites
            return obtenerEstadisticas();
        } else {
            // Cualquier otro rol ve estadísticas generales
            return obtenerEstadisticas();
        }
        
        return estadisticas;
    }
    
    // Proceso automático: cambiar estados según tiempo
    @Scheduled(cron = "0 0 */1 * * *") // Cada hora
    public void actualizarEstadosAutomaticos() {
        LocalDateTime ahora = LocalDateTime.now();
        
        // Cambiar de EN_REVISION a EN_PROCESO después de 1 día
        List<Tramite> enRevision = tramiteRepository.findByEstado(
            Tramite.EstadoTramite.EN_REVISION, 
            Pageable.unpaged()
        ).getContent();
        
        for (Tramite tramite : enRevision) {
            if (tramite.getFechaActualizacion().plusDays(1).isBefore(ahora)) {
                tramite.setEstado(Tramite.EstadoTramite.EN_PROCESO);
                tramiteRepository.save(tramite);
                
                // Notificar cambio automático
                notificacionService.notificarCambioEstadoAutomatico(
                    tramite.getId(), "EN_REVISION", "EN_PROCESO"
                );
                
                log.info("Trámite {} cambió automáticamente a EN_PROCESO", tramite.getCodigo());
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
            log.warn("Trámite {} ha vencido", tramite.getCodigo());
            // Notificar vencimiento
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
            
            // Verify this code doesn't already exist
            if (!tramiteRepository.findByCodigo(codigo).isPresent()) {
                log.info("Código generado exitosamente: {} (intento {})", codigo, retry + 1);
                return codigo;
            } else {
                log.warn("Código duplicado detectado: {} (intento {})", codigo, retry + 1);
                // Small delay before retry
                try {
                    Thread.sleep(10 + (retry * 10)); // 10ms, 20ms, 30ms, etc.
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Error generando código de trámite", e);
                }
            }
        }
        
        // If all retries failed, generate a random suffix
        String codigo = String.format("TRM-%s-%04d-%d", anio, 
            tramiteRepository.getNextCodigoNumber(anio), 
            System.currentTimeMillis() % 1000);
        log.warn("Generando código con sufijo aleatorio después de {} intentos: {}", maxRetries, codigo);
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
        log.info("=== CONVERTING TRAMITE TO RESPONSE: {} ===", tramite.getCodigo());
        log.info("Tramite datos - Titulo: '{}', Descripcion: '{}', Estado: '{}'", tramite.getTitulo(), tramite.getDescripcion(), tramite.getEstado());
        
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
            
        // Mapear usuario solicitante usando ID
        if (tramite.getUsuarioSolicitanteId() != null) {
            log.info("Buscando usuario solicitante con ID: {}", tramite.getUsuarioSolicitanteId());
            Optional<UsuarioResponse> usuarioOpt = usuarioService.getUsuarioById(tramite.getUsuarioSolicitanteId());
            if (usuarioOpt.isPresent()) {
                var usuario = usuarioOpt.get();
                log.info("Usuario solicitante encontrado: {} {}", usuario.getNombre(), usuario.getApellidos());
                builder.usuarioSolicitante(TramiteResponse.UsuarioBasicInfo.builder()
                    .id(usuario.getId())
                    .nombre(usuario.getNombre())
                    .apellidos(usuario.getApellidos())
                    .correo(usuario.getCorreo())
                    .rol(usuario.getRole() != null ? usuario.getRole().getName() : null)
                    .build());
            } else {
                log.warn("Usuario solicitante NO ENCONTRADO con ID: {} - Proporcionando datos por defecto", tramite.getUsuarioSolicitanteId());
                // Proporcionar datos por defecto para evitar errores en el frontend
                builder.usuarioSolicitante(TramiteResponse.UsuarioBasicInfo.builder()
                    .id(tramite.getUsuarioSolicitanteId())
                    .nombre("Usuario no encontrado")
                    .apellidos("")
                    .correo("usuario@noejemplo.com")
                    .rol("USUARIO")
                    .build());
            }
        } else {
            log.warn("Usuario solicitante ID es NULL para trámite: {}", tramite.getCodigo());
            // Proporcionar datos por defecto
            builder.usuarioSolicitante(TramiteResponse.UsuarioBasicInfo.builder()
                .id(0L)
                .nombre("Usuario no disponible") 
                .apellidos("")
                .correo("usuario@noejemplo.com")
                .rol("USUARIO")
                .build());
        }
        
        // Mapear usuario asignado usando ID
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
        
        // Mapear área actual usando ID
        if (tramite.getAreaActualId() != null) {
            log.info("Buscando área actual con ID: {}", tramite.getAreaActualId());
            Optional<AreaResponse> areaOpt = areaService.getAreaById(tramite.getAreaActualId());
            if (areaOpt.isPresent()) {
                var area = areaOpt.get();
                log.info("Área actual encontrada: {}", area.getNombre());
                builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                    .id(area.getId())
                    .nombre(area.getNombre())
                    .descripcion(area.getDescripcion())
                    .build());
            } else {
                log.warn("Área actual NO ENCONTRADA con ID: {} - Proporcionando datos por defecto", tramite.getAreaActualId());
                // Proporcionar datos por defecto
                builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                    .id(tramite.getAreaActualId())
                    .nombre("Área no encontrada")
                    .descripcion("Área no disponible")
                    .build());
            }
        } else {
            log.warn("Área actual ID es NULL para trámite: {}", tramite.getCodigo());
            // Proporcionar datos por defecto
            builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                .id(0L)
                .nombre("Área no disponible")
                .descripcion("Área no disponible")
                .build());
        }
        
        // Mapear área origen usando ID
        if (tramite.getAreaOrigenId() != null) {
            areaService.getAreaById(tramite.getAreaOrigenId()).ifPresent(area -> 
                builder.areaOrigen(TramiteResponse.AreaBasicInfo.builder()
                    .id(area.getId())
                    .nombre(area.getNombre())
                    .descripcion(area.getDescripcion())
                    .build()));
        }
        
        // Mapear información de respuesta
        if (tramite.getRespuesta() != null) {
            builder.respuesta(tramite.getRespuesta());
        }
        if (tramite.getFechaRespuesta() != null) {
            builder.fechaRespuesta(tramite.getFechaRespuesta());
        }
        
        // Mapear usuario que respondió
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
        
        return builder.build();
    }
    
    // Responder trámite con notificación obligatoria
    public com.example.demo.dto.ResponderTramiteResponse responderTramite(Long tramiteId, com.example.demo.dto.ResponderTramiteRequest request, Long administrativoId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        // Verificar estado válido
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
        
        // Actualizar contadores
        // Incrementar contador de procesados
        if (tramite.getContadorProcesados() == null) {
            tramite.setContadorProcesados(0);
        }
        tramite.setContadorProcesados(tramite.getContadorProcesados() + 1);
        
        // Decrementar contador "Por Procesar" ya que se está respondiendo
        if (tramite.getContadorPorProcesar() != null && tramite.getContadorPorProcesar() > 0) {
            tramite.setContadorPorProcesar(tramite.getContadorPorProcesar() - 1);
        }
        
        // Manejar archivos de respuesta
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
        
        // Registrar en historial
        registrarHistorial(tramiteId, administrativoId,
                         TramiteHistorial.TipoAccion.RESPONDIDO,
                         estadoAnterior, "FINALIZADO",
                         "Trámite respondido y finalizado");
        
        // Obtener información del responsable
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
        
        // NOTIFICACIÓN OBLIGATORIA POR EMAIL
        boolean emailEnviado = notificacionService.notificarRespuestaTramite(
            tramiteId, 
            tramite.getUsuarioSolicitanteId(),
            administrativoId,
            request.getRespuesta(),
            request.getAsunto() != null ? request.getAsunto() : "Respuesta a su trámite " + tramite.getCodigo()
        );
        
        log.info("Trámite {} respondido por administrativo {}", tramite.getCodigo(), administrativoId);
        
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
    
    // Aprobar trámite (solo ADMINISTRATIVO)
    public com.example.demo.dto.AprobarTramiteResponse aprobarTramite(Long tramiteId, com.example.demo.dto.AprobarTramiteRequest request, Long administrativoId) {
        // Verificar que el trámite existe
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        // Verificar que el estado actual permite la aprobación
        if (!tramite.getEstado().equals(Tramite.EstadoTramite.ENVIADO) && 
            !tramite.getEstado().equals(Tramite.EstadoTramite.EN_REVISION)) {
            throw new RuntimeException("El trámite no se puede aprobar en su estado actual: " + tramite.getEstado());
        }
        
        // Cambiar estado a APROBADO
        Tramite.EstadoTramite estadoAnterior = tramite.getEstado();
        tramite.setEstado(Tramite.EstadoTramite.APROBADO);
        tramite.setFechaActualizacion(LocalDateTime.now());
        
        // Incrementar contador "Por Procesar" cuando se aprueba (indica que necesita ser respondido)
        tramite.setContadorPorProcesar((tramite.getContadorPorProcesar() != null ? tramite.getContadorPorProcesar() : 0) + 1);
        
        // Asignar trabajador si no tiene uno
        if (tramite.getUsuarioAsignadoId() == null) {
            // Asignar al administrativo que aprueba
            tramite.setUsuarioAsignadoId(administrativoId);
        }
        
        // Guardar cambios
        tramite = tramiteRepository.save(tramite);
        
        // Crear registro en historial
        TramiteHistorial historial = new TramiteHistorial();
        historial.setTramiteId(tramite.getId());
        historial.setEstadoAnterior(estadoAnterior.toString());
        historial.setEstadoNuevo(Tramite.EstadoTramite.APROBADO.toString());
        historial.setUsuarioId(administrativoId);
        historial.setFechaAccion(LocalDateTime.now());
        historial.setAccion(TramiteHistorial.TipoAccion.APROBADO);
        historial.setObservaciones(request.getObservaciones());
        historialRepository.save(historial);
        
        // Crear respuesta con información del responsable
        com.example.demo.dto.AprobarTramiteResponse response = new com.example.demo.dto.AprobarTramiteResponse();
        response.setSuccess(true);
        response.setMensaje("Trámite aprobado exitosamente");
        
        // Información del responsable asignado
        com.example.demo.dto.AprobarTramiteResponse.ResponsableAsignado responsableAsignado = 
            new com.example.demo.dto.AprobarTramiteResponse.ResponsableAsignado();
        
        // Por ahora usar valores por defecto, luego se puede mejorar
        responsableAsignado.setId(administrativoId);
        responsableAsignado.setNombre("Administrativo");
        responsableAsignado.setApellidos("Asignado");
        responsableAsignado.setArea("Secretaría General");
        
        response.setResponsableAsignado(responsableAsignado);
        response.setTramiteActualizado(convertirAResponse(tramite));
        
       
        
        
        return response;
    }
    
    // Método para actualizar contadores de trámites existentes
    @org.springframework.transaction.annotation.Transactional
    public void actualizarContadoresTramitesExistentes() {
        // Usar query nativa para obtener trámites por estado sin paginación
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
            // Si tiene respuesta pero no tiene contador de procesados, actualizar
            if (tramite.getRespuesta() != null && !tramite.getRespuesta().isEmpty()) {
                if (tramite.getContadorProcesados() == null || tramite.getContadorProcesados() == 0) {
                    tramite.setContadorProcesados(1);
                    tramite.setContadorPorProcesar(0); // Ya fue procesado
                    tramiteRepository.save(tramite);
                }
            }
        }
    }
    
    // Cambiar estado de trámite (para archivado y otras operaciones)
    public void cambiarEstadoTramite(Long tramiteId, String nuevoEstado, String observaciones, Long usuarioId, String rol) {
        Optional<Tramite> tramiteOpt = tramiteRepository.findById(tramiteId);
        if (!tramiteOpt.isPresent()) {
            throw new RuntimeException("Trámite no encontrado con ID: " + tramiteId);
        }
        
        Tramite tramite = tramiteOpt.get();
        
        // Validaciones de permisos
        if ("USUARIO".equals(rol)) {
            // Los usuarios solo pueden hacer ciertas operaciones en sus propios trámites
            if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                throw new RuntimeException("No tiene permisos para modificar este trámite");
            }
        }
        
        try {
            // Cambiar estado
            Tramite.EstadoTramite estadoEnum = Tramite.EstadoTramite.valueOf(nuevoEstado);
            tramite.setEstado(estadoEnum);
            tramite.setFechaActualizacion(LocalDateTime.now());
            
            // Agregar observaciones si se proporcionan
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
    
    // Exportar trámites a PDF
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
            
            // Generar PDF simple (texto plano por ahora, se puede mejorar con librerías como iText)
            return generarPdfSimple(tramites);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF: " + e.getMessage());
        }
    }
    
    private byte[] generarPdfSimple(java.util.List<Tramite> tramites) {
        StringBuilder contenido = new StringBuilder();
        contenido.append("EXPORTACIÓN DE TRÁMITES\n");
        contenido.append("Fecha de generación: ").append(LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))).append("\n");
        contenido.append("Total de trámites: ").append(tramites.size()).append("\n\n");
        contenido.append("=".repeat(80)).append("\n\n");
        
        for (int i = 0; i < tramites.size(); i++) {
            Tramite tramite = tramites.get(i);
            contenido.append("TRÁMITE ").append(i + 1).append("\n");
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
            // Note: We need to get the user details separately since we only have the ID
            // For now, we'll just use the ID
            contenido.append("Solicitante ID: ").append(tramite.getUsuarioSolicitanteId()).append("\n");
            contenido.append("Descripción: ").append(tramite.getDescripcion() != null ? tramite.getDescripcion() : "N/A").append("\n");
            
            if (tramite.getObservaciones() != null && !tramite.getObservaciones().trim().isEmpty()) {
                contenido.append("Observaciones: ").append(tramite.getObservaciones()).append("\n");
            }
            
            contenido.append("\n");
        }
        
        // Convertir a bytes (en un caso real usarías una librería como iText para PDF real)
        return contenido.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
    }
}