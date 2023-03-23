import React, { useEffect } from "react";
import { css,keyframes } from "@emotion/react";


function FirstContainer() {
  // setInterval(() => {
  //   const title = document.getElementById("title");
  //   const titleStyle = title?.style;

  //   // before
  //   const top1 = Math.random() * 100;
  //   const bottom1 = Math.random() * 100;
  //   // after
  //   const top2 = Math.random() * 100;
  //   const bottom2 = Math.random() * 100;

  //   titleStyle?.setProperty("--t1", `${top1}%`);
  //   titleStyle?.setProperty("--b1", `${bottom1}%`);
  //   titleStyle?.setProperty("--t2", `${top2}%`);
  //   titleStyle?.setProperty("--b2", `${bottom2}%`);
  // }, 100);

 

  return (
    <div css={layout}>
      <div css={circle}>
          </div>
      <div css={section}>
        <h1 css={discountText} id="title" data-text="GHEM">
          GHEM
        </h1>
        <div css={grid}>
        </div>
      </div>
    </div>
  );
}

const layout = css`
  /* scroll-snap-align: start; */
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const section = css`
  height: 100%;

  h1 {
    z-index: 10;
    top:-18rem;
    font-size: 10rem;
    color: #f1f1f1;
    position: relative;
  }

  /* h1::before,
  h1::after {
    content: attr(data-text);
    position: absolute;
    transition: clip-path 150ms ease-in;
  }

  h1::before {
    right: -0.2rem;
    text-shadow: 2px -2px #2a96d4;
    clip-path: polygon(
      0 var(--t1),
      100% var(--t1),
      100% var(--b1),
      0 var(--b1)
    );
  }

  h1::after {
    right: 0.2rem;
    text-shadow: -2px 2px #f42fd3;
    clip-path: polygon(
      0 var(--t2),
      100% var(--t2),
      100% var(--b2),
      0 var(--b2)
    );
  } */
`;

const grid = css`
  top: -400px;
  bottom: -400px;
  left: -400px;
  right: -400px;
  position: fixed;
  background-color: transparent;
  background-image: linear-gradient(#f42fd3 1px, transparent 2px),
    linear-gradient(90deg,#2a96d4 1px, transparent 2px);
  background-size: 3% 3%, 3% 3%;
  background-position: 0 0, 0 0;
  transform: perspective(300px) rotateX(80deg);
  animation: throughSpace 10s linear;
  animation-iteration-count: infinite;
  @keyframes throughSpace {
    0% {
      transform: perspective(300px) rotateX(80deg) translateY(0%);
    }
    100% {
      transform: perspective(300px) rotateX(80deg) translateY(3%);
    }
  }
`;
const circle = css`
  z-index: 1;
  position: relative;
  top: 3rem;
  width: 27rem;
  height: 260rem;
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, transparent 0%, #d400ff),
    linear-gradient(transparent);
  animation: rotate 1.5s linear infinite;

  ::before,
  ::after {
    content: " ";
    position: absolute;
    inset: 8px;
    background: linear-gradient(transparent);
    border-radius: inherit;
  }
  ::before {
    background: linear-gradient(45deg, transparent, transparent 0%, #0095ff);
    filter: blur(32px);
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
      filter: hue-rotate(90deg);
    }
  }
`;



const discountText = css`
  color: #ffffff14;
  text-shadow: 0 0 1px #ffffff4b, 0 0 2px #ffffff3a, 0 0 4px #ffffff45, 0 0 7px #f6b4ffb9,
    0 0 10px #f1c1ff53, 0 0 15px #ffd8f840, 0 0 18px #eb68ffba, 0 0 23px #ffa9cb3a;
`;
export default FirstContainer;
