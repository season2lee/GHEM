import React from "react";
import { css } from "@emotion/react";

function GameInterested() {
  return (
    <div css={gameInterestedWrapper}>
      <h3>
        찜했어요 <span>(20)</span>
      </h3>
    </div>
  );
}

const gameInterestedWrapper = css`
  width: 1140px;
  padding: 40px;
  background: #352c42;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  > h3 > span {
    font-weight: normal;
    font-size: 18px;
  }
`;

export default GameInterested;
