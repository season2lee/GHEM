//package com.ssafy.ghem.user.model.entity;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//
//import java.util.Collection;
//import java.util.Map;
//
//public class CustomOAuth2User implements OAuth2User {
//
//    private OAuth2User oauth2User;
//    private User user;
//
//    public CustomOAuth2User(User user, Map<String, Object> attributes) {
//        this.oauth2User = new DefaultOAuth2User(user.getAuthorities(), attributes, "name");
//        this.user = user;
//    }
//
//    @Override
//    public Map<String, Object> getAttributes() {
//        return oauth2User.getAttributes();
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return oauth2User.getAuthorities();
//    }
//
//    @Override
//    public String getName() {
//        return oauth2User.getName();
//    }
//
//    public User getUser() {
//        return user;
//    }
//}