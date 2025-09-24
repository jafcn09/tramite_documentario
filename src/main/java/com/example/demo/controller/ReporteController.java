package com.example.demo.controller;

import com.example.demo.service.ReporteService;
import com.example.demo.dto.ReporteCompletoDTO;
import com.example.demo.dto.ResumenGeneralDTO;
import com.example.demo.dto.TramitePorTipoDTO;
import com.example.demo.dto.TramiteUrgenteDTO;
import com.example.demo.dto.TramitePorAreaDTO;
import com.example.demo.dto.TramitePorUsuarioDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReporteController {

    private final ReporteService reporteService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<ReporteCompletoDTO> obtenerReporteCompleto(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        return ResponseEntity.ok(reporteService.generarReporteCompleto(fechaInicio, fechaFin));
    }

    @GetMapping("/resumen")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<ResumenGeneralDTO> obtenerResumenGeneral() {
        return ResponseEntity.ok(reporteService.obtenerResumenGeneral());
    }

    @GetMapping("/por-tipo")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<List<TramitePorTipoDTO>> obtenerTramitesPorTipo() {
        return ResponseEntity.ok(reporteService.obtenerTramitesPorTipo());
    }

    @GetMapping("/urgentes")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<List<TramiteUrgenteDTO>> obtenerTramitesUrgentes() {
        return ResponseEntity.ok(reporteService.obtenerTramitesUrgentes());
    }

    @GetMapping("/por-area")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<List<TramitePorAreaDTO>> obtenerTramitesPorArea() {
        return ResponseEntity.ok(reporteService.obtenerTramitesPorArea());
    }

    @GetMapping("/por-usuario")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<List<TramitePorUsuarioDTO>> obtenerTramitesPorUsuario() {
        return ResponseEntity.ok(reporteService.obtenerTramitesPorUsuario());
    }

    @GetMapping("/exportar/excel")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<byte[]> exportarReporteExcel(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        byte[] excelFile = reporteService.generarReporteExcel(fechaInicio, fechaFin);

        return ResponseEntity.ok()
                .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .header("Content-Disposition", "attachment; filename=reporte_tramites_" + LocalDate.now() + ".xlsx")
                .body(excelFile);
    }

    @GetMapping("/exportar/pdf")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMINISTRATIVO')")
    public ResponseEntity<byte[]> exportarReportePDF(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        byte[] pdfFile = reporteService.generarReportePDF(fechaInicio, fechaFin);

        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=reporte_tramites_" + LocalDate.now() + ".pdf")
                .body(pdfFile);
    }
}