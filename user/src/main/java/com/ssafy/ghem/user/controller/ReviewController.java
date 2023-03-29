package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.ReviewService;
import com.ssafy.ghem.user.model.vo.HttpVO;
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
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    @ApiOperation(value = "평가 진행 시 사용하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n" +
                    "rating = 점수",
            response = String.class)
    public ResponseEntity<?> doReview(@RequestBody ReviewVO reviewInfo){
        HttpVO http = reviewService.doReview(reviewInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/my/{user_id}")
    @ApiOperation(value = "내가한 모든 평가 리스트를 주는 API",
            notes = "user_id = 유저 고유번호",
            response = String.class
    )
    public ResponseEntity<?> listReview(@PathVariable Long user_id){
        HttpVO http = reviewService.listReview(user_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/check")
    @ApiOperation(value = "게임의 평가 여부를 알려주는 API",
        notes = "app_id = 게임 고유번호" +
                "user_id = 유저 고유번호",
            response = String.class
    )
    public ResponseEntity<?> checkReview(ReviewVO reviewInfo){
        HttpVO http = reviewService.checkReview(reviewInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{user_id}/{app_id}")
    @ApiOperation(value = "게임에 대한 평가를 삭제하는 API",
            notes = "user_id = 유저 고유번호\n" +
                    "app_id = 게임 고유번호\n",
            response = String.class
    )
    public ResponseEntity<?> deleteReview(@PathVariable Long user_id,
                                          @PathVariable Long app_id){
        HttpVO http = reviewService.deleteReview(user_id, app_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @PutMapping("/modify")
    @ApiOperation(value = "게임에 대한 평가를 수정하는 API",
            notes = "user_id = 유저 고유번호\n" +
                    "app_id = 게임 고유번호\n" +
                    "rating = 수정하고자 하는 평가 점수",
            response = String.class
    )
    public ResponseEntity<?> updateReview(@RequestBody ReviewVO reviewInfo){
        HttpVO http = reviewService.updateReview(reviewInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }
}
