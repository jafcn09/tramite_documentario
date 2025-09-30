package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequest {

    // No se requiere contraseña actual porque el usuario ya está autenticado con JWT
    // El token JWT ya valida la identidad del usuario

    @NotBlank(message = "La nueva contraseña es obligatoria")
    @Size(min = 6, message = "La nueva contraseña debe tener al menos 6 caracteres")
    private String newPassword;

    @NotBlank(message = "La confirmación de contraseña es obligatoria")
    private String confirmPassword;
}