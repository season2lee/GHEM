import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import HoverGameDescription from "./hover-modal/HoverGameDescription";
import HoverGameTitle from "./hover-modal/HoverGameTitle";
import { PageXY } from "@/pages/MainPage";
import axios from "axios";

type HoverGameItemProps = {
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  appid: number | null;
  colId: string;
  pageXY: PageXY;
};

export type GamePrice = {
  initial: number;
  final: number;
  discount_percent: number;
  final_formatted: string;
};

export type Movies = {
  id: number;
  webm: { 480: string };
  mp4: { 480: string };
};

export type Genres = {
  id: number;
  description: string;
};

export type GameDetailFromSteam = {
  name: string;
  type: string;
  is_free: boolean;
  short_description: string;
  price_overview: GamePrice;
  screenshots: {
    id: number;
    path_thumbnail: string;
  };
  movies: Movies;
  recommendations: {
    total: number;
  };
  genres: Genres[];
};

function HoverGameItem(props: HoverGameItemProps) {
  const [gameDetail, setGamedetail] = useState<GameDetailFromSteam | null>(
    null
  );
  useEffect(() => {
    getGameDetail();
    return () => {};
  }, [props.appid]);

  const getGameDetail = async () => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${props.appid}&l=korean`
      );
      // console.log(response.data[props.appid ?? "null"].data);
      setGamedetail(response.data[props.appid ?? "null"].data);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const getGameTitle = async () => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${props.appid}&l=korean`
      );
    } catch (err) {
      console.log("Error >>", err);
    }
  };
  return (
    <div
      css={hoverModal}
      style={{
        top: `${props.pageXY.y}px`,
        left: `${props.pageXY.x}px`,
      }}
      onMouseLeave={() => {
        props.setIsEnter(false);
        props.setColId("empty");
      }}
      onMouseOver={() => {
        props.setIsEnter(true);
        props.setColId(props.colId);
      }}
    >
      HoverGameItem
      {props.appid}
      <HoverGameTitle
        gameTitle={gameDetail?.name}
        gameRecommend={gameDetail?.recommendations}
        gameType={gameDetail?.type}
        appid={props.appid}
      />
      <HoverGameDescription gameDetail={gameDetail} />
    </div>
  );
}

const hoverModal = css`
  position: fixed;
  background-color: azure;
  width: 30%;
  height: 40%;
  padding: 5rem;
  color: black;
  border-radius: 10px;
`;

export default HoverGameItem;
