package com.example.demo.dto;

import com.example.demo.validation.ValidDocument;
import com.example.demo.validation.ValidEmail;
import com.example.demo.validation.ValidPhone;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUsuarioRequest {
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private String nombre;
    
    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 100, message = "Los apellidos no pueden tener más de 100 caracteres")
    private String apellidos;
    
    @NotBlank(message = "El correo es obligatorio")
    @ValidEmail
    @Size(max = 150, message = "El correo no puede tener más de 150 caracteres")
    private String correo;
    
    @NotBlank(message = "El tipo de documento es obligatorio")
    @Size(max = 20, message = "El tipo de documento no puede tener más de 20 caracteres")
    private String tipoDocumento;
    
    @NotBlank(message = "El número de documento es obligatorio")
    @ValidDocument
    @Size(max = 20, message = "El número de documento no puede tener más de 20 caracteres")
    private String numDocumento;
    
    @NotBlank(message = "La clave es obligatoria")
    @Size(min = 6, message = "La clave debe tener al menos 6 caracteres")
    private String clave;
    
    @NotBlank(message = "El usuario es obligatorio")
    @Size(max = 50, message = "El usuario no puede tener más de 50 caracteres")
    private String usuario;
    
    @Size(max = 200, message = "La dirección no puede tener más de 200 caracteres")
    private String direccion;
    
    @ValidPhone
    @Size(max = 20, message = "El celular no puede tener más de 20 caracteres")
    private String celular;
    
    private String foto;
    
    @NotNull(message = "El role ID es obligatorio")
    private Long roleId;
}