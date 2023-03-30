package com.ssafy.ghem.convenience.model.service;

import com.ssafy.ghem.convenience.model.vo.SearchVO;

import java.util.List;

public interface SearchService {
    List<SearchVO> getGameList(String search);
}
