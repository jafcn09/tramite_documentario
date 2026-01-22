package com.example.demo.service;

import com.example.demo.entity.EncuestaSatisfaccion;
import com.example.demo.repository.EncuestaSatisfaccionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EncuestaSatisfaccionService {

    private final EncuestaSatisfaccionRepository encuestaRepository;
    private final EmailService emailService;

   
    @Transactional
    @Async("emailExecutor")
    public void crearYEnviarEncuesta(
            Long tramiteId,
            Long usuarioSolicitanteId,
            Long trabajadorEvaluadoId,
            String emailDestino,
            String tramiteCodigo,
            String tramiteTitulo,
            String nombreTrabajador
    ) {
        try {
            log.info("📋 Creando encuesta de satisfacción para trámite {}", tramiteId);

            // Verificar si ya existe una encuesta para este trámite
            if (encuestaRepository.findByTramiteId(tramiteId).isPresent()) {
                log.warn("⚠️ Ya existe una encuesta para el trámite {}", tramiteId);
                return;
            }

            // Generar token único para la encuesta
            String token = UUID.randomUUID().toString();

            // Crear la encuesta
            EncuestaSatisfaccion encuesta = EncuestaSatisfaccion.builder()
                    .tramiteId(tramiteId)
                    .usuarioSolicitanteId(usuarioSolicitanteId)
                    .trabajadorEvaluadoId(trabajadorEvaluadoId)
                    .token(token)
                    .emailEnviado(emailDestino)
                    .estado(EncuestaSatisfaccion.EstadoEncuesta.PENDIENTE)
                    .fechaLimite(LocalDateTime.now().plusDays(10)) // 10 días para responder
                    .intentosEnvio(1)
                    .emailEnviadoExitoso(false)
                    .build();

            encuesta = encuestaRepository.save(encuesta);
            log.info("✅ Encuesta creada con ID: {} y token: {}", encuesta.getId(), token);

            // Enviar email con la encuesta
            boolean emailEnviado = emailService.enviarEncuestaSatisfaccion(
                    encuesta.getId(),
                    emailDestino,
                    tramiteCodigo,
                    tramiteTitulo,
                    nombreTrabajador,
                    token
            );

            // Actualizar estado del envío
            encuesta.setEmailEnviadoExitoso(emailEnviado);
            encuestaRepository.save(encuesta);

            if (emailEnviado) {
                log.info("✅ Email de encuesta enviado exitosamente a {}", emailDestino);
            } else {
                log.error("❌ Error al enviar email de encuesta a {}", emailDestino);
            }

        } catch (Exception e) {
            log.error("❌ Error al crear y enviar encuesta para trámite {}: {}", tramiteId, e.getMessage(), e);
        }
    }


    @Transactional
    public EncuestaSatisfaccion responderEncuesta(
            String token,
            Integer calificacionTiempoRespuesta,
            Integer calificacionCalidadRespuesta,
            Integer calificacionClaridad,
            Integer calificacionAmabilidad,
            Integer calificacionResolucion,
            String comentarios
    ) {
        log.info("📝 Respondiendo encuesta con token: {}", token);

        // Buscar la encuesta por token
        EncuestaSatisfaccion encuesta = encuestaRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Encuesta no encontrada con el token proporcionado"));

        // Verificar que la encuesta esté pendiente
        if (encuesta.getEstado() != EncuestaSatisfaccion.EstadoEncuesta.PENDIENTE) {
            throw new RuntimeException("Esta encuesta ya ha sido respondida o ha expirado");
        }

        // Verificar que no esté expirada
        if (encuesta.estaExpirada()) {
            encuesta.setEstado(EncuestaSatisfaccion.EstadoEncuesta.EXPIRADA);
            encuestaRepository.save(encuesta);
            throw new RuntimeException("Esta encuesta ha expirado. Fecha límite: " + encuesta.getFechaLimite());
        }

        // Asignar calificaciones
        encuesta.setCalificacionTiempoRespuesta(calificacionTiempoRespuesta);
        encuesta.setCalificacionCalidadRespuesta(calificacionCalidadRespuesta);
        encuesta.setCalificacionClaridad(calificacionClaridad);
        encuesta.setCalificacionAmabilidad(calificacionAmabilidad);
        encuesta.setCalificacionResolucion(calificacionResolucion);
        encuesta.setComentarios(comentarios);

        // Validar que las calificaciones estén en el rango correcto
        if (!encuesta.validarCalificaciones()) {
            throw new RuntimeException("Las calificaciones deben estar entre 1 y 5");
        }

        // Calcular promedio general
        encuesta.calcularCalificacionGeneral();

        // Marcar como respondida
        encuesta.marcarComoRespondida();

        EncuestaSatisfaccion saved = encuestaRepository.save(encuesta);
        log.info("✅ Encuesta respondida exitosamente. Calificación general: {}", saved.getCalificacionGeneral());

        return saved;
    }


    @Transactional(readOnly = true)
    public EncuestaSatisfaccion obtenerPorToken(String token) {
        return encuestaRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Encuesta no encontrada"));
    }

 
    @Transactional(readOnly = true)
    public Map<String, Object> obtenerMetricasTrabajador(Long trabajadorId) {
        Map<String, Object> metricas = new HashMap<>();

        Double promedioGeneral = encuestaRepository.calcularPromedioTrabajador(trabajadorId);
        Double promedioTiempo = encuestaRepository.calcularPromedioTiempoRespuesta(trabajadorId);
        Double promedioCalidad = encuestaRepository.calcularPromedioCalidadRespuesta(trabajadorId);
        Double promedioClaridad = encuestaRepository.calcularPromedioClaridad(trabajadorId);
        Double promedioAmabilidad = encuestaRepository.calcularPromedioAmabilidad(trabajadorId);
        Double promedioResolucion = encuestaRepository.calcularPromedioResolucion(trabajadorId);

        Long totalRespondidas = encuestaRepository.contarEncuestasRespondidas(trabajadorId);
        Long totalPendientes = encuestaRepository.contarEncuestasPendientes(trabajadorId);

        metricas.put("promedioGeneral", promedioGeneral != null ? Math.round(promedioGeneral * 100.0) / 100.0 : 0.0);
        metricas.put("promedioTiempoRespuesta", promedioTiempo != null ? Math.round(promedioTiempo * 100.0) / 100.0 : 0.0);
        metricas.put("promedioCalidadRespuesta", promedioCalidad != null ? Math.round(promedioCalidad * 100.0) / 100.0 : 0.0);
        metricas.put("promedioClaridad", promedioClaridad != null ? Math.round(promedioClaridad * 100.0) / 100.0 : 0.0);
        metricas.put("promedioAmabilidad", promedioAmabilidad != null ? Math.round(promedioAmabilidad * 100.0) / 100.0 : 0.0);
        metricas.put("promedioResolucion", promedioResolucion != null ? Math.round(promedioResolucion * 100.0) / 100.0 : 0.0);
        metricas.put("totalEncuestasRespondidas", totalRespondidas);
        metricas.put("totalEncuestasPendientes", totalPendientes);

        return metricas;
    }

  
    @Transactional(readOnly = true)
    public List<EncuestaSatisfaccion> obtenerEncuestasRespondidas(Long trabajadorId) {
        return encuestaRepository.findRespondidas(trabajadorId);
    }

  
    @Transactional(readOnly = true)
    public List<EncuestaSatisfaccion> obtenerEncuestasConComentarios(Long trabajadorId) {
        return encuestaRepository.findConComentarios(trabajadorId);
    }

  
    @Transactional(readOnly = true)
    public List<Map<String, Object>> obtenerRankingTrabajadores(Long minimoEncuestas) {
        List<Object[]> ranking = encuestaRepository.obtenerRankingTrabajadores(minimoEncuestas);

        return ranking.stream()
                .map(row -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("trabajadorId", row[0]);
                    item.put("promedio", Math.round((Double) row[1] * 100.0) / 100.0);
                    item.put("totalEncuestas", row[2]);
                    return item;
                })
                .toList();
    }

 
    @Transactional(readOnly = true)
    public Page<EncuestaSatisfaccion> obtenerPorTrabajador(Long trabajadorId, Pageable pageable) {
        return encuestaRepository.findByTrabajadorEvaluadoId(trabajadorId, pageable);
    }


    @Transactional(readOnly = true)
    public Double obtenerTasaRespuesta() {
        Double tasa = encuestaRepository.calcularTasaRespuesta();
        return tasa != null ? Math.round(tasa * 100.0) / 100.0 : 0.0;
    }

  
    @Scheduled(cron = "0 0 2 * * *")
    @Transactional
    public void marcarEncuestasExpiradas() {
        log.info("🕐 Ejecutando tarea programada: Marcar encuestas expiradas");

        List<EncuestaSatisfaccion> expiradas = encuestaRepository.findEncuestasExpiradas(LocalDateTime.now());

        for (EncuestaSatisfaccion encuesta : expiradas) {
            encuesta.setEstado(EncuestaSatisfaccion.EstadoEncuesta.EXPIRADA);
            encuestaRepository.save(encuesta);
        }

        log.info("✅ Se marcaron {} encuestas como expiradas", expiradas.size());
    }


    @Transactional
    public void reintentarEnvioEncuesta(Long encuestaId) {
        EncuestaSatisfaccion encuesta = encuestaRepository.findById(encuestaId)
                .orElseThrow(() -> new RuntimeException("Encuesta no encontrada"));

        if (encuesta.getEmailEnviadoExitoso()) {
            throw new RuntimeException("El email ya fue enviado exitosamente");
        }

        if (encuesta.getIntentosEnvio() >= 3) {
            throw new RuntimeException("Se alcanzó el máximo de intentos de envío");
        }

        // TODO: Implementar reenvío con datos del trámite
        encuesta.setIntentosEnvio(encuesta.getIntentosEnvio() + 1);
        encuestaRepository.save(encuesta);
    }

  
    @Transactional(readOnly = true)
    public Map<String, Object> obtenerDashboardMetricas(Long areaId, String fechaInicio, String fechaFin) {
        Map<String, Object> dashboard = new HashMap<>();

        try {
    
            Long totalEncuestas = encuestaRepository.count();
            Long encuestasRespondidas = encuestaRepository.countByEstado(EncuestaSatisfaccion.EstadoEncuesta.RESPONDIDA);
            Long encuestasPendientes = encuestaRepository.countByEstado(EncuestaSatisfaccion.EstadoEncuesta.PENDIENTE);

          
            totalEncuestas = totalEncuestas != null ? totalEncuestas : 0L;
            encuestasRespondidas = encuestasRespondidas != null ? encuestasRespondidas : 0L;
            encuestasPendientes = encuestasPendientes != null ? encuestasPendientes : 0L;

            Double tasaRespuesta = totalEncuestas > 0 ? (double) encuestasRespondidas / totalEncuestas * 100 : 0.0;

        dashboard.put("estadisticasGenerales", Map.of(
            "totalEncuestas", totalEncuestas,
            "encuestasRespondidas", encuestasRespondidas,
            "encuestasPendientes", encuestasPendientes,
            "tasaRespuesta", tasaRespuesta
        ));

        List<Map<String, Object>> topTrabajadores = obtenerRankingTrabajadores(1L)
                .stream()
                .limit(10)
                .collect(Collectors.toList());
        dashboard.put("topTrabajadores", topTrabajadores);

        Map<String, Double> promediosPorCriterio = new HashMap<>();
        Double promedioTiempo = encuestaRepository.obtenerPromedioTiempoRespuesta();
        Double promedioCalidad = encuestaRepository.obtenerPromedioCalidadRespuesta();
        Double promedioClaridad = encuestaRepository.obtenerPromedioClaridad();
        Double promedioAmabilidad = encuestaRepository.obtenerPromedioAmabilidad();
        Double promedioResolucion = encuestaRepository.obtenerPromedioResolucion();
        Double promedioGeneral = encuestaRepository.obtenerPromedioGeneral();

        promediosPorCriterio.put("tiempoRespuesta", promedioTiempo != null ? Math.round(promedioTiempo * 100.0) / 100.0 : 0.0);
        promediosPorCriterio.put("calidadRespuesta", promedioCalidad != null ? Math.round(promedioCalidad * 100.0) / 100.0 : 0.0);
        promediosPorCriterio.put("claridad", promedioClaridad != null ? Math.round(promedioClaridad * 100.0) / 100.0 : 0.0);
        promediosPorCriterio.put("amabilidad", promedioAmabilidad != null ? Math.round(promedioAmabilidad * 100.0) / 100.0 : 0.0);
        promediosPorCriterio.put("resolucion", promedioResolucion != null ? Math.round(promedioResolucion * 100.0) / 100.0 : 0.0);
        promediosPorCriterio.put("general", promedioGeneral != null ? Math.round(promedioGeneral * 100.0) / 100.0 : 0.0);
        dashboard.put("promediosPorCriterio", promediosPorCriterio);


        Pageable pageable = PageRequest.of(0, 5);
        List<EncuestaSatisfaccion> encuestasConComentarios = encuestaRepository.obtenerUltimasConComentarios(pageable);
        dashboard.put("comentariosRecientes", encuestasConComentarios);

        Map<Integer, Long> distribucionCalificaciones = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            distribucionCalificaciones.put(i, encuestaRepository.contarPorCalificacionGeneral(i));
        }
        dashboard.put("distribucionCalificaciones", distribucionCalificaciones);

        return dashboard;

        } catch (Exception e) {
            log.error("Error general en obtenerDashboardMetricas: {}", e.getMessage(), e);
            // Retornar dashboard con valores por defecto en caso de error
            return crearDashboardVacio();
        }
    }

    private Map<String, Object> crearDashboardVacio() {
        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("estadisticasGenerales", Map.of(
            "totalEncuestas", 0L,
            "encuestasRespondidas", 0L,
            "encuestasPendientes", 0L,
            "tasaRespuesta", 0.0
        ));

        dashboard.put("topTrabajadores", new ArrayList<>());

        dashboard.put("promediosPorCriterio", Map.of(
            "tiempoRespuesta", 0.0,
            "calidadRespuesta", 0.0,
            "claridad", 0.0,
            "amabilidad", 0.0,
            "resolucion", 0.0,
            "general", 0.0
        ));

        dashboard.put("comentariosRecientes", new ArrayList<>());

        Map<Integer, Long> distribucionCalificaciones = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            distribucionCalificaciones.put(i, 0L);
        }
        dashboard.put("distribucionCalificaciones", distribucionCalificaciones);

        return dashboard;
    }
}