import React, { useState, useRef } from "react";
import { css } from "@emotion/react";
import useIntersectionObsever from "@/util/hooks/useIntersectionObserver";

function SixthContainer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObsever(ref);

  return (
    <div css={layout}>
      <div ref={ref} className={isInViewport ? "animation" : ""} css={section}>
        <div>card1</div>
      </div>
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const section = css`
z-index: 100;
  height: 100vh;
  width: 100%;
  text-align: center;

  img { 
    max-width: 100%;
    max-height: 100%;
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

export default SixthContainer;