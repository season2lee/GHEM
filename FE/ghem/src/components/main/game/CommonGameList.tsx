import React from "react";
import CommonGameListItem from "./CommonGameListItem";

type CommonGameListProps = {
  gameType?: "discount";
};

function CommonGameList(props: CommonGameListProps) {
  return (
    <div>
      CommonGameList
      <CommonGameListItem gameType={props.gameType} />
    </div>
  );
}

export default CommonGameList;
