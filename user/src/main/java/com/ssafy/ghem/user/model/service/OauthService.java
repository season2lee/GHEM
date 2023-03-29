package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;

public interface OauthService {
    HttpVO tryOauthKakao(String code);

    HttpVO tryOauthNaver(String code);
}
