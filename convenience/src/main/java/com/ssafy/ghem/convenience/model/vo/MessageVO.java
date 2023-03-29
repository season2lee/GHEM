package com.ssafy.ghem.convenience.model.vo;

import lombok.Data;

@Data
public class MessageVO {
    private Long user_id;
    private Long app_id;
    private String content;

    @Override
    public String toString() {
        return "MessageVO{" +
                "user_id=" + user_id +
                ", app_id=" + app_id +
                ", content='" + content + '\'' +
                '}';
    }
}
