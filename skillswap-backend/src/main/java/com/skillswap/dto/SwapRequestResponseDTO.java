package com.skillswap.dto;

import com.skillswap.entity.RequestStatus;
import com.skillswap.entity.SwapRequest;
import java.time.LocalDateTime;

public class SwapRequestResponseDTO {

    private Long id;
    private UserResponse sender;
    private UserResponse receiver;
    private SkillResponse proposedSkill;
    private SkillResponse targetSkill;
    private String message;
    private RequestStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public SwapRequestResponseDTO() {
    }

    public static SwapRequestResponseDTO fromEntity(SwapRequest req) {
        SwapRequestResponseDTO dto = new SwapRequestResponseDTO();
        dto.setId(req.getId());
        dto.setSender(UserResponse.fromEntity(req.getSender()));
        dto.setReceiver(UserResponse.fromEntity(req.getReceiver()));
        dto.setProposedSkill(SkillResponse.fromEntity(req.getProposedSkill()));
        dto.setTargetSkill(SkillResponse.fromEntity(req.getTargetSkill()));
        dto.setMessage(req.getMessage());
        dto.setStatus(req.getStatus());
        dto.setCreatedAt(req.getCreatedAt());
        dto.setUpdatedAt(req.getUpdatedAt());
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserResponse getSender() {
        return sender;
    }

    public void setSender(UserResponse sender) {
        this.sender = sender;
    }

    public UserResponse getReceiver() {
        return receiver;
    }

    public void setReceiver(UserResponse receiver) {
        this.receiver = receiver;
    }

    public SkillResponse getProposedSkill() {
        return proposedSkill;
    }

    public void setProposedSkill(SkillResponse proposedSkill) {
        this.proposedSkill = proposedSkill;
    }

    public SkillResponse getTargetSkill() {
        return targetSkill;
    }

    public void setTargetSkill(SkillResponse targetSkill) {
        this.targetSkill = targetSkill;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
