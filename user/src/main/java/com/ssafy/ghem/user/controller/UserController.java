package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.UserService;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping
    public ResponseEntity<?> updateUserInfo(@RequestBody UserInfo userInfo){
        HttpVo http = new HttpVo();

        log.info("{}", userInfo);
        userService.updateUserInfo(userInfo);

        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }
}
