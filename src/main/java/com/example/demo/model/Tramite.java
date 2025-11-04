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
    private String codigo;

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

    @Column(name = "usuario_solicitante_id", nullable = false)
    private Long usuarioSolicitanteId;

    @Column(name = "usuario_asignado_id")
    private Long usuarioAsignadoId;

    @Column(name = "area_actual_id")
    private Long areaActualId;

    @Column(name = "area_origen_id")
    private Long areaOrigenId;

    @Column(name = "fecha_vencimiento")
    private LocalDateTime fechaVencimiento;
    
    @Column(name = "fecha_completado")
    private LocalDateTime fechaCompletado;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
    @Column(name = "numero_expediente", length = 50)
    private String numeroExpediente;

    @Column(name = "documentos_adjuntos", columnDefinition = "JSON")
    private String documentosAdjuntos;

    @Column(name = "calificacion")
    private Integer calificacion;

    @Column(name = "comentario_calificacion", columnDefinition = "TEXT")
    private String comentarioCalificacion;
    
    @Column(name = "respuesta", columnDefinition = "TEXT")
    private String respuesta;
    
    @Column(name = "archivos_respuesta", columnDefinition = "JSON")
    private String archivosRespuesta;
    
    @Column(name = "fecha_respuesta")
    private LocalDateTime fechaRespuesta;
    
    @Column(name = "usuario_respondio_id")
    private Long usuarioRespondioId;
    
    @Column(name = "contador_procesados")
    private Integer contadorProcesados = 0;
    
    @Column(name = "contador_por_procesar")
    private Integer contadorPorProcesar = 0;

    @Column(name = "contador_rechazados")
    private Integer contadorRechazados = 0;

    @Column(name = "asunto", length = 255, nullable = false)
    private String asunto;

    @Column(name = "qr_code", length = 255, unique = true)
    private String qrCode;

    @Column(name = "qr_url", length = 512)
    private String qrUrl;

    @Column(name = "qr_generado_fecha")
    private LocalDateTime qrGeneradoFecha;

    @Column(name = "qr_escaneos")
    private Integer qrEscaneos = 0;

    @Column(name = "firma_digital_activa")
    private Boolean firmaDigitalActiva = false;

    @Column(name = "requiere_biometria")
    private Boolean requiereBiometria = false;

    @Column(name = "firma_valida")
    private Boolean firmaValida = false;

    @Column(name = "hash_firma", columnDefinition = "TEXT")
    private String hashFirma;

    @Column(name = "fecha_firma")
    private LocalDateTime fechaFirma;

    @Column(name = "metodo_verificacion", length = 100)
    private String metodoVerificacion;

    @CreationTimestamp
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;
    
    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

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
        NORMAL,
        ALTA,
        URGENTE
    }
}