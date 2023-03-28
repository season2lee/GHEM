package com.ssafy.ghem.user.model.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ghem.user.controller.exception.NoModify;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.UserVO;
import com.ssafy.ghem.user.tool.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class OauthServiceImpl implements OauthService {

    private final UserCommonRepository userCommonRepository;
    private final JwtProvider jwtProvider;
    private final String clientId = "09a612622415a74fb256afb4648d932d";

    @Override
    @Transactional("commonTransactionManager")
    public HttpVo tryOauthKakao(String code) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        String token = getAccessToken(code);
        log.info("token: " + token);

        UserVO userInfo = getKakaoUserInfo(token);
        log.info("UserInfo: " + userInfo);


        User user = userCommonRepository.findUserById(userInfo.getId());
        // 회원가입 진행
        if(user == null) {
            user = User.builder()
                    .id(userInfo.getId())
                    .userProfile(userInfo.getUserProfile())
                    .build();

            userCommonRepository.save(user);
        }

        log.info("user: "+ user);
        // 로그인 진행
        String accessToken = jwtProvider.createToken(user.getUser_id());
        map.put("AccessToken", accessToken);
        map.put("userId", user.getUser_id());
        map.put("userNickname", user.getNickname());

        http.setData(map);
        http.setFlag(true);

        return http;
    }

    @Override
    @Transactional("commonTransactionManager")
    public HttpVo tryOauthNaver(String code) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        String token = getAccessToken_Naver(code);
        log.info("token: " + token);

        UserVO userInfo = getNaverUserInfo(token);
        log.info("UserInfo: " + userInfo);


        User user = userCommonRepository.findUserById(userInfo.getId());
        // 회원가입 진행
        if(user == null) {
            user = User.builder()
                    .id(userInfo.getId())
                    .userProfile(userInfo.getUserProfile())
                    .build();

            userCommonRepository.save(user);
        }

        log.info("user: "+ user);
        // 로그인 진행
        String accessToken = jwtProvider.createToken(user.getUser_id());
        map.put("AccessToken", accessToken);
        map.put("userId", user.getUser_id());
        map.put("userNickname", user.getNickname());

        http.setData(map);
        http.setFlag(true);

        return http;
    }

    public String getAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

// HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
//        body.add("redirect_uri", "http://j8d107.p.ssafy.io/oauth/kakao/callback");
        body.add("redirect_uri", "http://localhost:5173/oauth/kakao/callback");
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = null;

        try {
            response = rt.exchange(
                    "https://kauth.kakao.com/oauth/token",
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );
        } catch (Exception e){
            throw new NoModify("RestTemplate 전송 오류");
        }


        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (Exception e) {
            throw new RuntimeException();
        }
        return jsonNode.get("access_token").asText();
    }

    public String getAccessToken_Naver(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
//        body.add("redirect_uri", "http://j8d107.p.ssafy.io/oauth/kakao/callback");
        body.add("redirect_uri", "http://localhost:5173/oauth/naver/callback");
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = null;

        try {
            response = rt.exchange(
                    "https://nid.naver.com/oauth2.0/token",
                    HttpMethod.POST,
                    naverTokenRequest,
                    String.class
            );
        } catch (Exception e) {
            throw new NoModify("RestTemplate 전송 오류: " + e.getMessage());
        }

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (Exception e) {
            throw new RuntimeException("JSON 파싱 오류: " + e.getMessage());
        }

        return jsonNode.get("access_token").asText();
    }

    public UserVO getKakaoUserInfo(String accessToken) {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();

//        rt.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        log.info(jsonNode.toString());

        String id = jsonNode.get("id").toString();
        String profile = jsonNode.get("kakao_account").get("profile").get("profile_image_url").toString();

        return UserVO.builder()
                .id(id)
                .userProfile(profile)
                .build();
    }

    public UserVO getNaverUserInfo(String accessToken) {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> naverUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> response = rt.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.GET,
                naverUserInfoRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        log.info(jsonNode.toString());

        String id = jsonNode.get("response").get("id").asText();
        String profile = jsonNode.get("response").get("profile_image").asText();

        return UserVO.builder()
                .id(id)
                .userProfile(profile)
                .build();
    }
}
