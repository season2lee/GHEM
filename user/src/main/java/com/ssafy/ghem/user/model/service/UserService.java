package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.SteamUserVO;
import com.ssafy.ghem.user.model.vo.UserVO;

public interface UserService {
    HttpVo updateUserInfo(UserVO userInfo);
    HttpVo updateSteamId(SteamUserVO steamUser);
    HttpVo checkNickname(String nickname);
    HttpVo getUserDetail(Long user_id);
}
