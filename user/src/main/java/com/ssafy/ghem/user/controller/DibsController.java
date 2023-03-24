package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.vo.ContentInfo;
import com.ssafy.ghem.user.model.vo.HttpVo;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/dibs")
public class DibsController {

    @PostMapping
    @ApiOperation(value = "찜 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n",
            response = String.class)
    public ResponseEntity<?> doDibs(@RequestBody ContentInfo contentInfo){
        HttpVo http = null;


        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

}
