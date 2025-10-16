package com.example.demo.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration(proxyBeanMethods = false)
public class RateLimitConfig {

    private final Map<String, Bucket> bucketCache = new ConcurrentHashMap<>();

    public enum RateLimitType {
        LOGIN(5, Duration.ofMinutes(1)),
        API_GENERAL(60, Duration.ofMinutes(1)),
        FILE_UPLOAD(10, Duration.ofMinutes(1)),
        CREATE_TRAMITE(20, Duration.ofHours(1)),
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

    public Bucket resolveBucket(String key, RateLimitType limitType) {
        return bucketCache.computeIfAbsent(key, k -> createBucket(limitType));
    }

    private Bucket createBucket(RateLimitType limitType) {
        Bandwidth limit = Bandwidth.builder()
            .capacity(limitType.getCapacity())
            .refillIntervally(limitType.getCapacity(), limitType.getRefillDuration())
            .build();

        return Bucket.builder()
            .addLimit(limit)
            .build();
    }

    public boolean tryConsume(String key, RateLimitType limitType) {
        Bucket bucket = resolveBucket(key, limitType);
        return bucket.tryConsume(1);
    }

    public long getAvailableTokens(String key, RateLimitType limitType) {
        Bucket bucket = resolveBucket(key, limitType);
        return bucket.getAvailableTokens();
    }

    public void clearCache() {
        bucketCache.clear();
    }

    public Map<String, Long> getCacheStats() {
        Map<String, Long> stats = new ConcurrentHashMap<>();
        bucketCache.forEach((key, bucket) ->
            stats.put(key, bucket.getAvailableTokens())
        );
        return stats;
    }
}
