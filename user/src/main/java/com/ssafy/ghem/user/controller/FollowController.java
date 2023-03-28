package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.entity.Follower;
import com.ssafy.ghem.user.model.entity.Following;
import com.ssafy.ghem.user.model.service.FollowService;
import com.ssafy.ghem.user.model.service.UserService;
import com.ssafy.ghem.user.model.vo.FollowVO;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.SteamUserVO;
import com.ssafy.ghem.user.model.vo.UserVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
public class FollowController {

    private final FollowService followService;

    @GetMapping("/following/{user_id}")
    @ApiOperation(value = "user_id가 follow 하고 있는 유저 목록을 반환합니다.\n",
            notes = "user_id : 유저 교유번호\n",
            response = List.class)
    public ResponseEntity<?> getFollowing(@PathVariable("user_id") Long user_id) {
        List<Following> followings = followService.getFollowingList(user_id);

        if (followings != null && !followings.isEmpty()) {
            List<Long> result = followings.stream()
                    .map(following -> following.getFollowing().getUser_id())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    @ApiOperation(value = "following_id가 follower_id를 팔로잉합니다.\n",
            notes = "following_id : follow 하는 유저의 고유번호\n" +
                    "follower_id = follow 당하는 유저의 고유번호\n",
            response = String.class)
    public ResponseEntity<?> createFollowing(@RequestBody FollowVO followVO) {
        int val = followService.saveFollowing(followVO);

        if(val == 1){
            return new ResponseEntity<String>("The parameter has a NULL value", HttpStatus.NOT_FOUND);
        }else if(val == 2){
            return new ResponseEntity<String>("The following_id or follower_id user does not exist", HttpStatus.NOT_FOUND);
        }else if(val == 3){
            return new ResponseEntity<String>("You are already following this user", HttpStatus.NOT_ACCEPTABLE);
        }else{
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
    }

    @DeleteMapping
    @ApiOperation(value = "following_id가 follower_id를 언팔로잉합니다.\n",
            notes = "following_id : follow 하는 유저의 고유번호\n" +
                    "follower_id = follow 당하는 유저의 고유번호\n",
            response = String.class)
    public ResponseEntity<String> deleteFollow(@RequestBody FollowVO followVO) {
        int val = followService.deleteFollow(followVO);

        if(val == 1){
            return new ResponseEntity<String>("The parameter has a NULL value", HttpStatus.NOT_FOUND);
        }else if(val == 2){
            return new ResponseEntity<String>("The following_id or follower_id user does not exist", HttpStatus.NOT_FOUND);
        }else if(val == 3){
            return new ResponseEntity<String>("You are already unfollowing this user", HttpStatus.NOT_ACCEPTABLE);
        }else{
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }
    }


    @GetMapping("/follower/{user_id}")
    @ApiOperation(value = "user_id가 follow 하고 있는 유저 목록을 반환합니다.\n",
            notes = "user_id : 유저 교유번호\n",
            response = List.class)
    public ResponseEntity<?> getFollower(@PathVariable("user_id") Long user_id) {
        List<Follower> followers = followService.getFollowerList(user_id);

        if (followers != null && !followers.isEmpty()) {
            List<Long> result = followers.stream()
                    .map(follower -> follower.getFollower().getUser_id())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
