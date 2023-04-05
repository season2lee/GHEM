package com.ssafy.ghem.user.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="usergamehelpful")
public class UserGameHelpful {

    @Id
    @GeneratedValue
    @Column(name = "usergamehelpful_id")
    private Long userGameHelpfulId;

    @Column(name = "user_id")
    private Long userId;


    @Column(name = "app_id")
    private Long appId;

    @Builder
    public UserGameHelpful(Long userId, Long appId){
        this.userId = userId;
        this.appId = appId;
    }
}
