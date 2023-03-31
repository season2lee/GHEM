package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.RatingVO;

public interface RatingService {

    HttpVO create(RatingVO ratingInfo);

    HttpVO update(RatingVO ratingInfo);

    HttpVO delete(RatingVO ratingInfo);

    HttpVO read(Long user_id, Long app_id);

    HttpVO getList(Long user_id);

    HttpVO getListV2(Long user_id);
}
