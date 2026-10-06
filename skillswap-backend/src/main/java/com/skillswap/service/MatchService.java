package com.skillswap.service;

import com.skillswap.dto.MatchResponseDTO;
import com.skillswap.dto.UserResponse;
import com.skillswap.entity.LearningSkill;
import com.skillswap.entity.User;
import com.skillswap.entity.UserSkill;
import com.skillswap.repository.LearningSkillRepository;
import com.skillswap.repository.UserRepository;
import com.skillswap.repository.UserSkillRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;
    private final LearningSkillRepository learningSkillRepository;

    public MatchService(UserRepository userRepository,
                        UserSkillRepository userSkillRepository,
                        LearningSkillRepository learningSkillRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
        this.learningSkillRepository = learningSkillRepository;
    }

    public List<MatchResponseDTO> calculateMatchesForUser(User currentUser, Integer minScore) {
        int threshold = minScore != null ? minScore : 50;

        List<UserSkill> myTeachSkills = userSkillRepository.findByUserId(currentUser.getId());
        List<LearningSkill> myLearnSkills = learningSkillRepository.findByUserId(currentUser.getId());

        Set<Long> myTeachSkillIds = myTeachSkills.stream().map(s -> s.getSkill().getId()).collect(Collectors.toSet());
        Set<Long> myLearnSkillIds = myLearnSkills.stream().map(s -> s.getSkill().getId()).collect(Collectors.toSet());

        List<User> otherUsers = userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(currentUser.getId()))
                .collect(Collectors.toList());

        List<MatchResponseDTO> matches = new ArrayList<>();

        for (User peer : otherUsers) {
            List<UserSkill> peerTeachSkills = userSkillRepository.findByUserId(peer.getId());
            List<LearningSkill> peerLearnSkills = learningSkillRepository.findByUserId(peer.getId());

            // 1. Check if peer teaches something I want to learn (40%)
            List<String> theyCanTeachMe = new ArrayList<>();
            for (UserSkill pt : peerTeachSkills) {
                if (myLearnSkillIds.contains(pt.getSkill().getId())) {
                    theyCanTeachMe.add(pt.getSkill().getName());
                }
            }
            int teachScore = !theyCanTeachMe.isEmpty() ? 40 : 0;

            // 2. Check if I teach something peer wants to learn (40%)
            List<String> iCanTeachThem = new ArrayList<>();
            for (LearningSkill pl : peerLearnSkills) {
                if (myTeachSkillIds.contains(pl.getSkill().getId())) {
                    iCanTeachThem.add(pl.getSkill().getName());
                }
            }
            int learnScore = !iCanTeachThem.isEmpty() ? 40 : 0;

            // If there is zero skill overlap, skip
            if (teachScore == 0 && learnScore == 0) {
                continue;
            }

            // 3. Level compatibility (10%)
            int levelScore = (teachScore > 0 && learnScore > 0) ? 10 : 5;

            // 4. Location compatibility (10%)
            int locationScore = 6;
            if (currentUser.getLocation() != null && peer.getLocation() != null) {
                if (currentUser.getLocation().equalsIgnoreCase(peer.getLocation())) {
                    locationScore = 10;
                } else if (currentUser.getLocation().split(",")[0].trim().equalsIgnoreCase(peer.getLocation().split(",")[0].trim())) {
                    locationScore = 8;
                }
            }

            int totalScore = teachScore + learnScore + levelScore + locationScore;
            totalScore = Math.min(totalScore, 100);

            if (totalScore >= threshold) {
                MatchResponseDTO match = new MatchResponseDTO();
                match.setId(peer.getId());
                match.setUser(UserResponse.fromEntity(peer));
                match.setMatchScore(totalScore);
                match.setTheyTeach(theyCanTeachMe.isEmpty() ? "Broad Guidance" : String.join(", ", theyCanTeachMe));
                match.setYouWant(theyCanTeachMe.isEmpty() ? "General" : theyCanTeachMe.get(0));
                match.setYouTeach(iCanTeachThem.isEmpty() ? "Tech Fundamentals" : String.join(", ", iCanTeachThem));
                match.setTheyWant(iCanTeachThem.isEmpty() ? "General" : iCanTeachThem.get(0));
                match.setLocationMatch(locationScore >= 8 ? "High (Same region/overlap)" : "Moderate (Flexible timezone)");
                match.setLevelMatch(levelScore == 10 ? "Optimal Reciprocal Levels" : "Compatible Mentorship Flow");
                match.setNotes(totalScore >= 85
                        ? "High reciprocal alignment! Both sides teach skills the other actively desires."
                        : "Good cross-disciplinary match for peer exchange.");

                matches.add(match);
            }
        }

        // Sort by match score descending
        matches.sort((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()));
        return matches;
    }
}
