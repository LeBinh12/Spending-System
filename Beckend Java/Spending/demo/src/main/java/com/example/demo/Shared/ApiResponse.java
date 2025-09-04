package com.example.demo.Shared;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private boolean succeeded;
    private T data;

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(200, message, true, data);
    }

    public static <T> ApiResponse<T> error(String message, int code) {
        return new ApiResponse<>(code, message, false, null);
    }
}
