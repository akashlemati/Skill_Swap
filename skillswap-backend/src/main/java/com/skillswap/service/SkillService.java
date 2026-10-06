package com.skillswap.service;

import com.skillswap.dto.AddUserSkillRequest;
import com.skillswap.dto.SkillResponse;
import com.skillswap.dto.UserSkillDTO;
import com.skillswap.entity.*;
import com.skillswap.exception.BadRequestException;
import com.skillswap.exception.ResourceNotFoundException;
import com.skillswap.repository.LearningSkillRepository;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.UserSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;
    private final LearningSkillRepository learningSkillRepository;

    public SkillService(SkillRepository skillRepository,
                        UserSkillRepository userSkillRepository,
                        LearningSkillRepository learningSkillRepository) {
        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
        this.learningSkillRepository = learningSkillRepository;
    }

    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAll()
                .stream()
                .map(SkillResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<SkillResponse> getSkillsByCategory(SkillCategory category) {
        return skillRepository.findByCategory(category)
                .stream()
                .map(SkillResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
    }

    @Transactional
    public UserSkillDTO addTeachingSkill(User user, AddUserSkillRequest request) {
        Skill skill = getSkillById(request.getSkillId());

        if (userSkillRepository.findByUserIdAndSkillId(user.getId(), skill.getId()).isPresent()) {
            throw new BadRequestException("You have already added '" + skill.getName() + "' to your teaching skills");
        }

        UserSkill userSkill = new UserSkill(user, skill, request.getLevel());
        UserSkill saved = userSkillRepository.save(userSkill);
        return UserSkillDTO.fromTeachEntity(saved);
    }

    @Transactional
    public void removeTeachingSkill(User user, Long skillId) {
        UserSkill userSkill = userSkillRepository.findByUserIdAndSkillId(user.getId(), skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Teaching skill record not found"));
        userSkillRepository.delete(userSkill);
    }

    @Transactional
    public UserSkillDTO addLearningSkill(User user, AddUserSkillRequest request) {
        Skill skill = getSkillById(request.getSkillId());

        if (learningSkillRepository.findByUserIdAndSkillId(user.getId(), skill.getId()).isPresent()) {
            throw new BadRequestException("You have already added '" + skill.getName() + "' to your learning wishlist");
        }

        LearningSkill learningSkill = new LearningSkill(user, skill, request.getLevel());
        LearningSkill saved = learningSkillRepository.save(learningSkill);
        return UserSkillDTO.fromLearnEntity(saved);
    }

    @Transactional
    public void removeLearningSkill(User user, Long skillId) {
        LearningSkill learningSkill = learningSkillRepository.findByUserIdAndSkillId(user.getId(), skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Learning skill record not found"));
        learningSkillRepository.delete(learningSkill);
    }
}
