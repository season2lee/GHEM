import React, { SetStateAction, useEffect, useState } from "react";
import ChoiceGameListItem from "./ChoiceGameListItem";
import { css } from "@emotion/react";

type GameList = {
  appid: number;
};

type ChoiceGameListProps = {
  gameList?: GameList[];

};

function ChoiceGameList({ gameList }: ChoiceGameListProps) {
  const [good, setGood] = useState<number[]>([]);
  const [soso, setSoso] = useState<number[]>([]);
  const [bad, setBad] = useState<number[]>([]);

  useEffect(() => {
    console.log(good);
  }, [good]);

  useEffect(() => {
    console.log(soso);
  }, [soso]);

  useEffect(() => {
    console.log(bad);
  }, [bad]);

  return (
    <div css={choiceList}>
      {gameList?.map((item) => {
        return (
          <ChoiceGameListItem
            appid={item.appid}
            key={item.appid}
            good={good}
            setGood={setGood}
            soso={soso}
            setSoso={setSoso}
            bad={bad}
            setBad={setBad}
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
