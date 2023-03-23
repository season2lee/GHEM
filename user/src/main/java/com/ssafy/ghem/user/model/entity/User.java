package com.ssafy.ghem.user.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"user_id", "id", "userProfile"})
@Table(name="users")
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

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<UserGame> games = new ArrayList<>();

}
