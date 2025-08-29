package com.example.demo.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PhoneValidator implements ConstraintValidator<ValidPhone, String> {
    
    private static final Pattern INVALID_PATTERNS = Pattern.compile(
        "^(0+|1+|2+|3+|4+|5+|6+|7+|8+|9+|123456789|987654321|111111111|222222222|333333333|444444444|555555555|666666666|777777777|888888888|999999999)$"
    );
    
    private static final Pattern VALID_PHONE_PATTERN = Pattern.compile("^[0-9+\\-\\s\\(\\)]{9,15}$");
    
    @Override
    public void initialize(ValidPhone constraintAnnotation) {
        // No initialization needed
    }
    
    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null || phone.trim().isEmpty()) {
            return true; // Allow null/empty for optional fields
        }
        
        // Remove spaces and special characters for pattern validation
        String cleanPhone = phone.replaceAll("[^0-9]", "");
        
        // Check basic format
        if (!VALID_PHONE_PATTERN.matcher(phone).matches()) {
            return false;
        }
        
        // Check length of digits only
        if (cleanPhone.length() < 9 || cleanPhone.length() > 15) {
            return false;
        }
        
        // Check for invalid patterns (all same digits, sequential, etc.)
        return !INVALID_PATTERNS.matcher(cleanPhone).matches();
    }
}