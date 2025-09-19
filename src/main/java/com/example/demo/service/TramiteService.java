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
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.dto.TramiteConArchivosRequest;
import com.example.demo.dto.ActualizarTramiteConArchivosRequest;
import com.example.demo.dto.DocumentoBase64Request;
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
    private final EmailService emailService;
    
    private static final int MAX_TRAMITES_POR_TRABAJADOR = 20;
    private static final int DIAS_PROCESAMIENTO = 3;
    private static final Long AREA_SECRETARIA_GENERAL_ID = 1L;
    
    // Crear nuevo trC!mite (USUARIO y ADMIN pueden crear)
    public TramiteResponse crearTramite(TramiteRequest request, Long usuarioSolicitanteId, String rol) {
        // Verificar que solo usuarios autorizados puedan crear trC!mites
        if (!"USUARIO".equals(rol) && !"ADMIN".equals(rol)) {
            throw new RuntimeException("Solo los usuarios y administradores pueden crear trC!mites");
        }
        
        // Generar cC3digo C:nico
        String codigo = generarCodigoTramite();
        
        // Crear trC!mite
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
                         "TrC!mite creado y enviado");
        
        // Notificar a trabajadores del C!rea
        notificacionService.notificarNuevoTramite(saved.getId(), AREA_SECRETARIA_GENERAL_ID);
        
        log.info("TrC!mite {} creado por usuario {}", saved.getCodigo(), usuarioSolicitanteId);
        
        return convertirAResponse(saved);
    }
    
    // Editar trC!mite (REMITENTE solo si estC! en BORRADOR/ENVIADO)
    public TramiteResponse editarTramite(Long tramiteId, TramiteRequest request, Long usuarioId, String rol) {
        log.info("=== INICIO EDICICN TRCMITE {} ===", tramiteId);
        log.info("Request completo: {}", request);
        log.info("Campos recibidos - TC-tulo: '{}', DescripciC3n: '{}', Tipo: '{}', Prioridad: '{}'", 
                request.getTitulo(), request.getDescripcion(), request.getTipo(), request.getPrioridad());
                
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
        log.info("TrC!mite encontrado: {}", tramite.getCodigo());
        
        // Validaciones de permisos mC!s flexibles
        if ("USUARIO".equals(rol)) {
            if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                throw new RuntimeException("No autorizado para editar este trC!mite");
            }
            // Los usuarios solo pueden editar en estados iniciales
            if (!Arrays.asList(Tramite.EstadoTramite.BORRADOR, Tramite.EstadoTramite.ENVIADO, Tramite.EstadoTramite.OBSERVADO)
                    .contains(tramite.getEstado())) {
                log.warn("Usuario intentC3 editar trC!mite en estado: {}", tramite.getEstado());
                throw new RuntimeException("El trC!mite ya estC! en proceso avanzado y no puede ser editado");
            }
        }
        // Los administradores pueden editar en mC!s estados
        else if ("ADMIN".equals(rol)) {
            log.info("Usuario administrador editando trC!mite en estado: {}", tramite.getEstado());
            // Los admins pueden editar en cualquier estado excepto FINALIZADO, ARCHIVADO, CANCELADO
            if (Arrays.asList(Tramite.EstadoTramite.FINALIZADO, Tramite.EstadoTramite.ARCHIVADO, Tramite.EstadoTramite.CANCELADO)
                    .contains(tramite.getEstado())) {
                log.warn("Admin intentC3 editar trC!mite en estado final: {}", tramite.getEstado());
                throw new RuntimeException("No se puede editar un trC!mite " + tramite.getEstado().toString().toLowerCase());
            }
        }
        
        // Actualizar campos de forma mC!s robusta
        boolean actualizado = false;
        
        // TC-tulo
        if (isValidString(request.getTitulo())) {
            log.info("Actualizando tC-tulo de '{}' a '{}'", tramite.getTitulo(), request.getTitulo());
            tramite.setTitulo(request.getTitulo().trim());
            actualizado = true;
        }
        
        // DescripciC3n
        if (isValidString(request.getDescripcion())) {
            log.info("Actualizando descripciC3n");
            tramite.setDescripcion(request.getDescripcion().trim());
            actualizado = true;
        }
        
        // Tipo de trC!mite
        if (isValidString(request.getTipo())) {
            log.info("Intentando actualizar tipo de trC!mite a: '{}'", request.getTipo());
            Tramite.TipoTramite nuevoTipo = parseEnumSafely(request.getTipo(), Tramite.TipoTramite.class);
            if (nuevoTipo != null) {
                log.info("Actualizando tipo de '{}' a '{}'", tramite.getTipo(), nuevoTipo);
                tramite.setTipo(nuevoTipo);
                actualizado = true;
            } else {
                log.warn("Tipo de trC!mite invC!lido ignorado: '{}'", request.getTipo());
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
                log.warn("Prioridad invC!lida ignorada: '{}'", request.getPrioridad());
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
            log.warn("No se actualizC3 ningC:n campo del trC!mite {}", tramiteId);
            return convertirAResponse(tramite); // Retornar sin guardar si no hay cambios
        }
        
        log.info("Guardando trC!mite actualizado...");
        Tramite updated = tramiteRepository.save(tramite);
        
        // Registrar en historial
        registrarHistorial(tramiteId, usuarioId, 
                         TramiteHistorial.TipoAccion.MODIFICADO,
                         null, null, 
                         "TrC!mite modificado");
        
        log.info("=== FIN EDICICN TRCMITE {} EXITOSA ===", updated.getCodigo());
        
        TramiteResponse response = convertirAResponse(updated);
        log.info("Response enviada al frontend: {}", response);
        
        return response;
    }
    
    // MC)todos auxiliares para validaciC3n
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
    
    // Recepcionar trC!mite (TRABAJADOR del C!rea)
    public TramiteResponse recepcionarTramite(Long tramiteId, Long trabajadorId) {
        // Verificar capacidad del trabajador
        if (!puedeAsumirTramite(trabajadorId)) {
            throw new RuntimeException("Ha alcanzado el lC-mite mC!ximo de trC!mites activos");
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
        if (tramite.getEstado() != Tramite.EstadoTramite.ENVIADO) {
            throw new RuntimeException("El trC!mite no estC! disponible para recepcionar");
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
                         "TrC!mite recepcionado");
        
        // Notificar al solicitante
        notificacionService.notificarRecepcionTramite(tramiteId, trabajadorId, 
                                                     tramite.getUsuarioSolicitanteId());
        
        log.info("TrC!mite {} recepcionado por trabajador {}", tramite.getCodigo(), trabajadorId);
        
        return convertirAResponse(saved);
    }
    
    // Derivar trC!mite a otro trabajador
    public TramiteResponse derivarTramite(Long tramiteId, Long trabajadorActual, 
                                         Long trabajadorNuevo, String motivo) {
        // Verificar que el nuevo trabajador puede recibir el trC!mite
        if (!puedeAsumirTramite(trabajadorNuevo)) {
            // Buscar otro trabajador con capacidad
            Long trabajadorAlternativo = buscarTrabajadorConCapacidad();
            if (trabajadorAlternativo == null) {
                throw new RuntimeException("No hay trabajadores disponibles con capacidad");
            }
            trabajadorNuevo = trabajadorAlternativo;
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));

        // Verificar que el trabajador actual es quien tiene asignado el trC!mite
        // o que el trC!mite no tiene asignado (cualquier administrativo puede tomarlo)
        Long usuarioAsignado = tramite.getUsuarioAsignadoId();
        if (usuarioAsignado != null && !usuarioAsignado.equals(trabajadorActual)) {
            throw new RuntimeException("No autorizado para derivar este trC!mite - estC! asignado a otro trabajador");
        }
        
        String estadoAnterior = tramite.getEstado().name();
        Long trabajadorAnterior = tramite.getUsuarioAsignadoId();
        
        // Cambiar asignaciC3n
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
        historial.setObservaciones("TrC!mite derivado: " + motivo);
        historialRepository.save(historial);
        
        // Notificaciones
        notificacionService.notificarDerivacionTramite(tramiteId, trabajadorActual, 
                                                      trabajadorNuevo, motivo);
        
        log.info("TrC!mite {} derivado de trabajador {} a {}", 
                tramite.getCodigo(), trabajadorActual, trabajadorNuevo);
        
        return convertirAResponse(saved);
    }
    
    // Cambiar estado del trC!mite
    public TramiteResponse cambiarEstado(Long tramiteId, String nuevoEstado, 
                                        Long usuarioId, String observaciones) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
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
        
        log.info("Estado del trC!mite {} cambiado de {} a {}", 
                tramite.getCodigo(), estadoAnterior, nuevoEstado);
        
        return convertirAResponse(saved);
    }
    
    // Finalizar trC!mite con archivo de respuesta
    public TramiteResponse finalizarConArchivo(Long tramiteId, String urlArchivo, Long usuarioId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
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
                         "TrC!mite finalizado con archivo de respuesta");
        
        // Notificar con archivo
        notificacionService.notificarFinalizacionConArchivo(tramiteId, urlArchivo);
        
        log.info("TrC!mite {} finalizado con archivo de respuesta", tramite.getCodigo());
        
        return convertirAResponse(saved);
    }
    
    // Eliminar trC!mite (solo ADMIN)
    public void eliminarTramite(Long tramiteId, Long usuarioId, String rol) {
        if (!"ADMIN".equals(rol)) {
            throw new RuntimeException("Solo el administrador puede eliminar trC!mites");
        }
        
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
        tramiteRepository.deleteById(tramiteId);
        
        log.info("TrC!mite {} eliminado por admin {}", tramite.getCodigo(), usuarioId);
    }
    
    // BC:squeda en tiempo real
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarTramites(String texto, Pageable pageable) {
        Page<Tramite> tramites = tramiteRepository
            .findByTituloOrDescripcionContaining(texto, pageable);
        
        return tramites.map(this::convertirAResponse);
    }
    
    // Obtener trC!mites del usuario
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerMisTramites(Long usuarioId, String rol, Pageable pageable) {
        Page<Tramite> tramites;
        
        // Crear un Pageable optimizado que solo use paginaciC3n sin ordenamiento
        // para evitar problemas de memoria con archivos base64 grandes
        org.springframework.data.domain.PageRequest pageableOptimizado = 
            org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        
        if ("USUARIO".equals(rol)) {
            // Usuario ve solo sus trC!mites creados - usar consulta optimizada por ID
            tramites = tramiteRepository.findByUsuarioSolicitanteIdOrderById(usuarioId, pageableOptimizado);
        } else if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            // Usar consulta optimizada que ordena por ID en lugar de fecha
            tramites = tramiteRepository.findAllOrderById(pageableOptimizado);
        } else {
            // Cualquier otro rol ve trC!mites ordenados por ID
            tramites = tramiteRepository.findAllOrderById(pageableOptimizado);
        }
        
        return tramites.map(this::convertirAResponse);
    }
    
    // MC)todo especC-fico para la bandeja que excluye archivados por defecto
    @Transactional(readOnly = true)
    public Page<TramiteResponse> obtenerTramitesBandeja(Long usuarioId, String rol, Pageable pageable, String estado, String prioridad, String tipo) {
        Page<Tramite> tramites;
        
        // Crear un Pageable optimizado que solo use paginaciC3n sin ordenamiento
        // para evitar problemas de memoria con archivos base64 grandes
        org.springframework.data.domain.PageRequest pageableOptimizado = 
            org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        
        if ("USUARIO".equals(rol)) {
            // Usuario ve solo sus trC!mites creados, excluyendo archivados por defecto
            if (estado == null) {
                // Excluir archivados por defecto
                tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoNotOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else if ("ARCHIVADO".equals(estado)) {
                // Mostrar solo archivados si se solicita explC-citamente
                tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else {
                // Filtrar por estado especC-fico
                Tramite.EstadoTramite estadoEnum;
                try {
                    estadoEnum = Tramite.EstadoTramite.valueOf(estado);
                    tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoOrderById(usuarioId, estadoEnum, pageableOptimizado);
                } catch (IllegalArgumentException e) {
                    // Si el estado no es vC!lido, excluir archivados
                    tramites = tramiteRepository.findByUsuarioSolicitanteIdAndEstadoNotOrderById(usuarioId, Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
                }
            }
        } else {
            // Administrativos ven todos los trC!mites, excluyendo archivados por defecto
            if (estado == null) {
                // Excluir archivados por defecto
                tramites = tramiteRepository.findByEstadoNotOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else if ("ARCHIVADO".equals(estado)) {
                // Mostrar solo archivados si se solicita explC-citamente
                tramites = tramiteRepository.findByEstadoOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
            } else {
                // Filtrar por estado especC-fico
                Tramite.EstadoTramite estadoEnum;
                try {
                    estadoEnum = Tramite.EstadoTramite.valueOf(estado);
                    tramites = tramiteRepository.findByEstadoOrderByIdDesc(estadoEnum, pageableOptimizado);
                } catch (IllegalArgumentException e) {
                    // Si el estado no es vC!lido, excluir archivados
                    tramites = tramiteRepository.findByEstadoNotOrderByIdDesc(Tramite.EstadoTramite.ARCHIVADO, pageableOptimizado);
                }
            }
        }
        
        return tramites.map(this::convertirAResponse);
    }
    
    // MC)todos pC:blicos (sin autenticaciC3n)
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarPorCodigo(String codigo, Pageable pageable) {
        // Limitar búsquedas muy amplias para evitar problemas de memoria
        if (codigo == null || codigo.trim().length() < 3) {
            // Si la búsqueda es muy corta, limitamos a máximo 5 resultados
            org.springframework.data.domain.Pageable limitedPageable =
                org.springframework.data.domain.PageRequest.of(
                    pageable.getPageNumber(),
                    Math.min(pageable.getPageSize(), 5),
                    org.springframework.data.domain.Sort.by("id").descending()
                );
            return tramiteRepository.findByCodigoContaining(codigo, limitedPageable)
                .map(this::convertirAResponse);
        }

        // Para búsquedas más específicas, permitir el tamaño solicitado pero con límite
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
        // Solo trC!mites en estados pC:blicos
        return tramiteRepository.findByEstado(Tramite.EstadoTramite.FINALIZADO, pageable)
            .map(this::convertirAResponse);
    }
    
    @Transactional(readOnly = true)
    public TramiteResponse obtenerTramitePublico(String codigo) {
        return tramiteRepository.findByCodigo(codigo)
            .map(this::convertirAResponse)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
    }
    
    // MC)todos de archivos
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
        // Verificar que el trC!mite existe y estC! finalizado
        tramiteRepository.findByCodigo(codigo)
            .filter(t -> t.getEstado() == Tramite.EstadoTramite.FINALIZADO)
            .orElseThrow(() -> new RuntimeException("Archivo no disponible"));
        
        // Implementar descarga de archivo
        byte[] archivo = new byte[0]; // Placeholder
        return org.springframework.http.ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=\"" + nombreArchivo + "\"")
            .body(archivo);
    }
    
    // MC)todos extendidos
    @Transactional(readOnly = true)
    public TramiteResponse obtenerTramite(Long id, Long usuarioId, String rol) {
        Tramite tramite = tramiteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
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
        
        // Filtros segC:n el rol
        Long solicitanteId = "USUARIO".equals(rol) ? usuarioId : null;
        Long asignadoId = "ADMINISTRATIVO".equals(rol) ? usuarioId : null;
        
        return tramiteRepository.findWithFilters(
            solicitanteId, asignadoId, null, estadoEnum, tipoEnum, prioridadEnum, pageable
        ).map(this::convertirAResponse);
    }
    
    public java.util.List<String> subirArchivosMultiples(Long tramiteId, java.util.List<org.springframework.web.multipart.MultipartFile> archivos, Long usuarioId) {
        log.info("Iniciando subida de {} archivos para trC!mite ID: {}", archivos.size(), tramiteId);
        
        // Verificar que el trC!mite existe y el usuario tiene permisos
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
        log.info("TrC!mite encontrado: {} - Estado actual documentos: {}", tramite.getCodigo(), 
            tramite.getDocumentosAdjuntos() != null ? "Existe" : "NULL");
        
        java.util.List<String> archivosBase64 = new java.util.ArrayList<>();
        
        for (org.springframework.web.multipart.MultipartFile archivo : archivos) {
            // Validar tamaC1o y tipo
            if (archivo.getSize() > 50 * 1024 * 1024) { // 50MB lC-mite por archivo
                throw new RuntimeException("Archivo " + archivo.getOriginalFilename() + " excede el lC-mite de 50MB");
            }
            
            // Convertir archivo a base64 y crear JSON
            String archivoJson = guardarArchivoRespuesta(archivo);
            archivosBase64.add(archivoJson);
        }
        
        // Actualizar documentos adjuntos del trC!mite en la base de datos
        String documentosActuales = tramite.getDocumentosAdjuntos();
        String nuevosDocumentos;
        
        if (documentosActuales != null && !documentosActuales.trim().isEmpty()) {
            // Si ya hay documentos, agregar los nuevos
            if (documentosActuales.startsWith("[") && documentosActuales.endsWith("]")) {
                // Es un array JSON vC!lido, insertar antes del corchete de cierre
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
        
        log.info("Estableciendo documentos en trC!mite: {} caracteres", nuevosDocumentos.length());
        tramite.setDocumentosAdjuntos(nuevosDocumentos);
        tramiteRepository.save(tramite);
        
        log.info("Guardados {} archivos en base64 para trC!mite {}", archivos.size(), tramite.getCodigo());
        
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
        // Verificar permisos y obtener el trC!mite
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
        // Verificar permisos segC:n el rol
        if ("USUARIO".equals(rol) && !tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para acceder a este trC!mite");
        }
        
        String documentosJson = tramite.getDocumentosAdjuntos();
        if (documentosJson == null || documentosJson.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }
        
        try {
            // Crear un ZIP con todos los documentos
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.util.zip.ZipOutputStream zos = new java.util.zip.ZipOutputStream(baos);
            
            // Parsear el JSON que contiene mC:ltiples documentos
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
        // Buscar trC!mite por cC3digo sin verificar permisos (acceso pC:blico)
        Tramite tramite = tramiteRepository.findByCodigo(codigo)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado con cC3digo: " + codigo));
        
        String documentosJson = tramite.getDocumentosAdjuntos();
        if (documentosJson == null || documentosJson.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }
        
        try {
            // Crear un ZIP con todos los documentos
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.util.zip.ZipOutputStream zos = new java.util.zip.ZipOutputStream(baos);
            
            // Parsear el JSON que contiene mC:ltiples documentos
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
            // EstadC-sticas para usuario remitente - solo sus trC!mites
            estadisticas.put("total", tramiteRepository.countByUsuarioSolicitanteId(usuarioId));
            
            // Contar por estado para sus trC!mites
            for (Tramite.EstadoTramite estado : Tramite.EstadoTramite.values()) {
                Long count = tramiteRepository.countByUsuarioSolicitanteIdAndEstado(usuarioId, estado);
                estadisticas.put("estado_" + estado.name(), count);
            }
            
            // Contar por tipo para sus trC!mites
            for (Tramite.TipoTramite tipo : Tramite.TipoTramite.values()) {
                Long count = tramiteRepository.countByUsuarioSolicitanteIdAndTipo(usuarioId, tipo);
                estadisticas.put("tipo_" + tipo.name(), count);
            }
            
        } else if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            // Administrativo y Admin ven estadC-sticas generales de todos los trC!mites
            return obtenerEstadisticas();
        } else {
            // Cualquier otro rol ve estadC-sticas generales
            return obtenerEstadisticas();
        }
        
        return estadisticas;
    }
    
    // Proceso automC!tico: cambiar estados segC:n tiempo
    @Scheduled(cron = "0 0 */1 * * *") // Cada hora
    public void actualizarEstadosAutomaticos() {
        LocalDateTime ahora = LocalDateTime.now();
        
        // Cambiar de EN_REVISION a EN_PROCESO despuC)s de 1 dC-a
        List<Tramite> enRevision = tramiteRepository.findByEstado(
            Tramite.EstadoTramite.EN_REVISION, 
            Pageable.unpaged()
        ).getContent();
        
        for (Tramite tramite : enRevision) {
            if (tramite.getFechaActualizacion().plusDays(1).isBefore(ahora)) {
                tramite.setEstado(Tramite.EstadoTramite.EN_PROCESO);
                tramiteRepository.save(tramite);
                
                // Notificar cambio automC!tico
                notificacionService.notificarCambioEstadoAutomatico(
                    tramite.getId(), "EN_REVISION", "EN_PROCESO"
                );
                
                log.info("TrC!mite {} cambiC3 automC!ticamente a EN_PROCESO", tramite.getCodigo());
            }
        }
        
        // Marcar trC!mites vencidos
        List<Tramite> vencidos = tramiteRepository.findTramitesVencidos(
            ahora, 
            Arrays.asList(Tramite.EstadoTramite.FINALIZADO, 
                         Tramite.EstadoTramite.ARCHIVADO,
                         Tramite.EstadoTramite.CANCELADO)
        );
        
        for (Tramite tramite : vencidos) {
            log.warn("TrC!mite {} ha vencido", tramite.getCodigo());
            // Notificar vencimiento
        }
    }
    
    // MC)todos auxiliares
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
                log.info("CC3digo generado exitosamente: {} (intento {})", codigo, retry + 1);
                return codigo;
            } else {
                log.warn("CC3digo duplicado detectado: {} (intento {})", codigo, retry + 1);
                // Small delay before retry
                try {
                    Thread.sleep(10 + (retry * 10)); // 10ms, 20ms, 30ms, etc.
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Error generando cC3digo de trC!mite", e);
                }
            }
        }
        
        // If all retries failed, generate a random suffix
        String codigo = String.format("TRM-%s-%04d-%d", anio, 
            tramiteRepository.getNextCodigoNumber(anio), 
            System.currentTimeMillis() % 1000);
        log.warn("Generando cC3digo con sufijo aleatorio despuC)s de {} intentos: {}", maxRetries, codigo);
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
            log.warn("Usuario solicitante ID es NULL para trC!mite: {}", tramite.getCodigo());
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
        
        // Mapear C!rea actual usando ID
        if (tramite.getAreaActualId() != null) {
            log.info("Buscando C!rea actual con ID: {}", tramite.getAreaActualId());
            Optional<AreaResponse> areaOpt = areaService.getAreaById(tramite.getAreaActualId());
            if (areaOpt.isPresent()) {
                var area = areaOpt.get();
                log.info("Crea actual encontrada: {}", area.getNombre());
                builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                    .id(area.getId())
                    .nombre(area.getNombre())
                    .descripcion(area.getDescripcion())
                    .build());
            } else {
                log.warn("Crea actual NO ENCONTRADA con ID: {} - Proporcionando datos por defecto", tramite.getAreaActualId());
                // Proporcionar datos por defecto
                builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                    .id(tramite.getAreaActualId())
                    .nombre("Crea no encontrada")
                    .descripcion("Crea no disponible")
                    .build());
            }
        } else {
            log.warn("Crea actual ID es NULL para trC!mite: {}", tramite.getCodigo());
            // Proporcionar datos por defecto
            builder.areaActual(TramiteResponse.AreaBasicInfo.builder()
                .id(0L)
                .nombre("Crea no disponible")
                .descripcion("Crea no disponible")
                .build());
        }
        
        // Mapear C!rea origen usando ID
        if (tramite.getAreaOrigenId() != null) {
            areaService.getAreaById(tramite.getAreaOrigenId()).ifPresent(area -> 
                builder.areaOrigen(TramiteResponse.AreaBasicInfo.builder()
                    .id(area.getId())
                    .nombre(area.getNombre())
                    .descripcion(area.getDescripcion())
                    .build()));
        }
        
        // Mapear informaciC3n de respuesta
        if (tramite.getRespuesta() != null) {
            builder.respuesta(tramite.getRespuesta());
        }
        if (tramite.getFechaRespuesta() != null) {
            builder.fechaRespuesta(tramite.getFechaRespuesta());
        }
        
        // Mapear usuario que respondiC3
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

        // Mapear documentos adjuntos
        if (tramite.getDocumentosAdjuntos() != null && !tramite.getDocumentosAdjuntos().isEmpty()) {
            try {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
                mapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                java.util.List<TramiteResponse.DocumentoAdjunto> documentosList = mapper.readValue(tramite.getDocumentosAdjuntos(),
                    mapper.getTypeFactory().constructCollectionType(java.util.List.class,
                        TramiteResponse.DocumentoAdjunto.class));
                builder.documentosAdjuntos(documentosList);
                log.info("Documentos adjuntos mapeados: {} documentos", documentosList.size());
            } catch (Exception e) {
                log.error("Error al parsear documentos adjuntos: {}", e.getMessage());
                builder.documentosAdjuntos(new java.util.ArrayList<>());
            }
        } else {
            builder.documentosAdjuntos(new java.util.ArrayList<>());
        }

        // Mapear archivos de respuesta
        if (tramite.getArchivosRespuesta() != null && !tramite.getArchivosRespuesta().isEmpty()) {
            try {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
                mapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
                java.util.List<TramiteResponse.DocumentoAdjunto> archivosList = mapper.readValue(tramite.getArchivosRespuesta(),
                    mapper.getTypeFactory().constructCollectionType(java.util.List.class,
                        TramiteResponse.DocumentoAdjunto.class));
                builder.archivosRespuesta(archivosList);
                log.info("Archivos de respuesta mapeados: {} archivos", archivosList.size());
            } catch (Exception e) {
                log.error("Error al parsear archivos de respuesta: {}", e.getMessage());
                builder.archivosRespuesta(new java.util.ArrayList<>());
            }
        } else {
            builder.archivosRespuesta(new java.util.ArrayList<>());
        }

        return builder.build();
    }
    
    // Responder trC!mite con notificaciC3n obligatoria
    public com.example.demo.dto.ResponderTramiteResponse responderTramite(Long tramiteId, com.example.demo.dto.ResponderTramiteRequest request, Long administrativoId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
        // Verificar estado vC!lido
        if (tramite.getEstado() == Tramite.EstadoTramite.FINALIZADO || 
            tramite.getEstado() == Tramite.EstadoTramite.ARCHIVADO ||
            tramite.getEstado() == Tramite.EstadoTramite.CANCELADO) {
            throw new RuntimeException("No se puede responder un trC!mite en estado: " + tramite.getEstado());
        }
        
        String estadoAnterior = tramite.getEstado().name();
        
        // Actualizar trC!mite con respuesta
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
        
        // Decrementar contador "Por Procesar" ya que se estC! respondiendo
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
            // Guardar como array JSON vC!lido
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
                         "TrC!mite respondido y finalizado");
        
        // Obtener informaciC3n del responsable
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
        
        // NOTIFICACICN OBLIGATORIA POR EMAIL
        // Calcular cantidad de documentos adjuntos en la respuesta
        Integer cantidadDocumentosRespuesta = 0;
        if (request.getArchivosRespuesta() != null) {
            cantidadDocumentosRespuesta = request.getArchivosRespuesta().size();
        }

        boolean emailEnviado = notificacionService.notificarRespuestaTramite(
            tramiteId,
            tramite.getUsuarioSolicitanteId(),
            administrativoId,
            request.getRespuesta(),
            request.getAsunto() != null ? request.getAsunto() : "Respuesta a su trC!mite " + tramite.getCodigo(),
            cantidadDocumentosRespuesta
        );
        
        log.info("TrC!mite {} respondido por administrativo {}", tramite.getCodigo(), administrativoId);
        
        return com.example.demo.dto.ResponderTramiteResponse.builder()
            .success(true)
            .mensaje("TrC!mite respondido exitosamente y notificaciC3n enviada")
            .tramiteId(tramite.getId())
            .codigoTramite(tramite.getCodigo())
            .estadoActual(tramite.getEstado().name())
            .responsable(responsableInfo)
            .fechaRespuesta(tramite.getFechaRespuesta())
            .emailEnviado(emailEnviado)
            .build();
    }
    
    public com.example.demo.dto.AprobarTramiteResponse aprobarTramite(Long tramiteId, com.example.demo.dto.AprobarTramiteRequest request, Long administrativoId) {
        // Verificar que el trC!mite existe
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));
        
        // Verificar que el estado actual permite la aprobaciC3n
        if (!tramite.getEstado().equals(Tramite.EstadoTramite.ENVIADO) && 
            !tramite.getEstado().equals(Tramite.EstadoTramite.EN_REVISION)) {
            throw new RuntimeException("El trC!mite no se puede aprobar en su estado actual: " + tramite.getEstado());
        }
        

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
        
        // Crear respuesta con informaciC3n del responsable
        com.example.demo.dto.AprobarTramiteResponse response = new com.example.demo.dto.AprobarTramiteResponse();
        response.setSuccess(true);
        response.setMensaje("TrC!mite aprobado exitosamente");
        
        // InformaciC3n del responsable asignado
        com.example.demo.dto.AprobarTramiteResponse.ResponsableAsignado responsableAsignado = 
            new com.example.demo.dto.AprobarTramiteResponse.ResponsableAsignado();
        
        // Por ahora usar valores por defecto, luego se puede mejorar
        responsableAsignado.setId(administrativoId);
        responsableAsignado.setNombre("Administrativo");
        responsableAsignado.setApellidos("Asignado");
        responsableAsignado.setArea("SecretarC-a General");
        
        response.setResponsableAsignado(responsableAsignado);
        response.setTramiteActualizado(convertirAResponse(tramite));
        
       
        
        
        return response;
    }
    

    @org.springframework.transaction.annotation.Transactional
    public void actualizarContadoresTramitesExistentes() {
        // Usar query nativa para obtener trC!mites por estado sin paginaciC3n
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
        
        // Actualizar trC!mites FINALIZADOS que fueron respondidos pero no tienen contadores actualizados  
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
    
    // Cambiar estado de trC!mite (para archivado y otras operaciones)
    public void cambiarEstadoTramite(Long tramiteId, String nuevoEstado, String observaciones, Long usuarioId, String rol) {
        Optional<Tramite> tramiteOpt = tramiteRepository.findById(tramiteId);
        if (!tramiteOpt.isPresent()) {
            throw new RuntimeException("TrC!mite no encontrado con ID: " + tramiteId);
        }
        
        Tramite tramite = tramiteOpt.get();
        
        // Validaciones de permisos
        if ("USUARIO".equals(rol)) {
            // Los usuarios solo pueden hacer ciertas operaciones en sus propios trC!mites
            if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                throw new RuntimeException("No tiene permisos para modificar este trC!mite");
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
            throw new RuntimeException("Estado no vC!lido: " + nuevoEstado);
        }
    }
    
    // Exportar trC!mites a PDF
    public byte[] exportarTramitesAPdf(java.util.List<Long> tramiteIds, Long usuarioId, String rol) {
        try {
            // Obtener trC!mites
            java.util.List<Tramite> tramites = new java.util.ArrayList<>();
            for (Long id : tramiteIds) {
                Optional<Tramite> tramiteOpt = tramiteRepository.findById(id);
                if (tramiteOpt.isPresent()) {
                    Tramite tramite = tramiteOpt.get();
                    
                    // Validar permisos
                    if ("USUARIO".equals(rol) && !tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                        continue; // Saltar trC!mites que no le pertenecen al usuario
                    }
                    
                    tramites.add(tramite);
                }
            }
            
            if (tramites.isEmpty()) {
                throw new RuntimeException("No se encontraron trC!mites vC!lidos para exportar");
            }
            
            // Generar PDF simple (texto plano por ahora, se puede mejorar con librerC-as como iText)
            return generarPdfSimple(tramites);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF: " + e.getMessage());
        }
    }
    
    private byte[] generarPdfSimple(java.util.List<Tramite> tramites) {
        StringBuilder contenido = new StringBuilder();
        contenido.append("EXPORTACICN DE TRCMITES\n");
        contenido.append("Fecha de generaciC3n: ").append(LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))).append("\n");
        contenido.append("Total de trC!mites: ").append(tramites.size()).append("\n\n");
        contenido.append("=".repeat(80)).append("\n\n");
        
        for (int i = 0; i < tramites.size(); i++) {
            Tramite tramite = tramites.get(i);
            contenido.append("TRCMITE ").append(i + 1).append("\n");
            contenido.append("-".repeat(40)).append("\n");
            contenido.append("CC3digo: ").append(tramite.getCodigo()).append("\n");
            contenido.append("TC-tulo: ").append(tramite.getTitulo()).append("\n");
            contenido.append("Tipo: ").append(tramite.getTipo()).append("\n");
            contenido.append("Estado: ").append(tramite.getEstado()).append("\n");
            contenido.append("Prioridad: ").append(tramite.getPrioridad()).append("\n");
            contenido.append("Fecha creaciC3n: ").append(tramite.getFechaCreacion() != null ? 
                tramite.getFechaCreacion().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")) : "N/A").append("\n");
            contenido.append("Fecha vencimiento: ").append(tramite.getFechaVencimiento() != null ? 
                tramite.getFechaVencimiento().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy")) : "N/A").append("\n");
            // Note: We need to get the user details separately since we only have the ID
            // For now, we'll just use the ID
            contenido.append("Solicitante ID: ").append(tramite.getUsuarioSolicitanteId()).append("\n");
            contenido.append("DescripciC3n: ").append(tramite.getDescripcion() != null ? tramite.getDescripcion() : "N/A").append("\n");
            
            if (tramite.getObservaciones() != null && !tramite.getObservaciones().trim().isEmpty()) {
                contenido.append("Observaciones: ").append(tramite.getObservaciones()).append("\n");
            }
            
            contenido.append("\n");
        }
        
        // Convertir a bytes (en un caso real usarC-as una librerC-a como iText para PDF real)
        return contenido.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8);
    }

    // Verificar permisos de acciones para un trC!mite especC-fico
    public java.util.Map<String, Boolean> verificarPermisosAcciones(Long tramiteId, Long usuarioId, String rol) {
        java.util.Map<String, Boolean> permisos = new java.util.HashMap<>();

        // Obtener el trC!mite
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("TrC!mite no encontrado"));

        // Verificar si el trC!mite estC! vencido
        boolean estaVencido = false;
        if (tramite.getFechaVencimiento() != null) {
            estaVencido = LocalDateTime.now().isAfter(tramite.getFechaVencimiento());
        }

        // Solo administrativos pueden realizar estas acciones
        boolean esAdministrativo = "ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol);

        if (!esAdministrativo) {
            // Si no es administrativo, no puede hacer ninguna acciC3n
            permisos.put("puedeAprobar", false);
            permisos.put("puedeRechazar", false);
            permisos.put("puedeDerivar", false);
            permisos.put("puedeResponder", false);
            permisos.put("estaVencido", estaVencido);
            return permisos;
        }

        // Si estC! vencido, deshabilitar todas las acciones
        if (estaVencido) {
            permisos.put("puedeAprobar", false);
            permisos.put("puedeRechazar", false);
            permisos.put("puedeDerivar", false);
            permisos.put("puedeResponder", false);
            permisos.put("estaVencido", true);
            return permisos;
        }


        String estadoNombre = tramite.getEstado() != null ? tramite.getEstado().name() : "";


        List<String> estadosParaAprobar = Arrays.asList("EN_REVISION", "DERIVADO");
        boolean puedeAprobar = estadosParaAprobar.contains(estadoNombre);

        List<String> estadosNoRechazables = Arrays.asList("FINALIZADO", "RECHAZADO", "ARCHIVADO");
        boolean puedeRechazar = !estadosNoRechazables.contains(estadoNombre);

        List<String> estadosParaDerivar = Arrays.asList("EN_REVISION", "DERIVADO");
        boolean puedeDerivar = estadosParaDerivar.contains(estadoNombre);

       
        Long usuarioAsignado = tramite.getUsuarioAsignadoId();
        if (usuarioAsignado != null && !usuarioAsignado.equals(usuarioId)) {
            // Si estC! asignado a otro usuario, solo puede rechazar
            puedeAprobar = false;
            puedeDerivar = false;
        }

        // LC3gica para responder (puede responder si estC! aprobado o derivado)
        List<String> estadosParaResponder = Arrays.asList("APROBADO", "DERIVADO", "EN_PROCESO");
        boolean puedeResponder = estadosParaResponder.contains(estadoNombre);

        // Si estC! asignado a otro usuario, tambiC)n puede responder el usuario asignado
        if (usuarioAsignado != null && !usuarioAsignado.equals(usuarioId)) {
            puedeResponder = estadosParaResponder.contains(estadoNombre);
        }

        permisos.put("puedeAprobar", puedeAprobar);
        permisos.put("puedeRechazar", puedeRechazar);
        permisos.put("puedeDerivar", puedeDerivar);
        permisos.put("puedeResponder", puedeResponder);
        permisos.put("estaVencido", false);

        return permisos;
    }

    // NUEVOS MÉTODOS PARA ARCHIVOS EN BASE64

    @Transactional
    public TramiteResponse crearTramiteConArchivos(TramiteConArchivosRequest request, Long usuarioId, String rol) {
        try {
            // Crear el trámite básico
            TramiteRequest tramiteRequest = new TramiteRequest();
            tramiteRequest.setTitulo(request.getAsunto());
            tramiteRequest.setDescripcion(request.getDescripcion());
            tramiteRequest.setObservaciones(request.getObservaciones());
            tramiteRequest.setFechaVencimiento(request.getFechaVencimiento());
            tramiteRequest.setAreaDestinoId(request.getAreaDestinoId());

            // Mapear IDs a enums
            String tipoString = mapTipoTramiteIdToString(request.getTipoTramiteId());
            String prioridadString = mapPrioridadIdToString(request.getPrioridadId());
            tramiteRequest.setTipo(tipoString);
            tramiteRequest.setPrioridad(prioridadString);

            // Crear el trámite sin documentos primero
            TramiteResponse tramiteCreado = crearTramite(tramiteRequest, usuarioId, rol);

            // Procesar documentos en base64 si los hay
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
            // Actualizar el trámite básico
            TramiteRequest tramiteRequest = new TramiteRequest();
            // El frontend envía 'asunto' pero el backend espera 'titulo'
            tramiteRequest.setTitulo(request.getAsunto() != null ? request.getAsunto() : request.getTitulo());
            tramiteRequest.setDescripcion(request.getDescripcion());
            tramiteRequest.setObservaciones(request.getObservaciones());
            tramiteRequest.setFechaVencimiento(request.getFechaVencimiento());
            tramiteRequest.setAreaDestinoId(request.getAreaDestinoId());
            tramiteRequest.setTipo(request.getTipo());
            tramiteRequest.setPrioridad(request.getPrioridad());

            // Buscar el trámite existente y actualizarlo
            Optional<Tramite> tramiteExistente = tramiteRepository.findById(tramiteId);
            if (tramiteExistente.isEmpty()) {
                throw new RuntimeException("Trámite no encontrado con ID: " + tramiteId);
            }

            Tramite tramite = tramiteExistente.get();

            // Actualizar campos básicos
            // El frontend envía 'asunto' que se mapea a 'titulo' en la entidad
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

            // Actualizar tipo de trámite si se envía
            if (request.getTipo() != null) {
                try {
                    Tramite.TipoTramite tipoEnum = Tramite.TipoTramite.valueOf(request.getTipo().toUpperCase());
                    tramite.setTipo(tipoEnum);
                } catch (IllegalArgumentException e) {
                    log.warn("Tipo de trámite no válido: " + request.getTipo());
                }
            }

            // Actualizar prioridad si se envía
            if (request.getPrioridad() != null) {
                try {
                    Tramite.PrioridadTramite prioridadEnum = Tramite.PrioridadTramite.valueOf(request.getPrioridad().toUpperCase());
                    tramite.setPrioridad(prioridadEnum);
                } catch (IllegalArgumentException e) {
                    log.warn("Prioridad no válida: " + request.getPrioridad());
                }
            }

            // Guardar cambios
            Tramite tramiteGuardado = tramiteRepository.save(tramite);

            // Crear respuesta básica - simplificada para evitar errores
            TramiteResponse tramiteActualizado = new TramiteResponse();
            tramiteActualizado.setId(tramiteGuardado.getId());
            tramiteActualizado.setCodigo(tramiteGuardado.getCodigo() != null ? tramiteGuardado.getCodigo() : "TRM-" + tramiteGuardado.getId());
            tramiteActualizado.setTitulo(tramiteGuardado.getTitulo() != null ? tramiteGuardado.getTitulo() : "Trámite actualizado");
            tramiteActualizado.setDescripcion(tramiteGuardado.getDescripcion() != null ? tramiteGuardado.getDescripcion() : "");
            if (tramiteGuardado.getObservaciones() != null) {
                tramiteActualizado.setObservaciones(tramiteGuardado.getObservaciones());
            }

            // Eliminar documentos marcados para eliminación
            if (request.getDocumentosAEliminar() != null && !request.getDocumentosAEliminar().isEmpty()) {
                eliminarDocumentos(tramiteId, request.getDocumentosAEliminar(), usuarioId);
            }

            // Procesar nuevos documentos en base64 si los hay
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

        // Buscar el trámite para actualizar sus documentos
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        // Lista para almacenar los documentos procesados como JSON
        List<String> archivosJsonList = new ArrayList<>();

        for (DocumentoBase64Request documento : documentos) {
            try {
                // Validar que el documento tenga contenido
                if (documento.getContenido() == null || documento.getContenido().isEmpty()) {
                    continue; // Saltar documentos sin contenido
                }

                // Crear objeto JSON con el documento en base64
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

                // Log para debug
                System.out.println("📁 Documento procesado: " + documento.getNombre());

            } catch (Exception e) {
                System.err.println("❌ Error al procesar documento " + documento.getNombre() + ": " + e.getMessage());
                // No lanzar excepción para que no falle todo el proceso por un archivo
            }
        }

        // Actualizar los documentos adjuntos del trámite en la base de datos
        if (!archivosJsonList.isEmpty()) {
            String documentosActuales = tramite.getDocumentosAdjuntos();
            String nuevosDocumentos;

            if (documentosActuales != null && !documentosActuales.trim().isEmpty()) {
                // Si ya hay documentos, agregar los nuevos
                if (documentosActuales.startsWith("[") && documentosActuales.endsWith("]")) {
                    // Es un array JSON válido, insertar antes del corchete de cierre
                    nuevosDocumentos = documentosActuales.substring(0, documentosActuales.length() - 1)
                        + "," + String.join(",", archivosJsonList) + "]";
                } else {
                    // Formato legacy, convertir a array
                    nuevosDocumentos = "[" + documentosActuales + "," + String.join(",", archivosJsonList) + "]";
                }
            } else {
                // Crear nuevo JSON array
                nuevosDocumentos = "[" + String.join(",", archivosJsonList) + "]";
            }

            log.info("Guardando {} nuevos documentos en trámite {}", archivosJsonList.size(), tramiteId);
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
                // Log para debug
                System.out.println("🗑️ Solicitado eliminar documento ID: " + documentoId + " del trámite: " + tramiteId);

                // TODO: Implementar eliminación real cuando esté listo
                // Por ahora solo loggeamos la acción

            } catch (Exception e) {
                System.err.println("❌ Error al eliminar documento " + documentoId + ": " + e.getMessage());
                // No lanzar excepción para que no falle todo el proceso
            }
        }
    }

    private String obtenerExtensionDeNombre(String nombreArchivo) {
        int puntoIndex = nombreArchivo.lastIndexOf('.');
        return puntoIndex > 0 ? nombreArchivo.substring(puntoIndex) : "";
    }

    private String guardarArchivo(byte[] contenido, String nombreArchivo, Long tramiteId) {
        try {
            // Crear directorio para el trámite si no existe
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

    // Métodos auxiliares para mapeo de IDs (reutilizados del controlador)
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
        // Verificar que el trámite existe
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

        // Verificar que el estado actual permite el rechazo
        if (tramite.getEstado().equals(Tramite.EstadoTramite.FINALIZADO) ||
            tramite.getEstado().equals(Tramite.EstadoTramite.ARCHIVADO)) {
            throw new RuntimeException("El trámite no se puede rechazar en su estado actual: " + tramite.getEstado());
        }

        // Cambiar estado a RECHAZADO
        Tramite.EstadoTramite estadoAnterior = tramite.getEstado();
        tramite.setEstado(Tramite.EstadoTramite.RECHAZADO);
        tramite.setFechaActualizacion(LocalDateTime.now());

        // Incrementar contador de rechazados
        tramite.setContadorRechazados((tramite.getContadorRechazados() != null ? tramite.getContadorRechazados() : 0) + 1);

        // Guardar cambios
        tramite = tramiteRepository.save(tramite);

        // Crear registro en historial
        TramiteHistorial historial = new TramiteHistorial();
        historial.setTramiteId(tramite.getId());
        historial.setEstadoAnterior(estadoAnterior.toString());
        historial.setEstadoNuevo(Tramite.EstadoTramite.RECHAZADO.toString());
        historial.setUsuarioId(administrativoId);
        historial.setFechaAccion(LocalDateTime.now());
        historial.setAccion(TramiteHistorial.TipoAccion.RECHAZADO);
        historial.setObservaciones(request.getMotivoRechazo());
        historialRepository.save(historial);

        // Obtener información del usuario administrativo que rechaza
        UsuarioResponse administrativo = usuarioService.obtenerUsuarioPorId(administrativoId);
        String nombreAdministrativo = administrativo.getNombre() + " " + administrativo.getApellidos();

        // Enviar notificación por correo al solicitante
        boolean notificacionEnviada = false;
        try {
            if (tramite.getUsuarioSolicitanteId() != null) {
                // Llamar al servicio de email para enviar notificación de rechazo
                emailService.enviarCorreoRechazoTramite(
                    tramite.getUsuarioSolicitanteId(),
                    tramiteId,
                    request.getMotivoRechazo(),
                    request.getObservaciones(),
                    nombreAdministrativo
                );
                notificacionEnviada = true;

                // También crear una notificación en el sistema
                notificacionService.crearNotificacionRechazoTramite(
                    tramite.getUsuarioSolicitanteId(),
                    tramiteId,
                    tramite.getCodigo(),
                    tramite.getAsunto(),
                    request.getMotivoRechazo()
                );
            }
        } catch (Exception e) {
            log.error("Error al enviar notificación de rechazo para trámite {}: {}", tramiteId, e.getMessage());
        }

        // Crear respuesta
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

    // Generar PDF del trámite para impresión
    public byte[] generarPdfTramite(Long tramiteId, Long usuarioId, String rol) {
        try {
            // Obtener el trámite
            Tramite tramite = tramiteRepository.findById(tramiteId)
                .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));

            // Verificar permisos
            if (!"ADMIN".equals(rol) && !"ADMINISTRATIVO".equals(rol)) {
                // Solo usuarios pueden ver sus propios trámites
                if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                    throw new RuntimeException("No tiene permisos para imprimir este trámite");
                }
            }

            // Generar contenido HTML del trámite
            String htmlContent = generarHtmlTramite(tramite);

            // Convertir HTML a PDF usando una librería simple
            return convertirHtmlAPdf(htmlContent);

        } catch (Exception e) {
            log.error("Error al generar PDF del trámite {}: {}", tramiteId, e.getMessage());
            throw new RuntimeException("Error al generar PDF: " + e.getMessage(), e);
        }
    }

    private String generarHtmlTramite(Tramite tramite) {
        // Obtener información adicional usando los servicios inyectados
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
            log.warn("No se pudo obtener información de usuarios: {}", e.getMessage());
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

        // Información del solicitante
        if (solicitante != null) {
            html.append("<div class='section'>")
                .append("<span class='label'>Solicitante:</span>")
                .append("<span class='value'>").append(solicitante.getNombre()).append(" ").append(solicitante.getApellidos()).append("</span>")
                .append("</div>");
        }

        // Información del asignado
        if (asignado != null) {
            html.append("<div class='section'>")
                .append("<span class='label'>Asignado a:</span>")
                .append("<span class='value'>").append(asignado.getNombre()).append(" ").append(asignado.getApellidos()).append("</span>")
                .append("</div>");
        }

        // Fechas
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
}