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

    List<FirmaDigital> findByTramiteId(Long tramiteId);

    List<FirmaDigital> findByTramiteIdOrderByFechaCreacionAsc(Long tramiteId);

    List<FirmaDigital> findByFirmanteId(Long firmanteId);

    Page<FirmaDigital> findByFirmanteId(Long firmanteId, Pageable pageable);

    List<FirmaDigital> findByEstadoFirma(EstadoFirma estadoFirma);

    Page<FirmaDigital> findByEstadoFirma(EstadoFirma estadoFirma, Pageable pageable);

    List<FirmaDigital> findByTipoFirma(TipoFirma tipoFirma);

    List<FirmaDigital> findByFirmanteIdAndEstadoFirma(Long firmanteId, EstadoFirma estadoFirma);

    List<FirmaDigital> findByTramiteIdAndEstadoFirma(Long tramiteId, EstadoFirma estadoFirma);

    Optional<FirmaDigital> findByTramiteIdAndFirmanteId(Long tramiteId, Long firmanteId);

    boolean existsByTramiteIdAndFirmanteId(Long tramiteId, Long firmanteId);

    long countByTramiteIdAndEstadoFirma(Long tramiteId, EstadoFirma estadoFirma);

    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaVencimiento < :fechaActual AND f.estadoFirma = :estadoPendiente")
    List<FirmaDigital> findFirmasExpiradas(@Param("fechaActual") LocalDateTime fechaActual,
                                           @Param("estadoPendiente") EstadoFirma estadoPendiente);

    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaVencimiento BETWEEN :fechaActual AND :fechaLimite AND f.estadoFirma = :estadoPendiente")
    List<FirmaDigital> findFirmasProximasAVencer(@Param("fechaActual") LocalDateTime fechaActual,
                                                 @Param("fechaLimite") LocalDateTime fechaLimite,
                                                 @Param("estadoPendiente") EstadoFirma estadoPendiente);

    @Query("SELECT f FROM FirmaDigital f WHERE f.tramiteId = :tramiteId AND f.estadoFirma IN ('FIRMADO', 'VERIFICADO')")
    List<FirmaDigital> findFirmasValidasPorTramite(@Param("tramiteId") Long tramiteId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FirmaDigital f WHERE f.tramiteId = :tramiteId AND f.estadoFirma = 'PENDIENTE'")
    boolean tramiteTieneFirmasPendientes(@Param("tramiteId") Long tramiteId);

    @Query("SELECT f.estadoFirma, COUNT(f) FROM FirmaDigital f WHERE f.firmante.id = :firmanteId GROUP BY f.estadoFirma")
    List<Object[]> obtenerEstadisticasFirmasPorFirmante(@Param("firmanteId") Long firmanteId);

    @Query("SELECT f.estadoFirma, COUNT(f) FROM FirmaDigital f WHERE f.tramiteId = :tramiteId GROUP BY f.estadoFirma")
    List<Object[]> obtenerEstadisticasFirmasPorTramite(@Param("tramiteId") Long tramiteId);

    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaFirma BETWEEN :fechaInicio AND :fechaFin")
    List<FirmaDigital> findFirmasPorRangoFechas(@Param("fechaInicio") LocalDateTime fechaInicio,
                                                @Param("fechaFin") LocalDateTime fechaFin);

    Optional<FirmaDigital> findByHashDocumento(String hashDocumento);

    List<FirmaDigital> findByCertificadoSerial(String certificadoSerial);

    @Query("DELETE FROM FirmaDigital f WHERE f.fechaCreacion < :fechaLimite AND f.estadoFirma IN ('EXPIRADO', 'INVALIDADO', 'ERROR')")
    void eliminarFirmasAntiguas(@Param("fechaLimite") LocalDateTime fechaLimite);

    Optional<FirmaDigital> findByDocumentoFirmadoPath(String documentoFirmadoPath);

    long countByValidacionCertificadoTrue();

    long countByValidacionCertificadoFalse();

    List<FirmaDigital> findByIpFirma(String ipFirma);

    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaCreacion >= :fecha24HorasAtras ORDER BY f.fechaCreacion DESC")
    List<FirmaDigital> findFirmasRecientes(@Param("fecha24HorasAtras") LocalDateTime fecha24HorasAtras);

    List<FirmaDigital> findByEstadoAutorizacion(EstadoAutorizacion estadoAutorizacion);

    Page<FirmaDigital> findByEstadoAutorizacion(EstadoAutorizacion estadoAutorizacion, Pageable pageable);

    @Query("SELECT f FROM FirmaDigital f WHERE f.estadoAutorizacion = 'PENDIENTE' ORDER BY f.fechaCreacion DESC")
    List<FirmaDigital> findFirmasPendientesAutorizacion();

    List<FirmaDigital> findByAutorizadoPorId(Long autorizadorId);

    Page<FirmaDigital> findByAutorizadoPorId(Long autorizadorId, Pageable pageable);

    List<FirmaDigital> findByNivelAutorizacionRequerido(Integer nivel);

    @Query("SELECT f FROM FirmaDigital f WHERE f.nivelAutorizacionRequerido = 2 AND f.estadoAutorizacion = 'PENDIENTE'")
    List<FirmaDigital> findFirmasPendientesAutorizacionAdministrativa();

    @Query("SELECT f FROM FirmaDigital f WHERE f.nivelAutorizacionRequerido = 1 AND f.estadoAutorizacion = 'PENDIENTE'")
    List<FirmaDigital> findFirmasPendientesAutorizacionAdministrador();

    long countByNivelAutorizacionRequeridoAndEstadoAutorizacion(Integer nivel, EstadoAutorizacion estado);

    @Query("SELECT f FROM FirmaDigital f WHERE f.fechaAutorizacion BETWEEN :fechaInicio AND :fechaFin AND f.estadoAutorizacion = 'AUTORIZADO'")
    List<FirmaDigital> findFirmasAutorizadasPorRangoFechas(@Param("fechaInicio") LocalDateTime fechaInicio,
                                                           @Param("fechaFin") LocalDateTime fechaFin);

    @Query("SELECT f FROM FirmaDigital f WHERE f.expiraEn < :fechaActual AND f.estadoAutorizacion = 'AUTORIZADO'")
    List<FirmaDigital> findAutorizacionesExpiradas(@Param("fechaActual") LocalDateTime fechaActual);

    @Query("SELECT f FROM FirmaDigital f WHERE f.cantidadDocumentos > 0")
    List<FirmaDigital> findFirmasConDocumentosAdjuntos();

    @Query("SELECT COUNT(f) FROM FirmaDigital f WHERE f.cantidadDocumentos > 0")
    long countFirmasConDocumentosAdjuntos();

    Optional<FirmaDigital> findByHashDocumentosAdjuntos(String hashDocumentosAdjuntos);

    Optional<FirmaDigital> findByTokenAutorizacion(String tokenAutorizacion);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FirmaDigital f WHERE f.id = :firmaId " +
           "AND (f.estadoAutorizacion = 'AUTORIZADO' OR f.estadoAutorizacion = 'NO_REQUERIDO') " +
           "AND (f.expiraEn IS NULL OR f.expiraEn > :fechaActual)")
    boolean firmaEstaAutorizadaYVigente(@Param("firmaId") Long firmaId, @Param("fechaActual") LocalDateTime fechaActual);

    @Query("SELECT f.estadoAutorizacion, COUNT(f) FROM FirmaDigital f GROUP BY f.estadoAutorizacion")
    List<Object[]> obtenerEstadisticasAutorizacion();

    List<FirmaDigital> findByRazonFirma(String razonFirma);

    List<FirmaDigital> findByUbicacionFirma(String ubicacionFirma);
}
