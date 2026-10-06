package com.skillswap.repository;

import com.skillswap.entity.Session;
import com.skillswap.entity.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    @Query("SELECT s FROM Session s WHERE (s.user1.id = :userId OR s.user2.id = :userId) ORDER BY s.scheduledTime ASC")
    List<Session> findAllForUser(@Param("userId") Long userId);

    @Query("SELECT s FROM Session s WHERE (s.user1.id = :userId OR s.user2.id = :userId) AND s.status = :status ORDER BY s.scheduledTime ASC")
    List<Session> findForUserByStatus(@Param("userId") Long userId, @Param("status") SessionStatus status);
}
