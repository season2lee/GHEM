import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";

function MouseGeo() {
  return <div css={circle}></div>;
}

const circle = css`
z-index: 1;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, transparent 40%, yellow),
    linear-gradient(#262626, #141414);
  animation: rotate 1.5s linear infinite;

  ::before,
  ::after {
    content: " ";
    position: absolute;
    inset: 8px;
    background: linear-gradient(#161616, #262626);
    border-radius: inherit;
  }
  ::before {
    background: linear-gradient(45deg, transparent, transparent 40%, yellow);
    filter: blur(32px);
  }

  @keyframes rotate {
  100% {
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
}
`;

export default MouseGeo;
