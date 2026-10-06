package com.skillswap.controller;

import com.skillswap.dto.UpdateProfileRequest;
import com.skillswap.dto.UserDetailResponse;
import com.skillswap.dto.UserResponse;
import com.skillswap.entity.User;
import com.skillswap.service.AuthService;
import com.skillswap.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDetailResponse> getCurrentUserProfile() {
        User currentUser = authService.getCurrentAuthenticatedUser();
        UserDetailResponse details = userService.getUserDetails(currentUser);
        return ResponseEntity.ok(details);
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentUserProfile(@Valid @RequestBody UpdateProfileRequest request) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        UserResponse response = userService.updateProfile(currentUser, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailResponse> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        UserDetailResponse details = userService.getUserDetails(user);
        return ResponseEntity.ok(details);
    }

    @GetMapping("/discover")
    public ResponseEntity<List<UserDetailResponse>> discoverUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String skillLevel,
            @RequestParam(required = false) String location
    ) {
        Long currentUserId = null;
        try {
            User currentUser = authService.getCurrentAuthenticatedUser();
            currentUserId = currentUser.getId();
        } catch (Exception e) {
            // Unauthenticated callers can also browse discover
        }

        List<UserDetailResponse> results = userService.discoverUsers(keyword, category, skillLevel, location, currentUserId);
        return ResponseEntity.ok(results);
    }
}
