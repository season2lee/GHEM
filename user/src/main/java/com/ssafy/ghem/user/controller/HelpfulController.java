package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.HelpfulService;
import com.ssafy.ghem.user.model.vo.HelpfulVO;
import com.ssafy.ghem.user.model.vo.HttpVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/helpful")
public class HelpfulController {

    private HelpfulService helpfulService;

    @PostMapping
    @ApiOperation(value = "user_id가 app_id에 있는 helpful_id의 리뷰에 좋아요 API\n",
            notes = "user_game_id = (userGame 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)",
            response = String.class)
    public ResponseEntity<?> postHelpful(@RequestBody HelpfulVO helpfulVO){
        HttpVO http = helpfulService.createHelpful(helpfulVO);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "user_id가 좋아요 누른 목록 API\n",
            notes = "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)",
            response = String.class)
    public ResponseEntity<?> getHelpful(@RequestParam Long user_id){
        HttpVO http = helpfulService.getHelpful(user_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }


    @DeleteMapping
    @ApiOperation(value = "user_id가 app_id에 있는 helpful_id의 리뷰에 좋아요 취소 API\n",
            notes = "user_game_id = (userGame 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)",
            response = String.class)
    public ResponseEntity<?> deleteReview(@RequestParam HelpfulVO helpfulVO){
        HttpVO http = helpfulService.deleteHelpful(helpfulVO);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }
}
