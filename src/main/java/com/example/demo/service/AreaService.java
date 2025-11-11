package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.AreaRequest;
import com.example.demo.dto.AreaResponse;
import com.example.demo.entity.Area;
import com.example.demo.repository.AreaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
@Transactional
public class AreaService {
    
    @Autowired
    private AreaRepository areaRepository;
    
    public List<AreaResponse> getAllAreas() {
        return areaRepository.findAllOrderByNombre()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public List<AreaResponse> getActiveAreas() {
        return areaRepository.findActiveAreasOrderByNombre()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public Optional<AreaResponse> getAreaById(Long id) {
        return areaRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    public AreaResponse createArea(AreaRequest request) {
        if (areaRepository.existsByNombre(request.getNombre())) {
            throw new IllegalArgumentException("Ya existe un área con el nombre: " + request.getNombre());
        }
        
        Area area = new Area();
        area.setNombre(request.getNombre());
        area.setDescripcion(request.getDescripcion());
        area.setActiva(request.getActiva() != null ? request.getActiva() : true);
        
        Area savedArea = areaRepository.save(area);
        return convertToResponse(savedArea);
    }
    
    public AreaResponse updateArea(Long id, AreaRequest request) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Área no encontrada con id: " + id));

        if (!area.getNombre().equals(request.getNombre()) && 
            areaRepository.existsByNombre(request.getNombre())) {
            throw new IllegalArgumentException("Ya existe un área con el nombre: " + request.getNombre());
        }
        
        area.setNombre(request.getNombre());
        area.setDescripcion(request.getDescripcion());
        area.setActiva(request.getActiva() != null ? request.getActiva() : true);
        
        Area savedArea = areaRepository.save(area);
        return convertToResponse(savedArea);
    }
    
    public void deleteArea(Long id) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Área no encontrada con id: " + id));

        if (area.getUsuarios() != null && !area.getUsuarios().isEmpty()) {
            throw new IllegalArgumentException("No se puede eliminar el área porque tiene usuarios asignados");
        }
        
        areaRepository.delete(area);
    }
    
    public AreaResponse toggleAreaStatus(Long id) {
        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Área no encontrada con id: " + id));
        
        area.setActiva(!area.getActiva());
        Area savedArea = areaRepository.save(area);
        return convertToResponse(savedArea);
    }
    
    private AreaResponse convertToResponse(Area area) {
        AreaResponse response = new AreaResponse();
        response.setId(area.getId());
        response.setNombre(area.getNombre());
        response.setDescripcion(area.getDescripcion());
        response.setActiva(area.getActiva());
        response.setUsuariosCount(area.getUsuarios() != null ? area.getUsuarios().size() : 0);
        response.setCreatedAt(area.getCreatedAt());
        response.setUpdatedAt(area.getUpdatedAt());
        return response;
    }
}