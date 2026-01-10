package com.synapse.backend.model;

// Removed Lombok annotations
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

// Removed Lombok annotations

@Document(collection = "emergency_contacts")
public class EmergencyContact {
    @Id
    private String id; // Unique ID for the user
    private String userId; // User email or ID reference
    private List<Contact> contacts;

    public EmergencyContact() {
        this.contacts = new ArrayList<>();
    }

    public EmergencyContact(String userId) {
        this.userId = userId;
        this.contacts = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    // Add missing getter and setter for contacts
    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    // Removed Lombok annotations
    public static class Contact {
        private String name; // Contact name
        private String phoneNumber;
        private String relationship;// Contact phone number

        // Add missing getter and setter for phoneNumber
        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        // Add missing getter and setter for name
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        // Add missing getter and setter for relationship
        public String getRelationship() {
            return relationship;
        }

        public void setRelationship(String relationship) {
            this.relationship = relationship;
        }
    }
}
