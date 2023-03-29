package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.ReviewVO;

public interface ReviewService {
    HttpVO doReview(ReviewVO reviewInfo);
    HttpVO checkReview(ReviewVO reviewInfo);
    HttpVO deleteReview(Long user_id, Long app_id);
    HttpVO updateReview(ReviewVO reviewInfo);
    HttpVO listReview(Long user_id);
}
