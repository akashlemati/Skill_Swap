package com.skillswap.repository;

import com.skillswap.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUserId(Long userId);

    List<UserSkill> findBySkillId(Long skillId);

    Optional<UserSkill> findByUserIdAndSkillId(Long userId, Long skillId);

    @Query("SELECT us FROM UserSkill us WHERE LOWER(us.skill.name) LIKE LOWER(CONCAT('%', :skillName, '%'))")
    List<UserSkill> findBySkillNameContaining(@Param("skillName") String skillName);

    void deleteByUserIdAndSkillId(Long userId, Long skillId);
}
