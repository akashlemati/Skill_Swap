package com.skillswap.repository;

import com.skillswap.entity.RequestStatus;
import com.skillswap.entity.SwapRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SwapRequestRepository extends JpaRepository<SwapRequest, Long> {

    List<SwapRequest> findBySenderId(Long senderId);

    List<SwapRequest> findByReceiverId(Long receiverId);

    @Query("SELECT sr FROM SwapRequest sr WHERE sr.sender.id = :userId OR sr.receiver.id = :userId ORDER BY sr.createdAt DESC")
    List<SwapRequest> findAllForUser(@Param("userId") Long userId);

    @Query("SELECT sr FROM SwapRequest sr WHERE " +
           "((sr.sender.id = :user1Id AND sr.receiver.id = :user2Id) OR " +
           "(sr.sender.id = :user2Id AND sr.receiver.id = :user1Id)) AND " +
           "sr.status = :status")
    List<SwapRequest> findBetweenUsersWithStatus(
            @Param("user1Id") Long user1Id,
            @Param("user2Id") Long user2Id,
            @Param("status") RequestStatus status
    );
}
