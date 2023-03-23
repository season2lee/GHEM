package com.ssafy.ghem.user.model.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ghem.user.controller.exception.AccessDeny;
import com.ssafy.ghem.user.model.vo.HttpVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class OauthServiceImpl implements OauthService {

    private final String clientId = "09a612622415a74fb256afb4648d932d";

    @Override
    public HttpVo tryOauthKakao(String code) {
        HttpVo http = new HttpVo();

        String token = getAccessToken(code);
        log.info("token: " + token);


        return http;
    }

    @Override
    public String getAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

// HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", "http://j8d107.p.ssafy.io");
        body.add("code", code);

        ResponseEntity<String> response = null;
        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();

        response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );


        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        if (response == null) {
            throw new AccessDeny("잘못된 token 요청입니다.");
        }

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        if (jsonNode.get("access_token").equals(null)) throw new AccessDeny("잘못된 token 요청입니다.");

        return jsonNode.get("access_token").asText();
    }
}
