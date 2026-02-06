package com.synapse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Standardized error response for all API errors.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private int status;
    private String message;
    private String error;
    private LocalDateTime timestamp;
    private String path;
    private Map<String, String> validationErrors;

    public static ErrorResponse of(int status, String message, String error, String path) {
        return ErrorResponse.builder()
                .status(status)
                .message(message)
                .error(error)
                .timestamp(LocalDateTime.now())
                .path(path)
                .build();
    }

    public static ErrorResponse validationError(int status, String message, Map<String, String> errors, String path) {
        return ErrorResponse.builder()
                .status(status)
                .message(message)
                .error("Validation Failed")
                .timestamp(LocalDateTime.now())
                .path(path)
                .validationErrors(errors)
                .build();
    }
}
