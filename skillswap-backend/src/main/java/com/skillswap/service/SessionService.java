package com.skillswap.service;

import com.skillswap.dto.CreateSessionDTO;
import com.skillswap.dto.SessionResponseDTO;
import com.skillswap.entity.Session;
import com.skillswap.entity.SessionStatus;
import com.skillswap.entity.SwapRequest;
import com.skillswap.entity.User;
import com.skillswap.exception.BadRequestException;
import com.skillswap.exception.ResourceNotFoundException;
import com.skillswap.exception.UnauthorizedException;
import com.skillswap.repository.SessionRepository;
import com.skillswap.repository.SwapRequestRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final SwapRequestRepository swapRequestRepository;

    public SessionService(SessionRepository sessionRepository,
                          UserRepository userRepository,
                          SwapRequestRepository swapRequestRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.swapRequestRepository = swapRequestRepository;
    }

    @Transactional
    public SessionResponseDTO createSession(User currentUser, CreateSessionDTO dto) {
        if (currentUser.getId().equals(dto.getPeerUserId())) {
            throw new BadRequestException("You cannot schedule a session with yourself");
        }

        User peer = userRepository.findById(dto.getPeerUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Peer user not found with id: " + dto.getPeerUserId()));

        Session session = new Session();
        session.setUser1(currentUser);
        session.setUser2(peer);
        session.setTopic(dto.getTopic());
        session.setScheduledTime(dto.getScheduledTime());
        session.setDurationMinutes(dto.getDurationMinutes() != null ? dto.getDurationMinutes() : 60);
        session.setMeetingLink(dto.getMeetingLink() != null && !dto.getMeetingLink().isBlank()
                ? dto.getMeetingLink()
                : "https://meet.google.com/ssw-" + (int)(Math.random() * 900 + 100));
        session.setStatus(SessionStatus.SCHEDULED);

        if (dto.getSwapRequestId() != null) {
            SwapRequest swapReq = swapRequestRepository.findById(dto.getSwapRequestId()).orElse(null);
            session.setSwapRequest(swapReq);
        }

        Session saved = sessionRepository.save(session);
        return SessionResponseDTO.fromEntity(saved);
    }

    public List<SessionResponseDTO> getMySessions(User currentUser) {
        return sessionRepository.findAllForUser(currentUser.getId())
                .stream()
                .map(SessionResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public SessionResponseDTO completeSession(User currentUser, Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id: " + sessionId));

        if (!session.getUser1().getId().equals(currentUser.getId()) &&
            !session.getUser2().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You are not a participant of this session");
        }

        session.setStatus(SessionStatus.COMPLETED);
        Session updated = sessionRepository.save(session);
        return SessionResponseDTO.fromEntity(updated);
    }
}
