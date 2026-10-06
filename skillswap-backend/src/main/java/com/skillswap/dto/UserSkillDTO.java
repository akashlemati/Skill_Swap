package com.skillswap.dto;

import com.skillswap.entity.LearningSkill;
import com.skillswap.entity.SkillCategory;
import com.skillswap.entity.SkillLevel;
import com.skillswap.entity.UserSkill;

public class UserSkillDTO {

    private Long id;
    private Long skillId;
    private String name;
    private SkillCategory category;
    private SkillLevel level;

    public UserSkillDTO() {
    }

    public static UserSkillDTO fromTeachEntity(UserSkill userSkill) {
        UserSkillDTO dto = new UserSkillDTO();
        dto.setId(userSkill.getId());
        dto.setSkillId(userSkill.getSkill().getId());
        dto.setName(userSkill.getSkill().getName());
        dto.setCategory(userSkill.getSkill().getCategory());
        dto.setLevel(userSkill.getLevel());
        return dto;
    }

    public static UserSkillDTO fromLearnEntity(LearningSkill learningSkill) {
        UserSkillDTO dto = new UserSkillDTO();
        dto.setId(learningSkill.getId());
        dto.setSkillId(learningSkill.getSkill().getId());
        dto.setName(learningSkill.getSkill().getName());
        dto.setCategory(learningSkill.getSkill().getCategory());
        dto.setLevel(learningSkill.getTargetLevel());
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SkillCategory getCategory() {
        return category;
    }

    public void setCategory(SkillCategory category) {
        this.category = category;
    }

    public SkillLevel getLevel() {
        return level;
    }

    public void setLevel(SkillLevel level) {
        this.level = level;
    }
}
