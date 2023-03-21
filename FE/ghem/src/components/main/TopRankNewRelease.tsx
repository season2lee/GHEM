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

type TopRankNewReleaseProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
};

function TopRankNewRelease(props: TopRankNewReleaseProps) {
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
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
      />
      <CommonGameList
        gameList={topRankLists[1]?.item_ids}
        imgType="header"
        scrollType={1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
      />
      <CommonGameList
        gameList={topRankLists[2]?.item_ids}
        imgType="header"
        scrollType={-1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
      />
    </div>
  );
}

export default TopRankNewRelease;
