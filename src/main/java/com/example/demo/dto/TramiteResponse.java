package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TramiteResponse {
    
    private Long id;
    private String codigo;
    private String titulo;
    private String descripcion;
    private String tipo;
    private String estado;
    private String prioridad;
    private String numeroExpediente;
    private String observaciones;
    private Integer calificacion;
    private String comentarioCalificacion;
    
    // Información del usuario solicitante
    private UsuarioBasicInfo usuarioSolicitante;
    
    // Información del usuario asignado
    private UsuarioBasicInfo usuarioAsignado;
    
    // Información del área actual
    private AreaBasicInfo areaActual;
    
    // Información del área origen
    private AreaBasicInfo areaOrigen;
    
    // Información de respuesta
    private String respuesta;
    private LocalDateTime fechaRespuesta;
    private UsuarioBasicInfo usuarioRespondio;
    private List<DocumentoAdjunto> archivosRespuesta;
    
    // Contadores
    private Integer contadorProcesados;
    private Integer contadorPorProcesar;

    // Permisos y estados
    private Boolean puedeEditar;
    private Boolean estaVencido;
    private Long diasRestantes;

    // Fechas
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private LocalDateTime fechaVencimiento;
    private LocalDateTime fechaCompletado;
    
    // Documentos adjuntos
    @JsonProperty("documentos")
    private List<DocumentoAdjunto> documentosAdjuntos;
    
    // Historial (opcional, solo cuando se solicite explícitamente)
    private List<TramiteHistorialResponse> historial;
    
    // Información básica del usuario
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UsuarioBasicInfo {
        private Long id;
        private String nombre;
        private String apellidos;
        private String correo;
        private String rol;
    }
    
    // Información básica del área
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AreaBasicInfo {
        private Long id;
        private String nombre;
        private String descripcion;
    }
    
    // Documento adjunto
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentoAdjunto {
        private String nombre;
        private String url;
        private String tipo;
        @JsonProperty("tamano")
        private Long tamanio;
        private LocalDateTime fechaSubida;
        private String contenido;
        private String descripcion;
    }
}