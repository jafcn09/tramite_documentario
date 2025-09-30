package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditarTramiteRequest {

    // Campos opcionales para edición
    private String titulo;
    private String asunto;
    private String descripcion;
    private String numeroExpediente;
    private String observaciones;

    // Solo se puede cambiar si el trámite aún está en estado PENDIENTE o RECEPCIONADO
    private String tipo;
    private String prioridad;
    private Long areaDestinoId;
}