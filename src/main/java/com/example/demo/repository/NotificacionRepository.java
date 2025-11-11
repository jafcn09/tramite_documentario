package com.example.demo.repository;

import com.example.demo.model.Notificacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {

    Page<Notificacion> findByUsuarioDestinatarioIdOrderByFechaCreacionDesc(Long usuarioDestinatarioId, Pageable pageable);

    Page<Notificacion> findByUsuarioDestinatarioIdAndEsLeidaFalseOrderByFechaCreacionDesc(Long usuarioDestinatarioId, Pageable pageable);

    Page<Notificacion> findByUsuarioDestinatarioIdAndEsLeidaTrueOrderByFechaCreacionDesc(Long usuarioDestinatarioId, Pageable pageable);

    Long countByUsuarioDestinatarioIdAndEsLeidaFalse(Long usuarioDestinatarioId);

    Page<Notificacion> findByUsuarioDestinatarioIdAndTipoOrderByFechaCreacionDesc(
        Long usuarioDestinatarioId,
        Notificacion.TipoNotificacion tipo,
        Pageable pageable
    );

    Page<Notificacion> findByUsuarioDestinatarioIdAndPrioridadOrderByFechaCreacionDesc(
        Long usuarioDestinatarioId,
        Notificacion.PrioridadNotificacion prioridad,
        Pageable pageable
    );

    List<Notificacion> findByTramiteRelacionadoIdOrderByFechaCreacionDesc(Long tramiteRelacionadoId);

    Page<Notificacion> findByAreaOrigenIdOrderByFechaCreacionDesc(Long areaOrigenId, Pageable pageable);

    Page<Notificacion> findByUsuarioEmisorIdOrderByFechaCreacionDesc(Long usuarioEmisorId, Pageable pageable);

    @Query("SELECT n FROM Notificacion n WHERE n.fechaVencimiento < :fechaActual AND n.esLeida = false")
    List<Notificacion> findNotificacionesVencidas(@Param("fechaActual") LocalDateTime fechaActual);

    @Query("SELECT n FROM Notificacion n WHERE n.fechaVencimiento BETWEEN :fechaActual AND :fechaLimite AND n.esLeida = false")
    List<Notificacion> findNotificacionesPorVencer(
        @Param("fechaActual") LocalDateTime fechaActual,
        @Param("fechaLimite") LocalDateTime fechaLimite
    );

    @Modifying
    @Query("UPDATE Notificacion n SET n.esLeida = true, n.fechaLectura = :fechaLectura WHERE n.id = :notificacionId AND n.usuarioDestinatarioId = :usuarioId")
    int marcarComoLeida(
        @Param("notificacionId") Long notificacionId,
        @Param("usuarioId") Long usuarioId,
        @Param("fechaLectura") LocalDateTime fechaLectura
    );

    @Modifying
    @Query("UPDATE Notificacion n SET n.esLeida = true, n.fechaLectura = :fechaLectura WHERE n.id IN :notificacionIds AND n.usuarioDestinatarioId = :usuarioId")
    int marcarMultiplesComoLeidas(
        @Param("notificacionIds") List<Long> notificacionIds,
        @Param("usuarioId") Long usuarioId,
        @Param("fechaLectura") LocalDateTime fechaLectura
    );

    @Modifying
    @Query("UPDATE Notificacion n SET n.esLeida = true, n.fechaLectura = :fechaLectura WHERE n.usuarioDestinatarioId = :usuarioId AND n.esLeida = false")
    int marcarTodasComoLeidas(
        @Param("usuarioId") Long usuarioId,
        @Param("fechaLectura") LocalDateTime fechaLectura
    );

    @Query("SELECT n FROM Notificacion n WHERE n.usuarioDestinatarioId = :usuarioId " +
           "AND (:esLeida IS NULL OR n.esLeida = :esLeida) " +
           "AND (:tipo IS NULL OR n.tipo = :tipo) " +
           "AND (:prioridad IS NULL OR n.prioridad = :prioridad) " +
           "AND (:fechaDesde IS NULL OR n.fechaCreacion >= :fechaDesde) " +
           "AND (:fechaHasta IS NULL OR n.fechaCreacion <= :fechaHasta) " +
           "ORDER BY n.fechaCreacion DESC")
    Page<Notificacion> findWithFilters(
        @Param("usuarioId") Long usuarioId,
        @Param("esLeida") Boolean esLeida,
        @Param("tipo") Notificacion.TipoNotificacion tipo,
        @Param("prioridad") Notificacion.PrioridadNotificacion prioridad,
        @Param("fechaDesde") LocalDateTime fechaDesde,
        @Param("fechaHasta") LocalDateTime fechaHasta,
        Pageable pageable
    );

    @Modifying
    @Query("DELETE FROM Notificacion n WHERE n.esLeida = true AND n.fechaLectura < :fechaLimite")
    int eliminarNotificacionesAntiguasLeidas(@Param("fechaLimite") LocalDateTime fechaLimite);

    @Query("SELECT n.tipo, COUNT(n) FROM Notificacion n WHERE n.usuarioDestinatarioId = :usuarioId " +
           "AND n.fechaCreacion BETWEEN :fechaDesde AND :fechaHasta GROUP BY n.tipo")
    List<Object[]> getEstadisticasPorTipo(
        @Param("usuarioId") Long usuarioId,
        @Param("fechaDesde") LocalDateTime fechaDesde,
        @Param("fechaHasta") LocalDateTime fechaHasta
    );

    Page<Notificacion> findByUsuarioDestinatarioIdAndTramiteRelacionadoIdOrderByFechaCreacionDesc(
        Long usuarioDestinatarioId,
        Long tramiteRelacionadoId,
        Pageable pageable
    );

    @Modifying
    @Query("DELETE FROM Notificacion n WHERE n.fechaCreacion < :fechaLimite")
    int eliminarNotificacionesAntiguas(@Param("fechaLimite") LocalDateTime fechaLimite);

    Long countByEsLeidaFalse();
    Long countByEsLeidaTrue();
    Long countByTipo(Notificacion.TipoNotificacion tipo);
    Long countByPrioridad(Notificacion.PrioridadNotificacion prioridad);
    Long countByFechaCreacionAfter(LocalDateTime fechaLimite);
}