-- Crear tabla encuestas_satisfaccion
CREATE TABLE IF NOT EXISTS encuestas_satisfaccion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tramite_id BIGINT NOT NULL,
    usuario_solicitante_id BIGINT NOT NULL,
    trabajador_evaluado_id BIGINT NOT NULL,
    token VARCHAR(100) NOT NULL UNIQUE,

    -- Calificaciones (1-5 estrellas)
    calificacion_tiempo_respuesta INT,
    calificacion_calidad_respuesta INT,
    calificacion_claridad INT,
    calificacion_amabilidad INT,
    calificacion_resolucion INT,
    calificacion_general DOUBLE,

    -- Comentarios y estado
    comentarios TEXT,
    estado VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',

    -- Fechas
    fecha_limite DATETIME,
    fecha_respuesta DATETIME,

    -- Control de envío
    email_enviado VARCHAR(255) NOT NULL,
    intentos_envio INT DEFAULT 0,
    email_enviado_exitoso BOOLEAN DEFAULT FALSE,

    -- Auditoría
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Índices
    INDEX idx_tramite_id (tramite_id),
    INDEX idx_usuario_solicitante_id (usuario_solicitante_id),
    INDEX idx_trabajador_evaluado_id (trabajador_evaluado_id),
    INDEX idx_token (token),
    INDEX idx_estado (estado),
    INDEX idx_fecha_respuesta (fecha_respuesta),
    INDEX idx_calificacion_general (calificacion_general),

    -- Constraints de calificaciones (1-5)
    CONSTRAINT chk_calificacion_tiempo CHECK (calificacion_tiempo_respuesta IS NULL OR (calificacion_tiempo_respuesta >= 1 AND calificacion_tiempo_respuesta <= 5)),
    CONSTRAINT chk_calificacion_calidad CHECK (calificacion_calidad_respuesta IS NULL OR (calificacion_calidad_respuesta >= 1 AND calificacion_calidad_respuesta <= 5)),
    CONSTRAINT chk_calificacion_claridad CHECK (calificacion_claridad IS NULL OR (calificacion_claridad >= 1 AND calificacion_claridad <= 5)),
    CONSTRAINT chk_calificacion_amabilidad CHECK (calificacion_amabilidad IS NULL OR (calificacion_amabilidad >= 1 AND calificacion_amabilidad <= 5)),
    CONSTRAINT chk_calificacion_resolucion CHECK (calificacion_resolucion IS NULL OR (calificacion_resolucion >= 1 AND calificacion_resolucion <= 5)),

    -- Foreign keys (asumiendo que existen las tablas tramites y usuarios)
    CONSTRAINT fk_encuesta_tramite FOREIGN KEY (tramite_id) REFERENCES tramites(id) ON DELETE CASCADE,
    CONSTRAINT fk_encuesta_usuario_solicitante FOREIGN KEY (usuario_solicitante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_encuesta_trabajador FOREIGN KEY (trabajador_evaluado_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear índice compuesto para búsquedas frecuentes
CREATE INDEX idx_trabajador_estado ON encuestas_satisfaccion (trabajador_evaluado_id, estado);
CREATE INDEX idx_usuario_estado ON encuestas_satisfaccion (usuario_solicitante_id, estado);