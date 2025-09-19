package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteCompletoDTO {
    private ResumenGeneralDTO resumenGeneral;
    private List<TramitePorTipoDTO> tramitesPorTipo;
    private List<TramiteUrgenteDTO> tramitesUrgentes;
    private List<TramitePorAreaDTO> tramitesPorArea;
    private List<TramitePorUsuarioDTO> tramitesPorUsuario;
    private LocalDateTime fechaGeneracion;
    private LocalDate periodoInicio;
    private LocalDate periodoFin;
}