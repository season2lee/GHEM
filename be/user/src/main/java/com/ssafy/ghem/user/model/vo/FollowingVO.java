package com.ssafy.ghem.user.model.vo;


import com.ssafy.ghem.user.model.entity.User;
import lombok.Data;

@Data
public class FollowingVO {
    private Long user_id;
    private String userProfile;
    private String nickname;
    private String steamId;

    public FollowingVO(User following){
        this.user_id = following.getUser_id();
        this.userProfile = following.getUserProfile();
        this.nickname = following.getNickname();
        this.steamId = following.getSteamId();
    }
}
