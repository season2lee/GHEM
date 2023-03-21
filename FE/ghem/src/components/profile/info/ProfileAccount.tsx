import React from "react";
import { css } from "@emotion/react";
import steamLogo from "../../../assets/image/steamLogo.png";
import { mobile } from "@/util/Mixin";

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

  ${mobile} {
    align-items: flex-start;
  }
`;

const nickname = css`
  font-weight: bold;
  margin: 20px 0 5px 0;

  ${mobile} {
    margin: 0;
    font-size: 18px;
  }
`;

const email = css`
  margin-bottom: 20px;

  ${mobile} {
    margin-bottom: 10px;
    font-size: 16px;
  }
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

  ${mobile} {
    margin-bottom: 0;
    height: 35px;

    > img {
      left: 10px;
      width: 23px;
      height: 23px;
    }

    > span {
      color: #7d7d7d;
      font-size: 13px;
    }
  }
`;

export default ProfileAccount;
