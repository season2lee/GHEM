package com.ssafy.ghem.user.controller.exception.handler;

import com.ssafy.ghem.user.controller.exception.AccessDeny;
import com.ssafy.ghem.user.model.vo.HttpVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ContollerExceptionHandler {

    @ExceptionHandler(AccessDeny.class)
    public ResponseEntity<?> accessDeny(Exception e){
        HttpVo http = new HttpVo();

        log.error("error ", e.getClass().getName());
        http.setName(e.getClass().getName());
        http.setErrMessage(e.getMessage());

        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

}
