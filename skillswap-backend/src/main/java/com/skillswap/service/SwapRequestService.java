package com.skillswap.service;

import com.skillswap.dto.CreateSwapRequestDTO;
import com.skillswap.dto.SwapRequestResponseDTO;
import com.skillswap.entity.RequestStatus;
import com.skillswap.entity.Skill;
import com.skillswap.entity.SwapRequest;
import com.skillswap.entity.User;
import com.skillswap.exception.BadRequestException;
import com.skillswap.exception.ResourceNotFoundException;
import com.skillswap.exception.UnauthorizedException;
import com.skillswap.repository.SkillRepository;
import com.skillswap.repository.SwapRequestRepository;
import com.skillswap.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SwapRequestService {

    private final SwapRequestRepository swapRequestRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public SwapRequestService(SwapRequestRepository swapRequestRepository,
                              UserRepository userRepository,
                              SkillRepository skillRepository) {
        this.swapRequestRepository = swapRequestRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    @Transactional
    public SwapRequestResponseDTO createRequest(User sender, CreateSwapRequestDTO dto) {
        if (sender.getId().equals(dto.getReceiverId())) {
            throw new BadRequestException("You cannot send a skill-swap request to yourself");
        }

        User receiver = userRepository.findById(dto.getReceiverId())
                .orElseThrow(() -> new ResourceNotFoundException("Receiver user not found with id: " + dto.getReceiverId()));

        Skill proposedSkill = skillRepository.findById(dto.getProposedSkillId())
                .orElseThrow(() -> new ResourceNotFoundException("Proposed skill not found with id: " + dto.getProposedSkillId()));

        Skill targetSkill = skillRepository.findById(dto.getTargetSkillId())
                .orElseThrow(() -> new ResourceNotFoundException("Target skill not found with id: " + dto.getTargetSkillId()));

        // Check if there is already an active pending request between these users
        List<SwapRequest> existing = swapRequestRepository.findBetweenUsersWithStatus(
                sender.getId(), receiver.getId(), RequestStatus.PENDING
        );
        if (!existing.isEmpty()) {
            throw new BadRequestException("An active pending request already exists between you and this peer");
        }

        SwapRequest req = new SwapRequest();
        req.setSender(sender);
        req.setReceiver(receiver);
        req.setProposedSkill(proposedSkill);
        req.setTargetSkill(targetSkill);
        req.setMessage(dto.getMessage());
        req.setStatus(RequestStatus.PENDING);

        SwapRequest saved = swapRequestRepository.save(req);
        return SwapRequestResponseDTO.fromEntity(saved);
    }

    public List<SwapRequestResponseDTO> getRequestsForUser(User user) {
        return swapRequestRepository.findAllForUser(user.getId())
                .stream()
                .map(SwapRequestResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public SwapRequestResponseDTO acceptRequest(User currentUser, Long requestId) {
        SwapRequest request = swapRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Swap request not found with id: " + requestId));

        if (!request.getReceiver().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Only the recipient of the swap request can accept it");
        }

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be accepted. Current status: " + request.getStatus());
        }

        request.setStatus(RequestStatus.ACCEPTED);
        SwapRequest updated = swapRequestRepository.save(request);
        return SwapRequestResponseDTO.fromEntity(updated);
    }

    @Transactional
    public SwapRequestResponseDTO rejectRequest(User currentUser, Long requestId) {
        SwapRequest request = swapRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Swap request not found with id: " + requestId));

        if (!request.getReceiver().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Only the recipient of the swap request can reject it");
        }

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be rejected. Current status: " + request.getStatus());
        }

        request.setStatus(RequestStatus.REJECTED);
        SwapRequest updated = swapRequestRepository.save(request);
        return SwapRequestResponseDTO.fromEntity(updated);
    }
}
