package com.example.demo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class CacheService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void set(String key, Object value, Duration ttl) {
        try {
            redisTemplate.opsForValue().set(key, value, ttl);
            log.debug("Cache set: key={}, ttl={}", key, ttl);
        } catch (Exception e) {
            log.error("Error setting cache for key: {}", key, e);
        }
    }

    public Object get(String key) {
        try {
            Object value = redisTemplate.opsForValue().get(key);
            log.debug("Cache get: key={}, found={}", key, value != null);
            return value;
        } catch (Exception e) {
            log.error("Error getting cache for key: {}", key, e);
            return null;
        }
    }

    public boolean exists(String key) {
        try {
            Boolean exists = redisTemplate.hasKey(key);
            return exists != null && exists;
        } catch (Exception e) {
            log.error("Error checking cache existence for key: {}", key, e);
            return false;
        }
    }

    public void delete(String key) {
        try {
            redisTemplate.delete(key);
            log.debug("Cache deleted: key={}", key);
        } catch (Exception e) {
            log.error("Error deleting cache for key: {}", key, e);
        }
    }


    public void deletePattern(String pattern) {
        try {
            Set<String> keys = redisTemplate.keys(pattern);
            if (keys != null && !keys.isEmpty()) {
                redisTemplate.delete(keys);
                log.debug("Cache deleted pattern: pattern={}, count={}", pattern, keys.size());
            }
        } catch (Exception e) {
            log.error("Error deleting cache pattern: {}", pattern, e);
        }
    }

    public void expire(String key, Duration duration) {
        try {
            redisTemplate.expire(key, duration);
            log.debug("Cache expiration set: key={}, duration={}", key, duration);
        } catch (Exception e) {
            log.error("Error setting expiration for key: {}", key, e);
        }
    }

    public Long increment(String key) {
        try {
            Long value = redisTemplate.opsForValue().increment(key);
            log.debug("Cache incremented: key={}, value={}", key, value);
            return value;
        } catch (Exception e) {
            log.error("Error incrementing cache for key: {}", key, e);
            return null;
        }
    }

    public Long incrementWithTtl(String key, Duration ttl) {
        try {
            Long value = redisTemplate.opsForValue().increment(key);
            redisTemplate.expire(key, ttl);
            log.debug("Cache incremented with TTL: key={}, value={}, ttl={}", key, value, ttl);
            return value;
        } catch (Exception e) {
            log.error("Error incrementing cache with TTL for key: {}", key, e);
            return null;
        }
    }

    @CacheEvict(allEntries = true, cacheNames = {"tramites", "usuarios", "areas", "notificaciones"})
    public void clearAllCache() {
        try {
            Set<String> keys = redisTemplate.keys("*");
            if (keys != null && !keys.isEmpty()) {
                redisTemplate.delete(keys);
            }
            log.info("All cache cleared");
        } catch (Exception e) {
            log.error("Error clearing all cache", e);
        }
    }

    public long getCacheSize() {
        try {
            Set<String> keys = redisTemplate.keys("*");
            return keys != null ? keys.size() : 0;
        } catch (Exception e) {
            log.error("Error getting cache size", e);
            return 0;
        }
    }
}