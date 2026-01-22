package com.example.demo.repository;

import com.example.demo.entity.EncuestaSatisfaccion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EncuestaSatisfaccionRepository extends JpaRepository<EncuestaSatisfaccion, Long> {

 
    Optional<EncuestaSatisfaccion> findByToken(String token);

 
    Optional<EncuestaSatisfaccion> findByTramiteId(Long tramiteId);


    Page<EncuestaSatisfaccion> findByTrabajadorEvaluadoId(Long trabajadorId, Pageable pageable);

  
    Page<EncuestaSatisfaccion> findByUsuarioSolicitanteId(Long usuarioId, Pageable pageable);

  
    Page<EncuestaSatisfaccion> findByEstado(EncuestaSatisfaccion.EstadoEncuesta estado, Pageable pageable);

  
    @Query("SELECT e FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    List<EncuestaSatisfaccion> findRespondidas(@Param("trabajadorId") Long trabajadorId);

  
    @Query("SELECT AVG(e.calificacionGeneral) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    Double calcularPromedioTrabajador(@Param("trabajadorId") Long trabajadorId);

  
    @Query("SELECT AVG(e.calificacionTiempoRespuesta) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    Double calcularPromedioTiempoRespuesta(@Param("trabajadorId") Long trabajadorId);

  
    @Query("SELECT AVG(e.calificacionCalidadRespuesta) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    Double calcularPromedioCalidadRespuesta(@Param("trabajadorId") Long trabajadorId);

 
    @Query("SELECT AVG(e.calificacionClaridad) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    Double calcularPromedioClaridad(@Param("trabajadorId") Long trabajadorId);

  
    @Query("SELECT AVG(e.calificacionAmabilidad) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    Double calcularPromedioAmabilidad(@Param("trabajadorId") Long trabajadorId);

  
    @Query("SELECT AVG(e.calificacionResolucion) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    Double calcularPromedioResolucion(@Param("trabajadorId") Long trabajadorId);

  
    @Query("SELECT COUNT(e) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA'")
    Long contarEncuestasRespondidas(@Param("trabajadorId") Long trabajadorId);

 
    @Query("SELECT COUNT(e) FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'PENDIENTE'")
    Long contarEncuestasPendientes(@Param("trabajadorId") Long trabajadorId);

    @Query("SELECT e FROM EncuestaSatisfaccion e WHERE e.estado = 'PENDIENTE' AND e.fechaLimite < :fechaActual")
    List<EncuestaSatisfaccion> findEncuestasExpiradas(@Param("fechaActual") LocalDateTime fechaActual);

    @Query("SELECT e.trabajadorEvaluadoId, AVG(e.calificacionGeneral) as promedio, COUNT(e) as total " +
           "FROM EncuestaSatisfaccion e " +
           "WHERE e.estado = 'RESPONDIDA' " +
           "GROUP BY e.trabajadorEvaluadoId " +
           "HAVING COUNT(e) >= :minimoEncuestas " +
           "ORDER BY promedio DESC")
    List<Object[]> obtenerRankingTrabajadores(@Param("minimoEncuestas") Long minimoEncuestas);


    @Query("SELECT e FROM EncuestaSatisfaccion e WHERE e.trabajadorEvaluadoId = :trabajadorId AND e.estado = 'RESPONDIDA' AND e.comentarios IS NOT NULL AND e.comentarios != ''")
    List<EncuestaSatisfaccion> findConComentarios(@Param("trabajadorId") Long trabajadorId);

    
    @Query("SELECT e FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA' AND e.fechaRespuesta BETWEEN :fechaInicio AND :fechaFin")
    List<EncuestaSatisfaccion> findByFechaRespuestaBetween(@Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);

    @Query("SELECT " +
           "(SELECT COUNT(e) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA') * 100.0 / " +
           "(SELECT COUNT(e) FROM EncuestaSatisfaccion e WHERE e.estado IN ('RESPONDIDA', 'PENDIENTE', 'EXPIRADA'))")
    Double calcularTasaRespuesta();


    Long countByEstado(EncuestaSatisfaccion.EstadoEncuesta estado);


    @Query("SELECT AVG(e.calificacionTiempoRespuesta) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA'")
    Double obtenerPromedioTiempoRespuesta();

    @Query("SELECT AVG(e.calificacionCalidadRespuesta) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA'")
    Double obtenerPromedioCalidadRespuesta();

    @Query("SELECT AVG(e.calificacionClaridad) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA'")
    Double obtenerPromedioClaridad();

    @Query("SELECT AVG(e.calificacionAmabilidad) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA'")
    Double obtenerPromedioAmabilidad();

    @Query("SELECT AVG(e.calificacionResolucion) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA'")
    Double obtenerPromedioResolucion();

    @Query("SELECT AVG(e.calificacionGeneral) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA'")
    Double obtenerPromedioGeneral();


    @Query("SELECT e FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA' AND e.comentarios IS NOT NULL AND e.comentarios != '' ORDER BY e.fechaRespuesta DESC")
    List<EncuestaSatisfaccion> obtenerUltimasConComentarios(Pageable pageable);

  
    @Query("SELECT COUNT(e) FROM EncuestaSatisfaccion e WHERE e.estado = 'RESPONDIDA' AND CAST(e.calificacionGeneral AS integer) = :calificacion")
    Long contarPorCalificacionGeneral(@Param("calificacion") Integer calificacion);
}