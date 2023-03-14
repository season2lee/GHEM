import React from "react";
import CommonGameList from "./game/CommonGameList";

function SteadySeller() {
  return (
    <div>
      SteadySeller 윗줄
      <CommonGameList />
      아랫줄
      <CommonGameList />
    </div>
  );
}

export default SteadySeller;
