package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String refreshToken;
    private String redirectUrl;
    private String role;
    private String message;
    private UsuarioResponse usuario;
    private Boolean changePasswordRequired;

    public LoginResponse(String token, String refreshToken, String redirectUrl, String role, UsuarioResponse usuario) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.redirectUrl = redirectUrl;
        this.role = role;
        this.usuario = usuario;
        this.message = "Login exitoso";
        this.changePasswordRequired = false;
    }

    public LoginResponse(String message) {
        this.message = message;
        this.changePasswordRequired = false;
    }
}