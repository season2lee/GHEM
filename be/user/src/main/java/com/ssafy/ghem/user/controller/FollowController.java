package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.entity.Follower;
import com.ssafy.ghem.user.model.entity.Following;
import com.ssafy.ghem.user.model.service.FollowService;
import com.ssafy.ghem.user.model.vo.FollowVO;
import com.ssafy.ghem.user.model.vo.FollowerVO;
import com.ssafy.ghem.user.model.vo.FollowingVO;
import com.ssafy.ghem.user.model.vo.HttpVO;
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
            response = String.class)
    public ResponseEntity<?> getFollowing(@PathVariable("user_id") Long user_id) {
        List<FollowingVO> followings = followService.getFollowingList(user_id);

        log.info(followings + ": getFollowing");
        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData(followings);

        return new ResponseEntity<HttpVO>(http,HttpStatus.OK);
    }

    @PostMapping
    @ApiOperation(value = "following_id가 follower_id를 팔로잉합니다.\n",
            notes = "following_id : follow 하는 유저의 고유번호\n" +
                    "follower_id = follow 당하는 유저의 고유번호\n",
            response = String.class)
    public ResponseEntity<?> createFollow(@RequestBody FollowVO followVO) {
        log.info(followVO + "createFollow");

        followService.saveFollow(followVO);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData("success");

        return new ResponseEntity<>(http, HttpStatus.OK);
    }

    @DeleteMapping
    @ApiOperation(value = "following_id가 follower_id를 언팔로잉합니다.\n",
            notes = "following_id : follow 하는 유저의 고유번호\n" +
                    "follower_id = follow 당하는 유저의 고유번호\n",
            response = String.class)
    public ResponseEntity<?> deleteFollow(FollowVO followVO) {
        log.info(followVO + "createFollow");

        followService.deleteFollow(followVO);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData("success");

        return new ResponseEntity<>(http, HttpStatus.OK);
    }


    @GetMapping("/follower/{user_id}")
    @ApiOperation(value = "user_id가 follow 하고 있는 유저 목록을 반환합니다.\n",
            notes = "user_id : 유저 교유번호\n",
            response = List.class)
    public ResponseEntity<?> getFollower(@PathVariable("user_id") Long user_id) {
        List<FollowerVO> followers = followService.getFollowerList(user_id);

        log.info(followers + ": getFollower");
        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData(followers);

        return new ResponseEntity<HttpVO>(http,HttpStatus.OK);

    }


}
