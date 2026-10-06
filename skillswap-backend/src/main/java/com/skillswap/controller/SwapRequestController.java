package com.skillswap.controller;

import com.skillswap.dto.CreateSwapRequestDTO;
import com.skillswap.dto.SwapRequestResponseDTO;
import com.skillswap.entity.User;
import com.skillswap.service.AuthService;
import com.skillswap.service.SwapRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/swap-requests")
public class SwapRequestController {

    private final SwapRequestService swapRequestService;
    private final AuthService authService;

    public SwapRequestController(SwapRequestService swapRequestService, AuthService authService) {
        this.swapRequestService = swapRequestService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<SwapRequestResponseDTO> createSwapRequest(
            @Valid @RequestBody CreateSwapRequestDTO dto
    ) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        SwapRequestResponseDTO response = swapRequestService.createRequest(currentUser, dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SwapRequestResponseDTO>> getMySwapRequests() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        List<SwapRequestResponseDTO> requests = swapRequestService.getRequestsForUser(currentUser);
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<SwapRequestResponseDTO> acceptSwapRequest(@PathVariable Long id) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        SwapRequestResponseDTO response = swapRequestService.acceptRequest(currentUser, id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<SwapRequestResponseDTO> rejectSwapRequest(@PathVariable Long id) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        SwapRequestResponseDTO response = swapRequestService.rejectRequest(currentUser, id);
        return ResponseEntity.ok(response);
    }
}
