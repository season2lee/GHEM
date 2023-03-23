package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.UserInfo;

public interface UserService {
    HttpVo updateUserInfo(UserInfo userInfo);

}
