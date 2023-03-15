import React from "react";
import CommonGameList from "./game/CommonGameList";

function SteadySeller() {
  return (
    <div>
      SteadySeller 윗줄
      <CommonGameList gameList={[]} imgType="capsule" />
      아랫줄
      <CommonGameList gameList={[]} imgType="capsule" />
    </div>
  );
}

export default SteadySeller;
