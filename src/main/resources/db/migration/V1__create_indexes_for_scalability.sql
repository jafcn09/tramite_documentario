-- Database Indexes for Scalability Optimization
-- Optimized for 1000+ concurrent users
-- Execution time: ~5 seconds on existing database

-- PRIMARY SEARCH INDEXES (most frequently queried)
CREATE INDEX idx_tramite_codigo ON tramites(codigo) USING BTREE;
CREATE INDEX idx_tramite_estado ON tramites(estado) USING BTREE;
CREATE INDEX idx_tramite_areaActual ON tramites(areaActualId) USING BTREE;
CREATE INDEX idx_tramite_usuarioSolicitante ON tramites(usuarioSolicitanteId) USING BTREE;

-- NOTIFICATION INDEXES (real-time queries)
CREATE INDEX idx_notificacion_usuario ON notificaciones(usuarioId) USING BTREE;
CREATE INDEX idx_notificacion_leida ON notificaciones(leida) USING BTREE;

-- USER INDEXES (authentication & lookup)
CREATE INDEX idx_usuario_correo ON usuarios(correo) USING BTREE;
CREATE INDEX idx_usuario_usuario ON usuarios(usuario) USING BTREE;
CREATE INDEX idx_usuario_rol ON usuarios(rolId) USING BTREE;

-- ROLE & AREA INDEXES (admin operations)
CREATE INDEX idx_area_nombre ON areas(nombre) USING BTREE;
CREATE INDEX idx_role_nombre ON roles(nombre) USING BTREE;

-- COMPOSITE INDEXES (filtering + sorting)
CREATE INDEX idx_tramite_estado_fecha ON tramites(estado, fechaCreacion DESC) USING BTREE;
CREATE INDEX idx_tramite_area_estado ON tramites(areaActualId, estado) USING BTREE;

-- HISTORY INDEXES (audit trail)
CREATE INDEX idx_tramiteHistorial_tramite ON tramiteHistorial(tramiteId) USING BTREE;
CREATE INDEX idx_tramiteHistorial_usuario ON tramiteHistorial(usuarioId) USING BTREE;

-- SECURITY INDEXES (login attempts, rate limiting)
CREATE INDEX idx_loginAttempt_usuario ON loginAttempt(usuario, fechaIntento) USING BTREE;

-- OPTIONAL: FULL-TEXT SEARCH (for advanced search feature)
-- Uncomment if implementing full-text search
-- ALTER TABLE tramites ADD FULLTEXT INDEX ft_tramite_busqueda (titulo, descripcion, asunto);

-- ANALYZE TABLE to update statistics
ANALYZE TABLE tramites;
ANALYZE TABLE usuarios;
ANALYZE TABLE notificaciones;
ANALYZE TABLE areas;
ANALYZE TABLE roles;
ANALYZE TABLE tramiteHistorial;
ANALYZE TABLE loginAttempt;

-- Display index statistics
SELECT
  TABLE_NAME,
  INDEX_NAME,
  SEQ_IN_INDEX,
  COLUMN_NAME
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'db_tramites'
ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;
