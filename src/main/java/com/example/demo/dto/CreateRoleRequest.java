package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateRoleRequest {
    
    @NotNull(message = "Role nombre es obligatorio")
    @Size(min = 2, max = 50, message = "Se Permite entre 2 y 50 caracteres")
    private String name;
    
    private String description;
}