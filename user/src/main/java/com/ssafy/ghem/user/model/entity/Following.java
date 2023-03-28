package com.ssafy.ghem.user.model.entity;

import lombok.AccessLevel;
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
    @Column(name = "following_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "following")
    private User following;

    public static Following getFollowing(User user, User following){
        Following newFollowing = new Following();
        newFollowing.setUser(user);
        newFollowing.setFollowing(following);

        return newFollowing;
    }

    private void setUser(User user){
        if (this.user != null) {
            this.user.getFollowings().remove(this);
        }
        this.user = user;
        if (user != null && !user.getFollowings().contains(this)) {
            user.getFollowings().add(this);
        }
    }

    private void setFollowing(User following){
        this.following = following;
    }
}
