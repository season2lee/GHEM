package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.NoModify;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.SteamUser;
import com.ssafy.ghem.user.model.vo.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
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
    public HttpVo updateUserInfo(UserInfo userInfo) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(userInfo.getUser_id())
                .orElseThrow(() -> new NoModify("해당 사용자를 찾을 수 없습니다. user_id: " + userInfo.getUser_id()));

        user.setNickname(userInfo.getNickname());
        user.setIntroduce(userInfo.getIntroduce());

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo updateSteamId(SteamUser steamUser) {
        HttpVo http = new HttpVo();


        try {
            Jsoup.connect("https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_springsale__global-header").get();
            Connection.Response loginPageResponse = Jsoup.connect("https://www.test.co.kr/login/login.htm")
                    .timeout(3000)
                    .header("Origin", "http://test.co.kr")
                    .header("Referer", "https://www.test.co.kr/login/login.htm")
                    .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .header("Accept-Encoding", "gzip, deflate, br")
                    .header("Accept-Language", "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4")
                    .method(Connection.Method.GET)
                    .execute();

            Map<String, String> cookies = loginPageResponse.cookies();
        } catch (Exception e){
            e.printStackTrace();
        }


        http.setFlag(true);
        return http;
    }
}
