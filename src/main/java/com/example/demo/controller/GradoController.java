package com.example.demo.controller;

import com.example.demo.dto.GradoRequest;
import com.example.demo.dto.GradoResponse;
import com.example.demo.dto.HistorialBusquedaResponse;
import com.example.demo.entity.Grado;
import com.example.demo.service.GradoService;
import com.example.demo.service.HistorialBusquedaService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private final HistorialBusquedaService historialService;

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

    

    @GetMapping("/admin/listartodos")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<Page<GradoResponse>> listarTodosPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction,
            @RequestParam(required = false) String facultad,
            @RequestParam(required = false) String gradoAcademico,
            @RequestParam(required = false) String busqueda) {

        Sort sort = direction.equalsIgnoreCase("ASC") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return ResponseEntity.ok(gradoService.listarTodosPaginadoConFiltros(pageable, facultad, gradoAcademico, busqueda));
    }

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<GradoResponse> obtenerPorId(@PathVariable Long id) {
        GradoResponse grado = gradoService.buscarPorId(id);
        if (grado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(grado);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<GradoResponse> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody GradoRequest request) {
        GradoResponse grado = gradoService.actualizar(id, request);
        return ResponseEntity.ok(grado);
    }

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Long id) {
        gradoService.eliminar(id);
        return ResponseEntity.ok(Map.of("message", "Grado eliminado exitosamente"));
    }


    @GetMapping("/historial/usuario/{usuarioId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<HistorialBusquedaResponse>> obtenerHistorialUsuario(
            @PathVariable Long usuarioId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(historialService.obtenerHistorialUsuario(usuarioId, pageable));
    }

    @GetMapping("/historial/usuario/{usuarioId}/ultimas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<HistorialBusquedaResponse>> obtenerUltimasBusquedas(
            @PathVariable Long usuarioId,
            @RequestParam(defaultValue = "10") int limit) {

        return ResponseEntity.ok(historialService.obtenerUltimasBusquedasUsuario(usuarioId, limit));
    }

    @GetMapping("/historial/estadisticas")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticasHistorial() {
        return ResponseEntity.ok(historialService.obtenerEstadisticas());
    }

    @GetMapping("/historial/mas-buscados")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<List<Map<String, Object>>> obtenerTerminosMasBuscados(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(historialService.obtenerTerminosMasBuscados(limit));
    }

    @GetMapping("/historial/por-tipo")
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'GRADOS')")
    public ResponseEntity<List<Map<String, Object>>> obtenerBusquedasPorTipo() {
        return ResponseEntity.ok(historialService.obtenerBusquedasPorTipo());
    }
}