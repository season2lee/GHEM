package com.ssafy.ghem.convenience.model.service;

import com.ssafy.ghem.convenience.controller.exception.AlreadyExistData;
import com.ssafy.ghem.convenience.controller.exception.DoesNotExistData;
import com.ssafy.ghem.convenience.model.entity.ChatList;
import com.ssafy.ghem.convenience.model.entity.ChatRoom;
import com.ssafy.ghem.convenience.model.entity.Game;
import com.ssafy.ghem.convenience.model.entity.User;
import com.ssafy.ghem.convenience.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.convenience.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.convenience.model.respository.individual.ChatListIndividualRepository;
import com.ssafy.ghem.convenience.model.respository.individual.ChatRoomIndividualRepository;
import com.ssafy.ghem.convenience.model.vo.HttpVO;
import com.ssafy.ghem.convenience.model.vo.MessageVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final ChatRoomIndividualRepository chatRoomIndividualRepository;
    private final ChatListIndividualRepository chatListIndividualRepository;

    @Override
    @Transactional
    public HttpVO makeRoom( Long app_id) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        Game game = getGame(app_id);

        ChatRoom checkRoom = chatRoomIndividualRepository.getChatRoomByAppId(app_id);
        if(checkRoom != null) throw new AlreadyExistData("채팅방이 이미 존재합니다. room_id: "+checkRoom.getRoomId());

        ChatRoom chatRoom = ChatRoom.builder()
                .appId(app_id)
                .build();

        chatRoomIndividualRepository.save(chatRoom);

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVO saveChat(MessageVO messageVO) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        ChatRoom chatRoom = chatRoomIndividualRepository.getChatRoomByAppId(messageVO.getAppId());
        if(chatRoom == null) throw new DoesNotExistData("해당하는 게임의 채팅방이 존재하지 않습니다. app_id: "+messageVO.getAppId());

        User user = userCommonRepository.findById(messageVO.getUserId())
                .orElseThrow(()->new DoesNotExistData("해당하는 사용자 존재하지 않습니다. user_id: "+ messageVO.getUserId()));

        ChatList chatList = ChatList.builder()
                .userId(messageVO.getUserId())
                .content(messageVO.getContent())
                .date(messageVO.getDate())
                .type(0)
                .build();

        chatList.setChatRoom(chatRoom);

        chatListIndividualRepository.save(chatList);

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVO getChatList(Long app_id) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        ChatRoom chatRoom = chatRoomIndividualRepository.getChatRoomByAppId(app_id);
        if(chatRoom == null) throw new DoesNotExistData("해당하는 게임의 채팅방이 존재하지 않습니다. app_id: "+app_id);

        List<ChatList> chatLists = chatListIndividualRepository.getChatListByAppId(chatRoom);

        http.setFlag(true);
        http.setData(chatLists);
        return http;
    }

    User getUser(Long user_id){
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() ->new DoesNotExistData("해당하는 게임정보가 존재하지 않습니다. app_id: "+user_id));

        return user;
    }

    Game getGame(Long app_id){
        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() ->new DoesNotExistData("해당하는 게임정보가 존재하지 않습니다. app_id: "+app_id));

        return game;
    }

}
