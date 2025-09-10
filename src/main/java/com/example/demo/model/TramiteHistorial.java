package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tramite_historial")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TramiteHistorial {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tramite_id", nullable = false)
    private Long tramiteId;
    
    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId; // Usuario que realizó la acción
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private TipoAccion accion;
    
    @Column(name = "estado_anterior", length = 50)
    private String estadoAnterior;
    
    @Column(name = "estado_nuevo", length = 50)
    private String estadoNuevo;
    
    @Column(name = "area_origen_id")
    private Long areaOrigenId;
    
    @Column(name = "area_destino_id")
    private Long areaDestinoId;
    
    @Column(name = "usuario_anterior_id")
    private Long usuarioAnteriorId;
    
    @Column(name = "usuario_nuevo_id")
    private Long usuarioNuevoId;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
    @Column(columnDefinition = "TEXT")
    private String motivo; // Motivo de la acción (rechazo, derivación, etc.)
    
    @CreationTimestamp
    @Column(name = "fecha_accion", nullable = false, updatable = false)
    private LocalDateTime fechaAccion;
    
    // Enums para los tipos de acciones
    public enum TipoAccion {
        CREADO,
        ENVIADO,
        ASIGNADO,
        DERIVADO,
        OBSERVADO,
        APROBADO,
        RECHAZADO,
        FINALIZADO,
        ARCHIVADO,
        CANCELADO,
        MODIFICADO,
        COMENTARIO_AGREGADO,
        DOCUMENTO_ADJUNTO,
        CALIFICADO,
        RESPONDIDO
    }
}