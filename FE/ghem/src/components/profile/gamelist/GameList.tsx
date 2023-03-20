import React from "react";
import { css } from "@emotion/react";
import GameEvaluated from "@components/profile/gameList/GameEvaluated";
import GameInterested from "@components/profile/gameList/GameInterested";

function GameList() {
  return (
    <div css={gameListWrapper}>
      <GameEvaluated />
      <GameInterested />
    </div>
  );
}

const gameListWrapper = css`
  width: 70%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default GameList;
