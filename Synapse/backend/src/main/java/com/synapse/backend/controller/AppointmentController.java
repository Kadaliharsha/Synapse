package com.synapse.backend.controller;

import com.synapse.backend.dto.AppointmentRequest;
import com.synapse.backend.dto.StatusUpdateRequest;
import com.synapse.backend.model.Appointment;
import com.synapse.backend.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/user/{email}")
    public List<Appointment> getAppointmentsByUserEmail(@PathVariable String email) {
        return appointmentService.getAppointmentsByUserEmail(email);
    }

    @GetMapping("/pending")
    public List<Appointment> getPendingAppointmentsWithEmptyTherapistEmail() {
        return appointmentService.getPendingAppointmentsWithEmptyTherapistEmail();
    }

    @PostMapping
    public ResponseEntity<String> createAppointment(@RequestBody AppointmentRequest request) {
        appointmentService.saveAppointment(request);
        return ResponseEntity.ok("Appointment booked successfully!");
    }

    @GetMapping
    public List<Appointment> getAppointmentsByTherapist(@RequestParam String therapistEmail) {
        return appointmentService.getAppointmentsByTherapist(therapistEmail);
    }

    @PutMapping("/{id}/status")
    public Appointment updateAppointmentStatus(
            @PathVariable String id,
            @RequestBody StatusUpdateRequest request) {
        return appointmentService.updateAppointmentStatus(id, request.getStatus());
    }

    @GetMapping("/accepted")
    public ResponseEntity<List<Appointment>> getAcceptedAppointments(@RequestParam String therapistEmail) {
        if (therapistEmail == null || therapistEmail.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Appointment> appointments = appointmentService.getAcceptedAppointmentsForTherapist(therapistEmail);
        return ResponseEntity.ok(appointments);
    }
}
