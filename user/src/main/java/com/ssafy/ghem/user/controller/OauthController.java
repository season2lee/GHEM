package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.OauthService;
import com.ssafy.ghem.user.model.vo.HttpVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth2")
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("/code/kakao")
    @ApiOperation(value = "카카오 OAuth 로그인.",
            notes = "https://kauth.kakao.com/oauth/authorize\n" +
                    "?client_id=09a612622415a74fb256afb4648d932d\n" +
                    "&redirect_uri=http://j8d107.p.ssafy.io\n" +
                    "&response_type=code" +
                    "해당 주소로 url 연결 부탁합니다.",
            response = String.class)
    public ResponseEntity<?> oauthKakao(@RequestParam String code){

        log.info("code: " + code);

        HttpVO http = oauthService.tryOauthKakao(code);

        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/code/naver")
    @ApiOperation(value = "네이버 OAuth 로그인.",
            notes = "https://nid.naver.com/oauth2.0/authorize\n" +
                    "?client_id=oly_VB_lNhvzchBlzhkx\n" +
                    "&redirect_uri=http://j8d107.p.ssafy.io\n" +
                    "&response_type=code" +
                    "해당 주소로 url 연결 부탁합니다.",
            response = String.class)
    public ResponseEntity<?> oauthNaver(@RequestParam String code){

        log.info("code: " + code);

        HttpVO http = oauthService.tryOauthNaver(code);

        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/code/steam")
    @ApiOperation(value = " Steam OpenID 로그인",
            response = RedirectView.class)
    public RedirectView steamAuth(@AuthenticationPrincipal OAuth2User principal, RedirectAttributes redirectAttributes) {
        Map<String, Object> attributes = principal.getAttributes();

        // 모든 사용자 속성 출력
        for (Map.Entry<String, Object> entry : attributes.entrySet()) {
            System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
        }

        return new RedirectView("http://j8d107.p.ssafy.io/");
    }

}
