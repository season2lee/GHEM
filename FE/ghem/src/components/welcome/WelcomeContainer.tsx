import React, { useRef, useState, useEffect } from "react";
import FirstContainer from "./container/FirstContainer";
import SecondContainer from "./container/SecondContainer";
import ThirdContainer from "./container/ThirdContainer";
import FourthContainer from "./container/FourthContainer";
import FifthContainer from "./container/FifthContainer";
import SixthContainer from "./container/SixthContainer";
import LastContainer from "./container/LastContainer";
import { css } from "@emotion/react";

function WelcomeContainer() {
  //   const [position, setPosition] = useState(0);
  //   const ScrollHandler = () => {
  //     setPosition(window.scrollY);
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", ScrollHandler);

  //     return () => {
  //       window.removeEventListener("scroll", ScrollHandler);
  //     };
  //   }, [position]);

  return (
    <div>
      <div css={Container}>
        <FirstContainer />
        {/* <SecondContainer /> */}
        <ThirdContainer />
        <FourthContainer />
        <FifthContainer />
        {/* <SixthContainer /> */}
        <LastContainer />
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
    display: none;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

export default WelcomeContainer;
