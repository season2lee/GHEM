import React, { useState, useEffect } from "react";
import ChoiceGameList from "@components/choicegame/ChoiceGameList";
import axios from "axios";

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


  useEffect(() => {
    TopRankListApi();
    return () => {};
  }, []);


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
      <div>흠</div>
      <div>
        <ChoiceGameList
          gameList={gameList[0]?.item_ids}
        />
      </div>
    </div>
  );
}

export default ChoiceGamePage;
