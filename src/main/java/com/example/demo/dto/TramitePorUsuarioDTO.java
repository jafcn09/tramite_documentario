package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TramitePorUsuarioDTO {
    private String usuario;
    private String area;
    private Long tramitesCreados;
    private Long tramitesProcesados;
    private Long tramitesRechazados;
    private Double promedioTiempoRespuesta;
}