package com.example.demo.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {
    
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );
    
    private static final Pattern INVALID_PATTERNS = Pattern.compile(
        ".*(test|fake|dummy|example|temp|spam|noreply|donotreply|bot|admin|root).*"
    );
    
    private static final String[] DISPOSABLE_DOMAINS = {
        "10minutemail.com", "guerrillamail.com", "tempmail.org", "mailinator.com",
        "throwaway.email", "temp-mail.org", "yopmail.com", "sharklasers.com"
    };
    
    @Override
    public void initialize(ValidEmail constraintAnnotation) {
        // No initialization needed
    }
    
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        email = email.toLowerCase().trim();
        
        // Check basic email format
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            return false;
        }
        
        // Check for suspicious patterns
        if (INVALID_PATTERNS.matcher(email).matches()) {
            return false;
        }
        
        // Check for disposable email domains
        String domain = email.substring(email.lastIndexOf("@") + 1);
        for (String disposableDomain : DISPOSABLE_DOMAINS) {
            if (domain.equals(disposableDomain)) {
                return false;
            }
        }
        
        // Additional checks
        if (email.contains("..") || email.startsWith(".") || email.endsWith(".")) {
            return false;
        }
        
        return true;
    }
}