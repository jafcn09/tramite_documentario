package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AreaResponse {
    
    private Long id;
    private String nombre;
    private String descripcion;
    private Boolean activa;
    private Integer usuariosCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}