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
                            <a href="%s/login" class="btn-primary">
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
                                    © %d Universidad Nacional de Tumbes - Todos los derechos reservados
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
                <title>🦋 Credenciales Actualizadas con Éxito</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        line-height: 1.6;
                        color: #1a202c;
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        margin: 0;
                        padding: 20px;
                        min-height: 100vh;
                    }

                    .email-container {
                        max-width: 650px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 28px;
                        overflow: hidden;
                        box-shadow: 0 25px 50px rgba(102, 126, 234, 0.25), 0 10px 20px rgba(0,0,0,0.1);
                        position: relative;
                    }

                    .header {
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white;
                        padding: 50px 40px;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }

                    .header::before {
                        content: '';
                        position: absolute;
                        top: -50%%;
                        left: -50%%;
                        width: 200%%;
                        height: 200%%;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern id="animals" width="40" height="40" patternUnits="userSpaceOnUse"><text x="5" y="15" font-size="12" fill="white" opacity="0.1">🦋</text><text x="25" y="35" font-size="10" fill="white" opacity="0.08">🐾</text><text x="15" y="30" font-size="8" fill="white" opacity="0.06">🌿</text></pattern></defs><rect width="200" height="200" fill="url(%%23animals)"/></svg>');
                        animation: float 20s ease-in-out infinite;
                        z-index: 0;
                    }

                    @keyframes float {
                        0%%, 100%% { transform: translateY(0px) rotate(0deg); }
                        50%% { transform: translateY(-20px) rotate(2deg); }
                    }

                    .header-content {
                        position: relative;
                        z-index: 2;
                    }

                    .success-icon {
                        font-size: 80px;
                        margin-bottom: 20px;
                        display: block;
                        animation: bounce 2s infinite;
                        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                    }

                    @keyframes bounce {
                        0%%, 20%%, 50%%, 80%%, 100%% { transform: translateY(0); }
                        40%% { transform: translateY(-10px); }
                        60%% { transform: translateY(-5px); }
                    }

                    .header h1 {
                        font-size: 36px;
                        font-weight: 800;
                        margin-bottom: 12px;
                        background: linear-gradient(45deg, #ffffff, #f8fafc);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }

                    .header p {
                        font-size: 18px;
                        opacity: 0.95;
                        font-weight: 500;
                        text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    }

                    .content {
                        padding: 50px 40px;
                        background: linear-gradient(180deg, #ffffff 0%%, #f8fafc 100%%);
                        position: relative;
                    }

                    .animal-decoration {
                        position: absolute;
                        font-size: 24px;
                        opacity: 0.1;
                        animation: gentle-float 6s ease-in-out infinite;
                    }

                    .animal-decoration:nth-child(1) { top: 20px; right: 30px; animation-delay: 0s; }
                    .animal-decoration:nth-child(2) { bottom: 100px; left: 20px; animation-delay: 2s; }
                    .animal-decoration:nth-child(3) { top: 50%%; right: 10px; animation-delay: 4s; }

                    @keyframes gentle-float {
                        0%%, 100%% { transform: translateY(0px) scale(1); }
                        50%% { transform: translateY(-8px) scale(1.05); }
                    }

                    .greeting {
                        font-size: 24px;
                        font-weight: 700;
                        color: #2d3748;
                        margin-bottom: 25px;
                        text-align: center;
                        position: relative;
                        z-index: 2;
                    }

                    .message {
                        font-size: 18px;
                        color: #4a5568;
                        margin-bottom: 40px;
                        text-align: center;
                        line-height: 1.8;
                        font-weight: 500;
                        position: relative;
                        z-index: 2;
                    }

                    .success-card {
                        background: linear-gradient(135deg, #d1fae5 0%%, #a7f3d0 30%%, #6ee7b7 100%%);
                        border: 3px solid #10b981;
                        border-radius: 24px;
                        padding: 35px;
                        margin: 40px 0;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
                        transform: translateY(0);
                        transition: transform 0.3s ease;
                    }

                    .success-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 15px 35px rgba(16, 185, 129, 0.3);
                    }

                    .success-card::before {
                        content: '🦋';
                        position: absolute;
                        top: 20px;
                        right: 25px;
                        font-size: 32px;
                        animation: flutter 3s ease-in-out infinite;
                    }

                    @keyframes flutter {
                        0%%, 100%% { transform: translateY(0px) rotate(0deg); }
                        25%% { transform: translateY(-3px) rotate(5deg); }
                        75%% { transform: translateY(-1px) rotate(-5deg); }
                    }

                    .success-card::after {
                        content: '🌟';
                        position: absolute;
                        bottom: 20px;
                        left: 25px;
                        font-size: 24px;
                        animation: twinkle 2s ease-in-out infinite;
                    }

                    @keyframes twinkle {
                        0%%, 100%% { opacity: 0.7; transform: scale(1); }
                        50%% { opacity: 1; transform: scale(1.2); }
                    }

                    .success-card h3 {
                        color: #047857;
                        font-size: 22px;
                        margin-bottom: 15px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    }

                    .success-card p {
                        color: #065f46;
                        margin: 0;
                        font-weight: 600;
                        font-size: 16px;
                    }

                    .info-card {
                        background: linear-gradient(135deg, #f7fafc 0%%, #edf2f7 100%%);
                        border: 2px solid #e2e8f0;
                        border-radius: 20px;
                        padding: 30px;
                        margin: 35px 0;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                    }

                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 16px 0;
                        border-bottom: 2px solid #e2e8f0;
                        transition: all 0.3s ease;
                    }

                    .info-row:hover {
                        background: rgba(102, 126, 234, 0.05);
                        margin: 0 -15px;
                        padding: 16px 15px;
                        border-radius: 12px;
                    }

                    .info-row:last-child {
                        border-bottom: none;
                    }

                    .info-label {
                        font-weight: 700;
                        color: #4a5568;
                        font-size: 15px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .info-value {
                        color: #2d3748;
                        font-size: 15px;
                        font-weight: 600;
                    }

                    .security-notice {
                        background: linear-gradient(135deg, #fef3c7 0%%, #fbbf24 30%%, #f59e0b 100%%);
                        border: 3px solid #f59e0b;
                        border-radius: 20px;
                        padding: 30px;
                        margin: 35px 0;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2);
                    }

                    .security-notice::before {
                        content: '🦉';
                        position: absolute;
                        top: 20px;
                        right: 25px;
                        font-size: 28px;
                        animation: wise-blink 4s ease-in-out infinite;
                    }

                    @keyframes wise-blink {
                        0%%, 90%%, 100%% { transform: scale(1); }
                        95%% { transform: scale(1.1); }
                    }

                    .security-notice h4 {
                        color: #d97706;
                        font-size: 18px;
                        margin-bottom: 12px;
                        font-weight: 800;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .security-notice p {
                        color: #92400e;
                        margin: 0;
                        font-weight: 600;
                        line-height: 1.6;
                    }

                    .fun-facts {
                        background: linear-gradient(135deg, #e0e7ff 0%%, #c7d2fe 100%%);
                        border: 2px solid #8b5cf6;
                        border-radius: 20px;
                        padding: 25px;
                        margin: 30px 0;
                        position: relative;
                    }

                    .fun-facts::before {
                        content: '🐾';
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                        animation: paw-shake 3s ease-in-out infinite;
                    }

                    @keyframes paw-shake {
                        0%%, 100%% { transform: rotate(0deg); }
                        25%% { transform: rotate(10deg); }
                        75%% { transform: rotate(-10deg); }
                    }

                    .fun-facts h4 {
                        color: #7c3aed;
                        font-size: 16px;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }

                    .fun-facts p {
                        color: #5b21b6;
                        margin: 0;
                        font-size: 14px;
                        font-style: italic;
                    }

                    .footer {
                        background: linear-gradient(135deg, #1a202c 0%%, #2d3748 100%%);
                        color: white;
                        padding: 40px;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }

                    .footer::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="forest" width="30" height="30" patternUnits="userSpaceOnUse"><text x="5" y="15" font-size="8" fill="white" opacity="0.05">🌲</text><text x="20" y="25" font-size="6" fill="white" opacity="0.03">🦔</text></pattern></defs><rect width="100" height="100" fill="url(%%23forest)"/></svg>');
                        opacity: 0.3;
                    }

                    .footer-content {
                        position: relative;
                        z-index: 2;
                    }

                    .footer h4 {
                        margin-bottom: 15px;
                        font-size: 22px;
                        font-weight: 700;
                        color: #f7fafc;
                    }

                    .footer p {
                        margin: 8px 0;
                        opacity: 0.9;
                        font-size: 15px;
                        font-weight: 500;
                    }

                    .footer .university-info {
                        font-size: 16px;
                        font-weight: 600;
                        color: #bee3f8;
                        margin-bottom: 20px;
                    }

                    /* Responsivo Ultra-Optimizado */
                    @media (max-width: 768px) {
                        body { padding: 15px; }
                        .email-container {
                            margin: 10px;
                            border-radius: 20px;
                        }
                        .content, .header { padding: 30px 25px; }
                        .success-card, .security-notice, .info-card, .fun-facts {
                            padding: 25px 20px;
                            margin: 25px 0;
                        }
                        .header h1 { font-size: 28px; }
                        .success-icon { font-size: 60px; }
                        .greeting { font-size: 20px; }
                        .message { font-size: 16px; }
                    }

                    @media (max-width: 480px) {
                        .content, .header { padding: 25px 20px; }
                        .header h1 { font-size: 24px; }
                        .success-icon { font-size: 50px; }
                        .greeting { font-size: 18px; }
                        .message { font-size: 15px; }
                        .info-row {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 5px;
                        }
                        .success-card::before, .security-notice::before,
                        .fun-facts::before { font-size: 20px; }
                    }

                    /* Modo oscuro automático */
                    @media (prefers-color-scheme: dark) {
                        .content {
                            background: linear-gradient(180deg, #f7fafc 0%%, #edf2f7 100%%);
                        }
                    }

                    /* Animaciones adicionales para interactividad */
                    .email-container {
                        animation: slideUp 0.8s ease-out;
                    }

                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <div class="header-content">
                            <span class="success-icon">🔐✨</span>
                            <h1>¡Credenciales Actualizadas!</h1>
                            <p>Tu seguridad es nuestra prioridad 🛡️</p>
                        </div>
                    </div>

                    <div class="content">
 
                        <div class="greeting">
                            ¡Hola %s %s! 👋
                        </div>

                        <div class="message">
                            Te confirmamos que tus <strong>credenciales han sido actualizadas exitosamente</strong>
                            en el Sistema de Secretaria General. ¡Tu información está más segura que nunca! 
                        </div>

                        <div class="success-card">
                            <h3> ¡Cambio Exitoso!</h3>
                            <p>Tus nuevas credenciales ya están activas y listas para usar</p>
                        </div>

                        <div class="info-card">
                            <div class="info-row">
                                <span class="info-label">🗓️ Fecha del cambio</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">👤 Usuario</span>
                                <span class="info-value">%s</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🔐 Estado</span>
                                <span class="info-value" style="color: #10b981; font-weight: 700;">🟢 Activa</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">🛡️ Nivel de seguridad</span>
                                <span class="info-value" style="color: #8b5cf6; font-weight: 700;">🔒 Alto</span>
                            </div>
                        </div>

                        <div class="security-notice">
                            <h4>🦉 Aviso de Seguridad Importante</h4>
                            <p>
                                Si <strong>no fuiste tú</strong> quien realizó este cambio, contacta
                                inmediatamente al administrador del sistema. Tu cuenta podría estar
                                comprometida. ¡Protege tu información como un búho protege su territorio! 🦉
                            </p>
                        </div>

                        <div class="fun-facts">
                            <h4>🐾 Dato Curioso</h4>
                            <p>
                                ¿Sabías que los colibríes pueden volar hacia atrás? Al igual que ellos,
                                nuestro sistema puede recuperar y proteger tu información desde cualquier dirección. 🐦✨
                            </p>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="footer-content">
                            <h4> Sistema de Secretaria General</h4>
                            <p class="university-info">🏛️ Universidad Nacional de Tumbes</p>
                            <p>🤖 Este es un correo automático generado con cariño</p>
                            <p> Protegiendo tu información como la naturaleza protege sus especies</p>
                            <p style="margin-top: 20px; font-size: 13px; opacity: 0.7;">
                                © %d 2025 Todos los derechos reservados 
                            </p>
                        </div>
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
                        <p style="margin-top: 10px; font-size: 12px;">© %d Todos los derechos reservados</p>
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

    public String createPasswordResetTemplate(Usuario usuario, String newPassword, String reason, boolean mustChangePassword) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Credencial Restablecida - Universidad Nacional de Tumbes</title>
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
                        background: #f1f5f9;
                        margin: 0;
                        padding: 20px;
                    }

                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: #ffffff;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
                        border: 1px solid #e2e8f0;
                    }

                    .header {
                        background: linear-gradient(135deg, #1e40af 0%%, #3b82f6 100%%);
                        color: white;
                        padding: 30px;
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
                        background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%%23ffffff" fill-opacity="0.05"><circle cx="36" cy="24" r="2"/><circle cx="6" cy="44" r="2"/><circle cx="36" cy="4" r="2"/></g></g></svg>');
                        opacity: 0.4;
                    }

                    .logo {
                        width: 60px;
                        height: 60px;
                        background: rgba(255, 255, 255, 0.15);
                        border-radius: 50%%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 15px;
                        font-size: 24px;
                        font-weight: bold;
                        position: relative;
                        z-index: 1;
                    }

                    .header h1 {
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 8px;
                        position: relative;
                        z-index: 1;
                    }

                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                        font-weight: 400;
                        position: relative;
                        z-index: 1;
                    }

                    .content {
                        padding: 35px 30px;
                    }

                    .greeting {
                        margin-bottom: 25px;
                    }

                    .greeting h2 {
                        color: #1e293b;
                        font-size: 20px;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .greeting p {
                        color: #64748b;
                        font-size: 16px;
                        line-height: 1.5;
                    }

                    .main-message {
                        background: #f8fafc;
                        border-left: 4px solid #3b82f6;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 25px 0;
                    }

                    .main-message p {
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 15px;
                    }

                    .main-message p:last-child {
                        margin-bottom: 0;
                    }

                    .credential-box {
                        background: linear-gradient(135deg, #f0f9ff 0%%, #e0f2fe 100%%);
                        border: 2px solid #0ea5e9;
                        border-radius: 12px;
                        padding: 25px;
                        text-align: center;
                        margin: 25px 0;
                        position: relative;
                    }

                    .credential-box::before {
                        content: '🔑';
                        position: absolute;
                        top: -15px;
                        left: 50%%;
                        transform: translateX(-50%%);
                        background: white;
                        padding: 8px 12px;
                        border-radius: 50%%;
                        font-size: 18px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }

                    .credential-label {
                        color: #0c4a6e;
                        font-size: 14px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 10px;
                    }

                    .credential-value {
                        background: #ffffff;
                        color: #1e293b;
                        font-size: 18px;
                        font-weight: 700;
                        font-family: 'Courier New', monospace;
                        padding: 15px 20px;
                        border-radius: 8px;
                        border: 2px solid #e2e8f0;
                        letter-spacing: 1px;
                        word-break: break-all;
                        box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
                    }

                    .warning-box {
                        background: linear-gradient(135deg, #fef3c7 0%%, #fde68a 100%%);
                        border: 2px solid #f59e0b;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 25px 0;
                        display: flex;
                        align-items: flex-start;
                        gap: 15px;
                    }

                    .warning-icon {
                        font-size: 24px;
                        color: #d97706;
                        flex-shrink: 0;
                        margin-top: 2px;
                    }

                    .warning-content h3 {
                        color: #92400e;
                        font-size: 16px;
                        font-weight: 600;
                        margin-bottom: 8px;
                    }

                    .warning-content p {
                        color: #78350f;
                        font-size: 14px;
                        line-height: 1.5;
                        margin: 0;
                    }

                    .info-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin: 25px 0;
                    }

                    .info-card {
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        padding: 20px;
                    }

                    .info-card h4 {
                        color: #374151;
                        font-size: 14px;
                        font-weight: 600;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .info-card p {
                        color: #6b7280;
                        font-size: 14px;
                        margin: 0;
                        word-break: break-word;
                    }

                    .action-button {
                        display: inline-block;
                        background: linear-gradient(135deg, #3b82f6 0%%, #2563eb 100%%);
                        color: white;
                        text-decoration: none;
                        padding: 14px 28px;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 16px;
                        text-align: center;
                        margin: 25px auto;
                        display: block;
                        max-width: 200px;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                    }

                    .action-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 18px rgba(59, 130, 246, 0.4);
                    }

                    .footer {
                        background: #1f2937;
                        color: white;
                        padding: 25px 30px;
                        text-align: center;
                    }

                    .footer p {
                        margin: 0 0 8px 0;
                        font-size: 14px;
                        opacity: 0.9;
                    }

                    .footer .year {
                        font-size: 12px;
                        opacity: 0.7;
                        margin-top: 15px;
                    }

                    @media (max-width: 600px) {
                        body {
                            padding: 10px;
                        }

                        .email-container {
                            border-radius: 8px;
                        }

                        .header,
                        .content,
                        .footer {
                            padding: 20px;
                        }

                        .info-grid {
                            grid-template-columns: 1fr;
                            gap: 15px;
                        }

                        .credential-value {
                            font-size: 16px;
                            padding: 12px 15px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <div class="logo">🎓</div>
                        <h1>Credencial Restablecida</h1>
                        <p>Sistema de Trámites Documentarios</p>
                    </div>

                    <div class="content">
                        <div class="greeting">
                            <h2>Hola, %s %s</h2>
                            <p>Tu credencial de acceso ha sido restablecida exitosamente por un administrador del sistema.</p>
                        </div>

                        <div class="main-message">
                            <p><strong>¿Qué significa esto?</strong></p>
                            <p>Un administrador ha generado una nueva credencial para tu cuenta con el propósito de restaurar tu acceso al sistema.</p>
                        </div>

                        <div class="credential-box">
                            <div class="credential-label">Nueva Credencial</div>
                            <div class="credential-value">%s</div>
                        </div>

                        %s

                        <div class="info-grid">
                            <div class="info-card">
                                <h4>Motivo</h4>
                                <p>%s</p>
                            </div>
                            <div class="info-card">
                                <h4>Fecha de Restablecimiento</h4>
                                <p>%s</p>
                            </div>
                        </div>

                        <a href="%s" class="action-button">Iniciar Sesión</a>

                        <div class="main-message">
                            <p><strong>Recomendaciones de seguridad:</strong></p>
                            <p>• Utiliza esta credencial para acceder al sistema inmediatamente</p>
                            <p>• Mantén tu credencial segura y no la compartas</p>
                            <p>• Si tienes alguna duda, contacta al administrador del sistema</p>
                        </div>
                    </div>

                    <div class="footer">
                        <p><strong>Universidad Nacional de Tumbes</strong></p>
                        <p>Sistema de Trámites Documentarios</p>
                        <p class="year">© %d - Todos los derechos reservados</p>
                    </div>
                </div>
            </body>
            </html>
            """,
            usuario.getNombre(),
            usuario.getApellidos(),
            newPassword,
            mustChangePassword ? """
                <div class="warning-box">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-content">
                        <h3>Cambio Obligatorio de Credencial</h3>
                        <p>Debes cambiar esta credencial en tu próximo inicio de sesión por motivos de seguridad.</p>
                    </div>
                </div>
                """ : "",
            reason != null && !reason.trim().isEmpty() ? reason : "Restablecimiento administrativo",
            LocalDateTime.now().format(DATE_FORMATTER),
            appUrl,
            LocalDateTime.now().getYear()
        );
    }
}