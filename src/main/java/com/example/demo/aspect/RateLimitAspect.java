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
import com.example.demo.exception.RateLimitExceededException;
import com.example.demo.service.RateLimitService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Aspect
@Component
@RequiredArgsConstructor
public class RateLimitAspect {

    private final RateLimitService rateLimitService;

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
             
                throw new RateLimitExceededException("Has excedido el límite de solicitudes. Por favor, intenta en " + (rateLimit.timeWindowMs() / 1000) + " segundos.");
            }

            return joinPoint.proceed();
        } catch (RateLimitExceededException e) {
            throw e;
        } catch (Throwable e) {
            
            return joinPoint.proceed();
        }
    }

    @Around("@annotation(dailyRateLimit)")
    public Object dailyRateLimit(ProceedingJoinPoint joinPoint, DailyRateLimit dailyRateLimit) throws Throwable {
        try {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userId = auth != null && auth.isAuthenticated() ? auth.getName() : "anonymous";

            boolean allowed = rateLimitService.isDailyUserLimitAllowed(userId);

            if (!allowed) {
        
                throw new RateLimitExceededException("Has excedido el límite diario de solicitudes (100 por usuario, 1000 total por día). Intenta mañana.");
            }

            return joinPoint.proceed();
        } catch (RateLimitExceededException e) {
            throw e;
        } catch (Throwable e) {
            // If anything goes wrong with rate limiting, allow the request to proceed
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
