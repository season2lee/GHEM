package com.ssafy.ghem.convenience.model.vo;

import lombok.Data;

@Data
public class MessageVO {
    private Long userId;
    private Long appId;
    private Integer type;
    private String content;
    private String date;
}
