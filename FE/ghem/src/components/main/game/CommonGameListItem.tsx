import React, { useState } from "react";
import DiscountGameDetail from "../discount/DiscountGameDetail";
import HoverGameItem from "../HoverGameItem";

type CommonGameListItemProps = {
  gameType?: "discount";
  appid: number;
};

function CommonGameListItem(props: CommonGameListItemProps) {
  const [isEnter, setIsEnter] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        setIsEnter(true);
      }}
    >
      CommonGameListItem
      <img
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${props.appid}/header.jpg`}
        alt={`props.appid`}
      />
      {props.gameType === "discount" && <DiscountGameDetail />}
      {isEnter && <HoverGameItem setIsEnter={setIsEnter} />}
    </div>
  );
}

export default CommonGameListItem;
