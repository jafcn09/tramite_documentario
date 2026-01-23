package com.example.demo.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.demo.annotation.DailyRateLimit;
import com.example.demo.annotation.RateLimit;
import com.example.demo.config.RateLimitConfig;
import com.example.demo.exception.RateLimitExceededException;
import com.example.demo.service.RateLimitService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class RateLimitAspect {

    private final RateLimitService rateLimitService;
    private final RateLimitConfig rateLimitConfig;

    @Around("@annotation(rateLimit)")
    public Object rateLimit(ProceedingJoinPoint joinPoint, RateLimit rateLimit) throws Throwable {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes == null) {
                return joinPoint.proceed();
            }

            HttpServletRequest request = attributes.getRequest();
            String clientIp = getClientIp(request);
            String endpoint = request.getRequestURI();
            String identifier = clientIp + ":" + endpoint;

            boolean allowed = rateLimitService.isAllowed(identifier, rateLimit.maxRequests(), rateLimit.timeWindowMs());

            if (!allowed) {
                log.warn("Rate limit exceeded for IP {} on endpoint {}", clientIp, endpoint);
                throw new RateLimitExceededException("Has excedido el límite de solicitudes. Por favor, intenta en " + (rateLimit.timeWindowMs() / 1000) + " segundos.");
            }

            return joinPoint.proceed();
        } catch (RateLimitExceededException e) {
            throw e;
        } catch (Throwable e) {
            log.error("Error in rate limit aspect: ", e);
            return joinPoint.proceed();
        }
    }

    @Around("@annotation(dailyRateLimit)")
    public Object dailyRateLimit(ProceedingJoinPoint joinPoint, DailyRateLimit dailyRateLimit) throws Throwable {
        try {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userId = auth != null && auth.isAuthenticated() ? auth.getName() : "anonymous";


            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            String endpoint = "unknown";
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                endpoint = request.getRequestURI();
            }

       
            boolean allowed = rateLimitService.isDailyUserLimitAllowed(userId);

            if (!allowed) {
                int remaining = rateLimitService.getRemainingDailyRequests(userId);
                log.warn("Daily rate limit exceeded for user {} on endpoint {}. Remaining: {}", userId, endpoint, remaining);

                String message = String.format(
                    "Has excedido el límite diario de solicitudes (%d por usuario). Solicitudes restantes: %d. Intenta mañana.",
                    dailyRateLimit.maxRequestsPerUser(),
                    remaining
                );
                throw new RateLimitExceededException(message);
            }

            return joinPoint.proceed();
        } catch (RateLimitExceededException e) {
            throw e;
        } catch (Throwable e) {
            log.error("Error in daily rate limit aspect: ", e);
            return joinPoint.proceed();
        }
    }

    private String getClientIp(HttpServletRequest request) {
        // Check X-Forwarded-For header first (for proxies)
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }

        // Check X-Real-IP header (for nginx)
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp.trim();
        }

        // Fall back to remote address
        String remoteAddr = request.getRemoteAddr();
        return remoteAddr != null ? remoteAddr : "127.0.0.1";
    }
}
