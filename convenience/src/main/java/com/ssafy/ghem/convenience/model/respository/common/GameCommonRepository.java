package com.ssafy.ghem.convenience.model.respository.common;

import com.ssafy.ghem.convenience.model.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameCommonRepository extends JpaRepository<Game, Long> { }
