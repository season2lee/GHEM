import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonGameList from "./game/CommonGameList";

type RankItemList = {
  appid: number;
};

type RankList = {
  name: string;
  start_of_month: number;
  url_path: string;
  item_ids: RankItemList[];
};

function TopRankNewRelease() {
  const [topRankLists, setTopRankLists] = useState<RankList[]>([]);

  useEffect(() => {
    TopRankListApi();
    return () => {};
  }, []);

  const TopRankListApi = async () => {
    try {
      const response = await axios.get(
        "https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/"
      );
      setTopRankLists(response.data.response.pages);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div>
      <CommonGameList
        gameList={topRankLists[0]?.item_ids}
        imgType="header"
        scrollType={-1}
      />
      <CommonGameList
        gameList={topRankLists[1]?.item_ids}
        imgType="header"
        scrollType={1}
      />
      <CommonGameList
        gameList={topRankLists[2]?.item_ids}
        imgType="header"
        scrollType={-1}
      />
    </div>
  );
}

export default TopRankNewRelease;
