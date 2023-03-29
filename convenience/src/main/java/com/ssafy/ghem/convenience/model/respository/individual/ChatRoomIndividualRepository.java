package com.ssafy.ghem.convenience.model.respository.individual;

import com.ssafy.ghem.convenience.model.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChatRoomIndividualRepository extends JpaRepository<ChatRoom, Long> {
    @Query(value = "select r from ChatRoom r where r.appId=:app_id")
    ChatRoom getChatRoomByAppId(Long app_id);
}
