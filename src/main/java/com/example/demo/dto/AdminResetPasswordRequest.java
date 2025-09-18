package com.example.demo.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AdminResetPasswordRequest {
    
    @Size(min = 6, max = 50, message = "La nueva contraseña debe tener entre 6 y 50 caracteres")
    private String newPassword;
    
    private Boolean mustChangePassword = false;
    
    private String reason;
}