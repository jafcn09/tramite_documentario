package com.example.demo.controller;

import com.example.demo.service.TramiteService;
import com.example.demo.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bandeja-tramites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BandejaTramitesController {
    
    private final TramiteService tramiteService;
    private final JwtService jwtService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN') or hasRole('USUARIO')")
    public ResponseEntity<Object> obtenerTramitesBandeja(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "15") int limit,
            @RequestParam(name = "ordenarPor", defaultValue = "fecha") String ordenarPor,
            @RequestParam(name = "ordenAscendente", defaultValue = "false") boolean ordenAscendente,
            @RequestParam(name = "estado", required = false) String estado,
            @RequestParam(name = "prioridad", required = false) String prioridad,
            @RequestParam(name = "tipo", required = false) String tipo,
            @RequestParam(name = "asignadoA", required = false) String asignadoA,
            @RequestParam(name = "fechaDesde", required = false) String fechaDesde,
            @RequestParam(name = "fechaHasta", required = false) String fechaHasta,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        int pageIndex = page - 1;
        String sortField = "fecha".equals(ordenarPor) ? "fechaCreacion" : 
                          "vencimiento".equals(ordenarPor) ? "fechaVencimiento" :
                          "estado".equals(ordenarPor) ? "estado" :
                          "prioridad".equals(ordenarPor) ? "prioridad" :
                          "fechaCreacion";
        
        String sortDirection = ordenAscendente ? "asc" : "desc";
        org.springframework.data.domain.Sort sort = sortDirection.equals("asc") ? 
            org.springframework.data.domain.Sort.by(sortField).ascending() : 
            org.springframework.data.domain.Sort.by(sortField).descending();
        
        org.springframework.data.domain.Pageable pageable =
            org.springframework.data.domain.PageRequest.of(pageIndex, limit, sort);

        org.springframework.data.domain.Page<com.example.demo.dto.TramiteResponse> tramitesPage =
            tramiteService.obtenerTramitesBandeja(usuarioId, rol, pageable, estado, prioridad, tipo);
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("data", tramitesPage.getContent());
        response.put("total", tramitesPage.getTotalElements());
        response.put("totalPages", tramitesPage.getTotalPages());
        response.put("currentPage", page);
        response.put("hasNext", tramitesPage.hasNext());
        response.put("hasPrevious", tramitesPage.hasPrevious());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/estadisticas")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN') or hasRole('USUARIO')")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas(
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        Object estadisticasRaw = tramiteService.obtenerEstadisticasUsuario(usuarioId, rol);
        @SuppressWarnings("unchecked")
        Map<String, Object> estadisticasOriginales = (Map<String, Object>) estadisticasRaw;
        

        Map<String, Object> estadisticasBandeja = new HashMap<>();

        if ("ADMINISTRATIVO".equals(rol) || "ADMIN".equals(rol)) {
            estadisticasBandeja.put("totalAsignados", estadisticasOriginales.getOrDefault("total", 0L));

            estadisticasBandeja.put("pendientesRevision",
                (Long) estadisticasOriginales.getOrDefault("estado_ENVIADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_EN_REVISION", 0L));

            Long aprobados = (Long) estadisticasOriginales.getOrDefault("estado_APROBADO", 0L);
            Long enProceso = (Long) estadisticasOriginales.getOrDefault("estado_EN_PROCESO", 0L);
            Long derivados = (Long) estadisticasOriginales.getOrDefault("estado_DERIVADO", 0L);
            Long totalEnProceso = aprobados + enProceso + derivados;


            estadisticasBandeja.put("enProceso", totalEnProceso);
            
            estadisticasBandeja.put("finalizadosHoy", 
                (Long) estadisticasOriginales.getOrDefault("estado_FINALIZADO", 0L));
            estadisticasBandeja.put("vencidos", 
                (Long) estadisticasOriginales.getOrDefault("estado_RECHAZADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_OBSERVADO", 0L));
            estadisticasBandeja.put("promedioAtencion", 5.2);
            estadisticasBandeja.put("calificacionPromedio", 4.4);
            
            estadisticasBandeja.put("productividadSemanal", java.util.Arrays.asList(
                java.util.Map.of("fecha", "2024-01-15", "completados", 8),
                java.util.Map.of("fecha", "2024-01-16", "completados", 12),
                java.util.Map.of("fecha", "2024-01-17", "completados", 10),
                java.util.Map.of("fecha", "2024-01-18", "completados", 9),
                java.util.Map.of("fecha", "2024-01-19", "completados", 11)
            ));
        } else {
            estadisticasBandeja.put("totalAsignados", estadisticasOriginales.getOrDefault("total", 0L));
            
            estadisticasBandeja.put("pendientesRevision", 
                (Long) estadisticasOriginales.getOrDefault("estado_ENVIADO", 0L) + 
                (Long) estadisticasOriginales.getOrDefault("estado_EN_REVISION", 0L));
            estadisticasBandeja.put("enProceso", 
                (Long) estadisticasOriginales.getOrDefault("estado_APROBADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_EN_PROCESO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_DERIVADO", 0L));
            
            estadisticasBandeja.put("finalizadosHoy", 
                (Long) estadisticasOriginales.getOrDefault("estado_FINALIZADO", 0L));

            estadisticasBandeja.put("vencidos", 
                (Long) estadisticasOriginales.getOrDefault("estado_RECHAZADO", 0L) +
                (Long) estadisticasOriginales.getOrDefault("estado_OBSERVADO", 0L));
            estadisticasBandeja.put("promedioAtencion", 0.0);
            estadisticasBandeja.put("calificacionPromedio", 0.0);
            estadisticasBandeja.put("productividadSemanal", java.util.Collections.emptyList());
        }


        return ResponseEntity.ok(estadisticasBandeja);
    }

    @GetMapping("/exportar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<byte[]> exportarTramites(
            @RequestParam(name = "tramiteIds") String tramiteIds,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        java.util.List<Long> ids = java.util.Arrays.stream(tramiteIds.split(","))
            .map(String::trim)
            .map(Long::parseLong)
            .collect(java.util.stream.Collectors.toList());

        try {
            byte[] pdfBytes = tramiteService.exportarTramitesAPdf(ids, usuarioId, rol);
            
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "tramites_export.pdf");
            headers.setContentLength(pdfBytes.length);
            
            return new ResponseEntity<>(pdfBytes, headers, org.springframework.http.HttpStatus.OK);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF de exportación: " + e.getMessage());
        }
    }

    @PutMapping("/archivar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<java.util.Map<String, Object>> archivarTramites(
            @RequestBody java.util.Map<String, Object> request,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        @SuppressWarnings("unchecked")
        java.util.List<Integer> tramiteIdsInt = (java.util.List<Integer>) request.get("tramiteIds");
        java.util.List<Long> tramiteIds = tramiteIdsInt.stream()
            .map(Integer::longValue)
            .collect(java.util.stream.Collectors.toList());

        String observaciones = (String) request.getOrDefault("observaciones", "Archivado desde bandeja de gestión");

        try {
            java.util.List<java.util.Map<String, Object>> resultados = new java.util.ArrayList<>();
            int exitosos = 0;
            int fallidos = 0;
            
            for (Long tramiteId : tramiteIds) {
                try {
                    tramiteService.cambiarEstadoTramite(tramiteId, "ARCHIVADO", observaciones, usuarioId, rol);
                    resultados.add(java.util.Map.of(
                        "tramiteId", tramiteId,
                        "estado", "EXITOSO",
                        "mensaje", "Trámite archivado correctamente"
                    ));
                    exitosos++;
                } catch (Exception e) {
                    resultados.add(java.util.Map.of(
                        "tramiteId", tramiteId,
                        "estado", "ERROR",
                        "mensaje", "Error al archivar: " + e.getMessage()
                    ));
                    fallidos++;
                }
            }
            
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("totalProcesados", tramiteIds.size());
            response.put("exitosos", exitosos);
            response.put("fallidos", fallidos);
            response.put("detalles", resultados);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al archivar trámites: " + e.getMessage());
        }
    }

    @PutMapping("/desarchivar")
    @PreAuthorize("hasRole('ADMINISTRATIVO') or hasRole('ADMIN')")
    public ResponseEntity<java.util.Map<String, Object>> desarchivarTramites(
            @RequestBody java.util.Map<String, Object> request,
            Principal principal,
            HttpServletRequest httpRequest) {
        
        Long usuarioId = getUserIdFromToken(httpRequest);
        if (usuarioId == null) {
            throw new RuntimeException("No se pudo obtener el ID del usuario del token");
        }
        String rol = getRole(principal);
        
        @SuppressWarnings("unchecked")
        java.util.List<Integer> tramiteIdsInt = (java.util.List<Integer>) request.get("tramiteIds");
        java.util.List<Long> tramiteIds = tramiteIdsInt.stream()
            .map(Integer::longValue)
            .collect(java.util.stream.Collectors.toList());

        String observaciones = (String) request.getOrDefault("observaciones", "Desarchivado desde bandeja de gestión");
        String nuevoEstado = (String) request.getOrDefault("nuevoEstado", "EN_REVISION");

        try {
            java.util.List<java.util.Map<String, Object>> resultados = new java.util.ArrayList<>();
            int exitosos = 0;
            int fallidos = 0;
            
            for (Long tramiteId : tramiteIds) {
                try {
                    tramiteService.cambiarEstadoTramite(tramiteId, nuevoEstado, observaciones, usuarioId, rol);
                    resultados.add(java.util.Map.of(
                        "tramiteId", tramiteId,
                        "estado", "EXITOSO",
                        "mensaje", "Trámite desarchivado correctamente"
                    ));
                    exitosos++;
                } catch (Exception e) {
                    resultados.add(java.util.Map.of(
                        "tramiteId", tramiteId,
                        "estado", "ERROR",
                        "mensaje", "Error al desarchivar: " + e.getMessage()
                    ));
                    fallidos++;
                }
            }
            
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("totalProcesados", tramiteIds.size());
            response.put("exitosos", exitosos);
            response.put("fallidos", fallidos);
            response.put("detalles", resultados);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al desarchivar trámites: " + e.getMessage());
        }
    }

    private String getRole(Principal principal) {
        if (principal instanceof Authentication auth) {
            return auth.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
        }
        return "USUARIO";
    }
    
    private Long getUserIdFromToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            return jwtService.extractUserId(token);
        }
        return null;
    }
}