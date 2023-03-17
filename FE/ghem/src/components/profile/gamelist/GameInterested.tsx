import React from "react";
import { css } from "@emotion/react";
import GameCard from "./GameCard";

function GameInterested() {
  return (
    <div css={gameInterestedWrapper}>
      <h4>
        찜했어요 <span>(20)</span>
      </h4>
      <div css={gameCardWrapper}>
        <GameCard path="interest" />
        <GameCard path="interest" />
        <GameCard path="interest" />
        <GameCard path="interest" />
        <GameCard path="interest" />
      </div>
    </div>
  );
}

const gameInterestedWrapper = css`
  width: 100%;
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  > h4 {
    margin-bottom: 25px;
  }

  > h4 > span {
    font-weight: normal;
    font-size: 18px;
  }
`;

const gameCardWrapper = css`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

export default GameInterested;
