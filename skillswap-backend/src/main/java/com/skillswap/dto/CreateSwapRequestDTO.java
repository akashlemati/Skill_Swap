package com.skillswap.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateSwapRequestDTO {

    @NotNull(message = "Receiver user ID is required")
    private Long receiverId;

    @NotNull(message = "Proposed skill ID is required")
    private Long proposedSkillId;

    @NotNull(message = "Target skill ID is required")
    private Long targetSkillId;

    @Size(max = 500, message = "Message must not exceed 500 characters")
    private String message;

    public CreateSwapRequestDTO() {
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public Long getProposedSkillId() {
        return proposedSkillId;
    }

    public void setProposedSkillId(Long proposedSkillId) {
        this.proposedSkillId = proposedSkillId;
    }

    public Long getTargetSkillId() {
        return targetSkillId;
    }

    public void setTargetSkillId(Long targetSkillId) {
        this.targetSkillId = targetSkillId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
