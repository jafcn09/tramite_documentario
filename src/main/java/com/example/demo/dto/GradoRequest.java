package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GradoRequest {
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
}