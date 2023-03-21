import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonGameList from "./game/CommonGameList";

type RankList = {
  rank: number;
  appid: number;
};

function SteadySeller() {
  const [steadyGameList, setSteadyGameList] = useState<RankList[]>([]);
  useEffect(() => {
    TopRankListApi();
    return () => {};
  }, []);

  const TopRankListApi = async () => {
    try {
      const response = await axios.get(
        "https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
        // "https://api.steampowered.com/ISteamChartsService/GetGamesByConcurrentPlayers/v1/?"
      );
      setSteadyGameList(response.data.response.ranks);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div>
      <CommonGameList
        gameList={steadyGameList.slice(0, 50)}
        // imgType="capsule"
        imgType="header"
        scrollType={1}
        gameType="steady"
      />
      <CommonGameList
        gameList={steadyGameList.slice(50, 100)}
        // imgType="capsule"
        imgType="header"
        scrollType={-1}
        gameType="steady"
      />
    </div>
  );
}

export default SteadySeller;
