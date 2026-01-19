package com.example.demo.service;

import com.example.demo.dto.GradoRequest;
import com.example.demo.dto.GradoResponse;
import com.example.demo.entity.Grado;
import com.example.demo.repository.GradoRepository;

import lombok.RequiredArgsConstructor;
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
}