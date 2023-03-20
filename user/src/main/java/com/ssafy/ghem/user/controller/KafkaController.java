package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.KafkaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/kafka")
public class KafkaController {
        private final KafkaService producer;

        @GetMapping("/message")
        public String sendMessage(@RequestParam("message") String message) {
            this.producer.sendMessage(message);
            return "success";
        }

}

