package com.synapse.backend.service;

import com.synapse.backend.dto.LoginRequest;
import com.synapse.backend.dto.LoginResponse;
import com.synapse.backend.model.Therapist;
import com.synapse.backend.model.Users;

/**
 * Service interface for authentication operations.
 */
public interface AuthService {

    /**
     * Register a new user.
     * 
     * @param user the user to register
     * @return the registered user
     * @throws IllegalArgumentException if email already exists or validation fails
     */
    Users registerUser(Users user);

    /**
     * Register a new therapist.
     * 
     * @param therapist the therapist to register
     * @return the registered therapist
     * @throws IllegalArgumentException if email already exists or validation fails
     */
    Therapist registerTherapist(Therapist therapist);

    /**
     * Authenticate a user or therapist.
     * 
     * @param loginRequest the login credentials
     * @return login response with token and user info
     * @throws org.springframework.security.authentication.BadCredentialsException if
     *                                                                             credentials
     *                                                                             are
     *                                                                             invalid
     */
    LoginResponse login(LoginRequest loginRequest);
}
