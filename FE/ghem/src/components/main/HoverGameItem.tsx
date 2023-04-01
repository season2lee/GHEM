import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import HoverGameDescription from "./hover-modal/HoverGameDescription";
import HoverGameTitle from "./hover-modal/HoverGameTitle";
import { PageXY } from "@/pages/MainPage";
import axios from "axios";

type HoverGameItemProps = {
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setCanClickWithHover: React.Dispatch<React.SetStateAction<boolean>>;
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
  }[];
  movies?: {
    id: number;
    webm: { 480: string };
    mp4: { 480: string };
  }[];
  recommendations: {
    total: number;
  };
  genres: Genres[];
};

function HoverGameItem(props: HoverGameItemProps) {
  const [gameDetail, setGamedetail] = useState<GameDetailFromSteam | null>(
    null
  );
  const [haveData, setHaveData] = useState<"have" | "null" | "loading">(
    "loading"
  );
  useEffect(() => {
    getGameDetail();
    return () => {};
  }, [props.appid]);

  useEffect(() => {
    if (haveData !== "have") {
      props.setCanClickWithHover(false);
    } else {
      props.setCanClickWithHover(true);
    }
  }, [haveData]);

  const getGameDetail = async () => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${props.appid}&l=korean`
      );
      if (response.data[props.appid ?? "null"].success) {
        setGamedetail(response.data[props.appid ?? "null"].data);
        setHaveData("have");
      } else {
        setHaveData("null");
      }
    } catch (err) {
      console.log("Error >>", err);
      setHaveData("null");
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
      <HoverGameTitle
        gameTitle={gameDetail?.name}
        gameRecommend={gameDetail?.recommendations}
        gameType={gameDetail?.type}
        appid={props.appid}
        haveData={haveData}
      />
      <HoverGameDescription gameDetail={gameDetail} haveData={haveData} />
    </div>
  );
}

const hoverModal = css`
  position: fixed;
  background-color: #eae7ef;
  width: 30%;
  height: auto;
  padding: 1rem 0rem;
  color: black;
  border-radius: 10px;
`;

export default HoverGameItem;
