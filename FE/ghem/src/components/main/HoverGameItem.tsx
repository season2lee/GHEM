import { css } from "@emotion/react";
import React from "react";
import HoverGameDescription from "./hover-modal/HoverGameDescription";
import HoverGameTitle from "./hover-modal/HoverGameTitle";

type HoverGameItemProps = {
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  appid: number;
};

function HoverGameItem(props: HoverGameItemProps) {
  return (
    <div
      css={hoverModal}
      onMouseLeave={() => {
        props.setIsEnter(false);
      }}
      onMouseOver={() => {
        props.setIsEnter(true);
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
