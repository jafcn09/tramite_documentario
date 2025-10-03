package com.example.demo.repository;

import com.example.demo.model.TramiteHistorial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TramiteHistorialRepository extends JpaRepository<TramiteHistorial, Long> {
    
    // Obtener historial completo de un trámite ordenado por fecha
    List<TramiteHistorial> findByTramiteIdOrderByFechaAccionDesc(Long tramiteId);
    
    // Obtener historial paginado de un trámite
    Page<TramiteHistorial> findByTramiteIdOrderByFechaAccionDesc(Long tramiteId, Pageable pageable);
    
    // Buscar por tipo de acción
    List<TramiteHistorial> findByTramiteIdAndAccion(Long tramiteId, TramiteHistorial.TipoAccion accion);
    
    // Buscar acciones realizadas por un usuario
    Page<TramiteHistorial> findByUsuarioIdOrderByFechaAccionDesc(Long usuarioId, Pageable pageable);
    
    // Buscar acciones en un rango de fechas
    @Query("SELECT th FROM TramiteHistorial th WHERE th.tramiteId = :tramiteId " +
           "AND th.fechaAccion BETWEEN :fechaInicio AND :fechaFin " +
           "ORDER BY th.fechaAccion DESC")
    List<TramiteHistorial> findByTramiteIdAndFechaAccionBetween(
        @Param("tramiteId") Long tramiteId,
        @Param("fechaInicio") LocalDateTime fechaInicio,
        @Param("fechaFin") LocalDateTime fechaFin
    );
    
    // Obtener últimas N acciones de un trámite
    @Query("SELECT th FROM TramiteHistorial th WHERE th.tramiteId = :tramiteId " +
           "ORDER BY th.fechaAccion DESC")
    List<TramiteHistorial> findTopByTramiteIdOrderByFechaAccionDesc(@Param("tramiteId") Long tramiteId, Pageable pageable);
    
    // Buscar derivaciones de un área específica
    @Query("SELECT th FROM TramiteHistorial th WHERE th.accion = 'DERIVADO' " +
           "AND th.areaOrigenId = :areaId ORDER BY th.fechaAccion DESC")
    List<TramiteHistorial> findDerivacionesByAreaOrigen(@Param("areaId") Long areaId);
    
    // Buscar asignaciones a un usuario específico
    @Query("SELECT th FROM TramiteHistorial th WHERE th.accion = 'ASIGNADO' " +
           "AND th.usuarioNuevoId = :usuarioId ORDER BY th.fechaAccion DESC")
    List<TramiteHistorial> findAsignacionesByUsuario(@Param("usuarioId") Long usuarioId);
    
    // Contar acciones por tipo para un trámite
    @Query("SELECT COUNT(th) FROM TramiteHistorial th WHERE th.tramiteId = :tramiteId AND th.accion = :accion")
    Long countByTramiteIdAndAccion(@Param("tramiteId") Long tramiteId, @Param("accion") TramiteHistorial.TipoAccion accion);

    @Query("SELECT COUNT(th) FROM TramiteHistorial th WHERE th.tramiteId = :tramiteId")
    Long countModificacionesByTramiteId(@Param("tramiteId") Long tramiteId);
    
    // Obtener estadísticas de acciones por usuario en un período
    @Query("SELECT th.accion, COUNT(th) FROM TramiteHistorial th WHERE th.usuarioId = :usuarioId " +
           "AND th.fechaAccion BETWEEN :fechaInicio AND :fechaFin GROUP BY th.accion")
    List<Object[]> getEstadisticasAccionesByUsuario(
        @Param("usuarioId") Long usuarioId,
        @Param("fechaInicio") LocalDateTime fechaInicio,
        @Param("fechaFin") LocalDateTime fechaFin
    );
}