import { css } from "@emotion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import DiscountGameDetail from "../discount/DiscountGameDetail";
import HoverGameItem from "../HoverGameItem";

type CommonGameListItemProps = {
  gameType?: "discount" | "steady";
  appid: number;
  imgType: "header" | "capsule";
  canClick: boolean;
};

function CommonGameListItem(props: CommonGameListItemProps) {
  const [isEnter, setIsEnter] = useState<boolean>(false);

  const navigator = useNavigate();

  const toDetail = () => {
    if (props.canClick) {
      navigator(`../detail/${props.appid}`);
    }
  };

  return (
    <div
      onMouseOver={() => {
        setIsEnter(true);
      }}
      onMouseLeave={() => {
        setIsEnter(false);
      }}
    >
      <div onClick={toDetail}>
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
      </div>
      {props.gameType === "discount" && <DiscountGameDetail />}
      {isEnter && <HoverGameItem setIsEnter={setIsEnter} appid={props.appid} />}
    </div>
  );
}

export default CommonGameListItem;

// src={`https://cdn.akamai.steamstatic.com/steam/apps/${props.appid}/capsule_616x353.jpg`}
