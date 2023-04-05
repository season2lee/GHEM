package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.entity.UserGame;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserGameCommonRepository;
import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.ReviewVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final UserGameCommonRepository userGameCommonRepository;
   // private final HelpfulCommonRepository helpfulCommonRepository;

    @Override
    @Transactional
    public HttpVO doReview(ReviewVO reviewInfo) {
        HttpVO http = new HttpVO();

        User user = getUser(reviewInfo.getUser_id());
        Game game = getGame(reviewInfo.getApp_id());
        UserGame userGame = getUserGame(user, game);

       // createHelpful(userGame);

        userGame.setContent(reviewInfo.getContent());
        userGame.setDateTime();
        userGameCommonRepository.save(userGame);

        http.setFlag(true);
        return http;
    }

//    private void createHelpful(UserGame userGame) {
//        Optional<Helpful> OptionalHelpful = helpfulCommonRepository.findByUserGame(userGame);
//        if(!OptionalHelpful.isPresent()){
//            Helpful helpful = new Helpful();
//            helpful.setUserGame(userGame);
//
//            helpfulCommonRepository.save(helpful);
//        }
//    }

    @Override
    public HttpVO getReview(Long app_id, Pageable pageable) {
        HttpVO http = new HttpVO();

        Page<UserGame> userGames = userGameCommonRepository.findByAppId(app_id, pageable);

        http.setFlag(true);
        http.setData(userGames);
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

    @Transactional
    public UserGame getUserGame(User user, Game game) {
        UserGame userGame = userGameCommonRepository.findByUserGame(game, user);

        if(userGame == null){
            throw new DoesNotExistData("해당 게임의 유저 평점이 존재하지 않습니다.");
        }

        return userGame;
    }
}
