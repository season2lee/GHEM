package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.GameReview;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.entity.UserGame;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.GameReviewCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserGameCommonRepository;
import com.ssafy.ghem.user.model.vo.ContentVO;
import com.ssafy.ghem.user.model.vo.HttpVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContentServiceImpl implements ContentService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final UserGameCommonRepository userGameCommonRepository;
    private final GameReviewCommonRepository gameReviewCommonRepository;

    @Override
    @Transactional
    public HttpVO writeContent(ContentVO contentInfo) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(contentInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(contentInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));
        UserGame userGame = userGameCommonRepository.findById(contentInfo.getUser_game_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 평가 정보가 없습니다."));


        GameReview gameReview = GameReview.builder()
                .content(contentInfo.getContent())
                .build();

        gameReview.setUser(user);
        gameReview.setGame(game);
        gameReview.setUserGame(userGame);

        gameReviewCommonRepository.save(gameReview);

        http.setFlag(true);
        return http;
    }

    @Override
    @Transactional
    public HttpVO listContent(Long app_id, Pageable pageable) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 요청의 게임정보가 없습니다."));

        Page<GameReview> gameReviewList = gameReviewCommonRepository.getGameReviewByGame(game, pageable);
        map.put("ContentList", gameReviewList);

        http.setFlag(true);
        http.setData(gameReviewList);
        return http;
    }

    @Override
    @Transactional
    public HttpVO updateContent(ContentVO contentInfo) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(contentInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(contentInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        GameReview gameReview = gameReviewCommonRepository.findByUserAndGame(user, game);
        if(gameReview == null) throw new DoesNotExistData("해당하는 게임의 리뷰가 존재하지 않습니다.");

        gameReview.setContent(contentInfo.getContent());

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Override
    @Transactional
    public HttpVO checkContent(Long app_id, Long user_id) {
        HttpVO http = new HttpVO();
        Map<String, Object> map = new HashMap<>();

        User user = getUser(user_id);
        Game game = getGame(app_id);

        GameReview gameReview = gameReviewCommonRepository.findByUserAndGame(user, game);
        if(gameReview != null){
            map.put("isExist", true);
            map.put("korea", "리뷰 있음");
        } else{
            map.put("isExist", false);
            map.put("korea", "작성된 리뷰 없음");
        }

        http.setData(map);
        http.setFlag(true);
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
