import React, { useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useIntersectionObsever from "../../../util/hooks/useIntersectionObserver";
import steamLogo from "../../../assets/image/steamLogo.png";
import { mobile } from "@/util/Mixin";

// type SecondContainer = {
//   position:number
// }

function SecondContainer() {
  // {position}:SecondContainer
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObsever(ref);

  return (
    <div css={layout}>
      <div css={section} className={isInViewport ? "animation" : ""}>
        <img css={logo} src={steamLogo}></img>
      </div>
      <div ref={ref} className={isInViewport ? "animation" : ""} css={section}>
        어떤 게임을 할 지 항상 고민 하셨나요?
        <br />
        steam에서 추천해주는 게임이 지루하셨나요?
        <br />
        까다로운 당신의 취향에 딱 맞는 서비스를 받아보세요
      </div>
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
  font-size: 1em;
  font-family: sans-serif;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const section = css`
  z-index: 100;
  height: 50%;
  width: 50%;
  text-align: start;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${mobile} {
    height: 50%;
    width: 100%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  h3 {
    
    text-align: start;
    ${mobile} {
   
  }
  }

  &.animation {
    animation-name: opacity;
    animation-duration: 5000ms;

    @keyframes opacity {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
const footer = css`
  height: 50%;
  width: 100%;
  display: flex;
`;

const slider = css`
  border-top: solid 0.3rem;
  border-bottom: solid 0.3rem;
  height: 5rem;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;

  &::after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }

  &::before {
    left: 0;
    top: 0;
  }
`;
const slideTrack = css`
  text-align: center;
  animation: scroll 10s linear infinite;
  display: flex;
  width: calc(10rem);
  border-bottom: 5rem;
`;
const slide = css`
  display: flex;
  color: white;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-18rem));
    }
  }
`;
const text = css`
  height: 5rem;
  font-size: 5rem;
`;

const logo = css`
  filter: invert(100%) sepia(1%) saturate(2%) hue-rotate(221deg)
    brightness(101%) contrast(101%);
`;

export default SecondContainer;
