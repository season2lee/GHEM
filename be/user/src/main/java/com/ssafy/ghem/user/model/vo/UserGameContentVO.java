package com.ssafy.ghem.user.model.vo;

import com.ssafy.ghem.user.model.entity.UserGame;
import lombok.Data;

@Data
public class UserGameContentVO {
    private UserGame userGame;
    private String content;
}
