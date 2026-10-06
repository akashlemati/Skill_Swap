package com.skillswap.controller;

import com.skillswap.dto.CreateReviewDTO;
import com.skillswap.dto.ReviewResponseDTO;
import com.skillswap.entity.User;
import com.skillswap.service.AuthService;
import com.skillswap.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final AuthService authService;

    public ReviewController(ReviewService reviewService, AuthService authService) {
        this.reviewService = reviewService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(
            @Valid @RequestBody CreateReviewDTO dto
    ) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        ReviewResponseDTO response = reviewService.createReview(currentUser, dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsForUser(@PathVariable Long userId) {
        List<ReviewResponseDTO> reviews = reviewService.getReviewsForUser(userId);
        return ResponseEntity.ok(reviews);
    }
}
