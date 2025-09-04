package com.example.demo.repository;

import com.example.demo.model.LoginAttempt;
import com.example.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, Long> {
    
    @Query("SELECT la FROM LoginAttempt la WHERE la.usernameOrEmail = :usernameOrEmail AND la.attemptTime >= :since ORDER BY la.attemptTime DESC")
    List<LoginAttempt> findRecentAttemptsByUsername(@Param("usernameOrEmail") String usernameOrEmail, 
                                                   @Param("since") LocalDateTime since);
    
    @Query("SELECT la FROM LoginAttempt la WHERE la.usuario = :usuario AND la.success = false AND la.attemptTime >= :since")
    List<LoginAttempt> findRecentFailedAttemptsByUser(@Param("usuario") Usuario usuario, 
                                                     @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(la) FROM LoginAttempt la WHERE la.usernameOrEmail = :usernameOrEmail AND la.success = false AND la.attemptTime >= :since")
    long countFailedAttemptsByUsername(@Param("usernameOrEmail") String usernameOrEmail, 
                                      @Param("since") LocalDateTime since);
    
    @Query("SELECT la FROM LoginAttempt la WHERE la.ipAddress = :ipAddress AND la.success = false AND la.attemptTime >= :since")
    List<LoginAttempt> findRecentFailedAttemptsByIP(@Param("ipAddress") String ipAddress, 
                                                   @Param("since") LocalDateTime since);
}