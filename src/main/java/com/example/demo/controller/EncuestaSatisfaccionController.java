package com.example.demo.controller;

import com.example.demo.entity.EncuestaSatisfaccion;
import com.example.demo.service.EncuestaSatisfaccionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/encuestas-satisfaccion")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class EncuestaSatisfaccionController {

    private final EncuestaSatisfaccionService encuestaService;

  
    @GetMapping("/token/{token}")
    public ResponseEntity<?> obtenerPorToken(@PathVariable String token) {
        try {
            EncuestaSatisfaccion encuesta = encuestaService.obtenerPorToken(token);

        
            if (encuesta.getEstado() == EncuestaSatisfaccion.EstadoEncuesta.RESPONDIDA) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "success", false,
                                "message", "Esta encuesta ya ha sido respondida",
                                "respondida", true
                        ));
            }

            // Verificar si está expirada
            if (encuesta.estaExpirada()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "success", false,
                                "message", "Esta encuesta ha expirado",
                                "expirada", true
                        ));
            }

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", encuesta
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "success", false,
                            "message", e.getMessage()
                    ));
        }
    }

  
    @PostMapping("/responder")
    public ResponseEntity<?> responderEncuesta(@RequestBody ResponderEncuestaRequest request) {
        try {
            EncuestaSatisfaccion encuesta = encuestaService.responderEncuesta(
                    request.getToken(),
                    request.getCalificacionTiempoRespuesta(),
                    request.getCalificacionCalidadRespuesta(),
                    request.getCalificacionClaridad(),
                    request.getCalificacionAmabilidad(),
                    request.getCalificacionResolucion(),
                    request.getComentarios()
            );

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Encuesta respondida exitosamente. ¡Gracias por su feedback!",
                    "data", encuesta
            ));
        } catch (RuntimeException e) {
            log.error("Error al responder encuesta: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "success", false,
                            "message", e.getMessage()
                    ));
        }
    }

 
    @GetMapping("/metricas/trabajador/{trabajadorId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtenerMetricasTrabajador(@PathVariable Long trabajadorId) {
        try {
            Map<String, Object> metricas = encuestaService.obtenerMetricasTrabajador(trabajadorId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", metricas
            ));
        } catch (Exception e) {
            log.error("Error al obtener métricas del trabajador {}: {}", trabajadorId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Error al obtener métricas del trabajador"
                    ));
        }
    }

  
    @GetMapping("/trabajador/{trabajadorId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtenerEncuestasTrabajador(
            @PathVariable Long trabajadorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<EncuestaSatisfaccion> encuestas = encuestaService.obtenerPorTrabajador(trabajadorId, pageable);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", encuestas
            ));
        } catch (Exception e) {
            log.error("Error al obtener encuestas del trabajador {}: {}", trabajadorId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Error al obtener encuestas"
                    ));
        }
    }


    @GetMapping("/trabajador/{trabajadorId}/comentarios")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtenerComentariosTrabajador(@PathVariable Long trabajadorId) {
        try {
            List<EncuestaSatisfaccion> encuestas = encuestaService.obtenerEncuestasConComentarios(trabajadorId);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", encuestas
            ));
        } catch (Exception e) {
            log.error("Error al obtener comentarios del trabajador {}: {}", trabajadorId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Error al obtener comentarios"
                    ));
        }
    }

  
    @GetMapping("/ranking")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtenerRankingTrabajadores(
            @RequestParam(defaultValue = "3") Long minimoEncuestas
    ) {
        try {
            List<Map<String, Object>> ranking = encuestaService.obtenerRankingTrabajadores(minimoEncuestas);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", ranking
            ));
        } catch (Exception e) {
            log.error("Error al obtener ranking de trabajadores: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Error al obtener ranking"
                    ));
        }
    }


    @GetMapping("/tasa-respuesta")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtenerTasaRespuesta() {
        try {
            Double tasaRespuesta = encuestaService.obtenerTasaRespuesta();
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", Map.of("tasaRespuesta", tasaRespuesta)
            ));
        } catch (Exception e) {
            log.error("Error al obtener tasa de respuesta: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Error al obtener tasa de respuesta"
                    ));
        }
    }


    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> obtenerDashboardMetricas(
            @RequestParam(required = false) Long areaId,
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin
    ) {
        try {
            Map<String, Object> dashboard = encuestaService.obtenerDashboardMetricas(areaId, fechaInicio, fechaFin);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", dashboard
            ));
        } catch (Exception e) {
            log.error("Error al obtener dashboard de métricas: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", "Error al obtener dashboard de métricas"
                    ));
        }
    }

  
    @lombok.Data
    public static class ResponderEncuestaRequest {
        private String token;
        private Integer calificacionTiempoRespuesta;
        private Integer calificacionCalidadRespuesta;
        private Integer calificacionClaridad;
        private Integer calificacionAmabilidad;
        private Integer calificacionResolucion;
        private String comentarios;
    }
}