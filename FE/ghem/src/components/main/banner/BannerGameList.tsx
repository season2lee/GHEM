import { css, keyframes } from "@emotion/react";
import React from "react";
import BannerGameItem from "./BannerGameItem";

function BannerGameList() {
  return (
    <div>
      <div css={recommendForU}>
        <span>
          <b css={boxStyle}>WHAT FOR YOU</b>
        </span>
        <span>O</span>
      </div>
      <div css={recommendList}>
        <BannerGameItem appId={367520} title={"hollow"} />
        <BannerGameItem appId={10} title={"counterscrike"} />
        <BannerGameItem appId={322330} title={"dontstarv"} />
      </div>
    </div>
  );
}

const recommendForU = css`
  > span {
    font-size: 90px;
  }
  display: flex;
  justify-content: space-between;
  margin: 2rem 6rem 0rem;
  padding: 1rem 4rem 0rem 4rem;
  background-color: #352c42;
  border-radius: 30px 30px 0px 0px;
`;

const recommendList = css`
  display: flex;
  overflow: scroll;
`;

const floating = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
    0 0 1px #fff,
    0 0 6px #fff,
    0 0 8px #fff,
    0 0 10px #f6b4ff,
    0 0 15px #f1c1ff,
    0 0 20px #ffd8f8,
    0 0 30px #dd00ff,
    0 0 40px #ffa9cb;
  }

  20%, 24%, 55% {        
    text-shadow: none;
  }    
`;

const boxStyle = css`
  color: #fff;
  animation: ${floating} 1.5s infinite alternate; ;
`;

export default BannerGameList;
