package com.ssafy.ghem.convenience.model.service;

import com.ssafy.ghem.convenience.model.vo.HttpVO;
import com.ssafy.ghem.convenience.model.vo.MessageVO;

public interface ChatService {
    HttpVO makeRoom(Long app_id);
    HttpVO saveChat(MessageVO messageVO);
    HttpVO getChatList(Long app_id);
}
