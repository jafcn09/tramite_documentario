package com.example.demo.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateRoleRequest {
    
    @Size(min = 1, max = 50, message = "Nombre rol debe tener entre 1 y 50 caracteres")
    private String name;
    
    @Size(max = 100, message = "Descripcion rol no debe exceder 100 caracteres")
    private String description;
}