package com.synapse.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/api")
public class SOSController {

    @PostMapping("/send-sos")
    public ResponseEntity<String> sendSOS() {
        return ResponseEntity.status(503).body("SOS Feature is temporarily disabled for system upgrades.");
    }
}
