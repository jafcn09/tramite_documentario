package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponse {
    
    private Long id;
    private String nombre;
    private String apellidos;
    private String correo;
    private String tipoDocumento;
    private String numDocumento;
    private String usuario;
    private String direccion;
    private String celular;
    private String foto;
    private RoleResponse role;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RoleResponse {
        private Long id;
        private String name;
        private String description;
    }
}