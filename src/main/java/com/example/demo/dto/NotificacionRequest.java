
package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificacionRequest {
    
    private Long usuarioDestinatarioId;
    private String roleDestinatario;
    private Boolean enviarATodos;
    private String titulo;
    private String mensaje;
    private String tipo;
    private String prioridad;
    private Long tramiteRelacionadoId;
    private Long areaOrigenId;
    private Long usuarioEmisorId;
    private String rutaDestino;
    private LocalDateTime fechaVencimiento;
    private String metadatos;
}