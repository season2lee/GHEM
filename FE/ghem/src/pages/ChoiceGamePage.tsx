import React, { useState, useEffect } from "react";
import ChoiceGameList from "@components/recommend/choicegame/ChoiceGameList";
import axios from "axios";
import {
  gameRecommendState,
  gameRecommendStateType,
  choiceGameState,
  evaluatedGameState,
  dbGameState

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
  const [gameRecommend, setGameRecommend] =useRecoilState<gameRecommendStateType[]>(gameRecommendState); 
  // 비 로그인 시 추천 받은 게임  
  const currentChoiceGame = useRecoilValue(choiceGameState); // 비로그인 시  평가 된 게임
  const currentEvaluateGame = useRecoilValue(evaluatedGameState) // 로그인 시 평가 된 게임
  const currentdbGame = useRecoilValue(dbGameState) //로그인 시 평가 된 게임 db 용 
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() =>{console.log("@@@@",currentdbGame)}, [currentdbGame])



  useEffect(() => {
    console.log(gameList);
  }, [gameList]);

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  useEffect(() => {
    TopRankListApi(state);
  }, []);

  //비 로그인시 추천 받을 게임 axios 요청

  const RecommendOneGame = async ()=> {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/games?apps=${currentChoiceGame}`
      );
      navigate("/recommendloading")
      // if (response.data === 0){
      //   alert("해당 게임에 대한 정보가 부족하여 추천 받을 수 없습니다.")
      // }else {
      //   setGameRecommend(response.data);
      //   navigate("/recommendloading")
      // }
    } catch (err) {
      console.log(err);
    }
  }


  const EvalRecommendGame = () => {
    for ( const game of currentEvaluateGame){
      EvalRecommendGameApi(game)
    }
    for (const dbGame of currentdbGame){
      dbGameApi(dbGame)
    }
    navigate("/recommendloading")
  } 

  const EvalRecommendGameApi = async (data:{}) => {
    console.log(data)
    try {
      const response = await axios.post("http://j8d107.p.ssafy.io:32003/rating",data)
      console.log(response)
    }catch (err) {
      console.log(err)
    }
  }

  const dbGameApi = async (data:{}) => {
    console.log(data)
    try {
      const response = await axios.post("http://j8d107.p.ssafy.io:32000/user/rating",data)
      console.log(response)
    }catch (err) {
      console.log(err)
    }
  }


  const RecommendGame = async () => {
      const choiceGameList = currentChoiceGame.join("/");
      navigate("/recommendloading")
      try {
        const response = await axios.get(
          `http://j8d107.p.ssafy.io:32003/games?apps=${choiceGameList}`
        );
        setGameRecommend(response.data);
      } catch (err) {
        console.log(err);
      }
  };

  // 로그인 시 추천 받을 게임 axios 요청

  // 선택된 카테고리 관련 게임 api
  const TopRankListApi = async (state: string) => {
    try {
      const response = await axios.get(
        `http://j8d107.p.ssafy.io:32003/games/genre?genre=${state}&top=30`
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
    <div css={layout}>
      <div css={section}>
        {isLoginStatus ? (
          <div> 플레이 한 게임을 평가 해 보세요 </div>
        ) : (
          <div> 재밌게 플레이 했던 게임을 선택 해주세요</div>
        )}
        {currentChoiceGame.length > 0 ? (<>
          {currentChoiceGame.length == 1? (
          <button onClick={RecommendOneGame}>추천 받기</button>
          ):(<button onClick={RecommendGame}>추천 받기</button>)}
        </>
        ) : null}
        {currentEvaluateGame.length > 0 ? (
        <button onClick={EvalRecommendGame}>추천받기</button>
        ):(null)}
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

`
const section = css`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 20%;
  margin-bottom: 5%;
 
`
export default ChoiceGamePage;
