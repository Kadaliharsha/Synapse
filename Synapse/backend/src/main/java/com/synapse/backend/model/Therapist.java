package com.synapse.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "therapist")
public class Therapist {
    @Id
    private String id;
    private String email;
    private String name;
    private String specialization;
    private String licenceNo;
    private String password;
    private String profilePicture;
    private List<String> roles;

    private String bio;
    private Double price;
    private String gender;
    private Integer experience;
    private Double rating;
    private Integer reviewCount;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}