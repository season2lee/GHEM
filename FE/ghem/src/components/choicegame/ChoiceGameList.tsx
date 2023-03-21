import React, { SetStateAction, useEffect, useState } from "react";
import ChoiceGameListItem from "./ChoiceGameListItem";
import { css } from "@emotion/react";

type GameList = {
  appid: number;
};

type ChoiceGameListProps = {
  gameList?: GameList[];
  imgType: "header" | "capsule";
};

function ChoiceGameList({ gameList, imgType }: ChoiceGameListProps) {
  const [data, setData] = useState<number[]>([]);
  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <div css={choiceList}>
      {gameList?.map((item) => {
        return (
          <ChoiceGameListItem
            appid={item.appid}
            imgType={imgType}
            key={item.appid}
            data={data}
            setData={setData}
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
