package com.example.demo.service;

import com.example.demo.dto.ReporteResponse;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReporteNotificacionService {

    private final JavaMailSender mailSender;
    private final SimpMessagingTemplate messagingTemplate;

    @Value("${spring.mail.username:noreply@tramites.com}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:4200}")
    private String appUrl;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    @Async("emailExecutor")
    public void notificarReportanteCreacion(ReporteResponse reporte) {
        if (reporte.getEmailReportante() == null || reporte.getEmailReportante().trim().isEmpty()) {
            log.info("No se envía email - reporte sin email del reportante");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(reporte.getEmailReportante());
            helper.setSubject("✅ Reporte Recibido - Grado " + reporte.getCodigoDiploma());

            String htmlContent = construirTemplateReporteCreado(reporte);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("✅ Email enviado a reportante: {}", reporte.getEmailReportante());
        } catch (Exception e) {
            log.error("❌ Error enviando email a reportante: {}", e.getMessage(), e);
        }
    }

 
    @Async("emailExecutor")
    public void notificarReportanteActualizacion(ReporteResponse reporte) {
        if (reporte.getEmailReportante() == null || reporte.getEmailReportante().trim().isEmpty()) {
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(reporte.getEmailReportante());
            helper.setSubject("🔔 Actualización de Reporte - Grado " + reporte.getCodigoDiploma());

            String htmlContent = construirTemplateReporteActualizado(reporte);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("✅ Email de actualización enviado a: {}", reporte.getEmailReportante());
        } catch (Exception e) {
            log.error("❌ Error enviando email de actualización: {}", e.getMessage(), e);
        }
    }

  
    public void notificarAdministradoresNuevoReporte(ReporteResponse reporte) {
        try {
            Map<String, Object> notificacion = new HashMap<>();
            notificacion.put("tipo", "NUEVO_REPORTE");
            notificacion.put("reporteId", reporte.getId());
            notificacion.put("gradoCodigo", reporte.getCodigoDiploma());
            notificacion.put("alumno", reporte.getAlumnoNombre());
            notificacion.put("tipoError", reporte.getTipoError());
            notificacion.put("fechaCreacion", reporte.getFechaCreacion());
            notificacion.put("mensaje", "Nuevo reporte de error en grado " + reporte.getCodigoDiploma());


            messagingTemplate.convertAndSend("/topic/reportes", notificacion);

            log.info("✅ Notificación WebSocket enviada para reporte #{}", reporte.getId());
        } catch (Exception e) {
            log.error("❌ Error enviando notificación WebSocket: {}", e.getMessage(), e);
        }
    }


    public void notificarActualizacionReporte(ReporteResponse reporte) {
        try {
            Map<String, Object> notificacion = new HashMap<>();
            notificacion.put("tipo", "REPORTE_ACTUALIZADO");
            notificacion.put("reporteId", reporte.getId());
            notificacion.put("estado", reporte.getEstado());
            notificacion.put("gradoCodigo", reporte.getCodigoDiploma());
            notificacion.put("mensaje", "Reporte #" + reporte.getId() + " actualizado a " + reporte.getEstado());

            messagingTemplate.convertAndSend("/topic/reportes", notificacion);

            log.info("✅ Notificación de actualización WebSocket enviada para reporte #{}", reporte.getId());
        } catch (Exception e) {
            log.error("❌ Error enviando notificación de actualización: {}", e.getMessage(), e);
        }
    }

    private String construirTemplateReporteCreado(ReporteResponse reporte) {
        return String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 20px auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

                    <div style="background: linear-gradient(135deg, #0066cc 0%%, #0052a3 100%%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">✅ Reporte Recibido</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Sistema de Grados y Títulos</p>
                    </div>
                    <div style="padding: 30px;">
                        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Hemos recibido correctamente su reporte de error para el grado académico:
                        </p>
                        <div style="background-color: #f8f9fa; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 5px 0; color: #555;"><strong>Alumno:</strong> %s</p>
                            <p style="margin: 5px 0; color: #555;"><strong>Código:</strong> %s</p>
                            <p style="margin: 5px 0; color: #555;"><strong>Tipo de Error:</strong> %s</p>
                            <p style="margin: 5px 0; color: #555;"><strong>ID de Reporte:</strong> #%d</p>
                        </div>

                        <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0;">
                            Su reporte está siendo revisado por nuestro equipo. Le notificaremos por este medio cuando se actualice el estado.
                        </p>

                        <p style="color: #666; font-size: 14px; margin: 20px 0;">
                            <strong>Estado actual:</strong>
                            <span style="display: inline-block; background-color: #ffc107; color: #000; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                                PENDIENTE
                            </span>
                        </p>
                    </div>
                    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0; color: #666; font-size: 12px;">
                            Este es un correo automático, por favor no responder.
                        </p>
                        <p style="margin: 10px 0 0 0; color: #999; font-size: 11px;">
                            Universidad Nacional de Tumbes - Sistema de Gestión Documentaria
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """,
            reporte.getAlumnoNombre(),
            reporte.getCodigoDiploma(),
            reporte.getTipoError(),
            reporte.getId()
        );
    }

    private String construirTemplateReporteActualizado(ReporteResponse reporte) {
        String estadoColor = switch(reporte.getEstado()) {
            case "EN_REVISION" -> "#17a2b8";
            case "RESUELTO" -> "#28a745";
            case "RECHAZADO" -> "#dc3545";
            default -> "#ffc107";
        };

        String estadoTexto = switch(reporte.getEstado()) {
            case "EN_REVISION" -> "EN REVISIÓN";
            case "RESUELTO" -> "RESUELTO";
            case "RECHAZADO" -> "RECHAZADO";
            default -> "PENDIENTE";
        };

        return String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 20px auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

          
                    <div style="background: linear-gradient(135deg, #0066cc 0%%, #0052a3 100%%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">🔔 Actualización de Reporte</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Sistema de Grados y Títulos</p>
                    </div>

                    <div style="padding: 30px;">
                        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Su reporte ha sido actualizado:
                        </p>

                        <div style="background-color: #f8f9fa; border-left: 4px solid %s; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 5px 0; color: #555;"><strong>Reporte:</strong> #%d</p>
                            <p style="margin: 5px 0; color: #555;"><strong>Grado:</strong> %s - %s</p>
                            <p style="margin: 15px 0 5px 0; color: #555;"><strong>Nuevo Estado:</strong></p>
                            <span style="display: inline-block; background-color: %s; color: white; padding: 6px 16px; border-radius: 14px; font-size: 13px; font-weight: bold;">
                                %s
                            </span>
                        </div>

                        %s

                        <p style="color: #666; font-size: 13px; line-height: 1.6; margin: 20px 0 0 0; padding-top: 20px; border-top: 1px solid #e9ecef;">
                            <strong>Fecha de actualización:</strong> %s
                        </p>
                    </div>


                    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0; color: #666; font-size: 12px;">
                            Este es un correo automático, por favor no responder.
                        </p>
                        <p style="margin: 10px 0 0 0; color: #999; font-size: 11px;">
                            Universidad Nacional de Tumbes - Sistema de Gestión Documentaria
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """,
            estadoColor,
            reporte.getId(),
            reporte.getCodigoDiploma(),
            reporte.getAlumnoNombre(),
            estadoColor,
            estadoTexto,
            reporte.getComentarioAdmin() != null && !reporte.getComentarioAdmin().isEmpty()
                ? String.format("<div style=\"background-color: #e7f3ff; padding: 15px; margin: 20px 0; border-radius: 4px;\"><p style=\"margin: 0; color: #555;\"><strong>Comentario del administrador:</strong></p><p style=\"margin: 10px 0 0 0; color: #333;\">%s</p></div>", reporte.getComentarioAdmin())
                : "",
            reporte.getFechaActualizacion() != null ? reporte.getFechaActualizacion().format(DATE_FORMATTER) : "N/A"
        );
    }
}