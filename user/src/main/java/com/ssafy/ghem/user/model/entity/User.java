package com.ssafy.ghem.user.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"userId", "nickname", "gender", "userBirth","steamId"})
public class User {
    @Id @GeneratedValue //(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    private String nickname;
    private int gender;

    private String userProfile;

    private String userBirth;

    private String steamId;
    private String introduce;

//    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
//    private List<UserGame> games = new ArrayList<>();

    @Builder
    public User(String nickname, int gender, String userProfile, String userBirth, String steamId, String introduce){
        this.nickname = nickname;
        this.gender = gender;
        this.userProfile = userProfile;
        this.userBirth = userBirth;
        this.steamId = steamId;
        this.introduce = introduce;
    }
}
