package com.ssafy.ghem.convenience.controller;


import com.ssafy.ghem.convenience.model.vo.MessageVO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/message")
    public void sendMessage(MessageVO messageVO) {



        template.convertAndSend("/sub/"+messageVO.getApp_id(), messageVO);
    }
}
