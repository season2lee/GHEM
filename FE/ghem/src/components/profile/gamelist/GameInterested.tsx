import React from "react";
import { css } from "@emotion/react";
import GameCard from "./GameCard";
import { mobile } from "@/util/Mixin";

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
  width: auto;
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

  ${mobile} {
    padding: 30px;

    > h4 {
      font-size: 20px;
    }

    > h4 > span {
      font-size: 16px;
    }
  }
`;

const gameCardWrapper = css`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

export default GameInterested;
