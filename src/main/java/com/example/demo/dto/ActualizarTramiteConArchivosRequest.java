package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarTramiteConArchivosRequest {

    private String titulo;
    private String asunto;  // Frontend envía 'asunto' además de 'titulo'
    private String descripcion;
    private String tipo;
    private Long tipoId;    // Frontend envía tipoId
    private String prioridad;
    private Long prioridadId;   // Frontend envía prioridadId
    private String observaciones;
    private LocalDateTime fechaVencimiento;
    private Long areaDestinoId;
    private List<DocumentoBase64Request> documentos;
    private List<Long> documentosAEliminar;
}