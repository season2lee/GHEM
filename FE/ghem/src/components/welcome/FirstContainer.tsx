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
        <h1 id="title" data-text="GHEM">GHEM</h1>

      </div>
      <div css={Grid}>
        <div></div>
        <div></div>
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
  height: 100%;
  text-align: center;
  h1 {

    top: 5rem;
    font-size: 8rem;
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
    clip-path: polygon(
      10 var(--t1), 100% var(--t1), 100% var(--b1), 0 var(--b1)
    )
  }

  h1::after {
    right: 0.2rem;
    text-shadow: -2px 2px #f42fd3;
    clip-path: polygon(
      1
      0 var(--t2), 100% var(--t2), 100% var(--b2), 0 var(--b2)
    )
  }
`;

const Grid = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  perspective: 300px;
  z-index: 10;
  transform: skew(-60deg, 0deg);

  :nth-child(1) {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 11;
  background: radial-gradient(ellipse at 50% 50%, rgba(14, 20, 22, 0) 0%, #0e1416 80%);
}
 :nth-child(2){
  width: 300%;
  height: 60%;
  background-image: linear-gradient(to right, rgba(255, 0, 162, 0.3) 1px, transparent 0), linear-gradient(to bottom, rgba(255, 0, 221, 0.3) 1px, transparent 0);
  background-size: 45px 30px;
  background-repeat: repeat;
  transform-origin: 100% 0 0;
  animation: play 15s linear infinite;
 }

`;



export default FirstContainer;
