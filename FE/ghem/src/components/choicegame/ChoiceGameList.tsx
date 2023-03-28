import React, { SetStateAction, useEffect, useState } from "react";
import ChoiceGameListItem from "./ChoiceGameListItem";
import { css } from "@emotion/react";

type GameList = {
  app_id: number;
  genre: string;
  nagative_reviews: number;
  positive_reviews: number;
  rating: number;
  rating_desc: string;
  release_date: string;
  title: string;
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
            app_id={item.app_id}
            key={item.app_id}
            genre={item.genre}
            nagative_reviews={item.nagative_reviews}
            positive_reviews={item.positive_reviews}
            rating={item.rating}
            rating_desc={item.rating_desc}
            release_date={item.release_date}
            title={item.title}
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
