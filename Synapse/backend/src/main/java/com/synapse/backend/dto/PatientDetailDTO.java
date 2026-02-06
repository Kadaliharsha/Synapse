package com.synapse.backend.dto;

import com.synapse.backend.model.Appointment;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDetailDTO {
    private String name;
    private String email;
    private String status; // "Active", "Inactive"
    private int totalSessions;
    private String nextSession; // Date string or null
    private List<Appointment> appointmentHistory;
}
