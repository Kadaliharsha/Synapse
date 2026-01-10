package com.synapse.backend.model;

// Removed Lombok annotations
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

// Removed Lombok annotations
@Document(collection = "feedback")
public class Feedback {
    @Id
    private String id;
    private String email;
    private Map<String, Integer> scores = new HashMap<>();

    // Add missing getter for scores
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Map<String, Integer> getScores() {
        return scores;
    }

    public void setScores(Map<String, Integer> scores) {
        this.scores = scores;
    }
}
