import React from "react";
import { css } from "@emotion/react";

function ProfileUpdate() {
  return (
    <div css={wrapper}>
      <div css={profileUpdateWrapper}></div>
    </div>
  );
}

const wrapper = css`
  padding: 50px 136px;
`;

const profileUpdateWrapper = css`
  margin: 0 auto;
  width: 750px;
  height: 550px;
  position: absolute;
  left: calc(50% - 750px / 2);
  top: calc(50% - 550px / 2);
  background: #352c42;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 350px;
    left: calc(50% - 350px / 2);
  }
`;

export default ProfileUpdate;
