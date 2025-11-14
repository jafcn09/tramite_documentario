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
    private EstadoInfo estado;
    private String prioridad;
    private String numeroExpediente;
    private String observaciones;
    private Integer calificacion;
    private String comentarioCalificacion;
    private UsuarioBasicInfo usuarioSolicitante;
    private UsuarioBasicInfo usuarioAsignado;
    private AreaBasicInfo areaActual;
    private AreaBasicInfo areaOrigen;
    private String respuesta;
    private LocalDateTime fechaRespuesta;
    private UsuarioBasicInfo usuarioRespondio;
    private List<DocumentoAdjunto> archivosRespuesta;
    private Integer contadorProcesados;
    private Integer contadorPorProcesar;
    private Boolean puedeEditar;
    private Boolean estaVencido;
    private Long diasRestantes;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private LocalDateTime fechaVencimiento;
    private LocalDateTime fechaCompletado;
    private Integer progreso;

    @JsonProperty(value = "documentosAdjuntos", access = JsonProperty.Access.WRITE_ONLY)
    private List<DocumentoAdjunto> documentosAdjuntos;

    @JsonProperty("documentos")
    private List<DocumentoAdjunto> documentos;

    private List<TramiteHistorialResponse> historial;

    private Boolean firmaDigitalActiva;
    private Boolean requiereBiometria;
    private Boolean firmaValida;
    private String hashFirma;
    private LocalDateTime fechaFirma;
    private String metodoVerificacion;
    private String tipoFirma;
    private String razonFirma;
    private String ubicacionFirma;

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

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AreaBasicInfo {
        private Long id;
        private String nombre;
        private String descripcion;
    }

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

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EstadoInfo {
        private String nombre;
    }
}