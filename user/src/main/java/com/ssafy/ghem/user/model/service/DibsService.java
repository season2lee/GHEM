package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.DibsVO;
import com.ssafy.ghem.user.model.vo.HttpVo;

public interface DibsService {
    HttpVo doDibs(DibsVO dibsInfo);
    HttpVo checkDibs(Long app_id, Long user_id);
    HttpVo listDibGame(Long user_id);
    HttpVo deleteDibs(Long dibs_id);
}
