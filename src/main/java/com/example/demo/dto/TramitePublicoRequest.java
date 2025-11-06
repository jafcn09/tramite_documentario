package com.example.demo.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class TramitePublicoRequest {

    private String tipoDocumento;
    private String numeroDocumento;
    private String nombres;
    private String apellidos;
    private String email;
    private String telefono;
    private String tipoTramite;
    private String asunto;
    private String descripcion;
    private String captchaToken;
    private String captchaCode;
    private List<MultipartFile> archivos;
}
