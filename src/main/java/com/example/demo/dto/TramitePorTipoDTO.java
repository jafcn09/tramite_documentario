package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TramitePorTipoDTO {
    private String tipo;
    private Long cantidad;
    private Long completados;
    private Long pendientes;
}