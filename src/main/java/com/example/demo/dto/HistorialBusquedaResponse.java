package com.example.demo.dto;

import com.example.demo.entity.HistorialBusqueda;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistorialBusquedaResponse {

    private Long id;
    private Long gradoId;
    private String alumno;
    private String dni;
    private String codigoDiploma;
    private String gradoAcademico;
    private String tipoBusqueda;
    private String terminoBusqueda;
    private LocalDateTime fechaBusqueda;

    public static HistorialBusquedaResponse fromEntity(HistorialBusqueda historial) {
        return HistorialBusquedaResponse.builder()
                .id(historial.getId())
                .gradoId(historial.getGrado().getId())
                .alumno(historial.getGrado().getAlumno())
                .dni(historial.getGrado().getDni())
                .codigoDiploma(historial.getGrado().getCodigoDiploma())
                .gradoAcademico(historial.getGrado().getGradoAcademico())
                .tipoBusqueda(historial.getTipoBusqueda())
                .terminoBusqueda(historial.getTerminoBusqueda())
                .fechaBusqueda(historial.getFechaBusqueda())
                .build();
    }
}