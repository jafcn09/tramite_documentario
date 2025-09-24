package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AreaJerarquicaDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String codigoOrganigrama;
    private Integer nivelJerarquico;
    private String rutaJerarquica;
    private Long areaPadreId;
    private String areaPadreNombre;
    private Boolean activa;
    private Integer totalUsuarios;
    private List<AreaJerarquicaDTO> subAreas;
    private Boolean expanded;
}