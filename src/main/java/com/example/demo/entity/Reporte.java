package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reportes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grado_id", nullable = false)
    private Grado grado;

    @Column(nullable = false, length = 50)
    private String tipoError;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 100)
    private String emailReportante;

    @Column(nullable = false, length = 20)
    @Builder.Default
    private String estado = "PENDIENTE"; 

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column
    private LocalDateTime fechaActualizacion;

    @Column(columnDefinition = "TEXT")
    private String comentarioAdmin;

    @PreUpdate
    public void preUpdate() {
        this.fechaActualizacion = LocalDateTime.now();
    }
}