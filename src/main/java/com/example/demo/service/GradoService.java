package com.example.demo.service;

import com.example.demo.dto.GradoRequest;
import com.example.demo.dto.GradoResponse;
import com.example.demo.entity.Grado;
import com.example.demo.repository.GradoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GradoService {

    private final GradoRepository gradoRepository;

    public List<GradoResponse> buscarPorDni(String dni) {
        return gradoRepository.findByDni(dni.trim())
                .stream()
                .map(GradoResponse::fromEntity)
                .toList();
    }

    public GradoResponse buscarPorCodigoDiploma(String codigo) {
        return gradoRepository.findByCodigoDiploma(codigo.trim())
                .map(GradoResponse::fromEntity)
                .orElse(null);
    }

    public List<GradoResponse> buscarPorCodigoOResolucion(String codigo) {
        return gradoRepository.findByCodigoDiplomaOrResolucionContaining(codigo.trim())
                .stream()
                .map(GradoResponse::fromEntity)
                .toList();
    }

    public List<GradoResponse> buscarPorNombre(String nombre) {
        return gradoRepository.findByAlumnoContainingIgnoreCase(nombre.trim())
                .stream()
                .map(GradoResponse::fromEntity)
                .toList();
    }

    public List<GradoResponse> buscarPorFacultad(String facultad) {
        return gradoRepository.findByFacultad(facultad)
                .stream()
                .map(GradoResponse::fromEntity)
                .toList();
    }

    public List<GradoResponse> buscarPorGradoAcademico(String grado) {
        return gradoRepository.findByGradoAcademico(grado)
                .stream()
                .map(GradoResponse::fromEntity)
                .toList();
    }

    public List<String> listarFacultades() {
        return gradoRepository.findAllFacultades();
    }

    public List<String> listarGradosAcademicos() {
        return gradoRepository.findAllGradosAcademicos();
    }

    public long contarTotal() {
        return gradoRepository.count();
    }

    public long contarPorFacultad(String facultad) {
        return gradoRepository.countByFacultad(facultad);
    }


    @Transactional
public Grado guardar(GradoRequest request) {
    Grado grado = Grado.builder()
            .numeroRegistro(request.getNumeroRegistro())
            .numeroLibro(request.getNumeroLibro())
            .alumno(request.getAlumno())
            .dni(request.getDni())
            .facultad(request.getFacultad())
            .programaAcademico(request.getProgramaAcademico())
            .numeroInscripcion(request.getNumeroInscripcion())
            .resolucion(request.getResolucion())
            .fechaSesionResolucion(request.getFechaSesionResolucion())
            .codigoDiploma(request.getCodigoDiploma())
            .especialidad(request.getEspecialidad())
            .gradoAcademico(request.getGradoAcademico())
            .fechaExpedicionGrado(request.getFechaExpedicionGrado())
            .fechaExpedicionDiploma(request.getFechaExpedicionDiploma())
            .rector(request.getRector())
            .coordinadorAcademico(request.getCoordinadorAcademico())
            .secretarioGeneral(request.getSecretarioGeneral())
            .condicion(request.getCondicion())
            .build();

    return gradoRepository.save(grado);
}

    @Transactional
    public GradoResponse actualizar(Long id, GradoRequest request) {
        Grado grado = gradoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grado no encontrado"));

        grado.setNumeroRegistro(request.getNumeroRegistro());
        grado.setNumeroLibro(request.getNumeroLibro());
        grado.setAlumno(request.getAlumno());
        grado.setDni(request.getDni());
        grado.setFacultad(request.getFacultad());
        grado.setProgramaAcademico(request.getProgramaAcademico());
        grado.setNumeroInscripcion(request.getNumeroInscripcion());
        grado.setResolucion(request.getResolucion());
        grado.setFechaSesionResolucion(request.getFechaSesionResolucion());
        grado.setCodigoDiploma(request.getCodigoDiploma());
        grado.setEspecialidad(request.getEspecialidad());
        grado.setGradoAcademico(request.getGradoAcademico());
        grado.setFechaExpedicionGrado(request.getFechaExpedicionGrado());
        grado.setFechaExpedicionDiploma(request.getFechaExpedicionDiploma());
        grado.setRector(request.getRector());
        grado.setCoordinadorAcademico(request.getCoordinadorAcademico());
        grado.setSecretarioGeneral(request.getSecretarioGeneral());
        grado.setCondicion(request.getCondicion());

        Grado updatedGrado = gradoRepository.save(grado);
        return GradoResponse.fromEntity(updatedGrado);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!gradoRepository.existsById(id)) {
            throw new RuntimeException("Grado no encontrado");
        }
        gradoRepository.deleteById(id);
    }

    public GradoResponse buscarPorId(Long id) {
        return gradoRepository.findById(id)
                .map(GradoResponse::fromEntity)
                .orElse(null);
    }

    public Page<GradoResponse> listarTodosPaginado(Pageable pageable) {
        return gradoRepository.findAll(pageable)
                .map(GradoResponse::fromEntity);
    }

    public Page<GradoResponse> listarTodosPaginadoConFiltros(Pageable pageable, String facultad, String gradoAcademico, String busqueda) {
        // Si no hay filtros, retornar todos
        if ((facultad == null || facultad.isBlank()) &&
            (gradoAcademico == null || gradoAcademico.isBlank()) &&
            (busqueda == null || busqueda.isBlank())) {
            return listarTodosPaginado(pageable);
        }

        // Aplicar filtros manualmente
        List<Grado> todosList = gradoRepository.findAll();

        // Filtrar por facultad
        if (facultad != null && !facultad.isBlank() && !facultad.equals("TODAS")) {
            todosList = todosList.stream()
                    .filter(g -> g.getFacultad().equals(facultad))
                    .toList();
        }

        // Filtrar por grado académico
        if (gradoAcademico != null && !gradoAcademico.isBlank() && !gradoAcademico.equals("TODOS")) {
            todosList = todosList.stream()
                    .filter(g -> g.getGradoAcademico().equals(gradoAcademico))
                    .toList();
        }

        // Filtrar por búsqueda general
        if (busqueda != null && !busqueda.isBlank()) {
            String busquedaLower = busqueda.toLowerCase();
            todosList = todosList.stream()
                    .filter(g ->
                        g.getAlumno().toLowerCase().contains(busquedaLower) ||
                        g.getDni().contains(busqueda) ||
                        g.getCodigoDiploma().toLowerCase().contains(busquedaLower) ||
                        (g.getNumeroRegistro() != null && g.getNumeroRegistro().contains(busqueda))
                    )
                    .toList();
        }

        // Convertir a Page
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), todosList.size());
        List<GradoResponse> pageContent = todosList.subList(start, end).stream()
                .map(GradoResponse::fromEntity)
                .toList();

        return new org.springframework.data.domain.PageImpl<>(pageContent, pageable, todosList.size());
    }

    public List<GradoResponse> listarTodos() {
        return gradoRepository.findAll().stream()
                .map(GradoResponse::fromEntity)
                .toList();
    }
}