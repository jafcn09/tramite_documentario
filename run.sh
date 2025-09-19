#!/bin/bash

# Load environment variables from .env file
export DB_USER=root
export DB_PASSWORD=Martin2024
export DB_HOST=3306
export DB_PORT=8080
export DB_NAME=db_tramites
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587
export MAIL_USERNAME=jafcnepamace24@gmail.com
export MAIL_PASSWORD=gumwkmvmkqbczusm
export JWT_SECRET=mySecretKeyForJWTTokenGenerationPleaseChangeThis
export JWT_EXPIRATION=86400000
export ADMIN_USERNAME=admin
export ADMIN_PASSWORD=admin123
export SERVER_PORT=8081

# Run the Spring Boot application
./gradlew bootRun