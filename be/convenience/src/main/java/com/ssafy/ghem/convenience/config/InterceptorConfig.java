package com.ssafy.ghem.convenience.config;


import com.ssafy.ghem.convenience.interceptor.UserInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
//@RequiredArgsConstructor
public class InterceptorConfig implements WebMvcConfigurer {
//
//    private final UserInterceptor userInterceptor;
//
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(userInterceptor)
//                .order(1);
//    }
}
