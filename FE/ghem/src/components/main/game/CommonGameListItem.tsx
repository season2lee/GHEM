import React, { useState } from "react";
import DiscountGameDetail from "../discount/DiscountGameDetail";
import HoverGameItem from "../HoverGameItem";

type CommonGameListItemProps = {
  gameType?: "discount";
  appid: number;
  imgType: "header" | "capsule";
};

function CommonGameListItem(props: CommonGameListItemProps) {
  const [isEnter, setIsEnter] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        setIsEnter(true);
      }}
    >
      <a href={`./detail/${props.appid}`}>
        {props.imgType === "header" && (
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appid}/header.jpg`}
            alt={`${props.appid}`}
          />
        )}
        {props.imgType === "capsule" && (
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appid}/hero_capsule.jpg`}
            alt={`${props.appid}`}
          />
        )}
      </a>
      {props.gameType === "discount" && <DiscountGameDetail />}
      {isEnter && <HoverGameItem setIsEnter={setIsEnter} />}
    </div>
  );
}

export default CommonGameListItem;
