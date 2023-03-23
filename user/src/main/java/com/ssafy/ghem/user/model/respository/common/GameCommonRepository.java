package com.ssafy.ghem.user.model.respository.common;

import com.ssafy.ghem.user.model.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameCommonRepository extends JpaRepository<Game, Long> {
}
