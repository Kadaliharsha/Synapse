package com.synapse.backend.repository;

import com.synapse.backend.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BlogsRepository extends MongoRepository<Blog,String> {

    Optional<Blog> findByEmail(String email);
}
