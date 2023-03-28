package com.ssafy.ghem.user.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="gamereview")
@ToString(of ={"review_id", "content", "date"})
public class GameReview {
    @Id @GeneratedValue
    @Column(name = "review_id")
    private Long review_id;
    private String content;
    @Column(name = "date")
    private String date;

    @Builder
    public GameReview(String content) {
        this.content = content;
    }

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "app_id")
    private Game game;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_game_id")
    private UserGame userGame;

}
