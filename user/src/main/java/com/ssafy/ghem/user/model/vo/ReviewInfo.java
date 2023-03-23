package com.ssafy.ghem.user.model.vo;

import lombok.Data;

@Data
public class ReviewInfo {
    Long user_game_id;
    Long app_id;
    Long user_id;
    int rating;
}
