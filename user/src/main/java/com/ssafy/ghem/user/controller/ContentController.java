package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.ContentService;
import com.ssafy.ghem.user.model.vo.ContentVO;
import com.ssafy.ghem.user.model.vo.HttpVo;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/content")
public class ContentController {

    private final ContentService contentService;

    @PostMapping
    @ApiOperation(value = "리뷰 작성 시 사용하는 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n" +
                    "user_game_id = 평가 고유번호" +
                    "content = 리뷰 글\n" +
                    "date = 현재 날짜",
            response = String.class)
    public ResponseEntity<?> writeContent(@RequestBody ContentVO contentInfo){
        HttpVo http = contentService.writeContent(contentInfo);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @GetMapping("/{app_id}")
    @ApiOperation(value = "해당 게임의 작성된 모든 리뷰 글을 보여주는 API",
    notes = "app_id = 게임 고유번호\n" +
            "page = 보고싶은 페이지 번호\n" +
            "size = 한번에 보고싶은 갯수",
    response = String.class)
    public ResponseEntity<?> listContent(@PathVariable Long app_id,
                                         @PageableDefault(size = 5) Pageable pageable){
//        log.info("{}, {}, {}", app_id, max, page);
        HttpVo http = contentService.listContent(app_id, pageable);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @PutMapping("/modify")
    @ApiOperation(value = "해당 게임의 작성된 모든 리뷰 글을 수정하는 API",
            notes = "app_id = 게임 고유번호" +
                    "user_id = 유저 고유번호" +
                    "content = 수정하려는 글",
            response = String.class)
    public ResponseEntity<?> updateContent(@RequestBody ContentVO contentInfo){

        HttpVo http = contentService.updateContent(contentInfo);//contentService.listContent(app_id);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }
}
