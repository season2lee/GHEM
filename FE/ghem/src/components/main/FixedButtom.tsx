import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router";
function FixedButtom() {
  const navigator = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div css={fixedBtn}>
      FixedButtom
      <div onClick={scrollToTop}>위로 가기</div>
      <div
        onClick={() => {
          navigator("/category");
        }}
      >
        게임 더 평가하기
      </div>
      <div
        onClick={() => {
          navigator("/login");
        }}
      >
        로그인하기
      </div>
    </div>
  );
}

const fixedBtn = css`
  position: fixed;
  bottom: 0%;
  right: 0%;
  z-index: 10;
`;

export default FixedButtom;
