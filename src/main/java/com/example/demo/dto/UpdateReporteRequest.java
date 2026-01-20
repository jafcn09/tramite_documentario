package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReporteRequest {

    @NotBlank(message = "El estado es obligatorio")
    @Pattern(regexp = "PENDIENTE|EN_REVISION|RESUELTO|RECHAZADO",
             message = "Estado debe ser: PENDIENTE, EN_REVISION, RESUELTO o RECHAZADO")
    private String estado;

    private String comentarioAdmin;
}