import React, { useState, useEffect } from "react";
import ChoiceGameList from "@components/choicegame/ChoiceGameList";
import axios from "axios";
import {
  gameRecommendState,
  gameRecommendStateType,
  evaluatedGameState,
} from "@/store/mainState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router";

type GameItemList = {
  appid: number;
};

type GameList = {
  app_id: number;
  genre: string;
  nagative_reviews: number;
  positive_reviews: number;
  rating: number;
  rating_desc: string;
  release_date: string;
  title: string;
};

function ChoiceGamePage() {
  const [gameList, setGameList] = useState<GameList[]>([]);
  // const [filterGameList, setFilterGameList] = useState<GameList[]>([]);
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [gameRecommend, setGameRecommend] =
    useRecoilState<gameRecommendStateType[]>(gameRecommendState);
  const currentEvaluate = useRecoilValue(evaluatedGameState); // 평가 된 게임
  // const { state } = useLocation();

  useEffect(() => {
    categoryList();
    return () => {};
  }, []);

  useEffect(() => {
    console.log(gameList);
  }, [gameList]);

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  // 추천 받을 게임 axios 요청
  const RecommendGame = async () => {
    try {
      const response = await axios.get(
        "http://j8d107.p.ssafy.io:32003/games?app_id=10"
      );
      setGameRecommend(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const categoryList = async () => {
    const state = ["Action", "Adventure", "RPG"];
    for (let i = 0; i < state.length; i++) {
      try {
        await TopRankListApi(state[i]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 선택된 카테고리 관련 게임 api
  const TopRankListApi = async (genre: string) => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/games/genre?genre=${genre}&top=10`
      );
      let item = response.data;
      for (let i = 0; i < item.length; i++) {
        setGameList((gameList) => [...gameList, item[i]]);
      }
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div>
      <div>
        {isLoginStatus ? (
          <div> 플레이 한 게임을 평가 해 보세요 </div>
        ) : (
          <div> 재밌게 플레이 했던 게임을 선택 해주세요</div>
        )}
        <button onClick={RecommendGame}>추천 받기</button>
      </div>

      <div>
        <ChoiceGameList
          gameList={gameList}
          userId={userId}
          isLoginStatus={isLoginStatus}
        />
      </div>
    </div>
  );
}

export default ChoiceGamePage;
