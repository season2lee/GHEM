package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.SteamUserVO;
import com.ssafy.ghem.user.model.vo.UserVO;

public interface UserService {
    HttpVO updateUserInfo(UserVO userInfo);
    HttpVO updateSteamId(SteamUserVO steamUser);
    HttpVO checkNickname(String nickname);
    HttpVO getUserDetail(Long user_id);
}
