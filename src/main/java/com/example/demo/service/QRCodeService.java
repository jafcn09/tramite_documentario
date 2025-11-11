package com.example.demo.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class QRCodeService {

    @Value("${app.frontend.url:http://localhost:4200}")
    private String frontendUrl;

    @Value("${app.qr.size:300}")
    private int qrSize;

    public String generarCodigoQR() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 16).toUpperCase();
    }

    public String generarUrlVerificacion(String codigoQR) {
        return frontendUrl + "/buscar?qr=" + codigoQR;
    }

    public byte[] generarImagenQR(String contenido) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(contenido, BarcodeFormat.QR_CODE, qrSize, qrSize);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        return outputStream.toByteArray();
    }

    public byte[] generarQRTramite(String qrCode, String codigo, String expediente, String tipo, String estado)
            throws WriterException, IOException {

        String contenidoQR = String.format(
            "UNIVERSIDAD NACIONAL DE TUMBES\n" +
            "SEGUIMIENTO DE TRÁMITE\n\n" +
            "Código: %s\n" +
            "Expediente: %s\n" +
            "Tipo: %s\n" +
            "Estado: %s\n\n" +
            "Ver progreso: %s",
            codigo, expediente, tipo, estado, generarUrlVerificacion(qrCode)
        );

        return generarImagenQR(contenidoQR);
    }

    public boolean validarFormatoQR(String codigoQR) {
        if (codigoQR == null || codigoQR.trim().isEmpty()) {
            return false;
        }

        return codigoQR.matches("^[A-Z0-9]{16}$");
    }

    public void registrarEscaneo(String codigoQR, String ipAddress, String userAgent) {
        log.info("QR escaneado - Código: {}, IP: {}, UserAgent: {}, Fecha: {}",
                codigoQR, ipAddress, userAgent, LocalDateTime.now());
    }
}