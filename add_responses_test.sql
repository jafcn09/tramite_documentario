-- Script para agregar respuestas a trámites finalizados
-- Esto simulará respuestas del administrativo

-- Encontrar trámites finalizados
UPDATE tramites t
SET 
    respuesta = CASE 
        WHEN t.tipo = 'SOLICITUD_CERTIFICADO' THEN 'Su certificado de notas ha sido procesado y está listo para recoger en la oficina de registros académicos. Por favor, presente su documento de identidad.'
        WHEN t.tipo = 'SOLICITUD_CONSTANCIA' THEN 'Su constancia de estudios ha sido emitida correctamente. Puede recogerla en ventanilla de lunes a viernes de 8:00 AM a 4:00 PM.'
        WHEN t.tipo = 'TRAMITE_ACADEMICO' THEN 'Su trámite académico ha sido procesado exitosamente. Los documentos solicitados están disponibles para descarga en su portal estudiantil.'
        ELSE 'Su solicitud ha sido procesada correctamente. Por favor, acérquese a la oficina correspondiente para recoger su documento.'
    END,
    fecha_respuesta = DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 5) DAY),
    usuario_respondio_id = (
        SELECT u.id FROM usuarios u 
        JOIN roles r ON u.role_id = r.id 
        WHERE r.name IN ('ADMIN', 'ADMINISTRATIVO') 
        LIMIT 1
    )
WHERE t.estado = 'FINALIZADO' 
  AND t.respuesta IS NULL
  AND t.id <= 10; -- Solo actualizar los primeros 10

-- Mostrar los trámites actualizados
SELECT 
    t.codigo,
    t.titulo,
    t.estado,
    SUBSTRING(t.respuesta, 1, 50) as respuesta_preview,
    t.fecha_respuesta,
    u.nombre as respondido_por
FROM tramites t
LEFT JOIN usuarios u ON t.usuario_respondio_id = u.id
WHERE t.respuesta IS NOT NULL
ORDER BY t.fecha_respuesta DESC;