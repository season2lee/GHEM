import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import useIntersectionObsever from "@/util/hooks/useIntersectionObserver";
import { useNavigate } from "react-router";
import { FaPowerOff, FaArrowUp } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";

function FixedButtom() {
  const navigator = useNavigate();
  const userId: number | null = Number(localStorage.getItem("id"));
  const [isLoginStatus, setIsLoginStatus] = useState<boolean>(false);
  const [isUpHover, setIsUpHover] = useState<boolean>(false);
  const [isGameHover, setIsGameHover] = useState<boolean>(false);
  const [isLoginHover, setIsLoginHover] = useState<boolean>(false);

  const firstView = useRef<HTMLDivElement>(null);

  const isBtnView = useIntersectionObsever(firstView);

  useEffect(() => {
    if (userId) {
      setIsLoginStatus(true);
    }
  }, [userId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={firstView}
        style={{
          height: "100vh",
          top: "0",
          position: "absolute",
        }}
      />
      <div css={fixedBtn}>
        {!isBtnView && (
          <div
            css={centerBtn}
            onClick={scrollToTop}
            onMouseEnter={() => {
              setIsUpHover(true);
            }}
            onMouseLeave={() => {
              setIsUpHover(false);
            }}
            style={isUpHover ? { width: "auto", padding: "0rem 0.5rem" } : {}}
          >
            <FaArrowUp size={30} />
            {isUpHover && <p>위로</p>}
          </div>
        )}
        <div
          css={centerBtn}
          onClick={() => {
            navigator("/category");
          }}
          onMouseEnter={() => {
            setIsGameHover(true);
          }}
          onMouseLeave={() => {
            setIsGameHover(false);
          }}
          style={isGameHover ? { width: "auto", padding: "0rem 0.5rem" } : {}}
        >
          <GrGamepad size={38} />
          {isGameHover && userId === 0 && <p>게임 새로 평가하기</p>}
          {isGameHover && userId !== 0 && <p>게임 더 평가하기</p>}
        </div>
        {!isLoginStatus && (
          <div
            css={centerBtn}
            onClick={() => {
              navigator("/login");
            }}
            onMouseEnter={() => {
              setIsLoginHover(true);
            }}
            onMouseLeave={() => {
              setIsLoginHover(false);
            }}
            style={
              isLoginHover ? { width: "auto", padding: "0rem 0.5rem" } : {}
            }
          >
            <FaPowerOff size={30} />
            {isLoginHover && <p>로그인</p>}
          </div>
        )}
      </div>
    </div>
  );
}

const fixedBtn = css`
  position: fixed;
  bottom: 0%;
  right: 0%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0.5rem;
  > div {
    color: black;
    font-size: 14px;
    margin: 0.5rem;
    width: 3rem;
    height: 3rem;
    background-color: #eae7ef;
    border-radius: 0.8rem;
  }
`;

const centerBtn = css`
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    padding-left: 0.5rem;
  }
  > svg {
    fill: #292233;
  }
  &:hover {
    > svg {
      fill: #5e8b65;
      stroke: #5e8b65;
      > path {
        stroke: #5e8b65;
      }
    }
  }
`;

export default FixedButtom;
