package com.skillswap.service;

import com.skillswap.dto.UpdateProfileRequest;
import com.skillswap.dto.UserDetailResponse;
import com.skillswap.dto.UserResponse;
import com.skillswap.dto.UserSkillDTO;
import com.skillswap.entity.SkillCategory;
import com.skillswap.entity.SkillLevel;
import com.skillswap.entity.User;
import com.skillswap.exception.ResourceNotFoundException;
import com.skillswap.repository.LearningSkillRepository;
import com.skillswap.repository.ReviewRepository;
import com.skillswap.repository.UserRepository;
import com.skillswap.repository.UserSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;
    private final LearningSkillRepository learningSkillRepository;
    private final ReviewRepository reviewRepository;

    public UserService(UserRepository userRepository,
                       UserSkillRepository userSkillRepository,
                       LearningSkillRepository learningSkillRepository,
                       ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
        this.learningSkillRepository = learningSkillRepository;
        this.reviewRepository = reviewRepository;
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public UserDetailResponse getUserDetails(User user) {
        UserDetailResponse details = UserDetailResponse.fromEntity(user);

        // Fetch skills they teach
        List<UserSkillDTO> teachList = userSkillRepository.findByUserId(user.getId())
                .stream()
                .map(UserSkillDTO::fromTeachEntity)
                .collect(Collectors.toList());
        details.setSkillsTeach(teachList);

        // Fetch skills they want to learn
        List<UserSkillDTO> learnList = learningSkillRepository.findByUserId(user.getId())
                .stream()
                .map(UserSkillDTO::fromLearnEntity)
                .collect(Collectors.toList());
        details.setSkillsLearn(learnList);

        // Fetch rating and reviews count
        Double avgRating = reviewRepository.getAverageRatingForUser(user.getId());
        details.setRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 5.0);
        details.setReviewsCount(reviewRepository.countReviewsForUser(user.getId()));

        return details;
    }

    @Transactional
    public UserResponse updateProfile(User user, UpdateProfileRequest request) {
        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName().trim());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio().trim());
        }
        if (request.getLocation() != null) {
            user.setLocation(request.getLocation().trim());
        }
        if (request.getProfileImage() != null && !request.getProfileImage().isBlank()) {
            user.setProfileImage(request.getProfileImage().trim());
        }

        User updated = userRepository.save(user);
        return UserResponse.fromEntity(updated);
    }

    public List<UserDetailResponse> discoverUsers(String keyword,
                                                 String category,
                                                 String skillLevel,
                                                 String location,
                                                 Long currentUserId) {
        List<User> allUsers = userRepository.findAll();

        return allUsers.stream()
                .filter(u -> currentUserId == null || !u.getId().equals(currentUserId))
                .map(this::getUserDetails)
                .filter(u -> {
                    // 1. Keyword search (name, bio, location, skill names)
                    if (keyword != null && !keyword.isBlank()) {
                        String term = keyword.toLowerCase();
                        boolean matchName = u.getName().toLowerCase().contains(term);
                        boolean matchBio = u.getBio() != null && u.getBio().toLowerCase().contains(term);
                        boolean matchTeach = u.getSkillsTeach().stream().anyMatch(s -> s.getName().toLowerCase().contains(term));
                        boolean matchLearn = u.getSkillsLearn().stream().anyMatch(s -> s.getName().toLowerCase().contains(term));
                        if (!matchName && !matchBio && !matchTeach && !matchLearn) return false;
                    }

                    // 2. Category filter
                    if (category != null && !category.isBlank() && !"All".equalsIgnoreCase(category)) {
                        boolean matchTeachCat = u.getSkillsTeach().stream().anyMatch(s -> s.getCategory().name().equalsIgnoreCase(category) || s.getCategory().name().replace('_', ' ').equalsIgnoreCase(category));
                        boolean matchLearnCat = u.getSkillsLearn().stream().anyMatch(s -> s.getCategory().name().equalsIgnoreCase(category) || s.getCategory().name().replace('_', ' ').equalsIgnoreCase(category));
                        if (!matchTeachCat && !matchLearnCat) return false;
                    }

                    // 3. Skill Level filter
                    if (skillLevel != null && !skillLevel.isBlank() && !"All".equalsIgnoreCase(skillLevel)) {
                        boolean matchLevel = u.getSkillsTeach().stream().anyMatch(s -> s.getLevel().name().equalsIgnoreCase(skillLevel));
                        if (!matchLevel) return false;
                    }

                    // 4. Location filter
                    if (location != null && !location.isBlank()) {
                        if (u.getLocation() == null || !u.getLocation().toLowerCase().contains(location.toLowerCase())) {
                            return false;
                        }
                    }

                    return true;
                })
                .collect(Collectors.toList());
    }
}
