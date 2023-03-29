import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonGameList from "./game/CommonGameList";
import { PageXY } from "@/pages/MainPage";

type RankList = {
  rank: number;
  appid: number;
};

type SteadySellerProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  currentColId: string;
  canClickWithHover: boolean;
};

function SteadySeller(props: SteadySellerProps) {
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
    <div css={steadyDiv}>
      <span css={steadyText}>BY ALL USER</span>
      <div css={divheight} />
      <CommonGameList
        gameList={steadyGameList.slice(0, 30)}
        // imgType="capsule"
        imgType="header"
        scrollType={1}
        gameType="steady"
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="steady1"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
      <div css={divheight} />
      <CommonGameList
        gameList={steadyGameList.slice(30, 60)}
        // imgType="capsule"
        imgType="header"
        scrollType={-1}
        gameType="steady"
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="steady2"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
      <div css={divheight} />
      <CommonGameList
        gameList={steadyGameList.slice(60, 90)}
        // imgType="capsule"
        imgType="header"
        scrollType={1}
        gameType="steady"
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="steady3"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
    </div>
  );
}

const divheight = css`
  height: 2rem;
`;

const steadyDiv = css`
  > span {
    font-size: 60px;
  }
  margin: 10rem 6rem;
  padding: 1rem 0rem 1rem 0rem;
  background-color: #352c42;
  border-radius: 30px;
  overflow: hidden;
`;

const steadyText = css`
  color: #fff;
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
    0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
`;

export default SteadySeller;
