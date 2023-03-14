import React from "react";
import CommonGameList from "./game/CommonGameList";

function TopRankNewRelease() {
  return (
    <div>
      TopRankNewRelease 저번달
      <CommonGameList />
      저저번달
      <CommonGameList />
      저저저번달
      <CommonGameList />
    </div>
  );
}

export default TopRankNewRelease;
