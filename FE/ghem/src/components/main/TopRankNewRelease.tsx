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
  setColId: React.Dispatch<React.SetStateAction<string>>;
  currentColId: string;
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
        setColId={props.setColId}
        colId="toprate1"
        currentColId={props.currentColId}
      />
      <CommonGameList
        gameList={topRankLists[1]?.item_ids}
        imgType="header"
        scrollType={1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        colId="toprate2"
        currentColId={props.currentColId}
      />
      <CommonGameList
        gameList={topRankLists[2]?.item_ids}
        imgType="header"
        scrollType={-1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        colId="toprate3"
        currentColId={props.currentColId}
      />
    </div>
  );
}

export default TopRankNewRelease;
