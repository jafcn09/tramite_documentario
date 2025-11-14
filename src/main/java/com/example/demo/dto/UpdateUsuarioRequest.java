package com.example.demo.dto;

import com.example.demo.validation.ValidDocument;
import com.example.demo.validation.ValidEmail;
import com.example.demo.validation.ValidPhone;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUsuarioRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 100, message = "Los apellidos no pueden tener más de 100 caracteres")
    private String apellidos;

    @NotBlank(message = "El tipo de documento es obligatorio")
    @Size(max = 20, message = "El tipo de documento no puede tener más de 20 caracteres")
    private String tipoDocumento;

    @NotBlank(message = "El número de documento es obligatorio")
    @ValidDocument
    @Size(max = 20, message = "El número de documento no puede tener más de 20 caracteres")
    private String numDocumento;

    @ValidEmail
    @Size(max = 150, message = "El correo no puede tener más de 150 caracteres")
    private String correo;

    @Size(max = 200, message = "La dirección no puede tener más de 200 caracteres")
    private String direccion;

    @ValidPhone
    @Size(max = 20, message = "El celular no puede tener más de 20 caracteres")
    private String celular;

    @Size(min = 6, message = "La clave debe tener al menos 6 caracteres")
    private String clave;

    private String foto;
}