package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.entity.UserGame;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserGameCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.ReviewInfo;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final UserGameCommonRepository userGameCommonRepository;

    @Override
    @Transactional
    public HttpVo doReview(ReviewInfo reviewInfo) {
        HttpVo http = new HttpVo();

        User user = userCommonRepository.findById(reviewInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(reviewInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        UserGame userGame = UserGame.builder()
                            .rating(reviewInfo.getRating())
                            .build();

        userGame.setUser(user);
        userGame.setGame(game);

        userGameCommonRepository.save(userGame);

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo checkReview(ReviewInfo reviewInfo) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(reviewInfo.getUser_id())
                .orElseThrow(()->new DoesNotExistData("해당하는 유저 정보가 없습니다."));

        Game game = gameCommonRepository.findById(reviewInfo.getApp_id())
                .orElseThrow(()->new DoesNotExistData("해당하는 게임 정보가 존재하지 않습니다."));

        UserGame userGame = userGameCommonRepository
                .findByUserGame(game, user);

        if(userGame == null){
            map.put("isExist", false);
        } else{
            map.put("isExist", true);
            map.put("ReviewData", userGame);
        }

        http.setData(map);
        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo deleteReview(Long user_game_id) {
        HttpVo http = new HttpVo();

        UserGame userGame = userGameCommonRepository.findById(user_game_id)
                        .orElseThrow(() -> new DoesNotExistData("요청한 ID에 해당하는 평가 정보가 존재하지 않습니다."));

        userGameCommonRepository.deleteById(user_game_id);

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo updateReview(ReviewInfo reviewInfo) {
        HttpVo http = new HttpVo();

        UserGame userGame = userGameCommonRepository.findById(reviewInfo.getUser_game_id())
                .orElseThrow(() -> new DoesNotExistData("요청한 ID에 해당하는 평가 정보가 존재하지 않습니다."));

        userGame.setRating(reviewInfo.getRating());

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo listReview(Long user_id) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));

        List<UserGame> userGameList = userGameCommonRepository.findByUser(user);
        map.put("Estimate_List", userGameList);

        http.setFlag(true);
        http.setData(map);
        return http;
    }
}
