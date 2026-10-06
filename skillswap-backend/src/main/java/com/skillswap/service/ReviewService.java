package com.skillswap.service;

import com.skillswap.dto.CreateReviewDTO;
import com.skillswap.dto.ReviewResponseDTO;
import com.skillswap.entity.Review;
import com.skillswap.entity.User;
import com.skillswap.exception.BadRequestException;
import com.skillswap.exception.ResourceNotFoundException;
import com.skillswap.repository.ReviewRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReviewResponseDTO createReview(User reviewer, CreateReviewDTO dto) {
        if (reviewer.getId().equals(dto.getReviewedUserId())) {
            throw new BadRequestException("You cannot leave a review for yourself");
        }

        User reviewedUser = userRepository.findById(dto.getReviewedUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Reviewed user not found with id: " + dto.getReviewedUserId()));

        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewedUser(reviewedUser);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());

        Review saved = reviewRepository.save(review);
        return ReviewResponseDTO.fromEntity(saved);
    }

    public List<ReviewResponseDTO> getReviewsForUser(Long userId) {
        return reviewRepository.findByReviewedUserId(userId)
                .stream()
                .map(ReviewResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
