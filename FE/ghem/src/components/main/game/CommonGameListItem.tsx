import React, { useState } from "react";
import DiscountGameDetail from "../discount/DiscountGameDetail";
import HoverGameItem from "../HoverGameItem";

type CommonGameListItemProps = {
  gameType?: "discount";
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
      {props.gameType === "discount" && <DiscountGameDetail />}
      {isEnter && <HoverGameItem setIsEnter={setIsEnter} />}
    </div>
  );
}

export default CommonGameListItem;
