package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private boolean success;
    private String mensaje;
    private T data;
    private Integer cantidad;
    private Integer pagina;
    private Integer totalPaginas;
    private Long totalElementos;
    private LocalDateTime timestamp;
    private String codigo;

    public static <T> ApiResponse<T> success(String mensaje) {
        return ApiResponse.<T>builder()
            .success(true)
            .mensaje(mensaje)
            .timestamp(LocalDateTime.now())
            .build();
    }

    public static <T> ApiResponse<T> success(String mensaje, T data) {
        return ApiResponse.<T>builder()
            .success(true)
            .mensaje(mensaje)
            .data(data)
            .timestamp(LocalDateTime.now())
            .build();
    }

    public static <T> ApiResponse<T> success(String mensaje, T data, Integer cantidad) {
        return ApiResponse.<T>builder()
            .success(true)
            .mensaje(mensaje)
            .data(data)
            .cantidad(cantidad)
            .timestamp(LocalDateTime.now())
            .build();
    }

    public static <T> ApiResponse<T> successWithPagination(String mensaje, T data, Integer pagina,
                                                            Integer totalPaginas, Long totalElementos) {
        return ApiResponse.<T>builder()
            .success(true)
            .mensaje(mensaje)
            .data(data)
            .pagina(pagina)
            .totalPaginas(totalPaginas)
            .totalElementos(totalElementos)
            .timestamp(LocalDateTime.now())
            .build();
    }

    public static <T> ApiResponse<T> error(String mensaje) {
        return ApiResponse.<T>builder()
            .success(false)
            .mensaje(mensaje)
            .timestamp(LocalDateTime.now())
            .build();
    }

    public static <T> ApiResponse<T> error(String mensaje, String codigo) {
        return ApiResponse.<T>builder()
            .success(false)
            .mensaje(mensaje)
            .codigo(codigo)
            .timestamp(LocalDateTime.now())
            .build();
    }
}
