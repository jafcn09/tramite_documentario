package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.example.demo.model.Usuario;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "areas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Area {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String nombre;
    
    @Column(length = 500)
    private String descripcion;
    
    @Column(nullable = false)
    private Boolean activa = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "area_padre_id")
    private Area areaPadre;

    @OneToMany(mappedBy = "areaPadre", fetch = FetchType.LAZY)
    private List<Area> subAreas;

    @Column(name = "nivel_jerarquico")
    private Integer nivelJerarquico = 1;

    @Column(name = "codigo_organigrama", length = 50)
    private String codigoOrganigrama;

    @Column(name = "ruta_jerarquica", length = 1000)
    private String rutaJerarquica;

    @OneToMany(mappedBy = "area", fetch = FetchType.LAZY)
    private List<Usuario> usuarios;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}