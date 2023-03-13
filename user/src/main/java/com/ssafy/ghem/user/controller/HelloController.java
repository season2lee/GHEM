package com.ssafy.ghem.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class HelloController {

    @GetMapping
    public ResponseEntity<?> test(){
        Map<String, String> map = new HashMap<>();
        map.put("hello", "hello");

        return new ResponseEntity<Map>(map, HttpStatus.OK);
    }
}
