package com.example.demo.service;

import com.example.demo.dto.HistorialBusquedaResponse;
import com.example.demo.entity.Grado;
import com.example.demo.entity.HistorialBusqueda;
import com.example.demo.model.Usuario;
import com.example.demo.repository.GradoRepository;
import com.example.demo.repository.HistorialBusquedaRepository;
import com.example.demo.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistorialBusquedaService {

    private final HistorialBusquedaRepository historialRepository;
    private final GradoRepository gradoRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public void registrarBusqueda(Long gradoId, Long usuarioId, String tipoBusqueda,
                                   String terminoBusqueda, HttpServletRequest request) {
        Grado grado = gradoRepository.findById(gradoId)
                .orElseThrow(() -> new RuntimeException("Grado no encontrado"));

        Usuario usuario = null;
        if (usuarioId != null) {
            usuario = usuarioRepository.findById(usuarioId).orElse(null);
        }

        String ipAddress = obtenerIpAddress(request);
        String userAgent = request.getHeader("User-Agent");

        HistorialBusqueda historial = HistorialBusqueda.builder()
                .grado(grado)
                .usuario(usuario)
                .tipoBusqueda(tipoBusqueda)
                .terminoBusqueda(terminoBusqueda)
                .ipAddress(ipAddress)
                .userAgent(userAgent)
                .build();

        historialRepository.save(historial);
    }

    public Page<HistorialBusquedaResponse> obtenerHistorialUsuario(Long usuarioId, Pageable pageable) {
        return historialRepository.findByUsuarioId(usuarioId, pageable)
                .map(HistorialBusquedaResponse::fromEntity);
    }

    public List<HistorialBusquedaResponse> obtenerUltimasBusquedasUsuario(Long usuarioId, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return historialRepository.findByUsuarioIdLimit(usuarioId, pageable).stream()
                .map(HistorialBusquedaResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Map<String, Object> obtenerEstadisticas() {
        LocalDateTime hace24Horas = LocalDateTime.now().minusDays(1);
        LocalDateTime hace7Dias = LocalDateTime.now().minusDays(7);
        LocalDateTime hace30Dias = LocalDateTime.now().minusDays(30);

        return Map.of(
                "totalBusquedas", historialRepository.count(),
                "busquedasUltimas24h", historialRepository.countBusquedasDesde(hace24Horas),
                "busquedasUltimos7Dias", historialRepository.countBusquedasDesde(hace7Dias),
                "busquedasUltimos30Dias", historialRepository.countBusquedasDesde(hace30Dias),
                "gradosUnicosConsultados", historialRepository.countGradosUnicos()
        );
    }

    public List<Map<String, Object>> obtenerTerminosMasBuscados(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return historialRepository.findTerminosMasBuscados(pageable).stream()
                .map(obj -> Map.<String, Object>of(
                        "termino", obj[0],
                        "cantidad", obj[1]
                ))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> obtenerBusquedasPorTipo() {
        return historialRepository.countByTipoBusqueda().stream()
                .map(obj -> Map.<String, Object>of(
                        "tipoBusqueda", obj[0],
                        "cantidad", obj[1]
                ))
                .collect(Collectors.toList());
    }

    private String obtenerIpAddress(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }
}
