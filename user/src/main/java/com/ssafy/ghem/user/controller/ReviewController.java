package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.ReviewService;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.ReviewInfo;
import com.ssafy.ghem.user.model.vo.UserInfo;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    @ApiOperation(value = "평가 진행 시 사용하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n" +
                    "rating = 점수",
            response = String.class)
    public ResponseEntity<?> doReview(@RequestBody ReviewInfo reviewInfo){
        HttpVo http = reviewService.doReview(reviewInfo);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @GetMapping("/check")
    @ApiOperation(value = "게임의 평가 여부를 알려주는 API",
        notes = "app_id = 게임 고유번호" +
                "user_id = 유저 고유번호",
            response = String.class
    )
    public ResponseEntity<?> checkReview(ReviewInfo reviewInfo){
        HttpVo http = reviewService.checkReview(reviewInfo);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @DeleteMapping("{user_game_id}")
    @ApiOperation(value = "게임에 대한 평가를 삭제하는 API",
            response = String.class
    )
    public ResponseEntity<?> deleteReview(@PathVariable Long user_game_id){
        HttpVo http = reviewService.deleteReview(user_game_id);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @PutMapping("/modify")
    @ApiOperation(value = "게임에 대한 평가를 수정하는 API",
            notes = "user_game_id = 평가 고유번호\n" +
                    "rating = 수정하고자 하는 평가 점수",
            response = String.class
    )
    public ResponseEntity<?> updateReview(@RequestBody ReviewInfo reviewInfo){
        HttpVo http = reviewService.updateReview(reviewInfo);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }
}
