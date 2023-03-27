import React, { SetStateAction, useEffect, useState } from "react";
import ChoiceGameListItem from "./ChoiceGameListItem";
import { css } from "@emotion/react";

type GameList = {
  appid: number;
};

type ChoiceGameListProps = {
  gameList?: GameList[];
  userId: number;
  isLoginStatus: boolean;
};

function ChoiceGameList({ gameList,userId,isLoginStatus }: ChoiceGameListProps) {
  

  return (
    <div css={choiceList}>
      {gameList?.map((item) => {
        return (
          <ChoiceGameListItem
            appid={item.appid}
            key={item.appid}
            userId={userId}
            isLoginStatus={isLoginStatus}
          />
        );
      })}
    </div>
  );
}

const choiceList = css`
  display: flex;
  flex-wrap: wrap;
`;

export default ChoiceGameList;
