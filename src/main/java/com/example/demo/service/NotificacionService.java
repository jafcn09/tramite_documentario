package com.example.demo.service;

import com.example.demo.dto.NotificacionRequest;
import com.example.demo.dto.NotificacionResponse;
import com.example.demo.model.Notificacion;
import com.example.demo.repository.NotificacionRepository;
import com.example.demo.repository.TramiteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificacionService {
    
    private final NotificacionRepository notificacionRepository;
    private final TramiteRepository tramiteRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final EmailService emailService;
    private final UsuarioService usuarioService;
    
    private static final int MAX_TRAMITES_POR_TRABAJADOR = 20;
    
    // Notificar nuevo trámite a trabajadores del área
    @Async
    public void notificarNuevoTramite(Long tramiteId, Long areaId) {
        List<Long> trabajadoresArea = usuarioService.obtenerTrabajadoresDeArea(areaId);
        
        for (Long trabajadorId : trabajadoresArea) {
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioDestinatarioId(trabajadorId);
            notificacion.setTitulo("Nuevo trámite recibido");
            notificacion.setMensaje("Nuevo trámite disponible en su área de trabajo");
            notificacion.setTipo(Notificacion.TipoNotificacion.TRAMITE_NUEVO);
            notificacion.setPrioridad(Notificacion.PrioridadNotificacion.NORMAL);
            notificacion.setTramiteRelacionadoId(tramiteId);
            notificacion.setAreaOrigenId(areaId);
            notificacion.setRutaDestino("/tramites/" + tramiteId);
            
            Notificacion saved = notificacionRepository.save(notificacion);
            
            // WebSocket
            enviarNotificacionWebSocket(saved, trabajadorId);
            
            // Email
            emailService.notificarNuevoTramiteATrabajador(trabajadorId, tramiteId);
        }
        
        log.info("Notificado nuevo trámite {} a {} trabajadores", tramiteId, trabajadoresArea.size());
    }
    
    // Notificar recepción de trámite al solicitante
    @Async
    public void notificarRecepcionTramite(Long tramiteId, Long trabajadorId, Long solicitanteId) {
        tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
            // Notificación al solicitante
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioDestinatarioId(solicitanteId);
            notificacion.setTitulo("Trámite recepcionado");
            notificacion.setMensaje(String.format(
                "Su trámite %s ha sido recepcionado por %s. Tiempo estimado: 3 días hábiles", 
                tramite.getCodigo(),
                usuarioService.obtenerNombreCompleto(trabajadorId)
            ));
            notificacion.setTipo(Notificacion.TipoNotificacion.TRAMITE_ASIGNADO);
            notificacion.setPrioridad(Notificacion.PrioridadNotificacion.NORMAL);
            notificacion.setTramiteRelacionadoId(tramiteId);
            notificacion.setUsuarioEmisorId(trabajadorId);
            notificacion.setRutaDestino("/tramites/" + tramiteId);
            
            Notificacion saved = notificacionRepository.save(notificacion);
            
            // WebSocket
            enviarNotificacionWebSocket(saved, solicitanteId);
            
            // Email con detalles
            Map<String, Object> datos = new HashMap<>();
            datos.put("tramiteCodigo", tramite.getCodigo());
            datos.put("trabajadorNombre", usuarioService.obtenerNombreCompleto(trabajadorId));
            datos.put("tiempoEstimado", "3 días hábiles");
            
            emailService.enviarCorreoRecepcion(solicitanteId, tramiteId, datos);
        });
    }
    
    // Notificar derivación de trámite
    @Async
    public void notificarDerivacionTramite(Long tramiteId, Long trabajadorAnterior, 
                                          Long trabajadorNuevo, String motivo) {
        tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
            // Notificar al nuevo trabajador
            Notificacion notifNuevo = new Notificacion();
            notifNuevo.setUsuarioDestinatarioId(trabajadorNuevo);
            notifNuevo.setTitulo("Trámite derivado");
            notifNuevo.setMensaje(String.format(
                "Se le ha derivado el trámite %s. Motivo: %s", 
                tramite.getCodigo(), motivo
            ));
            notifNuevo.setTipo(Notificacion.TipoNotificacion.TRAMITE_DERIVADO);
            notifNuevo.setPrioridad(Notificacion.PrioridadNotificacion.ALTA);
            notifNuevo.setTramiteRelacionadoId(tramiteId);
            notifNuevo.setUsuarioEmisorId(trabajadorAnterior);
            notifNuevo.setRutaDestino("/tramites/" + tramiteId);
            
            Notificacion savedNuevo = notificacionRepository.save(notifNuevo);
            enviarNotificacionWebSocket(savedNuevo, trabajadorNuevo);
            
            // Email al nuevo trabajador
            emailService.notificarDerivacionATrabajador(trabajadorNuevo, tramiteId, motivo);
            
            // Notificar al solicitante del cambio
            Notificacion notifSolicitante = new Notificacion();
            notifSolicitante.setUsuarioDestinatarioId(tramite.getUsuarioSolicitanteId());
            notifSolicitante.setTitulo("Trámite reasignado");
            notifSolicitante.setMensaje(String.format(
                "Su trámite %s ha sido reasignado a %s para mejor atención", 
                tramite.getCodigo(),
                usuarioService.obtenerNombreCompleto(trabajadorNuevo)
            ));
            notifSolicitante.setTipo(Notificacion.TipoNotificacion.TRAMITE_DERIVADO);
            notifSolicitante.setPrioridad(Notificacion.PrioridadNotificacion.NORMAL);
            notifSolicitante.setTramiteRelacionadoId(tramiteId);
            notifSolicitante.setRutaDestino("/tramites/" + tramiteId);
            
            Notificacion savedSolicitante = notificacionRepository.save(notifSolicitante);
            enviarNotificacionWebSocket(savedSolicitante, tramite.getUsuarioSolicitanteId());
            
            // Email al solicitante
            emailService.notificarReasignacionASolicitante(
                tramite.getUsuarioSolicitanteId(), 
                tramiteId, 
                trabajadorNuevo
            );
        });
    }
    
    // Notificar cambio de estado automático
    @Async
    public void notificarCambioEstadoAutomatico(Long tramiteId, String estadoAnterior, 
                                               String estadoNuevo) {
        tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
            String mensaje = generarMensajeEstado(estadoNuevo, tramite.getCodigo());
            
            // Notificar al solicitante
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioDestinatarioId(tramite.getUsuarioSolicitanteId());
            notificacion.setTitulo("Actualización de trámite");
            notificacion.setMensaje(mensaje);
            notificacion.setTipo(determinarTipoNotificacion(estadoNuevo));
            notificacion.setPrioridad(determinarPrioridad(estadoNuevo));
            notificacion.setTramiteRelacionadoId(tramiteId);
            notificacion.setRutaDestino("/tramites/" + tramiteId);
            
            Notificacion saved = notificacionRepository.save(notificacion);
            enviarNotificacionWebSocket(saved, tramite.getUsuarioSolicitanteId());
            
            // Email al solicitante
            emailService.notificarCambioEstado(
                tramite.getUsuarioSolicitanteId(), 
                tramiteId, 
                estadoAnterior, 
                estadoNuevo
            );
        });
    }
    
    // Notificar finalización con archivo adjunto
    @Async
    public void notificarFinalizacionConArchivo(Long tramiteId, String urlArchivo) {
        tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
            // Notificación al solicitante
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioDestinatarioId(tramite.getUsuarioSolicitanteId());
            notificacion.setTitulo("Trámite completado");
            notificacion.setMensaje(String.format(
                "Su trámite %s ha sido completado. Descargue el documento desde su panel.", 
                tramite.getCodigo()
            ));
            notificacion.setTipo(Notificacion.TipoNotificacion.TRAMITE_APROBADO);
            notificacion.setPrioridad(Notificacion.PrioridadNotificacion.ALTA);
            notificacion.setTramiteRelacionadoId(tramiteId);
            notificacion.setRutaDestino("/tramites/" + tramiteId);
            
            Map<String, String> metadatos = new HashMap<>();
            metadatos.put("archivoUrl", urlArchivo);
            notificacion.setMetadatos(metadatos.toString());
            
            Notificacion saved = notificacionRepository.save(notificacion);
            enviarNotificacionWebSocket(saved, tramite.getUsuarioSolicitanteId());
            
            // Email con archivo adjunto
            emailService.enviarCorreoFinalizacionConArchivo(
                tramite.getUsuarioSolicitanteId(), 
                tramiteId, 
                urlArchivo
            );
        });
    }
    
    // Verificar capacidad del trabajador
    public boolean puedeAsumirMasTramites(Long trabajadorId) {
        // Contar trámites activos del trabajador
        Long tramitesActivos = tramiteRepository.countByUsuarioAsignadoIdAndEstado(
            trabajadorId, 
            com.example.demo.model.Tramite.EstadoTramite.EN_PROCESO
        );
        
        return tramitesActivos < MAX_TRAMITES_POR_TRABAJADOR;
    }
    
    // Obtener trabajador con menor carga
    public Long obtenerTrabajadorConMenorCarga(Long areaId) {
        List<Long> trabajadores = usuarioService.obtenerTrabajadoresDeArea(areaId);
        Long trabajadorIdeal = null;
        Long menorCarga = Long.MAX_VALUE;
        
        for (Long trabajadorId : trabajadores) {
            Long carga = tramiteRepository.countByUsuarioAsignadoIdAndEstado(
                trabajadorId, 
                com.example.demo.model.Tramite.EstadoTramite.EN_PROCESO
            );
            
            if (carga < menorCarga && carga < MAX_TRAMITES_POR_TRABAJADOR) {
                menorCarga = carga;
                trabajadorIdeal = trabajadorId;
            }
        }
        
        return trabajadorIdeal;
    }
    
    // CRUD para admin
    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerTodasNotificaciones(Pageable pageable) {
        return notificacionRepository.findAll(pageable).map(this::convertirAResponse);
    }
    
    public NotificacionResponse crearNotificacion(NotificacionRequest request) {
        // Determinar destinatarios basado en el tipo de envío
        List<Long> destinatarios = determinarDestinatarios(request);
        
        if (destinatarios.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron destinatarios válidos para la notificación");
        }
        
        // Crear notificación para cada destinatario
        NotificacionResponse responseEjemplo = null;
        
        for (Long destinatarioId : destinatarios) {
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioDestinatarioId(destinatarioId);
            notificacion.setTitulo(request.getTitulo());
            notificacion.setMensaje(request.getMensaje());
            notificacion.setTipo(Notificacion.TipoNotificacion.valueOf(request.getTipo()));
            notificacion.setPrioridad(Notificacion.PrioridadNotificacion.valueOf(request.getPrioridad()));
            notificacion.setTramiteRelacionadoId(request.getTramiteRelacionadoId());
            notificacion.setAreaOrigenId(request.getAreaOrigenId());
            notificacion.setUsuarioEmisorId(request.getUsuarioEmisorId());
            notificacion.setRutaDestino(request.getRutaDestino());
            notificacion.setFechaVencimiento(request.getFechaVencimiento());
            notificacion.setMetadatos(request.getMetadatos());
            
            Notificacion saved = notificacionRepository.save(notificacion);
            
            // Enviar por WebSocket
            enviarNotificacionWebSocket(saved, destinatarioId);
            
            // Guardar una respuesta de ejemplo para retornar
            if (responseEjemplo == null) {
                responseEjemplo = convertirAResponse(saved);
            }
        }
        
        log.info("Notificación creada para {} destinatarios: {}", destinatarios.size(), request.getTitulo());
        return responseEjemplo;
    }
    
    public NotificacionResponse actualizarNotificacion(Long id, NotificacionRequest request) {
        return notificacionRepository.findById(id)
            .map(notificacion -> {
                notificacion.setTitulo(request.getTitulo());
                notificacion.setMensaje(request.getMensaje());
                notificacion.setTipo(Notificacion.TipoNotificacion.valueOf(request.getTipo()));
                notificacion.setPrioridad(Notificacion.PrioridadNotificacion.valueOf(request.getPrioridad()));
                return convertirAResponse(notificacionRepository.save(notificacion));
            })
            .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
    }
    
    public void eliminarNotificacion(Long id) {
        notificacionRepository.deleteById(id);
        log.info("Notificación {} eliminada por admin", id);
    }
    
    public void eliminarNotificacionUsuario(Long id, Long usuarioId) {
        Notificacion notificacion = notificacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
        
        if (!notificacion.getUsuarioDestinatarioId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para eliminar esta notificación");
        }
        
        notificacionRepository.deleteById(id);
        log.info("Notificación {} eliminada por usuario {}", id, usuarioId);
    }
    
    // Obtener notificaciones de un usuario
    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesUsuario(Long usuarioId, Pageable pageable) {
        Page<Notificacion> notificaciones = notificacionRepository
            .findByUsuarioDestinatarioIdOrderByFechaCreacionDesc(usuarioId, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }
    
    // Obtener una notificación por ID
    @Transactional(readOnly = true)
    public NotificacionResponse obtenerNotificacionPorId(Long id, Long usuarioId) {
        Notificacion notificacion = notificacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
        
        // Verificar que la notificación pertenece al usuario
        if (!notificacion.getUsuarioDestinatarioId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para ver esta notificación");
        }
        
        return convertirAResponse(notificacion);
    }
    
    // Obtener notificaciones no leídas
    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesNoLeidas(Long usuarioId, Pageable pageable) {
        Page<Notificacion> notificaciones = notificacionRepository
            .findByUsuarioDestinatarioIdAndEsLeidaFalseOrderByFechaCreacionDesc(usuarioId, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }
    
    // Contar notificaciones no leídas
    @Transactional(readOnly = true)
    public Long contarNotificacionesNoLeidas(Long usuarioId) {
        return notificacionRepository.countByUsuarioDestinatarioIdAndEsLeidaFalse(usuarioId);
    }
    
    // Marcar notificación como leída
    public void marcarComoLeida(Long notificacionId, Long usuarioId) {
        int updated = notificacionRepository.marcarComoLeida(notificacionId, usuarioId, LocalDateTime.now());
        if (updated > 0) {
            log.info("Notificación {} marcada como leída", notificacionId);
            
            // WebSocket actualización
            messagingTemplate.convertAndSendToUser(
                usuarioId.toString(), 
                "/queue/notificaciones/leida", 
                notificacionId
            );
        }
    }
    
    // Marcar todas como leídas
    public void marcarTodasComoLeidas(Long usuarioId) {
        int updated = notificacionRepository.marcarTodasComoLeidas(usuarioId, LocalDateTime.now());
        log.info("{} notificaciones marcadas como leídas", updated);
        
        // WebSocket actualización
        messagingTemplate.convertAndSendToUser(
            usuarioId.toString(), 
            "/queue/notificaciones/todas-leidas", 
            true
        );
    }
    
    // Métodos auxiliares
    private void enviarNotificacionWebSocket(Notificacion notificacion, Long usuarioId) {
        try {
            NotificacionResponse response = convertirAResponse(notificacion);
            messagingTemplate.convertAndSendToUser(
                usuarioId.toString(),
                "/queue/notificaciones",
                response
            );
            log.debug("Notificación WebSocket enviada a usuario {}", usuarioId);
        } catch (Exception e) {
            log.error("Error enviando notificación WebSocket: ", e);
        }
    }
    
    private NotificacionResponse convertirAResponse(Notificacion notificacion) {
        return NotificacionResponse.builder()
            .id(notificacion.getId())
            .titulo(notificacion.getTitulo())
            .mensaje(notificacion.getMensaje())
            .tipo(notificacion.getTipo().name())
            .prioridad(notificacion.getPrioridad().name())
            .esLeida(notificacion.getEsLeida())
            .rutaDestino(notificacion.getRutaDestino())
            .fechaCreacion(notificacion.getFechaCreacion())
            .fechaLectura(notificacion.getFechaLectura())
            .fechaVencimiento(notificacion.getFechaVencimiento())
            .metadatos(notificacion.getMetadatos())
            .build();
    }
    
    private String generarMensajeEstado(String estado, String codigoTramite) {
        return switch (estado) {
            case "EN_PROCESO" -> "Su trámite " + codigoTramite + " está siendo procesado";
            case "FINALIZADO", "APROBADO" -> "Su trámite " + codigoTramite + " ha sido completado exitosamente";
            case "OBSERVADO" -> "Su trámite " + codigoTramite + " tiene observaciones pendientes";
            case "RECHAZADO" -> "Su trámite " + codigoTramite + " ha sido rechazado";
            default -> "Su trámite " + codigoTramite + " ha cambiado de estado";
        };
    }
    
    private Notificacion.TipoNotificacion determinarTipoNotificacion(String estado) {
        return switch (estado) {
            case "EN_PROCESO" -> Notificacion.TipoNotificacion.SISTEMA;
            case "FINALIZADO", "APROBADO" -> Notificacion.TipoNotificacion.TRAMITE_APROBADO;
            case "RECHAZADO" -> Notificacion.TipoNotificacion.TRAMITE_RECHAZADO;
            case "OBSERVADO" -> Notificacion.TipoNotificacion.TRAMITE_OBSERVADO;
            default -> Notificacion.TipoNotificacion.SISTEMA;
        };
    }
    
    private Notificacion.PrioridadNotificacion determinarPrioridad(String estado) {
        return switch (estado) {
            case "FINALIZADO", "APROBADO", "RECHAZADO" -> Notificacion.PrioridadNotificacion.ALTA;
            case "OBSERVADO" -> Notificacion.PrioridadNotificacion.NORMAL;
            default -> Notificacion.PrioridadNotificacion.BAJA;
        };
    }
    
    // Obtener notificaciones filtradas
    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesFiltradas(
            Long usuarioId, String tipo, String prioridad, Boolean esLeida, 
            Long tramiteId, Pageable pageable) {
        
        // Convertir strings a enums
        Notificacion.TipoNotificacion tipoEnum = null;
        if (tipo != null && !tipo.isEmpty()) {
            try {
                tipoEnum = Notificacion.TipoNotificacion.valueOf(tipo);
            } catch (IllegalArgumentException e) {
                // Ignorar tipo inválido
            }
        }
        
        Notificacion.PrioridadNotificacion prioridadEnum = null;
        if (prioridad != null && !prioridad.isEmpty()) {
            try {
                prioridadEnum = Notificacion.PrioridadNotificacion.valueOf(prioridad);
            } catch (IllegalArgumentException e) {
                // Ignorar prioridad inválida
            }
        }
        
        Page<Notificacion> notificaciones = notificacionRepository
            .findWithFilters(usuarioId, esLeida, tipoEnum, prioridadEnum, null, null, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }
    
    // Obtener notificaciones por trámite
    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesPorTramite(
            Long usuarioId, Long tramiteId, Pageable pageable) {
        
        Page<Notificacion> notificaciones = notificacionRepository
            .findByUsuarioDestinatarioIdAndTramiteRelacionadoIdOrderByFechaCreacionDesc(
                usuarioId, tramiteId, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }
    
    // Limpiar notificaciones antiguas
    public Integer limpiarNotificacionesAntiguas(int diasAntiguedad) {
        LocalDateTime fechaLimite = LocalDateTime.now().minusDays(diasAntiguedad);
        int eliminadas = notificacionRepository.eliminarNotificacionesAntiguas(fechaLimite);
        log.info("Eliminadas {} notificaciones anteriores a {}", eliminadas, fechaLimite);
        return eliminadas;
    }
    
    // Reenviar notificación por email
    public void reenviarNotificacionPorEmail(Long notificacionId, Long usuarioId) {
        notificacionRepository.findById(notificacionId)
            .filter(n -> n.getUsuarioDestinatarioId().equals(usuarioId))
            .ifPresentOrElse(
                notificacion -> {
                    // Reenviar por email
                    emailService.reenviarNotificacion(notificacion);
                    log.info("Notificación {} reenviada por email", notificacionId);
                },
                () -> {
                    throw new RuntimeException("Notificación no encontrada o sin permisos");
                }
            );
    }
    
    // Estadísticas de notificaciones (ADMIN)
    @Transactional(readOnly = true)
    public Object obtenerEstadisticasNotificaciones() {
        Map<String, Object> estadisticas = new HashMap<>();
        
        // Total de notificaciones
        estadisticas.put("totalNotificaciones", notificacionRepository.count());
        
        // Por estado de lectura
        estadisticas.put("noLeidas", notificacionRepository.countByEsLeidaFalse());
        estadisticas.put("leidas", notificacionRepository.countByEsLeidaTrue());
        
        // Por tipo
        for (Notificacion.TipoNotificacion tipo : Notificacion.TipoNotificacion.values()) {
            estadisticas.put("tipo_" + tipo.name(), 
                notificacionRepository.countByTipo(tipo));
        }
        
        // Por prioridad
        for (Notificacion.PrioridadNotificacion prioridad : Notificacion.PrioridadNotificacion.values()) {
            estadisticas.put("prioridad_" + prioridad.name(), 
                notificacionRepository.countByPrioridad(prioridad));
        }
        
        // Notificaciones del último mes
        LocalDateTime mesAnterior = LocalDateTime.now().minusMonths(1);
        estadisticas.put("ultimoMes", 
            notificacionRepository.countByFechaCreacionAfter(mesAnterior));
        
        return estadisticas;
    }
    
    // Obtener configuración de notificaciones del usuario
    @Transactional(readOnly = true)
    public Object obtenerConfiguracionUsuario(Long usuarioId) {
        Map<String, Object> configuracion = new HashMap<>();
        
        // Configuración por defecto (esto debería estar en una entidad ConfiguracionUsuario)
        configuracion.put("recibirEmails", true);
        configuracion.put("recibirWebSocket", true);
        configuracion.put("recibirPorTipo", Map.of(
            "TRAMITE_CREADO", true,
            "TRAMITE_APROBADO", true,
            "TRAMITE_RECHAZADO", true,
            "TRAMITE_OBSERVADO", true,
            "DERIVACION", true,
            "SISTEMA", true
        ));
        configuracion.put("frecuenciaResumen", "DIARIO");
        
        return configuracion;
    }
    
    // Actualizar configuración de notificaciones del usuario
    public void actualizarConfiguracionUsuario(Long usuarioId, Object configuracion) {
        // Esto debería guardar en una entidad ConfiguracionUsuario
        // Por ahora solo log
        log.info("Configuración de notificaciones actualizada para usuario {}: {}", 
            usuarioId, configuracion);
    }
    
    // Método auxiliar para determinar destinatarios de la notificación
    private List<Long> determinarDestinatarios(NotificacionRequest request) {
        List<Long> destinatarios = new java.util.ArrayList<>();
        
        if (request.getEnviarATodos() != null && request.getEnviarATodos()) {
            // Enviar a todos los usuarios activos del sistema
            destinatarios = usuarioService.obtenerTodosLosUsuariosActivos();
            
        } else if (request.getRoleDestinatario() != null && !request.getRoleDestinatario().trim().isEmpty()) {
            // Enviar a todos los usuarios de un rol específico
            destinatarios = usuarioService.obtenerUsuariosPorRol(request.getRoleDestinatario());
            
        } else if (request.getUsuarioDestinatarioId() != null) {
            // Enviar a un usuario específico
            destinatarios.add(request.getUsuarioDestinatarioId());
        }
        
        return destinatarios;
    }
}