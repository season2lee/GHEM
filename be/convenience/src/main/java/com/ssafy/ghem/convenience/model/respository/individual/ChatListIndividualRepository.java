package com.ssafy.ghem.convenience.model.respository.individual;


import com.ssafy.ghem.convenience.model.entity.ChatList;
import com.ssafy.ghem.convenience.model.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatListIndividualRepository extends JpaRepository<ChatList, Long> {
    @Query(value = "select l from ChatList l where l.chatRoom=:chatRoom")
    List<ChatList> getChatListByAppId(ChatRoom chatRoom);
}
