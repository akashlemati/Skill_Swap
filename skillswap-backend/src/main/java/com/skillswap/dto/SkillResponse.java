package com.skillswap.dto;

import com.skillswap.entity.Skill;
import com.skillswap.entity.SkillCategory;

public class SkillResponse {

    private Long id;
    private String name;
    private String description;
    private SkillCategory category;

    public SkillResponse() {
    }

    public static SkillResponse fromEntity(Skill skill) {
        SkillResponse res = new SkillResponse();
        res.setId(skill.getId());
        res.setName(skill.getName());
        res.setDescription(skill.getDescription());
        res.setCategory(skill.getCategory());
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SkillCategory getCategory() {
        return category;
    }

    public void setCategory(SkillCategory category) {
        this.category = category;
    }
}
