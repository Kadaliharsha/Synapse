package com.synapse.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
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
    
    // New Profile Fields
    private String bio;
    private Double price;
    private String gender;
    private Integer experience; // Years of experience
    private Double rating;
    private Integer reviewCount;
}
