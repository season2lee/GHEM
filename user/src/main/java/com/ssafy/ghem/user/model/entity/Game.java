package com.ssafy.ghem.user.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of ={"appId", "title", "rating", "genre", "releaseDate", "estimatedTime"})
@Table(name="game")
public class Game {
    @Id
    @Column(name = "app_id")
    private Long appId;
    private String title;
    private String genre;
    private String releaseDate;
    private int rating;
    private String rating_desc;
    private int positive_reviews;
    private int negative_reviews;

    @Builder
    public Game(Long appId, String title, String genre, String releaseDate, int rating, String rating_desc, int positive_reviews, int negative_reviews){
        this.appId = appId;
        this.title = title;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.rating_desc = rating_desc;
        this.positive_reviews = positive_reviews;
        this.negative_reviews = negative_reviews;
    }
}