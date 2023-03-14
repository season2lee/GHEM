import React from "react";
import { css } from "@emotion/react";
import Profile from "../components/profile/Profile";

function ProfilePage() {
  return (
    <div css={wrapper}>
      <div css={profileWrapper}>
        <h2>닉네임 님의 프로필</h2>
        <Profile />
      </div>
    </div>
  );
}

const wrapper = css`
  padding: 50px 136px;
  width: 100vw;
  height: 100vh;
  background-color: #292233;
`;

const profileWrapper = css`
  width: 100%;
  height: 100%;

  > h2 {
    color: #ffffff;
    margin-bottom: 30px;
  }
`;

export default ProfilePage;
