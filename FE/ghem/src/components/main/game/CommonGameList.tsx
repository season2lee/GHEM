import React from "react";
import CommonGameListItem from "./CommonGameListItem";

type GameList = {
  appid: number;
};

type CommonGameListProps = {
  gameType?: "discount";
  gameList: GameList[];
};

function CommonGameList(props: CommonGameListProps) {
  return (
    <div>
      CommonGameList
      {props.gameList?.map((item) => {
        return (
          <CommonGameListItem
            gameType={props.gameType}
            appid={item.appid}
            key={item.appid}
          />
        );
      })}
    </div>
  );
}

export default CommonGameList;
