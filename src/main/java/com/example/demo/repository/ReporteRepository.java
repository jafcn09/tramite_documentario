package com.example.demo.repository;

import com.example.demo.entity.Reporte;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {

    List<Reporte> findByEstado(String estado);

    Page<Reporte> findByEstado(String estado, Pageable pageable);

    @Query("SELECT r FROM Reporte r WHERE r.grado.id = :gradoId ORDER BY r.fechaCreacion DESC")
    List<Reporte> findByGradoId(@Param("gradoId") Long gradoId);

    @Query("SELECT COUNT(r) FROM Reporte r WHERE r.estado = :estado")
    long countByEstado(@Param("estado") String estado);

    @Query("SELECT r.tipoError, COUNT(r) FROM Reporte r GROUP BY r.tipoError")
    List<Object[]> countByTipoError();
}