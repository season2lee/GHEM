package com.ssafy.ghem.convenience.model.respository.common;

import com.ssafy.ghem.convenience.model.entity.Game;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.Optional;

public interface GameCommonRepository extends JpaRepository<Game, Long> {
    @Query(value = "select g from Game g where lower(g.title) like lower(concat('%', :title, '%'))")
    Slice<Game> searchByTitle(String title, Pageable pageable);

    Optional<Game> searchGameByAppId(Long app_id);
}
