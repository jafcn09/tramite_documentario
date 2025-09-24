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
    
    // Para áreas específicas (opcional)
    private Long areaDestinoId;
    
    // Para asignación directa (opcional, solo admin)
    private Long usuarioAsignadoId;
    
    // Documentos adjuntos (JSON string o lista)
    private String documentosAdjuntos;
    
    // Para derivación
    private Long nuevoResponsableId;
    private String motivoDerivacion;
    
    // Para cambio de estado
    private String nuevoEstado;
    
    // Fecha límite opcional
    private LocalDateTime fechaVencimiento;
}