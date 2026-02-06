package com.synapse.backend.controller;

import com.synapse.backend.model.Slot;
import com.synapse.backend.model.Therapist;
import com.synapse.backend.repository.SlotRepository;
import com.synapse.backend.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/slots")
public class SlotController {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private TherapistRepository therapistRepository;

    // Create availability slots
    @PostMapping
    public ResponseEntity<List<Slot>> createSlots(@RequestBody List<Slot> slots) {
        // Basic validation could be added here
        List<Slot> savedSlots = slotRepository.saveAll(slots);
        return ResponseEntity.ok(savedSlots);
    }

    // Get slots by Therapist ID (optional date filter)
    @GetMapping("/therapist/{therapistId}")
    public ResponseEntity<List<Slot>> getSlotsByTherapist(
            @PathVariable String therapistId,
            @RequestParam(required = false) LocalDate date) {

        List<Slot> slots;
        if (date != null) {
            slots = slotRepository.findByTherapistIdAndDate(therapistId, date);
        } else {
            slots = slotRepository.findByTherapistId(therapistId);
        }
        return ResponseEntity.ok(slots);
    }

    // Get available (unbooked) slots for a therapist
    @GetMapping("/available/{therapistId}")
    public ResponseEntity<List<Slot>> getAvailableSlots(@PathVariable String therapistId) {
        List<Slot> slots = slotRepository.findByTherapistIdAndIsBookedFalse(therapistId);
        return ResponseEntity.ok(slots);
    }

    // Delete a slot
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable String id) {
        slotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
