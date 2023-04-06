import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import HoverGameDescription from "./hover-modal/HoverGameDescription";
import HoverGameTitle from "./hover-modal/HoverGameTitle";
import { userDevice } from "@/store/mainState";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageXY } from "@/pages/MainPage";
import axios from "axios";
import { mobile } from "@/util/Mixin";
import { useNavigate } from "react-router";

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

  const [userDeviceSet, setUserDeviceSet] = useRecoilState<boolean | number>(
    userDevice
  );

  const navigator = useNavigate();

  const env = import.meta.env;

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
      const response = await axios.get(env.VITE_GAME_DETAIL + props.appid);
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
      style={
        userDeviceSet
          ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
          : {
              top: `${props.pageXY.y}px`,
              left: `${props.pageXY.x}px`,
            }
      }
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
        setIsEnter={props.setIsEnter}
      />
      <HoverGameDescription gameDetail={gameDetail} haveData={haveData} />
      {userDeviceSet && haveData === "have" && (<div css={btnContainer}>
        <button css={btn}
          onClick={() => {
            navigator(`../detail/${props.appid}`);
          }}
        >
          to Detail
        </button>
      </div>
      )}
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
  text-overflow: ellipsis;
  ${mobile} {
    width: 80%;
  }
`;

const btn = css`
  width: 6rem;
  height: 2rem;
  border-radius: 5px;
  padding: 7px 10px;
  border: none;
  color: white;
  margin-right: 10%;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);
  }
`;
const btnContainer = css`
  width:100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 1rem;
  margin-top: 0.5rem;
`

export default HoverGameItem;
