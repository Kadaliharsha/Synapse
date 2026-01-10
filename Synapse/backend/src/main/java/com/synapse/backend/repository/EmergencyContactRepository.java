package com.synapse.backend.repository;

import com.synapse.backend.model.EmergencyContact;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EmergencyContactRepository extends MongoRepository<EmergencyContact, String> {
    Optional<EmergencyContact> findByUserId(String userId); // Query for a specific user
}
