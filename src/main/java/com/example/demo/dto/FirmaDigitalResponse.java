package com.example.demo.dto;

import com.example.demo.model.FirmaDigital.TipoFirma;
import com.example.demo.model.FirmaDigital.EstadoFirma;
import com.example.demo.model.FirmaDigital.EstadoAutorizacion;
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
public class FirmaDigitalResponse {

    private Long id;

    private TramiteBasicInfo tramite;

    private UsuarioBasicInfo firmante;

    private TipoFirma tipoFirma;

    private String descripcionTipoFirma;

    private EstadoFirma estadoFirma;

    private String descripcionEstado;

    private EstadoAutorizacion estadoAutorizacion;

    private String descripcionAutorizacion;

    private UsuarioBasicInfo autorizadoPor;

    private LocalDateTime fechaAutorizacion;

    private String motivoAutorizacion;

    private String hashDocumento;

    private String certificadoSerial;

    private String algoritmoFirma;

    private LocalDateTime fechaFirma;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaVencimiento;

    private String razonFirma;

    private String ubicacionFirma;

    private String contactoFirmante;

    private String ipFirma;

    private Boolean validacionCertificado;

    private String motivoInvalidacion;

    private String observaciones;

    // Información de autorización
    private Integer nivelAutorizacionRequerido;

    private String nivelAutorizacionTexto;

    private Boolean requierePinAdicional;

    private LocalDateTime expiraEn;

    private Boolean autorizacionExpirada;

    // Información de documentos adjuntos
    private List<DocumentoAdjuntoInfo> documentosAdjuntos;

    private Integer cantidadDocumentos;

    private String hashDocumentosAdjuntos;

    // Métodos de conveniencia (calculados)
    private Boolean esFirmaPendiente;

    private Boolean esFirmaValida;

    private Boolean puedeSerFirmada;

    private Boolean requiereAutorizacion;

    private Boolean estaAutorizado;

    private Boolean tieneDocumentosAdjuntos;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TramiteBasicInfo {
        private Long id;
        private String codigo;
        private String asunto;
        private String tipoTramite;
        private String estado;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UsuarioBasicInfo {
        private Long id;
        private String nombre;
        private String apellidos;
        private String email;
        private String nombreCompleto;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DocumentoAdjuntoInfo {
        private String nombreArchivo;
        private String tipoContenido;
        private Long tamaño;
        private String descripcion;
        private String hash;
        private LocalDateTime fechaAdjunto;
    }
}