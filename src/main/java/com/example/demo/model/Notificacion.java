package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notificaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notificacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "usuario_destinatario_id", nullable = false)
    private Long usuarioDestinatarioId;
    
    @Column(nullable = false, length = 255)
    private String titulo;
    
    @Column(columnDefinition = "TEXT")
    private String mensaje;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoNotificacion tipo;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PrioridadNotificacion prioridad;
    
    @Column(name = "es_leida", nullable = false)
    private Boolean esLeida = false;
    
    @Column(name = "tramite_relacionado_id")
    private Long tramiteRelacionadoId; // ID del trámite relacionado (opcional)
    
    @Column(name = "area_origen_id")
    private Long areaOrigenId; // ID del área que genera la notificación
    
    @Column(name = "usuario_emisor_id")
    private Long usuarioEmisorId; // ID del usuario que genera la notificación (opcional)
    
    @Column(name = "ruta_destino", length = 255)
    private String rutaDestino; // Ruta de navegación relacionada (/tramites/123)
    
    @Column(name = "fecha_vencimiento")
    private LocalDateTime fechaVencimiento; // Para notificaciones con expiración
    
    @Column(name = "metadatos", columnDefinition = "JSON")
    private String metadatos; // Información adicional en formato JSON
    
    @CreationTimestamp
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_lectura")
    private LocalDateTime fechaLectura;
    
    // Enums
    public enum TipoNotificacion {
        TRAMITE_NUEVO,
        TRAMITE_ASIGNADO,
        TRAMITE_DERIVADO,
        TRAMITE_OBSERVADO,
        TRAMITE_APROBADO,
        TRAMITE_RECHAZADO,
        TRAMITE_FINALIZADO,
        TRAMITE_VENCIDO,
        TRAMITE_POR_VENCER,
        COMENTARIO_AGREGADO,
        DOCUMENTO_ADJUNTADO,
        SISTEMA,
        RECORDATORIO,
        ALERTA
    }
    
    public enum PrioridadNotificacion {
        BAJA,
        NORMAL,
        ALTA,
        CRITICA
    }
}