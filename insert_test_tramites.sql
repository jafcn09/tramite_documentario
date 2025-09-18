-- Script para insertar trámites de prueba para el usuario con rol USUARIO

-- Primero encontrar un usuario con rol USUARIO
SET @usuario_id = (SELECT u.id FROM usuarios u 
                   JOIN roles r ON u.role_id = r.id 
                   WHERE r.name = 'USUARIO' 
                   LIMIT 1);

-- Solo insertar si encontramos un usuario
INSERT INTO tramites (
    codigo, titulo, descripcion, tipo, estado, prioridad,
    usuario_solicitante_id, area_origen_id, area_actual_id,
    fecha_creacion, fecha_actualizacion
)
SELECT 
    CONCAT('TRM-2024-', LPAD((@row_num := @row_num + 1), 4, '0')),
    CASE (@row_num % 5)
        WHEN 1 THEN 'Solicitud de Certificado de Notas'
        WHEN 2 THEN 'Constancia de Estudios'
        WHEN 3 THEN 'Solicitud de Diploma'
        WHEN 4 THEN 'Certificado de Conducta'
        ELSE 'Solicitud de Carnet Universitario'
    END,
    'Solicito este documento para fines académicos',
    CASE (@row_num % 3)
        WHEN 1 THEN 'SOLICITUD_CERTIFICADO'
        WHEN 2 THEN 'SOLICITUD_CONSTANCIA'
        ELSE 'TRAMITE_ACADEMICO'
    END,
    CASE (@row_num % 7)
        WHEN 0 THEN 'ENVIADO'
        WHEN 1 THEN 'EN_REVISION'
        WHEN 2 THEN 'APROBADO'
        WHEN 3 THEN 'EN_PROCESO'
        WHEN 4 THEN 'FINALIZADO'
        WHEN 5 THEN 'OBSERVADO'
        ELSE 'DERIVADO'
    END,
    CASE (@row_num % 4)
        WHEN 0 THEN 'BAJA'
        WHEN 1 THEN 'NORMAL'
        WHEN 2 THEN 'ALTA'
        ELSE 'URGENTE'
    END,
    @usuario_id,
    1,
    1,
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 30) DAY),
    DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 15) DAY)
FROM (
    SELECT @row_num := 0
) AS init
CROSS JOIN (
    SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
    UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
) AS numbers
WHERE @usuario_id IS NOT NULL;

-- Mostrar cuántos registros se insertaron
SELECT CONCAT('Se insertaron ', ROW_COUNT(), ' trámites para el usuario ID: ', @usuario_id) AS resultado;