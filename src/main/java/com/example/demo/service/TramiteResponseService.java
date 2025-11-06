package com.example.demo.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TramiteResponseService {

    private final TramiteService tramiteService;

    @Transactional
    public String guardarArchivoRespuesta(MultipartFile archivo) {
        return tramiteService.guardarArchivoRespuesta(archivo);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> descargarArchivo(Long id, String nombreArchivo, Long usuarioId, String rol) {
        return tramiteService.descargarArchivo(id, nombreArchivo, usuarioId, rol);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> descargarArchivoPublico(String codigo, String nombreArchivo) {
        return tramiteService.descargarArchivoPublico(codigo, nombreArchivo);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> descargarTodosDocumentos(Long id, Long usuarioId, String rol) {
        return tramiteService.descargarTodosDocumentos(id, usuarioId, rol);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> descargarTodosDocumentosPublico(String codigo) {
        return tramiteService.descargarTodosDocumentosPublico(codigo);
    }
}
