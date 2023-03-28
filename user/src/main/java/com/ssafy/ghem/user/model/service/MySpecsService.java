package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.MyPcSpecsVO;

import java.rmi.AlreadyBoundException;

public interface MySpecsService {
    HttpVo makeMySpecs(MyPcSpecsVO myPcSpecsVO);
    HttpVo updateMySpecs(MyPcSpecsVO myPcSpecsVO);
    HttpVo getMySpecs(Long user_id);
    HttpVo getCpuModel(String brand, String input);
    HttpVo getCpuBrand();
    HttpVo getGpuModel(String brand, String input);
    HttpVo getGpuBrand();
    HttpVo getCompareCpu(String my_model, String game_model);
    HttpVo getCompareGpu(String my_model, String game_model);
}
