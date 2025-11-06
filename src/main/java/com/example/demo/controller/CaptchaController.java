package com.example.demo.controller;

import com.example.demo.service.CaptchaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/captcha")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CaptchaController {

    private final CaptchaService captchaService;

    @GetMapping("/generar")
    public ResponseEntity<Map<String, String>> generarCaptcha() {
        Map<String, String> captcha = captchaService.generateCaptcha();
        return ResponseEntity.ok(captcha);
    }

    @PostMapping("/validar")
    public ResponseEntity<Map<String, Boolean>> validarCaptcha(
            @RequestBody Map<String, String> request) {

        String token = request.get("token");
        String code = request.get("code");

        boolean isValid = captchaService.validateCaptcha(token, code);

        return ResponseEntity.ok(Map.of("valid", isValid));
    }

    @DeleteMapping("/invalidar/{token}")
    public ResponseEntity<Void> invalidarCaptcha(@PathVariable String token) {
        captchaService.invalidateCaptcha(token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/activos")
    public ResponseEntity<Map<String, Integer>> obtenerCaptchasActivos() {
        int count = captchaService.getActiveCaptchasCount();
        return ResponseEntity.ok(Map.of("activos", count));
    }
}
