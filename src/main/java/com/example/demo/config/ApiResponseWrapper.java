package com.example.demo.config;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.example.demo.dto.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestControllerAdvice
public class ApiResponseWrapper implements ResponseBodyAdvice<Object> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        // Solo aplicar a respuestas que no sean ya ApiResponse o archivos
        return returnType.getParameterType() != ApiResponse.class &&
               !returnType.getParameterType().equals(byte[].class) &&
               !returnType.getParameterType().equals(java.io.File.class);
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request, ServerHttpResponse response) {

        // Si ya es ApiResponse, dejar como está
        if (body instanceof ApiResponse) {
            return body;
        }

        // Si es nulo, retornar error
        if (body == null) {
            return ApiResponse.error("No hay datos disponibles");
        }

        // Envolver en ApiResponse genérica
        return ApiResponse.success("Operación exitosa", body);
    }
}
