package com.ssafy.ghem.user.model.vo;

import com.ssafy.ghem.user.model.entity.User;
import lombok.Data;

@Data
public class FollowerVO {
    private Long user_id;
    private String userProfile;
    private String nickname;
    private String steamId;
    private boolean isFollowing;

    public FollowerVO(User follower, boolean tf){
        this.user_id = follower.getUser_id();
        this.userProfile = follower.getUserProfile();
        this.nickname = follower.getNickname();
        this.steamId = follower.getSteamId();
        this.isFollowing = tf;
    }

}
