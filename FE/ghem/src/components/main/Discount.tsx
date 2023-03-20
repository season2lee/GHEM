import React from "react";
import CommonGameList from "./game/CommonGameList";

function Discount() {
  return (
    <div>
      Discount
      <CommonGameList gameType="discount" gameList={[]} imgType="header" />
    </div>
  );
}

export default Discount;
