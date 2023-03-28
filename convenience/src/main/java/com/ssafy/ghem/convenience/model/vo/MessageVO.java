package com.ssafy.ghem.convenience.model.vo;

import lombok.Data;

@Data
public class MessageVO {
    private Long user_id;
    private Long app_id;
    private String content;
}
