import React, { useState, SetStateAction } from "react";
import { css } from "@emotion/react";

type ChoiceGameListItemProps = {
  appid: number;
  setGood: React.Dispatch<SetStateAction<number[]>>;
  setSoso: React.Dispatch<SetStateAction<number[]>>;
  setBad: React.Dispatch<SetStateAction<number[]>>;
  good: number[];
  soso: number[];
  bad: number[];
};

function ChoiceGameListItem({
  appid,
  setGood,
  setSoso,
  setBad,
  good,
  soso,
  bad,
}: ChoiceGameListItemProps) {
  const ClickGoodhandler = () => {
    setGood([...good, appid]);
  };

  const ClickSosohandler = () => {
    setSoso([...soso, appid]);
  };

  const ClickBadhandler = () => {
    setBad([...soso, appid]);
    document.getElementById("back")?.classList.toggle("do-flip");
  };

  return (
    <div>
      <div>
        <div className="front">
          <img
            css={selectTmg}
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/hero_capsule.jpg`}
            alt={`${appid}`}
          />
          <div>
            <button onClick={ClickGoodhandler}>😄</button>
            <button onClick={ClickSosohandler}>😐</button>
            <button onClick={ClickBadhandler}>😥</button>
          </div>
        </div>
        <div className="back">
          <p>back</p>
          <button>😄</button>
        </div>
      </div>
    </div>
  );
}


const selectTmg = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export default ChoiceGameListItem;
