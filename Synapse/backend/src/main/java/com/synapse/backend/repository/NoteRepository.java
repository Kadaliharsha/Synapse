package com.synapse.backend.repository;

import com.synapse.backend.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByAppointmentId(String appointmentId);

    List<Note> findByPatientEmail(String patientEmail);

    List<Note> findByTherapistEmail(String therapistEmail);
}
