package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.model.entity.Follower;
import com.ssafy.ghem.user.model.entity.Following;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.individual.FollowerIndividualRepository;
import com.ssafy.ghem.user.model.respository.individual.FollowingIndividualRepository;
import com.ssafy.ghem.user.model.vo.FollowVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{

    private final UserCommonRepository userRepository;
    private final FollowingIndividualRepository followingRepository;
    private final FollowerIndividualRepository followerRepository;

    public Optional<User> getUserById(Long user_id) {
        return userRepository.findById(user_id);
    }

    @Override
    public List<Follower> getFollowerList(Long user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);

        List<Follower> followers = null;

        if(userOptional.isPresent()){
            User user = userOptional.get();
            followers = followerRepository.findByUser(user);
        }

        return followers;
    }

    @Override
    public List<Following> getFollowingList(Long user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);

        List<Following> followings = null;

        if(userOptional.isPresent()){
            User user = userOptional.get();
            followings = followingRepository.findByUser(user);
        }

        return followings;
    }

    @Override
    public int saveFollowing(FollowVO followVO) {
        // 매개변수로 넘어온 값이 null이면 return
        if(followVO.getFollower_id() == null || followVO.getFollowing_id() == null) return 1;

        Optional<User> following_User = getUserById(followVO.getFollowing_id());
        Optional<User> follower_User = getUserById(followVO.getFollower_id());

        // 해당 유저가 존재하지 않으면 return
        if(!following_User.isPresent() || ! follower_User.isPresent()) return 2;

        Following following = Following.getFollowing(following_User.get(), follower_User.get());
        Follower follower = Follower.getFollower(follower_User.get(), following_User.get());

        Optional<Following> Optional_Following = followingRepository.findByUserAndFollowing(following_User.get(), follower_User.get());
        Optional<Follower> Optional_Follower = followerRepository.findByUserAndFollower(follower_User.get(), following_User.get());

        // 이미 저장되어 있으면 return
        if(Optional_Following.isPresent() || Optional_Follower.isPresent()) return 3;


        followingRepository.save(following);
        followerRepository.save(follower);

        return 4;
    }

    @Override
    public int deleteFollow(FollowVO followVO) {
        // 매개변수로 넘어온 값이 null이면 return
        if(followVO.getFollower_id() == null || followVO.getFollowing_id() == null) return 1;

        Optional<User> following_User = getUserById(followVO.getFollowing_id());
        Optional<User> follower_User = getUserById(followVO.getFollower_id());

        // 해당 유저가 존재하지 않으면 return
        if(!following_User.isPresent() || ! follower_User.isPresent()) return 2;

        Optional<Following> Optional_Following = followingRepository.findByUserAndFollowing(following_User.get(), follower_User.get());
        Optional<Follower> Optional_Follower = followerRepository.findByUserAndFollower(follower_User.get(), following_User.get());

        // following 되어있지 않으면 return
        if(!Optional_Following.isPresent() || !Optional_Follower.isPresent()) return 3;


        followingRepository.delete(Optional_Following.get());
        followerRepository.delete(Optional_Follower.get());

        return 4;
    }
}
