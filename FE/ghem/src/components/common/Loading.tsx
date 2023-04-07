import { css } from "@emotion/react";

function Loading() {
  return (
    <div css={wrapper}>
      <h1>접 속 중</h1>
      <div css={spanWrapper}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: 100vh;
`;

const spanWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > span {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    animation: loading 1s 0s linear infinite;
  }

  > span:nth-of-type(1) {
    animation-delay: 0s;
    background-color: #f1eff4;
  }

  > span:nth-of-type(2) {
    animation-delay: 0.2s;
    background-color: #756292;
  }

  > span:nth-of-type(3) {
    animation-delay: 0.4s;
    background-color: #584a6e;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

export default Loading;
