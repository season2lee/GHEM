import React from "react";
import { css } from "@emotion/react";
import loginBackground from "../assets/image/loginBackground.jpg";
import kakaoOauthButton from "../assets/image/kakaoOauthButton.png";
import naverOauthButton from "../assets/image/naverOauthButton.png";

function LoginPage() {
  const handleOauthLoginClcik = (flag: string): void => {
    switch (flag) {
      case "kakao":
        console.log("kakao login");
        break;
      case "naver":
        console.log("naver login");
        break;
      default:
    }
  };

  return (
    <div css={wrapper}>
      <div css={loginBoxWrapper}>
        <h2>우리의 로고</h2>
        <div css={oauthWrapper}>
          <img src={kakaoOauthButton} onClick={() => handleOauthLoginClcik("kakao")} />
          <img src={naverOauthButton} onClick={() => handleOauthLoginClcik("naver")} />
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  height: 600px;
  background-image: linear-gradient(360deg, #292233 0%, rgba(41, 34, 51, 0) 169.72%), url(${loginBackground});
`;

const loginBoxWrapper = css`
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

  > h2 {
    margin-bottom: 150px;
  }

  @media (max-width: 768px) {
    width: 350px;
    left: calc(50% - 350px / 2);
  }
`;

const oauthWrapper = css`
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > img {
    cursor: pointer;
    width: 70px;
    height: 70px;
  }
`;

export default LoginPage;
