package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleWithCountResponse {
    private Long id;
    private String name;
    private String description;
    private Long userCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}