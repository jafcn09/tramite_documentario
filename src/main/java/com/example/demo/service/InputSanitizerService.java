package com.example.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.StringEscapeUtils;
import org.owasp.encoder.Encode;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

/**
 * Servicio para sanitizar inputs del usuario y prevenir ataques XSS
 */
@Service
@Slf4j
public class InputSanitizerService {

    // Patrones peligrosos comunes en ataques XSS
    private static final Pattern[] XSS_PATTERNS = {
        Pattern.compile("<script", Pattern.CASE_INSENSITIVE),
        Pattern.compile("javascript:", Pattern.CASE_INSENSITIVE),
        Pattern.compile("onerror", Pattern.CASE_INSENSITIVE),
        Pattern.compile("onload", Pattern.CASE_INSENSITIVE),
        Pattern.compile("onclick", Pattern.CASE_INSENSITIVE),
        Pattern.compile("<iframe", Pattern.CASE_INSENSITIVE),
        Pattern.compile("<embed", Pattern.CASE_INSENSITIVE),
        Pattern.compile("<object", Pattern.CASE_INSENSITIVE),
        Pattern.compile("eval\\(", Pattern.CASE_INSENSITIVE),
        Pattern.compile("expression\\(", Pattern.CASE_INSENSITIVE)
    };

    /**
     * Sanitiza texto para uso en HTML
     * Previene ataques XSS escapando caracteres HTML especiales
     */
    public String sanitizeHtml(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }

        // Detectar intentos de XSS antes de sanitizar
        for (Pattern pattern : XSS_PATTERNS) {
            if (pattern.matcher(input).find()) {
                log.warn("⚠️ Intento de XSS detectado en input: {}",
                    input.substring(0, Math.min(50, input.length())));
            }
        }

        // Escapar caracteres HTML peligrosos
        String sanitized = Encode.forHtml(input);

        // Escapar caracteres especiales adicionales
        sanitized = StringEscapeUtils.escapeHtml4(sanitized);

        return sanitized;
    }

    /**
     * Sanitiza texto para uso en JavaScript
     */
    public String sanitizeJavaScript(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        return Encode.forJavaScript(input);
    }

    /**
     * Sanitiza texto para uso en URLs
     */
    public String sanitizeUrl(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        return Encode.forUri(input);
    }

    /**
     * Sanitiza nombres de archivos
     * Remueve caracteres peligrosos que podrían causar path traversal
     */
    public String sanitizeFilename(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            return filename;
        }

        // Remover path traversal attempts
        String sanitized = filename.replaceAll("\\.\\.", "");
        sanitized = sanitized.replaceAll("[/\\\\]", "");

        // Remover caracteres especiales peligrosos
        sanitized = sanitized.replaceAll("[<>:\"|?*]", "");

        // Limitar longitud
        if (sanitized.length() > 255) {
            String extension = "";
            int lastDot = sanitized.lastIndexOf('.');
            if (lastDot > 0) {
                extension = sanitized.substring(lastDot);
                sanitized = sanitized.substring(0, 255 - extension.length()) + extension;
            } else {
                sanitized = sanitized.substring(0, 255);
            }
        }

        return sanitized;
    }

    /**
     * Valida que el input no contenga SQL injection patterns
     */
    public boolean containsSqlInjection(String input) {
        if (input == null || input.trim().isEmpty()) {
            return false;
        }

        String lowerInput = input.toLowerCase();
        String[] sqlKeywords = {
            "select", "insert", "update", "delete", "drop", "create",
            "alter", "exec", "execute", "union", "declare", "--", "/*", "*/"
        };

        for (String keyword : sqlKeywords) {
            if (lowerInput.contains(keyword)) {
                log.warn("⚠️ Posible SQL Injection detectado: {}",
                    input.substring(0, Math.min(50, input.length())));
                return true;
            }
        }

        return false;
    }

    /**
     * Sanitiza un campo de texto general (descripción, observaciones, etc.)
     */
    public String sanitizeTextField(String input) {
        if (input == null) {
            return null;
        }

        if (input.trim().isEmpty()) {
            return input;
        }

        // Detectar SQL injection
        if (containsSqlInjection(input)) {
            log.error("❌ SQL Injection detectado y bloqueado");
            throw new IllegalArgumentException("Contenido no permitido detectado en el texto");
        }

        // Sanitizar para HTML
        return sanitizeHtml(input);
    }

    /**
     * Valida longitud máxima de un campo
     */
    public void validateLength(String fieldName, String value, int maxLength) {
        if (value != null && value.length() > maxLength) {
            throw new IllegalArgumentException(
                String.format("El campo '%s' excede la longitud máxima de %d caracteres",
                    fieldName, maxLength)
            );
        }
    }

    /**
     * Valida que el campo no esté vacío
     */
    public void validateNotEmpty(String fieldName, String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(
                String.format("El campo '%s' es requerido y no puede estar vacío", fieldName)
            );
        }
    }
}
