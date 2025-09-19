package com.example.demo.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
public class RechazarTramiteRequest {

    @NotNull(message = "El ID del trámite es requerido")
    private Long tramiteId;

    @NotBlank(message = "El motivo del rechazo es requerido")
    @Size(min = 10, max = 1000, message = "El motivo debe tener entre 10 y 1000 caracteres")
    private String motivoRechazo;

    @Size(max = 500, message = "Las observaciones no pueden exceder 500 caracteres")
    private String observaciones;
}