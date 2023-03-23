package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.NoModify;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserCommonRepository userCommonRepository;

    @Override
    public HttpVo updateUserInfo(UserInfo userInfo) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        int res = userCommonRepository.updateUserInfo(userInfo.getNickname(),
                userInfo.getIntroduce(), userInfo.getId());
        if(res <= 0){
            throw new NoModify("변경된 내용이 없습니다.");
        }

        map.put("result", res);
        http.setFlag(true);
        return http;
    }
}
