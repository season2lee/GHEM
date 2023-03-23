package com.ssafy.ghem.user.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"user_id", "id", "userProfile"})
public class User {
    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long user_id;
    private String id;
    private String nickname;
    private String userProfile;
    private String steamId;
    private String introduce;

    @Builder
    public User(String id, String userProfile){
        this.id = id;
        this.userProfile = userProfile;
    }


}
