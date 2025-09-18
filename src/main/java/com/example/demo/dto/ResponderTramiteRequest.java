package com.example.demo.dto;

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
}