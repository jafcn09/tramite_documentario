package com.example.demo.service;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;

@Service
public class EncryptionService {

    private static final String ALGORITHM = "AES";
    private static final String SECRET_KEY = "UNT2024DocTramite";

    private SecretKeySpec getSecretKey() {
        try {
            byte[] key = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16);
            return new SecretKeySpec(key, ALGORITHM);
        } catch (Exception e) {
            throw new RuntimeException("Error generando clave secreta");
        }
    }

    public String encrypt(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }

        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, getSecretKey());
            byte[] encryptedBytes = cipher.doFinal(input.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error encriptando: " + e.getMessage());
        }
    }

    public String decrypt(String encrypted) {
        if (encrypted == null || encrypted.isEmpty()) {
            return encrypted;
        }

        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, getSecretKey());
            byte[] decodedBytes = Base64.getUrlDecoder().decode(encrypted);
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);
            return new String(decryptedBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error desencriptando: " + e.getMessage());
        }
    }

    public String encryptFilename(String filename) {
        if (filename == null || filename.isEmpty()) {
            return filename;
        }

        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return encrypt(filename);
        }

        String name = filename.substring(0, lastDotIndex);
        String extension = filename.substring(lastDotIndex);
        return encrypt(name) + extension;
    }

    public String decryptFilename(String encryptedFilename) {
        if (encryptedFilename == null || encryptedFilename.isEmpty()) {
            return encryptedFilename;
        }

        int lastDotIndex = encryptedFilename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return decrypt(encryptedFilename);
        }

        String encryptedName = encryptedFilename.substring(0, lastDotIndex);
        String extension = encryptedFilename.substring(lastDotIndex);
        return decrypt(encryptedName) + extension;
    }
}
