import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import FirstContainer from "../components/welcome/FirstContainer";
import SecondContainer from "../components/welcome/SecondContainer";
import ThirdContainer from "../components/welcome/ThirdContainer";
import ForthContainer from "../components/welcome/ForthContainer";

function WelcomePage() {
  return (
    <div>
      <div css={Container}>
        <div css={ContainerBox}>
          <FirstContainer />
        </div>
        <div css={ContainerBox}>
          <SecondContainer />
        </div>
        <div css={ContainerBox}>
          <ThirdContainer />
        </div>
        <div css={ContainerBox}>
          <ForthContainer />
        </div>
      </div>
    </div>
  );
}

const Container = css`
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;
const ContainerBox = css`

    scroll-snap-align: start;
    width: 100%;
    height: 100vh;
    font-size: 1em;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export default WelcomePage;
