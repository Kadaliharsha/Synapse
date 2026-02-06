package com.synapse.backend.controller;

import com.synapse.backend.model.Appointment;
import com.synapse.backend.model.Feedback;
import com.synapse.backend.model.Therapist;
import com.synapse.backend.model.Users;
import com.synapse.backend.repository.FeedbackRepository;
import com.synapse.backend.repository.TherapistRepository;
import com.synapse.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/therapist")
public class TherapistController {

    @Autowired
    private TherapistRepository therapistRepository;
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping("/{email}")

    public ResponseEntity<?> getUserDetails(@PathVariable String email) {

        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(email);
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();

            return ResponseEntity.ok(therapist);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Therapist> getTherapistById(@PathVariable String id) {
        return therapistRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{email}/name")
    public ResponseEntity<String> getTherapistNameByEmail(@PathVariable String email) {
        // Fetch therapist details by email
        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(email);

        // If therapist exists, return the name; otherwise, return NOT_FOUND
        if (therapistOpt.isPresent()) {
            String therapistName = therapistOpt.get().getName();
            return ResponseEntity.ok(therapistName);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Therapist not found");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Therapist>> getAllTherapists(
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minRating) {
        List<Therapist> therapists = therapistRepository.findAll();

        // In-memory filtering (simple for MVP)
        // For production, use Repository queries or Criteria API
        List<Therapist> filtered = therapists.stream()
                .filter(t -> specialization == null || (t.getSpecialization() != null
                        && t.getSpecialization().toLowerCase().contains(specialization.toLowerCase())))
                .filter(t -> gender == null || (t.getGender() != null && t.getGender().equalsIgnoreCase(gender)))
                .filter(t -> maxPrice == null || (t.getPrice() != null && t.getPrice() <= maxPrice))
                .filter(t -> minRating == null || (t.getRating() != null && t.getRating() >= minRating))
                .toList();

        return ResponseEntity.ok(filtered);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Therapist> updateTherapist(
            @PathVariable String email,
            @RequestBody Therapist updatedTherapist) {

        // Fetch the existing therapist using email
        Therapist existingTherapist = therapistRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Therapist not found"));

        // Update fields if they are not null or invalid
        if (updatedTherapist.getName() != null)
            existingTherapist.setName(updatedTherapist.getName());
        if (updatedTherapist.getProfilePicture() != null)
            existingTherapist.setProfilePicture(updatedTherapist.getProfilePicture());
        if (updatedTherapist.getSpecialization() != null)
            existingTherapist.setSpecialization(updatedTherapist.getSpecialization());
        if (updatedTherapist.getLicenceNo() != null)
            existingTherapist.setLicenceNo(updatedTherapist.getLicenceNo());

        // New Fields
        if (updatedTherapist.getBio() != null)
            existingTherapist.setBio(updatedTherapist.getBio());
        if (updatedTherapist.getPrice() != null)
            existingTherapist.setPrice(updatedTherapist.getPrice());
        if (updatedTherapist.getGender() != null)
            existingTherapist.setGender(updatedTherapist.getGender());
        if (updatedTherapist.getExperience() != null)
            existingTherapist.setExperience(updatedTherapist.getExperience());

        // Save the updated therapist to the database
        Therapist savedTherapist = therapistRepository.save(existingTherapist);

        return ResponseEntity.ok(savedTherapist);
    }

    @GetMapping("/{email}/patients")
    public ResponseEntity<List<com.synapse.backend.dto.PatientSummaryDTO>> getPatients(@PathVariable String email) {
        List<com.synapse.backend.dto.PatientSummaryDTO> patients = appointmentService.getPatientsForTherapist(email);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{email}/patient/{patientEmail}")
    public ResponseEntity<com.synapse.backend.dto.PatientDetailDTO> getPatientDetail(@PathVariable String email,
            @PathVariable String patientEmail) {
        com.synapse.backend.dto.PatientDetailDTO detail = appointmentService.getPatientDetails(email, patientEmail);
        if (detail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(detail);
    }
}
