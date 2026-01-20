package com.example.demo.entity;

import com.example.demo.model.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "historial_busquedas", indexes = {
    @Index(name = "idx_usuario_fecha", columnList = "usuario_id,fecha_busqueda DESC"),
    @Index(name = "idx_fecha", columnList = "fecha_busqueda DESC")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistorialBusqueda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grado_id", nullable = false)
    private Grado grado;

    @Column(nullable = false, length = 20)
    private String tipoBusqueda; 

    @Column(nullable = false, length = 100)
    private String terminoBusqueda;

    @Column(length = 45)
    private String ipAddress;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaBusqueda = LocalDateTime.now();

    @Column(length = 255)
    private String userAgent;
}