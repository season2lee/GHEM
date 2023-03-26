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
import com.ssafy.ghem.user.model.vo.HttpVo;
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
public class ContentServiceImpl implements ContentService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final UserGameCommonRepository userGameCommonRepository;
    private final GameReviewCommonRepository gameReviewCommonRepository;

    @Override
    @Transactional
    public HttpVo writeContent(ContentVO contentInfo) {
        HttpVo http = new HttpVo();
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
    public HttpVo listContent(Long app_id) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 요청의 게임정보가 없습니다."));

        List<GameReview> gameReviewList = gameReviewCommonRepository.getGameReviewByGame(game);
        map.put("ContentList", gameReviewList);

        http.setFlag(true);
        http.setData(gameReviewList);
        return http;
    }

    @Override
    @Transactional
    public HttpVo updateContent(ContentVO contentInfo) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        User user = userCommonRepository.findById(contentInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(contentInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        GameReview gameReview = gameReviewCommonRepository.findByUserAndGame(user, game);

        gameReview.setContent(contentInfo.getContent());

        http.setFlag(true);
        http.setData(map);
        return http;
    }
}
