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

    private String titulo;
    private String asunto;
    private String descripcion;
    private String numeroExpediente;
    private String observaciones;
    private String tipo;
    private String prioridad;
    private Long areaDestinoId;
    private String tipoFirma;
    private String razonFirma;
    private String ubicacionFirma;
    private String firmaDigitalData;
    private Boolean requiereFirmaDigital;
}