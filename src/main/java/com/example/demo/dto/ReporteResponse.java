package com.example.demo.dto;

import com.example.demo.entity.Reporte;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteResponse {

    private Long id;
    private Long gradoId;
    private String alumnoNombre;
    private String codigoDiploma;
    private String tipoError;
    private String descripcion;
    private String emailReportante;
    private String estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private String comentarioAdmin;

    public static ReporteResponse fromEntity(Reporte reporte) {
        return ReporteResponse.builder()
                .id(reporte.getId())
                .gradoId(reporte.getGrado().getId())
                .alumnoNombre(reporte.getGrado().getAlumno())
                .codigoDiploma(reporte.getGrado().getCodigoDiploma())
                .tipoError(reporte.getTipoError())
                .descripcion(reporte.getDescripcion())
                .emailReportante(reporte.getEmailReportante())
                .estado(reporte.getEstado())
                .fechaCreacion(reporte.getFechaCreacion())
                .fechaActualizacion(reporte.getFechaActualizacion())
                .comentarioAdmin(reporte.getComentarioAdmin())
                .build();
    }
}