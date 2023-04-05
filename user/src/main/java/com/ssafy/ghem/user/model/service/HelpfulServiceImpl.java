package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.AlreadyExistData;
import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Helpful;
import com.ssafy.ghem.user.model.entity.UserGame;
import com.ssafy.ghem.user.model.respository.common.HelpfulCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserGameCommonRepository;
import com.ssafy.ghem.user.model.vo.HelpfulVO;
import com.ssafy.ghem.user.model.vo.HttpVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HelpfulServiceImpl implements HelpfulService{

    private final UserGameCommonRepository userGameCommonRepository;
    private final HelpfulCommonRepository helpfulCommonRepository;

    @Override
    public HttpVO createHelpful(HelpfulVO helpfulVO) {
        HttpVO http = new HttpVO();

        Optional<UserGame> OptionalUserGame = userGameCommonRepository.findById(helpfulVO.getUser_game_id());

        if(!OptionalUserGame.isPresent()){
            throw new DoesNotExistData("UserGame Entity가 없습니다.");
        }

        Optional<Helpful> OptionalHelpful = helpfulCommonRepository.findByUserGameIdAndUserId(helpfulVO.getUser_id(), helpfulVO.getUser_game_id());

        if(OptionalHelpful.isPresent()){
            throw new AlreadyExistData("이미 값이 존재합니다.");
        }

        Helpful helpful = Helpful.builder()
                    .userId(helpfulVO.getUser_id())
                    .build();

        UserGame userGame = OptionalUserGame.get();
        userGame.increaseHelpful();
        helpful.setUserGame(userGame);

        helpfulCommonRepository.save(helpful);
        http.setFlag(true);
        return http;
    }

    @Override
    public HttpVO deleteHelpful(HelpfulVO helpfulVO) {
        HttpVO http = new HttpVO();

        Optional<UserGame> OptionalUserGame = userGameCommonRepository.findById(helpfulVO.getUser_game_id());

        if(!OptionalUserGame.isPresent()){
            throw new DoesNotExistData("UserGame Entity가 없습니다.");
        }

        Optional<Helpful> OptionalHelpful = helpfulCommonRepository.findByUserGameIdAndUserId(helpfulVO.getUser_id(), helpfulVO.getUser_game_id());

        if(OptionalHelpful.isPresent()){
            Helpful helpful = OptionalHelpful.get();

            UserGame userGame = OptionalUserGame.get();
            userGame.decreaseHelpful();

            helpfulCommonRepository.delete(helpful);
        }

        http.setFlag(true);
        return http;
    }

    @Override
    public HttpVO getHelpful(Long userId) {
        HttpVO http = new HttpVO();

        List<Helpful> result = helpfulCommonRepository.getAllUserId(userId);

        http.setFlag(true);
        http.setData(result);
        return http;
    }
}
