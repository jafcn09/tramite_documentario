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
    private final Map<String, Bucket> dailyBucketCache = new ConcurrentHashMap<>();

    public enum RateLimitType {
  
        LOGIN(5, Duration.ofMinutes(1), 20, Duration.ofDays(1)),
        REFRESH_TOKEN(100, Duration.ofHours(1), 0, null),
        PASSWORD_CHANGE(5, Duration.ofDays(1), 0, null),


        CREATE_TRAMITE(3, Duration.ofHours(1), 10, Duration.ofDays(1)),
        EDIT_TRAMITE(20, Duration.ofHours(1), 50, Duration.ofDays(1)),
        WORKFLOW_TRAMITE(50, Duration.ofHours(1), 200, Duration.ofDays(1)),
        SEARCH_TRAMITE(100, Duration.ofMinutes(1), 1000, Duration.ofDays(1)),

        // File operations
        FILE_UPLOAD(10, Duration.ofMinutes(1), 100, Duration.ofDays(1)),
        FILE_DOWNLOAD(50, Duration.ofHours(1), 500, Duration.ofDays(1)),

        // User operations
        CREATE_USER(10, Duration.ofHours(1), 20, Duration.ofDays(1)),
        UPDATE_USER(20, Duration.ofHours(1), 50, Duration.ofDays(1)),

        // Notifications and realtime
        NOTIFICATIONS(200, Duration.ofHours(1), 0, null),
        BANDEJA(300, Duration.ofHours(1), 0, null),

        // Reports
        REPORT_HEAVY(10, Duration.ofHours(1), 30, Duration.ofDays(1)),
        REPORT_LIGHT(30, Duration.ofHours(1), 100, Duration.ofDays(1)),

        // Public endpoints (by IP)
        PUBLIC_CREATE(2, Duration.ofHours(1), 5, Duration.ofDays(1)),
        PUBLIC_SEARCH(50, Duration.ofHours(1), 200, Duration.ofDays(1)),
        PUBLIC_QR(100, Duration.ofHours(1), 500, Duration.ofDays(1)),

        // General API
        API_GENERAL(60, Duration.ofMinutes(1), 2000, Duration.ofDays(1)),

    
        SEARCH(100, Duration.ofMinutes(1), 1000, Duration.ofDays(1)),


        NO_LIMIT(Long.MAX_VALUE, Duration.ofDays(365), 0, null);

        private final long shortTermCapacity;
        private final Duration shortTermDuration;
        private final long dailyCapacity;
        private final Duration dailyDuration;

        RateLimitType(long shortTermCapacity, Duration shortTermDuration,
                     long dailyCapacity, Duration dailyDuration) {
            this.shortTermCapacity = shortTermCapacity;
            this.shortTermDuration = shortTermDuration;
            this.dailyCapacity = dailyCapacity;
            this.dailyDuration = dailyDuration;
        }

        public long getCapacity() {
            return shortTermCapacity;
        }

        public Duration getRefillDuration() {
            return shortTermDuration;
        }

        public long getDailyCapacity() {
            return dailyCapacity;
        }

        public Duration getDailyDuration() {
            return dailyDuration;
        }

        public boolean hasDailyLimit() {
            return dailyCapacity > 0 && dailyDuration != null;
        }
    }

    public Bucket resolveBucket(String key, RateLimitType limitType) {
        return bucketCache.computeIfAbsent(key, k -> createBucket(limitType));
    }

    public Bucket resolveDailyBucket(String key, RateLimitType limitType) {
        if (!limitType.hasDailyLimit()) {
            return null;
        }
        String dailyKey = key + ":daily:" + java.time.LocalDate.now();
        return dailyBucketCache.computeIfAbsent(dailyKey, k -> createDailyBucket(limitType));
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

    private Bucket createDailyBucket(RateLimitType limitType) {
        Bandwidth limit = Bandwidth.builder()
            .capacity(limitType.getDailyCapacity())
            .refillIntervally(limitType.getDailyCapacity(), limitType.getDailyDuration())
            .build();

        return Bucket.builder()
            .addLimit(limit)
            .build();
    }

    public boolean tryConsume(String key, RateLimitType limitType) {
        // Check short-term limit
        Bucket bucket = resolveBucket(key, limitType);
        if (!bucket.tryConsume(1)) {
            return false;
        }

        // Check daily limit if exists
        if (limitType.hasDailyLimit()) {
            Bucket dailyBucket = resolveDailyBucket(key, limitType);
            if (!dailyBucket.tryConsume(1)) {
                // Rollback short-term consumption
                return false;
            }
        }

        return true;
    }

    public long getAvailableTokens(String key, RateLimitType limitType) {
        Bucket bucket = resolveBucket(key, limitType);
        long shortTermTokens = bucket.getAvailableTokens();

        if (limitType.hasDailyLimit()) {
            Bucket dailyBucket = resolveDailyBucket(key, limitType);
            long dailyTokens = dailyBucket.getAvailableTokens();
            return Math.min(shortTermTokens, dailyTokens);
        }

        return shortTermTokens;
    }

    public RateLimitStatus getRateLimitStatus(String key, RateLimitType limitType) {
        long shortTermAvailable = resolveBucket(key, limitType).getAvailableTokens();
        Long dailyAvailable = null;

        if (limitType.hasDailyLimit()) {
            dailyAvailable = resolveDailyBucket(key, limitType).getAvailableTokens();
        }

        return new RateLimitStatus(
            limitType.getCapacity(),
            shortTermAvailable,
            limitType.getDailyCapacity(),
            dailyAvailable
        );
    }

    public void clearCache() {
        bucketCache.clear();
        dailyBucketCache.clear();
    }

    public void clearExpiredDailyBuckets() {
        String today = java.time.LocalDate.now().toString();
        dailyBucketCache.entrySet().removeIf(entry -> !entry.getKey().contains(today));
    }

    public Map<String, Long> getCacheStats() {
        Map<String, Long> stats = new ConcurrentHashMap<>();
        bucketCache.forEach((key, bucket) ->
            stats.put(key, bucket.getAvailableTokens())
        );
        dailyBucketCache.forEach((key, bucket) ->
            stats.put(key, bucket.getAvailableTokens())
        );
        return stats;
    }

    public static class RateLimitStatus {
        public final long shortTermLimit;
        public final long shortTermRemaining;
        public final long dailyLimit;
        public final Long dailyRemaining;

        public RateLimitStatus(long shortTermLimit, long shortTermRemaining,
                              long dailyLimit, Long dailyRemaining) {
            this.shortTermLimit = shortTermLimit;
            this.shortTermRemaining = shortTermRemaining;
            this.dailyLimit = dailyLimit;
            this.dailyRemaining = dailyRemaining;
        }
    }
}
