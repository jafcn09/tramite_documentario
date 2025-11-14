package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RateLimitService {

  
    private final Map<String, RateLimitEntry> rateLimitMap = new ConcurrentHashMap<>();


    private final Map<LocalDate, AtomicInteger> globalDailyCounter = new ConcurrentHashMap<>();

    private final Map<String, DailyLimitEntry> userDailyLimits = new ConcurrentHashMap<>();

    private static final int MAX_REQUESTS = 5;
    private static final long TIME_WINDOW_MS = 60000; 
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

    private static class RateLimitEntry {
        AtomicInteger requestCount = new AtomicInteger(0);
        long windowStartTime = System.currentTimeMillis();
    }

    private static class DailyLimitEntry {
        LocalDate date = LocalDate.now();
        AtomicInteger requestCount = new AtomicInteger(0);
    }
}
