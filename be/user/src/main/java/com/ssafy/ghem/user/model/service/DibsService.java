package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.DibsVO;
import com.ssafy.ghem.user.model.vo.HttpVO;

public interface DibsService {
    HttpVO doDibs(DibsVO dibsInfo);
    HttpVO checkDibs(Long app_id, Long user_id);
    HttpVO listDibGame(Long user_id);
    HttpVO deleteDibs(Long dibs_id);
}
