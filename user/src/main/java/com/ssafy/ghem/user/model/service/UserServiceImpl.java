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
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
    @Transactional
    public HttpVo updateSteamId(SteamUser steamUser) {
        HttpVo http = new HttpVo();


        try {
            String url = "https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_springsale__global-header";
            Connection.Response rs = (Connection.Response) Jsoup
                    .connect(url)
                    .data("mode", "login")
                    .data("kinds", "outlogin")
                    .data("newlogindialog_TextInput_2eKVn", "qkrtjsdyd7607")
                    .data("newlogindialog_TextInput_2eKVn", "qkr04637607!")
                    .userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36")
                    .method(Connection.Method.POST).execute();

            Document doc = rs.parse();

            Pattern p = Pattern.compile("alert\\((.+)\\)");
            Matcher m = p.matcher(doc.html());
            m.find();


            Document mainPage = Jsoup.connect("https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_springsale__global-header")
                    .cookies(rs.cookies()).get();

            System.out.println(mainPage.html());
            System.out.println(m.group());

        } catch (Exception e){
            e.printStackTrace();
        }


        http.setFlag(true);
        return http;
    }
}
