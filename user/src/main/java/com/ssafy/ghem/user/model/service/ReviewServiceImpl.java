package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.AlreadyExistData;
import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.GameReview;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.entity.UserGame;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.GameReviewCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserGameCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.ReviewVO;
import com.ssafy.ghem.user.model.vo.UserGameContentVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
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
    private final GameReviewCommonRepository gameReviewCommonRepository;

    @Override
    @Transactional
    public HttpVo doReview(ReviewVO reviewInfo) {
        HttpVo http = new HttpVo();

        User user = getUser(reviewInfo.getUser_id());
        Game game = getGame(reviewInfo.getApp_id());

        if (userGameCommonRepository.findByUserGame(game, user) != null)
            throw new AlreadyExistData("이미 해당 데이터가 존재합니다.");

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
    public HttpVo checkReview(ReviewVO reviewInfo) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = getUser(reviewInfo.getUser_id());
        Game game = getGame(reviewInfo.getApp_id());

        UserGame userGame = userGameCommonRepository
                .findByUserGame(game, user);

        if(userGame == null){
            map.put("isExist", false);
            userGame.setRating(0);
            map.put("ReviewData", userGame);
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
    public HttpVo deleteReview(Long user_id, Long app_id) {
        HttpVo http = new HttpVo();

        User user = getUser(user_id);
        Game game = getGame(app_id);

        GameReview gameReview = gameReviewCommonRepository.findByUserAndGame(user, game);
        log.info("gameReview : {}", gameReview.toString());
        if(gameReview != null){
            gameReviewCommonRepository.delete(gameReview);
        }

        UserGame userGame = userGameCommonRepository.findByUserGame(game, user);
        log.info("{}", userGame);

        if(userGame == null) throw new DoesNotExistData("요청한 ID에 해당하는 평가 정보가 존재하지 않습니다.");

        userGameCommonRepository.deleteById(userGame.getUserGameId());

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo updateReview(ReviewVO reviewInfo) {
        HttpVo http = new HttpVo();

        User user = getUser(reviewInfo.getUser_id());
        Game game = getGame(reviewInfo.getApp_id());

        UserGame userGame = userGameCommonRepository.findByUserGame(game, user);
        if(userGame == null) new DoesNotExistData("요청한 ID에 해당하는 평가 정보가 존재하지 않습니다.");

        userGame.setRating(reviewInfo.getRating());

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVo listReview(Long user_id) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = getUser(user_id);

        List<UserGame> userGameList = userGameCommonRepository.findByUser(user);
        List<UserGameContentVO> userGameContentVOS = new ArrayList<>();
        for(UserGame userGame : userGameList){
            UserGameContentVO userGameContentVO = new UserGameContentVO();
            GameReview gameReview = gameReviewCommonRepository.findByUserAndGame(user, userGame.getGame());

            userGameContentVO.setUserGame(userGame);
            if(gameReview != null && gameReview.getContent() != null) userGameContentVO.setContent(gameReview.getContent());

            userGameContentVOS.add(userGameContentVO);
        }


        map.put("Estimate_List", userGameContentVOS);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Transactional
    public User getUser(Long user_id){
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저가 없습니다. user_id = "+user_id));

        return user;
    }

    @Transactional
    public Game getGame(Long app_id){
        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임이 없습니다. app_id = "+app_id));

        return game;
    }
}
