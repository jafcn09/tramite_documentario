package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.model.FirmaDigital.EstadoAutorizacion;
import com.example.demo.model.FirmaDigital.EstadoFirma;
import com.example.demo.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class FirmaDigitalService {

    private final FirmaDigitalRepository firmaDigitalRepository;
    private final TramiteRepository tramiteRepository;
    private final UsuarioRepository usuarioRepository;
    private final NotificacionService notificacionService;
    private final ObjectMapper objectMapper;

    private final String UPLOAD_DIR = "/uploads/firmas/";

   
    public FirmaDigitalResponse crearFirmaDigital(FirmaDigitalRequest request, String username) {
        log.info("Creando firma digital para trámite: {} por usuario: {}", request.getTramiteId(), username);

        Tramite tramite = tramiteRepository.findById(request.getTramiteId())
                .orElseThrow(() -> new RuntimeException("Trámite no encontrado: " + request.getTramiteId()));

        Usuario firmante = usuarioRepository.findById(request.getFirmanteId())
                .orElseThrow(() -> new RuntimeException("Firmante no encontrado: " + request.getFirmanteId()));

        if (firmaDigitalRepository.existsByTramiteIdAndFirmanteId(request.getTramiteId(), request.getFirmanteId())) {
            throw new RuntimeException("Ya existe una firma para este trámite y firmante");
        }

        validarTipoFirmaPorRol(firmante, request.getTipoFirma());

        try {
            FirmaDigital firmaDigital = FirmaDigital.builder()
                    .tramiteId(request.getTramiteId())
                    .firmante(firmante)
                    .tipoFirma(request.getTipoFirma())
                    .estadoFirma(EstadoFirma.PENDIENTE)
                    .razonFirma(request.getRazonFirma())
                    .ubicacionFirma(request.getUbicacionFirma())
                    .contactoFirmante(request.getContactoFirmante())
                    .observaciones(request.getObservaciones())
                    .certificadoSerial(request.getCertificadoSerial())
                    .algoritmoFirma(request.getAlgoritmoFirma())
                    .hashDocumento(request.getHashDocumento())
                    .nivelAutorizacionRequerido(request.getNivelAutorizacionRequerido() != null ?
                            request.getNivelAutorizacionRequerido() : 2) 
                    .requierePinAdicional(request.getRequierePinAdicional())
                    .expiraEn(request.getExpiraEn())
                    .fechaVencimiento(request.getExpiraEn() != null ? request.getExpiraEn() :
                            LocalDateTime.now().plusDays(30)) 
                    .build();

            
            if (request.getDocumentosAdjuntos() != null && !request.getDocumentosAdjuntos().isEmpty()) {
                procesarDocumentosAdjuntos(firmaDigital, request.getDocumentosAdjuntos());
            }


            determinarEstadoAutorizacionInicial(firmaDigital);

            // Generar token de autorización si es necesario
            if (firmaDigital.requiereAutorizacion()) {
                firmaDigital.setTokenAutorizacion(generarTokenAutorizacion());
            }

            // Guardar en base de datos
            FirmaDigital firmaGuardada = firmaDigitalRepository.save(firmaDigital);

            // Enviar notificaciones
            enviarNotificacionNuevaFirma(firmaGuardada);

            log.info("Firma digital creada exitosamente con ID: {}", firmaGuardada.getId());
            return convertirAResponse(firmaGuardada);

        } catch (Exception e) {
            log.error("Error al crear firma digital: {}", e.getMessage(), e);
            throw new RuntimeException("Error al crear firma digital: " + e.getMessage());
        }
    }

    public FirmaDigitalResponse obtenerFirmaPorId(Long id) {
        FirmaDigital firma = firmaDigitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Firma digital no encontrada: " + id));
        return convertirAResponse(firma);
    }

 
    public Page<FirmaDigitalResponse> listarFirmas(Pageable pageable) {
        return firmaDigitalRepository.findAll(pageable)
                .map(this::convertirAResponse);
    }

  
    public List<FirmaDigitalResponse> listarFirmasPorTramite(Long tramiteId) {
        List<FirmaDigital> firmas = firmaDigitalRepository.findByTramiteIdOrderByFechaCreacionAsc(tramiteId);
        return firmas.stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    public Page<FirmaDigitalResponse> listarFirmasPorFirmante(Long firmanteId, Pageable pageable) {
        return firmaDigitalRepository.findByFirmanteId(firmanteId, pageable)
                .map(this::convertirAResponse);
    }



    public FirmaDigitalResponse actualizarFirma(Long id, FirmaDigitalRequest request, String username) {
        log.info("Actualizando firma digital ID: {} por usuario: {}", id, username);

        FirmaDigital firma = firmaDigitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Firma digital no encontrada: " + id));
        if (!EstadoFirma.PENDIENTE.equals(firma.getEstadoFirma())) {
            throw new RuntimeException("No se puede actualizar una firma que no está pendiente");
        }

        try {
            firma.setRazonFirma(request.getRazonFirma());
            firma.setUbicacionFirma(request.getUbicacionFirma());
            firma.setContactoFirmante(request.getContactoFirmante());
            firma.setObservaciones(request.getObservaciones());
            firma.setExpiraEn(request.getExpiraEn());
            firma.setRequierePinAdicional(request.getRequierePinAdicional());

            if (request.getDocumentosAdjuntos() != null) {
                procesarDocumentosAdjuntos(firma, request.getDocumentosAdjuntos());
            }

            FirmaDigital firmaActualizada = firmaDigitalRepository.save(firma);
            log.info("Firma digital actualizada exitosamente: {}", id);

            return convertirAResponse(firmaActualizada);

        } catch (Exception e) {
            log.error("Error al actualizar firma digital: {}", e.getMessage(), e);
            throw new RuntimeException("Error al actualizar firma digital: " + e.getMessage());
        }
    }

 
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public void eliminarFirma(Long id, String username) {
        log.info("Eliminando firma digital ID: {} por usuario: {}", id, username);

        FirmaDigital firma = firmaDigitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Firma digital no encontrada: " + id));

        // Solo permitir eliminación si está pendiente o con error
        if (!EstadoFirma.PENDIENTE.equals(firma.getEstadoFirma()) &&
            !EstadoFirma.ERROR.equals(firma.getEstadoFirma())) {
            throw new RuntimeException("No se puede eliminar una firma procesada");
        }

        try {
            eliminarArchivosAsociados(firma);

            firmaDigitalRepository.delete(firma);
            log.info("Firma digital eliminada exitosamente: {}", id);

        } catch (Exception e) {
            log.error("Error al eliminar firma digital: {}", e.getMessage(), e);
            throw new RuntimeException("Error al eliminar firma digital: " + e.getMessage());
        }
    }



    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public FirmaDigitalResponse procesarAutorizacion(AutorizacionFirmaRequest request, String username) {
        log.info("Procesando autorización de firma ID: {} por usuario: {}", request.getFirmaId(), username);

        FirmaDigital firma = firmaDigitalRepository.findById(request.getFirmaId())
                .orElseThrow(() -> new RuntimeException("Firma digital no encontrada: " + request.getFirmaId()));

        Usuario autorizador = usuarioRepository.findByCorreo(username)
                .orElseThrow(() -> new RuntimeException("Usuario autorizador no encontrado: " + username));
        if (!firma.requiereAutorizacion()) {
            throw new RuntimeException("Esta firma no requiere autorización");
        }
        if (!firma.autorizacionPendiente()) {
            throw new RuntimeException("Esta firma ya fue procesada para autorización");
        }
        validarNivelAutorizacion(firma, autorizador);

        try {
            firma.setAutorizadoPor(autorizador);
            firma.setFechaAutorizacion(LocalDateTime.now());
            firma.setMotivoAutorizacion(request.getMotivoAutorizacion());

            if (request.getAutorizar()) {
                firma.setEstadoAutorizacion(EstadoAutorizacion.AUTORIZADO);
                if (request.getExpiraEn() != null) {
                    firma.setExpiraEn(request.getExpiraEn());
                }
                if (request.getRequierePinAdicional() != null) {
                    firma.setRequierePinAdicional(request.getRequierePinAdicional());
                }
                log.info("Firma autorizada: {}", firma.getId());
            } else {
                firma.setEstadoAutorizacion(EstadoAutorizacion.DENEGADO);
                firma.setMotivoInvalidacion(request.getMotivoDenegacion());
                log.info("Firma denegada: {}", firma.getId());
            }

            if (request.getObservaciones() != null) {
                firma.setObservaciones(firma.getObservaciones() + "\n[Autorización] " + request.getObservaciones());
            }

            FirmaDigital firmaActualizada = firmaDigitalRepository.save(firma);
            enviarNotificacionAutorizacion(firmaActualizada, request.getAutorizar());

            return convertirAResponse(firmaActualizada);

        } catch (Exception e) {
            log.error("Error al procesar autorización: {}", e.getMessage(), e);
            throw new RuntimeException("Error al procesar autorización: " + e.getMessage());
        }
    }

   
    @PreAuthorize("hasRole('ADMINISTRADOR') or hasRole('ADMINISTRATIVO')")
    public List<FirmaDigitalResponse> listarFirmasPendientesAutorizacion() {
        List<FirmaDigital> firmas = firmaDigitalRepository.findFirmasPendientesAutorizacion();
        return firmas.stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    public List<FirmaDigital> buscarPorRazonFirma(String razonFirma) {
        return firmaDigitalRepository.findByRazonFirma(razonFirma);
    }

    public List<FirmaDigital> buscarPorUbicacionFirma(String ubicacionFirma) {
        return firmaDigitalRepository.findByUbicacionFirma(ubicacionFirma);
    }


 
    public FirmaDigitalResponse firmarDocumento(FirmarDocumentoRequest request, String username) {
        log.info("Firmando documento ID: {} por usuario: {}", request.getFirmaId(), username);

        FirmaDigital firma = firmaDigitalRepository.findById(request.getFirmaId())
                .orElseThrow(() -> new RuntimeException("Firma digital no encontrada: " + request.getFirmaId()));
        if (!firma.puedeSerFirmada()) {
            throw new RuntimeException("Esta firma no puede ser procesada. Estado: " +
                    firma.getDescripcionEstado() + ", Autorización: " + firma.getDescripcionAutorizacion());
        }
        Usuario usuarioActual = usuarioRepository.findByCorreo(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));

        if (!firma.getFirmante().getId().equals(usuarioActual.getId())) {
            throw new RuntimeException("Solo el firmante asignado puede firmar este documento");
        }

        try {
            if (!Objects.equals(firma.getHashDocumento(), request.getHashDocumento())) {
                throw new RuntimeException("El hash del documento no coincide. Posible alteración del documento.");
            }
            firma.setEstadoFirma(EstadoFirma.FIRMADO);
            firma.setFechaFirma(LocalDateTime.now());
            firma.setCertificadoSerial(request.getCertificadoSerial());
            firma.setAlgoritmoFirma(request.getAlgoritmoFirma());
            firma.setUbicacionFirma(request.getUbicacionFirma());
            firma.setContactoFirmante(request.getContactoFirmante());

            // Guardar documento firmado
            if (request.getDocumentoFirmadoBase64() != null) {
                String rutaDocumentoFirmado = guardarDocumentoFirmado(firma, request.getDocumentoFirmadoBase64());
                firma.setDocumentoFirmadoPath(rutaDocumentoFirmado);
            }
            if (request.getObservacionesFirma() != null) {
                firma.setObservaciones(firma.getObservaciones() + "\n[Firma] " + request.getObservacionesFirma());
            }

            
            firma.setValidacionCertificado(true);

            FirmaDigital firmaActualizada = firmaDigitalRepository.save(firma);

            enviarNotificacionDocumentoFirmado(firmaActualizada);

            log.info("Documento firmado exitosamente: {}", firma.getId());
            return convertirAResponse(firmaActualizada);

        } catch (Exception e) {
            // Marcar como error
            firma.setEstadoFirma(EstadoFirma.ERROR);
            firma.setMotivoInvalidacion("Error durante el proceso de firma: " + e.getMessage());
            firmaDigitalRepository.save(firma);

            log.error("Error al firmar documento: {}", e.getMessage(), e);
            throw new RuntimeException("Error al firmar documento: " + e.getMessage());
        }
    }


    private void procesarDocumentosAdjuntos(FirmaDigital firma, List<FirmaDigitalRequest.DocumentoAdjuntoRequest> documentos) {
        try {
            List<DocumentoAdjuntoInfo> documentosInfo = new ArrayList<>();
            String hashCompleto = "";

            for (FirmaDigitalRequest.DocumentoAdjuntoRequest doc : documentos) {
                String rutaArchivo = guardarArchivoAdjunto(firma, doc);

  
                DocumentoAdjuntoInfo info = DocumentoAdjuntoInfo.builder()
                        .nombreArchivo(doc.getNombreArchivo())
                        .tipoContenido(doc.getTipoContenido())
                        .tamaño(doc.getTamaño())
                        .descripcion(doc.getDescripcion())
                        .hash(calcularHash(doc.getContenidoBase64()))
                        .fechaAdjunto(LocalDateTime.now())
                        .build();

                documentosInfo.add(info);
                hashCompleto += info.getHash();
            }
            firma.setDocumentosAdjuntos(objectMapper.writeValueAsString(documentosInfo));
            firma.setCantidadDocumentos(documentos.size());
            firma.setHashDocumentosAdjuntos(calcularHash(hashCompleto));

        } catch (Exception e) {
            log.error("Error procesando documentos adjuntos: {}", e.getMessage(), e);
            throw new RuntimeException("Error procesando documentos adjuntos: " + e.getMessage());
        }
    }

    private void determinarEstadoAutorizacionInicial(FirmaDigital firma) {

        if (firma.getNivelAutorizacionRequerido() == null || firma.getNivelAutorizacionRequerido() == 0) {
            firma.setEstadoAutorizacion(EstadoAutorizacion.NO_REQUERIDO);
        } else {
            firma.setEstadoAutorizacion(EstadoAutorizacion.PENDIENTE);
        }
    }

    private String generarTokenAutorizacion() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private void validarNivelAutorizacion(FirmaDigital firma, Usuario autorizador) {
        Set<String> rolesAutorizador = Set.of(autorizador.getRole().getName());

        int nivelRequerido = firma.getNivelAutorizacionRequerido();

        if (nivelRequerido == 1 && !rolesAutorizador.contains("ADMINISTRADOR")) {
            throw new RuntimeException("Se requiere rol de ADMINISTRADOR para autorizar esta firma");
        }

        if (nivelRequerido == 2 && !rolesAutorizador.contains("ADMINISTRADOR") &&
            !rolesAutorizador.contains("ADMINISTRATIVO")) {
            throw new RuntimeException("Se requiere rol de ADMINISTRADOR o ADMINISTRATIVO para autorizar esta firma");
        }
    }

    private String guardarArchivoAdjunto(FirmaDigital firma, FirmaDigitalRequest.DocumentoAdjuntoRequest documento) {
        try {
    
            Path directorioFirma = Paths.get(UPLOAD_DIR + "firma_" + firma.getId());
            Files.createDirectories(directorioFirma);

            
            String nombreArchivo = UUID.randomUUID().toString() + "_" + documento.getNombreArchivo();
            Path rutaArchivo = directorioFirma.resolve(nombreArchivo);

 
            byte[] contenido = Base64.getDecoder().decode(documento.getContenidoBase64());
            Files.write(rutaArchivo, contenido);

            return rutaArchivo.toString();

        } catch (Exception e) {
            log.error("Error guardando archivo adjunto: {}", e.getMessage(), e);
            throw new RuntimeException("Error guardando archivo adjunto: " + e.getMessage());
        }
    }

    private String guardarDocumentoFirmado(FirmaDigital firma, String documentoBase64) {
        try {
            Path directorioFirma = Paths.get(UPLOAD_DIR + "firma_" + firma.getId());
            Files.createDirectories(directorioFirma);

            String nombreArchivo = "documento_firmado_" + UUID.randomUUID().toString() + ".pdf";
            Path rutaArchivo = directorioFirma.resolve(nombreArchivo);

            byte[] contenido = Base64.getDecoder().decode(documentoBase64);
            Files.write(rutaArchivo, contenido);

            return rutaArchivo.toString();

        } catch (Exception e) {
            log.error("Error guardando documento firmado: {}", e.getMessage(), e);
            throw new RuntimeException("Error guardando documento firmado: " + e.getMessage());
        }
    }

    private void eliminarArchivosAsociados(FirmaDigital firma) {
        try {
            Path directorioFirma = Paths.get(UPLOAD_DIR + "firma_" + firma.getId());
            if (Files.exists(directorioFirma)) {
                Files.walk(directorioFirma)
                        .sorted(Comparator.reverseOrder())
                        .map(Path::toFile)
                        .forEach(file -> {
                            if (!file.delete()) {
                                log.warn("No se pudo eliminar archivo: {}", file.getAbsolutePath());
                            }
                        });
            }
        } catch (Exception e) {
            log.error("Error eliminando archivos de firma: {}", e.getMessage(), e);
        }
    }

    private String calcularHash(String contenido) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(contenido.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            log.error("Error calculando hash: {}", e.getMessage(), e);
            return UUID.randomUUID().toString(); 
        }
    }

    private void enviarNotificacionNuevaFirma(FirmaDigital firma) {
        try {
            Optional<Tramite> tramiteOpt = tramiteRepository.findById(firma.getTramiteId());
            if (tramiteOpt.isPresent()) {
                String mensaje = String.format("Nueva firma digital requerida para el trámite %s",
                        tramiteOpt.get().getCodigo());
            }
        } catch (Exception e) {
            log.error("Error enviando notificación de nueva firma: {}", e.getMessage(), e);
        }
    }

    private void enviarNotificacionAutorizacion(FirmaDigital firma, boolean autorizada) {
        try {
            Optional<Tramite> tramiteOpt = tramiteRepository.findById(firma.getTramiteId());
            if (tramiteOpt.isPresent()) {
                String mensaje = String.format("Su solicitud de firma para el trámite %s ha sido %s",
                        tramiteOpt.get().getCodigo(), autorizada ? "autorizada" : "denegada");
            }
        } catch (Exception e) {
            log.error("Error enviando notificación de autorización: {}", e.getMessage(), e);
        }
    }

    private void enviarNotificacionDocumentoFirmado(FirmaDigital firma) {
        try {
            Optional<Tramite> tramiteOpt = tramiteRepository.findById(firma.getTramiteId());
            if (tramiteOpt.isPresent()) {
                String mensaje = String.format("El documento del trámite %s ha sido firmado digitalmente",
                        tramiteOpt.get().getCodigo());
            }
        } catch (Exception e) {
            log.error("Error enviando notificación de documento firmado: {}", e.getMessage(), e);
        }
    }

    private FirmaDigitalResponse convertirAResponse(FirmaDigital firma) {
        try {

            List<FirmaDigitalResponse.DocumentoAdjuntoInfo> documentosInfo = new ArrayList<>();
            if (firma.getDocumentosAdjuntos() != null) {
                documentosInfo = objectMapper.readValue(firma.getDocumentosAdjuntos(),
                        objectMapper.getTypeFactory().constructCollectionType(List.class,
                                FirmaDigitalResponse.DocumentoAdjuntoInfo.class));
            }

            return FirmaDigitalResponse.builder()
                    .id(firma.getId())
                    .tramite(buildTramiteBasicInfo(firma.getTramiteId()))
                    .firmante(FirmaDigitalResponse.UsuarioBasicInfo.builder()
                            .id(firma.getFirmante().getId())
                            .nombre(firma.getFirmante().getNombre())
                            .apellidos(firma.getFirmante().getApellidos())
                            .email(firma.getFirmante().getCorreo())
                            .nombreCompleto(firma.getNombreCompleto())
                            .build())
                    .autorizadoPor(firma.getAutorizadoPor() != null ?
                            FirmaDigitalResponse.UsuarioBasicInfo.builder()
                                    .id(firma.getAutorizadoPor().getId())
                                    .nombre(firma.getAutorizadoPor().getNombre())
                                    .apellidos(firma.getAutorizadoPor().getApellidos())
                                    .email(firma.getAutorizadoPor().getCorreo())
                                    .nombreCompleto(firma.getNombreAutorizador())
                                    .build() : null)
                    .tipoFirma(firma.getTipoFirma())
                    .descripcionTipoFirma(firma.getDescripcionTipoFirma())
                    .estadoFirma(firma.getEstadoFirma())
                    .descripcionEstado(firma.getDescripcionEstado())
                    .estadoAutorizacion(firma.getEstadoAutorizacion())
                    .descripcionAutorizacion(firma.getDescripcionAutorizacion())
                    .fechaAutorizacion(firma.getFechaAutorizacion())
                    .motivoAutorizacion(firma.getMotivoAutorizacion())
                    .hashDocumento(firma.getHashDocumento())
                    .certificadoSerial(firma.getCertificadoSerial())
                    .algoritmoFirma(firma.getAlgoritmoFirma())
                    .fechaFirma(firma.getFechaFirma())
                    .fechaCreacion(firma.getFechaCreacion())
                    .fechaVencimiento(firma.getFechaVencimiento())
                    .razonFirma(firma.getRazonFirma())
                    .ubicacionFirma(firma.getUbicacionFirma())
                    .contactoFirmante(firma.getContactoFirmante())
                    .ipFirma(firma.getIpFirma())
                    .validacionCertificado(firma.getValidacionCertificado())
                    .motivoInvalidacion(firma.getMotivoInvalidacion())
                    .observaciones(firma.getObservaciones())
                    .nivelAutorizacionRequerido(firma.getNivelAutorizacionRequerido())
                    .nivelAutorizacionTexto(firma.getNivelAutorizacionTexto())
                    .requierePinAdicional(firma.getRequierePinAdicional())
                    .expiraEn(firma.getExpiraEn())
                    .autorizacionExpirada(firma.autorizacionExpirada())
                    .documentosAdjuntos(documentosInfo)
                    .cantidadDocumentos(firma.getCantidadDocumentos())
                    .hashDocumentosAdjuntos(firma.getHashDocumentosAdjuntos())
                    .esFirmaPendiente(firma.esFirmaPendiente())
                    .esFirmaValida(firma.esFirmaValida())
                    .puedeSerFirmada(firma.puedeSerFirmada())
                    .requiereAutorizacion(firma.requiereAutorizacion())
                    .estaAutorizado(firma.estaAutorizado())
                    .tieneDocumentosAdjuntos(firma.tieneDocumentosAdjuntos())
                    .build();

        } catch (Exception e) {
            log.error("Error convirtiendo firma a response: {}", e.getMessage(), e);
            throw new RuntimeException("Error procesando respuesta de firma digital");
        }
    }

    private FirmaDigitalResponse.TramiteBasicInfo buildTramiteBasicInfo(Long tramiteId) {
        Optional<Tramite> tramiteOpt = tramiteRepository.findById(tramiteId);
        if (tramiteOpt.isPresent()) {
            Tramite tramite = tramiteOpt.get();
            return FirmaDigitalResponse.TramiteBasicInfo.builder()
                    .id(tramite.getId())
                    .codigo(tramite.getCodigo())
                    .asunto(tramite.getAsunto())
                    .tipoTramite(tramite.getTipo().toString())
                    .estado(tramite.getEstado().toString())
                    .build();
        } else {
            return FirmaDigitalResponse.TramiteBasicInfo.builder()
                    .id(tramiteId)
                    .codigo("UNKNOWN")
                    .asunto("Trámite no encontrado")
                    .tipoTramite("UNKNOWN")
                    .estado("UNKNOWN")
                    .build();
        }
    }


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class DocumentoAdjuntoInfo {
        private String nombreArchivo;
        private String tipoContenido;
        private Long tamaño;
        private String descripcion;
        private String hash;
        private LocalDateTime fechaAdjunto;
    }

    private void validarTipoFirmaPorRol(Usuario firmante, FirmaDigital.TipoFirma tipoFirma) {
        String rolNombre = firmante.getRole().getName();

        if ("ESTUDIANTE".equals(rolNombre) && tipoFirma != FirmaDigital.TipoFirma.SIMPLE) {
            throw new RuntimeException("Los usuarios con rol ESTUDIANTE solo pueden utilizar firma de tipo SIMPLE");
        }
    }
}