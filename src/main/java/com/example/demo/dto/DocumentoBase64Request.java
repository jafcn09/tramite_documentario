package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentoBase64Request {

    private String nombre;
    private String tipo;
    private Long tamano;
    private String contenido; // Base64 encoded content
    private String descripcion;
}