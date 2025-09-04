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
    private AreaInfo area;
    private boolean accountEnabled;
    private boolean accountLocked;
    private boolean mustChangePassword;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RoleResponse {
        private Long id;
        private String name;
        private String description;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AreaInfo {
        private Long id;
        private String nombre;
        private String descripcion;
        private Boolean activa;
    }
}