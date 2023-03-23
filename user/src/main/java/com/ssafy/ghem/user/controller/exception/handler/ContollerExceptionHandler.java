package com.ssafy.ghem.user.controller.exception.handler;

import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.controller.exception.NoModify;
import com.ssafy.ghem.user.model.vo.HttpVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ContollerExceptionHandler {

    @ExceptionHandler(NoModify.class)
    public ResponseEntity<?> NoModify(Exception e){
        HttpVo http = new HttpVo();
        Map<String, String> map = new HashMap<>();
        log.error("error ", e.getClass().getName());

        map.put("errName", e.getClass().getName());
        map.put("errMessage", e.toString());

        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @ExceptionHandler(DoesNotExistData.class)
    public ResponseEntity<?> DoesNotExistData(Exception e){
        HttpVo http = new HttpVo();
        Map<String, String> map = new HashMap<>();
        log.error("error ", e.getClass().getName());

        map.put("errName", e.getClass().getName());
        map.put("errMessage", e.toString());

        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

}
