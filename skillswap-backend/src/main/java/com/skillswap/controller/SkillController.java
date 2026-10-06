package com.skillswap.controller;

import com.skillswap.dto.AddUserSkillRequest;
import com.skillswap.dto.SkillResponse;
import com.skillswap.dto.UserSkillDTO;
import com.skillswap.entity.SkillCategory;
import com.skillswap.entity.User;
import com.skillswap.service.AuthService;
import com.skillswap.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;
    private final AuthService authService;

    public SkillController(SkillService skillService, AuthService authService) {
        this.skillService = skillService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAllSkills(
            @RequestParam(required = false) SkillCategory category
    ) {
        if (category != null) {
            return ResponseEntity.ok(skillService.getSkillsByCategory(category));
        }
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = Arrays.stream(SkillCategory.values())
                .map(Enum::name)
                .collect(Collectors.toList());
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/teach")
    public ResponseEntity<UserSkillDTO> addTeachSkill(@Valid @RequestBody AddUserSkillRequest request) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        UserSkillDTO response = skillService.addTeachingSkill(currentUser, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/teach/{skillId}")
    public ResponseEntity<Map<String, String>> removeTeachSkill(@PathVariable Long skillId) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        skillService.removeTeachingSkill(currentUser, skillId);
        return ResponseEntity.ok(Map.of("message", "Teaching skill removed successfully"));
    }

    @PostMapping("/learn")
    public ResponseEntity<UserSkillDTO> addLearnSkill(@Valid @RequestBody AddUserSkillRequest request) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        UserSkillDTO response = skillService.addLearningSkill(currentUser, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/learn/{skillId}")
    public ResponseEntity<Map<String, String>> removeLearnSkill(@PathVariable Long skillId) {
        User currentUser = authService.getCurrentAuthenticatedUser();
        skillService.removeLearningSkill(currentUser, skillId);
        return ResponseEntity.ok(Map.of("message", "Learning skill removed successfully"));
    }
}
