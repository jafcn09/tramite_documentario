package com.example.demo.repository;

import com.example.demo.model.Tramite;
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
public interface TramiteRepository extends JpaRepository<Tramite, Long> {
    
    // Buscar por código único
    Optional<Tramite> findByCodigo(String codigo);
    
    // Buscar por usuario solicitante
    Page<Tramite> findByUsuarioSolicitanteId(Long usuarioSolicitanteId, Pageable pageable);
    
    // Buscar por usuario asignado
    Page<Tramite> findByUsuarioAsignadoId(Long usuarioAsignadoId, Pageable pageable);
    
    // Buscar por área actual
    Page<Tramite> findByAreaActualId(Long areaActualId, Pageable pageable);
    
    // Buscar por área origen
    Page<Tramite> findByAreaOrigenId(Long areaOrigenId, Pageable pageable);
    
    // Buscar por estado
    Page<Tramite> findByEstado(Tramite.EstadoTramite estado, Pageable pageable);
    
    // Buscar por tipo
    Page<Tramite> findByTipo(Tramite.TipoTramite tipo, Pageable pageable);
    
    // Buscar por prioridad
    Page<Tramite> findByPrioridad(Tramite.PrioridadTramite prioridad, Pageable pageable);
    
    // Buscar trámites vencidos
    @Query("SELECT t FROM Tramite t WHERE t.fechaVencimiento < :fechaActual AND t.estado NOT IN :estadosExcluidos")
    List<Tramite> findTramitesVencidos(
        @Param("fechaActual") LocalDateTime fechaActual,
        @Param("estadosExcluidos") List<Tramite.EstadoTramite> estadosExcluidos
    );
    
    // Buscar trámites por vencer (próximos N días)
    @Query("SELECT t FROM Tramite t WHERE t.fechaVencimiento BETWEEN :fechaActual AND :fechaLimite AND t.estado NOT IN :estadosExcluidos")
    List<Tramite> findTramitesPorVencer(
        @Param("fechaActual") LocalDateTime fechaActual,
        @Param("fechaLimite") LocalDateTime fechaLimite,
        @Param("estadosExcluidos") List<Tramite.EstadoTramite> estadosExcluidos
    );
    
    // Buscar trámites por rango de fechas
    @Query("SELECT t FROM Tramite t WHERE t.fechaCreacion BETWEEN :fechaInicio AND :fechaFin")
    Page<Tramite> findByFechaCreacionBetween(
        @Param("fechaInicio") LocalDateTime fechaInicio,
        @Param("fechaFin") LocalDateTime fechaFin,
        Pageable pageable
    );
    
    // Búsqueda por texto en título o descripción
    @Query("SELECT t FROM Tramite t WHERE LOWER(t.titulo) LIKE LOWER(CONCAT('%', :texto, '%')) " +
           "OR LOWER(t.descripcion) LIKE LOWER(CONCAT('%', :texto, '%'))")
    Page<Tramite> findByTituloOrDescripcionContaining(@Param("texto") String texto, Pageable pageable);
    
    // Contar trámites por estado para un usuario
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.usuarioAsignadoId = :usuarioId AND t.estado = :estado")
    Long countByUsuarioAsignadoIdAndEstado(@Param("usuarioId") Long usuarioId, @Param("estado") Tramite.EstadoTramite estado);
    
    // Contar trámites por estado para un área
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.areaActualId = :areaId AND t.estado = :estado")
    Long countByAreaActualIdAndEstado(@Param("areaId") Long areaId, @Param("estado") Tramite.EstadoTramite estado);
    
    // Buscar trámites con filtros múltiples
    @Query("SELECT t FROM Tramite t WHERE " +
           "(:usuarioSolicitanteId IS NULL OR t.usuarioSolicitanteId = :usuarioSolicitanteId) AND " +
           "(:usuarioAsignadoId IS NULL OR t.usuarioAsignadoId = :usuarioAsignadoId) AND " +
           "(:areaActualId IS NULL OR t.areaActualId = :areaActualId) AND " +
           "(:estado IS NULL OR t.estado = :estado) AND " +
           "(:tipo IS NULL OR t.tipo = :tipo) AND " +
           "(:prioridad IS NULL OR t.prioridad = :prioridad)")
    Page<Tramite> findWithFilters(
        @Param("usuarioSolicitanteId") Long usuarioSolicitanteId,
        @Param("usuarioAsignadoId") Long usuarioAsignadoId,
        @Param("areaActualId") Long areaActualId,
        @Param("estado") Tramite.EstadoTramite estado,
        @Param("tipo") Tramite.TipoTramite tipo,
        @Param("prioridad") Tramite.PrioridadTramite prioridad,
        Pageable pageable
    );
    
    // Generar siguiente código de trámite
    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(t.codigo, 10) AS integer)), 0) + 1 " +
           "FROM Tramite t WHERE t.codigo LIKE CONCAT('TRM-', :anio, '-%')")
    Integer getNextCodigoNumber(@Param("anio") String anio);
    
    // Contar por estado
    Long countByEstado(Tramite.EstadoTramite estado);
    
    // Contar por tipo
    Long countByTipo(Tramite.TipoTramite tipo);
}