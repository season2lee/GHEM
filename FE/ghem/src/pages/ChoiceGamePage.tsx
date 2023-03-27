import React, { useState, useEffect } from "react";
import ChoiceGameList from "@components/choicegame/ChoiceGameList";
import axios from "axios";
import StarRating from "@components/gamedetail/imagehead/StarRating";
import { gameRecommendState,gameRecommendStateType,evaluatedGameState } from "@/store/mainState";
import { useRecoilState, useRecoilValue } from "recoil";

type GameItemList = {
  appid: number;
};

type GameList = {
  name: string;
  start_of_month: number;
  url_path: string;
  item_ids: GameItemList[];
};



function ChoiceGamePage() {
  const [gameList, setGameList] = useState<GameList[]>([]);
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [gameRecommend, setGameRecommend] = useRecoilState<gameRecommendStateType[]>(gameRecommendState)
  const currentEvaluate = useRecoilValue(evaluatedGameState) // 평가 된 게임 

  useEffect(() => {
    TopRankListApi();
    return () => {};
  }, []);
  
  useEffect(() => {
    if(userId) {
      setIsLoginStatus(true)
    }
  },[userId] )

  // 추천 받을 게임 axios 요청 
  const RecommendGame = async () => {
    try {
      const response = await axios.get(
        "http://j8d107.p.ssafy.io:32003/games?app_id=10"
      );
        setGameRecommend(response.data)
        console.log(gameRecommend)
    } catch (err) {
      console.log(err)
    }
  }



  const TopRankListApi = async () => {
    try {
      const response = await axios.get(
        "https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/"
      );
      setGameList(response.data.response.pages);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div>
      <div>
      {isLoginStatus? (
        <div> 플레이 한 게임을 평가 해 보세요  </div>
      ):(
        <div> 재밌게 플레이 했던 게임을 선택 해주세요</div>
      )}
      <button onClick={RecommendGame}>추천 받기</button>
      </div>
      
      <div>
        <ChoiceGameList
          gameList={gameList[0]?.item_ids}
          userId = {userId}
          isLoginStatus={isLoginStatus}
        />
      </div>
    </div>
  );
}

export default ChoiceGamePage;
