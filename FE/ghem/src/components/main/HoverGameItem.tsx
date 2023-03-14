import React from "react";
import HoverGameDescription from "./hover-modal/HoverGameDescription";
import HoverGameTitle from "./hover-modal/HoverGameTitle";

type HoverGameItemProps = {
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
};

function HoverGameItem(props: HoverGameItemProps) {
  return (
    <div
      onMouseLeave={() => {
        props.setIsEnter(false);
      }}
    >
      HoverGameItem
      <HoverGameTitle />
      <HoverGameDescription />
    </div>
  );
}

export default HoverGameItem;
