package com.ssafy.ghem.user.model.vo;

import com.ssafy.ghem.user.model.entity.Game;
import io.swagger.annotations.ApiOperation;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DibsInfo {
    Long dibsId;
    Long appId;
    Long userId;
    Game game;
}
