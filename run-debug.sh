#!/bin/bash

# Script para ejecutar la aplicación en modo debug
# Esto configura el classpath correctamente para el IDE

cd /Users/jhafetcanepa/Documents/tramite_documentario/back

# Compilar el proyecto si es necesario
echo "Compilando el proyecto..."
./gradlew classes

# Configurar el classpath
CP="build/classes/java/main"
CP="$CP:build/resources/main"

# Agregar todas las dependencias del gradle
for jar in build/libs/*.jar ~/.gradle/caches/modules-2/files-2.1/**/*.jar; do
    if [ -f "$jar" ]; then
        CP="$CP:$jar"
    fi
done

# Ejecutar con debug habilitado
echo "Iniciando aplicación en modo debug..."
echo "Debug port: 5005"
echo "Conecta tu IDE al puerto 5005 para debugging"

java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \
     -cp "$CP" \
     com.example.demo.DemoApplication