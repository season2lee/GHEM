import React from "react";
import HoverGameTag from "./HoverGameTag";
import { GameDetailFromSteam } from "../HoverGameItem";

type HoverGameDescriptionProps = {
  gameDetail: GameDetailFromSteam | null;
};

function HoverGameDescription(props: HoverGameDescriptionProps) {
  return (
    <div>
      HoverGameDescription
      {props.gameDetail?.short_description}
      <HoverGameTag />
    </div>
  );
}

export default HoverGameDescription;
