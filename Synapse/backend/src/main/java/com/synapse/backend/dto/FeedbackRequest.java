package com.synapse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
public class FeedbackRequest {
    private String email;
    private String date;
    private int totalScore;

    // Add missing getters
    public String getEmail() {
        return email;
    }

    public String getDate() {
        return date;
    }

    public int getTotalScore() {
        return totalScore;
    }
}
