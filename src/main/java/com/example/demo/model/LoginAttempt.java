package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "login_attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginAttempt {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username_or_email", nullable = false, length = 150)
    private String usernameOrEmail;
    
    @Column(name = "ip_address", length = 45)
    private String ipAddress;
    
    @Column(name = "attempt_time", nullable = false)
    private LocalDateTime attemptTime;
    
    @Column(name = "success", nullable = false)
    private boolean success;
    
    @Column(name = "failure_reason", length = 255)
    private String failureReason;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    
    @PrePersist
    protected void onCreate() {
        attemptTime = LocalDateTime.now();
    }
}