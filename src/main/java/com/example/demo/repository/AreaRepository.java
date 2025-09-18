package com.example.demo.repository;

import com.example.demo.entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {
    
    Optional<Area> findByNombre(String nombre);
    
    boolean existsByNombre(String nombre);
    
    List<Area> findByActivaTrue();
    
    @Query("SELECT a FROM Area a ORDER BY a.nombre ASC")
    List<Area> findAllOrderByNombre();
    
    @Query("SELECT a FROM Area a WHERE a.activa = true ORDER BY a.nombre ASC")
    List<Area> findActiveAreasOrderByNombre();
}