package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.RatingService;
import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.RatingVO;
import com.ssafy.ghem.user.model.vo.ReviewVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/rating")
public class RatingController {

    private final RatingService ratingService;

    @GetMapping("/{user_id}")
    @ApiOperation(value = "user_id가 준 평점리스트를 반환하는 API\n",
            notes = "app_id = (게임 고유번호)\n",
            response = String.class)
    public ResponseEntity<?> getListRating(@PathVariable Long user_id){
        HttpVO http = ratingService.getList(user_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/{user_id}/{app_id}")
    @ApiOperation(value = "user_id가 app_id에 준 평점을 반환하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n",
            response = String.class)
    public ResponseEntity<?> getRating(@PathVariable Long user_id, @PathVariable Long app_id){
        HttpVO http = ratingService.read(user_id, app_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "평가 시 사용하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n" +
                    "rating = 점수",
            response = String.class)
    public ResponseEntity<?> createRating(@RequestBody RatingVO ratingInfo){
        HttpVO http = ratingService.create(ratingInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @PutMapping
    @ApiOperation(value = "평가 수정시 사용하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n" +
                    "rating = 점수",
            response = String.class)
    public ResponseEntity<?> updateRating(@RequestBody RatingVO ratingInfo){
        HttpVO http = ratingService.update(ratingInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @DeleteMapping
    @ApiOperation(value = "평가 삭제시 사용하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)",
            response = String.class)
    public ResponseEntity<?> deleteRating(RatingVO ratingInfo){
        HttpVO http = ratingService.delete(ratingInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

}
