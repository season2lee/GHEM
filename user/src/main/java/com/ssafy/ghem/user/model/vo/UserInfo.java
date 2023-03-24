package com.ssafy.ghem.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class UserInfo {
    private Long user_id;
    private String id;
    private String nickname;
    private String userProfile;
    private int gender;
    private String birth;
    private String steamId;
    private String introduce;

    @Builder
    public UserInfo(Long user_id, String id, String nickname, String userProfile, int gender, String birth, String steamId, String introduce) {
        this.user_id = user_id;
        this.id = id;
        this.nickname = nickname;
        this.userProfile = userProfile;
        this.gender = gender;
        this.birth = birth;
        this.steamId = steamId;
        this.introduce = introduce;
    }
}
