#!/bin/bash

# Script para ejecutar la aplicación Spring Boot
cd /Users/jhafetcanepa/Documents/tramite_documentario/back

echo "==================================="
echo "Iniciando aplicación Spring Boot..."
echo "==================================="

# Opción 1: Con Gradle (recomendado)
echo "Ejecutando con Gradle..."
./gradlew bootRun

# Si prefieres ejecutar el JAR directamente, comenta la línea anterior y descomenta esta:
# java -jar build/libs/demo-0.0.1-SNAPSHOT.jar