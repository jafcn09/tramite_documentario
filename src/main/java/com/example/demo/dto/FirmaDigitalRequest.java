package com.example.demo.dto;

import com.example.demo.model.FirmaDigital.TipoFirma;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FirmaDigitalRequest {

    @NotNull(message = "El ID del trámite es obligatorio")
    private Long tramiteId;

    @NotNull(message = "El ID del firmante es obligatorio")
    private Long firmanteId;

    @NotNull(message = "El tipo de firma es obligatorio")
    private TipoFirma tipoFirma;

    @NotBlank(message = "La razón de la firma es obligatoria")
    private String razonFirma;

    private String ubicacionFirma;

    private String contactoFirmante;

    private String observaciones;

    private List<DocumentoAdjuntoRequest> documentosAdjuntos;

    private Integer nivelAutorizacionRequerido;

    private Boolean requierePinAdicional;

    private LocalDateTime expiraEn;

    private String motivoSolicitud;

    private String certificadoSerial;

    private String algoritmoFirma;

    private String hashDocumento;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentoAdjuntoRequest {
        @NotBlank(message = "El nombre del archivo es obligatorio")
        private String nombreArchivo;

        @NotBlank(message = "El contenido en Base64 es obligatorio")
        private String contenidoBase64;

        @NotBlank(message = "El tipo de contenido es obligatorio")
        private String tipoContenido;

        private String descripcion;

        private Long tamaño;
    }
}