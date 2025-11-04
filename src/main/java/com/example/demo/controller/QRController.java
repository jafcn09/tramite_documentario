package com.example.demo.controller;

import com.example.demo.service.QRCodeService;
import com.example.demo.service.TramiteService;
import com.example.demo.model.Tramite;
import com.example.demo.dto.TramitePublicoDTO;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/qr")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class QRController {

    private final QRCodeService qrCodeService;
    private final TramiteService tramiteService;

    
    // Genera el código QR para un trámite

    @PostMapping("/generar/{tramiteId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO', 'USUARIO', 'ESTUDIANTE')")
    public ResponseEntity<?> generarQRTramite(@PathVariable Long tramiteId) {
        try {
            Optional<Tramite> tramiteOpt = tramiteService.obtenerTramitePorId(tramiteId);

            if (tramiteOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Tramite tramite = tramiteOpt.get();

            // Verificar si el trámite está concluido
            if (tramite.getEstado() == Tramite.EstadoTramite.FINALIZADO ||
                tramite.getEstado() == Tramite.EstadoTramite.ARCHIVADO ||
                tramite.getEstado() == Tramite.EstadoTramite.CANCELADO) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "No se puede generar QR para trámites concluidos"));
            }

            // Generar código QR si no existe
            if (tramite.getQrCode() == null || tramite.getQrCode().isEmpty()) {
                String codigoQR = qrCodeService.generarCodigoQR();
                String urlVerificacion = qrCodeService.generarUrlVerificacion(codigoQR);

                tramite.setQrCode(codigoQR);
                tramite.setQrUrl(urlVerificacion);
                tramite.setQrGeneradoFecha(LocalDateTime.now());

                tramiteService.actualizarTramite(tramite);
            }

            return ResponseEntity.ok(Map.of(
                "qrCode", tramite.getQrCode(),
                "qrUrl", tramite.getQrUrl(),
                "fechaGeneracion", tramite.getQrGeneradoFecha(),
                "escaneos", tramite.getQrEscaneos()
            ));

        } catch (Exception e) {
            log.error("Error generando QR para trámite {}: {}", tramiteId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error interno del servidor"));
        }
    }



    // Obtiene la imagen del código QR para un trámite (público para emails)
    @GetMapping(value = "/image/{tramiteId}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> obtenerImagenQRPublico(@PathVariable Long tramiteId) {
        try {
            Optional<Tramite> tramiteOpt = tramiteService.obtenerTramitePorId(tramiteId);

            if (tramiteOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Tramite tramite = tramiteOpt.get();

            // Auto-generar QR code si no existe
            if (tramite.getQrCode() == null || tramite.getQrCode().isEmpty()) {
                log.info("Generando QR automáticamente para trámite {} en endpoint público", tramiteId);
                String codigoQR = qrCodeService.generarCodigoQR();
                String urlVerificacion = qrCodeService.generarUrlVerificacion(codigoQR);

                tramite.setQrCode(codigoQR);
                tramite.setQrUrl(urlVerificacion);
                tramite.setQrGeneradoFecha(LocalDateTime.now());

                tramiteService.actualizarTramite(tramite);
            }

            // Generar imagen QR con información del trámite
            byte[] imagenQR = qrCodeService.generarQRTramite(
                tramite.getQrCode(),
                tramite.getCodigo(),
                tramite.getNumeroExpediente() != null ? tramite.getNumeroExpediente() : "N/A",
                tramite.getTipo().toString(),
                tramite.getEstado().toString()
            );

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .header("Cache-Control", "public, max-age=3600") // Cache for 1 hour
                    .body(imagenQR);

        } catch (WriterException | IOException e) {
            log.error("Error generando imagen QR pública para trámite {}: {}", tramiteId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Obtiene la imagen del código QR para un trámite (autenticado)

    @GetMapping(value = "/imagen/{tramiteId}", produces = MediaType.IMAGE_PNG_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO', 'USUARIO', 'ESTUDIANTE')")
    public ResponseEntity<byte[]> obtenerImagenQR(@PathVariable Long tramiteId) {
        try {
            Optional<Tramite> tramiteOpt = tramiteService.obtenerTramitePorId(tramiteId);

            if (tramiteOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Tramite tramite = tramiteOpt.get();

            if (tramite.getQrCode() == null) {
                return ResponseEntity.badRequest().build();
            }

            // Generar imagen QR con información del trámite
            byte[] imagenQR = qrCodeService.generarQRTramite(
                tramite.getQrCode(),
                tramite.getCodigo(),
                tramite.getNumeroExpediente() != null ? tramite.getNumeroExpediente() : "N/A",
                tramite.getTipo().toString(),
                tramite.getEstado().toString()
            );

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imagenQR);

        } catch (WriterException | IOException e) {
            log.error("Error generando imagen QR para trámite {}: {}", tramiteId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Verifica un trámite mediante su código QR

    @GetMapping("/verificar/{codigoQR}")
    public ResponseEntity<?> verificarTramitePorQR(
            @PathVariable String codigoQR,
            HttpServletRequest request) {

        try {
            // Validar formato del código QR
            if (!qrCodeService.validarFormatoQR(codigoQR)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Código QR inválido"));
            }

            // Buscar trámite por código QR
            Optional<Tramite> tramiteOpt = tramiteService.obtenerTramitePorQR(codigoQR);

            if (tramiteOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Trámite no encontrado"));
            }

            Tramite tramite = tramiteOpt.get();

            // Verificar si el trámite está concluido (QR expirado)
            if (tramite.getEstado() == Tramite.EstadoTramite.FINALIZADO ||
                tramite.getEstado() == Tramite.EstadoTramite.ARCHIVADO ||
                tramite.getEstado() == Tramite.EstadoTramite.CANCELADO) {
                return ResponseEntity.status(HttpStatus.GONE)
                        .body(Map.of(
                            "error", "El código QR ha expirado",
                            "mensaje", "Este trámite ha sido concluido y el código QR ya no es válido",
                            "estado", tramite.getEstado().toString()
                        ));
            }

            // Registrar escaneo
            String ipAddress = obtenerIPAddress(request);
            String userAgent = request.getHeader("User-Agent");
            qrCodeService.registrarEscaneo(codigoQR, ipAddress, userAgent);

            // Incrementar contador de escaneos
            tramite.setQrEscaneos(tramite.getQrEscaneos() + 1);
            tramiteService.actualizarTramite(tramite);

            // Crear DTO con información pública del trámite
            TramitePublicoDTO tramitePublico = TramitePublicoDTO.builder()
                    .codigo(tramite.getCodigo())
                    .asunto(tramite.getAsunto())
                    .tipo(tramite.getTipo().toString())
                    .estado(tramite.getEstado().toString())
                    .fechaCreacion(tramite.getFechaCreacion())
                    .fechaActualizacion(tramite.getFechaActualizacion())
                    .numeroExpediente(tramite.getNumeroExpediente())
                    .build();

            return ResponseEntity.ok(Map.of(
                "tramite", tramitePublico,
                "verificado", true,
                "fechaVerificacion", LocalDateTime.now(),
                "mensaje", "Trámite verificado exitosamente"
            ));

        } catch (Exception e) {
            log.error("Error verificando trámite con QR {}: {}", codigoQR, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error interno del servidor"));
        }
    }

   

    // Obtiene estadísticas del código QR de un trámite

    @GetMapping("/estadisticas/{tramiteId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<?> obtenerEstadisticasQR(@PathVariable Long tramiteId) {
        try {
            Optional<Tramite> tramiteOpt = tramiteService.obtenerTramitePorId(tramiteId);

            if (tramiteOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Tramite tramite = tramiteOpt.get();

            return ResponseEntity.ok(Map.of(
                "tramiteId", tramite.getId(),
                "codigo", tramite.getCodigo(),
                "qrCode", tramite.getQrCode(),
                "fechaGeneracion", tramite.getQrGeneradoFecha(),
                "totalEscaneos", tramite.getQrEscaneos(),
                "estado", tramite.getEstado()
            ));

        } catch (Exception e) {
            log.error("Error obteniendo estadísticas QR para trámite {}: {}", tramiteId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error interno del servidor"));
        }
    }

  

    // Regenera el código QR para un trámite existente

    @PostMapping("/regenerar/{tramiteId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<?> regenerarQRTramite(@PathVariable Long tramiteId) {
        try {
            Optional<Tramite> tramiteOpt = tramiteService.obtenerTramitePorId(tramiteId);

            if (tramiteOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Tramite tramite = tramiteOpt.get();

            // Generar nuevo código QR
            String nuevoCodigoQR = qrCodeService.generarCodigoQR();
            String nuevaUrlVerificacion = qrCodeService.generarUrlVerificacion(nuevoCodigoQR);

            tramite.setQrCode(nuevoCodigoQR);
            tramite.setQrUrl(nuevaUrlVerificacion);
            tramite.setQrGeneradoFecha(LocalDateTime.now());
            tramite.setQrEscaneos(0); // Resetear contador

            tramiteService.actualizarTramite(tramite);

            return ResponseEntity.ok(Map.of(
                "qrCode", tramite.getQrCode(),
                "qrUrl", tramite.getQrUrl(),
                "fechaGeneracion", tramite.getQrGeneradoFecha(),
                "mensaje", "Código QR regenerado exitosamente"
            ));

        } catch (Exception e) {
            log.error("Error regenerando QR para trámite {}: {}", tramiteId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error interno del servidor"));
        }
    }



    // Método auxiliar para obtener la dirección IP del cliente
    
    private String obtenerIPAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIP = request.getHeader("X-Real-IP");
        if (xRealIP != null && !xRealIP.isEmpty()) {
            return xRealIP;
        }

        return request.getRemoteAddr();
    }
}