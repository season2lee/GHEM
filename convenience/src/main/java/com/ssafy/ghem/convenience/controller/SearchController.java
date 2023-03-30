package com.ssafy.ghem.convenience.controller;

import com.ssafy.ghem.convenience.model.service.SearchService;
import com.ssafy.ghem.convenience.model.vo.HttpVO;
import com.ssafy.ghem.convenience.model.vo.SearchVO;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/search")
@RestController
@RequiredArgsConstructor
@Slf4j
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    @ApiOperation(value = "검색에 해당하는 게임 리스트 가져오는 API"
            ,notes = "search = 게임 제목 or 게임 app_id"
            ,response = String.class)
    public ResponseEntity<?> getGameList(String search){
        List<SearchVO> gameList = searchService.getGameList(search);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData(gameList);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }
}
