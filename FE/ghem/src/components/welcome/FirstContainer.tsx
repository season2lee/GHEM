import React, { useEffect } from "react";
import { css } from "@emotion/react";


function FirstContainer() {
  setInterval(() => {
    const title = document.getElementById("title");
    const titleStyle = title?.style;

    // before
    const top1 = Math.random() * 100;
    const bottom1 = Math.random() * 100;
    // after
    const top2 = Math.random() * 100;
    const bottom2 = Math.random() * 100;

    titleStyle?.setProperty("--t1", `${top1}%`);
    titleStyle?.setProperty("--b1", `${bottom1}%`);
    titleStyle?.setProperty("--t2", `${top2}%`);
    titleStyle?.setProperty("--b2", `${bottom2}%`);
  }, 100);

  return (
    <div css={Layout}>
      <div css={Section}>
        <h1 id="title" data-text="GHEM"></h1>
      </div>
      <div css={Grid}>
        <div id="retro" css={Retro}>
          <div id="retro-grid" />
        </div>
      </div>
    </div>
  );
}

const Layout = css`
  scroll-snap-align: start;
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const Section = css`
  height: 50%;

  h1 {
    right: 15rem;
    font-size: 10rem;
    color: #f1f1f1;
    position: relative;
  }

  h1::before,
  h1::after {
    content: attr(data-text);
    position: absolute;
    transition: clip-path 150ms ease-in;
  }

  h1::before {
    text-shadow: 2px -2px #2a96d4;
    /* clip-path: polygon(
      0 var(--t1), 100% var(--t1), 100% var(--b1), 0 var(--b1)
    ) */
  }

  h1::after {
    text-shadow: -2px 2px #f42fd3;
    /* clip-path: polygon(
      0 var(--t2), 100% var(--t2), 100% var(--b2), 0 var(--b2)
    ) */
  }
`;

const Grid = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  perspective: 300px;
`;

const Retro = css`
  position: absolute;
  top: 0;
  width: 800px;
  margin: 0 auto;
  font-size: 0;
  transform: rotateX(60deg);

  .retro-grid {
    position: absolute;
    width: 100%;
    background: linear-gradient(#430f4b, #030103);
    will-change: transform;
    animation-name: grid;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;

export default FirstContainer;
