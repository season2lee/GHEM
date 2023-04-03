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

    @PutMapping
    @ApiOperation(value = "리뷰 작성 시 사용하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n" +
                    "content = 내용",
            response = String.class)
    public ResponseEntity<?> doReview(@RequestBody ReviewVO reviewInfo){
        HttpVO http = reviewService.doReview(reviewInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("{app_id}")
    @ApiOperation(value = "app_id의 모든 리뷰리스트를 반환하는 API\n",
            notes = "app_id = (게임 고유번호)\n",
            response = String.class)
    public ResponseEntity<?> getListRating(@PathVariable Long app_id){
        HttpVO http = reviewService.getReview(app_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

}
