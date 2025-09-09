package com.example.demo.service;

import com.example.demo.dto.TramiteRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.model.Tramite;
import com.example.demo.model.TramiteHistorial;
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.TramiteHistorialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TramiteService {
    
    private final TramiteRepository tramiteRepository;
    private final TramiteHistorialRepository historialRepository;
    private final NotificacionService notificacionService;
    private final UsuarioService usuarioService;
    
    private static final int MAX_TRAMITES_POR_TRABAJADOR = 20;
    private static final int DIAS_PROCESAMIENTO = 3;
    private static final Long AREA_SECRETARIA_GENERAL_ID = 1L;
    
    // Crear nuevo trámite (solo REMITENTE puede crear)
    public TramiteResponse crearTramite(TramiteRequest request, Long usuarioSolicitanteId, String rol) {
        // Verificar que no sea ADMIN quien crea (solo puede editar/eliminar)
        if (!"USUARIO".equals(rol)) {
            throw new RuntimeException("Solo los usuarios remitentes pueden crear trámites");
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
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        // Remitente solo puede editar si es su trámite y está en estado inicial
        if ("USUARIO".equals(rol)) {
            if (!tramite.getUsuarioSolicitanteId().equals(usuarioId)) {
                throw new RuntimeException("No autorizado para editar este trámite");
            }
            if (!Arrays.asList(Tramite.EstadoTramite.BORRADOR, Tramite.EstadoTramite.ENVIADO)
                    .contains(tramite.getEstado())) {
                throw new RuntimeException("El trámite ya está en proceso y no puede ser editado");
            }
        }
        
        // Actualizar campos
        tramite.setTitulo(request.getTitulo());
        tramite.setDescripcion(request.getDescripcion());
        tramite.setTipo(Tramite.TipoTramite.valueOf(request.getTipo()));
        tramite.setPrioridad(Tramite.PrioridadTramite.valueOf(request.getPrioridad()));
        tramite.setObservaciones(request.getObservaciones());
        
        if (request.getDocumentosAdjuntos() != null) {
            tramite.setDocumentosAdjuntos(request.getDocumentosAdjuntos());
        }
        
        Tramite updated = tramiteRepository.save(tramite);
        
        // Registrar en historial
        registrarHistorial(tramiteId, usuarioId, 
                         TramiteHistorial.TipoAccion.MODIFICADO,
                         null, null, 
                         "Trámite modificado");
        
        log.info("Trámite {} editado por usuario {}", tramite.getCodigo(), usuarioId);
        
        return convertirAResponse(updated);
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
        
        if ("USUARIO".equals(rol)) {
            // Usuario ve solo sus trámites creados
            tramites = tramiteRepository.findByUsuarioSolicitanteId(usuarioId, pageable);
        } else if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            // Administrativo y Admin ven todos los trámites para gestionar
            tramites = tramiteRepository.findAll(pageable);
        } else {
            // Cualquier otro rol ve todos (por compatibilidad)
            tramites = tramiteRepository.findAll(pageable);
        }
        
        return tramites.map(this::convertirAResponse);
    }
    
    // Métodos públicos (sin autenticación)
    @Transactional(readOnly = true)
    public Page<TramiteResponse> buscarPorCodigo(String codigo, Pageable pageable) {
        return tramiteRepository.findByTituloOrDescripcionContaining(codigo, pageable)
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
        // Implementar lógica de guardado
        // Retorna la URL donde se guardó el archivo
        return "/files/" + archivo.getOriginalFilename();
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
        // Verificar que el trámite existe y el usuario tiene permisos
        tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new RuntimeException("Trámite no encontrado"));
        
        java.util.List<String> urls = new java.util.ArrayList<>();
        
        for (org.springframework.web.multipart.MultipartFile archivo : archivos) {
            // Validar tamaño y tipo
            if (archivo.getSize() > 200 * 1024 * 1024) { // 200MB aprox para 200 páginas
                throw new RuntimeException("Archivo excede el límite de 200 páginas");
            }
            
            // Guardar archivo
            String url = guardarArchivoRespuesta(archivo);
            urls.add(url);
        }
        
        return urls;
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
    
    private String generarCodigoTramite() {
        String anio = String.valueOf(Year.now().getValue());
        Integer siguiente = tramiteRepository.getNextCodigoNumber(anio);
        if (siguiente == null) siguiente = 1;
        
        return String.format("TRM-%s-%04d", anio, siguiente);
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
        return TramiteResponse.builder()
            .id(tramite.getId())
            .codigo(tramite.getCodigo())
            .titulo(tramite.getTitulo())
            .descripcion(tramite.getDescripcion())
            .tipo(tramite.getTipo().name())
            .estado(tramite.getEstado().name())
            .prioridad(tramite.getPrioridad().name())
            .numeroExpediente(tramite.getNumeroExpediente())
            .observaciones(tramite.getObservaciones())
            .fechaCreacion(tramite.getFechaCreacion())
            .fechaActualizacion(tramite.getFechaActualizacion())
            .fechaVencimiento(tramite.getFechaVencimiento())
            .fechaCompletado(tramite.getFechaCompletado())
            .build();
    }
}