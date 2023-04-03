import React, { useState, useEffect } from "react";
import ChoiceGameList from "@components/recommend/choicegame/ChoiceGameList";
import axios from "axios";
import {
  gameRecommendState,
  gameRecommendStateType,
  choiceGameState,
  evaluatedGameState,
  dbGameState,
} from "@/store/mainState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router";
import { css } from "@emotion/react";

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
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [gameRecommend, setGameRecommend] = useRecoilState<gameRecommendStateType[]>(gameRecommendState);
  const currentChoiceGame = useRecoilValue(choiceGameState); // 비로그인 시  평가 된 게임
  const currentEvaluateGame = useRecoilValue(evaluatedGameState); // 로그인 시 평가 된 게임
  const currentdbGame = useRecoilValue(dbGameState); //로그인 시 평가 된 게임 db 용
  const { state } = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      LoginListApi(state);
    } else {
      NotLoginListApi(state);
    }
  }, []);

    // 비 로그인 시 선택한 game api
    const RecommendGame = async () => {
      const choiceGameList = currentChoiceGame.join("/");
      navigate("/recommendloading");
      try {
        const response = await axios.get(
          `http://j8d107.p.ssafy.io:32003/games/v1?apps=${choiceGameList}`
        );
        setGameRecommend(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    //비 로그인 시 선택된 카테고리 관련 게임 api
    const NotLoginListApi = async (state: string) => {
      try {
        const response = await axios.get(
          `http://j8d107.p.ssafy.io:32003/games/genre/v1?genre=${state}&top=10`
        );
        let item = response.data;
        for (let i = 0; i < item.length; i++) {
          setGameList((gameList) => [...gameList, item[i]]);
        }
      } catch (err) {
        console.log("Error >>", err);
      }
    };


  //로그인 시 선택된 카테고리 관련 게임 api
  const LoginListApi = async (state: string) => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/games/genre/v2?steam_id=${userId}&genre=${state}&top=10`
      );
      let item = response.data;
      for (let i = 0; i < item.length; i++) {
        setGameList((gameList) => [...gameList, item[i]]);
      }
    } catch (err) {
      console.log("Error >>", err);
    }
  };  

  // 로그인 시 추천을 위해 게임 정보를 
  const EvalRecommendGame = () => {
    for (const game of currentEvaluateGame) {
      EvalRecommendGameApi(game);
    }
    for (const dbGame of currentdbGame) {
      dbGameApi(dbGame);
    }
    navigate("/recommendloading");
  };

  // SVD 알고리즘에 게임 평가 데이터 넣는 api
  const EvalRecommendGameApi = async (data: {}) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://j8d107.p.ssafy.io:32003/rating",
        data
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  
  // 로그인 시 게임 평가 데이터를 넣는 api
  const dbGameApi = async (data: {}) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://j8d107.p.ssafy.io:32000/user/rating",
        data
      );
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div css={layout}>
      <div css={section}>
        {isLoginStatus ? (
          <div> 플레이 한 게임을 평가 해 보세요 </div>
        ) : (
          <div> 재밌게 플레이 했던 게임을 선택 해주세요</div>
        )}
        {currentChoiceGame.length > 0 ? (
              <button onClick={RecommendGame}>추천 받기</button>
        ) : null}
        {currentEvaluateGame.length > 0 ? (
          <button onClick={EvalRecommendGame}>추천받기</button>
        ) : null}
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

const layout = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10%;
`;
const section = css`
  font-size: 2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 20%;
  margin-bottom: 5%;
  color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
      0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53, 0 0 15px #ffd8f840,
      0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
`;
export default ChoiceGamePage;
