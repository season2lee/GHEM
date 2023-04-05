package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.AlreadyExistData;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final UserGameCommonRepository userGameCommonRepository;
    //private final HelpfulCommonRepository helpfulCommonRepository;
    @Override
    public HttpVO create(RatingVO ratingInfo) {

        User user = userCommonRepository.findById(ratingInfo.getUser_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(ratingInfo.getApp_id())
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        UserGame findUserGame = userGameCommonRepository.findByUserGame(game, user);

        if(findUserGame != null) throw new AlreadyExistData("해당게임에 대한 유저의 평점이 이미 존재합니다.");

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

        if(usergame == null) throw new DoesNotExistData("해당게임에 대한 유저의 평점이 존재하지 않습니다.");

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

        if(usergame == null) throw new DoesNotExistData("해당게임에 대한 유저의 평점이 존재하지 않습니다.");

        // deleteHelpful(usergame);

        userGameCommonRepository.delete(usergame);

        HttpVO http = new HttpVO();
        http.setFlag(true);
        http.setData("success");

        return http;
    }

//    private void deleteHelpful(UserGame userGame) {
//        Optional<Helpful> OptionalHelpful = helpfulCommonRepository.findByUserGame(userGame);
//        if(OptionalHelpful.isPresent()){
//            helpfulCommonRepository.delete(OptionalHelpful.get());
//        }
//    }

    @Override
    public HttpVO read(Long user_id, Long app_id) {
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));
        Game game = gameCommonRepository.findById(app_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 게임 정보가 없습니다."));

        UserGame usergame = userGameCommonRepository.findByUserGame(game, user);

        if(usergame == null) throw new DoesNotExistData("해당게임에 대한 유저의 평점이 존재하지 않습니다.");

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

    @Override
    public HttpVO getListV2(Long user_id) {
        User user = userCommonRepository.findById(user_id)
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저 정보가 없습니다."));


        List<UserGame> userGames = userGameCommonRepository.findByUser(user);

        List<Long> result = userGames.stream().map(usergame -> usergame.getGame().getAppId()).collect(Collectors.toList());

        HttpVO http = new HttpVO();

        http.setFlag(true);
        http.setData(result);

        return http;
    }
}
