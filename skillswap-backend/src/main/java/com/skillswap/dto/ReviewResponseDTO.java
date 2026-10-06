package com.skillswap.dto;

import com.skillswap.entity.Review;
import java.time.LocalDateTime;

public class ReviewResponseDTO {

    private Long id;
    private UserResponse reviewer;
    private Long reviewedUserId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public ReviewResponseDTO() {
    }

    public static ReviewResponseDTO fromEntity(Review r) {
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setId(r.getId());
        dto.setReviewer(UserResponse.fromEntity(r.getReviewer()));
        dto.setReviewedUserId(r.getReviewedUser().getId());
        dto.setRating(r.getRating());
        dto.setComment(r.getComment());
        dto.setCreatedAt(r.getCreatedAt());
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserResponse getReviewer() {
        return reviewer;
    }

    public void setReviewer(UserResponse reviewer) {
        this.reviewer = reviewer;
    }

    public Long getReviewedUserId() {
        return reviewedUserId;
    }

    public void setReviewedUserId(Long reviewedUserId) {
        this.reviewedUserId = reviewedUserId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
