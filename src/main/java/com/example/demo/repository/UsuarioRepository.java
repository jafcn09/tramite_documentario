package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByCorreo(String correo);
    
    Optional<Usuario> findByUsuario(String usuario);
    
    Optional<Usuario> findByNumDocumento(String numDocumento);
    
    boolean existsByCorreo(String correo);
    
    boolean existsByUsuario(String usuario);
    
    boolean existsByNumDocumento(String numDocumento);
    
    @Query("SELECT u FROM Usuario u ORDER BY u.fechaCreacion DESC")
    List<Usuario> findTop5ByOrderByFechaCreacionDesc();
    
    @Query("SELECT COUNT(u) FROM Usuario u")
    long countTotalUsers();
}