package com.skillswap.controller;

import com.skillswap.dto.MatchResponseDTO;
import com.skillswap.entity.User;
import com.skillswap.service.AuthService;
import com.skillswap.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;
    private final AuthService authService;

    public MatchController(MatchService matchService, AuthService authService) {
        this.matchService = matchService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<MatchResponseDTO>> getMatches(
            @RequestParam(required = false, defaultValue = "50") Integer minScore
    ) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        List<MatchResponseDTO> matches = matchService.calculateMatchesForUser(currentUser, minScore);
        return ResponseEntity.ok(matches);
    }
}
