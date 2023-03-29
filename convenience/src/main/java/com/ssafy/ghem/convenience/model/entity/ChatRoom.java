package com.ssafy.ghem.convenience.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="chatroom")
public class ChatRoom {
    @Id @GeneratedValue
    @Column(name = "room_id")
    private Long roomId;
    @Column(name = "app_id")
    private Long appId;


    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ChatList> chats = new ArrayList<>();

    @Builder
    public ChatRoom(Long roomId, Long appId) {
        this.roomId = roomId;
        this.appId = appId;
    }
}
