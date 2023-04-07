package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.Helpful;
import com.ssafy.ghem.user.model.entity.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HelpfulCommonRepository extends JpaRepository<Helpful, Long> {

    @Query(value = "select h from Helpful h where h.userId =:userId and h.userGame.userGameId =:userGameId")
    Optional<Helpful> findByUserGameIdAndUserId(Long userId, Long userGameId);

    @Query(value = "delete from Helpful h where h.userGame =:userGame")
    void deleteAllUserGame(UserGame userGame);
    @Query(value = "select h from Helpful h where h.userId =:userId")
    List<Helpful> getAllUserId(Long userId);
}
