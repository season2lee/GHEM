package com.ssafy.ghem.user.model.vo;

import lombok.Data;

@Data
public class RatingVO {
    Long app_id;
    Long user_id;
    int rating;
}
