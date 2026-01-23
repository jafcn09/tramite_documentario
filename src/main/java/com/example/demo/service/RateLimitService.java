package com.example.demo.service;

import com.example.demo.config.RateLimitConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class RateLimitService {


    private final Map<String, RateLimitEntry> rateLimitMap = new ConcurrentHashMap<>();
    private final Map<LocalDate, AtomicInteger> globalDailyCounter = new ConcurrentHashMap<>();
    private final Map<String, DailyLimitEntry> userDailyLimits = new ConcurrentHashMap<>();


    private static final int MAX_REQUESTS = 5;
    private static final long TIME_WINDOW_MS = 60000;


    private final RedisTemplate<String, String> redisTemplate;
    private final RateLimitConfig rateLimitConfig;

    private static final String RATE_LIMIT_PREFIX = "rate_limit:";
    private static final String DAILY_SUFFIX = ":daily";
    private static final String WHITELIST_KEY = "rate_limit:whitelist";


    public boolean isAllowed(String identifier) {
        return isAllowed(identifier, MAX_REQUESTS, TIME_WINDOW_MS);
    }

    public boolean isAllowed(String identifier, int maxRequests, long timeWindowMs) {
        long currentTime = System.currentTimeMillis();
        RateLimitEntry entry = rateLimitMap.computeIfAbsent(identifier, k -> new RateLimitEntry());

        if (currentTime - entry.windowStartTime > timeWindowMs) {
            entry.requestCount.set(0);
            entry.windowStartTime = currentTime;
        }

        if (entry.requestCount.get() < maxRequests) {
            entry.requestCount.incrementAndGet();
            return true;
        }

        return false;
    }

    public boolean isDailyUserLimitAllowed(String userId) {
        LocalDate today = LocalDate.now();
        DailyLimitEntry entry = userDailyLimits.computeIfAbsent(userId, k -> new DailyLimitEntry());

        if (!entry.date.equals(today)) {
            entry.date = today;
            entry.requestCount.set(0);
        }

        if (!checkGlobalDailyLimit()) {
            return false;
        }

        if (entry.requestCount.get() < 100) {
            entry.requestCount.incrementAndGet();
            incrementGlobalDailyCount();
            return true;
        }

        return false;
    }

    private boolean checkGlobalDailyLimit() {
        LocalDate today = LocalDate.now();
        AtomicInteger counter = globalDailyCounter.computeIfAbsent(today, k -> new AtomicInteger(0));
        return counter.get() < 1000;
    }

    private void incrementGlobalDailyCount() {
        LocalDate today = LocalDate.now();
        globalDailyCounter.computeIfAbsent(today, k -> new AtomicInteger(0)).incrementAndGet();
    }

    public int getRemainingDailyRequests(String userId) {
        LocalDate today = LocalDate.now();
        DailyLimitEntry entry = userDailyLimits.get(userId);

        if (entry == null || !entry.date.equals(today)) {
            return 100;
        }

        return Math.max(0, 100 - entry.requestCount.get());
    }

    public int getRemainingGlobalRequests() {
        LocalDate today = LocalDate.now();
        AtomicInteger counter = globalDailyCounter.get(today);

        if (counter == null) {
            return 1000;
        }

        return Math.max(0, 1000 - counter.get());
    }


    public boolean allowRequest(String userId, String endpoint, RateLimitConfig.RateLimitType limitType) {
        // Check whitelist
        if (isWhitelisted(userId)) {
            return true;
        }

        // Use in-memory buckets for short-term limits
        boolean allowed = rateLimitConfig.tryConsume(userId, limitType);

        if (!allowed) {
            log.warn("Rate limit exceeded for user {} on endpoint {} - Type: {}", userId, endpoint, limitType);
        }

        return allowed;
    }

 
    public RateLimitStats getRateLimitStats(String userId, RateLimitConfig.RateLimitType limitType) {
        RateLimitConfig.RateLimitStatus status = rateLimitConfig.getRateLimitStatus(userId, limitType);

        return RateLimitStats.builder()
            .userId(userId)
            .limitType(limitType.name())
            .shortTermLimit(status.shortTermLimit)
            .shortTermRemaining(status.shortTermRemaining)
            .dailyLimit(status.dailyLimit)
            .dailyRemaining(status.dailyRemaining)
            .build();
    }

    /**
     * Resetea límites para un usuario
     */
    public void resetUserLimits(String userId) {
        // Clear Redis
        if (redisTemplate != null) {
            Set<String> keys = redisTemplate.keys(RATE_LIMIT_PREFIX + userId + "*");
            if (keys != null && !keys.isEmpty()) {
                redisTemplate.delete(keys);
            }
        }

        // Clear in-memory
        rateLimitConfig.clearCache();
        userDailyLimits.remove(userId);

        log.info("Reset rate limits for user: {}", userId);
    }

  
    public void addToWhitelist(String userId) {
        if (redisTemplate != null) {
            redisTemplate.opsForSet().add(WHITELIST_KEY, userId);
        }
        log.info("Added user {} to whitelist", userId);
    }

    public void removeFromWhitelist(String userId) {
        if (redisTemplate != null) {
            redisTemplate.opsForSet().remove(WHITELIST_KEY, userId);
        }
        log.info("Removed user {} from whitelist", userId);
    }

    public boolean isWhitelisted(String userId) {
        if (redisTemplate == null) {
            return false;
        }
        return Boolean.TRUE.equals(redisTemplate.opsForSet().isMember(WHITELIST_KEY, userId));
    }


    @Scheduled(cron = "0 0 0 * * *")
    public void cleanupExpiredData() {
        log.info("Running daily rate limit cleanup");

        // Clean old in-memory data
        LocalDate today = LocalDate.now();
        globalDailyCounter.entrySet().removeIf(entry -> !entry.getKey().equals(today));
        userDailyLimits.entrySet().removeIf(entry -> !entry.getValue().date.equals(today));

        // Clean expired buckets
        rateLimitConfig.clearExpiredDailyBuckets();

        log.info("Daily cleanup completed");
    }


    private static class RateLimitEntry {
        AtomicInteger requestCount = new AtomicInteger(0);
        long windowStartTime = System.currentTimeMillis();
    }

    private static class DailyLimitEntry {
        LocalDate date = LocalDate.now();
        AtomicInteger requestCount = new AtomicInteger(0);
    }

    public static class RateLimitStats {
        public final String userId;
        public final String limitType;
        public final long shortTermLimit;
        public final long shortTermRemaining;
        public final long dailyLimit;
        public final Long dailyRemaining;

        private RateLimitStats(Builder builder) {
            this.userId = builder.userId;
            this.limitType = builder.limitType;
            this.shortTermLimit = builder.shortTermLimit;
            this.shortTermRemaining = builder.shortTermRemaining;
            this.dailyLimit = builder.dailyLimit;
            this.dailyRemaining = builder.dailyRemaining;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private String userId;
            private String limitType;
            private long shortTermLimit;
            private long shortTermRemaining;
            private long dailyLimit;
            private Long dailyRemaining;

            public Builder userId(String userId) {
                this.userId = userId;
                return this;
            }

            public Builder limitType(String limitType) {
                this.limitType = limitType;
                return this;
            }

            public Builder shortTermLimit(long shortTermLimit) {
                this.shortTermLimit = shortTermLimit;
                return this;
            }

            public Builder shortTermRemaining(long shortTermRemaining) {
                this.shortTermRemaining = shortTermRemaining;
                return this;
            }

            public Builder dailyLimit(long dailyLimit) {
                this.dailyLimit = dailyLimit;
                return this;
            }

            public Builder dailyRemaining(Long dailyRemaining) {
                this.dailyRemaining = dailyRemaining;
                return this;
            }

            public RateLimitStats build() {
                return new RateLimitStats(this);
            }
        }
    }
}
