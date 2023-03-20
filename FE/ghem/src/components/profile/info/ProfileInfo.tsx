import { useState } from "react";
import { css } from "@emotion/react";
import ProfileImage from "../common/ProfileImage";
import FollowModal from "../follow/FollowModal";
import ProfileAccount from "./ProfileAccount";
import ProfileFollow from "./ProfileFollow";
import ProfileIntroduce from "./ProfileIntroduce";

function ProfileInfo() {
  return (
    <div css={profileInfoWrapper}>
      <ProfileImage size={130} path="info" />
      <ProfileAccount />
      <ProfileFollow />
      <ProfileIntroduce />
    </div>
  );
}

const profileInfoWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ProfileInfo;
