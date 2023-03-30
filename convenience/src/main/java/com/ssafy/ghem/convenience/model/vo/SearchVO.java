package com.ssafy.ghem.convenience.model.vo;

import com.ssafy.ghem.convenience.model.entity.Game;
import lombok.Data;

@Data
public class SearchVO {
    private Long appId;
    private String genre;
    private String title;
    private int rating;
    private String release_date;

    public SearchVO(Game game){
        this.appId = game.getAppId();
        this.genre = game.getGenre();
        this.title = game.getTitle();
        this.rating = game.getRating();
        this. release_date = game.getRelease_date();
    }

}
