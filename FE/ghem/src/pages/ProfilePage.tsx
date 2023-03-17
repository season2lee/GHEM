import React from "react";
import { css } from "@emotion/react";
import Profile from "../components/profile/Profile";
import GameEvaluated from "@components/profile/gameList/GameEvaluated";
import GameInterested from "@components/profile/gameList/GameInterested";

function ProfilePage() {
  return (
    <div css={wrapper}>
      <div css={profileWrapper}>
        <h2>닉네임 님의 프로필</h2>
        <div>
          <Profile />
          <div css={gameListWrapper}>
            <GameEvaluated />
            <GameInterested />
          </div>
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  padding: 50px 136px;
`;

const profileWrapper = css`
  width: 100%;
  height: 100%;

  > h2 {
    margin-bottom: 30px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const gameListWrapper = css`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

export default ProfilePage;
