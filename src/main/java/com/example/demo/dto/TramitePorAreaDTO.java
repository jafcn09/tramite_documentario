package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TramitePorAreaDTO {
    private String area;
    private Long total;
    private Long completados;
    private Long enProceso;
    private Double porcentajeCompletado;
}