package com.skillswap.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "swap_request_id")
    private SwapRequest swapRequest;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user1_id", nullable = false)
    private User user1;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user2_id", nullable = false)
    private User user2;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private LocalDateTime scheduledTime;

    private Integer durationMinutes;

    private String meetingLink;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Session() {
    }

    public Session(User user1, User user2, String topic, LocalDateTime scheduledTime, Integer durationMinutes, String meetingLink) {
        this.user1 = user1;
        this.user2 = user2;
        this.topic = topic;
        this.scheduledTime = scheduledTime;
        this.durationMinutes = durationMinutes != null ? durationMinutes : 60;
        this.meetingLink = meetingLink;
        this.status = SessionStatus.SCHEDULED;
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = SessionStatus.SCHEDULED;
        }
        if (this.durationMinutes == null) {
            this.durationMinutes = 60;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SwapRequest getSwapRequest() {
        return swapRequest;
    }

    public void setSwapRequest(SwapRequest swapRequest) {
        this.swapRequest = swapRequest;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public SessionStatus getStatus() {
        return status;
    }

    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
