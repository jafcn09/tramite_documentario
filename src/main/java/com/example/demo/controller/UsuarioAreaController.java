package com.example.demo.controller;

import com.example.demo.dto.UsuarioResponse;
import com.example.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario-area")
@CrossOrigin(origins = "*")
public class UsuarioAreaController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/area/{id}/users")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<List<UsuarioResponse>> getUsersByArea(@PathVariable Long id) {
        try {
            List<UsuarioResponse> users = usuarioService.getUsersByArea(id);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<List<UsuarioResponse>> getAllUsuarios() {
        try {
            List<UsuarioResponse> users = usuarioService.findAllUsuarios();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}