import { css } from "@emotion/react";
import React from "react";
import HoverGameDescription from "./hover-modal/HoverGameDescription";
import HoverGameTitle from "./hover-modal/HoverGameTitle";

type HoverGameItemProps = {
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  appid: number | null;
  colId: string;
};

function HoverGameItem(props: HoverGameItemProps) {
  return (
    <div
      css={hoverModal}
      onMouseLeave={() => {
        props.setIsEnter(false);
      }}
      onMouseOver={(e) => {
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
  padding: 5rem;
  color: black;
  border-radius: 10px;
  top: ${`50vh`};
  left: ${`50vw`};
`;

export default HoverGameItem;
