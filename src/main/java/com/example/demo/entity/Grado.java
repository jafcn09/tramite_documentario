package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "grados")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_registro")
    private String numeroRegistro;

    @Column(name = "numero_libro")
    private String numeroLibro;

    @Column(name = "alumno")
    private String alumno;

    @Column(name = "dni")
    private String dni;

    @Column(name = "facultad")
    private String facultad;

    @Column(name = "programa_academico")
    private String programaAcademico;

    @Column(name = "numero_inscripcion")
    private String numeroInscripcion;

    @Column(name = "resolucion")
    private String resolucion;

    @Column(name = "fecha_sesion_resolucion")
    private String fechaSesionResolucion;

    @Column(name = "codigo_diploma")
    private String codigoDiploma;

    @Column(name = "especialidad")
    private String especialidad;

    @Column(name = "grado_academico")
    private String gradoAcademico;

    @Column(name = "fecha_expedicion_grado")
    private String fechaExpedicionGrado;

    @Column(name = "fecha_expedicion_diploma")
    private String fechaExpedicionDiploma;

    @Column(name = "rector")
    private String rector;

    @Column(name = "coordinador_academico")
    private String coordinadorAcademico;

    @Column(name = "secretario_general")
    private String secretarioGeneral;

    @Column(name = "condicion")
    private String condicion;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}