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
            System.out.println("UsuarioAreaController: Getting users for area ID: " + id);
            List<UsuarioResponse> users = usuarioService.getUsersByArea(id);
            System.out.println("UsuarioAreaController: Returning " + users.size() + " users");
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            System.err.println("UsuarioAreaController: Error getting area users: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}