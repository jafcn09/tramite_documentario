
CREATE TABLE IF NOT EXISTS roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS areas (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  descripcion VARCHAR(500),
  activa BOOLEAN DEFAULT TRUE,
  area_padre_id BIGINT,
  nivel_jerarquico INT DEFAULT 1,
  codigo_organigrama VARCHAR(50),
  ruta_jerarquica VARCHAR(1000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (area_padre_id) REFERENCES areas(id) ON DELETE SET NULL,
  INDEX idx_nombre (nombre),
  INDEX idx_activa (activa),
  INDEX idx_area_padre (area_padre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS usuarios (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  tipo_documento VARCHAR(20) NOT NULL,
  num_documento VARCHAR(20) UNIQUE NOT NULL,
  usuario VARCHAR(50) UNIQUE NOT NULL,
  clave VARCHAR(255) NOT NULL,
  celular VARCHAR(20),
  direccion VARCHAR(200),
  foto LONGTEXT,
  password_expiry DATETIME,
  must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
  account_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  account_locked BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  role_id BIGINT NOT NULL,
  area_id BIGINT,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE SET NULL,
  INDEX idx_correo (correo),
  INDEX idx_usuario (usuario),
  INDEX idx_num_documento (num_documento),
  INDEX idx_role_id (role_id),
  INDEX idx_area_id (area_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS tramites (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion LONGTEXT,
  asunto VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  estado VARCHAR(50) NOT NULL DEFAULT 'BORRADOR',
  prioridad VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
  usuario_solicitante_id BIGINT NOT NULL,
  usuario_asignado_id BIGINT,
  area_actual_id BIGINT,
  area_origen_id BIGINT,
  fecha_vencimiento DATETIME,
  fecha_completado DATETIME,
  observaciones LONGTEXT,
  numero_expediente VARCHAR(50),
  documentos_adjuntos JSON,
  calificacion INT,
  comentario_calificacion LONGTEXT,
  respuesta LONGTEXT,
  archivos_respuesta JSON,
  fecha_respuesta DATETIME,
  usuario_respondio_id BIGINT,
  contador_procesados INT DEFAULT 0,
  contador_por_procesar INT DEFAULT 0,
  contador_rechazados INT DEFAULT 0,
  qr_code VARCHAR(255) UNIQUE,
  qr_url VARCHAR(512),
  qr_generado_fecha DATETIME,
  qr_escaneos INT DEFAULT 0,
  firma_digital_activa BOOLEAN DEFAULT FALSE,
  requiere_biometria BOOLEAN DEFAULT FALSE,
  firma_valida BOOLEAN DEFAULT FALSE,
  hash_firma LONGTEXT,
  fecha_firma DATETIME,
  metodo_verificacion VARCHAR(100),
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (usuario_solicitante_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  FOREIGN KEY (usuario_asignado_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (usuario_respondio_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (area_actual_id) REFERENCES areas(id) ON DELETE SET NULL,
  FOREIGN KEY (area_origen_id) REFERENCES areas(id) ON DELETE SET NULL,
  INDEX idx_codigo (codigo),
  INDEX idx_estado (estado),
  INDEX idx_usuario_solicitante (usuario_solicitante_id),
  INDEX idx_usuario_asignado (usuario_asignado_id),
  INDEX idx_area_actual (area_actual_id),
  INDEX idx_deleted_at (deleted_at),
  INDEX idx_fecha_creacion (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS tramite_historial (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tramite_id BIGINT NOT NULL,
  usuario_id BIGINT NOT NULL,
  accion VARCHAR(50) NOT NULL,
  estado_anterior VARCHAR(50),
  estado_nuevo VARCHAR(50),
  area_origen_id BIGINT,
  area_destino_id BIGINT,
  usuario_anterior_id BIGINT,
  usuario_nuevo_id BIGINT,
  observaciones LONGTEXT,
  motivo LONGTEXT,
  fecha_accion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tramite_id) REFERENCES tramites(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  FOREIGN KEY (area_origen_id) REFERENCES areas(id) ON DELETE SET NULL,
  FOREIGN KEY (area_destino_id) REFERENCES areas(id) ON DELETE SET NULL,
  FOREIGN KEY (usuario_anterior_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (usuario_nuevo_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_tramite_id (tramite_id),
  INDEX idx_usuario_id (usuario_id),
  INDEX idx_fecha_accion (fecha_accion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS firma_digital (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tramite_id BIGINT NOT NULL,
  firmante_id BIGINT NOT NULL,
  tipo_firma VARCHAR(50) NOT NULL,
  estado_firma VARCHAR(50) NOT NULL,
  documento_original_path VARCHAR(500),
  documento_firmado_path VARCHAR(500),
  hash_documento VARCHAR(255),
  certificado_serial VARCHAR(255),
  algoritmo_firma VARCHAR(100),
  fecha_firma DATETIME,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_vencimiento DATETIME,
  razon_firma VARCHAR(500),
  ubicacion_firma VARCHAR(200),
  contacto_firmante VARCHAR(200),
  ip_firma VARCHAR(45),
  user_agent VARCHAR(500),
  validacion_certificado BOOLEAN,
  motivo_invalidacion VARCHAR(1000),
  observaciones LONGTEXT,
  autorizado_por BIGINT,
  fecha_autorizacion DATETIME,
  motivo_autorizacion VARCHAR(1000),
  estado_autorizacion VARCHAR(50),
  documentos_adjuntos JSON,
  hash_documentos_adjuntos VARCHAR(500),
  cantidad_documentos INT,
  nivel_autorizacion_requerido INT,
  requiere_pin_adicional BOOLEAN,
  token_autorizacion VARCHAR(255),
  expira_en DATETIME,
  FOREIGN KEY (tramite_id) REFERENCES tramites(id) ON DELETE CASCADE,
  FOREIGN KEY (firmante_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  FOREIGN KEY (autorizado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_tramite_id (tramite_id),
  INDEX idx_firmante_id (firmante_id),
  INDEX idx_estado_firma (estado_firma)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS notificaciones (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_destinatario_id BIGINT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  mensaje LONGTEXT,
  tipo VARCHAR(20) NOT NULL,
  prioridad VARCHAR(20) NOT NULL,
  es_leida BOOLEAN NOT NULL DEFAULT FALSE,
  tramite_relacionado_id BIGINT,
  area_origen_id BIGINT,
  usuario_emisor_id BIGINT,
  ruta_destino VARCHAR(255),
  fecha_vencimiento DATETIME,
  metadatos JSON,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_lectura DATETIME,
  FOREIGN KEY (usuario_destinatario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (tramite_relacionado_id) REFERENCES tramites(id) ON DELETE SET NULL,
  FOREIGN KEY (area_origen_id) REFERENCES areas(id) ON DELETE SET NULL,
  FOREIGN KEY (usuario_emisor_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_usuario_destinatario (usuario_destinatario_id),
  INDEX idx_es_leida (es_leida),
  INDEX idx_fecha_creacion (fecha_creacion),
  INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS login_attempts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username_or_email VARCHAR(150) NOT NULL,
  ip_address VARCHAR(45),
  success BOOLEAN NOT NULL DEFAULT FALSE,
  failure_reason VARCHAR(255),
  attempt_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_id BIGINT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_username_or_email (username_or_email),
  INDEX idx_ip_address (ip_address),
  INDEX idx_attempt_time (attempt_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS password_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario_id (usuario_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT IGNORE INTO roles (id, name, description) VALUES
(1, 'admin', 'Administrador del sistema'),
(2, 'administrativo', 'Personal administrativo'),
(3, 'usuario', 'Usuario regular'),
(4, 'estudiante', 'Estudiante');

INSERT IGNORE INTO areas (id, nombre, descripcion, activa, nivel_jerarquico) VALUES
(1, 'Administración General', 'Área administrativa general', TRUE, 1);