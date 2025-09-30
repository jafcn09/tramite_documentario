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
import java.time.LocalDateTime;
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

    @Async
    public void notificarAutoasignacionATrabajador(Long trabajadorId, Long tramiteId) {
        usuarioRepository.findById(trabajadorId).ifPresent(trabajador -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(trabajador.getCorreo());
                    helper.setSubject("✅ Te has asignado el trámite " + tramite.getCodigo());

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <style>
                                @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                                @keyframes pulse { 0%%, 100%% { transform: scale(1); } 50%% { transform: scale(1.05); } }
                                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); }
                                .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
                                .header { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); padding: 40px 30px; text-align: center; animation: slideIn 0.6s ease; }
                                .header h1 { color: white; margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
                                .badge { display: inline-block; background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-top: 10px; animation: pulse 2s infinite; }
                                .content { padding: 40px 30px; }
                                .greeting { font-size: 18px; color: #2c3e50; margin-bottom: 20px; }
                                .message-box { background: linear-gradient(135deg, #f5f7fa 0%%, #c3cfe2 100%%); padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #667eea; }
                                .details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                                .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #e9ecef; }
                                .detail-row:last-child { border-bottom: none; }
                                .detail-label { font-weight: 600; color: #495057; width: 140px; }
                                .detail-value { color: #6c757d; }
                                .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; margin: 20px 0; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s; }
                                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6); }
                                .footer { text-align: center; padding: 30px; background: #f8f9fa; color: #6c757d; font-size: 14px; }
                                .priority-high { color: #dc3545; font-weight: bold; }
                                .priority-normal { color: #ffc107; font-weight: bold; }
                                .priority-low { color: #28a745; font-weight: bold; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>🎯 Trámite Asignado</h1>
                                    <div class="badge">%s</div>
                                </div>
                                <div class="content">
                                    <p class="greeting">¡Hola %s %s!</p>
                                    <div class="message-box">
                                        <p style="margin: 0; font-size: 16px; color: #2c3e50;">
                                            Has tomado el trámite <strong>%s</strong> y ahora eres responsable de su atención.
                                            Recuerda gestionarlo dentro del plazo establecido.
                                        </p>
                                    </div>
                                    <div class="details">
                                        <h3 style="margin-top: 0; color: #2c3e50;">📋 Detalles del Trámite</h3>
                                        <div class="detail-row">
                                            <div class="detail-label">Código:</div>
                                            <div class="detail-value"><strong>%s</strong></div>
                                        </div>
                                        <div class="detail-row">
                                            <div class="detail-label">Tipo:</div>
                                            <div class="detail-value">%s</div>
                                        </div>
                                        <div class="detail-row">
                                            <div class="detail-label">Prioridad:</div>
                                            <div class="detail-value priority-%s">%s</div>
                                        </div>
                                        <div class="detail-row">
                                            <div class="detail-label">Solicitante:</div>
                                            <div class="detail-value">%s</div>
                                        </div>
                                        <div class="detail-row">
                                            <div class="detail-label">Plazo:</div>
                                            <div class="detail-value"><strong>3 días hábiles</strong></div>
                                        </div>
                                    </div>
                                    <center>
                                        <a href="%s/tramites/%d" class="cta-button">
                                            Ver Trámite Completo →
                                        </a>
                                    </center>
                                </div>
                                <div class="footer">
                                    <p style="margin: 5px 0;">Universidad Nacional de Tumbes</p>
                                    <p style="margin: 5px 0;">Sistema de Trámite Documentario</p>
                                    <p style="margin: 5px 0; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        tramite.getCodigo(),
                        trabajador.getNombre(),
                        trabajador.getApellidos(),
                        tramite.getCodigo(),
                        tramite.getCodigo(),
                        tramite.getTipo(),
                        tramite.getPrioridad().name().toLowerCase(),
                        tramite.getPrioridad(),
                        obtenerNombreSolicitante(tramite.getUsuarioSolicitanteId()),
                        appUrl,
                        tramiteId
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(mimeMessage);
                    log.info("Email de autoasignacion enviado a trabajador {} sobre tramite {}", trabajadorId, tramiteId);
                } catch (Exception e) {
                    log.error("Error enviando email de autoasignacion a trabajador {}: {}", trabajadorId, e.getMessage());
                }
            });
        });
    }

    // Enviar correo de recepción al solicitante
    @Async
    public void enviarCorreoRecepcion(Long solicitanteId, Long tramiteId, Map<String, Object> datos) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject("✅ Trámite Recepcionado - " + datos.get("tramiteCodigo"));

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html lang='es'>
                        <head>
                            <meta charset='UTF-8'>
                            <style>
                                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f5f7fa; }
                                .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                                .header { background: linear-gradient(135deg, #10b981 0%%, #059669 100%%); padding: 40px; text-align: center; color: white; }
                                .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
                                .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-top: 10px; font-size: 14px; }
                                .content { padding: 40px 30px; }
                                .greeting { font-size: 18px; color: #1f2937; margin-bottom: 20px; }
                                .info-card { background: #f0fdf4; border-left: 4px solid #10b981; padding: 25px; margin: 25px 0; border-radius: 8px; }
                                .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #d1fae5; }
                                .detail-row:last-child { border-bottom: none; }
                                .detail-label { font-weight: 600; color: #047857; }
                                .detail-value { color: #1f2937; }
                                .timeline { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0; }
                                .timeline h3 { color: #1f2937; margin-top: 0; font-size: 16px; }
                                .timeline-item { display: flex; align-items: center; padding: 10px 0; }
                                .timeline-dot { width: 12px; height: 12px; background: #10b981; border-radius: 50%%; margin-right: 15px; }
                                .cta-button { display: inline-block; background: #10b981; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                                .footer { background: #f9fafb; padding: 25px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }
                            </style>
                        </head>
                        <body>
                            <div class='container'>
                                <div class='header'>
                                    <h1>✅ Trámite Recepcionado</h1>
                                    <div class='badge'>%s</div>
                                </div>
                                <div class='content'>
                                    <p class='greeting'>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Nos complace informarle que su trámite ha sido <strong>recepcionado exitosamente</strong> y está siendo procesado por nuestro equipo.</p>

                                    <div class='info-card'>
                                        <h3 style='margin-top: 0; color: #047857;'>📋 Información del Trámite</h3>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Código:</span>
                                            <span class='detail-value'><strong>%s</strong></span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Asunto:</span>
                                            <span class='detail-value'>%s</span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Tipo:</span>
                                            <span class='detail-value'>%s</span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Estado Actual:</span>
                                            <span class='detail-value'><strong style='color: #10b981;'>EN REVISIÓN</strong></span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Personal Asignado:</span>
                                            <span class='detail-value'>%s</span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Tiempo Estimado:</span>
                                            <span class='detail-value'><strong>%s</strong></span>
                                        </div>
                                    </div>

                                    <div class='timeline'>
                                        <h3>📍 Próximos Pasos</h3>
                                        <div class='timeline-item'>
                                            <div class='timeline-dot'></div>
                                            <span>Revisión de documentación presentada</span>
                                        </div>
                                        <div class='timeline-item'>
                                            <div class='timeline-dot'></div>
                                            <span>Evaluación y procesamiento del trámite</span>
                                        </div>
                                        <div class='timeline-item'>
                                            <div class='timeline-dot'></div>
                                            <span>Emisión de respuesta o documento final</span>
                                        </div>
                                    </div>

                                    <p>Le notificaremos por correo y por el sistema sobre cualquier actualización en el estado de su trámite.</p>

                                    <center>
                                        <a href='%s/tramites/%d' class='cta-button'>Hacer Seguimiento del Trámite →</a>
                                    </center>

                                    <p style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;'>
                                        💡 <strong>Recordatorio:</strong> Puede consultar el estado de su trámite en cualquier momento ingresando su código en nuestro sistema.
                                    </p>
                                </div>
                                <div class='footer'>
                                    <p><strong>Sistema de Trámite Documentario</strong></p>
                                    <p>Universidad Nacional de Tumbes</p>
                                    <p style='margin-top: 10px;'>Este es un correo automático, por favor no responda</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        datos.get("tramiteCodigo"),
                        solicitante.getNombre(),
                        solicitante.getApellidos(),
                        datos.get("tramiteCodigo"),
                        tramite.getAsunto(),
                        tramite.getTipo(),
                        datos.get("trabajadorNombre"),
                        datos.get("tiempoEstimado"),
                        appUrl,
                        tramiteId
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(message);
                    log.info("Email de recepción enviado a solicitante {}", solicitanteId);
                } catch (Exception e) {
                    log.error("Error enviando email de recepción: {}", e.getMessage());
                }
            });
        });
    }
    
    // Notificar derivación a trabajador
    @Async
    public void notificarDerivacionATrabajador(Long trabajadorId, Long tramiteId, String motivo) {
        usuarioRepository.findById(trabajadorId).ifPresent(trabajador -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(trabajador.getCorreo());
                    helper.setSubject("🔄 Trámite Derivado - " + tramite.getCodigo());

                    String prioridadColor = switch(tramite.getPrioridad().name()) {
                        case "URGENTE" -> "#dc3545";
                        case "ALTA" -> "#ffc107";
                        case "NORMAL" -> "#17a2b8";
                        case "BAJA" -> "#28a745";
                        default -> "#6c757d";
                    };

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html lang='es'>
                        <head>
                            <meta charset='UTF-8'>
                            <style>
                                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f5f7fa; }
                                .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                                .header { background: linear-gradient(135deg, #f59e0b 0%%, #d97706 100%%); padding: 40px; text-align: center; color: white; }
                                .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
                                .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin-top: 10px; font-size: 14px; }
                                .content { padding: 40px 30px; }
                                .greeting { font-size: 18px; color: #1f2937; margin-bottom: 20px; }
                                .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 8px; }
                                .alert-box h3 { color: #92400e; margin-top: 0; font-size: 16px; }
                                .info-card { background: #f9fafb; padding: 25px; margin: 25px 0; border-radius: 8px; }
                                .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
                                .detail-row:last-child { border-bottom: none; }
                                .detail-label { font-weight: 600; color: #6b7280; }
                                .detail-value { color: #1f2937; }
                                .priority-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; color: white; font-size: 12px; font-weight: 600; }
                                .cta-button { display: inline-block; background: #f59e0b; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
                                .footer { background: #f9fafb; padding: 25px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }
                            </style>
                        </head>
                        <body>
                            <div class='container'>
                                <div class='header'>
                                    <h1>🔄 Trámite Derivado</h1>
                                    <div class='badge'>%s</div>
                                </div>
                                <div class='content'>
                                    <p class='greeting'>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Se le ha <strong>derivado un trámite</strong> para su atención y procesamiento.</p>

                                    <div class='alert-box'>
                                        <h3>📌 Motivo de Derivación</h3>
                                        <p style='margin: 0;'>%s</p>
                                    </div>

                                    <div class='info-card'>
                                        <h3 style='margin-top: 0; color: #1f2937;'>📋 Detalles del Trámite</h3>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Código:</span>
                                            <span class='detail-value'><strong>%s</strong></span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Asunto:</span>
                                            <span class='detail-value'>%s</span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Tipo:</span>
                                            <span class='detail-value'>%s</span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Prioridad:</span>
                                            <span class='detail-value'><span class='priority-badge' style='background: %s;'>%s</span></span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Solicitante:</span>
                                            <span class='detail-value'>%s</span>
                                        </div>
                                        <div class='detail-row'>
                                            <span class='detail-label'>Fecha Límite:</span>
                                            <span class='detail-value'><strong>%s</strong></span>
                                        </div>
                                    </div>

                                    <p><strong>⏰ Acción Requerida:</strong> Por favor, revise y procese este trámite a la brevedad posible según su prioridad asignada.</p>

                                    <center>
                                        <a href='%s/administrativo/mis-tramites?tramiteId=%d' class='cta-button'>Atender Trámite Ahora →</a>
                                    </center>

                                    <p style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;'>
                                        💡 <strong>Recordatorio:</strong> Asegúrese de revisar toda la documentación adjunta antes de procesar el trámite.
                                    </p>
                                </div>
                                <div class='footer'>
                                    <p><strong>Sistema de Trámite Documentario</strong></p>
                                    <p>Universidad Nacional de Tumbes</p>
                                    <p style='margin-top: 10px;'>Este es un correo automático, por favor no responda</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        tramite.getCodigo(),
                        trabajador.getNombre(),
                        trabajador.getApellidos(),
                        motivo,
                        tramite.getCodigo(),
                        tramite.getAsunto(),
                        tramite.getTipo(),
                        prioridadColor,
                        tramite.getPrioridad(),
                        obtenerNombreSolicitante(tramite.getUsuarioSolicitanteId()),
                        tramite.getFechaVencimiento() != null ?
                            tramite.getFechaVencimiento().format(DATE_FORMATTER) : "No especificada",
                        appUrl,
                        tramiteId
                    );

                    helper.setText(htmlContent, true);
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

    // Enviar correo de rechazo de trámite
    @Async
    public void enviarCorreoRechazoTramite(Long solicitanteId, Long tramiteId, String motivoRechazo, String observaciones, String rechazadoPor) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject("Trámite Rechazado - Código: " + tramite.getCodigo());

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: #dc3545; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
                                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                                .rejection-box { background: #fff5f5; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; }
                                .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; }
                                .button { background: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
                                .info { background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>🚫 Trámite Rechazado</h2>
                                </div>
                                <div class="content">
                                    <p>Estimado(a) <strong>%s %s</strong>,</p>

                                    <p>Lamentamos informarle que su trámite ha sido <strong style="color: #dc3545;">RECHAZADO</strong>.</p>

                                    <div class="info">
                                        <p><strong>📋 Código del Trámite:</strong> %s</p>
                                        <p><strong>📝 Asunto:</strong> %s</p>
                                        <p><strong>📅 Fecha de Rechazo:</strong> %s</p>
                                        <p><strong>👤 Rechazado por:</strong> %s</p>
                                    </div>

                                    <div class="rejection-box">
                                        <h3>❌ Motivo del Rechazo:</h3>
                                        <p><strong>%s</strong></p>
                                        %s
                                    </div>

                                    <p><strong>¿Qué puede hacer ahora?</strong></p>
                                    <ul>
                                        <li>Revisar el motivo del rechazo y las observaciones</li>
                                        <li>Corregir los problemas identificados</li>
                                        <li>Presentar un nuevo trámite con las correcciones necesarias</li>
                                        <li>Contactar con la oficina de Secretaría General si tiene dudas</li>
                                    </ul>

                                    <p>Para más detalles, puede consultar el estado de su trámite en el sistema:</p>
                                    <center>
                                        <a href="%s/buscar?codigo=%s" class="button">Ver Trámite en el Sistema</a>
                                    </center>
                                </div>
                                <div class="footer">
                                    <p>Sistema de Trámite Documentario</p>
                                    <p style="font-size: 12px;">Este es un correo automático, por favor no responda a este mensaje.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        solicitante.getNombre(),
                        solicitante.getApellidos(),
                        tramite.getCodigo(),
                        tramite.getAsunto(),
                        LocalDateTime.now().format(DATE_FORMATTER),
                        rechazadoPor,
                        motivoRechazo,
                        observaciones != null && !observaciones.isEmpty() ?
                            "<p><strong>📌 Observaciones adicionales:</strong></p><p>" + observaciones + "</p>" : "",
                        appUrl,
                        tramite.getCodigo()
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(message);

                    log.info("Correo de rechazo enviado a {} para trámite {}", solicitante.getCorreo(), tramite.getCodigo());
                } catch (Exception e) {
                    log.error("Error enviando correo de rechazo: {}", e.getMessage(), e);
                }
            });
        });
    }

    // Notificar edición de trámite al usuario
    @Async
    public void notificarEdicionTramiteAUsuario(Long usuarioId, Long tramiteId, String tituloAnterior, String tituloNuevo) {
        usuarioRepository.findById(usuarioId).ifPresent(usuario -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(usuario.getCorreo());
                    helper.setSubject("✏️ Trámite Editado - " + tramite.getCodigo());

                    // Template HTML moderno y profesional
                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html lang='es'>
                        <head>
                            <meta charset='UTF-8'>
                            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                            <style>
                                * { margin: 0; padding: 0; box-sizing: border-box; }
                                body {
                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                                    line-height: 1.6;
                                    color: #333;
                                    background: #f5f7fa;
                                    padding: 20px;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background: white;
                                    border-radius: 16px;
                                    overflow: hidden;
                                    box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
                                }
                                .header {
                                    background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                                    color: white;
                                    padding: 40px 30px;
                                    text-align: center;
                                }
                                .header h1 {
                                    font-size: 26px;
                                    font-weight: 600;
                                    margin-bottom: 8px;
                                }
                                .header p {
                                    opacity: 0.95;
                                    font-size: 15px;
                                }
                                .content {
                                    padding: 35px 30px;
                                }
                                .greeting {
                                    font-size: 16px;
                                    margin-bottom: 20px;
                                }
                                .info-card {
                                    background: #f8f9fb;
                                    border-left: 4px solid #667eea;
                                    padding: 20px;
                                    margin: 25px 0;
                                    border-radius: 8px;
                                }
                                .info-row {
                                    display: flex;
                                    justify-content: space-between;
                                    padding: 10px 0;
                                    border-bottom: 1px solid #e5e7eb;
                                }
                                .info-row:last-child {
                                    border-bottom: none;
                                }
                                .info-label {
                                    font-weight: 600;
                                    color: #6b7280;
                                    font-size: 14px;
                                }
                                .info-value {
                                    color: #1f2937;
                                    font-size: 14px;
                                }
                                .changes-box {
                                    background: #fef3c7;
                                    border: 1px solid #fbbf24;
                                    padding: 20px;
                                    margin: 25px 0;
                                    border-radius: 8px;
                                }
                                .changes-box h3 {
                                    color: #92400e;
                                    margin-bottom: 15px;
                                    font-size: 16px;
                                }
                                .change-item {
                                    background: white;
                                    padding: 12px;
                                    margin-bottom: 10px;
                                    border-radius: 6px;
                                }
                                .change-label {
                                    font-size: 12px;
                                    color: #92400e;
                                    font-weight: 600;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                }
                                .change-text {
                                    color: #1f2937;
                                    margin-top: 4px;
                                }
                                .button {
                                    display: inline-block;
                                    padding: 14px 32px;
                                    background: #667eea;
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 8px;
                                    margin: 25px 0;
                                    font-weight: 600;
                                    text-align: center;
                                }
                                .footer {
                                    background: #f9fafb;
                                    padding: 25px;
                                    text-align: center;
                                    color: #6b7280;
                                    font-size: 13px;
                                    border-top: 1px solid #e5e7eb;
                                }
                                .badge {
                                    display: inline-block;
                                    padding: 6px 12px;
                                    background: #667eea;
                                    color: white;
                                    border-radius: 20px;
                                    font-size: 12px;
                                    font-weight: 600;
                                }
                            </style>
                        </head>
                        <body>
                            <div class='container'>
                                <div class='header'>
                                    <h1>✏️ Trámite Editado</h1>
                                    <p>Su trámite ha sido modificado exitosamente</p>
                                </div>
                                <div class='content'>
                                    <p class='greeting'>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Le informamos que su trámite ha sido <strong>editado</strong> correctamente en el sistema.</p>

                                    <div class='info-card'>
                                        <div class='info-row'>
                                            <span class='info-label'>📋 Código:</span>
                                            <span class='info-value'><strong>%s</strong></span>
                                        </div>
                                        <div class='info-row'>
                                            <span class='info-label'>📝 Asunto Actual:</span>
                                            <span class='info-value'>%s</span>
                                        </div>
                                        <div class='info-row'>
                                            <span class='info-label'>🏷️ Tipo:</span>
                                            <span class='info-value'>%s</span>
                                        </div>
                                        <div class='info-row'>
                                            <span class='info-label'>📊 Estado:</span>
                                            <span class='info-value'><span class='badge'>%s</span></span>
                                        </div>
                                        <div class='info-row'>
                                            <span class='info-label'>📅 Fecha de Edición:</span>
                                            <span class='info-value'>%s</span>
                                        </div>
                                    </div>

                                    <div class='changes-box'>
                                        <h3>📝 Cambios Realizados</h3>
                                        <div class='change-item'>
                                            <div class='change-label'>Título Anterior</div>
                                            <div class='change-text'>%s</div>
                                        </div>
                                        <div class='change-item'>
                                            <div class='change-label'>Título Nuevo</div>
                                            <div class='change-text'>%s</div>
                                        </div>
                                    </div>

                                    <p>Para ver todos los detalles del trámite actualizado, puede acceder al sistema:</p>
                                    <center>
                                        <a href='%s/usuario/mis-tramites?codigo=%s' class='button'>Ver Trámite</a>
                                    </center>

                                    <p style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;'>
                                        💡 <strong>Nota:</strong> Si no realizó esta modificación o tiene alguna consulta, por favor contacte con el área correspondiente.
                                    </p>
                                </div>
                                <div class='footer'>
                                    <p><strong>Sistema de Trámite Documentario</strong></p>
                                    <p>Universidad Nacional de Tumbes</p>
                                    <p style='margin-top: 10px;'>Este es un correo automático, por favor no responda a este mensaje</p>
                                    <p style='margin-top: 10px; font-size: 12px;'>© 2024 Todos los derechos reservados</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        usuario.getNombre(),
                        usuario.getApellidos(),
                        tramite.getCodigo(),
                        tramite.getAsunto(),
                        tramite.getTipo(),
                        tramite.getEstado(),
                        LocalDateTime.now().format(DATE_FORMATTER),
                        tituloAnterior,
                        tituloNuevo,
                        appUrl,
                        tramite.getCodigo()
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(message);

                    log.info("Correo de edición enviado a {} para trámite {}", usuario.getCorreo(), tramite.getCodigo());
                } catch (Exception e) {
                    log.error("Error enviando correo de edición: {}", e.getMessage(), e);
                }
            });
        });
    }
}