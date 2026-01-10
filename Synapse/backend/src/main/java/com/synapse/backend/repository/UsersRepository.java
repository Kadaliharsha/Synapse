package com.synapse.backend.repository;

import com.synapse.backend.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<Users, String> {
    Optional<Users> findByEmail(String email);
}
