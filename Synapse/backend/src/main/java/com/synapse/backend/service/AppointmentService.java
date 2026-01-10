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
}
