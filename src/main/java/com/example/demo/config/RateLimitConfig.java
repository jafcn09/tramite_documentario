package com.example.demo.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.local.LocalBucket;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Configuración de Rate Limiting usando Bucket4j
 * Previene ataques de fuerza bruta y abuso de la API
 */
@Configuration(proxyBeanMethods = false)
@Slf4j
public class RateLimitConfig {

    // Cache de buckets por IP/usuario
    private final Map<String, Bucket> bucketCache = new ConcurrentHashMap<>();

    /**
     * Límites de rate limiting por tipo de endpoint
     */
    public enum RateLimitType {
        // Login: 5 intentos por minuto
        LOGIN(5, Duration.ofMinutes(1)),

        // API General: 60 requests por minuto
        API_GENERAL(60, Duration.ofMinutes(1)),

        // Upload de archivos: 10 uploads por minuto
        FILE_UPLOAD(10, Duration.ofMinutes(1)),

        // Creación de trámites: 20 por hora
        CREATE_TRAMITE(20, Duration.ofHours(1)),

        // Búsqueda: 100 por minuto
        SEARCH(100, Duration.ofMinutes(1));

        private final long capacity;
        private final Duration refillDuration;

        RateLimitType(long capacity, Duration refillDuration) {
            this.capacity = capacity;
            this.refillDuration = refillDuration;
        }

        public long getCapacity() {
            return capacity;
        }

        public Duration getRefillDuration() {
            return refillDuration;
        }
    }

    /**
     * Obtiene o crea un bucket para una clave específica (IP o usuario)
     */
    public Bucket resolveBucket(String key, RateLimitType limitType) {
        return bucketCache.computeIfAbsent(key, k -> createBucket(limitType));
    }

    /**
     * Crea un nuevo bucket con los límites especificados
     */
    private Bucket createBucket(RateLimitType limitType) {
        Bandwidth limit = Bandwidth.builder()
            .capacity(limitType.getCapacity())
            .refillIntervally(limitType.getCapacity(), limitType.getRefillDuration())
            .build();

        return Bucket.builder()
            .addLimit(limit)
            .build();
    }

    /**
     * Verifica si una request está permitida bajo los límites
     */
    public boolean tryConsume(String key, RateLimitType limitType) {
        Bucket bucket = resolveBucket(key, limitType);
        boolean consumed = bucket.tryConsume(1);

        if (!consumed) {
            log.warn("⚠️ Rate limit excedido para key: {} en endpoint tipo: {}",
                key, limitType.name());
        }

        return consumed;
    }

    /**
     * Obtiene tokens disponibles para una key
     */
    public long getAvailableTokens(String key, RateLimitType limitType) {
        Bucket bucket = resolveBucket(key, limitType);
        return bucket.getAvailableTokens();
    }

    /**
     * Limpia el cache de buckets (útil para testing)
     */
    public void clearCache() {
        bucketCache.clear();
        log.info("✅ Cache de rate limiting limpiado");
    }

    /**
     * Obtiene estadísticas del cache
     */
    public Map<String, Long> getCacheStats() {
        Map<String, Long> stats = new ConcurrentHashMap<>();
        bucketCache.forEach((key, bucket) ->
            stats.put(key, bucket.getAvailableTokens())
        );
        return stats;
    }
}
