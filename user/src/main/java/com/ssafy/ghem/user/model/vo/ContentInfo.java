package com.ssafy.ghem.user.model.vo;

import lombok.Data;

@Data
public class ContentInfo {
    Long review_id;
    Long user_id;
    Long app_id;
    Long user_game_id;
    String content;
    String date;
}
