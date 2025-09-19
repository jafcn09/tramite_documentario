package com.example.demo.controller;

import com.example.demo.dto.AreaJerarquicaDTO;
import com.example.demo.service.OrganigramaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organigrama")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrganigramaController {

    private final OrganigramaService organigramaService;

    @GetMapping("/completo")
    public ResponseEntity<List<AreaJerarquicaDTO>> obtenerOrganigramaCompleto() {
        return ResponseEntity.ok(organigramaService.obtenerOrganigramaCompleto());
    }

    @GetMapping("/areas-planas")
    public ResponseEntity<List<AreaJerarquicaDTO>> obtenerAreasPlanas() {
        return ResponseEntity.ok(organigramaService.obtenerAreasPlanas());
    }

    @GetMapping("/sub-areas/{areaId}")
    public ResponseEntity<AreaJerarquicaDTO> obtenerSubAreas(@PathVariable Long areaId) {
        return ResponseEntity.ok(organigramaService.obtenerSubAreas(areaId));
    }

    @PostMapping("/inicializar")
    public ResponseEntity<String> inicializarEstructura() {
        organigramaService.inicializarEstructuraUniversidad();
        return ResponseEntity.ok("Estructura organizacional inicializada correctamente");
    }
}