package com.skillswap.dto;

import com.skillswap.entity.Role;
import com.skillswap.entity.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class UserDetailResponse {

    private Long id;
    private String name;
    private String email;
    private String title;
    private String bio;
    private String location;
    private String availability;
    private String profileImage;
    private Role role;
    private LocalDateTime createdAt;
    private Double rating;
    private Long reviewsCount;
    private List<UserSkillDTO> skillsTeach = new ArrayList<>();
    private List<UserSkillDTO> skillsLearn = new ArrayList<>();
    private Integer compatibility;

    public UserDetailResponse() {
    }

    public static UserDetailResponse fromEntity(User user) {
        UserDetailResponse res = new UserDetailResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setTitle(user.getTitle());
        res.setBio(user.getBio());
        res.setLocation(user.getLocation());
        res.setAvailability(user.getAvailability());
        res.setProfileImage(user.getProfileImage());
        res.setRole(user.getRole());
        res.setCreatedAt(user.getCreatedAt());
        return res;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Long getReviewsCount() {
        return reviewsCount;
    }

    public void setReviewsCount(Long reviewsCount) {
        this.reviewsCount = reviewsCount;
    }

    public List<UserSkillDTO> getSkillsTeach() {
        return skillsTeach;
    }

    public void setSkillsTeach(List<UserSkillDTO> skillsTeach) {
        this.skillsTeach = skillsTeach;
    }

    public List<UserSkillDTO> getSkillsLearn() {
        return skillsLearn;
    }

    public void setSkillsLearn(List<UserSkillDTO> skillsLearn) {
        this.skillsLearn = skillsLearn;
    }

    public Integer getCompatibility() {
        return compatibility;
    }

    public void setCompatibility(Integer compatibility) {
        this.compatibility = compatibility;
    }
}
