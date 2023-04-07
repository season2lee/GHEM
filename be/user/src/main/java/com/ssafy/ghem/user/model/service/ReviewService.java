package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.ReviewVO;
import org.springframework.data.domain.Pageable;


public interface ReviewService {
    HttpVO doReview(ReviewVO reviewInfo);
    HttpVO getReview(Long app_id, Pageable pageable);
    HttpVO deleteReview(ReviewVO reviewInfo);
}
