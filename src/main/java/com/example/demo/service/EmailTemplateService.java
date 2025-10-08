package com.example.demo.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.model.Usuario;

@Service
public class EmailTemplateService {

    @Value("${app.url:http://localhost:4200}")
    private String appUrl;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public String createWelcomeEmailTemplate(Usuario usuario, String username, String password) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido al Sistema</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white;
                        padding: 40px 30px;
                        text-align: center;
                        position: relative;
                    }
                    .header::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="20" cy="80" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="30" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%%23grain)"/></svg>');
                        opacity: 0.3;
                    }
                    .header h1 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                        position: relative;
                        z-index: 1;
                    }
                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                        position: relative;
                        z-index: 1;
                    }
                    .welcome-icon {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }
                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }
                    .greeting {
                        font-size: 20px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .message {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }
                    .credentials-card {
                        background: linear-gradient(135deg, #f8f9fa 0%%, #e9ecef 100%%);
                        border: 2px solid #667eea;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                        position: relative;
                        overflow: hidden;
                    }
                    .credentials-card::before {
                        content: '🔐';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                        opacity: 0.7;
                    }
                    .credentials-card h3 {
                        color: #667eea;
                        font-size: 18px;
                        margin-bottom: 20px;
                        font-weight: 600;
                    }
                    .credential-item {
                        background: white;
                        border-radius: 12px;
                        padding: 16px 20px;
                        margin-bottom: 12px;
                        border-left: 4px solid #667eea;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .credential-item:last-child {
                        margin-bottom: 0;
                    }
                    .credential-label {
                        font-weight: 600;
                        color: #495057;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .credential-value {
                        font-family: 'Courier New', monospace;
                        background: #f1f3f4;
                        padding: 8px 12px;
                        border-radius: 6px;
                        font-weight: 600;
                        color: #2c3e50;
                        border: 1px solid #d1d5db;
                    }
                    .important-notice {
                        background: linear-gradient(135deg, #fff3cd 0%%, #ffeaa7 100%%);
                        border: 2px solid #f39c12;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                        position: relative;
                    }
                    .important-notice::before {
                        content: '⚠️';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .important-notice h4 {
                        color: #d68910;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }
                    .important-notice p {
                        color: #6c5ce7;
                        margin: 0;
                        font-weight: 500;
                    }
                    .action-buttons {
                        text-align: center;
                        margin: 35px 0;
                    }
                    .btn-primary {
                        display: inline-block;
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white;
                        padding: 16px 40px;
                        text-decoration: none;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 16px;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
                    }
                    .features {
                        background: #f8f9fb;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                    }
                    .features h3 {
                        color: #2c3e50;
                        text-align: center;
                        margin-bottom: 25px;
                        font-size: 18px;
                    }
                    .feature-list {
                        list-style: none;
                        padding: 0;
                    }
                    .feature-item {
                        display: flex;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid #e9ecef;
                    }
                    .feature-item:last-child {
                        border-bottom: none;
                    }
                    .feature-icon {
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white;
                        border-radius: 50%%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                        font-size: 18px;
                    }
                    .feature-text {
                        color: #495057;
                        font-weight: 500;
                    }
                    .footer {
                        background: #2c3e50;
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .footer h4 {
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: 600;
                    }
                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }
                    .footer .contact-info {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #34495e;
                    }
                    @media (max-width: 600px) {
                        .email-container { margin: 10px; }
                        .content, .header { padding: 25px 20px; }
                        .credentials-card, .important-notice, .features { padding: 20px; }
                        .header h1 { font-size: 28px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="welcome-icon">🎉</span>
                        <h1>¡Bienvenido!</h1>
                        <p>Tu cuenta ha sido creada exitosamente</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            ¡Hola %s %s! 👋
                        </div>

                        <div class="message">
                            Nos complace darte la bienvenida al <strong>Sistema de Trámite Documentario</strong>.
                            Tu cuenta ha sido configurada y ya puedes comenzar a usar todas las funcionalidades disponibles.
                        </div>

                        <div class="credentials-card">
                            <h3>🔑 Tus Credenciales de Acceso</h3>
                            <div class="credential-item">
                                <span class="credential-label">Usuario</span>
                                <span class="credential-value">%s</span>
                            </div>
                            <div class="credential-item">
                                <span class="credential-label">Contraseña</span>
                                <span class="credential-value">%s</span>
                            </div>
                        </div>

                        <div class="important-notice">
                            <h4>🔒 Importante - Seguridad</h4>
                            <p>
                                Por tu seguridad, te recomendamos cambiar esta contraseña temporal
                                después de tu primer inicio de sesión. Mantén tus credenciales seguras
                                y no las compartas con nadie.
                            </p>
                        </div>

                        <div class="action-buttons">
                            <a href="%s/login" class="btn-primary">
                                Iniciar Sesión Ahora →
                            </a>
                        </div>

                        <div class="features">
                            <h3>🚀 ¿Qué puedes hacer en el sistema?</h3>
                            <ul class="feature-list">
                                <li class="feature-item">
                                    <div class="feature-icon">📝</div>
                                    <div class="feature-text">Crear y gestionar trámites documentarios</div>
                                </li>
                                <li class="feature-item">
                                    <div class="feature-icon">📊</div>
                                    <div class="feature-text">Hacer seguimiento del estado de tus solicitudes</div>
                                </li>
                                <li class="feature-item">
                                    <div class="feature-icon">📱</div>
                                    <div class="feature-text">Recibir notificaciones en tiempo real</div>
                                </li>
                                <li class="feature-item">
                                    <div class="feature-icon">📁</div>
                                    <div class="feature-text">Descargar documentos procesados</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer">
                        <h4>Sistema de Trámite Documentario</h4>
                        <p>Universidad Nacional de Tumbes</p>
                        <div class="contact-info">
                            <p>Este es un correo automático, por favor no respondas a este mensaje</p>
                            <p>Si necesitas ayuda, contacta al área de soporte técnico</p>
                            <p style="margin-top: 15px; font-size: 12px;">© 2024 Todos los derechos reservados</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """,
            usuario.getNombre(),
            usuario.getApellidos(),
            username,
            password,
            appUrl
        );
    }

    /**
     * Template moderno para notificación de cambio de contraseña
     */
    public String createPasswordChangeNotificationTemplate(Usuario usuario) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Contraseña Actualizada</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        background: linear-gradient(135deg, #10b981 0%%, #059669 100%%);
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, #10b981 0%%, #059669 100%%);
                        color: white;
                        padding: 40px 30px;
                        text-align: center;
                        position: relative;
                    }
                    .header::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="check" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M6 10l3 3 6-6" stroke="white" stroke-width="2" fill="none" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%%23check)"/></svg>');
                        opacity: 0.2;
                    }
                    .header h1 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                        position: relative;
                        z-index: 1;
                    }
                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                        position: relative;
                        z-index: 1;
                    }
                    .success-icon {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }
                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }
                    .greeting {
                        font-size: 20px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .message {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }
                    .success-card {
                        background: linear-gradient(135deg, #d1fae5 0%%, #a7f3d0 100%%);
                        border: 2px solid #10b981;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                        text-align: center;
                        position: relative;
                    }
                    .success-card::before {
                        content: '✅';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .success-card h3 {
                        color: #047857;
                        font-size: 18px;
                        margin-bottom: 15px;
                        font-weight: 600;
                    }
                    .success-card p {
                        color: #065f46;
                        margin: 0;
                        font-weight: 500;
                    }
                    .info-card {
                        background: #f8f9fb;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
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
                    .security-notice {
                        background: linear-gradient(135deg, #fef3c7 0%%, #fbbf24 100%%);
                        border: 2px solid #f59e0b;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                        position: relative;
                    }
                    .security-notice::before {
                        content: '🔒';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .security-notice h4 {
                        color: #d97706;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }
                    .security-notice p {
                        color: #92400e;
                        margin: 0;
                        font-weight: 500;
                    }
                    .footer {
                        background: #2c3e50;
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .footer h4 {
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: 600;
                    }
                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }
                    @media (max-width: 600px) {
                        .email-container { margin: 10px; }
                        .content, .header { padding: 25px 20px; }
                        .success-card, .security-notice, .info-card { padding: 20px; }
                        .header h1 { font-size: 28px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="success-icon">🔐</span>
                        <h1>Contraseña Actualizada</h1>
                        <p>Tu contraseña ha sido cambiada exitosamente</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Hola %s %s 👋
                        </div>

                        <div class="message">
                            Te confirmamos que tu contraseña ha sido <strong>actualizada exitosamente</strong>
                            en el Sistema de Trámite Documentario.
                        </div>

                        <div class="success-card">
                            <h3>✅ Cambio Exitoso</h3>
                            <p>Tu nueva contraseña ya está activa y lista para usar</p>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">📅 Fecha del cambio:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔐 Estado:</span>
                                <span class="info-value" style="color: #10b981; font-weight: 600;">Activa</span>
                            </div>
                        </div>

                        <div class="security-notice">
                            <h4>🔒 Aviso de Seguridad</h4>
                            <p>
                                Si <strong>no fuiste tú</strong> quien realizó este cambio, por favor contacta
                                inmediatamente al administrador del sistema. Tu cuenta podría estar comprometida.
                            </p>
                        </div>
                    </div>

                    <div class="footer">
                        <h4>Sistema de Trámite Documentario</h4>
                        <p>Universidad Nacional de Tumbes</p>
                        <p style="margin-top: 15px;">Este es un correo automático, por favor no respondas a este mensaje</p>
                        <p style="margin-top: 10px; font-size: 12px;">© 2024 Todos los derechos reservados</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            usuario.getNombre(),
            usuario.getApellidos(),
            LocalDateTime.now().format(DATE_FORMATTER),
            usuario.getUsuario()
        );
    }

    /**
     * Template moderno para notificación de restablecimiento de contraseña por admin
     */
    public String createPasswordResetByAdminTemplate(Usuario usuario, String newPassword, String reason) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Contraseña Restablecida</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        background: linear-gradient(135deg, #f59e0b 0%%, #d97706 100%%);
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, #f59e0b 0%%, #d97706 100%%);
                        color: white;
                        padding: 40px 30px;
                        text-align: center;
                        position: relative;
                    }
                    .header h1 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }
                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                    }
                    .reset-icon {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }
                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }
                    .greeting {
                        font-size: 20px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .message {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }
                    .alert-card {
                        background: linear-gradient(135deg, #fef3c7 0%%, #fbbf24 100%%);
                        border: 2px solid #f59e0b;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                        position: relative;
                    }
                    .alert-card::before {
                        content: '⚠️';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .alert-card h4 {
                        color: #d97706;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }
                    .alert-card p {
                        color: #92400e;
                        margin: 0;
                        font-weight: 500;
                    }
                    .new-password-card {
                        background: linear-gradient(135deg, #f8f9fa 0%%, #e9ecef 100%%);
                        border: 2px solid #f59e0b;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                        text-align: center;
                        position: relative;
                    }
                    .new-password-card::before {
                        content: '🔑';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .new-password-card h3 {
                        color: #d97706;
                        font-size: 18px;
                        margin-bottom: 20px;
                        font-weight: 600;
                    }
                    .password-display {
                        background: white;
                        border: 2px solid #f59e0b;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                        font-family: 'Courier New', monospace;
                        font-size: 24px;
                        font-weight: 700;
                        color: #d97706;
                        letter-spacing: 2px;
                        word-break: break-all;
                        box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
                    }
                    .info-card {
                        background: #f8f9fb;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
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
                    .action-buttons {
                        text-align: center;
                        margin: 35px 0;
                    }
                    .btn-primary {
                        display: inline-block;
                        background: linear-gradient(135deg, #f59e0b 0%%, #d97706 100%%);
                        color: white;
                        padding: 16px 40px;
                        text-decoration: none;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 16px;
                        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
                        transition: all 0.3s ease;
                    }
                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.6);
                    }
                    .footer {
                        background: #2c3e50;
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .footer h4 {
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: 600;
                    }
                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }
                    @media (max-width: 600px) {
                        .email-container { margin: 10px; }
                        .content, .header { padding: 25px 20px; }
                        .new-password-card, .alert-card, .info-card { padding: 20px; }
                        .header h1 { font-size: 28px; }
                        .password-display { font-size: 18px; letter-spacing: 1px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="reset-icon">🔐</span>
                        <h1>Contraseña Restablecida</h1>
                        <p>Un administrador ha actualizado tu contraseña</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Hola %s %s 👋
                        </div>

                        <div class="message">
                            Un administrador del sistema ha <strong>restablecido tu contraseña</strong>
                            en el Sistema de Trámite Documentario.
                        </div>

                        <div class="alert-card">
                            <h4>📋 Motivo del Restablecimiento</h4>
                            <p>%s</p>
                        </div>

                        <div class="new-password-card">
                            <h3>🔑 Tu Nueva Contraseña</h3>
                            <div class="password-display">%s</div>
                            <p style="color: #6b7280; font-size: 14px; margin-top: 15px;">
                                Guarda esta contraseña en un lugar seguro
                            </p>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">📅 Fecha del restablecimiento:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔐 Estado:</span>
                                <span class="info-value" style="color: #f59e0b; font-weight: 600;">%s</span>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <a href="%s/login" class="btn-primary">
                                Iniciar Sesión Ahora →
                            </a>
                        </div>
                    </div>

                    <div class="footer">
                        <h4>Sistema de Trámite Documentario</h4>
                        <p>Universidad Nacional de Tumbes</p>
                        <p style="margin-top: 15px;">Este es un correo automático, por favor no respondas a este mensaje</p>
                        <p style="margin-top: 10px; font-size: 12px;">© 2024 Todos los derechos reservados</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            usuario.getNombre(),
            usuario.getApellidos(),
            reason != null ? reason : "No especificado",
            newPassword,
            LocalDateTime.now().format(DATE_FORMATTER),
            usuario.getUsuario(),
            usuario.isMustChangePassword() ? "Debe cambiar contraseña en el próximo inicio de sesión" : "Lista para usar",
            appUrl
        );
    }

    /**
     * Template moderno para notificación de bloqueo de cuenta
     */
    public String createAccountLockNotificationTemplate(Usuario usuario, boolean locked, String reason) {
        String statusText = locked ? "Bloqueada" : "Desbloqueada";
        String statusColor = locked ? "#dc3545" : "#10b981";
        String statusIcon = locked ? "🔒" : "🔓";
        String statusMessage = locked ?
            "Tu cuenta ha sido bloqueada por razones de seguridad" :
            "Tu cuenta ha sido desbloqueada y ya puedes acceder normalmente";

        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cuenta %s</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        background: linear-gradient(135deg, %s 0%%, %s 100%%);
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, %s 0%%, %s 100%%);
                        color: white;
                        padding: 40px 30px;
                        text-align: center;
                    }
                    .header h1 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }
                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                    }
                    .status-icon {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }
                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }
                    .greeting {
                        font-size: 20px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .message {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }
                    .status-card {
                        background: linear-gradient(135deg, %s 0%%, %s 100%%);
                        border: 2px solid %s;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                        text-align: center;
                        position: relative;
                    }
                    .status-card::before {
                        content: '%s';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .status-card h3 {
                        color: %s;
                        font-size: 18px;
                        margin-bottom: 15px;
                        font-weight: 600;
                    }
                    .status-card p {
                        color: %s;
                        margin: 0;
                        font-weight: 500;
                    }
                    .info-card {
                        background: #f8f9fb;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
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
                    .action-steps {
                        background: #f8f9fb;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                    }
                    .action-steps h3 {
                        color: #2c3e50;
                        text-align: center;
                        margin-bottom: 25px;
                        font-size: 18px;
                    }
                    .step-list {
                        list-style: none;
                        padding: 0;
                    }
                    .step-item {
                        display: flex;
                        align-items: flex-start;
                        padding: 15px 0;
                        border-bottom: 1px solid #e9ecef;
                    }
                    .step-item:last-child {
                        border-bottom: none;
                    }
                    .step-number {
                        width: 30px;
                        height: 30px;
                        background: %s;
                        color: white;
                        border-radius: 50%%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                        font-weight: 600;
                        font-size: 14px;
                        flex-shrink: 0;
                    }
                    .step-text {
                        color: #495057;
                        font-weight: 500;
                        line-height: 1.5;
                    }
                    .footer {
                        background: #2c3e50;
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .footer h4 {
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: 600;
                    }
                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }
                    @media (max-width: 600px) {
                        .email-container { margin: 10px; }
                        .content, .header { padding: 25px 20px; }
                        .status-card, .action-steps, .info-card { padding: 20px; }
                        .header h1 { font-size: 28px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="status-icon">%s</span>
                        <h1>Cuenta %s</h1>
                        <p>Estado de tu cuenta actualizado</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Hola %s %s 👋
                        </div>

                        <div class="message">
                            %s
                        </div>

                        <div class="status-card">
                            <h3>Estado de la Cuenta</h3>
                            <p><strong>%s</strong></p>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">📅 Fecha:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">📋 Motivo:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔐 Estado actual:</span>
                                <span class="info-value" style="color: %s; font-weight: 600;">%s</span>
                            </div>
                        </div>

                        <div class="action-steps">
                            <h3>%s</h3>
                            <ul class="step-list">
                                %s
                            </ul>
                        </div>
                    </div>

                    <div class="footer">
                        <h4>Sistema de Trámite Documentario</h4>
                        <p>Universidad Nacional de Tumbes</p>
                        <p style="margin-top: 15px;">Este es un correo automático, por favor no respondas a este mensaje</p>
                        <p style="margin-top: 10px; font-size: 12px;">© 2024 Todos los derechos reservados</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            statusText,
            statusColor, locked ? "#b91c1c" : "#047857",
            statusColor, locked ? "#b91c1c" : "#047857",
            locked ? "#fecaca" : "#d1fae5", locked ? "#f87171" : "#86efac", statusColor,
            statusIcon,
            locked ? "#dc2626" : "#059669",
            locked ? "#7f1d1d" : "#064e3b",
            statusColor,
            statusIcon,
            statusText,
            usuario.getNombre(),
            usuario.getApellidos(),
            statusMessage,
            statusText,
            LocalDateTime.now().format(DATE_FORMATTER),
            usuario.getUsuario(),
            reason != null ? reason : "No especificado",
            statusColor,
            statusText,
            locked ? "¿Qué hacer si consideras que esto es un error?" : "¿Qué puedes hacer ahora?",
            locked ?
                "<li class=\"step-item\"><div class=\"step-number\">1</div><div class=\"step-text\">Contacta inmediatamente al administrador del sistema</div></li>" +
                "<li class=\"step-item\"><div class=\"step-number\">2</div><div class=\"step-text\">Proporciona tu información de usuario y el motivo de consulta</div></li>" +
                "<li class=\"step-item\"><div class=\"step-number\">3</div><div class=\"step-text\">Espera la respuesta del equipo de soporte</div></li>" +
                "<li class=\"step-item\"><div class=\"step-number\">4</div><div class=\"step-text\">No intentes crear una nueva cuenta</div></li>" :
                "<li class=\"step-item\"><div class=\"step-number\">1</div><div class=\"step-text\">Ya puedes iniciar sesión normalmente en el sistema</div></li>" +
                "<li class=\"step-item\"><div class=\"step-number\">2</div><div class=\"step-text\">Usa tus credenciales habituales para acceder</div></li>" +
                "<li class=\"step-item\"><div class=\"step-number\">3</div><div class=\"step-text\">Si tienes problemas, contacta al soporte técnico</div></li>"
        );
    }

   
    public String createAccountStatusNotificationTemplate(Usuario usuario, boolean enabled, String reason) {
        String statusText = enabled ? "Habilitada" : "Deshabilitada";
        String statusColor = enabled ? "#10b981" : "#ef4444";
        String statusIcon = enabled ? "✅" : "❌";
        String statusMessage = enabled ?
            "Tu cuenta ha sido habilitada y ya puedes acceder al sistema" :
            "Tu cuenta ha sido deshabilitada temporalmente";

        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cuenta %s</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.6;
                        color: #333333;
                        background: linear-gradient(135deg, %s 0%%, %s 100%%);
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: linear-gradient(135deg, %s 0%%, %s 100%%);
                        color: white;
                        padding: 40px 30px;
                        text-align: center;
                    }
                    .header h1 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }
                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                    }
                    .status-icon {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }
                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }
                    .greeting {
                        font-size: 20px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .message {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }
                    .status-card {
                        background: linear-gradient(135deg, %s 0%%, %s 100%%);
                        border: 2px solid %s;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                        text-align: center;
                        position: relative;
                    }
                    .status-card::before {
                        content: '%s';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .status-card h3 {
                        color: %s;
                        font-size: 18px;
                        margin-bottom: 15px;
                        font-weight: 600;
                    }
                    .status-card p {
                        color: %s;
                        margin: 0;
                        font-weight: 500;
                    }
                    .info-card {
                        background: #f8f9fb;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
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
                    .action-buttons {
                        text-align: center;
                        margin: 35px 0;
                    }
                    .btn-primary {
                        display: inline-block;
                        background: linear-gradient(135deg, %s 0%%, %s 100%%);
                        color: white;
                        padding: 16px 40px;
                        text-decoration: none;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 16px;
                        box-shadow: 0 4px 15px rgba(%s, 0.4);
                        transition: all 0.3s ease;
                    }
                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(%s, 0.6);
                    }
                    .footer {
                        background: #2c3e50;
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }
                    .footer h4 {
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: 600;
                    }
                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }
                    @media (max-width: 600px) {
                        .email-container { margin: 10px; }
                        .content, .header { padding: 25px 20px; }
                        .status-card, .info-card { padding: 20px; }
                        .header h1 { font-size: 28px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="status-icon">%s</span>
                        <h1>Cuenta %s</h1>
                        <p>Estado de tu cuenta actualizado</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Hola %s %s 👋
                        </div>

                        <div class="message">
                            %s
                        </div>

                        <div class="status-card">
                            <h3>Estado de la Cuenta</h3>
                            <p><strong>%s</strong></p>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">📅 Fecha:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">📋 Motivo:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔐 Estado actual:</span>
                                <span class="info-value" style="color: %s; font-weight: 600;">%s</span>
                            </div>
                        </div>

                        %s
                    </div>

                    <div class="footer">
                        <h4>Sistema de Trámite Documentario</h4>
                        <p>Universidad Nacional de Tumbes</p>
                        <p style="margin-top: 15px;">Este es un correo automático, por favor no respondas a este mensaje</p>
                        <p style="margin-top: 10px; font-size: 12px;">© 2024 Todos los derechos reservados</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            statusText,
            statusColor, enabled ? "#047857" : "#b91c1c",
            statusColor, enabled ? "#047857" : "#b91c1c",
            enabled ? "#d1fae5" : "#fecaca", enabled ? "#86efac" : "#f87171", statusColor,
            statusIcon,
            enabled ? "#059669" : "#dc2626",
            enabled ? "#064e3b" : "#7f1d1d",
            statusColor, enabled ? "#047857" : "#b91c1c",
            enabled ? "16, 185, 129" : "239, 68, 68",
            enabled ? "16, 185, 129" : "239, 68, 68",
            statusIcon,
            statusText,
            usuario.getNombre(),
            usuario.getApellidos(),
            statusMessage,
            statusText,
            LocalDateTime.now().format(DATE_FORMATTER),
            usuario.getUsuario(),
            reason != null ? reason : "No especificado",
            statusColor,
            statusText,
            enabled ?
                String.format("""
                    <div class="action-buttons">
                        <a href="%s/login" class="btn-primary">
                            Iniciar Sesión Ahora →
                        </a>
                    </div>
                    """, appUrl) :
                ""
        );
    }
}