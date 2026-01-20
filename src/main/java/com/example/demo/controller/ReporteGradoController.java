package com.example.demo.controller;

import com.example.demo.dto.ReporteRequest;
import com.example.demo.dto.ReporteResponse;
import com.example.demo.dto.UpdateReporteRequest;
import com.example.demo.service.ReporteGradoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reportes-grados")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReporteGradoController {

    private final ReporteGradoService reporteService;

    @PostMapping
    public ResponseEntity<ReporteResponse> crearReporte(@Valid @RequestBody ReporteRequest request) {
        ReporteResponse reporte = reporteService.crearReporte(request);
        return ResponseEntity.ok(reporte);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<List<ReporteResponse>> listarTodos() {
        return ResponseEntity.ok(reporteService.listarTodos());
    }

    @GetMapping("/paginado")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<Page<ReporteResponse>> listarTodosPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "fechaCreacion") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {

        Sort sort = direction.equalsIgnoreCase("ASC") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return ResponseEntity.ok(reporteService.listarTodosPaginado(pageable));
    }

    @GetMapping("/estado/{estado}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<List<ReporteResponse>> listarPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(reporteService.listarPorEstado(estado));
    }

    @GetMapping("/estado/{estado}/paginado")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<Page<ReporteResponse>> listarPorEstadoPaginado(
            @PathVariable String estado,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaCreacion").descending());
        return ResponseEntity.ok(reporteService.listarPorEstadoPaginado(estado, pageable));
    }

    @GetMapping("/grado/{gradoId}")
    public ResponseEntity<List<ReporteResponse>> listarPorGrado(@PathVariable Long gradoId) {
        return ResponseEntity.ok(reporteService.listarPorGrado(gradoId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<ReporteResponse> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(reporteService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<ReporteResponse> actualizarEstado(
            @PathVariable Long id,
            @Valid @RequestBody UpdateReporteRequest request) {
        ReporteResponse reporte = reporteService.actualizarEstado(id, request);
        return ResponseEntity.ok(reporte);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Long id) {
        reporteService.eliminar(id);
        return ResponseEntity.ok(Map.of("message", "Reporte eliminado exitosamente"));
    }

    @GetMapping("/estadisticas")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<Map<String, Long>> obtenerEstadisticas() {
        return ResponseEntity.ok(reporteService.obtenerEstadisticas());
    }

    @GetMapping("/estadisticas/por-tipo")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<List<Map<String, Object>>> obtenerReportesPorTipo() {
        return ResponseEntity.ok(reporteService.obtenerReportesPorTipo());
    }
}
