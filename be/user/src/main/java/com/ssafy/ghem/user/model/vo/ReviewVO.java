package com.ssafy.ghem.user.model.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewVO {
    Long user_game_id;
    Long app_id;
    Long user_id;
    String content;
    LocalDateTime updateDate;
}
