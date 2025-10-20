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
public class TramiteRequest {
    
    private String titulo;
    private String asunto;
    private String descripcion;
    private String tipo;
    private String prioridad;
    private String numeroExpediente;
    private String observaciones;
    private Long areaOrigenId;
    private Long areaDestinoId;
    private Long usuarioAsignadoId;
    private String documentosAdjuntos;
    private Long nuevoResponsableId;
    private String motivoDerivacion;
    private String nuevoEstado;
    private LocalDateTime fechaVencimiento;
}