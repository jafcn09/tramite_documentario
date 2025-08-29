package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, length = 100)
    private String apellidos;
    
    @Column(unique = true, nullable = false, length = 150)
    private String correo;
    
    @Column(nullable = false, length = 20)
    private String tipoDocumento;
    
    @Column(unique = true, nullable = false, length = 20)
    private String numDocumento;
    
    @Column(nullable = false)
    private String clave;
    
    @Column(unique = true, nullable = false, length = 50)
    private String usuario;
    
    @Column(length = 200)
    private String direccion;
    
    @Column(length = 20)
    private String celular;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String foto;
    
    @Column(name = "password_expiry")
    private LocalDateTime passwordExpiry;
    
    @Column(name = "must_change_password", nullable = false)
    private boolean mustChangePassword = true;
    
    @Column(name = "account_enabled", nullable = false)
    private boolean accountEnabled = true;
    
    @Column(name = "account_locked", nullable = false)
    private boolean accountLocked = false;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
}