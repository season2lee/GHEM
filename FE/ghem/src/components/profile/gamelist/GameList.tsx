import React from "react";
import { css } from "@emotion/react";
import GameEvaluated from "@components/profile/gamelist/GameEvaluated";
import GameInterested from "@components/profile/gamelist/GameInterested";
import { mobile } from "@/util/Mixin";

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

  ${mobile} {
    width: 100%;
  }
`;

export default GameList;
