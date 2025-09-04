package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AreaRequest {
    
    @NotBlank(message = "El nombre del área es obligatorio")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private String nombre;
    
    @Size(max = 500, message = "La descripción no puede tener más de 500 caracteres")
    private String descripcion;
    
    private Boolean activa = true;
}