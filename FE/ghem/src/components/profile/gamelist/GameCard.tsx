import React from "react";
import { css } from "@emotion/react";
import testGameImage from "../../../assets/image/testGameImage.jpg";
import meatballIcon from "../../../assets/image/meatballIcon.png";

function GameCard() {
  return (
    <div css={gameCardWrapper}>
      <div css={gameImageWrapper}>
        <img src={testGameImage} />
        <div css={gameMeatballWrapper}>
          <img src={meatballIcon} />
        </div>
      </div>
      <div css={gameContentWrapper}>
        <span>
          <b>게임 이름</b>
        </span>
        <span>내 평점</span>
      </div>
    </div>
  );
}

const gameCardWrapper = css`
  width: 309px;
  height: 245px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;

const gameImageWrapper = css`
  position: relative;

  > img {
    width: 100%;
    border-radius: 15px 15px 0 0;
  }
`;

const gameMeatballWrapper = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 23px;
  background: rgba(202, 202, 202, 0.8);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  :hover {
    transition: all 0.2s;
    background: #a8a8a8;
  }
`;

const gameContentWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  cursor: pointer;

  > span {
    color: black;
    margin-bottom: 5px;
  }
`;

export default GameCard;
