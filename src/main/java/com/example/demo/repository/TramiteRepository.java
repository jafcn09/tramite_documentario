
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

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.codigo = :codigo")
    Optional<Tramite> findByCodigo(@Param("codigo") String codigo);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.qrCode = :qrCode")
    Optional<Tramite> findByQrCode(@Param("qrCode") String qrCode);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.codigo LIKE CONCAT('%', :codigo, '%') ORDER BY t.id DESC")
    Page<Tramite> findByCodigoContaining(@Param("codigo") String codigo, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioSolicitanteId = :usuarioSolicitanteId")
    Page<Tramite> findByUsuarioSolicitanteId(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioAsignadoId = :usuarioAsignadoId")
    Page<Tramite> findByUsuarioAsignadoId(@Param("usuarioAsignadoId") Long usuarioAsignadoId, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.areaActualId = :areaActualId")
    Page<Tramite> findByAreaActualId(@Param("areaActualId") Long areaActualId, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.areaOrigenId = :areaOrigenId")
    Page<Tramite> findByAreaOrigenId(@Param("areaOrigenId") Long areaOrigenId, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.estado = :estado")
    Page<Tramite> findByEstado(@Param("estado") Tramite.EstadoTramite estado, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.tipo = :tipo")
    Page<Tramite> findByTipo(@Param("tipo") Tramite.TipoTramite tipo, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.prioridad = :prioridad")
    Page<Tramite> findByPrioridad(@Param("prioridad") Tramite.PrioridadTramite prioridad, Pageable pageable);
    
    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.fechaVencimiento < :fechaActual AND t.estado NOT IN :estadosExcluidos")
    List<Tramite> findTramitesVencidos(
        @Param("fechaActual") LocalDateTime fechaActual,
        @Param("estadosExcluidos") List<Tramite.EstadoTramite> estadosExcluidos
    );

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.fechaVencimiento BETWEEN :fechaActual AND :fechaLimite AND t.estado NOT IN :estadosExcluidos")
    List<Tramite> findTramitesPorVencer(
        @Param("fechaActual") LocalDateTime fechaActual,
        @Param("fechaLimite") LocalDateTime fechaLimite,
        @Param("estadosExcluidos") List<Tramite.EstadoTramite> estadosExcluidos
    );

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.fechaCreacion BETWEEN :fechaInicio AND :fechaFin")
    Page<Tramite> findByFechaCreacionBetween(
        @Param("fechaInicio") LocalDateTime fechaInicio,
        @Param("fechaFin") LocalDateTime fechaFin,
        Pageable pageable
    );

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND (LOWER(t.titulo) LIKE LOWER(CONCAT('%', :texto, '%')) " +
           "OR LOWER(t.descripcion) LIKE LOWER(CONCAT('%', :texto, '%')))")
    Page<Tramite> findByTituloOrDescripcionContaining(@Param("texto") String texto, Pageable pageable);
    
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioAsignadoId = :usuarioId AND t.estado = :estado")
    Long countByUsuarioAsignadoIdAndEstado(@Param("usuarioId") Long usuarioId, @Param("estado") Tramite.EstadoTramite estado);

    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.areaActualId = :areaId AND t.estado = :estado")
    Long countByAreaActualIdAndEstado(@Param("areaId") Long areaId, @Param("estado") Tramite.EstadoTramite estado);
    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND " +
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
    
    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(t.codigo, 10) AS integer)), 0) + 1 " +
           "FROM Tramite t WHERE t.deletedAt IS NULL AND t.codigo LIKE CONCAT('TRM-', :anio, '-%')")
    Integer getNextCodigoNumber(@Param("anio") String anio);

    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.estado = :estado")
    Long countByEstado(@Param("estado") Tramite.EstadoTramite estado);

    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.tipo = :tipo")
    Long countByTipo(@Param("tipo") Tramite.TipoTramite tipo);

    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioSolicitanteId = :usuarioSolicitanteId")
    Long countByUsuarioSolicitanteId(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId);

    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.estado = :estado")
    Long countByUsuarioSolicitanteIdAndEstado(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("estado") Tramite.EstadoTramite estado);

    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.tipo = :tipo")
    Long countByUsuarioSolicitanteIdAndTipo(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("tipo") Tramite.TipoTramite tipo);

    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioAsignadoId = :usuarioAsignadoId")
    Long countByUsuarioAsignadoId(@Param("usuarioAsignadoId") Long usuarioAsignadoId);

    // Contar solo trámites activos en proceso (excluye finalizados, rechazados, archivados, cancelados)
    @Query("SELECT COUNT(t) FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioAsignadoId = :usuarioAsignadoId " +
           "AND t.estado NOT IN ('FINALIZADO', 'RECHAZADO', 'ARCHIVADO', 'CANCELADO')")
    Long countActiveTramitesByUsuarioAsignadoId(@Param("usuarioAsignadoId") Long usuarioAsignadoId);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL ORDER BY t.id DESC")
    Page<Tramite> findAllOrderById(Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioSolicitanteId = :usuarioSolicitanteId ORDER BY t.id DESC")
    Page<Tramite> findByUsuarioSolicitanteIdOrderById(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.estado != :estado ORDER BY t.id DESC")
    Page<Tramite> findByUsuarioSolicitanteIdAndEstadoNotOrderById(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("estado") Tramite.EstadoTramite estado, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.usuarioSolicitanteId = :usuarioSolicitanteId AND t.estado = :estado ORDER BY t.id DESC")
    Page<Tramite> findByUsuarioSolicitanteIdAndEstadoOrderById(@Param("usuarioSolicitanteId") Long usuarioSolicitanteId, @Param("estado") Tramite.EstadoTramite estado, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.estado != :estado ORDER BY t.id DESC")
    Page<Tramite> findByEstadoNotOrderByIdDesc(@Param("estado") Tramite.EstadoTramite estado, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.estado = :estado ORDER BY t.id DESC")
    Page<Tramite> findByEstadoOrderByIdDesc(@Param("estado") Tramite.EstadoTramite estado, Pageable pageable);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.titulo = :titulo")
    List<Tramite> findByTitulo(@Param("titulo") String titulo);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.asunto = :asunto")
    List<Tramite> findByAsunto(@Param("asunto") String asunto);

    @Query("SELECT t FROM Tramite t WHERE t.deletedAt IS NULL AND t.descripcion = :descripcion")
    List<Tramite> findByDescripcion(@Param("descripcion") String descripcion);

    // Método para verificar si existe un trámite eliminado con los mismos datos
    @Query("SELECT COUNT(t) > 0 FROM Tramite t WHERE " +
           "t.deletedAt IS NOT NULL AND " +
           "t.asunto = :asunto AND " +
           "t.tipo = :tipo AND " +
           "t.usuarioSolicitanteId = :usuarioId")
    boolean existsDeletedTramiteWithSameData(
        @Param("asunto") String asunto,
        @Param("tipo") Tramite.TipoTramite tipo,
        @Param("usuarioId") Long usuarioId
    );
}