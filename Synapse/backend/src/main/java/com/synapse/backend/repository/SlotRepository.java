package com.synapse.backend.repository;

import com.synapse.backend.model.Slot;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.List;

public interface SlotRepository extends MongoRepository<Slot, String> {
    List<Slot> findByTherapistId(String therapistId);
    List<Slot> findByTherapistIdAndDate(String therapistId, LocalDate date);
    List<Slot> findByTherapistIdAndIsBookedFalse(String therapistId);
}
