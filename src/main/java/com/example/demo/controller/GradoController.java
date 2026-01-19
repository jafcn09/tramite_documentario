package com.example.demo.controller;

import com.example.demo.dto.GradoRequest;
import com.example.demo.dto.GradoResponse;
import com.example.demo.entity.Grado;
import com.example.demo.service.GradoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grados")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GradoController {

    private final GradoService gradoService;

    @GetMapping("/consulta")
    public ResponseEntity<?> consultar(
            @RequestParam(required = false) String dni,
            @RequestParam(required = false) String codigo,
            @RequestParam(required = false) String nombre) {

        if (dni != null && !dni.isBlank()) {
            List<GradoResponse> grados = gradoService.buscarPorDni(dni);
            if (grados.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "encontrado", false,
                    "mensaje", "No se encontraron grados para el DNI: " + dni
                ));
            }
            return ResponseEntity.ok(Map.of(
                "encontrado", true,
                "cantidad", grados.size(),
                "grados", grados
            ));
        }

        if (codigo != null && !codigo.isBlank()) {
            List<GradoResponse> grados = gradoService.buscarPorCodigoOResolucion(codigo);
            if (grados.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "encontrado", false,
                    "mensaje", "No se encontraron diplomas o resoluciones con: " + codigo
                ));
            }
            return ResponseEntity.ok(Map.of(
                "encontrado", true,
                "cantidad", grados.size(),
                "grados", grados
            ));
        }

        if (nombre != null && !nombre.isBlank()) {
            List<GradoResponse> grados = gradoService.buscarPorNombre(nombre);
            if (grados.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "encontrado", false,
                    "mensaje", "No se encontraron grados para: " + nombre
                ));
            }
            return ResponseEntity.ok(Map.of(
                "encontrado", true,
                "cantidad", grados.size(),
                "grados", grados
            ));
        }

        return ResponseEntity.badRequest().body(Map.of(
            "error", "Debe proporcionar dni, codigo o nombre"
        ));
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<List<GradoResponse>> buscarPorDni(@PathVariable String dni) {
        return ResponseEntity.ok(gradoService.buscarPorDni(dni));
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<GradoResponse> buscarPorCodigo(@PathVariable String codigo) {
        GradoResponse grado = gradoService.buscarPorCodigoDiploma(codigo);
        if (grado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(grado);
    }

    @GetMapping("/facultades")
    public ResponseEntity<List<String>> listarFacultades() {
        return ResponseEntity.ok(gradoService.listarFacultades());
    }

    @GetMapping("/tipos")
    public ResponseEntity<List<String>> listarTipos() {
        return ResponseEntity.ok(gradoService.listarGradosAcademicos());
    }

    @GetMapping("/estadisticas")
    public ResponseEntity<Map<String, Object>> estadisticas() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", gradoService.contarTotal());
        stats.put("facultades", gradoService.listarFacultades());
        stats.put("tipos", gradoService.listarGradosAcademicos());
        return ResponseEntity.ok(stats);
    }

      @PostMapping("/sync")
    public ResponseEntity<?> sync(@RequestBody GradoRequest request) {
        Grado grado = gradoService.guardar(request);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "id", grado.getId()
        ));
    }
}