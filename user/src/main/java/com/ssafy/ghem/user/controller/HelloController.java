package com.ssafy.ghem.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @GetMapping
    ResponseEntity<?> sayHello(){
        Map<String, String> map = new HashMap<>();
        map.put("say", "hello");
        map.put("1", "1");
        map.put("2", "2");
        map.put("3", "3");
        map.put("4", "4");
        map.put("5", "5");
        map.put("6", "6");
        map.put("6", "6");
        map.put("6", "6");

        return new ResponseEntity<Map>(map, HttpStatus.OK);
    }

}
