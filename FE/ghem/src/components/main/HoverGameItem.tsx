import { css } from "@emotion/react";
import React from "react";
import HoverGameDescription from "./hover-modal/HoverGameDescription";
import HoverGameTitle from "./hover-modal/HoverGameTitle";
import { PageXY } from "@/pages/MainPage";

type HoverGameItemProps = {
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  appid: number | null;
  colId: string;
  pageXY: PageXY;
};

function HoverGameItem(props: HoverGameItemProps) {
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
