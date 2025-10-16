package com.example.demo.service;

import com.example.demo.model.Tramite;
import com.example.demo.model.Usuario;
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.dto.UsuarioResponse;
import com.example.demo.dto.AreaResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
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
public class EmailService {

    private final JavaMailSender mailSender;
    private final UsuarioRepository usuarioRepository;
    private final TramiteRepository tramiteRepository;
    private final UsuarioService usuarioService;
    private final AreaService areaService;

    public EmailService(JavaMailSender mailSender, UsuarioRepository usuarioRepository,
                       TramiteRepository tramiteRepository, UsuarioService usuarioService,
                       AreaService areaService) {
        this.mailSender = mailSender;
        this.usuarioRepository = usuarioRepository;
        this.tramiteRepository = tramiteRepository;
        this.usuarioService = usuarioService;
        this.areaService = areaService;
    }

    @Value("${spring.mail.username:noreply@tramites.com}")
    private String fromEmail;

    @Value("${app.url:http://localhost:4200}")
    private String appUrl;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

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

                    String htmlContent = construirTemplateRespuesta(solicitante, tramite, datos);
                    helper.setText(htmlContent, true);

                    mailSender.send(message);
                } catch (MessagingException e) {
                    throw new RuntimeException("Error al enviar email de respuesta", e);
                }
            });
        });
    }

    private String construirTemplateRespuesta(Usuario solicitante, Tramite tramite, Map<String, Object> datos) {
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

    @Async
    public void notificarNuevoTramiteATrabajador(Long trabajadorId, Long tramiteId) {
        usuarioRepository.findById(trabajadorId).ifPresent(trabajador -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(trabajador.getCorreo());
                    helper.setSubject("📝 Nuevo Trámite Asignado - " + tramite.getCodigo());

                    String htmlContent = construirTemplateNuevoTramite(trabajador, tramite, tramiteId);
                    helper.setText(htmlContent, true);

                    mailSender.send(message);
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando email a trabajador", e);
                }
            });
        });
    }

    private String construirTemplateNuevoTramite(Usuario trabajador, Tramite tramite, Long tramiteId) {
        return "<!DOCTYPE html>" +
            "<html lang='es'>" +
            "<head>" +
            "    <meta charset='UTF-8'>" +
            "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
            "    <style>" +
            "        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; background: #f5f7fa; margin: 0; padding: 20px; }" +
            "        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }" +
            "        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }" +
            "        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }" +
            "        .header p { margin: 10px 0 0 0; opacity: 0.9; }" +
            "        .icon { font-size: 48px; margin-bottom: 15px; }" +
            "        .content { padding: 40px 30px; }" +
            "        .greeting { font-size: 18px; color: #2c3e50; margin-bottom: 20px; }" +
            "        .info-card { background: #f8f9fb; border-left: 4px solid #667eea; padding: 25px; margin: 25px 0; border-radius: 8px; }" +
            "        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }" +
            "        .detail-row:last-child { border-bottom: none; }" +
            "        .detail-label { font-weight: 600; color: #6b7280; }" +
            "        .detail-value { color: #1f2937; }" +
            "        .priority-alta { color: #dc3545; font-weight: bold; }" +
            "        .priority-normal { color: #ffc107; font-weight: bold; }" +
            "        .priority-baja { color: #28a745; font-weight: bold; }" +
            "        .btn { display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 600; }" +
            "        .footer { background: #2c3e50; color: white; padding: 25px; text-align: center; }" +
            "        .footer p { margin: 5px 0; opacity: 0.8; font-size: 14px; }" +
            "        @media (max-width: 600px) { .container { margin: 10px; } .content, .header { padding: 25px 20px; } }" +
            "    </style>" +
            "</head>" +
            "<body>" +
            "    <div class='container'>" +
            "        <div class='header'>" +
            "            <div class='icon'>📝</div>" +
            "            <h1>Nuevo Trámite Asignado</h1>" +
            "            <p>Se ha asignado un nuevo trámite a tu área</p>" +
            "        </div>" +
            "        <div class='content'>" +
            "            <p class='greeting'>Estimado/a <strong>" + trabajador.getNombre() + " " + trabajador.getApellidos() + "</strong>,</p>" +
            "            <p>Se ha recibido un nuevo trámite en tu área de trabajo que requiere tu atención.</p>" +
            "            " +
            "            <div class='info-card'>" +
            "                <h3 style='margin-top: 0; color: #2c3e50;'>📋 Detalles del Trámite</h3>" +
            "                <div class='detail-row'>" +
            "                    <span class='detail-label'>Código:</span>" +
            "                    <span class='detail-value'><strong>" + tramite.getCodigo() + "</strong></span>" +
            "                </div>" +
            "                <div class='detail-row'>" +
            "                    <span class='detail-label'>Tipo:</span>" +
            "                    <span class='detail-value'>" + tramite.getTipo() + "</span>" +
            "                </div>" +
            "                <div class='detail-row'>" +
            "                    <span class='detail-label'>Prioridad:</span>" +
            "                    <span class='detail-value priority-" + tramite.getPrioridad().name().toLowerCase() + "'>" + tramite.getPrioridad() + "</span>" +
            "                </div>" +
            "                <div class='detail-row'>" +
            "                    <span class='detail-label'>Solicitante:</span>" +
            "                    <span class='detail-value'>" + obtenerNombreSolicitante(tramite.getUsuarioSolicitanteId()) + "</span>" +
            "                </div>" +
            "                <div class='detail-row'>" +
            "                    <span class='detail-label'>Fecha de recepción:</span>" +
            "                    <span class='detail-value'>" + tramite.getFechaCreacion().format(DATE_FORMATTER) + "</span>" +
            "                </div>" +
            "                <div class='detail-row'>" +
            "                    <span class='detail-label'>Tiempo límite:</span>" +
            "                    <span class='detail-value'><strong>3 días hábiles</strong></span>" +
            "                </div>" +
            "            </div>" +
            "            " +
            "            <p style='background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;'>" +
            "                <strong>⏰ Recordatorio:</strong> Tienes un máximo de 3 días hábiles para procesar este trámite." +
            "            </p>" +
            "            " +
            "            <center>" +
            "                <a href='" + appUrl + "/tramites/" + tramiteId + "' class='btn'>Revisar Trámite →</a>" +
            "            </center>" +
            "        </div>" +
            "        <div class='footer'>" +
            "            <p><strong>Sistema de Trámite Documentario</strong></p>" +
            "            <p>Universidad Nacional de Tumbes</p>" +
            "            <p style='margin-top: 10px;'>Este es un correo automático, por favor no responder</p>" +
            "        </div>" +
            "    </div>" +
            "</body>" +
            "</html>";
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
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando email de autoasignacion", e);
                }
            });
        });
    }

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
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando email de recepción", e);
                }
            });
        });
    }

    private String obtenerNombreSolicitante(Long usuarioId) {
        return usuarioRepository.findById(usuarioId)
            .map(u -> u.getNombre() + " " + u.getApellidos())
            .orElse("Usuario");
    }

    @Async
    public void enviarCorreoRechazoTramite(Long solicitanteId, Long tramiteId, String motivoRechazo, String observaciones, String rechazadoPor) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject("❌ Trámite Rechazado - Código: " + tramite.getCodigo());

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
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando correo de rechazo", e);
                }
            });
        });
    }

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

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html lang='es'>
                        <head>
                            <meta charset='UTF-8'>
                            <style>
                                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
                                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
                                .header { background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); color: white; padding: 40px 30px; text-align: center; }
                                .header h1 { font-size: 26px; font-weight: 600; margin-bottom: 8px; }
                                .content { padding: 35px 30px; }
                                .info-card { background: #f8f9fb; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 8px; }
                                .changes-box { background: #fef3c7; border: 1px solid #fbbf24; padding: 20px; margin: 25px 0; border-radius: 8px; }
                                .changes-box h3 { color: #92400e; margin-bottom: 15px; font-size: 16px; }
                                .change-item { background: white; padding: 12px; margin-bottom: 10px; border-radius: 6px; }
                                .change-label { font-size: 12px; color: #92400e; font-weight: 600; text-transform: uppercase; }
                                .change-text { color: #1f2937; margin-top: 4px; }
                                .footer { background: #2c3e50; color: white; padding: 30px; text-align: center; }
                            </style>
                        </head>
                        <body>
                            <div class='container'>
                                <div class='header'>
                                    <h1>✏️ Trámite Editado</h1>
                                    <p>Su trámite ha sido modificado exitosamente</p>
                                </div>
                                <div class='content'>
                                    <p>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Le informamos que su trámite ha sido <strong>editado</strong> correctamente en el sistema.</p>
                                    <div class='info-card'>
                                        <p><strong>📋 Código:</strong> %s</p>
                                        <p><strong>📅 Fecha de Edición:</strong> %s</p>
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
                                </div>
                                <div class='footer'>
                                    <p><strong>Sistema de Trámite Documentario</strong></p>
                                    <p>Universidad Nacional de Tumbes</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        usuario.getNombre(),
                        usuario.getApellidos(),
                        tramite.getCodigo(),
                        LocalDateTime.now().format(DATE_FORMATTER),
                        tituloAnterior,
                        tituloNuevo
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(message);
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando correo de edición", e);
                }
            });
        });
    }

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
                                .content { padding: 40px 30px; }
                                .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 8px; }
                                .alert-box h3 { color: #92400e; margin-top: 0; font-size: 16px; }
                                .info-card { background: #f9fafb; padding: 25px; margin: 25px 0; border-radius: 8px; }
                                .footer { background: #f9fafb; padding: 25px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }
                            </style>
                        </head>
                        <body>
                            <div class='container'>
                                <div class='header'>
                                    <h1>🔄 Trámite Derivado</h1>
                                </div>
                                <div class='content'>
                                    <p>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Se le ha <strong>derivado un trámite</strong> para su atención y procesamiento.</p>
                                    <div class='alert-box'>
                                        <h3>📌 Motivo de Derivación</h3>
                                        <p>%s</p>
                                    </div>
                                    <div class='info-card'>
                                        <p><strong>📋 Código:</strong> %s</p>
                                        <p><strong>📝 Asunto:</strong> %s</p>
                                        <p><strong>🏷️ Tipo:</strong> %s</p>
                                    </div>
                                </div>
                                <div class='footer'>
                                    <p><strong>Sistema de Trámite Documentario</strong></p>
                                    <p>Universidad Nacional de Tumbes</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        trabajador.getNombre(),
                        trabajador.getApellidos(),
                        motivo,
                        tramite.getCodigo(),
                        tramite.getAsunto(),
                        tramite.getTipo()
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(message);
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando email de derivación", e);
                }
            });
        });
    }

    @Async
    public void notificarReasignacionASolicitante(Long solicitanteId, Long tramiteId, Long nuevoTrabajadorId) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                String nombreNuevoTrabajador = obtenerNombreSolicitante(nuevoTrabajadorId);

                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject("🔄 Su trámite ha sido reasignado - " + tramite.getCodigo());

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: #17a2b8; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                                .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>🔄 Trámite Reasignado</h2>
                                </div>
                                <div class="content">
                                    <p>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Le informamos que su trámite <strong>%s</strong> ha sido reasignado a otro especialista para brindarle una mejor atención.</p>
                                    <p><strong>Nuevo personal asignado:</strong> %s</p>
                                    <p><strong>Estado:</strong> EN PROCESO</p>
                                    <p>Esta reasignación no afectará el tiempo de procesamiento de su trámite.</p>
                                </div>
                                <div class="footer">
                                    <p>Sistema de Trámite Documentario</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        solicitante.getNombre(),
                        solicitante.getApellidos(),
                        tramite.getCodigo(),
                        nombreNuevoTrabajador
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(message);
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando email de reasignación", e);
                }
            });
        });
    }

    @Async
    public void notificarCambioEstado(Long solicitanteId, Long tramiteId, String estadoAnterior, String estadoNuevo) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject("📊 Actualización de trámite - " + tramite.getCodigo());

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                                .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; }
                                .status-badge { display: inline-block; padding: 5px 10px; background: #28a745; color: white; border-radius: 3px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>📊 Estado Actualizado</h2>
                                </div>
                                <div class="content">
                                    <p>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Su trámite <strong>%s</strong> ha cambiado de estado.</p>
                                    <p><strong>Estado anterior:</strong> %s</p>
                                    <p><strong>Estado actual:</strong> <span class="status-badge">%s</span></p>
                                </div>
                                <div class="footer">
                                    <p>Sistema de Trámite Documentario</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        solicitante.getNombre(),
                        solicitante.getApellidos(),
                        tramite.getCodigo(),
                        estadoAnterior,
                        estadoNuevo
                    );

                    helper.setText(htmlContent, true);
                    mailSender.send(message);
                } catch (Exception e) {
                    throw new RuntimeException("Error enviando email de cambio de estado", e);
                }
            });
        });
    }

    @Async
    public void enviarCorreoFinalizacionConArchivo(Long solicitanteId, Long tramiteId, String urlArchivo) {
        usuarioRepository.findById(solicitanteId).ifPresent(solicitante -> {
            tramiteRepository.findById(tramiteId).ifPresent(tramite -> {
                try {
                    MimeMessage mimeMessage = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                    helper.setFrom(fromEmail);
                    helper.setTo(solicitante.getCorreo());
                    helper.setSubject("✅ Trámite completado - " + tramite.getCodigo());

                    String htmlContent = String.format("""
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                                .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>✅ Trámite Completado</h2>
                                </div>
                                <div class="content">
                                    <p>Estimado/a <strong>%s %s</strong>,</p>
                                    <p>Su trámite <strong>%s</strong> ha sido completado exitosamente.</p>
                                    <p>Encontrará el documento solicitado adjunto a este correo.</p>
                                </div>
                                <div class="footer">
                                    <p>Sistema de Trámite Documentario</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """,
                        solicitante.getNombre(),
                        solicitante.getApellidos(),
                        tramite.getCodigo()
                    );

                    helper.setText(htmlContent, true);

                    if (urlArchivo != null && !urlArchivo.isEmpty()) {
                        File file = new File(urlArchivo);
                        if (file.exists()) {
                            FileSystemResource resource = new FileSystemResource(file);
                            helper.addAttachment(file.getName(), resource);
                        }
                    }

                    mailSender.send(mimeMessage);
                } catch (MessagingException e) {
                    throw new RuntimeException("Error enviando email con archivo adjunto", e);
                }
            });
        });
    }

    @Async
    public void reenviarNotificacion(com.example.demo.model.Notificacion notificacion) {
        usuarioRepository.findById(notificacion.getUsuarioDestinatarioId()).ifPresent(usuario -> {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(fromEmail);
                helper.setTo(usuario.getCorreo());
                helper.setSubject("📢 [REENVIADO] " + notificacion.getTitulo());

                String htmlContent = String.format("""
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: #6c757d; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                            .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>📢 Notificación Reenviada</h2>
                            </div>
                            <div class="content">
                                <p>Estimado/a <strong>%s %s</strong>,</p>
                                <p>Le reenviamos la siguiente notificación:</p>
                                <h3>%s</h3>
                                <p>%s</p>
                                <p><strong>Tipo:</strong> %s</p>
                                <p><strong>Fecha original:</strong> %s</p>
                            </div>
                            <div class="footer">
                                <p>Sistema de Trámite Documentario</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    """,
                    usuario.getNombre(),
                    usuario.getApellidos(),
                    notificacion.getTitulo(),
                    notificacion.getMensaje(),
                    notificacion.getTipo(),
                    notificacion.getFechaCreacion().format(DATE_FORMATTER)
                );

                helper.setText(htmlContent, true);
                mailSender.send(message);
            } catch (Exception e) {
                throw new RuntimeException("Error reenviando notificación por email", e);
            }
        });
    }

    public String generarHtmlTramite(Tramite tramite) {
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
            // Continuar sin información de usuarios
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

        html.append("<div class='header'>")
            .append("<h1>SISTEMA DE TRÁMITES DOCUMENTARIOS</h1>")
            .append("<h2>Detalle del Trámite</h2>")
            .append("</div>");

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

        html.append("<div class='footer'>")
            .append("<p>Documento generado el ").append(formatearFecha(LocalDateTime.now())).append("</p>")
            .append("<p>Sistema de Trámites Documentarios</p>")
            .append("</div>");

        html.append("</body></html>");
        return html.toString();
    }

    private String formatearFecha(LocalDateTime fecha) {
        if (fecha == null) return "N/A";
        return fecha.format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
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
            case "BORRADOR" -> "Borrador";
            default -> estado;
        };
    }

    public String generarHtmlParaImpresion(Long tramiteId, Long usuarioId) {
        Tramite tramite = tramiteRepository.findById(tramiteId)
            .orElseThrow(() -> new IllegalArgumentException("Trámite no encontrado"));

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
            // Continuar sin información relacionada
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

        // Información del documento
        html.append("<div class='document-info'>")
            .append("<div class='doc-number'>DOCUMENTO N° ").append(tramite.getCodigo()).append("</div>")
            .append("<div class='doc-date'>Generado el: ").append(formatearFecha(LocalDateTime.now())).append("</div>")
            .append("</div>");

        // Información general del trámite
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

        // Información de fechas
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

        // Información de personas y áreas
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

        // Descripción
        if (tramite.getDescripcion() != null && !tramite.getDescripcion().trim().isEmpty()) {
            html.append("<div class='content-section'>")
                .append("<div class='section-title'>Descripción del Trámite</div>")
                .append("<div class='content-box'>")
                .append("<div class='content-text'>").append(tramite.getDescripcion().replace("\n", "<br>")).append("</div>")
                .append("</div>")
                .append("</div>");
        }

        // Observaciones
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

}