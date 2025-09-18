package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {
    private String type; // "user", "tramite", "system", "login", "area"
    private String icon;
    private String description;
    private LocalDateTime timestamp;
    private String userRole; // Para actividades relacionadas con usuarios
    private String status; // Para trámites
    private String action; // "created", "updated", "deleted", "login", "logout"
}