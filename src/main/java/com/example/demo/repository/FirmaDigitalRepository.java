package com.example.demo.repository;

import com.example.demo.model.FirmaDigital;
import com.example.demo.model.FirmaDigital.EstadoFirma;
import com.example.demo.model.FirmaDigital.TipoFirma;
import com.example.demo.model.FirmaDigital.EstadoAutorizacion;
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
public interface FirmaDigitalRepository extends JpaRepository<FirmaDigital, Long> {

    // Buscar firmas por trámite
    List<FirmaDigital> findByTramiteId(Long tramiteId);

    List<FirmaDigital> findByTramiteIdOrderByFechaCreacionAsc(Long tramiteId);

    // Buscar firmas por firmante
    List<FirmaDigital> findByFirmanteId(Long firmanteId);

    Page<FirmaDigital> findByFirmanteId(Long firmanteId, Pageable pageable);

    // Buscar firmas por estado
    List<FirmaDigital> findByEstadoFirma(EstadoFirma estadoFirma);

    Page<FirmaDigital> findByEstadoFirma(EstadoFirma estadoFirma, Pageable pageable);

    // Buscar firmas por tipo
    List<FirmaDigital> findByTipoFirma(TipoFirma tipoFirma);

    // Buscar firmas pendientes de un firmante específico
    List<FirmaDigital> findByFirmanteIdAndEstadoFirma(Long firmanteId, EstadoFirma estadoFirma);

    // Buscar firmas pendientes de un trámite específico
    List<FirmaDigital> findByTramiteIdAndEstadoFirma(Long tramiteId, EstadoFirma estadoFirma);

    // Buscar firma específica por trámite y firmante
    Optional<FirmaDigital> findByTramiteIdAndFirmanteId(Long tramiteId, Long firmanteId);

    // Verificar si existe una firma para un trámite y firmante específicos
    boolean existsByTramiteIdAndFirmanteId(Long tramiteId, Long firmanteId);

    // Contar firmas por estado para un trámite
    long countByTramiteIdAndEstadoFirma(Long tramiteId, EstadoFirma estadoFirma);

    // Buscar firmas expiradas
    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaVencimiento < :fechaActual AND f.estadoFirma = :estadoPendiente")
    List<FirmaDigital> findFirmasExpiradas(@Param("fechaActual") LocalDateTime fechaActual,
                                           @Param("estadoPendiente") EstadoFirma estadoPendiente);

    // Buscar firmas que vencen pronto (para notificaciones)
    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaVencimiento BETWEEN :fechaActual AND :fechaLimite AND f.estadoFirma = :estadoPendiente")
    List<FirmaDigital> findFirmasProximasAVencer(@Param("fechaActual") LocalDateTime fechaActual,
                                                 @Param("fechaLimite") LocalDateTime fechaLimite,
                                                 @Param("estadoPendiente") EstadoFirma estadoPendiente);

    // Buscar todas las firmas válidas de un trámite
    @Query("SELECT f FROM FirmaDigital f WHERE f.tramiteId = :tramiteId AND f.estadoFirma IN ('FIRMADO', 'VERIFICADO')")
    List<FirmaDigital> findFirmasValidasPorTramite(@Param("tramiteId") Long tramiteId);

    // Verificar si un trámite tiene todas las firmas requeridas
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FirmaDigital f WHERE f.tramiteId = :tramiteId AND f.estadoFirma = 'PENDIENTE'")
    boolean tramiteTieneFirmasPendientes(@Param("tramiteId") Long tramiteId);

    // Estadísticas de firmas por firmante
    @Query("SELECT f.estadoFirma, COUNT(f) FROM FirmaDigital f WHERE f.firmante.id = :firmanteId GROUP BY f.estadoFirma")
    List<Object[]> obtenerEstadisticasFirmasPorFirmante(@Param("firmanteId") Long firmanteId);

    // Estadísticas de firmas por trámite
    @Query("SELECT f.estadoFirma, COUNT(f) FROM FirmaDigital f WHERE f.tramiteId = :tramiteId GROUP BY f.estadoFirma")
    List<Object[]> obtenerEstadisticasFirmasPorTramite(@Param("tramiteId") Long tramiteId);

    // Buscar firmas por rango de fechas
    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaFirma BETWEEN :fechaInicio AND :fechaFin")
    List<FirmaDigital> findFirmasPorRangoFechas(@Param("fechaInicio") LocalDateTime fechaInicio,
                                                @Param("fechaFin") LocalDateTime fechaFin);

    // Buscar firmas por hash del documento (para verificación de integridad)
    Optional<FirmaDigital> findByHashDocumento(String hashDocumento);

    // Buscar firmas por serial del certificado
    List<FirmaDigital> findByCertificadoSerial(String certificadoSerial);

    // Eliminar firmas antiguas (para limpieza de base de datos)
    @Query("DELETE FROM FirmaDigital f WHERE f.fechaCreacion < :fechaLimite AND f.estadoFirma IN ('EXPIRADO', 'INVALIDADO', 'ERROR')")
    void eliminarFirmasAntiguas(@Param("fechaLimite") LocalDateTime fechaLimite);

    // Buscar documentos firmados por path
    Optional<FirmaDigital> findByDocumentoFirmadoPath(String documentoFirmadoPath);

    // Verificar validación de certificado
    long countByValidacionCertificadoTrue();

    long countByValidacionCertificadoFalse();

    // Buscar firmas por IP (para auditoría)
    List<FirmaDigital> findByIpFirma(String ipFirma);

    // Buscar firmas recientes (últimas 24 horas)
    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaCreacion >= :fecha24HorasAtras ORDER BY f.fechaCreacion DESC")
    List<FirmaDigital> findFirmasRecientes(@Param("fecha24HorasAtras") LocalDateTime fecha24HorasAtras);

    List<FirmaDigital> findByEstadoAutorizacion(EstadoAutorizacion estadoAutorizacion);

    Page<FirmaDigital> findByEstadoAutorizacion(EstadoAutorizacion estadoAutorizacion, Pageable pageable);

    // Buscar firmas pendientes de autorización
    @Query("SELECT f FROM FirmaDigital f WHERE f.estadoAutorizacion = 'PENDIENTE' ORDER BY f.fechaCreacion DESC")
    List<FirmaDigital> findFirmasPendientesAutorizacion();

    // Buscar firmas por autorizador
    List<FirmaDigital> findByAutorizadoPorId(Long autorizadorId);

    Page<FirmaDigital> findByAutorizadoPorId(Long autorizadorId, Pageable pageable);

    // Buscar firmas por nivel de autorización requerido
    List<FirmaDigital> findByNivelAutorizacionRequerido(Integer nivel);

    // Buscar firmas que requieren autorización administrativa
    @Query("SELECT f FROM FirmaDigital f WHERE f.nivelAutorizacionRequerido = 2 AND f.estadoAutorizacion = 'PENDIENTE'")
    List<FirmaDigital> findFirmasPendientesAutorizacionAdministrativa();

    // Buscar firmas que requieren autorización de administrador
    @Query("SELECT f FROM FirmaDigital f WHERE f.nivelAutorizacionRequerido = 1 AND f.estadoAutorizacion = 'PENDIENTE'")
    List<FirmaDigital> findFirmasPendientesAutorizacionAdministrador();

    // Contar firmas pendientes de autorización por nivel
    long countByNivelAutorizacionRequeridoAndEstadoAutorizacion(Integer nivel, EstadoAutorizacion estado);

    // Buscar firmas autorizadas por fecha
    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaAutorizacion BETWEEN :fechaInicio AND :fechaFin AND f.estadoAutorizacion = 'AUTORIZADO'")
    List<FirmaDigital> findFirmasAutorizadasPorRangoFechas(@Param("fechaInicio") LocalDateTime fechaInicio,
                                                           @Param("fechaFin") LocalDateTime fechaFin);

    // Buscar autorizaciones expiradas
    @Query("SELECT f FROM FirmaDigital f WHERE f.expiraEn < :fechaActual AND f.estadoAutorizacion = 'AUTORIZADO'")
    List<FirmaDigital> findAutorizacionesExpiradas(@Param("fechaActual") LocalDateTime fechaActual);

    @Query("SELECT f FROM FirmaDigital f WHERE f.cantidadDocumentos > 0")
    List<FirmaDigital> findFirmasConDocumentosAdjuntos();

    // Contar firmas con documentos adjuntos
    @Query("SELECT COUNT(f) FROM FirmaDigital f WHERE f.cantidadDocumentos > 0")
    long countFirmasConDocumentosAdjuntos();

    Optional<FirmaDigital> findByHashDocumentosAdjuntos(String hashDocumentosAdjuntos);

    // Buscar firmas por token de autorización
    Optional<FirmaDigital> findByTokenAutorizacion(String tokenAutorizacion);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FirmaDigital f WHERE f.id = :firmaId " +
           "AND (f.estadoAutorizacion = 'AUTORIZADO' OR f.estadoAutorizacion = 'NO_REQUERIDO') " +
           "AND (f.expiraEn IS NULL OR f.expiraEn > :fechaActual)")
    boolean firmaEstaAutorizadaYVigente(@Param("firmaId") Long firmaId, @Param("fechaActual") LocalDateTime fechaActual);

    // Estadísticas de autorización
    @Query("SELECT f.estadoAutorizacion, COUNT(f) FROM FirmaDigital f GROUP BY f.estadoAutorizacion")
    List<Object[]> obtenerEstadisticasAutorizacion();

    List<FirmaDigital> findByRazonFirma(String razonFirma);

    List<FirmaDigital> findByUbicacionFirma(String ubicacionFirma);
}