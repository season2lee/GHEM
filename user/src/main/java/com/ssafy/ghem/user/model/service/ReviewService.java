package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.ReviewInfo;

public interface ReviewService {
    HttpVo doReview(ReviewInfo reviewInfo);
    HttpVo checkReview(ReviewInfo reviewInfo);
    HttpVo deleteReview(Long user_game_id);
    HttpVo updateReview(ReviewInfo reviewInfo);
}
