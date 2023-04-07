package com.ssafy.ghem.convenience.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="chatlist")
public class ChatList {
    @Id
    @GeneratedValue
    @Column(name = "chat_id")
    private Long chatId;
    @Column(name = "user_id")
    private Long userId;
    private String content;
    private String date;
    private Integer type;

    @Builder
    public ChatList(Long userId, String content, String date, Integer type) {
        this.userId = userId;
        this.content = content;
        this.date = date;
        this.type = type;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;
}
