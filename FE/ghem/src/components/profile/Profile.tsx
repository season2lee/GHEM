import React from "react";
import { css } from "@emotion/react";
import ProfileInfo from "./ProfileInfo";
import ProfileMenus from "./ProfileMenus";

function Profile() {
  return (
    <div css={profileWrapper}>
      <ProfileInfo />
      <ProfileMenus />
    </div>
  );
}

const profileWrapper = css`
  width: 350px;
  height: 80vh;
  background: #352c42;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

export default Profile;
