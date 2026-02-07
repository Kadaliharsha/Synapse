package com.synapse.backend.repository;

import com.synapse.backend.model.Therapist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TherapistRepository extends MongoRepository<Therapist, String> {
    Optional<Therapist> findByEmail(String email);

    // Filter queries
    List<Therapist> findBySpecializationContainingIgnoreCase(String specialization);

    List<Therapist> findByGenderIgnoreCase(String gender);

    List<Therapist> findByPriceLessThanEqual(Double maxPrice);

    List<Therapist> findByRatingGreaterThanEqual(Double minRating);

    // Combined filter (for complex queries)
    @Query("{ $and: [ " +
            "{ $or: [ { 'specialization': { $regex: ?0, $options: 'i' } }, { ?0: null } ] }, " +
            "{ $or: [ { 'gender': { $regex: ?1, $options: 'i' } }, { ?1: null } ] }, " +
            "{ $or: [ { 'price': { $lte: ?2 } }, { ?2: null } ] }, " +
            "{ $or: [ { 'rating': { $gte: ?3 } }, { ?3: null } ] } " +
            "] }")
    List<Therapist> findByFilters(String specialization, String gender, Double maxPrice, Double minRating);
}