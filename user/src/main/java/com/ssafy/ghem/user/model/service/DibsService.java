package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.DibsInfo;
import com.ssafy.ghem.user.model.vo.HttpVo;

public interface DibsService {
    HttpVo doDibs(DibsInfo dibsInfo);
    HttpVo checkDibs(Long app_id, Long user_id);
}
