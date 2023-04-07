import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { gameRecommendState } from "@/store/mainState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import GameCanvas from "@components/common/GameCanvas";

function RecommendLoading() {
  const currentGameRecommend = useRecoilValue(gameRecommendState);
  const navigate = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));

  const moveToMainPage = () => {
    navigate("/main");
  };

  return (
    <div>
      <div css={wrapper}>
        <h1>게임 추천 중</h1>

        <GameCanvas />
        <div>
          {userId ? (
            <>
              <button css={btn} onClick={moveToMainPage}>
                추천결과 보기
              </button>
            </>
          ) : (
            <>
              {currentGameRecommend.length === 0 ? (
                <div css={spanWrapper}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <>
                  <button css={btn} onClick={moveToMainPage}>
                    추천결과 보기
                  </button>
                </>
              )}
            </>
          )}
        </div>
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

const btn = css`
  width: 8rem;
  height: 2rem;
  border-radius: 5px;
  padding: 7px 10px;
  border: none;
  color: white;
  margin-right: 10%;
  background-color: rgb(88, 74, 110);
  cursor: pointer;
  &:hover {
    background-color: rgb(117, 98, 146);
  }
`;

export default RecommendLoading;
