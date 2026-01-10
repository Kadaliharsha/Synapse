package com.synapse.backend.repository;

import com.synapse.backend.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.Optional;

public interface FeedbackRepository extends MongoRepository<Feedback,String> {
    Optional<Feedback> findByEmail(String email);

}
