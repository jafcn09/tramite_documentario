package com.example.demo.repository;

import com.example.demo.entity.Grado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradoRepository extends JpaRepository<Grado, Long> {

    List<Grado> findByDni(String dni);

    Optional<Grado> findByCodigoDiploma(String codigoDiploma);

    List<Grado> findByAlumnoContainingIgnoreCase(String alumno);

    List<Grado> findByFacultad(String facultad);

    List<Grado> findByGradoAcademico(String gradoAcademico);

    @Query("SELECT g FROM Grado g WHERE g.dni = :dni AND g.gradoAcademico = :grado")
    List<Grado> findByDniAndGrado(@Param("dni") String dni, @Param("grado") String grado);

    @Query("SELECT DISTINCT g.facultad FROM Grado g WHERE g.facultad IS NOT NULL")
    List<String> findAllFacultades();

    @Query("SELECT DISTINCT g.gradoAcademico FROM Grado g WHERE g.gradoAcademico IS NOT NULL")
    List<String> findAllGradosAcademicos();

    @Query("SELECT COUNT(g) FROM Grado g WHERE g.facultad = :facultad")
    long countByFacultad(@Param("facultad") String facultad);

    @Query("SELECT g FROM Grado g WHERE UPPER(g.codigoDiploma) LIKE UPPER(CONCAT('%', :codigo, '%')) OR UPPER(g.resolucion) LIKE UPPER(CONCAT('%', :codigo, '%'))")
    List<Grado> findByCodigoDiplomaOrResolucionContaining(@Param("codigo") String codigo);
}