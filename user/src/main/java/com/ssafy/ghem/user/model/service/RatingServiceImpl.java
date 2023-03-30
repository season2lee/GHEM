package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.entity.UserGame;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserGameCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.RatingVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final UserGameCommonRepository userGameCommonRepository;
    @Override
    public HttpVO create(RatingVO ratingInfo) {

        User user = userCommonRepository.findById(ratingInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(ratingInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        UserGame usergame = UserGame.builder()
                .rating(ratingInfo.getRating())
                .build();

        usergame.setUser(user);
        usergame.setGame(game);

        userGameCommonRepository.save(usergame);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData("success");

        return http;
    }

    @Override
    public HttpVO update(RatingVO ratingInfo) {
        User user = userCommonRepository.findById(ratingInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(ratingInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        UserGame usergame = userGameCommonRepository.findByUserGame(game, user);
        usergame.setRating(ratingInfo.getRating());

        userGameCommonRepository.save(usergame);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData("success");

        return http;
    }

    @Override
    public HttpVO delete(RatingVO ratingInfo) {
        User user = userCommonRepository.findById(ratingInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(ratingInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        UserGame usergame = userGameCommonRepository.findByUserGame(game, user);
        userGameCommonRepository.delete(usergame);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData("success");

        return http;
    }

    @Override
    public HttpVO read(Long user_id, Long app_id) {
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        UserGame usergame = userGameCommonRepository.findByUserGame(game, user);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData(usergame);

        return http;
    }

    @Override
    public HttpVO getList(Long user_id) {
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));


        List<UserGame> userGames = userGameCommonRepository.findByUser(user);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData(userGames);

        return http;
    }
}
