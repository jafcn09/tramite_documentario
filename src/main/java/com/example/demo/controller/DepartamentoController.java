package com.example.demo.controller;

import com.example.demo.enums.DepartamentoPeru;
import com.example.demo.model.FirmaDigital;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/departamentos")
@CrossOrigin(origins = "*")
public class DepartamentoController {

    @GetMapping
    public ResponseEntity<List<Map<String, String>>> obtenerDepartamentos() {
        List<Map<String, String>> departamentos = Arrays.stream(DepartamentoPeru.values())
            .map(dept -> Map.of(
                "codigo", dept.name(),
                "nombre", dept.getNombre(),
                "codigoCorto", dept.getCodigo(),
                "ubigeo", dept.getUbigeo()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(departamentos);
    }

    @GetMapping("/nombres")
    public ResponseEntity<List<String>> obtenerNombresDepartamentos() {
        List<String> nombres = Arrays.stream(DepartamentoPeru.values())
            .map(DepartamentoPeru::getNombre)
            .collect(Collectors.toList());

        return ResponseEntity.ok(nombres);
    }

    @GetMapping("/codigos")
    public ResponseEntity<List<String>> obtenerCodigosDepartamentos() {
        List<String> codigos = Arrays.stream(DepartamentoPeru.values())
            .map(DepartamentoPeru::name)
            .collect(Collectors.toList());

        return ResponseEntity.ok(codigos);
    }

    @GetMapping("/tipos-firma")
    public ResponseEntity<List<Map<String, String>>> obtenerTiposFirma() {
        List<Map<String, String>> tiposFirma = Arrays.stream(FirmaDigital.TipoFirma.values())
            .map(tipo -> Map.of(
                "codigo", tipo.name(),
                "descripcion", tipo.name().replace("_", " ").toLowerCase()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(tiposFirma);
    }
}