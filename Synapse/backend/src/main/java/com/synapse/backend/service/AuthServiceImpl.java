package com.synapse.backend.service;

import com.synapse.backend.dto.LoginRequest;
import com.synapse.backend.dto.LoginResponse;
import com.synapse.backend.model.Therapist;
import com.synapse.backend.model.Users;
import com.synapse.backend.repository.TherapistRepository;
import com.synapse.backend.repository.UsersRepository;
import com.synapse.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

/**
 * Implementation of AuthService for handling authentication operations.
 */
@Service
public class AuthServiceImpl implements AuthService {

    private static final String DEFAULT_PROFILE_PICTURE = "http://res.cloudinary.com/dwcqn9ilb/image/upload/v1733560697/wczploctk3ioxtndygve.png";

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TherapistRepository therapistRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Users registerUser(Users user) {
        // Check if email already exists
        if (usersRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists.");
        }

        // Validate password
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty.");
        }

        // Set defaults
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singletonList("USER"));
        user.setProfilePicture(DEFAULT_PROFILE_PICTURE);

        return usersRepository.save(user);
    }

    @Override
    public Therapist registerTherapist(Therapist therapist) {
        // Check if email already exists
        if (therapistRepository.findByEmail(therapist.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Therapist with this email already exists.");
        }

        // Validate password
        if (therapist.getPassword() == null || therapist.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty.");
        }

        // Set defaults
        therapist.setPassword(passwordEncoder.encode(therapist.getPassword()));
        therapist.setRoles(Collections.singletonList("THERAPIST"));
        therapist.setProfilePicture(DEFAULT_PROFILE_PICTURE);

        return therapistRepository.save(therapist);
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            throw new IllegalArgumentException("Email and password must not be null.");
        }

        // Try to find user
        Optional<Users> userOpt = usersRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = generateToken(user.getEmail(), user.getPassword(), user.getRoles().get(0));
                return LoginResponse.builder()
                        .token(token)
                        .name(user.getName())
                        .email(user.getEmail())
                        .roles(user.getRoles())
                        .build();
            } else {
                throw new BadCredentialsException("Invalid credentials for user.");
            }
        }

        // Try to find therapist
        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(loginRequest.getEmail());
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), therapist.getPassword())) {
                String token = generateToken(therapist.getEmail(), therapist.getPassword(),
                        therapist.getRoles().get(0));
                return LoginResponse.builder()
                        .token(token)
                        .name(therapist.getName())
                        .email(therapist.getEmail())
                        .roles(therapist.getRoles())
                        .build();
            } else {
                throw new BadCredentialsException("Invalid credentials for therapist.");
            }
        }

        throw new BadCredentialsException("User or therapist not found.");
    }

    /**
     * Generate JWT token for authenticated user.
     */
    private String generateToken(String email, String password, String role) {
        User userDetails = new User(
                email,
                password,
                Collections.singletonList(new SimpleGrantedAuthority(role)));
        return jwtUtil.generateToken(userDetails);
    }
}
