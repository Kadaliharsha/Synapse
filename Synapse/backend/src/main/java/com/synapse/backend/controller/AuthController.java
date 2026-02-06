package com.synapse.backend.controller;

import com.synapse.backend.dto.LoginRequest;
import com.synapse.backend.dto.LoginResponse;
import com.synapse.backend.model.Therapist;
import com.synapse.backend.model.Users;
import com.synapse.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller for authentication endpoints.
 * Business logic is delegated to AuthService.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signUp/user")
    public ResponseEntity<?> registerAsUser(@Valid @RequestBody Users user) {
        authService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully."));
    }

    @PostMapping("/signUp/therapist")
    public ResponseEntity<?> registerAsTherapist(@Valid @RequestBody Therapist therapist) {
        authService.registerTherapist(therapist);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Therapist registered successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
}
