package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.SteamUser;
import com.ssafy.ghem.user.model.vo.UserInfo;

public interface UserService {
    HttpVo updateUserInfo(UserInfo userInfo);
    HttpVo updateSteamId(SteamUser steamUser);
    HttpVo getUserDetail(Long user_id);
}
