package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.entity.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserGameCommonRepository extends JpaRepository<UserGame, Long> {
    @Query(value = "select u from UserGame u where u.game=:game and u.user=:user")
    UserGame findByUserGame(Game game, User user);
    @Query(value = "select u from UserGame u where u.game.appId =:app_id")
    List<UserGame> findByAppId(Long app_id);
    List<UserGame> findByUser(User user);
}
