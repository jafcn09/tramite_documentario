package com.example.demo.service;

import com.example.demo.model.Tramite;
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.File;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    private final UsuarioRepository usuarioRepository;
    private final TramiteRepository tramiteRepository;
    
    @Value("${spring.mail.username:noreply@tramites.com}")
    private String fromEmail;
    
    @Value("${app.url:http://localhost:4200}")
    private String appUrl;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    
    // Enviar correo de respuesta de trámite con template HTML mejorado
    @Async
    public void enviarCorreoRespuestaTramite(Long solicitanteId, Long tramiteId, Map<String, Object> datos) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                    
                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject(datos.get("asunto").toString());
                    
                    // Template HTML mejorado
                    String htmlContent = construirTemplateRespuesta(solicitante, tramite, datos);
                    helper.setText(htmlContent, true);
                    
                    mailSender.send(message);
                    log.info("Email de respuesta enviado a {} para trámite {}", solicitante.getCorreo(), tramite.getCodigo());
                } catch (MessagingException e) {
                    log.error("Error al enviar email de respuesta: ", e);
                }
            });
        });
    }
    
    private String construirTemplateRespuesta(com.example.demo.model.Usuario solicitante, Tramite tramite, Map<String, Object> datos) {
        return "<!DOCTYPE html>" +
            "<html lang='es'>" +
            "<head>" +
            "    <meta charset='UTF-8'>" +
            "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
            "    <style>" +
            "        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }" +
            "        .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }" +
            "        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }" +
            "        .header h1 { margin: 0; font-size: 28px; }" +
            "        .content { padding: 30px; }" +
            "        .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 5px; }" +
            "        .response-box { background: #e8f5e9; border: 1px solid #4caf50; padding: 20px; margin: 20px 0; border-radius: 8px; }" +
            "        .response-box h3 { color: #2e7d32; margin-top: 0; }" +
            "        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }" +
            "        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }" +
            "        .badge { display: inline-block; padding: 5px 10px; background: #667eea; color: white; border-radius: 15px; font-size: 12px; }" +
            "    </style>" +
            "</head>" +
            "<body>" +
            "    <div class='container'>" +
            "        <div class='header'>" +
            "            <h1>✅ Trámite Respondido</h1>" +
            "            <p style='margin: 10px 0 0 0; opacity: 0.9;'>Su solicitud ha sido procesada</p>" +
            "        </div>" +
            "        <div class='content'>" +
            "            <p>Estimado/a <strong>" + solicitante.getNombre() + " " + solicitante.getApellidos() + "</strong>,</p>" +
            "            <p>Nos complace informarle que su trámite ha sido <strong>respondido y procesado</strong> exitosamente.</p>" +
            "            " +
            "            <div class='info-box'>" +
            "                <strong>📋 Detalles del Trámite:</strong><br>" +
            "                <table style='margin-top: 10px; width: 100%;'>" +
            "                    <tr><td style='padding: 5px 0;'><strong>Código:</strong></td><td>" + tramite.getCodigo() + "</td></tr>" +
            "                    <tr><td style='padding: 5px 0;'><strong>Título:</strong></td><td>" + tramite.getTitulo() + "</td></tr>" +
            "                    <tr><td style='padding: 5px 0;'><strong>Tipo:</strong></td><td>" + tramite.getTipo() + "</td></tr>" +
            "                    <tr><td style='padding: 5px 0;'><strong>Estado:</strong></td><td><span class='badge'>FINALIZADO</span></td></tr>" +
            "                    <tr><td style='padding: 5px 0;'><strong>Respondido por:</strong></td><td>" + datos.get("administrativoNombre") + "</td></tr>" +
            "                    <tr><td style='padding: 5px 0;'><strong>Fecha de respuesta:</strong></td><td>" + datos.get("fechaRespuesta") + "</td></tr>" +
            "                </table>" +
            "            </div>" +
            "            " +
            "            <div class='response-box'>" +
            "                <h3>📝 Respuesta del Administrativo:</h3>" +
            "                <p>" + datos.get("respuesta") + "</p>" +
            "            </div>" +
            "            " +
            "            <p>Para ver más detalles y descargar documentos adjuntos, puede acceder al sistema:</p>" +
            "            <center>" +
            "                <a href='" + appUrl + "/tramites/" + tramite.getId() + "' class='button'>Ver Trámite Completo</a>" +
            "            </center>" +
            "            " +
            "            <p style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;'>" +
            "                Si tiene alguna consulta adicional, no dude en contactarnos a través del sistema." +
            "            </p>" +
            "        </div>" +
            "        <div class='footer'>" +
            "            <p>Este es un correo automático del Sistema de Trámite Documentario</p>" +
            "            <p>Por favor, no responda a este correo</p>" +
            "            <p>© 2024 Sistema de Trámites - Todos los derechos reservados</p>" +
            "        </div>" +
            "    </div>" +
            "</body>" +
            "</html>";
    }
    
    // Notificar nuevo trámite a trabajador
    @Async
    public void notificarNuevoTramiteATrabajador(Long trabajadorId, Long tramiteId) {
        usuarioRepository.findById(trabajadorId).ifPresent(trabajador -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    SimpleMailMessage message = new SimpleMailMessage();
                    message.setFrom(fromEmail);
                    message.setTo(trabajador.getCorreo());
                    message.setSubject("Nuevo trámite en su área - " + tramite.getCodigo());
                    message.setText(String.format(
                        "Estimado/a %s %s,\n\n" +
                        "Se ha recibido un nuevo trámite en su área de trabajo.\n\n" +
                        "Detalles del trámite:\n" +
                        "- Código: %s\n" +
                        "- Tipo: %s\n" +
                        "- Prioridad: %s\n" +
                        "- Solicitante: %s\n" +
                        "- Fecha de recepción: %s\n\n" +
                        "Por favor, ingrese al sistema para revisar y procesar este trámite:\n" +
                        "%s/tramites/%d\n\n" +
                        "Recuerde que tiene un máximo de 3 días hábiles para procesarlo.\n\n" +
                        "Atentamente,\n" +
                        "Sistema de Trámite Documentario",
                        trabajador.getNombre(),
                        trabajador.getApellidos(),
                        tramite.getCodigo(),
                        tramite.getTipo(),
                        tramite.getPrioridad(),
                        obtenerNombreSolicitante(tramite.getUsuarioSolicitanteId()),
                        tramite.getFechaCreacion().format(DATE_FORMATTER),
                        appUrl,
                        tramiteId
                    ));
                    
                    mailSender.send(message);
                    log.info("Email enviado a trabajador {} sobre nuevo trámite {}", trabajadorId, tramiteId);
                } catch (Exception e) {
                    log.error("Error enviando email a trabajador {}: {}", trabajadorId, e.getMessage());
                }
            });
        });
    }
    
    // Enviar correo de recepción al solicitante
    @Async
    public void enviarCorreoRecepcion(Long solicitanteId, Long tramiteId, Map<String, Object> datos) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(solicitante.getCorreo());
                message.setSubject("Su trámite ha sido recepcionado - " + datos.get("tramiteCodigo"));
                message.setText(String.format(
                    "Estimado/a %s %s,\n\n" +
                    "Su trámite con código %s ha sido recepcionado exitosamente.\n\n" +
                    "Información del proceso:\n" +
                    "- Personal asignado: %s\n" +
                    "- Tiempo estimado: %s\n" +
                    "- Estado actual: EN REVISIÓN\n\n" +
                    "Puede hacer seguimiento de su trámite en:\n" +
                    "%s/tramites/%d\n\n" +
                    "Le notificaremos cualquier cambio en el estado de su trámite.\n\n" +
                    "Atentamente,\n" +
                    "Sistema de Trámite Documentario",
                    solicitante.getNombre(),
                    solicitante.getApellidos(),
                    datos.get("tramiteCodigo"),
                    datos.get("trabajadorNombre"),
                    datos.get("tiempoEstimado"),
                    appUrl,
                    tramiteId
                ));
                
                mailSender.send(message);
                log.info("Email de recepción enviado a solicitante {}", solicitanteId);
            } catch (Exception e) {
                log.error("Error enviando email de recepción: {}", e.getMessage());
            }
        });
    }
    
    // Notificar derivación a trabajador
    @Async
    public void notificarDerivacionATrabajador(Long trabajadorId, Long tramiteId, String motivo) {
        usuarioRepository.findById(trabajadorId).ifPresent(trabajador -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    SimpleMailMessage message = new SimpleMailMessage();
                    message.setFrom(fromEmail);
                    message.setTo(trabajador.getCorreo());
                    message.setSubject("Trámite derivado a usted - " + tramite.getCodigo());
                    message.setText(String.format(
                        "Estimado/a %s %s,\n\n" +
                        "Se le ha derivado un trámite para su atención.\n\n" +
                        "Detalles del trámite:\n" +
                        "- Código: %s\n" +
                        "- Tipo: %s\n" +
                        "- Prioridad: %s\n" +
                        "- Motivo de derivación: %s\n" +
                        "- Fecha límite: %s\n\n" +
                        "Por favor, acceda al sistema para procesar este trámite:\n" +
                        "%s/tramites/%d\n\n" +
                        "Atentamente,\n" +
                        "Sistema de Trámite Documentario",
                        trabajador.getNombre(),
                        trabajador.getApellidos(),
                        tramite.getCodigo(),
                        tramite.getTipo(),
                        tramite.getPrioridad(),
                        motivo,
                        tramite.getFechaVencimiento() != null ? 
                            tramite.getFechaVencimiento().format(DATE_FORMATTER) : "No especificada",
                        appUrl,
                        tramiteId
                    ));
                    
                    mailSender.send(message);
                    log.info("Email de derivación enviado a trabajador {}", trabajadorId);
                } catch (Exception e) {
                    log.error("Error enviando email de derivación: {}", e.getMessage());
                }
            });
        });
    }
    
    // Notificar reasignación al solicitante
    @Async
    public void notificarReasignacionASolicitante(Long solicitanteId, Long tramiteId, Long nuevoTrabajadorId) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                String nombreNuevoTrabajador = obtenerNombreSolicitante(nuevoTrabajadorId);
                
                try {
                    SimpleMailMessage message = new SimpleMailMessage();
                    message.setFrom(fromEmail);
                    message.setTo(solicitante.getCorreo());
                    message.setSubject("Su trámite ha sido reasignado - " + tramite.getCodigo());
                    message.setText(String.format(
                        "Estimado/a %s %s,\n\n" +
                        "Le informamos que su trámite %s ha sido reasignado a otro especialista " +
                        "para brindarle una mejor atención.\n\n" +
                        "Nuevo personal asignado: %s\n" +
                        "Estado: EN PROCESO\n\n" +
                        "Esta reasignación no afectará el tiempo de procesamiento de su trámite.\n\n" +
                        "Puede seguir consultando el estado en:\n" +
                        "%s/tramites/%d\n\n" +
                        "Atentamente,\n" +
                        "Sistema de Trámite Documentario",
                        solicitante.getNombre(),
                        solicitante.getApellidos(),
                        tramite.getCodigo(),
                        nombreNuevoTrabajador,
                        appUrl,
                        tramiteId
                    ));
                    
                    mailSender.send(message);
                    log.info("Email de reasignación enviado a solicitante {}", solicitanteId);
                } catch (Exception e) {
                    log.error("Error enviando email de reasignación: {}", e.getMessage());
                }
            });
        });
    }
    
    // Notificar cambio de estado
    @Async
    public void notificarCambioEstado(Long solicitanteId, Long tramiteId, 
                                     String estadoAnterior, String estadoNuevo) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    String asunto = generarAsuntoPorEstado(estadoNuevo, tramite.getCodigo());
                    String mensaje = generarMensajePorEstado(estadoNuevo, tramite, solicitante);
                    
                    SimpleMailMessage message = new SimpleMailMessage();
                    message.setFrom(fromEmail);
                    message.setTo(solicitante.getCorreo());
                    message.setSubject(asunto);
                    message.setText(mensaje);
                    
                    mailSender.send(message);
                    log.info("Email de cambio de estado enviado a solicitante {}", solicitanteId);
                } catch (Exception e) {
                    log.error("Error enviando email de cambio de estado: {}", e.getMessage());
                }
            });
        });
    }
    
    // Enviar correo con archivo adjunto de finalización
    @Async
    public void enviarCorreoFinalizacionConArchivo(Long solicitanteId, Long tramiteId, String urlArchivo) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    
                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject("Trámite completado - " + tramite.getCodigo());
                    
                    String htmlContent = String.format(
                        "<html><body>" +
                        "<h3>Estimado/a %s %s,</h3>" +
                        "<p>Su trámite <b>%s</b> ha sido completado exitosamente.</p>" +
                        "<h4>Documento adjunto:</h4>" +
                        "<p>Encontrará el documento solicitado adjunto a este correo.</p>" +
                        "<p>También puede descargarlo desde el sistema:</p>" +
                        "<p><a href='%s/tramites/%d'>Ver trámite en el sistema</a></p>" +
                        "<br>" +
                        "<p>Atentamente,<br>Sistema de Trámite Documentario</p>" +
                        "</body></html>",
                        solicitante.getNombre(),
                        solicitante.getApellidos(),
                        tramite.getCodigo(),
                        appUrl,
                        tramiteId
                    );
                    
                    helper.setText(htmlContent, true);
                    
                    // Adjuntar archivo si existe
                    if (urlArchivo != null && !urlArchivo.isEmpty()) {
                        File file = new File(urlArchivo);
                        if (file.exists()) {
                            FileSystemResource resource = new FileSystemResource(file);
                            helper.addAttachment(file.getName(), resource);
                        }
                    }
                    
                    mailSender.send(mimeMessage);
                    log.info("Email con archivo adjunto enviado a solicitante {}", solicitanteId);
                } catch (MessagingException e) {
                    log.error("Error enviando email con archivo adjunto: {}", e.getMessage());
                }
            });
        });
    }
    
    // Métodos auxiliares
    private String obtenerNombreSolicitante(Long usuarioId) {
        return usuarioRepository.findById(usuarioId)
            .map(u -> u.getNombre() + " " + u.getApellidos())
            .orElse("Usuario");
    }
    
    private String generarAsuntoPorEstado(String estado, String codigoTramite) {
        return switch (estado) {
            case "EN_PROCESO" -> "Su trámite está en proceso - " + codigoTramite;
            case "FINALIZADO", "APROBADO" -> "✅ Trámite completado - " + codigoTramite;
            case "OBSERVADO" -> "⚠️ Su trámite tiene observaciones - " + codigoTramite;
            case "RECHAZADO" -> "❌ Trámite rechazado - " + codigoTramite;
            default -> "Actualización de trámite - " + codigoTramite;
        };
    }
    
    private String generarMensajePorEstado(String estado, Tramite tramite, 
                                          com.example.demo.model.Usuario solicitante) {
        String encabezado = String.format("Estimado/a %s %s,\n\n",
            solicitante.getNombre(), solicitante.getApellidos());
        
        String pie = String.format(
            "\n\nPuede ver más detalles en:\n%s/tramites/%d\n\n" +
            "Atentamente,\nSistema de Trámite Documentario",
            appUrl, tramite.getId()
        );
        
        String cuerpo = switch (estado) {
            case "EN_PROCESO" -> 
                String.format("Su trámite %s está siendo procesado por nuestro equipo.\n" +
                            "Le notificaremos cuando haya una actualización.",
                            tramite.getCodigo());
            
            case "FINALIZADO", "APROBADO" -> 
                String.format("Su trámite %s ha sido completado exitosamente.\n" +
                            "Ya puede descargar los documentos desde el sistema.",
                            tramite.getCodigo());
            
            case "OBSERVADO" -> 
                String.format("Su trámite %s tiene observaciones que deben ser atendidas:\n\n" +
                            "%s\n\nPor favor, ingrese al sistema para subsanar las observaciones.",
                            tramite.getCodigo(),
                            tramite.getObservaciones() != null ? tramite.getObservaciones() : "");
            
            case "RECHAZADO" -> 
                String.format("Lamentamos informarle que su trámite %s ha sido rechazado.\n\n" +
                            "Motivo: %s\n\nPuede iniciar un nuevo trámite si lo desea.",
                            tramite.getCodigo(),
                            tramite.getObservaciones() != null ? tramite.getObservaciones() : "");
            
            default -> 
                String.format("Su trámite %s ha cambiado al estado: %s",
                            tramite.getCodigo(), estado);
        };
        
        return encabezado + cuerpo + pie;
    }
    
    // Reenviar notificación por email
    @Async
    public void reenviarNotificacion(com.example.demo.model.Notificacion notificacion) {
        usuarioRepository.findById(notificacion.getUsuarioDestinatarioId()).ifPresent(usuario -> {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom(fromEmail);
                message.setTo(usuario.getCorreo());
                message.setSubject("📢 [REENVIADO] " + notificacion.getTitulo());
                message.setText(String.format(
                    "Estimado/a %s %s,\n\n" +
                    "Le reenviamos la siguiente notificación:\n\n" +
                    "Título: %s\n" +
                    "Mensaje: %s\n" +
                    "Tipo: %s\n" +
                    "Prioridad: %s\n\n" +
                    "Fecha original: %s\n\n" +
                    "%s\n\n" +
                    "Atentamente,\n" +
                    "Sistema de Trámite Documentario",
                    usuario.getNombre(),
                    usuario.getApellidos(),
                    notificacion.getTitulo(),
                    notificacion.getMensaje(),
                    notificacion.getTipo(),
                    notificacion.getPrioridad(),
                    notificacion.getFechaCreacion().format(DATE_FORMATTER),
                    notificacion.getRutaDestino() != null ? 
                        "Ver en el sistema: " + appUrl + notificacion.getRutaDestino() : 
                        "Visite el sistema para más detalles: " + appUrl
                ));
                
                mailSender.send(message);
                log.info("Notificación {} reenviada por email", notificacion.getId());
            } catch (Exception e) {
                log.error("Error reenviando notificación por email: {}", e.getMessage());
            }
        });
    }
}