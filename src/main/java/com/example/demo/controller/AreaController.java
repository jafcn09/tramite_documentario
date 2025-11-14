package com.example.demo.controller;

import com.example.demo.dto.AreaRequest;
import com.example.demo.dto.AreaResponse;
import com.example.demo.service.AreaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/areas")
@CrossOrigin(origins = "*")
public class AreaController {
    
    @Autowired
    private AreaService areaService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<List<AreaResponse>> getAllAreas() {
        try {
            List<AreaResponse> areas = areaService.getAllAreas();
            return ResponseEntity.ok(areas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/active")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO') or hasRole('USUARIO')")
    public ResponseEntity<List<AreaResponse>> getActiveAreas() {
        try {
            List<AreaResponse> areas = areaService.getActiveAreas();
            return ResponseEntity.ok(areas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<AreaResponse> getAreaById(@PathVariable("id") Long areaId) {
        try {
            return areaService.getAreaById(areaId)
                    .map(area -> ResponseEntity.ok(area))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<?> createArea(@Valid @RequestBody AreaRequest request) {
        try {
            AreaResponse area = areaService.createArea(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(area);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al crear área: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<?> updateArea(@PathVariable("id") Long areaId, @Valid @RequestBody AreaRequest request) {
        try {
            AreaResponse area = areaService.updateArea(areaId, request);
            return ResponseEntity.ok(area);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar área: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteArea(@PathVariable("id") Long areaId) {
        try {
            areaService.deleteArea(areaId);
            return ResponseEntity.ok(Map.of("message", "Área eliminada correctamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar área: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<?> toggleAreaStatus(@PathVariable("id") Long areaId) {
        try {
            AreaResponse area = areaService.toggleAreaStatus(areaId);
            return ResponseEntity.ok(area);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al cambiar estado del área: " + e.getMessage()));
        }
    }
    
}