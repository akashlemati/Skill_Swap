package com.skillswap.dto;

public class MatchResponseDTO {

    private Long id;
    private UserResponse user;
    private int matchScore;
    private String theyTeach;
    private String youWant;
    private String youTeach;
    private String theyWant;
    private String locationMatch;
    private String levelMatch;
    private String notes;

    public MatchResponseDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    public int getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(int matchScore) {
        this.matchScore = matchScore;
    }

    public String getTheyTeach() {
        return theyTeach;
    }

    public void setTheyTeach(String theyTeach) {
        this.theyTeach = theyTeach;
    }

    public String getYouWant() {
        return youWant;
    }

    public void setYouWant(String youWant) {
        this.youWant = youWant;
    }

    public String getYouTeach() {
        return youTeach;
    }

    public void setYouTeach(String youTeach) {
        this.youTeach = youTeach;
    }

    public String getTheyWant() {
        return theyWant;
    }

    public void setTheyWant(String theyWant) {
        this.theyWant = theyWant;
    }

    public String getLocationMatch() {
        return locationMatch;
    }

    public void setLocationMatch(String locationMatch) {
        this.locationMatch = locationMatch;
    }

    public String getLevelMatch() {
        return levelMatch;
    }

    public void setLevelMatch(String levelMatch) {
        this.levelMatch = levelMatch;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
