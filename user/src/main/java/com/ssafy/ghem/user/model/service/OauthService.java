package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;

public interface OauthService {
    HttpVo tryOauthKakao(String code);
}
