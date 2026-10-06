package com.skillswap.repository;

import com.skillswap.entity.LearningSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearningSkillRepository extends JpaRepository<LearningSkill, Long> {

    List<LearningSkill> findByUserId(Long userId);

    List<LearningSkill> findBySkillId(Long skillId);

    Optional<LearningSkill> findByUserIdAndSkillId(Long userId, Long skillId);

    void deleteByUserIdAndSkillId(Long userId, Long skillId);
}
