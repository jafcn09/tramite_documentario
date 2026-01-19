package com.example.demo.dto;

import com.example.demo.entity.Grado;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradoResponse {

    private Long id;
    private String numeroRegistro;
    private String numeroLibro;
    private String alumno;
    private String dni;
    private String facultad;
    private String programaAcademico;
    private String numeroInscripcion;
    private String resolucion;
    private String fechaSesionResolucion;
    private String codigoDiploma;
    private String especialidad;
    private String gradoAcademico;
    private String fechaExpedicionGrado;
    private String fechaExpedicionDiploma;
    private String rector;
    private String coordinadorAcademico;
    private String secretarioGeneral;
    private String condicion;

    public static GradoResponse fromEntity(Grado g) {
        return GradoResponse.builder()
                .id(g.getId())
                .numeroRegistro(g.getNumeroRegistro())
                .numeroLibro(g.getNumeroLibro())
                .alumno(g.getAlumno())
                .dni(g.getDni())
                .facultad(g.getFacultad())
                .programaAcademico(g.getProgramaAcademico())
                .numeroInscripcion(g.getNumeroInscripcion())
                .resolucion(g.getResolucion())
                .fechaSesionResolucion(g.getFechaSesionResolucion())
                .codigoDiploma(g.getCodigoDiploma())
                .especialidad(g.getEspecialidad())
                .gradoAcademico(g.getGradoAcademico())
                .fechaExpedicionGrado(g.getFechaExpedicionGrado())
                .fechaExpedicionDiploma(g.getFechaExpedicionDiploma())
                .rector(g.getRector())
                .coordinadorAcademico(g.getCoordinadorAcademico())
                .secretarioGeneral(g.getSecretarioGeneral())
                .condicion(g.getCondicion())
                .build();
    }
}