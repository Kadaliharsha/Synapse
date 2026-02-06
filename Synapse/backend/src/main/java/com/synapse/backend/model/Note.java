package com.synapse.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "notes")
public class Note {
    @Id
    private String id;

    private String appointmentId;
    private String therapistEmail;
    private String patientEmail;

    private String subjective;
    private String objective;
    private String assessment;
    private String plan;

    private LocalDateTime createdAt = LocalDateTime.now();
}
