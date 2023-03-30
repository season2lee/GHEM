package com.ssafy.ghem.convenience.model.service;

import com.ssafy.ghem.convenience.model.entity.Game;
import com.ssafy.ghem.convenience.model.respository.common.GameCommonRepository;
import com.ssafy.ghem.convenience.model.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{

    private final GameCommonRepository gameCommonRepository;

    private static boolean isConvertibleToLong(String str) {
        try {
            Long.parseLong(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
    @Override
    public List<SearchVO> getGameList(String search) {
        List<Game> games = gameCommonRepository.searchByTitle(search);

        if(isConvertibleToLong(search)){
            Optional<Game> game = gameCommonRepository.searchGameByAppId(Long.parseLong(search));

            if(game.isPresent()){
                games.add(game.get());
            }
        }

        List<SearchVO> result = games.stream().map(
                game -> new SearchVO(game)
        ).collect(Collectors.toList());

        return result;
    }
}
