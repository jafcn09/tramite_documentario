package com.example.demo.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUsuarioRequest {
    
    // Temporarily remove custom validations for debugging
    // @ValidEmail
    @Size(max = 150, message = "El correo no puede tener más de 150 caracteres")
    private String correo;
    
    @Size(max = 200, message = "La dirección no puede tener más de 200 caracteres")
    private String direccion;
    
    // @ValidPhone
    @Size(max = 20, message = "El celular no puede tener más de 20 caracteres")
    private String celular;
    
    @Size(min = 6, message = "La clave debe tener al menos 6 caracteres")
    private String clave;
    
    private String foto;
    
    private Long areaId;
}