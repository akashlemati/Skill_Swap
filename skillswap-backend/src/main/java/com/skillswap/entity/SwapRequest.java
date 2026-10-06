package com.skillswap.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "swap_requests")
public class SwapRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "proposed_skill_id", nullable = false)
    private Skill proposedSkill; // Skill sender will teach

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "target_skill_id", nullable = false)
    private Skill targetSkill; // Skill receiver will teach

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public SwapRequest() {
    }

    public SwapRequest(User sender, User receiver, Skill proposedSkill, Skill targetSkill, String message) {
        this.sender = sender;
        this.receiver = receiver;
        this.proposedSkill = proposedSkill;
        this.targetSkill = targetSkill;
        this.message = message;
        this.status = RequestStatus.PENDING;
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = RequestStatus.PENDING;
        }
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public Skill getProposedSkill() {
        return proposedSkill;
    }

    public void setProposedSkill(Skill proposedSkill) {
        this.proposedSkill = proposedSkill;
    }

    public Skill getTargetSkill() {
        return targetSkill;
    }

    public void setTargetSkill(Skill targetSkill) {
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
