package com.synapse.backend.service;

import com.synapse.backend.dto.AppointmentRequest;
import com.synapse.backend.model.Appointment;
import com.synapse.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAppointmentsByUserEmail(String email) {
        return appointmentRepository.findByEmail(email); // Updated to use 'findByEmail'
    }

    public void saveAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        appointment.setName(request.getName());
        appointment.setEmail(request.getEmail());
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setMessage(request.getMessage());
        appointment.setStatus("Pending");
        if (request.getTherapistEmail() == null) {
            appointment.setTherapistEmail("");
        } else {

            appointment.setTherapistEmail(request.getTherapistEmail());
        }
        appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByTherapist(String therapistEmail) {
        return appointmentRepository.findByTherapistEmail(therapistEmail);
    }

    public List<Appointment> getPendingAppointmentsWithEmptyTherapistEmail() {
        return appointmentRepository.findByTherapistEmailAndStatus("", "Pending");
    }

    public List<Appointment> getAcceptedAppointmentsForTherapist(String therapistEmail) {
        return appointmentRepository.findByTherapistEmailAndStatus(therapistEmail, "Accepted");
    }

    public Appointment updateAppointmentStatus(String id, String status) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(id);

        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            return appointmentRepository.save(appointment);
        } else {
            throw new RuntimeException("Appointment not found");
        }
    }

    public List<com.synapse.backend.dto.PatientSummaryDTO> getPatientsForTherapist(String therapistEmail) {
        List<Appointment> allAppointments = appointmentRepository.findByTherapistEmail(therapistEmail);

        // Map: Email -> List<Appointment>
        java.util.Map<String, List<Appointment>> patientsMap = allAppointments.stream()
                .filter(a -> a.getEmail() != null && !a.getEmail().isEmpty())
                .collect(java.util.stream.Collectors.groupingBy(Appointment::getEmail));

        List<com.synapse.backend.dto.PatientSummaryDTO> summaries = new java.util.ArrayList<>();

        for (java.util.Map.Entry<String, List<Appointment>> entry : patientsMap.entrySet()) {
            String email = entry.getKey();
            List<Appointment> appts = entry.getValue();

            // Find name (take from latest appointment or any)
            String name = appts.get(0).getName();
            int totalSessions = appts.size();

            // Find last session date
            // Assuming date is stored as YYYY-MM-DD string or LocalDate. Model says
            // LocalDate.
            // But Appointment.java uses LocalDate object.
            java.time.LocalDate lastDate = appts.stream()
                    .map(Appointment::getDate)
                    .filter(java.util.Objects::nonNull)
                    .max(java.time.LocalDate::compareTo)
                    .orElse(null);

            String status = "Inactive";
            if (lastDate != null) {
                // If last session within 30 days, Active
                if (lastDate.isAfter(java.time.LocalDate.now().minusDays(30))) {
                    status = "Active";
                }
            }

            summaries.add(new com.synapse.backend.dto.PatientSummaryDTO(
                    name,
                    email,
                    totalSessions,
                    lastDate != null ? lastDate.toString() : "N/A",
                    status));
        }

        return summaries;
    }

    public com.synapse.backend.dto.PatientDetailDTO getPatientDetails(String therapistEmail, String patientEmail) {
        List<Appointment> history = appointmentRepository.findByTherapistEmailAndEmail(therapistEmail, patientEmail);

        if (history.isEmpty()) {
            return null; // Or throw exception
        }

        // Sort by date descending
        history.sort((a, b) -> {
            if (a.getDate() == null || b.getDate() == null)
                return 0;
            return b.getDate().compareTo(a.getDate());
        });

        Appointment latest = history.get(0);
        String name = latest.getName();
        int total = history.size();

        // Determine status
        java.time.LocalDate lastDate = history.stream()
                .map(Appointment::getDate)
                .filter(java.util.Objects::nonNull)
                .max(java.time.LocalDate::compareTo)
                .orElse(null);

        String status = "Inactive";
        if (lastDate != null && lastDate.isAfter(java.time.LocalDate.now().minusDays(30))) {
            status = "Active";
        }

        // Find next session
        String nextSession = history.stream()
                .filter(a -> "ACCEPTED".equalsIgnoreCase(a.getStatus()))
                .map(Appointment::getDate)
                .filter(d -> d != null && d.isAfter(java.time.LocalDate.now()))
                .sorted()
                .findFirst()
                .map(java.time.LocalDate::toString)
                .orElse(null);

        return new com.synapse.backend.dto.PatientDetailDTO(name, patientEmail, status, total, nextSession, history);
    }
}
