package com.synapse.backend.service;

import com.synapse.backend.model.Therapist;
import com.synapse.backend.model.Users;
import com.synapse.backend.repository.TherapistRepository;
import com.synapse.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Primary
public class UnifiedUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TherapistRepository therapistRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Try to find a User
        Optional<Users> userOpt = usersRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            return new User(
                    user.getEmail(),
                    user.getPassword(),
                    user.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
        }

        // 2. Try to find a Therapist
        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(email);
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();
            return new User(
                    therapist.getEmail(),
                    therapist.getPassword(),
                    therapist.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
        }

        // 3. Not found in either
        throw new UsernameNotFoundException("User or Therapist not found with email: " + email);
    }
}
