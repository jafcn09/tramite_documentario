package com.example.demo.dto;

import com.example.demo.enums.DepartamentoPeru;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TramiteRequest {

    private String titulo;
    private String asunto;
    private String descripcion;
    private String tipo;
    private String prioridad;
    private String numeroExpediente;
    private String observaciones;
    private Long areaOrigenId;
    private Long areaDestinoId;
    private Long usuarioAsignadoId;
    private String documentosAdjuntos;
    private Long nuevoResponsableId;
    private String motivoDerivacion;
    private String nuevoEstado;
    private LocalDateTime fechaVencimiento;
    private String correoReceptor;
    @Builder.Default
    private Boolean requiereFirmaDigital = false;
    private Long firmanteId;
    private String tipoFirma;
    private String razonFirma;
    private DepartamentoPeru ubicacionFirma;
    @Builder.Default
    private Boolean consentimientoFirma = false;
    private String firmaDigitalData;
}