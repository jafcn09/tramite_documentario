package com.example.demo.dto;

import com.example.demo.enums.DepartamentoPeru;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ResponderTramiteRequest {
    private String respuesta;
    private String observaciones;
    private List<MultipartFile> archivosRespuesta;
    private boolean notificarPorEmail = true;
    private String asunto;

 
    private Boolean requiereFirmaDigital = false;
    private String tipoFirma;
    private String razonFirma;
    private DepartamentoPeru ubicacionFirma;
    private Boolean consentimientoFirma = false;
    private MultipartFile firmaDigitalArchivo;
}