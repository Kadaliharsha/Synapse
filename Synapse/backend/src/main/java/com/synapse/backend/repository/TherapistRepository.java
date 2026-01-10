package com.synapse.backend.repository;

import com.synapse.backend.model.Therapist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TherapistRepository extends MongoRepository<Therapist,String> {
    Optional<Therapist> findByEmail(String email);
}
