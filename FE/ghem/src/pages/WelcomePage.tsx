import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";

function WelcomePage() {
  return (
    <div>
      <div css={PageOne}>page1</div>
      <div css={PageTwo}>page2</div>
      <div css={PageOne}>page3</div>
      <div css={PageTwo}>page4</div>
    </div>
  );
}


const PageOne = css`
  width: 100vw;
  height: 100vh;
`;

const PageTwo = css`
  width: 100vw;
  height: 100vh;

`;

export default WelcomePage;
