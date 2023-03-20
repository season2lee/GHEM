import React from "react";
import { css } from "@emotion/react";
import steamLogo from "../../../assets/image/steamLogo.png";

function ProfileAccount() {
  return (
    <div css={wrapper}>
      <p css={nickname}>닉네임</p>
      <p css={email}>email@email.com</p>
      <div css={steamIdWrapper}>
        <img src={steamLogo} alt="스팀 로고" />
        <span>미등록</span>
      </div>
    </div>
  );
}

const wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const nickname = css`
  font-weight: bold;
  margin: 20px 0 5px 0;
`;

const email = css`
  margin-bottom: 20px;
`;

const steamIdWrapper = css`
  width: 70%;
  height: 39px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;

  :hover {
    background: #cfcfcf;
  }

  > img {
    position: absolute;
    left: 20px;
    width: 30px;
    height: 30px;
  }

  > span {
    color: #7d7d7d;
    font-size: 16px;
  }
`;

export default ProfileAccount;
