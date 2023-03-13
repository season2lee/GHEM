package com.ssafy.ghem.user.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserGame {
    @Id
    @GeneratedValue
    @Column(name = "type_id")
    private Long typeId;
    private int type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JoinColumn(name = "game_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Game game;

    public void set(Game game, User user) {
        this.game = game;
        this.user = user;
        game.setUserGame(this);
        user.setUserGame(this);
    }
}
