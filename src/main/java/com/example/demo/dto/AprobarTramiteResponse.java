package com.example.demo.dto;

import lombok.Data;

@Data
public class AprobarTramiteResponse {
    private boolean success;
    private String mensaje;
    private ResponsableAsignado responsableAsignado;
    private TramiteResponse tramiteActualizado;

    @Data
    public static class ResponsableAsignado {
        private Long id;
        private String nombre;
        private String apellidos;
        private String area;
    }
}