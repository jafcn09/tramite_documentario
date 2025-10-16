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
public class TramiteHistorialResponse {

    private Long id;
    private String accion;
    private String estadoAnterior;
    private String estadoNuevo;
    private String observaciones;
    private String motivo;
    private LocalDateTime fechaAccion;
    private Long totalModificaciones;
    private UsuarioBasicInfo usuario;
    private AreaBasicInfo areaOrigen;
    private AreaBasicInfo areaDestino;
    private UsuarioBasicInfo usuarioAnterior;
    private UsuarioBasicInfo usuarioNuevo;

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

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AreaBasicInfo {
        private Long id;
        private String nombre;
    }
}