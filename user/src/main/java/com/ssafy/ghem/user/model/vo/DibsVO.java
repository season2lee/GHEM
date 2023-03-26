package com.ssafy.ghem.user.model.vo;

import com.ssafy.ghem.user.model.entity.Game;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DibsVO {
    Long dibsId;
    Long appId;
    Long userId;
    Game game;
}
