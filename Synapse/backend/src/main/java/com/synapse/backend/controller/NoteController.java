package com.synapse.backend.controller;

import com.synapse.backend.model.Note;
import com.synapse.backend.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @PostMapping
    public ResponseEntity<Note> createOrUpdateNote(@RequestBody Note note) {
        // Simple logic: if ID exists, update. if not, create.
        return ResponseEntity.ok(noteRepository.save(note));
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<List<Note>> getNotesByAppointment(@PathVariable String appointmentId) {
        return ResponseEntity.ok(noteRepository.findByAppointmentId(appointmentId));
    }

    @GetMapping("/patient/{patientEmail}")
    public ResponseEntity<List<Note>> getNotesByPatient(@PathVariable String patientEmail) {
        return ResponseEntity.ok(noteRepository.findByPatientEmail(patientEmail));
    }
}
