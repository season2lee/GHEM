import { css } from "@emotion/react";
import loginBackground from "../assets/image/loginBackground.jpg";
import kakaoOauth from "../assets/image/kakaoOauth.png";
import naverOauth from "../assets/image/naverOauth.png";
import steamOauth from "../assets/image/steamOauth.png";
import forLogo from "../assets/image/for_logo.png";
import { mobile } from "@/util/Mixin";

function LoginPage() {
  const env = import.meta.env;

  const KAKAO_REST_API_KEY = env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_CALLBACK_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  const NAVER_REST_API_KEY = env.VITE_NAVER_REST_API_KEY;
  const NAVER_REDIRECT_URI = env.VITE_NAVER_REDIRECT_URI;
  const NAVER_CALLBACK_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&state=login&redirect_uri=${NAVER_REDIRECT_URI}`;

  // const STEAM_REDIRECT_URI = env.VITE_STEAM_REDIRECT_URI;
  // const STEAM_CALLBACK_URL = `https://steamcommunity.com/oauth/login?response_type=code&client_id=client_id_here&state=whatever_you_want`;
  // const returnUrl = "http://j8d107.p.ssafy.io:32000/user/oauth2/code/steam";
  const STEAM_REALM = env.VITE_STEAM_REALM;
  const STEAM_REDIRECT_URI = env.VITE_STEAM_REDIRECT_URI;
  const STEAM_CALLBACK_URL = `https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=${STEAM_REALM}&openid.return_to=${STEAM_REDIRECT_URI}`;

  const handleOauthLoginClcik = (flag: string): void => {
    switch (flag) {
      case "kakao":
        window.location.href = KAKAO_CALLBACK_URL;
        break;
      case "naver":
        window.location.href = NAVER_CALLBACK_URL;
        break;
      case "steam":
        window.location.href = STEAM_CALLBACK_URL;
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
          <img src={steamOauth} onClick={() => handleOauthLoginClcik("steam")} />
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
