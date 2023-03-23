import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router";
import DiscountGameDetail from "../discount/DiscountGameDetail";
import { PageXY } from "@/pages/MainPage";

type CommonGameListItemProps = {
  gameType?: "discount" | "steady";
  appid: number;
  imgType: "header" | "capsule";
  canClick: boolean;
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  colId: string;
  isDrag: boolean;
  discountPercent?: number;
  originalPrice?: number;
  finalPrice?: number;
  largeImage?: string;
  smallImage?: string;
};

function CommonGameListItem(props: CommonGameListItemProps) {
  const navigator = useNavigate();

  const toDetail = () => {
    if (props.canClick) {
      navigator(`../detail/${props.appid}`);
    }
  };

  return (
    <div
      css={gameItem}
      onMouseOver={(e) => {
        props.setAppid(props.appid);
        props.setColId(props.colId);
        if (!props.isDrag) {
          props.setIsEnter(true);
          props.setPageXY({ x: e.clientX, y: e.clientY });
        }
      }}
      onMouseLeave={() => {
        props.setIsEnter(false);
        props.setColId("empty");
      }}
    >
      <div onClick={toDetail}>
        {props.imgType === "header" && (
          <img
            css={imgsize}
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
      {props.gameType === "discount" && (
        <DiscountGameDetail
          discountPercent={props.discountPercent}
          originalPrice={props.originalPrice}
          finalPrice={props.finalPrice}
          largeImage={props.largeImage}
          smallImage={props.smallImage}
        />
      )}
    </div>
  );
}

const gameItem = css`
  margin: 5px;
`;

const imgsize = css`
  width: 15rem;
  height: auto;
`;

export default CommonGameListItem;

// src={`https://cdn.akamai.steamstatic.com/steam/apps/${props.appid}/capsule_616x353.jpg`}
