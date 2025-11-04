package com.example.demo.dto;

import lombok.Data;

@Data
public class AdminResetPasswordRequest {

    private String newPassword;

    private Boolean mustChangePassword = false;

    private String reason;
}