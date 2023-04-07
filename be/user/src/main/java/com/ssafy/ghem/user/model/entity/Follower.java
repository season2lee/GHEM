package com.ssafy.ghem.user.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "follower")
public class Follower {

    @Id @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "follower_id")
    private Long followerId;

    private boolean isFollowing;

    public void setIsFollowing(boolean tf){
        this.isFollowing = tf;
    }

    @Builder
    public Follower(Long userId, Long followerId){
        this.userId = userId;
        this.followerId = followerId;
    }
}
