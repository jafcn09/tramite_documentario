package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TramiteConArchivosRequest {

    private Long tipoTramiteId;
    private String asunto;
    private String descripcion;
    private Long prioridadId;
    private Long areaOrigenId;
    private Long areaDestinoId;
    private LocalDateTime fechaVencimiento;
    private String observaciones;
    private List<DocumentoBase64Request> documentos;
    private Boolean requiereFirmaDigital;
    private Long firmanteId;
    private String tipoFirma;
    private String razonFirma;
    private String ubicacionFirma; 
    private Boolean consentimientoFirma;
    private String firmaDigitalData;


    private Boolean firmaDigitalActiva;
    private Boolean firmaDigitalRequiereBiometria;
    private Boolean firmaDigitalValida;
    private String firmaDigitalHash;
    private LocalDateTime firmaDigitalFecha;
    private String firmaDigitalMetodoVerificacion;
}