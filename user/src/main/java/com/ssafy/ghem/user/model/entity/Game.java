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
public class Game {
    @Id
    @GeneratedValue
    @Column(name = "game_id")
    private Long gameId;
    private String title;
    private String game_path;
    private int rating;
    private String genre;
    private String releaseDate;
    private int estimatedTime;
    private String gameProfile;

    @JsonIgnore
    @OneToMany(mappedBy = "game")
    private List<UserGame> userGames;

    public void setUserGame(UserGame userGame){
        this.userGames.add(userGame);
    }
}
