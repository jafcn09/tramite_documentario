-- Script para limpiar datos sensibles de trámites públicos existentes
-- Este script extrae solo la descripción real, eliminando DNI, nombres, email y teléfono

-- IMPORTANTE: Hacer backup antes de ejecutar este script
-- mysqldump -u root -p tramite_documentario tramites > backup_tramites_antes_limpieza.sql

-- Actualizar trámites que tienen el formato "TRÁMITE PÚBLICO" con datos sensibles

