package com.ssafy.ghem.user.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long userId;
    private String nickname;
    private int gender;
    private String userImage;
    private String userProfile;
    private String userBirth;
    private String steamId;
    private String introduce;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<UserGame> userGames;

    public void setUserGame(UserGame userGame){
        this.userGames.add(userGame);
    }
}
