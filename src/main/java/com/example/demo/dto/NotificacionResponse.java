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
    private Long referenciaId;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaLectura;
    private LocalDateTime fechaVencimiento;
    private TramiteBasicInfo tramiteRelacionado;
    private AreaBasicInfo areaOrigen;
    private UsuarioBasicInfo usuarioEmisor;
    private String metadatos;

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
    public static class UsuarioBasicInfo {
        private Long id;
        private String nombre;
        private String apellidos;
        private String rol;
    }
}