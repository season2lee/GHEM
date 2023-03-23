package com.ssafy.ghem.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class UserInfo {
    private Long userId;
    private String id;
    private String nickname;
    private String userProfile;
    private String steamId;
    private String introduce;

    @Builder
    public UserInfo(Long userId, String id, String nickname, String userProfile, String steamId, String introduce) {
        this.userId = userId;
        this.id = id;
        this.nickname = nickname;
        this.userProfile = userProfile;
        this.steamId = steamId;
        this.introduce = introduce;
    }
}
