package com.ssafy.ghem.user.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="helpful")
public class Helpful {

    @Id
    @GeneratedValue
    @Column(name = "helpful_id")
    private Long HelpfulId;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_game_id")
    private UserGame userGame;


    @Builder
    public Helpful(Long userId){
        this.userId = userId;
    }

    public void setUserGame(UserGame userGame){
        this.userGame = userGame;
    }

}
