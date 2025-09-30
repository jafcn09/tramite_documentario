package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificacionResponse {
    
    private Long id;
    private String titulo;
    private String mensaje;
    private String tipo;
    private String prioridad;
    private Boolean esLeida;
    private String rutaDestino;
    private Long referenciaId; // ID del trámite o entidad relacionada para el frontend
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaLectura;
    private LocalDateTime fechaVencimiento;

    // Información del trámite relacionado (opcional)
    private TramiteBasicInfo tramiteRelacionado;
    
    // Información del área origen (opcional)
    private AreaBasicInfo areaOrigen;
    
    // Información del usuario emisor (opcional)
    private UsuarioBasicInfo usuarioEmisor;
    
    // Metadatos adicionales
    private String metadatos;
    
    // Información básica del trámite
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TramiteBasicInfo {
        private Long id;
        private String codigo;
        private String titulo;
        private String estado;
        private String tipo;
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
    
    // Información básica del usuario
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UsuarioBasicInfo {
        private Long id;
        private String nombre;
        private String apellidos;
        private String rol;
    }
}