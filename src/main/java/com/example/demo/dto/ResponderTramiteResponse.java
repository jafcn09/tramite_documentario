package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResponderTramiteResponse {
    private boolean success;
    private String mensaje;
    private Long tramiteId;
    private String codigoTramite;
    private String estadoActual;
    private ResponsableInfo responsable;
    private LocalDateTime fechaRespuesta;
    private boolean emailEnviado;
    
    @Data
    @Builder
    public static class ResponsableInfo {
        private Long id;
        private String nombre;
        private String apellidos;
        private String correo;
        private String area;
    }
}