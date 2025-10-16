package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.NotificacionRequest;
import com.example.demo.dto.NotificacionResponse;
import com.example.demo.model.Notificacion;
import com.example.demo.repository.NotificacionRepository;
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificacionService {
    
    private final NotificacionRepository notificacionRepository;
    private final TramiteRepository tramiteRepository;
    private final UsuarioRepository usuarioRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final EmailService emailService;
    private final UsuarioService usuarioService;

    private static final int MAX_TRAMITES_POR_TRABAJADOR = 20;

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

            enviarNotificacionWebSocket(saved, trabajadorId);
            emailService.notificarNuevoTramiteATrabajador(trabajadorId, tramiteId);
        }
    }

    @Async
    public void notificarAutoasignacionTramite(Long tramiteId, Long trabajadorId, Long solicitanteId) {
        tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioDestinatarioId(trabajadorId);
            notificacion.setTitulo("Te has asignado un tramite");
            notificacion.setMensaje(String.format(
                "Te has asignado el tramite %s. Recuerda atenderlo dentro del plazo establecido.",
                tramite.getCodigo()
            ));
            notificacion.setTipo(Notificacion.TipoNotificacion.TRAMITE_ASIGNADO);
            notificacion.setPrioridad(Notificacion.PrioridadNotificacion.NORMAL);
            notificacion.setTramiteRelacionadoId(tramiteId);
            notificacion.setUsuarioEmisorId(trabajadorId);
            notificacion.setRutaDestino("/tramites/" + tramiteId);

            Notificacion saved = notificacionRepository.save(notificacion);
            enviarNotificacionWebSocket(saved, trabajadorId);

            emailService.notificarAutoasignacionATrabajador(trabajadorId, tramiteId);
        });
    }

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

            enviarNotificacionWebSocket(saved, solicitanteId);

            Map<String, Object> datos = new HashMap<>();
            datos.put("tramiteCodigo", tramite.getCodigo());
            datos.put("trabajadorNombre", usuarioService.obtenerNombreCompleto(trabajadorId));
            datos.put("tiempoEstimado", "3 días hábiles");
            
            emailService.enviarCorreoRecepcion(solicitanteId, tramiteId, datos);
        });
    }

    @Async
    public boolean notificarRespuestaTramite(Long tramiteId, Long solicitanteId, Long administrativoId,
                                            String respuesta, String asunto, Integer cantidadDocumentos) {
        try {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                String nombreResponsable = usuarioRepository.findById(administrativoId)
                    .map(admin -> admin.getNombre() + " " + admin.getApellidos())
                    .orElse("el administrativo");

                Notificacion notificacion = new Notificacion();
                notificacion.setUsuarioDestinatarioId(solicitanteId);
                notificacion.setTitulo("Su trámite ha sido respondido");

                String mensajeBase = String.format(
                    "Su trámite %s ha sido respondido por %s.",
                    tramite.getCodigo(),
                    nombreResponsable
                );

                if (cantidadDocumentos != null && cantidadDocumentos > 0) {
                    String mensajeDocumentos = cantidadDocumentos == 1
                        ? " Se ha adjuntado 1 documento en la respuesta."
                        : String.format(" Se han adjuntado %d documentos en la respuesta.", cantidadDocumentos);
                    mensajeBase += mensajeDocumentos;
                }

                notificacion.setMensaje(mensajeBase);
                notificacion.setTipo(Notificacion.TipoNotificacion.TRAMITE_FINALIZADO);
                notificacion.setPrioridad(Notificacion.PrioridadNotificacion.ALTA);
                notificacion.setTramiteRelacionadoId(tramiteId);
                notificacion.setUsuarioEmisorId(administrativoId);
                notificacion.setRutaDestino("/tramites/" + tramiteId);

                Notificacion saved = notificacionRepository.save(notificacion);

                enviarNotificacionWebSocket(saved, solicitanteId);

                Map<String, Object> datos = new HashMap<>();
                datos.put("tramiteCodigo", tramite.getCodigo());
                datos.put("tramiteTitulo", tramite.getTitulo());
                datos.put("respuesta", respuesta);
                datos.put("asunto", asunto);
                datos.put("fechaRespuesta", LocalDateTime.now());

                String nombreAdministrativo = usuarioService.obtenerNombreCompleto(administrativoId);
                datos.put("administrativoNombre", nombreAdministrativo);
                datos.put("cantidadDocumentos", cantidadDocumentos != null ? cantidadDocumentos : 0);

                emailService.enviarCorreoRespuestaTramite(solicitanteId, tramiteId, datos);
            });

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Async
    public void notificarDerivacionTramite(Long tramiteId, Long trabajadorAnterior, 
                                          Long trabajadorNuevo, String motivo) {
        tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
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
            emailService.notificarDerivacionATrabajador(trabajadorNuevo, tramiteId, motivo);

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
            emailService.notificarReasignacionASolicitante(
                tramite.getUsuarioSolicitanteId(),
                tramiteId,
                trabajadorNuevo
            );
        });
    }

    @Async
    public void notificarCambioEstadoAutomatico(Long tramiteId, String estadoAnterior, 
                                               String estadoNuevo) {
        tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
            String mensaje = generarMensajeEstado(estadoNuevo, tramite.getCodigo());

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
            emailService.notificarCambioEstado(
                tramite.getUsuarioSolicitanteId(),
                tramiteId,
                estadoAnterior,
                estadoNuevo
            );
        });
    }

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
            emailService.enviarCorreoFinalizacionConArchivo(
                tramite.getUsuarioSolicitanteId(),
                tramiteId,
                urlArchivo
            );
        });
    }

    public boolean puedeAsumirMasTramites(Long trabajadorId) {
        Long tramitesActivos = tramiteRepository.countByUsuarioAsignadoIdAndEstado(
            trabajadorId, 
            com.example.demo.model.Tramite.EstadoTramite.EN_PROCESO
        );
        
        return tramitesActivos < MAX_TRAMITES_POR_TRABAJADOR;
    }

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

    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerTodasNotificaciones(Pageable pageable) {
        return notificacionRepository.findAll(pageable).map(this::convertirAResponse);
    }

    public NotificacionResponse crearNotificacion(NotificacionRequest request) {
        List<Long> destinatarios = determinarDestinatarios(request);
        
        if (destinatarios.isEmpty()) {
            throw new IllegalArgumentException("No se encontraron destinatarios válidos para la notificación");
        }

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

            enviarNotificacionWebSocket(saved, destinatarioId);

            if (responseEjemplo == null) {
                responseEjemplo = convertirAResponse(saved);
            }
        }

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
    }
    
    public void eliminarNotificacionUsuario(Long id, Long usuarioId) {
        Notificacion notificacion = notificacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));
        
        if (!notificacion.getUsuarioDestinatarioId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para eliminar esta notificación");
        }

        notificacionRepository.deleteById(id);
    }

    public void eliminarTodasNotificacionesUsuario(Long usuarioId) {
        List<Notificacion> notificaciones = notificacionRepository
            .findByUsuarioDestinatarioIdOrderByFechaCreacionDesc(usuarioId,
                org.springframework.data.domain.Pageable.unpaged()).getContent();

        if (!notificaciones.isEmpty()) {
            notificacionRepository.deleteAll(notificaciones);
        }
    }

    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesUsuario(Long usuarioId, Pageable pageable) {
        Page<Notificacion> notificaciones = notificacionRepository
            .findByUsuarioDestinatarioIdOrderByFechaCreacionDesc(usuarioId, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }

    @Transactional(readOnly = true)
    public NotificacionResponse obtenerNotificacionPorId(Long id, Long usuarioId) {
        Notificacion notificacion = notificacionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));

        if (!notificacion.getUsuarioDestinatarioId().equals(usuarioId)) {
            throw new RuntimeException("No tiene permisos para ver esta notificación");
        }

        return convertirAResponse(notificacion);
    }

    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesNoLeidas(Long usuarioId, Pageable pageable) {
        Page<Notificacion> notificaciones = notificacionRepository
            .findByUsuarioDestinatarioIdAndEsLeidaFalseOrderByFechaCreacionDesc(usuarioId, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }

    @Transactional(readOnly = true)
    public Long contarNotificacionesNoLeidas(Long usuarioId) {
        return notificacionRepository.countByUsuarioDestinatarioIdAndEsLeidaFalse(usuarioId);
    }

    public void marcarComoLeida(Long notificacionId, Long usuarioId) {
        int updated = notificacionRepository.marcarComoLeida(notificacionId, usuarioId, LocalDateTime.now());
        if (updated > 0) {
            messagingTemplate.convertAndSendToUser(
                usuarioId.toString(),
                "/queue/notificaciones/leida",
                notificacionId
            );
        }
    }

    public void marcarTodasComoLeidas(Long usuarioId) {
        notificacionRepository.marcarTodasComoLeidas(usuarioId, LocalDateTime.now());

        messagingTemplate.convertAndSendToUser(
            usuarioId.toString(), 
            "/queue/notificaciones/todas-leidas", 
            true
        );
    }

    private void enviarNotificacionWebSocket(Notificacion notificacion, Long usuarioId) {
        try {
            NotificacionResponse response = convertirAResponse(notificacion);
            messagingTemplate.convertAndSendToUser(
                usuarioId.toString(),
                "/queue/notificaciones",
                response
            );
        } catch (Exception e) {
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
            .referenciaId(notificacion.getTramiteRelacionadoId()) // Mapear tramiteRelacionadoId como referenciaId
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

    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesFiltradas(
            Long usuarioId, String tipo, String prioridad, Boolean esLeida,
            Long tramiteId, Pageable pageable) {

        Notificacion.TipoNotificacion tipoEnum = null;
        if (tipo != null && !tipo.isEmpty()) {
            try {
                tipoEnum = Notificacion.TipoNotificacion.valueOf(tipo);
            } catch (IllegalArgumentException e) {
            }
        }

        Notificacion.PrioridadNotificacion prioridadEnum = null;
        if (prioridad != null && !prioridad.isEmpty()) {
            try {
                prioridadEnum = Notificacion.PrioridadNotificacion.valueOf(prioridad);
            } catch (IllegalArgumentException e) {
            }
        }
        
        Page<Notificacion> notificaciones = notificacionRepository
            .findWithFilters(usuarioId, esLeida, tipoEnum, prioridadEnum, null, null, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }

    @Transactional(readOnly = true)
    public Page<NotificacionResponse> obtenerNotificacionesPorTramite(
            Long usuarioId, Long tramiteId, Pageable pageable) {
        
        Page<Notificacion> notificaciones = notificacionRepository
            .findByUsuarioDestinatarioIdAndTramiteRelacionadoIdOrderByFechaCreacionDesc(
                usuarioId, tramiteId, pageable);
        
        return notificaciones.map(this::convertirAResponse);
    }

    public Integer limpiarNotificacionesAntiguas(int diasAntiguedad) {
        LocalDateTime fechaLimite = LocalDateTime.now().minusDays(diasAntiguedad);
        int eliminadas = notificacionRepository.eliminarNotificacionesAntiguas(fechaLimite);
        return eliminadas;
    }

    public void reenviarNotificacionPorEmail(Long notificacionId, Long usuarioId) {
        notificacionRepository.findById(notificacionId)
            .filter(n -> n.getUsuarioDestinatarioId().equals(usuarioId))
            .ifPresentOrElse(
                notificacion -> {
                    emailService.reenviarNotificacion(notificacion);
                },
                () -> {
                    throw new RuntimeException("Notificación no encontrada o sin permisos");
                }
            );
    }

    @Transactional(readOnly = true)
    public Object obtenerEstadisticasNotificaciones() {
        Map<String, Object> estadisticas = new HashMap<>();

        estadisticas.put("totalNotificaciones", notificacionRepository.count());
        estadisticas.put("noLeidas", notificacionRepository.countByEsLeidaFalse());
        estadisticas.put("leidas", notificacionRepository.countByEsLeidaTrue());

        for (Notificacion.TipoNotificacion tipo : Notificacion.TipoNotificacion.values()) {
            estadisticas.put("tipo_" + tipo.name(), 
                notificacionRepository.countByTipo(tipo));
        }

        for (Notificacion.PrioridadNotificacion prioridad : Notificacion.PrioridadNotificacion.values()) {
            estadisticas.put("prioridad_" + prioridad.name(), 
                notificacionRepository.countByPrioridad(prioridad));
        }

        LocalDateTime mesAnterior = LocalDateTime.now().minusMonths(1);
        estadisticas.put("ultimoMes", 
            notificacionRepository.countByFechaCreacionAfter(mesAnterior));
        
        return estadisticas;
    }

    @Transactional(readOnly = true)
    public Object obtenerConfiguracionUsuario(Long usuarioId) {
        Map<String, Object> configuracion = new HashMap<>();

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

    public void actualizarConfiguracionUsuario(Long usuarioId, Object configuracion) {
    }

    private List<Long> determinarDestinatarios(NotificacionRequest request) {
        List<Long> destinatarios = new java.util.ArrayList<>();

        if (request.getEnviarATodos() != null && request.getEnviarATodos()) {
            destinatarios = usuarioService.obtenerTodosLosUsuariosActivos();
        } else if (request.getRoleDestinatario() != null && !request.getRoleDestinatario().trim().isEmpty()) {
            destinatarios = usuarioService.obtenerUsuariosPorRol(request.getRoleDestinatario());
        } else if (request.getUsuarioDestinatarioId() != null) {
            destinatarios.add(request.getUsuarioDestinatarioId());
        }

        return destinatarios;
    }

    public void crearNotificacionRechazoTramite(Long usuarioId, Long tramiteId, String codigoTramite, String asuntoTramite, String motivoRechazo) {
        try {
            Notificacion notificacion = new Notificacion();
            notificacion.setUsuarioDestinatarioId(usuarioId);
            notificacion.setTipo(Notificacion.TipoNotificacion.TRAMITE_RECHAZADO);
            notificacion.setPrioridad(Notificacion.PrioridadNotificacion.ALTA);
            notificacion.setTitulo("Trámite Rechazado - " + codigoTramite);
            notificacion.setMensaje(String.format("Su trámite '%s' (Código: %s) ha sido rechazado. Motivo: %s",
                asuntoTramite, codigoTramite, motivoRechazo));
            notificacion.setEsLeida(false);
            notificacion.setFechaCreacion(LocalDateTime.now());
            notificacion.setRutaDestino("/usuario/mis-tramites?codigo=" + codigoTramite);
            notificacion.setMetadatos("{\"tramiteId\": " + tramiteId + ", \"accion\": \"RECHAZADO\"}");
            notificacion.setTramiteRelacionadoId(tramiteId);

            notificacionRepository.save(notificacion);
        } catch (Exception e) {
        }
    }
}