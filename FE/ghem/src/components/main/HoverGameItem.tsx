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

type GameTitle = {
  whatType: string;
  name: string;
  recommendations: number;
  isLike: boolean;
};

type Genres = {
  id: number;
  description: string;
};

type GameDetail = {
  genres: Genres[];
};

function HoverGameItem(props: HoverGameItemProps) {
  const [gameTitle, setGameTitle] = useState<[]>([]);
  const [gameDetail, setGamedetail] = useState<[]>([]);
  useEffect(() => {
    getGameDetail();
    return () => {};
  }, []);

  const getGameDetail = async () => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${props.appid}&l=korean`
      );
      console.log(response.data[props.appid ?? "null"].data);
      setGamedetail(response.data[props.appid ?? "null"].data);
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
      <HoverGameTitle />
      <HoverGameDescription />
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
