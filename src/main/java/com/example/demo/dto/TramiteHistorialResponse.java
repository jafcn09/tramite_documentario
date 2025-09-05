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
    
    // Información del usuario que realizó la acción
    private UsuarioBasicInfo usuario;
    
    // Información de las áreas (en caso de derivación)
    private AreaBasicInfo areaOrigen;
    private AreaBasicInfo areaDestino;
    
    // Usuarios anteriores y nuevos (en caso de reasignación)
    private UsuarioBasicInfo usuarioAnterior;
    private UsuarioBasicInfo usuarioNuevo;
    
    // Clases internas para información básica
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