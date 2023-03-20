package com.ssafy.ghem.convenience.controller;

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

    @GetMapping()
    ResponseEntity<?> hello(){
        Map<String, String> map = new HashMap<>();
        map.put("say", "hello");

        return new ResponseEntity<Map>(map, HttpStatus.OK);
    }

}
