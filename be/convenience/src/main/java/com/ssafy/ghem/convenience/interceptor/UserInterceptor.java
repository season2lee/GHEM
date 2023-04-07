package com.ssafy.ghem.convenience.interceptor;


import com.ssafy.ghem.convenience.tool.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Slf4j
@RequiredArgsConstructor
public class UserInterceptor implements HandlerInterceptor {

    private static final String HEADER_ACCESS = "access-token";

    private final JwtProvider jwtProvider;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception{
        
        return true;


//        String access_token = request.getHeader(HEADER_ACCESS);
//        System.out.println("access_token = " + access_token);
//
//        // 토큰의 기간이 만료될 경우를 판단
//        String date = jwtProvider.getExp(access_token);
//        if(System.currentTimeMillis() > Long.parseLong(date)){
//            log.warn("토큰 만료");
//            response.sendError(401, "UNAUTHORIZATION_ACCESS");
//            return false;
//        }
//
//        // 토큰이 조작된 경우를 판단
//        if(date.equals("be manipulated")){
//            log.warn("토큰 조작");
//            response.sendError(401, "UNAUTHORIZATION_ACCESS");
//            return false;
//        }
//
//        // 모든 경우를 통과하면 controller 진입
//        return true;
    }
}
