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
                <title>Bienvenido al Sistema - Universidad Nacional de Tumbes</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #2c3e50;
                        background: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                    }

                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        border: 1px solid #e9ecef;
                    }

                    .header {
                        background: linear-gradient(135deg, #1e3a8a 0%%, #3b82f6 100%%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }

                    .university-logo {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }

                    .header h1 {
                        font-size: 28px;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                    }

                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }

                    .greeting {
                        font-size: 22px;
                        font-weight: 600;
                        color: #1e3a8a;
                        margin-bottom: 20px;
                        text-align: center;
                    }

                    .message {
                        font-size: 16px;
                        color: #4a5568;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }

                    .credentials-card {
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-left: 4px solid #3b82f6;
                        border-radius: 8px;
                        padding: 25px;
                        margin: 30px 0;
                    }

                    .credentials-card h3 {
                        color: #1e3a8a;
                        font-size: 18px;
                        margin-bottom: 20px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .credential-item {
                        background: white;
                        border-radius: 6px;
                        padding: 15px 20px;
                        margin-bottom: 12px;
                        border: 1px solid #e2e8f0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .credential-item:last-child {
                        margin-bottom: 0;
                    }

                    .credential-label {
                        font-weight: 600;
                        color: #4a5568;
                        font-size: 14px;
                    }

                    .credential-value {
                        font-family: 'Courier New', monospace;
                        background: #e2e8f0;
                        padding: 6px 12px;
                        border-radius: 4px;
                        font-weight: 600;
                        color: #1e293b;
                        font-size: 14px;
                    }

                    .important-notice {
                        background: #fef3c7;
                        border: 1px solid #f59e0b;
                        border-left: 4px solid #f59e0b;
                        border-radius: 6px;
                        padding: 20px;
                        margin: 25px 0;
                    }

                    .important-notice h4 {
                        color: #d97706;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .important-notice p {
                        color: #92400e;
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.5;
                    }

                    .action-buttons {
                        text-align: center;
                        margin: 30px 0;
                    }

                    .btn-primary {
                        display: inline-block;
                        background: #3b82f6;
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        font-size: 16px;
                        transition: background-color 0.3s ease;
                    }

                    .btn-primary:hover {
                        background: #2563eb;
                    }

                    .features {
                        background: #f1f5f9;
                        border-radius: 8px;
                        padding: 25px;
                        margin: 25px 0;
                        border: 1px solid #e2e8f0;
                    }

                    .features h3 {
                        color: #1e3a8a;
                        text-align: center;
                        margin-bottom: 20px;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .feature-list {
                        list-style: none;
                        padding: 0;
                    }

                    .feature-item {
                        display: flex;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid #e2e8f0;
                    }

                    .feature-item:last-child {
                        border-bottom: none;
                    }

                    .feature-icon {
                        width: 36px;
                        height: 36px;
                        background: #3b82f6;
                        color: white;
                        border-radius: 50%%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 15px;
                        font-size: 16px;
                    }

                    .feature-text {
                        color: #374151;
                        font-weight: 500;
                        font-size: 14px;
                    }

                    .footer {
                        background: #1f2937;
                        color: white;
                        padding: 25px 30px;
                        text-align: center;
                    }

                    .footer h4 {
                        margin-bottom: 10px;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }

                    .footer .university-info {
                        font-size: 15px;
                        font-weight: 500;
                        color: #93c5fd;
                        margin-bottom: 15px;
                    }

                    .footer .contact-info {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #374151;
                    }

                    @media (max-width: 600px) {
                        body { padding: 10px; }
                        .email-container { margin: 0; }
                        .content, .header { padding: 20px; }
                        .credentials-card, .important-notice, .features { padding: 20px; }
                        .header h1 { font-size: 24px; }
                        .university-logo { font-size: 36px; }
                        .credential-item {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 8px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="university-logo">🏛️</span>
                        <h1>Bienvenido al Sistema</h1>
                        <p>Universidad Nacional de Tumbes</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Estimado/a %s %s
                        </div>

                        <div class="message">
                            Le damos la cordial bienvenida al <strong>Sistema de Secretaria General</strong>
                            de la Universidad Nacional de Tumbes. Su cuenta ha sido creada exitosamente
                            y ya puede acceder a todas las funcionalidades del sistema.
                        </div>

                        <div class="credentials-card">
                            <h3>🔐 Sus Credenciales de Acceso</h3>
                            <div class="credential-item">
                                <span class="credential-label">Usuario:</span>
                                <span class="credential-value">%s</span>
                            </div>
                            <div class="credential-item">
                                <span class="credential-label">Contraseña temporal:</span>
                                <span class="credential-value">%s</span>
                            </div>
                        </div>

                        <div class="important-notice">
                            <h4>⚠️ Importante - Seguridad</h4>
                            <p>
                                Por su seguridad, le recomendamos cambiar esta contraseña temporal
                                después de su primer inicio de sesión. Mantenga sus credenciales
                                seguras y no las comparta con terceros.
                            </p>
                        </div>

                        <div class="action-buttons">
                            <a href="%s/servicios-administrativos" class="btn-primary">
                                Acceder al Sistema
                            </a>
                        </div>

                        <div class="features">
                            <h3>Funcionalidades Disponibles</h3>
                            <ul class="feature-list">
                                <li class="feature-item">
                                    <div class="feature-icon">📝</div>
                                    <div class="feature-text">Crear y gestionar trámites documentarios</div>
                                </li>
                                <li class="feature-item">
                                    <div class="feature-icon">📊</div>
                                    <div class="feature-text">Seguimiento del estado de sus solicitudes</div>
                                </li>
                                <li class="feature-item">
                                    <div class="feature-icon">📱</div>
                                    <div class="feature-text">Recibir notificaciones en tiempo real</div>
                                </li>
                                <li class="feature-item">
                                    <div class="feature-icon">📁</div>
                                    <div class="feature-text">Descargar documentos procesados</div>
                                </li>
                                <li class="feature-item">
                                    <div class="feature-icon">👥</div>
                                    <div class="feature-text">Comunicación directa con las oficinas</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="footer-content">
                            <h4>Sistema de Secretaria General</h4>
                            <p class="university-info">Universidad Nacional de Tumbes</p>
                            <div class="contact-info">
                                <p>Este es un correo automático, por favor no responda a este mensaje</p>
                                <p>Si necesita ayuda, contacte al área de soporte técnico</p>
                                <p style="margin-top: 15px; font-size: 12px; opacity: 0.6;">
                                    © 2025 Universidad Nacional de Tumbes - Todos los derechos reservados
                                </p>
                            </div>
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
            appUrl,
            LocalDateTime.now().getYear()
        );
    }

    public String createPasswordChangeNotificationTemplate(Usuario usuario) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Credenciales Actualizadas</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        line-height: 1.6;
                        color: #2c3e50;
                        background: #f5f7fa;
                        margin: 0;
                        padding: 20px;
                    }

                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    }

                    .header {
                        background: #ffffff;
                        border-bottom: 3px solid #10b981;
                        padding: 40px;
                        text-align: center;
                    }

                    .header h1 {
                        font-size: 28px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 5px;
                    }

                    .header-subtitle {
                        font-size: 14px;
                        color: #718096;
                        font-weight: 400;
                    }

                    .content {
                        padding: 40px;
                        background: #ffffff;
                    }

                    .greeting {
                        font-size: 16px;
                        font-weight: 500;
                        color: #2c3e50;
                        margin-bottom: 20px;
                    }

                    .message {
                        font-size: 15px;
                        color: #4a5568;
                        margin-bottom: 30px;
                        line-height: 1.7;
                    }

                    .success-card {
                        background: #f0fdf4;
                        border-left: 4px solid #10b981;
                        padding: 20px;
                        margin: 25px 0;
                        border-radius: 4px;
                    }

                    .success-card h3 {
                        color: #10b981;
                        font-size: 16px;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .success-card p {
                        color: #047857;
                        margin: 0;
                        font-size: 14px;
                        font-weight: 500;
                    }

                    .info-section {
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 4px;
                        padding: 25px;
                        margin: 25px 0;
                    }

                    .info-section h4 {
                        color: #2c3e50;
                        font-size: 14px;
                        font-weight: 600;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px 0;
                        border-bottom: 1px solid #e2e8f0;
                        font-size: 14px;
                    }

                    .info-row:last-child {
                        border-bottom: none;
                    }

                    .info-label {
                        color: #718096;
                        font-weight: 500;
                    }

                    .info-value {
                        color: #2c3e50;
                        font-weight: 600;
                    }

                    .security-notice {
                        background: #fffbeb;
                        border-left: 4px solid #f59e0b;
                        padding: 20px;
                        margin: 25px 0;
                        border-radius: 4px;
                    }

                    .security-notice h4 {
                        color: #d97706;
                        font-size: 14px;
                        font-weight: 700;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .security-notice p {
                        color: #92400e;
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.6;
                        font-weight: 500;
                    }

                    .cta-section {
                        background: #f0fdf4;
                        border-radius: 4px;
                        padding: 25px;
                        margin: 30px 0;
                        text-align: center;
                    }

                    .cta-text {
                        color: #2c3e50;
                        font-size: 14px;
                        font-weight: 500;
                        margin-bottom: 15px;
                    }

                    .footer {
                        background: #2c3e50;
                        color: #ecf0f1;
                        padding: 30px 40px;
                        text-align: center;
                        border-top: 1px solid #1a252f;
                    }

                    .footer h4 {
                        margin-bottom: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        color: #ecf0f1;
                    }

                    .footer p {
                        margin: 5px 0;
                        opacity: 0.85;
                        font-size: 13px;
                        font-weight: 400;
                    }

                    .divider {
                        height: 1px;
                        background: #e2e8f0;
                        margin: 25px 0;
                    }

                    /* Responsive */
                    @media (max-width: 600px) {
                        body { padding: 10px; }
                        .header { padding: 25px; }
                        .content { padding: 25px; }
                        .footer { padding: 20px; }
                        .header h1 { font-size: 24px; }
                        .info-row { flex-direction: column; gap: 5px; }
                        .info-label { margin-bottom: 3px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1>Credenciales Actualizadas</h1>
                        <p class="header-subtitle">Tu información está segura</p>
                    </div>

                    <div class="content">
                        <div class="greeting">Hola %s,</div>

                        <div class="message">
                            Te confirmamos que tus credenciales han sido actualizadas exitosamente en el Sistema de Secretaria General. Este cambio mantiene tu cuenta segura y protegida.
                        </div>

                        <div class="success-card">
                            <h3>Cambio Exitoso</h3>
                            <p>Tus nuevas credenciales ya están activas</p>
                        </div>

                        <div class="info-section">
                            <h4>Detalles de la Actualización</h4>
                            <div class="info-row">
                                <span class="info-label">Fecha de cambio</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Usuario</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Estado</span>
                                <span class="info-value" style="color: #10b981;">Activa</span>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <div class="security-notice">
                            <h4>Aviso de Seguridad</h4>
                            <p>Si no fuiste tú quien realizó este cambio, contacta inmediatamente al administrador del sistema. Tu cuenta podría estar en riesgo.</p>
                        </div>

                        <div class="cta-section">
                            <p class="cta-text">Mantén tu contraseña segura y no la compartas con nadie. Nunca te pediremos que la reveles por correo.</p>
                        </div>
                    </div>

                    <div class="footer">
                        <h4>Sistema de Secretaria General</h4>
                        <p>Universidad Nacional de Tumbes</p>
                        <p>Este es un correo automático. Por favor no respondas a este mensaje.</p>
                        <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
                            © 2025 Todos los derechos reservados
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """,
            usuario.getNombre(),
            LocalDateTime.now().format(DATE_FORMATTER),
            usuario.getUsuario()
        );
    }


    public String createPasswordResetTemplate(Usuario usuario, String newPassword, String reason) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Contraseña Restablecida Exitosamente</title>
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
                    .header h1 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }
                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
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
                        padding: 25px;
                        margin: 30px 0;
                        position: relative;
                    }
                    .success-card::before {
                        content: '✅';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                    }
                    .success-card h4 {
                        color: #065f46;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }
                    .success-card p {
                        color: #047857;
                        margin: 0;
                        font-weight: 500;
                    }
                    .new-password-card {
                        background: linear-gradient(135deg, #f8f9fa 0%%, #e9ecef 100%%);
                        border: 2px solid #10b981;
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
                        color: #065f46;
                        font-size: 18px;
                        margin-bottom: 20px;
                        font-weight: 600;
                    }
                    .password-display {
                        background: white;
                        border: 2px solid #10b981;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                        font-family: 'Courier New', monospace;
                        font-size: 24px;
                        font-weight: 700;
                        color: #065f46;
                        letter-spacing: 2px;
                        word-break: break-all;
                        box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
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
                        background: linear-gradient(135deg, #10b981 0%%, #059669 100%%);
                        color: white;
                        padding: 16px 40px;
                        text-decoration: none;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 16px;
                        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                        transition: all 0.3s ease;
                    }
                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6);
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
                        .new-password-card, .success-card, .info-card, .security-notice { padding: 20px; }
                        .header h1 { font-size: 28px; }
                        .password-display { font-size: 18px; letter-spacing: 1px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="success-icon">🔑</span>
                        <h1>Contraseña Restablecida</h1>
                        <p>Tu nueva contraseña está lista</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Hola %s %s 👋
                        </div>

                        <div class="message">
                            Te confirmamos que tu <strong>contraseña ha sido restablecida exitosamente</strong>
                            en el Sistema de Secretaria General.
                        </div>

                        <div class="success-card">
                            <h4>🎉 ¡Restablecimiento Exitoso!</h4>
                            <p>Tu nueva contraseña temporal ha sido generada y está lista para usar.</p>
                        </div>

                        %s

                        <div class="new-password-card">
                            <h3>🔑 Tu Nueva Contraseña Temporal</h3>
                            <div class="password-display">%s</div>
                            <p style="color: #6b7280; font-size: 14px; margin-top: 15px;">
                                Guarda esta contraseña en un lugar seguro
                            </p>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">📅 Fecha de restablecimiento:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔐 Estado:</span>
                                <span class="info-value" style="color: #10b981; font-weight: 600;">%s</span>
                            </div>
                        </div>

                        <div class="security-notice">
                            <h4>🔒 Recomendación de Seguridad</h4>
                            <p>
                                Por tu seguridad, te recomendamos <strong>cambiar esta contraseña temporal</strong>
                                después de tu primer inicio de sesión. Usa una contraseña segura y única.
                            </p>
                        </div>

                        <div class="action-buttons">
                            <a href="%s/login" class="btn-primary">
                                Iniciar Sesión Ahora →
                            </a>
                        </div>
                    </div>

                    <div class="footer">
                        <h4>Sistema de Secretaria General</h4>
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
            reason != null && !reason.isEmpty() ?
                String.format("""
                    <div class="info-card" style="background: #f0f9ff; border: 2px solid #0ea5e9;">
                        <div class="info-row">
                            <span class="info-label">📋 Motivo del restablecimiento:</span>
                            <span class="info-value">%s</span>
                        </div>
                    </div>
                    """, reason) : "",
            newPassword,
            LocalDateTime.now().format(DATE_FORMATTER),
            usuario.getUsuario(),
            usuario.isMustChangePassword() ? "Debe cambiar contraseña en el próximo inicio de sesión" : "Lista para usar",
            appUrl
        );
    }

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
                        color: #1f2937;
                        background: #f3f4f6;
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    }
                    .header {
                        background: #dbeafe;
                        color: #1e40af;
                        padding: 40px 30px;
                        text-align: center;
                    }
                    .header h1 {
                        font-size: 32px;
                        font-weight: 700;
                        margin-bottom: 10px;
                        color: #1e3a8a;
                    }
                    .header p {
                        font-size: 16px;
                        color: #1e40af;
                        font-weight: 500;
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
                        color: #1e3a8a;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .message {
                        font-size: 16px;
                        color: #374151;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }
                    .alert-card {
                        background: #fff7ed;
                        border: 2px solid #f59e0b;
                        border-left: 5px solid #f59e0b;
                        border-radius: 12px;
                        padding: 25px;
                        margin: 30px 0;
                    }
                    .alert-card h4 {
                        color: #92400e;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }
                    .alert-card p {
                        color: #78350f;
                        margin: 0;
                        font-weight: 500;
                    }
                    .new-password-card {
                        background: #dbeafe;
                        border: 3px solid #3b82f6;
                        border-radius: 16px;
                        padding: 30px;
                        margin: 30px 0;
                        text-align: center;
                    }
                    .new-password-card h3 {
                        color: #1e3a8a;
                        font-size: 18px;
                        margin-bottom: 20px;
                        font-weight: 700;
                    }
                    .password-display {
                        background: #ffffff;
                        border: 3px solid #2563eb;
                        border-radius: 12px;
                        padding: 25px 20px;
                        margin: 20px 0;
                        font-family: 'Courier New', monospace;
                        font-size: 26px;
                        font-weight: 700;
                        color: #1e40af;
                        letter-spacing: 3px;
                        word-break: break-all;
                        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.15);
                    }
                    .password-help {
                        color: #1e40af;
                        font-size: 14px;
                        margin-top: 15px;
                        font-weight: 600;
                    }
                    .info-card {
                        background: #f9fafb;
                        border: 2px solid #e5e7eb;
                        border-radius: 16px;
                        padding: 25px;
                        margin: 30px 0;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 2px solid #e5e7eb;
                    }
                    .info-row:last-child {
                        border-bottom: none;
                    }
                    .info-label {
                        font-weight: 600;
                        color: #374151;
                        font-size: 14px;
                    }
                    .info-value {
                        color: #1f2937;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .security-card {
                        background: #fef3c7;
                        border: 2px solid #f59e0b;
                        border-left: 5px solid #f59e0b;
                        border-radius: 12px;
                        padding: 25px;
                        margin: 30px 0;
                    }
                    .security-card h4 {
                        color: #92400e;
                        font-size: 16px;
                        margin-bottom: 12px;
                        font-weight: 700;
                    }
                    .security-card p {
                        color: #78350f;
                        margin: 0;
                        line-height: 1.6;
                        font-weight: 500;
                    }
                    .action-buttons {
                        text-align: center;
                        margin: 35px 0;
                    }
                    .btn-primary {
                        display: inline-block;
                        background: #2563eb;
                        color: #ffffff;
                        padding: 16px 40px;
                        text-decoration: none;
                        border-radius: 10px;
                        font-weight: 700;
                        font-size: 16px;
                        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
                    }
                    .footer {
                        background: #1f2937;
                        color: #ffffff;
                        padding: 30px;
                        text-align: center;
                    }
                    .footer h4 {
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: 600;
                        color: #ffffff;
                    }
                    .footer p {
                        margin: 5px 0;
                        color: #d1d5db;
                        font-size: 14px;
                    }
                    @media (max-width: 600px) {
                        .email-container { margin: 10px; }
                        .content, .header { padding: 25px 20px; }
                        .new-password-card, .alert-card, .info-card, .security-card { padding: 20px; }
                        .header h1 { font-size: 28px; }
                        .password-display { font-size: 20px; letter-spacing: 2px; padding: 20px 15px; }
                        .info-row { flex-direction: column; align-items: flex-start; gap: 5px; }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="reset-icon">🔑</span>
                        <h1>Contraseña Restablecida</h1>
                        <p>Tu nueva contraseña está lista</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Hola %s %s 👋
                        </div>

                        <div class="message">
                            Te confirmamos que tu <strong>contraseña ha sido restablecida exitosamente</strong>
                            en el Sistema de Secretaria General.
                        </div>

                        <div class="alert-card">
                            <h4>📋 Motivo del Restablecimiento</h4>
                            <p>%s</p>
                        </div>

                        <div class="new-password-card">
                            <h3>🔑 Tu Nueva Contraseña Temporal</h3>
                            <div class="password-display">%s</div>
                            <p class="password-help">
                                Guarda esta contraseña en un lugar seguro
                            </p>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">📅 Fecha de restablecimiento:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔐 Estado:</span>
                                <span class="info-value" style="color: #10b981;">%s</span>
                            </div>
                        </div>

                        <div class="security-card">
                            <h4>🔒 Recomendación de Seguridad</h4>
                            <p>
                                Por tu seguridad, te recomendamos <strong>cambiar esta contraseña temporal</strong>
                                después de tu primer inicio de sesión. Usa una contraseña segura y única.
                            </p>
                        </div>

                        <div class="action-buttons">
                            <a href="%s/login" class="btn-primary">
                                Iniciar Sesión Ahora →
                            </a>
                        </div>
                    </div>

                    <div class="footer">
                        <h4>Sistema de Secretaria General</h4>
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
            usuario.isMustChangePassword() ? "Lista para usar" : "Lista para usar",
            appUrl
        );
    }

  
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
                        <h4>Sistema De Secretaria General</h4>
                        <p>Universidad Nacional de Tumbes</p>
                        <p style="margin-top: 15px;">Este es un correo automático, por favor no respondas a este mensaje</p>
                        <p style="margin-top: 10px; font-size: 12px;">© 2025 Todos los derechos reservados</p>
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
                "",
            LocalDateTime.now().getYear()
        );
    }

   
    public String createProfileUpdateNotificationTemplate(Usuario usuario, String cambiosRealizados) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Perfil Actualizado - Universidad Nacional de Tumbes</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #2c3e50;
                        background: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                    }

                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        border: 1px solid #e9ecef;
                    }

                    .header {
                        background: linear-gradient(135deg, #2980b9 0%%, #3498db 100%%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }

                    .update-icon {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }

                    .header h1 {
                        font-size: 28px;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                    }

                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }

                    .greeting {
                        font-size: 22px;
                        font-weight: 600;
                        color: #2980b9;
                        margin-bottom: 20px;
                        text-align: center;
                    }

                    .message {
                        font-size: 16px;
                        color: #4a5568;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }

                    .update-card {
                        background: #ebf3fd;
                        border: 2px solid #3498db;
                        border-left: 4px solid #2980b9;
                        border-radius: 8px;
                        padding: 25px;
                        margin: 30px 0;
                    }

                    .update-card h3 {
                        color: #2980b9;
                        font-size: 18px;
                        margin-bottom: 15px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .changes-list {
                        background: white;
                        border-radius: 6px;
                        padding: 20px;
                        border: 1px solid #bdc3c7;
                        white-space: pre-line;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #2c3e50;
                    }

                    .info-card {
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 8px;
                        padding: 25px;
                        margin: 25px 0;
                    }

                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid #e2e8f0;
                    }

                    .info-row:last-child {
                        border-bottom: none;
                    }

                    .info-label {
                        font-weight: 600;
                        color: #4a5568;
                        font-size: 14px;
                    }

                    .info-value {
                        color: #2d3748;
                        font-size: 14px;
                        font-weight: 500;
                    }

                    .security-notice {
                        background: #fef3c7;
                        border: 1px solid #f59e0b;
                        border-left: 4px solid #f59e0b;
                        border-radius: 6px;
                        padding: 20px;
                        margin: 25px 0;
                    }

                    .security-notice h4 {
                        color: #d97706;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .security-notice p {
                        color: #92400e;
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.5;
                    }

                    .next-steps {
                        background: #f0f9ff;
                        border: 2px solid #0ea5e9;
                        border-radius: 8px;
                        padding: 25px;
                        margin: 25px 0;
                    }

                    .next-steps h4 {
                        color: #0369a1;
                        font-size: 16px;
                        margin-bottom: 15px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .steps-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }

                    .step-item {
                        display: flex;
                        align-items: flex-start;
                        margin-bottom: 12px;
                        font-size: 14px;
                        color: #075985;
                    }

                    .step-number {
                        background: #0ea5e9;
                        color: white;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        font-weight: 600;
                        margin-right: 12px;
                        flex-shrink: 0;
                        margin-top: 2px;
                    }

                    .footer {
                        background: #1f2937;
                        color: white;
                        padding: 25px 30px;
                        text-align: center;
                    }

                    .footer h4 {
                        margin-bottom: 10px;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }

                    .footer .university-info {
                        font-size: 15px;
                        font-weight: 500;
                        color: #93c5fd;
                        margin-bottom: 15px;
                    }

                    @media (max-width: 600px) {
                        body { padding: 10px; }
                        .email-container { margin: 0; }
                        .content, .header { padding: 20px; }
                        .update-card, .security-notice, .info-card, .next-steps { padding: 20px; }
                        .header h1 { font-size: 24px; }
                        .update-icon { font-size: 36px; }
                        .info-row {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 5px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="update-icon">👤</span>
                        <h1>Perfil Actualizado</h1>
                        <p>Universidad Nacional de Tumbes</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Estimado/a %s %s
                        </div>

                        <div class="message">
                            Le informamos que su perfil en el <strong>Sistema de Trámite Documentario</strong>
                            ha sido actualizado exitosamente. A continuación encontrará el detalle
                            de los cambios realizados.
                        </div>

                        <div class="update-card">
                            <h3>📝 Cambios Realizados</h3>
                            <div class="changes-list">%s</div>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">📅 Fecha de actualización:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario:</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label"> Estado:</span>
                                <span class="info-value" style="color: #2980b9; font-weight: 600;">Actualizado</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔒 Seguridad:</span>
                                <span class="info-value" style="color: #27ae60; font-weight: 600;">Verificado</span>
                            </div>
                        </div>

                        <div class="security-notice">
                            <h4>⚠️ Verificación de Seguridad</h4>
                            <p>
                                Si <strong>usted no realizó</strong> estos cambios, contacte inmediatamente
                                al administrador del sistema. Su cuenta podría estar comprometida.
                                Es importante mantener su información personal actualizada y segura.
                            </p>
                        </div>

                        <div class="next-steps">
                            <h4>📋 Próximos Pasos Recomendados</h4>
                            <ul class="steps-list">
                                <li class="step-item">
                                    <span class="step-number">1</span>
                                    <span>Verifique que toda la información actualizada sea correcta</span>
                                </li>
                                <li class="step-item">
                                    <span class="step-number">2</span>
                                    <span>Actualice sus datos en otros sistemas institucionales si es necesario</span>
                                </li>
                                <li class="step-item">
                                    <span class="step-number">3</span>
                                    <span>Revise la configuración de notificaciones si cambió su email</span>
                                </li>
                                <li class="step-item">
                                    <span class="step-number">4</span>
                                    <span>Contacte al soporte si tiene alguna duda sobre los cambios</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="footer-content">
                            <h4>Sistema De Secretaria General</h4>
                            <p class="university-info">Universidad Nacional de Tumbes</p>
                            <p>Este es un correo automático, por favor no responda a este mensaje</p>
                            <p>Si necesita ayuda, contacte al área de soporte técnico</p>
                            <p style="margin-top: 15px; font-size: 12px; opacity: 0.6;">
                                © %d Universidad Nacional de Tumbes - Todos los derechos reservados
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """,
            usuario.getNombre(),
            usuario.getApellidos(),
            cambiosRealizados,
            LocalDateTime.now().format(DATE_FORMATTER),
            usuario.getUsuario(),
            LocalDateTime.now().getYear()
        );
    }

    /**
     * Create enhanced welcome email template with role-specific functionalities
     * @param usuario The usuario object
     * @param username The generated username
     * @param password The generated password
     * @param roleName The role name (ADMIN, ADMINISTRATIVO, USUARIO, ESTUDIANTE)
     * @param functionalities HTML formatted list of role functionalities
     * @param roleDescription Description of what the role can do
     * @return HTML email template
     */
    public String createWelcomeEmailWithRoleFunctionalitiesTemplate(Usuario usuario, String username,
            String password, String roleName, String functionalities, String roleDescription) {

        String roleIcon = getRoleIcon(roleName);
        String roleDisplayName = getRoleDisplayName(roleName);

        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido al Sistema - Universidad Nacional de Tumbes</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #2c3e50;
                        background: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                    }

                    .email-container {
                        max-width: 700px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        border: 1px solid #e9ecef;
                    }

                    .header {
                        background: linear-gradient(135deg, #1e3a8a 0%%, #3b82f6 100%%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }

                    .university-logo {
                        font-size: 48px;
                        margin-bottom: 15px;
                        display: block;
                    }

                    .header h1 {
                        font-size: 28px;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                    }

                    .content {
                        padding: 40px 30px;
                        background: #ffffff;
                    }

                    .greeting {
                        font-size: 22px;
                        font-weight: 600;
                        color: #1e3a8a;
                        margin-bottom: 20px;
                        text-align: center;
                    }

                    .message {
                        font-size: 16px;
                        color: #4a5568;
                        margin-bottom: 30px;
                        text-align: center;
                        line-height: 1.7;
                    }

                    .role-badge {
                        background: linear-gradient(135deg, #e0f2fe 0%%, #bae6fd 100%%);
                        border: 2px solid #0284c7;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 25px 0;
                        text-align: center;
                    }

                    .role-badge h3 {
                        color: #0c4a6e;
                        font-size: 20px;
                        margin-bottom: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    }

                    .role-icon {
                        font-size: 28px;
                    }

                    .role-description {
                        color: #0c4a6e;
                        font-size: 15px;
                        font-weight: 500;
                        margin-top: 10px;
                    }

                    .credentials-card {
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-left: 4px solid #3b82f6;
                        border-radius: 8px;
                        padding: 25px;
                        margin: 30px 0;
                    }

                    .credentials-card h3 {
                        color: #1e3a8a;
                        font-size: 18px;
                        margin-bottom: 20px;
                        font-weight: 600;
                    }

                    .credential-item {
                        background: white;
                        border-radius: 6px;
                        padding: 15px 20px;
                        margin-bottom: 12px;
                        border: 1px solid #e2e8f0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .credential-item:last-child {
                        margin-bottom: 0;
                    }

                    .credential-label {
                        font-weight: 600;
                        color: #4a5568;
                        font-size: 14px;
                    }

                    .credential-value {
                        font-family: 'Courier New', monospace;
                        background: #e2e8f0;
                        padding: 6px 12px;
                        border-radius: 4px;
                        font-weight: 600;
                        color: #1e293b;
                        font-size: 14px;
                    }

                    .important-notice {
                        background: #fef3c7;
                        border: 1px solid #f59e0b;
                        border-left: 4px solid #f59e0b;
                        border-radius: 6px;
                        padding: 20px;
                        margin: 25px 0;
                    }

                    .important-notice h4 {
                        color: #d97706;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .important-notice p {
                        color: #92400e;
                        margin: 0;
                        font-size: 14px;
                        line-height: 1.5;
                    }

                    .features {
                        background: #f1f5f9;
                        border-radius: 8px;
                        padding: 25px;
                        margin: 25px 0;
                        border: 1px solid #e2e8f0;
                    }

                    .features h3 {
                        color: #1e3a8a;
                        text-align: center;
                        margin-bottom: 20px;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .feature-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }

                    .feature-item {
                        padding: 10px 0;
                        color: #4a5568;
                        font-size: 15px;
                        border-bottom: 1px solid #e2e8f0;
                    }

                    .feature-item:last-child {
                        border-bottom: none;
                    }

                    .action-buttons {
                        text-align: center;
                        margin: 30px 0;
                    }

                    .btn-primary {
                        display: inline-block;
                        background: #3b82f6;
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        font-size: 16px;
                        transition: background-color 0.3s ease;
                    }

                    .btn-primary:hover {
                        background: #2563eb;
                    }

                    .footer {
                        background: #1f2937;
                        color: white;
                        padding: 25px 30px;
                        text-align: center;
                    }

                    .footer h4 {
                        margin-bottom: 10px;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .footer p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }

                    .footer .university-info {
                        font-size: 15px;
                        font-weight: 500;
                        color: #93c5fd;
                        margin-bottom: 15px;
                    }

                    .footer .contact-info {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #374151;
                    }

                    @media (max-width: 600px) {
                        body { padding: 10px; }
                        .email-container { margin: 0; }
                        .content, .header { padding: 20px; }
                        .credentials-card, .important-notice, .features { padding: 20px; }
                        .header h1 { font-size: 24px; }
                        .university-logo { font-size: 36px; }
                        .credential-item {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 8px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <span class="university-logo">🏛️</span>
                        <h1>Bienvenido al Sistema</h1>
                        <p>Universidad Nacional de Tumbes</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            Estimado/a %s %s
                        </div>

                        <div class="message">
                            Le damos la cordial bienvenida al <strong>Sistema de Secretaria General</strong>
                            de la Universidad Nacional de Tumbes. Su cuenta ha sido creada exitosamente.
                        </div>

                        <div class="role-badge">
                            <h3>
                                <span class="role-icon">%s</span>
                                %s
                            </h3>
                            <div class="role-description">%s</div>
                        </div>

                        <div class="credentials-card">
                            <h3>🔐 Sus Credenciales de Acceso</h3>
                            <div class="credential-item">
                                <span class="credential-label">Usuario:</span>
                                <span class="credential-value">%s</span>
                            </div>
                            <div class="credential-item">
                                <span class="credential-label">Contraseña temporal:</span>
                                <span class="credential-value">%s</span>
                            </div>
                        </div>

                        <div class="important-notice">
                            <h4>⚠️ Importante - Seguridad</h4>
                            <p>
                                Por su seguridad, le recomendamos cambiar esta contraseña temporal
                                después de su primer inicio de sesión. Mantenga sus credenciales
                                seguras y no las comparta con terceros.
                            </p>
                        </div>

                        <div class="features">
                            <h3>Tu rol: %s - Funcionalidades Disponibles</h3>
                            %s
                        </div>

                        <div class="action-buttons">
                            <a href="%s/servicios-administrativos" class="btn-primary">
                                Acceder al Sistema
                            </a>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="footer-content">
                            <h4>Sistema de Secretaria General</h4>
                            <p class="university-info">Universidad Nacional de Tumbes</p>
                            <div class="contact-info">
                                <p>Este es un correo automático, por favor no responda a este mensaje</p>
                                <p>Si necesita ayuda, contacte al área de soporte técnico</p>
                                <p style="margin-top: 15px; font-size: 12px; opacity: 0.6;">
                                    © 2025 Universidad Nacional de Tumbes - Todos los derechos reservados
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """,
            usuario.getNombre(),
            usuario.getApellidos(),
            roleIcon,
            roleDisplayName,
            roleDescription,
            username,
            password,
            roleDisplayName,
            functionalities,
            appUrl,
            LocalDateTime.now().getYear()
        );
    }

    private String getRoleIcon(String roleName) {
        return switch (roleName.toUpperCase()) {
            case "ADMIN" -> "👨‍💼";
            case "ADMINISTRATIVO" -> "👨‍💻";
            case "USUARIO" -> "👤";
            case "ESTUDIANTE" -> "🎓";
            default -> "👤";
        };
    }

    private String getRoleDisplayName(String roleName) {
        return switch (roleName.toUpperCase()) {
            case "ADMIN" -> "Administrador";
            case "ADMINISTRATIVO" -> "Administrativo";
            case "USUARIO" -> "Usuario";
            case "ESTUDIANTE" -> "Estudiante";
            default -> "Usuario";
        };
    }
}