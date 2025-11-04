package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AutorizacionFirmaRequest {

    @NotNull(message = "El ID de la firma es obligatorio")
    private Long firmaId;

    @NotNull(message = "La decisión de autorización es obligatoria")
    private Boolean autorizar; // true = autorizar, false = denegar

    @NotBlank(message = "El motivo de la autorización es obligatorio")
    private String motivoAutorizacion;

    private LocalDateTime expiraEn; // Cuando expira la autorización

    private Boolean requierePinAdicional;

    private String observaciones;

    private String motivoDenegacion;

    private String motivoRevocacion;
}