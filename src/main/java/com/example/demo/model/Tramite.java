package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tramites")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tramite {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 20)
    private String codigo; // TRM-2024-0001
    
    @Column(nullable = false, length = 255)
    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private TipoTramite tipo;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private EstadoTramite estado;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PrioridadTramite prioridad;
    
    // IDs simples en lugar de relaciones complejas
    @Column(name = "usuario_solicitante_id", nullable = false)
    private Long usuarioSolicitanteId; // ID del usuario que creó el trámite
    
    @Column(name = "usuario_asignado_id")
    private Long usuarioAsignadoId; // ID del usuario asignado para procesar
    
    @Column(name = "area_actual_id")
    private Long areaActualId; // ID del área donde está el trámite
    
    @Column(name = "area_origen_id")
    private Long areaOrigenId; // ID del área de origen
    
    @Column(name = "fecha_vencimiento")
    private LocalDateTime fechaVencimiento;
    
    @Column(name = "fecha_completado")
    private LocalDateTime fechaCompletado;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
    @Column(name = "numero_expediente", length = 50)
    private String numeroExpediente;
    
    @Column(name = "documentos_adjuntos", columnDefinition = "JSON")
    private String documentosAdjuntos; // JSON con la lista de documentos
    
    @Column(name = "calificacion")
    private Integer calificacion; // 1-5 estrellas
    
    @Column(name = "comentario_calificacion", columnDefinition = "TEXT")
    private String comentarioCalificacion;
    
    @CreationTimestamp
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;
    
    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
    
    // Enums
    public enum TipoTramite {
        SOLICITUD_CERTIFICADO,
        SOLICITUD_CONSTANCIA,
        SOLICITUD_PERMISO,
        RECLAMO,
        SUGERENCIA,
        CONSULTA,
        LICENCIA,
        AUTORIZACION,
        REVISION_EXPEDIENTE,
        TRAMITE_ACADEMICO,
        TRAMITE_ADMINISTRATIVO,
        OTRO
    }
    
    public enum EstadoTramite {
        BORRADOR,
        ENVIADO,
        EN_REVISION,
        DERIVADO,
        OBSERVADO,
        EN_PROCESO,
        APROBADO,
        RECHAZADO,
        FINALIZADO,
        ARCHIVADO,
        CANCELADO
    }
    
    public enum PrioridadTramite {
        BAJA,
        NORMAL,
        ALTA,
        URGENTE
    }
}