package com.ssafy.ghem.user.model.service;

import com.ssafy.ghem.user.controller.exception.DoesNotExistData;
import com.ssafy.ghem.user.model.entity.Dib;
import com.ssafy.ghem.user.model.entity.Game;
import com.ssafy.ghem.user.model.entity.User;
import com.ssafy.ghem.user.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.user.model.respository.common.UserCommonRepository;
import com.ssafy.ghem.user.model.respository.individual.DibsIndividualRepository;
import com.ssafy.ghem.user.model.vo.DibsInfo;
import com.ssafy.ghem.user.model.vo.HttpVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class DibsServiceImpl implements DibsService{

    private final UserCommonRepository userCommonRepository;
    private final GameCommonRepository gameCommonRepository;
    private final DibsIndividualRepository dibsIndividualRepository;

    @Override
    public HttpVo doDibs(DibsInfo dibsInfo) {
        HttpVo http = new HttpVo();

        User user = getUser(dibsInfo);
        Game game = getGame(dibsInfo);

        Dib dib = Dib.builder()
                .app_id(game.getAppId())
                .user_id(user.getUser_id())
                .build();

        dibsIndividualRepository.save(dib);

        http.setFlag(true);
        return http;
    }

    @Override
    public HttpVo checkDibs(Long app_id, Long user_id) {
        HttpVo http = new HttpVo();
        Map<String, Object> map = new HashMap<>();

        Dib dib = dibsIndividualRepository.getByAppIdAndUserId(app_id, user_id);
        map.put("Dib", dib);

        http.setFlag(true);
        http.setData(map);
        return http;
    }

    @Transactional
    public User getUser(DibsInfo dibsInfo){
        User user = userCommonRepository.findById(dibsInfo.getUserId())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저가 없습니다."));

        return user;
    }

    @Transactional
    public Game getGame(DibsInfo dibsInfo){
        Game game = gameCommonRepository.findById(dibsInfo.getAppId())
                .orElseThrow(() -> new DoesNotExistData("해당하는 유저가 없습니다."));

        return game;
    }

}
