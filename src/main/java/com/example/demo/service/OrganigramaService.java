package com.example.demo.service;

import com.example.demo.dto.AreaJerarquicaDTO;
import com.example.demo.entity.Area;
import com.example.demo.repository.AreaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrganigramaService {

    private final AreaRepository areaRepository;

    public List<AreaJerarquicaDTO> obtenerOrganigramaCompleto() {
        try {
            log.info("Buscando áreas raíz activas");
            List<Area> areasRaiz = areaRepository.findAreasRaizActivas();
            log.info("Se encontraron {} áreas raíz", areasRaiz.size());

            List<AreaJerarquicaDTO> resultado = areasRaiz.stream()
                    .map(this::convertirAAreaJerarquica)
                    .collect(Collectors.toList());

            log.info("Conversión a DTO completada exitosamente");
            return resultado;
        } catch (Exception e) {
            log.error("Error en obtenerOrganigramaCompleto", e);
            throw new RuntimeException("Error al obtener organigrama completo: " + e.getMessage(), e);
        }
    }

    public List<AreaJerarquicaDTO> obtenerAreasPlanas() {
        List<Area> todasLasAreas = areaRepository.findActiveAreasOrderByNombre();
        return todasLasAreas.stream()
                .map(this::convertirAAreaJerarquicaSimple)
                .collect(Collectors.toList());
    }

    public AreaJerarquicaDTO obtenerSubAreas(Long areaId) {
        Area area = areaRepository.findById(areaId)
                .orElseThrow(() -> new RuntimeException("Área no encontrada"));
        return convertirAAreaJerarquica(area);
    }

    @Transactional
    public void inicializarEstructuraUniversidad() {
        if (areaRepository.count() > 0) return;

        Area consejoUniversitario = crearArea("Consejo Universitario", "CU", 1, null, "Máximo órgano de gobierno universitario");
        Area rectorado = crearArea("Rectorado", "REC", 2, consejoUniversitario, "Autoridad ejecutiva de la universidad");

        Area vicerrectoradoAcademico = crearArea("Vicerrectorado Académico", "VAC", 3, rectorado, "Gestión académica institucional");
        Area vicerrectoradoInvestigacion = crearArea("Vicerrectorado de Investigación", "VIN", 3, rectorado, "Gestión de investigación y posgrado");
        Area secretariaGeneral = crearArea("Secretaría General", "SG", 3, rectorado, "Secretaría institucional");
        Area oficinaGeneralAdmin = crearArea("Oficina General de Administración", "OGA", 3, rectorado, "Gestión administrativa");

        crearArea("Oficina de Planificación", "OPL", 4, rectorado, "Planificación estratégica");
        crearArea("Oficina de Control Institucional", "OCI", 4, rectorado, "Control interno");
        crearArea("Oficina de Asesoría Jurídica", "OAJ", 4, rectorado, "Asesoría legal");

        crearArea("Dirección de Servicios Académicos", "DSA", 4, vicerrectoradoAcademico, "Servicios académicos");
        crearArea("Dirección de Evaluación Académica", "DEA", 4, vicerrectoradoAcademico, "Evaluación académica");

        crearArea("Instituto de Investigación", "II", 4, vicerrectoradoInvestigacion, "Investigación institucional");
        crearArea("Escuela de Posgrado", "EPG", 4, vicerrectoradoInvestigacion, "Estudios de posgrado");

        crearArea("Oficina de Recursos Humanos", "RH", 4, oficinaGeneralAdmin, "Gestión del personal");
        crearArea("Oficina de Logística", "LOG", 4, oficinaGeneralAdmin, "Logística y compras");
        crearArea("Oficina de Tesorería", "TES", 4, oficinaGeneralAdmin, "Gestión financiera");
        crearArea("Oficina de Contabilidad", "CON", 4, oficinaGeneralAdmin, "Contabilidad");

        crearFacultades();
    }

    private void crearFacultades() {
        Area rectorado = areaRepository.findByCodigoOrganigrama("REC").orElse(null);
        if (rectorado == null) return;

        Area facCienciasSalud = crearArea("Facultad de Ciencias de la Salud", "FCS", 4, rectorado, "Ciencias de la salud");
        Area facCienciasEconomicas = crearArea("Facultad de Ciencias Económicas", "FCE", 4, rectorado, "Ciencias económicas");
        Area facIngenieria = crearArea("Facultad de Ingeniería", "FI", 4, rectorado, "Ingeniería");
        Area facCienciasAgropecuarias = crearArea("Facultad de Ciencias Agropecuarias", "FCA", 4, rectorado, "Ciencias agropecuarias");
        Area facDerecho = crearArea("Facultad de Derecho y Ciencia Política", "FD", 4, rectorado, "Derecho y ciencia política");

        crearArea("Escuela de Medicina Humana", "EMH", 5, facCienciasSalud, "Medicina humana");
        crearArea("Escuela de Enfermería", "ENF", 5, facCienciasSalud, "Enfermería");
        crearArea("Escuela de Obstetricia", "OBS", 5, facCienciasSalud, "Obstetricia");

        crearArea("Escuela de Administración", "ADM", 5, facCienciasEconomicas, "Administración");
        crearArea("Escuela de Contabilidad", "CONT", 5, facCienciasEconomicas, "Contabilidad");
        crearArea("Escuela de Economía", "ECO", 5, facCienciasEconomicas, "Economía");

        crearArea("Escuela de Ingeniería de Sistemas", "IS", 5, facIngenieria, "Ingeniería de sistemas");
        crearArea("Escuela de Ingeniería Pesquera", "IP", 5, facIngenieria, "Ingeniería pesquera");
        crearArea("Escuela de Ingeniería Forestal", "IF", 5, facIngenieria, "Ingeniería forestal");

        crearArea("Escuela de Agronomía", "AGR", 5, facCienciasAgropecuarias, "Agronomía");
        crearArea("Escuela de Medicina Veterinaria", "MV", 5, facCienciasAgropecuarias, "Medicina veterinaria");
        crearArea("Escuela de Acuicultura", "ACU", 5, facCienciasAgropecuarias, "Acuicultura");

        crearArea("Escuela de Derecho", "DER", 5, facDerecho, "Derecho");
    }

    private Area crearArea(String nombre, String codigo, int nivel, Area padre, String descripcion) {
        Area area = new Area();
        area.setNombre(nombre);
        area.setDescripcion(descripcion);
        area.setCodigoOrganigrama(codigo);
        area.setNivelJerarquico(nivel);
        area.setAreaPadre(padre);
        area.setActiva(true);

        if (padre != null) {
            area.setRutaJerarquica(padre.getRutaJerarquica() + " > " + nombre);
        } else {
            area.setRutaJerarquica(nombre);
        }

        return areaRepository.save(area);
    }

    private AreaJerarquicaDTO convertirAAreaJerarquica(Area area) {
        // Contar usuarios de manera segura sin cargar la colección completa
        int totalUsuarios = 0;
        try {
            if (area.getUsuarios() != null) {
                totalUsuarios = area.getUsuarios().size();
            }
        } catch (Exception e) {
            // Si hay problema con lazy loading, dejamos en 0
            totalUsuarios = 0;
        }

        // Obtener el nombre del área padre de manera segura
        Long areaPadreId = null;
        String areaPadreNombre = null;
        try {
            if (area.getAreaPadre() != null) {
                areaPadreId = area.getAreaPadre().getId();
                areaPadreNombre = area.getAreaPadre().getNombre();
            }
        } catch (Exception e) {
            // Si hay problema con lazy loading del padre, dejamos null
        }

        // Cargar subáreas activas
        List<Area> subAreas = areaRepository.findSubAreasActivas(area);

        return AreaJerarquicaDTO.builder()
                .id(area.getId())
                .nombre(area.getNombre())
                .descripcion(area.getDescripcion())
                .codigoOrganigrama(area.getCodigoOrganigrama())
                .nivelJerarquico(area.getNivelJerarquico())
                .rutaJerarquica(area.getRutaJerarquica())
                .areaPadreId(areaPadreId)
                .areaPadreNombre(areaPadreNombre)
                .activa(area.getActiva())
                .totalUsuarios(totalUsuarios)
                .subAreas(subAreas.stream().map(this::convertirAAreaJerarquica).collect(Collectors.toList()))
                .expanded(false)
                .build();
    }

    private AreaJerarquicaDTO convertirAAreaJerarquicaSimple(Area area) {
        // Contar usuarios de manera segura sin cargar la colección completa
        int totalUsuarios = 0;
        try {
            if (area.getUsuarios() != null) {
                totalUsuarios = area.getUsuarios().size();
            }
        } catch (Exception e) {
            // Si hay problema con lazy loading, dejamos en 0
            totalUsuarios = 0;
        }

        return AreaJerarquicaDTO.builder()
                .id(area.getId())
                .nombre(area.getNombre())
                .descripcion(area.getDescripcion())
                .codigoOrganigrama(area.getCodigoOrganigrama())
                .nivelJerarquico(area.getNivelJerarquico())
                .rutaJerarquica(area.getRutaJerarquica())
                .areaPadreId(area.getAreaPadre() != null ? area.getAreaPadre().getId() : null)
                .areaPadreNombre(area.getAreaPadre() != null ? area.getAreaPadre().getNombre() : null)
                .activa(area.getActiva())
                .totalUsuarios(totalUsuarios)
                .expanded(false)
                .build();
    }
}