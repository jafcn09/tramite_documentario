package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumenGeneralDTO {
    private Long totalTramites;
    private Long completados;
    private Long enProceso;
    private Long vencidos;
    private Long rechazados;
    private Long observados;
}