package com.skillswap.dto;

import com.skillswap.entity.SkillLevel;
import jakarta.validation.constraints.NotNull;

public class AddUserSkillRequest {

    @NotNull(message = "Skill ID is required")
    private Long skillId;

    @NotNull(message = "Skill level is required")
    private SkillLevel level;

    public AddUserSkillRequest() {
    }

    public AddUserSkillRequest(Long skillId, SkillLevel level) {
        this.skillId = skillId;
        this.level = level;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public SkillLevel getLevel() {
        return level;
    }

    public void setLevel(SkillLevel level) {
        this.level = level;
    }
}
