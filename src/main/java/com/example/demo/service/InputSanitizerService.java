package com.example.demo.service;

import java.util.regex.Pattern;

import org.apache.commons.text.StringEscapeUtils;
import org.owasp.encoder.Encode;
import org.springframework.stereotype.Service;

@Service
public class InputSanitizerService {

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

    public String sanitizeHtml(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }

        for (Pattern pattern : XSS_PATTERNS) {
            if (pattern.matcher(input).find()) {
                throw new IllegalArgumentException("Contenido potencialmente peligroso detectado");
            }
        }

        String sanitized = Encode.forHtml(input);
        sanitized = StringEscapeUtils.escapeHtml4(sanitized);

        return sanitized;
    }

    public String sanitizeJavaScript(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        return Encode.forJavaScript(input);
    }

    public String sanitizeUrl(String input) {
        if (input == null || input.trim().isEmpty()) {
            return input;
        }
        return Encode.forUri(input);
    }

    public String sanitizeFilename(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            return filename;
        }

        String sanitized = filename.replaceAll("\\.\\.", "");
        sanitized = sanitized.replaceAll("[/\\\\]", "");
        sanitized = sanitized.replaceAll("[<>:\"|?*]", "");

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
                return true;
            }
        }

        return false;
    }

    public String sanitizeTextField(String input) {
        if (input == null) {
            return null;
        }

        if (input.trim().isEmpty()) {
            return input;
        }

        if (containsSqlInjection(input)) {
            throw new IllegalArgumentException("Contenido no permitido detectado en el texto");
        }

        return sanitizeHtml(input);
    }

    public void validateLength(String fieldName, String value, int maxLength) {
        if (value != null && value.length() > maxLength) {
            throw new IllegalArgumentException(
                String.format("El campo '%s' excede la longitud máxima de %d caracteres",
                    fieldName, maxLength)
            );
        }
    }

    public void validateNotEmpty(String fieldName, String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(
                String.format("El campo '%s' es requerido y no puede estar vacío", fieldName)
            );
        }
    }
}
