package com.ssafy.ghem.convenience.controller;

import com.ssafy.ghem.convenience.model.entity.Game;
import com.ssafy.ghem.convenience.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.convenience.model.vo.HttpVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Optional;

@RequestMapping("/search")
@RestController
@RequiredArgsConstructor
@Slf4j
public class SearchController {

    private final GameCommonRepository gameCommonRepository;

    @GetMapping
    @ApiOperation(value = "검색에 해당하는 게임 리스트 가져오는 API"
            ,notes = "search = 게임 제목 or 게임 app_id"
            ,response = String.class)
    public ResponseEntity<?> getGameList(String search,
        @PageableDefault(size=10)
        @SortDefault.SortDefaults({
        @SortDefault(sort = "positive_reviews", direction = Sort.Direction.DESC),
        @SortDefault(sort = "rating", direction = Sort.Direction.DESC)
    }) Pageable pageable){
        HttpVO http = new HttpVO();

        if(isConvertibleToLong(search)){
            Optional<Game> game = gameCommonRepository.searchGameByAppId(Long.parseLong(search));

            http.setFlag(true);
            http.setData(game.get());
            return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
        }

        Slice<Game> games = gameCommonRepository.searchByTitle(search, pageable);

        http.setFlag(true);
        http.setData(games);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    private boolean isConvertibleToLong(String str) {
        try {
            Long.parseLong(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
