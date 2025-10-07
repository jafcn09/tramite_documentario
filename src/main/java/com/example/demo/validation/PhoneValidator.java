package com.example.demo.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PhoneValidator implements ConstraintValidator<ValidPhone, String> {

    private static final Pattern INVALID_PATTERNS = Pattern.compile(
        "^(0+|1+|2+|3+|4+|5+|6+|7+|8+|9+|123456789|987654321|111111111|222222222|333333333|444444444|555555555|666666666|777777777|888888888|999999999)$"
    );

    @Override
    public void initialize(ValidPhone constraintAnnotation) {
    }

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null || phone.trim().isEmpty()) {
            return true;
        }

        String cleanPhone = phone.replaceAll("[^0-9]", "");

        if (cleanPhone.length() != 9) {
            return false;
        }

        return !INVALID_PATTERNS.matcher(cleanPhone).matches();
    }
}