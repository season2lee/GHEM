package com.ssafy.ghem.user.model.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "follower")
public class Follower {

    @Id @GeneratedValue
    @Column(name = "follower_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "follower")
    private User follower;

    public static Follower getFollower(User user, User follower){
        Follower newFollower = new Follower();
        newFollower.setUser(user);
        newFollower.setFollower(follower);

        return newFollower;
    }

    private void setUser(User user){
        if (this.user != null) {
            this.user.getFollowers().remove(this);
        }
        this.user = user;
        if (user != null && !user.getFollowers().contains(this)) {
            user.getFollowers().add(this);
        }
    }

    private void setFollower(User follower){
        this.follower = follower;
    }
}
