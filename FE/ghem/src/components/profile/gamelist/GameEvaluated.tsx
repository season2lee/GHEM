import React from "react";
import { css } from "@emotion/react";
import filterIcon from "../../../assets/image/filterIcon.png";
import GameCard from "./GameCard";

function GameEvaluated() {
  return (
    <div css={gameEvaluatedWrapper}>
      <div css={headerWrapper}>
        <h4>
          평가했어요 <span>(10)</span>
        </h4>
        <div css={filterWrapper}>
          <span>필터</span>
          <img src={filterIcon} />
        </div>
      </div>
      <div css={gameCardWrapper}>
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </div>
  );
}

const gameEvaluatedWrapper = css`
  width: 100%;
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 50px;
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;

  > h4 > span {
    font-weight: normal;
    font-size: 18px;
  }
`;

const filterWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  :hover {
    transition: all 0.5s;
    color: #c9c9c9;
  }

  > img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
  }
`;

const gameCardWrapper = css`
  display: flex;
  flex-direction: row;
`;

export default GameEvaluated;
