package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TramiteUrgenteDTO {
    private Long id;
    private String codigo;
    private String asunto;
    private String tipo;
    private String estado;
    private Integer diasVencido;
    private String responsable;
    private String areaResponsable;
    private LocalDate fechaVencimiento;
}