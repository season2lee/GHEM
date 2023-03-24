import React, { useRef} from 'react'
import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import useIntersectionObsever from '@/util/hooks/useIntersectionObserver';
import gameChat from '@/assets/image/gameChat.png';

function ForthContainer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInViewport = useIntersectionObsever(ref);

  return (
    <div css={layout}>
      <div ref={ref} className={isInViewport ? "animation" : ""} css={section}>
      <img css={image} src={gameChat}></img>
      </div>
      <div ref={ref} className={isInViewport ? "animation" : ""} css={section}>
      <h3>
          무슨 게임 할 지 항상 고민 하셨나요?
          <br />
          steam에서 추천해주는 게임이 지루하셨나요?
          <br />
          까다로운 당신의 취향에 딱 맞는 서비스를 받아보세요
          <br />
        </h3>
      </div>
    </div>
  );
}

const layout = css`
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const section = css`
  z-index: 100;
  height: 100vh;
  width: 50%;
  text-align: center;
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
const image = css`
width:100%;
height:80%;
`

export default ForthContainer