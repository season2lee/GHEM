package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HelpfulVO;
import com.ssafy.ghem.user.model.vo.HttpVO;

public interface HelpfulService {
    HttpVO createHelpful(HelpfulVO helpfulVO);

    HttpVO deleteHelpful(HelpfulVO helpfulVO);

    HttpVO getHelpful(Long userId);
}
