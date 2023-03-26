package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.NoModify;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.SteamUserVO;
import com.ssafy.ghem.user.model.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserCommonRepository userCommonRepository;

    @Override
    @Transactional
    public HttpVo updateUserInfo(UserVO userInfo) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(userInfo.getUser_id())
                .orElseThrow(() -> new NoModify("해당 사용자를 찾을 수 없습니다. user_id: " + userInfo.getUser_id()));

        user.setBirth(userInfo.getBirth());
        user.setGender(userInfo.getGender());
        user.setNickname(userInfo.getNickname());
        user.setIntroduce(userInfo.getIntroduce());

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo getUserDetail(Long user_id) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new NoModify("해당 사용자를 찾을 수 없습니다. user_id: " + user_id));
        map.put("user", user);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    public HttpVo checkNickname(String nickname) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findUserByNickname(nickname);
        if(user == null){
            map.put("isPossible", true);
        } else{
            map.put("isPossible", false);
        }

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    @Transactional
    public HttpVo updateSteamId(SteamUserVO steamUser) {
        HttpVo http = new HttpVo();

        http.setFlag(true);
        return http;
    }
}
