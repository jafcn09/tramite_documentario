package com.example.demo.service;

import com.example.demo.dto.ReporteRequest;
import com.example.demo.dto.ReporteResponse;
import com.example.demo.dto.UpdateReporteRequest;
import com.example.demo.entity.Grado;
import com.example.demo.entity.Reporte;
import com.example.demo.repository.GradoRepository;
import com.example.demo.repository.ReporteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReporteGradoService {

    private final ReporteRepository reporteRepository;
    private final GradoRepository gradoRepository;
    private final ReporteNotificacionService notificacionService;

    @Transactional
    public ReporteResponse crearReporte(ReporteRequest request) {
        Grado grado = gradoRepository.findById(request.getGradoId())
                .orElseThrow(() -> new RuntimeException("Grado no encontrado"));

        Reporte reporte = Reporte.builder()
                .grado(grado)
                .tipoError(request.getTipoError())
                .descripcion(request.getDescripcion())
                .emailReportante(request.getEmailReportante())
                .estado("PENDIENTE")
                .build();

        Reporte savedReporte = reporteRepository.save(reporte);
        ReporteResponse response = ReporteResponse.fromEntity(savedReporte);

     
        notificacionService.notificarReportanteCreacion(response);
        notificacionService.notificarAdministradoresNuevoReporte(response);

        return response;
    }

    @Transactional
    public ReporteResponse actualizarEstado(Long reporteId, UpdateReporteRequest request) {
        Reporte reporte = reporteRepository.findById(reporteId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));

        reporte.setEstado(request.getEstado());
        reporte.setComentarioAdmin(request.getComentarioAdmin());

        Reporte updatedReporte = reporteRepository.save(reporte);
        ReporteResponse response = ReporteResponse.fromEntity(updatedReporte);

     
        notificacionService.notificarReportanteActualizacion(response);
        notificacionService.notificarActualizacionReporte(response);

        return response;
    }

    public List<ReporteResponse> listarTodos() {
        return reporteRepository.findAll().stream()
                .map(ReporteResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Page<ReporteResponse> listarTodosPaginado(Pageable pageable) {
        return reporteRepository.findAll(pageable)
                .map(ReporteResponse::fromEntity);
    }

    public List<ReporteResponse> listarPorEstado(String estado) {
        return reporteRepository.findByEstado(estado).stream()
                .map(ReporteResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Page<ReporteResponse> listarPorEstadoPaginado(String estado, Pageable pageable) {
        return reporteRepository.findByEstado(estado, pageable)
                .map(ReporteResponse::fromEntity);
    }

    public List<ReporteResponse> listarPorGrado(Long gradoId) {
        return reporteRepository.findByGradoId(gradoId).stream()
                .map(ReporteResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public ReporteResponse obtenerPorId(Long id) {
        return reporteRepository.findById(id)
                .map(ReporteResponse::fromEntity)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));
    }

    @Transactional
    public void eliminar(Long id) {
        if (!reporteRepository.existsById(id)) {
            throw new RuntimeException("Reporte no encontrado");
        }
        reporteRepository.deleteById(id);
    }

    public Map<String, Long> obtenerEstadisticas() {
        return Map.of(
                "total", reporteRepository.count(),
                "pendientes", reporteRepository.countByEstado("PENDIENTE"),
                "enRevision", reporteRepository.countByEstado("EN_REVISION"),
                "resueltos", reporteRepository.countByEstado("RESUELTO"),
                "rechazados", reporteRepository.countByEstado("RECHAZADO")
        );
    }

    public List<Map<String, Object>> obtenerReportesPorTipo() {
        return reporteRepository.countByTipoError().stream()
                .map(obj -> Map.<String, Object>of(
                        "tipoError", obj[0],
                        "cantidad", obj[1]
                ))
                .collect(Collectors.toList());
    }
}
