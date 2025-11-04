package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "firma_digital")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FirmaDigital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tramite_id", nullable = false)
    private Long tramiteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "firmante_id", nullable = false)
    private Usuario firmante;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_firma", nullable = false, length = 50)
    private TipoFirma tipoFirma;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_firma", nullable = false, length = 50)
    private EstadoFirma estadoFirma;

    @Column(name = "documento_original_path", length = 500)
    private String documentoOriginalPath;

    @Column(name = "documento_firmado_path", length = 500)
    private String documentoFirmadoPath;

    @Column(name = "hash_documento", length = 255)
    private String hashDocumento;

    @Column(name = "certificado_serial", length = 255)
    private String certificadoSerial;

    @Column(name = "algoritmo_firma", length = 100)
    private String algoritmoFirma;

    @Column(name = "fecha_firma")
    private LocalDateTime fechaFirma;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_vencimiento")
    private LocalDateTime fechaVencimiento;

    @Column(name = "razon_firma", length = 500)
    private String razonFirma;

    @Column(name = "ubicacion_firma", length = 200)
    private String ubicacionFirma;

    @Column(name = "contacto_firmante", length = 200)
    private String contactoFirmante;

    @Column(name = "ip_firma", length = 45)
    private String ipFirma;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "validacion_certificado")
    private Boolean validacionCertificado;

    @Column(name = "motivo_invalidacion", length = 1000)
    private String motivoInvalidacion;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autorizado_por")
    private Usuario autorizadoPor;

    @Column(name = "fecha_autorizacion")
    private LocalDateTime fechaAutorizacion;

    @Column(name = "motivo_autorizacion", length = 1000)
    private String motivoAutorizacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_autorizacion", length = 50)
    private EstadoAutorizacion estadoAutorizacion;

    @Column(name = "documentos_adjuntos", columnDefinition = "JSON")
    private String documentosAdjuntos; 

    @Column(name = "hash_documentos_adjuntos", length = 500)
    private String hashDocumentosAdjuntos;

    @Column(name = "cantidad_documentos")
    private Integer cantidadDocumentos;
    @Column(name = "nivel_autorizacion_requerido")
    private Integer nivelAutorizacionRequerido; 

    @Column(name = "requiere_pin_adicional")
    private Boolean requierePinAdicional;

    @Column(name = "token_autorizacion", length = 255)
    private String tokenAutorizacion;

    @Column(name = "expira_en")
    private LocalDateTime expiraEn;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        if (estadoFirma == null) {
            estadoFirma = EstadoFirma.PENDIENTE;
        }
        if (estadoAutorizacion == null) {
            estadoAutorizacion = EstadoAutorizacion.PENDIENTE;
        }
        if (validacionCertificado == null) {
            validacionCertificado = false;
        }
        if (requierePinAdicional == null) {
            requierePinAdicional = false;
        }
        if (cantidadDocumentos == null) {
            cantidadDocumentos = 0;
        }
        if (nivelAutorizacionRequerido == null) {
            nivelAutorizacionRequerido = 2; 
        }
    }

    public enum TipoFirma {
        SIMPLE,
        AVANZADO,
        CUALIFICADO,
        CONFORMIDAD,
        OTRO
    }
    public enum EstadoFirma {
        PENDIENTE,
        FIRMADO,
        RECHAZADO,
        EXPIRADO,
        REVOCADO,
        INVALIDADO,
        ERROR,
        VERIFICANDO,
        VERIFICADO
    }

    public enum EstadoAutorizacion {
        PENDIENTE,           
        AUTORIZADO,          
        DENEGADO,           
        REVOCADO,            
        EXPIRADO,           
        NO_REQUERIDO        
    }

    public boolean esFirmaPendiente() {
        return EstadoFirma.PENDIENTE.equals(this.estadoFirma);
    }

    public boolean esFirmaValida() {
        return EstadoFirma.FIRMADO.equals(this.estadoFirma) ||
               EstadoFirma.VERIFICADO.equals(this.estadoFirma);
    }

    public boolean requiereVerificacion() {
        return EstadoFirma.FIRMADO.equals(this.estadoFirma) ||
               EstadoFirma.VERIFICANDO.equals(this.estadoFirma);
    }

    public String getNombreCompleto() {
        if (firmante != null) {
            return firmante.getNombre() + " " + firmante.getApellidos();
        }
        return "Firmante desconocido";
    }

    public String getDescripcionTipoFirma() {
        return switch (tipoFirma) {
            case SIMPLE -> "Firma Simple";
            case AVANZADO -> "Firma Electrónica Avanzada";
            case CUALIFICADO -> "Firma Electrónica Cualificada";
            case CONFORMIDAD -> "Firma de Conformidad";
            case OTRO -> "Otro Tipo de Firma";
        };
    }

    public String getDescripcionEstado() {
        return switch (estadoFirma) {
            case PENDIENTE -> "Pendiente de Firma";
            case FIRMADO -> "Documento Firmado";
            case RECHAZADO -> "Firma Rechazada";
            case EXPIRADO -> "Tiempo de Firma Expirado";
            case REVOCADO -> "Firma Revocada";
            case INVALIDADO -> "Firma Invalidada";
            case ERROR -> "Error en el Proceso";
            case VERIFICANDO -> "Verificando Firma";
            case VERIFICADO -> "Firma Verificada";
        };
    }

    public boolean requiereAutorizacion() {
        return !EstadoAutorizacion.NO_REQUERIDO.equals(this.estadoAutorizacion);
    }

    public boolean estaAutorizado() {
        return EstadoAutorizacion.AUTORIZADO.equals(this.estadoAutorizacion);
    }

    public boolean autorizacionPendiente() {
        return EstadoAutorizacion.PENDIENTE.equals(this.estadoAutorizacion);
    }

    public boolean autorizacionDenegada() {
        return EstadoAutorizacion.DENEGADO.equals(this.estadoAutorizacion);
    }

    public boolean autorizacionExpirada() {
        return EstadoAutorizacion.EXPIRADO.equals(this.estadoAutorizacion) ||
               (expiraEn != null && LocalDateTime.now().isAfter(expiraEn));
    }

    public String getDescripcionAutorizacion() {
        return switch (estadoAutorizacion) {
            case PENDIENTE -> "Esperando Autorización";
            case AUTORIZADO -> "Autorizado para Firmar";
            case DENEGADO -> "Autorización Denegada";
            case REVOCADO -> "Autorización Revocada";
            case EXPIRADO -> "Autorización Expirada";
            case NO_REQUERIDO -> "No Requiere Autorización";
        };
    }

    public String getNombreAutorizador() {
        if (autorizadoPor != null) {
            return autorizadoPor.getNombre() + " " + autorizadoPor.getApellidos();
        }
        return "Sin autorizar";
    }

    public boolean tieneDocumentosAdjuntos() {
        return cantidadDocumentos != null && cantidadDocumentos > 0;
    }

    public boolean puedeSerFirmada() {
        return esFirmaPendiente() &&
               (estaAutorizado() || !requiereAutorizacion()) &&
               !autorizacionExpirada();
    }

    public String getNivelAutorizacionTexto() {
        return switch (nivelAutorizacionRequerido) {
            case 1 -> "ADMINISTRADOR";
            case 2 -> "ADMINISTRATIVO";
            default -> "NO DEFINIDO";
        };
    }

}