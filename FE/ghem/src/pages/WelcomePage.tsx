import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import FirstContainer from "../components/welcome/FirstContainer";
import SecondContainer from "../components/welcome/SecondContainer";
import ThirdContainer from "../components/welcome/ThirdContainer";
import ForthContainer from "../components/welcome/ForthContainer";
import CategoryPage from "./CategoryPage";

function WelcomePage() {
  const [recommend, setRecommend] = useState<true | false>(false);

  return (
    <div>
      {recommend ? (
        <CategoryPage />
      ) : (
        <div css={Container}>
          <FirstContainer />
          <SecondContainer />
          <ThirdContainer />
          <ForthContainer setRecommend={setRecommend} />
        </div>
      )}
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

export default WelcomePage;
