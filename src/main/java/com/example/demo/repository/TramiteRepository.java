
package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Tramite;

@Repository
public interface TramiteRepository extends JpaRepository<Tramite, Long> {
    
    // Buscar por código único
    Optional<Tramite> findByCodigo(String codigo);
    
    // Buscar por código con paginación (para búsquedas públicas) - Optimizada
    @Query("SELECT t FROM Tramite t WHERE t.codigo LIKE CONCAT('%', :codigo, '%') ORDER BY t.id DESC")
    Page<Tramite> findByCodigoContaining(@Param("codigo") String codigo, Pageable pageable);
    
    // Buscar por usuario solicitante
    @Query("SELECT t FROM Tramite t WHERE t.usuarioSolicitanteId = :usuarioSolicitanteId")
    Page<Tramite> findByUsuarioSolicitanteId(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, Pageable pageable);
    
    // Buscar por usuario asignado
    @Query("SELECT t FROM Tramite t WHERE t.usuarioAsignadoId = :usuarioAsignadoId")
    Page<Tramite> findByUsuarioAsignadoId(@Param("usuarioAsignadoId") Long usuarioAsignadoId, Pageable pageable);
    
    // Buscar por área actual
    @Query("SELECT t FROM Tramite t WHERE t.areaActualId = :areaActualId")
    Page<Tramite> findByAreaActualId(@Param("areaActualId") Long areaActualId, Pageable pageable);
    
    // Buscar por área origen
    @Query("SELECT t FROM Tramite t WHERE t.areaOrigenId = :areaOrigenId")
    Page<Tramite> findByAreaOrigenId(@Param("areaOrigenId") Long areaOrigenId, Pageable pageable);
    
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
    
    // Buscar trámites con filtros múltiples (sin ordenamiento para permitir Pageable)
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
    
    // Contar trámites por usuario solicitante
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.usuarioSolicitanteId = :usuarioSolicitanteId")
    Long countByUsuarioSolicitanteId(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId);
    
    // Contar trámites por usuario solicitante y estado
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.estado = :estado")
    Long countByUsuarioSolicitanteIdAndEstado(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("estado") Tramite.EstadoTramite estado);
    
    // Contar trámites por usuario solicitante y tipo
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.tipo = :tipo")
    Long countByUsuarioSolicitanteIdAndTipo(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("tipo") Tramite.TipoTramite tipo);
    
    // Contar trámites por usuario asignado
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.usuarioAsignadoId = :usuarioAsignadoId")
    Long countByUsuarioAsignadoId(@Param("usuarioAsignadoId") Long usuarioAsignadoId);
    
    // Obtener trámites ordenados por ID (más eficiente que por fecha con archivos grandes)
    @Query("SELECT t FROM Tramite t ORDER BY t.id DESC")
    Page<Tramite> findAllOrderById(Pageable pageable);
    
    // Obtener trámites por usuario solicitante ordenados por ID
    @Query("SELECT t FROM Tramite t WHERE t.usuarioSolicitanteId = :usuarioSolicitanteId ORDER BY t.id DESC")
    Page<Tramite> findByUsuarioSolicitanteIdOrderById(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, Pageable pageable);
    
    // Métodos adicionales para la bandeja (excluir archivados)
    
    // Usuario: trámites excluyendo archivados
    @Query("SELECT t FROM Tramite t WHERE t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.estado != :estado ORDER BY t.id DESC")
    Page<Tramite> findByUsuarioSolicitanteIdAndEstadoNotOrderById(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("estado") Tramite.EstadoTramite estado, Pageable pageable);
    
    // Usuario: trámites por estado específico
    @Query("SELECT t FROM Tramite t WHERE t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.estado = :estado ORDER BY t.id DESC")
    Page<Tramite> findByUsuarioSolicitanteIdAndEstadoOrderById(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("estado") Tramite.EstadoTramite estado, Pageable pageable);
    
    // Administrativos: todos los trámites excluyendo un estado
    @Query("SELECT t FROM Tramite t WHERE t.estado != :estado ORDER BY t.id DESC")
    Page<Tramite> findByEstadoNotOrderByIdDesc(@Param("estado") Tramite.EstadoTramite estado, Pageable pageable);
    
    // Administrativos: trámites por estado específico
    @Query("SELECT t FROM Tramite t WHERE t.estado = :estado ORDER BY t.id DESC")
    Page<Tramite> findByEstadoOrderByIdDesc(@Param("estado") Tramite.EstadoTramite estado, Pageable pageable);
}