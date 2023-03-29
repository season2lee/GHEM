package com.ssafy.ghem.convenience.controller;

import com.ssafy.ghem.convenience.model.vo.MessageVO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
@Controller
@AllArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/chat")
    public void mapHandler(MessageVO messageVO) {

        log.info("message: "+messageVO.toString());

        sendingOperations.convertAndSend("/sub", messageVO);;
    }
}
