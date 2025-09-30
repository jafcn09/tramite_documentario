package com.example.demo.controller;

import com.example.demo.dto.AreaJerarquicaDTO;
import com.example.demo.service.OrganigramaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/organigrama")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrganigramaController {

    private final OrganigramaService organigramaService;

    @GetMapping("/completo")
    public ResponseEntity<List<AreaJerarquicaDTO>> obtenerOrganigramaCompleto() {
        try {
            log.info("Obteniendo organigrama completo");
            List<AreaJerarquicaDTO> organigrama = organigramaService.obtenerOrganigramaCompleto();
            log.info("Organigrama obtenido exitosamente con {} áreas raíz", organigrama.size());
            return ResponseEntity.ok(organigrama);
        } catch (Exception e) {
            log.error("Error al obtener organigrama completo", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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