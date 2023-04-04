package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;

import javax.servlet.http.HttpSession;

public interface OauthService {
    HttpVO tryOauthKakao(String code);

    HttpVO tryOauthNaver(String code);

//    String buildSteamAuthUrl();
//
//    boolean verifySteamAuth(String identity, String claimedId, HttpSession session);
}
