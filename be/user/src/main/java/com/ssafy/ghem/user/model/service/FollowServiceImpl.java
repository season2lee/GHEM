package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.AlreadyExistData;
import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Follower;
import com.ssafy.ghem.user.model.entity.Following;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.individual.FollowerIndividualRepository;
import com.ssafy.ghem.user.model.respository.individual.FollowingIndividualRepository;
import com.ssafy.ghem.user.model.vo.FollowVO;
import com.ssafy.ghem.user.model.vo.FollowerVO;
import com.ssafy.ghem.user.model.vo.FollowingVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{

    private final UserCommonRepository userRepository;
    private final FollowingIndividualRepository followingRepository;
    private final FollowerIndividualRepository followerRepository;

    @Transactional
    public Optional<User> getUserById(Long user_id) {
        return userRepository.findById(user_id);
    }

    @Override
    public List<FollowerVO> getFollowerList(Long user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);

        List<FollowerVO> result = new ArrayList<>();

        if(userOptional.isPresent()){
            List<Follower> followers = followerRepository.findFollowersByUserId(user_id);

            for(Follower follower : followers){
                Optional<User> user = userRepository.findById(follower.getFollowerId());

                if(!user.isPresent()) throw new DoesNotExistData("following_id에 해당하는 User가 존재하지 않습니다.");

                FollowerVO newFollowerVo = new FollowerVO(user.get(), follower.isFollowing());
                result.add(newFollowerVo);
            }

        }

        return result;
    }

    @Override
    public List<FollowingVO> getFollowingList(Long user_id) {
        Optional<User> userOptional = userRepository.findById(user_id);

        List<FollowingVO> result = new ArrayList<>();

        if(userOptional.isPresent()){
            List<Following> followings = followingRepository.findFollowingsByUserId(user_id);

            for(Following following : followings){
                Optional<User> user = userRepository.findById(following.getFollowingId());

                if(!user.isPresent()) throw new DoesNotExistData("following_id에 해당하는 User가 존재하지 않습니다.");

                FollowingVO newFollowingVo = new FollowingVO(user.get());
                result.add(newFollowingVo);
            }
        }

        return result;
    }

    @Override
    public boolean saveFollow(FollowVO followVO) {
        // 매개변수로 넘어온 값이 null이면 return
        if(followVO.getFollower_id() == null || followVO.getFollowing_id() == null) throw new DoesNotExistData("follower_id 또는 following_id 값이 존재하지 않습니다.");
;
        Optional<User> following_User = getUserById(followVO.getFollowing_id());
        Optional<User> follower_User = getUserById(followVO.getFollower_id());

        // 해당 유저가 존재하지 않으면 return
        if(!following_User.isPresent() || ! follower_User.isPresent()) throw new DoesNotExistData("follower_id 또는 following_id에 해당하는 User가 존재하지 않습니다.");

        Following following = Following.builder()
                .userId(followVO.getFollowing_id())
                .followingId(followVO.getFollower_id())
                .build();

        Follower follower = Follower.builder()
                .userId(followVO.getFollower_id())
                .followerId(followVO.getFollowing_id())
                .build();

        Optional<Following> Optional_Following = followingRepository.findByUserIdAndFollowingId(following.getUserId(), following.getFollowingId());
        Optional<Follower> Optional_Follower = followerRepository.findByUserIdAndFollowerId(follower.getUserId(), follower.getFollowerId());

        // 이미 저장되어 있으면 return
        if(Optional_Following.isPresent() || Optional_Follower.isPresent()) throw new AlreadyExistData("이미 follow 되어있습니다.");

        followingRepository.save(following);
        Optional<Following> isMutualFollow = followingRepository.findByUserIdAndFollowingId(follower.getUserId(),following.getUserId());


        if(isMutualFollow.isPresent()){
            follower.setIsFollowing(true);
            Optional<Follower> Optionalfollowered = followerRepository.findByUserIdAndFollowerId(followVO.getFollowing_id(), followVO.getFollower_id());
            Follower followered = Optionalfollowered.get();
            followered.setIsFollowing(true);

            followerRepository.save(followered);
            followerRepository.save(follower);
        }else{
            follower.setIsFollowing(false);
            followerRepository.save(follower);
        }

        return true;
    }

    @Override
    public boolean deleteFollow(FollowVO followVO) {
        // 매개변수로 넘어온 값이 null이면 return
        if(followVO.getFollower_id() == null || followVO.getFollowing_id() == null) throw new DoesNotExistData("follower_id 또는 following_id 값이 존재하지 않습니다.");

        Optional<User> following_User = getUserById(followVO.getFollowing_id());
        Optional<User> follower_User = getUserById(followVO.getFollower_id());

        // 해당 유저가 존재하지 않으면 return
        if(!following_User.isPresent() || ! follower_User.isPresent()) throw new DoesNotExistData("follower_id 또는 following_id에 해당하는 User가 존재하지 않습니다.");

        Optional<Following> Optional_Following = followingRepository.findByUserIdAndFollowingId(following_User.get().getUser_id(), follower_User.get().getUser_id());
        Optional<Follower> Optional_Follower = followerRepository.findByUserIdAndFollowerId(follower_User.get().getUser_id(), following_User.get().getUser_id());

        // following 되어있지 않으면 return
        if(!Optional_Following.isPresent() || !Optional_Follower.isPresent()) throw new DoesNotExistData("팔로우하지 않고 있습니다.");


        followingRepository.delete(Optional_Following.get());
        followerRepository.delete(Optional_Follower.get());

        Optional<Follower> Optional_Followered = followerRepository.findByUserIdAndFollowerId(following_User.get().getUser_id(),follower_User.get().getUser_id());
        if(Optional_Followered.isPresent()){
            Follower followered = Optional_Followered.get();
            followered.setIsFollowing(false);
            followerRepository.save(followered);
        }

        return true;
    }
}
