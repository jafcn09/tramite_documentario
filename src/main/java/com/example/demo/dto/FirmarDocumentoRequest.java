package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FirmarDocumentoRequest {

    @NotNull(message = "El ID de la firma es obligatorio")
    private Long firmaId;

    @NotBlank(message = "El PIN del certificado es obligatorio")
    private String pinCertificado;

    @NotBlank(message = "La ubicación de firma es obligatoria")
    private String ubicacionFirma;

    private String contactoFirmante;

    private String razonAdicional;

    private String codigoValidacion;

    @NotBlank(message = "El serial del certificado es obligatorio")
    private String certificadoSerial;

    @NotBlank(message = "El algoritmo de firma es obligatorio")
    private String algoritmoFirma;

    @NotBlank(message = "El hash del documento es obligatorio")
    private String hashDocumento;

    private String documentoFirmadoBase64; // El documento ya firmado en Base64

    private String versionCertificado;

    private String emisorCertificado;

    private String observacionesFirma;
}