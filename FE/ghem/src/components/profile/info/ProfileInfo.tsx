import { useState } from "react";
import { css } from "@emotion/react";
import ProfileImage from "../common/ProfileImage";
import FollowModal from "../follow/FollowModal";
import ProfileAccount from "./ProfileAccount";
import ProfileFollow from "./ProfileFollow";
import ProfileIntroduce from "./ProfileIntroduce";
import { mobile } from "@/Mixin";

function ProfileInfo() {
  return (
    <div css={profileInfoWrapper}>
      <div css={profileWrapper}>
        <div css={profileImageAccountWrapper}>
          <ProfileImage size={130} path="info" />
          <ProfileAccount />
        </div>
        <ProfileFollow />
      </div>
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

const profileWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 40px;
  }
`;

const profileImageAccountWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${mobile} {
    gap: 15px;
    flex-direction: row;
  }
`;

export default ProfileInfo;
