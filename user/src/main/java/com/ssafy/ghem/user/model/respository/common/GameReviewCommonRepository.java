package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.GameReview;
import com.ssafy.ghem.user.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameReviewCommonRepository  extends JpaRepository<GameReview, Long> {
    Page<GameReview> getGameReviewByGame(Game game, Pageable pageable);
    GameReview findByUserAndGame(User user, Game game);
}
