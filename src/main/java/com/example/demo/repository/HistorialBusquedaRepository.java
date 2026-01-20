package com.example.demo.repository;

import com.example.demo.entity.HistorialBusqueda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HistorialBusquedaRepository extends JpaRepository<HistorialBusqueda, Long> {

    @Query("SELECT h FROM HistorialBusqueda h WHERE h.usuario.id = :usuarioId ORDER BY h.fechaBusqueda DESC")
    Page<HistorialBusqueda> findByUsuarioId(@Param("usuarioId") Long usuarioId, Pageable pageable);

    @Query("SELECT h FROM HistorialBusqueda h WHERE h.usuario.id = :usuarioId ORDER BY h.fechaBusqueda DESC")
    List<HistorialBusqueda> findByUsuarioIdLimit(@Param("usuarioId") Long usuarioId, Pageable pageable);

    @Query("SELECT COUNT(h) FROM HistorialBusqueda h WHERE h.fechaBusqueda >= :desde")
    long countBusquedasDesde(@Param("desde") LocalDateTime desde);

    @Query("SELECT h.terminoBusqueda, COUNT(h) FROM HistorialBusqueda h GROUP BY h.terminoBusqueda ORDER BY COUNT(h) DESC")
    List<Object[]> findTerminosMasBuscados(Pageable pageable);

    @Query("SELECT h.tipoBusqueda, COUNT(h) FROM HistorialBusqueda h GROUP BY h.tipoBusqueda")
    List<Object[]> countByTipoBusqueda();

    @Query("SELECT COUNT(DISTINCT h.grado.id) FROM HistorialBusqueda h")
    long countGradosUnicos();
}