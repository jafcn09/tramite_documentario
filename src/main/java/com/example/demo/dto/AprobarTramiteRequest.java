package com.example.demo.dto;

import lombok.Data;

@Data
public class AprobarTramiteRequest {
    private Long tramiteId;
    private String observaciones;
    private Long responsableAsignadoId;
}