package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.MyPcSpecsVO;

public interface MySpecsService {
    HttpVO makeMySpecs(MyPcSpecsVO myPcSpecsVO);
    HttpVO updateMySpecs(MyPcSpecsVO myPcSpecsVO);
    HttpVO getMySpecs(Long user_id);
    HttpVO getCpuModel(String brand, String input);
    HttpVO getCpuBrand();
    HttpVO getGpuModel(String brand, String input);
    HttpVO getGpuBrand();
    HttpVO getCompareCpu(String my_model, String game_model);
    HttpVO getCompareGpu(String my_model, String game_model);
}
