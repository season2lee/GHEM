package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.GameReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameReviewCommonRepository  extends JpaRepository<GameReview, Long> {
    List<GameReview> getGameReviewByGame(Game game);
}
