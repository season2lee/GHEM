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
import { mobile } from "@/util/Mixin";

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
          `http://j8d107.p.ssafy.io:32003/games/genre/v1?genre=${state}&top=30`
        );
        let item = response.data;
        if (item.length === 0) {
        }
        console.log(item)
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
        `http://j8d107.p.ssafy.io:32003/games/genre/v2?steam_id=${userId}&genre=${state}&top=30`
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
      <div css={textsection}>
        <div css={text}>
        {isLoginStatus ? (
          <div className="text"> 플레이 한 게임을 평가 해 보세요 </div>
        ) : (
          <div className="text"> 재밌게 플레이 했던 게임을 선택 해주세요</div>
        )}
        </div>
        <div css={btnContainer}>
        {currentChoiceGame.length > 0 ? (
              <button css={moveBtn} onClick={RecommendGame}>추천 받기</button>
        ) : null}
        {currentEvaluateGame.length > 0 ? (
          <button css={moveBtn} onClick={EvalRecommendGame}>추천받기</button>
        ) : null}
        </div>
      </div>
      <div css={section}>
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
  margin: 10%;
  ${mobile}{
    margin: 0;
  }
`;

const textsection = css`
  flex-direction: column;
  font-size: 2rem;
  display:flex;
  align-items: flex-start;
  width: 100%;
  height: 20%;
  margin-right: 5%;
  margin-left: 5%;
  text-align: center;
  color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
      0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53, 0 0 15px #ffd8f840,
      0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
      ${mobile} {
        width: 80%;
        align-items: center;
        justify-content: center;
        margin-right: 15%;
  margin-left: 15%;
  margin-bottom: 5%;
    }
  
`

const section = css`
  flex-direction: column;
  font-size: 2rem;
  display:flex;
  align-items: flex-start;
  width: 100%;
  height: 20%;
  color: #ffffffef;
    text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45,
      0 0 7px #f6b4ffb9, 0 0 10px #f1c1ff53, 0 0 15px #ffd8f840,
      0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
  .text {
    /* margin-left:1%; */
   
  }
      ${mobile} {
        width: 80%;
        align-items: center;
        justify-content: center;
   
        
    }

`;

const moveBtn = css`
  width: 5rem;
  height:2rem ;
  border-radius: 5px;
  padding: 7px 10px;
  border: none;
  color: white;
  margin-right: 10%;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);

   
  }
  ${mobile}{
      width: 5rem;
    }
`

const text = css`
 ${mobile}{
    text-align: start;
      width: 85%;
      font-size: 1.2rem;
    }
`;

const btnContainer = css`
  padding-top:1rem ;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-align: end;

  ${mobile}{
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }
`
export default ChoiceGamePage;
