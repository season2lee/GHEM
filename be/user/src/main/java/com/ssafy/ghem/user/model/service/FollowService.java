package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.entity.Follower;
import com.ssafy.ghem.user.model.entity.Following;
import com.ssafy.ghem.user.model.vo.FollowVO;
import com.ssafy.ghem.user.model.vo.FollowerVO;
import com.ssafy.ghem.user.model.vo.FollowingVO;

import java.util.List;

public interface FollowService {

    List<FollowerVO> getFollowerList(Long user_id);

    List<FollowingVO> getFollowingList(Long user_id);

    boolean saveFollow(FollowVO followVO);

    boolean deleteFollow(FollowVO followVO);
}
