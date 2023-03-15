import React, { useState } from "react";
import { useNavigate } from "react-router";
import DiscountGameDetail from "../discount/DiscountGameDetail";
import HoverGameItem from "../HoverGameItem";

type CommonGameListItemProps = {
  gameType?: "discount";
  appid: number;
  imgType: "header" | "capsule" | "library";
};

function CommonGameListItem(props: CommonGameListItemProps) {
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const navigator = useNavigate();

  return (
    <div
      onMouseEnter={() => {
        setIsEnter(true);
      }}
    >
      CommonGameListItem
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
        {props.imgType === "library" && (
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appid}/library_hero.jpg`}
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
