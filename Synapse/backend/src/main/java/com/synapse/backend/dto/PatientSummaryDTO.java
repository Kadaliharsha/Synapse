package com.synapse.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientSummaryDTO {
    private String name;
    private String email;
    private int totalSessions;
    private String lastSessionDate;
    private String status; // e.g. "Active", "Inactive"
}
