package com.ssafy.ghem.convenience.controller;

import com.ssafy.ghem.convenience.model.service.ChatService;
import com.ssafy.ghem.convenience.model.vo.HttpVO;
import com.ssafy.ghem.convenience.model.vo.MessageVO;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping
@Controller
@AllArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessageSendingOperations sendMessageBroker;
    private final ChatService chatService;

    @PostMapping
    @ApiOperation(value = "최초의 채팅방을 생성하는 API"
    ,notes = "app_id"
    ,response = String.class)
    public ResponseEntity<?> makeRoom(@RequestBody MessageVO messageVO){
        HttpVO http = chatService.makeRoom(messageVO.getAppId());
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @PostMapping("/test")
    @ApiOperation(value = "back-end에서 사용하는 API 프론트 절대 사용하지 말 것!"
            ,notes = "app_id"
            ,response = String.class)
    public ResponseEntity<?> makechat(@RequestBody MessageVO messageVO){
        HttpVO http = chatService.saveChat(messageVO);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/{app_id}")
    @ApiOperation(value = "게임의 해당하는 채팅 리스트를 가져오는 API"
            ,notes = "app_id = 게임 고유번호"
            ,response = String.class)
    public ResponseEntity<?> getChatList(@PathVariable Long app_id){
        HttpVO http = chatService.getChatList(app_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }


    @MessageMapping("/chat")
    public void getMessage(MessageVO messageVO) {

        log.info("message: "+messageVO.toString());
        chatService.saveChat(messageVO);

        sendMessageBroker.convertAndSend("/sub/"+messageVO.getAppId(), messageVO);
    }
}
