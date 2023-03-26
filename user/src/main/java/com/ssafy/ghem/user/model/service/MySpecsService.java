package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.MyPcSpecsVO;

import java.rmi.AlreadyBoundException;

public interface MySpecsService {
    HttpVo makeMySpecs(MyPcSpecsVO myPcSpecsVO);
    HttpVo updateMySpecs(MyPcSpecsVO myPcSpecsVO);
    HttpVo getMySpecs(Long user_id);
}
