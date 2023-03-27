import React from "react";
import { css } from "@emotion/react";
import loginBackground from "../assets/image/loginBackground.jpg";
import kakaoOauth from "../assets/image/kakaoOauth.png";
import naverOauth from "../assets/image/naverOauth.png";
import forLogo from "../assets/image/for_logo.png";
import { mobile } from "@/util/Mixin";

function LoginPage() {
  const env = import.meta.env;

  const KAKAO_REST_API_KEY = env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_CALLBACK_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  const NAVER_REST_API_KEY = env.VITE_NAVER_REST_API_KEY;
  const NAVER_REDIRECT_URI = env.VITE_NAVER_REDIRECT_URI;
  const NAVER_CALLBACK_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=test&redirect_uri=${NAVER_REDIRECT_URI}`;

  const handleOauthLoginClcik = (flag: string): void => {
    switch (flag) {
      case "kakao":
        window.location.href = KAKAO_CALLBACK_URL;
        // navigate(KAKAO_CALLBACK_URL); -> 이거 왜 안먹혔는지 알아보기
        break;
      case "naver":
        window.location.href = NAVER_CALLBACK_URL;
        break;
      default:
    }
  };

  return (
    <div css={wrapper}>
      <div css={bgWrapper}></div>
      <div css={loginBoxWrapper}>
        <img src={forLogo} alt="GHEM" css={logoSize} />
        <div css={oauthWrapper}>
          <img src={kakaoOauth} onClick={() => handleOauthLoginClcik("kakao")} />
          <img src={naverOauth} onClick={() => handleOauthLoginClcik("naver")} />
        </div>
      </div>
    </div>
  );
}

const logoSize = css`
  width: 100%;
  height: auto;
`;

const wrapper = css`
  position: relative;
  height: 100vh;
  max-width: 100vw;
`;

const bgWrapper = css`
  width: 100%;
  height: 600px;
  background-image: linear-gradient(360deg, #292233 0%, rgba(41, 34, 51, 0) 169.72%), url(${loginBackground});
  background-repeat: repeat-x;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const loginBoxWrapper = css`
  margin: 0 auto;
  width: 650px;
  height: 500px;
  position: absolute;
  left: calc(50% - 650px / 2);
  top: calc(50% - 500px / 2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;

  @media (max-width: 768px) {
    width: 350px;
    left: calc(50% - 350px / 2);
  }
`;

const oauthWrapper = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;

  > img {
    cursor: pointer;
    width: 100%;
    transition: all 0.2s linear;

    :hover {
      transform: scale(1.1);
    }
  }

  ${mobile} {
    width: 300px;
  }
`;

export default LoginPage;
