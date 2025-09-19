package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class RechazarTramiteResponse {
    private Long tramiteId;
    private String codigo;
    private String estado;
    private String motivoRechazo;
    private String observaciones;
    private LocalDateTime fechaRechazo;
    private String rechazadoPor;
    private boolean notificacionEnviada;
    private String mensaje;
}