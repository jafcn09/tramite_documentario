package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.service.FirmaDigitalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/firmas-digitales")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class FirmaDigitalController {

    private final FirmaDigitalService firmaDigitalService;

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO') or hasRole('ESTUDIANTE')")
    public ResponseEntity<FirmaDigitalResponse> crearFirmaDigital(
            @Valid @RequestBody FirmaDigitalRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) {

        try {
            String ipOrigen = obtenerIpCliente(httpRequest);
            log.info("Creando firma digital desde IP: {} por usuario: {}", ipOrigen, authentication.getName());

            FirmaDigitalResponse response = firmaDigitalService.crearFirmaDigital(request, authentication.getName());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error creando firma digital: {}", e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body(null);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO') or hasRole('ESTUDIANTE')")
    public ResponseEntity<FirmaDigitalResponse> obtenerFirmaPorId(@PathVariable("id") Long id) {
        try {
            FirmaDigitalResponse response = firmaDigitalService.obtenerFirmaPorId(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error obteniendo firma digital: {}", e.getMessage(), e);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<Page<FirmaDigitalResponse>> listarFirmas(Pageable pageable) {
        try {
            Page<FirmaDigitalResponse> response = firmaDigitalService.listarFirmas(pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error listando firmas digitales: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/tramite/{tramiteId}")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO') or hasRole('ESTUDIANTE')")
    public ResponseEntity<List<FirmaDigitalResponse>> listarFirmasPorTramite(@PathVariable("tramiteId") Long tramiteId) {
        try {
            List<FirmaDigitalResponse> response = firmaDigitalService.listarFirmasPorTramite(tramiteId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error listando firmas por trámite: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/mis-firmas")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO') or hasRole('ESTUDIANTE')")
    public ResponseEntity<Page<FirmaDigitalResponse>> listarMisFirmas(
            Authentication authentication,
            Pageable pageable) {
        try {
            Page<FirmaDigitalResponse> response = firmaDigitalService.listarFirmas(pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error listando mis firmas: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<FirmaDigitalResponse> actualizarFirma(
            @PathVariable("id") Long id,
            @Valid @RequestBody FirmaDigitalRequest request,
            Authentication authentication) {
        try {
            FirmaDigitalResponse response = firmaDigitalService.actualizarFirma(id, request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error actualizando firma digital: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Map<String, String>> eliminarFirma(
            @PathVariable("id") Long id,
            Authentication authentication) {
        try {
            firmaDigitalService.eliminarFirma(id, authentication.getName());
            return ResponseEntity.ok(Map.of(
                    "mensaje", "Firma digital eliminada exitosamente",
                    "id", id.toString()
            ));
        } catch (Exception e) {
            log.error("Error eliminando firma digital: {}", e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/autorizar")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<FirmaDigitalResponse> procesarAutorizacion(
            @PathVariable("id") Long id,
            @Valid @RequestBody AutorizacionFirmaRequest request,
            Authentication authentication) {
        try {
            request.setFirmaId(id);

            FirmaDigitalResponse response = firmaDigitalService.procesarAutorizacion(request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error procesando autorización: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/pendientes-autorizacion")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<List<FirmaDigitalResponse>> listarFirmasPendientesAutorizacion() {
        try {
            List<FirmaDigitalResponse> response = firmaDigitalService.listarFirmasPendientesAutorizacion();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error listando firmas pendientes: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/revocar-autorizacion")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<FirmaDigitalResponse> revocarAutorizacion(
            @PathVariable("id") Long id,
            @RequestBody Map<String, String> requestBody,
            Authentication authentication) {
        try {
            AutorizacionFirmaRequest request = AutorizacionFirmaRequest.builder()
                    .firmaId(id)
                    .autorizar(false)
                    .motivoRevocacion(requestBody.get("motivoRevocacion"))
                    .motivoAutorizacion("Autorización revocada")
                    .build();

            FirmaDigitalResponse response = firmaDigitalService.procesarAutorizacion(request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error revocando autorización: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/firmar")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO') or hasRole('ESTUDIANTE')")
    public ResponseEntity<FirmaDigitalResponse> firmarDocumento(
            @PathVariable("id") Long id,
            @Valid @RequestBody FirmarDocumentoRequest request,
            Authentication authentication,
            HttpServletRequest httpRequest) {
        try {
            request.setFirmaId(id);

            String ipOrigen = obtenerIpCliente(httpRequest);
            log.info("Firmando documento desde IP: {} por usuario: {}", ipOrigen, authentication.getName());

            FirmaDigitalResponse response = firmaDigitalService.firmarDocumento(request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error firmando documento: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/verificar")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO') or hasRole('ESTUDIANTE')")
    public ResponseEntity<Map<String, Object>> verificarFirma(@PathVariable("id") Long id) {
        try {
            FirmaDigitalResponse firma = firmaDigitalService.obtenerFirmaPorId(id);

            Map<String, Object> verificacion = new java.util.HashMap<>();
            verificacion.put("id", firma.getId());
            verificacion.put("esFirmaValida", firma.getEsFirmaValida());
            verificacion.put("estadoFirma", firma.getEstadoFirma());
            verificacion.put("descripcionEstado", firma.getDescripcionEstado());
            verificacion.put("estadoAutorizacion", firma.getEstadoAutorizacion());
            verificacion.put("descripcionAutorizacion", firma.getDescripcionAutorizacion());
            verificacion.put("validacionCertificado", firma.getValidacionCertificado());
            verificacion.put("fechaFirma", firma.getFechaFirma());
            verificacion.put("firmante", firma.getFirmante().getNombreCompleto());
            verificacion.put("algoritmoFirma", firma.getAlgoritmoFirma());
            verificacion.put("certificadoSerial", firma.getCertificadoSerial());

            return ResponseEntity.ok(verificacion);
        } catch (Exception e) {
            log.error("Error verificando firma: {}", e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/responder-tramite")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<FirmaDigitalResponse> crearFirmaParaRespuesta(
            @Valid @RequestBody FirmaDigitalRequest request,
            Authentication authentication) {
        try {
            FirmaDigitalResponse response = firmaDigitalService.crearFirmaDigital(request, authentication.getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error creando firma para respuesta: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/tramite/{tramiteId}/requiere-firma")
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<Map<String, Object>> validarSiRequiereFirma(@PathVariable("tramiteId") Long tramiteId) {
        try {
            List<FirmaDigitalResponse> firmasExistentes = firmaDigitalService.listarFirmasPorTramite(tramiteId);

            boolean requiereFirma = true;
            boolean yaFirmado = firmasExistentes.stream()
                    .anyMatch(f -> f.getEsFirmaValida());

            Map<String, Object> resultado = Map.of(
                    "tramiteId", tramiteId,
                    "requiereFirma", requiereFirma,
                    "yaFirmado", yaFirmado,
                    "firmasExistentes", firmasExistentes.size(),
                    "mensaje", yaFirmado ?
                            "El trámite ya tiene firmas válidas" :
                            "El trámite requiere firma digital para ser respondido"
            );

            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            log.error("Error validando requerimiento de firma: {}", e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/estadisticas")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas() {
        try {
            Map<String, Object> estadisticas = Map.of(
                    "totalFirmas", 0,
                    "firmasPendientes", 0,
                    "firmasCompletadas", 0,
                    "firmasRechazadas", 0,
                    "firmasVencidas", 0,
                    "autorizacionesPendientes", 0
            );

            return ResponseEntity.ok(estadisticas);
        } catch (Exception e) {
            log.error("Error obteniendo estadísticas: {}", e.getMessage(), e);
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    private String obtenerIpCliente(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }

        return ip;
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> manejarExcepciones(RuntimeException e) {
        log.error("Error en FirmaDigitalController: {}", e.getMessage(), e);
        return ResponseEntity.badRequest()
                .body(Map.of(
                        "error", e.getMessage(),
                        "timestamp", java.time.LocalDateTime.now().toString()
                ));
    }
}