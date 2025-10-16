package com.example.demo.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileValidationService {

    private final InputSanitizerService inputSanitizerService;

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "text/plain"
    );

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
        "pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png", "gif", "txt"
    );

    private static final List<byte[]> PDF_SIGNATURES = Arrays.asList(
        new byte[]{0x25, 0x50, 0x44, 0x46}
    );

    private static final List<byte[]> JPEG_SIGNATURES = Arrays.asList(
        new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF}
    );

    private static final List<byte[]> PNG_SIGNATURES = Arrays.asList(
        new byte[]{(byte) 0x89, 0x50, 0x4E, 0x47}
    );

    public void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("El archivo está vacío o no existe");
        }

        validateFileName(file.getOriginalFilename());
        validateFileSize(file.getSize(), file.getOriginalFilename());
        validateMimeType(file.getContentType(), file.getOriginalFilename());
        validateFileExtension(file.getOriginalFilename());

        try {
            validateFileContent(file);
        } catch (IOException e) {
            throw new IllegalArgumentException("No se pudo validar el contenido del archivo");
        }
    }

    private void validateFileName(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del archivo no puede estar vacío");
        }

        // Validar longitud
        if (filename.length() > 255) {
            throw new IllegalArgumentException("El nombre del archivo es demasiado largo (máximo 255 caracteres)");
        }

        String sanitized = inputSanitizerService.sanitizeFilename(filename);
        if (!sanitized.equals(filename)) {
            throw new IllegalArgumentException("El nombre del archivo contiene caracteres no permitidos");
        }

        if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
            throw new IllegalArgumentException("Nombre de archivo no permitido");
        }
    }

    private void validateFileSize(long size, String filename) {
        if (size <= 0) {
            throw new IllegalArgumentException("El archivo está vacío");
        }

        if (size > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                String.format("El archivo '%s' excede el tamaño máximo permitido de %s. Tamaño actual: %s",
                    filename,
                    formatFileSize(MAX_FILE_SIZE),
                    formatFileSize(size)
                )
            );
        }
    }

    private void validateMimeType(String mimeType, String filename) {
        if (mimeType == null || mimeType.trim().isEmpty()) {
            throw new IllegalArgumentException("No se pudo determinar el tipo de archivo");
        }

        if (!ALLOWED_MIME_TYPES.contains(mimeType.toLowerCase())) {
            throw new IllegalArgumentException(
                String.format("Tipo de archivo no permitido: %s. Tipos permitidos: PDF, Word, Excel, imágenes (JPG, PNG, GIF)", mimeType)
            );
        }
    }

    private void validateFileExtension(String filename) {
        String extension = getFileExtension(filename);

        if (extension == null || extension.isEmpty()) {
            throw new IllegalArgumentException("El archivo debe tener una extensión válida");
        }

        if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new IllegalArgumentException(
                String.format("Extensión de archivo no permitida: .%s", extension)
            );
        }
    }

    private void validateFileContent(MultipartFile file) throws IOException {
        String extension = getFileExtension(file.getOriginalFilename());
        if (extension == null) {
            return;
        }

        byte[] fileHeader = new byte[8];
        try (InputStream inputStream = file.getInputStream()) {
            int bytesRead = inputStream.read(fileHeader);
            if (bytesRead < 4) {
                throw new IllegalArgumentException("Archivo corrupto o demasiado pequeño");
            }
        }

        boolean isValid = false;

        switch (extension.toLowerCase()) {
            case "pdf":
                isValid = matchesSignature(fileHeader, PDF_SIGNATURES);
                break;
            case "jpg":
            case "jpeg":
                isValid = matchesSignature(fileHeader, JPEG_SIGNATURES);
                break;
            case "png":
                isValid = matchesSignature(fileHeader, PNG_SIGNATURES);
                break;
            default:
                isValid = true;
        }

        if (!isValid) {
            throw new IllegalArgumentException(
                "El archivo no coincide con su extensión. Posible archivo malicioso."
            );
        }
    }

    private boolean matchesSignature(byte[] fileHeader, List<byte[]> signatures) {
        for (byte[] signature : signatures) {
            boolean matches = true;
            for (int i = 0; i < signature.length && i < fileHeader.length; i++) {
                if (fileHeader[i] != signature[i]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                return true;
            }
        }
        return false;
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return null;
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    private String formatFileSize(long size) {
        if (size < 1024) {
            return size + " B";
        } else if (size < 1024 * 1024) {
            return String.format("%.2f KB", size / 1024.0);
        } else {
            return String.format("%.2f MB", size / (1024.0 * 1024.0));
        }
    }

    public void validateFiles(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return;
        }

        for (MultipartFile file : files) {
            validateFile(file);
        }
    }

    public long getTotalSize(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return 0;
        }
        return files.stream().mapToLong(MultipartFile::getSize).sum();
    }
}
