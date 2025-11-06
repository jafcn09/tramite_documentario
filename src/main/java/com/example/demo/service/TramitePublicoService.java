package com.example.demo.service;

import com.example.demo.dto.TramitePublicoRequest;
import com.example.demo.dto.TramiteResponse;
import com.example.demo.model.Tramite;
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Pattern;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class TramitePublicoService {

    private final TramiteRepository tramiteRepository;
    private final UsuarioRepository usuarioRepository;
    private final CaptchaService captchaService;
    private final InputSanitizerService sanitizerService;
    private final QRCodeService qrCodeService;
    private final EmailService emailService;

    private static final Pattern DNI_PATTERN = Pattern.compile("^[0-9]{8}$");
    private static final Pattern CARNET_EXTRANJERIA_PATTERN = Pattern.compile("^[A-Z0-9]{9,12}$");
    private static final Pattern PASAPORTE_PATTERN = Pattern.compile("^[A-Z0-9]{6,12}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^[0-9]{9}$");
    private static final Pattern ALPHANUMERIC_PATTERN = Pattern.compile("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$");

    private static final Set<String> TIPOS_DOCUMENTO_VALIDOS = Set.of("DNI", "CARNET_EXTRANJERIA", "PASAPORTE");

    private static final Set<String> TIPOS_TRAMITE_VALIDOS = Set.of(
        "SOLICITUD_CERTIFICADO",
        "SOLICITUD_CONSTANCIA",
        "RECLAMO",
        "SUGERENCIA",
        "CONSULTA"
    );

    private static final int MAX_ASUNTO_LENGTH = 200;
    private static final int MAX_DESCRIPCION_LENGTH = 2000;
    private static final int MAX_ARCHIVOS = 3;
    private static final long MAX_FILE_SIZE = 50 * 1024 * 1024;

    private static final String USUARIO_PUBLICO_USERNAME = "publico";
    private static final String USUARIO_PUBLICO_EMAIL = "tramites.publicos@sistema.gob.pe";

    @Transactional
    public TramiteResponse crearTramitePublico(TramitePublicoRequest request) {
        validateCaptcha(request.getCaptchaToken(), request.getCaptchaCode());
        validateInputFormat(request);
        sanitizeInputs(request);
        validateBusinessRules(request);
        validateFiles(request.getArchivos());

        Tramite tramite = buildTramite(request);
        Tramite saved = tramiteRepository.save(tramite);

        if (request.getArchivos() != null && !request.getArchivos().isEmpty()) {
            processFiles(saved, request.getArchivos());
        }

        String qrCode = qrCodeService.generarCodigoQR();
        String qrUrl = qrCodeService.generarUrlVerificacion(qrCode);
        saved.setQrCode(qrCode);
        saved.setQrUrl(qrUrl);
        saved.setQrGeneradoFecha(LocalDateTime.now());
        saved = tramiteRepository.save(saved);

        try {
            emailService.enviarCorreoTramitePublico(saved, request.getEmail(), request.getNombres(), request.getApellidos());
        } catch (Exception e) {
            throw new RuntimeException("Error al enviar correo de notificación: " + e.getMessage());
        }

        return convertToResponse(saved);
    }

    private void validateCaptcha(String token, String code) {
        if (token == null || code == null) {
            throw new IllegalArgumentException("CAPTCHA requerido");
        }

        if (!captchaService.validateCaptcha(token, code)) {
            throw new IllegalArgumentException("CAPTCHA inválido o expirado");
        }
    }

    private void validateInputFormat(TramitePublicoRequest request) {
        if (request.getTipoDocumento() == null || !TIPOS_DOCUMENTO_VALIDOS.contains(request.getTipoDocumento())) {
            throw new IllegalArgumentException("Tipo de documento inválido");
        }

        if (request.getNumeroDocumento() == null || request.getNumeroDocumento().trim().isEmpty()) {
            throw new IllegalArgumentException("Número de documento requerido");
        }

        String numeroDocumento = request.getNumeroDocumento().toUpperCase();
        boolean documentoValido = switch (request.getTipoDocumento()) {
            case "DNI" -> DNI_PATTERN.matcher(numeroDocumento).matches();
            case "CARNET_EXTRANJERIA" -> CARNET_EXTRANJERIA_PATTERN.matcher(numeroDocumento).matches();
            case "PASAPORTE" -> PASAPORTE_PATTERN.matcher(numeroDocumento).matches();
            default -> false;
        };

        if (!documentoValido) {
            String mensajeError = switch (request.getTipoDocumento()) {
                case "DNI" -> "DNI debe contener 8 dígitos";
                case "CARNET_EXTRANJERIA" -> "Carnet de Extranjería debe contener entre 9 y 12 caracteres alfanuméricos";
                case "PASAPORTE" -> "Pasaporte debe contener entre 6 y 12 caracteres alfanuméricos";
                default -> "Formato de documento inválido";
            };
            throw new IllegalArgumentException(mensajeError);
        }

        if (request.getEmail() == null || !EMAIL_PATTERN.matcher(request.getEmail()).matches()) {
            throw new IllegalArgumentException("Email inválido");
        }

        if (request.getTelefono() != null && !request.getTelefono().isEmpty() &&
            !PHONE_PATTERN.matcher(request.getTelefono()).matches()) {
            throw new IllegalArgumentException("Teléfono debe contener 9 dígitos");
        }

        if (request.getNombres() == null || request.getNombres().trim().isEmpty() ||
            !ALPHANUMERIC_PATTERN.matcher(request.getNombres()).matches()) {
            throw new IllegalArgumentException("Nombres solo pueden contener letras");
        }

        if (request.getApellidos() == null || request.getApellidos().trim().isEmpty() ||
            !ALPHANUMERIC_PATTERN.matcher(request.getApellidos()).matches()) {
            throw new IllegalArgumentException("Apellidos solo pueden contener letras");
        }

        if (request.getTipoTramite() == null || !TIPOS_TRAMITE_VALIDOS.contains(request.getTipoTramite())) {
            throw new IllegalArgumentException("Tipo de trámite inválido");
        }

        if (request.getAsunto() == null || request.getAsunto().trim().isEmpty()) {
            throw new IllegalArgumentException("Asunto requerido");
        }

        if (request.getAsunto().length() > MAX_ASUNTO_LENGTH) {
            throw new IllegalArgumentException("Asunto demasiado largo (máximo " + MAX_ASUNTO_LENGTH + " caracteres)");
        }

        if (request.getDescripcion() == null || request.getDescripcion().trim().isEmpty()) {
            throw new IllegalArgumentException("Descripción requerida");
        }

        if (request.getDescripcion().length() > MAX_DESCRIPCION_LENGTH) {
            throw new IllegalArgumentException("Descripción demasiado larga (máximo " + MAX_DESCRIPCION_LENGTH + " caracteres)");
        }
    }

    private void sanitizeInputs(TramitePublicoRequest request) {
        request.setNombres(sanitizerService.sanitizeTextField(request.getNombres()));
        request.setApellidos(sanitizerService.sanitizeTextField(request.getApellidos()));
        request.setEmail(sanitizerService.sanitizeTextField(request.getEmail()));
        request.setAsunto(sanitizerService.sanitizeTextField(request.getAsunto()));
        request.setDescripcion(sanitizerService.sanitizeTextField(request.getDescripcion()));

        if (request.getTelefono() != null) {
            request.setTelefono(sanitizerService.sanitizeTextField(request.getTelefono()));
        }

        if (detectMaliciousContent(request)) {
            throw new SecurityException("Contenido malicioso detectado");
        }
    }

    private boolean detectMaliciousContent(TramitePublicoRequest request) {
        String[] maliciousPatterns = {
            "<script", "javascript:", "onerror=", "onclick=", "onload=",
            "SELECT.*FROM", "DROP.*TABLE", "INSERT.*INTO", "UPDATE.*SET",
            "UNION.*SELECT", "1=1", "OR.*1=1", "--", ";--", "/*", "*/"
        };

        String combinedText = String.join(" ",
            request.getNombres(),
            request.getApellidos(),
            request.getAsunto(),
            request.getDescripcion(),
            request.getEmail()
        ).toUpperCase();

        for (String pattern : maliciousPatterns) {
            if (combinedText.contains(pattern.toUpperCase())) {
                return true;
            }
        }

        return false;
    }

    private void validateBusinessRules(TramitePublicoRequest request) {
        boolean usuarioExiste = usuarioRepository.existsByNumDocumento(request.getNumeroDocumento());
        if (usuarioExiste) {
            throw new IllegalArgumentException("El documento pertenece a un usuario registrado. Inicie sesión para crear trámites");
        }

        boolean tramiteDuplicado = tramiteRepository.existsDeletedTramiteWithSameData(
            request.getAsunto(),
            Tramite.TipoTramite.valueOf(request.getTipoTramite()),
            null
        );

        if (tramiteDuplicado) {
            throw new IllegalArgumentException("Ya existe un trámite similar. Consulte su estado en lugar de crear uno nuevo");
        }

        List<Tramite> tramitesRecientes = tramiteRepository.findByAsunto(request.getAsunto());
        long tramitesUltimas24h = tramitesRecientes.stream()
            .filter(t -> t.getFechaCreacion().isAfter(LocalDateTime.now().minusDays(1)))
            .count();

        if (tramitesUltimas24h > 0) {
            throw new IllegalArgumentException("Ya creó un trámite similar recientemente. Por favor espere antes de crear otro");
        }
    }

    private void validateFiles(List<MultipartFile> archivos) {
        if (archivos == null || archivos.isEmpty()) {
            return;
        }

        if (archivos.size() > MAX_ARCHIVOS) {
            throw new IllegalArgumentException("Máximo " + MAX_ARCHIVOS + " archivos permitidos");
        }

        Set<String> allowedExtensions = Set.of("pdf", "jpg", "jpeg", "png", "doc", "docx");

        for (MultipartFile archivo : archivos) {
            if (archivo.isEmpty()) {
                continue;
            }

            if (archivo.getSize() > MAX_FILE_SIZE) {
                throw new IllegalArgumentException("Archivo demasiado grande. Máximo 50MB por archivo");
            }

            String filename = archivo.getOriginalFilename();
            if (filename == null) {
                throw new IllegalArgumentException("Nombre de archivo inválido");
            }

            String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
            if (!allowedExtensions.contains(extension)) {
                throw new IllegalArgumentException("Tipo de archivo no permitido: " + extension);
            }
        }
    }

    private Tramite buildTramite(TramitePublicoRequest request) {
        Long usuarioPublicoId = obtenerOCrearUsuarioPublico();

        Tramite tramite = new Tramite();
        tramite.setCodigo(generateCodigo());
        tramite.setTitulo(request.getAsunto());
        tramite.setAsunto(request.getAsunto());
        tramite.setDescripcion(buildDescripcion(request));
        tramite.setTipo(Tramite.TipoTramite.valueOf(request.getTipoTramite()));
        tramite.setEstado(Tramite.EstadoTramite.ENVIADO);
        tramite.setPrioridad(Tramite.PrioridadTramite.NORMAL);
        tramite.setUsuarioSolicitanteId(usuarioPublicoId);
        tramite.setAreaActualId(1L);
        tramite.setFechaCreacion(LocalDateTime.now());
        tramite.setDocumentosAdjuntos("[]");
        return tramite;
    }

    private Long obtenerOCrearUsuarioPublico() {
        return usuarioRepository.findByUsuario(USUARIO_PUBLICO_USERNAME)
            .map(usuario -> usuario.getId())
            .orElseGet(() -> {
                throw new IllegalStateException(
                    "Usuario público del sistema no encontrado. Contacte al administrador para crear el usuario '" +
                    USUARIO_PUBLICO_USERNAME + "' en la base de datos."
                );
            });
    }

    private String buildDescripcion(TramitePublicoRequest request) {
        return request.getDescripcion();
    }

    private String generateCodigo() {
        int year = LocalDateTime.now().getYear();
        Integer nextNumber = tramiteRepository.getNextCodigoNumber(String.valueOf(year));
        return String.format("TRM-%d-%05d", year, nextNumber);
    }

    private void processFiles(Tramite tramite, List<MultipartFile> archivos) {
        List<Map<String, Object>> documentos = new ArrayList<>();

        for (MultipartFile archivo : archivos) {
            if (archivo.isEmpty()) {
                continue;
            }

            try {
                byte[] fileBytes = archivo.getBytes();
                String base64Content = Base64.getEncoder().encodeToString(fileBytes);

                Map<String, Object> doc = new HashMap<>();
                doc.put("nombre", archivo.getOriginalFilename());
                doc.put("tipo", archivo.getContentType());
                doc.put("tamanio", archivo.getSize());
                doc.put("fechaSubida", LocalDateTime.now().toString());
                doc.put("contenido", base64Content);
                documentos.add(doc);
            } catch (Exception e) {
                throw new RuntimeException("Error al procesar archivo: " + archivo.getOriginalFilename());
            }
        }

        try {
            tramite.setDocumentosAdjuntos(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(documentos));
            tramiteRepository.save(tramite);
        } catch (Exception e) {
            throw new RuntimeException("Error procesando archivos");
        }
    }

    private TramiteResponse convertToResponse(Tramite tramite) {
        TramiteResponse response = new TramiteResponse();
        response.setId(tramite.getId());
        response.setCodigo(tramite.getCodigo());
        response.setTitulo(tramite.getTitulo());
        response.setDescripcion(tramite.getDescripcion());
        response.setTipo(tramite.getTipo().name());
        response.setPrioridad(tramite.getPrioridad().name());
        response.setFechaCreacion(tramite.getFechaCreacion());

        TramiteResponse.EstadoInfo estadoInfo = new TramiteResponse.EstadoInfo();
        estadoInfo.setNombre(tramite.getEstado().name());
        response.setEstado(estadoInfo);

        return response;
    }
}