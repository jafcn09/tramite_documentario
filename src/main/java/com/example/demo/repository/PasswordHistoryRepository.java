package com.example.demo.repository;

import com.example.demo.model.PasswordHistory;
import com.example.demo.model.Usuario;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, Long> {
    
    @Query("SELECT ph FROM PasswordHistory ph WHERE ph.usuario = :usuario ORDER BY ph.createdAt DESC")
    List<PasswordHistory> findLastPasswordsByUser(@Param("usuario") Usuario usuario, Pageable pageable);
    
    @Query("SELECT COUNT(ph) FROM PasswordHistory ph WHERE ph.usuario = :usuario")
    long countByUsuario(@Param("usuario") Usuario usuario);
}