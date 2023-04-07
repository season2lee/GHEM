package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;

import javax.servlet.http.HttpSession;

public interface OauthService {
    HttpVO tryOauthKakao(String code);

    HttpVO tryOauthNaver(String code);

    HttpVO tryOpenIdSteam(String steamId);

}
