package com.ssafy.ghem.user.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "following")
public class Following {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "following_id")
    private Long followingId;

    @Builder
    public Following(Long userId, Long followingId){
        this.userId = userId;
        this.followingId = followingId;
    }
}
