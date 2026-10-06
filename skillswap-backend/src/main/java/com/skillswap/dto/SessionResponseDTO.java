package com.skillswap.dto;

import com.skillswap.entity.Session;
import com.skillswap.entity.SessionStatus;
import java.time.LocalDateTime;

public class SessionResponseDTO {

    private Long id;
    private Long swapRequestId;
    private UserResponse user1;
    private UserResponse user2;
    private String topic;
    private LocalDateTime scheduledTime;
    private Integer durationMinutes;
    private String meetingLink;
    private SessionStatus status;
    private LocalDateTime createdAt;

    public SessionResponseDTO() {
    }

    public static SessionResponseDTO fromEntity(Session s) {
        SessionResponseDTO dto = new SessionResponseDTO();
        dto.setId(s.getId());
        if (s.getSwapRequest() != null) {
            dto.setSwapRequestId(s.getSwapRequest().getId());
        }
        dto.setUser1(UserResponse.fromEntity(s.getUser1()));
        dto.setUser2(UserResponse.fromEntity(s.getUser2()));
        dto.setTopic(s.getTopic());
        dto.setScheduledTime(s.getScheduledTime());
        dto.setDurationMinutes(s.getDurationMinutes());
        dto.setMeetingLink(s.getMeetingLink());
        dto.setStatus(s.getStatus());
        dto.setCreatedAt(s.getCreatedAt());
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSwapRequestId() {
        return swapRequestId;
    }

    public void setSwapRequestId(Long swapRequestId) {
        this.swapRequestId = swapRequestId;
    }

    public UserResponse getUser1() {
        return user1;
    }

    public void setUser1(UserResponse user1) {
        this.user1 = user1;
    }

    public UserResponse getUser2() {
        return user2;
    }

    public void setUser2(UserResponse user2) {
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
