package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "encuestas_satisfaccion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class EncuestaSatisfaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tramite_id", nullable = false)
    private Long tramiteId;

    @Column(name = "usuario_solicitante_id", nullable = false)
    private Long usuarioSolicitanteId;

    @Column(name = "trabajador_evaluado_id", nullable = false)
    private Long trabajadorEvaluadoId;


    @Column(name = "token", nullable = false, unique = true, length = 100)
    private String token;

    @Column(name = "calificacion_tiempo_respuesta")
    private Integer calificacionTiempoRespuesta;

    @Column(name = "calificacion_calidad_respuesta")
    private Integer calificacionCalidadRespuesta;

    @Column(name = "calificacion_claridad")
    private Integer calificacionClaridad;

    @Column(name = "calificacion_amabilidad")
    private Integer calificacionAmabilidad;

    @Column(name = "calificacion_resolucion")
    private Integer calificacionResolucion;


    @Column(name = "calificacion_general")
    private Double calificacionGeneral;

  
    @Column(name = "comentarios", columnDefinition = "TEXT")
    private String comentarios;


    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    @Builder.Default
    private EstadoEncuesta estado = EstadoEncuesta.PENDIENTE;


    @Column(name = "fecha_limite")
    private LocalDateTime fechaLimite;


    @Column(name = "fecha_respuesta")
    private LocalDateTime fechaRespuesta;


    @Column(name = "email_enviado", nullable = false)
    private String emailEnviado;


    @Column(name = "intentos_envio")
    @Builder.Default
    private Integer intentosEnvio = 0;

    @Column(name = "email_enviado_exitoso")
    @Builder.Default
    private Boolean emailEnviadoExitoso = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum EstadoEncuesta {
        PENDIENTE,      // Enviada pero no respondida
        RESPONDIDA,     // Completada por el usuario
        EXPIRADA,       // Pasó la fecha límite sin responder
        CANCELADA       // Cancelada por algún motivo
    }

   
    public void calcularCalificacionGeneral() {
        if (calificacionTiempoRespuesta != null &&
            calificacionCalidadRespuesta != null &&
            calificacionClaridad != null &&
            calificacionAmabilidad != null &&
            calificacionResolucion != null) {

            double suma = calificacionTiempoRespuesta +
                         calificacionCalidadRespuesta +
                         calificacionClaridad +
                         calificacionAmabilidad +
                         calificacionResolucion;

            this.calificacionGeneral = suma / 5.0;
        }
    }


    public boolean validarCalificaciones() {
        return validarRango(calificacionTiempoRespuesta) &&
               validarRango(calificacionCalidadRespuesta) &&
               validarRango(calificacionClaridad) &&
               validarRango(calificacionAmabilidad) &&
               validarRango(calificacionResolucion);
    }

    private boolean validarRango(Integer calificacion) {
        return calificacion != null && calificacion >= 1 && calificacion <= 5;
    }

    
    public boolean estaExpirada() {
        return fechaLimite != null && LocalDateTime.now().isAfter(fechaLimite);
    }

 
    public void marcarComoRespondida() {
        this.estado = EstadoEncuesta.RESPONDIDA;
        this.fechaRespuesta = LocalDateTime.now();
    }
}