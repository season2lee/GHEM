import React from "react";
import { css } from "@emotion/react";
import ProfileInfo from "./info/ProfileInfo";
import ProfileMenuList from "./menu/ProfileMenuList";
import { mobile } from "@/Mixin";

function Profile() {
  return (
    <div css={profileWrapper}>
      <ProfileInfo />
      <ProfileMenuList />
    </div>
  );
}

const profileWrapper = css`
  min-width: 310px;
  width: 25%;
  height: 100%;
  background: #352c42;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;

  ${mobile} {
    width: 100%;
  }
`;

export default Profile;
