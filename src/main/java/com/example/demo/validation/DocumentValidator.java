package com.example.demo.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class DocumentValidator implements ConstraintValidator<ValidDocument, String> {
    
    private static final Pattern INVALID_PATTERNS = Pattern.compile(
        "^(0+|1+|2+|3+|4+|5+|6+|7+|8+|9+|12345678|87654321|11111111|22222222|33333333|44444444|55555555|66666666|77777777|88888888|99999999|123456789|987654321)$"
    );
    
    @Override
    public void initialize(ValidDocument constraintAnnotation) {
        // No initialization needed
    }
    
    @Override
    public boolean isValid(String document, ConstraintValidatorContext context) {
        if (document == null || document.trim().isEmpty()) {
            return false;
        }
        
        // Remove spaces and special characters
        String cleanDocument = document.replaceAll("[^0-9]", "");
        
        // Check length (should be between 7 and 12 digits)
        if (cleanDocument.length() < 7 || cleanDocument.length() > 12) {
            return false;
        }
        
        // Check for invalid patterns (all same digits, sequential, etc.)
        return !INVALID_PATTERNS.matcher(cleanDocument).matches();
    }
}