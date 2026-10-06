package com.skillswap.controller;

import com.skillswap.dto.CreateSessionDTO;
import com.skillswap.dto.SessionResponseDTO;
import com.skillswap.entity.User;
import com.skillswap.service.AuthService;
import com.skillswap.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;
    private final AuthService authService;

    public SessionController(SessionService sessionService, AuthService authService) {
        this.sessionService = sessionService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<SessionResponseDTO> scheduleSession(
            @Valid @RequestBody CreateSessionDTO dto
    ) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        SessionResponseDTO response = sessionService.createSession(currentUser, dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SessionResponseDTO>> getMySessions() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        List<SessionResponseDTO> sessions = sessionService.getMySessions(currentUser);
        return ResponseEntity.ok(sessions);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<SessionResponseDTO> completeSession(@PathVariable Long id) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        SessionResponseDTO response = sessionService.completeSession(currentUser, id);
        return ResponseEntity.ok(response);
    }
}
