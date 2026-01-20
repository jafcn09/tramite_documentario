-- Tabla de Reportes de Grados
CREATE TABLE IF NOT EXISTS reportes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    grado_id BIGINT NOT NULL,
    tipo_error VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    email_reportante VARCHAR(100),
    estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME,
    comentario_admin TEXT,
    CONSTRAINT fk_reporte_grado FOREIGN KEY (grado_id) REFERENCES grados(id) ON DELETE CASCADE,
    INDEX idx_reporte_estado (estado),
    INDEX idx_reporte_fecha (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Historial de Búsquedas
CREATE TABLE IF NOT EXISTS historial_busquedas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    grado_id BIGINT NOT NULL,
    tipo_busqueda VARCHAR(20) NOT NULL,
    termino_busqueda VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    fecha_busqueda DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historial_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    CONSTRAINT fk_historial_grado FOREIGN KEY (grado_id) REFERENCES grados(id) ON DELETE CASCADE,
    INDEX idx_historial_usuario_fecha (usuario_id, fecha_busqueda DESC),
    INDEX idx_historial_fecha (fecha_busqueda DESC),
    INDEX idx_historial_grado (grado_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
