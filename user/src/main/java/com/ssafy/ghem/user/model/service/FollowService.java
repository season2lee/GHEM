package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.entity.Follower;
import com.ssafy.ghem.user.model.entity.Following;
import com.ssafy.ghem.user.model.vo.FollowVO;

import java.util.List;

public interface FollowService {

    List<Follower> getFollowerList(Long user_id);

    List<Following> getFollowingList(Long user_id);

    int saveFollowing(FollowVO followVO);

    int deleteFollow(FollowVO followVO);
}
