package com.example.demo.service;

import com.example.demo.model.CaptchaToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class CaptchaService {

    private static final String CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final int CODE_LENGTH = 6;
    private static final int EXPIRATION_MINUTES = 5;

    private final Map<String, CaptchaToken> captchaStore = new ConcurrentHashMap<>();

    private final Random random = new Random();

    public Map<String, String> generateCaptcha() {
        String token = UUID.randomUUID().toString();
        String code = generateCode();

        CaptchaToken captchaToken = new CaptchaToken(
            token,
            code,
            LocalDateTime.now(),
            LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES),
            false
        );

        captchaStore.put(token, captchaToken);

        cleanExpiredCaptchas();

        String imageBase64 = generateImage(code);

        log.info("CAPTCHA generado: token={}, expira en {} minutos", token, EXPIRATION_MINUTES);

        return Map.of(
            "token", token,
            "image", imageBase64,
            "expiresIn", String.valueOf(EXPIRATION_MINUTES * 60)
        );
    }

    public boolean validateCaptcha(String token, String inputCode) {
        if (token == null || inputCode == null) {
            log.warn("CAPTCHA validación fallida: token o código nulo");
            return false;
        }

        CaptchaToken captchaToken = captchaStore.get(token);

        if (captchaToken == null) {
            log.warn("CAPTCHA validación fallida: token no encontrado - {}", token);
            return false;
        }

        if (captchaToken.isUsed()) {
            log.warn("CAPTCHA validación fallida: token ya usado - {}", token);
            captchaStore.remove(token);
            return false;
        }

        if (captchaToken.isExpired()) {
            log.warn("CAPTCHA validación fallida: token expirado - {}", token);
            captchaStore.remove(token);
            return false;
        }

        boolean isValid = captchaToken.getCode().equalsIgnoreCase(inputCode.trim());

        if (isValid) {
            log.info("CAPTCHA validado correctamente: token={}", token);
            captchaStore.remove(token);
        } else {
            log.warn("CAPTCHA validación fallida: código incorrecto - token={}", token);
        }

        return isValid;
    }

    public void invalidateCaptcha(String token) {
        if (token != null) {
            captchaStore.remove(token);
            log.info("CAPTCHA invalidado manualmente: token={}", token);
        }
    }

    private String generateCode() {
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return code.toString();
    }

    private String generateImage(String code) {
        int width = 200;
        int height = 60;

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = image.createGraphics();

        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        g2d.setColor(new Color(240, 240, 240));
        g2d.fillRect(0, 0, width, height);

        for (int i = 0; i < 5; i++) {
            g2d.setColor(new Color(200 + random.nextInt(55), 200 + random.nextInt(55), 200 + random.nextInt(55)));
            g2d.drawLine(random.nextInt(width), random.nextInt(height), random.nextInt(width), random.nextInt(height));
        }

        Font font = new Font("Arial", Font.BOLD, 32);
        g2d.setFont(font);

        int x = 10;
        for (int i = 0; i < code.length(); i++) {
            g2d.setColor(new Color(random.nextInt(100), random.nextInt(100), random.nextInt(100)));

            int y = 35 + random.nextInt(10);
            int rotation = random.nextInt(15) - 7;

            g2d.rotate(Math.toRadians(rotation), x, y);
            g2d.drawString(String.valueOf(code.charAt(i)), x, y);
            g2d.rotate(Math.toRadians(-rotation), x, y);

            x += 30;
        }

        for (int i = 0; i < 50; i++) {
            g2d.setColor(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255)));
            int px = random.nextInt(width);
            int py = random.nextInt(height);
            g2d.fillOval(px, py, 2, 2);
        }

        g2d.dispose();

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            byte[] imageBytes = baos.toByteArray();
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(imageBytes);
        } catch (Exception e) {
            log.error("Error generando imagen CAPTCHA", e);
            throw new RuntimeException("Error generando imagen CAPTCHA", e);
        }
    }

    private void cleanExpiredCaptchas() {
        captchaStore.entrySet().removeIf(entry -> entry.getValue().isExpired());
    }

    public int getActiveCaptchasCount() {
        cleanExpiredCaptchas();
        return captchaStore.size();
    }
}