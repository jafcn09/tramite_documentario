package com.example.demo.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DailyRateLimit {
    // Max 100 requests per user per day by default
    int maxRequestsPerUser() default 100;
    // Max 1000 requests per system per day
    int maxRequestsPerSystem() default 1000;
}
