package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.model.Tramite;
import com.example.demo.model.Tramite.TipoTramite;
import com.example.demo.model.Tramite.EstadoTramite;
import com.example.demo.entity.Area;
import com.example.demo.repository.TramiteRepository;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ReporteService {

    private final TramiteRepository tramiteRepository;
    private final AreaRepository areaRepository;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;

    public ReporteCompletoDTO generarReporteCompleto(LocalDate fechaInicio, LocalDate fechaFin) {
        // Si no se especifican fechas, usar el mes actual
        if (fechaInicio == null) {
            fechaInicio = LocalDate.now().withDayOfMonth(1);
        }
        if (fechaFin == null) {
            fechaFin = LocalDate.now();
        }

        return ReporteCompletoDTO.builder()
                .resumenGeneral(obtenerResumenGeneral())
                .tramitesPorTipo(obtenerTramitesPorTipo())
                .tramitesUrgentes(obtenerTramitesUrgentes())
                .tramitesPorArea(obtenerTramitesPorArea())
                .tramitesPorUsuario(obtenerTramitesPorUsuario())
                .fechaGeneracion(LocalDateTime.now())
                .periodoInicio(fechaInicio)
                .periodoFin(fechaFin)
                .build();
    }

    public ResumenGeneralDTO obtenerResumenGeneral() {
        List<Tramite> tramites = tramiteRepository.findAll();

        Long totalTramites = (long) tramites.size();
        Long completados = tramites.stream()
                .filter(t -> EstadoTramite.FINALIZADO.equals(t.getEstado()))
                .count();
        Long enProceso = tramites.stream()
                .filter(t -> EstadoTramite.EN_REVISION.equals(t.getEstado()) ||
                           EstadoTramite.APROBADO.equals(t.getEstado()) ||
                           EstadoTramite.DERIVADO.equals(t.getEstado()))
                .count();
        Long vencidos = tramites.stream()
                .filter(t -> t.getFechaVencimiento() != null &&
                           t.getFechaVencimiento().isBefore(LocalDateTime.now()) &&
                           !EstadoTramite.FINALIZADO.equals(t.getEstado()))
                .count();
        Long rechazados = tramites.stream()
                .filter(t -> EstadoTramite.RECHAZADO.equals(t.getEstado()))
                .count();
        Long observados = tramites.stream()
                .filter(t -> EstadoTramite.OBSERVADO.equals(t.getEstado()))
                .count();

        return ResumenGeneralDTO.builder()
                .totalTramites(totalTramites)
                .completados(completados)
                .enProceso(enProceso)
                .vencidos(vencidos)
                .rechazados(rechazados)
                .observados(observados)
                .build();
    }

    public List<TramitePorTipoDTO> obtenerTramitesPorTipo() {
        List<Tramite> tramites = tramiteRepository.findAll();
        Map<TipoTramite, List<Tramite>> tramitesPorTipo = tramites.stream()
                .collect(Collectors.groupingBy(Tramite::getTipo));

        return tramitesPorTipo.entrySet().stream()
                .map(entry -> {
                    TipoTramite tipo = entry.getKey();
                    List<Tramite> tramitesDeTipo = entry.getValue();

                    Long cantidad = (long) tramitesDeTipo.size();
                    Long completados = tramitesDeTipo.stream()
                            .filter(t -> EstadoTramite.FINALIZADO.equals(t.getEstado()))
                            .count();
                    Long pendientes = cantidad - completados;

                    return TramitePorTipoDTO.builder()
                            .tipo(formatearTipo(tipo))
                            .cantidad(cantidad)
                            .completados(completados)
                            .pendientes(pendientes)
                            .build();
                })
                .sorted((a, b) -> b.getCantidad().compareTo(a.getCantidad()))
                .collect(Collectors.toList());
    }

    public List<TramiteUrgenteDTO> obtenerTramitesUrgentes() {
        LocalDate hoy = LocalDate.now();

        // Obtener trámites vencidos o que vencen pronto
        List<Tramite> tramitesUrgentes = tramiteRepository.findAll().stream()
                .filter(t -> !EstadoTramite.FINALIZADO.equals(t.getEstado()) &&
                           !EstadoTramite.RECHAZADO.equals(t.getEstado()) &&
                           t.getFechaVencimiento() != null)
                .filter(t -> {
                    long diasHastaVencimiento = ChronoUnit.DAYS.between(hoy, t.getFechaVencimiento().toLocalDate());
                    return diasHastaVencimiento <= 3; 
                })
                .sorted((a, b) -> a.getFechaVencimiento().compareTo(b.getFechaVencimiento()))
                .limit(10) // Limitar a los 10 más urgentes
                .collect(Collectors.toList());

        return tramitesUrgentes.stream()
                .map(t -> {
                    long diasVencido = ChronoUnit.DAYS.between(t.getFechaVencimiento().toLocalDate(), hoy);
                    String responsable = "Sin asignar";

                    if (t.getUsuarioAsignadoId() != null) {
                        try {
                            var usuario = usuarioService.obtenerUsuarioPorId(t.getUsuarioAsignadoId());
                            responsable = usuario.getNombre() + " " + usuario.getApellidos();
                        } catch (Exception e) {
                            log.warn("No se pudo obtener el usuario asignado: {}", e.getMessage());
                        }
                    }

                    return TramiteUrgenteDTO.builder()
                            .id(t.getId())
                            .codigo(t.getCodigo())
                            .asunto(t.getAsunto())
                            .tipo(formatearTipo(t.getTipo()))
                            .estado(formatearEstado(t.getEstado()))
                            .diasVencido((int) diasVencido)
                            .responsable(responsable)
                            .fechaVencimiento(t.getFechaVencimiento().toLocalDate())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public List<TramitePorAreaDTO> obtenerTramitesPorArea() {
        List<Area> areas = areaRepository.findAll();
        List<Tramite> tramites = tramiteRepository.findAll();

        return areas.stream()
                .map(area -> {
                    List<Tramite> tramitesDelArea = tramites.stream()
                            .filter(t -> area.getId().equals(t.getAreaActualId()))
                            .collect(Collectors.toList());

                    Long total = (long) tramitesDelArea.size();
                    Long completados = tramitesDelArea.stream()
                            .filter(t -> EstadoTramite.FINALIZADO.equals(t.getEstado()))
                            .count();
                    Long enProceso = total - completados;
                    Double porcentajeCompletado = total > 0 ?
                            (completados * 100.0 / total) : 0.0;

                    return TramitePorAreaDTO.builder()
                            .area(area.getNombre())
                            .total(total)
                            .completados(completados)
                            .enProceso(enProceso)
                            .porcentajeCompletado(Math.round(porcentajeCompletado * 100.0) / 100.0)
                            .build();
                })
                .filter(dto -> dto.getTotal() > 0) // Solo áreas con trámites
                .sorted((a, b) -> b.getTotal().compareTo(a.getTotal()))
                .collect(Collectors.toList());
    }

    public List<TramitePorUsuarioDTO> obtenerTramitesPorUsuario() {
        List<Tramite> tramites = tramiteRepository.findAll();

        // Agrupar trámites por usuario asignado
        Map<Long, List<Tramite>> tramitesPorUsuario = tramites.stream()
                .filter(t -> t.getUsuarioAsignadoId() != null)
                .collect(Collectors.groupingBy(Tramite::getUsuarioAsignadoId));

        return tramitesPorUsuario.entrySet().stream()
                .map(entry -> {
                    Long usuarioId = entry.getKey();
                    List<Tramite> tramitesDelUsuario = entry.getValue();

                    String nombreUsuario = "Usuario " + usuarioId;
                    String areaUsuario = "Sin área";

                    try {
                        var usuario = usuarioService.obtenerUsuarioPorId(usuarioId);
                        nombreUsuario = usuario.getNombre() + " " + usuario.getApellidos();
                        areaUsuario = usuario.getArea() != null ? usuario.getArea().getNombre() : "Sin área";
                    } catch (Exception e) {
                        log.warn("No se pudo obtener información del usuario {}: {}", usuarioId, e.getMessage());
                    }

                    Long tramitesCreados = tramitesDelUsuario.stream()
                            .filter(t -> usuarioId.equals(t.getUsuarioSolicitanteId()))
                            .count();

                    Long tramitesProcesados = tramitesDelUsuario.stream()
                            .filter(t -> EstadoTramite.FINALIZADO.equals(t.getEstado()) ||
                                       EstadoTramite.APROBADO.equals(t.getEstado()))
                            .count();

                    Long tramitesRechazados = tramitesDelUsuario.stream()
                            .filter(t -> EstadoTramite.RECHAZADO.equals(t.getEstado()))
                            .count();

                    // Calcular promedio de tiempo de respuesta
                    Double promedioTiempo = tramitesDelUsuario.stream()
                            .filter(t -> t.getFechaRespuesta() != null && t.getFechaCreacion() != null)
                            .mapToLong(t -> ChronoUnit.DAYS.between(
                                    t.getFechaCreacion().toLocalDate(),
                                    t.getFechaRespuesta().toLocalDate()))
                            .average()
                            .orElse(0.0);

                    return TramitePorUsuarioDTO.builder()
                            .usuario(nombreUsuario)
                            .area(areaUsuario)
                            .tramitesCreados(tramitesCreados)
                            .tramitesProcesados(tramitesProcesados)
                            .tramitesRechazados(tramitesRechazados)
                            .promedioTiempoRespuesta(Math.round(promedioTiempo * 10.0) / 10.0)
                            .build();
                })
                .sorted((a, b) -> b.getTramitesProcesados().compareTo(a.getTramitesProcesados()))
                .limit(10) // Top 10 usuarios
                .collect(Collectors.toList());
    }

    public byte[] generarReporteExcel(LocalDate fechaInicio, LocalDate fechaFin) {
        // Implementación simplificada - en producción usar Apache POI
        ReporteCompletoDTO reporte = generarReporteCompleto(fechaInicio, fechaFin);

        StringBuilder csv = new StringBuilder();
        csv.append("REPORTE DE TRAMITES - SISTEMA DE GESTION DOCUMENTARIA\n");
        csv.append("Fecha de generacion: ").append(LocalDateTime.now()).append("\n\n");

        csv.append("RESUMEN GENERAL\n");
        csv.append("Total Tramites,").append(reporte.getResumenGeneral().getTotalTramites()).append("\n");
        csv.append("Completados,").append(reporte.getResumenGeneral().getCompletados()).append("\n");
        csv.append("En Proceso,").append(reporte.getResumenGeneral().getEnProceso()).append("\n");
        csv.append("Vencidos,").append(reporte.getResumenGeneral().getVencidos()).append("\n\n");

        csv.append("TRAMITES POR TIPO\n");
        csv.append("Tipo,Cantidad,Completados,Pendientes\n");
        reporte.getTramitesPorTipo().forEach(t -> {
            csv.append(t.getTipo()).append(",")
               .append(t.getCantidad()).append(",")
               .append(t.getCompletados()).append(",")
               .append(t.getPendientes()).append("\n");
        });

        return csv.toString().getBytes();
    }

    public byte[] generarReportePDF(LocalDate fechaInicio, LocalDate fechaFin) {
        // Implementación simplificada - en producción usar una librería de PDF
        ReporteCompletoDTO reporte = generarReporteCompleto(fechaInicio, fechaFin);

        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html><html><head><title>Reporte de Trámites</title></head><body>");
        html.append("<h1>REPORTE DE TRAMITES</h1>");
        html.append("<p>Fecha de generación: ").append(LocalDateTime.now()).append("</p>");
        html.append("<h2>Resumen General</h2>");
        html.append("<ul>");
        html.append("<li>Total Trámites: ").append(reporte.getResumenGeneral().getTotalTramites()).append("</li>");
        html.append("<li>Completados: ").append(reporte.getResumenGeneral().getCompletados()).append("</li>");
        html.append("<li>En Proceso: ").append(reporte.getResumenGeneral().getEnProceso()).append("</li>");
        html.append("<li>Vencidos: ").append(reporte.getResumenGeneral().getVencidos()).append("</li>");
        html.append("</ul>");
        html.append("</body></html>");

        return html.toString().getBytes();
    }

    private String formatearTipo(TipoTramite tipo) {
        if (tipo == null) return "Sin tipo";
        String nombre = tipo.name().replace("_", " ");
        return nombre.substring(0, 1).toUpperCase() + nombre.substring(1).toLowerCase();
    }

    private String formatearEstado(EstadoTramite estado) {
        if (estado == null) return "Sin estado";
        String nombre = estado.name().replace("_", " ");
        return nombre.substring(0, 1).toUpperCase() + nombre.substring(1).toLowerCase();
    }
}